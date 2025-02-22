// "use client"

// import { useEffect, useState } from "react"
// import { getScheduledPosts, type ScheduledPost } from "@/actions/schedule/schedule-post"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import Image from "next/image"
// import { Calendar, Clock } from "lucide-react"

// interface ScheduledPostsProps {
//   userId: string
// }

// export function ScheduledPosts({ userId }: ScheduledPostsProps) {
//   const [posts, setPosts] = useState<ScheduledPost[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchPosts() {
//       const result = await getScheduledPosts(userId)
//       if (result.success && result.data) {
//         setPosts(result.data)
//       }
//       setLoading(false)
//     }

//     fetchPosts()
//   }, [userId])

//   if (loading) {
//     return <div className="flex justify-center p-8">Loading...</div>
//   }

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
//       {posts.map((post) => (
//         <Card key={post.id}>
//           <CardHeader className="space-y-1">
//             <div className="flex items-center justify-between">
//               <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
//               <div className="flex items-center text-sm text-muted-foreground">
//                 <Calendar className="mr-1 h-4 w-4" />
//                 {new Date(post.scheduledDate).toLocaleDateString()}
//               </div>
//             </div>
//             <CardTitle className="text-sm font-medium">{post.mediaType.toLowerCase()}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="aspect-square relative rounded-lg overflow-hidden">
//                 {post.mediaType === "VIDEO" || post.mediaType === "REELS" ? (
//                   <video src={post.mediaUrl} className="object-cover w-full h-full" controls />
//                 ) : (
//                   <Image src={post.mediaUrl || "/placeholder.svg"} alt="Post preview" fill className="object-cover" />
//                 )}
//               </div>
//               <p className="text-sm text-muted-foreground line-clamp-2">{post.caption}</p>
//               {post.publishedDate && (
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <Clock className="mr-1 h-4 w-4" />
//                   Published: {new Date(post.publishedDate).toLocaleString()}
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       ))}
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
import Image from "next/image"
import { Calendar, Clock, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

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
        // Initialize carousel positions
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

  const handleSlideChange = (postId: string, direction: "next" | "prev") => {
    const mediaUrls = posts.find((p) => p.id === postId)?.mediaUrl.split(",") || []
    setCurrentSlides((prev) => ({
      ...prev,
      [postId]:
        direction === "next"
          ? (prev[postId] + 1) % mediaUrls.length
          : (prev[postId] - 1 + mediaUrls.length) % mediaUrls.length,
    }))
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[400px] rounded-lg bg-muted/50 shimmer" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      <AnimatePresence>
        {posts.map((post) => {
          const mediaUrls = post.mediaUrl.split(",")
          const isCarousel = mediaUrls.length > 1
          const currentSlide = currentSlides[post.id] || 0

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="gradient-border"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-1 p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "transition-colors text-xs sm:text-sm",
                        post.status === "published"
                          ? "border-green-500 text-green-500"
                          : "border-blue-500 text-blue-500",
                      )}
                    >
                      {post.status}
                    </Badge>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {new Date(post.scheduledDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xs sm:text-sm font-medium capitalize">
                    {post.mediaType.toLowerCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      {post.mediaType === "VIDEO" || post.mediaType === "REELS" ? (
                        <video src={post.mediaUrl} className="object-cover w-full h-full" controls />
                      ) : (
                        <>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentSlide}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="relative aspect-square"
                            >
                              <Image
                                src={mediaUrls[currentSlide] || "/placeholder.svg"}
                                alt={`Post preview ${currentSlide + 1}`}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </motion.div>
                          </AnimatePresence>
                          {isCarousel && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 h-8 w-8 sm:h-9 sm:w-9"
                                onClick={() => handleSlideChange(post.id, "prev")}
                              >
                                <ChevronLeft className="h-4 w-4 text-white" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 h-8 w-8 sm:h-9 sm:w-9"
                                onClick={() => handleSlideChange(post.id, "next")}
                              >
                                <ChevronRight className="h-4 w-4 text-white" />
                              </Button>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {mediaUrls.map((_, index) => (
                                  <div
                                    key={index}
                                    className={cn(
                                      "w-1.5 h-1.5 rounded-full transition-colors",
                                      index === currentSlide ? "bg-white" : "bg-white/50",
                                    )}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{post.caption}</p>
                    {post.publishedDate && (
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Published: {new Date(post.publishedDate).toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-4">
                  {post.status !== "published" && (
                    <Button
                      className="w-full h-9 sm:h-10 text-sm sm:text-base"
                      onClick={() => handlePublish(post.id)}
                      disabled={publishingId === post.id}
                    >
                      {publishingId === post.id ? (
                        <>
                          <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-8 sm:py-12"
        >
          <p className="text-sm sm:text-base text-muted-foreground">No scheduled posts yet</p>
        </motion.div>
      )}
    </div>
  )
}

