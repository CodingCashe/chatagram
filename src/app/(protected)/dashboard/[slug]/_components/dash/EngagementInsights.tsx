"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivitySquare, BarChart2, LineChart, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAutomationsForUser, getEngagementDataForAutomation } from "@/actions/dashboard"
import DMTimeline from "./DMTimeline"
import DMDistribution from "./DMDistribution"
import DMInsights from "./DMInsights"
import TopDMDays from "./TopDMDays"
import type { AutomationOption, EngagementData, Automation } from "@/types/dashboard"

const EngagementInsights: React.FC = () => {
  const [automations, setAutomations] = useState<AutomationOption[]>([])
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
  const [data, setData] = useState<EngagementData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const fetchedAutomations: Automation[] = await getAutomationsForUser()
        const mappedAutomations = fetchedAutomations.map((automation) => ({
          value: automation.id,
          label: automation.name,
        }))
        setAutomations(mappedAutomations)

        if (mappedAutomations.length > 0 && !selectedAutomation) {
          setSelectedAutomation(mappedAutomations[0].value)
        }
      } catch (err) {
        console.error("Error fetching automations:", err)
        setError("Failed to fetch automations")
      }
    }
    fetchAutomations()
  }, [selectedAutomation])

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAutomation) return

      try {
        setLoading(true)
        setError(null)
        const { engagementData } = await getEngagementDataForAutomation(selectedAutomation)
        const sortedData: EngagementData[] = engagementData
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((day) => ({ date: day.date, dms: day.dms }))
        setData(sortedData)
      } catch (err) {
        console.error("Error fetching engagement data:", err)
        setError("Failed to fetch engagement data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedAutomation])

  const trimAutomationName = (name: string) => {
    return name.length > 15 ? name.substring(0, 12) + "..." : name
  }

  if (automations.length === 0) {
    return <div className="text-center py-10 text-muted-foreground">No automations available.</div>
  }

  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/10">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-foreground">DM Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedAutomation || undefined} onValueChange={setSelectedAutomation}>
          <SelectTrigger className="w-full mb-4 bg-background/50 border-primary/20 text-foreground">
            <SelectValue placeholder="Select an automation" />
          </SelectTrigger>
          <SelectContent className="bg-background/50 border-primary/20 text-foreground">
            {automations.map((automation) => (
              <SelectItem key={automation.value} value={automation.value}>
                {trimAutomationName(automation.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {loading ? (
          <div className="text-center py-10 text-muted-foreground">Loading DM insights...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-10">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">No DM data available for this automation.</div>
        ) : (
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4 bg-background/50">
              <TabsTrigger
                value="timeline"
                className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <LineChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Timeline</span>
                <span className="sm:hidden">Time</span>
              </TabsTrigger>
              <TabsTrigger
                value="distribution"
                className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Distribution</span>
                <span className="sm:hidden">Dist</span>
              </TabsTrigger>
              <TabsTrigger
                value="topdays"
                className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Top Days</span>
                <span className="sm:hidden">Top</span>
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ActivitySquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Insights</span>
                <span className="sm:hidden">Insgt</span>
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 sm:mt-6">
              <TabsContent value="timeline">
                <DMTimeline data={data} />
              </TabsContent>
              <TabsContent value="distribution">
                <DMDistribution data={data} />
              </TabsContent>
              <TabsContent value="topdays">
                <TopDMDays data={data} />
              </TabsContent>
              <TabsContent value="insights">
                <DMInsights data={data} />
              </TabsContent>
            </div>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

export default EngagementInsights

