"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { StarIcon, MoreHorizontal, CheckCircle, XCircle, MessageCircle, ExternalLink } from "lucide-react"
import { getOpportunityApplications, updateApplicationStatus, voteForInfluencer } from "@/actions/influencer-relations/opportunities"
import { toast } from "@/hooks/use-toast"
import { InfluencerRating } from "./influencer-rating"

interface InfluencerApplicationsProps {
  opportunityId: string
}

export function InfluencerApplications({ opportunityId }: InfluencerApplicationsProps) {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ratingInfluencerId, setRatingInfluencerId] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { status, data, message } = await getOpportunityApplications(opportunityId)

        if (status === 200 && data) {
          setApplications(data)
        } else {
          setError(message || "Failed to load applications")
        }
      } catch (err) {
        setError("An error occurred while fetching applications")
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [opportunityId])

  const handleStatusChange = async (applicationId: string, status: string) => {
    try {
      const { status: apiStatus, message } = await updateApplicationStatus(applicationId, status)

      if (apiStatus === 200) {
        // Update local state
        setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status } : app)))

        toast({
          title: "Status Updated",
          description: `Application status changed to ${status.toLowerCase()}`,
        })
      } else {
        toast({
          title: "Error",
          description: message || "Failed to update status",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleRating = async (influencerId: string, rating: number) => {
    try {
      const { status, message } = await voteForInfluencer(influencerId, rating)

      if (status === 200) {
        toast({
          title: "Rating Submitted",
          description: "Your rating has been submitted successfully",
        })
        setRatingInfluencerId(null)
      } else {
        toast({
          title: "Error",
          description: message || "Failed to submit rating",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No applications received yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group applications by status
  const pending = applications.filter((app) => app.status === "PENDING")
  const accepted = applications.filter((app) => app.status === "ACCEPTED")
  const rejected = applications.filter((app) => app.status === "REJECTED")

  return (
    <>
      {ratingInfluencerId && (
        <InfluencerRating
          influencerId={ratingInfluencerId}
          onRate={handleRating}
          onCancel={() => setRatingInfluencerId(null)}
        />
      )}

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({accepted.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
        </TabsList>

        {["all", "pending", "accepted", "rejected"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="space-y-4">
              {applications
                .filter((app) => {
                  if (tab === "all") return true
                  if (tab === "pending") return app.status === "PENDING"
                  if (tab === "accepted") return app.status === "ACCEPTED"
                  if (tab === "rejected") return app.status === "REJECTED"
                  return true
                })
                .map((application) => (
                  <Card key={application.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-4 p-6 sm:flex-row">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={application.influencer.profilePicture}
                              alt={application.influencer.name}
                            />
                            <AvatarFallback>{application.influencer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{application.influencer.name}</h3>
                            <p className="text-sm text-muted-foreground">@{application.influencer.username}</p>
                            <div className="mt-1 flex items-center gap-1">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-3.5 w-3.5 ${
                                      i < Math.round(application.influencer.rating)
                                        ? "fill-primary text-primary"
                                        : "fill-muted text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                ({application.influencer.rating.toFixed(1)})
                              </span>
                            </div>
                          </div>
                        </div>
                        <Separator orientation="vertical" className="hidden sm:block" />
                        <Separator className="sm:hidden" />
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Followers</p>
                              <p className="font-medium">{formatNumber(application.influencer.followers)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Engagement</p>
                              <p className="font-medium">{application.influencer.engagementRate}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Campaigns</p>
                              <p className="font-medium">{application.influencer.completedCampaigns || 0}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {application.influencer.platforms.map((platform: string) => (
                              <Badge key={platform} variant="outline" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge
                            variant={application.status === "PENDING" ? "outline" : "default"}
                            className={
                              application.status === "ACCEPTED"
                                ? "bg-green-500/20 text-green-500"
                                : application.status === "REJECTED"
                                  ? "bg-red-500/20 text-red-500"
                                  : ""
                            }
                          >
                            {formatStatus(application.status)}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(application.id, "ACCEPTED")}
                                disabled={application.status === "ACCEPTED"}
                                className="text-green-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Accept
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(application.id, "REJECTED")}
                                disabled={application.status === "REJECTED"}
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => window.open(`/messages/${application.influencer.id}`, "_blank")}
                              >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Message
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => window.open(`/influencers/${application.influencer.id}`, "_blank")}
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setRatingInfluencerId(application.influencer.id)}>
                                <StarIcon className="mr-2 h-4 w-4" />
                                Rate Influencer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-3">
                        <div className="grid gap-2 md:grid-cols-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/influencers/${application.influencer.id}`, "_blank")}
                          >
                            View Full Profile
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => window.open(`/messages/${application.influencer.id}`, "_blank")}
                          >
                            Contact Influencer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K"
  }
  return num.toString()
}

function formatStatus(status: string) {
  switch (status) {
    case "PENDING":
      return "Pending"
    case "ACCEPTED":
      return "Accepted"
    case "REJECTED":
      return "Rejected"
    default:
      return status
  }
}
