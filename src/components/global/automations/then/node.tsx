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

// "use client"
// import { Separator } from "@/components/ui/separator"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import { PlaneBlue, SmartAi, Warning } from "@/icons"
// import PostButton from "../post"
// import { motion } from "framer-motion"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const ThenNode = ({ id, theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" } }: Props) => {
//   const { data } = useQueryAutomation(id)
//   const commentTrigger = data?.data?.trigger.find((t) => t.type === "COMMENT")

//   if (!data?.data?.listener) {
//     return null
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3"
//     >
//       <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
//         <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//         <Separator orientation="vertical" className="bottom-full flex-1 border-[1px] border-pink-500" />
//         <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
//       </div>

//       <div className="flex gap-x-2">
//         <Warning />
//         Then...
//       </div>

//       <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
//         <div className="flex gap-x-2 items-center">
//           {data.data.listener.listener === "MESSAGE" ? <PlaneBlue /> : <SmartAi />}
//           <p className="text-lg">
//             {data.data.listener.listener === "MESSAGE"
//               ? "Manually send the client a message."
//               : "Use dynamic intelligent replies"}
//           </p>
//         </div>
//         <p className="font-light text-text-secondary">{data.data.listener.prompt}</p>
//       </div>

//       {data.data.posts.length > 0 ? <></> : commentTrigger ? <PostButton id={id} theme={theme} /> : <></>}
//     </motion.div>
//   )
// }

// export default ThenNode

// "use client"
// import { useQueryAutomation } from "@/hooks/user-queries"
// import { PlaneBlue, SmartAi, Warning } from "@/icons"
// import PostButton from "../post"
// import { motion } from "framer-motion"
// import { FancyConnector } from "../connector"

// type Props = {
//   id: string
//   theme?: {
//     id: string
//     name: string
//     primary: string
//     secondary: string
//   }
// }

// const ThenNode = ({ id, theme = { id: "blue", name: "Blue", primary: "light-blue", secondary: "#768BDD" } }: Props) => {
//   const { data } = useQueryAutomation(id)
//   const commentTrigger = data?.data?.trigger.find((t) => t.type === "COMMENT")

//   if (!data?.data?.listener) {
//     return null
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3"
//     >
//       <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
//         <FancyConnector direction="vertical" style="gradient" length={80} color={theme.secondary} />
//       </div>

//       <div className="flex gap-x-2">
//         <Warning />
//         Then...
//       </div>

//       <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
//         <div className="flex gap-x-2 items-center">
//           {data.data.listener.listener === "MESSAGE" ? <PlaneBlue /> : <SmartAi />}
//           <p className="text-lg">
//             {data.data.listener.listener === "MESSAGE"
//               ? "Manually send the client a message."
//               : "Use dynamic intelligent replies"}
//           </p>
//         </div>
//         <p className="font-light text-text-secondary">{data.data.listener.prompt}</p>
//       </div>

//       {data.data.posts.length > 0 ? <></> : commentTrigger ? <PostButton id={id} theme={theme} /> : <></>}
//     </motion.div>
//   )
// }

// export default ThenNode

"use client"
import { useQueryAutomation } from "@/hooks/user-queries"
import { PlaneBlue, SmartAi } from "@/icons"
import PostButton from "../post"
import { motion } from "framer-motion"
import { FancyConnector } from "../connector"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Zap, Clock, Settings, Copy, CheckCircle, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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
  const [copied, setCopied] = useState(false)

  if (!data?.data?.listener) {
    return null
  }

  const isAiResponse = data.data.listener.listener === "SMARTAI"
  const responseText = data.data.listener.prompt || "No response configured"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl relative px-4 sm:px-0"
    >
      <div className="absolute h-20 left-1/2 -top-20 flex flex-col items-center z-10">
        <FancyConnector direction="vertical" style="gradient" length={55} color={theme.secondary} />
      </div>

      <div className="bg-gradient-to-r from-background-80 to-background-90 rounded-xl w-full overflow-hidden shadow-lg border border-background-80/50">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#3352CC] via-[#768BDD] to-[#3352CC] w-full shimmerBorder" />

        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-background-90 rounded-xl">
              {isAiResponse ? <SmartAi /> : <PlaneBlue/>}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{isAiResponse ? "AI-Powered Response" : "Automated Message"}</h3>
                <Badge className={isAiResponse ? "bg-purple-600" : "bg-[#3352CC]"}>
                  {isAiResponse ? "AI" : "Auto"}
                </Badge>
              </div>
              <p className="text-text-secondary">
                {isAiResponse
                  ? "Using dynamic intelligent replies powered by AI"
                  : "Sending a pre-configured message to your customers"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left section - Response preview */}
            <div className="lg:col-span-2">
              <div className="bg-background-90 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#768BDD]" />
                    Response Preview
                  </h4>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={copyToClipboard}>
                      {copied ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="bg-background-80 rounded-lg p-4 min-h-[150px] sm:min-h-[200px]">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#3352CC] flex items-center justify-center text-white font-bold text-sm">
                      YB
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Your Business</span>
                        <Badge variant="outline" className="bg-background-90/50 text-xs">
                          Author
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm whitespace-pre-line">{responseText}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-background-80/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#768BDD]" />
                    <p className="text-sm text-text-secondary">
                      Average response time: <span className="text-white font-medium">1.2 seconds</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section - Settings & Stats */}
            <div className="lg:col-span-1">
              <div className="bg-background-90 rounded-xl p-5 staggeredFadeIn">
                <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-[#768BDD]" />
                  Response Settings
                </h4>

                <div className="space-y-4">
                  <div className="bg-background-80 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-[#768BDD]" />
                        <span>Response Type</span>
                      </div>
                      <Badge className={isAiResponse ? "bg-purple-600" : "bg-[#3352CC]"}>
                        {isAiResponse ? "AI-Powered" : "Template"}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-background-80 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#768BDD]" />
                        <span>Delay</span>
                      </div>
                      <span className="font-medium">5 seconds</span>
                    </div>
                  </div>

                  <div className="bg-background-80 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-[#768BDD]" />
                        <span>Character Count</span>
                      </div>
                      <span className="font-medium">{responseText.length}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="text-sm font-medium mb-3">Response Performance</h5>
                  <div className="bg-background-80 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-secondary">Engagement Rate</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <div className="w-full bg-background-90 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#3352CC] to-[#768BDD] h-2 rounded-full"
                        style={{ width: "76%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Response
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {data.data.posts.length > 0 ? <></> : commentTrigger ? <PostButton id={id} theme={theme} /> : <></>}
        </div>
      </div>
    </motion.div>
  )
}

export default ThenNode

