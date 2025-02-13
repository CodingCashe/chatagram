import type React from "react"
import { motion } from "framer-motion"

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, repeatType: "loop" }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2, repeatType: "loop" }}
      />
      <motion.div
        className="w-2 h-2 bg-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4, repeatType: "loop" }}
      />
    </div>
  )
}

export default TypingIndicator

