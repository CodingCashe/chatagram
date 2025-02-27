"use client"

import { useState } from "react"
import { ArrowRight, Globe, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function WebsiteAnalyzer() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    industry: "",
    description: "",
    products: "",
    tone: "",
  })
  const [formattedDescription, setFormattedDescription] = useState("")

  const analyzeWebsite = async () => {
    if (!url) return

    setIsAnalyzing(true)

    // Simulate API call to analyze website
    setTimeout(() => {
      // This would be replaced with actual API data
      const mockData = {
        name: url.includes("example") ? "Example Business" : "Detected Business Name",
        industry: "E-commerce",
        description:
          "An online store specializing in handcrafted products with a focus on sustainability and ethical sourcing.",
        products: "Handmade jewelry, eco-friendly home goods, sustainable fashion",
        tone: "Friendly and professional",
      }

      setBusinessDetails(mockData)

      // Create a well-structured description
      const structured = `${mockData.name} is a ${mockData.industry} business that ${mockData.description} They offer ${mockData.products} and communicate in a ${mockData.tone} tone with their customers. Their Instagram automation should reflect this brand voice while efficiently handling customer inquiries about their products.`

      setFormattedDescription(structured)
      setIsAnalyzing(false)
      setIsComplete(true)
    }, 2500)
  }

  const resetAnalysis = () => {
    setIsComplete(false)
    setUrl("")
    setFormattedDescription("")
    setBusinessDetails({
      name: "",
      industry: "",
      description: "",
      products: "",
      tone: "",
    })
  }

  return (
    <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Globe className="h-6 w-6 text-purple-400" />
          Website Analyzer
        </CardTitle>
        <CardDescription className="text-gray-400">
          Enter your website URL and we'll extract key business details to help set up your automation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isComplete ? (
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                type="url"
                placeholder="https://your-business.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-gray-900 border-gray-700 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
              />
              <Button
                onClick={analyzeWebsite}
                disabled={!url || isAnalyzing}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    Analyze
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400">Scanning website content and extracting business information...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-400">
              <Check className="h-5 w-5" />
              <span>Analysis complete</span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Business Summary</h3>
                <Textarea
                  value={formattedDescription}
                  onChange={(e) => setFormattedDescription(e.target.value)}
                  className="min-h-[120px] bg-gray-900 border-gray-700 text-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Business Name</h3>
                  <Input
                    value={businessDetails.name}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, name: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Industry</h3>
                  <Input
                    value={businessDetails.industry}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, industry: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Products/Services</h3>
                  <Input
                    value={businessDetails.products}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, products: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Brand Tone</h3>
                  <Input
                    value={businessDetails.tone}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, tone: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {isComplete && (
          <Button variant="outline" onClick={resetAnalysis} className="border-gray-700 text-gray-300 hover:bg-gray-700">
            Reset Analysis
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

