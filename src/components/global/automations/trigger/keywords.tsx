// import { Input } from '@/components/ui/input'
// import { useKeywords } from '@/hooks/use-automations'
// import { useMutationDataState } from '@/hooks/use-mutation-data'
// import { useQueryAutomation } from '@/hooks/user-queries'
// import { X } from 'lucide-react'
// import React from 'react'

// type Props = {
//   id: string
// }

// export const Keywords = ({ id }: Props) => {
//   const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
//   const { latestVariable } = useMutationDataState(['add-keyword'])
//   const { data } = useQueryAutomation(id)

//   return (
//     <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
//       <p className="text-sm text-text-secondary">
//         Add words that trigger automations
//       </p>
//       <div className="flex flex-wrap justify-start gap-2 items-center">
//         {data?.data?.keywords &&
//           data?.data?.keywords.length > 0 &&
//           data?.data?.keywords.map(
//             (word) =>
//               word.id !== latestVariable.variables.id && (
//                 <div
//                   className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full"
//                   key={word.id}
//                 >
//                   <p>{word.word}</p>
//                 </div>
//               )
//           )}
//         {latestVariable && latestVariable.status === 'pending' && (
//           <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
//             {latestVariable.variables.keyword}
//           </div>
//         )}
//         <Input
//           placeholder="Add keyword..."
//           style={{
//             width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch',
//           }}
//           value={keyword}
//           className="p-0 bg-transparent ring-0 border-none outline-none"
//           onChange={onValueChange}
//           onKeyUp={onKeyPress}
//         />
//       </div>
//     </div>
//   )
// }
// export default Keywords

//WORKING

// import { Input } from '@/components/ui/input'
// import { useKeywords } from '@/hooks/use-automations'
// import { useMutationDataState } from '@/hooks/use-mutation-data'
// import { useQueryAutomation } from '@/hooks/user-queries'
// import { X } from 'lucide-react'
// import React from 'react'

// type Props = {
//   id: string
// }

// export const Keywords = ({ id }: Props) => {
//   const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
//   const { latestVariable } = useMutationDataState(['add-keyword'])
//   const { data } = useQueryAutomation(id)

//   return (
//     <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
//       <p className="text-sm text-text-secondary">
//         Add words that trigger automations
//       </p>
//       <div className="flex flex-wrap justify-start gap-2 items-center">
//         {data?.data?.keywords &&
//           data?.data?.keywords.length > 0 &&
//           data?.data?.keywords.map((word) => (
//             word.id !== latestVariable?.variables?.id && (
//               <div
//                 className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full"
//                 key={word.id}
//               >
//                 <p>{word.word}</p>
//                 <X
//                   className="cursor-pointer hover:text-red-500"
//                   onClick={() => deleteMutation({ id: word.id })}
//                 />
//               </div>
//             )
//           ))}

//         {latestVariable && latestVariable.status === 'pending' && (
//           <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
//             {latestVariable.variables.keyword}
//           </div>
//         )}

//         <Input
//           placeholder="Add keyword..."
//           style={{
//             width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch',
//           }}
//           value={keyword}
//           className="p-0 bg-transparent ring-0 border-none outline-none"
//           onChange={onValueChange}
//           onKeyUp={onKeyPress}
//         />
//       </div>
//     </div>
//   )
// }

// export default Keywords

import { Input } from '@/components/ui/input'
import { useKeywords } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { useQueryAutomation } from '@/hooks/user-queries'
import { X } from 'lucide-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  id: string
}

export const Keywords = ({ id }: Props) => {
  const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
  const { latestVariable } = useMutationDataState(['add-keyword'])
  const { data } = useQueryAutomation(id)

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-0.5 rounded-2xl">
      <div className="bg-background-80 flex flex-col gap-y-3 p-5 rounded-2xl backdrop-blur-sm">
        <p className="text-sm text-text-secondary font-semibold">
          Add words that trigger automations
        </p>
        <div className="flex flex-wrap justify-start gap-2 items-center">
          <AnimatePresence>
            {data?.data?.keywords &&
              data?.data?.keywords.length > 0 &&
              data?.data?.keywords.map((word) => (
                word.id !== latestVariable?.variables?.id && (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-x-2 capitalize text-white py-1 px-4 rounded-full shadow-md"
                  >
                    <p className="font-medium">{word.word}</p>
                    <X
                      className="cursor-pointer hover:text-red-300 transition-colors duration-200"
                      onClick={() => deleteMutation({ id: word.id })}
                    />
                  </motion.div>
                )
              ))}
            {latestVariable && latestVariable.status === 'pending' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-green-400 to-blue-500 flex items-center gap-x-2 capitalize text-white py-1 px-4 rounded-full shadow-md"
              >
                {latestVariable.variables.keyword}
              </motion.div>
            )}
          </AnimatePresence>
          <Input
            placeholder="Add keyword..."
            style={{
              width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch',
            }}
            value={keyword}
            className="p-2 bg-background-90 ring-1 ring-purple-400 focus:ring-2 focus:ring-purple-500 border-none outline-none rounded-full text-white placeholder-gray-400 transition-all duration-200"
            onChange={onValueChange}
            onKeyUp={onKeyPress}
          />
        </div>
      </div>
    </div>
  )
}

export default Keywords

