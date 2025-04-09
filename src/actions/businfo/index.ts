'use server'
type SaveResult = {
  status: number;
  data: string;
}

import type {
  AutomationGoalsData,
  CustomerJourneyData,
  FeatureSelectionData,
  BusinessTypeData,
  WebsiteAnalysisData,
} from "@/types/business"


import { onCurrentUser } from '../user'
import {
  getBusinessesForWebhook,
  createBusiness,
  getBusinesses,
  findBusiness,
  updateBusines,
  updateBusiness,
  deleteBusiness as deleteBusinessQuery
} from './queries'
import { FormSchema } from '@/types/schema'

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

// Add this new function
export const getBusinessForWebhook = async (businessId: string) => {
  try {
    const result = await getBusinessesForWebhook(businessId)
    if (result) {
      return { status: 200, data: { business: result } }
    }
    return { status: 404, data: { business: null } }
  } catch (error) {
    console.error('Error fetching business for webhook:', error)
    return { status: 500, data: { business: null } }
  }
}


const handleSaveOperation = async (
  operationName: string,
  businessId: string,
  data: any
): Promise<SaveResult> => {
  console.log(`[${operationName}] Starting operation for business ID: ${businessId}`)
  console.log(`[${operationName}] Data:`, JSON.stringify(data, null, 2))

  try {
    const result = await updateBusines(businessId, data)
    console.log(`[${operationName}] Operation successful. Result:`, JSON.stringify(result, null, 2))
    return { status: 200, data: `${operationName} saved successfully` }
  } catch (error: unknown) {
    console.error(`[${operationName}] Error:`, error)
    if (error instanceof Error) {
      return { status: 500, data: `Error in ${operationName}: ${error.message}` }
    }
    return { status: 500, data: `Unknown error in ${operationName}` }
  }
}

export const saveAutomationGoals = async (businessId: string, automationGoals: AutomationGoalsData): Promise<SaveResult> => {
  return handleSaveOperation('saveAutomationGoals', businessId, { automationGoals })
}

export const saveCustomerJourney = async (businessId: string, customerJourney: CustomerJourneyData): Promise<SaveResult> => {
  return handleSaveOperation('saveCustomerJourney', businessId, { customerJourney })
}

export const saveFeatureSelections = async (businessId: string, features: FeatureSelectionData): Promise<SaveResult> => {
  return handleSaveOperation('saveFeatureSelections', businessId, { features })
}

export const saveBusinessTypeData = async (businessId: string, businessTypeData: BusinessTypeData): Promise<SaveResult> => {
  return handleSaveOperation('saveBusinessTypeData', businessId, { businessTypeData })
}

export const saveWebsiteAnalysis = async (businessId: string, websiteAnalysis: WebsiteAnalysisData): Promise<SaveResult> => {
  return handleSaveOperation('saveWebsiteAnalysis', businessId, { websiteAnalysis })
}

export const submitAutomationSetup = async (businessId: string, additionalNotes: string): Promise<SaveResult> => {
  return handleSaveOperation('submitAutomationSetup', businessId, {
    automationSetupComplete: true,
    automationSetupDate: new Date(),
    automationAdditionalNotes: additionalNotes,
  })
}

