// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { motion, AnimatePresence } from "framer-motion"
// import { format } from "date-fns"
// import { Sparkle } from "lucide-react"

// interface Dm {
//   id: string
//   senderId: string | null
//   reciever: string | null
//   message: string | null
//   createdAt: Date
//   Automation: { id: string; name: string } | null
// }

// interface Automation {
//   id: string
//   name: string
// }

// const BOT_ID = "1336784737460417"

// export function RecentDms({
//   dms,
//   automations,
// }: {
//   dms: Dm[]
//   automations: Automation[]
// }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
//   const [floatingDate, setFloatingDate] = useState<string | null>(null)
//   const scrollAreaRef = useRef<HTMLDivElement>(null)

//   // Filter DMs by selected automation
//   const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : dms

//   // Sort DMs by date, ensuring the latest messages are at the bottom
//   const sortedDms = [...filteredDms].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

//   // Group messages by date
//   const groupedDms = sortedDms.reduce(
//     (groups, dm) => {
//       const date = format(new Date(dm.createdAt), "yyyy-MM-dd")
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(dm)
//       return groups
//     },
//     {} as Record<string, Dm[]>,
//   )

//   useEffect(() => {
//     const scrollArea = scrollAreaRef.current
//     if (scrollArea) {
//       const handleScroll = () => {
//         const scrollPosition = scrollArea.scrollTop
//         const scrollHeight = scrollArea.scrollHeight
//         const clientHeight = scrollArea.clientHeight

//         // Find the date group that's currently at the top of the viewport
//         let currentDate = null
//         for (const [date, messages] of Object.entries(groupedDms)) {
//           const firstMessageElement = document.getElementById(`date-${date}`)
//           if (firstMessageElement && firstMessageElement.offsetTop <= scrollPosition) {
//             currentDate = date
//           } else {
//             break
//           }
//         }

//         setFloatingDate(currentDate ? format(new Date(currentDate), "EEEE, MMMM d") : null)
//       }

//       scrollArea.addEventListener("scroll", handleScroll)
//       return () => scrollArea.removeEventListener("scroll", handleScroll)
//     }
//   }, [groupedDms])

//   return (
//     <Card className="w-full bg-opacity-60 backdrop-blur-lg border border-gray-700 shadow-xl relative">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-gradient-to-r from-purple-500 to-indigo-500 flex items-center">
//           <Sparkle className="mr-2 h-5 w-5 text-yellow-400" />
//           Recent DMs
//         </CardTitle>
//         <Select onValueChange={(value) => setSelectedAutomation(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Automation" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Automations</SelectItem>
//             {automations.map((automation) => (
//               <SelectItem key={automation.id} value={automation.id}>
//                 {automation.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4 flex flex-col-reverse" ref={scrollAreaRef}>
//           <AnimatePresence>
//             {Object.entries(groupedDms).map(([date, messages]) => (
//               <div key={date} id={`date-${date}`}>
//                 <div className="text-center text-sm text-gray-400 my-2">{format(new Date(date), "EEEE, MMMM d")}</div>
//                 <div className="space-y-4">
//                   {messages.map((dm) => {
//                     const isClient = dm.senderId === BOT_ID
//                     const formattedTime = format(new Date(dm.createdAt), "HH:mm")

//                     return (
//                       <motion.div
//                         key={dm.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.3 }}
//                         className={`flex ${isClient ? "justify-end" : "justify-start"}`}
//                       >
//                         <div className={`flex items-end space-x-2 ${isClient ? "flex-row-reverse" : "flex-row"}`}>
//                           <Avatar className="w-8 h-8">
//                             <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
//                             <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
//                           </Avatar>
//                           <motion.div
//                             whileHover={{ scale: 1.02 }}
//                             className={`max-w-xs px-4 py-2 rounded-lg shadow-lg ${
//                               isClient
//                                 ? "border-r-4 border-indigo-500 bg-gray-800"
//                                 : "border-l-4 border-purple-500 bg-gray-900"
//                             }`}
//                           >
//                             <p className="text-sm text-white">{dm.message}</p>
//                             <p className="text-xs text-gray-400 mt-1">{formattedTime}</p>
//                           </motion.div>
//                         </div>
//                       </motion.div>
//                     )
//                   })}
//                 </div>
//               </div>
//             ))}
//           </AnimatePresence>
//         </ScrollArea>
//       </CardContent>
//       <AnimatePresence>
//         {floatingDate && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg z-10"
//           >
//             {floatingDate}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Card>
//   )
// }


// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { motion, AnimatePresence } from "framer-motion"
// import { format } from "date-fns"
// import { Sparkle } from "lucide-react"
// import PlaceholderChat from "./placeHolder"

// interface Dm {
//   id: string
//   senderId: string | null
//   reciever: string | null
//   message: string | null
//   createdAt: Date
//   Automation: { id: string; name: string } | null
// }

// interface Automation {
//   id: string
//   name: string
// }

// const BOT_ID = "17841444435951291"

// export function RecentDms({
//   dms,
//   automations,
// }: {
//   dms: Dm[]
//   automations: Automation[]
// }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
//   const [floatingDate, setFloatingDate] = useState<string | null>(null)
//   const scrollAreaRef = useRef<HTMLDivElement>(null)

//   // Filter DMs by selected automation
//   const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : []

//   // Sort DMs by date, ensuring the latest messages are at the bottom
//   const sortedDms = [...filteredDms].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

//   // Group messages by date
//   const groupedDms = sortedDms.reduce(
//     (groups, dm) => {
//       const date = format(new Date(dm.createdAt), "yyyy-MM-dd")
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(dm)
//       return groups
//     },
//     {} as Record<string, Dm[]>,
//   )

//   useEffect(() => {
//     const scrollArea = scrollAreaRef.current
//     if (scrollArea) {
//       const handleScroll = () => {
//         const scrollPosition = scrollArea.scrollTop
//         const scrollHeight = scrollArea.scrollHeight
//         const clientHeight = scrollArea.clientHeight

//         // Find the date group that's currently at the top of the viewport
//         let currentDate = null
//         for (const [date, messages] of Object.entries(groupedDms)) {
//           const firstMessageElement = document.getElementById(`date-${date}`)
//           if (firstMessageElement && firstMessageElement.offsetTop <= scrollPosition) {
//             currentDate = date
//           } else {
//             break
//           }
//         }

//         setFloatingDate(currentDate ? format(new Date(currentDate), "EEEE, MMMM d") : null)
//       }

//       scrollArea.addEventListener("scroll", handleScroll)
//       return () => scrollArea.removeEventListener("scroll", handleScroll)
//     }
//   }, [groupedDms])

//   return (
//     <Card className="w-full bg-gray-900 bg-opacity-60 backdrop-blur-lg border border-gray-700 shadow-xl relative">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-gradient-to-r from-purple-500 to-indigo-500 flex items-center">
//           <Sparkle className="mr-2 h-5 w-5 text-yellow-400" />
//           Recent DMs
//         </CardTitle>
//         <Select onValueChange={(value) => setSelectedAutomation(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Automation" />
//           </SelectTrigger>
//           <SelectContent>
//             {automations.map((automation) => (
//               <SelectItem key={automation.id} value={automation.id}>
//                 {automation.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4 flex flex-col-reverse" ref={scrollAreaRef}>
//           {selectedAutomation ? (
//             <AnimatePresence>
//               {Object.entries(groupedDms).map(([date, messages]) => (
//                 <div key={date} id={`date-${date}`}>
//                   <div className="text-center text-sm text-gray-400 my-2">{format(new Date(date), "EEEE, MMMM d")}</div>
//                   <div className="space-y-4">
//                     {messages.map((dm) => {
//                       const isClient = dm.senderId === BOT_ID
//                       const formattedTime = format(new Date(dm.createdAt), "HH:mm")

//                       return (
//                         <motion.div
//                           key={dm.id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -20 }}
//                           transition={{ duration: 0.3 }}
//                           className={`flex ${isClient ? "justify-end" : "justify-start"}`}
//                         >
//                           <div className={`flex items-end space-x-2 ${isClient ? "flex-row-reverse" : "flex-row"}`}>
//                             <Avatar className="w-8 h-8">
//                               <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
//                               <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
//                             </Avatar>
//                             <motion.div
//                               whileHover={{ scale: 1.02 }}
//                               className={`max-w-xs px-4 py-2 rounded-2xl shadow-lg ${
//                                 isClient
//                                   ? "border-r-4 border-indigo-500 bg-indigo-900 bg-opacity-50"
//                                   : "border-l-4 border-purple-500 bg-purple-900 bg-opacity-50"
//                               }`}
//                               style={{
//                                 clipPath: isClient
//                                   ? "polygon(0 0, 100% 0, 100% 75%, 95% 100%, 0 100%)"
//                                   : "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 75%)",
//                               }}
//                             >
//                               <p className="text-sm text-white">{dm.message}</p>
//                               <p className="text-xs text-gray-400 mt-1">{formattedTime}</p>
//                             </motion.div>
//                           </div>
//                         </motion.div>
//                       )
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </AnimatePresence>
//           ) : (
//             <PlaceholderChat />
//           )}
//         </ScrollArea>
//       </CardContent>
//       <AnimatePresence>
//         {floatingDate && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg z-10"
//           >
//             {floatingDate}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Card>
//   )
// }

"use client"

import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Sparkle, MessageSquare } from "lucide-react"
import PlaceholderChat from "./placeHolder"

interface Dm {
  id: string
  senderId: string | null
  reciever: string | null
  message: string | null
  createdAt: Date
  Automation: { id: string; name: string } | null
}

interface Automation {
  id: string
  name: string
}

const BOT_ID = "17841444435951291"

export function RecentDms({
  dms,
  automations,
}: {
  dms: Dm[]
  automations: Automation[]
}) {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)
  const [floatingDate, setFloatingDate] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : []
  const sortedDms = [...filteredDms].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const groupedDms = sortedDms.reduce(
    (groups, dm) => {
      const date = format(new Date(dm.createdAt), "yyyy-MM-dd")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(dm)
      return groups
    },
    {} as Record<string, Dm[]>,
  )

  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const handleScroll = () => {
        const scrollPosition = scrollArea.scrollTop
        const scrollHeight = scrollArea.scrollHeight
        const clientHeight = scrollArea.clientHeight

        let currentDate = null
        for (const [date, messages] of Object.entries(groupedDms)) {
          const firstMessageElement = document.getElementById(`date-${date}`)
          if (firstMessageElement && firstMessageElement.offsetTop <= scrollPosition) {
            currentDate = date
          } else {
            break
          }
        }

        setFloatingDate(currentDate ? format(new Date(currentDate), "EEEE, MMMM d") : null)
      }

      scrollArea.addEventListener("scroll", handleScroll)
      return () => scrollArea.removeEventListener("scroll", handleScroll)
    }
  }, [groupedDms])

  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 border-gray-700 shadow-xl relative overflow-hidden">
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between space-y-0 pb-2 z-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-purple-400" />
            Recent DMs
          </span>
          <Select onValueChange={(value) => setSelectedAutomation(value)}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="Select Automation" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              {automations.map((automation) => (
                <SelectItem key={automation.id} value={automation.id}>
                  {automation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {selectedAutomation ? (
            <AnimatePresence>
              {Object.entries(groupedDms).map(([date, messages]) => (
                <motion.div
                  key={date}
                  id={`date-${date}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center text-sm text-gray-400 my-2">{format(new Date(date), "EEEE, MMMM d")}</div>
                  <div className="space-y-4">
                    {messages.map((dm) => {
                      const isClient = dm.senderId === BOT_ID
                      const formattedTime = format(new Date(dm.createdAt), "HH:mm")

                      return (
                        <motion.div
                          key={dm.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${isClient ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex items-end space-x-2 ${isClient ? "flex-row-reverse" : "flex-row"}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
                              <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
                            </Avatar>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`max-w-xs px-4 py-2 rounded-2xl shadow-lg ${
                                isClient
                                  ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                                  : "bg-gradient-to-r from-gray-700 to-gray-600"
                              }`}
                              style={{
                                clipPath: isClient
                                  ? "polygon(0 0, 100% 0, 100% 75%, 95% 100%, 0 100%)"
                                  : "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 75%)",
                              }}
                            >
                              <p className="text-sm text-white">{dm.message}</p>
                              <p className="text-xs text-gray-300 mt-1">{formattedTime}</p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <PlaceholderChat />
          )}
        </ScrollArea>
      </CardContent>
      <AnimatePresence>
        {floatingDate && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg z-10"
          >
            {floatingDate}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

