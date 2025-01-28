// "use server"

// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { matchKeyword, getKeywordAutomation, trackResponses, createChatHistory } from "@/actions/webhook/queries"
// import { storeConversation, getConversationHistory } from "@/actions/chats/queries"
// import { sendPrivateMessage } from "@/lib/fetch"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"

// export async function fetchChatsAndBusinessVariables(automationId: string) {
//   try {
//     const result = await getConversationHistory(automationId)
//     const token = await getInstagramToken(automationId)

//     // Fetch business variables
//     const automation = await findAutomation(automationId)
//     let businessVariables = {
//       business_name: "",
//       welcome_message: "",
//       business_industry: "",
//     }

//     if (automation?.userId) {
//       console.log("Fetching business for automation userId:", automation.userId)
//       try {
//         const business = await client.business.findFirst({
//           where: { userId: automation.userId },
//         })
//         console.log("Fetched business:", business)

//         if (business) {
//           businessVariables = {
//             business_name: business.businessName || "",
//             welcome_message: business.welcomeMessage || "",
//             business_industry: business.industry || "",
//           }
//           console.log("Set business variables:", businessVariables)
//         }
//       } catch (error) {
//         console.error("Error fetching business:", error)
//       }
//     }

//     return { conversations: result, token, businessVariables }
//   } catch (error) {
//     console.error("Error in fetchChatsAndBusinessVariables:", error)
//     throw error
//   }
// }

// export async function sendMessage(
//   newMessage: string,
//   userId: string,
//   pageId: string,
//   automationId: string,
//   token: string,
//   businessVariables: Record<string, string>,
// ) {
//   try {
//     // Check if the conversation is already active
//     const conversationState = await client.conversationState.findUnique({
//       where: { userId },
//     })

//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       const matcher = await matchKeyword(newMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return { success: false, message: "No keyword match" }
//       }

//       // Keyword matched, set the conversation as active
//       await client.conversationState.upsert({
//         where: { userId },
//         update: { isActive: true, updatedAt: new Date() },
//         create: { userId, isActive: true },
//       })
//       isConversationActive = true
//     }

//     console.log("Attempting to create Voiceflow user:", userId)
//     const userCreated = await createVoiceflowUser(userId)
//     if (!userCreated) {
//       console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//     }

//     let automation
//     const matcher = await matchKeyword(newMessage)
//     if (matcher && matcher.automationId) {
//       automation = await getKeywordAutomation(matcher.automationId, true)
//     } else {
//       const customer_history = await client.message.findMany({
//         where: { automationId },
//         orderBy: { createdAt: "desc" },
//         take: 1,
//       })
//       if (customer_history.length > 0) {
//         automation = await client.automation.findUnique({ where: { id: automationId } })
//       }
//     }

//     let voiceflowResponse =
//       "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     try {
//       const response = await getVoiceflowResponse(newMessage, userId, businessVariables)
//       voiceflowResponse = processVoiceflowResponse(response)
//     } catch (error) {
//       console.error("Error getting or processing Voiceflow response:", error)
//     }

//     console.log("Processed Voiceflow response:", voiceflowResponse)

//     // Store the conversation
//     await storeConversation(pageId, userId, newMessage, voiceflowResponse, automationId)
//     console.log("Conversation stored successfully")

//     // Send the message
//     const messageSent = await sendPrivateMessage(pageId, userId, voiceflowResponse, token)

//     if (messageSent.status === 200) {
//       if (automation) {
//         await trackResponses(automationId, "DM")
//       }
//       await createChatHistory(automationId, pageId, userId, newMessage)
//       await createChatHistory(automationId, pageId, userId, voiceflowResponse)
//     }

//     return {
//       success: true,
//       userMessage: { content: newMessage, timestamp: new Date() },
//       botMessage: { content: voiceflowResponse, timestamp: new Date() },
//     }
//   } catch (error) {
//     console.error("Error in sendMessage:", error)
//     return { success: false, message: error instanceof Error ? error.message : String(error) }
//   }
// }

// "use server"

// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { matchKeyword, getKeywordAutomation, trackResponses, createChatHistory } from "@/actions/webhook/queries"
// import { storeConversation, getConversationHistory } from "@/actions/chats/queries"
// import { sendPrivateMessage } from "@/lib/fetch"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"

// export async function fetchChatsAndBusinessVariables(automationId: string) {
//   try {
//     const result = await getConversationHistory(automationId)
//     const token = await getInstagramToken(automationId)

//     // Fetch business variables
//     const automation = await findAutomation(automationId)
//     let businessVariables = {
//       business_name: "",
//       welcome_message: "",
//       business_industry: "",
//     }

//     if (automation?.userId) {
//       console.log("Fetching business for automation userId:", automation.userId)
//       try {
//         const business = await client.business.findFirst({
//           where: { userId: automation.userId },
//         })
//         console.log("Fetched business:", business)

//         if (business) {
//           businessVariables = {
//             business_name: business.businessName || "",
//             welcome_message: business.welcomeMessage || "",
//             business_industry: business.industry || "",
//           }
//           console.log("Set business variables:", businessVariables)
//         }
//       } catch (error) {
//         console.error("Error fetching business:", error)
//       }
//     }

//     return { conversations: result, token, businessVariables }
//   } catch (error) {
//     console.error("Error in fetchChatsAndBusinessVariables:", error)
//     throw error
//   }
// }

// export async function sendMessage(
//   newMessage: string,
//   userId: string,
//   pageId: string,
//   automationId: string,
//   token: string,
//   businessVariables: Record<string, string>,
// ): Promise<{
//   success: boolean
//   message?: string
//   userMessage?: { content: string; timestamp: Date }
//   botMessage?: { content: string; timestamp: Date }
// }> {
//   try {
//     // Check if the conversation is already active
//     const conversationState = await client.conversationState.findUnique({
//       where: { userId },
//     })

//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       const matcher = await matchKeyword(newMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return { success: false, message: "No keyword match" }
//       }

//       // Keyword matched, set the conversation as active
//       await client.conversationState.upsert({
//         where: { userId },
//         update: { isActive: true, updatedAt: new Date() },
//         create: { userId, isActive: true },
//       })
//       isConversationActive = true
//     }

//     console.log("Attempting to create Voiceflow user:", userId)
//     const userCreated = await createVoiceflowUser(userId)
//     if (!userCreated) {
//       console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//     }

//     let automation
//     const matcher = await matchKeyword(newMessage)
//     if (matcher && matcher.automationId) {
//       automation = await getKeywordAutomation(matcher.automationId, true)
//     } else {
//       const customer_history = await client.message.findMany({
//         where: { automationId },
//         orderBy: { createdAt: "desc" },
//         take: 1,
//       })
//       if (customer_history.length > 0) {
//         automation = await client.automation.findUnique({ where: { id: automationId } })
//       }
//     }

//     let voiceflowResponse =
//       "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     try {
//       const response = await getVoiceflowResponse(newMessage, userId, businessVariables)
//       voiceflowResponse = processVoiceflowResponse(response)
//     } catch (error) {
//       console.error("Error getting or processing Voiceflow response:", error)
//     }

//     console.log("Processed Voiceflow response:", voiceflowResponse)

//     // Store the conversation
//     await storeConversation(pageId, userId, newMessage, voiceflowResponse, automationId)
//     console.log("Conversation stored successfully")

//     // Send the message
//     const messageSent = await sendPrivateMessage(pageId, userId, voiceflowResponse, token)

//     if (messageSent.status === 200) {
//       if (automation) {
//         await trackResponses(automationId, "DM")
//       }
//       await createChatHistory(automationId, pageId, userId, newMessage)
//       await createChatHistory(automationId, pageId, userId, voiceflowResponse)
//     }

//     return {
//       success: true,
//       userMessage: { content: newMessage, timestamp: new Date() },
//       botMessage: { content: voiceflowResponse, timestamp: new Date() },
//     }
//   } catch (error) {
//     console.error("Error in sendMessage:", error)
//     return { success: false, message: error instanceof Error ? error.message : String(error) }
//   }
// }

// "use server"

// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { matchKeyword, getKeywordAutomation, trackResponses, createChatHistory } from "@/actions/webhook/queries"
// import { storeConversation, getConversationHistory } from "@/actions/chats/queries"
// import { sendDM } from "@/lib/fetch"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"

// export async function fetchBusinessData(userId: string) {
//   try {
//     const business = await client.business.findFirst({
//       where: { userId },
//     })

//     return business
//       ? {
//           business_name: business.businessName || "",
//           welcome_message: business.welcomeMessage || "",
//           business_industry: business.industry || "",
//         }
//       : null
//   } catch (error) {
//     console.error("Error fetching business:", error)
//     return null
//   }
// }

// export async function fetchChatsAndBusinessVariables(automationId: string) {
//   try {
//     const result = await getConversationHistory(automationId)
//     const token = await getInstagramToken(automationId)

//     // Fetch business variables
//     const automation = await findAutomation(automationId)
//     let businessVariables = await fetchBusinessData(automation?.userId || "")

//     if (!businessVariables) {
//       businessVariables = {
//         business_name: "",
//         welcome_message: "",
//         business_industry: "",
//       }
//     }

//     return { conversations: result, token, businessVariables }
//   } catch (error) {
//     console.error("Error in fetchChatsAndBusinessVariables:", error)
//     throw error
//   }
// }

// export async function sendMessage(
//   newMessage: string,
//   userId: string,
//   pageId: string,
//   automationId: string,
//   token: string,
//   businessVariables: Record<string, string>,
// ): Promise<{
//   success: boolean
//   message?: string
//   userMessage?: { content: string; timestamp: Date }
//   botMessage?: { content: string; timestamp: Date }
// }> {
//   try {
//     // Check if the conversation is already active
//     const conversationState = await client.conversationState.findUnique({
//       where: { userId },
//     })

//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       const matcher = await matchKeyword(newMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return { success: false, message: "No keyword match" }
//       }

//       // Keyword matched, set the conversation as active
//       await client.conversationState.upsert({
//         where: { userId },
//         update: { isActive: true, updatedAt: new Date() },
//         create: { userId, isActive: true },
//       })
//       isConversationActive = true
//     }

//     console.log("Attempting to create Voiceflow user:", userId)
//     const userCreated = await createVoiceflowUser(userId)
//     if (!userCreated) {
//       console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//     }

//     let automation
//     const matcher = await matchKeyword(newMessage)
//     if (matcher && matcher.automationId) {
//       automation = await getKeywordAutomation(matcher.automationId, true)
//     } else {
//       const customer_history = await client.message.findMany({
//         where: { automationId },
//         orderBy: { createdAt: "desc" },
//         take: 1,
//       })
//       if (customer_history.length > 0) {
//         automation = await client.automation.findUnique({ where: { id: automationId } })
//       }
//     }

//     let voiceflowResponse =
//       "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     try {
//       const response = await getVoiceflowResponse(newMessage, userId, businessVariables)
//       voiceflowResponse = processVoiceflowResponse(response)
//     } catch (error) {
//       console.error("Error getting or processing Voiceflow response:", error)
//     }

//     console.log("Processed Voiceflow response:", voiceflowResponse)

//     // Store the conversation
//     await storeConversation(pageId, userId, newMessage, voiceflowResponse, automationId)
//     console.log("Conversation stored successfully")

//     // Send the message
//     const messageSent = await sendDM(pageId, userId, newMessage, token)

//     if (messageSent.status === 200) {
//       if (automation) {
//         await trackResponses(automationId, "DM")
//       }
//       await createChatHistory(automationId, pageId, userId, newMessage)
//       await createChatHistory(automationId, pageId, userId, voiceflowResponse)
//     }

//     return {
//       success: true,
//       userMessage: { content: newMessage, timestamp: new Date() },
//       botMessage: { content: voiceflowResponse, timestamp: new Date() },
//     }
//   } catch (error) {
//     console.error("Error in sendMessage:", error)
//     return { success: false, message: error instanceof Error ? error.message : String(error) }
//   }
// }

//WWWWOOOORKINGGG

// "use server"
// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { matchKeyword, getKeywordAutomation, trackResponses, createChatHistory } from "@/actions/webhook/queries"
// import { storeConversation, getConversationHistory } from "@/actions/chats/queries"
// import { sendPrivateMessage } from "@/lib/instagram"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"

// export async function fetchBusinessData(userId: string) {
//   try {
//     const business = await client.business.findFirst({
//       where: { userId },
//     })

//     return business
//       ? {
//           business_name: business.businessName || "",
//           welcome_message: business.welcomeMessage || "",
//           business_industry: business.industry || "",
//         }
//       : null
//   } catch (error) {
//     console.error("Error fetching business:", error)
//     return null
//   }
// }

// export async function fetchChatsAndBusinessVariables(automationId: string) {
//   try {
//     const result = await getConversationHistory(automationId)
//     const token = await getInstagramToken(automationId)

//     // Fetch business variables
//     const automation = await findAutomation(automationId)
//     let businessVariables = await fetchBusinessData(automation?.userId || "")

//     if (!businessVariables) {
//       businessVariables = {
//         business_name: "",
//         welcome_message: "",
//         business_industry: "",
//       }
//     }

//     return { conversations: result, token, businessVariables }
//   } catch (error) {
//     console.error("Error in fetchChatsAndBusinessVariables:", error)
//     throw error
//   }
// }


// export async function sendMessage(
//   newMessage: string,
//   userId: string,
//   pageId: string,
//   automationId: string,
//   token: string,
//   businessVariables: Record<string, string>,
// ): Promise<{
//   success: boolean
//   message?: string
//   userMessage?: { content: string; timestamp: Date }
//   botMessage?: { content: string; timestamp: Date }
// }> {
//   try {
//     console.log("Message Action - Starting message send process:", {
//       userId,
//       pageId,
//       automationId,
//       messageLength: newMessage.length,
//     })

//     // Validate inputs
//     if (!userId || !pageId || !automationId || !token) {
//       console.error("Message Action - Missing required parameters:", {
//         hasUserId: !!userId,
//         hasPageId: !!pageId,
//         hasAutomationId: !!automationId,
//         hasToken: !!token,
//       })
//       return { success: false, message: "Missing required parameters" }
//     }

//     // Check if the conversation is already active
//     console.log("Message Action - Checking conversation state for userId:", userId)
//     const conversationState = await client.conversationState.findUnique({
//       where: { userId },
//     })

//     let isConversationActive = conversationState?.isActive || false
//     console.log("Message Action - Conversation active state:", isConversationActive)

//     if (!isConversationActive) {
//       console.log("Message Action - Checking for keyword match")
//       const matcher = await matchKeyword(newMessage)

//       if (!matcher || !matcher.automationId) {
//         console.log("Message Action - No keyword match found")
//         return { success: false, message: "No keyword match" }
//       }

//       console.log("Message Action - Keyword matched, activating conversation")
//       await client.conversationState.upsert({
//         where: { userId },
//         update: { isActive: true, updatedAt: new Date() },
//         create: { userId, isActive: true },
//       })
//       isConversationActive = true
//     }

//     console.log("Message Action - Creating Voiceflow user:", userId)
//     const userCreated = await createVoiceflowUser(userId)
//     if (!userCreated) {
//       console.warn("Message Action - Failed to create Voiceflow user:", userId)
//     }

//     let automation
//     const matcher = await matchKeyword(newMessage)
//     if (matcher && matcher.automationId) {
//       console.log("Message Action - Found keyword automation:", matcher.automationId)
//       automation = await getKeywordAutomation(matcher.automationId, true)
//     } else {
//       console.log("Message Action - Checking conversation history")
//       const customer_history = await client.message.findMany({
//         where: { automationId },
//         orderBy: { createdAt: "desc" },
//         take: 1,
//       })
//       if (customer_history.length > 0) {
//         automation = await client.automation.findUnique({ where: { id: automationId } })
//       }
//     }

//     let voiceflowResponse =
//       "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     // try {
//     //   console.log("Message Action - Getting Voiceflow response")
//     //   const response = await getVoiceflowResponse(newMessage, userId, businessVariables)
//     //   voiceflowResponse = processVoiceflowResponse(response)
//     //   console.log("Message Action - Processed Voiceflow response length:", voiceflowResponse.length)
//     // } catch (error) {
//     //   console.error("Message Action - Error getting Voiceflow response:", error)
//     // }

//     // Store the conversation
//     console.log("Message Action - Storing conversation")
//     await storeConversation(pageId, userId, newMessage, "Sent from dashboard", automationId)

//     // Send the message
//     console.log("Message Action - Sending message via Instagram API")
//     const messageSent = await sendPrivateMessage(pageId, userId, newMessage, token)

//     if (messageSent.status === 200) {
//       console.log("Message Action - Message sent successfully")
//       if (automation) {
//         await trackResponses(automationId, "DM")
//       }
//       await createChatHistory(automationId, pageId, userId, newMessage)

//       return {
//         success: true,
//         userMessage: { content: newMessage, timestamp: new Date() },
//       }
//     } else {
//       console.error("Message Action - Failed to send message:", messageSent.error)
//       return {
//         success: false,
//         message: messageSent.error?.message || "Failed to send message",
//       }
//     }
//   } catch (error) {
//     console.error("Message Action - Unhandled error:", error)
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : String(error),
//     }
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
import { matchKeyword, getKeywordAutomation, trackResponses, createChatHistory } from "@/actions/webhook/queries"
import { storeConversation, getConversationHistory } from "@/actions/chats/queries"
import { sendPrivateMessage } from "@/lib/instagram"
import { getInstagramToken } from "@/actions/token/getToken"
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
      console.log("Message Action - Checking for keyword match")
      const matcher = await matchKeyword(newMessage)

      if (!matcher || !matcher.automationId) {
        console.log("Message Action - No keyword match found")
        return { success: false, message: "No keyword match" }
      }

      console.log("Message Action - Keyword matched, activating conversation")
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

    let automation
    const matcher = await matchKeyword(newMessage)
    if (matcher && matcher.automationId) {
      console.log("Message Action - Found keyword automation:", matcher.automationId)
      automation = await getKeywordAutomation(matcher.automationId, true)
    } else {
      console.log("Message Action - Checking conversation history")
      const customer_history = await client.message.findMany({
        where: { automationId },
        orderBy: { createdAt: "desc" },
        take: 1,
      })
      if (customer_history.length > 0) {
        automation = await client.automation.findUnique({ where: { id: automationId } })
      }
    }

    const voiceflowResponse =
      "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

    // Store the conversation
    console.log("Message Action - Storing conversation")
    await storeConversation(pageId, userId, newMessage, "Sent from dashboard", automationId)

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

