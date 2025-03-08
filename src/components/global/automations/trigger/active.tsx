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

// "use client"
// import { MessageSquare, Instagram } from "lucide-react"
// import { motion } from "framer-motion"

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
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-1 shadow-xl"
//     >
//       <div className="bg-slate-900/80 backdrop-blur-sm p-5 rounded-lg">
//         <div className="flex items-center gap-4">
//           <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg">
//             {type === "COMMENT" ? (
//               <Instagram className="h-6 w-6 text-emerald-400" />
//             ) : (
//               <MessageSquare className="h-6 w-6 text-teal-400" />
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-medium text-white">
//               {type === "COMMENT" ? "Client writes comments on my post" : "Client sends me a direct message"}
//             </h3>
//             <p className="text-sm text-slate-400 mt-1">
//               {type === "COMMENT"
//                 ? "If the user comments on a post setup to listen for keywords, this automation will start"
//                 : "If the user sends you a message that contains a keyword, this automation will start"}
//             </p>
//           </div>
//         </div>

//         <div className="mt-5">
//           <p className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-medium">Keywords</p>
//           <div className="flex flex-wrap gap-2">
//             {keywords.map((word) => (
//               <motion.div
//                 key={word.id}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-gradient-to-r from-emerald-600 to-teal-600 py-1.5 px-4 rounded-full"
//               >
//                 <p className="text-sm text-white font-medium capitalize">{word.word}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default ActiveTrigger


// "use client"
// import { InstagramBlue, PlaneBlue } from "@/icons"
// import { motion } from "framer-motion"

// type Props = {
//   type: string
//   keywords: {
//     id: string
//     word: string
//     automationId: string | null
//   }[]
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const ActiveTrigger = ({
//   keywords,
//   type,
//   theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
// }: Props) => {
//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
//       <div className="bg-background-80 p-3 rounded-xl w-full">
//         <div className="flex flex-col md:flex-row md:items-center gap-4">
//           <div className="shrink-0">{type === "COMMENT" ? <InstagramBlue /> : <PlaneBlue />}</div>
//           <div>
//             <h3 className="text-lg">
//               {type === "COMMENT" ? "Client writes comments on my post" : "Client sends me a direct message"}
//             </h3>
//             <p className="text-text-secondary">
//               {type === "COMMENT"
//                 ? "If the user comments on a post setup to listen for keywords, this automation will start"
//                 : "If the user sends you a message that contains a keyword, this automation will start"}
//             </p>
//           </div>
//         </div>

//         <div className="mt-5">
//           <div className="flex flex-wrap gap-2">
//             {keywords.map((word) => (
//               <motion.div
//                 key={word.id}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
//               >
//                 <p>{word.word}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default ActiveTrigger

"use client"
import { InstagramBlue, PlaneBlue } from "@/icons"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MessageCircle, Heart, Users } from "lucide-react"

type Props = {
  type: string
  keywords: {
    id: string
    word: string
    automationId: string | null
  }[]
  theme?: {
    id: string
    name: string
    primary: string
    secondary: string
  }
}

const ActiveTrigger = ({
  keywords,
  type,
  theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" },
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl px-4 sm:px-0"
    >
      <div className="bg-gradient-to-r from-background-80 to-background-90 rounded-xl w-full overflow-hidden shadow-lg border border-background-80/50">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#3352CC] via-[#768BDD] to-[#3352CC] w-full shimmerBorder" />

        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* Left section - Trigger info */}
            <div className="md:w-1/3">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-background-90 rounded-xl">
                  {type === "COMMENT" ? <InstagramBlue/> : <PlaneBlue />}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{type === "COMMENT" ? "Instagram Comment" : "Direct Message"}</h3>
                  <p className="text-text-secondary mt-1">
                    {type === "COMMENT"
                      ? "Triggers when someone comments on your post"
                      : "Triggers when someone sends you a direct message"}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline" className="bg-background-90/50 text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Response
                    </Badge>
                    <Badge variant="outline" className="bg-background-90/50 text-xs flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {type === "COMMENT" ? "Private" : "Private"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats section */}
              {/* <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-background-90 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Responses</span>
                  </div>
                  <p className="text-xl font-bold">124</p>
                </div>
                <div className="bg-background-90 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                    <Heart className="h-4 w-4" />
                    <span>Engagement</span>
                  </div>
                  <p className="text-xl font-bold">87%</p>
                </div>
              </div> */}
            </div>

            {/* Right section - Keywords */}
            <div className="md:w-2/3 md:border-l md:border-background-80/50 md:pl-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium">Trigger Keywords</h4>
                <Badge className="bg-[#3352CC]">{keywords.length} Keywords</Badge>
              </div>

              <div className="bg-background-90 p-4 rounded-xl staggeredFadeIn">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {keywords.map((word) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      key={word.id}
                      className="bg-gradient-to-br from-[#3352CC]/20 to-[#1C2D70]/20 border border-[#3352CC]/30 flex items-center gap-x-2 capitalize text-white font-medium py-2 px-4 rounded-full"
                    >
                      <p>{word.word}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 bg-background-80/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#768BDD]" />
                    <p className="text-sm text-text-secondary">
                      This automation will trigger when someone uses these keywords in a
                      {type === "COMMENT" ? " comment on your post" : " direct message to you"}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity timeline */}
              <div className="mt-4">
                <h5 className="text-sm font-medium mb-2">Note</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>The messages will be sent to their dms</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>The responses will be in the language of the client</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ActiveTrigger

