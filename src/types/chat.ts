// export interface Message {
//     role: 'assistant' | 'user'
//     content: string
//     senderId: string
//     receiverId: string
//   }
  
//   export interface Conversation {
//     userId: string
//     messages: Message[]
//   }
  
 
  export interface Message {
    id: string
    role: 'assistant' | 'user'
    content: string
    senderId: string
    receiverId: string
    timestamp: Date
  }
  
  export interface Conversation {
    userId: string
    chatId: string
    messages: Message[]
  }
  // export interface Message {
  //   role: "assistant" | "user"
  //   content: string
  // }
  
  // export interface Conversation {
  //   userId: string
  //   messages: Message[]
  // }
  
  