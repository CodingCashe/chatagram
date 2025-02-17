"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface PublishingLimitCheckProps {
  userId: string
}

export default function PublishingLimitCheck({ userId }: PublishingLimitCheckProps) {
  const [limit, setLimit] = useState<number | null>(null)
  const [used, setUsed] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkLimit() {
      try {
        const response = await fetch(`/api/check-publishing-limit?userId=${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch publishing limit")
        }
        const data = await response.json()
        setLimit(data.quota_total)
        setUsed(data.quota_usage)
      } catch (err) {
        setError("Failed to fetch publishing limit")
        console.error(err)
      }
    }

    checkLimit()
  }, [userId])

  if (error) {
    return (
      <Card className="bg-red-100 border-red-300">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-800">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (limit === null || used === null) {
    return (
      <Card>
        <CardContent>
          <p>Loading publishing limit...</p>
        </CardContent>
      </Card>
    )
  }

  const remaining = limit - used
  const usagePercentage = (used / limit) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishing Limit</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          You have used {used} out of {limit} posts in the last 24 hours.
        </p>
        <p>Remaining: {remaining} posts</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
        </div>
        {remaining <= 5 && <p className="text-yellow-600 mt-2">Warning: You're close to your publishing limit!</p>}
      </CardContent>
    </Card>
  )
}

