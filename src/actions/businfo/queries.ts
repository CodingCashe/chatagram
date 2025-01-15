// import { client } from '@/lib/prisma'

// export const createBusiness = async (clerkId: string, businessData: {
//   businessName: string
//   businessType: string
//   businessDescription: string
//   industry: string
//   instagramHandle: string
//   welcomeMessage: string
//   responseLanguage: string
//   businessHours: string
//   autoReplyEnabled: boolean
//   promotionMessage: string
// }) => {
//   return await client.user.update({
//     where: {
//       clerkId,
//     },
//     data: {
//       businesses: {
//         create: businessData,
//       },
//     },
//   })
// }

// export const getBusinesses = async (clerkId: string) => {
//   return await client.user.findUnique({
//     where: {
//       clerkId,
//     },
//     select: {
//       businesses: {
//         orderBy: {
//           createdAt: 'desc',
//         },
//       },
//     },
//   })
// }

// export const findBusiness = async (id: string) => {
//   return await client.business.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       user: {
//         select: {
//           subscription: true,
//         },
//       },
//     },
//   })
// }

// export const updateBusiness = async (
//   id: string,
//   update: Partial<{
//     businessName: string
//     businessType: string
//     businessDescription: string
//     industry: string
//     instagramHandle: string
//     welcomeMessage: string
//     responseLanguage: string
//     businessHours: string
//     autoReplyEnabled: boolean
//     promotionMessage: string
//   }>
// ) => {
//   return await client.business.update({
//     where: { id },
//     data: update,
//   })
// }

// export const deleteBusiness = async (businessId: string) => {
//   try {
//     return await client.business.delete({
//       where: {
//         id: businessId,
//       },
//     })
//   } catch (error) {
//     console.error('Error deleting business:', error)
//     return null
//   }
// }

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
      user: {
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



