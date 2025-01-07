'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getChatHistory } from '@/actions/webhook/queries'

export function RecentActivity() {
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const history = await getChatHistory('user123', 'bot')
        setActivities(history.history.slice(-5).reverse())
      } catch (error) {
        console.error('Failed to fetch recent activity:', error)
      }
    }

    fetchRecentActivity()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className={`text-xs ${activity.role === 'assistant' ? 'text-blue-500' : 'text-green-500'}`}>
                {activity.role === 'assistant' ? 'Bot' : 'User'}:
              </span>
              <span className="text-sm">{activity.content}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

