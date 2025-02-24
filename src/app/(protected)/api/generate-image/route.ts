// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     // Log the start of image generation
//     console.log("Starting image generation...");

//     // Generate image using Stability AI
//     const imageResponse = await fetch(
//       "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
//         },
//         body: JSON.stringify({
//           text_prompts: [
//             {
//               text: prompt,
//               weight: 1,
//             },
//           ],
//           cfg_scale: 7,
//           height: 1024,
//           width: 1024,
//           steps: 30,
//           samples: 1,
//         }),
//       }
//     );

//     // Check if image generation failed
//     if (!imageResponse.ok) {
//       const errorData = await imageResponse.json(); // Log the error response from Stability AI
//       console.error("Image generation failed:", errorData);
//       throw new Error("Failed to generate image");
//     }

//     // Log successful image generation
//     console.log("Image generation successful!");

//     const imageData = await imageResponse.json();
//     const base64Image = imageData.artifacts[0].base64;
//     const imageUrl = `data:image/png;base64,${base64Image}`;

//     // Log the start of caption generation
//     console.log("Starting caption generation...");

//     // Generate caption using Hugging Face's Inference API
//     const captionResponse = await fetch(
//       "https://api-inference.huggingface.co/models/gpt2",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//         },
//         body: JSON.stringify({
//           inputs: `Create a short, engaging Instagram caption for: ${prompt}. Keep it under 150 characters and include relevant hashtags.`,
//         }),
//       }
//     );

//     // Check if caption generation failed
//     if (!captionResponse.ok) {
//       const errorData = await captionResponse.json(); // Log the error response from Hugging Face
//       console.error("Caption generation failed:", errorData);
//       throw new Error("Failed to generate caption");
//     }

//     // Log successful caption generation
//     console.log("Caption generation successful!");

//     const captionData = await captionResponse.json();
//     const caption = captionData[0]?.generated_text || "No caption generated.";

//     return NextResponse.json({
//       imageUrl,
//       caption,
//     });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     return NextResponse.json(
//       { error: "Failed to generate content" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server"

const MAX_RETRIES = 3
const RETRY_DELAY = 2000 // 2 seconds

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function retryFetch(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Request failed with status ${response.status}`)
    }
    return response
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${MAX_RETRIES - retries + 1}/${MAX_RETRIES}`)
      await delay(RETRY_DELAY)
      return retryFetch(url, options, retries - 1)
    }
    throw error
  }
}

async function generateCaption(prompt: string): Promise<string> {
  const systemPrompt = `You are an Instagram caption writer. Create a short, engaging caption (max 150 characters) for an image of: ${prompt}
  Include relevant hashtags. Focus on describing the scene and creating engagement.
  Format: [Main caption text] [Hashtags]
  Example: "Chasing sunsets and dreams in paradise 🌅✨ #NatureLover #SunsetVibes #WanderlustLife"`

  const response = await retryFetch("https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
    },
    body: JSON.stringify({
      inputs: systemPrompt,
      parameters: {
        max_length: 150,
        temperature: 0.7,
        top_p: 0.9,
      },
    }),
  })

  const data = await response.json()
  return data[0]?.generated_text || "Capturing moments that matter ✨ #Photography"
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Remove style flag from prompt for caption generation
    const cleanPrompt = prompt.replace(/--style \w+/, "").trim()

    // Start both operations concurrently
    const [imageResponse, caption] = await Promise.all([
      retryFetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
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
      }).then(async (res) => {
        const data = await res.json()
        if (!data.artifacts?.[0]?.base64) {
          throw new Error("No image generated")
        }
        return data
      }),
      generateCaption(cleanPrompt),
    ])

    const base64Image = imageResponse.artifacts[0].base64
    const imageUrl = `data:image/png;base64,${base64Image}`

    return NextResponse.json({
      imageUrl,
      caption,
    })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content. Please try again." }, { status: 500 })
  }
}

