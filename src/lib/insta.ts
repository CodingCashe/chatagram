// import { InstagramAPI } from "@/lib/instagram-api"
// import {client} from "@/lib/client"
// import { refreshToken, sendDM, sendPrivateMessage, generateTokens } from "@/lib/fetch"

// export async function getScheduledContent(userId: string) {
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

// export async function createScheduledContent(userId: string, contentData: any) {
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration) {
//       throw new Error("No Instagram integration found for this user")
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

// export async function deleteScheduledContent(userId: string, contentId: string) {
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration) {
//       throw new Error("No Instagram integration found for this user")
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

// export async function refreshInstagramData(userId: string) {
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration) {
//       return { status: 404, message: "No Instagram integration found" }
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

// export async function sendInstagramDM(userId: string, receiverId: string, message: string) {
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration) {
//       return { status: 404, message: "No Instagram integration found" }
//     }

//     await sendDM(integration.instagramId, receiverId, message, integration.token)
//     return { status: 200, message: "DM sent successfully" }
//   } catch (error) {
//     console.error("Error sending Instagram DM:", error)
//     return { status: 500, message: "Error sending Instagram DM" }
//   }
// }

// export async function sendInstagramPrivateMessage(userId: string, receiverId: string, message: string) {
//   try {
//     const integration = await client.integrations.findFirst({
//       where: { userId: userId, name: "INSTAGRAM" },
//     })

//     if (!integration) {
//       return { status: 404, message: "No Instagram integration found" }
//     }

//     await sendPrivateMessage(integration.instagramId, receiverId, message, integration.token)
//     return { status: 200, message: "Private message sent successfully" }
//   } catch (error) {
//     console.error("Error sending Instagram private message:", error)
//     return { status: 500, message: "Error sending Instagram private message" }
//   }
// }

// export async function integrateInstagram(userId: string, code: string) {
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
//         user: { connect: { id: userId } },
//       },
//     })

//     return { status: 200, data: integration }
//   } catch (error) {
//     console.error("Error integrating Instagram:", error)
//     return { status: 500, message: "Error integrating Instagram" }
//   }
// }

import { InstagramAPI } from "@/lib/instagram-api"
import { client } from "@/lib/prisma"
import { refreshToken, sendDM, sendPrivateMessage, generateTokens } from "@/lib/fetch"

export async function getScheduledContent(userId: string | null) {
  if (!userId) {
    console.error("Error in getScheduledContent: userId is null")
    return []
  }

  try {
    const scheduledContent = await client.scheduledContent.findMany({
      where: {
        userId: userId,
        status: "scheduled",
      },
      orderBy: { scheduledDate: "asc" },
    })
    return scheduledContent
  } catch (error) {
    console.error("Error in getScheduledContent:", error)
    return []
  }
}

export async function createScheduledContent(userId: string | null, contentData: any) {
  if (!userId) {
    throw new Error("userId is null")
  }

  try {
    const integration = await client.integrations.findFirst({
      where: { userId: userId, name: "INSTAGRAM" },
    })

    if (!integration || !integration.instagramId) {
      throw new Error("No valid Instagram integration found for this user")
    }

    const instagramApi = new InstagramAPI(integration.token)
    const newContent = await instagramApi.createScheduledContent(integration.instagramId, contentData)

    const createdContent = await client.scheduledContent.create({
      data: {
        instagramPostId: newContent.id,
        caption: newContent.caption,
        mediaType: newContent.media_type,
        mediaUrl: newContent.media_url,
        thumbnailUrl: newContent.thumbnail_url,
        permalink: newContent.permalink,
        scheduledDate: new Date(newContent.timestamp),
        userId: userId,
        status: "scheduled",
      },
    })

    return createdContent
  } catch (error) {
    console.error("Error in createScheduledContent:", error)
    throw error
  }
}

export async function deleteScheduledContent(userId: string | null, contentId: string) {
  if (!userId) {
    throw new Error("userId is null")
  }

  try {
    const integration = await client.integrations.findFirst({
      where: { userId: userId, name: "INSTAGRAM" },
    })

    if (!integration || !integration.instagramId) {
      throw new Error("No valid Instagram integration found for this user")
    }

    const instagramApi = new InstagramAPI(integration.token)
    await instagramApi.deleteScheduledContent(contentId)

    await client.scheduledContent.delete({
      where: { id: contentId, userId: userId },
    })
  } catch (error) {
    console.error("Error in deleteScheduledContent:", error)
    throw error
  }
}

export async function refreshInstagramData(userId: string | null) {
  if (!userId) {
    return { status: 404, message: "userId is null" }
  }

  try {
    const integration = await client.integrations.findFirst({
      where: { userId: userId, name: "INSTAGRAM" },
    })

    if (!integration || !integration.instagramId) {
      return { status: 404, message: "No valid Instagram integration found" }
    }

    const refreshedToken = await refreshToken(integration.token)
    const instagramApi = new InstagramAPI(refreshedToken.access_token)
    const instaData = await instagramApi.getUserProfile(integration.instagramId)

    await client.integrations.update({
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

    return { status: 200, data: instaData }
  } catch (error) {
    console.error("Error refreshing Instagram data:", error)
    return { status: 500, message: "Error refreshing Instagram data" }
  }
}

export async function sendInstagramDM(userId: string | null, receiverId: string, message: string) {
  if (!userId) {
    return { status: 404, message: "userId is null" }
  }

  try {
    const integration = await client.integrations.findFirst({
      where: { userId: userId, name: "INSTAGRAM" },
    })

    if (!integration || !integration.instagramId) {
      return { status: 404, message: "No valid Instagram integration found" }
    }

    await sendDM(integration.instagramId, receiverId, message, integration.token)
    return { status: 200, message: "DM sent successfully" }
  } catch (error) {
    console.error("Error sending Instagram DM:", error)
    return { status: 500, message: "Error sending Instagram DM" }
  }
}

export async function sendInstagramPrivateMessage(userId: string | null, receiverId: string, message: string) {
  if (!userId) {
    return { status: 404, message: "userId is null" }
  }

  try {
    const integration = await client.integrations.findFirst({
      where: { userId: userId, name: "INSTAGRAM" },
    })

    if (!integration || !integration.instagramId) {
      return { status: 404, message: "No valid Instagram integration found" }
    }

    await sendPrivateMessage(integration.instagramId, receiverId, message, integration.token)
    return { status: 200, message: "Private message sent successfully" }
  } catch (error) {
    console.error("Error sending Instagram private message:", error)
    return { status: 500, message: "Error sending Instagram private message" }
  }
}

export async function integrateInstagram(userId: string | null, code: string) {
  if (!userId) {
    return { status: 400, message: "userId is null" }
  }

  try {
    const tokens = await generateTokens(code)
    if (!tokens) {
      return { status: 400, message: "Failed to generate tokens" }
    }

    const instagramApi = new InstagramAPI(tokens.access_token)
    const instaData = await instagramApi.getUserProfile("me")

    const integration = await client.integrations.create({
      data: {
        name: "INSTAGRAM",
        token: tokens.access_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        instagramId: instaData.id,
        username: instaData.username,
        fullName: instaData.name,
        profilePicture: instaData.profile_picture_url,
        followersCount: instaData.followers_count,
        followingCount: instaData.follows_count,
        postsCount: instaData.media_count,
        User: { connect: { id: userId } },
      },
    })

    return { status: 200, data: integration }
  } catch (error) {
    console.error("Error integrating Instagram:", error)
    return { status: 500, message: "Error integrating Instagram" }
  }
}
