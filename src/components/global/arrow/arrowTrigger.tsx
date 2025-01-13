// import React from 'react'
// import { motion } from 'framer-motion'
// import { ChevronRight } from 'lucide-react'
// import { cn } from '@/lib/utils'

// interface ArrowTriggerProps {
//   isOpen: boolean
//   onClick: () => void
// }

// const ArrowTrigger: React.FC<ArrowTriggerProps> = ({ isOpen, onClick }) => {
//   return (
//     <motion.div
//       className={cn(
//         "fixed left-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer",
//         "w-6 h-12 bg-[#0e0e0e] rounded-r-md flex items-center justify-center",
//         "border-r border-t border-b border-[#333336]",
//         isOpen && "left-[300px]"
//       )}
//       onClick={onClick}
//       animate={{ left: isOpen ? 300 : 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <ChevronRight
//         className={cn(
//           "w-4 h-4 text-white transition-transform duration-300",
//           isOpen && "rotate-180"
//         )}
//       />
//     </motion.div>
//   )
// }

// export default ArrowTrigger

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
        "w-6 h-24 flex items-center justify-center",
        isOpen && "left-[300px]"
      )}
      onClick={onClick}
      animate={{ left: isOpen ? 300 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg width="24" height="96" viewBox="0 0 24 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M0 0C0 0 12 0 20 0C22 16 24 32 24 48C24 64 22 80 20 96C12 96 0 96 0 96V0Z" 
          fill="#0e0e0e"
        />
        <path 
          d="M0 0C0 0 12 0 20 0C22 16 24 32 24 48C24 64 22 80 20 96C12 96 0 96 0 96V0Z" 
          stroke="#333336"
          strokeWidth="1"
        />
      </svg>
      <motion.div
        className="absolute left-1"
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronRight
          className={cn(
            "w-4 h-4 text-white transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default ArrowTrigger

