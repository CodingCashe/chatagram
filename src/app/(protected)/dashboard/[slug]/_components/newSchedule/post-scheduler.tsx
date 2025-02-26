// "use client"

// import type React from "react"

// import { useRef, useState, useTransition } from "react"
// import { Calendar } from "@/components/ui/calendar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { ImagePlus, Loader2, X, Camera, Video, Images, Instagram } from "lucide-react"
// import Image from "next/image"
// import { toast } from "sonner"
// import { useRouter } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import { cn } from "@/lib/utils"
// import { validateMediaForInstagram, validateCarouselMedia } from "@/lib/validate-media"

// interface PostSchedulerProps {
//   userId: string
// }

// const postTypes = [
//   { value: "IMAGE", label: "Single Image", icon: Camera },
//   { value: "CAROUSEL", label: "Carousel", icon: Images },
//   { value: "VIDEO", label: "Video", icon: Video },
//   { value: "REELS", label: "Reels", icon: Instagram },
// ]

// export function PostScheduler({ userId }: PostSchedulerProps) {
//   const router = useRouter()
//   const [isPending, startTransition] = useTransition()
//   const [previews, setPreviews] = useState<string[]>([])
//   const [loading, setLoading] = useState(false)
//   const [mediaType, setMediaType] = useState("IMAGE")
//   const [date, setDate] = useState<Date>()
//   const [caption, setCaption] = useState("")
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const formRef = useRef<HTMLFormElement>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || [])

//     // Validate files based on Instagram requirements
//     if (mediaType === "CAROUSEL") {
//       const result = validateCarouselMedia(selectedFiles)
//       if (!result.isValid) {
//         toast.error(result.error)
//         if (fileInputRef.current) {
//           fileInputRef.current.value = ""
//         }
//         return
//       }
//     } else {
//       const result = validateMediaForInstagram(selectedFiles[0])
//       if (!result.isValid) {
//         toast.error(result.error)
//         if (fileInputRef.current) {
//           fileInputRef.current.value = ""
//         }
//         return
//       }
//     }

//     // Create preview URLs
//     selectedFiles.forEach((file) => {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviews((prev) => [...prev, reader.result as string])
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const removePreview = (index: number) => {
//     setPreviews((prev) => prev.filter((_, i) => i !== index))
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const resetForm = () => {
//     setPreviews([])
//     setCaption("")
//     setDate(undefined)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//     if (formRef.current) {
//       formRef.current.reset()
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!date || !fileInputRef.current?.files?.length || !caption) {
//       toast.error("Please fill in all required fields")
//       return
//     }

//     setLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append("caption", caption)
//       formData.append("mediaType", mediaType)
//       formData.append("scheduledDate", date.toISOString())
//       formData.append("userId", userId)
//       formData.append("media", fileInputRef.current.files[0])

//       const response = await fetch("/api/schedule-post", {
//         method: "POST",
//         body: formData,
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to schedule post")
//       }

//       toast.success("Post scheduled successfully")
//       resetForm()

//       // Refresh the scheduled posts list
//       startTransition(() => {
//         router.refresh()
//       })
//     } catch (error) {
//       console.error("Error scheduling post:", error)
//       toast.error(error instanceof Error ? error.message : "Failed to schedule post")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const isSubmitting = loading || isPending

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
//       <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl blur-3xl" />
//       <div className="relative backdrop-blur-sm bg-white/50 dark:bg-black/20 rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500" />

//         <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6">
//           <div className="space-y-1 sm:space-y-2">
//             <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
//               Create New Post
//             </h2>
//             <p className="text-sm text-muted-foreground">Design your perfect Instagram post</p>
//           </div>

//           <div className="space-y-4">
//             <div className="grid gap-3 sm:gap-4 p-3 sm:p-4 bg-white/40 dark:bg-black/40 rounded-lg sm:rounded-xl backdrop-blur-sm">
//               <label className="text-sm font-medium">Post Type</label>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                 {postTypes.map(({ value, label, icon: Icon }) => (
//                   <button
//                     key={value}
//                     type="button"
//                     onClick={() => setMediaType(value)}
//                     className={cn(
//                       "flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-lg transition-all",
//                       "hover:bg-white/60 dark:hover:bg-white/10",
//                       "active:scale-95 touch-none",
//                       mediaType === value
//                         ? "bg-white/60 dark:bg-white/10 ring-2 ring-purple-500"
//                         : "bg-white/30 dark:bg-white/5",
//                     )}
//                   >
//                     <Icon
//                       className={cn(
//                         "w-5 h-5 sm:w-6 sm:h-6 transition-colors",
//                         mediaType === value ? "text-purple-500" : "text-muted-foreground",
//                       )}
//                     />
//                     <span className="text-xs font-medium">{label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid gap-4">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={previews.length}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
//                 >
//                   {previews.map((preview, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.8 }}
//                       className="relative group touch-none aspect-square"
//                     >
//                       <div className="absolute inset-0 rounded-lg overflow-hidden">
//                         <Image
//                           src={preview || "/placeholder.svg"}
//                           alt={`Preview ${index + 1}`}
//                           fill
//                           className="object-cover hover:scale-105 transition-transform duration-300"
//                           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                         />
//                       </div>
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         className="absolute -top-2 -right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
//                         onClick={() => removePreview(index)}
//                         disabled={isSubmitting}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </AnimatePresence>

//               <div className="flex items-center justify-center w-full">
//                 <label
//                   className={cn(
//                     "flex flex-col items-center justify-center w-full h-48 sm:h-64 rounded-lg sm:rounded-xl cursor-pointer",
//                     "border-2 border-dashed border-purple-500/30",
//                     "transition-all duration-300",
//                     "active:scale-98 touch-none",
//                     "hover:border-purple-500/70 hover:bg-purple-500/5",
//                     isSubmitting && "opacity-50 cursor-not-allowed",
//                   )}
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="flex flex-col items-center justify-center px-4 text-center"
//                   >
//                     <ImagePlus className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-purple-500" />
//                     <p className="mb-2 text-sm text-muted-foreground">
//                       <span className="font-semibold">Tap to upload</span> or drag and drop
//                     </p>
//                     <p className="text-xs text-muted-foreground">Maximum file size: 4.5MB</p>
//                   </motion.div>
//                   <Input
//                     ref={fileInputRef}
//                     type="file"
//                     name="media"
//                     className="hidden"
//                     accept={mediaType === "VIDEO" || mediaType === "REELS" ? "video/*" : "image/*"}
//                     multiple={mediaType === "CAROUSEL"}
//                     onChange={handleFileChange}
//                     disabled={isSubmitting}
//                     required
//                   />
//                 </label>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Caption</label>
//               <Textarea
//                 placeholder="Write an engaging caption..."
//                 value={caption}
//                 onChange={(e) => setCaption(e.target.value)}
//                 className="min-h-[100px] bg-white/40 dark:bg-black/40 backdrop-blur-sm border-purple-500/30 focus:border-purple-500 text-sm sm:text-base"
//                 disabled={isSubmitting}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Schedule Date</label>
//               <div className="p-3 sm:p-4 bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-lg sm:rounded-xl">
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={setDate}
//                   className="rounded-md mx-auto"
//                   disabled={(date) => date < new Date() || isSubmitting}
//                   classNames={{
//                     day_selected: "bg-purple-500 text-white hover:bg-purple-400",
//                     day_today: "bg-purple-100 text-purple-900",
//                     cell: "h-9 w-9 sm:h-10 sm:w-10 p-0 text-sm sm:text-base",
//                     day: "h-9 w-9 sm:h-10 sm:w-10 p-0 font-normal",
//                     nav_button: "h-9 w-9 sm:h-10 sm:w-10",
//                   }}
//                 />
//               </div>
//             </div>

//             <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
//               <Button
//                 type="submit"
//                 disabled={isSubmitting || !date || previews.length === 0 || !caption}
//                 className="w-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 text-white hover:opacity-90 h-12 text-base sm:text-lg font-medium"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Scheduling...
//                   </>
//                 ) : (
//                   "Schedule Post"
//                 )}
//               </Button>
//             </motion.div>
//           </div>
//         </form>
//       </div>
//     </motion.div>
//   )
// }

// "use client"

// import type React from "react"
// import { useRef, useState, useTransition } from "react"
// import { Calendar } from "@/components/ui/calendar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { ImagePlus, Loader2, X, Camera, Video, Images, Instagram } from "lucide-react"
// import Image from "next/image"
// import { toast } from "sonner"
// import { useRouter } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import { cn } from "@/lib/utils"
// import { validateMediaForInstagram, validateCarouselMedia } from "@/lib/validate-media"

// interface PostSchedulerProps {
//   userId: string
// }

// const postTypes = [
//   { value: "IMAGE", label: "Single Image", icon: Camera },
//   { value: "CAROUSEL", label: "Carousel", icon: Images },
//   { value: "VIDEO", label: "Video", icon: Video },
//   { value: "REELS", label: "Reels", icon: Instagram },
// ]

// export function PostScheduler({ userId }: PostSchedulerProps) {
//   const router = useRouter()
//   const [isPending, startTransition] = useTransition()
//   const [previews, setPreviews] = useState<string[]>([])
//   const [loading, setLoading] = useState(false)
//   const [mediaType, setMediaType] = useState("IMAGE")
//   const [date, setDate] = useState<Date>()
//   const [caption, setCaption] = useState("")
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const formRef = useRef<HTMLFormElement>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || [])

//     // Validate files based on Instagram requirements
//     if (mediaType === "CAROUSEL") {
//       const result = validateCarouselMedia(selectedFiles)
//       if (!result.isValid) {
//         toast.error(result.error)
//         if (fileInputRef.current) {
//           fileInputRef.current.value = ""
//         }
//         return
//       }
//     } else {
//       const result = validateMediaForInstagram(selectedFiles[0])
//       if (!result.isValid) {
//         toast.error(result.error)
//         if (fileInputRef.current) {
//           fileInputRef.current.value = ""
//         }
//         return
//       }
//     }

//     // Create preview URLs
//     selectedFiles.forEach((file) => {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviews((prev) => [...prev, reader.result as string])
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const removePreview = (index: number) => {
//     setPreviews((prev) => prev.filter((_, i) => i !== index))
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const resetForm = () => {
//     setPreviews([])
//     setCaption("")
//     setDate(undefined)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//     if (formRef.current) {
//       formRef.current.reset()
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!date || !fileInputRef.current?.files?.length || !caption) {
//       toast.error("Please fill in all required fields")
//       return
//     }

//     setLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append("caption", caption)
//       formData.append("mediaType", mediaType)
//       formData.append("scheduledDate", date.toISOString())
//       formData.append("userId", userId)
//       formData.append("media", fileInputRef.current.files[0])

//       const response = await fetch("/api/schedule-post", {
//         method: "POST",
//         body: formData,
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to schedule post")
//       }

//       toast.success("Post scheduled successfully")
//       resetForm()

//       // Refresh the scheduled posts list
//       startTransition(() => {
//         router.refresh()
//       })
//     } catch (error) {
//       console.error("Error scheduling post:", error)
//       toast.error(error instanceof Error ? error.message : "Failed to schedule post")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const isSubmitting = loading || isPending

//   return (
//     <div className="relative">
//       <div className="relative bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
//         <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 p-4">
//           <div className="space-y-1">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-200">Create New Post</h2>
//             <p className="text-sm text-gray-400">Design your perfect Instagram post</p>
//           </div>

//           <div className="space-y-4">
//             <div className="grid gap-3 p-3 bg-gray-800/50 rounded-lg">
//               <label className="text-sm font-medium text-gray-300">Post Type</label>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                 {postTypes.map(({ value, label, icon: Icon }) => (
//                   <button
//                     key={value}
//                     type="button"
//                     onClick={() => setMediaType(value)}
//                     className={cn(
//                       "flex flex-col items-center gap-2 p-3 rounded-lg transition-all",
//                       "hover:bg-gray-700/50",
//                       "active:scale-95",
//                       mediaType === value ? "bg-gray-700 ring-2 ring-gray-600" : "bg-gray-800/50",
//                     )}
//                   >
//                     <Icon
//                       className={cn("w-5 h-5 sm:w-6 sm:h-6", mediaType === value ? "text-gray-200" : "text-gray-400")}
//                     />
//                     <span className="text-xs font-medium text-gray-300">{label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid gap-4">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={previews.length}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
//                 >
//                   {previews.map((preview, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.8 }}
//                       className="relative group touch-none aspect-square"
//                     >
//                       <div className="absolute inset-0 rounded-lg overflow-hidden">
//                         <Image
//                           src={preview || "/placeholder.svg"}
//                           alt={`Preview ${index + 1}`}
//                           fill
//                           className="object-cover hover:scale-105 transition-transform duration-300"
//                           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                         />
//                       </div>
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         className="absolute -top-2 -right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
//                         onClick={() => removePreview(index)}
//                         disabled={isSubmitting}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </AnimatePresence>

//               <div className="flex items-center justify-center w-full">
//                 <label
//                   className={cn(
//                     "flex flex-col items-center justify-center w-full h-48 rounded-lg cursor-pointer",
//                     "border-2 border-dashed border-gray-700",
//                     "transition-all duration-300",
//                     "hover:border-gray-600 hover:bg-gray-800/50",
//                     isSubmitting && "opacity-50 cursor-not-allowed",
//                   )}
//                 >
//                   <div className="flex flex-col items-center justify-center px-4 text-center">
//                     <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
//                     <p className="mb-2 text-sm text-gray-400">
//                       <span className="font-semibold">Tap to upload</span> or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-500">Maximum file size: 4.5MB</p>
//                   </div>
//                   <Input
//                     ref={fileInputRef}
//                     type="file"
//                     name="media"
//                     className="hidden"
//                     accept={mediaType === "VIDEO" || mediaType === "REELS" ? "video/*" : "image/*"}
//                     multiple={mediaType === "CAROUSEL"}
//                     onChange={handleFileChange}
//                     disabled={isSubmitting}
//                     required
//                   />
//                 </label>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">Caption</label>
//               <Textarea
//                 placeholder="Write an engaging caption..."
//                 value={caption}
//                 onChange={(e) => setCaption(e.target.value)}
//                 className="min-h-[100px] bg-gray-800/50 border-gray-700 focus:border-gray-600 text-gray-200 placeholder:text-gray-500"
//                 disabled={isSubmitting}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">Schedule Date</label>
//               <div className="p-3 bg-gray-800/50 rounded-lg">
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={setDate}
//                   className="rounded-md mx-auto"
//                   disabled={(date) => date < new Date() || isSubmitting}
//                   classNames={{
//                     day_selected: "bg-gray-600 text-gray-200 hover:bg-gray-500",
//                     day_today: "bg-gray-800 text-gray-200",
//                     cell: "h-9 w-9 text-sm text-gray-400",
//                     day: "h-9 w-9 p-0 font-normal hover:bg-gray-700",
//                     nav_button: "h-9 w-9 hover:bg-gray-700",
//                     nav_button_previous: "text-gray-400",
//                     nav_button_next: "text-gray-400",
//                   }}
//                 />
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={isSubmitting || !date || previews.length === 0 || !caption}
//               className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 h-12 text-base font-medium"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Scheduling...
//                 </>
//               ) : (
//                 "Schedule Post"
//               )}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useRef, useState, useTransition } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Loader2, X, Camera, Video, Images, Instagram } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { validateMediaForInstagram, validateCarouselMedia } from "@/lib/validate-media"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIContentGenerator from "./ai-content-generator"

interface PostSchedulerProps {
  userId: string
}

const postTypes = [
  { value: "IMAGE", label: "Single Image", icon: Camera },
  { value: "CAROUSEL", label: "Carousel", icon: Images },
  { value: "VIDEO", label: "Video", icon: Video },
  { value: "REELS", label: "Reels", icon: Instagram },
]

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

    // Validate files based on Instagram requirements
    if (mediaType === "CAROUSEL") {
      const result = validateCarouselMedia(selectedFiles)
      if (!result.isValid) {
        toast.error(result.error)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        return
      }
    } else {
      const result = validateMediaForInstagram(selectedFiles[0])
      if (!result.isValid) {
        toast.error(result.error)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        return
      }
    }

    // Create preview URLs
    setPreviews([]) // Clear existing previews
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
      // const files = fileInputRef.current.files;
      // if (files) {
      //   for (let i = 0; i < files.length; i++) {
      //     formData.append("media[]", files[i]); // Append all files for carousel
      //   }
      // }

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

  const handleAIContentSelect = async (content: { imageUrl: string; caption: string }) => {
    try {
      // Convert base64 to File object
      const response = await fetch(content.imageUrl)
      const blob = await response.blob()
      const file = new File([blob], "ai-generated-image.png", { type: "image/png" })

      // Create a DataTransfer object to simulate file input
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      // Update file input and trigger change event
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files
        const event = new Event("change", { bubbles: true })
        fileInputRef.current.dispatchEvent(event)
      }

      // Set caption and preview
      setCaption(content.caption)
      setPreviews([content.imageUrl])

      // Switch to upload tab to show preview and complete scheduling
      const uploadTrigger = document.querySelector('[data-value="upload"]') as HTMLButtonElement
      if (uploadTrigger) {
        uploadTrigger.click()
      }
    } catch (error) {
      toast.error("Failed to process AI-generated content")
    }
  }

  const isSubmitting = loading || isPending

  return (
    <div className="relative">
      <div className="relative bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-800">
            <TabsTrigger value="upload" className="data-[state=active]:bg-gray-700 text-gray-200">
              Manual Upload
            </TabsTrigger>
            <TabsTrigger value="generate" className="data-[state=active]:bg-gray-700 text-gray-200">
              AI Generate
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 p-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-200">Create New Post</h2>
                <p className="text-sm text-gray-400">Design your perfect Instagram post</p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <label className="text-sm font-medium text-gray-300">Post Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {postTypes.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setMediaType(value)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-lg transition-all",
                          "hover:bg-gray-700/50",
                          "active:scale-95",
                          mediaType === value ? "bg-gray-700 ring-2 ring-gray-600" : "bg-gray-800/50",
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5 sm:w-6 sm:h-6",
                            mediaType === value ? "text-gray-200" : "text-gray-400",
                          )}
                        />
                        <span className="text-xs font-medium text-gray-300">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={previews.length}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                    >
                      {previews.map((preview, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative group touch-none aspect-square"
                        >
                          <div className="absolute inset-0 rounded-lg overflow-hidden">
                            <Image
                              src={preview || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
                            onClick={() => removePreview(index)}
                            disabled={isSubmitting}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-center w-full">
                    <label
                      className={cn(
                        "flex flex-col items-center justify-center w-full h-48 rounded-lg cursor-pointer",
                        "border-2 border-dashed border-gray-700",
                        "transition-all duration-300",
                        "hover:border-gray-600 hover:bg-gray-800/50",
                        isSubmitting && "opacity-50 cursor-not-allowed",
                      )}
                    >
                      <div className="flex flex-col items-center justify-center px-4 text-center">
                        <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Tap to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">Maximum file size: 4.5MB</p>
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Caption</label>
                  <Textarea
                    placeholder="Write an engaging caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="min-h-[100px] bg-gray-800/50 border-gray-700 focus:border-gray-600 text-gray-200 placeholder:text-gray-500"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Schedule Date</label>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md mx-auto"
                      disabled={(date) => date < new Date() || isSubmitting}
                      classNames={{
                        day_selected: "bg-gray-600 text-gray-200 hover:bg-gray-500",
                        day_today: "bg-gray-800 text-gray-200",
                        cell: "h-9 w-9 text-sm text-gray-400",
                        day: "h-9 w-9 p-0 font-normal hover:bg-gray-700",
                        nav_button: "h-9 w-9 hover:bg-gray-700",
                        nav_button_previous: "text-gray-400",
                        nav_button_next: "text-gray-400",
                      }}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !date || previews.length === 0 || !caption}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 h-12 text-base font-medium"
                >
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
          </TabsContent>

          <TabsContent value="generate" className="p-4">
            <AIContentGenerator userId={userId} onSelect={handleAIContentSelect} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

