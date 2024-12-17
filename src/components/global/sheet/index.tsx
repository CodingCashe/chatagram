import {
  Sheet as ShadcnSheet,
  SheetContent,
  SheetTrigger,
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
        className="p-0"
      >
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
//     <SheetTrigger className={className}>{trigger}</SheetTrigger>
//     <SheetContent
//       side={side}
//       className="p-0 overflow-y-auto max-h-screen h-[90vh] sm:w-auto sm:h-auto" // Adjust size for small devices
//     >      
//       {children}
//     </SheetContent>
//   </ShadcnSheet>

//   )
// }

// export default Sheet

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

// import {
//   Sheet as ShadcnSheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import React, { ReactNode } from "react";

// type Props = {
//   trigger: React.ReactNode;
//   children: (closeSheet: () => void) => ReactNode; // Allow children to access the close function
//   className?: string;
//   side: "left" | "right";
// };

// const Sheet = ({ children, trigger, className, side }: Props) => {
//   const [open, setOpen] = React.useState(false);

//   const closeSheet = () => setOpen(false);

//   return (
//     <ShadcnSheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger className={className}>{trigger}</SheetTrigger>
//       <SheetContent side={side} className="p-0">
//         {children(closeSheet)}
//       </SheetContent>
//     </ShadcnSheet>
//   );
// };

// export default Sheet;


