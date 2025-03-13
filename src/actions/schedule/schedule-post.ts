"use server"

import { revalidatePath } from "next/cache"
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
  automationId?: string | null
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
        status: "scheduled",
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
  clerkId: string,
): Promise<{ success: boolean; data?: ScheduledPost[]; error?: string }> {
  try {
    const user = await client.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    const scheduledPosts = await client.scheduledContent.findMany({
      where: { userId: user.id },
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
        automationId: true,
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

// ... previous code remains the same ...

export async function publishPost(postId: string) {
  try {
    const post = await client.scheduledContent.findUnique({
      where: { id: postId },
      include: {
        User: {
          include: {
            integrations: {
              where: { name: "INSTAGRAM" },
            },
          },
        },
      },
    })

    if (!post) {
      return { success: false, error: "Post not found" }
    }

    // Call the Instagram API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/post-to-instagram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: post.User?.clerkId,
        caption: post.caption,
        mediaUrls: post.mediaUrl.split(","),
        mediaType: post.mediaType,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to publish to Instagram")
    }

    // Update post status
    await client.scheduledContent.update({
      where: { id: postId },
      data: {
        status: "published",
        publishedDate: new Date(),
      },
    })

    revalidatePath("/schedule")
    return { success: true }
  } catch (error) {
    console.error("Error publishing post:", error)
    return { success: false, error: "Failed to publish post" }
  }
}

