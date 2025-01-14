'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type DragDropToggleProps = {
  onToggle: (value: boolean) => void
}

export function DragDropToggle({ onToggle }: DragDropToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false)

  const handleToggle = () => {
    setIsEnabled(!isEnabled)
    onToggle(!isEnabled)
  }

  return (
    <motion.div
      className="relative w-16 h-8 bg-gray-700 rounded-full cursor-pointer"
      onClick={handleToggle}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-6 h-6 bg-white rounded-full"
        initial={false}
        animate={{
          x: isEnabled ? 32 : 4,
          backgroundColor: isEnabled ? '#10B981' : '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.div>
  )
}

