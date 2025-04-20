"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingUp, Users, DollarSign, Eye } from "lucide-react"

const engagementData = [
  { name: "Jan", total: 2300 },
  { name: "Feb", total: 3400 },
  { name: "Mar", total: 2800 },
  { name: "Apr", total: 5600 },
  { name: "May", total: 4900 },
  { name: "Jun", total: 6800 },
  { name: "Jul", total: 7200 },
]

const revenueData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1800 },
  { name: "Mar", total: 2200 },
  { name: "Apr", total: 2600 },
  { name: "May", total: 3100 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4200 },
]

export function AnalyticsOverview() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Performance Overview</CardTitle>
        <CardDescription>Track your growth and engagement across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-emerald-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Followers</p>
                    <p className="text-2xl font-bold">+2,350</p>
                  </div>
                  <Users className="h-8 w-8 text-emerald-500" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-bold">4.6%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-violet-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                    <p className="text-2xl font-bold">128.5K</p>
                  </div>
                  <Eye className="h-8 w-8 text-violet-500" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-amber-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Growth</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold">12.5%</p>
                      <ArrowUpRight className="ml-1 h-4 w-4 text-emerald-500" />
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-emerald-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">$24,850</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-500" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Per Deal</p>
                    <p className="text-2xl font-bold">$3,450</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-violet-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">$8,750</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-violet-500" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-amber-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Growth</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold">18.2%</p>
                      <ArrowUpRight className="ml-1 h-4 w-4 text-emerald-500" />
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
