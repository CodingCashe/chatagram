"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Dm {
  id: string
  senderId: string | null
  message: string | null
  createdAt: Date
  Automation: { name: string } | null
}

export function RecentDms({ dms }: { dms: Dm[] }) {
  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Recent DMs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {dms.map((dm) => (
            <div key={dm.id} className="mb-4">
              <p className="text-sm text-gray-400">
                {new Date(dm.createdAt).toLocaleString()} - Automation: {dm.Automation?.name || "N/A"}
              </p>
              <p className="mt-1">
                From: {dm.senderId || "Unknown"} - {dm.message}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

