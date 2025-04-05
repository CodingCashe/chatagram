// 'use server'

// import { client } from '@/lib/prisma'
// import { InfluencerSource, InfluencerStatus, Prisma } from '@prisma/client'

// export const getInfluencers = async (
//   userId: string,
//   filters?: {
//     source?: InfluencerSource[]
//     status?: InfluencerStatus[]
//     minFollowers?: number
//     maxFollowers?: number
//     minEngagement?: number
//     maxEngagement?: number
//     niche?: string[]
//     location?: string
//     verified?: boolean
//     search?: string
//     sortBy?: string
//     sortDirection?: 'asc' | 'desc'
//     page?: number
//     limit?: number
//   }
// ) => {
//   const {
//     source,
//     status,
//     minFollowers,
//     maxFollowers,
//     minEngagement,
//     maxEngagement,
//     niche,
//     location,
//     verified,
//     search,
//     sortBy = 'followers',
//     sortDirection = 'desc',
//     page = 1,
//     limit = 10
//   } = filters || {}

//   const skip = (page - 1) * limit

//   // Build the where clause
//   const where: Prisma.InfluencerWhereInput = {
//     userId,
//     ...(source && { source: { in: source } }),
//     ...(status && { status: { in: status } }),
//     ...(minFollowers && { followers: { gte: minFollowers } }),
//     ...(maxFollowers && { followers: { lte: maxFollowers } }),
//     ...(minEngagement && { engagementRate: { gte: minEngagement } }),
//     ...(maxEngagement && { engagementRate: { lte: maxEngagement } }),
//     ...(niche && niche.length > 0 && { niche: { in: niche } }),
//     ...(location && { location: { contains: location, mode: Prisma.QueryMode.insensitive } }),
//     ...(verified !== undefined && { verified }),
//   }

//   // Add search condition if provided
//   if (search) {
//     where.OR = [
//       { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
//       { username: { contains: search, mode: Prisma.QueryMode.insensitive } },
//       { bio: { contains: search, mode: Prisma.QueryMode.insensitive } },
//       { niche: { contains: search, mode: Prisma.QueryMode.insensitive } }
//     ]
//   }

//   const [influencers, total] = await Promise.all([
//     client.influencer.findMany({
//       where,
//       orderBy: {
//         [sortBy]: sortDirection
//       },
//       skip,
//       take: limit,
//       include: {
//         metrics: {
//           orderBy: {
//             date: 'desc'
//           },
//           take: 1
//         }
//       }
//     }),
//     client.influencer.count({ where })
//   ])

//   return {
//     influencers,
//     pagination: {
//       total,
//       pages: Math.ceil(total / limit),
//       page,
//       limit
//     }
//   }
// }



// export const getInfluencerById = async (id: string, userId: string) => {
//   return client.influencer.findFirst({
//     where: {
//       id,
//       userId
//     },
//     include: {
//       metrics: {
//         orderBy: {
//           date: 'desc'
//         },
//         take: 10
//       },
//       campaigns: {
//         include: {
//           campaign: true
//         }
//       }
//     }
//   })
// }

// export const createInfluencer = async (
//   userId: string,
//   data: {
//     name: string
//     username: string
//     bio?: string
//     profilePicture?: string
//     followers: number
//     following?: number
//     postsCount?: number
//     engagementRate: number
//     averageLikes?: number
//     averageComments?: number
//     verified?: boolean
//     location?: string
//     niche?: string
//     email?: string
//     website?: string
//     contactInfo?: any
//     notes?: string
//     tags?: string[]
//     brandFit?: number
//     audienceMatch?: number
//     estimatedCost?: number
//     source: InfluencerSource
//     sourceId?: string
//     audienceDemographics?: any
//     authenticity?: number
//     growthRate?: number
//   }
// ) => {
//   return client.influencer.create({
//     data: {
//       ...data,
//       userId,
//       metrics: {
//         create: {
//           followers: data.followers,
//           engagementRate: data.engagementRate,
//           averageLikes: data.averageLikes,
//           averageComments: data.averageComments,
//           metricSource: data.source
//         }
//       }
//     }
//   })
// }

// export const updateInfluencer = async (
//   id: string,
//   userId: string,
//   data: {
//     name?: string
//     bio?: string
//     profilePicture?: string
//     followers?: number
//     following?: number
//     postsCount?: number
//     engagementRate?: number
//     averageLikes?: number
//     averageComments?: number
//     verified?: boolean
//     location?: string
//     niche?: string
//     email?: string
//     website?: string
//     contactInfo?: any
//     notes?: string
//     tags?: string[]
//     brandFit?: number
//     audienceMatch?: number
//     estimatedCost?: number
//     status?: InfluencerStatus
//     audienceDemographics?: any
//     authenticity?: number
//     growthRate?: number
//   }
// ) => {
//   const influencer = await client.influencer.findFirst({
//     where: {
//       id,
//       userId
//     }
//   })

//   if (!influencer) {
//     return null
//   }

//   // If followers or engagement rate changed, create a new metric record
//   if (data.followers !== undefined || data.engagementRate !== undefined) {
//     await client.influencerMetric.create({
//       data: {
//         influencerId: id,
//         followers: data.followers || influencer.followers,
//         engagementRate: data.engagementRate || influencer.engagementRate,
//         averageLikes: data.averageLikes,
//         averageComments: data.averageComments,
//         metricSource: 'manual_update'
//       }
//     })
//   }

//   return client.influencer.update({
//     where: { id },
//     data
//   })
// }

// export const deleteInfluencer = async (id: string, userId: string) => {
//   const influencer = await client.influencer.findFirst({
//     where: {
//       id,
//       userId
//     }
//   })

//   if (!influencer) {
//     return null
//   }

//   return client.influencer.delete({
//     where: { id }
//   })
// }

// export const addInfluencerToList = async (
//   influencerId: string,
//   listId: string,
//   userId: string
// ) => {
//   // Verify ownership
//   const [influencer, list] = await Promise.all([
//     client.influencer.findFirst({
//       where: {
//         id: influencerId,
//         userId
//       }
//     }),
//     client.influencerList.findFirst({
//       where: {
//         id: listId,
//         userId
//       }
//     })
//   ])

//   if (!influencer || !list) {
//     return null
//   }

//   return client.influencerList.update({
//     where: { id: listId },
//     data: {
//       influencers: {
//         connect: { id: influencerId }
//       }
//     }
//   })
// }

// export const removeInfluencerFromList = async (
//   influencerId: string,
//   listId: string,
//   userId: string
// ) => {
//   // Verify ownership
//   const [influencer, list] = await Promise.all([
//     client.influencer.findFirst({
//       where: {
//         id: influencerId,
//         userId
//       }
//     }),
//     client.influencerList.findFirst({
//       where: {
//         id: listId,
//         userId
//       }
//     })
//   ])

//   if (!influencer || !list) {
//     return null
//   }

//   return client.influencerList.update({
//     where: { id: listId },
//     data: {
//       influencers: {
//         disconnect: { id: influencerId }
//       }
//     }
//   })
// }

// export const getInfluencerLists = async (userId: string) => {
//   return client.influencerList.findMany({
//     where: {
//       userId
//     },
//     include: {
//       _count: {
//         select: {
//           influencers: true
//         }
//       }
//     }
//   })
// }

// export const getInfluencerListById = async (id: string, userId: string) => {
//   return client.influencerList.findFirst({
//     where: {
//       id,
//       userId
//     },
//     include: {
//       influencers: true
//     }
//   })
// }

// export const createInfluencerList = async (
//   userId: string,
//   data: {
//     name: string
//     description?: string
//   }
// ) => {
//   return client.influencerList.create({
//     data: {
//       ...data,
//       userId
//     }
//   })
// }

// export const updateInfluencerList = async (
//   id: string,
//   userId: string,
//   data: {
//     name?: string
//     description?: string
//   }
// ) => {
//   const list = await client.influencerList.findFirst({
//     where: {
//       id,
//       userId
//     }
//   })

//   if (!list) {
//     return null
//   }

//   return client.influencerList.update({
//     where: { id },
//     data
//   })
// }

// export const deleteInfluencerList = async (id: string, userId: string) => {
//   const list = await client.influencerList.findFirst({
//     where: {
//       id,
//       userId
//     }
//   })

//   if (!list) {
//     return null
//   }

//   return client.influencerList.delete({
//     where: { id }
//   })
// }


"use server"

import { client } from "@/lib/prisma"
import { type InfluencerSource, type InfluencerStatus, Prisma } from "@prisma/client"

export const getInfluencers = async (
  userId: string,
  filters?: {
    source?: InfluencerSource[]
    status?: InfluencerStatus[]
    minFollowers?: number
    maxFollowers?: number
    minEngagement?: number
    maxEngagement?: number
    niche?: string[]
    location?: string
    verified?: boolean
    search?: string
    sortBy?: string
    sortDirection?: "asc" | "desc"
    page?: number
    limit?: number
  },
) => {
  const {
    source,
    status,
    minFollowers,
    maxFollowers,
    minEngagement,
    maxEngagement,
    niche,
    location,
    verified,
    search,
    sortBy = "followers",
    sortDirection = "desc",
    page = 1,
    limit = 10,
  } = filters || {}

  const skip = (page - 1) * limit

  // Build the where clause
  const where: any = {
    userId,
    ...(source && { source: { in: source } }),
    ...(status && { status: { in: status } }),
    ...(minFollowers && { followers: { gte: minFollowers } }),
    ...(maxFollowers && { followers: { lte: maxFollowers } }),
    ...(minEngagement && { engagementRate: { gte: minEngagement } }),
    ...(maxEngagement && { engagementRate: { lte: maxEngagement } }),
    ...(niche && niche.length > 0 && { niche: { in: niche } }),
    ...(location && { location: { contains: location, mode: Prisma.QueryMode.insensitive } }),
    ...(verified !== undefined && { verified }),
  }

  // Add search condition if provided
  if (search) {
    where.OR = [
      { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
      { username: { contains: search, mode: Prisma.QueryMode.insensitive } },
      { bio: { contains: search, mode: Prisma.QueryMode.insensitive } },
      { niche: { contains: search, mode: Prisma.QueryMode.insensitive } },
    ]
  }

  const [influencers, total] = await Promise.all([
    client.influencer.findMany({
      where,
      orderBy: {
        [sortBy]: sortDirection,
      },
      skip,
      take: limit,
      include: {
        metrics: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
        lists: {
          include: {
            list: true,
          },
        },
      },
    }),
    client.influencer.count({ where }),
  ])

  return {
    influencers,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit,
    },
  }
}

export const getInfluencerById = async (id: string, userId: string) => {
  return client.influencer.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      metrics: {
        orderBy: {
          date: "desc",
        },
      },
      lists: {
        include: {
          list: true,
        },
      },
      campaigns: {
        include: {
          campaign: true,
        },
      },
    },
  })
}

export const createInfluencer = async (
  userId: string,
  data: {
    name: string
    username: string
    bio?: string
    profilePicture?: string
    followers: number
    following?: number
    postsCount?: number
    engagementRate: number
    averageLikes?: number
    averageComments?: number
    verified?: boolean
    location?: string
    niche?: string
    email?: string
    website?: string
    contactInfo?: any
    notes?: string
    tags?: string[]
    brandFit?: number
    audienceMatch?: number
    estimatedCost?: number
    source: InfluencerSource
    sourceId?: string
    audienceDemographics?: any
    authenticity?: number
    growthRate?: number
  },
) => {
  return client.influencer.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const updateInfluencer = async (
  id: string,
  userId: string,
  data: {
    name?: string
    bio?: string
    profilePicture?: string
    followers?: number
    following?: number
    postsCount?: number
    engagementRate?: number
    averageLikes?: number
    averageComments?: number
    verified?: boolean
    location?: string
    niche?: string
    email?: string
    website?: string
    contactInfo?: any
    notes?: string
    tags?: string[]
    brandFit?: number
    audienceMatch?: number
    estimatedCost?: number
    status?: InfluencerStatus
    audienceDemographics?: any
    authenticity?: number
    growthRate?: number
  },
) => {
  const influencer = await client.influencer.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!influencer) {
    return null
  }

  return client.influencer.update({
    where: { id },
    data,
  })
}

export const deleteInfluencer = async (id: string, userId: string) => {
  const influencer = await client.influencer.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!influencer) {
    return null
  }

  return client.influencer.delete({
    where: { id },
  })
}

export const getInfluencerLists = async (userId: string) => {
  return client.influencerList.findMany({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          influencers: true,
        },
      },
    },
  })
}

export const getInfluencerListById = async (id: string, userId: string) => {
  return client.influencerList.findFirst({
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
    },
  })
}

export const createInfluencerList = async (
  userId: string,
  data: {
    name: string
    description?: string
  },
) => {
  return client.influencerList.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const updateInfluencerList = async (
  id: string,
  userId: string,
  data: {
    name?: string
    description?: string
  },
) => {
  const list = await client.influencerList.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!list) {
    return null
  }

  return client.influencerList.update({
    where: { id },
    data,
  })
}

export const deleteInfluencerList = async (id: string, userId: string) => {
  const list = await client.influencerList.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!list) {
    return null
  }

  return client.influencerList.delete({
    where: { id },
  })
}

export const addInfluencerToList = async (influencerId: string, listId: string, userId: string) => {
  // Verify ownership
  const [influencer, list] = await Promise.all([
    client.influencer.findFirst({
      where: {
        id: influencerId,
        userId,
      },
    }),
    client.influencerList.findFirst({
      where: {
        id: listId,
        userId,
      },
    }),
  ])

  if (!influencer || !list) {
    return null
  }

  return client.influencerListInfluencer.upsert({
    where: {
      listId_influencerId: {
        listId,
        influencerId,
      },
    },
    update: {},
    create: {
      listId,
      influencerId,
    },
  })
}

export const removeInfluencerFromList = async (influencerId: string, listId: string, userId: string) => {
  // Verify ownership
  const [influencer, list] = await Promise.all([
    client.influencer.findFirst({
      where: {
        id: influencerId,
        userId,
      },
    }),
    client.influencerList.findFirst({
      where: {
        id: listId,
        userId,
      },
    }),
  ])

  if (!influencer || !list) {
    return null
  }

  return client.influencerListInfluencer.delete({
    where: {
      listId_influencerId: {
        listId,
        influencerId,
      },
    },
  })
}

export const findSimilarInfluencers = async (
  userId: string,
  referenceInfluencerId: string,
  options?: {
    contentStyleWeight?: number
    audienceTypeWeight?: number
    engagementWeight?: number
    limit?: number
  },
) => {
  const { contentStyleWeight = 80, audienceTypeWeight = 70, engagementWeight = 50, limit = 10 } = options || {}

  // Get the reference influencer
  const referenceInfluencer = await client.influencer.findFirst({
    where: {
      id: referenceInfluencerId,
      userId,
    },
    include: {
      metrics: {
        orderBy: {
          date: "desc",
        },
        take: 1,
      },
    },
  })

  if (!referenceInfluencer) {
    return { influencers: [], pagination: { total: 0, pages: 0, page: 1, limit } }
  }

  // Find similar influencers based on niche, engagement rate range, and follower count range
  const engagementRateMin = Math.max(0, referenceInfluencer.engagementRate * 0.7)
  const engagementRateMax = referenceInfluencer.engagementRate * 1.3

  const followersMin = referenceInfluencer.followers * 0.5
  const followersMax = referenceInfluencer.followers * 2

  const influencers = await client.influencer.findMany({
    where: {
      userId,
      id: { not: referenceInfluencerId }, // Exclude the reference influencer
      niche: referenceInfluencer.niche,
      engagementRate: {
        gte: engagementRateMin,
        lte: engagementRateMax,
      },
      followers: {
        gte: followersMin,
        lte: followersMax,
      },
    },
    take: limit,
    include: {
      metrics: {
        orderBy: {
          date: "desc",
        },
        take: 1,
      },
    },
  })

  // Calculate similarity scores
  const influencersWithScores = influencers.map((influencer) => {
    // Content style similarity (based on niche match)
    const contentStyleScore = influencer.niche === referenceInfluencer.niche ? 100 : 50

    // Audience type similarity (simplified)
    const audienceTypeScore = 70 // Placeholder - would use real audience data

    // Engagement similarity
    const engagementDiff = Math.abs(influencer.engagementRate - referenceInfluencer.engagementRate)
    const maxEngagementDiff = referenceInfluencer.engagementRate * 0.3
    const engagementScore = 100 - (engagementDiff / maxEngagementDiff) * 100

    // Weighted total score
    const totalScore =
      (contentStyleScore * contentStyleWeight +
        audienceTypeScore * audienceTypeWeight +
        engagementScore * engagementWeight) /
      (contentStyleWeight + audienceTypeWeight + engagementWeight)

    return {
      ...influencer,
      similarityScore: Math.round(totalScore),
    }
  })

  // Sort by similarity score
  influencersWithScores.sort((a, b) => b.similarityScore - a.similarityScore)

  return {
    influencers: influencersWithScores,
    pagination: {
      total: influencersWithScores.length,
      pages: 1,
      page: 1,
      limit,
    },
  }
}

export const findInfluencerByInstagramHandle = async (userId: string, instagramHandle: string) => {
  // First check if we already have this influencer in our database
  const existingInfluencer = await client.influencer.findFirst({
    where: {
      userId,
      username: instagramHandle.replace("@", ""),
    },
  })

  if (existingInfluencer) {
    return existingInfluencer
  }

  // If not found, we would fetch from Instagram API
  // This is where you'd integrate with the Instagram Graph API
  // For now, we'll return null to indicate we need to fetch from external API
  return null
}

