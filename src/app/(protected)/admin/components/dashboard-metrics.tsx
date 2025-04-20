"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { client } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { ArrowUpRight, Users, Mail, MessageSquare, Instagram } from "lucide-react"
import { onCurrentUser } from "@/actions/user"

interface MetricsData {
  totalUsers: number
  activeUsers: number
  userGrowth: number
  totalEmails: number
  emailsDelivered: number
  emailGrowth: number
  totalMessages: number
  messageGrowth: number
  totalInstagramAccounts: number
  instagramGrowth: number
}

async function getDashboardMetrics(): Promise<{ success: boolean; data?: MetricsData; error?: string }> {
  try {
    const currentUser = await onCurrentUser()

    const  userId  = currentUser.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if user is admin
    const isAdmin = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!isAdmin?.isAdmin) {
      return { success: false, error: "Unauthorized" }
    }

    // Get current date and date 30 days ago
    const now = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(now.getDate() - 60)

    // Get user metrics
    const [
      totalUsers,
      activeUsers,
      newUsers,
      previousPeriodUsers,
      totalEmails,
      emailsDelivered,
      previousPeriodEmails,
      totalMessages,
      previousPeriodMessages,
      totalInstagramAccounts,
      previousPeriodInstagramAccounts,
    ] = await Promise.all([
      // Total users
      client.user.count(),

      // Active users (logged in within last 30 days)
      client.user.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),

      // New users in last 30 days
      client.user.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),

      // Users created in previous 30 day period
      client.user.count({
        where: {
          createdAt: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),

      // Total emails
      client.email.count(),

      // Emails delivered
      client.email.count({
        where: {
          status: {
            in: ["SENT", "OPENED", "CLICKED"],
          },
        },
      }),

      // Emails in previous period
      client.email.count({
        where: {
          createdAt: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),

      // Total messages
      client.message.count(),

      // Messages in previous period
      client.message.count({
        where: {
          createdAt: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),

      // Total Instagram accounts
      client.integrations.count(),

      // Instagram accounts in previous period
      client.integrations.count({
        where: {
          createdAt: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),
    ])

    // Calculate growth percentages
    const userGrowth =
      previousPeriodUsers > 0 ? Math.round(((newUsers - previousPeriodUsers) / previousPeriodUsers) * 100) : 100

    const currentPeriodEmails = await client.email.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    })

    const emailGrowth =
      previousPeriodEmails > 0
        ? Math.round(((currentPeriodEmails - previousPeriodEmails) / previousPeriodEmails) * 100)
        : 100

    const currentPeriodMessages = await client.message.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    })

    const messageGrowth =
      previousPeriodMessages > 0
        ? Math.round(((currentPeriodMessages - previousPeriodMessages) / previousPeriodMessages) * 100)
        : 100

    const currentPeriodInstagramAccounts = await client.integrations.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    })

    const instagramGrowth =
      previousPeriodInstagramAccounts > 0
        ? Math.round(
            ((currentPeriodInstagramAccounts - previousPeriodInstagramAccounts) / previousPeriodInstagramAccounts) *
              100,
          )
        : 100

    return {
      success: true,
      data: {
        totalUsers,
        activeUsers,
        userGrowth,
        totalEmails,
        emailsDelivered,
        emailGrowth,
        totalMessages,
        messageGrowth,
        totalInstagramAccounts,
        instagramGrowth,
      },
    }
  } catch (error) {
    console.error("Error getting dashboard metrics:", error)
    return { success: false, error: "Failed to get dashboard metrics" }
  }
}

export function DashboardMetrics() {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [timeframe, setTimeframe] = useState("30days")

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true)
      try {
        const result = await getDashboardMetrics()
        if (result.success && result.data) {
          setMetrics(result.data)
        } else {
          console.error("Failed to load metrics:", result.error)
        }
      } catch (error) {
        console.error("Error loading metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [timeframe])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-[100px]" />
              </CardTitle>
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-1" />
              <Skeleton className="h-4 w-[100px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Failed to load metrics</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className={metrics.userGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                {metrics.userGrowth > 0 && "+"}
                {metrics.userGrowth}%
              </span>
              <ArrowUpRight className={`ml-1 h-3 w-3 ${metrics.userGrowth >= 0 ? "text-green-500" : "text-red-500"}`} />
              <span className="ml-1">from previous period</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Delivery</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.emailsDelivered.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className={metrics.emailGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                {metrics.emailGrowth > 0 && "+"}
                {metrics.emailGrowth}%
              </span>
              <ArrowUpRight
                className={`ml-1 h-3 w-3 ${metrics.emailGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
              />
              <span className="ml-1">from previous period</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className={metrics.messageGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                {metrics.messageGrowth > 0 && "+"}
                {metrics.messageGrowth}%
              </span>
              <ArrowUpRight
                className={`ml-1 h-3 w-3 ${metrics.messageGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
              />
              <span className="ml-1">from previous period</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instagram Accounts</CardTitle>
            <Instagram className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalInstagramAccounts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className={metrics.instagramGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                {metrics.instagramGrowth > 0 && "+"}
                {metrics.instagramGrowth}%
              </span>
              <ArrowUpRight
                className={`ml-1 h-3 w-3 ${metrics.instagramGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
              />
              <span className="ml-1">from previous period</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

