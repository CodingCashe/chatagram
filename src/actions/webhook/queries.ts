// "use server"
// import { client } from '@/lib/prisma'
// import type { Message, Conversation } from "@/types/chat"

// export const matchKeyword = async (keyword: string) => {
//   return await client.keyword.findFirst({
//     where: {
//       word: {
//         equals: keyword,
//         mode: 'insensitive',
//       },
//     },
//   })
// }

// export const getKeywordAutomation = async (
//   automationId: string,
//   dm: boolean
// ) => {
//   return await client.automation.findUnique({
//     where: {
//       id: automationId,
//     },

//     include: {
//       dms: dm,
//       trigger: {
//         where: {
//           type: dm ? 'DM' : 'COMMENT',
//         },
//       },
//       listener: true,
//       User: {
//         select: {
//           subscription: {
//             select: {
//               plan: true,
//             },
//           },
//           integrations: {
//             select: {
//               token: true,              
//             },
//           },
//         },
//       },
//     },
//   })
// }
// export const trackResponses = async (
//   automationId: string,
//   type: 'COMMENT' | 'DM'
// ) => {
//   if (type === 'COMMENT') {
//     return await client.listener.update({
//       where: { automationId },
//       data: {
//         commentCount: {
//           increment: 1,
//         },
//       },
//     })
//   }

//   if (type === 'DM') {
//     return await client.listener.update({
//       where: { automationId },
//       data: {
//         dmCount: {
//           increment: 1,
//         },
//       },
//     })
//   }
// }

// export const createChatHistory = (
//   automationId: string,
//   sender: string,
//   reciever: string,
//   message: string
// ) => {
//   return client.automation.update({
//     where: {
//       id: automationId,
//     },
//     data: {
//       dms: {
//         create: {
//           reciever,
//           senderId: sender,
//           message,
//         },
//       },
//     },
//   })
// }

// export const getKeywordPost = async (postId: string, automationId: string) => {
//   return await client.post.findFirst({
//     where: {
//       AND: [{ postid: postId }, { automationId }],
//     },
//     select: { automationId: true },
//   })
// }

// export const getChatHistory = async (sender: string, reciever: string) => {
//   const history = await client.dms.findMany({
//     where: {
//       AND: [{ senderId: sender }, { reciever }],
//     },
//     orderBy: { createdAt: 'asc' },
//   })
//   const chatSession: {
//     role: 'assistant' | 'user'
//     content: string
//   }[] = history.map((chat) => {
//     return {
//       role: chat.reciever ? 'assistant' : 'user',
//       content: chat.message!,
//     }
//   })

//   return {
//     history: chatSession,
//     automationId: history[history.length - 1].automationId,
//   }
// }



"use server"
import { client } from '@/lib/prisma'
import type { Message, Conversation } from "@/types/chat"

export const matchKeyword = async (keyword: string) => {
  return await client.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: 'insensitive',
      },
    },
  })
}

export const getKeywordAutomation = async (
  automationId: string,
  dm: boolean
) => {
  return await client.automation.findUnique({
    where: {
      id: automationId,
    },
    include: {
      dms: dm,
      trigger: {
        where: {
          type: dm ? 'DM' : 'COMMENT',
        },
      },
      listener: true,
      User: {
        select: {
          subscription: {
            select: {
              plan: true,
            },
          },
          integrations: {
            select: {
              token: true,
              name: true,
              phoneNumber: true,
              pageId: true,
            },
          },
        },
      },
    },
  })
}

export const trackResponses = async (
  automationId: string,
  type: 'COMMENT' | 'DM' | 'WHATSAPP' | 'FACEBOOK_MESSAGE' | 'FACEBOOK_COMMENT'
) => {
  // Group similar types together
  const commentTypes = ['COMMENT', 'FACEBOOK_COMMENT'];
  const dmTypes = ['DM', 'WHATSAPP', 'FACEBOOK_MESSAGE'];
  
  // For comment-like interactions
  if (commentTypes.includes(type)) {
    return await client.listener.update({
      where: { automationId },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    })
  }

  // For message-like interactions
  if (dmTypes.includes(type)) {
    return await client.listener.update({
      where: { automationId },
      data: {
        dmCount: {
          increment: 1,
        },
      },
    })
  }
}

export const createChatHistory = (
  automationId: string,
  sender: string,
  reciever: string,
  message: string
) => {
  return client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      dms: {
        create: {
          reciever,
          senderId: sender,
          message,
        },
      },
    },
  })
}

export const getKeywordPost = async (postId: string, automationId: string) => {
  return await client.post.findFirst({
    where: {
      AND: [{ postid: postId }, { automationId }],
    },
    select: { automationId: true },
  })
}

export const getChatHistory = async (sender: string, reciever: string) => {
  const history = await client.dms.findMany({
    where: {
      AND: [{ senderId: sender }, { reciever }],
    },
    orderBy: { createdAt: 'asc' },
  })
  const chatSession: {
    role: 'assistant' | 'user'
    content: string
  }[] = history.map((chat) => {
    return {
      role: chat.reciever ? 'assistant' : 'user',
      content: chat.message!,
    }
  })

  return {
    history: chatSession,
    automationId: history.length > 0 ? history[history.length - 1].automationId : null,
  }
}