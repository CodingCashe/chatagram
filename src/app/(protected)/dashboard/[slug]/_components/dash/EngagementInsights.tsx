// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Calendar, TrendingUp, Zap } from "lucide-react"
// import { getDashboardDati } from "@/actions/dashboard/dashboard"
// import EngagementHeatmap from "./EngagementHeatmap"
// import EngagementTrends from "./EngagementTrends"
// import EngagementInsightPanel from "./EngagementInsightPanel"
// import ClientOnly from "./ClientOnly"

// interface EngagementData {
//   date: string
//   dms: number
//   comments: number
// }

// const EngagementInsights: React.FC<{ userId: string }> = ({ userId }) => {
//   const [data, setData] = useState<EngagementData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const dashboardData = await getDashboardDati(userId)
//         const processedData = processEngagementData(dashboardData)
//         setData(processedData)
//       } catch (err) {
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [userId])

//   const processEngagementData = (dashboardData: any): EngagementData[] => {
//     const engagementMap = new Map<string, EngagementData>()

//     // Process engagementData (DMs)
//     dashboardData.engagementData?.forEach((engagement: any) => {
//       const date = new Date(engagement.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.dms += engagement._count?.id || 0
//       engagementMap.set(date, existingData)
//     })

//     // Process commentData
//     dashboardData.commentData?.forEach((comment: any) => {
//       const date = new Date(comment.Automation?.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.comments += comment.commentCount || 0
//       engagementMap.set(date, existingData)
//     })

//     // Convert map to array and sort by date
//     return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
//   }

//   if (loading) {
//     return <div className="text-center py-10">Loading engagement insights...</div>
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-10">{error}</div>
//   }

//   if (data.length === 0) {
//     return <div className="text-center py-10">No engagement data available.</div>
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle>Engagement Insights</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="heatmap">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="heatmap">
//               <Calendar className="w-4 h-4 mr-2" />
//               Heatmap
//             </TabsTrigger>
//             <TabsTrigger value="trends">
//               <TrendingUp className="w-4 h-4 mr-2" />
//               Trends
//             </TabsTrigger>
//             <TabsTrigger value="insights">
//               <Zap className="w-4 h-4 mr-2" />
//               Insights
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="heatmap">
//             <ClientOnly>
//               <EngagementHeatmap data={data} />
//             </ClientOnly>
//           </TabsContent>
//           <TabsContent value="trends">
//             <EngagementTrends data={data} />
//           </TabsContent>
//           <TabsContent value="insights">
//             <ClientOnly>
//               <EngagementInsightPanel data={data} />
//             </ClientOnly>
//           </TabsContent>
//         </Tabs>
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
// import { Calendar, TrendingUp, Zap } from "lucide-react"
// import { getDashboardDati } from "@/actions/dashboard/dashboard"
// import EngagementHeatmap from "./EngagementHeatmap"
// import EngagementTrends from "./EngagementTrends"
// import EngagementInsightPanel from "./EngagementInsightPanel"
// import ClientOnly from "./ClientOnly"

// interface EngagementData {
//   date: string
//   dms: number
//   comments: number
// }

// const EngagementInsights: React.FC<{ userId: string }> = ({ userId }) => {
//   const [data, setData] = useState<EngagementData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const dashboardData = await getDashboardDati(userId)
//         const processedData = processEngagementData(dashboardData)
//         setData(processedData)
//       } catch (err) {
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [userId])

//   const processEngagementData = (dashboardData: any): EngagementData[] => {
//     const engagementMap = new Map<string, EngagementData>()

//     // Process engagementData (DMs)
//     dashboardData.engagementData?.forEach((engagement: any) => {
//       const date = new Date(engagement.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.dms += engagement._count?.id || 0
//       engagementMap.set(date, existingData)
//     })

//     // Process commentData
//     dashboardData.commentData?.forEach((comment: any) => {
//       const date = new Date(comment.Automation?.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.comments += comment.commentCount || 0
//       engagementMap.set(date, existingData)
//     })

//     // Convert map to array and sort by date
//     return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
//   }

//   if (loading) {
//     return <div className="text-center py-10">Loading engagement insights...</div>
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-10">{error}</div>
//   }

//   if (data.length === 0) {
//     return <div className="text-center py-10">No engagement data available.</div>
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl sm:text-2xl">Engagement Insights</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="heatmap" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 mb-4">
//             <TabsTrigger value="heatmap" className="text-xs sm:text-sm">
//               <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Heatmap</span>
//               <span className="sm:hidden">Heat</span>
//             </TabsTrigger>
//             <TabsTrigger value="trends" className="text-xs sm:text-sm">
//               <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Trends</span>
//               <span className="sm:hidden">Trend</span>
//             </TabsTrigger>
//             <TabsTrigger value="insights" className="text-xs sm:text-sm">
//               <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Insights</span>
//               <span className="sm:hidden">Insight</span>
//             </TabsTrigger>
//           </TabsList>
//           <div className="mt-4 sm:mt-6">
//             <TabsContent value="heatmap">
//               <ClientOnly>
//                 <EngagementHeatmap data={data} />
//               </ClientOnly>
//             </TabsContent>
//             <TabsContent value="trends">
//               <EngagementTrends data={data} />
//             </TabsContent>
//             <TabsContent value="insights">
//               <ClientOnly>
//                 <EngagementInsightPanel data={data} />
//               </ClientOnly>
//             </TabsContent>
//           </div>
//         </Tabs>
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
// import { Star, TrendingUp, Zap } from "lucide-react"
// import { getDashboardDati } from "@/actions/dashboard/dashboard"
// import EngagementGalaxy from "./engagementGalaxy"
// import EngagementTrends from "./EngagementTrends"
// import EngagementInsightPanel from "./EngagementInsightPanel"
// import ClientOnly from "./ClientOnly"

// interface EngagementData {
//   date: string
//   dms: number
//   comments: number
// }
                                                
// const EngagementInsights: React.FC<{ userId: string }> = ({ userId }) => {
//   const [data, setData] = useState<EngagementData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const dashboardData = await getDashboardDati(userId)
//         const processedData = processEngagementData(dashboardData)
//         setData(processedData)
//       } catch (err) {
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [userId])

//   const processEngagementData = (dashboardData: any): EngagementData[] => {
//     const engagementMap = new Map<string, EngagementData>()

//     // Process engagementData (DMs)
//     dashboardData.engagementData?.forEach((engagement: any) => {
//       const date = new Date(engagement.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.dms += engagement._count?.id || 0
//       engagementMap.set(date, existingData)
//     })

//     // Process commentData
//     dashboardData.commentData?.forEach((comment: any) => {
//       const date = new Date(comment.Automation?.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.comments += comment.commentCount || 0
//       engagementMap.set(date, existingData)
//     })

//     // Convert map to array and sort by date
//     return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
//   }

//   if (loading) {
//     return <div className="text-center py-10">Loading engagement insights...</div>
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-10">{error}</div>
//   }

//   if (data.length === 0) {
//     return <div className="text-center py-10">No engagement data available.</div>
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl sm:text-2xl">Engagement Insights</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="trends" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 mb-4">
//             <TabsTrigger value="galaxy" className="text-xs sm:text-sm">
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Galaxy</span>
//               <span className="sm:hidden">Glxy</span>
//             </TabsTrigger>
//             <TabsTrigger value="trends" className="text-xs sm:text-sm">
//               <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Trends</span>
//               <span className="sm:hidden">Trend</span>
//             </TabsTrigger>
//             <TabsTrigger value="insights" className="text-xs sm:text-sm">
//               <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Insights</span>
//               <span className="sm:hidden">Insgt</span>
//             </TabsTrigger>
//           </TabsList>
//           <div className="mt-4 sm:mt-6">
//             <TabsContent value="galaxy">
//               <ClientOnly>
//                 <EngagementGalaxy data={data} />
//               </ClientOnly>
//             </TabsContent>
//             <TabsContent value="trends">
//               <EngagementTrends data={data} />
//             </TabsContent>
//             <TabsContent value="insights">
//               <ClientOnly>
//                 <EngagementInsightPanel data={data} />
//               </ClientOnly>
//             </TabsContent>
//           </div>
//         </Tabs>
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
//       const fetchedAutomations: Automation[] = await getAutomationsForUser()
//       setAutomations(
//         fetchedAutomations.map((automation) => ({
//           value: automation.id,
//           label: automation.name,
//         })),
//       )
//     }
//     fetchAutomations()
//   }, [])

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedAutomation) return

//       try {
//         setLoading(true)
//         const { engagementData, commentData } = await getEngagementDataForAutomation(selectedAutomation)
//         const processedData = processEngagementData(engagementData, commentData)
//         setData(processedData)
//       } catch (err) {
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [selectedAutomation])

//   const processEngagementData = (engagementData: any, commentData: any): EngagementData[] => {
//     const engagementMap = new Map<string, EngagementData>()

//     // Process engagementData (DMs)
//     engagementData?.forEach((engagement: any) => {
//       const date = new Date(engagement.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.dms += engagement._count?.id || 0
//       engagementMap.set(date, existingData)
//     })

//     // Process commentData
//     if (commentData) {
//       const date = new Date(commentData.Automation?.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.comments += commentData.commentCount || 0
//       engagementMap.set(date, existingData)
//     }

//     // Convert map to array and sort by date
//     return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
//   }

//   if (automations.length === 0) {
//     return <div className="text-center py-10">No automations available.</div>
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl sm:text-2xl">Engagement Insights</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Select onValueChange={setSelectedAutomation}>
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

//         {selectedAutomation ? (
//           loading ? (
//             <div className="text-center py-10">Loading engagement insights...</div>
//           ) : error ? (
//             <div className="text-center text-red-500 py-10">{error}</div>
//           ) : data.length === 0 ? (
//             <div className="text-center py-10">No engagement data available for this automation.</div>
//           ) : (
//             <Tabs defaultValue="trends" className="w-full">
//               <TabsList className="grid w-full grid-cols-3 mb-4">
//                 <TabsTrigger value="galaxy" className="text-xs sm:text-sm">
//                   <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   <span className="hidden sm:inline">Galaxy</span>
//                   <span className="sm:hidden">Glxy</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="trends" className="text-xs sm:text-sm">
//                   <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   <span className="hidden sm:inline">Trends</span>
//                   <span className="sm:hidden">Trend</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="insights" className="text-xs sm:text-sm">
//                   <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   <span className="hidden sm:inline">Insights</span>
//                   <span className="sm:hidden">Insgt</span>
//                 </TabsTrigger>
//               </TabsList>
//               <div className="mt-4 sm:mt-6">
//                 <TabsContent value="galaxy">
//                   <ClientOnly>
//                     <EngagementGalaxy data={data} />
//                   </ClientOnly>
//                 </TabsContent>
//                 <TabsContent value="trends">
//                   <EngagementTrends data={data} />
//                 </TabsContent>
//                 <TabsContent value="insights">
//                   <ClientOnly>
//                     <EngagementInsightPanel data={data} />
//                   </ClientOnly>
//                 </TabsContent>
//               </div>
//             </Tabs>
//           )
//         ) : (
//           <div className="text-center py-10">Please select an automation to view insights.</div>
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

//         // Automatically select the first automation if available
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
//         const processedData = processEngagementData(engagementData, commentData)
//         setData(processedData)
//       } catch (err) {
//         console.error("Error fetching engagement data:", err)
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [selectedAutomation])

//   const processEngagementData = (engagementData: any, commentData: any): EngagementData[] => {
//     const engagementMap = new Map<string, EngagementData>()

//     // Process engagementData (DMs)
//     engagementData?.forEach((engagement: any) => {
//       const date = new Date(engagement.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.dms += engagement._count?.id || 0
//       engagementMap.set(date, existingData)
//     })

//     // Process commentData
//     if (commentData) {
//       const date = new Date(commentData.Automation?.createdAt).toISOString().split("T")[0]
//       const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//       existingData.comments += commentData.commentCount || 0
//       engagementMap.set(date, existingData)
//     }

//     // Convert map to array and sort by date
//     return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
//   }

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
//         const processedData = processEngagementData(engagementData, commentData)
//         setData(processedData)
//       } catch (err) {
//         console.error("Error fetching engagement data:", err)
//         setError("Failed to fetch engagement data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [selectedAutomation])

//   const processEngagementData = (engagementData: any, commentData: any): EngagementData[] => {
//     const engagementMap = new Map<string, EngagementData>()

//     const parseDate = (dateString: string): string | null => {
//       const date = new Date(dateString)
//       return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0]
//     }

//     // Process engagementData (DMs)
//     engagementData?.forEach((engagement: any) => {
//       const date = parseDate(engagement.createdAt)
//       if (date) {
//         const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//         existingData.dms += engagement._count?.id || 0
//         engagementMap.set(date, existingData)
//       }
//     })

//     // Process commentData
//     if (commentData && commentData.Automation?.createdAt) {
//       const date = parseDate(commentData.Automation.createdAt)
//       if (date) {
//         const existingData = engagementMap.get(date) || { date, dms: 0, comments: 0 }
//         existingData.comments += commentData.commentCount || 0
//         engagementMap.set(date, existingData)
//       }
//     }

//     // Convert map to array and sort by date
//     return Array.from(engagementMap.values()).sort((a, b) => a.date.localeCompare(b.date))
//   }

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

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, TrendingUp, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAutomationsForUser, getEngagementDataForAutomation } from "@/actions/dashboard"
import EngagementGalaxy from "./engagementGalaxy"
import EngagementTrends from "./EngagementTrends"
import EngagementInsightPanel from "./EngagementInsightPanel"
import ClientOnly from "./ClientOnly"
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
        const { engagementData, commentData } = await getEngagementDataForAutomation(selectedAutomation)
        setData(engagementData)
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
    return <div className="text-center py-10">No automations available.</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Engagement Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedAutomation || undefined} onValueChange={setSelectedAutomation}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select an automation" />
          </SelectTrigger>
          <SelectContent>
            {automations.map((automation) => (
              <SelectItem key={automation.value} value={automation.value}>
                {automation.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {loading ? (
          <div className="text-center py-10">Loading engagement insights...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center py-10">No engagement data available for this automation.</div>
        ) : (
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="galaxy" className="text-xs sm:text-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Galaxy</span>
                <span className="sm:hidden">Glxy</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="text-xs sm:text-sm">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Trends</span>
                <span className="sm:hidden">Trend</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs sm:text-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Insights</span>
                <span className="sm:hidden">Insgt</span>
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 sm:mt-6">
              <TabsContent value="galaxy">
                <ClientOnly>
                  <EngagementGalaxy data={data} />
                </ClientOnly>
              </TabsContent>
              <TabsContent value="trends">
                <EngagementTrends data={data} />
              </TabsContent>
              <TabsContent value="insights">
                <ClientOnly>
                  <EngagementInsightPanel data={data} />
                </ClientOnly>
              </TabsContent>
            </div>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

export default EngagementInsights

