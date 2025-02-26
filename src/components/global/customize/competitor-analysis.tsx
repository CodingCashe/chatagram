"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, MessageSquare, Loader2, Search, ArrowUpRight, Target } from "lucide-react"

type CompetitorData = {
  handle: string
  followers: number
  engagement: number
  responseTime: number
  topKeywords: string[]
  sentiment: number
}

export function CompetitorAnalysis() {
  const [loading, setLoading] = useState(false)
  const [competitors, setCompetitors] = useState<CompetitorData[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const analyzeCompetitor = async () => {
    setLoading(true)
    // Simulated API call
    setTimeout(() => {
      setCompetitors([
        {
          handle: "@competitor1",
          followers: 45000,
          engagement: 4.2,
          responseTime: 15,
          topKeywords: ["quality", "service", "fast", "reliable"],
          sentiment: 0.8,
        },
        {
          handle: "@competitor2",
          followers: 32000,
          engagement: 3.8,
          responseTime: 25,
          topKeywords: ["affordable", "professional", "trusted"],
          sentiment: 0.7,
        },
      ])
      setLoading(false)
    }, 2000)
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">AI-Powered Competitor Analysis</h2>
        <p className="text-gray-400">Analyze your competitors&apos; Instagram presence and automation strategies</p>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Enter competitor's Instagram handle"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800/50 border-gray-700 text-gray-100 placeholder:text-gray-500"
        />
        <Button
          onClick={analyzeCompetitor}
          disabled={loading || !searchTerm}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {competitors.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {competitors.map((competitor) => (
            <Card
              key={competitor.handle}
              className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-100">{competitor.handle}</h3>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4 text-blue-400" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Followers</span>
                    </div>
                    <span className="font-medium">{competitor.followers.toLocaleString()}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-400">Engagement Rate</span>
                      </div>
                      <span className="font-medium">{competitor.engagement}%</span>
                    </div>
                    <Progress value={competitor.engagement * 10} className="bg-gray-700 h-1">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-gray-400">Response Time</span>
                      </div>
                      <span className="font-medium">{competitor.responseTime} mins</span>
                    </div>
                    <Progress value={100 - (competitor.responseTime / 30) * 100} className="bg-gray-700 h-1">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-gray-400">Sentiment Score</span>
                      </div>
                      <span className="font-medium">{competitor.sentiment * 100}%</span>
                    </div>
                    <Progress value={competitor.sentiment * 100} className="bg-gray-700 h-1">
                      <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                    </Progress>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Top Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {competitor.topKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 text-xs rounded-full bg-gray-800 border border-gray-700 text-gray-300"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

