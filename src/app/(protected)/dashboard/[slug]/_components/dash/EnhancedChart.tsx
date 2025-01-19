// 'use client'

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import React, { useState } from 'react'
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from 'recharts'

// const chartData = [
//   { month: 'January', desktop: 86, mobile: 78, tablet: 63 },
//   { month: 'February', desktop: 50, mobile: 65, tablet: 42 },
//   { month: 'March', desktop: 37, mobile: 52, tablet: 34 },
//   { month: 'April', desktop: 73, mobile: 89, tablet: 68 },
//   { month: 'May', desktop: 29, mobile: 41, tablet: 25 },
//   { month: 'June', desktop: 14, mobile: 23, tablet: 18 },
// ]

// const chartConfig = {
//   desktop: {
//     label: 'Desktop',
//     color: 'hsl(var(--chart-1))',
//   },
//   mobile: {
//     label: 'Mobile',
//     color: 'hsl(var(--chart-2))',
//   },
//   tablet: {
//     label: 'Tablet',
//     color: 'hsl(var(--chart-3))',
//   },
// }

// const EnhancedChart = () => {
//   const [timeRange, setTimeRange] = useState('6m')

//   return (
//     <Card className="border-none p-0">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>DM Interactions</CardTitle>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select time range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="1m">Last Month</SelectItem>
//             <SelectItem value="3m">Last 3 Months</SelectItem>
//             <SelectItem value="6m">Last 6 Months</SelectItem>
//             <SelectItem value="1y">Last Year</SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ResponsiveContainer height={300} width={'100%'}>
//           <ChartContainer config={chartConfig}>
//             <AreaChart
//               accessibilityLayer
//               data={chartData}
//               margin={{
//                 left: 12,
//                 right: 12,
//                 top: 20,
//                 bottom: 20,
//               }}
//             >
//               <defs>
//                 <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0}/>
//                 </linearGradient>
//                 <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0}/>
//                 </linearGradient>
//                 <linearGradient id="colorTablet" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--color-tablet)" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="var(--color-tablet)" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis
//                 dataKey="month"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 tickFormatter={(value) => value.slice(0, 3)}
//               />
//               <YAxis tickLine={false} axisLine={false} tickMargin={8} />
//               <ChartTooltip
//                 cursor={false}
//                 content={<ChartTooltipContent />}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="desktop"
//                 stackId="1"
//                 stroke="var(--color-desktop)"
//                 fillOpacity={1}
//                 fill="url(#colorDesktop)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="mobile"
//                 stackId="1"
//                 stroke="var(--color-mobile)"
//                 fillOpacity={1}
//                 fill="url(#colorMobile)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="tablet"
//                 stackId="1"
//                 stroke="var(--color-tablet)"
//                 fillOpacity={1}
//                 fill="url(#colorTablet)"
//               />
//             </AreaChart>
//           </ChartContainer>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }

// export default EnhancedChart


// 'use client'

// import { useQueryAutomations } from '@/hooks/user-queries'
// import { useState, useMemo } from 'react'
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from 'recharts'
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'

// enum LISTENERS {
//   SMARTAI = 'SMARTAI',
//   MESSAGE = 'MESSAGE'
// }

// interface Listener {
//   listener: LISTENERS
//   id: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   lastComment: string | null
//   lastDm: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Keyword {
//   id: string
//   word: string
//   automationId: string | null
// }

// interface AutomationDataItem {
//   id: string
//   name: string
//   createdAt: Date
//   active: boolean
//   listener: Listener | null
//   keywords: Keyword[]
//   userId: string | null
// }

// interface ChartDataPoint {
//   month: string
//   dms: number
//   comments: number
// }

// interface QueryResponse {
//   status: number
//   data: AutomationDataItem[]
// }

// const processChartData = (data: AutomationDataItem[] | undefined): ChartDataPoint[] => {
//   if (!data) return []
  
//   const monthlyData = data.reduce((acc: Record<string, { dms: number; comments: number }>, item: AutomationDataItem) => {
//     if (item.listener) {
//       const date = new Date(item.createdAt)
//       const month = date.toLocaleString('default', { month: 'long' })
      
//       if (!acc[month]) {
//         acc[month] = { dms: 0, comments: 0 }
//       }
      
//       acc[month].dms += item.listener.dmCount
//       acc[month].comments += item.listener.commentCount
//     }
//     return acc
//   }, {})

//   return Object.entries(monthlyData).map(([month, counts]) => ({
//     month,
//     dms: counts.dms,
//     comments: counts.comments,
//   }))
// }

// const chartConfig = {
//   dms: {
//     label: 'Direct Messages',
//     color: 'hsl(var(--chart-1))',
//   },
//   comments: {
//     label: 'Comments',
//     color: 'hsl(var(--chart-2))',
//   },
// }

// const EnhancedChart: React.FC = () => {
//   const [timeRange, setTimeRange] = useState<string>('6m')
//   const { data } = useQueryAutomations() as { data: QueryResponse | undefined }
//   const chartData = useMemo(() => processChartData(data?.data), [data])

//   return (
//     <Card className="border-none p-0">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>Engagement Overview</CardTitle>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select time range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="1m">Last Month</SelectItem>
//             <SelectItem value="3m">Last 3 Months</SelectItem>
//             <SelectItem value="6m">Last 6 Months</SelectItem>
//             <SelectItem value="1y">Last Year</SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ChartContainer config={chartConfig} className="h-[300px]">
//           <ResponsiveContainer width={'100%'} height="100%">
//             <AreaChart
//               data={chartData}
//               margin={{
//                 left: 12,
//                 right: 12,
//                 top: 20,
//                 bottom: 20,
//               }}
//             >
//               <defs>
//                 <linearGradient id="colorDms" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--color-dms)" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="var(--color-dms)" stopOpacity={0}/>
//                 </linearGradient>
//                 <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--color-comments)" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="var(--color-comments)" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis
//                 dataKey="month"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={8}
//                 tickFormatter={(value: string) => value.slice(0, 3)}
//               />
//               <YAxis tickLine={false} axisLine={false} tickMargin={8} />
//               <ChartTooltip content={<ChartTooltipContent />} />
//               <Area
//                 type="monotone"
//                 dataKey="dms"
//                 stackId="1"
//                 stroke="var(--color-dms)"
//                 fillOpacity={1}
//                 fill="url(#colorDms)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="comments"
//                 stackId="2"
//                 stroke="var(--color-comments)"
//                 fillOpacity={1}
//                 fill="url(#colorComments)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

// export default EnhancedChart


// 'use client'

// import { useState, useMemo } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
// import { Toggle } from '@/components/ui/toggle'
// import { useQueryAutomations } from '@/hooks/user-queries'
// import { motion, AnimatePresence } from 'framer-motion'

// enum LISTENERS {
//   SMARTAI = 'SMARTAI',
//   MESSAGE = 'MESSAGE'
// }

// interface Listener {
//   listener: LISTENERS
//   id: string
//   automationId: string
//   prompt: string
//   commentReply: string | null
//   lastComment: string | null
//   lastDm: string | null
//   dmCount: number
//   commentCount: number
// }

// interface Keyword {
//   id: string
//   word: string
//   automationId: string | null
// }

// interface AutomationDataItem {
//   id: string
//   name: string
//   createdAt: Date
//   active: boolean
//   listener: Listener | null
//   keywords: Keyword[]
//   userId: string | null
// }

// interface ChartDataPoint {
//   month: string
//   dms: number
//   comments: number
// }

// interface QueryResponse {
//   status: number
//   data: AutomationDataItem[]
// }

// const processChartData = (data: AutomationDataItem[] | undefined): ChartDataPoint[] => {
//   if (!data) return []
  
//   const monthlyData = data.reduce((acc: Record<string, { dms: number; comments: number }>, item: AutomationDataItem) => {
//     if (item.listener) {
//       const date = new Date(item.createdAt)
//       const month = date.toLocaleString('default', { month: 'short' })
      
//       if (!acc[month]) {
//         acc[month] = { dms: 0, comments: 0 }
//       }
      
//       acc[month].dms += item.listener.dmCount
//       acc[month].comments += item.listener.commentCount
//     }
//     return acc
//   }, {})

//   return Object.entries(monthlyData).map(([month, counts]) => ({
//     month,
//     dms: Math.round(counts.dms),
//     comments: Math.round(counts.comments),
//   }))
// }

// const chartConfig = {
//   dms: {
//     label: 'Direct Messages',
//     color: 'hsl(var(--chart-1))',
//   },
//   comments: {
//     label: 'Comments',
//     color: 'hsl(var(--chart-2))',
//   },
// }

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-background border border-border p-2 rounded-md shadow-lg">
//         <p className="font-bold">{label}</p>
//         <p className="text-chart-1">DMs: {payload[0].value}</p>
//         <p className="text-chart-2">Comments: {payload[1].value}</p>
//       </div>
//     )
//   }
//   return null
// }

// const EnhancedChart: React.FC = () => {
//   const [timeRange, setTimeRange] = useState<string>('6m')
//   const [viewMode, setViewMode] = useState<'both' | 'dms' | 'comments'>('both')
//   const { data } = useQueryAutomations() as { data: QueryResponse | undefined }
//   const chartData = useMemo(() => processChartData(data?.data), [data])

//   const filteredChartData = useMemo(() => {
//     const now = new Date()
//     const monthsAgo = new Date(now.setMonth(now.getMonth() - parseInt(timeRange)))
//     return chartData.filter(item => new Date(item.month) >= monthsAgo)
//   }, [chartData, timeRange])

//   const maxValue = useMemo(() => {
//     return Math.max(...filteredChartData.map(item => Math.max(item.dms, item.comments)))
//   }, [filteredChartData])

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
//         <CardTitle>Engagement Overview</CardTitle>
//         <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//           <Select value={timeRange} onValueChange={setTimeRange}>
//             <SelectTrigger className="w-[140px]">
//               <SelectValue placeholder="Select time range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="1m">Last Month</SelectItem>
//               <SelectItem value="3m">Last 3 Months</SelectItem>
//               <SelectItem value="6m">Last 6 Months</SelectItem>
//               <SelectItem value="12m">Last Year</SelectItem>
//             </SelectContent>
//           </Select>
//           <div className="flex space-x-1">
//             <Toggle pressed={viewMode === 'both' || viewMode === 'dms'} onPressedChange={() => setViewMode(prev => prev === 'dms' ? 'both' : 'dms')}>
//               DMs
//             </Toggle>
//             <Toggle pressed={viewMode === 'both' || viewMode === 'comments'} onPressedChange={() => setViewMode(prev => prev === 'comments' ? 'both' : 'comments')}>
//               Comments
//             </Toggle>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <ChartContainer config={chartConfig} className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={filteredChartData}
//               margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="month" tickLine={false} axisLine={false} />
//               <YAxis tickLine={false} axisLine={false} domain={[0, maxValue]} tickCount={5} />
//               <ChartTooltip content={<CustomTooltip />} />
//               <AnimatePresence>
//                 {(viewMode === 'both' || viewMode === 'dms') && (
//                   <Bar dataKey="dms" fill={chartConfig.dms.color} animationDuration={300}>
//                     {filteredChartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fillOpacity={0.8} />
//                     ))}
//                   </Bar>
//                 )}
//                 {(viewMode === 'both' || viewMode === 'comments') && (
//                   <Bar dataKey="comments" fill={chartConfig.comments.color} animationDuration={300}>
//                     {filteredChartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fillOpacity={0.8} />
//                     ))}
//                   </Bar>
//                 )}
//               </AnimatePresence>
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

// export default EnhancedChart

'use client'

import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Toggle } from '@/components/ui/toggle'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'

enum LISTENERS {
  SMARTAI = 'SMARTAI',
  MESSAGE = 'MESSAGE'
}

interface Listener {
  listener: LISTENERS
  id: string
  automationId: string
  prompt: string
  commentReply: string | null
  lastComment: string | null
  lastDm: string | null
  dmCount: number
  commentCount: number
}

interface Keyword {
  id: string
  word: string
  automationId: string | null
}

interface AutomationDataItem {
  id: string
  name: string
  createdAt: Date
  active: boolean
  listener: Listener | null
  keywords: Keyword[]
  userId: string | null
}

interface ChartDataPoint {
  month: string
  dms: number
  comments: number
}

interface QueryResponse {
  automations: AutomationDataItem[]
}

const processChartData = (data: AutomationDataItem[] | undefined): ChartDataPoint[] => {
  if (!data) return []
  
  const monthlyData = data.reduce((acc: Record<string, { dms: number; comments: number }>, item: AutomationDataItem) => {
    if (item.listener) {
      const date = new Date(item.createdAt)
      const month = date.toLocaleString('default', { month: 'short' })
      
      if (!acc[month]) {
        acc[month] = { dms: 0, comments: 0 }
      }
      
      acc[month].dms += item.listener.dmCount
      acc[month].comments += item.listener.commentCount
    }
    return acc
  }, {})

  return Object.entries(monthlyData).map(([month, counts]) => ({
    month,
    dms: Math.round(counts.dms),
    comments: Math.round(counts.comments),
  }))
}

const chartConfig = {
  dms: {
    label: 'Direct Messages',
    color: 'hsl(var(--chart-1))',
  },
  comments: {
    label: 'Comments',
    color: 'hsl(var(--chart-2))',
  },
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-chart-1">DMs: {payload[0].value}</p>
        <p className="text-chart-2">Comments: {payload[1].value}</p>
      </div>
    )
  }
  return null
}

const EnhancedChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('6m')
  const [viewMode, setViewMode] = useState<'both' | 'dms' | 'comments'>('both')
  
  const { data } = useQuery<QueryResponse>({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard')
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      return response.json()
    },
  })

  const chartData = useMemo(() => processChartData(data?.automations), [data])

  const filteredChartData = useMemo(() => {
    const now = new Date()
    const monthsAgo = new Date(now.setMonth(now.getMonth() - parseInt(timeRange)))
    return chartData.filter(item => new Date(item.month) >= monthsAgo)
  }, [chartData, timeRange])

  const maxValue = useMemo(() => {
    return Math.max(...filteredChartData.map(item => Math.max(item.dms, item.comments)))
  }, [filteredChartData])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Engagement Overview</CardTitle>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-1">
            <Toggle pressed={viewMode === 'both' || viewMode === 'dms'} onPressedChange={() => setViewMode(prev => prev === 'dms' ? 'both' : 'dms')}>
              DMs
            </Toggle>
            <Toggle pressed={viewMode === 'both' || viewMode === 'comments'} onPressedChange={() => setViewMode(prev => prev === 'comments' ? 'both' : 'comments')}>
              Comments
            </Toggle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredChartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} domain={[0, maxValue]} tickCount={5} />
              <ChartTooltip content={<CustomTooltip />} />
              <AnimatePresence>
                {(viewMode === 'both' || viewMode === 'dms') && (
                  <Bar dataKey="dms" fill={chartConfig.dms.color} animationDuration={300}>
                    {filteredChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={0.8} />
                    ))}
                  </Bar>
                )}
                {(viewMode === 'both' || viewMode === 'comments') && (
                  <Bar dataKey="comments" fill={chartConfig.comments.color} animationDuration={300}>
                    {filteredChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={0.8} />
                    ))}
                  </Bar>
                )}
              </AnimatePresence>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default EnhancedChart

