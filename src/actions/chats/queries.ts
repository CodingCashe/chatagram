// "use server"

// import { client } from "@/lib/prisma"
// import type { Prisma } from "@prisma/client"

// export type ChatMessage = {
//   role: "assistant" | "user"
//   content: string
//   senderId: string
//   receiverId: string
// }

// export type Conversation = {
//   userId: string
//   messages: ChatMessage[]
// }

// export const matchKeyword = async (keyword: string) => {
//   return await client.keyword.findFirst({
//     where: {
//       word: {
//         equals: keyword,
//         mode: "insensitive",
//       },
//     },
//   })
// }

// export const getKeywordAutomation = async (automationId: string, dm: boolean) => {
//   return await client.automation.findUnique({
//     where: { id: automationId },
//     include: {
//       dms: dm,
//       trigger: {
//         where: { type: dm ? "DM" : "COMMENT" },
//       },
//       listener: true,
//       User: {
//         select: {
//           subscription: {
//             select: { plan: true },
//           },
//           integrations: {
//             select: { token: true },
//           },
//         },
//       },
//     },
//   })
// }

// export const trackResponses = async (automationId: string, type: "COMMENT" | "DM") => {
//   const updateData: Prisma.ListenerUpdateInput =
//     type === "COMMENT" ? { commentCount: { increment: 1 } } : { dmCount: { increment: 1 } }

//   return await client.listener.update({
//     where: { automationId },
//     data: updateData,
//   })
// }

// export const createChatHistory = async (automationId: string, sender: string, receiver: string, message: string) => {
//   return await client.automation.update({
//     where: { id: automationId },
//     data: {
//       dms: {
//         create: {
//           reciever: receiver,
//           senderId: sender,
//           message,
//         },
//       },
//     },
//   })
// }

// export const getKeywordPost = async (postId: string, automationId: string) => {
//   return await client.post.findFirst({
//     where: {
//       AND: [{ postid: postId }, { automationId }],
//     },
//     select: { automationId: true },
//   })
// }

// export const getChatHistory = async (
//   sender: string,
//   receiver: string,
// ): Promise<{
//   history: ChatMessage[]
//   automationId: string | null
// }> => {
//   const history = await client.dms.findMany({
//     where: {
//       OR: [
//         { AND: [{ senderId: sender }, { reciever: receiver }] },
//         { AND: [{ senderId: receiver }, { reciever: sender }] },
//       ],
//     },
//     orderBy: { createdAt: "asc" },
//   })

//   const chatSession: ChatMessage[] = history.map((chat) => ({
//     role: chat.senderId === sender ? "user" : "assistant",
//     content: chat.message || "",
//     senderId: chat.senderId || "",
//     receiverId: chat.reciever || "",
//   }))

//   return {
//     history: chatSession,
//     automationId: history.length > 0 ? history[history.length - 1].automationId || null : null,
//   }
// }

// export const getConversationHistory = async (
//   automationId: string,
// ): Promise<{
//   conversations: Conversation[]
//   automationId: string
// }> => {
//   const history = await client.dms.findMany({
//     where: { automationId },
//     orderBy: { createdAt: "asc" },
//   })

//   const chatSession: ChatMessage[] = history.map((chat) => ({
//     role: chat.reciever ? "assistant" : "user",
//     content: chat.message || "",
//     senderId: chat.senderId || "",
//     receiverId: chat.reciever || "",
//   }))

//   const groupedChats = chatSession.reduce(
//     (acc, message) => {
//       const key = message.role === "assistant" ? message.receiverId : message.senderId
//       if (key) {
//         if (!acc[key]) {
//           acc[key] = []
//         }
//         acc[key].push(message)
//       }
//       return acc
//     },
//     {} as Record<string, ChatMessage[]>,
//   )

//   const conversations: Conversation[] = Object.entries(groupedChats).map(([userId, messages]) => ({
//     userId,
//     messages,
//   }))

//   return {
//     conversations,
//     automationId,
//   }
// }

// export const createMessage = async (
//   pageId: string,
//   senderId: string,
//   message: string,
//   isFromBot: boolean,
//   automationId: string | null,
// ) => {
//   return await client.message.create({
//     data: {
//       pageId,
//       senderId,
//       message,
//       isFromBot,
//       ...(automationId && { Automation: { connect: { id: automationId } } }),
//     },
//   })
// }

// export const getMessages = async (pageId: string, senderId: string) => {
//   return await client.message.findMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//     orderBy: { createdAt: "asc" },
//   })
// }

// export const storeConversation = async (
//   pageId: string,
//   senderId: string,
//   userMessage: string,
//   botResponse: string,
//   automationId: string | null,
// ) => {
//   const createMessageData = (message: string, isFromBot: boolean): Prisma.MessageCreateInput => ({
//     pageId,
//     senderId: isFromBot ? pageId : senderId,
//     message,
//     isFromBot,
//     ...(automationId && { Automation: { connect: { id: automationId } } }),
//   })

//   return await client.$transaction([
//     client.message.create({ data: createMessageData(userMessage, false) }),
//     client.message.create({ data: createMessageData(botResponse, true) }),
//   ])
// }

// export const deleteConversation = async (pageId: string, senderId: string) => {
//   return await client.message.deleteMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//   })
// }

// "use server"
// import { client } from "@/lib/prisma"
// import type { Message, Conversation } from "@/types/chat"

// export const createMessage = async (
//   pageId: string,
//   senderId: string,
//   message: string,
//   isFromBot: boolean,
//   automationId: string | null,
// ) => {
//   return await client.message.create({
//     data: {
//       pageId,
//       senderId,
//       message,
//       isFromBot,
//       ...(automationId && { Automation: { connect: { id: automationId } } }),
//     },
//   })
// }

// export const getMessages = async (pageId: string, senderId: string) => {
//   return await client.message.findMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//     orderBy: { createdAt: "asc" },
//   })
// }

// export const storeConversation = async (
//   pageId: string,
//   senderId: string,
//   userMessage: string,
//   botResponse: string,
//   automationId: string | null,
// ) => {
//   return await client.$transaction([
//     client.message.create({
//       data: {
//         pageId,
//         senderId,
//         message: userMessage,
//         isFromBot: false,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//     client.message.create({
//       data: {
//         pageId,
//         senderId: pageId,
//         message: botResponse,
//         isFromBot: true,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//   ])
// }

// export const getConversationHistory = async (
//   automationId: string,
// ): Promise<{ conversations: Conversation[]; automationId: string }> => {
//   const messages = await client.message.findMany({
//     where: { automationId },
//     orderBy: { createdAt: "asc" },
//   })

//   const chatSession: Message[] = messages.map((message) => ({
//     role: message.isFromBot ? "assistant" : "user",
//     content: message.message,
//     senderId: message.senderId,
//     receiverId: message.pageId,
//   }))

//   const groupedChats = chatSession.reduce(
//     (acc, message) => {
//       const key = message.role === "assistant" ? message.receiverId : message.senderId
//       if (!acc[key]) {
//         acc[key] = []
//       }
//       acc[key].push(message)
//       return acc
//     },
//     {} as Record<string, Message[]>,
//   )

//   const conversations: Conversation[] = Object.entries(groupedChats).map(([userId, messages]) => ({
//     userId,
//     messages,
//   }))

//   return {
//     conversations,
//     automationId,
//   }
// }

// export const deleteConversation = async (pageId: string, senderId: string) => {
//   return await client.message.deleteMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//   })
// }

// "use server"
// import { client } from "@/lib/prisma"
// import type { Message, Conversation } from "@/types/chat"

// export const createMessage = async (
//   pageId: string,
//   senderId: string,
//   message: string,
//   isFromBot: boolean,
//   automationId: string | null,
// ) => {
//   return await client.message.create({
//     data: {
//       pageId,
//       senderId,
//       message,
//       isFromBot,
//       ...(automationId && { Automation: { connect: { id: automationId } } }),
//     },
//   })
// }

// export const getMessages = async (pageId: string, senderId: string) => {
//   return await client.message.findMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//     orderBy: { createdAt: "asc" },
//   })
// }

// export const storeConversation = async (
//   pageId: string,
//   senderId: string,
//   userMessage: string,
//   botResponse: string,
//   automationId: string | null,
// ) => {
//   return await client.$transaction([
//     client.message.create({
//       data: {
//         pageId,
//         senderId,
//         message: userMessage,
//         isFromBot: false,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//     client.message.create({
//       data: {
//         pageId,
//         senderId: pageId,
//         message: botResponse,
//         isFromBot: true,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//   ])
// }

// export const getConversationHistory = async (automationId: string): Promise<Conversation[]> => {
//   const messages = await client.message.findMany({
//     where: { automationId },
//     orderBy: { createdAt: "asc" },
//   })

//   const chatSession: Message[] = messages.map((message) => ({
//     role: message.isFromBot ? "assistant" : "user",
//     content: message.message,
//     senderId: message.senderId,
//     receiverId: message.pageId,
//   }))

//   const groupedChats = chatSession.reduce(
//     (acc, message) => {
//       const key = message.role === "assistant" ? message.receiverId : message.senderId
//       if (!acc[key]) {
//         acc[key] = []
//       }
//       acc[key].push(message)
//       return acc
//     },
//     {} as Record<string, Message[]>,
//   )

//   return Object.entries(groupedChats).map(([userId, messages]) => ({
//     userId,
//     messages,
//   }))
// }

// export const deleteConversation = async (pageId: string, senderId: string) => {
//   return await client.message.deleteMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//   })
// }

// "use server"
// import { client } from "@/lib/prisma"
// import type { Message, Conversation } from "@/types/chat"

// export const createMessage = async (
//   pageId: string,
//   senderId: string,
//   message: string,
//   isFromBot: boolean,
//   automationId: string | null,
// ) => {
//   return await client.message.create({
//     data: {
//       pageId,
//       senderId,
//       message,
//       isFromBot,
//       ...(automationId && { Automation: { connect: { id: automationId } } }),
//     },
//   })
// }

// export const getMessages = async (pageId: string, senderId: string) => {
//   return await client.message.findMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//     orderBy: { createdAt: "asc" },
//   })
// }

// export const storeConversation = async (
//   pageId: string,
//   senderId: string,
//   userMessage: string,
//   botResponse: string,
//   automationId: string | null,
// ) => {
//   return await client.$transaction([
//     client.message.create({
//       data: {
//         pageId,
//         senderId,
//         message: userMessage,
//         isFromBot: false,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//     client.message.create({
//       data: {
//         pageId,
//         senderId: pageId,
//         message: botResponse,
//         isFromBot: true,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//   ])
// }

// export const getConversationHistory = async (automationId: string, clientId:String): Promise<Conversation[]> => {
//   const messages = await client.message.findMany({
//     where: { automationId },
//     orderBy: { createdAt: "asc" },
//   })

//   const chatSession: Message[] = messages.map((message) => ({
//     id: message.id, // Add this line to include the message ID
//     role: message.isFromBot ? "assistant" : "user",
//     content: message.message,
//     senderId: message.senderId,
//     receiverId: message.pageId,
//     timestamp: message.createdAt, // Add this line to include the timestamp
//   }))

//   const groupedChats = chatSession.reduce(
//     (acc, message) => {
//       const key = message.role === "assistant" ? message.receiverId : message.senderId
//       if (!acc[key]) {
//         acc[key] = {
//           chatId: key, // Use the key (senderId or receiverId) as the chatId
//           messages: [],
//         }
//       }
//       acc[key].messages.push(message)
//       return acc
//     },
//     {} as Record<string, { chatId: string; messages: Message[] }>,
//   )

//   return Object.entries(groupedChats).map(([userId, { chatId, messages }]) => ({
//     userId,
//     chatId,
//     messages,
//   }))
// }

// export const deleteConversation = async (pageId: string, senderId: string) => {
//   return await client.message.deleteMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//   })
// }

// "use server"
// import { client } from "@/lib/prisma"
// import type { Message } from "@/types/chat"

// const BOT_ID = "0417"

// export const getConversationHistory = async (automationId: string, pageId: string): Promise<Message[]> => {
//   const messages = await client.message.findMany({
//     where: {
//       automationId,
//       pageId,
//     },
//     orderBy: { createdAt: "asc" },
//   })

//   return messages.map((message) => ({
//     id: message.id,
//     role: message.senderId === BOT_ID ? "assistant" : "user",
//     content: message.message,
//     senderId: message.senderId,
//     receiverId: message.pageId,
//     timestamp: message.createdAt,
//   }))
// }

// export const storeConversation = async (
//   pageId: string,
//   userMessage: string,
//   botResponse: string,
//   automationId: string | null,
// ) => {
//   return await client.$transaction([
//     client.message.create({
//       data: {
//         pageId,
//         senderId: pageId,
//         message: userMessage,
//         isFromBot: false,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//     client.message.create({
//       data: {
//         pageId,
//         senderId: BOT_ID,
//         message: botResponse,
//         isFromBot: true,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//   ])
// }

// export const createMessage = async (
//   pageId: string,
//   content: string,
//   isFromBot: boolean,
//   automationId: string | null,
// ) => {
//   return await client.message.create({
//     data: {
//       pageId,
//       senderId: isFromBot ? BOT_ID : pageId,
//       message: content,
//       isFromBot,
//       ...(automationId && { Automation: { connect: { id: automationId } } }),
//     },
//   })
// }

// export const deleteConversation = async (pageId: string) => {
//   return await client.message.deleteMany({
//     where: {
//       pageId,
//     },
//   })
// }

// "use server"
// import { client } from "@/lib/prisma"
// import type { Message } from "@/types/chat"

// const BOT_ID = "17841444435951291"

// export const getConversationHistory = async (automationId: string): Promise<Message[]> => {
//   const messages = await client.message.findMany({
//     where: {
//       automationId,
//     },
//     orderBy: { createdAt: "asc" },
//   })

//   return messages.map((message) => ({
//     id: message.id,
//     role: message.senderId === BOT_ID ? "assistant" : "user",
//     content: message.message,
//     senderId: message.senderId,
//     receiverId: message.pageId,
//     timestamp: message.createdAt,
//   }))
// }

// export const storeConversation = async (
//   pageId: string,
//   senderId: string,
//   userMessage: string,
//   botResponse: string,
//   automationId: string | null,
// ) => {
//   return await client.$transaction([
//     client.message.create({
//       data: {
//         pageId,
//         senderId,
//         message: userMessage,
//         isFromBot: false,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//     client.message.create({
//       data: {
//         pageId,
//         senderId: BOT_ID,
//         message: botResponse,
//         isFromBot: true,
//         ...(automationId && { Automation: { connect: { id: automationId } } }),
//       },
//     }),
//   ])
// }

// export const createMessage = async (
//   pageId: string,
//   senderId: string,
//   content: string,
//   isFromBot: boolean,
//   automationId: string | null,
// ) => {
//   return await client.message.create({
//     data: {
//       pageId,
//       senderId,
//       message: content,
//       isFromBot,
//       ...(automationId && { Automation: { connect: { id: automationId } } }),
//     },
//   })
// }

// export const deleteConversation = async (pageId: string, senderId: string) => {
//   return await client.message.deleteMany({
//     where: {
//       pageId,
//       OR: [{ senderId }, { senderId: pageId }],
//     },
//   })
// }

"use server"
import { client } from "@/lib/prisma"
import type { Message, Conversation } from "@/types/chat"

export const createMessage = async (
  pageId: string,
  senderId: string,
  message: string,
  isFromBot: boolean,
  automationId: string | null,
) => {
  return await client.message.create({
    data: {
      pageId,
      senderId,
      message,
      isFromBot,
      ...(automationId && { Automation: { connect: { id: automationId } } }),
    },
  })
}

export const getMessages = async (pageId: string, senderId: string) => {
  return await client.message.findMany({
    where: {
      pageId,
      OR: [{ senderId }, { senderId: pageId }],
    },
    orderBy: { createdAt: "asc" },
  })
}

export const storeConversation = async (
  pageId: string,
  senderId: string,
  userMessage: string,
  botResponse: string,
  automationId: string | null,
) => {
  return await client.$transaction([
    client.message.create({
      data: {
        pageId,
        senderId,
        message: userMessage,
        isFromBot: false,
        ...(automationId && { Automation: { connect: { id: automationId } } }),
      },
    }),
    client.message.create({
      data: {
        pageId,
        senderId: pageId,
        message: botResponse,
        isFromBot: true,
        ...(automationId && { Automation: { connect: { id: automationId } } }),
      },
    }),
  ])
}

export const getConversationHistory = async (automationId: string): Promise<Conversation[]> => {
  const messages = await client.message.findMany({
    where: { automationId },
    orderBy: { createdAt: "asc" },
  })

  const chatSession: Message[] = messages.map((message) => ({
    id: message.id, // Add this line to include the message ID
    role: message.isFromBot ? "assistant" : "user",
    content: message.message,
    senderId: message.senderId,
    receiverId: message.pageId,
    timestamp: message.createdAt, // Add this line to include the timestamp
  }))

  const groupedChats = chatSession.reduce(
    (acc, message) => {
      const key = message.role === "assistant" ? message.receiverId : message.senderId
      if (!acc[key]) {
        acc[key] = {
          chatId: key, // Use the key (senderId or receiverId) as the chatId
          messages: [],
        }
      }
      acc[key].messages.push(message)
      return acc
    },
    {} as Record<string, { chatId: string; messages: Message[] }>,
  )

  return Object.entries(groupedChats).map(([userId, { chatId, messages }]) => ({
    userId,
    chatId,
    messages,
  }))
}

export const deleteConversation = async (pageId: string, senderId: string) => {
  return await client.message.deleteMany({
    where: {
      pageId,
      OR: [{ senderId }, { senderId: pageId }],
    },
  })
}


