'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, getIntegration, updateIntegrationData } from './queries'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
  if (strategy === 'INSTAGRAM') {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
}

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()

  try {
    const integration = await getIntegration(user.id)

    if (integration && integration.integrations.length < 5) {
      const token = await generateTokens(code)
      console.log('Token:', {token})

      if (token) {
        const instaData = await fetchInstagramData(token.access_token)

        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          instaData
        )
        return { status: 200, data: create }
      }
      console.log('🔴 401')
      return { status: 401 }
    }
    console.log('🔴 404')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 500', error)
    return { status: 500 }
  }
}

export const fetchInstagramData = async (accessToken: string) => {
  try {
    const fields = 'id,username,account_type,media_count,followers_count,follows_count,profile_picture_url'
    const response = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/me?fields=${fields}&access_token=${accessToken}`
    )

    return {
      instagramId: response.data.id,
      username: response.data.username,
      fullName: response.data.name,
      profilePicture: response.data.profile_picture_url,
      followersCount: response.data.followers_count,
      followingCount: response.data.follows_count,
      postsCount: response.data.media_count,
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error)
    throw error
  }
}

export const refreshInstagramData = async (userId: string) => {
  try {
    const integration = await getIntegration(userId)
    if (integration && integration.integrations.length > 0) {
      const latestIntegration = integration.integrations[0]
      const instaData = await fetchInstagramData(latestIntegration.token)
      await updateIntegrationData(latestIntegration.id, instaData)
      return { status: 200, data: instaData }
    }
    return { status: 404, message: 'No Instagram integration found' }
  } catch (error) {
    console.error('Error refreshing Instagram data:', error)
    return { status: 500, message: 'Error refreshing Instagram data' }
  }
}