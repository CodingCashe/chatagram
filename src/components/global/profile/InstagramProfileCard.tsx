"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Image } from "lucide-react"

interface InstagramProfileCardProps {
  username: string | null
  fullName: string | null
  profilePicture: string | null
  followersCount: number | null
  followingCount: number | null
  postsCount: number | null
}

export function InstagramProfileCard({
  username,
  fullName,
  profilePicture,
  followersCount,
  followingCount,
  postsCount,
}: InstagramProfileCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={profilePicture || undefined} alt={username || "User"} />
          <AvatarFallback>{username ? username[0].toUpperCase() : "U"}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{fullName || "Instagram User"}</CardTitle>
          <p className="text-sm text-muted-foreground">@{username || "username"}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{followersCount?.toLocaleString() || "N/A"}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center">
              <Users className="h-4 w-4 mr-1" /> Followers
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{followingCount?.toLocaleString() || "N/A"}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center">
              <Users className="h-4 w-4 mr-1" /> Following
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{postsCount?.toLocaleString() || "N/A"}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center">
              <Image className="h-4 w-4 mr-1" /> Posts
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

