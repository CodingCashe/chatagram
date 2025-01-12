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

'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

type Props = {
  trigger: JSX.Element
  children: React.ReactNode
  className?: string
}

const PopOver = ({ children, trigger, className }: Props) => {
  const [maxHeight, setMaxHeight] = useState<string>('auto')
  const [maxWidth, setMaxWidth] = useState<string>('auto')
  const contentRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth
        const contentRect = contentRef.current.getBoundingClientRect()
        const topSpace = contentRect.top
        const bottomSpace = viewportHeight - contentRect.bottom
        const leftSpace = contentRect.left
        const rightSpace = viewportWidth - contentRect.right

        const availableHeight = Math.max(topSpace, bottomSpace)
        const availableWidth = Math.max(leftSpace, rightSpace)

        setMaxHeight(`${Math.max(availableHeight - 20, 350)}px`) // Ensure at least 200px height
        setMaxWidth(`${availableWidth - 20}px`)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        ref={contentRef}
        className={cn(
          'bg-[#1D1D1D] shadow-lg rounded-xl overflow-hidden',
          'border border-gray-700',
          'max-w-[95vw]',
          isMobile ? 'w-full' : 'min-w-[300px]',
          'min-h-[200px]',
          className
        )}
        align="end"
        side="bottom"
        sideOffset={5}
        style={{ maxHeight, maxWidth }}
      >
        <div 
          className="overflow-y-auto p-4"
          style={{ 
            maxHeight: `calc(${maxHeight} - 2rem)`,
            minHeight: '180px'
          }}
        >
          {children}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOver

