// import type React from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import type { Conversation } from "@/types/chat"

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
// }

// const exampleConversations: Conversation[] = [
//   {
//     chatId: "example1",
//     userId: "user1",
//     messages: [
//       {
//         id: "1",
//         role: "user",
//         content: "Hello, how can I automate my tasks?",
//         senderId: "user1",
//         receiverId: "bot",
//         timestamp: new Date(),
//       },
//       {
//         id: "2",
//         role: "assistant",
//         content: "Hi there! I can help you automate various tasks. What specific area are you interested in?",
//         senderId: "bot",
//         receiverId: "user1",
//         timestamp: new Date(),
//       },
//     ],
//   },
//   {
//     chatId: "example2",
//     userId: "user2",
//     messages: [
//       {
//         id: "1",
//         role: "user",
//         content: "I need help with my email marketing campaign.",
//         senderId: "user2",
//         receiverId: "bot",
//         timestamp: new Date(),
//       },
//       {
//         id: "2",
//         role: "assistant",
//         content:
//           "I can assist you with email marketing automation. What aspects of your campaign would you like to improve?",
//         senderId: "bot",
//         receiverId: "user2",
//         timestamp: new Date(),
//       },
//     ],
//   },
// ]

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation }) => {
//   return (
//     <div className="p-4">
//       <h4 className="text-lg font-semibold mb-4">Sample Chat</h4>
//       <p className="text-sm mb-4">By King Cashe</p>
//       {exampleConversations.map((conversation) => (
//         <div
//           key={conversation.chatId}
//           className="flex items-center p-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200 rounded-lg mb-2"
//           onClick={() => onSelectConversation(conversation)}
//         >
//           <Avatar className="w-8 h-8">
//             <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//             <AvatarFallback>{conversation.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
//           </Avatar>
//           <div className="ml-2 flex-grow overflow-hidden">
//             <p className="font-medium text-sm">Example User {conversation.userId.slice(-1)}</p>
//             <p className="text-xs text-gray-400 truncate">{conversation.messages[0].content}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

// import type React from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import type { Conversation } from "@/types/chat"

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
// }

// const exampleConversations: Conversation[] = [
//   {
//     chatId: "example1",
//     userId: "user1",
//     messages: [
//       {
//         id: "1",
//         role: "user",
//         content: "Hello, how can I automate my tasks?",
//         senderId: "user1",
//         receiverId: "bot",
//         timestamp: new Date(),
//       },
//       {
//         id: "2",
//         role: "assistant",
//         content: "Hi there! I can help you automate various tasks. What specific area are you interested in?",
//         senderId: "bot",
//         receiverId: "user1",
//         timestamp: new Date(),
//       },
//     ],
//   },
//   {
//     chatId: "example2",
//     userId: "user2",
//     messages: [
//       {
//         id: "1",
//         role: "user",
//         content: "I need help with my email marketing campaign.",
//         senderId: "user2",
//         receiverId: "bot",
//         timestamp: new Date(),
//       },
//       {
//         id: "2",
//         role: "assistant",
//         content:
//           "I can assist you with email marketing automation. What aspects of your campaign would you like to improve?",
//         senderId: "bot",
//         receiverId: "user2",
//         timestamp: new Date(),
//       },
//     ],
//   },
// ]

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation }) => {
//   return (
//     <div className="p-4">
//       <h4 className="text-lg font-semibold mb-4">Sample Chat</h4>
//       <p className="text-sm mb-4">By King Cashe</p>
//       {exampleConversations.map((conversation) => (
//         <div
//           key={conversation.chatId}
//           className="flex items-center p-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200 rounded-lg mb-2"
//           onClick={() => onSelectConversation(conversation)}
//         >
//           <Avatar className="w-8 h-8">
//             <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//             <AvatarFallback>{conversation.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
//           </Avatar>
//           <div className="ml-2 flex-grow overflow-hidden">
//             <p className="font-medium text-sm">Example User {conversation.userId.slice(-1)}</p>
//             <p className="text-xs text-gray-400 truncate">{conversation.messages[0].content}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

// import type React from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import type { Conversation } from "@/types/chat"

// // interface ExampleConversationsProps {
// //   onSelectConversation: (conversation: Conversation) => void
// // }
// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
//   className?: string
// }

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation }) => {
//   const exampleConversations: Conversation[] = [
//     {
//       id: '1',
//       pageId: 'example1',
//       messages: [
//         {
//           id:"23",
//           role: 'user',
//           content: 'Hello, I have a question about your product.',
//           senderId: 'user1',
//           createdAt: new Date()
//         },
//         {
//           id:"23",
//           role: 'assistant',
//           content: 'Of course! Id be happy to help. What would you like to know?',
//           senderId: 'assistant',
//           createdAt: new Date()
//         }
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       unreadCount: 0,
//       Automation: null
//     },
//   ]

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold mb-2">Example Conversations</h3>
//       {exampleConversations.map((conversation) => (
//         <div
//           key={conversation.chatId}
//           className="flex items-center p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors duration-200"
//           onClick={() => onSelectConversation(conversation)}
//         >
//           <Avatar className="w-10 h-10 mr-3">
//             <AvatarImage src={`https://i.pravatar.cc/150?u=${conversation.userId}`} />
//             <AvatarFallback>{conversation?.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
//           </Avatar>
//           <div className="flex-grow min-w-0">
//             <p className="font-medium text-sm text-foreground truncate">
//               {conversation.userId === "user1"
//                 ? "Sarah Johnson"
//                 : conversation.userId === "user2"
//                   ? "Mike Chen"
//                   : "Emma Davis"}
//             </p>
//             <p className="text-xs text-muted-foreground truncate pr-2">
//               {conversation.messages[0].content.slice(0, 30)}...
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

// import type React from "react"

// interface Conversation {
//   messages: { content: string }[]
// }

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
//   className?: string
// }

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
//   const conversations: Conversation[] = [
//     { messages: [{ content: "Hello, how are you today?" }] },
//     { messages: [{ content: "I am doing well, thank you!" }] },
//     { messages: [{ content: "Great to hear!" }] },
//   ]

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {conversations.map((conversation) => (
//         <div
//           key={conversation.messages[0].content}
//           onClick={() => onSelectConversation(conversation)}
//           className="p-3 rounded-lg border border-gray-200 hover:border-gray-400 cursor-pointer"
//         >
//           <p className="font-medium">{conversation.messages[0].content.split(" ").slice(0, 2).join(" ")}...</p>
//           <p className="text-xs text-muted-foreground truncate">
//             {conversation.messages[0].content.split(" ").slice(0, 2).join(" ")}...
//           </p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

// import type React from "react"
// import type { Conversation } from "@/types/chat"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
//   className?: string
// }

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
//   const conversations: Conversation[] = [
//     {
//       userId: "user1",
//       chatId: "chat1",
//       messages: [
//         {
//           id: "1",
//           role: "user",
//           content: "Hello, how are you today?",
//           senderId: "user1",
//           receiverId: "bot",
//           timestamp: new Date(),
//           status: "sent",
//         },
//       ],
//     },
//     {
//       userId: "user2",
//       chatId: "chat2",
//       messages: [
//         {
//           id: "2",
//           role: "user",
//           content: "I am doing well, thank you!",
//           senderId: "user2",
//           receiverId: "bot",
//           timestamp: new Date(),
//           status: "sent",
//         },
//       ],
//     },
//     {
//       userId: "user3",
//       chatId: "chat3",
//       messages: [
//         {
//           id: "3",
//           role: "user",
//           content: "Great to hear!",
//           senderId: "user3",
//           receiverId: "bot",
//           timestamp: new Date(),
//           status: "sent",
//         },
//       ],
//     },
//   ]

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {conversations.map((conversation) => (
//         <div
//           key={conversation.chatId}
//           onClick={() => onSelectConversation(conversation)}
//           className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-400 cursor-pointer"
//         >
//           <Avatar className="w-10 h-10 mr-3">
//             <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//             <AvatarFallback>{conversation.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
//           </Avatar>
//           <div className="flex-grow min-w-0">
//             <p className="font-medium text-sm text-foreground truncate">{conversation.userId}</p>
//             <p className="text-xs text-muted-foreground truncate">
//               {conversation.messages[0].content.split(" ").slice(0, 2).join(" ")}...
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

//File: src/components/exampleConvo.tsx
// import React from 'react'
// import { Conversation } from '@/types/chat'

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
//   className?: string
// }

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
//   const exampleConversations: Conversation[] = [
//     {
//       id: '1',
//       pageId: 'example1',
//       messages: [
//         {
//           id:"23",
//           role: 'user',
//           content: 'Hello, I have a question about your product.',
//           senderId: 'user1',
//           createdAt: new Date()
//         },
//         {
//           id:"23",
//           role: 'assistant',
//           content: 'Of course! Id be happy to help. What would you like to know?',
//           senderId: 'assistant',
//           createdAt: new Date()
//         }
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       unreadCount: 0,
//       Automation: null
//     },
//     // Add more example conversations as needed
//   ]

//   return (
//     <div className={className}>
//       {exampleConversations.map((conversation) => (
//         <div
//           key={conversation.id}
//           onClick={() => onSelectConversation(conversation)}
//           className="cursor-pointer p-2 hover:bg-black"
//         >
//           <h3>Conversation {conversation.id}</h3>
//           <p>{conversation.messages[conversation.messages.length - 1].content}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

// import type React from "react"
// import type { Conversation } from "@/types/chat"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
//   className?: string
// }

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
//   const exampleConversations: Conversation[] = [
//     {
//       id: "1",
//       pageId: "example1",
//       messages: [
//         {
//           id: "23",
//           role: "user",
//           content: "Hello, I have a question about your Service.",
//           senderId: "user1",
//           createdAt: new Date(),
//         },
//         {
//           id: "24",
//           role: "assistant",
//           content: "Of course! I'd be happy to help. What would you like to know?",
//           senderId: "assistant",
//           createdAt: new Date(),
//         },
//         {
//           id: "25",
//           role: "user",
//           content: "Do you have a free version?",
//           senderId: "user1",
//           createdAt: new Date(),
//         },
//         {
//           id: "26",
//           role: "assistant",
//           content: "Yap, we actually have a free version. Feel free to check out the plans",
//           senderId: "assistant",
//           createdAt: new Date(),
//         },
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       unreadCount: 0,
//       Automation: null,
//     },
//     {
//       id: "2",
//       pageId: "example2",
//       messages: [
//         {
//           id: "27",
//           role: "user",
//           content: "Can you tell me about your pricing plans?",
//           senderId: "user2",
//           createdAt: new Date(),
//         },
//         {
//           id: "28",
//           role: "assistant",
//           content: "We offer two pricing tiers at the moment, a FREE and a PRO plan at just $89.",
//           senderId: "assistant",
//           createdAt: new Date(),
//         },
//         {
//           id: "29",
//           role: "user",
//           content: "I would like to know more about the PRO plan. I think it has hidden gems behind its working?",
//           senderId: "user2",
//           createdAt: new Date(),
//         },
//         {
//           id: "30",
//           role: "assistant",
//           content: "You are absolutely right, the free plan includes a lot of cool, really cool automation features.Might seem too good to be true but you only need to upgrade to use that.",
//           senderId: "assistant",
//           createdAt: new Date(),
//         },
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       unreadCount: 0,
//       Automation: null,
//     },
//     // Add more example conversations as needed
//   ]

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {exampleConversations.map((conversation) => (
//         <div
//           key={conversation.id}
//           onClick={() => onSelectConversation(conversation)}
//           className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-400 cursor-pointer"
//         >
//           <Avatar className="w-10 h-10 mr-3">
//             <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.id}`} />
//             <AvatarFallback>{conversation.id}</AvatarFallback>
//           </Avatar>
//           <div className="flex-grow min-w-0">
//             <p className="font-medium text-sm text-foreground truncate">Conversation {conversation.id}</p>
//             <p className="text-xs text-muted-foreground truncate">
//               {conversation.messages[conversation.messages.length - 1].content.split(" ").slice(0, 5).join(" ")}...
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { MessageSquare, Zap, Star, User, Bot } from "lucide-react"

// interface Message {
//   id: string
//   role: "user" | "assistant"
//   content: string
// }

// interface Conversation {
//   id: string
//   messages: Message[]
// }

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
//   className?: string
// }

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
//   const [selectedId, setSelectedId] = useState<string | null>(null)
//   const [isSmallScreen, setIsSmallScreen] = useState(false)

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 640)
//     }
//     checkScreenSize()
//     window.addEventListener("resize", checkScreenSize)
//     return () => window.removeEventListener("resize", checkScreenSize)
//   }, [])

//   const exampleConversations: Conversation[] = [
//     {
//       id: "1",
//       messages: [
//         { id: "23", role: "user", content: "Hello, I have a question about your Service." },
//         { id: "24", role: "assistant", content: "Of course! I'd be happy to help. What would you like to know?" },
//         { id: "25", role: "user", content: "Do you have a free version?" },
//         {
//           id: "26",
//           role: "assistant",
//           content: "Yes, we actually have a free version. Feel free to check out the plans.",
//         },
//       ],
//     },
//     {
//       id: "2",
//       messages: [
//         { id: "27", role: "user", content: "Can you tell me about your pricing plans?" },
//         {
//           id: "28",
//           role: "assistant",
//           content: "We offer two pricing tiers at the moment, a FREE and a PRO plan at just $89.",
//         },
//         {
//           id: "29",
//           role: "user",
//           content: "I would like to know more about the PRO plan. I think it has hidden gems behind its working?",
//         },
//         {
//           id: "30",
//           role: "assistant",
//           content:
//             "You are absolutely right, the PRO plan includes a lot of cool, really cool automation features. It might seem too good to be true but you only need to upgrade to use that.",
//         },
//       ],
//     },
//   ]

//   const getRandomEmoji = () => {
//     const emojis = ["💡", "🚀", "💬", "🔮", "🎨", "🌟", "🔥", "✨"]
//     return emojis[Math.floor(Math.random() * emojis.length)]
//   }

//   return (
//     <div className={`space-y-6 ${className}`}>
//       {exampleConversations.map((conversation) => (
//         <div
//           key={conversation.id}
//           onClick={() => {
//             setSelectedId(conversation.id)
//             onSelectConversation(conversation)
//           }}
//           className={`
//             p-4 rounded-lg border border-gray-700 
//             bg-gradient-to-br from-gray-900 to-gray-800 
//             hover:from-gray-800 hover:to-gray-700 
//             cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300
//             ${selectedId === conversation.id ? "ring-2 ring-purple-500" : ""}
//           `}
//         >
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
//                 {getRandomEmoji()}
//               </div>
//               <div>
//                 <p className="font-bold text-sm text-purple-300">Conversation {conversation.id}</p>
//                 <div className="flex items-center space-x-1">
//                   <MessageSquare className="w-3 h-3 text-purple-400" />
//                   <span className="text-xs text-purple-400">{conversation.messages.length}</span>
//                 </div>
//               </div>
//             </div>
//             {!isSmallScreen && (
//               <div className="flex items-center space-x-2">
//                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
//                   <Zap className="w-3 h-3 mr-1" />
//                   AI Powered
//                 </span>
//                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
//                   <Star className="w-3 h-3 mr-1" />
//                   Featured
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className="space-y-2">
//             {conversation.messages.slice(-2).map((message, index) => (
//               <div
//                 key={message.id}
//                 className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end" : ""}`}
//               >
//                 {message.role === "assistant" && <Bot className="w-4 h-4 mt-1 text-green-400" />}
//                 <div
//                   className={`p-2 rounded-lg ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
//                 >
//                   <p className="text-xs">{message.content}</p>
//                 </div>
//                 {message.role === "user" && <User className="w-4 h-4 mt-1 text-blue-400" />}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ExampleConversations

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trash2, MessageSquare, Zap, Star, User, Bot, Sparkles, Clock, ThumbsUp, ThumbsDown } from "lucide-react"
import type { Message } from "@/types/dashboard"

type ConversationWithExtra = {
  id: string
  chatId: string
  pageId: string
  userId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  unreadCount: number
  Automation: null
}

interface ExampleConversationsProps {
  onSelectConversation: (conversation: ConversationWithExtra) => void
  className?: string
}

const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const exampleConversations: ConversationWithExtra[] = [
    {
      id: "1",
      chatId: "chat1",
      pageId: "page1",
      userId: "user1",
      messages: [
        {
          id: "23",
          role: "user",
          content: "Hello, I have a question about your Service.",
          senderId: "user1",
          createdAt: new Date(Date.now() - 3600000),
        },
        {
          id: "24",
          role: "assistant",
          content: "Of course! I'd be happy to help. What would you like to know?",
          senderId: "assistant",
          createdAt: new Date(Date.now() - 3540000),
        },
        {
          id: "25",
          role: "user",
          content: "Do you have a free version?",
          senderId: "user1",
          createdAt: new Date(Date.now() - 3480000),
        },
        {
          id: "26",
          role: "assistant",
          content: "Yes, we actually have a free version. Feel free to check out the plans.",
          senderId: "assistant",
          createdAt: new Date(Date.now() - 3420000),
        },
      ],
      createdAt: new Date(Date.now() - 3600000),
      updatedAt: new Date(Date.now() - 3420000),
      unreadCount: 0,
      Automation: null,
    },
    {
      id: "2",
      chatId: "chat2",
      pageId: "page1",
      userId: "user2",
      messages: [
        {
          id: "27",
          role: "user",
          content: "Can you tell me about your pricing plans?",
          senderId: "user2",
          createdAt: new Date(Date.now() - 7200000),
        },
        {
          id: "28",
          role: "assistant",
          content: "We offer two pricing tiers at the moment, a FREE and a PRO plan at just $89.",
          senderId: "assistant",
          createdAt: new Date(Date.now() - 7140000),
        },
        {
          id: "29",
          role: "user",
          content: "I would like to know more about the PRO plan. I think it has hidden gems behind its working?",
          senderId: "user2",
          createdAt: new Date(Date.now() - 7080000),
        },
        {
          id: "30",
          role: "assistant",
          content:
            "You are absolutely right, the PRO plan includes a lot of cool, really cool automation features. It might seem too good to be true but you only need to upgrade to use that.",
          senderId: "assistant",
          createdAt: new Date(Date.now() - 7020000),
        },
      ],
      createdAt: new Date(Date.now() - 7200000),
      updatedAt: new Date(Date.now() - 7020000),
      unreadCount: 2,
      Automation: null,
    },
  ]

  const getRandomEmoji = () => {
    const emojis = ["💡", "🚀", "💬", "🔮", "🎨", "🌟", "🔥", "✨"]
    return emojis[Math.floor(Math.random() * emojis.length)]
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleHover = (id: string | null) => {
    setHoveredId(id)
  }

  const getActivityStatus = (lastActive: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

    if (diffInMinutes < 1) return "Active now"
    if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  const getFancyName = (userId: string) => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eva"]
    return names[Number.parseInt(userId.slice(-1)) % names.length]
  }

  const getAvatarUrl = (userId: string) => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {exampleConversations.map((conversation) => (
        <motion.div
          key={conversation.id}
          onClick={() => {
            setSelectedId(conversation.id)
            onSelectConversation(conversation)
          }}
          onMouseEnter={() => handleHover(conversation.id)}
          onMouseLeave={() => handleHover(null)}
          className={`
            p-4 rounded-lg border border-gray-700 
            bg-gradient-to-br from-gray-900 to-gray-800 
            hover:from-gray-800 hover:to-gray-700 
            cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300
            ${selectedId === conversation.id ? "ring-2 ring-purple-500" : ""}
            ${hoveredId === conversation.id ? "scale-105" : ""}
          `}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="w-10 h-10 relative border-2 border-primary">
                <AvatarImage src={getAvatarUrl(conversation.userId)} />
                <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
                {conversation.unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
                )}
              </Avatar>
              <div>
                <p className="font-bold text-sm text-purple-300">{getFancyName(conversation.userId)}</p>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-purple-400">{conversation.messages.length}</span>
                </div>
              </div>
            </div>
            {!isSmallScreen && (
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                  <Zap className="w-3 h-3 mr-1" />
                  AI Powered
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimestamp(conversation.updatedAt)}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {(expandedId === conversation.id ? conversation.messages : conversation.messages.slice(-2)).map(
              (message, index) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && <Bot className="w-4 h-4 mt-1 text-green-400" />}
                  <div
                    className={`p-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    <p className="text-xs">{message.content}</p>
                    <p className="text-xxs text-gray-400 mt-1">{formatTimestamp(message.createdAt)}</p>
                  </div>
                  {message.role === "user" && <User className="w-4 h-4 mt-1 text-blue-400" />}
                </div>
              ),
            )}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleExpand(conversation.id)
              }}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              {expandedId === conversation.id ? "Show Less" : "Show More"}
            </button>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  style={{ width: `${(conversation.messages.length / 10) * 100}%` }}
                ></div>
              </div>
              <div className="flex space-x-1">
                <ThumbsUp className="w-4 h-4 text-green-500" />
                <ThumbsDown className="w-4 h-4 text-red-500" />
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
            <span>{getActivityStatus(conversation.updatedAt)}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log("Delete conversation:", conversation.id)
                    }}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete conversation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ExampleConversations

