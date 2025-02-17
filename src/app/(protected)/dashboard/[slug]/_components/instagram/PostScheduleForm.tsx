"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import MediaSelector from "./MediaSelector"

interface PostScheduleFormProps {
  userId: string
}

interface Media {
  type: "image" | "video"
  url: string
  name: string
}

export default function PostScheduleForm({ userId }: PostScheduleFormProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([])
  const [caption, setCaption] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO" | "CAROUSEL" | "REELS" | "STORIES">("IMAGE")

  useEffect(() => {
    if (selectedMedia.length > 1) {
      setMediaType("CAROUSEL")
    } else if (selectedMedia.length === 1) {
      setMediaType(selectedMedia[0].type.toUpperCase() as "IMAGE" | "VIDEO")
    }
  }, [selectedMedia])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      let response
      const postData = {
        userId,
        caption,
        mediaUrls: selectedMedia.map((media) => media.url),
        mediaType,
        ...(isScheduled && { scheduledDate }),
      }

      if (isScheduled) {
        response = await fetch("/api/schedule-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })
      } else {
        response = await fetch("/api/post-to-instagram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })
      }

      const data = await response.json()

      if (response.ok) {
        setMessage(isScheduled ? "Post scheduled successfully!" : "Post successfully published to Instagram!")
      } else {
        setMessage(`Error: ${data.error || (isScheduled ? "Failed to schedule post" : "Failed to post to Instagram")}`)
      }
    } catch (error) {
      setMessage("An error occurred while trying to process your request.")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mediaType">Media Type</Label>
            <Select
              value={mediaType}
              onValueChange={(value: "IMAGE" | "VIDEO" | "CAROUSEL" | "REELS" | "STORIES") => setMediaType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select media type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IMAGE">Single Image</SelectItem>
                <SelectItem value="VIDEO">Single Video</SelectItem>
                <SelectItem value="CAROUSEL">Carousel</SelectItem>
                <SelectItem value="REELS">Reels</SelectItem>
                <SelectItem value="STORIES">Stories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Select Media</Label>
            <MediaSelector
              onSelect={(media) => setSelectedMedia([...selectedMedia, media])}
              maxItems={mediaType === "CAROUSEL" ? 10 : 1}
            />
          </div>

          {selectedMedia.length > 0 && (
            <div>
              <Label>Selected Media</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedMedia.map((media, index) => (
                  <div key={index} className="relative">
                    {media.type === "image" ? (
                      <Image
                        src={media.url || "/placeholder.svg"}
                        alt={`Selected media ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <video src={media.url} className="w-[100px] h-[100px] object-cover rounded-lg" />
                    )}
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => setSelectedMedia(selectedMedia.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isScheduled"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
              className="rounded text-primary focus:ring-primary"
            />
            <Label htmlFor="isScheduled">Schedule post?</Label>
          </div>

          {isScheduled && (
            <div>
              <Label htmlFor="scheduledDate">Schedule Date and Time</Label>
              <div className="relative">
                <Input
                  type="datetime-local"
                  id="scheduledDate"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="mt-1 block w-full pl-10"
                  required={isScheduled}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          )}

          <Button type="submit" disabled={loading || selectedMedia.length === 0}>
            {loading ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isScheduled ? (
              "Schedule Post"
            ) : (
              "Post to Instagram"
            )}
          </Button>

          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}

