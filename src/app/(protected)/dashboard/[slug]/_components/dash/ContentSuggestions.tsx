"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ContentSuggestions = () => {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const generateSuggestions = async () => {
    setLoading(true)
    // Simulating API call to AI service
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const newSuggestions = [
      "Share a behind-the-scenes look at your creative process",
      "Create a poll asking followers about their favorite product",
      "Post a user-generated content challenge",
      "Share an inspiring quote related to your niche",
      "Create a tutorial video on how to use your product",
    ]
    setSuggestions(newSuggestions)
    setLoading(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(".suggestion-item")
      elements.forEach((el) => {
        el.classList.add("pulse")
        setTimeout(() => el.classList.remove("pulse"), 1000)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="relative">
        <CardTitle className="flex justify-between items-center z-10">
          <span className="text-foreground font-bold flex items-center">
            <Sparkles className="w-5 h-5 text-primary mr-2" />
            AI Content Suggestions
          </span>
          <Button
            size="sm"
            onClick={generateSuggestions}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <AnimatePresence>
          {suggestions.length > 0 ? (
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  className="suggestion-item bg-background/50 p-3 rounded-md border border-primary/20 shadow-lg backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-background/70"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="flex items-start">
                    <Sparkles className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-foreground">{suggestion}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.p
              className="text-center text-muted-foreground py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Click generate to get AI-powered content suggestions
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.7); }
          70% { box-shadow: 0 0 0 10px hsl(var(--primary) / 0); }
          100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0); }
        }
        .suggestion-item.pulse {
          animation: pulse 1s;
        }
      `}</style>
    </Card>
  )
}

export default ContentSuggestions

