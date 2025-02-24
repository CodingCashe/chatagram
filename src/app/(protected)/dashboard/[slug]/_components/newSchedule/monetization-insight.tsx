"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MonetizationInsight {
  type: string
  potential: number
  audience: number
  conversion: number
  recommended: boolean
}

export function MonetizationInsights() {
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState<MonetizationInsight[]>([])

  const analyzeMonetization = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/analyze-monetization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()
      setInsights(data.insights)
    } catch (error) {
      console.error("Error analyzing monetization:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-200">Monetization Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={analyzeMonetization}
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Monetization Potential"
            )}
          </Button>

          <AnimatePresence>
            {insights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {insights.map((insight) => (
                  <Card
                    key={insight.type}
                    className={`bg-gray-800/50 border-gray-700 ${
                      insight.recommended ? "ring-2 ring-green-500/50" : ""
                    }`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-gray-700">
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          {insight.type}
                        </Badge>
                        {insight.recommended && <Badge className="bg-green-900/50 text-green-400">Recommended</Badge>}
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center justify-between text-gray-400">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Potential Revenue
                          </span>
                          <span className="text-green-400">${insight.potential}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Target Audience
                          </span>
                          <span>{insight.audience}k</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-400">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            Conv. Rate
                          </span>
                          <span>{insight.conversion}%</span>
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

