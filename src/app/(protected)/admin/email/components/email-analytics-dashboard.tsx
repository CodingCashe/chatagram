// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { getEmailAnalytics } from "../../actions/email-actions"
// import { toast } from "@/hooks/use-toast"

// export function EmailAnalyticsDashboard() {
//   const [analytics, setAnalytics] = useState<any>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     async function loadAnalytics() {
//       setIsLoading(true)
//       const result = await getEmailAnalytics()
//       if (result.success) {
//         setAnalytics(result)
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to load email analytics",
//           variant: "destructive",
//         })
//       }
//       setIsLoading(false)
//     }

//     loadAnalytics()
//   }, [])

//   if (isLoading) {
//     return <p>Loading analytics...</p>
//   }

//   if (!analytics) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium">No analytics data available</h3>
//         <p className="text-muted-foreground mt-2">Start sending emails to see analytics data.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{analytics.statusCounts?.SENT || 0}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {analytics.statusCounts?.SENT
//                 ? (((analytics.statusCounts?.OPENED || 0) / analytics.statusCounts.SENT) * 100).toFixed(1)
//                 : 0}
//               %
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {analytics.statusCounts?.SENT
//                 ? (((analytics.statusCounts?.CLICKED || 0) / analytics.statusCounts.SENT) * 100).toFixed(1)
//                 : 0}
//               %
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{analytics.statusCounts?.SCHEDULED || 0}</div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium">Enhanced Analytics Coming Soon</h3>
//         <p className="text-muted-foreground mt-2">
//           We are working on adding detailed charts and analytics for your email campaigns.
//         </p>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { getEmailAnalyticse } from "../../actions/email-actions"
import { toast } from "@/hooks/use-toast"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function EmailAnalyticsDashboard() {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any>(null)
  const [timeframe, setTimeframe] = useState("7days")

  useEffect(() => {
    async function loadAnalytics() {
      setLoading(true)
      try {
        const result = await getEmailAnalyticse(timeframe)
        if (result.success) {
          setAnalytics(result.analytics || [])
        } else {
          toast({
            title: "Error",
            description: "Failed to load analytics",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error loading analytics:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [timeframe])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-medium">No analytics data available</h3>
        <p className="text-muted-foreground mt-2">Start sending emails to see analytics data here.</p>
      </div>
    )
  }

  // Convert timeData to format needed for charts
  const emailActivityData = analytics.timeData.labels.map((day: string, index: number) => ({
    name: day,
    sent: analytics.timeData.sent[index],
    opened: analytics.timeData.opened[index],
    clicked: analytics.timeData.clicked[index],
  }))

  // Data for engagement breakdown pie chart
  const engagementData = [
    {
      name: "Opened",
      value: analytics.overview.openedEmails - analytics.overview.clickedEmails,
      color: "hsl(var(--chart-1))",
    },
    { name: "Clicked", value: analytics.overview.clickedEmails, color: "hsl(var(--chart-2))" },
    {
      name: "Not Opened",
      value: analytics.overview.deliveredEmails - analytics.overview.openedEmails,
      color: "hsl(var(--chart-3))",
    },
  ]

  // Data for campaign performance chart
  const campaignData = analytics.campaigns.map((campaign: any) => ({
    name: campaign.name,
    openRate: campaign.openRate,
    clickRate: campaign.clickRate,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Performance</h2>
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalEmails.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.emailsGrowth > 0 ? "+" : ""}
              {analytics.overview.emailsGrowth}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.deliveryRate}%</div>
            <Progress value={analytics.overview.deliveryRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.openRate}%</div>
            <Progress value={analytics.overview.openRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.clickRate}%</div>
            <Progress value={analytics.overview.clickRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Email Activity</CardTitle>
            <CardDescription>Email performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sent: {
                  label: "Sent",
                  color: "hsl(var(--chart-1))",
                },
                opened: {
                  label: "Opened",
                  color: "hsl(var(--chart-2))",
                },
                clicked: {
                  label: "Clicked",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emailActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="sent" stroke="var(--color-sent)" strokeWidth={2} />
                  <Line type="monotone" dataKey="opened" stroke="var(--color-opened)" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicked" stroke="var(--color-clicked)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>How users interact with your emails</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Emails",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Performance metrics for your recent campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              openRate: {
                label: "Open Rate",
                color: "hsl(var(--chart-1))",
              },
              clickRate: {
                label: "Click Rate",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="openRate" fill="var(--color-openRate)" />
                <Bar dataKey="clickRate" fill="var(--color-clickRate)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

