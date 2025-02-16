import type React from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

const NoKeywordsAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Search size={64} className="text-gray-400" />
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-lg text-gray-400"
      >
        No keywords found
      </motion.p>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-2 text-sm text-gray-500"
      >
        Add keywords to start tracking performance
      </motion.p>
    </div>
  )
}

export default NoKeywordsAnimation

