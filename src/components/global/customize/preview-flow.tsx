"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send } from "lucide-react"

export function PreviewFlow() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "👋 Hi there! How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
        timestamp: new Date().toISOString(),
      },
      {
        role: "bot",
        content: "This is a preview of how your automation will respond to customer messages.",
        timestamp: new Date().toISOString(),
      },
    ])
    setInput("")
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Preview Your Flow</h2>
        <p className="text-gray-400">See how your automation will look and feel for your customers.</p>
      </div>

      <Card className="p-4 bg-gray-800/50 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h3 className="font-medium">Chat Preview</h3>
          </div>
        </div>

        <div className="h-[400px] space-y-4 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.role === "bot" ? "/placeholder.svg" : undefined} />
                <AvatarFallback>{message.role === "bot" ? "B" : "U"}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user" ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-100"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <time className="text-xs opacity-50">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="bg-purple-500 hover:bg-purple-600" disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </section>
  )
}

