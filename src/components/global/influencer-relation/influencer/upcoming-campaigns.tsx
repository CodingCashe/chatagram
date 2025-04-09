"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BriefcaseBusiness, ArrowRight } from "lucide-react"
import { getUpcomingCampaigns } from "@/actions/influencer-relations/influencer"

export function UpcomingCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { status, data, message } = await getUpcomingCampaigns()

        if (status === 200 && data) {
          setCampaigns(data)
        } else {
          setError(message || "Failed to load campaigns")
        }
      } catch (err) {
        setError("An error occurred while fetching campaigns")
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "invited":
        return "secondary"
      case "accepted":
        return "default"
      case "in_progress":
        return "outline"
      default:
        return "outline"
    }
  }

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "invited":
        return "bg-yellow-500/20 text-yellow-500"
      case "accepted":
        return "bg-primary/20 text-primary"
      case "in_progress":
        return "border-green-500 text-green-500"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Campaigns</CardTitle>
            <CardDescription>Your active brand partnerships</CardDescription>
          </div>
          <div className="rounded-full bg-primary/10 p-1.5">
            <BriefcaseBusiness className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
            {error}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
            No upcoming campaigns
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{campaign.campaign.name}</div>
                  <Badge variant={getBadgeVariant(campaign.status) as any} className={getBadgeClass(campaign.status)}>
                    {campaign.status.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> Due: {new Date(campaign.dueDate).toLocaleDateString()}
                </div>
                <div className="mt-2 grid gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">${campaign.rate || "TBD"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Content:</span>
                    <span className="font-medium">
                      {campaign.deliverables ? JSON.stringify(campaign.deliverables).replace(/[{}"[\]]/g, "") : "TBD"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-1.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-2">
        <Button variant="ghost" className="w-full justify-center gap-1 text-xs">
          <span>View All Campaigns</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
