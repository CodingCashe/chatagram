// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { getSubscriptionGrowthData } from "../actions"

// export function SubscriptionChart() {
//   const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">("weekly")
//   const [chartData, setChartData] = useState<{
//     labels: string[]
//     data: Array<{ label: string; total: number; pro: number }>
//   } | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true)
//         const data = await getSubscriptionGrowthData(activeTab)
//         setChartData(data)
//       } catch (error) {
//         console.error("Error fetching subscription data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [activeTab])

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Subscription Growth</CardTitle>
//         <CardDescription>New and upgraded subscriptions over time</CardDescription>
//         <Tabs
//           defaultValue="weekly"
//           className="mt-2"
//           onValueChange={(value) => setActiveTab(value as "weekly" | "monthly" | "yearly")}
//         >
//           <TabsList>
//             <TabsTrigger value="weekly">Weekly</TabsTrigger>
//             <TabsTrigger value="monthly">Monthly</TabsTrigger>
//             <TabsTrigger value="yearly">Yearly</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="h-[300px] w-full flex items-center justify-center">Loading chart data...</div>
//         ) : (
//           <div className="h-[300px] w-full">
//             <div className="flex h-full items-end gap-2 pb-4">
//               {chartData?.data.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center"
//                   style={{ width: `${100 / chartData.data.length}%` }}
//                 >
//                   <div
//                     className="bg-primary/90 w-full rounded-t-md"
//                     style={{
//                       height: `${item.total > 0 ? (item.total / Math.max(...chartData.data.map((d) => d.total))) * 70 : 0}%`,
//                     }}
//                   ></div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-between text-sm text-muted-foreground mt-2">
//               {chartData?.labels.map((label, index) => (
//                 <div key={index}>{label}</div>
//               ))}
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSubscriptionGrowthData } from "../actions"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function SubscriptionChart() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">("weekly")
  const [chartData, setChartData] = useState<{
    labels: string[]
    data: Array<{ date: string; total: number; pro: number; free: number }>
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getSubscriptionGrowthData(activeTab)
        setChartData(data)
      } catch (error) {
        console.error("Error fetching subscription data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Growth</CardTitle>
        <CardDescription>New and upgraded subscriptions over time</CardDescription>
        <Tabs
          defaultValue="weekly"
          className="mt-2"
          onValueChange={(value) => setActiveTab(value as "weekly" | "monthly" | "yearly")}
        >
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] w-full flex items-center justify-center">Loading chart data...</div>
        ) : !chartData || chartData.data.length === 0 ? (
          <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
            No subscription data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
              <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="pro"
                name="Pro"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="free"
                name="Free"
                stroke="#ffc658"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

