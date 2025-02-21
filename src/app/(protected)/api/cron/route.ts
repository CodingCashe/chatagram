import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import type { ScheduledContent, User, Integrations } from "@prisma/client"

interface ScheduledPostWithUser extends ScheduledContent {
  User:
    | (User & {
        integrations: Integrations[]
      })
    | null
}

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const scheduledPosts = (await client.scheduledContent.findMany({
      where: {
        status: "scheduled",
        scheduledDate: {
          lte: new Date(),
        },
      },
      include: {
        User: {
          include: {
            integrations: {
              where: {
                name: "INSTAGRAM",
              },
            },
          },
        },
      },
    })) as ScheduledPostWithUser[]

    // Process each post
    for (const post of scheduledPosts) {
      try {
        // Check if user and Instagram integration exist
        if (!post.User || !post.User.integrations[0]?.instagramId) {
          console.error(`Missing user or Instagram integration for post ${post.id}`)
          continue
        }

        // Split mediaUrl and ensure we have valid URLs
        const mediaUrls = post.mediaUrl.split(",").filter(Boolean)

        if (mediaUrls.length === 0) {
          throw new Error("No valid media URLs founnd")
        }

        const response = await fetch(`${process.env.VERCEL_URL}/api/post-to-instagram`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: post.User.clerkId,
            caption: post.caption,
            mediaUrls,
            mediaType: post.mediaType,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to post to Instagraaam: ${response.statusText}`)
        }

        // Update post status
        await client.scheduledContent.update({
          where: { id: post.id },
          data: {
            status: "published",
            publishedDate: new Date(),
          },
        })
      } catch (error) {
        console.error(`Failed to process post ${post.id}:`, error)

        // Update post status to failed
        await client.scheduledContent.update({
          where: { id: post.id },
          data: {
            status: "failed",
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: scheduledPosts.length,
    })
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json({ error: "Failed to process scheduled posts" }, { status: 500 })
  }
}

