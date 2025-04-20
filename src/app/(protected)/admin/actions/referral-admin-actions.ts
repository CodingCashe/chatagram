"use server"

import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getReferralPrograms() {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  // Get all referral programs with counts
  const programs = await client.referralProgram.findMany({
    include: {
      _count: {
        select: {
          referralCodes: true,
          referrals: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return programs
}

export async function getReferralStats() {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  // Get total users
  const totalUsers = await client.user.count()

  // // Get users with referral codes
  // const usersWithReferralCode = await client.referralCode.count({
  //   distinct: ["userId"],
  // })
  const usersWithReferralCode = await client.user.count({
    where: {
      referralCodes: {
        some: {}
      }
    }
  })

  // Get total clicks
  const totalClicks = await client.referralClick.count()

  // Get successful referrals
  const successfulReferrals = await client.referral.count({
    where: { status: "CONVERTED" },
  })

  // Get pending referrals
  const pendingReferrals = await client.referral.count({
    where: { status: "PENDING" },
  })

  // Get total commissions
  const commissionsResult = await client.referral.aggregate({
    where: { status: "CONVERTED" },
    _sum: { commissionAmount: true },
  })

  // Get pending commissions
  const pendingCommissionsResult = await client.referral.aggregate({
    where: {
      status: "CONVERTED",
      commissionPaid: false,
    },
    _sum: { commissionAmount: true },
  })

  const totalCommissions = commissionsResult._sum.commissionAmount || 0
  const pendingCommissions = pendingCommissionsResult._sum.commissionAmount || 0

  // Calculate conversion rate
  const clickConversionRate = totalClicks > 0 ? (successfulReferrals / totalClicks) * 100 : 0

  return {
    totalUsers,
    usersWithReferralCode,
    totalClicks,
    successfulReferrals,
    pendingReferrals,
    totalCommissions,
    pendingCommissions,
    clickConversionRate,
  }
}

export async function getReferralProgram(id: string) {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  const program = await client.referralProgram.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          referralCodes: true,
          referrals: true,
        },
      },
    },
  })

  if (!program) {
    throw new Error("Referral program not found")
  }

  return program
}

export async function createReferralProgram(data: {
  name: string
  description?: string
  commissionType: "PERCENTAGE" | "FIXED_AMOUNT"
  commissionValue: number
  minimumPayout: number
  active: boolean
}) {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  const program = await client.referralProgram.create({
    data,
  })

  revalidatePath("/admin/referrals")
  return program
}

export async function updateReferralProgram(
  id: string,
  data: {
    name: string
    description?: string
    commissionType: "PERCENTAGE" | "FIXED_AMOUNT"
    commissionValue: number
    minimumPayout: number
    active: boolean
  },
) {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  const program = await client.referralProgram.update({
    where: { id },
    data,
  })

  revalidatePath("/admin/referrals")
  revalidatePath(`/admin/referrals/${id}`)
  return program
}

export async function deleteReferralProgram(id: string) {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  // Check if there are any referrals using this program
  const referralsCount = await client.referral.count({
    where: { programId: id },
  })

  if (referralsCount > 0) {
    throw new Error("Cannot delete program with existing referrals")
  }

  await client.referralProgram.delete({
    where: { id },
  })

  revalidatePath("/admin/referrals")
  return true
}

export async function getReferralsByProgram(programId: string) {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  const referrals = await client.referral.findMany({
    where: { programId },
    include: {
      referrer: {
        select: {
          email: true,
          firstname: true,
          lastname: true,
        },
      },
      referredUser: {
        select: {
          email: true,
          firstname: true,
          lastname: true,
        },
      },
      referralCode: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return referrals
}

export async function processCommissionPayouts() {
  const user = await currentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const dbUser = await client.user.findUnique({
    where: { clerkId: user.id },
    select: { isAdmin: true },
  })

  if (!dbUser?.isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }

  // Get all pending payouts
  const pendingPayouts = await client.commissionPayout.findMany({
    where: { status: "PENDING" },
    include: {
      user: {
        select: {
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  })

  // Process each payout (in a real app, this would integrate with a payment provider)
  const processedPayouts = await Promise.all(
    pendingPayouts.map(async (payout) => {
      // Simulate payment processing
      // In a real app, you would call your payment provider's API here

      // Update payout status
      return client.commissionPayout.update({
        where: { id: payout.id },
        data: {
          status: "COMPLETED",
          processedDate: new Date(),
        },
      })
    }),
  )

  revalidatePath("/admin/referrals")
  return processedPayouts
}

