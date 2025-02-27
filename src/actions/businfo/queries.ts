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

//JUST ADDED



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

export const updateBusines = async (id: string, update: BusinessUpdateData) => {
  // Convert the update object to be compatible with Prisma's expected input
  const prismaUpdate = {
    ...update,
    automationGoals: update.automationGoals ? JSON.stringify(update.automationGoals) : undefined,
    customerJourney: update.customerJourney ? JSON.stringify(update.customerJourney) : undefined,
    features: update.features ? JSON.stringify(update.features) : undefined,
    businessTypeData: update.businessTypeData ? JSON.stringify(update.businessTypeData) : undefined,
    websiteAnalysis: update.websiteAnalysis ? JSON.stringify(update.websiteAnalysis) : undefined,
  }

  return await client.business.update({
    where: { id },
    data: prismaUpdate,
  })
}

export const getBusinessAutomationData = async (businessId: string) => {
  const business = await client.business.findUnique({
    where: {
      id: businessId,
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
    ...business,
    automationGoals: business.automationGoals ? JSON.parse(business.automationGoals as string) : null,
    customerJourney: business.customerJourney ? JSON.parse(business.customerJourney as string) : null,
    features: business.features ? JSON.parse(business.features as string) : null,
    businessTypeData: business.businessTypeData ? JSON.parse(business.businessTypeData as string) : null,
    websiteAnalysis: business.websiteAnalysis ? JSON.parse(business.websiteAnalysis as string) : null,
  }
}

