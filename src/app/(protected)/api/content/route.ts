import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY

// Helper function for retrying requests
async function retryRequest<T>(requestFunction: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFunction()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)))
    }
  }
  throw new Error("Max retries reached")
}

// Caption Generation
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
    }),
  )

  return response.choices[0]?.message.content || "Failed to generate caption."
}

// Content Suggestions
async function generateContentSuggestions(topic: string): Promise<any> {
  const response = await retryRequest(() =>
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert content strategist for social media.",
        },
        {
          role: "user",
          content: `Generate 5 content ideas for Instagram posts about ${topic}. For each idea, provide a title, description, and 3 example posts.`,
        },
      ],
      max_tokens: 500,
    }),
  )

  const content = response.choices[0]?.message.content
  return JSON.parse(content || "[]")
}

// Hashtag Analysis
async function analyzeHashtags(hashtag: string): Promise<any> {
  // This is a mock function. In a real-world scenario, you'd integrate with an Instagram API or a third-party service.
  const mockData = {
    tag: `#${hashtag}`,
    posts: Math.floor(Math.random() * 1000000),
    engagement: Math.floor(Math.random() * 100),
    competition: Math.floor(Math.random() * 100),
    trending: Math.random() > 0.5,
    reachPotential: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    avgLikes: Math.floor(Math.random() * 1000),
    related: ["socialmedia", "marketing", "business", "entrepreneur"].map((tag) => `#${tag}`),
    bestTimeToUse: "Weekdays 9AM-11AM",
    popularityTrend: ["Increasing", "Stable", "Decreasing"][Math.floor(Math.random() * 3)],
  }

  return mockData
}

// Post Time Suggestions
function getPostTimeSuggestions(): any {
  // This is a mock function. In a real-world scenario, you'd use actual user data and analytics.
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const engagementLevels = ["High", "Medium", "Very High"]

  return days
    .map((day) => ({
      day,
      time: `${Math.floor(Math.random() * 12 + 1)}:00 ${Math.random() > 0.5 ? "AM" : "PM"}`,
      engagement: engagementLevels[Math.floor(Math.random() * engagementLevels.length)],
    }))
    .slice(0, 4) // Return 4 random suggestions
}

// Main handler
export async function POST(req: Request) {
  try {
    const { action, prompt, topic, hashtag } = await req.json()

    switch (action) {
      case "generateCaption":
        const caption = await generateCaption(prompt)
        return NextResponse.json({ caption })

      case "generateContentSuggestions":
        const suggestions = await generateContentSuggestions(topic)
        return NextResponse.json({ suggestions })

      case "analyzeHashtag":
        const analysis = await analyzeHashtags(hashtag)
        return NextResponse.json(analysis)

      case "getPostTimeSuggestions":
        const timeSuggestions = getPostTimeSuggestions()
        return NextResponse.json({ timeSuggestions })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in content generation:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}

