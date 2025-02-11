export async function generateImage(prompt: string): Promise<string> {
  // TODO: Implement actual image generation using an AI service
  // This is a placeholder that returns a random unsplash image
  return `https://source.unsplash.com/random?${encodeURIComponent(prompt)}`
}

