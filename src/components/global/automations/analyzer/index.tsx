"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Search, AlertCircle, ArrowUpRight, Check, Lightbulb, Copy, Loader2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Define proper types for the analysis data
type WebsiteAnalysisResult = {
  businessType: string
  suggestedKeywords: string[]
  suggestedResponse: string
  websiteScreenshot?: string
}

type WebsiteAnalyzerProps = {
  onAnalysisComplete?: (analysis: WebsiteAnalysisResult) => void
}

export const WebsiteAnalyzer = ({ onAnalysisComplete }: WebsiteAnalyzerProps) => {
  const [url, setUrl] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<WebsiteAnalysisResult | null>(null)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [responseText, setResponseText] = useState("")
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null)

  // Function to analyze the website using the API
  const analyzeWebsite = async () => {
    if (!url) {
      setError("Please enter a website URL")
      return
    }

    // Basic URL validation
    let validUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      validUrl = "https://" + url
      setUrl(validUrl)
    }

    setAnalyzing(true)
    setError(null)

    try {
      // Call our API route that will handle the website analysis
      const response = await fetch("/api/analyze-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: validUrl }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      // Set the analysis data
      const analysisResult: WebsiteAnalysisResult = {
        businessType: data.businessType,
        suggestedKeywords: data.suggestedKeywords,
        suggestedResponse: data.suggestedResponse,
        websiteScreenshot: data.screenshot,
      }

      setAnalysis(analysisResult)
      setSelectedKeywords(data.suggestedKeywords.slice(0, 3))
      setResponseText(data.suggestedResponse)

      // Call the callback if provided
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult)
      }
    } catch (err) {
      console.error("Analysis error:", err)
      setError("An error occurred while analyzing the website. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]))
  }

  const copyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword)
    setCopiedKeyword(keyword)
    setTimeout(() => setCopiedKeyword(null), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-5 w-5 text-light-blue" />
        <h3 className="text-lg font-medium">Website Analyzer</h3>
      </div>

      <div className="bg-gradient-to-br from-background-80 to-background-90 p-4 rounded-xl border border-background-80">
        <div className="bg-background-80/50 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-light-blue mt-0.5" />
            <div>
              <p className="text-sm font-medium">Analyze your website for smart automation</p>
              <p className="text-xs text-text-secondary mt-1">
                Enter your website URL and our AI will analyze your business, suggest relevant keywords, and create
                customized responses that match your brand tone and offerings.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Enter your website URL (e.g., https://yourwebsite.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-background-90 border-background-80 pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Globe className="h-4 w-4 text-text-secondary" />
            </div>
          </div>
          <Button
            onClick={analyzeWebsite}
            disabled={analyzing || !url}
            className="bg-light-blue hover:bg-light-blue/90 min-w-[120px]"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg flex items-center gap-2 mb-4">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <AnimatePresence>
          {analysis && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="bg-background-90 p-3 rounded-lg flex-1">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Search className="h-4 w-4 mr-2 text-light-blue" />
                    Business Type: <span className="text-light-blue ml-2">{analysis.businessType}</span>
                  </h4>

                  <div className="relative aspect-video rounded-lg overflow-hidden bg-background-80">
                    <img
                      src={analysis.websiteScreenshot || "/placeholder.svg?height=400&width=600"}
                      alt="Website preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-90 to-transparent opacity-50"></div>
                    <div className="absolute bottom-2 right-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-background-90/80 hover:bg-background-90 h-8"
                        onClick={() => window.open(url, "_blank")}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Visit site</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-background-90 p-3 rounded-lg flex-1">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-light-blue" />
                    Suggested Keywords
                  </h4>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {analysis.suggestedKeywords.map((keyword) => (
                        <div
                          key={keyword}
                          className={cn(
                            "px-3 py-1 text-xs rounded-full flex items-center gap-1.5 transition-colors cursor-pointer group relative",
                            selectedKeywords.includes(keyword)
                              ? "bg-light-blue/20 text-light-blue border border-light-blue/30"
                              : "bg-background-80 text-text-secondary border border-background-80 hover:border-background-90 hover:text-white",
                          )}
                          onClick={() => toggleKeyword(keyword)}
                        >
                          <span>
                            {selectedKeywords.includes(keyword) && <Check className="h-3 w-3 inline-block mr-1" />}
                            {keyword}
                          </span>

                          <motion.button
                            className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 bottom-0 px-2 bg-background-80/90 rounded-r-full transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyKeyword(keyword)
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {copiedKeyword === keyword ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </motion.button>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-text-secondary bg-background-80 p-2 rounded-md">
                      <p>Click to select or deselect keywords. Selected keywords will be added to your automation.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background-90 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-light-blue" />
                  Suggested Response
                </h4>

                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Your AI-generated response will appear here. You can edit it to match your voice."
                  className="min-h-[120px] bg-background-80 border-background-80"
                />

                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-text-secondary">
                    <p>Edit this response to fit your brand tone and message.</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setResponseText(analysis.suggestedResponse)}
                    >
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      Reset
                    </Button>

                    <Button size="sm" className="text-xs bg-light-blue hover:bg-light-blue/90">
                      <Check className="h-3 w-3 mr-1" />
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-background-90 p-3 rounded-lg flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-text-secondary">Selected keywords: </span>
                  <span className="font-medium">
                    {selectedKeywords.length} of {analysis.suggestedKeywords.length}
                  </span>
                </div>

                <Button className="bg-gradient-to-r from-light-blue to-keyword-purple text-white">
                  Add to Automation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WebsiteAnalyzer

