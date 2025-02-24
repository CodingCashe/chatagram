'use server'

import { client } from '@/lib/prisma'
import { FormSchema } from '@/components/global/businessInfo/businessInfo'

export const createBusiness = async (clerkId: string, businessData: FormSchema) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      businesses: {
        create: businessData,
      },
    },
  })
}

export const getBusinesses = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      businesses: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

export const findBusiness = async (id: string) => {
  return await client.business.findUnique({
    where: {
      id,
    },
    include: {
      User: {
        select: {
          subscription: true,
        },
      },
    },
  })
}

export const updateBusiness = async (
  id: string,
  update: Partial<FormSchema>
) => {
  return await client.business.update({
    where: { id },
    data: update,
  })
}

export const deleteBusiness = async (businessId: string) => {
  try {
    return await client.business.delete({
      where: {
        id: businessId,
      },
    })
  } catch (error) {
    console.error('Error deleting business:', error)
    return null
  }
}



// Add this new function
export const getBusinessesForWebhook = async (businessId: string) => {
  return await client.business.findUnique({
    where: {
      id: businessId,
    },   
  })
}

