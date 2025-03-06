// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import { Instagram, MessageCircle, Send, RefreshCw, Sparkles, Copy, CheckCheck } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Image from "next/image"
// import { PlayCircle } from "lucide-react" // Import PlayCircle

// type SimulationTabProps = {
//   keywords: string[]
//   responseMessage: string
//   responseType: string
// }

// export const SimulationTab = ({
//   keywords = [],
//   responseMessage = "",
//   responseType = "MESSAGE",
// }: SimulationTabProps) => {
//   const [activeTab, setActiveTab] = useState<"comment" | "dm">("comment")
//   const [userInput, setUserInput] = useState("")
//   const [simulationActive, setSimulationActive] = useState(false)
//   const [simulationStep, setSimulationStep] = useState(0)
//   const [typingMessage, setTypingMessage] = useState("")
//   const [detectedKeyword, setDetectedKeyword] = useState("")
//   const [copied, setCopied] = useState(false)
//   const chatContainerRef = useRef<HTMLDivElement>(null)

//   // Default message if none provided
//   const defaultMessage =
//     responseType === "SMARTAI"
//       ? "Thanks for your interest! Based on what youre asking about, our product might be a good fit for your needs. Would you like me to tell you more about our features and pricing options?"
//       : "Thanks for your message! We appreciate your interest in our products. How can I help you today?"

//   const finalResponseMessage = responseMessage || defaultMessage

//   // Sample user profile
//   const userProfile = {
//     name: "yourcompany",
//     avatar: "/placeholder.svg?height=40&width=40",
//     verified: true,
//   }

//   // Sample customer profile
//   const customerProfile = {
//     name: "customer123",
//     avatar: "/placeholder.svg?height=40&width=40",
//   }

//   // Sample post for comment simulation
//   const samplePost = {
//     image: "/placeholder.svg?height=400&width=400",
//     caption: "Check out our latest product launch! Let us know what you think in the comments below.",
//     likes: 128,
//     timestamp: "2 HOURS AGO",
//   }

//   // Function to detect keywords in text
//   const detectKeyword = (text: string): string | null => {
//     if (!keywords.length) return null

//     const lowerText = text.toLowerCase()
//     for (const keyword of keywords) {
//       if (lowerText.includes(keyword.toLowerCase())) {
//         return keyword
//       }
//     }
//     return null
//   }

//   // Function to handle user input submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!userInput.trim()) return

//     const keyword = detectKeyword(userInput)
//     if (keyword) {
//       setDetectedKeyword(keyword)
//       startSimulation(userInput)
//     } else {
//       // If no keyword detected, just add the message without triggering automation
//       setUserInput("")
//     }
//   }

//   // Function to start the simulation
//   const startSimulation = (message: string) => {
//     setSimulationActive(true)
//     setSimulationStep(1)
//     setTypingMessage(message)
//     setUserInput("")

//     // Simulate typing the user message
//     let i = 0
//     const typingInterval = setInterval(() => {
//       if (i <= message.length) {
//         setTypingMessage(message.substring(0, i))
//         i++
//       } else {
//         clearInterval(typingInterval)
//         setTimeout(() => {
//           setSimulationStep(2) // Move to showing the keyword detection

//           setTimeout(() => {
//             setSimulationStep(3) // Move to showing the response

//             // Scroll to bottom when new messages appear
//             if (chatContainerRef.current) {
//               chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
//             }
//           }, 1500)
//         }, 1000)
//       }
//     }, 50)
//   }

//   // Reset the simulation
//   const resetSimulation = () => {
//     setSimulationActive(false)
//     setSimulationStep(0)
//     setTypingMessage("")
//     setDetectedKeyword("")
//   }

//   // Generate a sample message containing a keyword
//   const generateSampleMessage = () => {
//     if (!keywords.length) return

//     const keyword = keywords[Math.floor(Math.random() * keywords.length)]
//     const sampleMessages = [
//       `Hi there! I'm interested in your ${keyword}. Can you tell me more about it?`,
//       `Hello! Do you have any information about ${keyword}? I'd like to learn more.`,
//       `I saw your post about ${keyword} and I have some questions.`,
//       `What's the ${keyword} like? I'm thinking about getting one.`,
//       `Can you help me with ${keyword}? I need some assistance.`,
//     ]

//     setUserInput(sampleMessages[Math.floor(Math.random() * sampleMessages.length)])
//   }

//   // Copy response to clipboard
//   const copyResponse = () => {
//     navigator.clipboard.writeText(finalResponseMessage)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   // Scroll to bottom when new messages appear
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
//     }
//   }, []) // Corrected dependency

//   // Add useEffect to update the simulation when keywords or response message changes
//   useEffect(() => {
//     // Reset simulation when keywords or response message changes
//     resetSimulation()

//     // If we have keywords, generate a sample message
//     if (keywords.length > 0 && !userInput) {
//       generateSampleMessage()
//     }
//   }, [keywords, userInput, resetSimulation, generateSampleMessage])

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium flex items-center">
//           <PlayCircle className="h-5 w-5 mr-2 text-light-blue" />
//           Automation Simulation
//         </h3>

//         <div className="flex bg-background-80 rounded-md p-1">
//           <Button
//             variant="ghost"
//             size="sm"
//             className={`text-xs px-3 ${activeTab === "comment" ? "bg-background-90" : ""}`}
//             onClick={() => setActiveTab("comment")}
//           >
//             <Instagram className="h-4 w-4 mr-1" />
//             Comment
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             className={`text-xs px-3 ${activeTab === "dm" ? "bg-background-90" : ""}`}
//             onClick={() => setActiveTab("dm")}
//           >
//             <MessageCircle className="h-4 w-4 mr-1" />
//             Direct Message
//           </Button>
//         </div>
//       </div>

//       {/* Instagram Simulation */}
//       <div className="bg-background-80 rounded-xl overflow-hidden">
//         {/* Instagram Header */}
//         <div className="bg-background-90 p-3 border-b border-background-80 flex items-center justify-between">
//           <div className="flex items-center">
//             <Instagram className="h-5 w-5 mr-2 text-light-blue" />
//             <span className="font-medium">Instagram</span>
//           </div>
//           <div className="text-xs text-text-secondary">Simulation</div>
//         </div>

//         {activeTab === "comment" ? (
//           // Comment Simulation
//           <div className="p-4">
//             {/* Post */}
//             <div className="border border-background-80 rounded-md overflow-hidden bg-background-90 mb-4">
//               {/* Post Header */}
//               <div className="p-3 flex items-center">
//                 <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
//                   <Image
//                     src={userProfile.avatar || "/placeholder.svg"}
//                     alt={userProfile.name}
//                     fill
//                     sizes="32px"
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <div className="flex items-center">
//                     <span className="font-medium text-sm">{userProfile.name}</span>
//                     {userProfile.verified && (
//                       <div className="ml-1 h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center">
//                         <CheckCheck className="h-2.5 w-2.5 text-white" />
//                       </div>
//                     )}
//                   </div>
//                   <span className="text-xs text-text-secondary">Original poster</span>
//                 </div>
//               </div>

//               {/* Post Image */}
//               <div className="aspect-square relative">
//                 <Image
//                   src={samplePost.image || "/placeholder.svg"}
//                   alt="Post image"
//                   fill
//                   sizes="(max-width: 768px) 100vw, 500px"
//                   className="object-cover"
//                 />
//               </div>

//               {/* Post Actions */}
//               <div className="p-3">
//                 <div className="flex items-center gap-3 mb-2">
//                   <svg aria-label="Like" height="24" role="img" viewBox="0 0 24 24" width="24">
//                     <path
//                       d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
//                       fill="currentColor"
//                     ></path>
//                   </svg>
//                   <svg aria-label="Comment" height="24" role="img" viewBox="0 0 24 24" width="24">
//                     <path
//                       d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                     ></path>
//                   </svg>
//                   <svg aria-label="Share Post" height="24" role="img" viewBox="0 0 24 24" width="24">
//                     <line
//                       fill="none"
//                       stroke="currentColor"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       x1="22"
//                       x2="9.218"
//                       y1="3"
//                       y2="10.083"
//                     ></line>
//                     <polygon
//                       fill="none"
//                       points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
//                       stroke="currentColor"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                     ></polygon>
//                   </svg>
//                 </div>

//                 <div className="font-medium text-sm mb-1">{samplePost.likes} likes</div>
//                 <div className="text-sm mb-1">
//                   <span className="font-medium mr-1">{userProfile.name}</span>
//                   {samplePost.caption}
//                 </div>
//                 <div className="text-xs text-text-secondary uppercase">{samplePost.timestamp}</div>
//               </div>
//             </div>

//             {/* Comments Section */}
//             <div className="border border-background-80 rounded-md bg-background-90 p-3">
//               <h4 className="text-sm font-medium mb-3">Comments</h4>

//               <div ref={chatContainerRef} className="space-y-3 max-h-[300px] overflow-y-auto mb-3">
//                 {/* Existing Comments */}
//                 <div className="flex items-start gap-2">
//                   <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
//                     <Image
//                       src="/placeholder.svg?height=32&width=32"
//                       alt="User"
//                       fill
//                       sizes="32px"
//                       className="object-cover"
//                     />
//                   </div>
//                   <div>
//                     <div className="bg-background-80 rounded-2xl px-3 py-2">
//                       <span className="font-medium text-sm mr-1">user</span>
//                       <span className="text-sm">This looks amazing! Cant wait to try it.</span>
//                     </div>
//                     <div className="flex items-center mt-1 text-xs text-text-secondary">
//                       <span>1h</span>
//                       <span className="mx-2">·</span>
//                       <span>2 likes</span>
//                       <span className="mx-2">·</span>
//                       <span>Reply</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Simulation Messages */}
//                 {simulationActive && (
//                   <>
//                     {/* Customer Comment */}
//                     <div className="flex items-start gap-2">
//                       <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
//                         <Image
//                           src={customerProfile.avatar || "/placeholder.svg"}
//                           alt={customerProfile.name}
//                           fill
//                           sizes="32px"
//                           className="object-cover"
//                         />
//                       </div>
//                       <div>
//                         <div className="bg-background-80 rounded-2xl px-3 py-2">
//                           <span className="font-medium text-sm mr-1">{customerProfile.name}</span>
//                           <span className="text-sm">{typingMessage}</span>
//                         </div>
//                         <div className="flex items-center mt-1 text-xs text-text-secondary">
//                           <span>Just now</span>
//                           <span className="mx-2">·</span>
//                           <span>Like</span>
//                           <span className="mx-2">·</span>
//                           <span>Reply</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Keyword Detection */}
//                     {simulationStep >= 2 && (
//                       <div className="flex items-center justify-center">
//                         <div className="bg-light-blue/10 text-light-blue text-xs px-3 py-1 rounded-full flex items-center">
//                           <Sparkles className="h-3 w-3 mr-1" />
//                           Keyword detected: {detectedKeyword}
//                         </div>
//                       </div>
//                     )}

//                     {/* Automated Response */}
//                     {simulationStep >= 3 && (
//                       <div className="flex items-start gap-2">
//                         <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
//                           <Image
//                             src={userProfile.avatar || "/placeholder.svg"}
//                             alt={userProfile.name}
//                             fill
//                             sizes="32px"
//                             className="object-cover"
//                           />
//                         </div>
//                         <div>
//                           <div className="bg-light-blue/10 rounded-2xl px-3 py-2">
//                             <div className="flex items-center mb-1">
//                               <span className="font-medium text-sm mr-1">{userProfile.name}</span>
//                               {userProfile.verified && (
//                                 <div className="h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center">
//                                   <CheckCheck className="h-2.5 w-2.5 text-white" />
//                                 </div>
//                               )}
//                               <span className="ml-auto text-xs text-light-blue flex items-center">
//                                 <Sparkles className="h-3 w-3 mr-1" />
//                                 Automated
//                               </span>
//                             </div>
//                             <span className="text-sm">{finalResponseMessage}</span>
//                           </div>
//                           <div className="flex items-center mt-1 text-xs text-text-secondary">
//                             <span>Just now</span>
//                             <span className="mx-2">·</span>
//                             <span>Like</span>
//                             <span className="mx-2">·</span>
//                             <span>Reply</span>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>

//               {/* Comment Input */}
//               <form onSubmit={handleSubmit} className="flex items-center gap-2">
//                 <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
//                   <Image
//                     src={customerProfile.avatar || "/placeholder.svg"}
//                     alt={customerProfile.name}
//                     fill
//                     sizes="32px"
//                     className="object-cover"
//                   />
//                 </div>
//                 <Input
//                   placeholder="Add a comment as customer123..."
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   className="bg-background-80 border-none flex-1"
//                 />
//                 <Button
//                   type="submit"
//                   size="sm"
//                   variant="ghost"
//                   className="text-light-blue"
//                   disabled={!userInput.trim() || simulationActive}
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           // Direct Message Simulation
//           <div className="flex flex-col h-[600px]">
//             {/* DM Header */}
//             <div className="p-3 border-b border-background-80 flex items-center">
//               <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
//                 <Image
//                   src={userProfile.avatar || "/placeholder.svg"}
//                   alt={userProfile.name}
//                   fill
//                   sizes="32px"
//                   className="object-cover"
//                 />
//               </div>
//               <div>
//                 <div className="flex items-center">
//                   <span className="font-medium text-sm">{userProfile.name}</span>
//                   {userProfile.verified && (
//                     <div className="ml-1 h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center">
//                       <CheckCheck className="h-2.5 w-2.5 text-white" />
//                     </div>
//                   )}
//                 </div>
//                 <span className="text-xs text-text-secondary">Active now</span>
//               </div>
//             </div>

//             {/* Chat Messages */}
//             <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
//               {/* Welcome Message */}
//               <div className="flex justify-center">
//                 <div className="bg-background-90 text-text-secondary text-xs px-3 py-1 rounded-full">
//                   {new Date().toLocaleDateString()} · Conversation started
//                 </div>
//               </div>

//               <div className="flex justify-center">
//                 <div className="bg-background-90 text-text-secondary text-xs px-3 py-1 rounded-full">
//                   Youre now connected on Instagram
//                 </div>
//               </div>

//               {/* Simulation Messages */}
//               {simulationActive && (
//                 <>
//                   {/* Customer Message */}
//                   <div className="flex justify-end">
//                     <div className="bg-light-blue rounded-2xl px-3 py-2 max-w-[80%]">
//                       <span className="text-sm text-white">{typingMessage}</span>
//                     </div>
//                   </div>

//                   {/* Keyword Detection */}
//                   {simulationStep >= 2 && (
//                     <div className="flex items-center justify-center">
//                       <div className="bg-light-blue/10 text-light-blue text-xs px-3 py-1 rounded-full flex items-center">
//                         <Sparkles className="h-3 w-3 mr-1" />
//                         Keyword detected: {detectedKeyword}
//                       </div>
//                     </div>
//                   )}

//                   {/* Automated Response */}
//                   {simulationStep >= 3 && (
//                     <div className="flex justify-start">
//                       <div className="bg-background-90 rounded-2xl px-3 py-2 max-w-[80%] relative">
//                         <span className="text-sm">{finalResponseMessage}</span>
//                         <div className="absolute -top-5 left-2 text-xs text-light-blue flex items-center">
//                           <Sparkles className="h-3 w-3 mr-1" />
//                           Automated Response
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>

//             {/* Message Input */}
//             <form onSubmit={handleSubmit} className="p-3 border-t border-background-80 flex items-center gap-2">
//               <Input
//                 placeholder="Message..."
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 className="bg-background-80 border-none flex-1"
//               />
//               <Button
//                 type="submit"
//                 size="sm"
//                 variant="ghost"
//                 className="text-light-blue"
//                 disabled={!userInput.trim() || simulationActive}
//               >
//                 <Send className="h-4 w-4" />
//               </Button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Simulation Controls */}
//       <div className="flex flex-col md:flex-row gap-3 justify-between">
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={generateSampleMessage}
//             disabled={!keywords.length || simulationActive}
//             className="flex-1 md:flex-none"
//           >
//             <Sparkles className="h-4 w-4 mr-2" />
//             Generate Sample Message
//           </Button>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={resetSimulation}
//             disabled={!simulationActive}
//             className="flex-1 md:flex-none"
//           >
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Reset Simulation
//           </Button>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" onClick={copyResponse} className="flex-1 md:flex-none">
//             {copied ? (
//               <>
//                 <CheckCheck className="h-4 w-4 mr-2 text-green-500" />
//                 Copied!
//               </>
//             ) : (
//               <>
//                 <Copy className="h-4 w-4 mr-2" />
//                 Copy Response
//               </>
//             )}
//           </Button>

//           <Button variant="default" size="sm" className="bg-light-blue hover:bg-light-blue/90 flex-1 md:flex-none">
//             Save Automation
//           </Button>
//         </div>
//       </div>

//       {/* Tips */}
//       <div className="bg-background-80 p-4 rounded-xl">
//         <h4 className="font-medium mb-2 flex items-center">
//           <Sparkles className="h-4 w-4 mr-2 text-light-blue" />
//           Simulation Tips
//         </h4>
//         <ul className="text-sm text-text-secondary space-y-2 list-disc pl-5">
//           <li>Type a message containing one of your keywords to see how the automation responds</li>
//           <li>Use the Generate Sample Message button to create a message with one of your keywords</li>
//           <li>
//             Switch between Comment and Direct Message views to see how your automation works in different contexts
//           </li>
//           <li>This simulation shows exactly how your customers will experience your automation</li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default SimulationTab

"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Instagram,
  MessageCircle,
  Send,
  RefreshCw,
  Sparkles,
  Copy,
  CheckCheck,
  Search,
  BellRing,
  PlayCircle,
  PauseCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type SimulationTabProps = {
  keywords: string[]
  responseMessage: string
  responseType: string
}

export const SimulationTab = ({
  keywords = [],
  responseMessage = "",
  responseType = "MESSAGE",
}: SimulationTabProps) => {
  const [activeTab, setActiveTab] = useState<"comment" | "dm">("comment")
  const [userInput, setUserInput] = useState("")
  const [simulationActive, setSimulationActive] = useState(false)
  const [autoplayActive, setAutoplayActive] = useState(false)
  const [detectedKeyword, setDetectedKeyword] = useState("")
  const [copied, setCopied] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: string; content: string; keyword?: string }>>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [showTutorial, setShowTutorial] = useState(true)
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Default message if none provided
  const defaultMessage =
    responseType === "SMARTAI"
      ? "Thanks for your interest! Based on what you're asking about, our product might be a good fit for your needs. Would you like me to tell you more about our features and pricing options?"
      : "Thanks for your message! We appreciate your interest in our products. How can I help you today?"

  const finalResponseMessage = responseMessage || defaultMessage

  // Sample user profile
  const userProfile = {
    name: "yourcompany",
    avatar: "https://placehold.co/40x40/3352CC/FFFFFF/webp?text=YC",
    verified: true,
  }

  // Sample customer profile
  const customerProfile = {
    name: "customer123",
    avatar: "https://placehold.co/40x40/F78D6D/FFFFFF/webp?text=C",
  }

  // Sample post for comment simulation
  const samplePost = {
    image: "https://placehold.co/600x600/1A1A1A/FFFFFF/webp?text=Your+Post",
    caption: "Check out our latest product launch! Let us know what you think in the comments below.",
    likes: 128,
    timestamp: "2 HOURS AGO",
  }

  // Function to detect keywords in text
  const detectKeyword = (text: string): string | null => {
    if (!keywords.length) return null

    const lowerText = text.toLowerCase()
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return keyword
      }
    }
    return null
  }

  // Function to handle user input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const keyword = detectKeyword(userInput)

    // Add user message to chat
    setMessages((prev) => [...prev, { type: "user", content: userInput }])

    if (keyword) {
      // Add keyword detection message
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "keyword", content: keyword }])

        // Add automated response
        setTimeout(() => {
          setMessages((prev) => [...prev, { type: "response", content: finalResponseMessage, keyword }])

          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
          }
        }, 1000)
      }, 500)

      setDetectedKeyword(keyword)
    } else {
      // If no keyword detected, add a message indicating no keyword found
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "notification", content: "No keyword detected. Automation won't respond." },
        ])
      }, 500)
    }

    setUserInput("")
    setSimulationActive(true)
  }

  // Reset the simulation
  const resetSimulation = () => {
    setMessages([])
    setSimulationActive(false)
    setDetectedKeyword("")
    setAutoplayActive(false)
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current)
    }
  }

  // Generate a sample message containing a keyword
  const generateSampleMessage = useCallback(() => {
    if (!keywords.length) return ""

    const keyword = keywords[Math.floor(Math.random() * keywords.length)]
    const sampleMessages = [
      `Hi there! I'm interested in your ${keyword}. Can you tell me more about it?`,
      `Hello! Do you have any information about ${keyword}? I'd like to learn more.`,
      `I saw your post about ${keyword} and I have some questions.`,
      `What's the ${keyword} like? I'm thinking about getting one.`,
      `Can you help me with ${keyword}? I need some assistance.`,
    ]

    return sampleMessages[Math.floor(Math.random() * sampleMessages.length)]
  }, [keywords])

  // Autoplay function to simulate conversation
  const startAutoplay = () => {
    setAutoplayActive(true)

    const runAutoplayStep = () => {
      const message = generateSampleMessage()
      setUserInput(message)

      // Wait a bit before submitting
      autoplayTimeoutRef.current = setTimeout(() => {
        // Simulate form submission
        const keyword = detectKeyword(message)

        // Add user message to chat
        setMessages((prev) => [...prev, { type: "user", content: message }])

        if (keyword) {
          // Add keyword detection message
          setTimeout(() => {
            setMessages((prev) => [...prev, { type: "keyword", content: keyword }])

            // Add automated response
            setTimeout(() => {
              setMessages((prev) => [...prev, { type: "response", content: finalResponseMessage, keyword }])

              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
              }

              // Continue autoplay after a pause if still active
              if (autoplayActive) {
                autoplayTimeoutRef.current = setTimeout(runAutoplayStep, 3000)
              }
            }, 1000)
          }, 500)

          setDetectedKeyword(keyword)
        } else {
          // If no keyword detected, add a message indicating no keyword found
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { type: "notification", content: "No keyword detected. Automation won't respond." },
            ])

            // Continue autoplay after a pause if still active
            if (autoplayActive) {
              autoplayTimeoutRef.current = setTimeout(runAutoplayStep, 3000)
            }
          }, 500)
        }

        setUserInput("")
        setSimulationActive(true)
      }, 1000)
    }

    // Start the first autoplay step
    runAutoplayStep()
  }

  // Stop autoplay
  const stopAutoplay = () => {
    setAutoplayActive(false)
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current)
    }
  }

  // Copy response to clipboard
  const copyResponse = () => {
    navigator.clipboard.writeText(finalResponseMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Add useEffect to update the simulation when keywords or response message changes
  useEffect(() => {
    // Reset simulation when keywords or response message changes
    resetSimulation()

    // If we have keywords, generate a sample message
    if (keywords.length > 0 && !userInput) {
      setUserInput(generateSampleMessage())
    }
  }, [keywords, responseMessage, userInput, generateSampleMessage])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-light-blue" />
          Automation Simulation
        </h3>

        <div className="flex gap-2">
          <div className="flex bg-background-80 rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs px-3 ${activeTab === "comment" ? "bg-background-90" : ""}`}
              onClick={() => setActiveTab("comment")}
            >
              <Instagram className="h-4 w-4 mr-1" />
              Comment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs px-3 ${activeTab === "dm" ? "bg-background-90" : ""}`}
              onClick={() => setActiveTab("dm")}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Direct Message
            </Button>
          </div>

          <Button
            variant={autoplayActive ? "default" : "outline"}
            size="sm"
            onClick={autoplayActive ? stopAutoplay : startAutoplay}
            className={autoplayActive ? "bg-keyword-purple text-white" : ""}
            disabled={!keywords.length}
          >
            {autoplayActive ? (
              <>
                <PauseCircle className="h-4 w-4 mr-1" />
                Stop Auto
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-1" />
                Auto Simulate
              </>
            )}
          </Button>
        </div>
      </div>

      {showTutorial && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-light-blue/10 border border-light-blue/20 p-4 rounded-xl"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="bg-light-blue/20 p-2 rounded-full mt-1">
                <Search className="h-5 w-5 text-light-blue" />
              </div>
              <div>
                <h4 className="font-medium text-light-blue">How the Simulation Works</h4>
                <p className="text-sm text-text-secondary mt-1">
                  This simulation shows how your automation responds to messages containing your keywords. Try typing a
                  message with one of your keywords to see how it works!
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((word, i) => (
                    <Badge key={i} variant="outline" className="bg-light-blue/20 text-light-blue border-none">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-white"
              onClick={() => setShowTutorial(false)}
            >
              ✕
            </Button>
          </div>
        </motion.div>
      )}

      {/* Instagram Simulation */}
      <div className="bg-background-80 rounded-xl overflow-hidden border border-background-90">
        {/* Instagram Header */}
        <div className="bg-background-90 p-3 border-b border-background-80 flex items-center justify-between">
          <div className="flex items-center">
            <Instagram className="h-5 w-5 mr-2 text-light-blue" />
            <span className="font-medium">Instagram</span>
          </div>
          <div className="text-xs text-text-secondary">Simulation</div>
        </div>

        {activeTab === "comment" ? (
          // Comment Simulation
          <div className="p-4">
            {/* Post */}
            <div className="border border-background-80 rounded-md overflow-hidden bg-background-90 mb-4">
              {/* Post Header */}
              <div className="p-3 flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
                  <Image
                    src={userProfile.avatar || "/placeholder.svg"}
                    alt={userProfile.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{userProfile.name}</span>
                    {userProfile.verified && (
                      <div className="ml-1 h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCheck className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary">Original poster</span>
                </div>
              </div>

              {/* Post Image */}
              <div className="aspect-square relative">
                <Image
                  src={samplePost.image || "/placeholder.svg"}
                  alt="Post image"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="p-3">
                <div className="flex items-center gap-3 mb-2">
                  <svg aria-label="Like" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path
                      d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <svg aria-label="Comment" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path
                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <svg aria-label="Share Post" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="22"
                      x2="9.218"
                      y1="3"
                      y2="10.083"
                    ></line>
                    <polygon
                      fill="none"
                      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></polygon>
                  </svg>
                </div>

                <div className="font-medium text-sm mb-1">{samplePost.likes} likes</div>
                <div className="text-sm mb-1">
                  <span className="font-medium mr-1">{userProfile.name}</span>
                  {samplePost.caption}
                </div>
                <div className="text-xs text-text-secondary uppercase">{samplePost.timestamp}</div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border border-background-80 rounded-md bg-background-90 p-3">
              <h4 className="text-sm font-medium mb-3">Comments</h4>

              <div ref={chatContainerRef} className="space-y-3 max-h-[300px] overflow-y-auto mb-3">
                {/* Existing Comments */}
                <div className="flex items-start gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                      src="https://placehold.co/40x40/A76DF7/FFFFFF/webp?text=U"
                      alt="User"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="bg-background-80 rounded-2xl px-3 py-2">
                      <span className="font-medium text-sm mr-1">user456</span>
                      <span className="text-sm">This looks amazing! Cant wait to try it.</span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-text-secondary">
                      <span>1h</span>
                      <span className="mx-2">·</span>
                      <span>2 likes</span>
                      <span className="mx-2">·</span>
                      <span>Reply</span>
                    </div>
                  </div>
                </div>

                {/* Simulation Messages */}
                <AnimatePresence>
                  {messages.map((message, index) => {
                    if (message.type === "user") {
                      return (
                        <motion.div
                          key={`user-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2"
                        >
                          <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
                            <Image
                              src={customerProfile.avatar || "/placeholder.svg"}
                              alt={customerProfile.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="bg-background-80 rounded-2xl px-3 py-2">
                              <span className="font-medium text-sm mr-1">{customerProfile.name}</span>
                              <span className="text-sm">{message.content}</span>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-text-secondary">
                              <span>Just now</span>
                              <span className="mx-2">·</span>
                              <span>Like</span>
                              <span className="mx-2">·</span>
                              <span>Reply</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    } else if (message.type === "keyword") {
                      return (
                        <motion.div
                          key={`keyword-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-center"
                        >
                          <div className="bg-light-blue/10 text-light-blue text-xs px-3 py-1 rounded-full flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Keyword detected: {message.content}
                          </div>
                        </motion.div>
                      )
                    } else if (message.type === "response") {
                      return (
                        <motion.div
                          key={`response-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2"
                        >
                          <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
                            <Image
                              src={userProfile.avatar || "/placeholder.svg"}
                              alt={userProfile.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="bg-light-blue/10 rounded-2xl px-3 py-2">
                              <div className="flex items-center mb-1">
                                <span className="font-medium text-sm mr-1">{userProfile.name}</span>
                                {userProfile.verified && (
                                  <div className="h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <CheckCheck className="h-2.5 w-2.5 text-white" />
                                  </div>
                                )}
                                <span className="ml-auto text-xs text-light-blue flex items-center">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  Automated
                                </span>
                              </div>
                              <span className="text-sm">{message.content}</span>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-text-secondary">
                              <span>Just now</span>
                              <span className="mx-2">·</span>
                              <span>Like</span>
                              <span className="mx-2">·</span>
                              <span>Reply</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    } else if (message.type === "notification") {
                      return (
                        <motion.div
                          key={`notification-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-center"
                        >
                          <div className="bg-background-80 text-text-secondary text-xs px-3 py-1 rounded-full flex items-center">
                            <BellRing className="h-3 w-3 mr-1" />
                            {message.content}
                          </div>
                        </motion.div>
                      )
                    }
                    return null
                  })}
                </AnimatePresence>
              </div>

              {/* Comment Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={customerProfile.avatar || "/placeholder.svg"}
                    alt={customerProfile.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <Input
                  placeholder="Add a comment as customer123..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="bg-background-80 border-none flex-1"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="text-light-blue"
                  disabled={!userInput.trim() || autoplayActive}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          // Direct Message Simulation
          <div className="flex flex-col h-[600px]">
            {/* DM Header */}
            <div className="p-3 border-b border-background-80 flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
                <Image
                  src={userProfile.avatar || "/placeholder.svg"}
                  alt={userProfile.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-sm">{userProfile.name}</span>
                  {userProfile.verified && (
                    <div className="ml-1 h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCheck className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-text-secondary">Active now</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Welcome Message */}
              <div className="flex justify-center">
                <div className="bg-background-90 text-text-secondary text-xs px-3 py-1 rounded-full">
                  {new Date().toLocaleDateString()} · Conversation started
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-background-90 text-text-secondary text-xs px-3 py-1 rounded-full">
                  You are now connected on Instagram
                </div>
              </div>

              {/* Simulation Messages for DM */}
              <AnimatePresence>
                {messages.map((message, index) => {
                  if (message.type === "user") {
                    return (
                      <motion.div
                        key={`dm-user-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end"
                      >
                        <div className="bg-light-blue rounded-2xl px-3 py-2 max-w-[80%]">
                          <span className="text-sm text-white">{message.content}</span>
                        </div>
                      </motion.div>
                    )
                  } else if (message.type === "keyword") {
                    return (
                      <motion.div
                        key={`dm-keyword-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center"
                      >
                        <div className="bg-light-blue/10 text-light-blue text-xs px-3 py-1 rounded-full flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Keyword detected: {message.content}
                        </div>
                      </motion.div>
                    )
                  } else if (message.type === "response") {
                    return (
                      <motion.div
                        key={`dm-response-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-background-90 rounded-2xl px-3 py-2 max-w-[80%] relative">
                          <span className="text-sm">{message.content}</span>
                          <div className="absolute -top-5 left-2 text-xs text-light-blue flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Automated Response
                          </div>
                        </div>
                      </motion.div>
                    )
                  } else if (message.type === "notification") {
                    return (
                      <motion.div
                        key={`dm-notification-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center"
                      >
                        <div className="bg-background-80 text-text-secondary text-xs px-3 py-1 rounded-full flex items-center">
                          <BellRing className="h-3 w-3 mr-1" />
                          {message.content}
                        </div>
                      </motion.div>
                    )
                  }
                  return null
                })}
              </AnimatePresence>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-background-80 flex items-center gap-2">
              <Input
                placeholder="Message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-background-80 border-none flex-1"
                disabled={autoplayActive}
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="text-light-blue"
                disabled={!userInput.trim() || autoplayActive}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Simulation Controls */}
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUserInput(generateSampleMessage())}
            disabled={!keywords.length || autoplayActive}
            className="flex-1 md:flex-none"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Message
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={resetSimulation}
            disabled={messages.length === 0}
            className="flex-1 md:flex-none"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Simulation
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyResponse} className="flex-1 md:flex-none">
            {copied ? (
              <>
                <CheckCheck className="h-4 w-4 mr-2 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Response
              </>
            )}
          </Button>

          <Button variant="default" size="sm" className="bg-light-blue hover:bg-light-blue/90 flex-1 md:flex-none">
            Save Automation
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-background-80 p-4 rounded-xl border border-background-90">
        <h4 className="font-medium mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-light-blue" />
          Simulation Tips
        </h4>
        <ul className="text-sm text-text-secondary space-y-2 list-disc pl-5">
          <li>Use the Auto Simulate button to see a demonstration of how your automation works</li>
          <li>Type a message containing one of your keywords to see targeted responses</li>
          <li>Try messages without keywords to see how the system filters irrelevant content</li>
          <li>This simulation shows exactly how your customers will experience your automation</li>
          <li>Switch between Comment and Direct Message views to see different customer touchpoints</li>
        </ul>
      </div>
    </div>
  )
}

export default SimulationTab

