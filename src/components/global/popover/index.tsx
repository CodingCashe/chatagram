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



// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import React from 'react'

// type Props = {
//   trigger: JSX.Element
//   children: React.ReactNode
//   className?: string
// }

// const PopOver = ({ children, trigger, className }: Props) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>{trigger}</PopoverTrigger>
//       <PopoverContent
//         className={cn('bg-[#1D1D1D] shadow-lg rounded-xl', className)}
//         align="end"
//         side="bottom"
//       >
//         {children}
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default PopOver
