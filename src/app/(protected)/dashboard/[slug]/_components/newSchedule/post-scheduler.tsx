// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Calendar } from "@/components/ui/calendar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ImagePlus, Loader2, X } from "lucide-react"
// import { uploadMedia } from "@/lib/storage"
// import { schedulePost } from "@/actions/schedule/schedule-post"
// import Image from "next/image"

// interface PostSchedulerProps {
//   userId: string
// }

// export function PostScheduler({ userId }: PostSchedulerProps) {
//   const [files, setFiles] = useState<File[]>([])
//   const [previews, setPreviews] = useState<string[]>([])
//   const [loading, setLoading] = useState(false)
//   const [mediaType, setMediaType] = useState("IMAGE")
//   const [date, setDate] = useState<Date>()
//   const [caption, setCaption] = useState("")

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || [])
//     setFiles((prev) => [...prev, ...selectedFiles])

//     // Create preview URLs
//     selectedFiles.forEach((file) => {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviews((prev) => [...prev, reader.result as string])
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index))
//     setPreviews((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!date || !files.length || !caption) return

//     setLoading(true)
//     try {
//       // Upload all media files
//       const uploadPromises = files.map((file) => uploadMedia(file))
//       const uploads = await Promise.all(uploadPromises)

//       if (uploads.some((upload) => !upload.success)) {
//         throw new Error("Failed to upload some media files")
//       }

//       // Filter out any undefined URLs and ensure we have valid URLs
//       const mediaUrls = uploads.map((upload) => upload.url).filter((url): url is string => typeof url === "string")

//       if (mediaUrls.length === 0) {
//         throw new Error("No valid media URLs obtained")
//       }

//       // Create form data for server action
//       const formData = new FormData()
//       formData.append("caption", caption)
//       formData.append("mediaType", mediaType)
//       formData.append("mediaUrl", mediaUrls[0])
//       formData.append("thumbnailUrl", mediaUrls[0])
//       formData.append("scheduledDate", date.toISOString())
//       formData.append("userId", userId)

//       const result = await schedulePost(formData)

//       if (result.success) {
//         // Reset form
//         setFiles([])
//         setPreviews([])
//         setCaption("")
//         setDate(undefined)
//       }
//     } catch (error) {
//       console.error("Error scheduling post:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
//       <div className="space-y-2">
//         <h2 className="text-2xl font-bold">Schedule Instagram Post</h2>
//         <p className="text-muted-foreground">Upload media and schedule your post for later</p>
//       </div>

//       <div className="space-y-4">
//         <Select value={mediaType} onValueChange={setMediaType}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select post type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="IMAGE">Single Image</SelectItem>
//             <SelectItem value="CAROUSEL">Carousel</SelectItem>
//             <SelectItem value="VIDEO">Video</SelectItem>
//             <SelectItem value="REELS">Reels</SelectItem>
//             <SelectItem value="STORY">Story</SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="grid gap-4">
//           <div className="flex flex-wrap gap-4">
//             {previews.map((preview, index) => (
//               <div key={index} className="relative">
//                 <Image
//                   src={preview || "/placeholder.svg"}
//                   alt={`Preview ${index + 1}`}
//                   width={200}
//                   height={200}
//                   className="rounded-lg object-cover"
//                 />
//                 <Button
//                   type="button"
//                   variant="destructive"
//                   size="icon"
//                   className="absolute top-2 right-2"
//                   onClick={() => removeFile(index)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center justify-center w-full">
//             <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <ImagePlus className="w-8 h-8 mb-4 text-muted-foreground" />
//                 <p className="mb-2 text-sm text-muted-foreground">
//                   <span className="font-semibold">Click to upload</span> or drag and drop
//                 </p>
//               </div>
//               <Input
//                 type="file"
//                 className="hidden"
//                 accept={mediaType === "VIDEO" || mediaType === "REELS" ? "video/*" : "image/*"}
//                 multiple={mediaType === "CAROUSEL"}
//                 onChange={handleFileChange}
//               />
//             </label>
//           </div>
//         </div>

//         <Textarea
//           placeholder="Write your caption..."
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           className="min-h-[100px]"
//         />

//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           className="rounded-md border"
//           disabled={(date) => date < new Date()}
//         />

//         <Button type="submit" disabled={loading || !date || !files.length || !caption} className="w-full">
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Scheduling...
//             </>
//           ) : (
//             "Schedule Post"
//           )}
//         </Button>
//       </div>
//     </form>
//   )
// }

"use client"

import type React from "react"

import { useRef, useState, useTransition } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePlus, Loader2, X } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface PostSchedulerProps {
  userId: string
}

export function PostScheduler({ userId }: PostSchedulerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [mediaType, setMediaType] = useState("IMAGE")
  const [date, setDate] = useState<Date>()
  const [caption, setCaption] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])

    // Check file size (4.5MB limit)
    const MAX_SIZE = 4.5 * 1024 * 1024 // 4.5MB in bytes
    const isTooBig = selectedFiles.some((file) => file.size > MAX_SIZE)

    if (isTooBig) {
      toast.error("File size must be less than 4.5MB")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      return
    }

    // Create preview URLs
    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetForm = () => {
    setPreviews([])
    setCaption("")
    setDate(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !fileInputRef.current?.files?.length || !caption) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("caption", caption)
      formData.append("mediaType", mediaType)
      formData.append("scheduledDate", date.toISOString())
      formData.append("userId", userId)
      formData.append("media", fileInputRef.current.files[0])

      const response = await fetch("/api/schedule-post", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to schedule post")
      }

      toast.success("Post scheduled successfully")
      resetForm()

      // Refresh the scheduled posts list
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error("Error scheduling post:", error)
      toast.error(error instanceof Error ? error.message : "Failed to schedule post")
    } finally {
      setLoading(false)
    }
  }

  const isSubmitting = loading || isPending

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Schedule Instagram Post</h2>
        <p className="text-muted-foreground">Upload media and schedule your post for later</p>
      </div>

      <div className="space-y-4">
        <Select value={mediaType} onValueChange={setMediaType} name="mediaType">
          <SelectTrigger>
            <SelectValue placeholder="Select post type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IMAGE">Single Image</SelectItem>
            <SelectItem value="CAROUSEL">Carousel</SelectItem>
            <SelectItem value="VIDEO">Video</SelectItem>
            <SelectItem value="REELS">Reels</SelectItem>
            <SelectItem value="STORY">Story</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid gap-4">
          <div className="flex flex-wrap gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removePreview(index)}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">Maximum file size: 4.5MB</p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                name="media"
                className="hidden"
                accept={mediaType === "VIDEO" || mediaType === "REELS" ? "video/*" : "image/*"}
                multiple={mediaType === "CAROUSEL"}
                onChange={handleFileChange}
                disabled={isSubmitting}
                required
              />
            </label>
          </div>
        </div>

        <Textarea
          placeholder="Write your caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="min-h-[100px]"
          disabled={isSubmitting}
          required
        />

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => date < new Date() || isSubmitting}
        />

        <Button type="submit" disabled={isSubmitting || !date || previews.length === 0 || !caption} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scheduling...
            </>
          ) : (
            "Schedule Post"
          )}
        </Button>
      </div>
    </form>
  )
}

