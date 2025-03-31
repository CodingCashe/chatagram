import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"

export async function GET() {
  try {
    // Get top affiliates
    const topAffiliates = await client.affiliateUser.findMany({
      where: {
        status: "active",
        isApproved: true,
      },
      orderBy: {
        totalEarned: "desc",
      },
      take: 10,
      select: {
        id: true,
        name: true,
        totalEarned: true,
        userId: true,
        bio: true,
        _count: {
          select: {
            referrals: true,
          },
        },
      },
    })

    // Get this month's top performers
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const monthlyTopAffiliates = await client.affiliateReferral.groupBy({
      by: ["affiliateId"],
      where: {
        conversionDate: {
          gte: firstDayOfMonth,
        },
        affiliate: {
          status: "active",
          isApproved: true,
        },
      },
      _sum: {
        commissionAmount: true,
      },
      orderBy: {
        _sum: {
          commissionAmount: "desc",
        },
      },
      take: 5,
    })

    // Get affiliate details for monthly top performers
    const monthlyLeaders = await Promise.all(
      monthlyTopAffiliates.map(async (item) => {
        const affiliate = await client.affiliateUser.findUnique({
          where: { id: item.affiliateId },
          select: {
            id: true,
            name: true,
            bio: true,
          },
        })

        return {
          ...affiliate,
          monthlyEarnings: item._sum.commissionAmount || 0,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      leaderboard: {
        allTime: topAffiliates,
        monthly: monthlyLeaders,
      },
    })
  } catch (error) {
    console.error("Error fetching affiliate leaderboard:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate leaderboard" }, { status: 500 })
  }
}

