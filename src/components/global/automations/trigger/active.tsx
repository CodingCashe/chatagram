// import { InstagramBlue, PlaneBlue } from '@/icons'
// import React from 'react'

// type Props = {
//   type: string
//   keywords: {
//     id: string
//     word: string
//     automationId: string | null
//   }[]
// }

// const ActiveTrigger = ({ keywords, type }: Props) => {
//   return (
//     <div className="bg-background-80 p-3 rounded-xl w-full">
//       <div className="flex gap-x-2 items-center">
//         {type === 'COMMENT' ? <InstagramBlue /> : <PlaneBlue />}
//         <p className="text-lg">
//           {type === 'COMMENT'
//             ? 'Client writes comments on my post.'
//             : 'Client sends me a direct message.'}
//         </p>
//       </div>
//       <p className="text-text-secondary">
//         {type === 'COMMENT'
//           ? 'If the user comments on a post setup to listen for keywords, this automation will start'
//           : 'If the user sends you a message that contains a keyword, this automation will start'}
//       </p>
//       <div className="flex  gap-2 mt-5 flex-wrap">
//         {keywords.map((word) => (
//           <div
//             key={word.id}
//             className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
//           >
//             <p>{word.word}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ActiveTrigger

"use client"
import { MessageSquare, Instagram } from "lucide-react"
import { motion } from "framer-motion"

type Props = {
  type: string
  keywords: {
    id: string
    word: string
    automationId: string | null
  }[]
}

const ActiveTrigger = ({ keywords, type }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-1 shadow-xl"
    >
      <div className="bg-slate-900/80 backdrop-blur-sm p-5 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg">
            {type === "COMMENT" ? (
              <Instagram className="h-6 w-6 text-emerald-400" />
            ) : (
              <MessageSquare className="h-6 w-6 text-teal-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">
              {type === "COMMENT" ? "Client writes comments on my post" : "Client sends me a direct message"}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {type === "COMMENT"
                ? "If the user comments on a post setup to listen for keywords, this automation will start"
                : "If the user sends you a message that contains a keyword, this automation will start"}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">Keywords</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((word) => (
              <motion.div
                key={word.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 py-1.5 px-4 rounded-full"
              >
                <p className="text-sm text-white font-medium capitalize">{word.word}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ActiveTrigger


