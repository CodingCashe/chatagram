// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { getPlatformInsights } from "../actions"
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts"

// export function PlatformInsights() {
//   const [activeTab, setActiveTab] = useState<"growth" | "engagement" | "retention">("growth")
//   const [data, setData] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true)
//         const insights = await getPlatformInsights(activeTab)
//         setData(insights)
//       } catch (error) {
//         console.error(`Error fetching ${activeTab} insights:`, error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [activeTab])

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

//   const renderGrowthChart = () => {
//     if (!data?.growthData) return <div className="h-[300px] flex items-center justify-center">No data available</div>

//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data.growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
//           <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
//           <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "var(--background)",
//               borderColor: "var(--border)",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           />
//           <Legend />
//           <Line type="monotone" dataKey="users" stroke="#0088FE" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 8 }} />
//           <Line
//             type="monotone"
//             dataKey="subscriptions"
//             stroke="#00C49F"
//             strokeWidth={2}
//             dot={{ r: 3 }}
//             activeDot={{ r: 8 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="automations"
//             stroke="#FFBB28"
//             strokeWidth={2}
//             dot={{ r: 3 }}
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     )
//   }

//   const renderEngagementChart = () => {
//     if (!data?.engagementData)
//       return <div className="h-[300px] flex items-center justify-center">No data available</div>

//     return (
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data.engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
//           <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
//           <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "var(--background)",
//               borderColor: "var(--border)",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           />
//           <Legend />
//           <Bar dataKey="activeUsers" fill="#0088FE" radius={[4, 4, 0, 0]} />
//           <Bar dataKey="messagesSent" fill="#00C49F" radius={[4, 4, 0, 0]} />
//           <Bar dataKey="automationTriggers" fill="#FFBB28" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     )
//   }

//   const renderRetentionChart = () => {
//     if (!data?.retentionData) return <div className="h-[300px] flex items-center justify-center">No data available</div>

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px]">
//         <div className="flex flex-col justify-center">
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={data.retentionData.userTypes}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//               >
//                 {data.retentionData.userTypes.map((entry: any, index: number) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "var(--background)",
//                   borderColor: "var(--border)",
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="text-center text-sm font-medium">User Retention by Type</div>
//         </div>
//         <div className="flex flex-col justify-center">
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={data.retentionData.churnReasons}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//               >
//                 {data.retentionData.churnReasons.map((entry: any, index: number) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "var(--background)",
//                   borderColor: "var(--border)",
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="text-center text-sm font-medium">Churn Reasons</div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Platform Insights</CardTitle>
//         <CardDescription>Visualized data to help you understand platform performance</CardDescription>
//         <Tabs defaultValue="growth" className="mt-2" onValueChange={(value) => setActiveTab(value as any)}>
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="growth">Growth</TabsTrigger>
//             <TabsTrigger value="engagement">Engagement</TabsTrigger>
//             <TabsTrigger value="retention">Retention</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="h-[300px] flex items-center justify-center">Loading insights...</div>
//         ) : (
//           <TabsContent value="growth" className="mt-0">
//             {renderGrowthChart()}
//           </TabsContent>
//         )}
//         {!loading && (
//           <>
//             <TabsContent value="engagement" className="mt-0">
//               {renderEngagementChart()}
//             </TabsContent>
//             <TabsContent value="retention" className="mt-0">
//               {renderRetentionChart()}
//             </TabsContent>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getPlatformInsights } from "../actions"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function PlatformInsights() {
  const [activeTab, setActiveTab] = useState<"growth" | "engagement" | "retention">("growth")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const insights = await getPlatformInsights(activeTab)
        setData(insights)
      } catch (error) {
        console.error(`Error fetching ${activeTab} insights:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const renderGrowthChart = () => {
    if (!data?.growthData) return <div className="h-[300px] flex items-center justify-center">No data available</div>

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          <Line type="monotone" dataKey="users" stroke="#0088FE" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 8 }} />
          <Line
            type="monotone"
            dataKey="subscriptions"
            stroke="#00C49F"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="automations"
            stroke="#FFBB28"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const renderEngagementChart = () => {
    if (!data?.engagementData)
      return <div className="h-[300px] flex items-center justify-center">No data available</div>

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          <Bar dataKey="activeUsers" fill="#0088FE" radius={[4, 4, 0, 0]} />
          <Bar dataKey="messagesSent" fill="#00C49F" radius={[4, 4, 0, 0]} />
          <Bar dataKey="automationTriggers" fill="#FFBB28" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  const renderRetentionChart = () => {
    if (!data?.retentionData) return <div className="h-[300px] flex items-center justify-center">No data available</div>

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px]">
        <div className="flex flex-col justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.retentionData.userTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.retentionData.userTypes.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center text-sm font-medium">User Retention by Type</div>
        </div>
        <div className="flex flex-col justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.retentionData.churnReasons}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.retentionData.churnReasons.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center text-sm font-medium">Churn Reasons</div>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Insights</CardTitle>
        <CardDescription>Visualized data to help you understand platform performance</CardDescription>
        <Tabs defaultValue="growth" className="mt-2" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
          </TabsList>
          {/* Move TabsContent inside the Tabs component */}
          <TabsContent value="growth" className="mt-0">
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">Loading insights...</div>
            ) : (
              renderGrowthChart()
            )}
          </TabsContent>
          <TabsContent value="engagement" className="mt-0">
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">Loading insights...</div>
            ) : (
              renderEngagementChart()
            )}
          </TabsContent>
          <TabsContent value="retention" className="mt-0">
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">Loading insights...</div>
            ) : (
              renderRetentionChart()
            )}
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent>{/* Content moved to TabsContent components above */}</CardContent>
    </Card>
  )
}

