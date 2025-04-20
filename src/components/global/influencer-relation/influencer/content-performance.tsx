"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, Share2, Eye, Instagram, Video, ImageIcon, Filter, ArrowUpDown } from "lucide-react"
import { getContentPerformance } from "@/actions/influencer-relations/influencer"

export function ContentPerformance() {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { status, data, message } = await getContentPerformance()

        if (status === 200 && data) {
          setContent(data)
        } else {
          setError(message || "Failed to load content performance")
        }
      } catch (err) {
        setError("An error occurred while fetching content performance")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const filteredContent =
    activeTab === "all" ? content : content.filter((item) => item.type.toLowerCase() === activeTab.toLowerCase())

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>How your content is performing</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span>Sort</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="post">Posts</TabsTrigger>
            <TabsTrigger value="reel">Reels</TabsTrigger>
            <TabsTrigger value="story">Stories</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {loading ? (
              <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                {error}
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                No content available
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContent.map((item) => (
                  <div key={item.id} className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={`${item.type} thumbnail`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 rounded-tl-md bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                          {item.type}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-sm font-medium">
                            {item.platform === "Instagram" ? (
                              <Instagram className="h-3.5 w-3.5" />
                            ) : item.platform === "TikTok" ? (
                              <Video className="h-3.5 w-3.5" />
                            ) : (
                              <ImageIcon className="h-3.5 w-3.5" />
                            )}
                            {item.platform} {item.type}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.date}</div>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {formatNumber(item.likes)}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {formatNumber(item.comments)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            {formatNumber(item.shares)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(item.impressions)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Badge className="bg-primary/20 text-primary">{item.engagement}% Eng</Badge>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
