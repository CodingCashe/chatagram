import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { referralCode, ipAddress, userAgent, referrer } = body

    if (!referralCode) {
      return NextResponse.json({ success: false, message: "Referral code is required" }, { status: 400 })
    }

    // Find the affiliate by referral code
    const affiliate = await client.affiliateUser.findFirst({
      where: { referralCode },
    })

    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Invalid referral code" }, { status: 404 })
    }

    // Record the click
    await client.affiliateClick.create({
      data: {
        ipAddress,
        userAgent,
        referrer,
        affiliate: { connect: { id: affiliate.id } },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking affiliate click:", error)
    return NextResponse.json({ success: false, message: "Failed to track affiliate click" }, { status: 500 })
  }
}

