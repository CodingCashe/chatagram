"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, TrendingUp, Zap } from "lucide-react"
import { getDashboardData } from "@/actions/dashboard/dashboard"
import EngagementHeatmap from "./EngagementHeatmap"
import dynamic from "next/dynamic"
import EngagementTrends from "./EngagementTrends"
import EngagementInsightPanel from "./EngagementInsightPanel"
import ClientOnly from "./ClientOnly"

interface EngagementData {
  date: string
  dms: number
  comments: number
}

const EngagementInsights: React.FC<{ userId: string }> = ({ userId }) => {
  const [data, setData] = useState<EngagementData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("heatmap")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dashboardData = await getDashboardData(userId)
        const processedData = processEngagementData(dashboardData)
        setData(processedData)
      } catch (err) {
        setError("Failed to fetch engagement data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const processEngagementData = (dashboardData: any): EngagementData[] => {
    const engagementMap = new Map<string, EngagementData>()

    // Process engagementData (DMs)
    dashboardData.engagementData?.forEach((engagement: any) => {
      const date = new Date(engagement.createdAt).toISOString().split("T")[0]
      const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
      existingData.dms += engagement._count?.id || 0
      engagementMap.set(date, existingData)
    })

    // Process commentData
    dashboardData.commentData?.forEach((comment: any) => {
      const date = new Date(comment.Automation?.createdAt).toISOString().split("T")[0]
      const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
      existingData.comments += comment.commentCount || 0
      engagementMap.set(date, existingData)
    })

    // Convert map to array and sort by date
    return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
  }

  if (loading) {
    return <div className="text-center py-10">Loading engagement insights...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>
  }

  if (data.length === 0) {
    return <div className="text-center py-10">No engagement data available.</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Engagement Insights</span>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="heatmap">
                <Calendar className="w-4 h-4 mr-2" />
                Heatmap
              </TabsTrigger>
              <TabsTrigger value="trends">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="insights">
                <Zap className="w-4 h-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="heatmap" className="mt-0">
              <ClientOnly>
                <EngagementHeatmap data={data} />
              </ClientOnly>
            </TabsContent>
            <TabsContent value="trends" className="mt-0">
              <EngagementTrends data={data} />
            </TabsContent>
            <TabsContent value="insights" className="mt-0">
              <ClientOnly>
                <EngagementInsightPanel data={data} />
              </ClientOnly>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default EngagementInsights

