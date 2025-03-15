"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, Send, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AiChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! 👋 I'm your Instagram DM assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const predefinedResponses: Record<string, string> = {
    "Do you offer international shipping?":
      "Yes, we ship to over 50 countries worldwide! Shipping costs vary by location. Would you like me to check the shipping cost for your country?",
    "What's your return policy?":
      "We offer a 30-day satisfaction guarantee! If you're not happy with your purchase, you can return it within 30 days for a full refund or exchange.",
    "Are there any discounts available?":
      "Great question! We currently have a special promotion: 15% off your first order with code WELCOME15. Would you like me to apply this to your cart?",
    "How long does shipping take?":
      "Domestic orders typically arrive in 3-5 business days. International shipping can take 7-14 business days depending on your location and customs processing.",
    "Can I track my order?":
      "Once your order ships, you'll receive a tracking number via email. You can also check your order status anytime in your account dashboard.",
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI typing
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let response = "I will need to check on that for you. Let me connect you with our team for more information!"

      // Check for predefined responses
      for (const [question, answer] of Object.entries(predefinedResponses)) {
        if (input.toLowerCase().includes(question.toLowerCase().split(" ")[0])) {
          response = answer
          break
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="bg-slate-900 border border-blue-900/50 rounded-xl overflow-hidden shadow-xl shadow-blue-900/20 h-[400px] flex flex-col">
      <div className="bg-slate-800 p-3 border-b border-blue-900/30 flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
          <Bot className="h-4 w-4 text-blue-400" />
        </div>
        <div>
          <div className="font-medium text-white">Yazil Assistant</div>
          <div className="text-xs text-slate-400 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
            Online
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 flex-shrink-0">
                <Bot className="h-4 w-4 text-blue-400" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-slate-800 text-slate-200 rounded-tl-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>

            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ml-2 flex-shrink-0">
                <User className="h-4 w-4 text-slate-300" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-2">
              <Bot className="h-4 w-4 text-blue-400" />
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-blue-900/30">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 border-none rounded-l-full px-4 py-2 text-sm text-white focus:outline-none"
          />
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 rounded-r-full px-3 py-2 h-10">
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-blue-400 mr-1.5" />
          <span className="text-xs text-slate-400">Try asking about shipping, returns, or discounts</span>
        </div>
      </div>
    </div>
  )
}

