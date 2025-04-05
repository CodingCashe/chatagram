// 'use server'

// import { client } from '@/lib/prisma'
// import { MyCampaignStatus, Prisma } from '@prisma/client'

// export const getCampaigns = async (
//   userId: string,
//   filters?: {
//     status?: MyCampaignStatus[]
//     search?: string
//     startDateFrom?: Date
//     startDateTo?: Date
//     endDateFrom?: Date
//     endDateTo?: Date
//     sortBy?: string
//     sortDirection?: 'asc' | 'desc'
//     page?: number
//     limit?: number
//   }
// ) => {
//   const {
//     status,
//     search,
//     startDateFrom,
//     startDateTo,
//     endDateFrom,
//     endDateTo,
//     sortBy = 'createdAt',
//     sortDirection = 'desc',
//     page = 1,
//     limit = 10
//   } = filters || {}

//   const skip = (page - 1) * limit

//   // Build the where clause
//   const where: Prisma.CampaignWhereInput = {
//     userId,
//     ...(status && { status: { in: status } }),
//     ...(startDateFrom && { startDate: { gte: startDateFrom } }),
//     ...(startDateTo && { startDate: { lte: startDateTo } }),
//     ...(endDateFrom && { endDate: { gte: endDateFrom } }),
//     ...(endDateTo && { endDate: { lte: endDateTo } })
//   }

//   // Add search condition if provided
//   if (search) {
//     where.OR = [
//       { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
//       { description: { contains: search, mode: Prisma.QueryMode.insensitive } }
//     ]
//   }

//   const [campaigns, total] = await Promise.all([
//     client.campaign.findMany({
//       where,
//       orderBy: {
//         [sortBy]: sortDirection
//       },
//       skip,
//       take: limit,
//       include: {
//         _count: {
//           select: {
//             influencers: true
//           }
//         }
//       }
//     }),
//     client.campaign.count({ where })
//   ])

//   return {
//     campaigns,
//     pagination: {
//       total,
//       pages: Math.ceil(total / limit),
//       page,
//       limit
//     }
//   }
// }


// export const getCampaignById = async (id: string, userId: string) => {
//   return client.campaign.findFirst({
//     where: {
//       id,
//       userId,
//     },
//     include: {
//       influencers: {
//         include: {
//           influencer: true,
//         },
//       },
//       analytics: {
//         orderBy: {
//           date: "desc",
//         },
//       },
//     },
//   })
// }

// export const createCampaign = async (
//   userId: string,
//   data: {
//     name: string
//     description?: string
//     startDate?: Date
//     endDate?: Date
//     budget?: number
//     goals?: any
//     brief?: string
//     guidelines?: string
//     hashtags?: string[]
//     mentions?: string[]
//   },
// ) => {
//   return client.campaign.create({
//     data: {
//       ...data,
//       userId,
//     },
//   })
// }

// export const updateCampaign = async (
//   id: string,
//   userId: string,
//   data: {
//     name?: string
//     description?: string
//     startDate?: Date
//     endDate?: Date
//     budget?: number
//     status?: MyCampaignStatus
//     goals?: any
//     brief?: string
//     guidelines?: string
//     hashtags?: string[]
//     mentions?: string[]
//   },
// ) => {
//   const campaign = await client.campaign.findFirst({
//     where: {
//       id,
//       userId,
//     },
//   })

//   if (!campaign) {
//     return null
//   }

//   return client.campaign.update({
//     where: { id },
//     data,
//   })
// }

// export const deleteCampaign = async (id: string, userId: string) => {
//   const campaign = await client.campaign.findFirst({
//     where: {
//       id,
//       userId,
//     },
//   })

//   if (!campaign) {
//     return null
//   }

//   return client.campaign.delete({
//     where: { id },
//   })
// }

// export const addInfluencerToCampaign = async (
//   campaignId: string,
//   influencerId: string,
//   userId: string,
//   data: {
//     status?: string
//     rate?: number
//     deliverables?: any
//     notes?: string
//   },
// ) => {
//   // Verify ownership
//   const [campaign, influencer] = await Promise.all([
//     client.campaign.findFirst({
//       where: {
//         id: campaignId,
//         userId,
//       },
//     }),
//     client.influencer.findFirst({
//       where: {
//         id: influencerId,
//         userId,
//       },
//     }),
//   ])

//   if (!campaign || !influencer) {
//     return null
//   }

//   return client.campaignInfluencer.upsert({
//     where: {
//       campaignId_influencerId: {
//         campaignId,
//         influencerId,
//       },
//     },
//     update: data,
//     create: {
//       campaignId,
//       influencerId,
//       ...data,
//     },
//   })
// }

// export const removeInfluencerFromCampaign = async (campaignId: string, influencerId: string, userId: string) => {
//   // Verify ownership
//   const [campaign, influencer] = await Promise.all([
//     client.campaign.findFirst({
//       where: {
//         id: campaignId,
//         userId,
//       },
//     }),
//     client.influencer.findFirst({
//       where: {
//         id: influencerId,
//         userId,
//       },
//     }),
//   ])

//   if (!campaign || !influencer) {
//     return null
//   }

//   return client.campaignInfluencer.delete({
//     where: {
//       campaignId_influencerId: {
//         campaignId,
//         influencerId,
//       },
//     },
//   })
// }

// export const updateCampaignInfluencer = async (
//   campaignId: string,
//   influencerId: string,
//   userId: string,
//   data: {
//     status?: string
//     rate?: number
//     deliverables?: any
//     contentUrls?: string[]
//     notes?: string
//     performance?: any
//   },
// ) => {
//   // Verify ownership
//   const [campaign, influencer] = await Promise.all([
//     client.campaign.findFirst({
//       where: {
//         id: campaignId,
//         userId,
//       },
//     }),
//     client.influencer.findFirst({
//       where: {
//         id: influencerId,
//         userId,
//       },
//     }),
//   ])

//   if (!campaign || !influencer) {
//     return null
//   }

//   return client.campaignInfluencer.update({
//     where: {
//       campaignId_influencerId: {
//         campaignId,
//         influencerId,
//       },
//     },
//     data,
//   })
// }

// export const addCampaignAnalytics = async (
//   campaignId: string,
//   userId: string,
//   data: {
//     date?: Date
//     reach?: number
//     impressions?: number
//     engagement?: number
//     clicks?: number
//     conversions?: number
//     roi?: number
//     costPerEngagement?: number
//     costPerClick?: number
//     costPerConversion?: number
//     metrics?: any
//   },
// ) => {
//   // Verify ownership
//   const campaign = await client.campaign.findFirst({
//     where: {
//       id: campaignId,
//       userId,
//     },
//   })

//   if (!campaign) {
//     return null
//   }

//   return client.campaignAnalytics.create({
//     data: {
//       campaignId,
//       ...data,
//     },
//   })
// }

// export const updateCampaignAnalytics = async (
//   id: string,
//   userId: string,
//   data: {
//     reach?: number
//     impressions?: number
//     engagement?: number
//     clicks?: number
//     conversions?: number
//     roi?: number
//     costPerEngagement?: number
//     costPerClick?: number
//     costPerConversion?: number
//     metrics?: any
//   },
// ) => {
//   // Verify ownership
//   const analytics = await client.campaignAnalytics.findFirst({
//     where: {
//       id,
//       campaign: {
//         userId,
//       },
//     },
//   })

//   if (!analytics) {
//     return null
//   }

//   return client.campaignAnalytics.update({
//     where: { id },
//     data,
//   })
// }

// export const deleteCampaignAnalytics = async (id: string, userId: string) => {
//   // Verify ownership
//   const analytics = await client.campaignAnalytics.findFirst({
//     where: {
//       id,
//       campaign: {
//         userId,
//       },
//     },
//   })

//   if (!analytics) {
//     return null
//   }

//   return client.campaignAnalytics.delete({
//     where: { id },
//   })
// }

"use server"

import { client } from "@/lib/prisma"
import { type MyCampaignStatus, Prisma } from "@prisma/client"

export const getCampaigns = async (
  userId: string,
  filters?: {
    status?: MyCampaignStatus[]
    search?: string
    startDateFrom?: Date
    startDateTo?: Date
    endDateFrom?: Date
    endDateTo?: Date
    sortBy?: string
    sortDirection?: "asc" | "desc"
    page?: number
    limit?: number
  },
) => {
  const {
    status,
    search,
    startDateFrom,
    startDateTo,
    endDateFrom,
    endDateTo,
    sortBy = "createdAt",
    sortDirection = "desc",
    page = 1,
    limit = 10,
  } = filters || {}

  const skip = (page - 1) * limit

  // Build the where clause
  const where: any = {
    userId,
    ...(status && { status: { in: status } }),
    ...(startDateFrom && { startDate: { gte: startDateFrom } }),
    ...(startDateTo && { startDate: { lte: startDateTo } }),
    ...(endDateFrom && { endDate: { gte: endDateFrom } }),
    ...(endDateTo && { endDate: { lte: endDateTo } }),
  }

  // Add search condition if provided
  if (search) {
    where.OR = [
      { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
      { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
    ]
  }

  const [campaigns, total] = await Promise.all([
    client.campaign.findMany({
      where,
      orderBy: {
        [sortBy]: sortDirection,
      },
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            influencers: true,
          },
        },
      },
    }),
    client.campaign.count({ where }),
  ])

  return {
    campaigns,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit,
    },
  }
}

export const getCampaignById = async (id: string, userId: string) => {
  return client.campaign.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      influencers: {
        include: {
          influencer: true,
        },
      },
      analytics: {
        orderBy: {
          date: "desc",
        },
      },
    },
  })
}

export const createCampaign = async (
  userId: string,
  data: {
    name: string
    description?: string
    startDate?: Date
    endDate?: Date
    budget?: number
    goals?: any
    brief?: string
    guidelines?: string
    hashtags?: string[]
    mentions?: string[]
  },
) => {
  return client.campaign.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const updateCampaign = async (
  id: string,
  userId: string,
  data: {
    name?: string
    description?: string
    startDate?: Date
    endDate?: Date
    budget?: number
    status?: MyCampaignStatus
    goals?: any
    brief?: string
    guidelines?: string
    hashtags?: string[]
    mentions?: string[]
  },
) => {
  const campaign = await client.campaign.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!campaign) {
    return null
  }

  // Use type assertion to handle the enum mismatch
  return client.campaign.update({
    where: { id },
    data: data as any,
  })
}

export const deleteCampaign = async (id: string, userId: string) => {
  const campaign = await client.campaign.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!campaign) {
    return null
  }

  return client.campaign.delete({
    where: { id },
  })
}

export const addInfluencerToCampaign = async (
  campaignId: string,
  influencerId: string,
  userId: string,
  data: {
    status?: string
    rate?: number
    deliverables?: any
    notes?: string
  },
) => {
  // Verify ownership
  const [campaign, influencer] = await Promise.all([
    client.campaign.findFirst({
      where: {
        id: campaignId,
        userId,
      },
    }),
    client.influencer.findFirst({
      where: {
        id: influencerId,
        userId,
      },
    }),
  ])

  if (!campaign || !influencer) {
    return null
  }

  return client.campaignInfluencer.upsert({
    where: {
      campaignId_influencerId: {
        campaignId,
        influencerId,
      },
    },
    update: data,
    create: {
      campaignId,
      influencerId,
      ...data,
    },
  })
}

export const removeInfluencerFromCampaign = async (campaignId: string, influencerId: string, userId: string) => {
  // Verify ownership
  const [campaign, influencer] = await Promise.all([
    client.campaign.findFirst({
      where: {
        id: campaignId,
        userId,
      },
    }),
    client.influencer.findFirst({
      where: {
        id: influencerId,
        userId,
      },
    }),
  ])

  if (!campaign || !influencer) {
    return null
  }

  return client.campaignInfluencer.delete({
    where: {
      campaignId_influencerId: {
        campaignId,
        influencerId,
      },
    },
  })
}

export const updateCampaignInfluencer = async (
  campaignId: string,
  influencerId: string,
  userId: string,
  data: {
    status?: string
    rate?: number
    deliverables?: any
    contentUrls?: string[]
    notes?: string
    performance?: any
  },
) => {
  // Verify ownership
  const [campaign, influencer] = await Promise.all([
    client.campaign.findFirst({
      where: {
        id: campaignId,
        userId,
      },
    }),
    client.influencer.findFirst({
      where: {
        id: influencerId,
        userId,
      },
    }),
  ])

  if (!campaign || !influencer) {
    return null
  }

  return client.campaignInfluencer.update({
    where: {
      campaignId_influencerId: {
        campaignId,
        influencerId,
      },
    },
    data,
  })
}

export const addCampaignAnalytics = async (
  campaignId: string,
  userId: string,
  data: {
    date?: Date
    reach?: number
    impressions?: number
    engagement?: number
    clicks?: number
    conversions?: number
    roi?: number
    costPerEngagement?: number
    costPerClick?: number
    costPerConversion?: number
    metrics?: any
  },
) => {
  // Verify ownership
  const campaign = await client.campaign.findFirst({
    where: {
      id: campaignId,
      userId,
    },
  })

  if (!campaign) {
    return null
  }

  return client.campaignAnalytics.create({
    data: {
      campaignId,
      ...data,
    },
  })
}

export const updateCampaignAnalytics = async (
  id: string,
  userId: string,
  data: {
    reach?: number
    impressions?: number
    engagement?: number
    clicks?: number
    conversions?: number
    roi?: number
    costPerEngagement?: number
    costPerClick?: number
    costPerConversion?: number
    metrics?: any
  },
) => {
  // Verify ownership
  const analytics = await client.campaignAnalytics.findFirst({
    where: {
      id,
      campaign: {
        userId,
      },
    },
  })

  if (!analytics) {
    return null
  }

  return client.campaignAnalytics.update({
    where: { id },
    data,
  })
}

export const deleteCampaignAnalytics = async (id: string, userId: string) => {
  // Verify ownership
  const analytics = await client.campaignAnalytics.findFirst({
    where: {
      id,
      campaign: {
        userId,
      },
    },
  })

  if (!analytics) {
    return null
  }

  return client.campaignAnalytics.delete({
    where: { id },
  })
}

