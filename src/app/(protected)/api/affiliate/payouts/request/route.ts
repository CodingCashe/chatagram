import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

export async function POST(req: Request) {
  try {
    const thisUser = await onCurrentUser()
    const userId = thisUser.id

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get the user's UUID from the database
    const dbUser = await client.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    })

    if (!dbUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Get the user's affiliate account
    const affiliate = await client.affiliateUser.findFirst({
      where: { userId: dbUser.id },
      include: {
        program: true,
      },
    })

    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Affiliate account not found" }, { status: 404 })
    }

    // Check if the affiliate has enough balance
    if (affiliate.balance < affiliate.program.minimumPayout) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum payout amount of $${affiliate.program.minimumPayout} not reached.`,
        },
        { status: 400 },
      )
    }

    const body = await req.json()
    const { paymentMethod, notes } = body

    if (!paymentMethod) {
      return NextResponse.json({ success: false, message: "Payment method is required" }, { status: 400 })
    }

    // Get pending referrals to include in this payout
    const pendingReferrals = await client.affiliateReferral.findMany({
      where: {
        affiliateId: affiliate.id,
        status: "approved",
        payoutId: null,
      },
    })

    if (pendingReferrals.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No approved referrals available for payout.",
        },
        { status: 400 },
      )
    }

    const payoutAmount = pendingReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

    // Create the payout
    const payout = await client.affiliatePayout.create({
      data: {
        amount: payoutAmount,
        paymentMethod,
        notes,
        affiliate: { connect: { id: affiliate.id } },
        program: { connect: { id: affiliate.program.id } },
      },
    })

    // Update the referrals to link them to this payout
    await client.affiliateReferral.updateMany({
      where: {
        id: {
          in: pendingReferrals.map((ref) => ref.id),
        },
      },
      data: {
        payoutId: payout.id,
        status: "paid",
      },
    })

    // Update the affiliate's balance
    await client.affiliateUser.update({
      where: { id: affiliate.id },
      data: {
        balance: { decrement: payoutAmount },
      },
    })

    return NextResponse.json({
      success: true,
      payout: {
        id: payout.id,
        amount: payoutAmount,
        status: payout.status,
        createdAt: payout.createdAt,
      },
    })
  } catch (error) {
    console.error("Error requesting affiliate payout:", error)
    return NextResponse.json({ success: false, message: "Failed to request payout" }, { status: 500 })
  }
}

