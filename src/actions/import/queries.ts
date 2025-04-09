// 'use server'

// import { client } from '@/lib/prisma'
// import { InfluencerSource } from '@prisma/client'

// export const createImportRecord = async (
//   userId: string,
//   data: {
//     fileName: string
//     recordCount: number
//     successCount: number
//     errorCount: number
//     status: string
//     importType: string
//     errors?: any
//   }
// ) => {
//   return client.influencerImport.create({
//     data: {
//       ...data,
//       userId
//     }
//   })
// }

// export const getImportHistory = async (userId: string) => {
//   return client.influencerImport.findMany({
//     where: {
//       userId
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   })
// }

// export const getImportById = async (id: string, userId: string) => {
//   return client.influencerImport.findFirst({
//     where: {
//       id,
//       userId
//     }
//   })
// }

// export const importInfluencers = async (
//   userId: string,
//   influencers: {
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
//   }[],
//   importType: 'add_new' | 'update_existing' | 'replace_all'
// ) => {
//   // If replace_all, delete all existing influencers
//   if (importType === 'replace_all') {
//     await client.influencer.deleteMany({
//       where: {
//         userId
//       }
//     })
//   }

//   // Process each influencer
//   const results = await Promise.allSettled(
//     influencers.map(async (influencer) => {
//       if (importType === 'add_new') {
//         // Check if influencer already exists
//         const existing = await client.influencer.findFirst({
//           where: {
//             userId,
//             username: influencer.username
//           }
//         })

//         if (existing) {
//           return { status: 'skipped', username: influencer.username }
//         }

//         // Create new influencer
//         await client.influencer.create({
//           data: {
//             ...influencer,
//             userId,
//             source: InfluencerSource.MANUAL_IMPORT,
//             metrics: {
//               create: {
//                 followers: influencer.followers,
//                 engagementRate: influencer.engagementRate,
//                 averageLikes: influencer.averageLikes,
//                 averageComments: influencer.averageComments,
//                 metricSource: 'import'
//               }
//             }
//           }
//         })

//         return { status: 'created', username: influencer.username }
//       } else if (importType === 'update_existing') {
//         // Try to update existing, create if not found
//         const existing = await client.influencer.findFirst({
//           where: {
//             userId,
//             username: influencer.username
//           }
//         })

//         if (existing) {
//           // Update existing
//           await client.influencer.update({
//             where: {
//               id: existing.id
//             },
//             data: influencer
//           })

//           // Add new metric record
//           await client.influencerMetrics.create({
//             data: {
//               influencerId: existing.id,
//               followers: influencer.followers,
//               engagementRate: influencer.engagementRate,
//               averageLikes: influencer.averageLikes,
//               averageComments: influencer.averageComments,
//               metricSource: 'import'
//             }
//           })

//           return { status: 'updated', username: influencer.username }
//         } else {
//           // Create new
//           await client.influencer.create({
//             data: {
//               ...influencer,
//               userId,
//               source: InfluencerSource.MANUAL_IMPORT,
//               metrics: {
//                 create: {
//                   followers: influencer.followers,
//                   engagementRate: influencer.engagementRate,
//                   averageLikes: influencer.averageLikes,
//                   averageComments: influencer.averageComments,
//                   metricSource: 'import'
//                 }
//               }
//             }
//           })

//           return { status: 'created', username: influencer.username }
//         }
//       } else {
//         // For replace_all, just create new
//         await client.influencer.create({
//           data: {
//             ...influencer,
//             userId,
//             source: InfluencerSource.MANUAL_IMPORT,
//             metrics: {
//               create: {
//                 followers: influencer.followers,
//                 engagementRate: influencer.engagementRate,
//                 averageLikes: influencer.averageLikes,
//                 averageComments: influencer.averageComments,
//                 metricSource: 'import'
//               }
//             }
//           }
//         })

//         return { status: 'created', username: influencer.username }
//       }
//     })
//   )

//   // Count successes and failures
//   const successCount = results.filter(r => r.status === 'fulfilled').length
//   const errorCount = results.filter(r => r.status === 'rejected').length
//   const errors = results
//     .map((r, i) => r.status === 'rejected' ? { index: i, error: (r as PromiseRejectedResult).reason } : null)
//     .filter(Boolean)

//   // Create import record
//   const importRecord = await createImportRecord(userId, {
//     fileName: 'manual_import',
//     recordCount: influencers.length,
//     successCount,
//     errorCount,
//     status: errorCount > 0 ? (successCount > 0 ? 'partial' : 'failed') : 'completed',
//     importType,
//     errors: errors.length > 0 ? errors : undefined
//   })

//   return {
//     importRecord,
//     results: {
//       total: influencers.length,
//       success: successCount,
//       error: errorCount,
//       errors
//     }
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { InfluencerSource } from "@prisma/client"

export const createImportRecord = async (
  userId: string,
  data: {
    fileName: string
    recordCount: number
    successCount: number
    errorCount: number
    status: string
    importType: string
    errors?: any
  },
) => {
  return client.influencerImport.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const getImportHistory = async (userId: string) => {
  return client.influencerImport.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const getImportById = async (id: string, userId: string) => {
  return client.influencerImport.findFirst({
    where: {
      id,
      userId,
    },
  })
}

export const importInfluencers = async (
  userId: string,
  influencers: {
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
  }[],
  importType: "add_new" | "update_existing" | "replace_all",
) => {
  // If replace_all, delete all existing influencers
  if (importType === "replace_all") {
    await client.influencer.deleteMany({
      where: {
        userId,
      },
    })
  }

  // Process each influencer
  const results = await Promise.allSettled(
    influencers.map(async (influencer) => {
      if (importType === "add_new") {
        // Check if influencer already exists
        const existing = await client.influencer.findFirst({
          where: {
            userId,
            username: influencer.username,
          },
        })

        if (existing) {
          return { status: "skipped", username: influencer.username }
        }

        // Create new influencer
        await client.influencer.create({
          data: {
            ...influencer,
            userId,
            source: InfluencerSource.MANUAL_IMPORT,
            metrics: {
              create: [
                {
                  followers: influencer.followers,
                  engagementRate: influencer.engagementRate,
                  averageLikes: influencer.averageLikes,
                  averageComments: influencer.averageComments,
                  metricSource: "import",
                  // Add required fields
                  impressions: 0,
                  impressionsGrowth: 0,
                },
              ],
            },
          },
        })

        return { status: "created", username: influencer.username }
      } else if (importType === "update_existing") {
        // Try to update existing, create if not found
        const existing = await client.influencer.findFirst({
          where: {
            userId,
            username: influencer.username,
          },
        })

        if (existing) {
          // Update existing
          await client.influencer.update({
            where: {
              id: existing.id,
            },
            data: influencer,
          })

          // Add new metric record
          await client.influencerMetrics.create({
            data: {
              influencerId: existing.id,
              followers: influencer.followers,
              engagementRate: influencer.engagementRate,
              averageLikes: influencer.averageLikes,
              averageComments: influencer.averageComments,
              metricSource: "import",
              // Add required fields
              impressions: 0,
              impressionsGrowth: 0,
            },
          })

          return { status: "updated", username: influencer.username }
        } else {
          // Create new
          await client.influencer.create({
            data: {
              ...influencer,
              userId,
              source: InfluencerSource.MANUAL_IMPORT,
              metrics: {
                create: [
                  {
                    followers: influencer.followers,
                    engagementRate: influencer.engagementRate,
                    averageLikes: influencer.averageLikes,
                    averageComments: influencer.averageComments,
                    metricSource: "import",
                    // Add required fields
                    impressions: 0,
                    impressionsGrowth: 0,
                  },
                ],
              },
            },
          })

          return { status: "created", username: influencer.username }
        }
      } else {
        // For replace_all, just create new
        await client.influencer.create({
          data: {
            ...influencer,
            userId,
            source: InfluencerSource.MANUAL_IMPORT,
            metrics: {
              create: [
                {
                  followers: influencer.followers,
                  engagementRate: influencer.engagementRate,
                  averageLikes: influencer.averageLikes,
                  averageComments: influencer.averageComments,
                  metricSource: "import",
                  // Add required fields
                  impressions: 0,
                  impressionsGrowth: 0,
                },
              ],
            },
          },
        })

        return { status: "created", username: influencer.username }
      }
    }),
  )

  // Count successes and failures
  const successCount = results.filter((r) => r.status === "fulfilled").length
  const errorCount = results.filter((r) => r.status === "rejected").length
  const errors = results
    .map((r, i) => (r.status === "rejected" ? { index: i, error: (r as PromiseRejectedResult).reason } : null))
    .filter(Boolean)

  // Create import record
  const importRecord = await createImportRecord(userId, {
    fileName: "manual_import",
    recordCount: influencers.length,
    successCount,
    errorCount,
    status: errorCount > 0 ? (successCount > 0 ? "partial" : "failed") : "completed",
    importType,
    errors: errors.length > 0 ? errors : undefined,
  })

  return {
    importRecord,
    results: {
      total: influencers.length,
      success: successCount,
      error: errorCount,
      errors,
    },
  }
}
