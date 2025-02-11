// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import { refreshToken, sendDM, sendPrivateMessage, generateTokens } from "@/lib/fetch"

// export async function getScheduledContent(userId: string | null) {
//   if (!userId) {
//     console.error("Error in getScheduledContent: userId is null")
//     return []
//   }

//   try {
//     const scheduledContent = await client.scheduledContent.findMany({
//       where: {
//         userId: userId,
//         status: "scheduled",
//       },
//       orderBy: { scheduledDate: "asc" },
//     })
//     return scheduledContent
//   } catch (error) {
//     console.error("Error in getScheduledContent:", error)
//     return []
//   }
// }

// export async function createScheduledContent(userId: string | null, contentData: any) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: userId,
//         status: "scheduled",
//       },
//     })

//     return createdContent
//   } catch (error) {
//     console.error("Error in createScheduledContent:", error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(userId: string | null, contentId: string) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     await instagramApi.deleteScheduledContent(contentId)

//     await client.scheduledContent.delete({
//       where: { id: contentId, userId: userId },
//     })
//   } catch (error) {
//     console.error("Error in deleteScheduledContent:", error)
//     throw error
//   }
// }

// export async function refreshInstagramData(userId: string | null) {
//   if (!userId) {
//     return { status: 404, message: "userId is null" }
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     const refreshedToken = await refreshToken(integration.token)
//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)

//     await client.integrations.update({
//       where: { id: integration.id },
//       data: {
//         token: refreshedToken.access_token,
//         expiresAt: new Date(Date.now() + refreshedToken.expires_in * 1000),
//         username: instaData.username,
//         fullName: instaData.name,
//         profilePicture: instaData.profile_picture_url,
//         followersCount: instaData.followers_count,
//         followingCount: instaData.follows_count,
//         postsCount: instaData.media_count,
//         lastUpdated: new Date(),
//       },
//     })

//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error("Error refreshing Instagram data:", error)
//     return { status: 500, message: "Error refreshing Instagram data" }
//   }
// }

// export async function sendInstagramDM(userId: string | null, receiverId: string, message: string) {
//   if (!userId) {
//     return { status: 404, message: "userId is null" }
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     await sendDM(integration.instagramId, receiverId, message, integration.token)
//     return { status: 200, message: "DM sent successfully" }
//   } catch (error) {
//     console.error("Error sending Instagram DM:", error)
//     return { status: 500, message: "Error sending Instagram DM" }
//   }
// }

// export async function sendInstagramPrivateMessage(userId: string | null, receiverId: string, message: string) {
//   if (!userId) {
//     return { status: 404, message: "userId is null" }
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     await sendPrivateMessage(integration.instagramId, receiverId, message, integration.token)
//     return { status: 200, message: "Private message sent successfully" }
//   } catch (error) {
//     console.error("Error sending Instagram private message:", error)
//     return { status: 500, message: "Error sending Instagram private message" }
//   }
// }

// export async function integrateInstagram(userId: string | null, code: string) {
//   if (!userId) {
//     return { status: 400, message: "userId is null" }
//   }

//   try {
//     const tokens = await generateTokens(code)
//     if (!tokens) {
//       return { status: 400, message: "Failed to generate tokens" }
//     }

//     const instagramApi = new InstagramAPI(tokens.access_token)
//     const instaData = await instagramApi.getUserProfile("me")

//     const integration = await client.integrations.create({
//       data: {
//         name: "INSTAGRAM",
//         token: tokens.access_token,
//         expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
//         instagramId: instaData.id,
//         username: instaData.username,
//         fullName: instaData.name,
//         profilePicture: instaData.profile_picture_url,
//         followersCount: instaData.followers_count,
//         followingCount: instaData.follows_count,
//         postsCount: instaData.media_count,
//         User: { connect: { id: userId } },
//       },
//     })

//     return { status: 200, data: integration }
//   } catch (error) {
//     console.error("Error integrating Instagram:", error)
//     return { status: 500, message: "Error integrating Instagram" }
//   }
// }


// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import { refreshToken, sendDM, sendPrivateMessage, generateTokens } from "@/lib/fetch"

// export async function getScheduledContent(userId: string | null) {
//   if (!userId) {
//     console.error("Error in getScheduledContent: userId is null")
//     return []
//   }

//   try {
//     const scheduledContent = await client.scheduledContent.findMany({
//       where: {
//         userId: userId,
//         status: "scheduled",
//       },
//       orderBy: { scheduledDate: "asc" },
//     })
//     return scheduledContent
//   } catch (error) {
//     console.error("Error in getScheduledContent:", error)
//     return []
//   }
// }

// export async function createScheduledContent(userId: string | null, contentData: any) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: userId,
//         status: "scheduled",
//       },
//     })

//     return createdContent
//   } catch (error) {
//     console.error("Error in createScheduledContent:", error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(userId: string | null, contentId: string) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     await instagramApi.deleteScheduledContent(contentId)

//     await client.scheduledContent.delete({
//       where: { id: contentId, userId: userId },
//     })
//   } catch (error) {
//     console.error("Error in deleteScheduledContent:", error)
//     throw error
//   }
// }

// export async function refreshInstagramData(userId: string | null) {
//   if (!userId) {
//     return { status: 404, message: "userId is null" }
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     const refreshedToken = await refreshToken(integration.token)
//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)

//     await client.integrations.update({
//       where: { id: integration.id },
//       data: {
//         token: refreshedToken.access_token,
//         expiresAt: new Date(Date.now() + refreshedToken.expires_in * 1000),
//         username: instaData.username,
//         fullName: instaData.name,
//         profilePicture: instaData.profile_picture_url,
//         followersCount: instaData.followers_count,
//         followingCount: instaData.follows_count,
//         postsCount: instaData.media_count,
//         lastUpdated: new Date(),
//       },
//     })

//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error("Error refreshing Instagram data:", error)
//     return { status: 500, message: "Error refreshing Instagram data" }
//   }
// }

// export async function sendInstagramDM(userId: string | null, receiverId: string, message: string) {
//   if (!userId) {
//     return { status: 404, message: "userId is null" }
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     await sendDM(integration.instagramId, receiverId, message, integration.token)
//     return { status: 200, message: "DM sent successfully" }
//   } catch (error) {
//     console.error("Error sending Instagram DM:", error)
//     return { status: 500, message: "Error sending Instagram DM" }
//   }
// }

// export async function sendInstagramPrivateMessage(userId: string | null, receiverId: string, message: string) {
//   if (!userId) {
//     return { status: 404, message: "userId is null" }
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     await sendPrivateMessage(integration.instagramId, receiverId, message, integration.token)
//     return { status: 200, message: "Private message sent successfully" }
//   } catch (error) {
//     console.error("Error sending Instagram private message:", error)
//     return { status: 500, message: "Error sending Instagram private message" }
//   }
// }

// export async function integrateInstagram(userId: string | null, code: string) {
//   if (!userId) {
//     return { status: 400, message: "userId is null" }
//   }

//   try {
//     const tokens = await generateTokens(code)
//     if (!tokens) {
//       return { status: 400, message: "Failed to generate tokens" }
//     }

//     const instagramApi = new InstagramAPI(tokens.access_token)
//     const instaData = await instagramApi.getUserProfile("me")

//     const integration = await client.integrations.create({
//       data: {
//         name: "INSTAGRAM",
//         token: tokens.access_token,
//         expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
//         instagramId: instaData.id,
//         username: instaData.username,
//         fullName: instaData.name,
//         profilePicture: instaData.profile_picture_url,
//         followersCount: instaData.followers_count,
//         followingCount: instaData.follows_count,
//         postsCount: instaData.media_count,
//         User: { connect: { id: userId } },
//       },
//     })

//     return { status: 200, data: integration }
//   } catch (error) {
//     console.error("Error integrating Instagram:", error)
//     return { status: 500, message: "Error integrating Instagram" }
//   }
// }

// export async function updateScheduledContent(userId: string | null, contentId: string, updateData: any) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { id: contentId, userId: userId },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })

//     return updatedDbContent
//   } catch (error) {
//     console.error("Error in updateScheduledContent:", error)
//     throw error
//   }
// }

// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"

// export async function getScheduledContent(userId: string | null) {
//   if (!userId) {
//     console.error("Error in getScheduledContent: userId is null")
//     return []
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)

//     return scheduledContent.map((content) => ({
//       id: content.id,
//       caption: content.caption,
//       mediaType: content.media_type,
//       mediaUrl: content.media_url,
//       thumbnailUrl: content.thumbnail_url,
//       permalink: content.permalink,
//       scheduledDate: new Date(content.timestamp),
//       status: "scheduled",
//     }))
//   } catch (error) {
//     console.error("Error in getScheduledContent:", error)
//     return []
//   }
// }

// export async function createScheduledContent(userId: string | null, contentData: any) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: userId,
//         status: "scheduled",
//       },
//     })

//     return createdContent
//   } catch (error) {
//     console.error("Error in createScheduledContent:", error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(userId: string | null, contentId: string) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     await instagramApi.deleteScheduledContent(contentId)

//     await client.scheduledContent.delete({
//       where: { id: contentId, userId: userId },
//     })
//   } catch (error) {
//     console.error("Error in deleteScheduledContent:", error)
//     throw error
//   }
// }

// export async function updateScheduledContent(userId: string | null, contentId: string, updateData: any) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { id: contentId, userId: userId },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })

//     return updatedDbContent
//   } catch (error) {
//     console.error("Error in updateScheduledContent:", error)
//     throw error
//   }
// }

// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import { refreshToken } from "@/lib/fetch"

// export async function getScheduledContent(clerkId: string | null) {
//   if (!clerkId) {
//     console.error("Error in getScheduledContent: userId is null")
//     return []
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: clerkId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)

//     return scheduledContent.map((content) => ({
//       id: content.id,
//       caption: content.caption,
//       mediaType: content.media_type,
//       mediaUrl: content.media_url,
//       thumbnailUrl: content.thumbnail_url,
//       permalink: content.permalink,
//       scheduledDate: new Date(content.timestamp),
//       status: "scheduled",
//     }))
//   } catch (error) {
//     console.error("Error in getScheduledContent:", error)
//     return []
//   }
// }

// export async function createScheduledContent(clerkId: string | null, contentData: any) {
//   if (!clerkId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: clerkId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: clerkId,
//         status: "scheduled",
//       },
//     })

//     return createdContent
//   } catch (error) {
//     console.error("Error in createScheduledContent:", error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(userId: string | null, contentId: string) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     await instagramApi.deleteScheduledContent(contentId)

//     await client.scheduledContent.delete({
//       where: { id: contentId, userId: userId },
//     })
//   } catch (error) {
//     console.error("Error in deleteScheduledContent:", error)
//     throw error
//   }
// }

// export async function updateScheduledContent(userId: string | null, contentId: string, updateData: any) {
//   if (!userId) {
//     throw new Error("userId is null")
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { id: contentId, userId: userId },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })

//     return updatedDbContent
//   } catch (error) {
//     console.error("Error in updateScheduledContent:", error)
//     throw error
//   }
// }

// export async function refreshInstagramData(userId: string | null) {
//   if (!userId) {
//     return { status: 404, message: "userId is null" }
//   }

//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration || !integration.instagramId) {
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     const refreshedToken = await refreshToken(integration.token)
//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)

//     await client.integrations.update({
//       where: { id: integration.id },
//       data: {
//         token: refreshedToken.access_token,
//         expiresAt: new Date(Date.now() + refreshedToken.expires_in * 1000),
//         username: instaData.username,
//         fullName: instaData.name,
//         profilePicture: instaData.profile_picture_url,
//         followersCount: instaData.followers_count,
//         followingCount: instaData.follows_count,
//         postsCount: instaData.media_count,
//         lastUpdated: new Date(),
//       },
//     })

//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error("Error refreshing Instagram data:", error)
//     return { status: 500, message: "Error refreshing Instagram data" }
//   }
// }

"use server"

import { InstagramAPI } from "@/lib/instagram-api"
import { client } from "@/lib/prisma"
import { refreshToken } from "@/lib/fetch"

export async function getScheduledContent(clerkId: string) {
  console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
  try {
    const integration = await client.integrations.findFirst({
      where: { userId: clerkId, name: "INSTAGRAM" },
    })
    console.log(`[getScheduledContent] Integration found:`, integration)

    if (!integration || !integration.instagramId) {
      console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      return []
    }

    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
    const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
    console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

    const mappedContent = scheduledContent.map((content) => ({
      id: content.id,
      caption: content.caption,
      mediaType: content.media_type,
      mediaUrl: content.media_url,
      thumbnailUrl: content.thumbnail_url,
      permalink: content.permalink,
      scheduledDate: new Date(content.timestamp),
      status: "scheduled",
    }))
    console.log(`[getScheduledContent] Mapped content:`, mappedContent)
    return mappedContent
  } catch (error) {
    console.error(`[getScheduledContent] Error:`, error)
    throw error
  }
}

export async function createScheduledContent(clerkId: string, contentData: any) {
  console.log(`[createScheduledContent] Starting for clerkId: ${clerkId}`)
  console.log(`[createScheduledContent] Content data:`, contentData)
  try {
    const integration = await client.integrations.findFirst({
      where: { userId: clerkId, name: "INSTAGRAM" },
    })
    console.log(`[createScheduledContent] Integration found:`, integration)

    if (!integration || !integration.instagramId) {
      console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      throw new Error("No valid Instagram integration found for this user")
    }

    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
    const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)
    console.log(`[createScheduledContent] New content created:`, newContent)

    const createdContent = await client.scheduledContent.create({
      data: {
        instagramPostId: newContent.id,
        caption: newContent.caption,
        mediaType: newContent.media_type,
        mediaUrl: newContent.media_url,
        thumbnailUrl: newContent.thumbnail_url,
        permalink: newContent.permalink,
        scheduledDate: new Date(newContent.timestamp),
        userId: clerkId,
        status: "scheduled",
      },
    })
    console.log(`[createScheduledContent] Content saved to database:`, createdContent)
    return createdContent
  } catch (error) {
    console.error(`[createScheduledContent] Error:`, error)
    throw error
  }
}

export async function deleteScheduledContent(clerkId: string, contentId: string) {
  console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
  try {
    const integration = await client.integrations.findFirst({
      where: { userId: clerkId, name: "INSTAGRAM" },
    })
    console.log(`[deleteScheduledContent] Integration found:`, integration)

    if (!integration || !integration.instagramId) {
      console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      throw new Error("No valid Instagram integration found for this user")
    }

    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[deleteScheduledContent] Deleting content from Instagram`)
    await instagramApi.deleteScheduledContent(contentId)
    console.log(`[deleteScheduledContent] Content deleted from Instagram`)

    const deletedContent = await client.scheduledContent.delete({
      where: { id: contentId, userId: clerkId },
    })
    console.log(`[deleteScheduledContent] Content deleted from database:`, deletedContent)
    return deletedContent
  } catch (error) {
    console.error(`[deleteScheduledContent] Error:`, error)
    throw error
  }
}

export async function updateScheduledContent(clerkId: string, contentId: string, updateData: any) {
  console.log(`[updateScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
  console.log(`[updateScheduledContent] Update data:`, updateData)
  try {
    const integration = await client.integrations.findFirst({
      where: { userId: clerkId, name: "INSTAGRAM" },
    })
    console.log(`[updateScheduledContent] Integration found:`, integration)

    if (!integration || !integration.instagramId) {
      console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      throw new Error("No valid Instagram integration found for this user")
    }

    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[updateScheduledContent] Updating content on Instagram`)
    const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
    console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

    const updatedDbContent = await client.scheduledContent.update({
      where: { id: contentId, userId: clerkId },
      data: {
        caption: updatedContent.caption,
        scheduledDate: new Date(updatedContent.timestamp),
      },
    })
    console.log(`[updateScheduledContent] Content updated in database:`, updatedDbContent)
    return updatedDbContent
  } catch (error) {
    console.error(`[updateScheduledContent] Error:`, error)
    throw error
  }
}

export async function refreshInstagramData(clerkId: string) {
  console.log(`[refreshInstagramData] Starting for clerkId: ${clerkId}`)
  try {
    const integration = await client.integrations.findFirst({
      where: { userId: clerkId, name: "INSTAGRAM" },
    })
    console.log(`[refreshInstagramData] Integration found:`, integration)

    if (!integration || !integration.instagramId) {
      console.error(`[refreshInstagramData] No valid Instagram integration found for clerkId: ${clerkId}`)
      return { status: 404, message: "No valid Instagram integration found" }
    }

    console.log(`[refreshInstagramData] Refreshing token`)
    const refreshedToken = await refreshToken(integration.token)
    console.log(`[refreshInstagramData] Token refreshed:`, refreshedToken)

    const instagramApi = new InstagramAPI(refreshedToken.access_token)
    console.log(`[refreshInstagramData] Fetching user profile`)
    const instaData = await instagramApi.getUserProfile(integration.instagramId)
    console.log(`[refreshInstagramData] User profile fetched:`, instaData)

    const updatedIntegration = await client.integrations.update({
      where: { id: integration.id },
      data: {
        token: refreshedToken.access_token,
        expiresAt: new Date(Date.now() + refreshedToken.expires_in * 1000),
        username: instaData.username,
        fullName: instaData.name,
        profilePicture: instaData.profile_picture_url,
        followersCount: instaData.followers_count,
        followingCount: instaData.follows_count,
        postsCount: instaData.media_count,
        lastUpdated: new Date(),
      },
    })
    console.log(`[refreshInstagramData] Integration updated in database:`, updatedIntegration)
    return { status: 200, data: instaData }
  } catch (error) {
    console.error(`[refreshInstagramData] Error:`, error)
    return { status: 500, message: "Error refreshing Instagram data"}
  }
}

