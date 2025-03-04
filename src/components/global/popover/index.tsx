// 'use client'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import React, { useState, useEffect, useRef } from 'react'

// type Props = {
//   trigger: JSX.Element
//   children: React.ReactNode
//   className?: string
// }

// const PopOver = ({ children, trigger, className }: Props) => {
//   const [maxHeight, setMaxHeight] = useState<string>('auto')
//   const contentRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const updateMaxHeight = () => {
//       if (contentRef.current) {
//         const viewportHeight = window.innerHeight
//         const contentRect = contentRef.current.getBoundingClientRect()
//         const topSpace = contentRect.top
//         const bottomSpace = viewportHeight - contentRect.bottom
//         const availableSpace = Math.max(topSpace, bottomSpace)
//         setMaxHeight(`${availableSpace - 20}px`) // 20px for some padding
//       }
//     }

//     updateMaxHeight()
//     window.addEventListener('resize', updateMaxHeight)
//     return () => window.removeEventListener('resize', updateMaxHeight)
//   }, [])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>{trigger}</PopoverTrigger>
//       <PopoverContent
//         ref={contentRef}
//         className={cn(
//           'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
//           className
//         )}
//         align="end"
//         side="bottom"
//         style={{ maxHeight }}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight }}>
//           {children}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default PopOver

// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { useMediaQuery } from '@/hooks/use-media-query'

// type Props = {
//   trigger: JSX.Element
//   children: React.ReactNode
//   className?: string
// }

// const PopOver = ({ children, trigger, className }: Props) => {
//   const [maxHeight, setMaxHeight] = useState<string>('auto')
//   const [maxWidth, setMaxWidth] = useState<string>('auto')
//   const contentRef = useRef<HTMLDivElement>(null)
//   const isMobile = useMediaQuery('(max-width: 640px)')

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (contentRef.current) {
//         const viewportHeight = window.innerHeight
//         const viewportWidth = window.innerWidth
//         const contentRect = contentRef.current.getBoundingClientRect()
//         const topSpace = contentRect.top
//         const bottomSpace = viewportHeight - contentRect.bottom
//         const leftSpace = contentRect.left
//         const rightSpace = viewportWidth - contentRect.right

//         const availableHeight = Math.max(topSpace, bottomSpace)
//         const availableWidth = Math.max(leftSpace, rightSpace)

//         setMaxHeight(`${availableHeight - 20}px`) // 20px for padding
//         setMaxWidth(`${availableWidth - 20}px`) // 20px for padding
//       }
//     }

//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)
//     return () => window.removeEventListener('resize', updateDimensions)
//   }, [])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>{trigger}</PopoverTrigger>
//       <PopoverContent
//         ref={contentRef}
//         className={cn(
//           'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
//           'border border-gray-700',
//           'max-w-[95vw]', // Ensure it doesn't exceed viewport width
//           isMobile ? 'w-full' : 'min-w-[300px]',
//           className
//         )}
//         align="end"
//         side="bottom"
//         sideOffset={5}
//         style={{ maxHeight, maxWidth }}
//       >
//         <div 
//           className="overflow-y-auto p-4"
//           style={{ maxHeight: `calc(${maxHeight} - 2rem)` }}
//         >
//           {children}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default PopOver

// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { useMediaQuery } from '@/hooks/use-media-query'

// type Props = {
//   trigger: JSX.Element
//   children: React.ReactNode
//   className?: string
// }

// const PopOver = ({ children, trigger, className }: Props) => {
//   const [maxHeight, setMaxHeight] = useState<string>('auto')
//   const [maxWidth, setMaxWidth] = useState<string>('auto')
//   const contentRef = useRef<HTMLDivElement>(null)
//   const isMobile = useMediaQuery('(max-width: 640px)')

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (contentRef.current) {
//         const viewportHeight = window.innerHeight
//         const viewportWidth = window.innerWidth
//         const contentRect = contentRef.current.getBoundingClientRect()
//         const topSpace = contentRect.top
//         const bottomSpace = viewportHeight - contentRect.bottom
//         const leftSpace = contentRect.left
//         const rightSpace = viewportWidth - contentRect.right

//         const availableHeight = Math.max(topSpace, bottomSpace)
//         const availableWidth = Math.max(leftSpace, rightSpace)

//         setMaxHeight(`${Math.max(availableHeight - 20, 350)}px`) // Ensure at least 200px height
//         setMaxWidth(`${availableWidth - 20}px`)
//       }
//     }

//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)
//     return () => window.removeEventListener('resize', updateDimensions)
//   }, [])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>{trigger}</PopoverTrigger>
//       <PopoverContent
//         ref={contentRef}
//         className={cn(
//           'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
//           'border border-gray-700',
//           'max-w-[95vw]',
//           isMobile ? 'w-full' : 'min-w-[300px]',
//           'min-h-[200px]',
//           className
//         )}
//         align="end"
//         side="bottom"
//         sideOffset={5}
//         style={{ maxHeight, maxWidth }}
//       >
//         <div 
//           className="overflow-y-auto p-4"
//           style={{ 
//             maxHeight: `calc(${maxHeight} - 2rem)`,
//             minHeight: '180px'
//           }}
//         >
//           {children}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default PopOver

// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { useMediaQuery } from '@/hooks/use-media-query'

// type Props = {
//   trigger: JSX.Element
//   children: React.ReactNode
//   className?: string
// }

// const PopOver = ({ children, trigger, className }: Props) => {
//   const [maxHeight, setMaxHeight] = useState<string>('auto')
//   const [maxWidth, setMaxWidth] = useState<string>('auto')
//   const contentRef = useRef<HTMLDivElement>(null)
//   const isMobile = useMediaQuery('(max-width: 640px)')

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (contentRef.current) {
//         const viewportHeight = window.innerHeight
//         const viewportWidth = window.innerWidth
//         const contentRect = contentRef.current.getBoundingClientRect()
//         const topSpace = contentRect.top
//         const bottomSpace = viewportHeight - contentRect.bottom
//         const leftSpace = contentRect.left
//         const rightSpace = viewportWidth - contentRect.right

//         const availableHeight = Math.max(topSpace, bottomSpace)
//         const availableWidth = Math.max(leftSpace, rightSpace)

//         setMaxHeight(`${Math.max(availableHeight - 20, 350)}px`)
//         setMaxWidth(`${availableWidth - 20}px`)
//       }
//     }

//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)
//     return () => window.removeEventListener('resize', updateDimensions)
//   }, [])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>{trigger}</PopoverTrigger>
//       <PopoverContent
//         ref={contentRef}
//         className={cn(
//           'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
//           'border border-[#3352CC33]',
//           'max-w-[95vw]',
//           isMobile ? 'w-full' : 'min-w-[300px]',
//           'min-h-[200px]',
//           className
//         )}
//         align="end"
//         side="bottom"
//         sideOffset={5}
//         style={{ 
//           maxHeight, 
//           maxWidth,
//           boxShadow: '0 0 0 1px rgba(51, 82, 204, 0.2), 0 4px 11px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <div 
//           className="relative z-10 overflow-y-auto p-4"
//           style={{ 
//             maxHeight: `calc(${maxHeight} - 2rem)`,
//             minHeight: '180px'
//           }}
//         >
//           {children}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default PopOver

// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { useMediaQuery } from '@/hooks/use-media-query'

// type Props = {
//   trigger: JSX.Element
//   children: React.ReactNode
//   className?: string
// }

// const PopOver = ({ children, trigger, className }: Props) => {
//   const [maxHeight, setMaxHeight] = useState<string>('auto')
//   const [maxWidth, setMaxWidth] = useState<string>('auto')
//   const contentRef = useRef<HTMLDivElement>(null)
//   const particleRef = useRef<HTMLDivElement>(null)
//   const isMobile = useMediaQuery('(max-width: 640px)')

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (contentRef.current) {
//         const viewportHeight = window.innerHeight
//         const viewportWidth = window.innerWidth
//         const contentRect = contentRef.current.getBoundingClientRect()
//         const topSpace = contentRect.top
//         const bottomSpace = viewportHeight - contentRect.bottom
//         const leftSpace = contentRect.left
//         const rightSpace = viewportWidth - contentRect.right

//         const availableHeight = Math.max(topSpace, bottomSpace)
//         const availableWidth = Math.max(leftSpace, rightSpace)

//         setMaxHeight(`${Math.max(availableHeight - 20, 200)}px`)
//         setMaxWidth(`${availableWidth - 20}px`)
//       }
//     }

//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)
//     return () => window.removeEventListener('resize', updateDimensions)
//   }, [])

//   useEffect(() => {
//     const particle = particleRef.current
//     if (!particle || !contentRef.current) return

//     let position = 0
//     let direction = 1
//     let color = 0

//     const animateParticle = () => {
//       if (!particle || !contentRef.current) return

//       const rect = contentRef.current.getBoundingClientRect()
//       const perimeter = 2 * (rect.width + rect.height)
      
//       position = (position + 1) % perimeter
//       color = (color + 1) % 360

//       let x, y
//       if (position < rect.width) {
//         x = position
//         y = 0
//       } else if (position < rect.width + rect.height) {
//         x = rect.width
//         y = position - rect.width
//       } else if (position < 2 * rect.width + rect.height) {
//         x = rect.width - (position - (rect.width + rect.height))
//         y = rect.height
//       } else {
//         x = 0
//         y = rect.height - (position - (2 * rect.width + rect.height))
//       }

//       particle.style.transform = `translate(${x}px, ${y}px)`
//       particle.style.backgroundColor = `hsl(${color}, 100%, 50%)`

//       requestAnimationFrame(animateParticle)
//     }

//     animateParticle()
//   }, [])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>{trigger}</PopoverTrigger>
//       <PopoverContent
//         ref={contentRef}
//         className={cn(
//           'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
//           'border border-[#3352CC33]',
//           'max-w-[95vw]',
//           isMobile ? 'w-full' : 'min-w-[300px]',
//           'min-h-[200px]',
//           'relative',
//           className
//         )}
//         align="end"
//         side="bottom"
//         sideOffset={5}
//         style={{ 
//           maxHeight, 
//           maxWidth,
//           boxShadow: '0 0 0 1px rgba(51, 82, 204, 0.2), 0 4px 11px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <div 
//           ref={particleRef}
//           className="absolute w-2 h-2 rounded-full bg-blue-500 z-10"
//           style={{ transition: 'transform 0.1s linear, background-color 0.5s ease' }}
//         />
//         <div 
//           className="relative z-20 overflow-y-auto p-4"
//           style={{ 
//             maxHeight: `calc(${maxHeight} - 2rem)`,
//             minHeight: '180px'
//           }}
//         >
//           {children}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default PopOver

//WORKING RIGHT

// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { useMediaQuery } from '@/hooks/use-media-query'

// type Props = {
//   trigger: JSX.Element
//   children: React.ReactNode
//   className?: string
// }

// const PopOver = ({ children, trigger, className }: Props) => {
//   const [maxHeight, setMaxHeight] = useState<string>('auto')
//   const [maxWidth, setMaxWidth] = useState<string>('auto')
//   const contentRef = useRef<HTMLDivElement>(null)
//   const isMobile = useMediaQuery('(max-width: 640px)')

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (contentRef.current) {
//         const viewportHeight = window.innerHeight
//         const viewportWidth = window.innerWidth
//         const contentRect = contentRef.current.getBoundingClientRect()
//         const topSpace = contentRect.top
//         const bottomSpace = viewportHeight - contentRect.bottom
//         const leftSpace = contentRect.left
//         const rightSpace = viewportWidth - contentRect.right

//         const availableHeight = Math.max(topSpace, bottomSpace)
//         const availableWidth = Math.max(leftSpace, rightSpace)

//         setMaxHeight(`${Math.max(availableHeight - 20, 200)}px`)
//         setMaxWidth(`${availableWidth - 20}px`)
//       }
//     }

//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)
//     return () => window.removeEventListener('resize', updateDimensions)
//   }, [])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>{trigger}</PopoverTrigger>
//       <PopoverContent
//         ref={contentRef}
//         className={cn(
//           'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
//           'border-4 border-transparent',
//           'max-w-[95vw]',
//           isMobile ? 'w-full' : 'min-w-[300px]',
//           'min-h-[200px]',
//           'relative',
//           className
//         )}
//         align="end"
//         side="bottom"
//         sideOffset={5}
//         style={{ 
//           maxHeight, 
//           maxWidth,
//           boxShadow: '0 0 15px rgba(51, 82, 204, 0.3), 0 4px 11px rgba(0, 0, 0, 0.1)',
//           background: 'linear-gradient(45deg, #1D1D1D, #1D1D1D) padding-box, linear-gradient(45deg, #3352CC, #FF00FF, #00FFFF, #3352CC) border-box',
//         }}
//       >
//         <div 
//           className="relative z-20 overflow-y-auto p-4"
//           style={{ 
//             maxHeight: `calc(${maxHeight} - 2rem)`,
//             minHeight: '180px'
//           }}
//         >
//           {children}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default PopOver

"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import { cn } from "@/lib/utils"
import styles from "../automation-styles.module.css"

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

const PopOver = ({ trigger, children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom")

  useOnClickOutside(popoverRef, () => setIsOpen(false))

  const calculatePosition = () => {
    if (!triggerRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const screenHeight = window.innerHeight
    const screenWidth = window.innerWidth

    // Determine if we should place the popover above or below the trigger
    const spaceBelow = screenHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top
    const popoverHeight = popoverRef.current?.offsetHeight || 400

    let newPlacement: "top" | "bottom" = "bottom"
    let top = 0

    if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
      // Place above if there's not enough space below but enough above
      newPlacement = "top"
      top = triggerRect.top - popoverHeight - 10
    } else {
      // Default to below
      newPlacement = "bottom"
      top = triggerRect.bottom + 10
    }

    // Calculate horizontal position, centered on trigger
    let left = triggerRect.left + triggerRect.width / 2 - (popoverRef.current?.offsetWidth || 400) / 2

    // Ensure popover doesn't go off screen horizontally
    const popoverWidth = popoverRef.current?.offsetWidth || 400
    if (left < 20) left = 20
    if (left + popoverWidth > screenWidth - 20) left = screenWidth - popoverWidth - 20

    setPosition({ top, left })
    setPlacement(newPlacement)
  }

  useEffect(() => {
    if (isOpen) {
      calculatePosition()
      // Recalculate on resize
      window.addEventListener("resize", calculatePosition)
      // Recalculate after a short delay to ensure content is rendered
      const timer = setTimeout(calculatePosition, 50)
      return () => {
        window.removeEventListener("resize", calculatePosition)
        clearTimeout(timer)
      }
    }
  }, [isOpen]) // Removed calculatePosition from dependencies

  return (
    <>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer ${styles.hoverScale}`}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: placement === "top" ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "top" ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 50,
              transformOrigin: placement === "top" ? "bottom center" : "top center",
            }}
            className={cn("shadow-2xl", styles.glassEffect, className)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PopOver

