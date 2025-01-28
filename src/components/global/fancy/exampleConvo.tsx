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

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Conversation } from "@/types/chat"

interface ExampleConversationsProps {
  onSelectConversation: (conversation: Conversation) => void
}

const exampleConversations: Conversation[] = [
  {
    chatId: "example1",
    userId: "user1",
    messages: [
      {
        id: "1",
        role: "user",
        content: "Hello, how can I automate my tasks?",
        senderId: "user1",
        receiverId: "bot",
        timestamp: new Date(),
      },
      {
        id: "2",
        role: "assistant",
        content: "Hi there! I can help you automate various tasks. What specific area are you interested in?",
        senderId: "bot",
        receiverId: "user1",
        timestamp: new Date(),
      },
    ],
  },
  {
    chatId: "example2",
    userId: "user2",
    messages: [
      {
        id: "1",
        role: "user",
        content: "I need help with my email marketing campaign.",
        senderId: "user2",
        receiverId: "bot",
        timestamp: new Date(),
      },
      {
        id: "2",
        role: "assistant",
        content:
          "I can assist you with email marketing automation. What aspects of your campaign would you like to improve?",
        senderId: "bot",
        receiverId: "user2",
        timestamp: new Date(),
      },
    ],
  },
]

const ExampleConversations: React.FC<ExampleConversationsProps> = ({ onSelectConversation }) => {
  return (
    <div className="p-4">
      <h4 className="text-lg font-semibold mb-4">Sample Chat</h4>
      <p className="text-sm mb-4">By King Cashe</p>
      {exampleConversations.map((conversation) => (
        <div
          key={conversation.chatId}
          className="flex items-center p-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200 rounded-lg mb-2"
          onClick={() => onSelectConversation(conversation)}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
            <AvatarFallback>{conversation.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-2 flex-grow overflow-hidden">
            <p className="font-medium text-sm">Example User {conversation.userId.slice(-1)}</p>
            <p className="text-xs text-gray-400 truncate">{conversation.messages[0].content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExampleConversations

