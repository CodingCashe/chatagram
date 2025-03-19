import { type NextRequest, NextResponse } from "next/server"
import { findAutomation } from "@/actions/automations/queries"
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  matchKeyword,
  trackResponses,
} from "@/actions/webhook/queries"
import { sendFacebookMessage, sendFacebookComment } from "@/lib/fetch"
import { openai } from "@/lib/openai"
import { client } from "@/lib/prisma"
import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
import { storeConversationMessage } from "@/actions/chats/queries"
import { createMarketingInfoAction } from "@/actions/details"
import type { VoiceflowVariables } from "@/types/voiceflow"

export async function GET(req: NextRequest) {
  // Facebook webhook verification
  const mode = req.nextUrl.searchParams.get("hub.mode")
  const token = req.nextUrl.searchParams.get("hub.verify_token")
  const challenge = req.nextUrl.searchParams.get("hub.challenge")

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === process.env.FACEBOOK_VERIFY_TOKEN) {
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
  console.log("Facebook webhook POST request received")
  let webhook_payload, matcher, userId, userMessage, senderId
  let pageId: string = ""

  try {
    webhook_payload = await req.json()
    console.log("Received Facebook webhook payload:", JSON.stringify(webhook_payload, null, 2))

    // Extract information from Facebook webhook payload
    if (webhook_payload.object === "page") {
      if (webhook_payload.entry[0].messaging) {
        // Handle Facebook Messenger messages
        pageId = webhook_payload.entry[0].id
        senderId = webhook_payload.entry[0].messaging[0].sender.id
        
        if (webhook_payload.entry[0].messaging[0].message && webhook_payload.entry[0].messaging[0].message.text) {
          userMessage = webhook_payload.entry[0].messaging[0].message.text
        } else if (webhook_payload.entry[0].messaging[0].postback) {
          // Handle postback buttons
          userMessage = webhook_payload.entry[0].messaging[0].postback.title || 
                        webhook_payload.entry[0].messaging[0].postback.payload
        } else {
          // Handle other message types
          userMessage = "[Facebook message]"
        }
        
        userId = `facebook_${pageId}_${senderId}`
      } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "feed") {
        // Handle Facebook Page post comments
        pageId = webhook_payload.entry[0].id
        
        // Only process if it's a comment
        if (webhook_payload.entry[0].changes[0].value.item === "comment") {
          senderId = webhook_payload.entry[0].changes[0].value.from.id
          userMessage = webhook_payload.entry[0].changes[0].value.message || ""
          userId = `facebook_${pageId}_${senderId}`
        } else {
          // Skip other feed changes (like posts, reactions)
          return NextResponse.json({ message: "Unsupported feed change" }, { status: 200 })
        }
      } else {
        return NextResponse.json({ message: "Unsupported Facebook webhook payload" }, { status: 400 })
      }
      
      matcher = await matchKeyword(userMessage)
    } else {
      return NextResponse.json({ message: "Unsupported webhook object" }, { status: 400 })
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
      automation = await getKeywordAutomation(matcher.automationId, webhook_payload.entry[0].messaging ? true : false)
    } else {
      const customer_history = await getChatHistory(pageId, senderId)
      if (customer_history.history.length > 0) {
        automation = await findAutomation(customer_history.automationId!)
      }
    }

    // Find the Facebook account token
    const facebookToken = automation?.User?.integrations.find(
      account => account.name === "FACEBOOK" && account.pageId === pageId
    )?.token || process.env.DEFAULT_FACEBOOK_TOKEN!

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
        await storeConversationMessage(pageId, senderId, userMessage, false, automation?.id || null)
        await storeConversationMessage(pageId, "bot", voiceflowResponse, true, automation?.id || null)

        // Send response based on the type of interaction
        if (webhook_payload.entry[0].messaging) {
          // Send Facebook Messenger response
          const messenger_response = await sendFacebookMessage(
            pageId,
            senderId,
            voiceflowResponse,
            facebookToken
          )

          if (messenger_response.status === 200) {
            if (automation) {
              await trackResponses(automation.id, "FACEBOOK_MESSAGE")
            }
            await createChatHistory(automation?.id || "default", pageId, senderId, userMessage)
            await createChatHistory(automation?.id || "default", pageId, senderId, voiceflowResponse)
            return NextResponse.json({ message: "Message sent" }, { status: 200 })
          }
        } else if (webhook_payload.entry[0].changes) {
          // Send Facebook comment response
          const comment_response = await sendFacebookComment(
            webhook_payload.entry[0].changes[0].value.post_id || webhook_payload.entry[0].changes[0].value.parent_id,
            webhook_payload.entry[0].changes[0].value.comment_id,
            voiceflowResponse,
            facebookToken
          )

          if (comment_response.status === 200) {
            if (automation) {
              await trackResponses(automation.id, "FACEBOOK_COMMENT")
            }
            return NextResponse.json({ message: "Comment sent" }, { status: 200 })
          }
        }
      } catch (error) {
        console.error("Error in Voiceflow processing:", error)
      }
    } else {
      // Free users get OpenAI
      console.log("Using OpenAI for free user")

      if (webhook_payload.entry[0].messaging) {
        // Handle Facebook Messenger
        if (automation && automation.trigger) {
          if (automation.listener && automation.listener.listener === "MESSAGE") {
            const messenger_response = await sendFacebookMessage(
              pageId,
              senderId,
              automation.listener?.prompt,
              facebookToken
            )

            if (messenger_response.status === 200) {
              const tracked = await trackResponses(automation.id, "FACEBOOK_MESSAGE")
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
                pageId,
                senderId,
                userMessage
              )

              const sender = createChatHistory(
                automation.id,
                pageId,
                senderId,
                smart_ai_message.choices[0].message.content
              )

              await client.$transaction([reciever, sender])

              const messenger_response = await sendFacebookMessage(
                pageId,
                senderId,
                smart_ai_message.choices[0].message.content,
                facebookToken
              )

              if (messenger_response.status === 200) {
                const tracked = await trackResponses(automation.id, "FACEBOOK_MESSAGE")
                if (tracked) {
                  return NextResponse.json({ message: "Message sent" }, { status: 200 })
                }
              }
            }
          }
        }
      } else if (webhook_payload.entry[0].changes) {
        // Handle Facebook comments
        if (automation && automation.trigger) {
          if (automation.listener && automation.listener.listener === "MESSAGE") {
            const comment_response = await sendFacebookComment(
              webhook_payload.entry[0].changes[0].value.post_id || webhook_payload.entry[0].changes[0].value.parent_id,
              webhook_payload.entry[0].changes[0].value.comment_id,
              automation.listener?.prompt,
              facebookToken
            )

            if (comment_response.status === 200) {
              const tracked = await trackResponses(automation.id, "FACEBOOK_COMMENT")
              if (tracked) {
                return NextResponse.json({ message: "Comment sent" }, { status: 200 })
              }
            }
          }

          if (automation.listener && automation.listener.listener === "SMARTAI") {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                },
              ],
            })

            if (smart_ai_message.choices[0].message.content) {
              const comment_response = await sendFacebookComment(
                webhook_payload.entry[0].changes[0].value.post_id || webhook_payload.entry[0].changes[0].value.parent_id,
                webhook_payload.entry[0].changes[0].value.comment_id,
                smart_ai_message.choices[0].message.content,
                facebookToken
              )

              if (comment_response.status === 200) {
                const tracked = await trackResponses(automation.id, "FACEBOOK_COMMENT")
                if (tracked) {
                  return NextResponse.json({ message: "Comment sent" }, { status: 200 })
                }
              }
            }
          }
        }
      }

      // Handle continued conversations for free users
      if (!matcher && webhook_payload.entry[0].messaging) {
        const customer_history = await getChatHistory(pageId, senderId)

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
                pageId,
                senderId,
                userMessage
              )

              const sender = createChatHistory(
                automation.id,
                pageId,
                senderId,
                smart_ai_message.choices[0].message.content
              )

              await client.$transaction([reciever, sender])

              const messenger_response = await sendFacebookMessage(
                pageId,
                senderId,
                smart_ai_message.choices[0].message.content,
                facebookToken
              )

              if (messenger_response.status === 200) {
                return NextResponse.json({ message: "Message sent" }, { status: 200 })
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ message: "Request processed" }, { status: 200 })
  } catch (error) {
    console.error("Unhandled error in Facebook webhook POST function:", error)
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