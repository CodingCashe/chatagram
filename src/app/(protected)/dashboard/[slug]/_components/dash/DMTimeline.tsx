"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { format, parseISO } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import type { EngagementData } from "@/types/dashboard"

interface DMTimelineProps {
  data: EngagementData[]
}

const DMTimeline: React.FC<DMTimelineProps> = ({ data }) => {
  const timelineData = useMemo(() => {
    const maxDMs = Math.max(...data.map((d) => d.dms))
    return data.map((day) => ({
      ...day,
      intensity: day.dms / maxDMs,
    }))
  }, [data])

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="relative h-64 sm:h-80">
          <div className="absolute inset-0 flex items-end">
            {timelineData.map((day, index) => (
              <motion.div
                key={day.date}
                className="flex-1 group relative"
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
                    className="absolute inset-0 bg-gradient-to-t from-gray-700 to-gray-500"
                    style={{ opacity: day.intensity }}
                  />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs">
                      {format(parseISO(day.date), "MMM d")}: {day.dms} DMs
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-500">
            {timelineData
              .filter((_, i) => i % Math.floor(timelineData.length / 5) === 0)
              .map((day) => (
                <div key={day.date}>{format(parseISO(day.date), "MMM d")}</div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DMTimeline

