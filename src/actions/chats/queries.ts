"use server"
import { client } from "@/lib/prisma"

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
      automationId,
    },
  })
}

export const getMessages = async (pageId: string, senderId: string) => {
  return await client.message.findMany({
    where: {
      pageId,
      OR: [
        { senderId },
        { senderId: pageId }, // This assumes the bot's senderId is the pageId
      ],
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
    createMessage(pageId, senderId, userMessage, false, automationId),
    createMessage(pageId, pageId, botResponse, true, automationId),
  ])
}

export const getConversationHistory = async (pageId: string, senderId: string) => {
  const messages = await getMessages(pageId, senderId)
  return messages.map((msg) => ({
    role: msg.isFromBot ? "assistant" : "user",
    content: msg.message,
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

