"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSubscriptionGrowthData } from "../actions"

export function SubscriptionChart() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">("weekly")
  const [chartData, setChartData] = useState<{
    labels: string[]
    data: Array<{ label: string; total: number; pro: number }>
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getSubscriptionGrowthData(activeTab)
        setChartData(data)
      } catch (error) {
        console.error("Error fetching subscription data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Growth</CardTitle>
        <CardDescription>New and upgraded subscriptions over time</CardDescription>
        <Tabs
          defaultValue="weekly"
          className="mt-2"
          onValueChange={(value) => setActiveTab(value as "weekly" | "monthly" | "yearly")}
        >
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] w-full flex items-center justify-center">Loading chart data...</div>
        ) : (
          <div className="h-[300px] w-full">
            <div className="flex h-full items-end gap-2 pb-4">
              {chartData?.data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / chartData.data.length}%` }}
                >
                  <div
                    className="bg-primary/90 w-full rounded-t-md"
                    style={{
                      height: `${item.total > 0 ? (item.total / Math.max(...chartData.data.map((d) => d.total))) * 70 : 0}%`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              {chartData?.labels.map((label, index) => (
                <div key={index}>{label}</div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

