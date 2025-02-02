"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface FollowerGrowthChartProps {
  data: Array<{ date: string; followers: number | null }>
}

export function FollowerGrowthChart({ data }: FollowerGrowthChartProps) {
  if (data.length === 0) {
    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Follower Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No follower data available yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Follower Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background p-2 border rounded shadow">
                      <p className="font-bold">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                      <p>Followers: {payload[0].value?.toLocaleString() ?? "N/A"}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area type="monotone" dataKey="followers" stroke="#2563eb" fill="url(#colorGradient)" strokeWidth={2} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

