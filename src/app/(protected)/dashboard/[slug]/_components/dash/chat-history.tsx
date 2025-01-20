'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getChatHistory } from '@/actions/webhook/queries'

export function ChatHistory() {
  const [chatHistory, setChatHistory] = useState<any[]>([])

  useEffect(() => {
    async function fetchChatHistory() {
      try {
        const history = await getChatHistory('user123', 'bot')
        setChatHistory(history.history)
      } catch (error) {
        console.error('Failed to fetch chat history:', error)
      }
    }

    fetchChatHistory()
  }, [])

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Chat History</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-2 ${
                    message.role === 'assistant'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-green-100 text-green-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

