import { client } from '@/lib/prisma'
import { Business } from '@prisma/client'

export const createBusinessQuery = async (data: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => {
  return await client.business.create({
    data: {
      ...data,
      autoReplyEnabled: true, // Set a default value
    },
  })
}

export const getBusinessQuery = async (userId: string) => {
  return await client.business.findFirst({
    where: {
      userId,
    },
  })
}

export const updateBusinessQuery = async (id: string, data: Partial<Omit<Business, 'id' | 'createdAt' | 'updatedAt'>>) => {
  return await client.business.update({
    where: { id },
    data,
  })
}

export const deleteBusinessQuery = async (id: string) => {
  return await client.business.delete({
    where: { id },
  })
}

