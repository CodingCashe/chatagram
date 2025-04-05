'use server'

import { client } from '@/lib/prisma'
import { InfluencerSource, InfluencerStatus, Prisma } from '@prisma/client'

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
    sortDirection?: 'asc' | 'desc'
    page?: number
    limit?: number
  }
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
    sortBy = 'followers',
    sortDirection = 'desc',
    page = 1,
    limit = 10
  } = filters || {}

  const skip = (page - 1) * limit

  // Build the where clause
  const where: Prisma.InfluencerWhereInput = {
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
      { niche: { contains: search, mode: Prisma.QueryMode.insensitive } }
    ]
  }

  const [influencers, total] = await Promise.all([
    client.influencer.findMany({
      where,
      orderBy: {
        [sortBy]: sortDirection
      },
      skip,
      take: limit,
      include: {
        metrics: {
          orderBy: {
            date: 'desc'
          },
          take: 1
        }
      }
    }),
    client.influencer.count({ where })
  ])

  return {
    influencers,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit
    }
  }
}

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
//     minFollowers = 0,
//     maxFollowers = 100000000,
//     minEngagement = 0,
//     maxEngagement = 100,
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

//   const where = {
//     userId,
//     followers: {
//       gte: minFollowers,
//       lte: maxFollowers
//     },
//     engagementRate: {
//       gte: minEngagement,
//       lte: maxEngagement
//     },
//     ...(source && { source: { in: source } }),
//     ...(status && { status: { in: status } }),
//     ...(niche && { niche: { in: niche } }),
//     ...(location && { location: { contains: location, mode: 'insensitive' } }),
//     ...(verified !== undefined && { verified }),
//     ...(search && {
//       OR: [
//         { name: { contains: search, mode: 'insensitive' } },
//         { username: { contains: search, mode: 'insensitive' } },
//         { bio: { contains: search, mode: 'insensitive' } },
//         { niche: { contains: search, mode: 'insensitive' } }
//       ]
//     })
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

export const getInfluencerById = async (id: string, userId: string) => {
  return client.influencer.findFirst({
    where: {
      id,
      userId
    },
    include: {
      metrics: {
        orderBy: {
          date: 'desc'
        },
        take: 10
      },
      campaigns: {
        include: {
          campaign: true
        }
      }
    }
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
  }
) => {
  return client.influencer.create({
    data: {
      ...data,
      userId,
      metrics: {
        create: {
          followers: data.followers,
          engagementRate: data.engagementRate,
          averageLikes: data.averageLikes,
          averageComments: data.averageComments,
          metricSource: data.source
        }
      }
    }
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
  }
) => {
  const influencer = await client.influencer.findFirst({
    where: {
      id,
      userId
    }
  })

  if (!influencer) {
    return null
  }

  // If followers or engagement rate changed, create a new metric record
  if (data.followers !== undefined || data.engagementRate !== undefined) {
    await client.influencerMetric.create({
      data: {
        influencerId: id,
        followers: data.followers || influencer.followers,
        engagementRate: data.engagementRate || influencer.engagementRate,
        averageLikes: data.averageLikes,
        averageComments: data.averageComments,
        metricSource: 'manual_update'
      }
    })
  }

  return client.influencer.update({
    where: { id },
    data
  })
}

export const deleteInfluencer = async (id: string, userId: string) => {
  const influencer = await client.influencer.findFirst({
    where: {
      id,
      userId
    }
  })

  if (!influencer) {
    return null
  }

  return client.influencer.delete({
    where: { id }
  })
}

export const addInfluencerToList = async (
  influencerId: string,
  listId: string,
  userId: string
) => {
  // Verify ownership
  const [influencer, list] = await Promise.all([
    client.influencer.findFirst({
      where: {
        id: influencerId,
        userId
      }
    }),
    client.influencerList.findFirst({
      where: {
        id: listId,
        userId
      }
    })
  ])

  if (!influencer || !list) {
    return null
  }

  return client.influencerList.update({
    where: { id: listId },
    data: {
      influencers: {
        connect: { id: influencerId }
      }
    }
  })
}

export const removeInfluencerFromList = async (
  influencerId: string,
  listId: string,
  userId: string
) => {
  // Verify ownership
  const [influencer, list] = await Promise.all([
    client.influencer.findFirst({
      where: {
        id: influencerId,
        userId
      }
    }),
    client.influencerList.findFirst({
      where: {
        id: listId,
        userId
      }
    })
  ])

  if (!influencer || !list) {
    return null
  }

  return client.influencerList.update({
    where: { id: listId },
    data: {
      influencers: {
        disconnect: { id: influencerId }
      }
    }
  })
}

export const getInfluencerLists = async (userId: string) => {
  return client.influencerList.findMany({
    where: {
      userId
    },
    include: {
      _count: {
        select: {
          influencers: true
        }
      }
    }
  })
}

export const getInfluencerListById = async (id: string, userId: string) => {
  return client.influencerList.findFirst({
    where: {
      id,
      userId
    },
    include: {
      influencers: true
    }
  })
}

export const createInfluencerList = async (
  userId: string,
  data: {
    name: string
    description?: string
  }
) => {
  return client.influencerList.create({
    data: {
      ...data,
      userId
    }
  })
}

export const updateInfluencerList = async (
  id: string,
  userId: string,
  data: {
    name?: string
    description?: string
  }
) => {
  const list = await client.influencerList.findFirst({
    where: {
      id,
      userId
    }
  })

  if (!list) {
    return null
  }

  return client.influencerList.update({
    where: { id },
    data
  })
}

export const deleteInfluencerList = async (id: string, userId: string) => {
  const list = await client.influencerList.findFirst({
    where: {
      id,
      userId
    }
  })

  if (!list) {
    return null
  }

  return client.influencerList.delete({
    where: { id }
  })
}



