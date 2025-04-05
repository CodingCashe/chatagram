'use server'

import { onCurrentUser } from '../user'
import {
  getAIDiscoverySettings,
  createOrUpdateAIDiscoverySettings,
  discoverInfluencersWithAI,
  findSimilarInfluencers,
  findSimilarInfluencersByUsername,
  saveAIDiscoveredInfluencer
} from './queries'

export const getAISettings = async () => {
  const user = await onCurrentUser()
  try {
    const settings = await getAIDiscoverySettings(user.id)
    return { status: 200, data: settings || {} }
  } catch (error) {
    console.error('Error getting AI discovery settings:', error)
    return { status: 500, data: 'Failed to get AI discovery settings' }
  }
}

export const updateAISettings = async (data: {
  contentAnalysis?: boolean
  audienceOverlap?: boolean
  engagementPattern?: boolean
  brandAlignment?: boolean
  growthPrediction?: boolean
  fraudDetection?: boolean
  trainingFrequency?: string
  lastTraining?: Date
  minConfidenceScore?: number
}) => {
  const user = await onCurrentUser()
  try {
    const settings = await createOrUpdateAIDiscoverySettings(user.id, data)
    return { status: 200, data: settings }
  } catch (error) {
    console.error('Error updating AI discovery settings:', error)
    return { status: 500, data: 'Failed to update AI discovery settings' }
  }
}

export const discoverWithAI = async (params: {
  prompt: string
  minFollowers?: number
  maxFollowers?: number
  minEngagement?: number
  maxEngagement?: number
  contentQuality?: number
  prioritizeEngagement?: boolean
  authenticAudience?: boolean
  contentAlignment?: boolean
  growthPotential?: boolean
  limit?: number
}) => {
  const user = await onCurrentUser()
  try {
    const influencers = await discoverInfluencersWithAI(user.id, params)
    return { status: 200, data: influencers }
  } catch (error) {
    console.error('Error discovering influencers with AI:', error)
    return { status: 500, data: 'Failed to discover influencers with AI' }
  }
}

export const findSimilarInfluencersAction = async (
  referenceInfluencerId: string,
  params: {
    contentStyleWeight?: number
    audienceTypeWeight?: number
    engagementWeight?: number
    limit?: number
  }
) => {
  const user = await onCurrentUser()
  try {
    const influencers = await findSimilarInfluencers(user.id, referenceInfluencerId, params)
    return { status: 200, data: influencers }
  } catch (error) {
    console.error('Error finding similar influencers:', error)
    return { status: 500, data: 'Failed to find similar influencers' }
  }
}

export const findSimilarByUsername = async (
  username: string,
  params: {
    contentStyleWeight?: number
    audienceTypeWeight?: number
    engagementWeight?: number
    limit?: number
  }
) => {
  const user = await onCurrentUser()
  try {
    const influencers = await findSimilarInfluencersByUsername(user.id, username, params)
    return { status: 200, data: influencers }
  } catch (error) {
    console.error('Error finding similar influencers by username:', error)
    return { status: 500, data: 'Failed to find similar influencers by username' }
  }
}

export const saveAIDiscoveredInfluencerAction = async (data: {
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
  brandFit?: number
  audienceMatch?: number
  estimatedCost?: number
  aiDiscoveryScore?: number
  aiDiscoveryData?: any
}) => {
  const user = await onCurrentUser()
  try {
    const influencer = await saveAIDiscoveredInfluencer(user.id, data)
    return { status: 200, data: influencer }
  } catch (error) {
    console.error('Error saving AI discovered influencer:', error)
    return { status: 500, data: 'Failed to save AI discovered influencer' }
  }
}