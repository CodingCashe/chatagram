import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import axios from "axios"
import type { INTEGRATIONS } from "@prisma/client"

interface InstagramIntegration {
  id: string
  createdAt: Date
  name: INTEGRATIONS
  userId: string | null
  token: string
  expiresAt: Date | null
  instagramId: string | null
  username: string | null
  lastUpdated: Date
}

const safeStringify = (obj: any) => {
  try {
    return JSON.stringify(obj, null, 2)
  } catch (error) {
    return "Error stringifying object"
  }
}

const logError = (message: string, error: any) => {
  console.error(message, safeStringify(error))
}

async function refreshToken(token: string): Promise<string> {
  try {
    const response = await axios.get(`${process.env.INSTAGRAM_BASE_URL}/refresh_access_token`, {
      params: {
        grant_type: "ig_refresh_token",
        access_token: token,
      },
    })
    return response.data.access_token
  } catch (error) {
    logError("refreshing token", error)
    throw new Error("Failed to refresh token")
  }
}

async function createMediaContainer(
  instagramId: string,
  token: string,
  mediaUrl: string,
  mediaType: string,
  isCarouselItem = false,
  caption?: string,
) {
  try {
    const params = {
      [mediaType === "REELS" || mediaType === "VIDEO" ? "video_url" : "image_url"]: mediaUrl,
      media_type: mediaType,
      ...(isCarouselItem && { is_carousel_item: "true" }),
      ...(caption && { caption }),
    }

    const response = await axios.post(`https://graph.instagram.com/v22.0/${instagramId}/media`, params, {
      params: { access_token: token },
    })
    return response.data.id
  } catch (error) {
    logError("creating media container", error)
    throw new Error("Failed to create media container")
  }
}

async function createCarouselContainer(instagramId: string, token: string, containerIds: string[], caption: string) {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/v22.0/${instagramId}/media`,
      {
        media_type: "CAROUSEL",
        caption,
        children: containerIds.join(","),
      },
      {
        params: { access_token: token },
      },
    )
    return response.data.id
  } catch (error) {
    logError("creating carousel container", error)
    throw new Error("Failed to create carousel container")
  }
}

async function publishMedia(instagramId: string, token: string, containerId: string) {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/v22.0/${instagramId}/media_publish`,
      {
        creation_id: containerId,
      },
      {
        params: { access_token: token },
      },
    )
    return response.data.id
  } catch (error) {
    logError("publishing media", error)
    throw new Error("Failed to publish media")
  }
}

export async function POST(request: Request) {
  try {
    console.log("Received POST request to /api/post-to-instagram")
    const { userId, caption, mediaUrls, mediaType } = await request.json()
    console.log("Request payload:", { userId, caption, mediaUrls, mediaType })

    // Fetch the user's Instagram integration
    console.log("Fetching user Instagram integration")
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      include: { integrations: { where: { name: "INSTAGRAM" } } },
    })

    if (!user || !user.integrations[0]) {
      console.error("User not found or Instagram not integrated:", { userId, user })
      return NextResponse.json({ error: "User not found or Instagram not integrated" }, { status: 404 })
    }

    const instagramIntegration = user.integrations[0] as InstagramIntegration

    if (!instagramIntegration.instagramId) {
      console.error("Instagram ID not found for integration:", instagramIntegration.id)
      return NextResponse.json({ error: "Instagram ID not found" }, { status: 400 })
    }

    console.log("Instagram integration found:", {
      integrationId: instagramIntegration.id,
      instagramId: instagramIntegration.instagramId,
    })

    // Refresh the token before using it
    let refreshedToken: string
    try {
      refreshedToken = await refreshToken(instagramIntegration.token)
      console.log("Token refreshed successfully")
    } catch (error) {
      logError("refreshing token", error)
      return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 })
    }

    let finalContainerId: string
    const containerIds: string[] = []

    // Handle different media types
    if (mediaUrls.length > 1) {
      // Create individual containers for carousel items
      for (const mediaUrl of mediaUrls) {
        const containerId = await createMediaContainer(
          instagramIntegration.instagramId,
          refreshedToken,
          mediaUrl,
          mediaType,
          true,
        )
        containerIds.push(containerId)
      }

      // Create and use carousel container
      finalContainerId = await createCarouselContainer(
        instagramIntegration.instagramId,
        refreshedToken,
        containerIds,
        caption,
      )
    } else {
      // Single media post
      finalContainerId = await createMediaContainer(
        instagramIntegration.instagramId,
        refreshedToken,
        mediaUrls[0],
        mediaType,
        false,
        caption,
      )
    }

    // Publish the media
    const postId = await publishMedia(instagramIntegration.instagramId, refreshedToken, finalContainerId)

    // Store the post in the database
    console.log("Storing post in database")
    const now = new Date()
    const storedPost = await client.scheduledContent.create({
      data: {
        instagramPostId: postId,
        caption,
        mediaType,
        mediaUrl: mediaUrls.join(","),
        status: "published",
        scheduledDate: now,
        publishedDate: now,
        userId: user.id,
      },
    })

    // Update the refreshed token in the database
    await client.integrations.update({
      where: { id: instagramIntegration.id },
      data: { token: refreshedToken },
    })
    console.log("Updated refreshed token in database")

    console.log("Post process completed successfully")
    return NextResponse.json({ success: true, postId, storedPostId: storedPost.id })
  } catch (error) {
    logError("overall post process", error)
    return NextResponse.json({ error: "Failed to post to Instagram" }, { status: 500 })
  }
}



