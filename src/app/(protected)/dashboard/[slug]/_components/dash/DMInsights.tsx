"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { ActivitySquare, TrendingUp, TrendingDown, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { EngagementData } from "@/types/dashboard"

interface DMInsightsProps {
  data: EngagementData[]
}

const DMInsights: React.FC<DMInsightsProps> = ({ data }) => {
  const insights = useMemo(() => {
    const totalDMs = data.reduce((sum, day) => sum + day.dms, 0) / 2
    const avgDMs = totalDMs / data.length
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
        description: `You've received ${totalDMs} DMs in total.`,
        icon: MessageCircle,
        color: "text-muted-foreground",
      },
      {
        title: "Weekly Trend",
        value: `${Math.abs(weeklyTrend).toFixed(1)}%`,
        description: `Your DMs are ${weeklyTrend > 0 ? "up" : "down"} compared to your average.`,
        icon: weeklyTrend > 0 ? TrendingUp : TrendingDown,
        color: weeklyTrend > 0 ? "text-emerald-400" : "text-red-400",
      },
      {
        title: "DM Range",
        value: `${minDMs} - ${maxDMs}`,
        description: `Your DMs range from ${minDMs} to ${maxDMs} per day.`,
        icon: ActivitySquare,
        color: "text-muted-foreground",
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
        >
          <Card className="bg-background/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-2">
                <insight.icon className={`w-6 h-6 ${insight.color}`} />
                <h3 className="text-lg font-semibold text-foreground">{insight.title}</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-foreground">{insight.value}</p>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default DMInsights

