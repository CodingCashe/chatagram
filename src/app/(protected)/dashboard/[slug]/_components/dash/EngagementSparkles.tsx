"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Mail } from "lucide-react"
import type { EngagementData } from "@/types/dashboard"

interface EngagementSparklesProps {
  data: EngagementData[]
}

const EngagementSparkles: React.FC<EngagementSparklesProps> = ({ data }) => {
  const { totalDMs, totalComments, maxEngagement } = useMemo(() => {
    const totalDMs = data.reduce((sum, day) => sum + day.dms, 0)
    const totalComments = data.reduce((sum, day) => sum + day.comments, 0)
    const maxEngagement = Math.max(...data.map((day) => day.dms + day.comments))
    return { totalDMs, totalComments, maxEngagement }
  }, [data])

  const sparkles = useMemo(() => {
    return data.flatMap((day) => [
      ...Array(day.dms).fill({ type: "dm" }),
      ...Array(day.comments).fill({ type: "comment" }),
    ])
  }, [data])

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden">
      {sparkles.map((sparkle, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: [0, 1, 0],
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: Math.random() * 2,
          }}
        >
          {sparkle.type === "dm" ? (
            <Mail className="text-yellow-300" size={16} />
          ) : (
            <MessageCircle className="text-green-300" size={16} />
          )}
        </motion.div>
      ))}
      <div className="absolute bottom-4 left-4 text-white">
        <div className="text-2xl font-bold">{totalDMs + totalComments}</div>
        <div className="text-sm opacity-80">Total Engagements</div>
      </div>
      <div className="absolute bottom-4 right-4 text-white text-right">
        <div className="flex items-center justify-end mb-2">
          <span className="mr-2 text-lg font-semibold">{totalDMs}</span>
          <Mail className="text-yellow-300" size={20} />
        </div>
        <div className="flex items-center justify-end">
          <span className="mr-2 text-lg font-semibold">{totalComments}</span>
          <MessageCircle className="text-green-300" size={20} />
        </div>
      </div>
    </div>
  )
}

export default EngagementSparkles

