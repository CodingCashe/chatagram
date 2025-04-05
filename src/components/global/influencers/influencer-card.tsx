"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Instagram, Heart, Users, Star, DollarSign, PieChart, Database, Bot } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { addToList } from "@/actions/influencers"
import { toast } from "@/hooks/use-toast"

interface InfluencerCardProps {
  influencer: any
  source?: string
}

export default function InfluencerCard({ influencer, source = "instagram" }: InfluencerCardProps) {
  const [saving, setSaving] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num
  }

  const getSourceBadge = () => {
    switch (source) {
      case "instagram_api":
      case "instagram":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Instagram className="h-3 w-3" /> Instagram API
          </Badge>
        )
      case "third_party":
      case "third-party":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Database className="h-3 w-3" /> Third-Party
          </Badge>
        )
      case "ai_discovery":
      case "ai":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Bot className="h-3 w-3" /> AI Discovered
          </Badge>
        )
      case "portal_signup":
      case "portal":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" /> Portal Signup
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Database className="h-3 w-3" /> {source}
          </Badge>
        )
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // For now, we'll just save to a default list
      // In a real implementation, you'd show a dropdown of available lists
      const result = await addToList(influencer.id, "default")
      if (result.status === 200) {
        toast({
          title: "Influencer saved",
          description: "The influencer has been added to your saved list.",
        })
      } else {
        toast({
          title: "Error",
          description: result.data,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving influencer:", error)
      toast({
        title: "Error",
        description: "Failed to save influencer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage
                src={influencer.profilePicture || `/placeholder.svg?height=100&width=100`}
                alt={influencer.name}
              />
              <AvatarFallback>
                {influencer.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base flex items-center">
                {influencer.name}
                {influencer.verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary" className="ml-2 h-5 px-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified Account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardTitle>
              <CardDescription className="flex items-center">@{influencer.username}</CardDescription>
            </div>
          </div>
          {getSourceBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground">Followers</p>
            <p className="font-medium">{formatNumber(influencer.followers)}</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground">Engagement</p>
            <p className="font-medium">{influencer.engagementRate.toFixed(1)}%</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground">Posts</p>
            <p className="font-medium">{influencer.postsCount || "N/A"}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {influencer.niche && <Badge variant="secondary">{influencer.niche}</Badge>}
          {influencer.location && <Badge variant="outline">{influencer.location}</Badge>}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1">
              <PieChart className="h-3 w-3" /> Brand Fit
            </span>
            <span>{influencer.brandFit || "N/A"}%</span>
          </div>
          {influencer.brandFit && <Progress value={influencer.brandFit} className="h-2" />}

          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> Audience Match
            </span>
            <span>{influencer.audienceMatch || "N/A"}%</span>
          </div>
          {influencer.audienceMatch && <Progress value={influencer.audienceMatch} className="h-2" />}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm font-medium">${influencer.estimatedCost || "N/A"}</span>
            <span className="text-xs text-muted-foreground ml-1">est. per post</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
            <Heart className="h-4 w-4 mr-1" />
            {saving ? "Saving..." : "Save"}
          </Button>
          <Link href={`/influencers/${influencer.id}`}>
            <Button size="sm">View Profile</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

