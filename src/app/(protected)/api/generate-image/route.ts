import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Log the start of image generation
    console.log("Starting image generation...");

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
      }
    );

    // Check if image generation failed
    if (!imageResponse.ok) {
      const errorData = await imageResponse.json(); // Log the error response from Stability AI
      console.error("Image generation failed:", errorData);
      throw new Error("Failed to generate image");
    }

    // Log successful image generation
    console.log("Image generation successful!");

    const imageData = await imageResponse.json();
    const base64Image = imageData.artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${base64Image}`;

    // Log the start of caption generation
    console.log("Starting caption generation...");

    // Generate caption using Hugging Face's Inference API
    const captionResponse = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `Create a short, engaging Instagram caption for: ${prompt}. Keep it under 150 characters and include relevant hashtags.`,
        }),
      }
    );

    // Check if caption generation failed
    if (!captionResponse.ok) {
      const errorData = await captionResponse.json(); // Log the error response from Hugging Face
      console.error("Caption generation failed:", errorData);
      throw new Error("Failed to generate caption");
    }

    // Log successful caption generation
    console.log("Caption generation successful!");

    const captionData = await captionResponse.json();
    const caption = captionData[0]?.generated_text || "No caption generated.";

    return NextResponse.json({
      imageUrl,
      caption,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}