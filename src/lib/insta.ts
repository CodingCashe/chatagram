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

// "use server"

// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import { refreshToken } from "@/lib/fetch"

// export async function getScheduledContent(clerkId: string) {
//   console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: clerkId, name: "INSTAGRAM" },
//     })
//     console.log(`[getScheduledContent] Integration found:`, integration)

//     if (!integration || !integration.instagramId) {
//       console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return []
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
//     console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

//     const mappedContent = scheduledContent.map((content) => ({
//       id: content.id,
//       caption: content.caption,
//       mediaType: content.media_type,
//       mediaUrl: content.media_url,
//       thumbnailUrl: content.thumbnail_url,
//       permalink: content.permalink,
//       scheduledDate: new Date(content.timestamp),
//       status: "scheduled",
//     }))
//     console.log(`[getScheduledContent] Mapped content:`, mappedContent)
//     return mappedContent
//   } catch (error) {
//     console.error(`[getScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function createScheduledContent(userId: string, contentData: any) {
//   console.log(`[createScheduledContent] Starting for clerkId: ${userId}`)
//   console.log(`[createScheduledContent] Content data:`, contentData)
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })
//     console.log(`[createScheduledContent] Integration found:`, integration)

//     if (!integration || !integration.instagramId) {
//       console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${userId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)
//     console.log(`[createScheduledContent] New content created:`, newContent)

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
//     console.log(`[createScheduledContent] Content saved to database:`, createdContent)
//     return createdContent
//   } catch (error) {
//     console.error(`[createScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(clerkId: string, contentId: string) {
//   console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: clerkId, name: "INSTAGRAM" },
//     })
//     console.log(`[deleteScheduledContent] Integration found:`, integration)

//     if (!integration || !integration.instagramId) {
//       console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[deleteScheduledContent] Deleting content from Instagram`)
//     await instagramApi.deleteScheduledContent(contentId)
//     console.log(`[deleteScheduledContent] Content deleted from Instagram`)

//     const deletedContent = await client.scheduledContent.delete({
//       where: { id: contentId, userId: clerkId },
//     })
//     console.log(`[deleteScheduledContent] Content deleted from database:`, deletedContent)
//     return deletedContent
//   } catch (error) {
//     console.error(`[deleteScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function updateScheduledContent(clerkId: string, contentId: string, updateData: any) {
//   console.log(`[updateScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   console.log(`[updateScheduledContent] Update data:`, updateData)
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: clerkId, name: "INSTAGRAM" },
//     })
//     console.log(`[updateScheduledContent] Integration found:`, integration)

//     if (!integration || !integration.instagramId) {
//       console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[updateScheduledContent] Updating content on Instagram`)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
//     console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { id: contentId, userId: clerkId },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })
//     console.log(`[updateScheduledContent] Content updated in database:`, updatedDbContent)
//     return updatedDbContent
//   } catch (error) {
//     console.error(`[updateScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function refreshInstagramData(clerkId: string) {
//   console.log(`[refreshInstagramData] Starting for clerkId: ${clerkId}`)
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: clerkId, name: "INSTAGRAM" },
//     })
//     console.log(`[refreshInstagramData] Integration found:`, integration)

//     if (!integration || !integration.instagramId) {
//       console.error(`[refreshInstagramData] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     console.log(`[refreshInstagramData] Refreshing token`)
//     const refreshedToken = await refreshToken(integration.token)
//     console.log(`[refreshInstagramData] Token refreshed:`, refreshedToken)

//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     console.log(`[refreshInstagramData] Fetching user profile`)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)
//     console.log(`[refreshInstagramData] User profile fetched:`, instaData)

//     const updatedIntegration = await client.integrations.update({
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
//     console.log(`[refreshInstagramData] Integration updated in database:`, updatedIntegration)
//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error(`[refreshInstagramData] Error:`, error)
//     return { status: 500, message: "Error refreshing Instagram data"}
//   }
// }

// "use server"

// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import { refreshToken } from "@/lib/fetch"

// export async function getScheduledContent(clerkId: string) {
//   console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[getScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return []
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[getScheduledContent] Instagram ID not found for integration`)
//       return []
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
//     console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

//     const mappedContent = scheduledContent.map((content) => ({
//       id: content.id,
//       caption: content.caption,
//       mediaType: content.media_type,
//       mediaUrl: content.media_url,
//       thumbnailUrl: content.thumbnail_url,
//       permalink: content.permalink,
//       scheduledDate: new Date(content.timestamp),
//       status: "scheduled",
//     }))
//     console.log(`[getScheduledContent] Mapped content:`, mappedContent)
//     return mappedContent
//   } catch (error) {
//     console.error(`[getScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function createScheduledContent(clerkId: string, contentData: any) {
//   console.log(`[createScheduledContent] Starting for clerkId: ${clerkId}`)
//   console.log(`[createScheduledContent] Content data:`, contentData)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[createScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[createScheduledContent] Instagram ID not found for integration`)
//       throw new Error("Instagram ID not found for this integration")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)
//     console.log(`[createScheduledContent] New content created:`, newContent)

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: user.id,
//         status: "scheduled",
//       },
//     })
//     console.log(`[createScheduledContent] Content saved to database:`, createdContent)
//     return createdContent
//   } catch (error) {
//     console.error(`[createScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(clerkId: string, contentId: string) {
//   console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[deleteScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[deleteScheduledContent] Deleting content from Instagram`)
//     await instagramApi.deleteScheduledContent(contentId)
//     console.log(`[deleteScheduledContent] Content deleted from Instagram`)

//     const deletedContent = await client.scheduledContent.delete({
//       where: { id: contentId, userId: user.id },
//     })
//     console.log(`[deleteScheduledContent] Content deleted from database:`, deletedContent)
//     return deletedContent
//   } catch (error) {
//     console.error(`[deleteScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function updateScheduledContent(clerkId: string, contentId: string, updateData: any) {
//   console.log(`[updateScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   console.log(`[updateScheduledContent] Update data:`, updateData)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[updateScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[updateScheduledContent] Updating content on Instagram`)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
//     console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { id: contentId, userId: user.id },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })
//     console.log(`[updateScheduledContent] Content updated in database:`, updatedDbContent)
//     return updatedDbContent
//   } catch (error) {
//     console.error(`[updateScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function refreshInstagramData(clerkId: string) {
//   console.log(`[refreshInstagramData] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[refreshInstagramData] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[refreshInstagramData] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[refreshInstagramData] Instagram ID not found for integration`)
//       return { status: 404, message: "Instagram ID not found for this integration" }
//     }

//     console.log(`[refreshInstagramData] Refreshing token`)
//     const refreshedToken = await refreshToken(integration.token)
//     console.log(`[refreshInstagramData] Token refreshed:`, refreshedToken)

//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     console.log(`[refreshInstagramData] Fetching user profile`)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)
//     console.log(`[refreshInstagramData] User profile fetched:`, instaData)

//     const updatedIntegration = await client.integrations.update({
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
//     console.log(`[refreshInstagramData] Integration updated in database:`, updatedIntegration)
//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error(`[refreshInstagramData] Error:`, error)
//     return { status: 500, message: "Error refreshing Instagram data"}
//   }
// }


// "use server"

// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import { refreshToken } from "@/lib/fetch"

// export async function getScheduledContent(clerkId: string) {
//   console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[getScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return []
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[getScheduledContent] Instagram ID not found for integration`)
//       return []
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
//     console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

//     const mappedContent = scheduledContent.map((content) => ({
//       id: content.id,
//       caption: content.caption,
//       mediaType: content.media_type,
//       mediaUrl: content.media_url,
//       thumbnailUrl: content.thumbnail_url,
//       permalink: content.permalink,
//       scheduledDate: new Date(content.timestamp),
//       status: "scheduled",
//     }))
//     console.log(`[getScheduledContent] Mapped content:`, mappedContent)
//     return mappedContent
//   } catch (error) {
//     console.error(`[getScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function createScheduledContent(clerkId: string, contentData: any) {
//   console.log(`[createScheduledContent] Starting for clerkId: ${clerkId}`)
//   console.log(`[createScheduledContent] Content data:`, contentData)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[createScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[createScheduledContent] Instagram ID not found for integration`)
//       throw new Error("Instagram ID not found for this integration")
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)
//     console.log(`[createScheduledContent] New content created:`, newContent)

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: user.id,
//         status: "scheduled",
//       },
//     })
//     console.log(`[createScheduledContent] Content saved to database:`, createdContent)
//     return createdContent
//   } catch (error) {
//     console.error(`[createScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(clerkId: string, contentId: string) {
//   console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[deleteScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[deleteScheduledContent] Deleting content from Instagram`)
//     await instagramApi.deleteScheduledContent(contentId)
//     console.log(`[deleteScheduledContent] Content deleted from Instagram`)

//     const deletedContent = await client.scheduledContent.delete({
//       where: { id: contentId, userId: user.id },
//     })
//     console.log(`[deleteScheduledContent] Content deleted from database:`, deletedContent)
//     return deletedContent
//   } catch (error) {
//     console.error(`[deleteScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function updateScheduledContent(clerkId: string, contentId: string, updateData: any) {
//   console.log(`[updateScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   console.log(`[updateScheduledContent] Update data:`, updateData)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[updateScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[updateScheduledContent] Updating content on Instagram`)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
//     console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { id: contentId, userId: user.id },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })
//     console.log(`[updateScheduledContent] Content updated in database:`, updatedDbContent)
//     return updatedDbContent
//   } catch (error) {
//     console.error(`[updateScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function refreshInstagramData(clerkId: string) {
//   console.log(`[refreshInstagramData] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[refreshInstagramData] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[refreshInstagramData] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[refreshInstagramData] Instagram ID not found for integration`)
//       return { status: 404, message: "Instagram ID not found for this integration" }
//     }

//     console.log(`[refreshInstagramData] Refreshing token`)
//     const refreshedToken = await refreshToken(integration.token)
//     console.log(`[refreshInstagramData] Token refreshed:`, refreshedToken)

//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     console.log(`[refreshInstagramData] Fetching user profile`)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)
//     console.log(`[refreshInstagramData] User profile fetched:`, instaData)

//     const updatedIntegration = await client.integrations.update({
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
//     console.log(`[refreshInstagramData] Integration updated in database:`, updatedIntegration)
//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error(`[refreshInstagramData] Error:`, error)
//     return { status: 500, message: "Error refreshing Instagram data"}
//   }
// }

// "use server"

// import { InstagramAPI } from "@/lib/instagram-api"
// import { PrismaClient, type User, type ScheduledContent, type Integrations } from "@prisma/client"

// const prisma = new PrismaClient()

// // Array of real online media URLs for testing
// const testMediaUrls = [
//   "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682686581660-3693f0c588d2?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&auto=format&fit=crop",
// ]

// export async function getScheduledContent(clerkId: string) {
//   console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = (await prisma.user.findUnique({
//       where: { clerkId },
//       include: {
//         integrations: {
//           where: { name: "INSTAGRAM" },
//         },
//         scheduledContent: true,
//       },
//     })) as
//       | (User & {
//           integrations: Integrations[]
//           scheduledContent: ScheduledContent[]
//         })
//       | null

//     console.log(`[getScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return []
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[getScheduledContent] Instagram ID not found for integration`)
//       return []
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
//     console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

//     // Merge Instagram API data with local database data
//     const mergedContent = user.scheduledContent.map((localContent: ScheduledContent) => {
//       const apiContent = scheduledContent.find((c) => c.id === localContent.instagramPostId)
//       return {
//         ...localContent,
//         ...apiContent,
//         status: apiContent ? apiContent.status : localContent.status,
//       }
//     })

//     console.log(`[getScheduledContent] Merged content:`, mergedContent)
//     return mergedContent
//   } catch (error) {
//     console.error(`[getScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function createScheduledContent(
//   clerkId: string,
//   contentData: {
//     postType: string
//     content: string
//     scheduledDate: string
//     hashtags: string[]
//     file?: File
//     mediaUrl?: string
//   },
// ) {
//   console.log(`[createScheduledContent] Starting for clerkId: ${clerkId}`)
//   console.log(`[createScheduledContent] Content data:`, contentData)
//   try {
//     const user = await prisma.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[createScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[createScheduledContent] Instagram ID not found for integration`)
//       throw new Error("Instagram ID not found for this integration")
//     }

//     // Use provided mediaUrl or select a random test URL
//     const mediaUrl = contentData.mediaUrl || testMediaUrls[Math.floor(Math.random() * testMediaUrls.length)]

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, {
//       ...contentData,
//       mediaUrl,
//     })
//     console.log(`[createScheduledContent] New content created:`, newContent)

//     const createdContent = await prisma.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: user.id,
//         status: "scheduled",
//       },
//     })
//     console.log(`[createScheduledContent] Content saved to database:`, createdContent)
//     return createdContent
//   } catch (error) {
//     console.error(`[createScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(clerkId: string, contentId: string) {
//   console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   try {
//     const user = await prisma.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[deleteScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[deleteScheduledContent] Deleting content from Instagram`)
//     await instagramApi.deleteScheduledContent(contentId)
//     console.log(`[deleteScheduledContent] Content deleted from Instagram`)

//     const deletedContent = await prisma.scheduledContent.delete({
//       where: { instagramPostId: contentId, userId: user.id },
//     })
//     console.log(`[deleteScheduledContent] Content deleted from database:`, deletedContent)
//     return deletedContent
//   } catch (error) {
//     console.error(`[deleteScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function updateScheduledContent(clerkId: string, contentId: string, updateData: any) {
//   console.log(`[updateScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   console.log(`[updateScheduledContent] Update data:`, updateData)
//   try {
//     const user = await prisma.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[updateScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[updateScheduledContent] Updating content on Instagram`)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
//     console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

//     const updatedDbContent = await prisma.scheduledContent.update({
//       where: { instagramPostId: contentId, userId: user.id },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })
//     console.log(`[updateScheduledContent] Content updated in database:`, updatedDbContent)
//     return updatedDbContent
//   } catch (error) {
//     console.error(`[updateScheduledContent] Error:`, error)
//     throw error
//   }
// }

// "use server"

// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import type { User, ScheduledContent, Integrations } from "@prisma/client"
// import { refreshToken } from "@/lib/fetch"

// // Array of real online media URLs for testing
// const testMediaUrls = [
//   "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682686581660-3693f0c588d2?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&auto=format&fit=crop",
// ]

// export async function getScheduledContent(clerkId: string) {
//   console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = (await client.user.findUnique({
//       where: { clerkId },
//       include: {
//         integrations: {
//           where: { name: "INSTAGRAM" },
//         },
//         scheduledContent: true,
//       },
//     })) as
//       | (User & {
//           integrations: Integrations[]
//           scheduledContent: ScheduledContent[]
//         })
//       | null

//     console.log(`[getScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return []
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[getScheduledContent] Instagram ID not found for integration`)
//       return []
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
//     console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

//     // Merge Instagram API data with local database data
//     const mergedContent = user.scheduledContent.map((localContent: ScheduledContent) => {
//       const apiContent = scheduledContent.find((c) => c.id === localContent.instagramPostId)
//       return {
//         ...localContent,
//         ...apiContent,
//         status: apiContent ? apiContent.status : localContent.status,
//       }
//     })

//     console.log(`[getScheduledContent] Merged content:`, mergedContent)
//     return mergedContent
//   } catch (error) {
//     console.error(`[getScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function createScheduledContent(
//   clerkId: string,
//   contentData: {
//     postType: string
//     content: string
//     scheduledDate: string
//     hashtags: string[]
//     file?: File
//     mediaUrl?: string
//   },
// ) {
//   console.log(`[createScheduledContent] Starting for clerkId: ${clerkId}`)
//   console.log(`[createScheduledContent] Content data:`, contentData)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[createScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[createScheduledContent] Instagram ID not found for integration`)
//       throw new Error("Instagram ID not found for this integration")
//     }

//     // Use provided mediaUrl or select a random test URL
//     const mediaUrl = contentData.mediaUrl || testMediaUrls[Math.floor(Math.random() * testMediaUrls.length)]

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, {
//       ...contentData,
//       mediaUrl,
//     })
//     console.log(`[createScheduledContent] New content created:`, newContent)

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: user.id,
//         status: "scheduled",
//       },
//     })
//     console.log(`[createScheduledContent] Content saved to database:`, createdContent)
//     return createdContent
//   } catch (error) {
//     console.error(`[createScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function deleteScheduledContent(clerkId: string, contentId: string) {
//   console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[deleteScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[deleteScheduledContent] Deleting content from Instagram`)
//     await instagramApi.deleteScheduledContent(contentId)
//     console.log(`[deleteScheduledContent] Content deleted from Instagram`)

//     const deletedContent = await client.scheduledContent.delete({
//       where: { instagramPostId: contentId, userId: user.id },
//     })
//     console.log(`[deleteScheduledContent] Content deleted from database:`, deletedContent)
//     return deletedContent
//   } catch (error) {
//     console.error(`[deleteScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function updateScheduledContent(clerkId: string, contentId: string, updateData: any) {
//   console.log(`[updateScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   console.log(`[updateScheduledContent] Update data:`, updateData)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[updateScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[updateScheduledContent] Updating content on Instagram`)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
//     console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { instagramPostId: contentId, userId: user.id },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })
//     console.log(`[updateScheduledContent] Content updated in database:`, updatedDbContent)
//     return updatedDbContent
//   } catch (error) {
//     console.error(`[updateScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function refreshInstagramData(clerkId: string) {
//   console.log(`[refreshInstagramData] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[refreshInstagramData] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[refreshInstagramData] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[refreshInstagramData] Instagram ID not found for integration`)
//       return { status: 404, message: "Instagram ID not found for this integration" }
//     }

//     console.log(`[refreshInstagramData] Refreshing token`)
//     const refreshedToken = await refreshToken(integration.token)
//     console.log(`[refreshInstagramData] Token refreshed:`, refreshedToken)

//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     console.log(`[refreshInstagramData] Fetching user profile`)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)
//     console.log(`[refreshInstagramData] User profile fetched:`, instaData)

//     const updatedIntegration = await client.integrations.update({
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
//     console.log(`[refreshInstagramData] Integration updated in database:`, updatedIntegration)
//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error(`[refreshInstagramData] Error:`, error)
//     return { status: 500, message: "Error refreshing Instagram data" }
//   }
// }

// "use server"

// import { InstagramAPI } from "@/lib/instagram-api"
// import { client } from "@/lib/prisma"
// import type { User, ScheduledContent, Integrations } from "@prisma/client"
// import { refreshToken } from "@/lib/fetch"
// import { AxiosError } from "axios"

// // Array of real online media URLs for testing
// const testMediaUrls = [
//   "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682686581660-3693f0c588d2?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&auto=format&fit=crop",
// ]

// export async function getScheduledContent(clerkId: string) {
//   console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = (await client.user.findUnique({
//       where: { clerkId },
//       include: {
//         integrations: {
//           where: { name: "INSTAGRAM" },
//         },
//         scheduledContent: true,
//       },
//     })) as
//       | (User & {
//           integrations: Integrations[]
//           scheduledContent: ScheduledContent[]
//         })
//       | null

//     console.log(`[getScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return []
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[getScheduledContent] Instagram ID not found for integration`)
//       return []
//     }

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
//     const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
//     console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

//     // Merge Instagram API data with local database data
//     const mergedContent = user.scheduledContent.map((localContent: ScheduledContent) => {
//       const apiContent = scheduledContent.find((c) => c.id === localContent.instagramPostId)
//       return {
//         ...localContent,
//         ...apiContent,
//         status: apiContent ? apiContent.status : localContent.status,
//       }
//     })

//     console.log(`[getScheduledContent] Merged content:`, mergedContent)
//     return mergedContent
//   } catch (error) {
//     console.error(`[getScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function createScheduledContent(
//   clerkId: string,
//   contentData: {
//     postType: string
//     content: string
//     scheduledDate: string
//     hashtags: string[]
//     file?: File | null
//     mediaUrl?: string
//   },
// ) {
//   console.log(`[createScheduledContent] Starting for clerkId: ${clerkId}`)
//   console.log(`[createScheduledContent] Content data:`, JSON.stringify(contentData, null, 2))
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[createScheduledContent] User found:`, JSON.stringify(user, null, 2))

//     if (!user || user.integrations.length === 0) {
//       console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[createScheduledContent] Instagram ID not found for integration`)
//       throw new Error("Instagram ID not found for this integration")
//     }

//     // Use provided mediaUrl or select a random test URL
//     const mediaUrl = contentData.mediaUrl || testMediaUrls[Math.floor(Math.random() * testMediaUrls.length)]

//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
//     console.log(`[createScheduledContent] Payload:`, JSON.stringify({ ...contentData, mediaUrl }, null, 2))

//     const newContent = await instagramApi.createScheduledContent(integration.instagramId, {
//       ...contentData,
//       mediaUrl,
//     })
//     console.log(`[createScheduledContent] New content created:`, JSON.stringify(newContent, null, 2))

//     const createdContent = await client.scheduledContent.create({
//       data: {
//         instagramPostId: newContent.id,
//         caption: newContent.caption,
//         mediaType: newContent.media_type,
//         mediaUrl: newContent.media_url,
//         thumbnailUrl: newContent.thumbnail_url,
//         permalink: newContent.permalink,
//         scheduledDate: new Date(newContent.timestamp),
//         userId: user.id,
//         status: "scheduled",
//       },
//     })
//     console.log(`[createScheduledContent] Content saved to database:`, JSON.stringify(createdContent, null, 2))
//     return createdContent
//   } catch (error) {
//     console.error(`[createScheduledContent] Error:`, error)
//     if (error instanceof AxiosError) {
//       console.error(`[createScheduledContent] Axios Error Details:`, {
//         message: error.message,
//         code: error.code,
//         response: {
//           status: error.response?.status,
//           statusText: error.response?.statusText,
//           data: error.response?.data,
//         },
//       })
//     }
//     throw error
//   }
// }

// export async function deleteScheduledContent(clerkId: string, contentId: string) {
//   console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[deleteScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[deleteScheduledContent] Deleting content from Instagram`)
//     await instagramApi.deleteScheduledContent(contentId)
//     console.log(`[deleteScheduledContent] Content deleted from Instagram`)

//     const deletedContent = await client.scheduledContent.delete({
//       where: { instagramPostId: contentId, userId: user.id },
//     })
//     console.log(`[deleteScheduledContent] Content deleted from database:`, deletedContent)
//     return deletedContent
//   } catch (error) {
//     console.error(`[deleteScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function updateScheduledContent(clerkId: string, contentId: string, updateData: any) {
//   console.log(`[updateScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
//   console.log(`[updateScheduledContent] Update data:`, updateData)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[updateScheduledContent] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
//       throw new Error("No valid Instagram integration found for this user")
//     }

//     const integration = user.integrations[0]
//     const instagramApi = new InstagramAPI(integration.token)
//     console.log(`[updateScheduledContent] Updating content on Instagram`)
//     const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
//     console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

//     const updatedDbContent = await client.scheduledContent.update({
//       where: { instagramPostId: contentId, userId: user.id },
//       data: {
//         caption: updatedContent.caption,
//         scheduledDate: new Date(updatedContent.timestamp),
//       },
//     })
//     console.log(`[updateScheduledContent] Content updated in database:`, updatedDbContent)
//     return updatedDbContent
//   } catch (error) {
//     console.error(`[updateScheduledContent] Error:`, error)
//     throw error
//   }
// }

// export async function refreshInstagramData(clerkId: string) {
//   console.log(`[refreshInstagramData] Starting for clerkId: ${clerkId}`)
//   try {
//     const user = await client.user.findUnique({
//       where: { clerkId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })
//     console.log(`[refreshInstagramData] User found:`, user)

//     if (!user || user.integrations.length === 0) {
//       console.error(`[refreshInstagramData] No valid Instagram integration found for clerkId: ${clerkId}`)
//       return { status: 404, message: "No valid Instagram integration found" }
//     }

//     const integration = user.integrations[0]
//     if (!integration.instagramId) {
//       console.error(`[refreshInstagramData] Instagram ID not found for integration`)
//       return { status: 404, message: "Instagram ID not found for this integration" }
//     }

//     console.log(`[refreshInstagramData] Refreshing token`)
//     const refreshedToken = await refreshToken(integration.token)
//     console.log(`[refreshInstagramData] Token refreshed:`, refreshedToken)

//     const instagramApi = new InstagramAPI(refreshedToken.access_token)
//     console.log(`[refreshInstagramData] Fetching user profile`)
//     const instaData = await instagramApi.getUserProfile(integration.instagramId)
//     console.log(`[refreshInstagramData] User profile fetched:`, instaData)

//     const updatedIntegration = await client.integrations.update({
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
//     console.log(`[refreshInstagramData] Integration updated in database:`, updatedIntegration)
//     return { status: 200, data: instaData }
//   } catch (error) {
//     console.error(`[refreshInstagramData] Error:`, error)
//     return { status: 500, message: "Error refreshing Instagram data" }
//   }
// }

"use server"

import { InstagramAPI } from "@/lib/instagram-api"
import { client } from "@/lib/prisma"
import type { User, ScheduledContent, Integrations } from "@prisma/client"
import { refreshToken } from "@/lib/fetch"
import { AxiosError } from "axios"

const testMediaUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/350",
  "https://via.placeholder.com/150/0000FF/808080",
  "https://via.placeholder.com/350/FF0000/FFFFFF",
]

export async function getScheduledContent(clerkId: string) {
  console.log(`[getScheduledContent] Starting for clerkId: ${clerkId}`)
  try {
    const user = (await client.user.findUnique({
      where: { clerkId },
      include: {
        integrations: {
          where: { name: "INSTAGRAM" },
        },
        scheduledContent: true,
      },
    })) as
      | (User & {
          integrations: Integrations[]
          scheduledContent: ScheduledContent[]
        })
      | null

    console.log(`[getScheduledContent] User found:`, user)

    if (!user || user.integrations.length === 0) {
      console.error(`[getScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      return []
    }

    const integration = user.integrations[0]
    if (!integration.instagramId) {
      console.error(`[getScheduledContent] Instagram ID not found for integration`)
      return []
    }

    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[getScheduledContent] Fetching scheduled content for instagramId: ${integration.instagramId}`)
    const scheduledContent = await instagramApi.getScheduledContent(integration.instagramId)
    console.log(`[getScheduledContent] Scheduled content fetched:`, scheduledContent)

    // Merge Instagram API data with local database data
    const mergedContent = user.scheduledContent.map((localContent: ScheduledContent) => {
      const apiContent = scheduledContent.find((c) => c.id === localContent.instagramPostId)
      return {
        ...localContent,
        ...apiContent,
        status: apiContent ? apiContent.status : localContent.status,
      }
    })

    console.log(`[getScheduledContent] Merged content:`, mergedContent)
    return mergedContent
  } catch (error) {
    console.error(`[getScheduledContent] Error:`, error)
    throw error
  }
}

export async function createScheduledContent(
  clerkId: string,
  contentData: {
    postType: string
    content: string
    scheduledDate: string
    hashtags: string[]
    file?: File | null
    mediaUrl?: string
  },
) {
  console.log(`[createScheduledContent] Starting for clerkId: ${clerkId}`)
  console.log(`[createScheduledContent] Content data:`, JSON.stringify(contentData, null, 2))
  try {
    const user = await client.user.findUnique({
      where: { clerkId },
      include: { integrations: { where: { name: "INSTAGRAM" } } },
    })
    console.log(`[createScheduledContent] User found:`, JSON.stringify(user, null, 2))

    if (!user || user.integrations.length === 0) {
      console.error(`[createScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      throw new Error("No valid Instagram integration found for this user")
    }

    const integration = user.integrations[0]
    if (!integration.instagramId) {
      console.error(`[createScheduledContent] Instagram ID not found for integration`)
      throw new Error("Instagram ID not found for this integration")
    }

    // Use provided mediaUrl or select a random test URL
    const mediaUrl = contentData.mediaUrl || testMediaUrls[Math.floor(Math.random() * testMediaUrls.length)]

    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[createScheduledContent] Creating scheduled content for instagramId: ${integration.instagramId}`)
    console.log(`[createScheduledContent] Payload:`, JSON.stringify({ ...contentData, mediaUrl }, null, 2))

    const newContent = await instagramApi.createScheduledContent(integration.instagramId, {
      ...contentData,
      mediaUrl,
    })
    console.log(`[createScheduledContent] New content created:`, JSON.stringify(newContent, null, 2))

    const createdContent = await client.scheduledContent.create({
      data: {
        instagramPostId: newContent.id,
        caption: newContent.caption,
        mediaType: newContent.media_type,
        mediaUrl: newContent.media_url,
        thumbnailUrl: newContent.thumbnail_url,
        permalink: newContent.permalink,
        scheduledDate: new Date(newContent.timestamp),
        userId: user.id,
        status: "scheduled",
      },
    })
    console.log(`[createScheduledContent] Content saved to database:`, JSON.stringify(createdContent, null, 2))
    return createdContent
  } catch (error) {
    console.error(`[createScheduledContent] Error:`, error)
    if (error instanceof AxiosError) {
      console.error(`[createScheduledContent] Axios Error Details:`, {
        message: error.message,
        code: error.code,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        },
      })
    }
    throw error
  }
}


export async function deleteScheduledContent(clerkId: string, contentId: string) {
  console.log(`[deleteScheduledContent] Starting for clerkId: ${clerkId}, contentId: ${contentId}`)
  try {
    const user = await client.user.findUnique({
      where: { clerkId },
      include: { integrations: { where: { name: "INSTAGRAM" } } },
    })
    console.log(`[deleteScheduledContent] User found:`, user)

    if (!user || user.integrations.length === 0) {
      console.error(`[deleteScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      throw new Error("No valid Instagram integration found for this user")
    }

    const integration = user.integrations[0]
    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[deleteScheduledContent] Deleting content from Instagram`)
    await instagramApi.deleteScheduledContent(contentId)
    console.log(`[deleteScheduledContent] Content deleted from Instagram`)

    const deletedContent = await client.scheduledContent.delete({
      where: { instagramPostId: contentId, userId: user.id },
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
    const user = await client.user.findUnique({
      where: { clerkId },
      include: { integrations: { where: { name: "INSTAGRAM" } } },
    })
    console.log(`[updateScheduledContent] User found:`, user)

    if (!user || user.integrations.length === 0) {
      console.error(`[updateScheduledContent] No valid Instagram integration found for clerkId: ${clerkId}`)
      throw new Error("No valid Instagram integration found for this user")
    }

    const integration = user.integrations[0]
    const instagramApi = new InstagramAPI(integration.token)
    console.log(`[updateScheduledContent] Updating content on Instagram`)
    const updatedContent = await instagramApi.updateScheduledContent(contentId, updateData)
    console.log(`[updateScheduledContent] Content updated on Instagram:`, updatedContent)

    const updatedDbContent = await client.scheduledContent.update({
      where: { instagramPostId: contentId, userId: user.id },
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
    const user = await client.user.findUnique({
      where: { clerkId },
      include: { integrations: { where: { name: "INSTAGRAM" } } },
    })
    console.log(`[refreshInstagramData] User found:`, user)

    if (!user || user.integrations.length === 0) {
      console.error(`[refreshInstagramData] No valid Instagram integration found for clerkId: ${clerkId}`)
      return { status: 404, message: "No valid Instagram integration found" }
    }

    const integration = user.integrations[0]
    if (!integration.instagramId) {
      console.error(`[refreshInstagramData] Instagram ID not found for integration`)
      return { status: 404, message: "Instagram ID not found for this integration" }
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
    return { status: 500, message: "Error refreshing Instagram data" }
  }
}