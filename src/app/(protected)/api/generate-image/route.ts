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

// import { NextResponse } from "next/server"

// const MAX_RETRIES = 5 // Increased from 3
// const INITIAL_RETRY_DELAY = 1000 // 1 second

// async function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// async function retryFetch(url: string, options: RequestInit, retries = MAX_RETRIES, attempt = 1): Promise<Response> {
//   try {
//     const response = await fetch(url, options)

//     // Handle rate limiting specifically
//     if (response.status === 429) {
//       // Get retry-after header or use exponential backoff
//       const retryAfter = response.headers.get("retry-after")
//       const waitTime = retryAfter ? Number.parseInt(retryAfter) * 1000 : INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1)

//       if (retries > 0) {
//         console.log(`Rate limited. Waiting ${waitTime}ms before retry ${attempt}/${MAX_RETRIES}`)
//         await delay(waitTime)
//         return retryFetch(url, options, retries - 1, attempt + 1)
//       }
//     }

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}))
//       throw new Error(errorData.error || `Request failed with status ${response.status}`)
//     }

//     return response
//   } catch (error) {
//     if (retries > 0) {
//       // Use exponential backoff for other errors too
//       const waitTime = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1)
//       console.log(`Error occurred. Waiting ${waitTime}ms before retry ${attempt}/${MAX_RETRIES}`)
//       await delay(waitTime)
//       return retryFetch(url, options, retries - 1, attempt + 1)
//     }
//     throw error
//   }
// }

// // Create a queue for API requests
// class RequestQueue {
//   private queue: Array<() => Promise<any>> = []
//   private processing = false

//   async add<T>(request: () => Promise<T>): Promise<T> {
//     return new Promise((resolve, reject) => {
//       this.queue.push(async () => {
//         try {
//           const result = await request()
//           resolve(result)
//         } catch (error) {
//           reject(error)
//         }
//       })
//       this.process()
//     })
//   }

//   private async process() {
//     if (this.processing || this.queue.length === 0) return
//     this.processing = true

//     while (this.queue.length > 0) {
//       const request = this.queue.shift()!
//       await request()
//       // Add a small delay between requests
//       await delay(500)
//     }

//     this.processing = false
//   }
// }

// const requestQueue = new RequestQueue()

// async function generateCaption(prompt: string): Promise<string> {
//   return requestQueue.add(async () => {
//     const response = await retryFetch("https://api-inference.huggingface.co/models/gpt2", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//       },
//       body: JSON.stringify({
//         inputs: `Create an Instagram caption for: ${prompt}\nMake it engaging and include relevant hashtags.\nKeep it under 150 characters.\n\nCaption:`,
//         parameters: {
//           max_length: 150,
//           temperature: 0.7,
//           top_p: 0.9,
//           return_full_text: false,
//         },
//       }),
//     })

//     const data = await response.json()

//     let caption = data[0]?.generated_text || ""

//     if (!caption.includes("#")) {
//       const promptWords = prompt.toLowerCase().split(" ")
//       const hashtags = promptWords
//         .filter((word) => word.length > 2)
//         .map((word) => `#${word.replace(/[^a-z0-9]/g, "")}`)
//         .slice(0, 3)
//         .join(" ")
//       caption = `${caption.trim()} ${hashtags} #photography #instagood`
//     }

//     return caption
//   })
// }

// async function generateImage(prompt: string): Promise<string> {
//   return requestQueue.add(async () => {
//     const response = await retryFetch(
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
//       },
//     )

//     const data = await response.json()
//     if (!data.artifacts?.[0]?.base64) {
//       throw new Error("No image generated")
//     }

//     return `data:image/png;base64,${data.artifacts[0].base64}`
//   })
// }

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json()
//     const cleanPrompt = prompt.replace(/--style \w+/, "").trim()

//     // Process requests sequentially through the queue
//     const [imageUrl, caption] = await Promise.all([generateImage(prompt), generateCaption(cleanPrompt)])

//     return NextResponse.json({ imageUrl, caption })
//   } catch (error) {
//     console.error("Error generating content:", error)

//     // Provide more specific error messages
//     let errorMessage = "Failed to generate content. Please try again."
//     if (error instanceof Error) {
//       if (error.message.includes("429")) {
//         errorMessage = "Service is busy. Please wait a moment and try again."
//       } else if (error.message.includes("No image generated")) {
//         errorMessage = "Failed to generate image. Please try a different prompt."
//       }
//     }

//     return NextResponse.json({ error: errorMessage }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import axios from "axios"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function retryRequest<T>(requestFunction: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i < retries; i++) {
    try {
      return await requestFunction()
    } catch (error) {
      console.error(`Request failed (attempt ${i + 1}):`, error)
      lastError = error as Error
      await delay(INITIAL_RETRY_DELAY * Math.pow(2, i))
    }
  }

  throw lastError || new Error("All retries failed")
}

async function generateImage(prompt: string): Promise<string> {
  const response = await retryRequest(() =>
    axios.get(`https://source.unsplash.com/random/1024x1024/?${encodeURIComponent(prompt)}`),
  )

  return response.request.res.responseUrl
}

async function generateCaption(prompt: string): Promise<string> {
  const response = await retryRequest(() =>
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative Instagram caption writer. Create engaging captions with relevant hashtags.",
        },
        {
          role: "user",
          content: `Create an Instagram caption for: ${prompt}\nMake it engaging and include relevant hashtags.\nKeep it under 150 characters.`,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    }),
  )

  let caption = response.choices[0]?.message.content || ""

  // Add hashtags if none present
  if (!caption.includes("#")) {
    const promptWords = prompt.toLowerCase().split(" ")
    const hashtags = promptWords
      .filter((word) => word.length > 2)
      .map((word) => `#${word.replace(/[^a-z0-9]/g, "")}`)
      .slice(0, 3)
      .join(" ")
    caption = `${caption.trim()} ${hashtags} #photography #instagood`
  }

  return caption
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const cleanPrompt = prompt.replace(/--style \w+/, "").trim()

    // Generate image and caption
    const [imageUrl, caption] = await Promise.all([generateImage(prompt), generateCaption(cleanPrompt)])

    return NextResponse.json({
      imageUrl,
      caption,
      modelUsed: {
        image: "Unsplash Random Image",
        caption: "GPT-3.5-turbo",
      },
    })
  } catch (error) {
    console.error("Error generating content:", error)

    let errorMessage = "Failed to generate content. Please try again."
    if (error instanceof Error) {
      if (error.message.includes("429")) {
        errorMessage = "Services are busy. Please wait a moment and try again."
      } else if (error.message.includes("All retries failed")) {
        errorMessage = "Failed to generate content after multiple attempts. Please try again later."
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

