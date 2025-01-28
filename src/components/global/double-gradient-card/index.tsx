// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'
// import React from 'react'

// type Props = {
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
//   return (
//     <div className="relative border-[1px] border-in-active/50 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden">
//       <div className="flex flex-col z-40">
//         <h2 className="text-2xl font-medium">{label}</h2>
//         <p className="text-text-secondary text-sm">{subLabel}</p>
//       </div>
//       <div className="flex justify-between items-center z-40 gap-x-10">
//         <p className="text-text-secondary text-sm">{description}</p>
//         <Button className="rounded-full bg-light-blue w-10 h-10">
//           <ArrowRight color="white" />
//         </Button>
//       </div>
//       <div className="w-6/12 h-full absolute radial--double--gradient--cards--top top-0 left-0 z-10" />
//       <div className="w-6/12 h-full absolute radial--double--gradient--cards--bottom top-0 left-1/2 right-0 z-0" />
//     </div>
//   )
// }

// export default DoubleGradientCard


// "use client"

// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"
// import React from "react"
// import { motion } from "framer-motion"

// type Props = {
//   label: string
//   subLabel: string
//   description: string
// }

// const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
//   return (
//     <motion.div
//       className="relative border-[1px] border-gray-700 p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.02 }}
//     >
//       <div className="flex flex-col z-40">
//         <motion.h2
//           className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           {label}
//         </motion.h2>
//         <motion.p
//           className="text-gray-400 text-sm"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           {subLabel}
//         </motion.p>
//       </div>
//       <div className="flex justify-between items-center z-40 gap-x-10">
//         <motion.p
//           className="text-gray-300 text-sm"
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           {description}
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 w-10 h-10">
//             <ArrowRight color="white" />
//           </Button>
//         </motion.div>
//       </div>
//       <div className="w-6/12 h-full absolute radial-gradient-top top-0 left-0 z-10" />
//       <div className="w-6/12 h-full absolute radial-gradient-bottom top-0 left-1/2 right-0 z-0" />
//       <style jsx>{`
//         .radial-gradient-top {
//           background: radial-gradient(circle at top left, rgba(139, 92, 246, 0.1), transparent 70%);
//         }
//         .radial-gradient-bottom {
//           background: radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.1), transparent 70%);
//         }
//       `}</style>
//     </motion.div>
//   )
// }

// export default DoubleGradientCard

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import React from "react"
import { motion } from "framer-motion"

type Props = {
  label: string
  subLabel: string
  description: string
}

const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
  return (
    <motion.div
      className="relative border-[1px] border-[#3352CC] p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden bg-gradient-to-br from-[#333333] via-[#2E2E2E] to-[#292929]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col z-40">
        <motion.h2
          className="text-2xl font-medium text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {label}
        </motion.h2>
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subLabel}
        </motion.p>
      </div>
      <div className="flex justify-between items-center z-40 gap-x-10">
        <motion.p
          className="text-gray-300 text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button className="rounded-full bg-[#3352CC] text-white hover:bg-[#2A41A3] w-10 h-10">
            <ArrowRight color="white" />
          </Button>
        </motion.div>
      </div>
      <div className="w-6/12 h-full absolute radial-gradient-top top-0 left-0 z-10" />
      <div className="w-6/12 h-full absolute radial-gradient-bottom top-0 left-1/2 right-0 z-0" />
      <style jsx>{`
        .radial-gradient-top {
          background: radial-gradient(circle at top left, rgba(51, 82, 204, 0.1), transparent 70%);
        }
        .radial-gradient-bottom {
          background: radial-gradient(circle at bottom right, rgba(51, 82, 204, 0.1), transparent 70%);
        }
      `}</style>
    </motion.div>
  )
}

export default DoubleGradientCard

