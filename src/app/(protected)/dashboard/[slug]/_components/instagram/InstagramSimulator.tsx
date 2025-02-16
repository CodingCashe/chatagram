// "use client"

// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
// import { format } from "date-fns"
// import type { ScheduledPost } from "@/actions/schedule/schedule-post"
// import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
// import { useInView } from "react-intersection-observer"

// interface InstagramSimulatorProps {
//   posts: ScheduledPost[]
// }

// const InstagramSimulator: React.FC<InstagramSimulatorProps> = ({ posts }) => {
//   const [currentPostIndex, setCurrentPostIndex] = useState(0)
//   const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
//   const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())

//   const sortedPosts = [...posts].sort((a, b) => {
//     return new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
//   })

//   const handleNext = () => {
//     setCurrentPostIndex((prevIndex) => (prevIndex + 1) % sortedPosts.length)
//   }

//   const handlePrev = () => {
//     setCurrentPostIndex((prevIndex) => (prevIndex - 1 + sortedPosts.length) % sortedPosts.length)
//   }

//   const toggleLike = (postId: string) => {
//     setLikedPosts((prevLiked) => {
//       const newLiked = new Set(prevLiked)
//       if (newLiked.has(postId)) {
//         newLiked.delete(postId)
//       } else {
//         newLiked.add(postId)
//       }
//       return newLiked
//     })
//   }

//   const toggleSave = (postId: string) => {
//     setSavedPosts((prevSaved) => {
//       const newSaved = new Set(prevSaved)
//       if (newSaved.has(postId)) {
//         newSaved.delete(postId)
//       } else {
//         newSaved.add(postId)
//       }
//       return newSaved
//     })
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <div className="max-w-md mx-auto">
//         <Header />
//         <AnimatePresence mode="wait">
//           <Post
//             key={sortedPosts[currentPostIndex].id}
//             post={sortedPosts[currentPostIndex]}
//             isLiked={likedPosts.has(sortedPosts[currentPostIndex].id)}
//             isSaved={savedPosts.has(sortedPosts[currentPostIndex].id)}
//             onLike={() => toggleLike(sortedPosts[currentPostIndex].id)}
//             onSave={() => toggleSave(sortedPosts[currentPostIndex].id)}
//           />
//         </AnimatePresence>
//         <div className="flex justify-between px-4 py-2">
//           <button onClick={handlePrev} className="text-white">
//             <ChevronLeft size={24} />
//           </button>
//           <button onClick={handleNext} className="text-white">
//             <ChevronRight size={24} />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// const Header: React.FC = () => (
//   <motion.div
//     className="flex justify-between items-center p-4 border-b border-gray-700"
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//   >
//     <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
//       Instagram
//     </h1>
//     <div className="flex space-x-4">
//       <Send size={24} />
//     </div>
//   </motion.div>
// )

// const Post: React.FC<{
//   post: ScheduledPost
//   isLiked: boolean
//   isSaved: boolean
//   onLike: () => void
//   onSave: () => void
// }> = ({ post, isLiked, isSaved, onLike, onSave }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const mediaUrls = post.mediaUrl.split(",")
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   })

//   const handleNext = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length)
//   }

//   const handlePrev = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length)
//   }

//   const x = useMotionValue(0)
//   const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

//   const handleDragEnd = (event: any, info: any) => {
//     if (info.offset.x > 100) {
//       handlePrev()
//     } else if (info.offset.x < -100) {
//       handleNext()
//     }
//   }

//   return (
//     <motion.div
//       ref={ref}
//       className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-4"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
//       exit={{ opacity: 0, y: -50 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-full"></div>
//           <span className="font-semibold">user123</span>
//         </div>
//         <MoreHorizontal size={24} />
//       </div>
//       <motion.div
//         className="relative aspect-square"
//         drag="x"
//         dragConstraints={{ left: 0, right: 0 }}
//         onDragEnd={handleDragEnd}
//         style={{ x }}
//       >
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={currentImageIndex}
//             className="absolute inset-0"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Image
//               src={mediaUrls[currentImageIndex] || "/placeholder.svg"}
//               alt={`Post image ${currentImageIndex + 1}`}
//               layout="fill"
//               objectFit="cover"
//             />
//           </motion.div>
//         </AnimatePresence>
//         {mediaUrls.length > 1 && (
//           <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
//             {mediaUrls.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"}`}
//               ></div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//       <div className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex space-x-4">
//             <motion.button
//               whileTap={{ scale: 0.8 }}
//               onClick={onLike}
//               className={`${isLiked ? "text-red-500" : "text-white"}`}
//             >
//               <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
//             </motion.button>
//             <motion.button whileTap={{ scale: 0.8 }}>
//               <MessageCircle size={24} />
//             </motion.button>
//             <motion.button whileTap={{ scale: 0.8 }}>
//               <Send size={24} />
//             </motion.button>
//           </div>
//           <motion.button
//             whileTap={{ scale: 0.8 }}
//             onClick={onSave}
//             className={`${isSaved ? "text-yellow-500" : "text-white"}`}
//           >
//             <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
//           </motion.button>
//         </div>
//         <p className="font-semibold mb-2">{Math.floor(Math.random() * 1000)} likes</p>
//         <p className="mb-2">
//           <span className="font-semibold">user123</span> {post.caption}
//         </p>
//         <p className="text-gray-400 text-sm">{format(new Date(post.scheduledDate), "MMMM d, yyyy")}</p>
//       </div>
//     </motion.div>
//   )
// }

// export default InstagramSimulator

"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { format } from "date-fns"
import type { ScheduledPost } from "@/actions/schedule/schedule-post"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import PostStatus from "./PostStatus"

interface InstagramSimulatorProps {
  posts: ScheduledPost[]
}

const InstagramSimulator: React.FC<InstagramSimulatorProps> = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
  })

  const handleNext = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % sortedPosts.length)
  }

  const handlePrev = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex - 1 + sortedPosts.length) % sortedPosts.length)
  }

  const toggleLike = (postId: string) => {
    setLikedPosts((prevLiked) => {
      const newLiked = new Set(prevLiked)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
      } else {
        newLiked.add(postId)
      }
      return newLiked
    })
  }

  const toggleSave = (postId: string) => {
    setSavedPosts((prevSaved) => {
      const newSaved = new Set(prevSaved)
      if (newSaved.has(postId)) {
        newSaved.delete(postId)
      } else {
        newSaved.add(postId)
      }
      return newSaved
    })
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-md mx-auto">
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
        <div className="flex justify-between px-4 py-2">
          <button onClick={handlePrev} className="text-white">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="text-white">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

const Header: React.FC = () => (
  <motion.div
    className="flex justify-between items-center p-4 border-b border-gray-700"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
      Instagram
    </h1>
    <div className="flex space-x-4">
      <Send size={24} />
    </div>
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length)
  }

  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handlePrev()
    } else if (info.offset.x < -100) {
      handleNext()
    }
  }

  return (
    <motion.div
      ref={ref}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: "0 0 10px rgba(123, 31, 162, 0.5), 0 0 20px rgba(103, 232, 249, 0.3)",
      }}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-full"></div>
          <span className="font-semibold">user123</span>
        </div>
        <MoreHorizontal size={24} />
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
              ></div>
            ))}
          </div>
        )}
      </motion.div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={onLike}
              className={`${isLiked ? "text-red-500" : "text-white"}`}
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.8 }}>
              <MessageCircle size={24} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.8 }}>
              <Send size={24} />
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={onSave}
            className={`${isSaved ? "text-yellow-500" : "text-white"}`}
          >
            <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
          </motion.button>
        </div>
        <p className="font-semibold mb-2">{Math.floor(Math.random() * 1000)} likes</p>
        <p className="mb-2">
          <span className="font-semibold">user123</span> {post.caption}
        </p>
        <p className="text-gray-400 text-sm">{format(new Date(post.scheduledDate), "MMMM d, yyyy")}</p>
        <PostStatus post={post} />
      </div>
    </motion.div>
  )
}

export default InstagramSimulator

