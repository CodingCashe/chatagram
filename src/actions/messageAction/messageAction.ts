"use server"

import { storeConversationMessage, getConversationHistory } from "@/actions/chats/queries"
import { getInstagramToken } from "@/actions/token/getToken"
import { client } from "@/lib/prisma"
import { createVoiceflowUser } from "@/lib/voiceflow"
import { trackResponses, createChatHistory } from "@/actions/webhook/queries"
import { sendPrivateMessage } from "@/lib/instagram"
import { findAutomation } from "@/actions/automations/queries"

export async function fetchBusinessData(userId: string) {
  try {
    const business = await client.business.findFirst({
      where: { userId },
    })

    return business
      ? {
          business_name: business.businessName || "",
          welcome_message: business.welcomeMessage || "",
          business_industry: business.industry || "",
        }
      : null
  } catch (error) {
    console.error("Error fetching business:", error)
    return null
  }
}

export async function fetchChatsAndBusinessVariables(automationId: string) {
  try {
    const result = await getConversationHistory(automationId)
    const token = await getInstagramToken(automationId)

    // Fetch business variables
    const automation = await findAutomation(automationId)
    let businessVariables = await fetchBusinessData(automation?.userId || "")

    if (!businessVariables) {
      businessVariables = {
        business_name: "",
        welcome_message: "",
        business_industry: "",
      }
    }

    return { conversations: result, token, businessVariables }
  } catch (error) {
    console.error("Error in fetchChatsAndBusinessVariables:", error)
    throw error
  }
}



export async function sendMessage(
  newMessage: string,
  userId: string,
  pageId: string,
  automationId: string,
  token: string,
  businessVariables: Record<string, string>,
): Promise<{
  success: boolean
  message?: string
  userMessage?: { content: string; timestamp: Date }
  botMessage?: { content: string; timestamp: Date }
}> {
  try {
    console.log("Message Action - Starting message send process:", {
      userId,
      pageId,
      automationId,
      messageLength: newMessage.length,
    })

    // Validate inputs
    if (!userId || !pageId || !automationId || !token) {
      console.error("Message Action - Missing required parameters:", {
        hasUserId: !!userId,
        hasPageId: !!pageId,
        hasAutomationId: !!automationId,
        hasToken: !!token,
      })
      return { success: false, message: "Missing required parameters" }
    }

    // Check if the conversation is already active
    console.log("Message Action - Checking conversation state for userId:", userId)
    const conversationState = await client.conversationState.findUnique({
      where: { userId },
    })

    let isConversationActive = conversationState?.isActive || false
    console.log("Message Action - Conversation active state:", isConversationActive)

    if (!isConversationActive) {
      console.log("Message Action - Activating conversation")
      await client.conversationState.upsert({
        where: { userId },
        update: { isActive: true, updatedAt: new Date() },
        create: { userId, isActive: true },
      })
      isConversationActive = true
    }

    console.log("Message Action - Creating Voiceflow user:", userId)
    const userCreated = await createVoiceflowUser(userId)
    if (!userCreated) {
      console.warn("Message Action - Failed to create Voiceflow user:", userId)
    }

    const automation = await findAutomation(automationId)

    const voiceflowResponse =
      "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

    // Store the conversation
    console.log("Message Action - Storing conversation")
    await storeConversationMessage(pageId, userId, newMessage, true, automationId)

    // Send the message
    console.log("Message Action - Sending message via Instagram API")
    const messageSent = await sendPrivateMessage(pageId, userId, newMessage, token)

    if (messageSent.status === 200) {
      console.log("Message Action - Message sent successfully")
      if (automation) {
        await trackResponses(automationId, "DM")
      }
      await createChatHistory(automationId, pageId, userId, newMessage)

      return {
        success: true,
        userMessage: { content: newMessage, timestamp: new Date() },
      }
    } else {
      console.error("Message Action - Failed to send message:", messageSent.error)
      return {
        success: false,
        message: messageSent.error?.message || "Failed to send message",
      }
    }
  } catch (error) {
    console.error("Message Action - Unhandled error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    }
  }
}