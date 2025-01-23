import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react"

interface EngagementData {
  date: string
  dms: number
  comments: number
}

interface EngagementInsightPanelProps {
  data: EngagementData[]
}

const EngagementInsightPanel: React.FC<EngagementInsightPanelProps> = ({ data }) => {
  const insights = useMemo(() => {
    const totalDMs = data.reduce((sum, day) => sum + day.dms, 0)
    const totalComments = data.reduce((sum, day) => sum + day.comments, 0)
    const avgDMs = totalDMs / data.length
    const avgComments = totalComments / data.length

    const lastWeekData = data.slice(-7)
    const lastWeekDMs = lastWeekData.reduce((sum, day) => sum + day.dms, 0)
    const lastWeekComments = lastWeekData.reduce((sum, day) => sum + day.comments, 0)
    const lastWeekAvgDMs = lastWeekDMs / 7
    const lastWeekAvgComments = lastWeekComments / 7

    const dmsTrend = ((lastWeekAvgDMs - avgDMs) / avgDMs) * 100
    const commentsTrend = ((lastWeekAvgComments - avgComments) / avgComments) * 100

    return [
      {
        title: "DM Engagement",
        description: `Your DM engagement is ${dmsTrend > 0 ? "up" : "down"} by ${Math.abs(dmsTrend).toFixed(1)}% compared to your average.`,
        icon: dmsTrend > 0 ? TrendingUp : TrendingDown,
        color: dmsTrend > 0 ? "text-green-500" : "text-red-500",
      },
      {
        title: "Comment Activity",
        description: `Your comment activity is ${commentsTrend > 0 ? "up" : "down"} by ${Math.abs(commentsTrend).toFixed(1)}% compared to your average.`,
        icon: commentsTrend > 0 ? TrendingUp : TrendingDown,
        color: commentsTrend > 0 ? "text-green-500" : "text-red-500",
      },
      {
        title: "Engagement Balance",
        description:
          totalDMs > totalComments
            ? "You're receiving more DMs than comments. Consider encouraging more public interactions."
            : "You're receiving more comments than DMs. Great job fostering public discussions!",
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
          className="bg-secondary p-3 sm:p-4 rounded-lg"
        >
          <div className="flex items-center space-x-2 sm:space-x-3">
            <insight.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${insight.color}`} />
            <h3 className="text-base sm:text-lg font-semibold">{insight.title}</h3>
          </div>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">{insight.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default EngagementInsightPanel

