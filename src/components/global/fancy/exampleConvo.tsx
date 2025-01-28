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

// interface ExampleConversationsProps {
//   onSelectConversation: (conversation: Conversation) => void
// }

// const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation }) => {
//   const exampleConversations: Conversation[] = [
//     {
//       chatId: "1",
//       userId: "user1",
//       messages: [
//         {
//           id: "1",
//           role: "user",
//           content: "Hi! I'm interested in your products. Can you tell me more?",
//           senderId: "user1",
//           receiverId: "bot",
//           timestamp: new Date(),
//           status: "sent",
//         },
//       ],
//     },
//     {
//       chatId: "2",
//       userId: "user2",
//       messages: [
//         {
//           id: "2",
//           role: "user",
//           content: "What are your business hours?",
//           senderId: "user2",
//           receiverId: "bot",
//           timestamp: new Date(),
//           status: "sent",
//         },
//       ],
//     },
//     {
//       chatId: "3",
//       userId: "user3",
//       messages: [
//         {
//           id: "3",
//           role: "user",
//           content: "Do you offer international shipping?",
//           senderId: "user3",
//           receiverId: "bot",
//           timestamp: new Date(),
//           status: "sent",
//         },
//       ],
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
//             <AvatarFallback>{conversation.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
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

import type React from "react"
import type { Conversation } from "@/types/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ExampleConversationsProps {
  onSelectConversation: (conversation: Conversation) => void
  className?: string
}

const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation, className }) => {
  const conversations: Conversation[] = [
    {
      userId: "user1",
      chatId: "chat1",
      messages: [
        {
          id: "1",
          role: "user",
          content: "Hello, how are you today?",
          senderId: "user1",
          receiverId: "bot",
          timestamp: new Date(),
          status: "sent",
        },
      ],
    },
    {
      userId: "user2",
      chatId: "chat2",
      messages: [
        {
          id: "2",
          role: "user",
          content: "I am doing well, thank you!",
          senderId: "user2",
          receiverId: "bot",
          timestamp: new Date(),
          status: "sent",
        },
      ],
    },
    {
      userId: "user3",
      chatId: "chat3",
      messages: [
        {
          id: "3",
          role: "user",
          content: "Great to hear!",
          senderId: "user3",
          receiverId: "bot",
          timestamp: new Date(),
          status: "sent",
        },
      ],
    },
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      {conversations.map((conversation) => (
        <div
          key={conversation.chatId}
          onClick={() => onSelectConversation(conversation)}
          className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-400 cursor-pointer"
        >
          <Avatar className="w-10 h-10 mr-3 border-2 border-primary">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
            <AvatarFallback>{conversation.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{conversation.userId}</p>
            <p className="text-xs text-muted-foreground truncate">
              {conversation.messages[0].content.split(" ").slice(0, 2).join(" ")}...
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExampleConversations

