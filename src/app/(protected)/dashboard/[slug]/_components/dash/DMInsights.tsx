"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Zap, TrendingUp, TrendingDown, MessageCircle } from "lucide-react"
import type { EngagementData } from "@/types/dashboard"

interface DMInsightsProps {
  data: EngagementData[]
}

const DMInsights: React.FC<DMInsightsProps> = ({ data }) => {
  const insights = useMemo(() => {
    const totalDMs = data.reduce((sum, day) => sum + day.dms, 0)
    const avgDMs = (totalDMs/2) / data.length
    const maxDMs = Math.max(...data.map((d) => d.dms))
    const minDMs = Math.min(...data.map((d) => d.dms))

    const lastWeekData = data.slice(-7)
    const lastWeekDMs = lastWeekData.reduce((sum, day) => sum + day.dms, 0)
    const lastWeekAvgDMs = lastWeekDMs / 7

    const weeklyTrend = ((lastWeekAvgDMs - avgDMs) / avgDMs) * 100

    return [
      {
        title: "Total DMs",
        value: totalDMs,
        description: `You've received ${totalDMs/2} DMs and comments in total.`,
        icon: MessageCircle,
        color: "text-blue-500",
      },
      {
        title: "Weekly Trend",
        value: `${Math.abs(weeklyTrend).toFixed(1)}%`,
        description: `Your DMs are ${weeklyTrend > 0 ? "up" : "down"} compared to your average.`,
        icon: weeklyTrend > 0 ? TrendingUp : TrendingDown,
        color: weeklyTrend > 0 ? "text-green-500" : "text-red-500",
      },
      {
        title: "DM Range",
        value: `${minDMs} - ${maxDMs}`,
        description: `Your DMs range from ${minDMs} to ${maxDMs} per day.`,
        icon: Zap,
        color: "text-yellow-500",
      },
    ]
  }, [data])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-3 mb-2">
            <insight.icon className={`w-6 h-6 ${insight.color}`} />
            <h3 className="text-lg font-semibold">{insight.title}</h3>
          </div>
          <p className="text-2xl font-bold mb-2">{insight.value}</p>
          <p className="text-sm text-gray-400">{insight.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default DMInsights

