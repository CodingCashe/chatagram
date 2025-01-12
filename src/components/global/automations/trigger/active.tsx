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
//             ? 'User comments on my post.'
//             : 'User sends me a direct message.'}
//         </p>
//       </div>
//       <p className="text-text-secondary">
//         {type === 'COMMENT'
//           ? 'If the user comments on a post setup to listen for keyworks, this automation will fire'
//           : 'If the user sends you a message that contains a keyword, this automation will fire'}
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

import { InstagramBlue, PlaneBlue } from '@/icons'
import React from 'react'
import { motion } from 'framer-motion'

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
      className="bg-gradient-to-br from-indigo-600 to-purple-700 p-0.5 rounded-2xl w-full"
    >
      <div className="bg-background-80 p-5 rounded-2xl w-full backdrop-blur-sm">
        <div className="flex gap-x-3 items-center mb-3">
          {type === 'COMMENT' ? (
            <InstagramBlue  />
          ) : (
            <PlaneBlue />
          )}
          <p className="text-xl font-bold text-white">
            {type === 'COMMENT'
              ? 'User comments on my post'
              : 'User sends me a direct message'}
          </p>
        </div>
        <p className="text-text-secondary text-sm mb-4">
          {type === 'COMMENT'
            ? 'If the user comments on a post set up to listen for keywords, this automation will fire'
            : 'If the user sends you a message that contains a keyword, this automation will fire'}
        </p>
        <div className="flex gap-2 mt-5 flex-wrap">
          {keywords.map((word) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 flex items-center gap-x-2 capitalize text-white font-medium py-1 px-4 rounded-full shadow-md"
            >
              <p>{word.word}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ActiveTrigger

