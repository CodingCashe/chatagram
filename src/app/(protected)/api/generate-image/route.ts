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

// import { NextResponse } from "next/server"

// const MAX_RETRIES = 3
// const INITIAL_RETRY_DELAY = 1000

// // Model configurations
// const CAPTION_MODELS = [
//   {
//     id: "gpt2",
//     url: "https://api-inference.huggingface.co/models/gpt2",
//     name: "GPT-2",
//   },
//   {
//     id: "distilgpt2",
//     url: "https://api-inference.huggingface.co/models/distilgpt2",
//     name: "DistilGPT-2",
//   },
//   {
//     id: "opt",
//     url: "https://api-inference.huggingface.co/models/facebook/opt-125m",
//     name: "OPT-125M",
//   },
// ]

// const IMAGE_MODELS = [
//   {
//     id: "stability",
//     name: "Stability AI",
//     generateImage: async (prompt: string) => {
//       const response = await fetch(
//         "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
//           },
//           body: JSON.stringify({
//             text_prompts: [{ text: prompt, weight: 1 }],
//             cfg_scale: 7,
//             height: 1024,
//             width: 1024,
//             steps: 30,
//             samples: 1,
//           }),
//         },
//       )

//       if (!response.ok) throw new Error(`Stability AI failed: ${response.statusText}`)

//       const data = await response.json()
//       if (!data.artifacts?.[0]?.base64) {
//         throw new Error("No image generated by Stability AI")
//       }

//       return `data:image/png;base64,${data.artifacts[0].base64}`
//     },
//   },
//   {
//     id: "runway",
//     name: "RunwayML",
//     generateImage: async (prompt: string) => {
//       const response = await fetch("https://api.runwayml.com/v1/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.RUNWAY_API_KEY}`,
//         },
//         body: JSON.stringify({
//           prompt,
//           model: "stable-diffusion-v1-5",
//           params: {
//             width: 1024,
//             height: 1024,
//           },
//         }),
//       })

//       if (!response.ok) throw new Error(`RunwayML failed: ${response.statusText}`)

//       const data = await response.json()
//       if (!data.image) {
//         throw new Error("No image generated by RunwayML")
//       }

//       return data.image
//     },
//   },
// ]

// async function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// async function retryFetch(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
//   let lastError: Error | null = null

//   for (let i = 0; i < retries; i++) {
//     try {
//       const response = await fetch(url, options)

//       // Handle model loading state
//       if (response.status === 503) {
//         const data = await response.json()
//         if (data.error?.includes("Model is currently loading")) {
//           await delay(INITIAL_RETRY_DELAY * Math.pow(2, i))
//           continue
//         }
//       }

//       return response
//     } catch (error) {
//       lastError = error as Error
//       await delay(INITIAL_RETRY_DELAY * Math.pow(2, i))
//     }
//   }

//   throw lastError || new Error("All retries failed")
// }

// async function generateCaption(prompt: string): Promise<{ caption: string; modelUsed: string }> {
//   let lastError: Error | null = null

//   for (const model of CAPTION_MODELS) {
//     try {
//       console.log(`Attempting caption generation with ${model.name}...`)

//       const response = await retryFetch(model.url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//         },
//         body: JSON.stringify({
//           inputs: `Create an Instagram caption for: ${prompt}\nMake it engaging and include relevant hashtags.\nKeep it under 150 characters.\n\nCaption:`,
//           parameters: {
//             max_length: 150,
//             temperature: 0.7,
//             top_p: 0.9,
//             return_full_text: false,
//           },
//         }),
//       })

//       if (!response.ok) throw new Error(`${model.name} failed: ${response.statusText}`)

//       const data = await response.json()
//       let caption = data[0]?.generated_text || ""

//       // Add hashtags if none present
//       if (!caption.includes("#")) {
//         const promptWords = prompt.toLowerCase().split(" ")
//         const hashtags = promptWords
//           .filter((word) => word.length > 2)
//           .map((word) => `#${word.replace(/[^a-z0-9]/g, "")}`)
//           .slice(0, 3)
//           .join(" ")
//         caption = `${caption.trim()} ${hashtags} #photography #instagood`
//       }

//       return { caption, modelUsed: model.name }
//     } catch (error) {
//       console.error(`${model.name} caption generation failed:`, error)
//       lastError = error as Error
//     }
//   }

//   // If all models fail, return a default caption
//   const defaultCaption = `Capturing the moment �� ${prompt
//     .split(" ")
//     .filter((word) => word.length > 2)
//     .map((word) => `#${word.replace(/[^a-z0-9]/g, "")}`)
//     .slice(0, 3)
//     .join(" ")} #photography #instagood`

//   return { caption: defaultCaption, modelUsed: "Fallback Template" }
// }

// async function generateImage(prompt: string): Promise<{ imageUrl: string; modelUsed: string }> {
//   let lastError: Error | null = null

//   for (const model of IMAGE_MODELS) {
//     try {
//       console.log(`Attempting image generation with ${model.name}...`)
//       const imageUrl = await model.generateImage(prompt)
//       return { imageUrl, modelUsed: model.name }
//     } catch (error) {
//       console.error(`${model.name} image generation failed:`, error)
//       lastError = error as Error
//     }
//   }

//   throw lastError || new Error("All image generation models failed")
// }

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json()
//     const cleanPrompt = prompt.replace(/--style \w+/, "").trim()

//     // Generate image and caption with fallbacks
//     const [imageResult, captionResult] = await Promise.all([generateImage(prompt), generateCaption(cleanPrompt)])

//     return NextResponse.json({
//       imageUrl: imageResult.imageUrl,
//       caption: captionResult.caption,
//       modelUsed: {
//         image: imageResult.modelUsed,
//         caption: captionResult.modelUsed,
//       },
//     })
//   } catch (error) {
//     console.error("Error generating content:", error)

//     let errorMessage = "Failed to generate content. Please try again."
//     if (error instanceof Error) {
//       if (error.message.includes("429")) {
//         errorMessage = "All services are busy. Please wait a moment and try again."
//       } else if (error.message.includes("No image generated")) {
//         errorMessage = "Failed to generate image with all available models. Please try a different prompt."
//       } else if (error.message.includes("Model is currently loading")) {
//         errorMessage = "AI models are warming up. Please try again in a few seconds."
//       }
//     }

//     return NextResponse.json({ error: errorMessage }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000

// Model configurations
const CAPTION_MODELS = [
  {
    id: "gpt2",
    url: "https://api-inference.huggingface.co/models/gpt2",
    name: "GPT-2",
  },
  {
    id: "distilgpt2",
    url: "https://api-inference.huggingface.co/models/distilgpt2",
    name: "DistilGPT-2",
  },
  {
    id: "opt",
    url: "https://api-inference.huggingface.co/models/facebook/opt-125m",
    name: "OPT-125M",
  },
]

const IMAGE_MODELS = [
  {
    id: "stability",
    name: "Stability AI",
    generateImage: async (prompt: string) => {
      const response = await fetch(
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          },
          body: JSON.stringify({
            text_prompts: [{ text: prompt, weight: 1 }],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 1,
          }),
        },
      )

      if (!response.ok) throw new Error(`Stability AI failed: ${response.statusText}`)

      const data = await response.json()
      if (!data.artifacts?.[0]?.base64) {
        throw new Error("No image generated by Stability AI")
      }

      return `data:image/png;base64,${data.artifacts[0].base64}`
    },
  },
  {
    id: "runway",
    name: "RunwayML",
    generateImage: async (prompt: string) => {
      const response = await fetch("https://api.runwayml.com/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RUNWAY_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          model: "stable-diffusion-v1-5",
          params: {
            width: 1024,
            height: 1024,
          },
        }),
      })

      if (!response.ok) throw new Error(`RunwayML failed: ${response.statusText}`)

      const data = await response.json()
      if (!data.image) {
        throw new Error("No image generated by RunwayML")
      }

      return data.image
    },
  },
]

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function retryFetch(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  let lastError: Error | null = null

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)

      // Handle model loading state
      if (response.status === 503) {
        const data = await response.json()
        if (data.error?.includes("Model is currently loading")) {
          await delay(INITIAL_RETRY_DELAY * Math.pow(2, i))
          continue
        }
      }

      return response
    } catch (error) {
      lastError = error as Error
      await delay(INITIAL_RETRY_DELAY * Math.pow(2, i))
    }
  }

  throw lastError || new Error("All retries failed")
}

async function generateCaption(prompt: string): Promise<{ caption: string; modelUsed: string }> {
  let lastError: Error | null = null

  for (const model of CAPTION_MODELS) {
    try {
      console.log(`Attempting caption generation with ${model.name}...`)

      const response = await retryFetch(model.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `Create an Instagram caption for: ${prompt}\nMake it engaging and include relevant hashtags.\nKeep it under 150 characters.\n\nCaption:`,
          parameters: {
            max_length: 150,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false,
          },
        }),
      })

      if (!response.ok) throw new Error(`${model.name} failed: ${response.statusText}`)

      const data = await response.json()
      let caption = data[0]?.generated_text || ""

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

      return { caption, modelUsed: model.name }
    } catch (error) {
      console.error(`${model.name} caption generation failed:`, error)
      lastError = error as Error
    }
  }

  // If all models fail, return a default caption
  const defaultCaption = `Capturing the moment ✨ ${prompt
    .split(" ")
    .filter((word) => word.length > 2)
    .map((word) => `#${word.replace(/[^a-z0-9]/g, "")}`)
    .slice(0, 3)
    .join(" ")} #photography #instagood`

  return { caption: defaultCaption, modelUsed: "Fallback Template" }
}

async function generateImage(prompt: string): Promise<{ imageUrl: string; modelUsed: string }> {
  let lastError: Error | null = null

  for (const model of IMAGE_MODELS) {
    try {
      console.log(`Attempting image generation with ${model.name}...`)
      const imageUrl = await model.generateImage(prompt)
      return { imageUrl, modelUsed: model.name }
    } catch (error) {
      console.error(`${model.name} image generation failed:`, error)
      lastError = error as Error
    }
  }

  throw lastError || new Error("All image generation models failed")
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const cleanPrompt = prompt.replace(/--style \w+/, "").trim()

    // Generate image and caption with fallbacks
    const [imageResult, captionResult] = await Promise.all([generateImage(prompt), generateCaption(cleanPrompt)])

    return NextResponse.json({
      imageUrl: imageResult.imageUrl,
      caption: captionResult.caption,
      modelUsed: {
        image: imageResult.modelUsed,
        caption: captionResult.modelUsed,
      },
    })
  } catch (error) {
    console.error("Error generating content:", error)

    let errorMessage = "Failed to generate content. Please try again."
    if (error instanceof Error) {
      if (error.message.includes("429")) {
        errorMessage = "All services are busy. Please wait a moment and try again."
      } else if (error.message.includes("No image generated")) {
        errorMessage = "Failed to generate image with all available models. Please try a different prompt."
      } else if (error.message.includes("Model is currently loading")) {
        errorMessage = "AI models are warming up. Please try again in a few seconds."
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

