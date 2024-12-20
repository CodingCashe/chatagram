"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Power } from 'lucide-react'

export function InactiveIndicator() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative w-8 h-8 rounded-full bg-gray-300 cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-red-500"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isHovered ? 0.5 : 0.3 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Power className="w-4 h-4 text-gray-600" />
        </motion.div>
      </div>
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-red-600"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <motion.span
              className="text-white font-bold text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              OFF
            </motion.span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

