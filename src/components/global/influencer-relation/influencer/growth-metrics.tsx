"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Activity, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getInfluencerMetrics } from "@/actions/influencer-relations/influencer"

export function GrowthMetrics() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("followers")

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { status, data, message } = await getInfluencerMetrics()

        if (status === 200 && data) {
          // Transform metrics data for chart
          const chartData =
            data.metrics?.map((metric: any) => ({
              date: new Date(metric.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              followers: metric.followers,
              engagement: metric.engagementRate,
              views: metric.profileViews,
            })) || []

          setMetrics(chartData)
        } else {
          setError(message || "Failed to load metrics")
        }
      } catch (err) {
        setError("An error occurred while fetching metrics")
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const getDataKey = () => {
    switch (activeTab) {
      case "followers":
        return "followers"
      case "engagement":
        return "engagement"
      case "views":
        return "views"
      default:
        return "followers"
    }
  }

  const getIcon = () => {
    switch (activeTab) {
      case "followers":
        return <Users className="h-4 w-4" />
      case "engagement":
        return <Activity className="h-4 w-4" />
      case "views":
        return <Eye className="h-4 w-4" />
      default:
        return <TrendingUp className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Your growth over time</CardDescription>
          </div>
          <div className="rounded-full bg-primary/10 p-1.5">{getIcon()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="followers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="views">Views</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="h-[150px]">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
                {error}
              </div>
            ) : metrics.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      if (activeTab === "followers" || activeTab === "views") {
                        return value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value
                      }
                      return `${value}%`
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey={getDataKey()}
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
