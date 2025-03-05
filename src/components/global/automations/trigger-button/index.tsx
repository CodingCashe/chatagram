// 'use client'
// import React from 'react'
// import PopOver from '../../popover'
// import { Divide } from 'lucide-react'
// import { BlueAddIcon } from '@/icons'

// type Props = {
//   children: React.ReactNode
//   label: string
// }

// const TriggerButton = ({ children, label }: Props) => {
//   return (
//     <PopOver
//       className="w-[400px]"
//       trigger={
//         <div className="border-2 border-dashed w-full border-[#3352cc] hover:opacity-80 cursor-pointer transition duration-100 rounded-xl flex gap-x-2 justify-center items-center p-5 mt-4">
//           <BlueAddIcon />
//           <p className="text-[#768BDD] font-bold">{label}</p>
//         </div>
//       }
//     >
//       {children}
//     </PopOver>
//   )
// }

// export default TriggerButton

// "use client"
// import type React from "react"
// import PopOver from "../../popover"
// import { PlusCircle } from "lucide-react"

// type Props = {
//   children: React.ReactNode
//   label: string
// }

// const TriggerButton = ({ children, label }: Props) => {
//   return (
//     <PopOver
//       className="w-[450px] shadow-2xl"
//       trigger={
//         <div className="group relative overflow-hidden rounded-xl border-2 border-dashed border-emerald-500/50 bg-gradient-to-br from-slate-900 to-slate-800 p-5 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 mt-4 w-full">
//           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           <div className="flex items-center justify-center gap-3">
//             <PlusCircle className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
//             <p className="font-medium text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
//               {label}
//             </p>
//           </div>
//         </div>
//       }
//     >
//       <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-1 rounded-xl">
//         <div className="p-4 rounded-lg bg-slate-900/80 backdrop-blur-sm">{children}</div>
//       </div>
//     </PopOver>
//   )
// }

// export default TriggerButton

"use client"
import type React from "react"
import FloatingPanel from "../../panel"
import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"

type Props = {
  children: React.ReactNode
  label: string
}

const TriggerButton = ({ children, label }: Props) => {
  return (
    <FloatingPanel
      title={label}
      trigger={
        <motion.div className="group relative overflow-hidden rounded-xl mt-4 w-full">
          {/* Border with animation */}
          <div className="absolute inset-0 bg-light-blue opacity-20 rounded-xl"></div>
          <div className="absolute inset-0 rounded-xl shimmerBorder"></div>

          {/* Inner content */}
          <div className="relative m-[2px] bg-background-90 rounded-lg p-5">
            <div className="flex items-center justify-center gap-3">
              <PlusCircle size={20} color="#768BDD" />
              <p className="text-[#768BDD] font-bold">{label}</p>
            </div>
          </div>
        </motion.div>
      }
    >
      <div className="staggeredFadeIn">{children}</div>
    </FloatingPanel>
  )
}

export default TriggerButton

