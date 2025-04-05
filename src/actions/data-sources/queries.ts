// 'use server'

// import { client } from '@/lib/prisma'

// export const getDataSourceSettings = async (userId: string) => {
//   return client.dataSourceSettings.findUnique({
//     where: {
//       userId
//     }
//   })
// }

// export const createOrUpdateDataSourceSettings = async (
//   userId: string,
//   data: {
//     instagramApiActive?: boolean
//     thirdPartyActive?: boolean
//     webScrapingActive?: boolean
//     portalActive?: boolean
//     aiDiscoveryActive?: boolean
//     instagramRefreshRate?: number
//     thirdPartyRefreshRate?: number
//     webScrapingRateLimit?: number
//     webScrapingDailyQuota?: number
//     rawDataRetention?: number
//     processedDataRetention?: number
//   }
// ) => {
//   return client.dataSourceSettings.upsert({
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

"use server"

import { client } from "@/lib/prisma"

export const getDataSourceSettings = async (userId: string) => {
  const settings = await client.dataSourceSettings.findUnique({
    where: { userId },
  })

  return settings
}

export const createOrUpdateDataSourceSettings = async (
  userId: string,
  data: {
    instagramApiActive?: boolean
    thirdPartyActive?: boolean
    webScrapingActive?: boolean
    portalActive?: boolean
    aiDiscoveryActive?: boolean
    instagramRefreshRate?: number
    thirdPartyRefreshRate?: number
    webScrapingRateLimit?: number
    webScrapingDailyQuota?: number
    rawDataRetention?: number
    processedDataRetention?: number
  },
) => {
  return client.dataSourceSettings.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data,
    },
  })
}

