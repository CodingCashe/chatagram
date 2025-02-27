"use client"

import { useState } from "react"
import { Eye, Send, User, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  sender: "bot" | "user"
  content: string
  timestamp: Date
}

export default function PreviewFlow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      content: "👋 Hi there! Thanks for reaching out to us on Instagram! What brings you to our page today?",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after delay
    setTimeout(() => {
      let botResponse = ""

      if (inputValue.toLowerCase().includes("price") || inputValue.toLowerCase().includes("cost")) {
        botResponse =
          "Our pricing starts at $49/month for the basic plan. Would you like me to tell you more about what's included?"
      } else if (inputValue.toLowerCase().includes("help") || inputValue.toLowerCase().includes("support")) {
        botResponse = "I'd be happy to help! Could you please tell me more about what you need assistance with?"
      } else if (inputValue.toLowerCase().includes("product") || inputValue.toLowerCase().includes("service")) {
        botResponse =
          "We offer Instagram automation services that help businesses like yours engage with customers 24/7. Would you like to see our most popular features?"
      } else {
        botResponse =
          "Thanks for your message! To better assist you, could you let me know if you're interested in our services, have a question about pricing, or need technical support?"
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        content: botResponse,
        timestamp: new Date(),
      }

      setIsTyping(false)
      setMessages((prevMessages) => [...prevMessages, botMessage])
    }, 1500)
  }

  const resetConversation = () => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        content: "👋 Hi there! Thanks for reaching out to us on Instagram! What brings you to our page today?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Eye className="h-6 w-6 text-purple-400" />
          Preview Your Flow
        </CardTitle>
        <CardDescription className="text-gray-400">
          See how your automation will look and feel to your customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
          <div className="bg-gray-800 p-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Business" />
                <AvatarFallback className="bg-purple-700 text-white">BP</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-200">Business Page</p>
                <p className="text-xs text-gray-400">Instagram DM</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetConversation}
              className="h-8 w-8 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 h-[350px] overflow-y-auto flex flex-col gap-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Business" />
                    <AvatarFallback className="bg-purple-700 text-white">BP</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-200"
                  }`}
                >
                  {message.content}
                  <div className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-gray-600">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Business" />
                  <AvatarFallback className="bg-purple-700 text-white">BP</AvatarFallback>
                </Avatar>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-700 flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

