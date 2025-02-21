"use client"

import { useEffect, useState } from "react"
import { getScheduledPosts, type ScheduledPost } from "@/actions/schedule/schedule-post"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

interface ScheduledPostsProps {
  userId: string
}

export function ScheduledPosts({ userId }: ScheduledPostsProps) {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const result = await getScheduledPosts(userId)
      if (result.success && result.data) {
        setPosts(result.data)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [userId])

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(post.scheduledDate).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="text-sm font-medium">{post.mediaType.toLowerCase()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                {post.mediaType === "VIDEO" || post.mediaType === "REELS" ? (
                  <video src={post.mediaUrl} className="object-cover w-full h-full" controls />
                ) : (
                  <Image src={post.mediaUrl || "/placeholder.svg"} alt="Post preview" fill className="object-cover" />
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.caption}</p>
              {post.publishedDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  Published: {new Date(post.publishedDate).toLocaleString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

