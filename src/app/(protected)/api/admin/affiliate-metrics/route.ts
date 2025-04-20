// import { NextResponse } from "next/server"
// import {client} from "@/lib/prisma"
// import { auth } from "@clerk/nextjs/server"
// import { onCurrentUser } from "@/actions/user"

// export async function GET() {
//   try {
//     const thisUser = await onCurrentUser()

//     const  userId  = thisUser.id

//     if (!userId) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     // Check if user is an admin
//     const user = await client.user.findUnique({
//       where: { clerkId: userId },
//       select: { isAdmin: true },
//     })

//     if (!user?.isAdmin) {
//       return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 })
//     }

//     // Get counts
//     const totalPrograms = await client.affiliateProgram.count()
//     const totalAffiliates = await client.affiliateUser.count()
//     const totalReferrals = await client.affiliateReferral.count()

//     // Get sum of all commissions
//     const commissionsResult = await client.affiliateReferral.aggregate({
//       _sum: {
//         commissionAmount: true,
//       },
//     })

//     const totalCommissions = commissionsResult._sum.commissionAmount || 0

//     // Get pending payouts
//     const pendingPayoutsResult = await client.affiliatePayout.aggregate({
//       where: {
//         status: "pending",
//       },
//       _sum: {
//         amount: true,
//       },
//     })

//     const pendingPayouts = pendingPayoutsResult._sum.amount || 0

//     // Calculate conversion rate
//     const totalClicks = await client.affiliateClick.count()
//     const conversionRate = totalClicks > 0 ? (totalReferrals / totalClicks) * 100 : 0

//     // Get monthly performance data for the last 6 months
//     const now = new Date()
//     const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

//     const monthlyReferrals = await client.affiliateReferral.groupBy({
//       by: ["conversionDate"],
//       where: {
//         conversionDate: {
//           gte: sixMonthsAgo,
//         },
//       },
//       _count: {
//         id: true,
//       },
//       _sum: {
//         commissionAmount: true,
//       },
//     })

//     // Format monthly data
//     const monthlyData = []

//     // Create a map for each month
//     const monthMap = new Map()

//     for (let i = 0; i < 6; i++) {
//       const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
//       const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
//       monthMap.set(monthYear, {
//         month: monthYear,
//         referrals: 0,
//         commissions: 0,
//       })
//     }

//     // Fill in the data
//     for (const entry of monthlyReferrals) {
//       const date = new Date(entry.conversionDate)
//       const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`

//       if (monthMap.has(monthYear)) {
//         const data = monthMap.get(monthYear)
//         data.referrals += entry._count.id
//         data.commissions += entry._sum.commissionAmount || 0
//         monthMap.set(monthYear, data)
//       }
//     }

    
//     for (const [_, value] of monthMap) {
//       monthlyData.push(value)
//     }
    

//     monthlyData.reverse() // Most recent month first

//     return NextResponse.json({
//       success: true,
//       stats: {
//         totalPrograms,
//         totalAffiliates,
//         totalReferrals,
//         totalCommissions,
//         pendingPayouts,
//         conversionRate,
//         monthlyPerformance: monthlyData,
//       },
//     })
//   } catch (error) {
//     console.error("Error fetching affiliate metrics:", error)
//     return NextResponse.json({ success: false, message: "Failed to fetch affiliate metrics" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { onCurrentUser } from "@/actions/user"

// Define types for monthly data
interface MonthlyDataEntry {
  month: string;
  referrals: number;
  commissions: number;
}

export async function GET() {
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

    // Get counts
    const totalPrograms = await client.affiliateProgram.count()
    const totalAffiliates = await client.affiliateUser.count()
    const totalReferrals = await client.affiliateReferral.count()

    // Get sum of all commissions
    const commissionsResult = await client.affiliateReferral.aggregate({
      _sum: {
        commissionAmount: true,
      },
    })

    const totalCommissions = commissionsResult._sum.commissionAmount || 0

    // Get pending payouts
    const pendingPayoutsResult = await client.affiliatePayout.aggregate({
      where: {
        status: "pending",
      },
      _sum: {
        amount: true,
      },
    })

    const pendingPayouts = pendingPayoutsResult._sum.amount || 0

    // Calculate conversion rate
    const totalClicks = await client.affiliateClick.count()
    const conversionRate = totalClicks > 0 ? (totalReferrals / totalClicks) * 100 : 0

    // Get monthly performance data for the last 6 months
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    const monthlyReferrals = await client.affiliateReferral.groupBy({
      by: ["conversionDate"],
      where: {
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

    // Create a map for each month
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

    // Convert map to array using Array.from instead of for...of loop
    const monthlyData: MonthlyDataEntry[] = Array.from(monthMap.values())

    // Most recent month first
    monthlyData.reverse()

    return NextResponse.json({
      success: true,
      stats: {
        totalPrograms,
        totalAffiliates,
        totalReferrals,
        totalCommissions,
        pendingPayouts,
        conversionRate,
        monthlyPerformance: monthlyData,
      },
    })
  } catch (error) {
    console.error("Error fetching affiliate metrics:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate metrics" }, { status: 500 })
  }
}