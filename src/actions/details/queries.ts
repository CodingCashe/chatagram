"use server"

import { client } from "@/lib/prisma"

export const createMarketingInfo = async (userId: string, data: { email?: string; phone?: string; name?: string }) => {
  return await client.marketingInfo.create({
    data: {
      ...data,
      User: {
        connect: { id: userId },
      },
    },
  })
}

export const getMarketingInfo = async (userId: string) => {
  return await client.marketingInfo.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const updateMarketingInfo = async (id: string, data: { email?: string; phone?: string; name?: string }) => {
  return await client.marketingInfo.update({
    where: { id },
    data,
  })
}

export const deleteMarketingInfo = async (id: string) => {
  return await client.marketingInfo.delete({
    where: { id },
  })
}

// "use server"

// import { client } from "@/lib/prisma"

// export const createMarketingInfo = async (clerkId: string, data: { email?: string; phone?: string; name?: string }) => {
//   return await client.user.update({
//     where: {
//       clerkId,
//     },
//     data: {
//       marketingInfo: {
//         create: data,
//       },
//     },
//   })
// }

// export const getMarketingInfo = async (clerkId: string) => {
//   return await client.user.findUnique({
//     where: {
//       clerkId,
//     },
//     select: {
//       marketingInfo: {
//         orderBy: {
//           createdAt: "desc",
//         },
//       },
//     },
//   })
// }

// export const updateMarketingInfo = async (id: string, data: { email?: string; phone?: string; name?: string }) => {
//   return await client.marketingInfo.update({
//     where: { id },
//     data,
//   })
// }

// export const deleteMarketingInfo = async (id: string) => {
//   try {
//     return await client.marketingInfo.delete({
//       where: {
//         id,
//       },
//     })
//   } catch (error) {
//     console.error("Error deleting marketing info:", error)
//     return null
//   }
// }

