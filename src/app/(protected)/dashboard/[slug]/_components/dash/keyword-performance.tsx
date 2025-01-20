'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { matchKeyword } from '@/actions/webhook/queries'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function KeywordPerformance() {
  const [keywords, setKeywords] = useState<any[]>([])

  useEffect(() => {
    async function fetchKeywords() {
      const sampleKeywords = ['instagram', 'automation', 'dm', 'marketing']
      const keywordData = await Promise.all(
        sampleKeywords.map(async (keyword) => {
          const match = await matchKeyword(keyword)
          return { keyword, count: match ? 1 : 0 }
        })
      )
      setKeywords(keywordData)
    }

    fetchKeywords()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={keywords}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="keyword" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

