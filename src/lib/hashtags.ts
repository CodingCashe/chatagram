export function generateHashtags(topic: string): string[] {
  // TODO: Implement more sophisticated hashtag generation
  const baseHashtags = ["instagram", "socialmedia", "content"]
  const topicHashtags = topic
    .toLowerCase()
    .split(" ")
    .map((word) => `#${word}`)
  return [...baseHashtags, ...topicHashtags]
}

