import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

export async function GET() {
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

    // Get statistics
    const [clicksCount, referralsCount, pendingReferrals, recentReferrals, payouts] = await Promise.all([
      client.affiliateClick.count({
        where: { affiliateId: affiliate.id },
      }),
      client.affiliateReferral.count({
        where: { affiliateId: affiliate.id },
      }),
      client.affiliateReferral.count({
        where: {
          affiliateId: affiliate.id,
          status: "pending",
        },
      }),
      client.affiliateReferral.findMany({
        where: { affiliateId: affiliate.id },
        take: 5,
        orderBy: { conversionDate: "desc" },
        include: {
          referredUser: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      }),
      client.affiliatePayout.findMany({
        where: { affiliateId: affiliate.id },
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ])

    // Calculate conversion rate
    const conversionRate = clicksCount > 0 ? (referralsCount / clicksCount) * 100 : 0

    // Calculate monthly earnings
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyReferrals = await client.affiliateReferral.findMany({
      where: {
        affiliateId: affiliate.id,
        conversionDate: {
          gte: new Date(currentYear, currentMonth, 1),
          lt: new Date(currentYear, currentMonth + 1, 1),
        },
      },
    })

    const monthlyEarnings = monthlyReferrals.reduce((total, ref) => total + ref.commissionAmount, 0)

    return NextResponse.json({
      success: true,
      dashboardData: {
        affiliate,
        stats: {
          clicks: clicksCount,
          referrals: referralsCount,
          pendingReferrals,
          conversionRate,
          balance: affiliate.balance,
          totalEarned: affiliate.totalEarned,
          monthlyEarnings,
        },
        recentReferrals,
        recentPayouts: payouts,
      },
    })
  } catch (error) {
    console.error("Error fetching affiliate dashboard:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate dashboard" }, { status: 500 })
  }
}

