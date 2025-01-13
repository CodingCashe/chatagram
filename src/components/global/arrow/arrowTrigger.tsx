import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArrowTriggerProps {
  isOpen: boolean
  onClick: () => void
}

const ArrowTrigger: React.FC<ArrowTriggerProps> = ({ isOpen, onClick }) => {
  return (
    <motion.div
      className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer",
        "w-6 h-12 bg-[#0e0e0e] rounded-r-md flex items-center justify-center",
        "border-r border-t border-b border-[#333336]",
        isOpen && "left-[300px]"
      )}
      onClick={onClick}
      animate={{ left: isOpen ? 300 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChevronRight
        className={cn(
          "w-4 h-4 text-white transition-transform duration-300",
          isOpen && "rotate-180"
        )}
      />
    </motion.div>
  )
}

export default ArrowTrigger

