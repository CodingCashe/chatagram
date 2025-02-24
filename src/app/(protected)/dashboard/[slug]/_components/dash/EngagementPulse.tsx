"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { getDashboardData } from "@/actions/dashboard"
import { Activity, MessageCircle, ThumbsUp, Zap } from "lucide-react"
import type { DashboardData } from "@/types/dashboard"

interface EngagementData {
  date: string
  dms: number
  comments: number
  likes: number
}

const EngagementPulse: React.FC<{ userId: string }> = ({ userId }) => {
  const [data, setData] = useState<EngagementData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState(30) // Default to 30 days
  const [focusMetric, setFocusMetric] = useState<"dms" | "comments" | "likes">("dms")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response: DashboardData = await getDashboardData()
        if (response.status === 200 && response.data) {
          const processedData = processEngagementData(response.data)
          setData(processedData)
        } else {
          setError("Failed to fetch engagement data")
        }
      } catch (err) {
        setError("Failed to fetch engagement data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const processEngagementData = (dashboardData: NonNullable<DashboardData["data"]>): EngagementData[] => {
    const engagementMap = new Map<string, EngagementData>()

    // Process engagementData (DMs)
    dashboardData.engagementData.forEach((engagement) => {
      const date = new Date(engagement.createdAt).toISOString().split("T")[0]
      const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0, likes: 0 }
      existingData.dms += engagement._count.id
      engagementMap.set(date, existingData)
    })

    // Process commentData
    dashboardData.commentData.forEach((comment) => {
      const date = new Date(comment.Automation.createdAt).toISOString().split("T")[0]
      const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0, likes: 0 }
      existingData.comments += comment.commentCount
      engagementMap.set(date, existingData)
    })

    // Convert map to array and sort by date
    return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
  }

  const filteredData = data.slice(-timeRange)

  const totalEngagement = filteredData.reduce((acc, day) => acc + day.dms + day.comments + day.likes, 0)

  const maxValue = Math.max(...filteredData.map((day) => Math.max(day.dms, day.comments, day.likes)))

  const getHeight = (value: number) => (value / maxValue) * 100

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Engagement Pulse</span>
          <div className="flex items-center space-x-2">
            <Button
              variant={focusMetric === "dms" ? "default" : "outline"}
              size="sm"
              onClick={() => setFocusMetric("dms")}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              DMs
            </Button>
            <Button
              variant={focusMetric === "comments" ? "default" : "outline"}
              size="sm"
              onClick={() => setFocusMetric("comments")}
            >
              <Activity className="w-4 h-4 mr-1" />
              Comments
            </Button>
            <Button
              variant={focusMetric === "likes" ? "default" : "outline"}
              size="sm"
              onClick={() => setFocusMetric("likes")}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Likes
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div className="text-center py-10">Loading engagement data...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}
        {!loading && !error && (
          <>
            <div className="flex items-end space-x-1 h-64 mb-4">
              <AnimatePresence>
                {filteredData.map((day, index) => (
                  <motion.div
                    key={day.date}
                    className="flex-1 bg-primary/10 rounded-t relative group"
                    initial={{ height: 0 }}
                    animate={{ height: `${getHeight(day[focusMetric])}%` }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-primary"
                      initial={{ height: 0 }}
                      animate={{ height: `${getHeight(day[focusMetric])}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-background text-foreground px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs whitespace-nowrap">
                      {day.date}: {day[focusMetric]}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">Time Range: {timeRange} days</div>
              <Slider
                value={[timeRange]}
                onValueChange={(value) => setTimeRange(value[0])}
                max={90}
                min={7}
                step={1}
                className="w-1/2"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-2xl font-bold flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                {totalEngagement}
              </div>
              <div className="text-sm text-muted-foreground">Total Engagement (Last {timeRange} Days)</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default EngagementPulse

