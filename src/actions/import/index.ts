'use server'

import { onCurrentUser } from '../user'
import {
  createImportRecord,
  getImportHistory,
  getImportById,
  importInfluencers
} from './queries'

export const createImportRecordAction = async (data: {
  fileName: string
  recordCount: number
  successCount: number
  errorCount: number
  status: string
  importType: string
  errors?: any
}) => {
  const user = await onCurrentUser()
  try {
    const record = await createImportRecord(user.id, data)
    return { status: 200, data: record }
  } catch (error) {
    console.error('Error creating import record:', error)
    return { status: 500, data: 'Failed to create import record' }
  }
}

export const getImportHistoryAction = async () => {
  const user = await onCurrentUser()
  try {
    const history = await getImportHistory(user.id)
    return { status: 200, data: history }
  } catch (error) {
    console.error('Error getting import history:', error)
    return { status: 500, data: 'Failed to get import history' }
  }
}

export const getImportDetailsAction = async (id: string) => {
  const user = await onCurrentUser()
  try {
    const importRecord = await getImportById(id, user.id)
    if (importRecord) {
      return { status: 200, data: importRecord }
    }
    return { status: 404, data: 'Import record not found' }
  } catch (error) {
    console.error('Error getting import details:', error)
    return { status: 500, data: 'Failed to get import details' }
  }
}

export const importInfluencersAction = async (
  influencers: {
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
  }[],
  importType: 'add_new' | 'update_existing' | 'replace_all'
) => {
  const user = await onCurrentUser()
  try {
    const result = await importInfluencers(user.id, influencers, importType)
    return { status: 200, data: result }
  } catch (error) {
    console.error('Error importing influencers:', error)
    return { status: 500, data: 'Failed to import influencers' }
  }
}