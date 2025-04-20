"use server"

import { onCurrentUser } from "../user"
import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  addInfluencerToCampaign,
  removeInfluencerFromCampaign,
  updateCampaignInfluencer,
  addCampaignAnalytics,
  updateCampaignAnalytics,
  deleteCampaignAnalytics,
} from "./queries"
import type { MyCampaignStatus } from "@prisma/client"

export const getAllCampaigns = async (filters?: {
  status?: MyCampaignStatus[]
  search?: string
  startDateFrom?: Date
  startDateTo?: Date
  endDateFrom?: Date
  endDateTo?: Date
  sortBy?: string
  sortDirection?: "asc" | "desc"
  page?: number
  limit?: number
}) => {
  const user = await onCurrentUser()
  try {
    const result = await getCampaigns(user.id, filters)
    return { status: 200, data: result }
  } catch (error) {
    console.error("Error getting campaigns:", error)
    return { status: 500, data: "Failed to get campaigns" }
  }
}

export const getCampaignDetails = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const campaign = await getCampaignById(id, user.id)
    if (campaign) {
      return { status: 200, data: campaign }
    }
    return { status: 404, data: "Campaign not found" }
  } catch (error) {
    console.error("Error getting campaign details:", error)
    return { status: 500, data: "Failed to get campaign details" }
  }
}

export const addCampaign = async (data: {
  name: string
  description?: string
  startDate?: Date
  endDate?: Date
  budget?: number
  goals?: any
  brief?: string
  guidelines?: string
  hashtags?: string[]
  mentions?: string[]
}) => {
  const user = await onCurrentUser()
  try {
    const campaign = await createCampaign(user.id, data)
    return { status: 200, data: campaign }
  } catch (error) {
    console.error("Error adding campaign:", error)
    return { status: 500, data: "Failed to add campaign" }
  }
}

export const editCampaign = async (
  id: string,
  data: {
    name?: string
    description?: string
    startDate?: Date
    endDate?: Date
    budget?: number
    status?: MyCampaignStatus
    goals?: any
    brief?: string
    guidelines?: string
    hashtags?: string[]
    mentions?: string[]
  },
) => {
  const user = await onCurrentUser()
  try {
    const campaign = await updateCampaign(id, user.id, data)
    if (campaign) {
      return { status: 200, data: campaign }
    }
    return { status: 404, data: "Campaign not found" }
  } catch (error) {
    console.error("Error updating campaign:", error)
    return { status: 500, data: "Failed to update campaign" }
  }
}

export const removeCampaign = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const result = await deleteCampaign(id, user.id)
    if (result) {
      return { status: 200, data: "Campaign deleted successfully" }
    }
    return { status: 404, data: "Campaign not found" }
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return { status: 500, data: "Failed to delete campaign" }
  }
}

export const addInfluencerToCampaignAction = async (
  campaignId: string,
  influencerId: string,
  data: {
    status?: string
    rate?: number
    deliverables?: any
    notes?: string
  },
) => {
  const user = await onCurrentUser()
  try {
    const result = await addInfluencerToCampaign(campaignId, influencerId, user.id, data)
    if (result) {
      return { status: 200, data: "Influencer added to campaign" }
    }
    return { status: 404, data: "Campaign or influencer not found" }
  } catch (error) {
    console.error("Error adding influencer to campaign:", error)
    return { status: 500, data: "Failed to add influencer to campaign" }
  }
}

export const removeInfluencerFromCampaignAction = async (campaignId: string, influencerId: string) => {
  const user = await onCurrentUser()
  try {
    const result = await removeInfluencerFromCampaign(campaignId, influencerId, user.id)
    if (result) {
      return { status: 200, data: "Influencer removed from campaign" }
    }
    return { status: 404, data: "Campaign or influencer not found" }
  } catch (error) {
    console.error("Error removing influencer from campaign:", error)
    return { status: 500, data: "Failed to remove influencer from campaign" }
  }
}

export const updateCampaignInfluencerAction = async (
  campaignId: string,
  influencerId: string,
  data: {
    status?: string
    rate?: number
    deliverables?: any
    contentUrls?: string[]
    notes?: string
    performance?: any
  },
) => {
  const user = await onCurrentUser()
  try {
    const result = await updateCampaignInfluencer(campaignId, influencerId, user.id, data)
    if (result) {
      return { status: 200, data: "Campaign influencer updated" }
    }
    return { status: 404, data: "Campaign or influencer not found" }
  } catch (error) {
    console.error("Error updating campaign influencer:", error)
    return { status: 500, data: "Failed to update campaign influencer" }
  }
}

export const addCampaignAnalyticsAction = async (
  campaignId: string,
  data: {
    date?: Date
    reach?: number
    impressions?: number
    engagement?: number
    clicks?: number
    conversions?: number
    roi?: number
    costPerEngagement?: number
    costPerClick?: number
    costPerConversion?: number
    metrics?: any
  },
) => {
  const user = await onCurrentUser()
  try {
    const result = await addCampaignAnalytics(campaignId, user.id, data)
    if (result) {
      return { status: 200, data: result }
    }
    return { status: 404, data: "Campaign not found" }
  } catch (error) {
    console.error("Error adding campaign analytics:", error)
    return { status: 500, data: "Failed to add campaign analytics" }
  }
}

export const updateCampaignAnalyticsAction = async (
  id: string,
  data: {
    reach?: number
    impressions?: number
    engagement?: number
    clicks?: number
    conversions?: number
    roi?: number
    costPerEngagement?: number
    costPerClick?: number
    costPerConversion?: number
    metrics?: any
  },
) => {
  const user = await onCurrentUser()
  try {
    const result = await updateCampaignAnalytics(id, user.id, data)
    if (result) {
      return { status: 200, data: result }
    }
    return { status: 404, data: "Analytics not found" }
  } catch (error) {
    console.error("Error updating campaign analytics:", error)
    return { status: 500, data: "Failed to update campaign analytics" }
  }
}

export const deleteCampaignAnalyticsAction = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const result = await deleteCampaignAnalytics(id, user.id)
    if (result) {
      return { status: 200, data: "Analytics deleted successfully" }
    }
    return { status: 404, data: "Analytics not found" }
  } catch (error) {
    console.error("Error deleting campaign analytics:", error)
    return { status: 500, data: "Failed to delete campaign analytics" }
  }
}

