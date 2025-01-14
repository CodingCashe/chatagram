'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface DragDropToggleProps {
  onToggle: (value: boolean) => void
}

export function DragDropToggle({ onToggle }: DragDropToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false)

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      setIsEnabled(true)
      onToggle(true)
    } else if (info.offset.x < -100) {
      setIsEnabled(false)
      onToggle(false)
    }
  }

  return (
    <div className="flex items-center justify-center space-x-4 bg-gray-800 p-4 rounded-lg">
      <div className="text-gray-400">Disabled</div>
      <motion.div
        className="w-16 h-8 bg-gray-700 rounded-full p-1 cursor-grab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full"
          drag="x"
          dragConstraints={{ left: 0, right: 32 }}
          onDragEnd={handleDragEnd}
          animate={{ x: isEnabled ? 32 : 0 }}
        />
      </motion.div>
      <div className="text-gray-400">Enabled</div>
    </div>
  )
}

