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

    // Check if user is an admin
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!user?.isAdmin) {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 })
    }

    const body = await req.json()
    const { payoutId, status, transactionId, notes } = body

    if (!payoutId || !status) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Validate status
    if (!["processing", "completed", "failed"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 })
    }

    // Update the payout
    const payout = await client.affiliatePayout.update({
      where: { id: payoutId },
      data: {
        status,
        transactionId,
        notes: notes ? notes : undefined,
        processedAt: status === "completed" ? new Date() : undefined,
      },
    })

    // If completed, update the affiliate's balance
    if (status === "completed") {
      await client.affiliateUser.update({
        where: { id: payout.affiliateId },
        data: {
          balance: {
            decrement: payout.amount,
          },
        },
      })

      // Update the referrals to mark them as paid
      await client.affiliateReferral.updateMany({
        where: {
          affiliateId: payout.affiliateId,
          status: "approved",
          payoutId: null,
        },
        data: {
          payoutId: payout.id,
          status: "paid",
        },
      })
    }

    return NextResponse.json({
      success: true,
      payout,
    })
  } catch (error) {
    console.error("Error processing affiliate payout:", error)
    return NextResponse.json({ success: false, message: "Failed to process affiliate payout" }, { status: 500 })
  }
}

