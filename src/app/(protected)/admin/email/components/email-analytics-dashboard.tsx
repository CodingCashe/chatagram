"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getEmailAnalytics } from "../../actions/email-actions"
import { toast } from "@/hooks/use-toast"

export function EmailAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoading(true)
      const result = await getEmailAnalytics()
      if (result.success) {
        setAnalytics(result)
      } else {
        toast({
          title: "Error",
          description: "Failed to load email analytics",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }

    loadAnalytics()
  }, [])

  if (isLoading) {
    return <p>Loading analytics...</p>
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No analytics data available</h3>
        <p className="text-muted-foreground mt-2">Start sending emails to see analytics data.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.statusCounts?.SENT || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.statusCounts?.SENT
                ? (((analytics.statusCounts?.OPENED || 0) / analytics.statusCounts.SENT) * 100).toFixed(1)
                : 0}
              %
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.statusCounts?.SENT
                ? (((analytics.statusCounts?.CLICKED || 0) / analytics.statusCounts.SENT) * 100).toFixed(1)
                : 0}
              %
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.statusCounts?.SCHEDULED || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Enhanced Analytics Coming Soon</h3>
        <p className="text-muted-foreground mt-2">
          We're working on adding detailed charts and analytics for your email campaigns.
        </p>
      </div>
    </div>
  )
}

