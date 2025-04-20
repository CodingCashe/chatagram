import { type NextRequest, NextResponse } from "next/server"
import { recordAffiliateReferral } from "@/actions/new-referral/referral-actions"
import { cookies } from "next/headers"
import { onCurrentUser } from "@/actions/user"

// Process a conversion from a referral
export async function POST(req: NextRequest) {
  try {
    const { conversionType, amount } = await req.json()

    // Get current session to identify the user
    const userr = await onCurrentUser()
    
    const userId = userr?.id || null

    // Get referral code from cookie
    const cookieStore = cookies()
    const refCode = cookieStore.get("affiliate_ref")?.value

    if (!refCode) {
      return NextResponse.json({ error: "No referral code found" }, { status: 400 })
    }

    // Record the referral
    const result = await recordAffiliateReferral(refCode, userId, conversionType, amount)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    // Return success with commission details
    return NextResponse.json({
      success: true,
      referral: result.referral,
    })
  } catch (error) {
    console.error("Error processing affiliate conversion:", error)
    return NextResponse.json({ error: "Failed to process conversion" }, { status: 500 })
  }
}

