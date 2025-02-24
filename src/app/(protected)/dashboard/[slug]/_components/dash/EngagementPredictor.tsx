"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const EngagementPredictor = () => {
  const [content, setContent] = useState("")
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const predictEngagement = async () => {
    setLoading(true)
    // Simulating API call to AI service
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setPrediction(Math.floor(Math.random() * 10000))
    setLoading(false)
  }

  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/10">
      <CardHeader>
        <CardTitle className="text-foreground">AI Engagement Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 bg-background/50 border-primary/20 text-foreground placeholder:text-muted-foreground"
        />
        <Button
          onClick={predictEngagement}
          disabled={!content || loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Predict Engagement
        </Button>
        {prediction !== null && (
          <div className="mt-4">
            <p className="text-lg font-medium text-foreground">Predicted Likes:</p>
            <p className="text-3xl font-bold text-primary">{prediction.toLocaleString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EngagementPredictor

