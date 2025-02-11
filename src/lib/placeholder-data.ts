import { v4 as uuidv4 } from "uuid"

export function generatePlaceholderPosts(count = 10) {
  const posts = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const scheduledDate = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
    posts.push({
      id: uuidv4(),
      caption: `Placeholder post #${i + 1}`,
      media_type: Math.random() > 0.5 ? "IMAGE" : "VIDEO",
      media_url: `https://placekitten.com/500/500?image=${i}`,
      thumbnail_url: `https://placekitten.com/500/500?image=${i}`,
      permalink: `https://www.instagram.com/p/${uuidv4()}`,
      timestamp: scheduledDate.toISOString(),
      username: "placeholder_user",
    })
  }

  return posts
}

