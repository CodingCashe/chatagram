"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const SentimentAnalysis = () => {
  const [sentiment, setSentiment] = useState({ positive: 0, neutral: 0, negative: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment({
        positive: Math.random() * 100,
        neutral: Math.random() * 100,
        negative: Math.random() * 100,
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const total = sentiment.positive + sentiment.neutral + sentiment.negative

  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/10">
      <CardHeader>
        <CardTitle className="text-foreground">Real-time Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end h-40">
          {Object.entries(sentiment).map(([key, value]) => (
            <motion.div
              key={key}
              className="w-1/4 bg-primary"
              initial={{ height: 0 }}
              animate={{ height: `${(value / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {Object.entries(sentiment).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-sm font-medium text-muted-foreground capitalize">{key}</div>
              <div className="text-2xl font-bold text-foreground">{Math.round((value / total) * 100)}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SentimentAnalysis

