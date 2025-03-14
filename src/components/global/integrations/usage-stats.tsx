// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { BarChart, LineChart } from "lucide-react"

// interface UsageStatsProps {
//   platform: string
//   userData?: any
// }

// export default function UsageStats({ platform, userData }: UsageStatsProps) {
//   const [period, setPeriod] = useState("week")

//   // Get real data if available
//   const integrationData = userData?.integrations?.find((i: any) =>
//     platform === "instagram" ? i.name === "INSTAGRAM" : i.name === "CRM",
//   )

//   // Generate data based on real metrics if available
//   const generateData = (days: number) => {
//     const baseValue = platform === "instagram" ? integrationData?.followersCount || 50 : 50

//     return Array.from({ length: days }, (_, i) => ({
//       day: i + 1,
//       messages: Math.floor(Math.random() * (baseValue / 5)) + 20,
//       engagement: Math.floor(Math.random() * (baseValue / 10)) + 10,
//     }))
//   }

//   const weekData = generateData(7)
//   const monthData = generateData(30)

//   const currentData = period === "week" ? weekData : monthData

//   // Find max values for scaling
//   const maxMessages = Math.max(...currentData.map((d) => d.messages))
//   const maxEngagement = Math.max(...currentData.map((d) => d.engagement))

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="mt-6"
//     >
//       <Card className="glassEffect">
//         <CardHeader className="pb-2">
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-lg">Usage Statistics</CardTitle>
//             <Tabs value={period} onValueChange={setPeriod} className="w-[180px]">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="week">Week</TabsTrigger>
//                 <TabsTrigger value="month">Month</TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="text-sm font-medium flex items-center">
//                   <BarChart className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
//                   {platform === "instagram" ? "Engagement Rate" : "Message Volume"}
//                 </h4>
//                 <span className="text-xs text-muted-foreground">
//                   Avg: {Math.round(currentData.reduce((acc, d) => acc + d.messages, 0) / currentData.length)}
//                 </span>
//               </div>
//               <div className="h-[150px] flex items-end space-x-1">
//                 {currentData.map((d, i) => (
//                   <div key={i} className="flex-1 flex flex-col items-center">
//                     <div
//                       className="w-full bg-blue-600 dark:bg-blue-700 rounded-t hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300"
//                       style={{ height: `${(d.messages / maxMessages) * 100}%` }}
//                     ></div>
//                     <span className="text-xs mt-1">
//                       {period === "week" ? ["M", "T", "W", "T", "F", "S", "S"][i] : i + 1}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="text-sm font-medium flex items-center">
//                   <LineChart className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
//                   {platform === "instagram" ? "Follower Growth" : "Response Time"}
//                 </h4>
//                 <span className="text-xs text-muted-foreground">
//                   Avg: {Math.round(currentData.reduce((acc, d) => acc + d.engagement, 0) / currentData.length)}
//                 </span>
//               </div>
//               <div className="h-[150px] relative">
//                 <svg
//                   width="100%"
//                   height="100%"
//                   viewBox={`0 0 ${currentData.length - 1} 100`}
//                   preserveAspectRatio="none"
//                 >
//                   <path
//                     d={`M0,${100 - (currentData[0].engagement / maxEngagement) * 100} ${currentData
//                       .slice(1)
//                       .map((d, i) => `L${i + 1},${100 - (d.engagement / maxEngagement) * 100}`)
//                       .join(" ")}`}
//                     fill="none"
//                     stroke="hsl(var(--primary))"
//                     strokeWidth="2"
//                     className="transition-all duration-500"
//                   />
//                   {currentData.map((d, i) => (
//                     <circle
//                       key={i}
//                       cx={i}
//                       cy={100 - (d.engagement / maxEngagement) * 100}
//                       r="2"
//                       fill="hsl(var(--primary))"
//                       className="transition-all duration-500"
//                     />
//                   ))}
//                 </svg>
//                 <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs">
//                   {period === "week"
//                     ? ["Mon", "Wed", "Fri", "Sun"].map((day, i) => <span key={i}>{day}</span>)
//                     : ["1", "10", "20", "30"].map((day, i) => <span key={i}>{day}</span>)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "lucide-react"

interface UsageStatsProps {
  platform: string
  userData?: any
}

export default function UsageStats({ platform, userData }: UsageStatsProps) {
  const [period, setPeriod] = useState("week")

  // Get real data if available
  let integrationData = null

  try {
    if (userData?.integrations && Array.isArray(userData.integrations)) {
      integrationData =
        userData.integrations.find(
          (i: any) => i && (platform === "instagram" ? i.name === "INSTAGRAM" : i.name === "CRM"),
        ) || null
    }
  } catch (error) {
    console.error("Error finding integration data:", error)
    integrationData = null
  }

  // Generate data based on real metrics if available
  const generateData = (days: number) => {
    const baseValue = platform === "instagram" && integrationData?.followersCount ? integrationData.followersCount : 50

    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      messages: Math.floor(Math.random() * (baseValue / 5)) + 20,
      engagement: Math.floor(Math.random() * (baseValue / 10)) + 10,
    }))
  }

  const weekData = generateData(7)
  const monthData = generateData(30)

  const currentData = period === "week" ? weekData : monthData

  // Find max values for scaling
  const maxMessages = Math.max(...currentData.map((d) => d.messages))
  const maxEngagement = Math.max(...currentData.map((d) => d.engagement))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6"
    >
      <Card className="glassEffect">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Usage Statistics</CardTitle>
            <Tabs value={period} onValueChange={setPeriod} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center">
                  <BarChart className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                  {platform === "instagram" ? "Engagement Rate" : "Message Volume"}
                </h4>
                <span className="text-xs text-muted-foreground">
                  Avg: {Math.round(currentData.reduce((acc, d) => acc + d.messages, 0) / currentData.length)}
                </span>
              </div>
              <div className="h-[150px] flex items-end space-x-1">
                {currentData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-600 dark:bg-blue-700 rounded-t hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300"
                      style={{ height: `${(d.messages / maxMessages) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">
                      {period === "week" ? ["M", "T", "W", "T", "F", "S", "S"][i] : i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center">
                  <LineChart className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
                  {platform === "instagram" ? "Follower Growth" : "Response Time"}
                </h4>
                <span className="text-xs text-muted-foreground">
                  Avg: {Math.round(currentData.reduce((acc, d) => acc + d.engagement, 0) / currentData.length)}
                </span>
              </div>
              <div className="h-[150px] relative">
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${currentData.length - 1} 100`}
                  preserveAspectRatio="none"
                >
                  <path
                    d={`M0,${100 - (currentData[0].engagement / maxEngagement) * 100} ${currentData
                      .slice(1)
                      .map((d, i) => `L${i + 1},${100 - (d.engagement / maxEngagement) * 100}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    className="transition-all duration-500"
                  />
                  {currentData.map((d, i) => (
                    <circle
                      key={i}
                      cx={i}
                      cy={100 - (d.engagement / maxEngagement) * 100}
                      r="2"
                      fill="hsl(var(--primary))"
                      className="transition-all duration-500"
                    />
                  ))}
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs">
                  {period === "week"
                    ? ["Mon", "Wed", "Fri", "Sun"].map((day, i) => <span key={i}>{day}</span>)
                    : ["1", "10", "20", "30"].map((day, i) => <span key={i}>{day}</span>)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

