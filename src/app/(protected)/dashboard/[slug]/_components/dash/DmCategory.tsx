"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { EngagementData } from "@/types/dashboard"

interface DMCategoryBreakdownProps {
  data: EngagementData[]
}

const DMCategoryBreakdown: React.FC<DMCategoryBreakdownProps> = ({ data }) => {
  const categoryData = useMemo(() => {
    // Simulating category data
    const categories = ["General", "Support", "Sales", "Feedback", "Other"]
    const totalDMs = data.reduce((sum, day) => sum + day.dms, 0)

    return categories
      .map((category) => ({
        name: category,
        value: Math.floor(Math.random() * totalDMs * 0.5), // Random distribution
      }))
      .sort((a, b) => b.value - a.value) // Sort by value descending
  }, [data])

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">DM Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
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

export default DMCategoryBreakdown

