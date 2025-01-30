export interface Conversation {
    pageId: string
    chatId: string
    userId: string
    messages: Message[]
    unreadCount?: number
  }
  
  export interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    senderId: string
    receiverId: string
    timestamp: Date
    status?: "sent" | "delivered" | "read"
  }
  
  