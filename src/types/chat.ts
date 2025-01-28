  // export interface Message {
  //   id: string
  //   role: 'assistant' | 'user'
  //   content: string
  //   senderId: string
  //   receiverId: string
  //   timestamp: Date
  // }
  
  // export interface Conversation {
  //   userId: string
  //   chatId: string
  //   messages: Message[]
  //   unreadCount?: number
  // }

  // export interface Message {
  //   id: string
  //   role: "assistant" | "user"
  //   content: string
  //   senderId: string
  //   receiverId: string
  //   timestamp: Date
  //   status?: "sent" | "delivered" | "read" // Add the status property
  // }
  
  // export interface Conversation {
  //   userId: string
  //   chatId: string
  //   messages: Message[]
  //   unreadCount?: number
  // }
  
  export interface Message {
    id: string
    role: "assistant" | "user"
    content: string
    senderId: string
    receiverId: string
    timestamp: Date
    status: "sent" | "delivered" | "read"
  }
  
  export interface Conversation {
    userId: string
    chatId: string
    messages: Message[]
    unreadCount?: number
  }
  
  