
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

interface ArrowTriggerProps {
  isOpen: boolean
  onClick: () => void
}

const ArrowTrigger: React.FC<ArrowTriggerProps> = ({ isOpen, onClick }) => {
  const isMediumOrLarger = useMediaQuery('(min-width: 768px)')

  if (isMediumOrLarger) {
    return null
  }

  return (
    <motion.div
      className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer",
        "w-6 h-12 flex items-center justify-start",
        isOpen && "left-[300px]"
      )}
      onClick={onClick}
      animate={{ left: isOpen ? 300 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <path 
          d="M0 0 C4 0 24 20 24 24 C24 28 4 48 0 48"
          stroke="#333336"
          strokeWidth="1"
          fill="none"
          filter="url(#glow)"
        />
      </svg>
      <motion.div
        className="absolute left-0.5"
        animate={{ x: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronRight
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default ArrowTrigger

