"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { format, parseISO, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns"
import type { EngagementData } from "@/types/dashboard"

interface DMHeatmapProps {
  data: EngagementData[]
}

const DMHeatmap: React.FC<DMHeatmapProps> = ({ data }) => {
  const heatmapData = useMemo(() => {
    const startDate = parseISO(data[0].date)
    const endDate = parseISO(data[data.length - 1].date)

    const allDays = eachDayOfInterval({ start: startDate, end: endDate })
    const maxDMs = Math.max(...data.map((d) => d.dms))

    return allDays.map((day) => {
      const dayData = data.find((d) => d.date === format(day, "yyyy-MM-dd"))
      return {
        date: format(day, "yyyy-MM-dd"),
        dms: dayData ? dayData.dms : 0,
        intensity: dayData ? dayData.dms / maxDMs : 0,
      }
    })
  }, [data])

  const weeks = useMemo(() => {
    const groupedByWeek: { [week: string]: typeof heatmapData } = {}
    heatmapData.forEach((day) => {
      const weekStart = format(startOfWeek(parseISO(day.date)), "yyyy-MM-dd")
      if (!groupedByWeek[weekStart]) {
        groupedByWeek[weekStart] = []
      }
      groupedByWeek[weekStart].push(day)
    })
    return Object.values(groupedByWeek)
  }, [heatmapData])

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="flex mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="flex-1 text-center text-xs text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  className="flex-1 aspect-square"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: weekIndex * 0.05 + dayIndex * 0.01 }}
                >
                  <div
                    className="w-full h-full rounded-sm cursor-pointer transition-transform hover:scale-110"
                    style={{
                      backgroundColor: `rgba(59, 130, 246, ${day.intensity})`,
                    }}
                    title={`${format(parseISO(day.date), "MMM d, yyyy")}: ${day.dms} DMs`}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DMHeatmap

