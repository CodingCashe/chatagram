'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

enum MessageRole {
  User = 'user',
  Assistant = 'assistant'
}

interface Message {
  role: MessageRole;
  message: string;
}

const demoConversation: Message[] = [
  { role: MessageRole.User, message: 'Hey, Im interested in your products!' },
  { role: MessageRole.Assistant, message: 'Hii there! Thanks for your interest. What kind of products are you looking for?' },
  { role: MessageRole.User, message: 'Im looking for sustainable fashion items.' },
  { role: MessageRole.Assistant, message: 'Great choice! We have a wide range of sustainable fashion items. Are you interested in clothing, accessories, or both?' },
  { role: MessageRole.User, message: 'Mainly clothing, especially t-shirts and jeans.' },
  { role: MessageRole.Assistant, message: 'Excellent! We have a great selection of eco-friendly t-shirts and jeans. Would you like me to show you some of our bestsellers?' },
]

export default function InteractiveDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [demoStep, setDemoStep] = useState(0)

  useEffect(() => {
    if (demoStep < demoConversation.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, demoConversation[demoStep]])
        setDemoStep(prev => prev + 1)
      }, demoStep % 2 === 0 ? 1000 : 2000)
      return () => clearTimeout(timer)
    }
  }, [demoStep])

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages(prev => [...prev, { role: MessageRole.User, message: userInput }])
      setUserInput('')
      setTimeout(() => {
        setMessages(prev => [...prev, { role: MessageRole.Assistant, message: "That's a great question! I've forwarded it to our team, and they'll get back to you shortly with more information." }])
      }, 1500)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 max-w-md w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Chatal Demo</h3>
        <Button variant="outline" size="sm" onClick={() => {setMessages([]); setDemoStep(0)}}>
          Restart Demo
        </Button>
      </div>
      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start mb-4 ${msg.role === MessageRole.User ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-center ${msg.role === MessageRole.User ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`p-2 rounded-lg max-w-xs ${msg.role === MessageRole.User ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.message}
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === MessageRole.User ? 'bg-purple-200 ml-2' : 'bg-gray-300 mr-2'}`}>
                  {msg.role === MessageRole.User ? <User className="w-4 h-4 text-purple-600" /> : <MessageSquare className="w-4 h-4 text-gray-600" />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

