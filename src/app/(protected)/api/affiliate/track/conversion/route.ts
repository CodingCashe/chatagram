import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { referralCode, conversionType, amount } = body

    if (!referralCode || !conversionType || amount === undefined) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Find the affiliate by referral code
    const affiliate = await client.affiliateUser.findFirst({
      where: { referralCode },
    })

    if (!affiliate || affiliate.status !== "active") {
      return NextResponse.json(
        { success: false, message: "Invalid referral code or inactive affiliate" },
        { status: 404 },
      )
    }

    // Get the current user if available
    let userUuid = null
    try {
      const thisUser = await onCurrentUser()
      if (thisUser?.id) {
        const dbUser = await client.user.findUnique({
          where: { clerkId: thisUser.id },
          select: { id: true },
        })
        if (dbUser) {
          userUuid = dbUser.id
        }
      }
    } catch (error) {
      console.error("Error getting current user:", error)
      // Continue without user ID
    }

    // Get the commission rate
    const commissionRate =
      affiliate.commissionRate ||
      (
        await client.affiliateProgram.findUnique({
          where: { id: affiliate.programId },
        })
      )?.commissionRate ||
      0

    // Calculate the commission amount
    const commissionAmount = amount * (commissionRate / 100)

    // Record the referral
    const referralData: any = {
      conversionType,
      amount,
      commissionAmount,
      affiliateId: affiliate.id,
      programId: affiliate.programId,
    }

    // Only add referredUserId if we have a UUID
    if (userUuid) {
      referralData.referredUserId = userUuid
    }

    const referral = await client.affiliateReferral.create({
      data: referralData,
    })

    // Update the affiliate's balance
    await client.affiliateUser.update({
      where: { id: affiliate.id },
      data: {
        balance: { increment: commissionAmount },
        totalEarned: { increment: commissionAmount },
      },
    })

    // Update click to mark as converted
    if (userUuid) {
      await client.affiliateClick.updateMany({
        where: {
          affiliateId: affiliate.id,
          converted: false,
        },
        data: {
          converted: true,
        },
      })
    }

    return NextResponse.json({
      success: true,
      referral: {
        id: referral.id,
        commissionAmount,
      },
    })
  } catch (error) {
    console.error("Error recording affiliate conversion:", error)
    return NextResponse.json({ success: false, message: "Failed to record affiliate conversion" }, { status: 500 })
  }
}

