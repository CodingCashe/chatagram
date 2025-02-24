"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react" // Icon for visual appeal
import { motion } from "framer-motion" // For subtle animations

export function ActiveConversations({ count }: { count: number }) {
  return (
    <Card className="w-full bg-gray-800 text-gray-100 shadow-lg border border-gray-700">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
            Active Conversations
          </CardTitle>
          <p className="text-sm md:text-base text-gray-400 mt-1">
            Real-time engagement in progress
          </p>
        </div>
        <MessageCircle className="w-10 h-10 text-indigo-400" />
      </CardHeader>
      <CardContent className="flex flex-col items-center py-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-6xl sm:text-7xl font-extrabold text-indigo-400"
        >
          {count}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-400 mt-2 text-sm"
        >
          Conversations in progress
        </motion.div>
      </CardContent>
    </Card>
  )
}
