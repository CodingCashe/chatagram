import type React from "react"
import { motion } from "framer-motion"

const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export default LoadingDots

