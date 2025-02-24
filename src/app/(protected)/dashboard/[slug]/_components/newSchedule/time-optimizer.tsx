"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Clock, Users, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TimeSlot {
  time: string
  engagement: number
  audience: number
  recommended: boolean
}

interface TimeOptimizerProps {
  onSelectTime: (time: string) => void
}

export function TimeOptimizer({ onSelectTime }: TimeOptimizerProps) {
  const [loading, setLoading] = useState(false)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])

  const analyzePostingTime = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/analyze-posting-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()
      setTimeSlots(data.timeSlots)
    } catch (error) {
      console.error("Error analyzing posting time:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-200">Best Time to Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={analyzePostingTime}
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Find Best Time"
            )}
          </Button>

          <AnimatePresence>
            {timeSlots.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-4"
              >
                {timeSlots.map((slot) => (
                  <Card
                    key={slot.time}
                    className={`bg-gray-800/50 border-gray-700 cursor-pointer transition-all hover:bg-gray-700/50 ${
                      slot.recommended ? "ring-2 ring-green-500/50" : ""
                    }`}
                    onClick={() => onSelectTime(slot.time)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-200">{slot.time}</span>
                        </div>
                        {slot.recommended && (
                          <Badge className="bg-green-900/50 text-green-400">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users className="h-4 w-4" />
                          <span>{slot.audience}% audience active</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Sparkles className="h-4 w-4" />
                          <span>{slot.engagement}% engagement</span>
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

