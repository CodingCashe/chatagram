"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function ActiveIndicator() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <motion.div
      className="relative w-8 h-8 rounded-full bg-green-500 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-green-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-green-300"
          animate={{
            scale: isClicked ? [1, 0.8, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            repeat: isClicked ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </div>
      {isHovered && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-green-200"
              style={{
                top: `${50 + 30 * Math.sin((i * Math.PI) / 4)}%`,
                left: `${50 + 30 * Math.cos((i * Math.PI) / 4)}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

