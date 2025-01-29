// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// const messages = [
//   { id: 1, text: "How do I see my automation chats?", sender: "user" },
//   { id: 2, text: "Select an automation from the dropdown menu to see the DMs.", sender: "bot" },
//   { id: 3, text: "Thank you! That's very helpful.", sender: "user" },
//   { id: 4, text: "You're welcome! Let me know if you need any more assistance.", sender: "bot" },
// ]

// const PlaceholderChat: React.FC = () => {
//   const [visibleMessages, setVisibleMessages] = useState<typeof messages>([])
//   const [typing, setTyping] = useState(false)

//   useEffect(() => {
//     const showMessages = async () => {
//       for (const message of messages) {
//         setTyping(true)
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         setTyping(false)
//         setVisibleMessages((prev) => [...prev, message])
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//       }
//     }

//     showMessages()
//   }, [])

//   return (
//     <div className="space-y-4">
//       <AnimatePresence>
//         {visibleMessages.map((message) => (
//           <motion.div
//             key={message.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div className={`flex items-end space-x-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
//               <Avatar className="w-8 h-8">
//                 <AvatarImage src={message.sender === "user" ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
//                 <AvatarFallback>{message.sender === "user" ? "U" : "B"}</AvatarFallback>
//               </Avatar>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className={`max-w-xs px-4 py-2 rounded-2xl shadow-lg ${
//                   message.sender === "user"
//                     ? "border-r-4 border-indigo-500 bg-indigo-900 bg-opacity-50"
//                     : "border-l-4 border-purple-500 bg-purple-900 bg-opacity-50"
//                 }`}
//                 style={{
//                   clipPath:
//                     message.sender === "user"
//                       ? "polygon(0 0, 100% 0, 100% 75%, 95% 100%, 0 100%)"
//                       : "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 75%)",
//                 }}
//               >
//                 <p className="text-sm text-white">{message.text}</p>
//               </motion.div>
//             </div>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//       {typing && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="flex justify-start"
//         >
//           <div className="flex items-end space-x-2">
//             <Avatar className="w-8 h-8">
//               <AvatarImage src="/placeholder-bot.jpg" />
//               <AvatarFallback>B</AvatarFallback>
//             </Avatar>
//             <div className="bg-purple-900 bg-opacity-50 border-l-4 border-purple-500 rounded-2xl px-4 py-2">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
//                 <div
//                   className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                   style={{ animationDelay: "0.2s" }}
//                 ></div>
//                 <div
//                   className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                   style={{ animationDelay: "0.4s" }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   )
// }

// export default PlaceholderChat

import type React from "react"
import { motion } from "framer-motion"

const PlaceholderChat: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              index % 2 === 0 ? "bg-gray-700 text-gray-400 border border-gray-600" : "bg-blue-600 text-gray-300"
            }`}
          >
            <div className="h-4 w-20 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-600 rounded mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PlaceholderChat

