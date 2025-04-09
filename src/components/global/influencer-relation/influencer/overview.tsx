import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, TwitterIcon as TikTok, Youtube, MapPin, Tag, Edit, ShieldCheck } from "lucide-react"
import { getInfluencerProfile } from "@/actions/influencer-relations/influencer"

export async function InfluencerOverview() {
  const { status, data: influencer, message } = await getInfluencerProfile()

  if (status !== 200 || !influencer) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
          <CardDescription>Error loading profile: {message}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle>Profile Overview</CardTitle>
        <CardDescription>Your public profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage
                src={influencer.profilePicture || "/placeholder.svg?height=80&width=80"}
                alt={influencer.name}
              />
              <AvatarFallback className="text-xl">
                {influencer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{influencer.name}</h2>
                {influencer.verified && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <ShieldCheck className="h-3 w-3 text-white" />
                  </div>
                )}
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 md:ml-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Profile</span>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">@{influencer.username}</div>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <Badge variant="outline" className="gap-1 font-normal">
                  <MapPin className="h-3 w-3" /> {influencer.location || "No location"}
                </Badge>
                <Badge variant="outline" className="gap-1 font-normal">
                  <Tag className="h-3 w-3" /> {influencer.niche || "No niche"}
                </Badge>
              </div>
              <div className="mt-2 flex gap-4 text-sm">
                <div>
                  <span className="font-bold">{formatNumber(influencer.followers)}</span>
                  <span className="ml-1 text-muted-foreground">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{influencer.engagementRate}%</span>
                  <span className="ml-1 text-muted-foreground">Engagement</span>
                </div>
                <div>
                  <span className="font-bold">${formatNumber(influencer.totalEarnings)}</span>
                  <span className="ml-1 text-muted-foreground">Earned</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2 md:flex-nowrap">
            {influencer.platforms.map((platform) => (
              <Badge key={platform} variant="outline" className="h-8 gap-1 px-3">
                {platform === "Instagram" ? (
                  <Instagram className="h-4 w-4" />
                ) : platform === "TikTok" ? (
                  <TikTok className="h-4 w-4" />
                ) : platform === "YouTube" ? (
                  <Youtube className="h-4 w-4" />
                ) : null}
                {platform}
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Edit className="h-4 w-4" />
              <span>Edit Platforms</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
