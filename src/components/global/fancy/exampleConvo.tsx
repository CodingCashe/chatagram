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

import type React from "react"
import type { Conversation } from "@/types/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ExampleConversationsProps {
  onSelectConversation: (conversation: Conversation) => void
  className?: string
}

const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
  const exampleConversations: Conversation[] = [
    {
      id: "1",
      pageId: "example1",
      messages: [
        {
          id: "23",
          role: "user",
          content: "Hello, I have a question about your Service.",
          senderId: "user1",
          createdAt: new Date(),
        },
        {
          id: "24",
          role: "assistant",
          content: "Of course! I'd be happy to help. What would you like to know?",
          senderId: "assistant",
          createdAt: new Date(),
        },
        {
          id: "25",
          role: "user",
          content: "Do you have a free version?",
          senderId: "user1",
          createdAt: new Date(),
        },
        {
          id: "26",
          role: "assistant",
          content: "Yap, we actually have a free version. Feel free to check out the plans",
          senderId: "assistant",
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      unreadCount: 0,
      Automation: null,
    },
    {
      id: "2",
      pageId: "example2",
      messages: [
        {
          id: "27",
          role: "user",
          content: "Can you tell me about your pricing plans?",
          senderId: "user2",
          createdAt: new Date(),
        },
        {
          id: "28",
          role: "assistant",
          content: "We offer two pricing tiers at the moment, a FREE and a PRO plan at just $89.",
          senderId: "assistant",
          createdAt: new Date(),
        },
        {
          id: "29",
          role: "user",
          content: "I would like to know more about the PRO plan. I think it has hidden gems behind its working?",
          senderId: "user2",
          createdAt: new Date(),
        },
        {
          id: "30",
          role: "assistant",
          content: "You are absolutely right, the free plan includes a lot of cool, really cool automation features.Might seem too good to be true but you only need to upgrade to use that.",
          senderId: "assistant",
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      unreadCount: 0,
      Automation: null,
    },
    // Add more example conversations as needed
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      {exampleConversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className="flex items-center justify-between mb-1 p-3 space-x-2 rounded-lg border border-gray-200 hover:border-gray-400 cursor-pointer"
        >
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.id}`} />
            <AvatarFallback>{conversation.id}</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <p className="font-medium text-sm text-foreground truncate">Conversation {conversation.id}</p>
            <p className="text-xs text-muted-foreground truncate">
              {conversation.messages[conversation.messages.length - 1].content.split(" ").slice(0, 5).join(" ")}...
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExampleConversations



