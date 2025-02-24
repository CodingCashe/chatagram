import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { client } from "@/lib/prisma"
import { z } from "zod"

// Validation schema
const PostSchema = z.object({
  caption: z.string().min(1, "Caption is required"),
  mediaType: z.enum(["IMAGE", "CAROUSEL", "VIDEO", "REELS", "STORY"]),
  scheduledDate: z.string().datetime(),
  userId: z.string().min(1, "User ID is required"),
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Validate form data
    const validationResult = PostSchema.safeParse({
      caption: formData.get("caption"),
      mediaType: formData.get("mediaType"),
      scheduledDate: formData.get("scheduledDate"),
      userId: formData.get("userId"),
    })

    if (!validationResult.success) {
      return NextResponse.json({ error: "Invalid form data", details: validationResult.error }, { status: 400 })
    }

    const mediaFile = formData.get("media") as File
    if (!mediaFile) {
      return NextResponse.json({ error: "Media file is required" }, { status: 400 })
    }

    // Check file size (4.5MB limit)
    const MAX_SIZE = 4.5 * 1024 * 1024 // 4.5MB in bytes
    if (mediaFile.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size must be less than 4.5MB" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(mediaFile.name, mediaFile, {
      access: "public",
    })

    // Verify user exists
    const user = await client.user.findUnique({
      where: { clerkId: validationResult.data.userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create scheduled post in database
    const scheduledContent = await client.scheduledContent.create({
      data: {
        caption: validationResult.data.caption,
        mediaType: validationResult.data.mediaType,
        mediaUrl: blob.url,
        thumbnailUrl: blob.url,
        scheduledDate: new Date(validationResult.data.scheduledDate),
        status: "scheduled",
        userId: user.id,
      },
    })

    return NextResponse.json({
      success: true,
      data: scheduledContent,
    })
  } catch (error) {
    console.error("Error in POST /api/schedule-post:", error)
    return NextResponse.json({ error: "Failed to schedule post" }, { status: 500 })
  }
}

