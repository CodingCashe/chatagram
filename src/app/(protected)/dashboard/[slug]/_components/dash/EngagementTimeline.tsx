"use client"

import type React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { format, subDays } from "date-fns"
import type { EngagementData } from "@/types/dashboard"

interface EngagementTimelineProps {
  data: EngagementData[]
}

const EngagementTimeline: React.FC<EngagementTimelineProps> = ({ data }) => {
  const today = new Date()
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(today, i)
    return format(date, "yyyy-MM-dd")
  }).reverse()

  const filledData = last30Days.map((date) => {
    const dayData = data.find((d) => d.date === date)
    return {
      date,
      dms: dayData?.dms || 0,
      comments: dayData?.comments || 0,
      total: (dayData?.dms || 0) + (dayData?.comments || 0),
    }
  })

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filledData}>
          <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM d")} interval={6} />
          <YAxis />
          <Tooltip
            labelFormatter={(value) => format(new Date(value), "MMMM d, yyyy")}
            formatter={(value, name) => [
              value,
              name === "total" ? "Total Engagements" : name === "dms" ? "DMs" : "Comments",
            ]}
          />
          <Legend />
          <Bar dataKey="dms" stackId="a" fill="#8884d8" name="DMs" />
          <Bar dataKey="comments" stackId="a" fill="#82ca9d" name="Comments" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EngagementTimeline

