"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format, parseISO } from "date-fns"
import type { EngagementData } from "@/types/dashboard"

interface DMTimelineProps {
  data: EngagementData[]
}

const DMTimeline: React.FC<DMTimelineProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    date: format(parseISO(item.date), "MMM dd"),
  }))

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">DM Activity Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorDms" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
            <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
              labelStyle={{ color: "#e5e7eb" }}
              itemStyle={{ color: "#8884d8" }}
            />
            <Area type="monotone" dataKey="dms" stroke="#8884d8" fillOpacity={1} fill="url(#colorDms)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DMTimeline

