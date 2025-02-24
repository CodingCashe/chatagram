// "use client"

// import { useEffect, useState } from "react"
// import { getScheduledPosts, publishPost, type ScheduledPost } from "@/actions/schedule/schedule-post"
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"
// import { Calendar, Clock, Loader2 } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { motion, AnimatePresence } from "framer-motion"
// import { AutoCarousel } from "./auto-carousel"

// interface ScheduledPostsProps {
//   userId: string
// }

// export function ScheduledPosts({ userId }: ScheduledPostsProps) {
//   const [posts, setPosts] = useState<ScheduledPost[]>([])
//   const [loading, setLoading] = useState(true)
//   const [publishingId, setPublishingId] = useState<string | null>(null)
//   const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({})

//   useEffect(() => {
//     async function fetchPosts() {
//       const result = await getScheduledPosts(userId)
//       if (result.success && result.data) {
//         setPosts(result.data)
//         // Initialize carousel positions
//         const slides: Record<string, number> = {}
//         result.data.forEach((post) => {
//           if (post.mediaType === "CAROUSEL") {
//             slides[post.id] = 0
//           }
//         })
//         setCurrentSlides(slides)
//       }
//       setLoading(false)
//     }

//     fetchPosts()
//   }, [userId])

//   const handlePublish = async (postId: string) => {
//     try {
//       setPublishingId(postId)
//       const result = await publishPost(postId)

//       if (result.success) {
//         toast.success("Post published successfully")
//         setPosts(
//           posts.map((post) =>
//             post.id === postId
//               ? {
//                   ...post,
//                   status: "published",
//                   publishedDate: new Date().toISOString(),
//                 }
//               : post,
//           ),
//         )
//       } else {
//         toast.error(result.error || "Failed to publish post")
//       }
//     } catch (error) {
//       toast.error("An error occurred while publishing")
//     } finally {
//       setPublishingId(null)
//     }
//   }

//   const handleSlideChange = (postId: string, direction: "next" | "prev") => {
//     const mediaUrls = posts.find((p) => p.id === postId)?.mediaUrl.split(",") || []
//     setCurrentSlides((prev) => ({
//       ...prev,
//       [postId]:
//         direction === "next"
//           ? (prev[postId] + 1) % mediaUrls.length
//           : (prev[postId] - 1 + mediaUrls.length) % mediaUrls.length,
//     }))
//   }

//   if (loading) {
//     return (
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="h-[400px] rounded-lg bg-muted/50 shimmer" />
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
//       <AnimatePresence>
//         {posts.map((post) => {
//           const mediaUrls = post.mediaUrl.split(",")
//           const isCarousel = mediaUrls.length > 1
//           const currentSlide = currentSlides[post.id] || 0

//           return (
//             <motion.div
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="gradient-border"
//             >
//               <Card className="h-full bg-card/50 backdrop-blur-sm">
//                 <CardHeader className="space-y-1 p-3 sm:p-4">
//                   <div className="flex items-center justify-between gap-2 flex-wrap">
//                     <Badge
//                       variant="outline"
//                       className={cn(
//                         "transition-colors text-xs sm:text-sm whitespace-nowrap",
//                         post.status === "published"
//                           ? "border-green-500 text-green-500"
//                           : "border-blue-500 text-blue-500",
//                       )}
//                     >
//                       {post.status}
//                     </Badge>
//                     <div className="flex items-center text-xs sm:text-sm text-muted-foreground min-w-0 truncate">
//                       <Calendar className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
//                       <span className="truncate">{new Date(post.scheduledDate).toLocaleDateString()}</span>
//                     </div>
//                   </div>
//                   <CardTitle className="text-xs sm:text-sm font-medium capitalize truncate">
//                     {post.mediaType.toLowerCase()}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-3 sm:p-4">
//                   <div className="space-y-3 sm:space-y-4">
//                     <div className="relative aspect-square rounded-lg overflow-hidden">
//                       {post.mediaType === "VIDEO" || post.mediaType === "REELS" ? (
//                         <video src={post.mediaUrl} className="object-cover w-full h-full rounded-lg" controls />
//                       ) : (
//                         <AutoCarousel images={mediaUrls} className="rounded-lg" />
//                       )}
//                     </div>
//                     <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{post.caption}</p>
//                     {post.publishedDate && (
//                       <div className="flex items-center text-xs sm:text-sm text-muted-foreground min-w-0">
//                         <Clock className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
//                         <span className="truncate">Published: {new Date(post.publishedDate).toLocaleString()}</span>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-3 sm:p-4">
//                   {post.status !== "published" && (
//                     <Button
//                       className="w-full h-9 sm:h-10 text-sm sm:text-base"
//                       onClick={() => handlePublish(post.id)}
//                       disabled={publishingId === post.id}
//                     >
//                       {publishingId === post.id ? (
//                         <>
//                           <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
//                           Publishing...
//                         </>
//                       ) : (
//                         "Publish Now"
//                       )}
//                     </Button>
//                   )}
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           )
//         })}
//       </AnimatePresence>

//       {posts.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="col-span-full text-center py-8 sm:py-12"
//         >
//           <p className="text-sm sm:text-base text-muted-foreground">No scheduled posts yet</p>
//         </motion.div>
//       )}
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { getScheduledPosts, publishPost, type ScheduledPost } from "@/actions/schedule/schedule-post"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Calendar, Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { AutoCarousel } from "./auto-carousel"

interface ScheduledPostsProps {
  userId: string
}

export function ScheduledPosts({ userId }: ScheduledPostsProps) {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [loading, setLoading] = useState(true)
  const [publishingId, setPublishingId] = useState<string | null>(null)
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({})

  useEffect(() => {
    async function fetchPosts() {
      const result = await getScheduledPosts(userId)
      if (result.success && result.data) {
        setPosts(result.data)
        const slides: Record<string, number> = {}
        result.data.forEach((post) => {
          if (post.mediaType === "CAROUSEL") {
            slides[post.id] = 0
          }
        })
        setCurrentSlides(slides)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [userId])

  const handlePublish = async (postId: string) => {
    try {
      setPublishingId(postId)
      const result = await publishPost(postId)

      if (result.success) {
        toast.success("Post published successfully")
        setPosts(
          posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  status: "published",
                  publishedDate: new Date().toISOString(),
                }
              : post,
          ),
        )
      } else {
        toast.error(result.error || "Failed to publish post")
      }
    } catch (error) {
      toast.error("An error occurred while publishing")
    } finally {
      setPublishingId(null)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[360px] rounded-lg bg-gray-800/50 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AnimatePresence>
        {posts.map((post) => {
          const mediaUrls = post.mediaUrl.split(",")
          const isCarousel = mediaUrls.length > 1

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="h-full bg-gray-900/50 border-gray-800">
                <CardHeader className="space-y-1 p-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={cn(
                        "transition-colors text-xs",
                        post.status === "published"
                          ? "border-green-600 text-green-500"
                          : "border-gray-600 text-gray-400",
                      )}
                    >
                      {post.status}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      <span>{new Date(post.scheduledDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-200 capitalize">
                    {post.mediaType.toLowerCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      {post.mediaType === "VIDEO" || post.mediaType === "REELS" ? (
                        <video src={post.mediaUrl} className="object-cover w-full h-full rounded-lg" controls />
                      ) : (
                        <AutoCarousel images={mediaUrls} className="rounded-lg" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{post.caption}</p>
                    {post.publishedDate && (
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        <span>Published: {new Date(post.publishedDate).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-3">
                  {post.status !== "published" && (
                    <Button
                      className="w-full h-9 text-sm bg-gray-800 hover:bg-gray-700"
                      onClick={() => handlePublish(post.id)}
                      disabled={publishingId === post.id}
                    >
                      {publishingId === post.id ? (
                        <>
                          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        "Publish Now"
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {posts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-8">
          <p className="text-sm text-gray-400">No scheduled posts yet</p>
        </motion.div>
      )}
    </div>
  )
}

