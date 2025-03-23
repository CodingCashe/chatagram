"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAutomationTypeDistribution } from "../actions"

export function AutomationStats() {
  const [automationTypes, setAutomationTypes] = useState<
    Array<{
      name: string
      count: number
      percentage: number
    }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getAutomationTypeDistribution()
        setAutomationTypes(data)
      } catch (error) {
        console.error("Error fetching automation types:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Types</CardTitle>
        <CardDescription>Distribution of automation types across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading automation stats...</div>
        ) : automationTypes.length === 0 ? (
          <div className="flex justify-center p-4">No automation data available</div>
        ) : (
          <div className="space-y-4">
            {automationTypes.map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>{type.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {type.count}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${type.percentage}%` }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-10 text-right">{type.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

