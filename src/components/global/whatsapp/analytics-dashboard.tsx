"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AnalyticsDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          WhatsApp Analytics
        </CardTitle>
        <CardDescription>Track your WhatsApp messaging performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      12%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs. previous 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">342</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      8%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs. previous 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">94%</div>
                    <div className="flex items-center text-red-500 text-sm">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      2%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs. previous 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">4.2m</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      15%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">vs. previous 30 days</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Message Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                      <div className="text-xl font-bold">876</div>
                      <p className="text-xs text-muted-foreground">Text Messages</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Users className="h-8 w-8 mb-2 text-primary" />
                      <div className="text-xl font-bold">372</div>
                      <p className="text-xs text-muted-foreground">Automated Responses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">68%</div>
                      <p className="text-xs text-muted-foreground">Repeat Users</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold">3.4</div>
                      <p className="text-xs text-muted-foreground">Avg. Messages per User</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

