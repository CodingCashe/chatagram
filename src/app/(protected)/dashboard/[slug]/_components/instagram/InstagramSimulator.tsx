"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { format } from "date-fns"
import type { ScheduledPost } from "@/actions/schedule/schedule-post"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import PostStatus from "./PostStatus"

interface InstagramSimulatorProps {
  posts: ScheduledPost[]
}

const InstagramSimulator: React.FC<InstagramSimulatorProps> = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime(),
  )

  const handleNext = () => setCurrentPostIndex((prevIndex) => (prevIndex + 1) % sortedPosts.length)
  const handlePrev = () => setCurrentPostIndex((prevIndex) => (prevIndex - 1 + sortedPosts.length) % sortedPosts.length)

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      prev.has(postId) ? newSet.delete(postId) : newSet.add(postId)
      return newSet
    })
  }

  const toggleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev)
      prev.has(postId) ? newSet.delete(postId) : newSet.add(postId)
      return newSet
    })
  }

  if (loading) return <LoadingAnimation />
  if (sortedPosts.length === 0) return <NoPosts />

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-sm mx-auto">
        <Header />
        <AnimatePresence mode="wait">
          <Post
            key={sortedPosts[currentPostIndex].id}
            post={sortedPosts[currentPostIndex]}
            isLiked={likedPosts.has(sortedPosts[currentPostIndex].id)}
            isSaved={savedPosts.has(sortedPosts[currentPostIndex].id)}
            onLike={() => toggleLike(sortedPosts[currentPostIndex].id)}
            onSave={() => toggleSave(sortedPosts[currentPostIndex].id)}
          />
        </AnimatePresence>
        {sortedPosts.length > 1 && (
          <div className="flex justify-between px-2 py-1">
            <Button variant="ghost" size="sm" onClick={handlePrev}>
              <ChevronLeft size={20} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNext}>
              <ChevronRight size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

const Header: React.FC = () => (
  <motion.div
    className="flex justify-between items-center p-2 border-b border-gray-700"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
  </motion.div>
)

const Post: React.FC<{
  post: ScheduledPost
  isLiked: boolean
  isSaved: boolean
  onLike: () => void
  onSave: () => void
}> = ({ post, isLiked, isSaved, onLike, onSave }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const mediaUrls = post.mediaUrl.split(",")
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleNext = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length)
  const handlePrev = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length)

  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) handlePrev()
    else if (info.offset.x < -100) handleNext()
  }

  return (
    <motion.div
      ref={ref}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">user123</span>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal size={20} />
        </Button>
      </div>
      <motion.div
        className="relative aspect-square"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={mediaUrls[currentImageIndex] || "/placeholder.svg"}
              alt={`Post image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </AnimatePresence>
        {mediaUrls.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {mediaUrls.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </motion.div>
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-2">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={onLike}
              className={`${isLiked ? "text-red-500" : "text-white"}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.8 }}>
              <MessageCircle size={20} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.8 }}>
              <Send size={20} />
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={onSave}
            className={`${isSaved ? "text-yellow-500" : "text-white"}`}
          >
            <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
          </motion.button>
        </div>
        <p className="text-sm font-semibold mb-1">{Math.floor(Math.random() * 1000)} likes</p>
        <p className="text-sm mb-1">
          <span className="font-semibold">user123</span> {post.caption}
        </p>
        <p className="text-gray-400 text-xs">{format(new Date(post.scheduledDate), "MMMM d, yyyy")}</p>
        <PostStatus post={post} />
      </div>
    </motion.div>
  )
}

const NoPosts: React.FC = () => (
  <motion.div
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-4 p-8 text-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-bold mb-4">No Posts Yet</h2>
    <p className="text-gray-400">Your Instagram posts will appear here after you create and publish them.</p>
  </motion.div>
)

const LoadingAnimation: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 space-y-4">
    <motion.div
      className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
    <Skeleton className="w-48 h-4 bg-gray-700" />
    <Skeleton className="w-32 h-4 bg-gray-700" />
  </div>
)

export default InstagramSimulator

