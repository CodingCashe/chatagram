"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Sparkles, Bookmark, BookmarkCheck, ThumbsUp, MessageSquare, Repeat } from "lucide-react"

// Sample content ideas
const contentIdeas = [
  {
    id: 1,
    title: "Day in the Life: Behind the Scenes of Content Creation",
    category: "Lifestyle",
    engagement: "High",
    saved: false,
  },
  {
    id: 2,
    title: "5 Must-Have Tools for Professional Content Creators",
    category: "Tech",
    engagement: "Medium",
    saved: true,
  },
  {
    id: 3,
    title: "How I Edit My Photos: Step-by-Step Tutorial",
    category: "Tutorial",
    engagement: "Very High",
    saved: false,
  },
  {
    id: 4,
    title: "Honest Review: Is This Viral Product Worth the Hype?",
    category: "Review",
    engagement: "High",
    saved: true,
  },
  {
    id: 5,
    title: "My Morning Routine for Productivity and Wellness",
    category: "Lifestyle",
    engagement: "Medium",
    saved: false,
  },
  {
    id: 6,
    title: "Answering Your Most Asked Questions (Q&A)",
    category: "Personal",
    engagement: "High",
    saved: false,
  },
]

// Sample trending topics
const trendingTopics = [
  { topic: "Sustainable Fashion", growth: "+28%" },
  { topic: "AI Tools for Creators", growth: "+45%" },
  { topic: "Mental Health Awareness", growth: "+32%" },
  { topic: "No-Makeup Makeup Looks", growth: "+18%" },
  { topic: "Plant-Based Recipes", growth: "+24%" },
]

export function ContentIdeas() {
  const [ideas, setIdeas] = useState(contentIdeas)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleSaved = (id: number) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, saved: !idea.saved } : idea)))
  }

  const filteredIdeas = searchTerm
    ? ideas.filter((idea) => idea.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : ideas

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Lifestyle":
        return "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20"
      case "Tech":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Tutorial":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "Review":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "Personal":
        return "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "Very High":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "High":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Medium":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Content Ideas</CardTitle>
            <CardDescription>Get inspired with trending topics and content suggestions</CardDescription>
          </div>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Ideas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ideas" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ideas">Content Ideas</TabsTrigger>
            <TabsTrigger value="trending">Trending Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <div className="space-y-3">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{idea.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline" className={getCategoryColor(idea.category)}>
                            {idea.category}
                          </Badge>
                          <Badge variant="outline" className={getEngagementColor(idea.engagement)}>
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            {idea.engagement} Engagement
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSaved(idea.id)}
                        className={idea.saved ? "text-amber-500" : "text-muted-foreground"}
                      >
                        {idea.saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Expand
                        </Button>
                        <Button variant="outline" size="sm">
                          <Repeat className="mr-1 h-3 w-3" />
                          Remix
                        </Button>
                      </div>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        Use Idea
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="rounded-md border">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="font-medium">Trending Topics</p>
                <Lightbulb className="h-4 w-4 text-amber-500" />
              </div>
              <div className="divide-y">
                {trendingTopics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{item.topic}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-emerald-500">{item.growth}</span>
                      <Button variant="outline" size="sm">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Generate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Trending topics are updated daily based on social media engagement and search trends.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
