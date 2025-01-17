// 'use server'

// import { onCurrentUser } from '../user'
// import {
//   createBusiness,
//   getBusinesses,
//   findBusiness,
//   updateBusiness,
//   deleteBusiness as deleteBusinessQuery
// } from './queries'

// export const createNewBusiness = async (businessData: {
//   name: string
//   description?: string
//   industry?: string
// }) => {
//   const user = await onCurrentUser()
//   try {
//     const business = await createBusiness(user.id, businessData)
//     if (business) return { status: 200, data: 'Business created', res: business }
//     return { status: 404, data: 'Oops! something went wrong' }
//   } catch (error) {
//     return { status: 500, data: 'Try refreshing the page first' }
//   }
// }

// export const getAllBusinesses = async () => {
//   const user = await onCurrentUser()
//   try {
//     const businesses = await getBusinesses(user.id)
//     if (businesses) return { status: 200, data: businesses }
//     return { status: 404, data: [] }
//   } catch (error) {
//     return { status: 500, data: [] }
//   }
// }

// export const getBusinessInfo = async (id: string) => {
//   await onCurrentUser()
//   try {
//     const business = await findBusiness(id)
//     if (business) return { status: 200, data: business }
//     return { status: 404 }
//   } catch (error) {
//     return { status: 500 }
//   }
// }

// export const updateBusinessInfo = async (
//   businessId: string,
//   data: {
//     name?: string
//     description?: string
//     industry?: string
//   }
// ) => {
//   await onCurrentUser()
//   try {
//     const update = await updateBusiness(businessId, data)
//     if (update) {
//       return { status: 200, data: 'Business successfully updated' }
//     }
//     return { status: 404, data: 'Oops! could not find business' }
//   } catch (error) {
//     return { status: 500, data: 'Oops! something went wrong' }
//   }
// }

// export const deleteBusiness = async (businessId: string) => {
//   await onCurrentUser()
//   try {
//     const deleted = await deleteBusinessQuery(businessId)
//     if (deleted) {
//       return { status: 200, data: 'Business deleted successfully' }
//     }
//     return { status: 404, data: 'Business not found' }
//   } catch (error) {
//     return { status: 500, data: 'Oops! something went wrong' }
//   }
// }

// 'use server'

// import { onCurrentUser } from '../user'
// import {
//   createBusiness,
//   getBusinesses,
//   findBusiness,
//   updateBusiness,
//   deleteBusiness as deleteBusinessQuery
// } from './queries'

// export const createNewBusiness = async (businessData: {
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
//   const user = await onCurrentUser()
//   try {
//     const business = await createBusiness(user.id, businessData)
//     if (business) return { status: 200, data: 'Business created', res: business }
//     return { status: 404, data: 'Oops! something went wrong' }
//   } catch (error) {
//     return { status: 500, data: 'Try refreshing the page first' }
//   }
// }

// export const getAllBusinesses = async () => {
//   const user = await onCurrentUser()
//   try {
//     const businesses = await getBusinesses(user.id)
//     if (businesses) return { status: 200, data: businesses }
//     return { status: 404, data: [] }
//   } catch (error) {
//     return { status: 500, data: [] }
//   }
// }

// export const getBusinessInfo = async (id: string) => {
//   await onCurrentUser()
//   try {
//     const business = await findBusiness(id)
//     if (business) return { status: 200, data: business }
//     return { status: 404 }
//   } catch (error) {
//     return { status: 500 }
//   }
// }

// export const updateBusinessInfo = async (
//   businessId: string,
//   data: Partial<{
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
//   await onCurrentUser()
//   try {
//     const update = await updateBusiness(businessId, data)
//     if (update) {
//       return { status: 200, data: 'Business successfully updated' }
//     }
//     return { status: 404, data: 'Oops! could not find business' }
//   } catch (error) {
//     return { status: 500, data: 'Oops! something went wrong' }
//   }
// }

// export const deleteBusiness = async (businessId: string) => {
//   await onCurrentUser()
//   try {
//     const deleted = await deleteBusinessQuery(businessId)
//     if (deleted) {
//       return { status: 200, data: 'Business deleted successfully' }
//     }
//     return { status: 404, data: 'Business not found' }
//   } catch (error) {
//     return { status: 500, data: 'Oops! something went wrong' }
//   }
// }

// export const toggleAutoReply = async (businessId: string, autoReplyEnabled: boolean) => {
//   await onCurrentUser()
//   try {
//     const update = await updateBusiness(businessId, { autoReplyEnabled })
//     if (update) {
//       return { status: 200, data: `Auto-reply ${autoReplyEnabled ? 'enabled' : 'disabled'}` }
//     }
//     return { status: 404, data: 'Oops! could not find business' }
//   } catch (error) {
//     return { status: 500, data: 'Oops! something went wrong' }
//   }
// }

'use server'

import { onCurrentUser } from '../user'
import {
  createBusiness,
  getBusinesses,
  findBusiness,
  updateBusiness,
  deleteBusiness as deleteBusinessQuery
} from './queries'
import { FormSchema } from '@/components/global/businessInfo/businessInfo'

export const createNewBusiness = async (businessData: FormSchema) => {
  const user = await onCurrentUser()
  try {
    const business = await createBusiness(user.id, businessData)
    if (business) return { status: 200, data: 'Business created', res: business }
    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    return { status: 500, data: 'Try refreshing the page first' }
  }
}

export const getAllBusinesses = async () => {
  const user = await onCurrentUser()
  try {
    const result = await getBusinesses(user.id)
    if (result && result.businesses) {
      return { status: 200, data: { businesses: result.businesses } }
    }
    return { status: 404, data: { businesses: [] } }
  } catch (error) {
    return { status: 500, data: { businesses: [] } }
  }
}

export const getBusinessInfo = async (id: string) => {
  await onCurrentUser()
  try {
    const business = await findBusiness(id)
    if (business) return { status: 200, data: business }
    return { status: 404, data: null }
  } catch (error) {
    return { status: 500, data: null }
  }
}

export const updateBusinessInfo = async (
  businessId: string,
  data: Partial<FormSchema>
) => {
  await onCurrentUser()
  try {
    const update = await updateBusiness(businessId, data)
    if (update) {
      return { status: 200, data: 'Business successfully updated' }
    }
    return { status: 404, data: 'Oops! could not find business' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const deleteBusiness = async (businessId: string) => {
  await onCurrentUser()
  try {
    const deleted = await deleteBusinessQuery(businessId)
    if (deleted) {
      return { status: 200, data: 'Business deleted successfully' }
    }
    return { status: 404, data: 'Business not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const toggleAutoReply = async (businessId: string, autoReplyEnabled: boolean) => {
  await onCurrentUser()
  try {
    const update = await updateBusiness(businessId, { autoReplyEnabled })
    if (update) {
      return { status: 200, data: `Auto-reply ${autoReplyEnabled ? 'enabled' : 'disabled'}` }
    }
    return { status: 404, data: 'Oops! could not find business' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

