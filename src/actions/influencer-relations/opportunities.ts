"use server"

import { revalidatePath } from "next/cache"
import { client } from "@/lib/prisma"
import { onUserInfor } from "@/actions/user"

// Create new opportunity
export async function createOpportunity(data: any) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Check if user has a business profile
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "You need a business profile to create opportunities" }
    }

    const opportunity = await client.opportunity.create({
      data: {
        title: data.title,
        budget:data.budget,
        // brandName:data.businessName,
        brandName:"businessName",
        description: data.description,
        category: data.category,
        budgetMin: data.budget.min,
        budgetMax: data.budget.max,
        deadline: data.deadline,
        platforms: data.platforms,
        requirements: data.requirements,
        isPublic: data.isPublic,
        location: data.location,
        minFollowers: data.minFollowers,
        maxFollowers: data.maxFollowers,
        minEngagementRate: data.minEngagementRate,
        contentType: data.contentType,
        status: "OPEN",
        businessId: business.id,
      },
    })

    revalidatePath("/opportunities")
    return { status: 200, data: opportunity }
  } catch (error) {
    console.error("Error creating opportunity:", error)
    return { status: 500, message: "Failed to create opportunity" }
  }
}

// Get all opportunities with filters
export async function getOpportunities(
  status = "all",
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

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    let statusFilter = {}
    if (status !== "all") {
      if (status === "active") {
        statusFilter = { status: "OPEN" }
      } else if (status === "draft") {
        statusFilter = { status: "DRAFT" }
      } else if (status === "archived") {
        statusFilter = { status: "CLOSED" }
      }
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

    const opportunities = await client.opportunity.findMany({
      where: {
        businessId: business.id,
        ...statusFilter,
        ...categoryFilter,
        ...budgetFilter,
        ...platformFilter,
        ...locationFilter,
      },
      include: {
        applications: {
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { status: 200, data: opportunities }
  } catch (error) {
    console.error("Error fetching opportunities:", error)
    return { status: 500, message: "Failed to fetch opportunities" }
  }
}

// Get opportunity by ID
export async function getOpportunity(id: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    const opportunity = await client.opportunity.findUnique({
      where: {
        id,
        businessId: business.id,
      },
      include: {
        applications: {
          include: {
            influencer: {
              select: {
                id: true,
                name: true,
                username: true,
                profilePicture: true,
                followers: true,
                engagementRate: true,
                niche: true,
                platforms: true,
              },
            },
          },
        },
      },
    })

    if (!opportunity) {
      return { status: 404, message: "Opportunity not found" }
    }

    return { status: 200, data: opportunity }
  } catch (error) {
    console.error("Error fetching opportunity:", error)
    return { status: 500, message: "Failed to fetch opportunity" }
  }
}

// Update opportunity
export async function updateOpportunity(id: string, data: any) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    const opportunity = await client.opportunity.update({
      where: {
        id,
        businessId: business.id,
      },
      data: {
        title: data.title,
        brandName:"businessName",
        description: data.description,
        category: data.category,
        budgetMin: data.budget.min,
        budgetMax: data.budget.max,
        deadline: data.deadline,
        platforms: data.platforms,
        requirements: data.requirements,
        isPublic: data.isPublic,
        location: data.location,
        minFollowers: data.minFollowers,
        maxFollowers: data.maxFollowers,
        minEngagementRate: data.minEngagementRate,
        contentType: data.contentType,
      },
    })

    revalidatePath(`/opportunities/${id}`)
    revalidatePath("/opportunities")
    return { status: 200, data: opportunity }
  } catch (error) {
    console.error("Error updating opportunity:", error)
    return { status: 500, message: "Failed to update opportunity" }
  }
}

// Delete opportunity
export async function deleteOpportunity(id: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    await client.opportunity.delete({
      where: {
        id,
        businessId: business.id,
      },
    })

    revalidatePath("/opportunities")
    return { status: 200, message: "Opportunity deleted successfully" }
  } catch (error) {
    console.error("Error deleting opportunity:", error)
    return { status: 500, message: "Failed to delete opportunity" }
  }
}

// Get opportunity stats
export async function getOpportunityStats() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    const [allCount, activeCount, draftCount, archivedCount, applicationsCount] = await Promise.all([
      client.opportunity.count({
        where: {
          businessId: business.id,
        },
      }),
      client.opportunity.count({
        where: {
          businessId: business.id,
          status: "OPEN",
        },
      }),
      client.opportunity.count({
        where: {
          businessId: business.id,
          status: "DRAFT",
        },
      }),
      client.opportunity.count({
        where: {
          businessId: business.id,
          status: "CLOSED",
        },
      }),
      client.application.count({
        where: {
          opportunity: {
            businessId: business.id,
          },
        },
      }),
    ])

    return {
      status: 200,
      data: {
        all: allCount,
        active: activeCount,
        draft: draftCount,
        archived: archivedCount,
        applications: applicationsCount,
      },
    }
  } catch (error) {
    console.error("Error fetching opportunity stats:", error)
    return { status: 500, message: "Failed to fetch opportunity stats" }
  }
}

// Get applications for an opportunity
export async function getOpportunityApplications(opportunityId: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    // First check if the opportunity belongs to the user
    const opportunity = await client.opportunity.findUnique({
      where: {
        id: opportunityId,
        businessId: business.id,
      },
      select: { id: true },
    })

    if (!opportunity) {
      return { status: 404, message: "Opportunity not found" }
    }

    const applications = await client.application.findMany({
      where: {
        opportunityId,
      },
      include: {
        influencer: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePicture: true,
            followers: true,
            engagementRate: true,
            niche: true,
            platforms: true,
            location: true,
            rating: true,
            totalEarnings: true,
            completedCampaigns: true,
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

// Get recommended influencers
export async function getRecommendedInfluencers(criteria: {
  category?: string
  platforms?: string[]
  location?: string
  minFollowers?: number
  maxFollowers?: number
  minEngagementRate?: number
}) {
  try {
    let categoryFilter = {}
    if (criteria.category) {
      categoryFilter = {
        niche: {
          contains: criteria.category,
          mode: "insensitive",
        },
      }
    }

    let platformFilter = {}
    if (criteria.platforms && criteria.platforms.length > 0) {
      platformFilter = {
        platforms: {
          hasSome: criteria.platforms,
        },
      }
    }

    let locationFilter = {}
    if (criteria.location) {
      locationFilter = {
        location: {
          contains: criteria.location,
          mode: "insensitive",
        },
      }
    }

    let followersFilter = {}
    if (criteria.minFollowers || criteria.maxFollowers) {
      followersFilter = {
        followers: {
          ...(criteria.minFollowers ? { gte: criteria.minFollowers } : {}),
          ...(criteria.maxFollowers ? { lte: criteria.maxFollowers } : {}),
        },
      }
    }

    let engagementFilter = {}
    if (criteria.minEngagementRate) {
      engagementFilter = {
        engagementRate: {
          gte: criteria.minEngagementRate,
        },
      }
    }

    const influencers = await client.influencer.findMany({
      where: {
        ...categoryFilter,
        ...platformFilter,
        ...locationFilter,
        ...followersFilter,
        ...engagementFilter,
        isAvailableForHire: true,
      },
      select: {
        id: true,
        name: true,
        username: true,
        profilePicture: true,
        followers: true,
        engagementRate: true,
        niche: true,
        platforms: true,
        location: true,
        rating: true,
        totalEarnings: true,
        completedCampaigns: true,
      },
      orderBy: [
        {
          rating: "desc",
        },
        {
          engagementRate: "desc",
        },
      ],
      take: 10,
    })

    // Select top 5 with highest compatibility score
    const scoredInfluencers = influencers.map((influencer) => {
      let score = 0

      // Niche/category match (0-40 points)
      if (criteria.category && influencer.niche?.toLowerCase().includes(criteria.category.toLowerCase())) {
        score += 40
      }

      // Platform match (0-20 points)
      if (criteria.platforms && criteria.platforms.length > 0) {
        const platformMatches = criteria.platforms.filter((p) => influencer.platforms.includes(p)).length
        score += (platformMatches / criteria.platforms.length) * 20
      }

      // Location match (0-10 points)
      if (criteria.location && influencer.location?.toLowerCase().includes(criteria.location.toLowerCase())) {
        score += 10
      }

      // Rating (0-20 points)
      score += (influencer.rating / 5) * 20

      // Engagement rate bonus (0-10 points)
      if (influencer.engagementRate > 5) {
        score += 10
      } else if (influencer.engagementRate > 3) {
        score += 5
      }

      return {
        ...influencer,
        compatibilityScore: Math.round(score),
      }
    })

    // Sort by compatibility score and take top 5
    const topInfluencers = scoredInfluencers.sort((a, b) => b.compatibilityScore - a.compatibilityScore).slice(0, 5)

    return { status: 200, data: topInfluencers }
  } catch (error) {
    console.error("Error fetching recommended influencers:", error)
    return { status: 500, message: "Failed to fetch recommended influencers" }
  }
}

// Update application status
export async function updateApplicationStatus(applicationId: string, status: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    // First check if the application belongs to an opportunity owned by the user
    const application = await client.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        opportunity: {
          select: {
            businessId: true,
            id: true,
          },
        },
      },
    })

    if (!application) {
      return { status: 404, message: "Application not found" }
    }

    if (application.opportunity.businessId !== business.id) {
      return { status: 403, message: "Not authorized to update this application" }
    }

    const updatedApplication = await client.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
    })

    // If accepting the application, update the influencer's completedCampaigns count
    if (status === "ACCEPTED") {
      await client.influencer.update({
        where: {
          id: application.influencerId,
        },
        data: {
          completedCampaigns: {
            increment: 1,
          },
        },
      })
    }

    revalidatePath(`/opportunities/${application.opportunity.id}`)
    return { status: 200, data: updatedApplication }
  } catch (error) {
    console.error("Error updating application status:", error)
    return { status: 500, message: "Failed to update application status" }
  }
}

// Vote for an influencer
export async function voteForInfluencer(influencerId: string, rating: number) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    // Get business ID
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 403, message: "Business profile not found" }
    }

    // Check if user has already voted for this influencer
    const existingVote = await client.influencerRating.findUnique({
      where: {
        businessId_influencerId: {
          businessId: business.id,
          influencerId,
        },
      },
    })

    if (existingVote) {
      // Update existing vote
      await client.influencerRating.update({
        where: {
          businessId_influencerId: {
            businessId: business.id,
            influencerId,
          },
        },
        data: {
          rating,
        },
      })
    } else {
      // Create new vote
      await client.influencerRating.create({
        data: {
          businessId: business.id,
          influencerId,
          rating,
        },
      })
    }

    // Update influencer's average rating
    const ratings = await client.influencerRating.findMany({
      where: {
        influencerId,
      },
      select: {
        rating: true,
      },
    })

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length

    await client.influencer.update({
      where: {
        id: influencerId,
      },
      data: {
        rating: averageRating,
      },
    })

    return { status: 200, message: "Rating submitted successfully" }
  } catch (error) {
    console.error("Error voting for influencer:", error)
    return { status: 500, message: "Failed to submit rating" }
  }
}

// Apply to an opportunity (for influencers)
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

    return { status: 200, data: application }
  } catch (error) {
    console.error("Error applying to opportunity:", error)
    return { status: 500, message: "Failed to apply to opportunity" }
  }
}



/////

// "use server"

// import { revalidatePath } from "next/cache"
// import { client } from "@/lib/prisma"
// import { onUserInfor } from "@/actions/user"

/**
 * Get available opportunities for influencers with optional filters
 */
export async function getAvailableOpportunities(
  filters: {
    category?: string[]
    budget?: { min: number; max: number } | null
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

    // Build filters
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

    // Get opportunities that match the influencer's profile and are public
    const opportunities = await client.opportunity.findMany({
      where: {
        isPublic: true,
        status: "OPEN",
        // Ensure influencer meets minimum requirements
        minFollowers: { lte: influencer.followers || 0 },
        minEngagementRate: { lte: influencer.engagementRate || 0 },
        // Ensure influencer hasn't already applied
        applications: {
          none: {
            influencerId: influencer.id,
          },
        },
        // Apply filters
        ...categoryFilter,
        ...budgetFilter,
        ...platformFilter,
        ...locationFilter,
      },
      include: {
        business: {
          select: {
            businessName: true,
            // companyName: true,
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

/**
 * Get applications submitted by the current influencer
 */
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

    // Get all applications by this influencer
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
                // companyName: true,
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

/**
 * Withdraw an application
 */
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

    // Check if application exists and belongs to this influencer
    const application = await client.application.findFirst({
      where: {
        id: applicationId,
        influencerId: influencer.id,
        status: "PENDING", // Can only withdraw pending applications
      },
    })

    if (!application) {
      return { status: 404, message: "Application not found or cannot be withdrawn" }
    }

    // Delete the application
    await client.application.delete({
      where: {
        id: applicationId,
      },
    })

    revalidatePath("/opportunities/applied")
    return { status: 200, message: "Application withdrawn successfully" }
  } catch (error) {
    console.error("Error withdrawing application:", error)
    return { status: 500, message: "Failed to withdraw application" }
  }
}

/**
 * Get opportunity details for influencers
 */
export async function getOpportunityDetails(opportunityId: string) {
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

    // Get opportunity details
    const opportunity = await client.opportunity.findUnique({
      where: {
        id: opportunityId,
        isPublic: true,
      },
      include: {
        business: {
          select: {
            businessName: true,
            // companyName: true,
            logo: true,
            industry: true,
            website: true,
            location: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    })

    if (!opportunity) {
      return { status: 404, message: "Opportunity not found" }
    }

    // Check if influencer has already applied
    const application = await client.application.findFirst({
      where: {
        opportunityId,
        influencerId: influencer.id,
      },
    })

    return {
      status: 200,
      data: {
        ...opportunity,
        hasApplied: !!application,
        application: application || null,
      },
    }
  } catch (error) {
    console.error("Error fetching opportunity details:", error)
    return { status: 500, message: "Failed to fetch opportunity details" }
  }
}
