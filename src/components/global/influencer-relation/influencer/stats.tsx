import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Users, Activity, Eye, DollarSign } from "lucide-react"
import { getInfluencerMetrics } from "@/actions/influencer-relations/influencer"

export async function InfluencerStats() {
  const { status, data, message } = await getInfluencerMetrics()

  if (status !== 200 || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
          <CardDescription>Error loading metrics: {message}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const { followers, engagementRate, latestMetrics } = data

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const getGrowthIndicator = (value: number) => {
    if (value > 0) {
      return (
        <span className="flex items-center text-green-500">
          <ArrowUp className="mr-1 h-3 w-3" />
          {value}%
        </span>
      )
    }
    if (value < 0) {
      return (
        <span className="flex items-center text-red-500">
          <ArrowDown className="mr-1 h-3 w-3" />
          {Math.abs(value)}%
        </span>
      )
    }
    return <span className="text-muted-foreground">0%</span>
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Key Metrics</CardTitle>
        <CardDescription>Your performance at a glance</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Followers</div>
              <div className="text-xl font-bold">{formatNumber(followers)}</div>
            </div>
          </div>
          {latestMetrics && getGrowthIndicator(latestMetrics.followersGrowth || 0)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Engagement</div>
              <div className="text-xl font-bold">{engagementRate}%</div>
            </div>
          </div>
          {latestMetrics && getGrowthIndicator(latestMetrics.engagementGrowth || 0)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Profile Views</div>
              <div className="text-xl font-bold">
                {latestMetrics ? formatNumber(latestMetrics.profileViews) : "N/A"}
              </div>
            </div>
          </div>
          {latestMetrics && getGrowthIndicator(latestMetrics.profileViewsGrowth || 0)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Avg. Post Value</div>
              <div className="text-xl font-bold">
                ${latestMetrics && latestMetrics.averageLikes ? (latestMetrics.averageLikes / 100).toFixed(0) : "N/A"}
              </div>
            </div>
          </div>
          <Button variant="link" className="h-auto p-0 text-xs">
            Calculate Rate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
