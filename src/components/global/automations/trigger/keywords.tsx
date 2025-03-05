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
//           placeholder="Add a keyword..."
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

// "use client"

// import { Input } from "@/components/ui/input"
// import { useKeywords } from "@/hooks/use-automations"
// import { useMutationDataState } from "@/hooks/use-mutation-data"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import { X, Hash } from "lucide-react"
// import { motion } from "framer-motion"

// type Props = {
//   id: string
// }

// export const Keywords = ({ id }: Props) => {
//   const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
//   const { latestVariable } = useMutationDataState(["add-keyword"])
//   const { data } = useQueryAutomation(id)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-slate-800/80 rounded-xl overflow-hidden"
//     >
//       <div className="p-4 flex flex-col gap-3">
//         <div className="flex items-center gap-3">
//           <Hash className="h-5 w-5 text-emerald-400" />
//           <p className="text-sm text-slate-300 font-medium">Add words that trigger automations</p>
//         </div>

//         <div className="bg-slate-900/50 rounded-lg p-3 mt-1">
//           <div className="flex flex-wrap gap-2 items-center">
//             {data?.data?.keywords &&
//               data?.data?.keywords.length > 0 &&
//               data?.data?.keywords.map(
//                 (word) =>
//                   word.id !== latestVariable?.variables?.id && (
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       key={word.id}
//                       className="bg-slate-700 flex items-center gap-2 capitalize text-slate-300 py-1.5 px-3 rounded-full group"
//                     >
//                       <p className="text-sm">{word.word}</p>
//                       <X
//                         className="h-4 w-4 cursor-pointer text-slate-400 group-hover:text-red-400 transition-colors"
//                         onClick={() => deleteMutation({ id: word.id })}
//                       />
//                     </motion.div>
//                   ),
//               )}

//             {latestVariable && latestVariable.status === "pending" && (
//               <div className="bg-slate-700/50 animate-pulse flex items-center gap-2 capitalize text-slate-400 py-1.5 px-3 rounded-full">
//                 {latestVariable.variables.keyword}
//               </div>
//             )}

//             <Input
//               placeholder="Add a keyword..."
//               style={{
//                 width: Math.min(Math.max(keyword.length || 10, 2), 50) + "ch",
//               }}
//               value={keyword}
//               className="p-0 bg-transparent ring-0 border-none outline-none text-emerald-300 placeholder:text-slate-500"
//               onChange={onValueChange}
//               onKeyUp={onKeyPress}
//             />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default Keywords

// "use client"

// import { Input } from "@/components/ui/input"
// import { useKeywords } from "@/hooks/use-automations"
// import { useMutationDataState } from "@/hooks/use-mutation-data"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import { X } from "lucide-react"
// import { motion } from "framer-motion"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
//   animationSpeed?: number
// }

// export const Keywords = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
//   animationSpeed = 1,
// }: Props) => {
//   const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
//   const { latestVariable } = useMutationDataState(["add-keyword"])
//   const { data } = useQueryAutomation(id)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       style={{ transition: `all ${0.3 / animationSpeed}s ease-in-out` }}
//       className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl"
//     >
//       <p className="text-sm text-text-secondary">Add words that trigger automations</p>

//       <div className="flex flex-wrap justify-start gap-2 items-center">
//         {data?.data?.keywords &&
//           data?.data?.keywords.length > 0 &&
//           data?.data?.keywords.map(
//             (word) =>
//               word.id !== latestVariable?.variables?.id && (
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   key={word.id}
//                   style={{ transition: `all ${0.2 / animationSpeed}s ease-in-out` }}
//                   className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full group"
//                 >
//                   <p>{word.word}</p>
//                   <X className="cursor-pointer hover:text-red-500" onClick={() => deleteMutation({ id: word.id })} />
//                 </motion.div>
//               ),
//           )}

//         {latestVariable && latestVariable.status === "pending" && (
//           <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
//             {latestVariable.variables.keyword}
//           </div>
//         )}

//         <Input
//           placeholder="Add a keyword..."
//           style={{
//             width: Math.min(Math.max(keyword.length || 10, 2), 50) + "ch",
//           }}
//           value={keyword}
//           className="p-0 bg-transparent ring-0 border-none outline-none"
//           onChange={onValueChange}
//           onKeyUp={onKeyPress}
//         />
//       </div>
//     </motion.div>
//   )
// }

// export default Keywords

// "use client"

// import { Input } from "@/components/ui/input"
// import { useKeywords } from "@/hooks/use-automations"
// import { useMutationDataState } from "@/hooks/use-mutation-data"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import { X } from "lucide-react"
// import { motion } from "framer-motion"
// import {KeywordSuggestions} from "../suggestions"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
//   animationSpeed?: number
// }

// export const Keywords = ({
//   id,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
//   animationSpeed = 1,
// }: Props) => {
//   const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
//   const { latestVariable } = useMutationDataState(["add-keyword"])
//   const { data } = useQueryAutomation(id)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       style={{ transition: `all ${0.3 / animationSpeed}s ease-in-out` }}
//       className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl"
//     >
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-text-secondary">Add words that trigger automations</p>
//         {data?.data?.keywords && data?.data?.keywords.length > 0 && data?.data?.keywords[0] && (
//           <KeywordSuggestions
//             keyword={data.data.keywords[0].word}
//             onAddKeyword={(keyword) => {
//               const input = document.querySelector('input[placeholder="Add a keyword..."]') as HTMLInputElement
//               if (input) {
//                 input.value = keyword
//                 input.focus()
//                 // Trigger a key press to add the keyword
//                 const event = new KeyboardEvent("keyup", {
//                   key: "Enter",
//                   code: "Enter",
//                   keyCode: 13,
//                   which: 13,
//                   bubbles: true,
//                 })
//                 input.dispatchEvent(event)
//               }
//             }}
//           />
//         )}
//       </div>

//       <div className="flex flex-wrap justify-start gap-2 items-center">
//         {data?.data?.keywords &&
//           data?.data?.keywords.length > 0 &&
//           data?.data?.keywords.map(
//             (word) =>
//               word.id !== latestVariable?.variables?.id && (
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   key={word.id}
//                   style={{ transition: `all ${0.2 / animationSpeed}s ease-in-out` }}
//                   className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full group"
//                 >
//                   <p>{word.word}</p>
//                   <X className="cursor-pointer hover:text-red-500" onClick={() => deleteMutation({ id: word.id })} />
//                 </motion.div>
//               ),
//           )}

//         {latestVariable && latestVariable.status === "pending" && (
//           <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
//             {latestVariable.variables.keyword}
//           </div>
//         )}

//         <Input
//           placeholder="Add a keyword..."
//           style={{
//             width: Math.min(Math.max(keyword.length || 10, 2), 50) + "ch",
//           }}
//           value={keyword}
//           className="p-0 bg-transparent ring-0 border-none outline-none"
//           onChange={onValueChange}
//           onKeyUp={onKeyPress}
//         />
//       </div>
//     </motion.div>
//   )
// }

// export default Keywords

"use client"

import { Input } from "@/components/ui/input"
import { useKeywords } from "@/hooks/use-automations"
import { useMutationDataState } from "@/hooks/use-mutation-data"
import { useQueryAutomation } from "@/hooks/user-queries"
import { X, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { KeywordSuggestions } from "../suggestions"
import { useState } from "react"
import { ContextCard } from "../context"

type Props = {
  id: string
  theme?: {
    id: string
    name: string
    primary: string
    secondary: string
  }
  animationSpeed?: number
}

export const Keywords = ({
  id,
  theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
  animationSpeed = 1,
}: Props) => {
  const { onValueChange, keyword, onKeyPress, deleteMutation, addKeyword } = useKeywords(id)
  const { latestVariable } = useMutationDataState(["add-keyword"])
  const { data } = useQueryAutomation(id)
  const [showTip, setShowTip] = useState(true)

  // Function to handle adding a keyword from suggestions
  const handleAddKeyword = (newKeyword: string) => {
    // Call the addKeyword function directly
    addKeyword(newKeyword)
  }

  // Get the first keyword for suggestions, or use a default
  const getFirstKeyword = () => {
    if (data?.data?.keywords && data.data.keywords.length > 0) {
      return data.data.keywords[0].word
    }
    return "help" // Default keyword if none exists
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ transition: `all ${0.3 / animationSpeed}s ease-in-out` }}
      className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Tag className="h-4 w-4 mr-2 text-light-blue" />
          <p className="text-sm font-medium">Trigger Keywords</p>
        </div>
        {data?.data?.keywords && data?.data?.keywords.length > 0 && (
          <KeywordSuggestions keyword={getFirstKeyword()} onAddKeyword={handleAddKeyword} />
        )}
      </div>

      {showTip && <ContextCard context="keywords" onClose={() => setShowTip(false)} />}

      <div className="flex flex-wrap justify-start gap-2 items-center p-2 bg-background-90 rounded-lg min-h-[50px]">
        {data?.data?.keywords &&
          data?.data?.keywords.length > 0 &&
          data?.data?.keywords.map(
            (word) =>
              word.id !== latestVariable?.variables?.id && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={word.id}
                  style={{ transition: `all ${0.2 / animationSpeed}s ease-in-out` }}
                  className={`bg-${theme.primary}/20 text-${theme.primary} flex items-center gap-x-2 capitalize py-1 px-4 rounded-full group`}
                >
                  <p>{word.word}</p>
                  <X className="cursor-pointer hover:text-red-500" onClick={() => deleteMutation({ id: word.id })} />
                </motion.div>
              ),
          )}

        {latestVariable && latestVariable.status === "pending" && (
          <div
            className={`bg-${theme.primary}/20 text-${theme.primary} flex items-center gap-x-2 capitalize py-1 px-4 rounded-full`}
          >
            {latestVariable.variables.keyword}
          </div>
        )}

        <Input
          placeholder="Add a keyword..."
          style={{
            width: Math.min(Math.max(keyword.length || 10, 2), 50) + "ch",
          }}
          value={keyword}
          className="p-0 bg-transparent ring-0 border-none outline-none"
          onChange={onValueChange}
          onKeyUp={onKeyPress}
        />
      </div>

      <div className="text-xs text-text-secondary flex items-center">
        <span className="bg-light-blue/20 text-light-blue rounded-full w-4 h-4 inline-flex items-center justify-center mr-1 text-[10px]">
          i
        </span>
        Press Enter to add each keyword. Add 3-5 keywords for best results.
      </div>
    </motion.div>
  )
}

export default Keywords

