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
// import { getVoiceflowResponse } from '@/lib/voiceflow'
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
//             const smart_ai_message = await getVoiceflowResponse(
//               `${automation.listener?.prompt}: Keep responses under 2 sentences`,
//               webhook_payload.entry[0].messaging[0].sender.id
//             )

//             if (smart_ai_message) {
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
//                 smart_ai_message
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendDM(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message,
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
//               const smart_ai_message = await getVoiceflowResponse(
//                 `${automation.listener?.prompt}: keep responses under 2 sentences`,
//                 webhook_payload.entry[0].changes[0].value.from.id
//               )
//               if (smart_ai_message) {
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
//                   smart_ai_message
//                 )

//                 await client.$transaction([reciever, sender])

//                 const direct_message = await sendPrivateMessage(
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.id,
//                   smart_ai_message,
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
//           const historyString = customer_history.history
//             .map((msg: any) => `${msg.role}: ${msg.content}`)
//             .join('\n');

//           const smart_ai_message = await getVoiceflowResponse(
//             `${automation.listener?.prompt}: keep responses under 2 sentences. Previous conversation:\n${historyString}\nUser: ${webhook_payload.entry[0].messaging[0].message.text}`,
//             webhook_payload.entry[0].messaging[0].sender.id
//           )

//           if (smart_ai_message) {
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
//               smart_ai_message
//             )
//             await client.$transaction([reciever, sender])
//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               smart_ai_message,
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
//     console.error('Error in webhook handler:', error);
//     return NextResponse.json(
//       {
//         message: 'Error processing webhook',
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     )
//   }
// }

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
// import { getVoiceflowResponse, processVoiceflowResponse } from '@/lib/voiceflow'

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
//             // Use Voiceflow to generate response
//             const response = await getVoiceflowResponse(webhook_payload.entry[0].messaging[0].message.text)

//             const voiceflowResponse = processVoiceflowResponse(response)

//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               voiceflowResponse,
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
//             const response = await getVoiceflowResponse(
//               webhook_payload.entry[0].messaging[0].message.text
//             )

//             const voiceflowResponse = processVoiceflowResponse(response)

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
//               voiceflowResponse
//             )

//             await client.$transaction([reciever, sender])

//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               voiceflowResponse,
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

//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
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
//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)

//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 webhook_payload.entry[0].changes[0].value.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 voiceflowResponse
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
//                 automation.User?.integrations[0].token!
//               )

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
//           // Use Voiceflow to generate response with context
//           const response = await getVoiceflowResponse(
//             webhook_payload.entry[0].messaging[0].message.text,
//             customer_history.history
//           )

//           const voiceflowResponse = processVoiceflowResponse(response)

//           const reciever = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             webhook_payload.entry[0].messaging[0].message.text
//           )

//           const sender = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse
//           )
//           await client.$transaction([reciever, sender])

//           const direct_message = await sendDM(
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           if (direct_message.status === 200) {
//             return NextResponse.json(
//               {
//                 message: 'Message sent',
//               },
//               { status: 200 }
//             )
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
//     console.error('Error:', error)
//     return NextResponse.json(
//       {
//         message: 'Error processing request',
//       },
//       { status: 500 }
//     )
//   }
// }

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
//           const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           // Create Voiceflow user if not exists
//           await createVoiceflowUser(userId)

//           if (
//             automation.listener &&
//             automation.listener.listener === 'MESSAGE'
//           ) {
//             // Use Voiceflow to generate response
//             const response = await getVoiceflowResponse(
//               webhook_payload.entry[0].messaging[0].message.text,
//               userId
//             )

//             const voiceflowResponse = processVoiceflowResponse(response)

//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               voiceflowResponse,
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
//             const response = await getVoiceflowResponse(
//               webhook_payload.entry[0].messaging[0].message.text,
//               userId
//             )

//             const voiceflowResponse = processVoiceflowResponse(response)

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
//               voiceflowResponse
//             )

//             await client.$transaction([reciever, sender])

//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               voiceflowResponse,
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
//             const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].changes[0].value.from.id}`
            
//             // Create Voiceflow user if not exists
//             await createVoiceflowUser(userId)

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

//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
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
//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)

//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 webhook_payload.entry[0].changes[0].value.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 voiceflowResponse
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
//                 automation.User?.integrations[0].token!
//               )

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
//           const userId = `${webhook_payload.entry[0].messaging[0].recipient.id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           // Create Voiceflow user if not exists
//           await createVoiceflowUser(userId)

//           // Use Voiceflow to generate response with context
//           const response = await getVoiceflowResponse(
//             webhook_payload.entry[0].messaging[0].message.text,
//             userId
//           )

//           const voiceflowResponse = processVoiceflowResponse(response)

//           const reciever = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             webhook_payload.entry[0].messaging[0].message.text
//           )

//           const sender = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse
//           )
//           await client.$transaction([reciever, sender])

//           const direct_message = await sendDM(
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           if (direct_message.status === 200) {
//             return NextResponse.json(
//               {
//                 message: 'Message sent',
//               },
//               { status: 200 }
//             )
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
//     console.error('Error:', error)
//     return NextResponse.json(
//       {
//         message: 'Error processing request',
//       },
//       { status: 500 }
//     )
//   }
// }

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
//       console.log('Matched keyword, automationId:', matcher.automationId)

//       if (webhook_payload.entry[0].messaging) {
//         const automation = await getKeywordAutomation(
//           matcher.automationId,
//           true
//         )

//         if (automation && automation.trigger) {
//           const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           // Create Voiceflow user if not exists
//           await createVoiceflowUser(userId)

//           if (
//             automation.listener &&
//             automation.listener.listener === 'MESSAGE'
//           ) {
//             console.log('Triggering Voiceflow for MESSAGE listener')
//             // Use Voiceflow to generate response
//             const response = await getVoiceflowResponse(
//               webhook_payload.entry[0].messaging[0].message.text,
//               userId
//             )

//             console.log('Voiceflow raw response:', JSON.stringify(response, null, 2))

//             const voiceflowResponse = processVoiceflowResponse(response)
//             console.log('Processed Voiceflow response:', voiceflowResponse)

//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               voiceflowResponse,
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
//             console.log('Triggering Voiceflow for SMARTAI listener')
//             const response = await getVoiceflowResponse(
//               webhook_payload.entry[0].messaging[0].message.text,
//               userId
//             )

//             console.log('Voiceflow raw response:', JSON.stringify(response, null, 2))

//             const voiceflowResponse = processVoiceflowResponse(response)
//             console.log('Processed Voiceflow response:', voiceflowResponse)

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
//               voiceflowResponse
//             )

//             await client.$transaction([reciever, sender])

//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               voiceflowResponse,
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
//           console.log('Matched comment automation')
//           if (automation.listener) {
//             console.log('Processing comment automation')
//             const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].changes[0].value.from.id}`
            
//             // Create Voiceflow user if not exists
//             await createVoiceflowUser(userId)

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

//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               console.log('Voiceflow raw response:', JSON.stringify(response, null, 2))

//               const voiceflowResponse = processVoiceflowResponse(response)
//               console.log('Processed Voiceflow response:', voiceflowResponse)

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
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
//               console.log('Triggering Voiceflow for SMARTAI comment listener')
//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               console.log('Voiceflow raw response:', JSON.stringify(response, null, 2))

//               const voiceflowResponse = processVoiceflowResponse(response)
//               console.log('Processed Voiceflow response:', voiceflowResponse)

//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 webhook_payload.entry[0].changes[0].value.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 voiceflowResponse
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
//                 automation.User?.integrations[0].token!
//               )

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
//           const userId = `${webhook_payload.entry[0].messaging[0].recipient.id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           // Create Voiceflow user if not exists
//           await createVoiceflowUser(userId)

//           console.log('Triggering Voiceflow for unmatched SMARTAI message')
//           // Use Voiceflow to generate response with context
//           const response = await getVoiceflowResponse(
//             webhook_payload.entry[0].messaging[0].message.text,
//             userId
//           )

//           console.log('Voiceflow raw response:', JSON.stringify(response, null, 2))

//           const voiceflowResponse = processVoiceflowResponse(response)
//           console.log('Processed Voiceflow response:', voiceflowResponse)

//           const reciever = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             webhook_payload.entry[0].messaging[0].message.text
//           )

//           const sender = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse
//           )
//           await client.$transaction([reciever, sender])

//           const direct_message = await sendDM(
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           if (direct_message.status === 200) {
//             return NextResponse.json(
//               {
//                 message: 'Message sent',
//               },
//               { status: 200 }
//             )
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
//     console.error('Error:', error)
//     return NextResponse.json(
//       {
//         message: 'Error processing request',
//       },
//       { status: 500 }
//     )
//   }
// }


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
//       console.log('Matched keyword, automationId:', matcher.automationId)

//       if (webhook_payload.entry[0].messaging) {
//         console.log('Processing messaging event')
//         const automation = await getKeywordAutomation(
//           matcher.automationId,
//           true
//         )

//         if (automation && automation.trigger) {
//           console.log('Automation found:', automation.id)
//           const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           console.log('Attempting to create Voiceflow user:', userId)
//           const userCreated = await createVoiceflowUser(userId)
//           if (!userCreated) {
//             console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//           }

//           let voiceflowResponse = "Imm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists.";

//           try {
//             const response = await getVoiceflowResponse(
//               webhook_payload.entry[0].messaging[0].message.text,
//               userId
//             )
//             voiceflowResponse = processVoiceflowResponse(response)
//           } catch (error) {
//             console.error('Error getting or processing Voiceflow response:', error)
//           }

//           console.log('Processed Voiceflow response:', voiceflowResponse)

//           const direct_message = await sendDM(
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           if (direct_message.status === 200) {
//             const tracked = await trackResponses(automation.id, 'DM')
//             if (tracked) {
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
//           console.log('Matched comment automation')
//           if (automation.listener) {
//             console.log('Processing comment automation')
//             const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].changes[0].value.from.id}`
            
//             console.log('Attempting to create Voiceflow user:', userId)
//             const userCreated = await createVoiceflowUser(userId)
//             if (!userCreated) {
//               console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//             }

//             if (automation.listener.listener === 'MESSAGE') {
//               console.log('Triggering Voiceflow for MESSAGE comment listener')
//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)
//               console.log('Processed Voiceflow response:', voiceflowResponse)

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
//                 automation.User?.integrations[0].token!
//               )

//               console.log('DM sent:', direct_message.data)
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
//               console.log('Triggering Voiceflow for SMARTAI comment listener')
//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)
//               console.log('Processed Voiceflow response:', voiceflowResponse)

//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 webhook_payload.entry[0].changes[0].value.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 voiceflowResponse
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
//                 automation.User?.integrations[0].token!
//               )

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
//           const userId = `${webhook_payload.entry[0].messaging[0].recipient.id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           console.log('Attempting to create Voiceflow user:', userId)
//           const userCreated = await createVoiceflowUser(userId)
//           if (!userCreated) {
//             console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//           }

//           console.log('Triggering Voiceflow for unmatched SMARTAI message')
//           const response = await getVoiceflowResponse(
//             webhook_payload.entry[0].messaging[0].message.text,
//             userId
//           )

//           const voiceflowResponse = processVoiceflowResponse(response)
//           console.log('Processed Voiceflow response:', voiceflowResponse)

//           const reciever = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             webhook_payload.entry[0].messaging[0].message.text
//           )

//           const sender = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse
//           )
//           await client.$transaction([reciever, sender])

//           const direct_message = await sendDM(
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           if (direct_message.status === 200) {
//             return NextResponse.json(
//               {
//                 message: 'Message sent',
//               },
//               { status: 200 }
//             )
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
//       console.log('Matched keyword, automationId:', matcher.automationId)

//       if (webhook_payload.entry[0].messaging) {
//         console.log('Processing messaging event')
//         const automation = await getKeywordAutomation(
//           matcher.automationId,
//           true
//         )

//         if (automation && automation.trigger) {
//           console.log('Automation found:', automation.id)
//           const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           console.log('Attempting to create Voiceflow user:', userId)
//           const userCreated = await createVoiceflowUser(userId)
//           if (!userCreated) {
//             console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//           }

//           let voiceflowResponse = "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists.";

//           try {
//             const response = await getVoiceflowResponse(
//               webhook_payload.entry[0].messaging[0].message.text,
//               userId
//             )
//             voiceflowResponse = processVoiceflowResponse(response)
//           } catch (error) {
//             console.error('Error getting or processing Voiceflow response:', error)
//           }

//           console.log('Processed Voiceflow response:', voiceflowResponse)

//           const direct_message = await sendDM(
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           if (direct_message.status === 200) {
//             const tracked = await trackResponses(automation.id, 'DM')
//             if (tracked) {
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
//           console.log('Matched comment automation')
//           if (automation.listener) {
//             console.log('Processing comment automation')
//             const userId = `${webhook_payload.entry[0].id}_${webhook_payload.entry[0].changes[0].value.from.id}`
            
//             console.log('Attempting to create Voiceflow user:', userId)
//             const userCreated = await createVoiceflowUser(userId)
//             if (!userCreated) {
//               console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//             }

//             if (automation.listener.listener === 'MESSAGE') {
//               console.log('Triggering Voiceflow for MESSAGE comment listener')
//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)
//               console.log('Processed Voiceflow response:', voiceflowResponse)

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
//                 automation.User?.integrations[0].token!
//               )

//               console.log('DM sent:', direct_message.data)
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
//               console.log('Triggering Voiceflow for SMARTAI comment listener')
//               const response = await getVoiceflowResponse(
//                 webhook_payload.entry[0].changes[0].value.text,
//                 userId
//               )

//               const voiceflowResponse = processVoiceflowResponse(response)
//               console.log('Processed Voiceflow response:', voiceflowResponse)

//               const reciever = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 webhook_payload.entry[0].changes[0].value.text
//               )

//               const sender = createChatHistory(
//                 automation.id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.from.id,
//                 voiceflowResponse
//               )

//               await client.$transaction([reciever, sender])

//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 voiceflowResponse,
//                 automation.User?.integrations[0].token!
//               )

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
//           const userId = `${webhook_payload.entry[0].messaging[0].recipient.id}_${webhook_payload.entry[0].messaging[0].sender.id}`
          
//           console.log('Attempting to create Voiceflow user:', userId)
//           const userCreated = await createVoiceflowUser(userId)
//           if (!userCreated) {
//             console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//           }

//           console.log('Triggering Voiceflow for unmatched SMARTAI message')
//           const response = await getVoiceflowResponse(
//             webhook_payload.entry[0].messaging[0].message.text,
//             userId
//           )

//           const voiceflowResponse = processVoiceflowResponse(response)
//           console.log('Processed Voiceflow response:', voiceflowResponse)

//           const reciever = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             webhook_payload.entry[0].messaging[0].message.text
//           )

//           const sender = createChatHistory(
//             automation.id,
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse
//           )
//           await client.$transaction([reciever, sender])

//           const direct_message = await sendDM(
//             webhook_payload.entry[0].id,
//             webhook_payload.entry[0].messaging[0].sender.id,
//             voiceflowResponse,
//             automation.User?.integrations[0].token!
//           )

//           if (direct_message.status === 200) {
//             return NextResponse.json(
//               {
//                 message: 'Message sent',
//               },
//               { status: 200 }
//             )
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

// import { NextRequest, NextResponse } from 'next/server'
// import { findAutomation } from '@/actions/automations/queries'
// import {
//   createChatHistory,
//   getChatHistory,
//   getKeywordAutomation,
//   getKeywordPost,
//   matchKeyword,
//   trackResponses,
//   createOrUpdateConversationState,
//   getConversationState,
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
//     const conversationState = await getConversationState(userId)
//     let isConversationActive = conversationState?.isActive || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       matcher = await matchKeyword(userMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return NextResponse.json({ message: 'No keyword match' }, { status: 200 })
//       }

//       // Keyword matched, set the conversation as active
//       await createOrUpdateConversationState(userId, true)
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

//     let voiceflowResponse = "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

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

// // In-memory store for conversation states
// const conversationStates = new Map<string, boolean>();

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
//     let isConversationActive = conversationStates.get(userId) || false

//     if (!isConversationActive) {
//       // If the conversation is not active, check for keyword match
//       matcher = await matchKeyword(userMessage)

//       if (!matcher || !matcher.automationId) {
//         // No keyword match and conversation not active, don't respond
//         return NextResponse.json({ message: 'No keyword match' }, { status: 200 })
//       }

//       // Keyword matched, set the conversation as active
//       conversationStates.set(userId, true)
//       isConversationActive = true

//       // Set a timeout to deactivate the conversation after 1 hour
//       setTimeout(() => {
//         conversationStates.delete(userId)
//       }, 3600000) // 1 hour in milliseconds
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

//     let voiceflowResponse = "Im sorry, but Im having trouble processing your request right now. Please try again later or contact support if the issue persists."

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
// import { storeChatMessages } from "@/actions/chats/chatAction"

// export async function POST(req: NextRequest) {
//   const webhook_payload = await req.json()
//   let matcher

//   try {
//     console.log("Received webhook payload:", JSON.stringify(webhook_payload, null, 2))

//     let userId, userMessage, pageId, senderId, recipientId

//     if (webhook_payload.entry[0].messaging) {
//       pageId = webhook_payload.entry[0].id
//       senderId = webhook_payload.entry[0].messaging[0].sender.id
//      = webhook_payload.entry[0].messaging[0].recipient.id
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

//     // Check if the conversation is already active nn
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
//       try {
//         automation = await getKeywordAutomation(matcher.automationId, webhook_payload.entry[0].messaging ? true : false)
//       } catch (error) {
//         console.error("Error getting keyword automation:", error)
//       }
//     } else {
//       try {
//         const customer_history = await getChatHistory(pageId, senderId)
//         if (
//           customer_history &&
//           customer_history.history &&
//           customer_history.history.length > 0 &&
//           customer_history.automationId
//         ) {
//           automation = await findAutomation(customer_history.automationId)
//         }
//       } catch (error) {
//         console.error("Error getting chat history or finding automation:", error)
//       }
//     }

//     if (!automation) {
//       console.warn("No automation found. Using default behavior.")
//       // You might want to set a default automation or handle this case appropriately
//     }

//     let businessVariables = {}
//     if (automation?.userId) {
//       // Fetch the business associated with the user of this automation
//       const business = await client.business.findFirst({
//         where: { userId: automation.userId },
//       })

//       if (business) {
//         businessVariables = {
//           business_name: business.businessName,
//           welcome_message: business.welcomeMessage,
//           business_industry: business.industry,
//         }
//       }
//     }

//     let voiceflowResponse =
//       "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     try {
//       // Use the businessVariables in the Voiceflow response
//       const response = await getVoiceflowResponse(userMessage, userId, businessVariables)
//       voiceflowResponse = processVoiceflowResponse(response)
//     } catch (error) {
//       console.error("Error getting or processing Voiceflow response:", error)
//     }

//     console.log("Processed Voiceflow response:", voiceflowResponse)

//     // Store the chat messages using the new server action
//     const storedMessages = await storeChatMessages({
//       userId,
//       pageId,
//       senderId,
//       userMessage,
//       botResponse: voiceflowResponse,
//       automationId: automation?.id || "default",
//     })

//     if (!storedMessages.success) {
//       console.error("Error storing chat messages:", storedMessages.error)
//     }

//     if (webhook_payload.entry[0].messaging) {
//       const direct_message = await sendDM(
//         pageId,
//         senderId,
//         voiceflowResponse,
//         automation?.User?.integrations[0]?.token || process.env.DEFAULT_PAGE_TOKEN!,
//       )

//       if (direct_message.status === 200) {
//         if (automation) {
//           await trackResponses(automation.id, "DM")
//         }
//         // Store chat history (existing method)
//         await client.$transaction([
//           createChatHistory(automation?.id || "default", pageId, senderId, userMessage),
//           createChatHistory(automation?.id || "default", pageId, senderId, voiceflowResponse),
//         ])
//         return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
//       }
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//       if (automation && automation.listener) {
//         if (
//           automation.listener.listener === "MESSAGE" ||
//           (automation.listener.listener === "SMARTAI" && automation.User?.subscription?.plan === "PRO")
//         ) {
//           const direct_message = await sendPrivateMessage(
//             pageId,
//             webhook_payload.entry[0].changes[0].value.id,
//             voiceflowResponse,
//             automation.User?.integrations[0]?.token || process.env.DEFAULT_PAGE_TOKEN!,
//           )

//           console.log("Private message sent:", direct_message.data)
//           if (direct_message.status === 200) {
//             await trackResponses(automation.id, "COMMENT")
//             // Store chat history (existing method)
//             await client.$transaction([
//               createChatHistory(automation.id, pageId, senderId, userMessage),
//               createChatHistory(automation.id, pageId, senderId, voiceflowResponse),
//             ])
//             return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
//           }
//         }
//       } else {
//         // No automation or listener, use default token
//         const direct_message = await sendPrivateMessage(
//           pageId,
//           webhook_payload.entry[0].changes[0].value.id,
//           voiceflowResponse,
//           process.env.DEFAULT_PAGE_TOKEN!,
//         )

//         if (direct_message.status === 200) {
//           // Store chat history (existing method)
//           await client.$transaction([
//             createChatHistory("default", pageId, senderId, userMessage),
//             createChatHistory("default", pageId, senderId, voiceflowResponse),
//           ])
//           return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
//         }
//       }
//     }

//     return NextResponse.json({ message: "Request processed", storedMessages }, { status: 200 })
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



// import { type NextRequest, NextResponse } from "next/server"
// // import { findAutomation } from "@/actions/automations/queries"
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
// import { storeChatMessages } from "@/actions/chats/chatAction"

// export const findAutomation = async (id: string) => {
//   try {
//     const automation = await client.automation.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         keywords: true,
//         trigger: true,
//         posts: true,
//         listener: true,
//         messages: true,
//         User: {
//           select: {
//             subscription: true,
//             integrations: true,
//           },
//         },
//       },
//     })

//     if (!automation) {
//       console.log(`No automation found with id: ${id}`)
//       return null
//     }

//     return automation
//   } catch (error) {
//     console.error(`Error finding automation with id ${id}:`, error)
//     throw error
//   }
// }

// export async function POST(req: NextRequest) {
//   const webhook_payload = await req.json()
//   let matcher

//   try {
//     console.log("Received webhook payload:", JSON.stringify(webhook_payload, null, 2))

//     let userId, userMessage, pageId, senderId, recipientId

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
//       try {
//         automation = await getKeywordAutomation(matcher.automationId, webhook_payload.entry[0].messaging ? true : false)
//       } catch (error) {
//         console.error("Error getting keyword automation:", error)
//       }
//     } else {
//       try {
//         console.log("Fetching chat history for pageId:", pageId, "and senderId:", senderId)
//         const customer_history = await getChatHistory(pageId, senderId)
//         console.log("Retrieved customer history:", JSON.stringify(customer_history, null, 2))

//         if (
//           customer_history &&
//           customer_history.history &&
//           customer_history.history.length > 0 &&
//           customer_history.automationId
//         ) {
//           console.log("Attempting to find automation with id:", customer_history.automationId)
//           automation = await findAutomation(customer_history.automationId)
//           console.log("Retrieved automation:", JSON.stringify(automation, null, 2))
//         } else {
//           console.log("No valid chat history or automationId found")
//         }
//       } catch (error) {
//         console.error("Error getting chat history or finding automation:", error)
//         // Set a default automation or handle this case appropriately
//         automation = null
//       }
//     }

//     if (!automation) {
//       console.warn("No automation found or error occurred. Using default behavior.")
//       // Set a default automation object or handle this case appropriately
//       automation = {
//         id: "default",
//         userId: null,
//         User: null,
//         listener: null,
//       }
//     }

//     let businessVariables = {}
//     if (automation?.userId) {
//       try {
//         // Fetch the business associated with the user of this automation
//         const business = await client.business.findFirst({
//           where: { userId: automation.userId },
//         })

//         if (business) {
//           businessVariables = {
//             business_name: business.businessName || "",
//             welcome_message: business.welcomeMessage || "",
//             business_industry: business.industry || "",
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching business information:", error)
//       }
//     }

//     let voiceflowResponse =
//       "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//     try {
//       // Use the businessVariables in the Voiceflow response
//       const response = await getVoiceflowResponse(userMessage, userId, businessVariables)
//       voiceflowResponse = processVoiceflowResponse(response)
//     } catch (error) {
//       console.error("Error getting or processing Voiceflow response:", error)
//     }

//     console.log("Processed Voiceflow response:", voiceflowResponse)

//     // Store the chat messages using the new server action
//     const storedMessages = await storeChatMessages({
//       userId,
//       pageId,
//       senderId,
//       userMessage,
//       botResponse: voiceflowResponse,
//       automationId: automation?.id || "default",
//     })

//     if (!storedMessages.success) {
//       console.error("Error storing chat messages:", storedMessages.error)
//     }

//     if (webhook_payload.entry[0].messaging) {
//       const direct_message = await sendDM(
//         pageId,
//         senderId,
//         voiceflowResponse,
//         automation?.User?.integrations[0]?.token || process.env.DEFAULT_PAGE_TOKEN!,
//       )

//       if (direct_message.status === 200) {
//         if (automation && automation.id !== "default") {
//           await trackResponses(automation.id, "DM")
//         }
//         // Store chat history (existing method)
//         await client.$transaction([
//           createChatHistory(automation?.id || "default", pageId, senderId, userMessage),
//           createChatHistory(automation?.id || "default", pageId, senderId, voiceflowResponse),
//         ])
//         return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
//       }
//     } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
//       if (automation && automation.listener) {
//         if (
//           automation.listener.listener === "MESSAGE" ||
//           (automation.listener.listener === "SMARTAI" && automation.User?.subscription?.plan === "PRO")
//         ) {
//           const direct_message = await sendPrivateMessage(
//             pageId,
//             webhook_payload.entry[0].changes[0].value.id,
//             voiceflowResponse,
//             automation.User?.integrations[0]?.token || process.env.DEFAULT_PAGE_TOKEN!,
//           )

//           console.log("Private message sent:", direct_message.data)
//           if (direct_message.status === 200) {
//             if (automation && automation.id !== "default") {
//               await trackResponses(automation.id, "COMMENT")
//             }
//             // Store chat history (existing method)
//             await client.$transaction([
//               createChatHistory(automation.id, pageId, senderId, userMessage),
//               createChatHistory(automation.id, pageId, senderId, voiceflowResponse),
//             ])
//             return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
//           }
//         }
//       } else {
//         // No automation or listener, use default token
//         const direct_message = await sendPrivateMessage(
//           pageId,
//           webhook_payload.entry[0].changes[0].value.id,
//           voiceflowResponse,
//           process.env.DEFAULT_PAGE_TOKEN!,
//         )

//         if (direct_message.status === 200) {
//           // Store chat history (existing method)
//           await client.$transaction([
//             createChatHistory("default", pageId, senderId, userMessage),
//             createChatHistory("default", pageId, senderId, voiceflowResponse),
//           ])
//           return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
//         }
//       }
//     }

//     return NextResponse.json({ message: "Request processed", storedMessages }, { status: 200 })
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
import { getChatHistory, getKeywordAutomation, matchKeyword, trackResponses } from "@/actions/webhook/queries"
import { sendDM, sendPrivateMessage } from "@/lib/fetch"
import { client } from "@/lib/prisma"
import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
import { storeChatMessages } from "@/actions/chats/chatAction"

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge")
  return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json()
  let matcher

  try {
    console.log("Received webhook payload:", JSON.stringify(webhook_payload, null, 2))

    let userId, userMessage, pageId, senderId, recipientId

    if (webhook_payload.entry[0].messaging) {
      pageId = webhook_payload.entry[0].id
      senderId = webhook_payload.entry[0].messaging[0].sender.id
      recipientId = webhook_payload.entry[0].messaging[0].recipient.id
      userMessage = webhook_payload.entry[0].messaging[0].message.text
      userId = `${pageId}_${senderId}`
    } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
      pageId = webhook_payload.entry[0].id
      senderId = webhook_payload.entry[0].changes[0].value.from.id
      userMessage = webhook_payload.entry[0].changes[0].value.text
      userId = `${pageId}_${senderId}`
    } else {
      return NextResponse.json({ message: "Unsupported webhook payload" }, { status: 400 })
    }

    // Check if the conversation is already active
    const conversationState = await client.conversationState.findUnique({
      where: { userId },
    })

    let isConversationActive = conversationState?.isActive || false

    if (!isConversationActive) {
      // If the conversation is not active, check for keyword match
      matcher = await matchKeyword(userMessage)

      if (!matcher || !matcher.automationId) {
        // No keyword match and conversation not active, don't respond
        return NextResponse.json({ message: "No keyword match" }, { status: 200 })
      }

      // Keyword matched, set the conversation as active
      await client.conversationState.upsert({
        where: { userId },
        update: { isActive: true, updatedAt: new Date() },
        create: { userId, isActive: true },
      })
      isConversationActive = true
    }

    console.log("Attempting to create Voiceflow user:", userId)
    const userCreated = await createVoiceflowUser(userId)
    if (!userCreated) {
      console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
    }

    let automation
    if (matcher && matcher.automationId) {
      automation = await getKeywordAutomation(matcher.automationId, webhook_payload.entry[0].messaging ? true : false)
    } else {
      const customer_history = await getChatHistory(pageId, senderId)
      if (customer_history.history.length > 0) {
        automation = await findAutomation(customer_history.automationId!)
      }
    }

    let businessVariables = {}
    if (automation?.userId) {
      // Fetch the business associated with the user of this automation
      const business = await client.business.findFirst({
        where: { userId: automation.userId },
      })

      if (business) {
        businessVariables = {
          business_name: business.businessName,
          welcome_message: business.welcomeMessage,
          business_industry: business.industry,
        }
      }
    }

    let voiceflowResponse =
      "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

    try {
      // Use the businessVariables in the Voiceflow response
      const response = await getVoiceflowResponse(userMessage, userId, businessVariables)
      voiceflowResponse = processVoiceflowResponse(response)
    } catch (error) {
      console.error("Error getting or processing Voiceflow response:", error)
    }

    console.log("Processed Voiceflow response:", voiceflowResponse)

    // Store the chat messages using the new server action
    const storedMessages = await storeChatMessages({
      userId,
      pageId,
      senderId,
      userMessage,
      botResponse: voiceflowResponse,
      automationId: automation?.id || "default",
    })

    if (!storedMessages.success) {
      console.error("Error storing chat messages:", storedMessages.error)
    }

    if (webhook_payload.entry[0].messaging) {
      const direct_message = await sendDM(
        pageId,
        senderId,
        voiceflowResponse,
        automation?.User?.integrations[0].token || process.env.DEFAULT_PAGE_TOKEN!,
      )

      if (direct_message.status === 200) {
        if (automation) {
          await trackResponses(automation.id, "DM")
        }
        return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
      }
    } else if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === "comments") {
      if (automation && automation.listener) {
        if (
          automation.listener.listener === "MESSAGE" ||
          (automation.listener.listener === "SMARTAI" && automation.User?.subscription?.plan === "PRO")
        ) {
          const direct_message = await sendPrivateMessage(
            pageId,
            webhook_payload.entry[0].changes[0].value.id,
            voiceflowResponse,
            automation.User?.integrations[0].token!,
          )

          console.log("Private message sent:", direct_message.data)
          if (direct_message.status === 200) {
            await trackResponses(automation.id, "COMMENT")
            return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
          }
        }
      } else {
        // No automation or listener, use default token
        const direct_message = await sendPrivateMessage(
          pageId,
          webhook_payload.entry[0].changes[0].value.id,
          voiceflowResponse,
          process.env.DEFAULT_PAGE_TOKEN!,
        )

        if (direct_message.status === 200) {
          return NextResponse.json({ message: "Message sent", storedMessages }, { status: 200 })
        }
      }
    }

    return NextResponse.json({ message: "Request processed", storedMessages }, { status: 200 })
  } catch (error) {
    console.error("Unhandled error in POST function:", error)
    return NextResponse.json(
      {
        message: "Error processing request",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

