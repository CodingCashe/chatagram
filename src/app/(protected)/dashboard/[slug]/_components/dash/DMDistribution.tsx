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
      "0-10": 0,
      "11-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41+": 0,
    }

    data.forEach((day) => {
      if (day.dms <= 10) counts["0-10"]++
      else if (day.dms <= 20) counts["11-20"]++
      else if (day.dms <= 30) counts["21-30"]++
      else if (day.dms <= 40) counts["31-40"]++
      else counts["41+"]++
    })

    return Object.entries(counts).map(([range, count]) => ({ range, count }))
  }, [data])

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">DM Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distributionData}>
            <XAxis dataKey="range" stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
            <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
              labelStyle={{ color: "#e5e7eb" }}
              itemStyle={{ color: "#8884d8" }}
            />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DMDistribution

