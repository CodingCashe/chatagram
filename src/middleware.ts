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


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/payment(.*)", "/callback(.*)"])

// This function will run before the Clerk middleware
async function handleReferrals(request: NextRequest) {
  // Check if this is a signup page with a referral code
  if (request.nextUrl.pathname === "/signup" && request.nextUrl.searchParams.has("ref")) {
    const refCode = request.nextUrl.searchParams.get("ref")

    if (refCode) {
      try {
        // Track the referral click
        await fetch(`${request.nextUrl.origin}/api/referrals/track?code=${refCode}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
            "User-Agent": request.headers.get("user-agent") || "",
          },
        })
      } catch (error) {
        console.error("Failed to track referral click:", error)
      }

      // Store the referral code in a cookie
      const response = NextResponse.next()
      response.cookies.set("referralCode", refCode, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      })

      return response
    }
  }

  // Continue with normal request processing
  return NextResponse.next()
}

// Combine our referral handling with Clerk middleware
export default clerkMiddleware(async (auth, req) => {
  // First handle any referral logic
  const referralResponse = await handleReferrals(req)

  // Then protect routes as needed
  if (isProtectedRoute(req)) await auth.protect()

  return referralResponse
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}

