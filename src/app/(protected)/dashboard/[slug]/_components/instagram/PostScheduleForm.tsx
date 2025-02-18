
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

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"

// interface PostScheduleFormProps {
//   userId: string
// }

// const mediaOptions = [
//   {
//     name: "Cat",
//     url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
//   {
//     name: "Fancy",
//     url: "https://picsum.photos/1080/1080?random=1",
//   },
//   {
//     name: "Dog",
//     url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
//   {
//     name: "Landscape",
//     url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
//   {
//     name: "Food",
//     url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
//   },
// ]

// export default function PostScheduleForm({ userId }: PostScheduleFormProps) {
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [isScheduled, setIsScheduled] = useState(false)
//   const [selectedMedia, setSelectedMedia] = useState<string[]>([])
//   const [caption, setCaption] = useState("")
//   const [scheduledDate, setScheduledDate] = useState("")
//   const [mediaType, setMediaType] = useState<"IMAGE" | "CAROUSEL" | "REELS" | "STORIES">("IMAGE")

//   useEffect(() => {
//     if (selectedMedia.length > 1) {
//       setMediaType("CAROUSEL")
//     } else {
//       setMediaType("IMAGE")
//     }
//   }, [selectedMedia])

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setLoading(true)
//     setMessage("")

//     try {
//       let response
//       const postData = {
//         userId,
//         caption,
//         mediaUrls: selectedMedia,
//         mediaType,
//         ...(isScheduled && { scheduledDate }),
//       }

//       if (isScheduled) {
//         response = await fetch("/api/schedule-post", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(postData),
//         })
//       } else {
//         response = await fetch("/api/post-to-instagram", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(postData),
//         })
//       }

//       const data = await response.json()

//       if (response.ok) {
//         setMessage(isScheduled ? "Post scheduled successfully!" : "Post successfully published to Instagram!")
//       } else {
//         setMessage(`Error: ${data.error || (isScheduled ? "Failed to schedule post" : "Failed to post to Instagram")}`)
//       }
//     } catch (error) {
//       setMessage("An error occurred while trying to process your request.")
//       console.error("Error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="mediaType">Media Type</Label>
//         <Select
//           value={mediaType}
//           onValueChange={(value: "IMAGE" | "CAROUSEL" | "REELS" | "STORIES") => setMediaType(value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select media type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="IMAGE">Single Image</SelectItem>
//             <SelectItem value="CAROUSEL">Carousel</SelectItem>
//             <SelectItem value="REELS">Reels</SelectItem>
//             <SelectItem value="STORIES">Stories</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div>
//         <Label>Select Media</Label>
//         <div className="grid grid-cols-2 gap-4">
//           {mediaOptions.map((option) => (
//             <div key={option.name} className="flex items-center space-x-2">
//               <Checkbox
//                 id={option.name}
//                 checked={selectedMedia.includes(option.url)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     setSelectedMedia([...selectedMedia, option.url])
//                   } else {
//                     setSelectedMedia(selectedMedia.filter((url) => url !== option.url))
//                   }
//                 }}
//               />
//               <Label htmlFor={option.name}>{option.name}</Label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedMedia.length > 0 && (
//         <div>
//           <Label>Preview</Label>
//           <div className="flex space-x-2 overflow-x-auto">
//             {selectedMedia.map((url, index) => (
//               <Image
//                 key={index}
//                 src={url || "/placeholder.svg"}
//                 alt={`Selected media ${index + 1}`}
//                 width={100}
//                 height={100}
//                 className="object-cover"
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       <div>
//         <Label htmlFor="caption">Caption</Label>
//         <Textarea
//           id="caption"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           rows={3}
//           className="mt-1 block w-full"
//           required
//         />
//       </div>

//       <div className="flex items-center space-x-2">
//         <Checkbox
//           id="isScheduled"
//           checked={isScheduled}
//           onCheckedChange={(checked) => setIsScheduled(checked === true)}
//         />
//         <Label htmlFor="isScheduled">Schedule post?</Label>
//       </div>

//       {isScheduled && (
//         <div>
//           <Label htmlFor="scheduledDate">Schedule Date and Time</Label>
//           <Input
//             type="datetime-local"
//             id="scheduledDate"
//             value={scheduledDate}
//             onChange={(e) => setScheduledDate(e.target.value)}
//             className="mt-1 block w-full"
//             required={isScheduled}
//           />
//         </div>
//       )}

//       <Button type="submit" disabled={loading || selectedMedia.length === 0}>
//         {loading ? "Processing..." : isScheduled ? "Schedule Post" : "Post to Instagram"}
//       </Button>

//       {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
//     </form>
//   )
// }

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Loader2 } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// interface PostScheduleFormProps {
//   userId: string
//   selectedMedia: Array<{ type: string; name: string; url: string }>
//   onMediaClear: () => void
// }

// export default function PostScheduleForm({ userId, selectedMedia, onMediaClear }: PostScheduleFormProps) {
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [isScheduled, setIsScheduled] = useState(false)
//   const [caption, setCaption] = useState("")
//   const [scheduledDate, setScheduledDate] = useState("")
//   const [mediaType, setMediaType] = useState<"IMAGE" | "CAROUSEL" | "REELS" | "STORIES">("IMAGE")

//   useEffect(() => {
//     if (selectedMedia.length > 1) {
//       setMediaType("CAROUSEL")
//     } else if (selectedMedia.length === 1) {
//       setMediaType(selectedMedia[0].type === "video" ? "REELS" : "IMAGE")
//     }
//   }, [selectedMedia])

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setLoading(true)
//     setMessage("")

//     try {
//       let response
//       const postData = {
//         userId,
//         caption,
//         mediaUrls: selectedMedia.map((media) => media.url),
//         mediaType,
//         ...(isScheduled && { scheduledDate }),
//       }

//       if (isScheduled) {
//         response = await fetch("/api/schedule-post", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(postData),
//         })
//       } else {
//         response = await fetch("/api/post-to-instagram", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(postData),
//         })
//       }

//       const data = await response.json()

//       if (response.ok) {
//         setMessage(isScheduled ? "Post scheduled successfully!" : "Post successfully published to Instagram!")
//         onMediaClear()
//         setCaption("")
//         setScheduledDate("")
//       } else {
//         setMessage(`Error: ${data.error || (isScheduled ? "Failed to schedule post" : "Failed to post to Instagram")}`)
//       }
//     } catch (error) {
//       setMessage("An error occurred while trying to process your request.")
//       console.error("Error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="mediaType">Media Type</Label>
//         <Select
//           value={mediaType}
//           onValueChange={(value: "IMAGE" | "CAROUSEL" | "REELS" | "STORIES") => setMediaType(value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select media type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="IMAGE">Single Image</SelectItem>
//             <SelectItem value="CAROUSEL">Carousel</SelectItem>
//             <SelectItem value="REELS">Reels</SelectItem>
//             <SelectItem value="STORIES">Stories</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {selectedMedia.length > 0 && (
//         <div>
//           <Label>Selected Media</Label>
//           <div className="flex space-x-2 overflow-x-auto">
//             <AnimatePresence>
//               {selectedMedia.map((media, index) => (
//                 <motion.div
//                   key={media.url}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="relative"
//                 >
//                   {media.type === "image" ? (
//                     <Image
//                       src={media.url || "/placeholder.svg"}
//                       alt={`Selected media ${index + 1}`}
//                       width={100}
//                       height={100}
//                       className="object-cover rounded-md"
//                     />
//                   ) : (
//                     <video
//                       src={media.url}
//                       className="w-[100px] h-[100px] object-cover rounded-md"
//                       loop
//                       muted
//                       playsInline
//                     />
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       )}

//       <div>
//         <Label htmlFor="caption">Caption</Label>
//         <Textarea
//           id="caption"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           rows={3}
//           className="mt-1 block w-full"
//           required
//         />
//       </div>

//       <div className="flex items-center space-x-2">
//         <Switch id="isScheduled" checked={isScheduled} onCheckedChange={setIsScheduled} />
//         <Label htmlFor="isScheduled">Schedule post?</Label>
//       </div>

//       {isScheduled && (
//         <div>
//           <Label htmlFor="scheduledDate">Schedule Date and Time</Label>
//           <Input
//             type="datetime-local"
//             id="scheduledDate"
//             value={scheduledDate}
//             onChange={(e) => setScheduledDate(e.target.value)}
//             className="mt-1 block w-full"
//             required={isScheduled}
//           />
//         </div>
//       )}

//       <Button type="submit" disabled={loading || selectedMedia.length === 0}>
//         {loading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Processing...
//           </>
//         ) : isScheduled ? (
//           "Schedule Post"
//         ) : (
//           "Post to Instagram"
//         )}
//       </Button>

//       {message && (
//         <motion.p
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`mt-2 text-sm ${message.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
//         >
//           {message}
//         </motion.p>
//       )}
//     </form>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Calendar, Clock, Hash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface PostScheduleFormProps {
  userId: string
  selectedMedia: Array<{ type: string; name: string; url: string }>
  onMediaClear: () => void
}

export default function PostScheduleForm({ userId, selectedMedia, onMediaClear }: PostScheduleFormProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [caption, setCaption] = useState("")
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
  const [scheduledTime, setScheduledTime] = useState("")
  const [mediaType, setMediaType] = useState<"IMAGE" | "CAROUSEL" | "REELS" | "STORIES">("IMAGE")
  const [hashtags, setHashtags] = useState<string[]>([])

  useEffect(() => {
    if (selectedMedia.length > 1) {
      setMediaType("CAROUSEL")
    } else if (selectedMedia.length === 1) {
      setMediaType(selectedMedia[0].type === "video" ? "REELS" : "IMAGE")
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
        caption: `${caption}\n\n${hashtags.map((tag) => `#${tag}`).join(" ")}`,
        mediaUrls: selectedMedia.map((media) => media.url),
        mediaType,
        ...(isScheduled &&
          scheduledDate &&
          scheduledTime && {
            scheduledDate: new Date(`${format(scheduledDate, "yyyy-MM-dd")}T${scheduledTime}`).toISOString(),
          }),
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
        onMediaClear()
        setCaption("")
        setScheduledDate(undefined)
        setScheduledTime("")
        setHashtags([])
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

  const handleAddHashtag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      setHashtags([...hashtags, event.currentTarget.value])
      event.currentTarget.value = ""
    }
  }

  const handleRemoveHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove))
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

      {selectedMedia.length > 0 && (
        <div>
          <Label>Selected Media</Label>
          <div className="flex space-x-2 overflow-x-auto">
            <AnimatePresence>
              {selectedMedia.map((media, index) => (
                <motion.div
                  key={media.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  {media.type === "image" ? (
                    <Image
                      src={media.url || "/placeholder.svg"}
                      alt={`Selected media ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="w-[100px] h-[100px] object-cover rounded-md"
                      loop
                      muted
                      playsInline
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
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

      <div>
        <Label htmlFor="hashtags">Hashtags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {hashtags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm flex items-center"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveHashtag(tag)}
                className="ml-2 text-white hover:text-red-300"
              >
                &times;
              </button>
            </motion.span>
          ))}
        </div>
        <div className="flex items-center">
          <Hash className="text-gray-400 w-5 h-5 mr-2" />
          <Input
            type="text"
            placeholder="Add hashtags (press Enter)"
            onKeyPress={handleAddHashtag}
            className="flex-grow"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isScheduled" checked={isScheduled} onCheckedChange={setIsScheduled} />
        <Label htmlFor="isScheduled">Schedule post?</Label>
      </div>

      {isScheduled && (
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="scheduledDate">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!scheduledDate && "text-muted-foreground"}`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1">
            <Label htmlFor="scheduledTime">Time</Label>
            <div className="flex">
              <Clock className="text-gray-400 w-5 h-5 mr-2 self-center" />
              <Input
                type="time"
                id="scheduledTime"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="flex-grow"
                required={isScheduled}
              />
            </div>
          </div>
        </div>
      )}

      <Button type="submit" disabled={loading || selectedMedia.length === 0}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : isScheduled ? (
          "Schedule Post"
        ) : (
          "Post to Instagram"
        )}
      </Button>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${message.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </motion.p>
      )}
    </form>
  )
}

