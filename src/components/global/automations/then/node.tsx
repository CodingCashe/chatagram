// 'use client'
// import { Separator } from '@/components/ui/separator'
// import { useQueryAutomation } from '@/hooks/user-queries'
// import { PlaneBlue, SmartAi, Warning } from '@/icons'
// import React from 'react'
// import PostButton from '../post'

// type Props = {
//   id: string
// }

// const ThenNode = ({ id }: Props) => {
//   const { data } = useQueryAutomation(id)
//   const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')

//   return !data?.data?.listener ? (
//     <></>
//   ) : (
//     <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
//       <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
//         <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//         <Separator
//           orientation="vertical"
//           className="bottom-full flex-1 border-[1px] border-pink-500"
//         />
//         <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//       </div>
//       <div className="flex gap-x-2">
//         <Warning />
//         Then...
//       </div>
//       <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
//         <div className="flex gap-x-2 items-center">
//           {data.data.listener.listener === 'MESSAGE' ? (
//             <PlaneBlue />
//           ) : (
//             <SmartAi />
//           )}
//           <p className=" text-lg">
//             {data.data.listener.listener === 'MESSAGE'
//               ? 'Manually send the client a message.'
//               : 'Use dynamic intelligent replies'}
//           </p>
//         </div>
//         <p className="flont-light text-text-secondary">
//           {data.data.listener.prompt}
//         </p>
//       </div>
//       {data.data.posts.length > 0 ? (
//         <></>
//       ) : commentTrigger ? (
//         <PostButton id={id} />
//       ) : (
//         <></>
//       )}
//     </div>
//   )
// }

// export default ThenNode


// "use client"
// import { Separator } from "@/components/ui/separator"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import PostButton from "../post"
// import { motion } from "framer-motion"
// import { MessageSquare, Sparkles, AlertCircle } from "lucide-react"

// type Props = {
//   id: string
// }

// const ThenNode = ({ id }: Props) => {
//   const { data } = useQueryAutomation(id)
//   const commentTrigger = data?.data?.trigger.find((t) => t.type === "COMMENT")

//   if (!data?.data?.listener) {
//     return null
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="w-full lg:w-10/12 relative xl:w-6/12"
//     >
//       <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
//         <span className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/30" />
//         <Separator orientation="vertical" className="h-full border-l-2 border-dashed border-emerald-500/30" />
//         <span className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/30" />
//       </div>

//       <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-1 shadow-xl">
//         <div className="bg-slate-900/80 backdrop-blur-sm p-5 rounded-lg">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 bg-emerald-500/10 rounded-lg">
//               <AlertCircle className="h-5 w-5 text-emerald-400" />
//             </div>
//             <p className="text-lg font-medium text-emerald-300">Then...</p>
//           </div>

//           <div className="bg-slate-800/80 p-4 rounded-lg">
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800">
//                 {data.data.listener.listener === "MESSAGE" ? (
//                   <MessageSquare className="h-6 w-6 text-emerald-400" />
//                 ) : (
//                   <Sparkles className="h-6 w-6 text-purple-400" />
//                 )}
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium text-white">
//                   {data.data.listener.listener === "MESSAGE"
//                     ? "Manually send the client a message"
//                     : "Use dynamic intelligent replies"}
//                 </h3>
//                 <p className="text-sm text-slate-400 mt-1 line-clamp-2">{data.data.listener.prompt}</p>
//               </div>
//             </div>
//           </div>

//           {data.data.posts.length === 0 && commentTrigger && (
//             <div className="mt-4">
//               <PostButton id={id} />
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default ThenNode

"use client"
import { Separator } from "@/components/ui/separator"
import { useQueryAutomation } from "@/hooks/user-queries"
import { PlaneBlue, SmartAi, Warning } from "@/icons"
import PostButton from "../post"
import { motion } from "framer-motion"

type Props = {
  id: string
  theme?: {
    id: string
    name: string
    primary: string
    secondary: string
  }
}

const ThenNode = ({ id, theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" } }: Props) => {
  const { data } = useQueryAutomation(id)
  const commentTrigger = data?.data?.trigger.find((t) => t.type === "COMMENT")

  if (!data?.data?.listener) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3"
    >
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator orientation="vertical" className="bottom-full flex-1 border-[1px] border-pink-500" />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>

      <div className="flex gap-x-2">
        <Warning />
        Then...
      </div>

      <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {data.data.listener.listener === "MESSAGE" ? <PlaneBlue /> : <SmartAi />}
          <p className="text-lg">
            {data.data.listener.listener === "MESSAGE"
              ? "Manually send the client a message."
              : "Use dynamic intelligent replies"}
          </p>
        </div>
        <p className="font-light text-text-secondary">{data.data.listener.prompt}</p>
      </div>

      {data.data.posts.length > 0 ? <></> : commentTrigger ? <PostButton id={id} /> : <></>}
    </motion.div>
  )
}

export default ThenNode

