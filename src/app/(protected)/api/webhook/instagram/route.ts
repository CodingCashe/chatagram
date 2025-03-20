// import { findAutomation } from '@/actions/automations/queries'
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   getKeywordPost,
//   matchKeyword,
//   trackResponses,
// } from '@/actions/webhook/queries'
// import { sendDM, sendPrivateMessage } from '@/lib/fetch'
// import { openai } from '@/lib/openai'
// import { client } from '@/lib/prisma'
// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(req: NextRequest) {
//   const hub = req.nextUrl.searchParams.get('hub.challenge')
//   return new NextResponse(hub)
// }

// export async function POST(req: NextRequest) {
//   const webhook_payload = await req.json()
//   let matcher
//   try {
//     if (webhook_payload.entry[0].messaging) {
//       matcher = await matchKeyword(
//         webhook_payload.entry[0].messaging[0].message.text
//       )
//     }

//     if (webhook_payload.entry[0].changes) {
//       matcher = await matchKeyword(
//         webhook_payload.entry[0].changes[0].value.text
//       )
//     }

//     if (matcher && matcher.automationId) {
//       console.log('Matched')
//       // We have a keyword matcher

//       if (webhook_payload.entry[0].messaging) {
//         const automation = await getKeywordAutomation(
//           matcher.automationId,
//           true
//         )

//         if (automation && automation.trigger) {
//           if (
//             automation.listener &&
//             automation.listener.listener === 'MESSAGE'
//           ) {
//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               automation.listener?.prompt,
//               automation.User?.integrations[0].token!
//             )

//             if (direct_message.status === 200) {
//               const tracked = await trackResponses(automation.id, 'DM')
//               if (tracked) {
//                 return NextResponse.json(
//                   {
//                     message: 'Message sent',
//                   },
//                   { status: 200 }
//                 )
//               }
//             }
//           }

//           if (
//             automation.listener &&
//             automation.listener.listener === 'SMARTAI' &&
//             automation.User?.subscription?.plan === 'PRO'
//           ) {
//             const smart_ai_message = await openai.chat.completions.create({
//               model: 'gpt-4o',
//               messages: [
//                 {
//                   role: 'assistant',
//                   content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
//                 },
//               ],
//             })

//             if (smart_ai_message.choices[0].message.content) {
//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 webhook_payload.entry[0].messaging[0].message.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendDM(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content,
//                 automation.User?.integrations[0].token!
//               )

//               if (direct_message.status === 200) {
//                 const tracked = await trackResponses(automation.id, 'DM')
//                 if (tracked) {
//                   return NextResponse.json(
//                     {
//                       message: 'Message sent',
//                     },
//                     { status: 200 }
//                   )
//                 }
//               }
//             }
//           }
//         }
//       }

//       if (
//         webhook_payload.entry[0].changes &&
//         webhook_payload.entry[0].changes[0].field === 'comments'
//       ) {
//         const automation = await getKeywordAutomation(
//           matcher.automationId,
//           false
//         )

       

//         const automations_post = await getKeywordPost(
//           webhook_payload.entry[0].changes[0].value.media.id,
//           automation?.id!
//         )

       

//         if (automation && automations_post && automation.trigger) {
//           console.log('first if')
//           if (automation.listener) {
//             console.log('first if')
//             if (automation.listener.listener === 'MESSAGE') {
//               console.log(
//                 'SENDING DM, WEB HOOK PAYLOAD',
//                 webhook_payload,
//                 'changes',
//                 webhook_payload.entry[0].changes[0].value.from
//               )

//               console.log(
//                 'COMMENT VERSION:',
//                 webhook_payload.entry[0].changes[0].value.from.id
//               )

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 automation.listener?.prompt,
//                 automation.User?.integrations[0].token!
//               )

//               console.log('DM SENT', direct_message.data)
//               if (direct_message.status === 200) {
//                 const tracked = await trackResponses(automation.id, 'COMMENT')

//                 if (tracked) {
//                   return NextResponse.json(
//                     {
//                       message: 'Message sent',
//                     },
//                     { status: 200 }
//                   )
//                 }
//               }
//             }
//             if (
//               automation.listener.listener === 'SMARTAI' &&
//               automation.User?.subscription?.plan === 'PRO'
//             ) {
//               const smart_ai_message = await openai.chat.completions.create({
//                 model: 'gpt-4o',
//                 messages: [
//                   {
//                     role: 'assistant',
//                     content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
//                   },
//                 ],
//               })
//               if (smart_ai_message.choices[0].message.content) {
//                 const reciever = createChatHistory(
//                   automation.id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   webhook_payload.entry[0].changes[0].value.text
//                 )

//                 const sender = createChatHistory(
//                   automation.id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   smart_ai_message.choices[0].message.content
//                 )

//                 await client.$transaction([reciever, sender])

//                 const direct_message = await sendPrivateMessage(
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.id,
//                   automation.listener?.prompt,
//                   automation.User?.integrations[0].token!
//                 )

//                 if (direct_message.status === 200) {
//                   const tracked = await trackResponses(automation.id, 'COMMENT')

//                   if (tracked) {
//                     return NextResponse.json(
//                       {
//                         message: 'Message sent',
//                       },
//                       { status: 200 }
//                     )
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     if (!matcher) {
//       const customer_history = await getChatHistory(
//         webhook_payload.entry[0].messaging[0].recipient.id,
//         webhook_payload.entry[0].messaging[0].sender.id
//       )

//       if (customer_history.history.length > 0) {
//         const automation = await findAutomation(customer_history.automationId!)

//         if (
//           automation?.User?.subscription?.plan === 'PRO' &&
//           automation.listener?.listener === 'SMARTAI'
//         ) {
//           const smart_ai_message = await openai.chat.completions.create({
//             model: 'gpt-4o',
//             messages: [
//               {
//                 role: 'assistant',
//                 content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
//               },
//               ...customer_history.history,
//               {
//                 role: 'user',
//                 content: webhook_payload.entry[0].messaging[0].message.text,
//               },
//             ],
//           })

//           if (smart_ai_message.choices[0].message.content) {
//             const reciever = createChatHistory(
//               automation.id,
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               webhook_payload.entry[0].messaging[0].message.text
//             )

//             const sender = createChatHistory(
//               automation.id,
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               smart_ai_message.choices[0].message.content
//             )
//             await client.$transaction([reciever, sender])
//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               smart_ai_message.choices[0].message.content,
//               automation.User?.integrations[0].token!
//             )

//             if (direct_message.status === 200) {
//               //if successfully sent we return

//               return NextResponse.json(
//                 {
//                   message: 'Message sent',
//                 },
//                 { status: 200 }
//               )
//             }
//           }
//         }
//       }

//       return NextResponse.json(
//         {
//           message: 'No automation set',
//         },
//         { status: 200 }
//       )
//     }
//     return NextResponse.json(
//       {
//         message: 'No automation set',
//       },
//       { status: 200 }
//     )
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: 'No automation set',
//       },
//       { status: 200 }
//     )
//   }
// }








// WORKIIIIINNNG

// import { NextRequest, NextResponse } from 'next/server'
// import { findAutomation } from '@/actions/automations/queries'
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   getKeywordPost,
//   matchKeyword,
//   trackResponses,
// } from '@/actions/webhook/queries'
// import { sendDM, sendPrivateMessage } from '@/lib/fetch'
// import { client } from '@/lib/prisma'
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from '@/lib/voiceflow'

// export async function GET(req: NextRequest) {
//   const hub = req.nextUrl.searchParams.get('hub.challenge')
//   return new NextResponse(hub)
// }

// export async function POST(req: NextRequest) {
//   const webhook_payload = await req.json()
//   let matcher

//   try {
//     console.log('Received webhook payload:', JSON.stringify(webhook_payload, null, 2))

//     let userId, userMessage, pageId, senderId

//     if (webhook_payload.entry[0].messaging) {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].messaging[0].sender.id
//       userMessage = webhook_payload.entry[0].messaging[0].message.text
//       userId = `${pageId}_${senderId}`
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === 'comments') {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].changes[0].value.from.id
//       userMessage = webhook_payload.entry[0].changes[0].value.text
//       userId = `${pageId}_${senderId}`
//     } else {
//       return NextResponse.json({ message: 'Unsupported webhook payload' }, { status: 400 })
//     }

//     // Check if the conversation is already active
//     let conversationState = await client.conversationState.findUnique({
//       where: { userId }
//     })

//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       matcher = await matchKeyword(userMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return NextResponse.json({ message: 'No keyword match' }, { status: 200 })
//       }

//       // Keyword matched, set the conversation as active
//       await client.conversationState.upsert({
//         where: { userId },
//         update: { isActive: true, updatedAt: new Date() },
//         create: { userId, isActive: true }
//       })
//       isConversationActive = true
//     }

//     console.log('Attempting to create Voiceflow user:', userId)
//     const userCreated = await createVoiceflowUser(userId)
//     if (!userCreated) {
//       console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//     }

//     let automation
//     if (matcher && matcher.automationId) {
//       automation = await getKeywordAutomation(matcher.automationId, webhook_payload.entry[0].messaging ? true : false)
//     } else {
//       const customer_history = await getChatHistory(pageId, senderId)
//       if (customer_history.history.length > 0) {
//         automation = await findAutomation(customer_history.automationId!)
//       }
//     }

//     let voiceflowResponse = "I am sorry, but Im having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     try {
//       const response = await getVoiceflowResponse(userMessage, userId)
//       voiceflowResponse = processVoiceflowResponse(response)
//     } catch (error) {
//       console.error('Error getting or processing Voiceflow response:', error)
//     }

//     console.log('Processed Voiceflow response:', voiceflowResponse)

//     if (webhook_payload.entry[0].messaging) {
//       const direct_message = await sendDM(
//         pageId,
//         senderId,
//         voiceflowResponse,
//         automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!
//       )

//       if (direct_message.status === 200) {
//         if (automation) {
//           await trackResponses(automation.id, 'DM')
//         }
//         // Store chat history
//         await client.$transaction([
//           createChatHistory(automation?.id || 'default', pageId, senderId, userMessage),
//           createChatHistory(automation?.id || 'default', pageId, senderId, voiceflowResponse)
//         ])
//         return NextResponse.json({ message: 'Message sent' }, { status: 200 })
//       }
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === 'comments') {
//       if (automation && automation.listener) {
//         if (automation.listener.listener === 'MESSAGE' || 
//             (automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO')) {
//           const direct_message = await sendPrivateMessage(
//             pageId,
//             webhook_payload.entry[0].changes[0].value.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           console.log('Private message sent:', direct_message.data)
//           if (direct_message.status === 200) {
//             await trackResponses(automation.id, 'COMMENT')
//             // Store chat history
//             await client.$transaction([
//               createChatHistory(automation.id, pageId, senderId, userMessage),
//               createChatHistory(automation.id, pageId, senderId, voiceflowResponse)
//             ])
//             return NextResponse.json({ message: 'Message sent' }, { status: 200 })
//           }
//         }
//       } else {
//         // No automation or listener, use default token
//         const direct_message = await sendPrivateMessage(
//           pageId,
//           webhook_payload.entry[0].changes[0].value.id,
//           voiceflowResponse,
//           process.env.DEFAULT_PAGE_TOKEN!
//         )

//         if (direct_message.status === 200) {
//           // Store chat history
//           await client.$transaction([
//             createChatHistory('default', pageId, senderId, userMessage),
//             createChatHistory('default', pageId, senderId, voiceflowResponse)
//           ])
//           return NextResponse.json({ message: 'Message sent' }, { status: 200 })
//         }
//       }
//     }

//     return NextResponse.json({ message: 'Request processed' }, { status: 200 })
//   } catch (error) {
//     console.error('Unhandled error in POST function:', error)
//     return NextResponse.json(
//       {
//         message: 'Error processing request',
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     )
//   }
// }

//ALSO WORKIIIIIING

// import { NextRequest, NextResponse } from 'next/server'
// import { findAutomation } from '@/actions/automations/queries'
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   matchKeyword,
//   trackResponses,
// } from '@/actions/webhook/queries'
// import { sendDM, sendPrivateMessage } from '@/lib/fetch'
// import { client } from '@/lib/prisma'
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser, fetchBusinessVariables } from '@/lib/voiceflow'

// export async function GET(req: NextRequest) {
//   const hub = req.nextUrl.searchParams.get('hub.challenge')
//   return new NextResponse(hub)
// }

// export async function POST(req: NextRequest) {
//   const webhook_payload = await req.json()
//   let matcher

//   try {
//     console.log('Received webhook payload:', JSON.stringify(webhook_payload, null, 2))

//     let userId, userMessage, pageId, senderId, recipientId

//     if (webhook_payload.entry[0].messaging) {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].messaging[0].sender.id
//       recipientId = webhook_payload.entry[0].messaging[0].recipient.id
//       userMessage = webhook_payload.entry[0].messaging[0].message.text
//       userId = `${pageId}_${senderId}`
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === 'comments') {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].changes[0].value.from.id
//       userMessage = webhook_payload.entry[0].changes[0].value.text
//       userId = `${pageId}_${senderId}`
//     } else {
//       return NextResponse.json({ message: 'Unsupported webhook payload' }, { status: 400 })
//     }

//     // Check if the conversation is already active
//     let conversationState = await client.conversationState.findUnique({
//       where: { userId }
//     })

//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       matcher = await matchKeyword(userMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return NextResponse.json({ message: 'No keyword match' }, { status: 200 })
//       }

//       // Keyword matched, set the conversation as active
//       await client.conversationState.upsert({
//         where: { userId },
//         update: { isActive: true, updatedAt: new Date() },
//         create: { userId, isActive: true }
//       })
//       isConversationActive = true
//     }

//     console.log('Attempting to create Voiceflow user:', userId)
//     const userCreated = await createVoiceflowUser(userId)
//     if (!userCreated) {
//       console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//     }

//     let automation
//     if (matcher && matcher.automationId) {
//       automation = await getKeywordAutomation(matcher.automationId, webhook_payload.entry[0].messaging ? true : false)
//     } else {
//       const customer_history = await getChatHistory(pageId, senderId)
//       if (customer_history.history.length > 0) {
//         automation = await findAutomation(customer_history.automationId!)
//       }
//     }

//     let businessVariables = {}
//     if (automation?.userId) {
//       // Fetch the business associated with the user of this automation
//       const business = await client.business.findFirst({
//         where: { userId: automation.userId }
//       })

//       if (business) {
//         businessVariables = {
//           business_name: business.businessName,
//           welcome_message: business.welcomeMessage,
//           business_industry: business.industry,
//         }
//       }
//     }

//     let voiceflowResponse = "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     try {
//       // Use the businessVariables in the Voiceflow response
//       const response = await getVoiceflowResponse(userMessage, userId, businessVariables)
//       voiceflowResponse = processVoiceflowResponse(response)
//     } catch (error) {
//       console.error('Error getting or processing Voiceflow response:', error)
//     }

//     console.log('Processed Voiceflow response:', voiceflowResponse)

//     if (webhook_payload.entry[0].messaging) {
//       const direct_message = await sendDM(
//         pageId,
//         senderId,
//         voiceflowResponse,
//         automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!
//       )

//       if (direct_message.status === 200) {
//         if (automation) {
//           await trackResponses(automation.id, 'DM')
//         }
//         // Store chat history
//         await client.$transaction([
//           createChatHistory(automation?.id || 'default', pageId, senderId, userMessage),
//           createChatHistory(automation?.id || 'default', pageId, senderId, voiceflowResponse)
//         ])
//         return NextResponse.json({ message: 'Message sent' }, { status: 200 })
//       }
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === 'comments') {
//       if (automation && automation.listener) {
//         if (automation.listener.listener === 'MESSAGE' || 
//             (automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO')) {
//           const direct_message = await sendPrivateMessage(
//             pageId,
//             webhook_payload.entry[0].changes[0].value.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           console.log('Private message sent:', direct_message.data)
//           if (direct_message.status === 200) {
//             await trackResponses(automation.id, 'COMMENT')
//             // Store chat history
//             await client.$transaction([
//               createChatHistory(automation.id, pageId, senderId, userMessage),
//               createChatHistory(automation.id, pageId, senderId, voiceflowResponse)
//             ])
//             return NextResponse.json({ message: 'Message sent' }, { status: 200 })
//           }
//         }
//       } else {
//         // No automation or listener, use default token
//         const direct_message = await sendPrivateMessage(
//           pageId,
//           webhook_payload.entry[0].changes[0].value.id,
//           voiceflowResponse,
//           process.env.DEFAULT_PAGE_TOKEN!
//         )

//         if (direct_message.status === 200) {
//           // Store chat history
//           await client.$transaction([
//             createChatHistory('default', pageId, senderId, userMessage),
//             createChatHistory('default', pageId, senderId, voiceflowResponse)
//           ])
//           return NextResponse.json({ message: 'Message sent' }, { status: 200 })
//         }
//       }
//     }

//     return NextResponse.json({ message: 'Request processed' }, { status: 200 })
//   } catch (error) {
//     console.error('Unhandled error in POST function:', error)
//     return NextResponse.json(
//       {
//         message: 'Error processing request',
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     )
//   }
// }

//WORKING BUT NO HUB CHALLENGE

// import { type NextRequest, NextResponse } from "next/server"
// import { findAutomation } from "@/actions/automations/queries"
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   matchKeyword,
//   trackResponses,
// } from "@/actions/webhook/queries"
// import { sendDM, sendPrivateMessage } from "@/lib/fetch"
// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { storeConversationMessage } from "@/actions/chats/queries"
// import { createMarketingInfoAction } from "@/actions/details"
// import type { VoiceflowVariables } from "@/types/voiceflow"

// export async function GET(req: NextRequest) {
//   const hub = req.nextUrl.searchParams.get('hub.challenge')
//   return new NextResponse(hub)
// }

// export async function POST(req: NextRequest) {
//   console.log("POST request received")
//   let webhook_payload, matcher, userId, userMessage, pageId, senderId, recipientId

//   try {
//     webhook_payload = await req.json()
//     console.log("Received webhook payload:", JSON.stringify(webhook_payload, null, 2))

//     if (webhook_payload.entry[0].messaging) {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].messaging[0].sender.id
//       recipientId = webhook_payload.entry[0].messaging[0].recipient.id
//       userMessage = webhook_payload.entry[0].messaging[0].message.text
//       userId = `${pageId}_${senderId}`
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].changes[0].value.from.id
//       userMessage = webhook_payload.entry[0].changes[0].value.text
//       userId = `${pageId}_${senderId}`
//     } else {
//       return NextResponse.json({ message: "Unsupported webhook payload" }, { status: 400 })
//     }

//     // Check if the conversation is already active
//     const conversationState = await client.conversationState.findUnique({
//       where: { userId },
//     })

//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       matcher = await matchKeyword(userMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return NextResponse.json({ message: "No keyword match" }, { status: 200 })
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
//     if (matcher && matcher.automationId) {
//       automation = await getKeywordAutomation(matcher.automationId, webhook_payload.entry[0].messaging ? true : false)
//     } else {
//       const customer_history = await getChatHistory(pageId, senderId)
//       if (customer_history.history.length > 0) {
//         automation = await findAutomation(customer_history.automationId!)
//       }
//     }

//     let businessVariables = {}
//     if (automation?.userId) {
//       console.log("Fetching business for automation userId:", automation.userId)
//       try {
//         const business = await client.business.findFirst({
//           where: { userId: automation.userId },
//         })
//         console.log("Fetched business:", business)

//         if (business) {
//           businessVariables = {
//             business_name: business.businessName,
//             welcome_message: business.welcomeMessage,
//             business_industry: business.industry,
//           }
//           console.log("Set business variables:", businessVariables)
//         }
//       } catch (error) {
//         console.error("Error fetching business:", error)
//       }
//     }

//     let voiceflowResponse =
//       "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."
//     let voiceflowVariables: VoiceflowVariables = {}

//     try {
//       const { response, variables } = await getVoiceflowResponse(userMessage, userId, businessVariables)
//       voiceflowResponse = processVoiceflowResponse(response)
//       voiceflowVariables = variables
//     } catch (error) {
//       console.error("Error getting or processing Voiceflow response:", error)
//     }

//     console.log("Processed Voiceflow response:", voiceflowResponse)
//     console.log("Voiceflow variables:", voiceflowVariables)

//     // Store marketing info if available
//     if (voiceflowVariables.clientname || voiceflowVariables.clientemail || voiceflowVariables.clientphone) {
//       try {
//         const marketingInfo = {
//           name: voiceflowVariables.clientname,
//           email: voiceflowVariables.clientemail,
//           phone: voiceflowVariables.clientphone,
//         }
//         await createMarketingInfoAction(marketingInfo)
//         console.log("Marketing info stored successfully")
//       } catch (error) {
//         console.error("Error storing marketing info:", error)
//       }
//     }

//     const automationId = automation?.id || null

//     // Store the user message
//     try {
//       await storeConversationMessage(pageId, senderId, userMessage, false, automationId)
//       console.log("User message stored successfully")
//     } catch (error) {
//       console.error("Error storing user message:", error)
//     }

//     // Store the bot response
//     try {
//       await storeConversationMessage(pageId, "bot", voiceflowResponse, true, automationId)
//       console.log("Bot response stored successfully")
//     } catch (error) {
//       console.error("Error storing bot response:", error)
//     }

//     if (webhook_payload.entry[0].messaging) {
//       const direct_message = await sendDM(
//         pageId,
//         senderId,
//         voiceflowResponse,
//         automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!,
//       )

//       if (direct_message.status === 200) {
//         if (automation) {
//           await trackResponses(automationId!, "DM")
//         }
//         await createChatHistory(automationId || "default", pageId, senderId, userMessage)
//         await createChatHistory(automationId || "default", pageId, senderId, voiceflowResponse)
//         return NextResponse.json({ message: "Message sent" }, { status: 200 })
//       }
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//       if (automation && automation.listener) {
//         if (
//           automation.listener.listener === "MESSAGE" ||
//           (automation.listener.listener === "SMARTAI" && automation.User?.subscription?.plan === "PRO")
//         ) {
//           const comment = await sendPrivateMessage(
//             pageId,
//             webhook_payload.entry[0].changes[0].value.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!,
//           )

//           console.log("Private message sent:", comment.data)
//           if (comment.status === 200) {
//             await trackResponses(automationId!, "COMMENT")
//             return NextResponse.json({ message: "Message sent" }, { status: 200 })
//           }
//         }
//       } else {
//         // No automation or listener, use default token
//         const comment = await sendPrivateMessage(
//           pageId,
//           webhook_payload.entry[0].changes[0].value.id,
//           voiceflowResponse,
//           process.env.DEFAULT_PAGE_TOKEN!,
//         )

//         if (comment.status === 200) {
//           return NextResponse.json({ message: "Message sent" }, { status: 200 })
//         }
//       }
//     }

//     return NextResponse.json({ message: "Request processed" }, { status: 200 })
//   } catch (error) {
//     console.error("Unhandled error in POST function:", error)
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


//COMPLETE TOKEN VERIFICATION/HUB CHALLENGE TO BE USED WHEN RESETTING META WEBHOOK

// import { type NextRequest, NextResponse } from "next/server"
// import { findAutomation } from "@/actions/automations/queries"
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   getKeywordPost,
//   matchKeyword,
//   trackResponses,
// } from "@/actions/webhook/queries"
// import { sendDM, sendPrivateMessage } from "@/lib/fetch"
// import { openai } from "@/lib/openai"
// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { storeConversationMessage } from "@/actions/chats/queries"
// import { createMarketingInfoAction } from "@/actions/details"
// import type { VoiceflowVariables } from "@/types/voiceflow"

// export async function GET(req: NextRequest) {
//   // Get all verification parameters from Meta
//   const mode = req.nextUrl.searchParams.get('hub.mode')
//   const token = req.nextUrl.searchParams.get('hub.verify_token')
//   const challenge = req.nextUrl.searchParams.get('hub.challenge')

//   // Your verification token (should match what you set in Meta developer portal)
//   const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN

//   console.log('Webhook verification attempt:', { mode, token })

//   // Verify both the mode and token
//   if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//     console.log('Webhook verified successfully')
//     // Respond with the challenge to verify the webhook
//     return new NextResponse(challenge)
//   } else {
//     console.warn('Webhook verification failed:', { mode, token })
//     // Respond with 403 if verification fails
//     return new NextResponse('Forbidden', { status: 403 })
//   }
// }

// export async function POST(req: NextRequest) {
//   console.log("POST request received")
//   let webhook_payload, matcher, userId, userMessage, pageId, senderId, recipientId

//   try {
//     webhook_payload = await req.json()
//     console.log("Received webhook payload:", JSON.stringify(webhook_payload, null, 2))

//     // Extract common information from webhook payload
//     if (webhook_payload.entry[0].messaging) {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].messaging[0].sender.id
//       recipientId = webhook_payload.entry[0].messaging[0].recipient.id
//       userMessage = webhook_payload.entry[0].messaging[0].message.text
//       userId = `${pageId}_${senderId}`
//       matcher = await matchKeyword(userMessage)
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].changes[0].value.from.id
//       userMessage = webhook_payload.entry[0].changes[0].value.text
//       userId = `${pageId}_${senderId}`
//       matcher = await matchKeyword(userMessage)
//     } else {
//       return NextResponse.json({ message: "Unsupported webhook payload" }, { status: 400 })
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
//       automation = await getKeywordAutomation(
//         matcher.automationId,
//         webhook_payload.entry[0].messaging ? true : false
//       )
//     } else {
//       const customer_history = await getChatHistory(pageId, senderId)
//       if (customer_history.history.length > 0) {
//         automation = await findAutomation(customer_history.automationId!)
//       }
//     }

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
//       let businessVariables = {}
//       if (automation?.userId) {
//         try {
//           const business = await client.business.findFirst({
//             where: { userId: automation.userId },
//           })
//           if (business) {
//             businessVariables = {
//               business_name: business.businessName,
//               welcome_message: business.welcomeMessage,
//               business_industry: business.industry,
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching business:", error)
//         }
//       }

//       // Get Voiceflow response
//       let voiceflowResponse = "I'm sorry, but I'm having trouble processing your request right now. Please try again later."
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
//         await storeConversationMessage(pageId, senderId, userMessage, false, automation?.id || null)
//         await storeConversationMessage(pageId, "bot", voiceflowResponse, true, automation?.id || null)

//         // Send response
//         if (webhook_payload.entry[0].messaging) {
//           const direct_message = await sendDM(
//             pageId,
//             senderId,
//             voiceflowResponse,
//             automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!
//           )

//           if (direct_message.status === 200) {
//             if (automation) {
//               await trackResponses(automation.id, "DM")
//             }
//             await createChatHistory(automation?.id || "default", pageId, senderId, userMessage)
//             await createChatHistory(automation?.id || "default", pageId, senderId, voiceflowResponse)
//             return NextResponse.json({ message: "Message sent" }, { status: 200 })
//           }
//         } else if (webhook_payload.entry[0].changes) {
//           const comment = await sendPrivateMessage(
//             pageId,
//             webhook_payload.entry[0].changes[0].value.id,
//             voiceflowResponse,
//             automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!
//           )

//           if (comment.status === 200) {
//             if (automation) {
//               await trackResponses(automation.id, "COMMENT")
//             }
//             return NextResponse.json({ message: "Message sent" }, { status: 200 })
//           }
//         }
//       } catch (error) {
//         console.error("Error in Voiceflow processing:", error)
//       }
//     } else {
//       // Free users get OpenAI
//       console.log("Using OpenAI for free user")

//       if (webhook_payload.entry[0].messaging) {
//         if (automation && automation.trigger) {
//           if (automation.listener && automation.listener.listener === "MESSAGE") {
//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               automation.listener?.prompt,
//               automation.User?.integrations[0].token!
//             )

//             if (direct_message.status === 200) {
//               const tracked = await trackResponses(automation.id, "DM")
//               if (tracked) {
//                 return NextResponse.json({ message: "Message sent" }, { status: 200 })
//               }
//             }
//           }

//           if (automation.listener && automation.listener.listener === "SMARTAI") {
//             const smart_ai_message = await openai.chat.completions.create({
//               model: "gpt-4o",
//               messages: [
//                 {
//                   role: "assistant",
//                   content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
//                 },
//               ],
//             })

//             if (smart_ai_message.choices[0].message.content) {
//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 webhook_payload.entry[0].messaging[0].message.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendDM(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content,
//                 automation.User?.integrations[0].token!
//               )

//               if (direct_message.status === 200) {
//                 const tracked = await trackResponses(automation.id, "DM")
//                 if (tracked) {
//                   return NextResponse.json({ message: "Message sent" }, { status: 200 })
//                 }
//               }
//             }
//           }
//         }
//       }

//       if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//         const automations_post = await getKeywordPost(
//           webhook_payload.entry[0].changes[0].value.media.id,
//           automation?.id!
//         )

//         if (automation && automations_post && automation.trigger) {
//           if (automation.listener) {
//             if (automation.listener.listener === "MESSAGE") {
//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 automation.listener?.prompt,
//                 automation.User?.integrations[0].token!
//               )

//               if (direct_message.status === 200) {
//                 const tracked = await trackResponses(automation.id, "COMMENT")
//                 if (tracked) {
//                   return NextResponse.json({ message: "Message sent" }, { status: 200 })
//                 }
//               }
//             }

//             if (automation.listener.listener === "SMARTAI") {
//               const smart_ai_message = await openai.chat.completions.create({
//                 model: "gpt-4o",
//                 messages: [
//                   {
//                     role: "assistant",
//                     content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
//                   },
//                 ],
//               })

//               if (smart_ai_message.choices[0].message.content) {
//                 const reciever = createChatHistory(
//                   automation.id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   webhook_payload.entry[0].changes[0].value.text
//                 )

//                 const sender = createChatHistory(
//                   automation.id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   smart_ai_message.choices[0].message.content
//                 )

//                 await client.$transaction([reciever, sender])

//                 const direct_message = await sendPrivateMessage(
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.id,
//                   smart_ai_message.choices[0].message.content,
//                   automation.User?.integrations[0].token!
//                 )

//                 if (direct_message.status === 200) {
//                   const tracked = await trackResponses(automation.id, "COMMENT")
//                   if (tracked) {
//                     return NextResponse.json({ message: "Message sent" }, { status: 200 })
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }

//       // Handle continued conversations for free users
//       if (!matcher) {
//         const customer_history = await getChatHistory(
//           webhook_payload.entry[0].messaging[0].recipient.id,
//           webhook_payload.entry[0].messaging[0].sender.id
//         )

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
//                   content: webhook_payload.entry[0].messaging[0].message.text,
//                 },
//               ],
//             })

//             if (smart_ai_message.choices[0].message.content) {
//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 webhook_payload.entry[0].messaging[0].message.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendDM(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content,
//                 automation.User?.integrations[0].token!
//               )

//               if (direct_message.status === 200) {
//                 return NextResponse.json({ message: "Message sent" }, { status: 200 })
//               }
//             }
//           }
//         }
//       }
//     }

//     return NextResponse.json({ message: "Request processed" }, { status: 200 })
//   } catch (error) {
//     console.error("Unhandled error in POST function:", error)
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

//WORKING MOST RECENT
// import { type NextRequest, NextResponse } from "next/server"
// import { findAutomation } from "@/actions/automations/queries"
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   getKeywordPost,
//   matchKeyword,
//   trackResponses,
// } from "@/actions/webhook/queries"
// import { sendDM, sendPrivateMessage } from "@/lib/fetch"
// import { openai } from "@/lib/openai"
// import { client } from "@/lib/prisma"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { storeConversationMessage } from "@/actions/chats/queries"
// import { createMarketingInfoAction } from "@/actions/details"
// import type { VoiceflowVariables } from "@/types/voiceflow"

// export async function GET(req: NextRequest) {
//   const hub = req.nextUrl.searchParams.get('hub.challenge')
//   return new NextResponse(hub)
// }

// export async function POST(req: NextRequest) {
//   console.log("POST request received")
//   let webhook_payload, matcher, userId, userMessage, pageId, senderId, recipientId

//   try {
//     webhook_payload = await req.json()
//     console.log("Received webhook payload:", JSON.stringify(webhook_payload, null, 2))

//     // Extract common information from webhook payload
//     if (webhook_payload.entry[0].messaging) {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].messaging[0].sender.id
//       recipientId = webhook_payload.entry[0].messaging[0].recipient.id
//       userMessage = webhook_payload.entry[0].messaging[0].message.text
//       userId = `${pageId}_${senderId}`
//       matcher = await matchKeyword(userMessage)
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].changes[0].value.from.id
//       userMessage = webhook_payload.entry[0].changes[0].value.text
//       userId = `${pageId}_${senderId}`
//       matcher = await matchKeyword(userMessage)
//     } else {
//       return NextResponse.json({ message: "Unsupported webhook payload" }, { status: 400 })
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
//       automation = await getKeywordAutomation(
//         matcher.automationId,
//         webhook_payload.entry[0].messaging ? true : false
//       )
//     } else {
//       const customer_history = await getChatHistory(pageId, senderId)
//       if (customer_history.history.length > 0) {
//         automation = await findAutomation(customer_history.automationId!)
//       }
//     }

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
//       let businessVariables = {}
//       if (automation?.userId) {
//         try {
//           const business = await client.business.findFirst({
//             where: { userId: automation.userId },
//           })
//           if (business) {
//             businessVariables = {
//               business_name: business.businessName,
//               welcome_message: business.welcomeMessage,
//               business_industry: business.industry,
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching business:", error)
//         }
//       }

//       // Get Voiceflow response
//       let voiceflowResponse = "I'm sorry, but I'm having trouble processing your request right now. Please try again later."
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
//         await storeConversationMessage(pageId, senderId, userMessage, false, automation?.id || null)
//         await storeConversationMessage(pageId, "bot", voiceflowResponse, true, automation?.id || null)

//         // Send response
//         if (webhook_payload.entry[0].messaging) {
//           const direct_message = await sendDM(
//             pageId,
//             senderId,
//             voiceflowResponse,
//             automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!
//           )

//           if (direct_message.status === 200) {
//             if (automation) {
//               await trackResponses(automation.id, "DM")
//             }
//             await createChatHistory(automation?.id || "default", pageId, senderId, userMessage)
//             await createChatHistory(automation?.id || "default", pageId, senderId, voiceflowResponse)
//             return NextResponse.json({ message: "Message sent" }, { status: 200 })
//           }
//         } else if (webhook_payload.entry[0].changes) {
//           const comment = await sendPrivateMessage(
//             pageId,
//             webhook_payload.entry[0].changes[0].value.id,
//             voiceflowResponse,
//             automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!
//           )

//           if (comment.status === 200) {
//             if (automation) {
//               await trackResponses(automation.id, "COMMENT")
//             }
//             return NextResponse.json({ message: "Message sent" }, { status: 200 })
//           }
//         }
//       } catch (error) {
//         console.error("Error in Voiceflow processing:", error)
//       }
//     } else {
//       // Free users get OpenAI
//       console.log("Using OpenAI for free user")

//       if (webhook_payload.entry[0].messaging) {
//         if (automation && automation.trigger) {
//           if (automation.listener && automation.listener.listener === "MESSAGE") {
//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               automation.listener?.prompt,
//               automation.User?.integrations[0].token!
//             )

//             if (direct_message.status === 200) {
//               const tracked = await trackResponses(automation.id, "DM")
//               if (tracked) {
//                 return NextResponse.json({ message: "Message sent" }, { status: 200 })
//               }
//             }
//           }

//           if (automation.listener && automation.listener.listener === "SMARTAI") {
//             const smart_ai_message = await openai.chat.completions.create({
//               model: "gpt-4o",
//               messages: [
//                 {
//                   role: "assistant",
//                   content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
//                 },
//               ],
//             })

//             if (smart_ai_message.choices[0].message.content) {
//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 webhook_payload.entry[0].messaging[0].message.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendDM(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content,
//                 automation.User?.integrations[0].token!
//               )

//               if (direct_message.status === 200) {
//                 const tracked = await trackResponses(automation.id, "DM")
//                 if (tracked) {
//                   return NextResponse.json({ message: "Message sent" }, { status: 200 })
//                 }
//               }
//             }
//           }
//         }
//       }

//       if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//         const automations_post = await getKeywordPost(
//           webhook_payload.entry[0].changes[0].value.media.id,
//           automation?.id!
//         )

//         if (automation && automations_post && automation.trigger) {
//           if (automation.listener) {
//             if (automation.listener.listener === "MESSAGE") {
//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 automation.listener?.prompt,
//                 automation.User?.integrations[0].token!
//               )

//               if (direct_message.status === 200) {
//                 const tracked = await trackResponses(automation.id, "COMMENT")
//                 if (tracked) {
//                   return NextResponse.json({ message: "Message sent" }, { status: 200 })
//                 }
//               }
//             }

//             if (automation.listener.listener === "SMARTAI") {
//               const smart_ai_message = await openai.chat.completions.create({
//                 model: "gpt-4o",
//                 messages: [
//                   {
//                     role: "assistant",
//                     content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
//                   },
//                 ],
//               })

//               if (smart_ai_message.choices[0].message.content) {
//                 const reciever = createChatHistory(
//                   automation.id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   webhook_payload.entry[0].changes[0].value.text
//                 )

//                 const sender = createChatHistory(
//                   automation.id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   smart_ai_message.choices[0].message.content
//                 )

//                 await client.$transaction([reciever, sender])

//                 const direct_message = await sendPrivateMessage(
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.id,
//                   smart_ai_message.choices[0].message.content,
//                   automation.User?.integrations[0].token!
//                 )

//                 if (direct_message.status === 200) {
//                   const tracked = await trackResponses(automation.id, "COMMENT")
//                   if (tracked) {
//                     return NextResponse.json({ message: "Message sent" }, { status: 200 })
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }

//       // Handle continued conversations for free users
//       if (!matcher) {
//         const customer_history = await getChatHistory(
//           webhook_payload.entry[0].messaging[0].recipient.id,
//           webhook_payload.entry[0].messaging[0].sender.id
//         )

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
//                   content: webhook_payload.entry[0].messaging[0].message.text,
//                 },
//               ],
//             })

//             if (smart_ai_message.choices[0].message.content) {
//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 webhook_payload.entry[0].messaging[0].message.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendDM(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content,
//                 automation.User?.integrations[0].token!
//               )

//               if (direct_message.status === 200) {
//                 return NextResponse.json({ message: "Message sent" }, { status: 200 })
//               }
//             }
//           }
//         }
//       }
//     }

//     return NextResponse.json({ message: "Request processed" }, { status: 200 })
//   } catch (error) {
//     console.error("Unhandled error in POST function:", error)
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
  getKeywordPost,
  matchKeyword,
  trackResponses,
} from "@/actions/webhook/queries"
import { sendDM, sendPrivateMessage } from "@/lib/fetch"
import { openai } from "@/lib/openai"
import { client } from "@/lib/prisma"
import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
import { storeConversationMessage } from "@/actions/chats/queries"
import { createMarketingInfoAction } from "@/actions/details"
import type { VoiceflowVariables } from "@/types/voiceflow"

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge")
  return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
  console.log("POST request received")
  let webhook_payload, matcher, userId, userMessage, pageId, senderId, recipientId

  try {
    webhook_payload = await req.json()
    console.log("Received webhook payload:", JSON.stringify(webhook_payload, null, 2))

    // Extractcommon information from webhook payload
    if (webhook_payload.entry[0].messaging) {
      pageId = webhook_payload.entry[0].id
      senderId = webhook_payload.entry[0].messaging[0].sender.id
      recipientId = webhook_payload.entry[0].messaging[0].recipient.id
      userMessage = webhook_payload.entry[0].messaging[0].message.text
      userId = `${pageId}_${senderId}`
      matcher = await matchKeyword(userMessage)
    } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
      pageId = webhook_payload.entry[0].id
      senderId = webhook_payload.entry[0].changes[0].value.from.id
      userMessage = webhook_payload.entry[0].changes[0].value.text
      userId = `${pageId}_${senderId}`
      matcher = await matchKeyword(userMessage)
    } else {
      return NextResponse.json({ message: "Unsupported webhook payload" }, { status: 400 })
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
              instagram_handle: business.instagramHandle || "",
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
      // let voiceflowResponse =
      //   "I'm sorry, but I'm having trouble processing your request right now. Please try again later."
      // let voiceflowVariables: VoiceflowVariables = {}
      let voiceflowResponse: { text: string; buttons?: { name: string; payload: string }[] } = {
        text: "I'm sorry, but I'm having trouble processing your request right now. Please try again later.",
      };
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
        // await storeConversationMessage(pageId, "bot", voiceflowResponse, true, automation?.id || null)
        await storeConversationMessage(pageId, "bot", voiceflowResponse.text, true, automation?.id || null);

        // Send response
        if (webhook_payload.entry[0].messaging) {
          // const direct_message = await sendDM(
          //   pageId,
          //   senderId,
          //   voiceflowResponse,
          //   automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!,
          // )
          const direct_message = await sendDM(
            pageId,
            senderId,
            voiceflowResponse.text, // Use the text property
            automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!,
            voiceflowResponse.buttons // Pass the buttons
          );

          if (direct_message.status === 200) {
            if (automation) {
              await trackResponses(automation.id, "DM")
            }
            await createChatHistory(automation?.id || "default", pageId, senderId, userMessage)
            // await createChatHistory(automation?.id || "default", pageId, senderId, voiceflowResponse)
            await createChatHistory(automation?.id || "default", pageId, senderId, voiceflowResponse.text); // Use voiceflowResponse.text
            return NextResponse.json({ message: "Message sent" }, { status: 200 })
          }
        } else if (webhook_payload.entry[0].changes) {
          // const comment = await sendPrivateMessage(
          //   pageId,
          //   webhook_payload.entry[0].changes[0].value.id,
          //   voiceflowResponse,
          //   automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!,
          // )
          const comment = await sendPrivateMessage(
            pageId,
            webhook_payload.entry[0].changes[0].value.id,
            voiceflowResponse.text, // Use voiceflowResponse.text instead of voiceflowResponse
            automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!,
            voiceflowResponse.buttons // Pass the buttons if needed
          );

          if (comment.status === 200) {
            if (automation) {
              await trackResponses(automation.id, "COMMENT")
            }
            return NextResponse.json({ message: "Message sent" }, { status: 200 })
          }
        }
      } catch (error) {
        console.error("Error in Voiceflow processing:", error)
      }
    } else {
      // Free users get OpenAI
      console.log("Using OpenAI for free user")

      if (webhook_payload.entry[0].messaging) {
        if (automation && automation.trigger) {
          if (automation.listener && automation.listener.listener === "MESSAGE") {
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener?.prompt,
              automation.User?.integrations[0].token!,
            )

            if (direct_message.status === 200) {
              const tracked = await trackResponses(automation.id, "DM")
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
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text,
              )

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
              )

              await client.$transaction([reciever, sender])

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.User?.integrations[0].token!,
              )

              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "DM")
                if (tracked) {
                  return NextResponse.json({ message: "Message sent" }, { status: 200 })
                }
              }
            }
          }
        }
      }

      if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
        const automations_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id!,
        )

        if (automation && automations_post && automation.trigger) {
          if (automation.listener) {
            if (automation.listener.listener === "MESSAGE") {
              const direct_message = await sendPrivateMessage(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.id,
                automation.listener?.prompt,
                automation.User?.integrations[0].token!,
              )

              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "COMMENT")
                if (tracked) {
                  return NextResponse.json({ message: "Message sent" }, { status: 200 })
                }
              }
            }

            if (automation.listener.listener === "SMARTAI") {
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
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  webhook_payload.entry[0].changes[0].value.text,
                )

                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.choices[0].message.content,
                )

                await client.$transaction([reciever, sender])

                const direct_message = await sendPrivateMessage(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.id,
                  smart_ai_message.choices[0].message.content,
                  automation.User?.integrations[0].token!,
                )

                if (direct_message.status === 200) {
                  const tracked = await trackResponses(automation.id, "COMMENT")
                  if (tracked) {
                    return NextResponse.json({ message: "Message sent" }, { status: 200 })
                  }
                }
              }
            }
          }
        }
      }

      // Handle continued conversations for free users
      if (!matcher) {
        const customer_history = await getChatHistory(
          webhook_payload.entry[0].messaging[0].recipient.id,
          webhook_payload.entry[0].messaging[0].sender.id,
        )

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
                  content: webhook_payload.entry[0].messaging[0].message.text,
                },
              ],
            })

            if (smart_ai_message.choices[0].message.content) {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text,
              )

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
              )

              await client.$transaction([reciever, sender])

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.User?.integrations[0].token!,
              )

              if (direct_message.status === 200) {
                return NextResponse.json({ message: "Message sent" }, { status: 200 })
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ message: "Request processed" }, { status: 200 })
  } catch (error) {
    console.error("Unhandled error in POST function:", error)
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

