"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ActiveConversations({ count }: { count: number }) {
  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Active Conversations</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{count}</p>
      </CardContent>
    </Card>
  )
}

