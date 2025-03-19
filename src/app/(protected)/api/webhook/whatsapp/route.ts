// import { type NextRequest, NextResponse } from "next/server"
// import { findAutomation } from "@/actions/automations/queries"
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   matchKeyword,
//   trackResponses,
// } from "@/actions/webhook/queries"
// import { sendWhatsAppMessage } from "@/lib/fetch"
// import { openai } from "@/lib/openai"
// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { storeConversationMessage } from "@/actions/chats/queries"
// import { createMarketingInfoAction } from "@/actions/details"
// import type { VoiceflowVariables } from "@/types/voiceflow"

// export async function GET(req: NextRequest) {
//   // WhatsApp webhook verification
//   const mode = req.nextUrl.searchParams.get("hub.mode")
//   const token = req.nextUrl.searchParams.get("hub.verify_token")
//   const challenge = req.nextUrl.searchParams.get("hub.challenge")

//   // Check if a token and mode were sent
//   if (mode && token) {
//     // Check the mode and token sent are correct
//     if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
//       // Respond with the challenge token from the request
//       console.log("WEBHOOK_VERIFIED")
//       return new NextResponse(challenge)
//     } else {
//       // Respond with '403 Forbidden' if verify tokens do not match
//       return new NextResponse("Forbidden", { status: 403 })
//     }
//   }

//   return new NextResponse("Bad Request", { status: 400 })
// }

// export async function POST(req: NextRequest) {
//   console.log("WhatsApp webhook POST request received")
//   let webhook_payload, matcher, userId, userMessage, phoneNumberId, senderId

//   try {
//     webhook_payload = await req.json()
//     console.log("Received WhatsApp webhook payload:", JSON.stringify(webhook_payload, null, 2))

//     // Extract information from WhatsApp webhook payload
//     if (
//       webhook_payload.object === "whatsapp_business_account" &&
//       webhook_payload.entry &&
//       webhook_payload.entry[0].changes &&
//       webhook_payload.entry[0].changes[0].value.messages &&
//       webhook_payload.entry[0].changes[0].value.messages[0]
//     ) {
//       const change = webhook_payload.entry[0].changes[0]
//       phoneNumberId = change.value.metadata.phone_number_id
//       senderId = change.value.messages[0].from
      
//       // Handle different message types (text, image, etc.)
//       if (change.value.messages[0].type === "text") {
//         userMessage = change.value.messages[0].text.body
//       } else if (change.value.messages[0].type === "interactive") {
//         // Handle interactive messages (buttons, list replies)
//         userMessage = change.value.messages[0].interactive.button_reply?.title || 
//                       change.value.messages[0].interactive.list_reply?.title || 
//                       "Interactive message"
//       } else {
//         // For other message types (image, audio, etc.)
//         userMessage = `[${change.value.messages[0].type} message]`
//       }
      
//       userId = `whatsapp_${phoneNumberId}_${senderId}`
//       matcher = await matchKeyword(userMessage)
//     } else {
//       return NextResponse.json({ message: "Unsupported WhatsApp webhook payload" }, { status: 400 })
//     }

//     // Check if the conversation is already active
//     const conversationState = await client.conversationState.findUnique({
//       where: { userId },
//     })

//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive && !matcher?.automationId) {
//       // No keyword match and conversation not active, don't respond
//       return NextResponse.json({ message: "No keyword match" }, { status: 200 })
//     }

//     // Set conversation as active if keyword matched
//     if (matcher?.automationId) {
//       await client.conversationState.upsert({
//         where: { userId },
//         update: { isActive: true, updatedAt: new Date() },
//         create: { userId, isActive: true },
//       })
//       isConversationActive = true
//     }

//     // Get automation details
//     let automation
//     if (matcher && matcher.automationId) {
//       automation = await getKeywordAutomation(matcher.automationId, true)
//     } else {
//       const customer_history = await getChatHistory(phoneNumberId, senderId)
//       if (customer_history.history.length > 0) {
//         automation = await findAutomation(customer_history.automationId!)
//       }
//     }

//     // Find the WhatsApp account token
//     const whatsappToken = automation?.User?.integrations.find(
//       account => account.name === "WHATSAPP" && account.phoneNumber === phoneNumberId
//     )?.token || process.env.DEFAULT_WHATSAPP_TOKEN!

//     // Handle based on subscription plan
//     if (automation?.User?.subscription?.plan === "PRO") {
//       // PRO users get Voiceflow
//       console.log("Using Voiceflow for PRO user")

//       // Create Voiceflow user
//       console.log("Attempting to create Voiceflow user:", userId)
//       const userCreated = await createVoiceflowUser(userId)
//       if (!userCreated) {
//         console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//       }

//       // Get business context
//       let businessVariables: Record<string, string> = {}
//       if (automation?.userId) {
//         try {
//           const business = await client.business.findFirst({
//             where: { userId: automation.userId },
//           })
//           if (business) {
//             businessVariables = {
//               business_name: business.businessName || "",
//               welcome_message: business.welcomeMessage || "",
//               business_industry: business.industry || "",
//               business_type: business.businessType || "",
//               business_description: business.businessDescription || "",
//               whatsapp_number: business.whatsappNumber || "",
//               website: business.website || "",
//               target_audience: business.targetAudience || "",
//               response_language: business.responseLanguage || "",
//               business_hours: business.businessHours || "",
//               auto_reply_enabled: business.autoReplyEnabled ? "Yes" : "No",
//               promotion_message: business.promotionMessage || "",
//               automation_setup_complete: business.automationSetupComplete ? "Yes" : "No",
//               automation_setup_date: business.automationSetupDate?.toISOString() || "",
//               automation_additional_notes: business.automationAdditionalNotes || "",
//             }

//             // Parse and add JSON fields
//             if (business.automationGoals) {
//               const automationGoals = JSON.parse(business.automationGoals as string)
//               businessVariables.primary_goal = automationGoals.primaryGoal || ""
//               businessVariables.response_time = automationGoals.responseTime?.toString() || ""
//               businessVariables.custom_goals = automationGoals.customGoals || ""
//             }

//             if (business.customerJourney) {
//               const customerJourney = JSON.parse(business.customerJourney as string)
//               businessVariables.journey_steps = JSON.stringify(customerJourney.journeySteps || [])
//             }

//             if (business.features) {
//               const features = JSON.parse(business.features as string)
//               businessVariables.enabled_features =
//                 features.features
//                   ?.filter((f: any) => f.enabled)
//                   .map((f: any) => f.name)
//                   .join(", ") || ""
//             }

//             if (business.businessTypeData) {
//               businessVariables.business_type_data = business.businessTypeData as string
//             }

//             if (business.websiteAnalysis) {
//               businessVariables.website_analysis = business.websiteAnalysis as string
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching business:", error)
//         }
//       }

//       // Get Voiceflow response
//       let voiceflowResponse =
//         "I'm sorry, but I'm having trouble processing your request right now. Please try again later."
//       let voiceflowVariables: VoiceflowVariables = {}

//       try {
//         const { response, variables } = await getVoiceflowResponse(userMessage, userId, businessVariables)
//         voiceflowResponse = processVoiceflowResponse(response)
//         voiceflowVariables = variables

//         // Store marketing info if available
//         if (voiceflowVariables.clientname || voiceflowVariables.clientemail || voiceflowVariables.clientphone) {
//           try {
//             const marketingInfo = {
//               name: voiceflowVariables.clientname,
//               email: voiceflowVariables.clientemail,
//               phone: voiceflowVariables.clientphone,
//             }
//             await createMarketingInfoAction(marketingInfo)
//           } catch (error) {
//             console.error("Error storing marketing info:", error)
//           }
//         }

//         // Store conversation
//         await storeConversationMessage(phoneNumberId, senderId, userMessage, false, automation?.id || null)
//         await storeConversationMessage(phoneNumberId, "bot", voiceflowResponse, true, automation?.id || null)

//         // Send WhatsApp response
//         const whatsappResponse = await sendWhatsAppMessage(
//           phoneNumberId,
//           senderId,
//           voiceflowResponse,
//           whatsappToken
//         )

//         if (whatsappResponse.status === 200) {
//           if (automation) {
//             await trackResponses(automation.id, "WHATSAPP")
//           }
//           await createChatHistory(automation?.id || "default", phoneNumberId, senderId, userMessage)
//           await createChatHistory(automation?.id || "default", phoneNumberId, senderId, voiceflowResponse)
//           return NextResponse.json({ message: "Message sent" }, { status: 200 })
//         }
//       } catch (error) {
//         console.error("Error in Voiceflow processing:", error)
//       }
//     } else {
//       // Free users get OpenAI
//       console.log("Using OpenAI for free user")

//       if (automation && automation.trigger) {
//         if (automation.listener && automation.listener.listener === "MESSAGE") {
//           const whatsappResponse = await sendWhatsAppMessage(
//             phoneNumberId,
//             senderId,
//             automation.listener?.prompt,
//             whatsappToken
//           )

//           if (whatsappResponse.status === 200) {
//             const tracked = await trackResponses(automation.id, "WHATSAPP")
//             if (tracked) {
//               return NextResponse.json({ message: "Message sent" }, { status: 200 })
//             }
//           }
//         }

//         if (automation.listener && automation.listener.listener === "SMARTAI") {
//           const smart_ai_message = await openai.chat.completions.create({
//             model: "gpt-4o",
//             messages: [
//               {
//                 role: "assistant",
//                 content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
//               },
//             ],
//           })

//           if (smart_ai_message.choices[0].message.content) {
//             const reciever = createChatHistory(
//               automation.id,
//               phoneNumberId,
//               senderId,
//               userMessage
//             )

//             const sender = createChatHistory(
//               automation.id,
//               phoneNumberId,
//               senderId,
//               smart_ai_message.choices[0].message.content
//             )

//             await client.$transaction([reciever, sender])

//             const whatsappResponse = await sendWhatsAppMessage(
//               phoneNumberId,
//               senderId,
//               smart_ai_message.choices[0].message.content,
//               whatsappToken
//             )

//             if (whatsappResponse.status === 200) {
//               const tracked = await trackResponses(automation.id, "WHATSAPP")
//               if (tracked) {
//                 return NextResponse.json({ message: "Message sent" }, { status: 200 })
//               }
//             }
//           }
//         }
//       }

//       // Handle continued conversations for free users
//       if (!matcher) {
//         const customer_history = await getChatHistory(phoneNumberId, senderId)

//         if (customer_history.history.length > 0) {
//           const automation = await findAutomation(customer_history.automationId!)

//           if (automation?.listener?.listener === "SMARTAI") {
//             const smart_ai_message = await openai.chat.completions.create({
//               model: "gpt-4o",
//               messages: [
//                 {
//                   role: "assistant",
//                   content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
//                 },
//                 ...customer_history.history,
//                 {
//                   role: "user",
//                   content: userMessage,
//                 },
//               ],
//             })

//             if (smart_ai_message.choices[0].message.content) {
//               const reciever = createChatHistory(
//                 automation.id,
//                 phoneNumberId,
//                 senderId,
//                 userMessage
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 phoneNumberId,
//                 senderId,
//                 smart_ai_message.choices[0].message.content
//               )

//               await client.$transaction([reciever, sender])

//               const whatsappResponse = await sendWhatsAppMessage(
//                 phoneNumberId,
//                 senderId,
//                 smart_ai_message.choices[0].message.content,
//                 whatsappToken
//               )

//               if (whatsappResponse.status === 200) {
//                 return NextResponse.json({ message: "Message sent" }, { status: 200 })
//               }
//             }
//           }
//         }
//       }
//     }

//     return NextResponse.json({ message: "Request processed" }, { status: 200 })
//   } catch (error) {
//     console.error("Unhandled error in WhatsApp webhook POST function:", error)
//     return NextResponse.json(
//       {
//         message: "Error processing request",
//         error: error instanceof Error ? error.message : String(error),
//         stack: error instanceof Error ? error.stack : undefined,
//       },
//       { status: 500 },
//     )
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { findAutomation } from "@/actions/automations/queries"
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  matchKeyword,
  trackResponses,
} from "@/actions/webhook/queries"
import { sendWhatsAppMessage } from "@/lib/fetch"
import { openai } from "@/lib/openai"
import { client } from "@/lib/prisma"
import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
import { storeConversationMessage } from "@/actions/chats/queries"
import { createMarketingInfoAction } from "@/actions/details"
import type { VoiceflowVariables } from "@/types/voiceflow"

export async function GET(req: NextRequest) {
  // WhatsApp webhook verification
  const mode = req.nextUrl.searchParams.get("hub.mode")
  const token = req.nextUrl.searchParams.get("hub.verify_token")
  const challenge = req.nextUrl.searchParams.get("hub.challenge")

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED")
      return new NextResponse(challenge)
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      return new NextResponse("Forbidden", { status: 403 })
    }
  }

  return new NextResponse("Bad Request", { status: 400 })
}

export async function POST(req: NextRequest) {
  console.log("WhatsApp webhook POST request received")
  let webhook_payload, matcher, userId, userMessage, senderId
  let phoneNumberId: string = ""

  try {
    webhook_payload = await req.json()
    console.log("Received WhatsApp webhook payload:", JSON.stringify(webhook_payload, null, 2))

    // Extractinformation from WhatsApp webhook payload
    if (
      webhook_payload.object === "whatsapp_business_account" &&
      webhook_payload.entry &&
      webhook_payload.entry[0].changes &&
      webhook_payload.entry[0].changes[0].value.messages &&
      webhook_payload.entry[0].changes[0].value.messages[0]
    ) {
      const change = webhook_payload.entry[0].changes[0]
      phoneNumberId = change.value.metadata.phone_number_id
      senderId = change.value.messages[0].from
      
      // Handle different message types (text, image, etc.)
      if (change.value.messages[0].type === "text") {
        userMessage = change.value.messages[0].text.body
      } else if (change.value.messages[0].type === "interactive") {
        // Handle interactive messages (buttons, list replies)
        userMessage = change.value.messages[0].interactive.button_reply?.title || 
                      change.value.messages[0].interactive.list_reply?.title || 
                      "Interactive message"
      } else {
        // For other message types (image, audio, etc.)
        userMessage = `[${change.value.messages[0].type} message]`
      }
      
      userId = `whatsapp_${phoneNumberId}_${senderId}`
      matcher = await matchKeyword(userMessage)
    } else {
      return NextResponse.json({ message: "Unsupported WhatsApp webhook payload" }, { status: 400 })
    }

    // Check if the conversation is already active
    const conversationState = await client.conversationState.findUnique({
      where: { userId },
    })

    let isConversationActive = conversationState?.isActive || false

    if (!isConversationActive && !matcher?.automationId) {
      // No keyword match and conversation not active, don't respond
      return NextResponse.json({ message: "No keyword match" }, { status: 200 })
    }

    // Set conversation as active if keyword matched
    if (matcher?.automationId) {
      await client.conversationState.upsert({
        where: { userId },
        update: { isActive: true, updatedAt: new Date() },
        create: { userId, isActive: true },
      })
      isConversationActive = true
    }

    // Get automation details
    let automation
    if (matcher && matcher.automationId) {
      automation = await getKeywordAutomation(matcher.automationId, true)
    } else {
      const customer_history = await getChatHistory(phoneNumberId, senderId)
      if (customer_history.history.length > 0) {
        automation = await findAutomation(customer_history.automationId!)
      }
    }

    // Find the WhatsApp account token
    const whatsappToken = automation?.User?.integrations.find(
      account => account.name === "WHATSAPP" && account.phoneNumber === phoneNumberId
    )?.token || process.env.DEFAULT_WHATSAPP_TOKEN!

    // Handle based on subscription plan
    if (automation?.User?.subscription?.plan === "PRO") {
      // PRO users get Voiceflow
      console.log("Using Voiceflow for PRO user")

      // Create Voiceflow user
      console.log("Attempting to create Voiceflow user:", userId)
      const userCreated = await createVoiceflowUser(userId)
      if (!userCreated) {
        console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
      }

      // Get business context
      let businessVariables: Record<string, string> = {}
      if (automation?.userId) {
        try {
          const business = await client.business.findFirst({
            where: { userId: automation.userId },
          })
          if (business) {
            businessVariables = {
              business_name: business.businessName || "",
              welcome_message: business.welcomeMessage || "",
              business_industry: business.industry || "",
              business_type: business.businessType || "",
              business_description: business.businessDescription || "",
              whatsapp_number: business.whatsappNumber || "",
              website: business.website || "",
              target_audience: business.targetAudience || "",
              response_language: business.responseLanguage || "",
              business_hours: business.businessHours || "",
              auto_reply_enabled: business.autoReplyEnabled ? "Yes" : "No",
              promotion_message: business.promotionMessage || "",
              automation_setup_complete: business.automationSetupComplete ? "Yes" : "No",
              automation_setup_date: business.automationSetupDate?.toISOString() || "",
              automation_additional_notes: business.automationAdditionalNotes || "",
            }

            // Parse and add JSON fields
            if (business.automationGoals) {
              const automationGoals = JSON.parse(business.automationGoals as string)
              businessVariables.primary_goal = automationGoals.primaryGoal || ""
              businessVariables.response_time = automationGoals.responseTime?.toString() || ""
              businessVariables.custom_goals = automationGoals.customGoals || ""
            }

            if (business.customerJourney) {
              const customerJourney = JSON.parse(business.customerJourney as string)
              businessVariables.journey_steps = JSON.stringify(customerJourney.journeySteps || [])
            }

            if (business.features) {
              const features = JSON.parse(business.features as string)
              businessVariables.enabled_features =
                features.features
                  ?.filter((f: any) => f.enabled)
                  .map((f: any) => f.name)
                  .join(", ") || ""
            }

            if (business.businessTypeData) {
              businessVariables.business_type_data = business.businessTypeData as string
            }

            if (business.websiteAnalysis) {
              businessVariables.website_analysis = business.websiteAnalysis as string
            }
          }
        } catch (error) {
          console.error("Error fetching business:", error)
        }
      }

      // Get Voiceflow response
      let voiceflowResponse =
        "I'm sorry, but I'm having trouble processing your request right now. Please try again later."
      let voiceflowVariables: VoiceflowVariables = {}

      try {
        const { response, variables } = await getVoiceflowResponse(userMessage, userId, businessVariables)
        voiceflowResponse = processVoiceflowResponse(response)
        voiceflowVariables = variables

        // Store marketing info if available
        if (voiceflowVariables.clientname || voiceflowVariables.clientemail || voiceflowVariables.clientphone) {
          try {
            const marketingInfo = {
              name: voiceflowVariables.clientname,
              email: voiceflowVariables.clientemail,
              phone: voiceflowVariables.clientphone,
            }
            await createMarketingInfoAction(marketingInfo)
          } catch (error) {
            console.error("Error storing marketing info:", error)
          }
        }

        // Store conversation
        await storeConversationMessage(phoneNumberId, senderId, userMessage, false, automation?.id || null)
        await storeConversationMessage(phoneNumberId, "bot", voiceflowResponse, true, automation?.id || null)

        // Send WhatsApp response
        const whatsappResponse = await sendWhatsAppMessage(
          phoneNumberId,
          senderId,
          voiceflowResponse,
          whatsappToken
        )

        if (whatsappResponse.status === 200) {
          if (automation) {
            await trackResponses(automation.id, "WHATSAPP")
          }
          await createChatHistory(automation?.id || "default", phoneNumberId, senderId, userMessage)
          await createChatHistory(automation?.id || "default", phoneNumberId, senderId, voiceflowResponse)
          return NextResponse.json({ message: "Message sent" }, { status: 200 })
        }
      } catch (error) {
        console.error("Error in Voiceflow processing:", error)
      }
    } else {
      // Free users get OpenAI
      console.log("Using OpenAI for free user")

      if (automation && automation.trigger) {
        if (automation.listener && automation.listener.listener === "MESSAGE") {
          const whatsappResponse = await sendWhatsAppMessage(
            phoneNumberId,
            senderId,
            automation.listener?.prompt,
            whatsappToken
          )

          if (whatsappResponse.status === 200) {
            const tracked = await trackResponses(automation.id, "WHATSAPP")
            if (tracked) {
              return NextResponse.json({ message: "Message sent" }, { status: 200 })
            }
          }
        }

        if (automation.listener && automation.listener.listener === "SMARTAI") {
          const smart_ai_message = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "assistant",
                content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
              },
            ],
          })

          if (smart_ai_message.choices[0].message.content) {
            const reciever = createChatHistory(
              automation.id,
              phoneNumberId,
              senderId,
              userMessage
            )

            const sender = createChatHistory(
              automation.id,
              phoneNumberId,
              senderId,
              smart_ai_message.choices[0].message.content
            )

            await client.$transaction([reciever, sender])

            const whatsappResponse = await sendWhatsAppMessage(
              phoneNumberId,
              senderId,
              smart_ai_message.choices[0].message.content,
              whatsappToken
            )

            if (whatsappResponse.status === 200) {
              const tracked = await trackResponses(automation.id, "WHATSAPP")
              if (tracked) {
                return NextResponse.json({ message: "Message sent" }, { status: 200 })
              }
            }
          }
        }
      }

      // Handle continued conversations for free users
      if (!matcher) {
        const customer_history = await getChatHistory(phoneNumberId, senderId)

        if (customer_history.history.length > 0) {
          const automation = await findAutomation(customer_history.automationId!)

          if (automation?.listener?.listener === "SMARTAI") {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                },
                ...customer_history.history,
                {
                  role: "user",
                  content: userMessage,
                },
              ],
            })

            if (smart_ai_message.choices[0].message.content) {
              const reciever = createChatHistory(
                automation.id,
                phoneNumberId,
                senderId,
                userMessage
              )

              const sender = createChatHistory(
                automation.id,
                phoneNumberId,
                senderId,
                smart_ai_message.choices[0].message.content
              )

              await client.$transaction([reciever, sender])

              const whatsappResponse = await sendWhatsAppMessage(
                phoneNumberId,
                senderId,
                smart_ai_message.choices[0].message.content,
                whatsappToken
              )

              if (whatsappResponse.status === 200) {
                return NextResponse.json({ message: "Message sent" }, { status: 200 })
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ message: "Request processed" }, { status: 200 })
  } catch (error) {
    console.error("Unhandled error in WhatsApp webhook POST function:", error)
    return NextResponse.json(
      {
        message: "Error processing request",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}