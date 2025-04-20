'use server'

import type {
  AutomationGoalsData,
  CustomerJourneyData,
  FeatureSelectionData,
  BusinessTypeData,
  WebsiteAnalysisData,
} from "@/types/business"


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

export async function getBusinessIdForUser(userId: string) {
  const user = await client.user.findUnique({
    where: { id: userId },
    include: { businesses: { select: { id: true } } },
  })

  if (!user || user.businesses.length === 0) {
    throw new Error("No business found for this user")
  }

  return user.businesses[0].id
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



type BusinessUpdateData = Partial<FormSchema> & {
  automationGoals?: AutomationGoalsData
  customerJourney?: CustomerJourneyData
  features?: FeatureSelectionData
  businessTypeData?: BusinessTypeData
  websiteAnalysis?: WebsiteAnalysisData
  automationSetupComplete?: boolean
  automationSetupDate?: Date
  automationAdditionalNotes?: string
}

export const updateBusines = async (clerkId: string, update: BusinessUpdateData) => {
  console.log(`[updateBusiness] Starting update for business ID: ${clerkId}`)
  console.log(`[updateBusiness] Update data:`, JSON.stringify(update, null, 2))

  try {
    // Ensure all JSON fields are properly stringified
    const processedUpdate = Object.entries(update).reduce<Record<string, any>>((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        acc[key] = JSON.stringify(value)
      } else {
        acc[key] = value
      }
      return acc
    }, {})

    const result = await client.business.update({
      where: { id:clerkId },
      data: processedUpdate,
    })

    console.log(`[updateBusiness] Update successful. Result:`, JSON.stringify(result, null, 2))
    return result
  } catch (error: unknown) {
    console.error(`[updateBusiness] Error updating business:`, error)
    if (error instanceof Error) {
      console.error(`[updateBusiness] Error stack:`, error.stack)
    }
    throw error
  }
}

export const getBusinessAutomationData = async (clerkId: string) => {
  const business = await client.business.findUnique({
    where: {
      id: clerkId,
    },
    select: {
      id: true,
      name: true,
      instagramHandle: true,
      website: true,
      industry: true,
      targetAudience: true,
      businessDescription: true,
      autoReplyEnabled: true,
      automationGoals: true,
      customerJourney: true,
      features: true,
      businessTypeData: true,
      websiteAnalysis: true,
      automationSetupComplete: true,
      automationSetupDate: true,
      automationAdditionalNotes: true,
    },
  })

  if (!business) return null

  // Parse JSON fields
  return {
    id: business.id,
    name: business.name,
    instagramHandle: business.instagramHandle,
    website: business.website,
    industry: business.industry,
    targetAudience: business.targetAudience,
    businessDescription: business.businessDescription,
    autoReplyEnabled: business.autoReplyEnabled,
    // Safely parse JSON fields
    automationGoals: business.automationGoals ? JSON.parse(business.automationGoals as string) : null,
    customerJourney: business.customerJourney ? JSON.parse(business.customerJourney as string) : null,
    features: business.features ? JSON.parse(business.features as string) : null,
    businessTypeData: business.businessTypeData ? JSON.parse(business.businessTypeData as string) : null,
    websiteAnalysis: business.websiteAnalysis ? JSON.parse(business.websiteAnalysis as string) : null,
    automationSetupComplete: business.automationSetupComplete,
    // Convert Date to string or number
    automationSetupDate: business.automationSetupDate ? business.automationSetupDate.toISOString() : null,
    automationAdditionalNotes: business.automationAdditionalNotes,
  }
  // return {
  //   ...business,
  //   automationGoals: business.automationGoals ? JSON.parse(business.automationGoals as string) : null,
  //   customerJourney: business.customerJourney ? JSON.parse(business.customerJourney as string) : null,
  //   features: business.features ? JSON.parse(business.features as string) : null,
  //   businessTypeData: business.businessTypeData ? JSON.parse(business.businessTypeData as string) : null,
  //   websiteAnalysis: business.websiteAnalysis ? JSON.parse(business.websiteAnalysis as string) : null,
  // }
}

//----


export async function getBusinessInfo(businessId: string) {
  try {
    const business = await client.business.findUnique({
      where: { id: businessId },
      select: {
        businessName: true,
        instagramHandle: true,
        website: true,
        industry: true,
        targetAudience: true,
        businessDescription: true,
      },
    })

    return business
  } catch (error) {
    console.error("Error fetching business info:", error)
    throw error
  }
}

export async function saveBusinessInfo(
  businessId: string,
  businessInfo: {
    businessName: string
    instagramHandle: string
    website: string
    industry: string
    targetAudience: string
    businessDescription: string
  },
) {
  try {
    const updatedBusiness = await client.business.update({
      where: { id: businessId },
      data: businessInfo,
    })

    return updatedBusiness
  } catch (error) {
    console.error("Error saving business info:", error)
    throw error
  }
}

//----testing for submissionsummary

// export const getBusinessAutomationDatum = async (clerkId: string) => {
//   const business = await client.business.findUnique({
//     where: {
//       id: clerkId,
//     },
//     select: {
//       id: true,
//       name: true,
//       instagramHandle: true,
//       website: true,
//       industry: true,
//       targetAudience: true,
//       businessDescription: true,
//       autoReplyEnabled: true,
//       automationGoals: true,
//       customerJourney: true,
//       features: true,
//       businessTypeData: true,
//       websiteAnalysis: true,
//       automationSetupComplete: true,
//       automationSetupDate: true,
//       automationAdditionalNotes: true,
//     },
//   })

//   if (!business) return null

//   // Parse JSON fields and return only serializable data
//   return {
//     id: business.id,
//     name: business.name,
//     instagramHandle: business.instagramHandle,
//     website: business.website,
//     industry: business.industry,
//     targetAudience: business.targetAudience,
//     businessDescription: business.businessDescription,
//     autoReplyEnabled: business.autoReplyEnabled,
//     automationGoals: business.automationGoals ? JSON.parse(business.automationGoals as string) : null,
//     customerJourney: business.customerJourney ? JSON.parse(business.customerJourney as string) : null,
//     features: business.features ? JSON.parse(business.features as string) : null,
//     businessTypeData: business.businessTypeData ? JSON.parse(business.businessTypeData as string) : null,
//     websiteAnalysis: business.websiteAnalysis ? JSON.parse(business.websiteAnalysis as string) : null,
//     automationSetupComplete: business.automationSetupComplete,
//     automationSetupDate: business.automationSetupDate ? business.automationSetupDate.toISOString() : null,
//     automationAdditionalNotes: business.automationAdditionalNotes,
//   }
// }

export const getBusinessAutomationDatum = async (clerkId: string) => {
  const business = await client.business.findUnique({
    where: {
      id: clerkId,
    },
    select: {
      id: true,
      name: true,
      instagramHandle: true,
      website: true,
      industry: true,
      targetAudience: true,
      businessDescription: true,
      autoReplyEnabled: true,
      automationGoals: true,
      customerJourney: true,
      features: true,
      businessTypeData: true,
      websiteAnalysis: true,
      automationSetupComplete: true,
      automationSetupDate: true,
      automationAdditionalNotes: true,
    },
  })

  if (!business) return null

  // Parse JSON fields and return only serializable data
  return {
    id: business.id,
    name: business.name,
    instagramHandle: business.instagramHandle,
    website: business.website,
    industry: business.industry,
    targetAudience: business.targetAudience,
    businessDescription: business.businessDescription,
    autoReplyEnabled: business.autoReplyEnabled,
    automationGoals: business.automationGoals ? JSON.parse(business.automationGoals as string) : null,
    customerJourney: business.customerJourney ? JSON.parse(business.customerJourney as string) : null,
    features: business.features ? JSON.parse(business.features as string) : null,
    businessTypeData: business.businessTypeData ? JSON.parse(business.businessTypeData as string) : null,
    websiteAnalysis: business.websiteAnalysis ? JSON.parse(business.websiteAnalysis as string) : null,
    automationSetupComplete: business.automationSetupComplete,
    automationSetupDate: business.automationSetupDate ? business.automationSetupDate.toISOString() : null,
    automationAdditionalNotes: business.automationAdditionalNotes,
  }
}

