import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

export async function GET(req: Request, { params }: { params: { id: string } }) {
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

    const affiliateId = params.id

    // Get the affiliate with detailed information
    const affiliate = await client.affiliateUser.findUnique({
      where: { id: affiliateId },
      include: {
        program: true,
        user: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
          },
        },
        referrals: {
          take: 10,
          orderBy: {
            conversionDate: "desc",
          },
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
        },
        _count: {
          select: {
            referrals: true,
            clicks: true,
          },
        },
      },
    })

    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Affiliate not found" }, { status: 404 })
    }

    // Get statistics
    const stats = {
      totalReferrals: affiliate._count.referrals,
      totalClicks: affiliate._count.clicks,
      conversionRate: affiliate._count.clicks > 0 ? (affiliate._count.referrals / affiliate._count.clicks) * 100 : 0,
      pendingCommissions: await client.affiliateReferral
        .aggregate({
          where: {
            affiliateId,
            status: "pending",
          },
          _sum: {
            commissionAmount: true,
          },
        })
        .then((result) => result._sum.commissionAmount || 0),
    }

    // Get monthly performance
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    const monthlyReferrals = await client.affiliateReferral.groupBy({
      by: ["conversionDate"],
      where: {
        affiliateId,
        conversionDate: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        commissionAmount: true,
      },
    })

    // Format monthly data
    interface MonthlyDataEntry {
      month: string
      referrals: number
      commissions: number
    }

    const monthMap = new Map<string, MonthlyDataEntry>()

    for (let i = 0; i < 6; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
      monthMap.set(monthYear, {
        month: monthYear,
        referrals: 0,
        commissions: 0,
      })
    }

    // Fill in the data
    for (const entry of monthlyReferrals) {
      const date = new Date(entry.conversionDate)
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`

      if (monthMap.has(monthYear)) {
        const data = monthMap.get(monthYear)
        if (data) {
          data.referrals += entry._count.id
          data.commissions += entry._sum.commissionAmount || 0
          monthMap.set(monthYear, data)
        }
      }
    }

    const monthlyData: MonthlyDataEntry[] = Array.from(monthMap.values())
    monthlyData.reverse() // Most recent month first

    return NextResponse.json({
      success: true,
      affiliate: {
        ...affiliate,
        stats,
        monthlyPerformance: monthlyData,
      },
    })
  } catch (error) {
    console.error("Error fetching affiliate details:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate details" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
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

    const affiliateId = params.id
    const body = await req.json()
    const { isApproved, status, commissionRate } = body

    // Update the affiliate
    const affiliate = await client.affiliateUser.update({
      where: { id: affiliateId },
      data: {
        isApproved: isApproved !== undefined ? isApproved : undefined,
        status: status || undefined,
        commissionRate: commissionRate !== undefined ? commissionRate : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      affiliate,
    })
  } catch (error) {
    console.error("Error updating affiliate:", error)
    return NextResponse.json({ success: false, message: "Failed to update affiliate" }, { status: 500 })
  }
}

