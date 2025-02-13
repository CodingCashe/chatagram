import type React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Message } from "@/types/dashboard"

interface MessageBubbleProps {
  message: Message
  isLastMessage: boolean
  botName: string
  botAvatar: string
  getFancyName: (userId: string | undefined) => string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLastMessage, botName, botAvatar, getFancyName }) => {
  const isAssistant = message.role === "assistant"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end mb-4 ${isAssistant ? "justify-end" : "justify-start"}`}
    >
      {isAssistant ? (
        <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
          <AvatarImage src={botAvatar} />
          <AvatarFallback>{botName.slice(0, 2)}</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId || "default"}`} />
          <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
        </Avatar>
      )}
      <motion.div
        className={cn(
          "max-w-[75%] p-3 rounded-3xl text-sm relative",
          isAssistant
            ? "bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 text-white"
            : "bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-2 border-purple-500/50 text-white",
        )}
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="break-words relative z-10">{message.content}</p>
        <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
          <p>{new Date(message.createdAt).toLocaleString()}</p>
          {isAssistant && (
            <div className={`flex items-center ${message.status === "sent" ? "text-green-400" : "text-red-400"}`}>
              {message.status === "sent" ? (
                <>
                  <Check size={12} className="mr-1" />
                  <span>Sent</span>
                </>
              ) : (
                <span>Failed</span>
              )}
            </div>
          )}
        </div>
        <motion.div
          className={cn(
            "absolute inset-0 rounded-3xl opacity-20",
            isAssistant
              ? "bg-gradient-to-br from-blue-400 to-blue-600"
              : "bg-gradient-to-br from-purple-400 to-purple-600",
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MessageBubble

