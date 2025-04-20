"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, AlertCircle, ArrowUpRight } from "lucide-react"
import { getSystemHealth } from "../actions"

export function SystemHealth() {
  const [healthData, setHealthData] = useState<{
    cpu: number
    memory: number
    storage: number
    apiStatus: "healthy" | "degraded" | "down"
    databaseStatus: "healthy" | "degraded" | "down"
    lastIncident: string | null
    uptime: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHealthData() {
      try {
        const data = await getSystemHealth()
        setHealthData(data)
      } catch (error) {
        console.error("Error fetching system health:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHealthData()

    // Refresh every minute
    const interval = setInterval(fetchHealthData, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${days}d ${hours}h ${minutes}m`
  }

  const getStatusIcon = (status: "healthy" | "degraded" | "down") => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "down":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = (status: "healthy" | "degraded" | "down") => {
    switch (status) {
      case "healthy":
        return "Operational"
      case "degraded":
        return "Degraded"
      case "down":
        return "Down"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system status and resources</CardDescription>
          </div>
          {healthData && (
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              Uptime: {formatUptime(healthData.uptime)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading system health...</div>
        ) : healthData ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="font-medium">{healthData.cpu}%</span>
                </div>
                <Progress value={healthData.cpu} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span className="font-medium">{healthData.memory}%</span>
                </div>
                <Progress value={healthData.memory} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Usage</span>
                <span className="font-medium">{healthData.storage}%</span>
              </div>
              <Progress value={healthData.storage} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">API Status</p>
                  <div className="flex items-center">
                    {getStatusIcon(healthData.apiStatus)}
                    <span className="ml-1 text-xs">{getStatusText(healthData.apiStatus)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Database Status</p>
                  <div className="flex items-center">
                    {getStatusIcon(healthData.databaseStatus)}
                    <span className="ml-1 text-xs">{getStatusText(healthData.databaseStatus)}</span>
                  </div>
                </div>
              </div>
            </div>

            {healthData.lastIncident && (
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-300">Last Incident</p>
                <p className="text-xs text-amber-700 dark:text-amber-400">{healthData.lastIncident}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center p-4 text-muted-foreground">Unable to fetch system health data</div>
        )}
      </CardContent>
    </Card>
  )
}

