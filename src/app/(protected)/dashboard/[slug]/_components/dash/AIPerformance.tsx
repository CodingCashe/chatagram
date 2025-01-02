'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const AIPerformance = () => {
  const metrics = [
    { label: 'Response Accuracy', value: 95 },
    { label: 'Sentiment Analysis', value: 88 },
    { label: 'Intent Recognition', value: 92 },
    { label: 'Language Processing', value: 97 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span>{metric.label}</span>
                <span className="font-bold">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default AIPerformance

