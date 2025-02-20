// import { openai } from "@/lib/openai"
// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json()

//     // Generate image using DALL-E
//     const imageResponse = await openai.images.generate({
//       model: "dall-e-3",
//       prompt: prompt,
//       n: 1,
//       size: "1024x1024",
//       quality: "standard",
//     })

//     // Generate caption using GPT-4
//     const captionResponse = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are a social media expert. Create a short, engaging caption for an Instagram post.",
//         },
//         {
//           role: "user",
//           content: `Create a caption for this image prompt: ${prompt}. Keep it under 150 characters and include relevant hashtags.`,
//         },
//       ],
//     })

//     return NextResponse.json({
//       imageUrl: imageResponse.data[0].url,
//       caption: captionResponse.choices[0].message.content,
//     })
//   } catch (error) {
//     console.error("Error generating content:", error)
//     return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
//   }
// }


import { openai } from "@/lib/openai" // keeping this for captions only
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Generate image using Stability AI
    const imageResponse = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      },
    )

    if (!imageResponse.ok) {
      throw new Error("Failed to generate image")
    }

    const imageData = await imageResponse.json()
    const base64Image = imageData.artifacts[0].base64

    // Convert base64 to URL
    const imageUrl = `data:image/png;base64,${base64Image}`

    // Generate caption using GPT-3.5 (cheaper than GPT-4)
    const captionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
      imageUrl,
      caption: captionResponse.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}


