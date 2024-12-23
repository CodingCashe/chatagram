'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Send } from 'lucide-react'
import Image from 'next/image'

const comments = [
  "Love this! 😍",
  "Great content! 👏",
  "Can't wait to try Chatal!",
  "This is amazing!",
  "How do I sign up?",
  "Awesome features!",
]

export const InstagramSimulator = () => {
  const [likes, setLikes] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLikes((prev) => prev + Math.floor(Math.random() * 3))
      setCommentCount((prev) => prev + (Math.random() > 0.7 ? 1 : 0))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <Image
            src="/fancy-profile-pic.svg"
            alt="Chatal"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-3 font-semibold">chatal_official</span>
        </div>
      </div>
      <Image
        src="/fancy-post-image.svg"
        alt="Chatal Demo"
        width={400}
        height={400}
        className="w-full h-auto"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLikes((prev) => prev + 1)}
            >
              <Heart className="w-6 h-6 text-red-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-6 h-6 text-gray-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send className="w-6 h-6 text-gray-500" />
            </motion.button>
          </div>
        </div>
        <div className="font-semibold mb-2">{likes} likes</div>
        <div className="text-sm text-gray-500 mb-2">View all {commentCount} comments</div>
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {comments.slice(0, commentCount).map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm"
                >
                  <span className="font-semibold mr-2">user_{index + 1}</span>
                  {comment}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

