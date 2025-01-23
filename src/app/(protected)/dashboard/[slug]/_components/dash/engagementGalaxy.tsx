// "use client"

// import type React from "react"
// import { useRef, useEffect, useState } from "react"
// import { motion, useAnimation } from "framer-motion"
// import { Star, MessageCircle } from "lucide-react"

// interface EngagementData {
//   date: string
//   dms: number
//   comments: number
// }

// interface EngagementGalaxyProps {
//   data: EngagementData[]
// }

// const EngagementGalaxy: React.FC<EngagementGalaxyProps> = ({ data }) => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
//   const controls = useAnimation()

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         setDimensions({
//           width: containerRef.current.offsetWidth,
//           height: containerRef.current.offsetHeight,
//         })
//       }
//     }

//     updateDimensions()
//     window.addEventListener("resize", updateDimensions)

//     return () => window.removeEventListener("resize", updateDimensions)
//   }, [])

//   useEffect(() => {
//     controls.start((i) => ({
//       rotate: [0, 360],
//       transition: {
//         repeat: Number.POSITIVE_INFINITY,
//         duration: 200 + i * 10,
//         ease: "linear",
//       },
//     }))
//   }, [controls])

//   const maxEngagement = Math.max(...data.map((d) => d.dms + d.comments))

//   const getSize = (engagement: number) => {
//     const minSize = 4
//     const maxSize = Math.min(dimensions.width, dimensions.height) / 10
//     return minSize + (engagement / maxEngagement) * (maxSize - minSize)
//   }

//   const getColor = (dms: number, comments: number) => {
//     const r = Math.floor((dms / (dms + comments)) * 255)
//     const b = Math.floor((comments / (dms + comments)) * 255)
//     return `rgb(${r}, 100, ${b})`
//   }

//   return (
//     <div ref={containerRef} className="w-full h-[300px] sm:h-[400px] bg-gray-900 rounded-lg relative overflow-hidden">
//       {data.map((day, index) => {
//         const size = getSize(day.dms + day.comments)
//         const x = Math.random() * (dimensions.width - size)
//         const y = Math.random() * (dimensions.height - size)
//         const color = getColor(day.dms, day.comments)

//         return (
//           <motion.div
//             key={day.date}
//             className="absolute flex items-center justify-center"
//             style={{
//               x,
//               y,
//               width: size,
//               height: size,
//             }}
//             initial={{ scale: 0, opacity: 0 }}
//             animate={controls}
//             custom={index}
//           >
//             <Star fill={color} stroke={color} size={size} className="absolute" />
//             <motion.div
//               className="absolute w-full h-full rounded-full"
//               style={{ backgroundColor: color, opacity: 0.3 }}
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.div>
//         )
//       })}
//       <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm">
//         <div className="flex items-center mb-1">
//           <Star size={16} className="mr-1 text-red-400" /> DMs
//         </div>
//         <div className="flex items-center">
//           <Star size={16} className="mr-1 text-blue-400" /> Comments
//         </div>
//       </div>
//       <div className="absolute top-2 right-2 bg-opacity-50 rounded p-2">
//         <select className="bg-transparent text-white text-xs sm:text-sm outline-none">
//           <option value="week">Last Week</option>
//           <option value="month">Last Month</option>
//           <option value="year">Last Year</option>
//         </select>
//       </div>
//     </div>
//   )
// }

// export default EngagementGalaxy

"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Lightbulb, TrendingUp, TrendingDown, BarChart2 } from "lucide-react"
import type { EngagementData } from "@/types/dashboard"

interface EngagementInsightPanelProps {
  data: EngagementData[]
}

const EngagementInsightPanel: React.FC<EngagementInsightPanelProps> = ({ data }) => {
  const insights = useMemo(() => {
    const totalDMs = data.reduce((sum, day) => sum + day.dms, 0)
    const totalComments = data.reduce((sum, day) => sum + day.comments, 0)
    const totalEngagements = totalDMs + totalComments

    const lastWeekData = data.slice(-7)
    const lastWeekDMs = lastWeekData.reduce((sum, day) => sum + day.dms, 0)
    const lastWeekComments = lastWeekData.reduce((sum, day) => sum + day.comments, 0)
    const lastWeekEngagements = lastWeekDMs + lastWeekComments

    const weeklyTrend =
      ((lastWeekEngagements / 7 - totalEngagements / data.length) / (totalEngagements / data.length)) * 100

    const dmPercentage = (totalDMs / totalEngagements) * 100
    const commentPercentage = (totalComments / totalEngagements) * 100

    return [
      {
        title: "Total Engagements",
        description: `You've received ${totalEngagements} total engagements.`,
        icon: BarChart2,
        color: "text-blue-500",
      },
      {
        title: "Weekly Trend",
        description: `Your engagement is ${weeklyTrend > 0 ? "up" : "down"} by ${Math.abs(weeklyTrend).toFixed(1)}% compared to your average.`,
        icon: weeklyTrend > 0 ? TrendingUp : TrendingDown,
        color: weeklyTrend > 0 ? "text-green-500" : "text-red-500",
      },
      {
        title: "Engagement Balance",
        description: `${dmPercentage.toFixed(1)}% DMs vs ${commentPercentage.toFixed(1)}% Comments`,
        icon: Lightbulb,
        color: "text-yellow-500",
      },
    ]
  }, [data])

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-secondary p-4 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <insight.icon className={`w-6 h-6 ${insight.color}`} />
            <h3 className="text-lg font-semibold">{insight.title}</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default EngagementInsightPanel

