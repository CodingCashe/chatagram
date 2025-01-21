"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Star, MessageCircle } from "lucide-react"

interface EngagementData {
  date: string
  dms: number
  comments: number
}

interface EngagementGalaxyProps {
  data: EngagementData[]
}

const EngagementGalaxy: React.FC<EngagementGalaxyProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    controls.start((i) => ({
      rotate: [0, 360],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 200 + i * 10,
        ease: "linear",
      },
    }))
  }, [controls])

  const maxEngagement = Math.max(...data.map((d) => d.dms + d.comments))

  const getSize = (engagement: number) => {
    const minSize = 4
    const maxSize = Math.min(dimensions.width, dimensions.height) / 10
    return minSize + (engagement / maxEngagement) * (maxSize - minSize)
  }

  const getColor = (dms: number, comments: number) => {
    const r = Math.floor((dms / (dms + comments)) * 255)
    const b = Math.floor((comments / (dms + comments)) * 255)
    return `rgb(${r}, 100, ${b})`
  }

  return (
    <div ref={containerRef} className="w-full h-[300px] sm:h-[400px] bg-gray-900 rounded-lg relative overflow-hidden">
      {data.map((day, index) => {
        const size = getSize(day.dms + day.comments)
        const x = Math.random() * (dimensions.width - size)
        const y = Math.random() * (dimensions.height - size)
        const color = getColor(day.dms, day.comments)

        return (
          <motion.div
            key={day.date}
            className="absolute flex items-center justify-center"
            style={{
              x,
              y,
              width: size,
              height: size,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={controls}
            custom={index}
          >
            <Star fill={color} stroke={color} size={size} className="absolute" />
            <motion.div
              className="absolute w-full h-full rounded-full"
              style={{ backgroundColor: color, opacity: 0.3 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )
      })}
      <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm">
        <div className="flex items-center mb-1">
          <Star size={16} className="mr-1 text-red-400" /> DMs
        </div>
        <div className="flex items-center">
          <Star size={16} className="mr-1 text-blue-400" /> Comments
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-opacity-50 rounded p-2">
        <select className="bg-transparent text-white text-xs sm:text-sm outline-none">
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>
    </div>
  )
}

export default EngagementGalaxy

