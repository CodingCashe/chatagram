// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { getAutomationTypeDistribution } from "../actions"

// export function AutomationStats() {
//   const [automationTypes, setAutomationTypes] = useState<
//     Array<{
//       name: string
//       count: number
//       percentage: number
//     }>
//   >([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true)
//         const data = await getAutomationTypeDistribution()
//         setAutomationTypes(data)
//       } catch (error) {
//         console.error("Error fetching automation types:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Automation Types</CardTitle>
//         <CardDescription>Distribution of automation types across the platform</CardDescription>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="flex justify-center p-4">Loading automation stats...</div>
//         ) : automationTypes.length === 0 ? (
//           <div className="flex justify-center p-4">No automation data available</div>
//         ) : (
//           <div className="space-y-4">
//             {automationTypes.map((type) => (
//               <div key={type.name} className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-primary"></div>
//                   <span>{type.name}</span>
//                   <Badge variant="outline" className="ml-2">
//                     {type.count}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-full bg-muted rounded-full h-2.5">
//                     <div className="bg-primary h-2.5 rounded-full" style={{ width: `${type.percentage}%` }}></div>
//                   </div>
//                   <span className="text-sm text-muted-foreground w-10 text-right">{type.percentage}%</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAutomationTypeDistribution } from "../actions"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function AutomationStats() {
  const [automationTypes, setAutomationTypes] = useState<
    Array<{
      name: string
      count: number
      percentage: number
    }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getAutomationTypeDistribution()
        setAutomationTypes(data)
      } catch (error) {
        console.error("Error fetching automation types:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Types</CardTitle>
        <CardDescription>Distribution of automation types across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading automation stats...</div>
        ) : automationTypes.length === 0 ? (
          <div className="flex justify-center p-4">No automation data available</div>
        ) : (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={automationTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {automationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string, props: any) => [
                    `${value} (${props.payload.percentage}%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2 mt-4">
              {automationTypes.map((type, index) => (
                <div key={type.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm">{type.name}</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      {type.count}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">{type.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

