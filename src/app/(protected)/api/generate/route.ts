import { openai } from "@/lib/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Generate image using DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    })

    // Generate caption using GPT-4
    const captionResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a social media expert. Create a short, engaging caption for an Instagram post.",
        },
        {
          role: "user",
          content: `Create a caption for this image prompt: ${prompt}. Keep it under 150 characters and include relevant hashtags.`,
        },
      ],
    })

    return NextResponse.json({
      imageUrl: imageResponse.data[0].url,
      caption: captionResponse.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}

