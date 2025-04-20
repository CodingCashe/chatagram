"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Image, Video, FileImage, Eye } from "lucide-react"
import { getUpcomingContent } from "../actions"
import { useRouter } from "next/navigation"

type ScheduledContent = {
  id: string
  caption: string
  mediaType: string
  thumbnailUrl: string
  scheduledDate: string
  status: string
  userName: string
}

interface UpcomingContentProps {
  initialContent: ScheduledContent[]
}

export function UpcomingContent({ initialContent }: UpcomingContentProps) {
  const [content, setContent] = useState<ScheduledContent[]>(initialContent)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const refreshContent = async () => {
    try {
      setLoading(true)
      const data = await getUpcomingContent(3)
      setContent(data)
    } catch (error) {
      console.error("Error fetching upcoming content:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const getTimeUntil = (dateString: string) => {
    const now = new Date()
    const scheduledDate = new Date(dateString)
    const diffMs = scheduledDate.getTime() - now.getTime()

    if (diffMs < 0) return "Overdue"

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHours < 24) {
      return `${diffHours}h ${diffMinutes}m`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays}d ${diffHours % 24}h`
    }
  }

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "IMAGE":
        return <Image className="h-4 w-4 text-blue-500" />
      case "VIDEO":
        return <Video className="h-4 w-4 text-red-500" />
      case "CAROUSEL_ALBUM":
        return <FileImage className="h-4 w-4 text-green-500" />
      default:
        return <Image className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Content</CardTitle>
            <CardDescription>Next scheduled posts</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refreshContent} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {content.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No upcoming content scheduled</div>
        ) : (
          <div className="space-y-4">
            {content.map((item) => (
              <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  {getMediaIcon(item.mediaType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {item.mediaType === "IMAGE" && "Image"}
                      {item.mediaType === "VIDEO" && "Video"}
                      {item.mediaType === "CAROUSEL_ALBUM" && "Carousel"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium truncate">{item.caption}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(item.scheduledDate)}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {getTimeUntil(item.scheduledDate)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => router.push(`/admin/scheduled-content/${item.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2"
              onClick={() => router.push("/admin/scheduled-content")}
            >
              View all scheduled content
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

