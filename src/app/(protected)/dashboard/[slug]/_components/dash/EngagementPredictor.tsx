'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

const EngagementPredictor = () => {
  const [content, setContent] = useState('')
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const predictEngagement = async () => {
    setLoading(true)
    // Simulating API call to AI service
    await new Promise(resolve => setTimeout(resolve, 2000))
    setPrediction(Math.floor(Math.random() * 10000))
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Engagement Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4"
        />
        <Button onClick={predictEngagement} disabled={!content || loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Predict Engagement
        </Button>
        {prediction !== null && (
          <div className="mt-4">
            <p className="text-lg font-medium">Predicted Likes:</p>
            <p className="text-3xl font-bold">{prediction.toLocaleString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EngagementPredictor

