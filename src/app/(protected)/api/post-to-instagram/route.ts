
//WORKING
// import { NextResponse } from "next/server"
// import { client } from "@/lib/prisma"
// import axios, { AxiosError } from "axios"

// // Helper function to safely stringify objects
// function safeStringify(obj: any): string {
//   try {
//     return JSON.stringify(obj, null, 2)
//   } catch (error) {
//     return `[Circular or Non-Serializable Object]: ${Object.keys(obj).join(", ")}`
//   }
// }

// // Helper function for detailed error logging
// function logError(stage: string, error: any) {
//   console.error(`Error during ${stage}:`)
//   if (error instanceof AxiosError) {
//     console.error("Axios Error:", {
//       message: error.message,
//       code: error.code,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       headers: safeStringify(error.response?.headers),
//       data: safeStringify(error.response?.data),
//       config: {
//         url: error.config?.url,
//         method: error.config?.method,
//         headers: safeStringify(error.config?.headers),
//         data: safeStringify(error.config?.data),
//       },
//     })
//   } else if (error instanceof Error) {
//     console.error("General Error:", {
//       name: error.name,
//       message: error.message,
//       stack: error.stack,
//     })
//   } else {
//     console.error("Unknown Error:", error)
//   }
// }

// export async function POST(request: Request) {
//   try {
//     console.log("Received POST request to /api/post-to-instagram")
//     const { userId, caption, mediaUrl } = await request.json()
//     console.log("Request payload:", { userId, caption, mediaUrl })

//     // Fetch the user's Instagram integration
//     console.log("Fetching user Instagram integration")
//     const user = await client.user.findUnique({
//       where: { clerkId: userId }, // Changed from id to clerkId
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })

//     if (!user || !user.integrations[0]) {
//       console.error("User not found or Instagram not integrated:", { userId, user })
//       return NextResponse.json({ error: "User not found or Instagram not integrated" }, { status: 404 })
//     }

//     const instagramIntegration = user.integrations[0]
//     console.log("Instagram integration found:", {
//       integrationId: instagramIntegration.id,
//       instagramId: instagramIntegration.instagramId,
//     })

//     // Step 1: Create a container for the image
//     console.log("Creating media container")
//     let createContainerResponse
//     try {
//       createContainerResponse = await axios.post(
//         `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media`,
//         {
//           image_url: mediaUrl,
//           caption: caption,
//         },
//         {
//           params: { access_token: instagramIntegration.token },
//         },
//       )
//       console.log("Media container created successfully:", createContainerResponse.data)
//     } catch (error) {
//       logError("creating media container", error)
//       return NextResponse.json({ error: "Failed to create media container" }, { status: 500 })
//     }

//     const containerId = createContainerResponse.data.id

//     // Step 2: Publish the container
//     console.log("Publishing media container")
//     let publishResponse
//     try {
//       publishResponse = await axios.post(
//         `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media_publish`,
//         {
//           creation_id: containerId,
//         },
//         {
//           params: { access_token: instagramIntegration.token },
//         },
//       )
//       console.log("Media published successfully:", publishResponse.data)
//     } catch (error) {
//       logError("publishing media", error)
//       return NextResponse.json({ error: "Failed to publish media" }, { status: 500 })
//     }

//     const postId = publishResponse.data.id

//     // Store the post in the database
//     console.log("Storing post in database")
//     const now = new Date()
//     let storedPost
//     try {
//       storedPost = await client.scheduledContent.create({
//         data: {
//           instagramPostId: postId,
//           caption,
//           mediaType: "IMAGE",
//           mediaUrl,
//           status: "published",
//           scheduledDate: now,
//           publishedDate: now,
//           userId: user.id, // Use the actual UUID from the user object
//         },
//       })
//       console.log("Post stored in database:", storedPost)
//     } catch (error) {
//       logError("storing post in database", error)
//       return NextResponse.json({ error: "Failed to store post in database" }, { status: 500 })
//     }

//     console.log("Post process completed successfully")
//     return NextResponse.json({ success: true, postId, storedPostId: storedPost.id })
//   } catch (error) {
//     logError("overall post process", error)
//     return NextResponse.json({ error: "Failed to post to Instagram" }, { status: 500 })
//   }
// }

// import { NextResponse } from "next/server"
// import { client } from "@/lib/prisma"
// import axios, { AxiosError } from "axios"

// // Helper function to safely stringify objects
// function safeStringify(obj: any): string {
//   try {
//     return JSON.stringify(obj, null, 2)
//   } catch (error) {
//     return `[Circular or Non-Serializable Object]: ${Object.keys(obj).join(", ")}`
//   }
// }

// // Helper function for detailed error logging
// function logError(stage: string, error: any) {
//   console.error(`Error during ${stage}:`)
//   if (error instanceof AxiosError) {
//     console.error("Axios Error:", {
//       message: error.message,
//       code: error.code,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       headers: safeStringify(error.response?.headers),
//       data: safeStringify(error.response?.data),
//       config: {
//         url: error.config?.url,
//         method: error.config?.method,
//         headers: safeStringify(error.config?.headers),
//         data: safeStringify(error.config?.data),
//       },
//     })
//   } else if (error instanceof Error) {
//     console.error("General Error:", {
//       name: error.name,
//       message: error.message,
//       stack: error.stack,
//     })
//   } else {
//     console.error("Unknown Error:", error)
//   }
// }

// export async function POST(request: Request) {
//   try {
//     console.log("Received POST request to /api/post-to-instagram")
//     const { userId, caption, mediaUrls, mediaType } = await request.json()
//     console.log("Request payload:", { userId, caption, mediaUrls, mediaType })

//     // Fetch the user's Instagram integration
//     console.log("Fetching user Instagram integration")
//     const user = await client.user.findUnique({
//       where: { clerkId: userId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })

//     if (!user || !user.integrations[0]) {
//       console.error("User not found or Instagram not integrated:", { userId, user })
//       return NextResponse.json({ error: "User not found or Instagram not integrated" }, { status: 404 })
//     }

//     const instagramIntegration = user.integrations[0]
//     console.log("Instagram integration found:", {
//       integrationId: instagramIntegration.id,
//       instagramId: instagramIntegration.instagramId,
//     })

//     const containerIds: string[] = []

//     // Step 1: Create containers for all media
//     for (const mediaUrl of mediaUrls) {
//       console.log("Creating media container")
//       try {
//         const createContainerResponse = await axios.post(
//           `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media`,
//           {
//             [mediaType === "REELS" ? "video_url" : "image_url"]: mediaUrl,
//             caption: mediaUrls.length === 1 ? caption : undefined,
//             media_type: mediaType,
//             ...(mediaUrls.length > 1 && { is_carousel_item: "true" }),
//           },
//           {
//             params: { access_token: instagramIntegration.token },
//           },
//         )
//         console.log("Media container created successfully:", createContainerResponse.data)
//         containerIds.push(createContainerResponse.data.id)
//       } catch (error) {
//         logError("creating media container", error)
//         return NextResponse.json({ error: "Failed to create media container" }, { status: 500 })
//       }
//     }

//     let finalContainerId: string

//     // Step 2: Create carousel container if necessary
//     if (mediaUrls.length > 1) {
//       console.log("Creating carousel container")
//       try {
//         const createCarouselResponse = await axios.post(
//           `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media`,
//           {
//             media_type: "CAROUSEL",
//             caption,
//             children: containerIds.join(","),
//           },
//           {
//             params: { access_token: instagramIntegration.token },
//           },
//         )
//         console.log("Carousel container created successfully:", createCarouselResponse.data)
//         finalContainerId = createCarouselResponse.data.id
//       } catch (error) {
//         logError("creating carousel container", error)
//         return NextResponse.json({ error: "Failed to create carousel container" }, { status: 500 })
//       }
//     } else {
//       finalContainerId = containerIds[0]
//     }

//     // Step 3: Publish the container
//     console.log("Publishing media container")
//     let publishResponse
//     try {
//       publishResponse = await axios.post(
//         `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media_publish`,
//         {
//           creation_id: finalContainerId,
//         },
//         {
//           params: { access_token: instagramIntegration.token },
//         },
//       )
//       console.log("Media published successfully:", publishResponse.data)
//     } catch (error) {
//       logError("publishing media", error)
//       return NextResponse.json({ error: "Failed to publish media" }, { status: 500 })
//     }

//     const postId = publishResponse.data.id

//     // Store the post in the database
//     console.log("Storing post in database")
//     const now = new Date()
//     let storedPost
//     try {
//       storedPost = await client.scheduledContent.create({
//         data: {
//           instagramPostId: postId,
//           caption,
//           mediaType,
//           mediaUrl: mediaUrls.join(","),
//           status: "published",
//           scheduledDate: now,
//           publishedDate: now,
//           userId: user.id,
//         },
//       })
//       console.log("Post stored in database:", storedPost)
//     } catch (error) {
//       logError("storing post in database", error)
//       return NextResponse.json({ error: "Failed to store post in database" }, { status: 500 })
//     }

//     console.log("Post process completed successfully")
//     return NextResponse.json({ success: true, postId, storedPostId: storedPost.id })
//   } catch (error) {
//     logError("overall post process", error)
//     return NextResponse.json({ error: "Failed to post to Instagram" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import axios from "axios"

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

// Add this new function for token refreshing
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

    const instagramIntegration = user.integrations[0]
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

    const containerIds: string[] = []

    // Step 1: Create containers for all media
    for (const mediaUrl of mediaUrls) {
      console.log("Creating media container")
      try {
        const createContainerResponse = await axios.post(
          `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media`,
          {
            [mediaType === "REELS" ? "video_url" : "image_url"]: mediaUrl,
            caption: mediaUrls.length === 1 ? caption : undefined,
            media_type: mediaType,
            ...(mediaUrls.length > 1 && { is_carousel_item: "true" }),
          },
          {
            params: { access_token: refreshedToken },
          },
        )
        console.log("Media container created successfully:", createContainerResponse.data)
        containerIds.push(createContainerResponse.data.id)
      } catch (error) {
        logError("creating media container", error)
        return NextResponse.json({ error: "Failed to create media container" }, { status: 500 })
      }
    }

    let finalContainerId: string

    // Step 2: Create carousel container if necessary
    if (mediaUrls.length > 1) {
      console.log("Creating carousel container")
      try {
        const createCarouselResponse = await axios.post(
          `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media`,
          {
            media_type: "CAROUSEL",
            caption,
            children: containerIds.join(","),
          },
          {
            params: { access_token: refreshedToken },
          },
        )
        console.log("Carousel container created successfully:", createCarouselResponse.data)
        finalContainerId = createCarouselResponse.data.id
      } catch (error) {
        logError("creating carousel container", error)
        return NextResponse.json({ error: "Failed to create carousel container" }, { status: 500 })
      }
    } else {
      finalContainerId = containerIds[0]
    }

    // Step 3: Publish the container
    console.log("Publishing media container")
    let publishResponse
    try {
      publishResponse = await axios.post(
        `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media_publish`,
        {
          creation_id: finalContainerId,
        },
        {
          params: { access_token: refreshedToken },
        },
      )
      console.log("Media published successfully:", publishResponse.data)
    } catch (error) {
      logError("publishing media", error)
      return NextResponse.json({ error: "Failed to publish media" }, { status: 500 })
    }

    const postId = publishResponse.data.id

    // Store the post in the database
    console.log("Storing post in database")
    const now = new Date()
    let storedPost
    try {
      storedPost = await client.scheduledContent.create({
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
      console.log("Post stored in database:", storedPost)

      // Update the refreshed token in the database
      await client.integrations.update({
        where: { id: instagramIntegration.id },
        data: { token: refreshedToken },
      })
      console.log("Updated refreshed token in database")
    } catch (error) {
      logError("storing post in database", error)
      return NextResponse.json({ error: "Failed to store post in database" }, { status: 500 })
    }

    console.log("Post process completed successfully")
    return NextResponse.json({ success: true, postId, storedPostId: storedPost.id })
  } catch (error) {
    logError("overall post process", error)
    return NextResponse.json({ error: "Failed to post to Instagram" }, { status: 500 })
  }
}


// import { NextResponse } from "next/server"
// import { client } from "@/lib/prisma"
// import axios from "axios"

// const INSTAGRAM_API_BASE = "https://graph.instagram.com/v22.0"

// const safeStringify = (obj: any) => {
//   try {
//     return JSON.stringify(obj, null, 2)
//   } catch (error) {
//     return "Error stringifying object"
//   }
// }

// const logError = (message: string, error: any) => {
//   console.error(message, safeStringify(error))
// }

// export async function POST(request: Request) {
//   try {
//     console.log("Received POST request to /api/post-to-instagram")
//     const { userId, caption, mediaUrls, mediaType } = await request.json()
//     console.log("Request payload:", { userId, caption, mediaUrls, mediaType })

//     // Fetch the user's Instagram integration
//     console.log("Fetching user Instagram integration")
//     const user = await client.user.findUnique({
//       where: { clerkId: userId },
//       include: { integrations: { where: { name: "INSTAGRAM" } } },
//     })

//     if (!user || !user.integrations[0]) {
//       console.error("User not found or Instagram not integrated:", { userId, user })
//       return NextResponse.json({ error: "User not found or Instagram not integrated" }, { status: 404 })
//     }

//     const instagramIntegration = user.integrations[0]
//     console.log("Instagram integration found:", {
//       integrationId: instagramIntegration.id,
//       instagramId: instagramIntegration.instagramId,
//     })

//     const containerIds: string[] = []

//     // Step 1: Create containers for all media
//     for (const mediaUrl of mediaUrls) {
//       console.log("Creating media container")
//       try {
//         const createContainerResponse = await axios.post(
//           `${INSTAGRAM_API_BASE}/${instagramIntegration.instagramId}/media`,
//           {
//             [mediaType === "VIDEO" || mediaType === "REELS" ? "video_url" : "image_url"]: mediaUrl,
//             caption: mediaUrls.length === 1 ? caption : undefined,
//             media_type: mediaType,
//             ...(mediaUrls.length > 1 && { is_carousel_item: true }),
//           },
//           {
//             params: { access_token: instagramIntegration.token },
//           },
//         )
//         console.log("Media container created successfully:", createContainerResponse.data)
//         containerIds.push(createContainerResponse.data.id)
//       } catch (error) {
//         logError("creating media container", error)
//         return NextResponse.json({ error: "Failed to create media container" }, { status: 500 })
//       }
//     }

//     let finalContainerId: string

//     // Step 2: Create carousel container if necessary
//     if (mediaUrls.length > 1) {
//       console.log("Creating carousel container")
//       try {
//         const createCarouselResponse = await axios.post(
//           `${INSTAGRAM_API_BASE}/${instagramIntegration.instagramId}/media`,
//           {
//             media_type: "CAROUSEL",
//             caption,
//             children: containerIds.join(","),
//           },
//           {
//             params: { access_token: instagramIntegration.token },
//           },
//         )
//         console.log("Carousel container created successfully:", createCarouselResponse.data)
//         finalContainerId = createCarouselResponse.data.id
//       } catch (error) {
//         logError("creating carousel container", error)
//         return NextResponse.json({ error: "Failed to create carousel container" }, { status: 500 })
//       }
//     } else {
//       finalContainerId = containerIds[0]
//     }

//     // Step 3: Publish the container
//     console.log("Publishing media container")
//     let publishResponse
//     try {
//       publishResponse = await axios.post(
//         `${INSTAGRAM_API_BASE}/${instagramIntegration.instagramId}/media_publish`,
//         {
//           creation_id: finalContainerId,
//         },
//         {
//           params: { access_token: instagramIntegration.token },
//         },
//       )
//       console.log("Media published successfully:", publishResponse.data)
//     } catch (error) {
//       logError("publishing media", error)
//       return NextResponse.json({ error: "Failed to publish media" }, { status: 500 })
//     }

//     const postId = publishResponse.data.id

//     // Store the post in the database
//     console.log("Storing post in database")
//     const now = new Date()
//     let storedPost
//     try {
//       storedPost = await client.scheduledContent.create({
//         data: {
//           instagramPostId: postId,
//           caption,
//           mediaType,
//           mediaUrl: mediaUrls.join(","),
//           status: "published",
//           scheduledDate: now,
//           publishedDate: now,
//           userId: user.id,
//         },
//       })
//       console.log("Post stored in database:", storedPost)
//     } catch (error) {
//       logError("storing post in database", error)
//       return NextResponse.json({ error: "Failed to store post in database" }, { status: 500 })
//     }

//     console.log("Post process completed successfully")
//     return NextResponse.json({ success: true, postId, storedPostId: storedPost.id })
//   } catch (error) {
//     logError("overall post process", error)
//     return NextResponse.json({ error: "Failed to post to Instagram" }, { status: 500 })
//   }
// }

