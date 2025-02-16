"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import type { ScheduledPost } from "@/actions/schedule/schedule-post"
import { Tilt } from "react-tilt"
import { useInView } from "react-intersection-observer"

interface InstagramFeedProps {
  posts: ScheduledPost[]
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Instagram Feed
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {sortedPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} setSelectedPost={setSelectedPost} />
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
      </AnimatePresence>
    </div>
  )
}

const PostCard: React.FC<{
  post: ScheduledPost
  index: number
  setSelectedPost: (post: ScheduledPost) => void
}> = ({ post, index, setSelectedPost }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const y = useMotionValue(50)
  const opacity = useTransform(y, [50, 0], [0, 1])

  useEffect(() => {
    if (inView) {
      y.set(0)
    }
  }, [inView, y])

  const mediaUrls = post.mediaUrl.split(",")

  return (
    <Tilt options={{ max: 25, scale: 1.05 }}>
      <motion.div
        ref={ref}
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setSelectedPost(post)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative h-64">
          <Image
            src={mediaUrls[0] || "/placeholder.svg"}
            alt={`Post ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 transform hover:scale-110"
          />
          {mediaUrls.length > 1 && (
            <div className="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-2">
            {post.status === "published" ? "Posted" : "Scheduled for"}:{" "}
            {format(new Date(post.scheduledDate), "PPP 'at' p")}
          </p>
          <p className="text-sm font-medium mb-2 line-clamp-2">{post.caption}</p>
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                post.status === "published" ? "text-green-600 bg-green-200" : "text-yellow-600 bg-yellow-200"
              }`}
            >
              {post.status}
            </span>
            <span className="text-xs text-gray-500">{post.mediaType}</span>
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

const PostModal: React.FC<{
  post: ScheduledPost
  onClose: () => void
}> = ({ post, onClose }) => {
  const mediaUrls = post.mediaUrl.split(",")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-96 mb-4">
          <Image
            src={mediaUrls[currentImageIndex] || "/placeholder.svg"}
            alt={`Post image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {mediaUrls.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
                onClick={handlePrev}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2"
                onClick={handleNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        <h3 className="text-2xl font-bold mb-2">{post.status === "published" ? "Posted" : "Scheduled"} Post</h3>
        <p className="text-gray-600 mb-4">
          {post.status === "published" ? "Posted on" : "Scheduled for"}:{" "}
          {format(new Date(post.scheduledDate), "PPP 'at' p")}
        </p>
        <p className="text-gray-800 mb-4">{post.caption}</p>
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full ${
              post.status === "published" ? "text-green-600 bg-green-200" : "text-yellow-600 bg-yellow-200"
            }`}
          >
            {post.status}
          </span>
          <span className="text-sm text-gray-500">{post.mediaType}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default InstagramFeed

