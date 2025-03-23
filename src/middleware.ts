// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)','/api/payment(.*)','/callback(.*)',])

// export default clerkMiddleware( async (auth,req)=>{
//     if(isProtectedRoute(req)) await auth.protect()

// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware, createRouteMatcher, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {onCurrentUser} from '@/actions/user'
import type { NextRequest } from "next/server";
import { client } from "@/lib/prisma";

// Rate limiter class with fixed iteration method
class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private cache: Map<string, { count: number; resetTime: number }>;

  constructor(options: { windowMs: number; maxRequests: number }) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.cache = new Map();

    // Clean up expired entries every minute
    setInterval(() => this.cleanupEntries(), 60 * 1000);
  }

  async check(key: string): Promise<{ success: boolean; remaining: number; retryAfter: number }> {
    const now = Date.now();
    const record = this.cache.get(key) || { count: 0, resetTime: now + this.windowMs };

    // Reset if the window has expired
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + this.windowMs;
    }

    // Increment the count
    record.count += 1;
    this.cache.set(key, record);

    const remaining = Math.max(0, this.maxRequests - record.count);
    const success = record.count <= this.maxRequests;
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);

    return { success, remaining, retryAfter };
  }

  private cleanupEntries() {
    const now = Date.now();
    // Use Array.from to avoid TypeScript iteration issues with Map
    const keys = Array.from(this.cache.keys());
    
    for (const key of keys) {
      const record = this.cache.get(key);
      if (record && now > record.resetTime) {
        this.cache.delete(key);
      }
    }
  }
}

// Create a rate limiter for admin routes
const adminRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // limit each IP to 100 requests per windowMs
});

// Define protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/api/payment(.*)', '/callback(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Handle protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  // Handle admin routes with additional security
  if (isAdminRoute(req)) {
    // First ensure the user is authenticated
    await auth.protect();
    
    const user = await onCurrentUser()
    // Get the user from Clerk
    const userId = user.id;
    
    // Get the request object
    const request = req as unknown as NextRequest;
    const ip = request.ip || "unknown";
    
    // Apply rate limiting for admin routes
    const rateLimitResult = await adminRateLimiter.check(ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests, please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter.toString(),
          },
        }
      );
    }
    
    try {
      // Check if the user is an admin
      if (!userId) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      
      const user = await client.user.findFirst({
        where: {
          clerkId: userId,
          isAdmin: true,
        },
        select: {
          id: true,
        },
      });
      
      if (!user) {
        // Log unauthorized access attempt
        console.warn(`Unauthorized admin access attempt by user ${userId} from IP ${ip}`);
        
        // Redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      
      // Log successful admin access
      await client.auditLog.create({
        data: {
          userId: user.id,
          action: "admin_access",
          target: request.nextUrl.pathname,
          ipAddress: ip,
          userAgent: request.headers.get("user-agent") || "unknown",
          timestamp: new Date(),
        },
      });
      
      // Session timeout check if ADMIN_SESSION_TIMEOUT is set
      if (process.env.ADMIN_SESSION_TIMEOUT) {
        const lastActivity = request.cookies.get('admin_last_activity')?.value;
        const now = Date.now();
        const SESSION_TIMEOUT = parseInt(process.env.ADMIN_SESSION_TIMEOUT) * 60 * 1000 || 30 * 60 * 1000; // Default 30 minutes
        
        if (!lastActivity || now - parseInt(lastActivity) > SESSION_TIMEOUT) {
          return NextResponse.redirect(new URL("/admin/login", request.url));
        }
        
        // Set a new cookie with the current timestamp
        const response = NextResponse.next();
        response.cookies.set('admin_last_activity', now.toString(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: SESSION_TIMEOUT / 1000
        });
        
        return response;
      }
    } catch (error) {
      console.error("Error in admin middleware:", error);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};