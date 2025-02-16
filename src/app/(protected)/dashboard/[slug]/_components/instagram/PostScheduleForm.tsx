
//WWWWOOOORRRKKKIIINNNGGGIIII
// "use client"

// import type React from "react"

// import { useState } from "react"

// interface PostScheduleFormProps {
//   userId: string
// }

// export default function PostScheduleForm({ userId }: PostScheduleFormProps) {
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setLoading(true)
//     setMessage("")

//     const formData = new FormData(event.currentTarget)
//     const caption = formData.get("caption") as string
//     const mediaUrl = formData.get("mediaUrl") as string

//     try {
//       const response = await fetch("/api/post-to-instagram", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           caption,
//           mediaUrl,
//         }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMessage("Post successfully published to Instagram!")
//       } else {
//         setMessage(`Error: ${data.error || "Failed to post to Instagram"}`)
//       }
//     } catch (error) {
//       setMessage("An error occurred while trying to post.")
//       console.error("Error posting to Instagram:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
//           Caption
//         </label>
//         <textarea
//           id="caption"
//           name="caption"
//           rows={3}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">
//           Media URL
//         </label>
//         <input
//           type="url"
//           id="mediaUrl"
//           name="mediaUrl"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//           placeholder="https://example.com/image.jpg"
//         />
//       </div>
//       <button
//         type="submit"
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         disabled={loading}
//       >
//         {loading ? "Posting..." : "Post to Instagram"}
//       </button>
//       {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
//     </form>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface PostScheduleFormProps {
  userId: string
}

const mediaOptions = [
  {
    name: "Cat",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
  },
  {
    name: "Dog",
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
  },
  {
    name: "Landscape",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
  },
  {
    name: "Food",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
  },
]

export default function PostScheduleForm({ userId }: PostScheduleFormProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])
  const [caption, setCaption] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [mediaType, setMediaType] = useState<"IMAGE" | "CAROUSEL" | "REELS" | "STORIES">("IMAGE")

  useEffect(() => {
    if (selectedMedia.length > 1) {
      setMediaType("CAROUSEL")
    } else {
      setMediaType("IMAGE")
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
        mediaUrls: selectedMedia,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="mediaType">Media Type</Label>
        <Select
          value={mediaType}
          onValueChange={(value: "IMAGE" | "CAROUSEL" | "REELS" | "STORIES") => setMediaType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select media type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IMAGE">Single Image</SelectItem>
            <SelectItem value="CAROUSEL">Carousel</SelectItem>
            <SelectItem value="REELS">Reels</SelectItem>
            <SelectItem value="STORIES">Stories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Select Media</Label>
        <div className="grid grid-cols-2 gap-4">
          {mediaOptions.map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <Checkbox
                id={option.name}
                checked={selectedMedia.includes(option.url)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedMedia([...selectedMedia, option.url])
                  } else {
                    setSelectedMedia(selectedMedia.filter((url) => url !== option.url))
                  }
                }}
              />
              <Label htmlFor={option.name}>{option.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {selectedMedia.length > 0 && (
        <div>
          <Label>Preview</Label>
          <div className="flex space-x-2 overflow-x-auto">
            {selectedMedia.map((url, index) => (
              <Image
                key={index}
                src={url || "/placeholder.svg"}
                alt={`Selected media ${index + 1}`}
                width={100}
                height={100}
                className="object-cover"
              />
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
        <Checkbox
          id="isScheduled"
          checked={isScheduled}
          onCheckedChange={(checked) => setIsScheduled(checked === true)}
        />
        <Label htmlFor="isScheduled">Schedule post?</Label>
      </div>

      {isScheduled && (
        <div>
          <Label htmlFor="scheduledDate">Schedule Date and Time</Label>
          <Input
            type="datetime-local"
            id="scheduledDate"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="mt-1 block w-full"
            required={isScheduled}
          />
        </div>
      )}

      <Button type="submit" disabled={loading || selectedMedia.length === 0}>
        {loading ? "Processing..." : isScheduled ? "Schedule Post" : "Post to Instagram"}
      </Button>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  )
}

