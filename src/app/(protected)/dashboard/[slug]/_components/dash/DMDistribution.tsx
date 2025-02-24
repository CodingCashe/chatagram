"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { EngagementData } from "@/types/dashboard"

interface DMDistributionProps {
  data: EngagementData[]
}

const DMDistribution: React.FC<DMDistributionProps> = ({ data }) => {
  const distributionData = useMemo(() => {
    const counts: { [key: string]: number } = {
      "1-10": 0,
      "11-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41+": 0,
    }

    data.forEach((day) => {
      if (day.dms <= 10) counts["1-10"]++
      else if (day.dms <= 20) counts["11-20"]++
      else if (day.dms <= 30) counts["21-30"]++
      else if (day.dms <= 40) counts["31-40"]++
      else counts["41+"]++
    })

    return Object.entries(counts).map(([range, count]) => ({ range, count }))
  }, [data])

  return (
    <Card className="bg-background/50 border-primary/20">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">DM Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distributionData}>
            <XAxis
              dataKey="range"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              itemStyle={{ color: "hsl(var(--primary))" }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DMDistribution

