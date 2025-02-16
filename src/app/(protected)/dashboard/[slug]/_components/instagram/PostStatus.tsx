import type React from "react"
import { motion } from "framer-motion"
import type { ScheduledPost } from "@/actions/schedule/schedule-post"
import { format } from "date-fns"

interface PostStatusProps {
  post: ScheduledPost
}

const PostStatus: React.FC<PostStatusProps> = ({ post }) => {
  const isPublished = post.status === "published"
  const statusColor = isPublished ? "bg-green-500" : "bg-yellow-500"
  const statusText = isPublished ? "Published" : "Scheduled"

  return (
    <motion.div
      className="mt-4 p-2 rounded-lg bg-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
        <span className="font-semibold">{statusText}</span>
      </div>
      <p className="text-sm text-gray-300 mt-1">
        {isPublished
          ? `Published on ${format(new Date(post.publishedDate || post.scheduledDate), "MMMM d, yyyy 'at' h:mm a")}`
          : `Scheduled for ${format(new Date(post.scheduledDate), "MMMM d, yyyy 'at' h:mm a")}`}
      </p>
    </motion.div>
  )
}

export default PostStatus

