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
            },
          },
        },
      },
    },
  })
}
export const trackResponses = async (
  automationId: string,
  type: 'COMMENT' | 'DM'
) => {
  if (type === 'COMMENT') {
    return await client.listener.update({
      where: { automationId },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    })
  }

  if (type === 'DM') {
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
    automationId: history[history.length - 1].automationId,
  }
}


// // ... (previous code remains unchanged)

// export const getChatHistori = async (automationId: string) => {
//   const history = await client.dms.findMany({
//     where: {
//       automationId: automationId,
//     },
//     orderBy: { createdAt: "asc" },
//   })

//   const chatSession = history.map((chat) => {
//     return {
//       role: chat.senderId === automationId ? "assistant" : "user",
//       content: chat.message ?? "",
//       senderId: chat.senderId ?? "",
//       receiverId: chat.reciever ?? "",
//     }
//   })

//   // Group messages by unique conversations (unique receiverId)
//   const groupedChats = chatSession.reduce(
//     (acc, message) => {
//       const key = message.role === "assistant" ? message.receiverId : message.senderId
//       if (key) {
//         if (!acc[key]) {
//           acc[key] = []
//         }
//         acc[key].push(message)
//       }
//       return acc
//     },
//     {} as Record<string, typeof chatSession>,
//   )

//   return {
//     conversations: Object.entries(groupedChats).map(([userId, messages]) => ({
//       userId,
//       messages,
//     })),
//     automationId: automationId,
//   }
// }



// ... (previous code remains unchanged)

export const getChatHistori = async (
  automationId: string,
): Promise<{ conversations: Conversation[]; automationId: string }> => {
  const history = await client.dms.findMany({
    where: {
      automationId: automationId,
    },
    orderBy: { createdAt: "asc" },
  })

  const chatSession: Message[] = history.map((chat) => {
    return {
      role: chat.senderId === automationId ? "assistant" : "user",
      content: chat.message ?? "",
      senderId: chat.senderId ?? "",
      receiverId: chat.reciever ?? "",
    }
  })

  // Group messages by unique conversations (unique receiverId)
  const groupedChats = chatSession.reduce(
    (acc, message) => {
      const key = message.role === "assistant" ? message.receiverId : message.senderId
      if (key) {
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(message)
      }
      return acc
    },
    {} as Record<string, Message[]>,
  )

  const conversations: Conversation[] = Object.entries(groupedChats).map(([userId, messages]) => ({
    userId,
    messages,
  }))

  return {
    conversations,
    automationId,
  }
}

// ... (rest of the code remains unchanged)

