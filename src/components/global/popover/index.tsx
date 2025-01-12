'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import React, { useState, useEffect, useRef } from 'react'

type Props = {
  trigger: JSX.Element
  children: React.ReactNode
  className?: string
}

const PopOver = ({ children, trigger, className }: Props) => {
  const [maxHeight, setMaxHeight] = useState<string>('auto')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMaxHeight = () => {
      if (contentRef.current) {
        const viewportHeight = window.innerHeight
        const contentRect = contentRef.current.getBoundingClientRect()
        const topSpace = contentRect.top
        const bottomSpace = viewportHeight - contentRect.bottom
        const availableSpace = Math.max(topSpace, bottomSpace)
        setMaxHeight(`${availableSpace - 20}px`) // 20px for some padding
      }
    }

    updateMaxHeight()
    window.addEventListener('resize', updateMaxHeight)
    return () => window.removeEventListener('resize', updateMaxHeight)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        ref={contentRef}
        className={cn(
          'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
          className
        )}
        align="end"
        side="bottom"
        style={{ maxHeight }}
      >
        <div className="overflow-y-auto" style={{ maxHeight }}>
          {children}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOver



// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import * as PopoverPrimitive from '@radix-ui/react-popover'
// import { cn } from '@/lib/utils'

// type PopOverProps = {
//   trigger: React.ReactNode
//   children: React.ReactNode | ((props: { close: () => void }) => React.ReactNode)
//   className?: string
// }

// const PopOver: React.FC<PopOverProps> = ({ children, trigger, className }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const [maxHeight, setMaxHeight] = useState<string>('80vh')

//   useEffect(() => {
//     const updateMaxHeight = () => {
//       if (contentRef.current) {
//         const viewportHeight = window.innerHeight
//         const contentRect = contentRef.current.getBoundingClientRect()
//         const topSpace = contentRect.top
//         const bottomSpace = viewportHeight - contentRect.bottom
//         const availableSpace = Math.max(topSpace, bottomSpace)
//         setMaxHeight(`${Math.min(availableSpace - 20, viewportHeight * 0.8)}px`)
//       }
//     }

//     if (isOpen) {
//       updateMaxHeight()
//       window.addEventListener('resize', updateMaxHeight)
//     }

//     return () => window.removeEventListener('resize', updateMaxHeight)
//   }, [isOpen])

//   return (
//     <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverPrimitive.Trigger asChild>
//         {trigger}
//       </PopoverPrimitive.Trigger>
//       <AnimatePresence>
//         {isOpen && (
//           <PopoverPrimitive.Portal forceMount>
//             <PopoverPrimitive.Content
//               asChild
//               sideOffset={5}
//               align="end"
//               className={cn(
//                 "z-50 w-screen max-w-sm lg:max-w-3xl",
//                 className
//               )}
//             >
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95, y: 10 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95, y: 10 }}
//                 transition={{ duration: 0.2, ease: "easeOut" }}
//               >
//                 <div
//                   ref={contentRef}
//                   className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg ring-1 ring-black ring-opacity-5"
//                 >
//                   <motion.div
//                     initial={{ height: 0 }}
//                     animate={{ height: 'auto' }}
//                     exit={{ height: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     style={{ maxHeight }}
//                     className="relative grid gap-8 overflow-y-auto p-7"
//                   >
//                     {typeof children === 'function' 
//                       ? children({ close: () => setIsOpen(false) }) 
//                       : children}
//                   </motion.div>
//                   <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-500 to-purple-500 opacity-10" />
//                 </div>
//               </motion.div>
//             </PopoverPrimitive.Content>
//           </PopoverPrimitive.Portal>
//         )}
//       </AnimatePresence>
//     </PopoverPrimitive.Root>
//   )
// }

// export default PopOver

