"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { StarIcon, MessageCircle, ExternalLink, BarChart2, Users, Check } from "lucide-react"
import { getRecommendedInfluencers } from "@/actions/influencer-relations/opportunities"

interface InfluencerRecommendationsProps {
  criteria: {
    category?: string
    platforms?: string[]
    location?: string
    minFollowers?: number
    maxFollowers?: number
    minEngagementRate?: number
  }
}

export function InfluencerRecommendations({ criteria }: InfluencerRecommendationsProps) {
  const [influencers, setInfluencers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      // Only fetch if we have at least one criterion
      if (!criteria.category && (!criteria.platforms || criteria.platforms.length === 0) && !criteria.location) {
        setInfluencers([])
        setLoading(false)
        return
      }

      try {
        const { status, data, message } = await getRecommendedInfluencers(criteria)

        if (status === 200 && data) {
          setInfluencers(data)
        } else {
          setError(message || "Failed to load recommendations")
        }
      } catch (err) {
        setError("An error occurred while fetching recommendations")
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)
    fetchRecommendations()
  }, [criteria])

  if (
    !criteria.category &&
    (!criteria.platforms || criteria.platforms.length === 0) &&
    !criteria.location &&
    !criteria.minFollowers &&
    !criteria.maxFollowers &&
    !criteria.minEngagementRate
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-center text-muted-foreground">
              Enter opportunity details to get AI-powered influencer recommendations
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
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
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (influencers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No matching influencers found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          AI-Powered Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg border bg-muted/30 p-3">
            <h3 className="text-sm font-medium">Match Criteria</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {criteria.category && (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  Category: {criteria.category}
                </Badge>
              )}
              {criteria.platforms && criteria.platforms.length > 0 && (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  Platforms: {criteria.platforms.join(", ")}
                </Badge>
              )}
              {criteria.location && (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  Location: {criteria.location}
                </Badge>
              )}
              {(criteria.minFollowers || criteria.maxFollowers) && (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  Followers: {formatNumber(criteria.minFollowers || 0)} -{" "}
                  {formatNumber(criteria.maxFollowers || 1000000)}
                </Badge>
              )}
              {criteria.minEngagementRate && (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  Min. Engagement: {criteria.minEngagementRate}%
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {influencers.map((influencer) => (
              <Card key={influencer.id} className="overflow-hidden transition-colors hover:bg-muted/50">
                <CardContent className="p-0">
                  <div className="flex flex-col gap-4 p-6 sm:flex-row">
                    <div className="flex gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={influencer.profilePicture} alt={influencer.name} />
                          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {influencer.compatibilityScore}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{influencer.name}</h3>
                        <p className="text-sm text-muted-foreground">@{influencer.username}</p>
                        <div className="mt-1 flex items-center gap-1">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < Math.round(influencer.rating)
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({influencer.rating.toFixed(1)})</span>
                        </div>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="hidden sm:block" />
                    <Separator className="sm:hidden" />
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Followers</p>
                          <p className="font-medium">{formatNumber(influencer.followers)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                          <p className="font-medium">{influencer.engagementRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Completed</p>
                          <p className="font-medium">{influencer.completedCampaigns || 0}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {influencer.platforms.map((platform: string) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="mt-1 text-center">
                        <div className="text-xl font-bold">{influencer.compatibilityScore}%</div>
                        <div className="text-xs text-muted-foreground">Match</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3">
                    <div className="grid gap-2 md:grid-cols-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/influencers/${influencer.id}`, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                      <Button size="sm" onClick={() => window.open(`/messages/${influencer.id}`, "_blank")}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
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
