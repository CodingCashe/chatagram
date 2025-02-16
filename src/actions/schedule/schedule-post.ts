// "use server"

// import { client } from "@/lib/prisma"

// export async function schedulePost(formData: FormData) {
//   const caption = formData.get("caption") as string
//   const mediaType = formData.get("mediaType") as string
//   const mediaUrl = formData.get("mediaUrl") as string
//   const thumbnailUrl = formData.get("thumbnailUrl") as string
//   const scheduledDate = formData.get("scheduledDate") as string
//   const userId = formData.get("userId") as string

//   try {
//     const scheduledContent = await client.scheduledContent.create({
//       data: {
//         caption,
//         mediaType,
//         mediaUrl,
//         thumbnailUrl,
//         scheduledDate: new Date(scheduledDate),
//         userId,
//       },
//     })

//     return { success: true, data: scheduledContent }
//   } catch (error) {
//     console.error("Error scheduling post:", error)
//     return { success: false, error: "Failed to schedule post" }
//   }
// }

// export async function getScheduledPosts(userId: string) {
//   try {
//     const scheduledPosts = await client.scheduledContent.findMany({
//       where: { userId },
//       orderBy: { scheduledDate: "asc" },
//     })

//     return { success: true, data: scheduledPosts }
//   } catch (error) {
//     console.error("Error fetching scheduled posts:", error)
//     return { success: false, error: "Failed to fetch scheduled posts" }
//   }
// }

"use server"

import { client } from "@/lib/prisma"

export interface ScheduledPost {
  id: string
  caption: string
  mediaType: string
  mediaUrl: string
  thumbnailUrl: string | null
  scheduledDate: string
  publishedDate: string | null
  status: string
}

export async function schedulePost(formData: FormData) {
  const caption = formData.get("caption") as string
  const mediaType = formData.get("mediaType") as string
  const mediaUrl = formData.get("mediaUrl") as string
  const thumbnailUrl = formData.get("thumbnailUrl") as string
  const scheduledDate = formData.get("scheduledDate") as string
  const userId = formData.get("userId") as string

  try {
    const scheduledContent = await client.scheduledContent.create({
      data: {
        caption,
        mediaType,
        mediaUrl,
        thumbnailUrl,
        scheduledDate: new Date(scheduledDate),
        userId,
      },
    })

    return { success: true, data: scheduledContent }
  } catch (error) {
    console.error("Error scheduling post:", error)
    return { success: false, error: "Failed to schedule post" }
  }
}

export async function getScheduledPosts(
  userId: string,
): Promise<{ success: boolean; data?: ScheduledPost[]; error?: string }> {
  try {
    const scheduledPosts = await client.scheduledContent.findMany({
      where: { userId },
      orderBy: { scheduledDate: "asc" },
      select: {
        id: true,
        caption: true,
        mediaType: true,
        mediaUrl: true,
        thumbnailUrl: true,
        scheduledDate: true,
        publishedDate: true,
        status: true,
      },
    })

    const formattedPosts: ScheduledPost[] = scheduledPosts.map((post) => ({
      ...post,
      scheduledDate: post.scheduledDate.toISOString(),
      publishedDate: post.publishedDate ? post.publishedDate.toISOString() : null,
    }))

    return { success: true, data: formattedPosts }
  } catch (error) {
    console.error("Error fetching scheduled posts:", error)
    return { success: false, error: "Failed to fetch scheduled posts" }
  }
}

