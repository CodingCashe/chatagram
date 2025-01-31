import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  status?: "sending" | "sent" | "error"
}

const gradientBorders = {
  user: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  assistant: "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, timestamp, status }) => {
  return (
    <div
      className={cn(
        "max-w-[75%] p-[2px] rounded-3xl",
        gradientBorders[role],
        role === "assistant" ? "rounded-tl-sm" : "rounded-tr-sm self-end",
      )}
    >
      <div
        className={cn(
          "p-4 rounded-3xl backdrop-blur-md backdrop-filter",
          role === "assistant" ? "bg-primary/10" : "bg-secondary/10",
        )}
      >
        <p className="break-words text-sm">{content}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          {role === "assistant" && status && <MessageStatus status={status} />}
        </div>
      </div>
    </div>
  )
}

const MessageStatus: React.FC<{ status: "sending" | "sent" | "error" }> = ({ status }) => {
  if (status === "sending") {
    return <SendingAnimation />
  }
  if (status === "sent") {
    return (
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500 text-xs">
        Delivered
      </motion.span>
    )
  }
  if (status === "error") {
    return (
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-500 text-xs">
        Failed to send
      </motion.span>
    )
  }
  return null
}

const SendingAnimation: React.FC = () => {
  return (
    <div className="flex space-x-1">
      {["bg-blue-500", "bg-green-500", "bg-red-500"].map((color, index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full ${color}`}
          animate={{
            y: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export default ChatBubble

