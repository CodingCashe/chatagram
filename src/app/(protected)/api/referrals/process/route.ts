import { type NextRequest, NextResponse } from "next/server"
import { processReferral } from "@/actions/referral/referral-actions"

export async function POST(request: NextRequest) {
  try {
    const { referralCode, userId } = await request.json()

    if (!referralCode || !userId) {
      return NextResponse.json({ error: "Referral code and user ID are required" }, { status: 400 })
    }

    await processReferral(referralCode, userId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to process referral:", error)
    return NextResponse.json({ error: "Failed to process referral" }, { status: 500 })
  }
}

