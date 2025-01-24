"use server"

import { client } from "@/lib/prisma"


interface StoreChatMessagesParams {
  userId: string
  pageId: string
  senderId: string
  userMessage: string
  botResponse: string
  automationId: string
}

export async function storeChatMessages({
  userId,
  pageId,
  senderId,
  userMessage,
  botResponse,
  automationId,
}: StoreChatMessagesParams) {
  try {
    const result = await client.$transaction([
      client.message.create({
        data: {
          userId,
          pageId,
          senderId,
          message: userMessage,
          isFromBot: false,
          automationId,
        },
      }),
      client.message.create({
        data: {
          userId,
          pageId,
          senderId: pageId, // For bot messages, senderId is the page ID
          message: botResponse,
          isFromBot: true,
          automationId,
        },
      }),
    ])

    console.log("Chat messages stored:", result)
    return { success: true, messages: result }
  } catch (error) {
    console.error("Error storing chat messages:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

