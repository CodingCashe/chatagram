"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { format, parseISO } from "date-fns"
import type { EngagementData } from "@/types/dashboard"

interface DMPulseProps {
  data: EngagementData[]
}

const DMPulse: React.FC<DMPulseProps> = ({ data }) => {
  const pulseData = useMemo(() => {
    const maxDMs = Math.max(...data.map((d) => d.dms))
    return data.map((day) => ({
      ...day,
      intensity: day.dms / maxDMs,
    }))
  }, [data])

  return (
    <div className="relative h-64 sm:h-80">
      <div className="absolute inset-0 flex items-end">
        {pulseData.map((day, index) => (
          <motion.div
            key={day.date}
            className="flex-1 bg-blue-500"
            initial={{ height: 0 }}
            animate={{ height: `${day.intensity * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.02 }}
          >
            <motion.div
              className="w-full h-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.02 + 0.5 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-blue-600 to-blue-400"
                style={{ opacity: day.intensity }}
              />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <motion.div
                  className="w-2 h-2 rounded-full bg-blue-300"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-400">
        {pulseData
          .filter((_, i) => i % Math.floor(pulseData.length / 5) === 0)
          .map((day) => (
            <div key={day.date}>{format(parseISO(day.date), "MMM d")}</div>
          ))}
      </div>
    </div>
  )
}

export default DMPulse

