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
  
  // export interface Message {
  //   id: string
  //   role: "assistant" | "user"
  //   content: string
  //   senderId: string
  //   receiverId: string
  //   timestamp: Date
  //   status?: "sent" | "delivered" | "read"
  // }
  
  // export interface Conversation {
  //   userId: string
  //   chatId: string
  //   messages: Message[]
  //   unreadCount?: number
  // }
  
  // File: src/types/chat.ts
import { Automation } from './dashboard'  // Assuming Automation is defined in dashboard.ts

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  senderId?: string
  receiverId?:string
  createdAt: Date
  status?: "sending" | "sent" | "error"
}


export interface Conversation {
  chatId?:string
  id:string
  userId?: string
  pageId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  unreadCount: number
  Automation: {
    id: string
    name: string
  } | null
}
