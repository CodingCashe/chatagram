"use server"

import { client } from "@/lib/prisma"

export const storeConversationMessage = async (
  pageId: string,
  senderId: string,
  message: string,
  isFromBot: boolean,
  automationId: string | null,
) => {
  const conversation = await client.conversation.upsert({
    where: { pageId },
    update: {
      messages: {
        push: {
          role: isFromBot ? "assistant" : "user",
          content: message,
          senderId,
          createdAt: new Date(),
        },
      },
      updatedAt: new Date(),
    },
    create: {
      pageId,
      messages: [
        {
          role: isFromBot ? "assistant" : "user",
          content: message,
          senderId,
          createdAt: new Date(),
        },
      ],
      ...(automationId && { Automation: { connect: { id: automationId } } }),
    },
  })

  return conversation
}

export const getConversation = async (pageId: string) => {
  return await client.conversation.findUnique({
    where: { pageId },
  })
}

export const getConversationHistory = async (automationId: string) => {
  const conversations = await client.conversation.findMany({
    where: { automationId },
  })

  return conversations.map((conversation) => ({
    pageId: conversation.pageId,
    chatId: conversation.id,
    messages: conversation.messages,
  }))
}

export const deleteConversation = async (pageId: string) => {
  return await client.conversation.delete({
    where: { pageId },
  })
}

