"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Target, Sparkles, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CaptionVariant {
  text: string
  predictedEngagement: number
  targetAudience: string[]
  recommended: boolean
}

interface ABTestingProps {
  originalCaption: string
  onSelectVariant: (caption: string) => void
}

export function ABTesting({ originalCaption, onSelectVariant }: ABTestingProps) {
  const [loading, setLoading] = useState(false)
  const [variants, setVariants] = useState<CaptionVariant[]>([])

  const generateVariants = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate-caption-variants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: originalCaption }),
      })

      const data = await response.json()
      setVariants(data.variants)
    } catch (error) {
      console.error("Error generating variants:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-200">A/B Testing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={generateVariants}
            disabled={loading || !originalCaption}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Variants...
              </>
            ) : (
              "Generate Caption Variants"
            )}
          </Button>

          <AnimatePresence>
            {variants.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-4"
              >
                {variants.map((variant, index) => (
                  <Card
                    key={index}
                    className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-all hover:bg-gray-700/50 ${
                      variant.recommended ? "ring-2 ring-green-500/50" : ""
                    }`}
                    onClick={() => onSelectVariant(variant.text)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-gray-700">Variant {index + 1}</Badge>
                        {variant.recommended && (
                          <Badge className="bg-green-900/50 text-green-400">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <Textarea
                        value={variant.text}
                        readOnly
                        className="mb-2 bg-gray-800/50 border-gray-700 text-gray-200"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Target className="h-4 w-4" />
                          <span>Target: {variant.targetAudience.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Sparkles className="h-4 w-4" />
                          <span>{variant.predictedEngagement}% predicted engagement</span>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-gray-200"
                        onClick={() => onSelectVariant(variant.text)}
                      >
                        Use This Variant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
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

