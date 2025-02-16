import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import axios from "axios"

export async function POST(request: Request) {
  try {
    const { userId, caption, mediaUrl } = await request.json()

    // Fetch the user's Instagram integration
    const user = await client.user.findUnique({
      where: { id: userId },
      include: { integrations: { where: { name: "INSTAGRAM" } } },
    })

    if (!user || !user.integrations[0]) {
      return NextResponse.json({ error: "User not found or Instagram not integrated" }, { status: 404 })
    }

    const instagramIntegration = user.integrations[0]

    // Step 1: Create a container for the image
    const createContainerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${instagramIntegration.instagramId}/media`,
      {
        image_url: mediaUrl,
        caption: caption,
      },
      {
        params: { access_token: instagramIntegration.token },
      },
    )

    const containerId = createContainerResponse.data.id

    // Step 2: Publish the container
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${instagramIntegration.instagramId}/media_publish`,
      {
        creation_id: containerId,
      },
      {
        params: { access_token: instagramIntegration.token },
      },
    )

    const postId = publishResponse.data.id

    // Store the post in the database
    const now = new Date()
    await client.scheduledContent.create({
      data: {
        instagramPostId: postId,
        caption,
        mediaType: "IMAGE",
        mediaUrl,
        status: "published",
        scheduledDate: now, // Set scheduledDate to current time
        publishedDate: now,
        userId,
      },
    })

    return NextResponse.json({ success: true, postId })
  } catch (error) {
    console.error("Error posting to Instagram:", error)
    return NextResponse.json({ error: "Failed to post to Instagram" }, { status: 500 })
  }
}
