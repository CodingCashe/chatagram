// import { cn } from '@/lib/utils'
// import React from 'react'
// import { Spinner } from './spinner'

// type Props = {
//   state: boolean
//   className?: string
//   children: React.ReactNode
//   color?: string
// }

// const Loader = ({ children, state, className, color }: Props) => {
//   return state ? (
//     <div className={cn(className)}>
//       <Spinner color={color} />
//     </div>
//   ) : (
//     children
//   )
// }

// export default Loader


// import React from 'react'
// import { cn } from '@/lib/utils'
// import { Spinner } from './spinner'

// type Props = {
//   state: boolean
//   className?: string
//   children: React.ReactNode
//   color?: string
//   size?: string
//   speed?: string
// }

// const Loader = ({ children, state, className, color, size = 'w-12 h-12', speed = 'animate-spin' }: Props) => {
//   return state ? (
//     <div className={cn('fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50', className)}>
//       <Spinner color={color} size={size} speed={speed} />
//     </div>
//   ) : (
//     children
//   )
// }

// export default Loader

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type LoaderProps = {
  isLoading: boolean
  className?: string
  children: React.ReactNode
}

const Loader: React.FC<LoaderProps> = ({
  isLoading,
  className,
  children
}) => {
  if (!isLoading) return <>{children}</>

  return (
    <div className={cn("inline-flex items-center space-x-2", className)}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <MessageCircle size={20} className="text-pink-500" />
      </motion.div>
      <span className="text-sm font-medium text-gray-700">Loading...</span>
    </div>
  )
}

export default Loader

