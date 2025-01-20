"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  message: string
  createdAt: Date
  senderId: string
  pageId: string
}

export function RecentMessages({ messages }: { messages: Message[] }) {
  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {messages.map((message, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm text-gray-400">{new Date(message.createdAt).toLocaleString()}</p>
              <p className="mt-1">{message.message}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

