import type React from "react"
import { motion } from "framer-motion"

const PlaceholderChat: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              index % 2 === 0 ? "bg-gray-700 text-gray-400 border border-gray-600" : "bg-blue-600 text-gray-300"
            }`}
          >
            <div className="h-4 w-20 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-600 rounded mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PlaceholderChat

