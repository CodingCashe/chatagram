// import { NextResponse } from "next/server"
// import { client } from "@/lib/prisma"

// export async function POST(request: Request) {
//   try {
//     const { caption, mediaType, mediaUrl, thumbnailUrl, scheduledDate, userId } = await request.json()

//     // Validate input
//     if (!caption || !mediaType || !mediaUrl || !scheduledDate || !userId) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     // Create scheduled content
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

//     return NextResponse.json(scheduledContent)
//   } catch (error) {
//     console.error("Error scheduling post:", error)
//     return NextResponse.json({ error: "Failed to schedule post" }, { status: 500 })
//   }
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const userId = searchParams.get("userId")

//     if (!userId) {
//       return NextResponse.json({ error: "Missing userId" }, { status: 400 })
//     }

//     const scheduledPosts = await client.scheduledContent.findMany({
//       where: { userId },
//       orderBy: { scheduledDate: "asc" },
//     })

//     return NextResponse.json(scheduledPosts)
//   } catch (error) {
//     console.error("Error fetching scheduled posts:", error)
//     return NextResponse.json({ error: "Failed to fetch scheduled posts" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { userId, caption, mediaUrls, mediaType, scheduledDate } = await request.json()

    const user = await client.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const scheduledPost = await client.scheduledContent.create({
      data: {
        caption,
        mediaType,
        mediaUrl: mediaUrls.join(","),
        status: "scheduled",
        scheduledDate: new Date(scheduledDate),
        userId: user.id,
      },
    })

    return NextResponse.json({ success: true, scheduledPostId: scheduledPost.id })
  } catch (error) {
    console.error("Error scheduling post:", error)
    return NextResponse.json({ error: "Failed to schedule post" }, { status: 500 })
  }
}

