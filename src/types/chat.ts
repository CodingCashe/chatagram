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
  role: "user" | "assistant"
  content: string
  senderId: string
  createdAt: Date
  status?: string
}

export interface Conversation {
  id: string
  pageId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  unreadCount?: number
  Automation: Automation | null
}