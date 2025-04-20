"use server"

import { revalidatePath } from "next/cache"
import { client } from "@/lib/prisma"
import { onUserInfor } from "@/actions/user"


// Get all opportunities available for an influencer
export async function getAvailableOpportunities(
  filters: {
    category?: string[]
    budget?: { min: number; max: number }
    platform?: string[]
    location?: string[]
  } = {},
) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get influencer profile
    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 403, message: "Influencer profile not found" }
    }

    let categoryFilter = {}
    if (filters.category && filters.category.length > 0) {
      categoryFilter = {
        category: {
          in: filters.category,
        },
      }
    }

    let budgetFilter = {}
    if (filters.budget) {
      budgetFilter = {
        AND: [{ budgetMin: { gte: filters.budget.min } }, { budgetMax: { lte: filters.budget.max } }],
      }
    }

    let platformFilter = {}
    if (filters.platform && filters.platform.length > 0) {
      platformFilter = {
        platforms: {
          hasSome: filters.platform,
        },
      }
    }

    let locationFilter = {}
    if (filters.location && filters.location.length > 0) {
      locationFilter = {
        location: {
          in: filters.location,
        },
      }
    }

    // Get opportunities that match the influencer's profile
    const opportunities = await client.opportunity.findMany({
      where: {
        isPublic: true,
        status: "OPEN",
        ...categoryFilter,
        ...budgetFilter,
        ...platformFilter,
        ...locationFilter,
        // Match influencer criteria
        minFollowers: { lte: influencer.followers },
        ...(influencer.engagementRate ? { minEngagementRate: { lte: influencer.engagementRate } } : {}),
        // Exclude opportunities the influencer has already applied to
        NOT: {
          applications: {
            some: {
              influencerId: influencer.id,
            },
          },
        },
      },
      include: {
        business: {
          select: {
            businessName: true,
            logo: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { status: 200, data: opportunities }
  } catch (error) {
    console.error("Error fetching available opportunities:", error)
    return { status: 500, message: "Failed to fetch available opportunities" }
  }
}

// Get all applications made by an influencer
export async function getMyApplications() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get influencer profile
    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 403, message: "Influencer profile not found" }
    }

    const applications = await client.application.findMany({
      where: {
        influencerId: influencer.id,
      },
      include: {
        opportunity: {
          include: {
            business: {
              select: {
                businessName: true,
                logo: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { status: 200, data: applications }
  } catch (error) {
    console.error("Error fetching applications:", error)
    return { status: 500, message: "Failed to fetch applications" }
  }
}

// Apply to an opportunity
export async function applyToOpportunity(opportunityId: string, message: string, proposal: number) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get influencer profile
    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 403, message: "Influencer profile not found" }
    }

    // Check if opportunity exists and is public
    const opportunity = await client.opportunity.findUnique({
      where: {
        id: opportunityId,
        isPublic: true,
        status: "OPEN",
      },
    })

    if (!opportunity) {
      return { status: 404, message: "Opportunity not found or not available" }
    }

    // Check if already applied
    const existingApplication = await client.application.findFirst({
      where: {
        opportunityId,
        influencerId: influencer.id,
      },
    })

    if (existingApplication) {
      return { status: 400, message: "You have already applied to this opportunity" }
    }

    // Create application
    const application = await client.application.create({
      data: {
        opportunityId,
        influencerId: influencer.id,
        message,
        proposal,
        status: "PENDING",
      },
    })

    revalidatePath("/opportunities")
    return { status: 200, data: application }
  } catch (error) {
    console.error("Error applying to opportunity:", error)
    return { status: 500, message: "Failed to apply to opportunity" }
  }
}

// Withdraw an application
export async function withdrawApplication(applicationId: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get influencer profile
    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 403, message: "Influencer profile not found" }
    }

    // Check if application exists and belongs to the influencer
    const application = await client.application.findUnique({
      where: {
        id: applicationId,
        influencerId: influencer.id,
      },
    })

    if (!application) {
      return { status: 404, message: "Application not found" }
    }

    // Delete application
    await client.application.delete({
      where: {
        id: applicationId,
      },
    })

    revalidatePath("/opportunities")
    return { status: 200, message: "Application withdrawn successfully" }
  } catch (error) {
    console.error("Error withdrawing application:", error)
    return { status: 500, message: "Failed to withdraw application" }
  }
}

// Get application statistics for an influencer
export async function getApplicationStats() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get influencer profile
    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 403, message: "Influencer profile not found" }
    }

    const [totalCount, pendingCount, acceptedCount, rejectedCount] = await Promise.all([
      client.application.count({
        where: {
          influencerId: influencer.id,
        },
      }),
      client.application.count({
        where: {
          influencerId: influencer.id,
          status: "PENDING",
        },
      }),
      client.application.count({
        where: {
          influencerId: influencer.id,
          status: "ACCEPTED",
        },
      }),
      client.application.count({
        where: {
          influencerId: influencer.id,
          status: "REJECTED",
        },
      }),
    ])

    return {
      status: 200,
      data: {
        total: totalCount,
        pending: pendingCount,
        accepted: acceptedCount,
        rejected: rejectedCount,
        acceptanceRate: totalCount > 0 ? (acceptedCount / totalCount) * 100 : 0,
      },
    }
  } catch (error) {
    console.error("Error fetching application stats:", error)
    return { status: 500, message: "Failed to fetch application stats" }
  }
}
