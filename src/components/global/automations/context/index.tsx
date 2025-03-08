"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LightbulbIcon, X, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

type Tip = {
  id: string
  context: string
  title: string
  content: string
  icon?: React.ReactNode
}

const AUTOMATION_TIPS: Tip[] = [
  {
    id: "keywords-count",
    context: "keywords",
    title: "Keyword Best Practices",
    content: "Adding 3-5 keywords works best for most automations. Too many can trigger unwanted responses.",
  },
  {
    id: "keywords-count",
    context: "keywords",
    title: "Keyword Best Practices",
    content: "Make sure the keywords are short memorable and common words",
  },
  {
    id: "response-length",
    context: "response",
    title: "Keep Responses Concise",
    content: "Responses under 280 characters tend to get better engagement. Be friendly but direct.",
  },
  {
    id: "post-selection",
    context: "posts",
    title: "Choose High-Engagement Posts",
    content: "Posts with questions or calls-to-action in the caption typically generate more comments.",
  },
  {
    id: "trigger-timing",
    context: "trigger",
    title: "Set Response Timing",
    content: "Consider when your audience is most active. Responding within 30 minutes improves engagement by 42%.",
  },
  {
    id: "scheduled-posts",
    context: "scheduled",
    title: "Plan Ahead",
    content: "Set up automations for scheduled posts before they go live to ensure immediate responses.",
  },
]

type ContextCardProps = {
  context: string
  onClose?: (id: string) => void
}

export const ContextCard = ({ context, onClose }: ContextCardProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [tipIndex, setTipIndex] = useState(0)
  const [dismissedTips, setDismissedTips] = useState<string[]>([])

  // Filter tips by context and not dismissed
  const relevantTips = AUTOMATION_TIPS.filter((tip) => tip.context === context && !dismissedTips.includes(tip.id))

  const currentTip = relevantTips[tipIndex]

  useEffect(() => {
    if (relevantTips.length === 0) {
      setIsVisible(false)
      return
    }

    // Reset tip index if it's out of bounds
    if (tipIndex >= relevantTips.length) {
      setTipIndex(0)
    }
  }, [tipIndex, relevantTips.length])

  const handleDismiss = () => {
    if (currentTip) {
      setDismissedTips([...dismissedTips, currentTip.id])

      // Move to next tip or hide if no more tips
      if (tipIndex < relevantTips.length - 1) {
        setTipIndex(tipIndex + 1)
      } else {
        setIsVisible(false)
      }

      if (onClose) onClose(currentTip.id)
    }
  }

  const handleNext = () => {
    if (tipIndex < relevantTips.length - 1) {
      setTipIndex(tipIndex + 1)
    } else {
      setTipIndex(0) // Cycle back to first tip
    }
  }

  if (!isVisible || !currentTip) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-br from-background-80 to-background-90 border border-background-80 rounded-lg p-3 shadow-lg my-3 relative overflow-hidden"
      >
        {/* Animated gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-light-blue via-keyword-purple to-light-blue bg-[length:200%_100%] animate-gradient-x" />

        <div className="flex items-start">
          <div className="bg-light-blue/10 rounded-full p-2 mr-3">
            <LightbulbIcon className="h-4 w-4 text-light-blue" />
          </div>

          <div className="flex-1 pr-6">
            <h4 className="text-sm font-medium mb-1">{currentTip.title}</h4>
            <p className="text-xs text-text-secondary">{currentTip.content}</p>

            <div className="flex items-center mt-2 pt-1 justify-between">
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-text-secondary" onClick={handleNext}>
                  Next tip
                </Button>

                <div className="flex items-center gap-0.5 text-xs text-text-secondary px-2">
                  <span>{tipIndex + 1}</span>
                  <span>/</span>
                  <span>{relevantTips.length}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="h-6 w-6 p-0 rounded-full text-text-secondary hover:text-light-blue hover:bg-light-blue/10"
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-6 w-6 p-0 rounded-full text-text-secondary hover:text-keyword-red hover:bg-keyword-red/10"
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="absolute right-1 top-1 h-6 w-6 p-0 rounded-full text-text-secondary hover:bg-background-80"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

