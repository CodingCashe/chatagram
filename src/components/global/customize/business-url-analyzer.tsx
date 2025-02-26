"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Globe } from "lucide-react"

export function BusinessUrlAnalyzer() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<null | {
    name: string
    description: string
    type: string
    highlights: string[]
  }>(null)

  async function analyzeWebsite() {
    setLoading(true)
    try {
      const response = await fetch("/api/analyze-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
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
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {analysis && (
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-purple-400">{analysis.name}</h3>
              <p className="mt-1 text-gray-400">{analysis.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-pink-400">Business Type</h4>
              <p className="mt-1 text-gray-400">{analysis.type}</p>
            </div>
            <div>
              <h4 className="font-medium text-pink-400">Key Highlights</h4>
              <ul className="mt-2 space-y-1">
                {analysis.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-400">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </section>
  )
}

