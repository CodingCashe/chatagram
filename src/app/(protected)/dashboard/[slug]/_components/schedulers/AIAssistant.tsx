"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Send } from "lucide-react"
import { motion } from "framer-motion"

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement AI assistant API call
    const aiResponse = await fetch("/api/ai-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
    const data = await aiResponse.json()
    setResponse(data.response)
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Label htmlFor="prompt" className="text-gray-300 mb-2 block">
          Ask AI Assistant
        </Label>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-gray-600/50 border-gray-500 text-gray-200 flex-grow"
            placeholder="E.g., Suggest a caption for a sunset photo"
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
            {isLoading ? <Sparkles className="animate-spin" /> : <Send />}
          </Button>
        </form>
      </motion.div>

      {response && (
        <motion.div
          className="bg-gray-700/50 p-4 rounded-lg shadow-inner backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Label className="text-gray-300 mb-2 block">AI Response</Label>
          <Textarea value={response} readOnly className="bg-gray-600/50 border-gray-500 text-gray-200 min-h-[100px]" />
        </motion.div>
      )}
    </div>
  )
}

