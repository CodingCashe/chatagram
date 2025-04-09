"use server"

import { client } from "@/lib/prisma"
import { onCurrentUser } from "../user"
import { revalidatePath } from "next/cache"

type ImageUploadSuccess = {
  status: 200;
  data: {
    url: string;
  };
};

type ImageUploadError = {
  status: 401 | 500;
  data: string;
};

type ImageUploadResponse = ImageUploadSuccess | ImageUploadError;

type SuccessResponse = {
  status: 200;
  data: {
    platform: string;
    username: string;
  };
};

type ErrorResponse = {
  status: 401 | 500;
  data: string;
};

type ConnectSocialResponse = SuccessResponse | ErrorResponse;


interface Opportunity {
  id: string;
  title: string;
  brand: string;
  description: string;
  platform: string;
  contentType: string[];
  // contentType: string;
  budget: number;
  deadline: Date | null;
  status: string;
}

interface ApiResponse {
  status: number;
  data: {
    opportunities: Opportunity[];
  };
}

// Then in your function:

// Influencer Profile Actions
// export const getInfluencerProfile = async (userId?: string) => {
//   try {
//     const user = userId ? { id: userId } : await onCurrentUser()

//     const profile = await client.influencer.findUnique({
//       where: { userId: user.id },
//       include: {
//         socialAccounts: true,
//         contentTypes: true,
//         contentSamples: true,
//         rates: true,
//         metrics: {
//           orderBy: { date: "desc" },
//           take: 1,
//         },
//       },
//     })

//     return { status: 200, data: profile }
//   } catch (error) {
//     console.error("Error fetching influencer profile:", error)
//     return { status: 500, data: null, error: "Failed to fetch influencer profile" }
//   }
// }
export const getInfluencerProfile = async (userId?: string) => {
  try {
    const user = userId ? { id: userId } : await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
      include: {
        socialAccounts: true,
        contentTypes: true,
        contentSamples: true,
        rates: true,
        metrics: {
          orderBy: { date: "desc" },
          take: 1,
        },
      },
    })

    return { status: 200, data: profile }
  } catch (error) {
    console.error("Error fetching influencer profile:", error)
    return { status: 500, data: null, error: "Failed to fetch influencer profile" }
  }
}

export const createInfluencerProfile = async (data: {
  name: string
  username: string
  bio?: string
  location?: string
  niche?: string
  tags?: string[]
  profilePicture?: string
  platforms?: string[]
}) => {
  try {
    const user = await onCurrentUser()

    // Check if profile already exists
    const existingProfile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (existingProfile) {
      return { status: 400, error: "Profile already exists" }
    }

    // Check if username is taken
    const usernameExists = await client.influencer.findUnique({
      where: { username: data.username },
    })

    if (usernameExists) {
      return { status: 400, error: "Username already taken" }
    }

    const profile = await client.influencer.create({
      data: {
        ...data,
        userId: user.id,
        tags: data.tags || [],
        platforms: data.platforms || [],
      },
    })

    revalidatePath("/influencer-hub")
    return { status: 201, data: profile }
  } catch (error) {
    console.error("Error creating influencer profile:", error)
    return { status: 500, error: "Failed to create influencer profile" }
  }
}

export const updateInfluencerProfile = async (data: {
  name?: string
  username?: string
  bio?: string
  location?: string
  niche?: string
  tags?: string[]
  profilePicture?: string
  platforms?: string[]
  isAvailableForHire?: boolean
}) => {
  try {
    const user = await onCurrentUser()

    // Check if profile exists
    const existingProfile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!existingProfile) {
      return { status: 404, error: "Profile not found" }
    }

    // Check if username is taken (if changing username)
    if (data.username && data.username !== existingProfile.username) {
      const usernameExists = await client.influencer.findUnique({
        where: { username: data.username },
      })

      if (usernameExists) {
        return { status: 400, error: "Username already taken" }
      }
    }

    const profile = await client.influencer.update({
      where: { userId: user.id },
      data,
    })

    revalidatePath("/influencer-hub")
    return { status: 200, data: profile }
  } catch (error) {
    console.error("Error updating influencer profile:", error)
    return { status: 500, error: "Failed to update influencer profile" }
  }
}

// Social Account Actions
export const addSocialAccount = async (data: {
  platform: string
  username: string
  url?: string
  followers?: number
  engagement?: number
}) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    // Check if account for this platform already exists
    const existingAccount = await client.socialAccount.findFirst({
      where: {
        influencerId: profile.id,
        platform: data.platform,
      },
    })

    if (existingAccount) {
      // Update existing account
      const account = await client.socialAccount.update({
        where: { id: existingAccount.id },
        data,
      })

      revalidatePath("/influencer-hub")
      return { status: 200, data: account }
    }

    // Create new account
    const account = await client.socialAccount.create({
      data: {
        ...data,
        influencerId: profile.id,
        handle: data.username,
      },
    })

    revalidatePath("/influencer-hub")
    return { status: 201, data: account }
  } catch (error) {
    console.error("Error adding social account:", error)
    return { status: 500, error: "Failed to add social account" }
  }
}

export const removeSocialAccount = async (id: string) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    // Check if account belongs to user
    const account = await client.socialAccount.findFirst({
      where: {
        id,
        influencerId: profile.id,
      },
    })

    if (!account) {
      return { status: 404, error: "Account not found" }
    }

    await client.socialAccount.delete({
      where: { id },
    })

    revalidatePath("/influencer-hub")
    return { status: 200, data: { success: true } }
  } catch (error) {
    console.error("Error removing social account:", error)
    return { status: 500, error: "Failed to remove social account" }
  }
}

// Content Sample Actions
export const addContentSample = async (data: {
  url: string
  type: string
}) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    const sample = await client.contentSample.create({
      data: {
        ...data,
        profileId: profile.id,
      },
    })

    revalidatePath("/influencer-hub")
    return { status: 201, data: sample }
  } catch (error) {
    console.error("Error adding content sample:", error)
    return { status: 500, error: "Failed to add content sample" }
  }
}

export const removeContentSample = async (id: string) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    // Check if sample belongs to user
    const sample = await client.contentSample.findFirst({
      where: {
        id,
        profileId: profile.id,
      },
    })

    if (!sample) {
      return { status: 404, error: "Sample not found" }
    }

    await client.contentSample.delete({
      where: { id },
    })

    revalidatePath("/influencer-hub")
    return { status: 200, data: { success: true } }
  } catch (error) {
    console.error("Error removing content sample:", error)
    return { status: 500, error: "Failed to remove content sample" }
  }
}

// Rates Actions
export const updateRates = async (data: {
  postRate?: number
  videoRate?: number
  storyRate?: number
}) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    // Check if rates exist
    const existingRates = await client.influencerRates.findUnique({
      where: { influencerId: profile.id },
    })

    if (existingRates) {
      // Update existing rates
      const rates = await client.influencerRates.update({
        where: { influencerId: profile.id },
        data,
      })

      revalidatePath("/influencer-hub")
      return { status: 200, data: rates }
    }

    // Create new rates
    const rates = await client.influencerRates.create({
      data: {
        ...data,
        influencerId: profile.id,
        platform: "instagram", // or another valid platform
        rate: 8, 
        contentType: "post", // or another valid content type
      },
    })

    revalidatePath("/influencer-hub")
    return { status: 201, data: rates }
  } catch (error) {
    console.error("Error updating rates:", error)
    return { status: 500, error: "Failed to update rates" }
  }
}

// Opportunity Actions
export const getOpportunities = async (filters?: {
  status?: string
  platforms?: string[]
  contentType?: string
  minBudget?: number
  maxBudget?: number
  tags?: string[]
  search?: string
  page?: number
  limit?: number
}) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    const { status, platforms, contentType, minBudget, maxBudget, tags, search, page = 1, limit = 10 } = filters || {}

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isPublic: true,
      status: status || "OPEN",
    }

    if (platforms && platforms.length > 0) {
      where.platforms = {
        hasSome: platforms,
      }
    }

    if (contentType) {
      where.contentType = contentType
    }

    if (minBudget) {
      where.budget = {
        ...where.budget,
        gte: minBudget,
      }
    }

    if (maxBudget) {
      where.budget = {
        ...where.budget,
        lte: maxBudget,
      }
    }

    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brandName: { contains: search, mode: "insensitive" } },
      ]
    }

    const [opportunities, total] = await Promise.all([
      client.opportunity.findMany({
        where,
        include: {
          business: true,
          applications: {
            where: {
              influencerId: profile.id,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      client.opportunity.count({ where }),
    ])

    return {
      status: 200,
      data: {
        opportunities,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
    }
  } catch (error) {
    console.error("Error fetching opportunities:", error)
    return { status: 500, error: "Failed to fetch opportunities" }
  }
}

export const applyToOpportunity = async (
  opportunityId: string,
  data: {
    message?: string
    proposedRate?: number
  },
) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    // Check if opportunity exists
    const opportunity = await client.opportunity.findUnique({
      where: { id: opportunityId },
    })

    if (!opportunity) {
      return { status: 404, error: "Opportunity not found" }
    }

    // Check if already applied
    const existingApplication = await client.opportunityApplication.findUnique({
      where: {
        opportunityId_influencerId: {
          opportunityId,
          influencerId: profile.id,
        },
      },
    })

    if (existingApplication) {
      return { status: 400, error: "Already applied to this opportunity" }
    }

    const application = await client.opportunityApplication.create({
      data: {
        ...data,
        opportunityId,
        influencerId: profile.id,
      },
    })

    revalidatePath("/influencer-hub/opportunities")
    return { status: 201, data: application }
  } catch (error) {
    console.error("Error applying to opportunity:", error)
    return { status: 500, error: "Failed to apply to opportunity" }
  }
}

// Campaign Actions
// export const getInfluencerCampaigns = async (filters?: {
//   status?: string
//   search?: string
//   page?: number
//   limit?: number
// }) => {
//   try {
//     const user = await onCurrentUser()

//     const profile = await client.influencer.findUnique({
//       where: { userId: user.id },
//     })

//     if (!profile) {
//       return { status: 404, error: "Profile not found" }
//     }

//     const { status, search, page = 1, limit = 10 } = filters || {}

//     const skip = (page - 1) * limit

//     // Build where clause for CampaignInfluencer
//     const where: any = {
//       influencerId: profile.id,
//     }

//     if (status) {
//       where.status = status
//     }

//     // Build where clause for Campaign if search is provided
//     const campaignWhere: any = {}

//     if (search) {
//       campaignWhere.OR = [
//         { name: { contains: search, mode: "insensitive" } },
//         { description: { contains: search, mode: "insensitive" } },
//       ]
//     }

//     const [campaignInfluencers, total] = await Promise.all([
//       client.campaignInfluencer.findMany({
//         where,
//         include: {
//           campaign: {
//             where: campaignWhere,
//             include: {
//               _count: {
//                 select: {
//                   influencers: true,
//                 },
//               },
//             },
//           },
//         },
//         orderBy: { createdAt: "desc" },
//         skip,
//         take: limit,
//       }),
//       client.campaignInfluencer.count({
//         where: {
//           ...where,
//           campaign: campaignWhere,
//         },
//       }),
//     ])

//     return {
//       status: 200,
//       data: {
//         campaigns: campaignInfluencers,
//         pagination: {
//           total,
//           pages: Math.ceil(total / limit),
//           page,
//           limit,
//         },
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching influencer campaigns:", error)
//     return { status: 500, error: "Failed to fetch campaigns" }
//   }
// }

export const getInfluencerCampaigns = async ({
  search,
  page = 1,
  limit = 10,
  campaignStatus,
  influencerId,
}: {
  search?: string
  page?: number
  limit?: number
  campaignStatus?: string
  influencerId?: string
}) => {
  try {
    const skip = (page - 1) * limit

    const where: any = {
      influencerId,
    }

    const campaignWhere: any = {}

    if (campaignStatus) {
      campaignWhere.status = campaignStatus
    }

    // If we have search criteria, we need to filter CampaignInfluencer records
    // based on properties of their related Campaign records
    const whereWithCampaignFilter = search
      ? {
          ...where,
          campaign: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          },
        }
      : where

    const [campaignInfluencers, total] = await Promise.all([
      client.campaignInfluencer.findMany({
        where: whereWithCampaignFilter,
        include: {
          campaign: {
            include: {
              _count: {
                select: {
                  influencers: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      client.campaignInfluencer.count({
        where: whereWithCampaignFilter,
      }),
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      status: 200,
      data: {
        campaignInfluencers,
        pagination: {
          total,
          totalPages,
          currentPage: page,
        },
      },
    }
  } catch (error) {
    console.error("Error fetching influencer campaigns:", error)
    return { status: 500, data: null, error: "Failed to fetch influencer campaigns" }
  }
}



export const updateCampaignStatus = async (campaignId: string, status: string) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    // Check if campaign exists and belongs to user
    const campaignInfluencer = await client.campaignInfluencer.findFirst({
      where: {
        campaignId,
        influencerId: profile.id,
      },
    })

    if (!campaignInfluencer) {
      return { status: 404, error: "Campaign not found" }
    }

    const updated = await client.campaignInfluencer.update({
      where: {
        id: campaignInfluencer.id,
      },
      data: {
        status,
      },
    })

    revalidatePath("/influencer-hub/campaigns")
    return { status: 200, data: updated }
  } catch (error) {
    console.error("Error updating campaign status:", error)
    return { status: 500, error: "Failed to update campaign status" }
  }
}

// Earnings Actions
export const getEarnings = async (filters?: {
  status?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}) => {
  try {
    const user = await onCurrentUser()

    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, error: "Profile not found" }
    }

    const { status, startDate, endDate, page = 1, limit = 10 } = filters || {}

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      influencerId: profile.id,
    }

    if (status) {
      where.status = status
    }

    if (startDate) {
      where.date = {
        ...where.date,
        gte: startDate,
      }
    }

    if (endDate) {
      where.date = {
        ...where.date,
        lte: endDate,
      }
    }

    const [earnings, total] = await Promise.all([
      client.influencerEarnings.findMany({
        where,
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      client.influencerEarnings.count({ where }),
    ])

    // Calculate summary
    const summary = await client.influencerEarnings.groupBy({
      by: ["status"],
      where: {
        influencerId: profile.id,
      },
      _sum: {
        amount: true,
      },
    })

    const totalEarnings = summary.reduce((acc, curr) => acc + (curr._sum.amount || 0), 0)
    const pendingEarnings = summary.find((s) => s.status === "PENDING")?._sum.amount || 0
    const paidEarnings = summary.find((s) => s.status === "PAID")?._sum.amount || 0

    return {
      status: 200,
      data: {
        earnings,
        summary: {
          total: totalEarnings,
          pending: pendingEarnings,
          paid: paidEarnings,
        },
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
    }
  } catch (error) {
    console.error("Error fetching earnings:", error)
    return { status: 500, error: "Failed to fetch earnings" }
  }
}


































export async function getInfluencerStats() {
  const user = await onCurrentUser()

  if (!user) {
    return { status: 401, data: "Unauthorized" }
  }

  try {
    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
      include: {
        metrics: {
          orderBy: { date: "desc" },
          take: 1,
        },
        campaigns: {
          where: { status: "ACTIVE" },
          include: {
            campaign: true,
          },
        },
        earnings: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
    })

    if (!profile) {
      return { status: 404, data: "Profile not found" }
    }

    // Get engagement history
    const engagementHistory = await client.influencerMetrics.findMany({
      where: { influencerId: profile.id },
      orderBy: { date: "asc" },
      take: 6,
      select: {
        date: true,
        engagementRate: true,
      },
    })

    // Format the data for the frontend
    const stats = {
      profileViews: profile.metrics[0]?.profileViews || 0,
      profileViewsGrowth: profile.metrics[0]?.profileViewsGrowth || 0,
      campaignInvites: profile.metrics[0]?.campaignInvites || 0,
      campaignInvitesGrowth: profile.metrics[0]?.campaignInvitesGrowth || 0,
      avgEngagement: profile.metrics[0]?.engagementRate || 0,
      avgEngagementGrowth: profile.metrics[0]?.engagementGrowth || 0,
      engagementHistory: engagementHistory.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-US", { month: "short" }),
        engagement: item.engagementRate,
      })),
      activeCampaigns: profile.campaigns.map((item) => ({
        id: item.campaignId,
        name: item.campaign.name,
        brand: item.campaign.goals,  //was initially brand and not goals
        status: item.status,
        deliverables: item.deliverables,
        dueDate: item.dueDate,
        payment: item.rate,
        progress: item.progress,
      })),
      totalEarnings: profile.totalEarnings || 0,
      pendingEarnings: profile.pendingEarnings || 0,
      currentMonthEarnings: profile.currentMonthEarnings || 0,
      monthlyEarningsGrowth: profile.monthlyEarningsGrowth || 0,
      recentPayments: profile.earnings.map((item) => ({
        id: item.id,
        campaign: item.campaignName,
        date: item.date,
        amount: item.amount,
      })),
      // Additional analytics data
      searchAppearances: profile.metrics[0]?.searchAppearances || 0,
      searchAppearancesPercentile: profile.metrics[0]?.searchAppearancesPercentile || 0,
      brandContacts: profile.metrics[0]?.brandContacts || 0,
      brandContactsPercentile: profile.metrics[0]?.brandContactsPercentile || 0,
      acceptanceRate: profile.metrics[0]?.acceptanceRate || 0,
      acceptanceRateChange: profile.metrics[0]?.acceptanceRateChange || 0,
      completionRate: profile.metrics[0]?.completionRate || 0,
      completionRateChange: profile.metrics[0]?.completionRateChange || 0,
      clientSatisfaction: profile.metrics[0]?.clientSatisfaction || 0,
      reviewCount: profile.metrics[0]?.reviewCount || 0,
      profileViewsPercentile: profile.metrics[0]?.profileViewsPercentile || 0,
      // Monthly earnings data
      monthlyEarnings: await client.influencerEarnings
        .findMany({
          where: { influencerId: profile.id },
          orderBy: { date: "asc" },
          take: 6,
          select: {
            date: true,
            amount: true,
          },
        })
        .then((data) =>
          data.map((item) => ({
            month: new Date(item.date).toLocaleDateString("en-US", { month: "short" }),
            earnings: item.amount,
          })),
        ),
    }

    return { status: 200, data: stats }
  } catch (error) {
    console.error("Error fetching influencer stats:", error)
    return { status: 500, data: "Failed to fetch stats" }
  }
}

export async function getInfluencerOpportunities() {
  const user = await onCurrentUser()

  if (!user) {
    return { status: 401, data: "Unauthorized" }
  }

  try {
    const profile = await client.influencer.findUnique({
      where: { userId: user.id },
    })

    if (!profile) {
      return { status: 404, data: "Profile not found" }
    }

    // Get opportunities that match the influencer's profile
    const opportunities = await client.opportunity.findMany({
      where: {
        isPublic: true,
        // Match based on niche, platforms, etc.
        OR: [{ platforms: { hasSome: profile.platforms } }],
        // Only show opportunities that are still open
        deadline: { gte: new Date() },
        // Don't show opportunities the influencer has already applied to
        NOT: {
          applications: {
            some: {
              influencerId: profile.id,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    return {
      status: 200,
      data: {
        opportunities: opportunities.map((opp) => ({
          id: opp.id,
          title: opp.title,
          brand: opp.brandName,
          description: opp.description,
          platform: opp.platforms[0],
          contentType: opp.contentType,
          budget: opp.budget,
          deadline: opp.deadline,
          status: opp.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000) ? "new" : "open",
        })),
      },
    } as ApiResponse;
  } catch (error) {
    console.error("Error fetching opportunities:", error)
    return { status: 500, data: "Failed to fetch opportunities" }
  }
}

// Add these type definitions


// Update your function signature
export async function uploadProfileImage(file: File): Promise<ImageUploadResponse> {
  const user = await onCurrentUser();

  if (!user) {
    return { status: 401, data: "Unauthorized" };
  }

  try {
    return {
      status: 200,
      data: {
        url: URL.createObjectURL(file),
      },
    };
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return { status: 500, data: "Failed to upload image" };
  }
}


// export async function uploadProfileImage(file: File) {
//   const user = await onCurrentUser()

//   if (!user) {
//     return { status: 401, data: "Unauthorized" }
//   }

//   try {
//     // In a real app, you would upload this to a storage service
//     // For now, we'll simulate a successful upload

//     // Create a FormData object
//     const formData = new FormData()
//     formData.append("file", file)

//     // Simulate an API call
//     // const response = await fetch('/api/upload', {
//     //   method: 'POST',
//     //   body: formData
//     // })

//     // Simulate a successful response
//     return {
//       status: 200,
//       data: {
//         url: URL.createObjectURL(file),
//       },
//     }
//   } catch (error) {
//     console.error("Error uploading profile image:", error)
//     return { status: 500, data: "Failed to upload image" }
//   }
// }

// const connectSocialAccount = async (platform: string): Promise<ConnectSocialResponse> => 

// export async function connectSocialAccount(platform: string):Promise<ConnectSocialResponse> =>{
//   const user = await onCurrentUser()

//   if (!user) {
//     return { status: 401, data: "Unauthorized" }
//   }

//   try {
//     // In a real app, this would initiate OAuth flow
//     // For now, we'll simulate a successful connection

//     // Simulate usernames for different platforms
//     const usernames = {
//       instagram: "user_" + Math.random().toString(36).substring(2, 8),
//       youtube: "YouTubeChannel" + Math.random().toString(36).substring(2, 5),
//       twitter: "twitter_" + Math.random().toString(36).substring(2, 8),
//       tiktok: "tiktok_" + Math.random().toString(36).substring(2, 8),
//     }

//     return {
//       status: 200,
//       data: {
//         platform,
//         username: usernames[platform as keyof typeof usernames] || "username",
//       },
//     }
//   } catch (error) {
//     console.error(`Error connecting ${platform} account:`, error)
//     return { status: 500, data: `Failed to connect ${platform} account` }
//   }
// }

// First define the response types

// Then implement the function
export async function connectSocialAccount(platform: string): Promise<ConnectSocialResponse> {
  const user = await onCurrentUser();

  if (!user) {
    return { status: 401, data: "Unauthorized" };
  }

  try {
    // Simulate usernames for different platforms
    const usernames: Record<string, string> = {
      instagram: "user_" + Math.random().toString(36).substring(2, 8),
      youtube: "YouTubeChannel" + Math.random().toString(36).substring(2, 5),
      twitter: "twitter_" + Math.random().toString(36).substring(2, 8),
      tiktok: "tiktok_" + Math.random().toString(36).substring(2, 8),
    };

    return {
      status: 200,
      data: {
        platform,
        username: usernames[platform] || "username",
      },
    };
  } catch (error) {
    console.error(`Error connecting ${platform} account:`, error);
    return { status: 500, data: `Failed to connect ${platform} account` };
  }
}