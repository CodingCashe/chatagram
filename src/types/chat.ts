export interface Message {
    role: 'assistant' | 'user'
    content: string
    senderId: string
    receiverId: string
  }
  
  export interface Conversation {
    userId: string
    messages: Message[]
  }
  