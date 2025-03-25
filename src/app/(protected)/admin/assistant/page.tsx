"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, RefreshCw, Copy, Check, MessageSquare, FileText, Wand2, Lightbulb, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<
    {
      id: string
      role: "user" | "assistant"
      content: string
      timestamp: Date
    }[]
  >([
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Hi there! I'm your AI assistant for Instagram DM automation. I can help you create message templates, suggest automation strategies, analyze engagement, and more. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      const userQuery = input.toLowerCase()

      if (userQuery.includes("template") || userQuery.includes("message")) {
        response =
          "Here's a template you could use for welcoming new followers:\n\n```\nHi {{name}}! 👋 Thanks for following our account. We're excited to have you join our community. Feel free to check out our latest posts and let us know if you have any questions!\n```\n\nYou can customize this template with variables like {{name}} that will be automatically filled with the user's information."
      } else if (userQuery.includes("automation") || userQuery.includes("workflow")) {
        response =
          "For effective DM automation, I recommend setting up these workflows:\n\n1. **Welcome Message**: Send automatically when someone follows you\n2. **Engagement Follow-up**: Send when someone comments on your post multiple times\n3. **Re-engagement**: Send to followers who haven't interacted in 30+ days\n\nWould you like me to help you set up any of these workflows?"
      } else if (userQuery.includes("analytics") || userQuery.includes("performance")) {
        response =
          "Based on your recent automation performance, your welcome messages have a 68% response rate, which is above industry average. Your promotional messages are performing at 42% engagement, which could be improved. I suggest A/B testing different message formats for your promotional content to see what resonates better with your audience."
      } else {
        response =
          "I can help you with creating message templates, setting up automation workflows, analyzing performance, and optimizing your Instagram DM strategy. Could you provide more details about what you're looking to accomplish?"
      }

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)

    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard",
    })

    setTimeout(() => setCopied(null), 2000)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "👋 Hi there! I'm your AI assistant for Instagram DM automation. I can help you create message templates, suggest automation strategies, analyze engagement, and more. How can I help you today?",
        timestamp: new Date(),
      },
    ])
  }

  const formatMessage = (content: string) => {
    // Handle code blocks
    const formattedContent = content.replace(/```([\s\S]*?)```/g, (match, code) => {
      return (
        <div className="bg-muted p-3 rounded-md my-2 font-mono text-sm relative">
          <pre className="whitespace-pre-wrap">{code.trim()}</pre>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 opacity-70 hover:opacity-100"
            onClick={() => copyToClipboard(code.trim(), match)}
          >
            {copied === match ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      ) as unknown as string
    })

    // Handle line breaks
    return formattedContent.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ))
  }

  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Get help with message templates, automation strategies, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-220px)]">
            <CardHeader className="p-4 border-b">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  <CardDescription>Powered by advanced AI</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={clearChat}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow overflow-auto">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex gap-3 max-w-[80%]">
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="whitespace-pre-wrap break-words">
                          {typeof message.content === "string" ? formatMessage(message.content) : message.content}
                        </div>
                        <div className="mt-1 text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div
                            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex w-full gap-2">
                <Textarea
                  placeholder="Ask about templates, automation strategies, or analytics..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[60px] flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="h-auto">
                  {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Prompts</CardTitle>
              <CardDescription>Common questions to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => {
                  setInput("Create a template for welcoming new followers")
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Create a welcome template</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => {
                  setInput("Suggest automation workflows for my Instagram")
                }}
              >
                <Bot className="h-4 w-4 mr-2" />
                <span>Suggest automation workflows</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => {
                  setInput("How can I improve my DM response rate?")
                }}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                <span>Improve response rates</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => {
                  setInput("Analyze my automation performance")
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                <span>Analyze performance</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
              <CardDescription>What this assistant can do</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Wand2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Create personalized message templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Design automation workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Analyze engagement metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Provide optimization suggestions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// "use client"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function AIAssistantPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
//       <Card>
//         <CardHeader>
//           <CardTitle>AI Assistant</CardTitle>
//           <CardDescription>Get help with templates, automation strategies, and more</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">This feature is coming soon. Check back later!</p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

