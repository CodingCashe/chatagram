import { NextResponse } from "next/server"
import {client} from "@/lib/prisma"
import {onCurrentUser} from '@/actions/user'
import { auth } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const userd = await onCurrentUser()
    const userId = userd.id

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

    // Get top 10 affiliates by total earned
    const topAffiliates = await client.affiliateUser.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        totalEarned: true,
        bio: true,
        _count: {
          select: {
            referrals: true,
          },
        },
      },
      orderBy: {
        totalEarned: "desc",
      },
      take: 10,
    })

    return NextResponse.json({
      success: true,
      leaderboard: topAffiliates,
    })
  } catch (error) {
    console.error("Error fetching affiliate leaderboard:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate leaderboard" }, { status: 500 })
  }
}

