import { type NextRequest, NextResponse } from "next/server"
import { trackReferralClick } from "@/actions/referral/referral-actions"

export async function POST(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Referral code is required" }, { status: 400 })
  }

  const ipAddress = request.headers.get("x-forwarded-for") || ""
  const userAgent = request.headers.get("user-agent") || ""

  try {
    await trackReferralClick(code, ipAddress, userAgent)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to track referral click:", error)
    return NextResponse.json({ error: "Failed to track referral" }, { status: 500 })
  }
}

