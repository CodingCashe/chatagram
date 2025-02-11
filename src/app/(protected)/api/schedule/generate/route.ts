import { NextResponse } from "next/server"
import { generateHashtags } from "@/lib/hashtags"
import { generateImage } from "@/lib/image-generation"

export async function POST(req: Request) {
  const { topic, postType } = await req.json()

  // TODO: Implement AI content generation
  const content = `Generated content about ${topic} for ${postType}`
  const hashtags = generateHashtags(topic)

  let mediaUrl = ""
  if (postType !== "story") {
    mediaUrl = await generateImage(topic)
  }

  return NextResponse.json({ content, hashtags, mediaUrl })
}

