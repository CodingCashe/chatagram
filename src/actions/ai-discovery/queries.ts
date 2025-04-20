// 'use server'

// import { client } from '@/lib/prisma'
// import { InfluencerSource } from '@prisma/client'

// export const getAIDiscoverySettings = async (userId: string) => {
//   return client.aIDiscoverySettings.findUnique({
//     where: {
//       userId
//     }
//   })
// }

// export const createOrUpdateAIDiscoverySettings = async (
//   userId: string,
//   data: {
//     contentAnalysis?: boolean
//     audienceOverlap?: boolean
//     engagementPattern?: boolean
//     brandAlignment?: boolean
//     growthPrediction?: boolean
//     fraudDetection?: boolean
//     trainingFrequency?: string
//     lastTraining?: Date
//     minConfidenceScore?: number
//   }
// ) => {
//   return client.aIDiscoverySettings.upsert({
//     where: {
//       userId
//     },
//     update: data,
//     create: {
//       userId,
//       ...data
//     }
//   })
// }

// export const discoverInfluencersWithAI = async (
//   userId: string,
//   params: {
//     prompt: string
//     minFollowers?: number
//     maxFollowers?: number
//     minEngagement?: number
//     maxEngagement?: number
//     contentQuality?: number
//     prioritizeEngagement?: boolean
//     authenticAudience?: boolean
//     contentAlignment?: boolean
//     growthPotential?: boolean
//     limit?: number
//   }
// ) => {
//   // In a real implementation, this would call an AI service
//   // For now, we'll simulate AI discovery by finding influencers that match basic criteria
  
//   const {
//     minFollowers = 1000,
//     maxFollowers = 1000000,
//     minEngagement = 1,
//     maxEngagement = 20,
//     limit = 10
//   } = params

//   // Get existing influencers that match criteria
//   const existingInfluencers = await client.influencer.findMany({
//     where: {
//       userId,
//       followers: {
//         gte: minFollowers,
//         lte: maxFollowers
//       },
//       engagementRate: {
//         gte: minEngagement,
//         lte: maxEngagement
//       }
//     },
//     take: limit,
//     orderBy: {
//       // Simulate AI ranking with a random order
//       createdAt: 'desc'
//     }
//   })

//   // In a real implementation, we would:
//   // 1. Process the prompt with an AI model
//   // 2. Search for influencers based on the AI's understanding
//   // 3. Score and rank the results
//   // 4. Return the best matches

//   return existingInfluencers
// }

// export const findSimilarInfluencers = async (
//   userId: string,
//   referenceInfluencerId: string,
//   params: {
//     contentStyleWeight?: number
//     audienceTypeWeight?: number
//     engagementWeight?: number
//     limit?: number
//   }
// ) => {
//   const { limit = 10 } = params

//   // Get the reference influencer
//   const referenceInfluencer = await client.influencer.findFirst({
//     where: {
//       id: referenceInfluencerId,
//       userId
//     }
//   })

//   if (!referenceInfluencer) {
//     return []
//   }

//   // Find similar influencers based on niche, followers range, and engagement rate
//   const similarInfluencers = await client.influencer.findMany({
//     where: {
//       userId,
//       id: {
//         not: referenceInfluencerId
//       },
//       niche: referenceInfluencer.niche,
//       followers: {
//         gte: referenceInfluencer.followers * 0.5,
//         lte: referenceInfluencer.followers * 1.5
//       },
//       engagementRate: {
//         gte: referenceInfluencer.engagementRate * 0.5,
//         lte: referenceInfluencer.engagementRate * 1.5
//       }
//     },
//     take: limit,
//     orderBy: {
//       // In a real implementation, we would calculate similarity scores
//       // For now, order by closest follower count
//       followers: 'asc'
//     }
//   })

//   return similarInfluencers
// }

// export const findSimilarInfluencersByUsername = async (
//   userId: string,
//   username: string,
//   params: {
//     contentStyleWeight?: number
//     audienceTypeWeight?: number
//     engagementWeight?: number
//     limit?: number
//   }
// ) => {
//   const { limit = 10 } = params

//   // In a real implementation, this would:
//   // 1. Fetch the influencer profile from Instagram or a third-party API
//   // 2. Extract key metrics and characteristics
//   // 3. Find similar influencers in our database
  
//   // For now, we'll simulate by finding influencers with similar usernames
//   const similarInfluencers = await client.influencer.findMany({
//     where: {
//       userId,
//       username: {
//         contains: username.substring(0, 3),
//         mode: 'insensitive'
//       }
//     },
//     take: limit
//   })

//   return similarInfluencers
// }

// export const saveAIDiscoveredInfluencer = async (
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
//     brandFit?: number
//     audienceMatch?: number
//     estimatedCost?: number
//     aiDiscoveryScore?: number
//     aiDiscoveryData?: any
//   }
// ) => {
//   return client.influencer.create({
//     data: {
//       ...data,
//       userId,
//       source: InfluencerSource.AI_DISCOVERY,
//       metrics: {
//         create: {
//           followers: data.followers,
//           engagementRate: data.engagementRate,
//           averageLikes: data.averageLikes,
//           averageComments: data.averageComments,
//           metricSource: 'ai_discovery'
//         }
//       }
//     }
//   })
// }




"use server"

import { client } from "@/lib/prisma"
import { InfluencerSource } from "@prisma/client"

export const getAIDiscoverySettings = async (userId: string) => {
  return client.aIDiscoverySettings.findUnique({
    where: {
      userId,
    },
  })
}

export const createOrUpdateAIDiscoverySettings = async (
  userId: string,
  data: {
    contentAnalysis?: boolean
    audienceOverlap?: boolean
    engagementPattern?: boolean
    brandAlignment?: boolean
    growthPrediction?: boolean
    fraudDetection?: boolean
    trainingFrequency?: string
    lastTraining?: Date
    minConfidenceScore?: number
  },
) => {
  return client.aIDiscoverySettings.upsert({
    where: {
      userId,
    },
    update: data,
    create: {
      userId,
      ...data,
    },
  })
}

export const discoverInfluencersWithAI = async (
  userId: string,
  params: {
    prompt: string
    minFollowers?: number
    maxFollowers?: number
    minEngagement?: number
    maxEngagement?: number
    contentQuality?: number
    prioritizeEngagement?: boolean
    authenticAudience?: boolean
    contentAlignment?: boolean
    growthPotential?: boolean
    limit?: number
  },
) => {
  // In a real implementation, this would call an AI service
  // For now, we'll simulate AI discovery by finding influencers that match basic criteria

  const { minFollowers = 1000, maxFollowers = 1000000, minEngagement = 1, maxEngagement = 20, limit = 10 } = params

  // Get existing influencers that match criteria
  const existingInfluencers = await client.influencer.findMany({
    where: {
      userId,
      followers: {
        gte: minFollowers,
        lte: maxFollowers,
      },
      engagementRate: {
        gte: minEngagement,
        lte: maxEngagement,
      },
    },
    take: limit,
    orderBy: {
      // Simulate AI ranking with a random order
      createdAt: "desc",
    },
  })

  // In a real implementation, we would:
  // 1. Process the prompt with an AI model
  // 2. Search for influencers based on the AI's understanding
  // 3. Score and rank the results
  // 4. Return the best matches

  return existingInfluencers
}

export const findSimilarInfluencers = async (
  userId: string,
  referenceInfluencerId: string,
  params: {
    contentStyleWeight?: number
    audienceTypeWeight?: number
    engagementWeight?: number
    limit?: number
  },
) => {
  const { limit = 10 } = params

  // Get the reference influencer
  const referenceInfluencer = await client.influencer.findFirst({
    where: {
      id: referenceInfluencerId,
      userId,
    },
  })

  if (!referenceInfluencer) {
    return []
  }

  // Find similar influencers based on niche, followers range, and engagement rate
  const similarInfluencers = await client.influencer.findMany({
    where: {
      userId,
      id: {
        not: referenceInfluencerId,
      },
      niche: referenceInfluencer.niche,
      followers: {
        gte: referenceInfluencer.followers * 0.5,
        lte: referenceInfluencer.followers * 1.5,
      },
      engagementRate: {
        gte: referenceInfluencer.engagementRate * 0.5,
        lte: referenceInfluencer.engagementRate * 1.5,
      },
    },
    take: limit,
    orderBy: {
      // In a real implementation, we would calculate similarity scores
      // For now, order by closest follower count
      followers: "asc",
    },
  })

  return similarInfluencers
}

export const findSimilarInfluencersByUsername = async (
  userId: string,
  username: string,
  params: {
    contentStyleWeight?: number
    audienceTypeWeight?: number
    engagementWeight?: number
    limit?: number
  },
) => {
  const { limit = 10 } = params

  // In a real implementation, this would:
  // 1. Fetch the influencer profile from Instagram or a third-party API
  // 2. Extract key metrics and characteristics
  // 3. Find similar influencers in our database

  // For now, we'll simulate by finding influencers with similar usernames
  const similarInfluencers = await client.influencer.findMany({
    where: {
      userId,
      username: {
        contains: username.substring(0, 3),
        mode: "insensitive",
      },
    },
    take: limit,
  })

  return similarInfluencers
}

export const saveAIDiscoveredInfluencer = async (
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
    brandFit?: number
    audienceMatch?: number
    estimatedCost?: number
    aiDiscoveryScore?: number
    aiDiscoveryData?: any
  },
) => {
  return client.influencer.create({
    data: {
      ...data,
      userId,
      source: InfluencerSource.AI_DISCOVERY,
      metrics: {
        create: [
          {
            followers: data.followers,
            engagementRate: data.engagementRate,
            averageLikes: data.averageLikes,
            averageComments: data.averageComments,
            metricSource: "ai_discovery",
            // Add required fields based on your Prisma schema
            impressions: data.engagementRate, // Required field
            impressionsGrowth: 0, // Required field
          },
        ],
      },
    },
  })
}

