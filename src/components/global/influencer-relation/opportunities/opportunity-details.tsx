"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, MapPin, Activity, Tag } from "lucide-react"

interface OpportunityDetailsProps {
  opportunity: any
}

export function OpportunityDetails({ opportunity }: OpportunityDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <CardTitle>{opportunity.title}</CardTitle>
              <CardDescription>Created on {new Date(opportunity.createdAt).toLocaleDateString()}</CardDescription>
            </div>
            <Badge
              variant={opportunity.isPublic ? "default" : "outline"}
              className={opportunity.isPublic ? "bg-green-500/20 text-green-500" : ""}
            >
              {opportunity.isPublic ? "Public" : "Private"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1 whitespace-pre-wrap">{opportunity.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Key Details</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Budget: ${opportunity.budgetMin} - ${opportunity.budgetMax}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Location: {opportunity.location || "Global"}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span>Category: {opportunity.category}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Influencer Requirements</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Followers: {formatNumber(opportunity.minFollowers)} - {formatNumber(opportunity.maxFollowers)}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span>Min. Engagement Rate: {opportunity.minEngagementRate}%</span>
                  </li>
                  <li className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      Platforms:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.platforms.map((platform: string) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </li>
                  <li className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      Content Types:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.contentType.map((type: string) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {opportunity.requirements && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Additional Requirements</h3>
                <p className="mt-1 whitespace-pre-wrap">{opportunity.requirements}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            {opportunity.applications?.length || 0} applications received for this opportunity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {opportunity.applications?.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Recent Applications</span>
                <span>Total: {opportunity.applications.length}</span>
              </div>
              <ul className="space-y-2">
                {opportunity.applications.slice(0, 3).map((application: any) => (
                  <li key={application.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted">
                        {application.influencer?.profilePicture ? (
                          <img
                            src={application.influencer.profilePicture || "/placeholder.svg"}
                            alt={application.influencer.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full">
                            {application.influencer?.name?.charAt(0) || "?"}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{application.influencer?.name}</div>
                        <div className="text-xs text-muted-foreground">@{application.influencer?.username}</div>
                      </div>
                    </div>
                    <Badge
                      variant={application.status === "PENDING" ? "outline" : "default"}
                      className={application.status === "ACCEPTED" ? "bg-green-500/20 text-green-500" : ""}
                    >
                      {formatStatus(application.status)}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No applications received yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
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
