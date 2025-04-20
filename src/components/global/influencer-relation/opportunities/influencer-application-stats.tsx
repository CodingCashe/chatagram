"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FileText, CheckCircle, XCircle, Clock, BarChart } from "lucide-react"
import { getApplicationStats } from "@/actions/influencer-relations/influencer-applications"

export function InfluencerApplicationStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { status, data, message } = await getApplicationStats()

        if (status === 200 && data) {
          setStats(data)
        } else {
          setError(message || "Failed to load stats")
        }
      } catch (err) {
        setError("An error occurred while fetching stats")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <StatsCardSkeleton />
  }

  if (error || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error || "Failed to load stats"}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const statItems = [
    {
      name: "Total Applications",
      value: stats.total,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      name: "Pending",
      value: stats.pending,
      icon: <Clock className="h-4 w-4 text-primary" />,
    },
    {
      name: "Accepted",
      value: stats.accepted,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      name: "Rejected",
      value: stats.rejected,
      icon: <XCircle className="h-4 w-4 text-red-500" />,
    },
    {
      name: "Acceptance Rate",
      value: `${stats.acceptanceRate.toFixed(1)}%`,
      icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4">
        {statItems.map((item) => (
          <Card key={item.name} className="min-w-[150px] flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

function StatsCardSkeleton() {
  return (
    <ScrollArea className="w-full">
      <div className="flex space-x-4 pb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="min-w-[150px] flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
