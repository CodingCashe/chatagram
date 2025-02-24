import type React from "react"
import { motion } from "framer-motion"

interface EngagementData {
  date: string
  dms: number
  comments: number
}

interface EngagementHeatmapProps {
  data: EngagementData[]
}

const EngagementHeatmap: React.FC<EngagementHeatmapProps> = ({ data }) => {
  const maxEngagement = Math.max(...data.map((d) => d.dms + d.comments))

  const getColor = (engagement: number) => {
    const intensity = engagement / maxEngagement
    return `rgba(59, 130, 246, ${intensity})`
  }

  return (
    <div className="grid grid-cols-7 gap-0.5 sm:gap-1 overflow-x-auto pb-4">
      {data.map((day, index) => (
        <motion.div
          key={day.date}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.01 }}
          className="w-4 h-4 sm:w-6 sm:h-6 rounded-sm relative group"
          style={{ backgroundColor: getColor(day.dms + day.comments) }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 text-white text-[8px] sm:text-xs rounded-sm p-1 sm:p-2 whitespace-nowrap">
            <div className="text-center">
              <div>{new Date(day.date).toLocaleDateString()}</div>
              <div>DMs: {day.dms}</div>
              <div>Comments: {day.comments}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default EngagementHeatmap

