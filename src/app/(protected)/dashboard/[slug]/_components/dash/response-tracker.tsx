'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trackResponses } from '@/actions/webhook/queries'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

export function ResponseTracker() {
  const [responses, setResponses] = useState<{ comments: number; dms: number }>({ comments: 0, dms: 0 })

  useEffect(() => {
    async function fetchResponses() {
      try {
        const commentResponses = await trackResponses('some-automation-id', 'COMMENT')
        const dmResponses = await trackResponses('some-automation-id', 'DM')
        setResponses({
          comments: commentResponses?.commentCount ?? 0,
          dms: dmResponses?.dmCount ?? 0,
        })
      } catch (error) {
        console.error('Failed to fetch responses:', error)
      }
    }

    fetchResponses()
  }, [])

  const data = [
    { name: 'Comments', value: responses.comments },
    { name: 'DMs', value: responses.dms },
  ]

  const COLORS = ['#0088FE', '#00C49F']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
