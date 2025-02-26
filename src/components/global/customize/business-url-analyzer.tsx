"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Loader2,
  Facebook,
  Instagram,
  Twitter,
  LinkedinIcon,
  Chrome,
  Search,
  BarChart2,
  Palette,
  Target,
  Users,
  TrendingUp,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

type SocialPresence = {
  platform: string
  url: string
  followers: number
  engagement: number
  icon: any
}

type CompetitorInfo = {
  name: string
  url: string
  similarity: number
}

type AnalysisResult = {
  name: string
  description: string
  type: string
  highlights: string[]
  colors: string[]
  socialPresence: SocialPresence[]
  competitors: CompetitorInfo[]
  seoMetrics: {
    score: number
    metrics: {
      label: string
      value: number
      color: string
    }[]
  }
}

export function BusinessUrlAnalyzer() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  async function analyzeWebsite() {
    setLoading(true)
    setAnalysisProgress(0)

    try {
      // Simulate progressive analysis
      for (let i = 0; i <= 100; i += 20) {
        setAnalysisProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      // Simulated API response
      const data: AnalysisResult = {
        name: "Acme Corporation",
        description: "Leading provider of innovative solutions for businesses",
        type: "B2B Technology",
        highlights: [
          "Cloud-based solutions",
          "24/7 customer support",
          "Enterprise integration",
          "Custom development",
          "Global reach",
        ],
        colors: ["#3B82F6", "#10B981", "#6366F1", "#8B5CF6"],
        socialPresence: [
          {
            platform: "Instagram",
            url: "https://instagram.com/acme",
            followers: 25000,
            engagement: 4.2,
            icon: Instagram,
          },
          {
            platform: "LinkedIn",
            url: "https://linkedin.com/company/acme",
            followers: 15000,
            engagement: 2.8,
            icon: LinkedinIcon,
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/acme",
            followers: 18000,
            engagement: 3.5,
            icon: Twitter,
          },
          {
            platform: "Facebook",
            url: "https://facebook.com/acme",
            followers: 30000,
            engagement: 2.1,
            icon: Facebook,
          },
        ],
        competitors: [
          { name: "TechCorp", url: "https://techcorp.com", similarity: 85 },
          { name: "InnoSys", url: "https://innosys.com", similarity: 72 },
          { name: "FutureTech", url: "https://futuretech.com", similarity: 68 },
        ],
        seoMetrics: {
          score: 78,
          metrics: [
            { label: "Performance", value: 85, color: "green" },
            { label: "Accessibility", value: 92, color: "blue" },
            { label: "Best Practices", value: 88, color: "purple" },
            { label: "SEO Score", value: 95, color: "orange" },
          ],
        },
      }

      setAnalysis(data)
    } catch (error) {
      console.error("Failed to analyze website:", error)
    }
    setLoading(false)
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Analyze Your Website</h2>
        <p className="text-gray-400">
          Enter your website URL and we&apos;ll automatically extract relevant business information to customize your
          automation flow.
        </p>
      </div>

      <div className="flex gap-4">
        <Input
          type="url"
          placeholder="https://your-website.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-gray-800/50 border-gray-700 text-gray-100 placeholder:text-gray-500"
        />
        <Button
          onClick={analyzeWebsite}
          disabled={loading || !url}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Analyze
            </>
          )}
        </Button>
      </div>

      {loading && (
        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Analyzing website...</span>
              <span>{analysisProgress}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </Progress>
          </div>
        </Card>
      )}

      {analysis && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-purple-400">{analysis.name}</h3>
                <p className="mt-1 text-gray-400">{analysis.description}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-400 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Business Type
                </h4>
                <p className="mt-1 text-gray-400">{analysis.type}</p>
              </div>
              <div>
                <h4 className="font-medium text-green-400 flex items-center gap-2">
                  <Chrome className="w-4 h-4" />
                  Key Highlights
                </h4>
                <ul className="mt-2 space-y-1">
                  {analysis.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gray-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-pink-400 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Brand Colors
                </h4>
                <div className="mt-2 flex gap-2">
                  {analysis.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border border-gray-700"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-purple-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Social Media Presence
                </h4>
                <div className="mt-4 space-y-4">
                  {analysis.socialPresence.map((social) => (
                    <div key={social.platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <social.icon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400">{social.platform}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">{social.followers.toLocaleString()} followers</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">{social.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-orange-400 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Similar Businesses
                </h4>
                <div className="mt-4 space-y-3">
                  {analysis.competitors.map((competitor) => (
                    <div key={competitor.name} className="flex items-center justify-between">
                      <span className="text-gray-400">{competitor.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={competitor.similarity} className="w-24 h-1">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                        </Progress>
                        <span className="text-sm text-gray-500">{competitor.similarity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-blue-400 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" />
                  SEO Performance
                </h4>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Overall Score</span>
                    <div className="flex items-center gap-2">
                      <Progress value={analysis.seoMetrics.score} className="w-24 h-1">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                      </Progress>
                      <span className="text-sm text-gray-500">{analysis.seoMetrics.score}%</span>
                    </div>
                  </div>
                  {analysis.seoMetrics.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-gray-400">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={metric.value} className="w-24 h-1">
                          <div className={`h-full bg-${metric.color}-500 rounded-full`} />
                        </Progress>
                        <span className="text-sm text-gray-500">{metric.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  )
}

