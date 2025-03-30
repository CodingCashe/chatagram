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


// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/payment(.*)", "/callback(.*)"])

// // This function will run before the Clerk middleware
// async function handleReferrals(request: NextRequest) {
//   // Check if this is a signup page with a referral code
//   if (request.nextUrl.pathname === "/signup" && request.nextUrl.searchParams.has("ref")) {
//     const refCode = request.nextUrl.searchParams.get("ref")

//     if (refCode) {
//       try {
//         // Track the referral click
//         await fetch(`${request.nextUrl.origin}/api/referrals/track?code=${refCode}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
//             "User-Agent": request.headers.get("user-agent") || "",
//           },
//         })
//       } catch (error) {
//         console.error("Failed to track referral click:", error)
//       }

//       // Store the referral code in a cookie
//       const response = NextResponse.next()
//       response.cookies.set("referralCode", refCode, {
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//         path: "/",
//       })

//       return response
//     }
//   }

//   // Continue with normal request processing
//   return NextResponse.next()
// }

// // Combine our referral handling with Clerk middleware
// export default clerkMiddleware(async (auth, req) => {
//   // First handle any referral logic
//   const referralResponse = await handleReferrals(req)

//   // Then protect routes as needed
//   if (isProtectedRoute(req)) await auth.protect()

//   return referralResponse
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// }

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/payment(.*)", "/callback(.*)"])

// This function will handle both referrals and affiliate tracking
async function handleReferralsAndAffiliates(request: NextRequest) {
  const { pathname, origin } = request.nextUrl

  // Handle affiliate links: /ref/[referralCode]
  if (pathname.startsWith("/ref/")) {
    const referralCode = pathname.split("/ref/")[1]

    // Set the affiliate referral code as a cookie
    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.set("affiliate_ref", referralCode, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    // Track the click via API
    try {
      await fetch(`${origin}/api/affiliates/track?ref=${referralCode}`, {
        headers: {
          "x-forwarded-for": request.headers.get("x-forwarded-for") || "",
          "user-agent": request.headers.get("user-agent") || "",
          referer: request.headers.get("referer") || "",
        },
      })
    } catch (err) {
      console.error("Error tracking affiliate click:", err)
    }

    return response
  }

  // Check if this is a signup page with a referral code (old system)
  if (pathname === "/signup" && request.nextUrl.searchParams.has("ref")) {
    const refCode = request.nextUrl.searchParams.get("ref")

    if (refCode) {
      try {
        // Track the referral click (old system)
        await fetch(`${origin}/api/referrals/track?code=${refCode}`, {
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

      // Store the referral code in a cookie (old system)
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
  // First handle any referral or affiliate logic
  const referralResponse = await handleReferralsAndAffiliates(req)

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
    // Add matcher for affiliate referral links
    "/ref/:referralCode*",
  ],
}

