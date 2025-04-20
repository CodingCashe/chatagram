"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MessageSquare,
  Bot,
  Zap,
  TrendingUp,
  Calendar,
  Clock,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Instagram,
} from "lucide-react"
import { motion } from "framer-motion"
import { getDashboardMetrics, getRecentAutomationActivity, getSystemStatus } from "../actions/dashboard-metrics"
import { useToast } from "@/hooks/use-toast"

type DashboardMetrics = {
  totalUsers: number
  activeUsers: number
  totalMessages: number
  messagesSentToday: number
  totalAutomations: number
  activeAutomations: number
  scheduledMessages: number
  averageResponseTime: number
  engagementRate: number
  conversionRate: number
}

type AutomationActivity = {
  id: string
  name: string
  type: string
  status: string
  lastTriggered: string
  messagesTriggered: number
  userName: string
}

type SystemStatus = {
  apiStatus: "healthy" | "degraded" | "down"
  databaseStatus: "healthy" | "degraded" | "down"
  instagramStatus: "healthy" | "degraded" | "down"
  lastSyncTime: string
  pendingTasks: number
}

export function DashboardOverview() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [activity, setActivity] = useState<AutomationActivity[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [metricsData, activityData, statusData] = await Promise.all([
        getDashboardMetrics(),
        getRecentAutomationActivity(),
        getSystemStatus(),
      ])

      setMetrics(metricsData)
      setActivity(activityData)
      setSystemStatus(statusData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
    setRefreshing(false)

    toast({
      title: "Dashboard Refreshed",
      description: "All metrics and data have been updated.",
    })
  }

  const getStatusColor = (status: "healthy" | "degraded" | "down") => {
    switch (status) {
      case "healthy":
        return "text-green-500"
      case "degraded":
        return "text-amber-500"
      case "down":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: "healthy" | "degraded" | "down") => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "down":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60)
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">Real-time metrics and insights for your DM automation platform</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing || loading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="h-[120px] animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 w-1/3 bg-muted rounded mb-2"></div>
                <div className="h-8 w-1/2 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">{metrics?.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">
                      {Math.round(((metrics?.activeUsers || 0) / (metrics?.totalUsers || 1)) * 100)}%
                    </span>{" "}
                    of total users
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                  <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">{metrics?.messagesSentToday.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Avg response time: {metrics?.averageResponseTime}s</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                  <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-green-700 dark:text-green-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">
                    {metrics?.activeAutomations.toLocaleString()} / {metrics?.totalAutomations.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Zap className="mr-1 h-4 w-4 text-amber-500" />
                    <span>
                      {Math.round(((metrics?.activeAutomations || 0) / (metrics?.totalAutomations || 1)) * 100)}%
                      automation activation rate
                    </span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants}>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                  <CardTitle className="text-sm font-medium">Scheduled Messages</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">{metrics?.scheduledMessages.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">Upcoming messages</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Automation Activity</CardTitle>
                <CardDescription>Latest triggers and actions from your automations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No recent activity</p>
                  ) : (
                    activity.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            item.status === "active"
                              ? "bg-green-100 dark:bg-green-900"
                              : "bg-amber-100 dark:bg-amber-900"
                          }`}
                        >
                          {item.type === "MESSAGE" ? (
                            <MessageSquare className="h-5 w-5 text-primary" />
                          ) : (
                            <Bot className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{item.name}</p>
                            <Badge variant={item.status === "active" ? "default" : "outline"}>{item.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.messagesTriggered} messages triggered</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">
                              Last triggered {formatDate(item.lastTriggered)}
                            </p>
                            <span className="text-xs text-muted-foreground">•</span>
                            <p className="text-xs text-muted-foreground">{item.userName}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current status of all connected systems</CardDescription>
              </CardHeader>
              <CardContent>
                {systemStatus ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">API Status</p>
                          <div className="flex items-center">
                            {getStatusIcon(systemStatus.apiStatus)}
                            <span className={`ml-1 text-sm ${getStatusColor(systemStatus.apiStatus)}`}>
                              {systemStatus.apiStatus.charAt(0).toUpperCase() + systemStatus.apiStatus.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              systemStatus.apiStatus === "healthy"
                                ? "bg-green-500"
                                : systemStatus.apiStatus === "degraded"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{
                              width:
                                systemStatus.apiStatus === "healthy"
                                  ? "100%"
                                  : systemStatus.apiStatus === "degraded"
                                    ? "50%"
                                    : "10%",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Database Status</p>
                          <div className="flex items-center">
                            {getStatusIcon(systemStatus.databaseStatus)}
                            <span className={`ml-1 text-sm ${getStatusColor(systemStatus.databaseStatus)}`}>
                              {systemStatus.databaseStatus.charAt(0).toUpperCase() +
                                systemStatus.databaseStatus.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              systemStatus.databaseStatus === "healthy"
                                ? "bg-green-500"
                                : systemStatus.databaseStatus === "degraded"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{
                              width:
                                systemStatus.databaseStatus === "healthy"
                                  ? "100%"
                                  : systemStatus.databaseStatus === "degraded"
                                    ? "50%"
                                    : "10%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Instagram className="h-4 w-4 mr-2" />
                          <p className="text-sm font-medium">Instagram Connection</p>
                        </div>
                        <div className="flex items-center">
                          {getStatusIcon(systemStatus.instagramStatus)}
                          <span className={`ml-1 text-sm ${getStatusColor(systemStatus.instagramStatus)}`}>
                            {systemStatus.instagramStatus.charAt(0).toUpperCase() +
                              systemStatus.instagramStatus.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            systemStatus.instagramStatus === "healthy"
                              ? "bg-green-500"
                              : systemStatus.instagramStatus === "degraded"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{
                            width:
                              systemStatus.instagramStatus === "healthy"
                                ? "100%"
                                : systemStatus.instagramStatus === "degraded"
                                  ? "50%"
                                  : "10%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Sync:</span>
                        <span className="font-medium">{formatDate(systemStatus.lastSyncTime)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pending Tasks:</span>
                        <Badge variant={systemStatus.pendingTasks > 0 ? "secondary" : "outline"}>
                          {systemStatus.pendingTasks}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-[200px]">
                    <p className="text-muted-foreground">Unable to fetch system status</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  System Logs
                </Button>
                <Button size="sm">Run Diagnostics</Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

