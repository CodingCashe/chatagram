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

