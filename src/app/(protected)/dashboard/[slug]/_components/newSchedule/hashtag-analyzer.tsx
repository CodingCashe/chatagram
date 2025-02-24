"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, Users, BarChart3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface HashtagStats {
  tag: string
  reach: number
  engagement: number
  trending: boolean
}

interface HashtagAnalyzerProps {
  caption: string
  onSuggest: (hashtags: string[]) => void
}

export function HashtagAnalyzer({ caption, onSuggest }: HashtagAnalyzerProps) {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<HashtagStats[]>([])

  const analyzeHashtags = async () => {
    setLoading(true)
    try {
      // Extract hashtags from caption
      const hashtags = caption.match(/#[\w]+/g) || []

      // Simulate API call for hashtag analysis
      const response = await fetch("/api/analyze-hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hashtags: hashtags.map((tag) => tag.slice(1)) }),
      })

      const data = await response.json()
      setStats(data.stats)

      // Get suggested hashtags
      const suggestedResponse = await fetch("/api/suggest-hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          existingHashtags: hashtags.map((tag) => tag.slice(1)),
          caption,
        }),
      })

      const suggestedData = await suggestedResponse.json()
      onSuggest(suggestedData.hashtags)
    } catch (error) {
      console.error("Error analyzing hashtags:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-200">Hashtag Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={analyzeHashtags}
            disabled={loading || !caption}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Hashtags"
            )}
          </Button>

          <AnimatePresence>
            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {stats.map((stat) => (
                  <Card key={stat.tag} className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={stat.trending ? "default" : "secondary"} className="bg-gray-700">
                          #{stat.tag}
                        </Badge>
                        {stat.trending && <TrendingUp className="h-4 w-4 text-green-500" />}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users className="h-4 w-4" />
                          <span>{stat.reach.toLocaleString()} reach</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <BarChart3 className="h-4 w-4" />
                          <span>{stat.engagement}% engage</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

