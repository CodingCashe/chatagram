"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
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

    return Object.entries(counts).map(([range, value]) => ({ range, value }))
  }, [data])

  const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">DM Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: "#9ca3af" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DMDistribution

