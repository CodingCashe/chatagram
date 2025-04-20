"use server"

import { onCurrentUser } from "../user"
import {
  getInfluencers,
  getInfluencerById,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
  addInfluencerToList,
  removeInfluencerFromList,
  getInfluencerLists,
  getInfluencerListById,
  createInfluencerList,
  updateInfluencerList,
  deleteInfluencerList,
} from "./queries"
import type { InfluencerSource, InfluencerStatus } from "@prisma/client"

export const discoverInfluencers = async (filters?: {
  source?: InfluencerSource[]
  status?: InfluencerStatus[]
  minFollowers?: number
  maxFollowers?: number
  minEngagement?: number
  maxEngagement?: number
  niche?: string[]
  location?: string
  verified?: boolean
  search?: string
  sortBy?: string
  sortDirection?: "asc" | "desc"
  page?: number
  limit?: number
}) => {
  const user = await onCurrentUser()
  try {
    const result = await getInfluencers(user.id, filters)
    return { status: 200, data: result }
  } catch (error) {
    console.error("Error discovering influencers:", error)
    return { status: 500, data: "Failed to discover influencers" }
  }
}

export const getInfluencerDetails = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const influencer = await getInfluencerById(id, user.id)
    if (influencer) {
      return { status: 200, data: influencer }
    }
    return { status: 404, data: "Influencer not found" }
  } catch (error) {
    console.error("Error getting influencer details:", error)
    return { status: 500, data: "Failed to get influencer details" }
  }
}

export const addInfluencer = async (data: {
  name: string
  username: string
  bio?: string
  profilePicture?: string
  followers: number
  following?: number
  postsCount?: number
  engagementRate: number
  averageLikes?: number
  averageComments?: number
  verified?: boolean
  location?: string
  niche?: string
  email?: string
  website?: string
  contactInfo?: any
  notes?: string
  tags?: string[]
  brandFit?: number
  audienceMatch?: number
  estimatedCost?: number
  source: InfluencerSource
  sourceId?: string
  audienceDemographics?: any
  authenticity?: number
  growthRate?: number
}) => {
  const user = await onCurrentUser()
  try {
    const influencer = await createInfluencer(user.id, data)
    return { status: 200, data: influencer }
  } catch (error) {
    console.error("Error adding influencer:", error)
    return { status: 500, data: "Failed to add influencer" }
  }
}

export const editInfluencer = async (
  id: string,
  data: {
    name?: string
    bio?: string
    profilePicture?: string
    followers?: number
    following?: number
    postsCount?: number
    engagementRate?: number
    averageLikes?: number
    averageComments?: number
    verified?: boolean
    location?: string
    niche?: string
    email?: string
    website?: string
    contactInfo?: any
    notes?: string
    tags?: string[]
    brandFit?: number
    audienceMatch?: number
    estimatedCost?: number
    status?: InfluencerStatus
    audienceDemographics?: any
    authenticity?: number
    growthRate?: number
  },
) => {
  const user = await onCurrentUser()
  try {
    const influencer = await updateInfluencer(id, user.id, data)
    if (influencer) {
      return { status: 200, data: influencer }
    }
    return { status: 404, data: "Influencer not found" }
  } catch (error) {
    console.error("Error updating influencer:", error)
    return { status: 500, data: "Failed to update influencer" }
  }
}

export const removeInfluencer = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const result = await deleteInfluencer(id, user.id)
    if (result) {
      return { status: 200, data: "Influencer deleted successfully" }
    }
    return { status: 404, data: "Influencer not found" }
  } catch (error) {
    console.error("Error deleting influencer:", error)
    return { status: 500, data: "Failed to delete influencer" }
  }
}

export const addToList = async (influencerId: string, listId: string) => {
  const user = await onCurrentUser()
  try {
    const result = await addInfluencerToList(influencerId, listId, user.id)
    if (result) {
      return { status: 200, data: "Influencer added to list" }
    }
    return { status: 404, data: "Influencer or list not found" }
  } catch (error) {
    console.error("Error adding influencer to list:", error)
    return { status: 500, data: "Failed to add influencer to list" }
  }
}

export const removeFromList = async (influencerId: string, listId: string) => {
  const user = await onCurrentUser()
  try {
    const result = await removeInfluencerFromList(influencerId, listId, user.id)
    if (result) {
      return { status: 200, data: "Influencer removed from list" }
    }
    return { status: 404, data: "Influencer or list not found" }
  } catch (error) {
    console.error("Error removing influencer from list:", error)
    return { status: 500, data: "Failed to remove influencer from list" }
  }
}

export const getLists = async () => {
  const user = await onCurrentUser()
  try {
    const lists = await getInfluencerLists(user.id)
    return { status: 200, data: lists }
  } catch (error) {
    console.error("Error getting influencer lists:", error)
    return { status: 500, data: "Failed to get influencer lists" }
  }
}

export const getListDetails = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const list = await getInfluencerListById(id, user.id)
    if (list) {
      return { status: 200, data: list }
    }
    return { status: 404, data: "List not found" }
  } catch (error) {
    console.error("Error getting list details:", error)
    return { status: 500, data: "Failed to get list details" }
  }
}

export const createList = async (data: {
  name: string
  description?: string
}) => {
  const user = await onCurrentUser()
  try {
    const list = await createInfluencerList(user.id, data)
    return { status: 200, data: list }
  } catch (error) {
    console.error("Error creating list:", error)
    return { status: 500, data: "Failed to create list" }
  }
}

export const updateList = async (
  id: string,
  data: {
    name?: string
    description?: string
  },
) => {
  const user = await onCurrentUser()
  try {
    const list = await updateInfluencerList(id, user.id, data)
    if (list) {
      return { status: 200, data: list }
    }
    return { status: 404, data: "List not found" }
  } catch (error) {
    console.error("Error updating list:", error)
    return { status: 500, data: "Failed to update list" }
  }
}

export const deleteList = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const result = await deleteInfluencerList(id, user.id)
    if (result) {
      return { status: 200, data: "List deleted successfully" }
    }
    return { status: 404, data: "List not found" }
  } catch (error) {
    console.error("Error deleting list:", error)
    return { status: 500, data: "Failed to delete list" }
  }
}

