import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import axios from "axios"

export const config = {
  runtime: "edge",
}

async function publishPost(post: any, instagramIntegration: any) {
  try {
    // Step 1: Create a container for the image
    const createContainerResponse = await axios.post(
      `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media`,
      {
        image_url: post.mediaUrl.split(",")[0], // Use the first image if it's a carousel
        caption: post.caption,
        media_type: post.mediaType,
      },
      {
        params: { access_token: instagramIntegration.token },
      },
    )

    const containerId = createContainerResponse.data.id

    // Step 2: Publish the container
    const publishResponse = await axios.post(
      `https://graph.instagram.com/v22.0/${instagramIntegration.instagramId}/media_publish`,
      {
        creation_id: containerId,
      },
      {
        params: { access_token: instagramIntegration.token },
      },
    )

    const postId = publishResponse.data.id

    // Update post status in database
    await client.scheduledContent.update({
      where: { id: post.id },
      data: {
        status: "published",
        publishedDate: new Date(),
        instagramPostId: postId,
      },
    })

    console.log(`Successfully published post ${post.id}`)
  } catch (error) {
    console.error(`Error publishing post ${post.id}:`, error)
    // You might want to update the post status to "failed" here
    await client.scheduledContent.update({
      where: { id: post.id },
      data: {
        status: "failed",
      },
    })
  }
}

export async function GET(request: Request) {
  try {
    const now = new Date()
    const scheduledPosts = await client.scheduledContent.findMany({
      where: {
        status: "scheduled",
        scheduledDate: {
          lte: now,
        },
      },
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

    for (const post of scheduledPosts) {
      if (post.User?.integrations[0]) {
        await publishPost(post, post.User.integrations[0])
      } else {
        console.error(`No Instagram integration found for post ${post.id}`)
      }
    }

    return NextResponse.json({ success: true, message: "Cron job completed successfully" })
  } catch (error) {
    console.error("Error in cron job:", error)
    return NextResponse.json({ success: false, error: "Cron job failed" }, { status: 500 })
  }
}

