// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Star, TrendingUp, Zap } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { getAutomationsForUser, getEngagementDataForAutomation } from "@/actions/dashboard"
// import EngagementGalaxy from "./engagementGalaxy"
// import EngagementTrends from "./EngagementTrends"
// import EngagementInsightPanel from "./EngagementInsightPanel"
// import ClientOnly from "./ClientOnly"
// import type { AutomationOption, EngagementData, Automation } from "@/types/dashboard"

// const EngagementInsights: React.FC = () => {
//   const [automations, setAutomations] = useState<AutomationOption[]>([])
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
//   const [data, setData] = useState<EngagementData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchAutomations = async () => {
//       try {
//         const fetchedAutomations: Automation[] = await getAutomationsForUser()
//         const mappedAutomations = fetchedAutomations.map((automation) => ({
//           value: automation.id,
//           label: automation.name,
//         }))
//         setAutomations(mappedAutomations)

//         if (mappedAutomations.length > 0 && !selectedAutomation) {
//           setSelectedAutomation(mappedAutomations[0].value)
//         }
//       } catch (err) {
//         console.error("Error fetching automations:", err)
//         setError("Failed to fetch automations")
//       }
//     }
//     fetchAutomations()
//   }, [selectedAutomation])

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedAutomation) return

//       try {
//         setLoading(true)
//         setError(null)
//         const { engagementData, commentData } = await getEngagementDataForAutomation(selectedAutomation)
//         setData(engagementData)
//       } catch (err) {
//         console.error("Error fetching engagement data:", err)
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [selectedAutomation])

//   if (automations.length === 0) {
//     return <div className="text-center py-10">No automations available.</div>
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl sm:text-2xl">Engagement Insights</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Select value={selectedAutomation || undefined} onValueChange={setSelectedAutomation}>
//           <SelectTrigger className="w-full mb-4">
//             <SelectValue placeholder="Select an automation" />
//           </SelectTrigger>
//           <SelectContent>
//             {automations.map((automation) => (
//               <SelectItem key={automation.value} value={automation.value}>
//                 {automation.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {loading ? (
//           <div className="text-center py-10">Loading engagement insights...</div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-10">{error}</div>
//         ) : data.length === 0 ? (
//           <div className="text-center py-10">No engagement data available for this automation.</div>
//         ) : (
//           <Tabs defaultValue="trends" className="w-full">
//             <TabsList className="grid w-full grid-cols-3 mb-4">
//               <TabsTrigger value="galaxy" className="text-xs sm:text-sm">
//                 <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                 <span className="hidden sm:inline">Galaxy</span>
//                 <span className="sm:hidden">Glxy</span>
//               </TabsTrigger>
//               <TabsTrigger value="trends" className="text-xs sm:text-sm">
//                 <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                 <span className="hidden sm:inline">Trends</span>
//                 <span className="sm:hidden">Trend</span>
//               </TabsTrigger>
//               <TabsTrigger value="insights" className="text-xs sm:text-sm">
//                 <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                 <span className="hidden sm:inline">Insights</span>
//                 <span className="sm:hidden">Insgt</span>
//               </TabsTrigger>
//             </TabsList>
//             <div className="mt-4 sm:mt-6">
//               <TabsContent value="galaxy">
//                 <ClientOnly>
//                   <EngagementGalaxy data={data} />
//                 </ClientOnly>
//               </TabsContent>
//               <TabsContent value="trends">
//                 <EngagementTrends data={data} />
//               </TabsContent>
//               <TabsContent value="insights">
//                 <ClientOnly>
//                   <EngagementInsightPanel data={data} />
//                 </ClientOnly>
//               </TabsContent>
//             </div>
//           </Tabs>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// export default EngagementInsights

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { BarChart, Sparkles, Zap } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { getAutomationsForUser, getEngagementDataForAutomation } from "@/actions/dashboard"
// import EngagementTimeline from "./EngagementTimeline"
// import EngagementSparkles from "./EngagementSparkles"
// import EngagementInsightPanel from "./EngagementInsightPanel"
// import ClientOnly from "./ClientOnly"
// import type { AutomationOption, EngagementData, Automation } from "@/types/dashboard"

// const EngagementInsights: React.FC = () => {
//   const [automations, setAutomations] = useState<AutomationOption[]>([])
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
//   const [data, setData] = useState<EngagementData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchAutomations = async () => {
//       try {
//         const fetchedAutomations: Automation[] = await getAutomationsForUser()
//         const mappedAutomations = fetchedAutomations.map((automation) => ({
//           value: automation.id,
//           label: automation.name,
//         }))
//         setAutomations(mappedAutomations)

//         if (mappedAutomations.length > 0 && !selectedAutomation) {
//           setSelectedAutomation(mappedAutomations[0].value)
//         }
//       } catch (err) {
//         console.error("Error fetching automations:", err)
//         setError("Failed to fetch automations")
//       }
//     }
//     fetchAutomations()
//   }, [selectedAutomation])

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedAutomation) return

//       try {
//         setLoading(true)
//         setError(null)
//         const { engagementData } = await getEngagementDataForAutomation(selectedAutomation)
//         // Sort the data by date to ensure correct order
//         const sortedData = engagementData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//         setData(sortedData)
//       } catch (err) {
//         console.error("Error fetching engagement data:", err)
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [selectedAutomation])

//   if (automations.length === 0) {
//     return <div className="text-center py-10">No automations available.</div>
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl sm:text-2xl">Engagement Insights</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Select value={selectedAutomation || undefined} onValueChange={setSelectedAutomation}>
//           <SelectTrigger className="w-full mb-4">
//             <SelectValue placeholder="Select an automation" />
//           </SelectTrigger>
//           <SelectContent>
//             {automations.map((automation) => (
//               <SelectItem key={automation.value} value={automation.value}>
//                 {automation.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {loading ? (
//           <div className="text-center py-10">Loading engagement insights...</div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-10">{error}</div>
//         ) : data.length === 0 ? (
//           <div className="text-center py-10">No engagement data available for this automation.</div>
//         ) : (
//           <Tabs defaultValue="timeline" className="w-full">
//             <TabsList className="grid w-full grid-cols-3 mb-4">
//               <TabsTrigger value="timeline" className="text-xs sm:text-sm">
//                 <BarChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                 <span className="hidden sm:inline">Timeline</span>
//                 <span className="sm:hidden">Time</span>
//               </TabsTrigger>
//               <TabsTrigger value="sparkles" className="text-xs sm:text-sm">
//                 <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                 <span className="hidden sm:inline">Sparkles</span>
//                 <span className="sm:hidden">Spark</span>
//               </TabsTrigger>
//               <TabsTrigger value="insights" className="text-xs sm:text-sm">
//                 <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                 <span className="hidden sm:inline">Insights</span>
//                 <span className="sm:hidden">Insgt</span>
//               </TabsTrigger>
//             </TabsList>
//             <div className="mt-4 sm:mt-6">
//               <TabsContent value="timeline">
//                 <ClientOnly>
//                   <EngagementTimeline data={data} />
//                 </ClientOnly>
//               </TabsContent>
//               <TabsContent value="sparkles">
//                 <EngagementSparkles data={data} />
//               </TabsContent>
//               <TabsContent value="insights">
//                 <ClientOnly>
//                   <EngagementInsightPanel data={data} />
//                 </ClientOnly>
//               </TabsContent>
//             </div>
//           </Tabs>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// export default EngagementInsights

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, Zap, BarChart3 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAutomationsForUser, getEngagementDataForAutomation } from "@/actions/dashboard"
import DMHeatmap from "./DMHeatmap"
import DMPulse from "./DMPulse"
import DMInsights from "./DMInsights"
import type { AutomationOption, EngagementData, Automation } from "@/types/dashboard"

const EngagementInsights: React.FC = () => {
  const [automations, setAutomations] = useState<AutomationOption[]>([])
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
  const [data, setData] = useState<EngagementData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const fetchedAutomations: Automation[] = await getAutomationsForUser()
        const mappedAutomations = fetchedAutomations.map((automation) => ({
          value: automation.id,
          label: automation.name,
        }))
        setAutomations(mappedAutomations)

        if (mappedAutomations.length > 0 && !selectedAutomation) {
          setSelectedAutomation(mappedAutomations[0].value)
        }
      } catch (err) {
        console.error("Error fetching automations:", err)
        setError("Failed to fetch automations")
      }
    }
    fetchAutomations()
  }, [selectedAutomation])

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAutomation) return

      try {
        setLoading(true)
        setError(null)
        const { engagementData } = await getEngagementDataForAutomation(selectedAutomation)
        const sortedData: EngagementData[] = engagementData
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((day) => ({ date: day.date, dms: day.dms }))
        setData(sortedData)
      } catch (err) {
        console.error("Error fetching engagement data:", err)
        setError("Failed to fetch engagement data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedAutomation])

  if (automations.length === 0) {
    return <div className="text-center py-10 text-white">No automations available.</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">DM Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedAutomation || undefined} onValueChange={setSelectedAutomation}>
          <SelectTrigger className="w-full mb-4 bg-gray-800 border-gray-700">
            <SelectValue placeholder="Select an automation" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {automations.map((automation) => (
              <SelectItem key={automation.value} value={automation.value}>
                {automation.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {loading ? (
          <div className="text-center py-10">Loading DM insights...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center py-10">No DM data available for this automation.</div>
        ) : (
          <Tabs defaultValue="heatmap" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-800">
              <TabsTrigger value="heatmap" className="text-xs sm:text-sm data-[state=active]:bg-gray-700">
                <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Heatmap</span>
                <span className="sm:hidden">Heat</span>
              </TabsTrigger>
              <TabsTrigger value="pulse" className="text-xs sm:text-sm data-[state=active]:bg-gray-700">
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Pulse</span>
                <span className="sm:hidden">Pulse</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs sm:text-sm data-[state=active]:bg-gray-700">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Insights</span>
                <span className="sm:hidden">Insgt</span>
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 sm:mt-6">
              <TabsContent value="heatmap">
                <DMHeatmap data={data} />
              </TabsContent>
              <TabsContent value="pulse">
                <DMPulse data={data} />
              </TabsContent>
              <TabsContent value="insights">
                <DMInsights data={data} />
              </TabsContent>
            </div>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

export default EngagementInsights

