"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getUserActivity } from "../actions"

type ActivityItem = {
  id: string
  userId: string
  userName: string
  userEmail: string
  action: string
  target: string
  timestamp: string
  details?: string
}

export function ActivityTimeline() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        setLoading(true)
        const data = await getUserActivity(10)
        setActivities(data)
      } catch (error) {
        console.error("Error fetching user activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()

    // Refresh every 2 minutes
    const interval = setInterval(fetchActivity, 120000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "created":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
          >
            Created
          </Badge>
        )
      case "updated":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
          >
            Updated
          </Badge>
        )
      case "deleted":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
          >
            Deleted
          </Badge>
        )
      case "subscribed":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
          >
            Subscribed
          </Badge>
        )
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  // Group activities by date
  const groupedActivities: Record<string, ActivityItem[]> = {}
  activities.forEach((activity) => {
    const date = formatDate(activity.timestamp)
    if (!groupedActivities[date]) {
      groupedActivities[date] = []
    }
    groupedActivities[date].push(activity)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>User actions across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading activity...</div>
        ) : activities.length === 0 ? (
          <div className="flex justify-center p-4 text-muted-foreground">No recent activity</div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedActivities).map(([date, items]) => (
              <div key={date} className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">{date}</h4>
                <div className="space-y-4">
                  {items.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {activity.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-none">{activity.userName}</p>
                          {getActionBadge(activity.action)}
                          <span className="text-sm text-muted-foreground">{activity.target}</span>
                        </div>
                        {activity.details && <p className="text-xs text-muted-foreground">{activity.details}</p>}
                        <p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

