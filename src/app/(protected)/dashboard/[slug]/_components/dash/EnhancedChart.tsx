"use client"

import { useState, useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Toggle } from "@/components/ui/toggle"
import { motion, AnimatePresence } from "framer-motion"
import { useQueryAutomations } from "@/hooks/user-queries"

interface ChartDataPoint {
  month: string
  dms: number
  comments: number
}

const chartConfig = {
  dms: {
    label: "Direct Messages",
    color: "hsl(var(--chart-1))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-2))",
  },
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-chart-1">DMs: {payload[0].value}</p>
        <p className="text-chart-2">Comments: {payload[1].value}</p>
      </div>
    )
  }
  return null
}

const processChartData = (automations: any[]): ChartDataPoint[] => {
  const monthlyData: Record<string, { dms: number; comments: number }> = {}

  automations.forEach((automation) => {
    const date = new Date(automation.createdAt)
    const month = date.toLocaleString("default", { month: "short" })
    if (!monthlyData[month]) {
      monthlyData[month] = { dms: 0, comments: 0 }
    }
    monthlyData[month].dms += automation.listener?.dmCount || 0
    monthlyData[month].comments += automation.listener?.commentCount || 0
  })

  return Object.entries(monthlyData).map(([month, counts]) => ({
    month,
    dms: counts.dms,
    comments: counts.comments,
  }))
}

const EnhancedChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("6m")
  const [viewMode, setViewMode] = useState<"both" | "dms" | "comments">("both")
  const { data: automationsData } = useQueryAutomations()

  const chartData = useMemo(() => {
    if (!automationsData?.data) return []
    return processChartData(automationsData.data)
  }, [automationsData])

  const filteredChartData = useMemo(() => {
    const now = new Date()
    const monthsAgo = new Date(now.setMonth(now.getMonth() - Number.parseInt(timeRange)))
    return chartData.filter((item) => new Date(item.month) >= monthsAgo)
  }, [chartData, timeRange])

  const maxValue = useMemo(() => {
    return Math.max(...filteredChartData.map((item) => Math.max(item.dms, item.comments)))
  }, [filteredChartData])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Engagement Overview</CardTitle>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-1">
            <Toggle
              pressed={viewMode === "both" || viewMode === "dms"}
              onPressedChange={() => setViewMode((prev) => (prev === "dms" ? "both" : "dms"))}
            >
              DMs
            </Toggle>
            <Toggle
              pressed={viewMode === "both" || viewMode === "comments"}
              onPressedChange={() => setViewMode((prev) => (prev === "comments" ? "both" : "comments"))}
            >
              Comments
            </Toggle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredChartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} domain={[0, maxValue]} tickCount={5} />
              <ChartTooltip content={<CustomTooltip />} />
              <AnimatePresence>
                {(viewMode === "both" || viewMode === "dms") && (
                  <Bar dataKey="dms" fill={chartConfig.dms.color} animationDuration={300}>
                    {filteredChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={0.8} />
                    ))}
                  </Bar>
                )}
                {(viewMode === "both" || viewMode === "comments") && (
                  <Bar dataKey="comments" fill={chartConfig.comments.color} animationDuration={300}>
                    {filteredChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={0.8} />
                    ))}
                  </Bar>
                )}
              </AnimatePresence>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default EnhancedChart

