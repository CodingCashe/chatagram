"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { MessageSquare, Check } from "lucide-react"
import PlaceholderChat from "./placeHolder"

interface Message {
  id: string
  senderId: string
  content: string
  createdAt: Date
}

interface Conversation {
  id: string
  pageId: string
  messages: Message[]
  Automation: { id: string; name: string } | null
}

interface Automation {
  id: string
  name: string
}

const BOT_ID = "bot"

export function RecentConversations({
  conversations,
  automations,
}: {
  conversations: Conversation[]
  automations: Automation[]
}) {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
  const [floatingDate, setFloatingDate] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const filteredConversations = selectedAutomation
    ? conversations.filter((conv) => conv.Automation?.id === selectedAutomation)
    : []

  const sortedConversations = [...filteredConversations].sort(
    (a, b) =>
      new Date(b.messages[b.messages.length - 1].createdAt).getTime() -
      new Date(a.messages[a.messages.length - 1].createdAt).getTime(),
  )

  const groupedMessages = sortedConversations
    .flatMap((conv) => conv.messages)
    .reduce(
      (groups, message) => {
        const date = format(new Date(message.createdAt), "yyyy-MM-dd")
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(message)
        return groups
      },
      {} as Record<string, Message[]>,
    )

  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const handleScroll = () => {
        const scrollPosition = scrollArea.scrollTop
        const scrollHeight = scrollArea.scrollHeight
        const clientHeight = scrollArea.clientHeight

        let currentDate = null
        for (const [date, messages] of Object.entries(groupedMessages)) {
          const firstMessageElement = document.getElementById(`date-${date}`)
          if (firstMessageElement && firstMessageElement.offsetTop <= scrollPosition) {
            currentDate = date
          } else {
            break
          }
        }

        setFloatingDate(currentDate ? format(new Date(currentDate), "EEEE, MMMM d") : null)
      }

      scrollArea.addEventListener("scroll", handleScroll)
      return () => scrollArea.removeEventListener("scroll", handleScroll)
    }
  }, [groupedMessages])

  return (
    <Card className="w-full overflow-hidden bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 relative border-none fancy-border">
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between space-y-0 pb-2 z-10">
          <span className="text-gray-200 flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-400" />
            Recent Conversations
          </span>
          <Select onValueChange={(value) => setSelectedAutomation(value)}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-200">
              <SelectValue placeholder="Select Automation" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
              {automations.map((automation) => (
                <SelectItem key={automation.id} value={automation.id}>
                  {automation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {selectedAutomation ? (
            <AnimatePresence>
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <motion.div
                  key={date}
                  id={`date-${date}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center text-sm text-gray-400 my-2">{format(new Date(date), "EEEE, MMMM d")}</div>
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isBot = message.senderId === BOT_ID
                      const formattedTime = format(new Date(message.createdAt), "HH:mm")

                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${isBot ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex items-end space-x-2 ${isBot ? "flex-row-reverse" : "flex-row"}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={isBot ? "https://i.pravatar.cc/150?img=13" : "https://i.pravatar.cc/150?img=32"}
                              />
                              <AvatarFallback>{isBot ? "B" : "C"}</AvatarFallback>
                            </Avatar>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`max-w-xs px-4 py-2 rounded-2xl shadow-lg ${
                                isBot ? "chat-bubble-bot" : "chat-bubble-client"
                              }`}
                            >
                              <p className="text-sm text-gray-100">{message.content}</p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-400">{formattedTime}</p>
                                {isBot && (
                                  <div className="flex items-center text-xs text-gray-400">
                                    <span className="mr-1">sent</span>
                                    <Check className="w-3 h-3" />
                                    <Check className="w-3 h-3 -ml-2" />
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <PlaceholderChat />
          )}
        </ScrollArea>
      </CardContent>
      <AnimatePresence>
        {floatingDate && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-200 px-4 py-2 rounded-full shadow-lg z-10 border border-gray-700"
          >
            {floatingDate}
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .fancy-border {
          background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
          padding: 3px;
        }
        .fancy-border::before {
          content: "";
          position: absolute;
          inset: 3px;
          background: #1a1a1a;
          border-radius: inherit;
          z-index: 0;
        }
        .chat-bubble-client {
          background-color: rgba(31, 41, 55, 0.8);
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #ff6b6b, #feca57);
          border-image-slice: 1;
        }
        .chat-bubble-bot {
          background-color: rgba(31, 41, 55, 0.8);
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #4facfe, #00f2fe);
          border-image-slice: 1;
        }
        .chat-bubble-client, .chat-bubble-bot {
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        }
        .chat-bubble-client:hover, .chat-bubble-bot:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Card>
  )
}

