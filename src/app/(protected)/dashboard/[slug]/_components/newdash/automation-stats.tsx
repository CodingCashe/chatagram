"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface AutomationStat {
  automationId: string
  dmCount: number
  commentCount: number
}

export function AutomationStats({ stats }: { stats: AutomationStat[] }) {
  const data = stats.map((stat) => ({
    name: stat.automationId,
    DMs: stat.dmCount,
    Comments: stat.commentCount,
  }))

  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>Automation Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} labelStyle={{ color: "#fff" }} />
            <Bar dataKey="DMs" fill="#3B82F6" />
            <Bar dataKey="Comments" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

