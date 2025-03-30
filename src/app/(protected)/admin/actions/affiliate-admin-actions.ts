// "use server"

// import { revalidatePath } from "next/cache"
// import {client} from "@/lib/client"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/lib/auth"

// export async function createAffiliateProgram(data: {
//     name: string;
//     description?: string;
//     commissionRate: number;
//     cookieDuration: number;
//     minimumPayout: number;
//     termsAndConditions?: string;
//   }) {
//     try {
//       // Ensure the user is an admin
//       const session = await getServerSession(authOptions);
//       if (!session?.user || session.user.role !== "admin") {
//         return {
//           success: false,
//           message: "Unauthorized. Admin access required."
//         };
//       }
      
//       const program = await client.affiliateProgram.create({
//         data: {
//           name: data.name,
//           description: data.description,
//           commissionRate: data.commissionRate,
//           cookieDuration: data.cookieDuration,
//           minimumPayout: data.minimumPayout,
//           termsAndConditions: data.termsAndConditions
//         }
//       });
      
//       revalidatePath("/admin/affiliates");
      
//       return {
//         success: true,
//         program
//       };
//     } catch (error) {
//       console.error("Error creating affiliate program:", error);
//       return {
//         success: false,
//         message: "Failed to create affiliate program."
//       };
//     }
//   }
  
// // Update an affiliate program
// export async function updateAffiliateProgram(
//   programId: string,
//   data: {
//     name?: string
//     description?: string
//     commissionRate?: number
//     cookieDuration?: number
//     minimumPayout?: number
//     status?: string
//     termsAndConditions?: string
//   },
// ) {
//   try {
//     // Ensure the user is an admin
//     const session = await getServerSession(authOptions)
//     if (!session?.user || session.user.role !== "admin") {
//       return {
//         success: false,
//         message: "Unauthorized. Admin access required.",
//       }
//     }

//     const program = await client.affiliateProgram.update({
//       where: { id: programId },
//       data,
//     })

//     revalidatePath("/admin/affiliates")
//     revalidatePath(`/admin/affiliates/${programId}`)

//     return {
//       success: true,
//       program,
//     }
//   } catch (error) {
//     console.error("Error updating affiliate program:", error)
//     return {
//       success: false,
//       message: "Failed to update affiliate program.",
//     }
//   }
// }

// // Delete an affiliate program
// export async function deleteAffiliateProgram(programId: string) {
//   try {
//     // Ensure the user is an admin
//     const session = await getServerSession(authOptions)
//     if (!session?.user || session.user.role !== "admin") {
//       return {
//         success: false,
//         message: "Unauthorized. Admin access required.",
//       }
//     }

//     // Check if there are any affiliates or referrals using this program
//     const affiliatesCount = await client.affiliateUser.count({
//       where: { programId },
//     })

//     if (affiliatesCount > 0) {
//       return {
//         success: false,
//         message: "Cannot delete program with active affiliates.",
//       }
//     }

//     await client.affiliateProgram.delete({
//       where: { id: programId },
//     })

//     revalidatePath("/admin/affiliates")

//     return { success: true }
//   } catch (error) {
//     console.error("Error deleting affiliate program:", error)
//     return {
//       success: false,
//       message: "Failed to delete affiliate program.",
//     }
//   }
// }

// // Approve or reject an affiliate
// export async function updateAffiliateStatus(affiliateId: string, approve: boolean, customCommissionRate?: number) {
//   try {
//     // Ensure the user is an admin
//     const session = await getServerSession(authOptions)
//     if (!session?.user || session.user.role !== "admin") {
//       return {
//         success: false,
//         message: "Unauthorized. Admin access required.",
//       }
//     }

//     const affiliate = await client.affiliateUser.update({
//       where: { id: affiliateId },
//       data: {
//         isApproved: approve,
//         status: approve ? "active" : "rejected",
//         commissionRate: customCommissionRate,
//       },
//     })

//     revalidatePath("/admin/affiliates")
//     revalidatePath("/admin/affiliates/users")

//     return {
//       success: true,
//       affiliate,
//     }
//   } catch (error) {
//     console.error("Error updating affiliate status:", error)
//     return {
//       success: false,
//       message: "Failed to update affiliate status.",
//     }
//   }
// }

// // Process a payout
// export async function processAffiliatePayout(
//   payoutId: string,
//   status: "processing" | "completed" | "failed",
//   transactionId?: string,
//   notes?: string,
// ) {
//   try {
//     // Ensure the user is an admin
//     const session = await getServerSession(authOptions)
//     if (!session?.user || session.user.role !== "admin") {
//       return {
//         success: false,
//         message: "Unauthorized. Admin access required.",
//       }
//     }

//     const payout = await client.affiliatePayout.update({
//       where: { id: payoutId },
//       data: {
//         status,
//         transactionId,
//         notes: notes ? `${notes}` : undefined,
//         processedAt: status === "completed" ? new Date() : undefined,
//       },
//     })

//     revalidatePath("/admin/affiliates/payouts")

//     return {
//       success: true,
//       payout,
//     }
//   } catch (error) {
//     console.error("Error processing affiliate payout:", error)
//     return {
//       success: false,
//       message: "Failed to process payout.",
//     }
//   }
// }

// // Get affiliate system statistics for admin dashboard
// export async function getAffiliateSystemStats() {
//   try {
//     // Ensure the user is an admin
//     const session = await getServerSession(authOptions)
//     if (!session?.user || session.user.role !== "admin") {
//       return {
//         success: false,
//         message: "Unauthorized. Admin access required.",
//       }
//     }

//     const [
//       totalPrograms,
//       totalAffiliates,
//       totalReferrals,
//       totalCommissions,
//       pendingPayouts,
//       conversionRate,
//       monthlyStats,
//     ] = await Promise.all([
//       client.affiliateProgram.count(),
//       client.affiliateUser.count(),
//       client.affiliateReferral.count(),
//       client.affiliateReferral.aggregate({
//         _sum: {
//           commissionAmount: true,
//         },
//       }),
//       client.affiliatePayout.count({
//         where: { status: "pending" },
//       }),
//       client.affiliateClick.count().then(async (totalClicks) => {
//         const conversions = await client.affiliateReferral.count()
//         return totalClicks > 0 ? (conversions / totalClicks) * 100 : 0
//       }),
//       getMonthlyPerformance(),
//     ])

//     return {
//       success: true,
//       stats: {
//         totalPrograms,
//         totalAffiliates,
//         totalReferrals,
//         totalCommissions: totalCommissions._sum.commissionAmount || 0,
//         pendingPayouts,
//         conversionRate,
//         monthlyPerformance: monthlyStats,
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching affiliate system stats:", error)
//     return {
//       success: false,
//       message: "Failed to fetch affiliate system statistics.",
//     }
//   }
// }

// // Get monthly performance data for charts
// async function getMonthlyPerformance() {
//   const now = new Date()
//   const monthsAgo = new Date()
//   monthsAgo.setMonth(now.getMonth() - 11) // Last 12 months

//   // Get referrals by month
//   const referrals = await client.affiliateReferral.findMany({
//     where: {
//       conversionDate: {
//         gte: monthsAgo,
//       },
//     },
//     select: {
//       conversionDate: true,
//       commissionAmount: true,
//     },
//   })

//   // Get clicks by month
//   const clicks = await client.affiliateClick.findMany({
//     where: {
//       timestamp: {
//         gte: monthsAgo,
//       },
//     },
//     select: {
//       timestamp: true,
//       converted: true,
//     },
//   })

//   // Organize data by month
//   const monthlyData = {}

//   for (let i = 0; i < 12; i++) {
//     const month = new Date(monthsAgo)
//     month.setMonth(monthsAgo.getMonth() + i)
//     const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`

//     monthlyData[monthKey] = {
//       month: month.toLocaleString("default", { month: "short" }),
//       year: month.getFullYear(),
//       clicks: 0,
//       referrals: 0,
//       commissions: 0,
//     }
//   }

//   // Process referrals
//   for (const referral of referrals) {
//     const month = referral.conversionDate.getMonth() + 1
//     const year = referral.conversionDate.getFullYear()
//     const key = `${year}-${month}`

//     if (monthlyData[key]) {
//       monthlyData[key].referrals++
//       monthlyData[key].commissions += referral.commissionAmount
//     }
//   }

//   // Process clicks
//   for (const click of clicks) {
//     const month = click.timestamp.getMonth() + 1
//     const year = click.timestamp.getFullYear()
//     const key = `${year}-${month}`

//     if (monthlyData[key]) {
//       monthlyData[key].clicks++
//     }
//   }

//   return Object.values(monthlyData)
// }

"use server"

import { revalidatePath } from "next/cache"
import { client } from "@/lib/prisma"
import { isCurrentUserAdmin } from "@/actions/user"

// Define types for the monthly data
export type MonthlyData = {
  month: string
  year: number
  clicks: number
  referrals: number
  commissions: number
}

export async function createAffiliateProgram(data: {
  name: string
  description?: string
  commissionRate: number
  cookieDuration: number
  minimumPayout: number
  termsAndConditions?: string
}) {
  try {
    // Ensure the user is an admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized. Admin access required.",
      }
    }

    const program = await client.affiliateProgram.create({
      data: {
        name: data.name,
        description: data.description,
        commissionRate: data.commissionRate,
        cookieDuration: data.cookieDuration,
        minimumPayout: data.minimumPayout,
        termsAndConditions: data.termsAndConditions,
      },
    })

    revalidatePath("/admin/affiliates")

    return {
      success: true,
      program,
    }
  } catch (error) {
    console.error("Error creating affiliate program:", error)
    return {
      success: false,
      message: "Failed to create affiliate program.",
    }
  }
}

// Update an affiliate program
export async function updateAffiliateProgram(
  programId: string,
  data: {
    name?: string
    description?: string
    commissionRate?: number
    cookieDuration?: number
    minimumPayout?: number
    status?: string
    termsAndConditions?: string
  },
) {
  try {
    // Ensure the user is an admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized. Admin access required.",
      }
    }

    const program = await client.affiliateProgram.update({
      where: { id: programId },
      data,
    })

    revalidatePath("/admin/affiliates")
    revalidatePath(`/admin/affiliates/${programId}`)

    return {
      success: true,
      program,
    }
  } catch (error) {
    console.error("Error updating affiliate program:", error)
    return {
      success: false,
      message: "Failed to update affiliate program.",
    }
  }
}

// Delete an affiliate program
export async function deleteAffiliateProgram(programId: string) {
  try {
    // Ensure the user is an admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized. Admin access required.",
      }
    }

    // Check if there are any affiliates or referrals using this program
    const affiliatesCount = await client.affiliateUser.count({
      where: { programId },
    })

    if (affiliatesCount > 0) {
      return {
        success: false,
        message: "Cannot delete program with active affiliates.",
      }
    }

    await client.affiliateProgram.delete({
      where: { id: programId },
    })

    revalidatePath("/admin/affiliates")

    return { success: true }
  } catch (error) {
    console.error("Error deleting affiliate program:", error)
    return {
      success: false,
      message: "Failed to delete affiliate program.",
    }
  }
}

// Approve or reject an affiliate
export async function updateAffiliateStatus(affiliateId: string, approve: boolean, customCommissionRate?: number) {
  try {
    // Ensure the user is an admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized. Admin access required.",
      }
    }

    const affiliate = await client.affiliateUser.update({
      where: { id: affiliateId },
      data: {
        isApproved: approve,
        status: approve ? "active" : "rejected",
        commissionRate: customCommissionRate,
      },
    })

    revalidatePath("/admin/affiliates")
    revalidatePath("/admin/affiliates/users")

    return {
      success: true,
      affiliate,
    }
  } catch (error) {
    console.error("Error updating affiliate status:", error)
    return {
      success: false,
      message: "Failed to update affiliate status.",
    }
  }
}

// Process a payout
export async function processAffiliatePayout(
  payoutId: string,
  status: "processing" | "completed" | "failed",
  transactionId?: string,
  notes?: string,
) {
  try {
    // Ensure the user is an admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized. Admin access required.",
      }
    }

    const payout = await client.affiliatePayout.update({
      where: { id: payoutId },
      data: {
        status,
        transactionId,
        notes: notes ? `${notes}` : undefined,
        processedAt: status === "completed" ? new Date() : undefined,
      },
    })

    revalidatePath("/admin/affiliates/payouts")

    return {
      success: true,
      payout,
    }
  } catch (error) {
    console.error("Error processing affiliate payout:", error)
    return {
      success: false,
      message: "Failed to process payout.",
    }
  }
}

// Get affiliate system statistics for admin dashboard
export async function getAffiliateSystemStats() {
  try {
    // Ensure the user is an admin
    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized. Admin access required.",
      }
    }

    const totalPrograms = await client.affiliateProgram.count()||0
    const totalAffiliates = await client.affiliateUser.count()||0
    const totalReferrals = await client.affiliateReferral.count()||0

    const totalCommissions = await client.affiliateReferral.aggregate({
      _sum: {
        commissionAmount: true,
      },
    })

    const pendingPayouts = await client.affiliatePayout.count({
      where: { status: "pending" },
    })||0

    const totalClicks = await client.affiliateClick.count()||0
    const conversions = await client.affiliateReferral.count()||0
    const conversionRate = totalClicks > 0 ? (conversions / totalClicks) * 100 : 0

    const monthlyStats = await getMonthlyPerformance()

    return {
      success: true,
      stats: {
        totalPrograms,
        totalAffiliates,
        totalReferrals,
        totalCommissions: totalCommissions._sum.commissionAmount || 0,
        pendingPayouts,
        conversionRate,
        monthlyPerformance: monthlyStats,
      },
    }
  } catch (error) {
    console.error("Error fetching affiliate system stats:", error)
    return {
      success: false,
      message: "Failed to fetch affiliate system statistics.",
    }
  }
}

// Get monthly performance data for charts
async function getMonthlyPerformance(): Promise<MonthlyData[]> {
  const now = new Date()
  const monthsAgo = new Date()
  monthsAgo.setMonth(now.getMonth() - 11) // Last 12 months

  // Get referrals by month
  const referrals = await client.affiliateReferral.findMany({
    where: {
      conversionDate: {
        gte: monthsAgo,
      },
    },
    select: {
      conversionDate: true,
      commissionAmount: true,
    },
  })

  // Get clicks by month
  const clicks = await client.affiliateClick.findMany({
    where: {
      timestamp: {
        gte: monthsAgo,
      },
    },
    select: {
      timestamp: true,
      converted: true,
    },
  })

  // Organize data by month
  const monthlyData: Record<string, MonthlyData> = {}

  for (let i = 0; i < 12; i++) {
    const month = new Date(monthsAgo)
    month.setMonth(monthsAgo.getMonth() + i)
    const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`

    monthlyData[monthKey] = {
      month: month.toLocaleString("default", { month: "short" }),
      year: month.getFullYear(),
      clicks: 0,
      referrals: 0,
      commissions: 0,
    }
  }

  // Process referrals
  for (const referral of referrals) {
    const month = referral.conversionDate.getMonth() + 1
    const year = referral.conversionDate.getFullYear()
    const key = `${year}-${month}`

    if (monthlyData[key]) {
      monthlyData[key].referrals++
      monthlyData[key].commissions += referral.commissionAmount
    }
  }

  // Process clicks
  for (const click of clicks) {
    const month = click.timestamp.getMonth() + 1
    const year = click.timestamp.getFullYear()
    const key = `${year}-${month}`

    if (monthlyData[key]) {
      monthlyData[key].clicks++
    }
  }

  return Object.values(monthlyData)
}

