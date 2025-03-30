// import { type NextRequest, NextResponse } from "next/server"
// import { trackAffiliateClick } from "@/actions/new-referral/referral-actions"
// import { cookies } from "next/headers"

// // Track affiliate clicks
// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const refCode = searchParams.get("ref")

//     if (!refCode) {
//       return NextResponse.json({ error: "No referral code provided" }, { status: 400 })
//     }

//     // Get IP address
//     const forwardedFor = req.headers.get("x-forwarded-for")
//     const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown"

//     // Get user agent
//     const userAgent = req.headers.get("user-agent") || "unknown"

//     // Get referrer
//     const referrer = req.headers.get("referer") || null

//     // Track the click
//     const result = await trackAffiliateClick(refCode, ip, userAgent, referrer)

//     if (!result.success) {
//       return NextResponse.json({ error: result.message }, { status: 400 })
//     }

//     // Set a cookie with the referral code
//     const cookieStore = cookies()
//     cookieStore.set("affiliate_ref", refCode, {
//       maxAge: 60 * 60 * 24 * 30, // 30 days
//       path: "/",
//     })

//     // Return success
//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Error tracking affiliate click:", error)
//     return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { trackAffiliateClick } from "@/actions/new-referral/referral-actions"
import { cookies } from "next/headers"

// Track affiliate clicks
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const refCode = searchParams.get("ref")

    if (!refCode) {
      return NextResponse.json({ error: "No referral code provided" }, { status: 400 })
    }

    // Get IP address
    const forwardedFor = req.headers.get("x-forwarded-for")
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown"

    // Get user agent
    const userAgent = req.headers.get("user-agent") || "unknown"

    // Get referrer - convert null to undefined to match the function parameter type
    const referrer = req.headers.get("referer") || undefined

    // Track the click
    const result = await trackAffiliateClick(refCode, ip, userAgent, referrer)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    // Set a cookie with the referral code
    const cookieStore = cookies()
    cookieStore.set("affiliate_ref", refCode, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    // Return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking affiliate click:", error)
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
  }
}

