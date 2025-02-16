"use client"

import { useEffect, useState } from "react"
import { getScheduledPosts, type ScheduledPost } from "@/actions/schedule/schedule-post"

interface ScheduledPostsProps {
  userId: string
}

export default function ScheduledPosts({ userId }: ScheduledPostsProps) {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPosts() {
      const result = await getScheduledPosts(userId)
      if (result.success && result.data) {
        setPosts(result.data)
      } else {
        setError(result.error || "Failed to fetch scheduled posts")
      }
      setLoading(false)
    }

    fetchPosts()
  }, [userId])

  if (loading) return <p>Loading scheduled posts...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Scheduled Posts</h2>
      {posts.length === 0 ? (
        <p>No scheduled posts found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="py-4">
              <div className="flex space-x-3">
                <img src={post.thumbnailUrl || post.mediaUrl} alt="" className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{post.caption.substring(0, 50)}...</h3>
                    <p className="text-sm text-gray-500">{new Date(post.scheduledDate).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-500">Status: {post.status}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

