// import { type NextRequest, NextResponse } from "next/server"
// import { client } from "@/lib/prisma"
// import { sendWhatsAppMessage } from "@/lib/whatsapp-api"

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()

//     // WhatsApp sends different types of webhooks
//     // We're interested in the messages
//     if (body.object === "whatsapp_business_account") {
//       if (body.entry && body.entry.length > 0) {
//         const entry = body.entry[0]

//         if (entry.changes && entry.changes.length > 0) {
//           const change = entry.changes[0]

//           // Handle incoming messages
//           if (change.value && change.value.messages && change.value.messages.length > 0) {
//             const message = change.value.messages[0]
//             const from = message.from // The WhatsApp ID of the user
//             const messageBody = message.text?.body // The message content
//             const phoneNumberId = change.value.metadata.phone_number_id

//             // Find the WhatsApp account associated with this phone number ID
//             const whatsappBusiness = await client.whatsAppBusiness.findUnique({
//               where: { phoneNumberId },
//             })

//             if (!whatsappBusiness) {
//               console.error(`No WhatsApp business found for phone number ID: ${phoneNumberId}`)
//               return NextResponse.json({ status: "error", message: "Account not found" })
//             }

//             // Check if this is a new conversation
//             const isFirstMessage = change.value.contacts?.[0]?.wa_id === from

//             if (messageBody) {
//               // Get automations for this WhatsApp account
//               const rules = await client.whatsAppRule.findMany({
//                 where: {
//                   whatsappBusinessId: whatsappBusiness.id,
//                   isActive: true,
//                 },
//               })

//               // Check for keyword triggers
//               const keywordRule = findMatchingKeywordRule(rules, messageBody)
//               if (keywordRule) {
//                 await sendWhatsAppMessage(
//                   whatsappBusiness.phoneNumberId,
//                   whatsappBusiness.accessToken,
//                   from,
//                   keywordRule.response,
//                 )

//                 // Log this automation trigger
//                 await logRuleTrigger(whatsappBusiness.id)

//                 return NextResponse.json({ status: "success" })
//               }

//               // Check for new chat trigger if this is the first message
//               if (isFirstMessage) {
//                 const newChatRule = findNewChatRule(rules)
//                 if (newChatRule) {
//                   await sendWhatsAppMessage(
//                     whatsappBusiness.phoneNumberId,
//                     whatsappBusiness.accessToken,
//                     from,
//                     newChatRule.response,
//                   )

//                   // Log this automation trigger
//                   await logRuleTrigger(whatsappBusiness.id)

//                   return NextResponse.json({ status: "success" })
//                 }
//               }

//               // Handle media messages
//               if (message.type === "image" || message.type === "video" || message.type === "document") {
//                 const mediaRule = findMediaRule(rules)
//                 if (mediaRule) {
//                   await sendWhatsAppMessage(
//                     whatsappBusiness.phoneNumberId,
//                     whatsappBusiness.accessToken,
//                     from,
//                     mediaRule.response,
//                   )

//                   // Log this automation trigger
//                   await logRuleTrigger(whatsappBusiness.id)

//                   return NextResponse.json({ status: "success" })
//                 }
//               }

//               // Handle location sharing
//               if (message.type === "location") {
//                 const locationRule = findLocationRule(rules)
//                 if (locationRule) {
//                   await sendWhatsAppMessage(
//                     whatsappBusiness.phoneNumberId,
//                     whatsappBusiness.accessToken,
//                     from,
//                     locationRule.response,
//                   )

//                   // Log this automation trigger
//                   await logRuleTrigger(whatsappBusiness.id)

//                   return NextResponse.json({ status: "success" })
//                 }
//               }
//             }

//             // Handle button responses
//             if (message.interactive && message.interactive.button_reply) {
//               const buttonId = message.interactive.button_reply.id
//               const buttonRule = findButtonRule(rules, buttonId)
//               if (buttonRule) {
//                 await sendWhatsAppMessage(
//                   whatsappBusiness.phoneNumberId,
//                   whatsappBusiness.accessToken,
//                   from,
//                   buttonRule.response,
//                 )

//                 // Log this automation trigger
//                 await logRuleTrigger(whatsappBusiness.id)

//                 return NextResponse.json({ status: "success" })
//               }
//             }
//           }
//         }
//       }
//     }

//     return NextResponse.json({ status: "success" })
//   } catch (error) {
//     console.error("Error processing webhook:", error)
//     return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
//   }
// }

// // GET handler for webhook verification
// export async function GET(request: NextRequest) {
//   // WhatsApp webhook verification
//   const searchParams = request.nextUrl.searchParams
//   const mode = searchParams.get("hub.mode")
//   const token = searchParams.get("hub.verify_token")
//   const challenge = searchParams.get("hub.challenge")

//   // Find the WhatsApp account with this verify token
//   if (mode === "subscribe" && token) {
//     const whatsappBusiness = await client.whatsAppBusiness.findFirst({
//       where: { webhookSecret: token },
//     })

//     if (whatsappBusiness) {
//       return new Response(challenge, { status: 200 })
//     }
//   }

//   return new Response("Verification failed", { status: 403 })
// }

// // Helper functions for finding matching automations
// function findMatchingKeywordRule(rules: any[], messageText: string) {
//   return rules.find((rule) => {
//     if (rule.trigger === "keyword" && rule.triggerValue) {
//       const keywords = rule.triggerValue.split(",").map((k: string) => k.trim().toLowerCase())
//       const messageLower = messageText.toLowerCase()

//       return keywords.some((keyword) => messageLower.includes(keyword))
//     }
//     return false
//   })
// }

// function findNewChatRule(rules: any[]) {
//   return rules.find((rule) => rule.trigger === "new_chat")
// }

// function findMediaRule(rules: any[]) {
//   return rules.find((rule) => rule.trigger === "media")
// }

// function findLocationRule(rules: any[]) {
//   return rules.find((rule) => rule.trigger === "location")
// }

// function findButtonRule(rules: any[], buttonId: string) {
//   return rules.find((rule) => rule.trigger === "button_click" && rule.triggerValue === buttonId)
// }

// // Log automation triggers for analytics
// async function logRuleTrigger(whatsappBusinessId: string) {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   // Find or create analytics record for today
//   const stats = await client.whatsAppStat.findFirst({
//     where: {
//       whatsappBusinessId,
//       date: {
//         gte: today,
//         lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
//       },
//     },
//   })

//   if (stats) {
//     // Update existing record
//     await client.whatsAppStat.update({
//       where: { id: stats.id },
//       data: {
//         automationTriggered: stats.automationTriggered + 1,
//         messagesSent: stats.messagesSent + 1,
//       },
//     })
//   } else {
//     // Create new record
//     await client.whatsAppStat.create({
//       data: {
//         whatsappBusinessId,
//         automationTriggered: 1,
//         messagesSent: 1,
//       },
//     })
//   }
// }

// import { type NextRequest, NextResponse } from "next/server"
// import { client } from "@/lib/prisma"
// import { sendWhatsAppMessage } from "@/lib/whatsapp-api"

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()

//     // WhatsApp sends different types of webhooks
//     // We're interested in the messages
//     if (body.object === "whatsapp_business_account") {
//       if (body.entry && body.entry.length > 0) {
//         const entry = body.entry[0]

//         if (entry.changes && entry.changes.length > 0) {
//           const change = entry.changes[0]

//           // Handle incoming messages
//           if (change.value && change.value.messages && change.value.messages.length > 0) {
//             const message = change.value.messages[0]
//             const from = message.from // The WhatsApp ID of the user
//             const messageBody = message.text?.body // The message content
//             const phoneNumberId = change.value.metadata.phone_number_id

//             // Find the WhatsApp account associated with this phone number ID
//             const whatsappBusiness = await client.whatsAppBusiness.findUnique({
//               where: { phoneNumberId },
//             })

//             if (!whatsappBusiness) {
//               console.error(`No WhatsApp business found for phone number ID: ${phoneNumberId}`)
//               return NextResponse.json({ status: "error", message: "Account not found" })
//             }

//             // Check if this is a new conversation
//             const isFirstMessage = change.value.contacts?.[0]?.wa_id === from

//             if (messageBody) {
//               // Get automations for this WhatsApp account
//               const rules = await client.whatsAppRule.findMany({
//                 where: {
//                   whatsappBusinessId: whatsappBusiness.id,
//                   isActive: true,
//                 },
//               })

//               // Check for keyword triggers
//               const keywordRule = findMatchingKeywordRule(rules, messageBody)
//               if (keywordRule) {
//                 await sendWhatsAppMessage(
//                   whatsappBusiness.phoneNumberId,
//                   whatsappBusiness.accessToken,
//                   from,
//                   keywordRule.response,
//                 )

//                 // Log this automation trigger
//                 await logRuleTrigger(whatsappBusiness.id)

//                 return NextResponse.json({ status: "success" })
//               }

//               // Check for new chat trigger if this is the first message
//               if (isFirstMessage) {
//                 const newChatRule = findNewChatRule(rules)
//                 if (newChatRule) {
//                   await sendWhatsAppMessage(
//                     whatsappBusiness.phoneNumberId,
//                     whatsappBusiness.accessToken,
//                     from,
//                     newChatRule.response,
//                   )

//                   // Log this automation trigger
//                   await logRuleTrigger(whatsappBusiness.id)

//                   return NextResponse.json({ status: "success" })
//                 }
//               }

//               // Handle media messages
//               if (message.type === "image" || message.type === "video" || message.type === "document") {
//                 const mediaRule = findMediaRule(rules)
//                 if (mediaRule) {
//                   await sendWhatsAppMessage(
//                     whatsappBusiness.phoneNumberId,
//                     whatsappBusiness.accessToken,
//                     from,
//                     mediaRule.response,
//                   )

//                   // Log this automation trigger
//                   await logRuleTrigger(whatsappBusiness.id)

//                   return NextResponse.json({ status: "success" })
//                 }
//               }

//               // Handle location sharing
//               if (message.type === "location") {
//                 const locationRule = findLocationRule(rules)
//                 if (locationRule) {
//                   await sendWhatsAppMessage(
//                     whatsappBusiness.phoneNumberId,
//                     whatsappBusiness.accessToken,
//                     from,
//                     locationRule.response,
//                   )

//                   // Log this automation trigger
//                   await logRuleTrigger(whatsappBusiness.id)

//                   return NextResponse.json({ status: "success" })
//                 }
//               }
//             }

//             // Handle button responses
//             if (message.interactive && message.interactive.button_reply) {
//               const buttonId = message.interactive.button_reply.id
//               const buttonRule = findButtonRule(rules, buttonId)
//               if (buttonRule) {
//                 await sendWhatsAppMessage(
//                   whatsappBusiness.phoneNumberId,
//                   whatsappBusiness.accessToken,
//                   from,
//                   buttonRule.response,
//                 )

//                 // Log this automation trigger
//                 await logRuleTrigger(whatsappBusiness.id)

//                 return NextResponse.json({ status: "success" })
//               }
//             }
//           }
//         }
//       }
//     }

//     return NextResponse.json({ status: "success" })
//   } catch (error) {
//     console.error("Error processing webhook:", error)
//     return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
//   }
// }

// // GET handler for webhook verification
// export async function GET(request: NextRequest) {
//   // WhatsApp webhook verification
//   const searchParams = request.nextUrl.searchParams
//   const mode = searchParams.get("hub.mode")
//   const token = searchParams.get("hub.verify_token")
//   const challenge = searchParams.get("hub.challenge")

//   // Find the WhatsApp account with this verify token
//   if (mode === "subscribe" && token) {
//     const whatsappBusiness = await client.whatsAppBusiness.findFirst({
//       where: { webhookSecret: token },
//     })

//     if (whatsappBusiness) {
//       return new Response(challenge, { status: 200 })
//     }
//   }

//   return new Response("Verification failed", { status: 403 })
// }

// // Helper functions for finding matching automations
// function findMatchingKeywordRule(rules: any[], messageText: string) {
//   return rules.find((rule) => {
//     if (rule.trigger === "keyword" && rule.triggerValue) {
//       const keywords = rule.triggerValue.split(",").map((k: string) => k.trim().toLowerCase())
//       const messageLower = messageText.toLowerCase()

//       return keywords.some((keyword: string) => messageLower.includes(keyword))
//     }
//     return false
//   })
// }

// function findNewChatRule(rules: any[]) {
//   return rules.find((rule) => rule.trigger === "new_chat")
// }

// function findMediaRule(rules: any[]) {
//   return rules.find((rule) => rule.trigger === "media")
// }

// function findLocationRule(rules: any[]) {
//   return rules.find((rule) => rule.trigger === "location")
// }

// function findButtonRule(rules: any[], buttonId: string) {
//   return rules.find((rule) => rule.trigger === "button_click" && rule.triggerValue === buttonId)
// }

// // Log automation triggers for analytics
// async function logRuleTrigger(whatsappBusinessId: string) {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   // Find or create analytics record for today
//   const stats = await client.whatsAppStat.findFirst({
//     where: {
//       whatsappBusinessId,
//       date: {
//         gte: today,
//         lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
//       },
//     },
//   })

//   if (stats) {
//     // Update existing record
//     await client.whatsAppStat.update({
//       where: { id: stats.id },
//       data: {
//         automationTriggered: stats.automationTriggered + 1,
//         messagesSent: stats.messagesSent + 1,
//       },
//     })
//   } else {
//     // Create new record
//     await client.whatsAppStat.create({
//       data: {
//         whatsappBusinessId,
//         automationTriggered: 1,
//         messagesSent: 1,
//       },
//     })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { sendWhatsAppMessage } from "@/lib/whatsapp-api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // WhatsApp sends different types of webhooks
    // We're interested in the messages
    if (body.object === "whatsapp_business_account") {
      if (body.entry && body.entry.length > 0) {
        const entry = body.entry[0]

        if (entry.changes && entry.changes.length > 0) {
          const change = entry.changes[0]

          // Handle incoming messages
          if (change.value && change.value.messages && change.value.messages.length > 0) {
            const message = change.value.messages[0]
            const from = message.from // The WhatsApp ID of the user
            const messageBody = message.text?.body // The message content
            const phoneNumberId = change.value.metadata.phone_number_id

            // Find the WhatsApp account associated with this phone number ID
            const whatsappBusiness = await client.whatsAppBusiness.findUnique({
              where: { phoneNumberId },
            })

            if (!whatsappBusiness) {
              console.error(`No WhatsApp business found for phone number ID: ${phoneNumberId}`)
              return NextResponse.json({ status: "error", message: "Account not found" })
            }

            // Get all active rules for this WhatsApp account at the start
            const rules = await client.whatsAppRule.findMany({
              where: {
                whatsappBusinessId: whatsappBusiness.id,
                isActive: true,
              },
            })

            // Check if this is a new conversation
            const isFirstMessage = change.value.contacts?.[0]?.wa_id === from

            if (messageBody) {
              // Check for keyword triggers
              const keywordRule = findMatchingKeywordRule(rules, messageBody)
              if (keywordRule) {
                await sendWhatsAppMessage(
                  whatsappBusiness.phoneNumberId,
                  whatsappBusiness.accessToken,
                  from,
                  keywordRule.response,
                )

                // Log this automation trigger
                await logRuleTrigger(whatsappBusiness.id)

                return NextResponse.json({ status: "success" })
              }

              // Check for new chat trigger if this is the first message
              if (isFirstMessage) {
                const newChatRule = findNewChatRule(rules)
                if (newChatRule) {
                  await sendWhatsAppMessage(
                    whatsappBusiness.phoneNumberId,
                    whatsappBusiness.accessToken,
                    from,
                    newChatRule.response,
                  )

                  // Log this automation trigger
                  await logRuleTrigger(whatsappBusiness.id)

                  return NextResponse.json({ status: "success" })
                }
              }
            }

            // Handle media messages
            if (message.type === "image" || message.type === "video" || message.type === "document") {
              const mediaRule = findMediaRule(rules)
              if (mediaRule) {
                await sendWhatsAppMessage(
                  whatsappBusiness.phoneNumberId,
                  whatsappBusiness.accessToken,
                  from,
                  mediaRule.response,
                )

                // Log this automation trigger
                await logRuleTrigger(whatsappBusiness.id)

                return NextResponse.json({ status: "success" })
              }
            }

            // Handle location sharing
            if (message.type === "location") {
              const locationRule = findLocationRule(rules)
              if (locationRule) {
                await sendWhatsAppMessage(
                  whatsappBusiness.phoneNumberId,
                  whatsappBusiness.accessToken,
                  from,
                  locationRule.response,
                )

                // Log this automation trigger
                await logRuleTrigger(whatsappBusiness.id)

                return NextResponse.json({ status: "success" })
              }
            }

            // Handle button responses
            if (message.interactive && message.interactive.button_reply) {
              const buttonId = message.interactive.button_reply.id
              const buttonRule = findButtonRule(rules, buttonId)
              if (buttonRule) {
                await sendWhatsAppMessage(
                  whatsappBusiness.phoneNumberId,
                  whatsappBusiness.accessToken,
                  from,
                  buttonRule.response,
                )

                // Log this automation trigger
                await logRuleTrigger(whatsappBusiness.id)

                return NextResponse.json({ status: "success" })
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }
}

// GET handler for webhook verification
export async function GET(request: NextRequest) {
  // WhatsApp webhook verification
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")
  const TESTING_TOKEN = "testing"

  if (mode === "subscribe" && token === TESTING_TOKEN){
    return new Response(challenge,{status: 200}) 
  }

  // Find the WhatsApp account with this verify token
  if (mode === "subscribe" && token) {
    const whatsappBusiness = await client.whatsAppBusiness.findFirst({
      where: { webhookSecret: token },
    })

    if (whatsappBusiness) {
      return new Response(challenge, { status: 200 })
    }
  }

  return new Response("Verification failed", { status: 403 })
}

// Helper functions for finding matching automations
function findMatchingKeywordRule(rules: any[], messageText: string) {
  return rules.find((rule) => {
    if (rule.trigger === "keyword" && rule.triggerValue) {
      const keywords = rule.triggerValue.split(",").map((k: string) => k.trim().toLowerCase())
      const messageLower = messageText.toLowerCase()

      return keywords.some((keyword: string) => messageLower.includes(keyword))
    }
    return false
  })
}

function findNewChatRule(rules: any[]) {
  return rules.find((rule) => rule.trigger === "new_chat")
}

function findMediaRule(rules: any[]) {
  return rules.find((rule) => rule.trigger === "media")
}

function findLocationRule(rules: any[]) {
  return rules.find((rule) => rule.trigger === "location")
}

function findButtonRule(rules: any[], buttonId: string) {
  return rules.find((rule) => rule.trigger === "button_click" && rule.triggerValue === buttonId)
}

// Log automation triggers for analytics
async function logRuleTrigger(whatsappBusinessId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find or create analytics record for today
  const stats = await client.whatsAppStat.findFirst({
    where: {
      whatsappBusinessId,
      date: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  })

  if (stats) {
    // Update existing record
    await client.whatsAppStat.update({
      where: { id: stats.id },
      data: {
        automationTriggered: stats.automationTriggered + 1,
        messagesSent: stats.messagesSent + 1,
      },
    })
  } else {
    // Create new record
    await client.whatsAppStat.create({
      data: {
        whatsappBusinessId,
        automationTriggered: 1,
        messagesSent: 1,
      },
    })
  }
}