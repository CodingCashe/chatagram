"use server"

import { onCurrentUser } from "../user"
import { getDataSourceSettings, createOrUpdateDataSourceSettings } from "./queries"

export const getDataSourceSettingsAction = async () => {
  const user = await onCurrentUser()
  try {
    const settings = await getDataSourceSettings(user.id)
    return { status: 200, data: settings || {} }
  } catch (error) {
    console.error("Error getting data source settings:", error)
    return { status: 500, data: "Failed to get data source settings" }
  }
}

export const updateDataSourceSettingsAction = async (data: {
  instagramApiActive?: boolean
  thirdPartyActive?: boolean
  webScrapingActive?: boolean
  portalActive?: boolean
  aiDiscoveryActive?: boolean
  instagramRefreshRate?: number
  thirdPartyRefreshRate?: number
  webScrapingRateLimit?: number
  webScrapingDailyQuota?: number
  rawDataRetention?: number
  processedDataRetention?: number
}) => {
  const user = await onCurrentUser()
  try {
    const settings = await createOrUpdateDataSourceSettings(user.id, data)
    return { status: 200, data: settings }
  } catch (error) {
    console.error("Error updating data source settings:", error)
    return { status: 500, data: "Failed to update data source settings" }
  }
}

