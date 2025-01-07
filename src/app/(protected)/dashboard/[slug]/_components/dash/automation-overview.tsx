'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getKeywordAutomation } from '@/actions/webhook/queries'
import { Skeleton } from '@/components/ui/skeleton'

export function AutomationOverview() {
  const [automations, setAutomations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAutomations() {
      try {
        // Fetch automations for both DM and Comment types
        const dmAutomation = await getKeywordAutomation('some-id', true)
        const commentAutomation = await getKeywordAutomation('some-id', false)
        setAutomations([dmAutomation, commentAutomation].filter(Boolean))
      } catch (error) {
        console.error('Failed to fetch automations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAutomations()
  }, [])

  if (loading) {
    return <Skeleton className="w-full h-[200px]" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {automations.map((automation, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium">{automation.trigger[0]?.type} Automation</span>
              <span className="text-sm text-gray-500">
                {automation.listener.commentCount + automation.listener.dmCount} Total Responses
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

