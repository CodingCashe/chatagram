// import {
//   Sheet as ShadcnSheet,
//   SheetContent,
//   SheetTrigger,
// } from '@/components/ui/sheet'

// import React from 'react'

// type Props = {
//   trigger: React.ReactNode
//   children: React.ReactNode
//   className?: string
//   side: 'left' | 'right'
// }

// const Sheet = ({ children, trigger, className, side }: Props) => {
//   return (
//     <ShadcnSheet>
//       <SheetTrigger className={className}>{trigger}</SheetTrigger>
//       <SheetContent
//         side={side}
//         className="p-0"
//       >
//         {children}
//       </SheetContent>
//     </ShadcnSheet>
//   )
// }

// export default Sheet

import {
  Sheet as ShadcnSheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

import React from 'react'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
  side: 'left' | 'right'
}

const Sheet = ({ children, trigger, className, side }: Props) => {
  return (
    <ShadcnSheet>
      <SheetTrigger className={className}>{trigger}</SheetTrigger>
      <SheetContent
        side={side}
        className="p-0 overflow-y-auto max-h-screen" // Added overflow-y-auto and max-h-screen
      >
        <SheetClose
          className="absolute top-4 left-4 text-white-600 hover:text-white-900 cursor-pointer"
          aria-label="Close"
        >
          ✖YZX
        </SheetClose>
        {children}
      </SheetContent>
    </ShadcnSheet>
  )
}

export default Sheet

// import {
//   Sheet as ShadcnSheet,
//   SheetContent,
//   SheetTrigger,
//   SheetClose,
// } from '@/components/ui/sheet'

// import React from 'react'

// type Props = {
//   trigger: React.ReactNode
//   children: React.ReactNode
//   className?: string
//   side: 'left' | 'right'
// }

// const Sheet = ({ children, trigger, className, side }: Props) => {
//   return (
//     <ShadcnSheet>
//       {/* Trigger for the Sheet */}
//       <SheetTrigger className={className}>{trigger}</SheetTrigger>
      
//       {/* Sheet Content */}
//       <SheetContent
//         side={side}
//         className="p-0 overflow-y-auto max-h-screen relative" // Make space for the X button
//       >
//         {/* X Button to Close */}
//         <SheetClose
//           className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 cursor-pointer"
//           aria-label="Close"
//         >
//           ✖
//         </SheetClose>

//         {/* Children (Sidebar Items) */}
//         <div onClick={() => document.body.click()}>{children}</div>
//       </SheetContent>
//     </ShadcnSheet>
//   )
// }

// export default Sheet

