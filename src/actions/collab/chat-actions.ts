// "use server"

// import { client } from "@/lib/prisma"
// import { onUserInfor } from "@/actions/user"
// import { revalidatePath } from "next/cache"
// import { pusherServer } from "@/lib/pusher"

// // Get or create a chat between a business and an influencer
// export async function getOrCreateChat(influencerId: string) {
//   try {
//     const user = await onUserInfor()
//     const userId = user.data?.id

//     if (!userId) {
//       return { status: 401, message: "Unauthorized" }
//     }

//     // Find the business associated with the current user
//     const business = await client.business.findFirst({
//       where: { userId },
//     })

//     if (!business) {
//       return { status: 404, message: "Business not found for current user" }
//     }

//     // Check if a chat already exists between this business and influencer
//     const existingChatParticipant = await client.collabChatParticipant.findFirst({
//       where: {
//         businessId: business.id,
//         AND: {
//           chat: {
//             participants: {
//               some: {
//                 influencerId,
//               },
//             },
//           },
//         },
//       },
//       include: {
//         chat: {
//           include: {
//             participants: true,
//           },
//         },
//       },
//     })

//     if (existingChatParticipant) {
//       // Chat already exists, return it
//       return {
//         status: 200,
//         data: existingChatParticipant.chat,
//         isNew: false,
//       }
//     }

//     // Create a new chat
//     const newChat = await client.collabChat.create({
//       data: {
//         title: "New Conversation",
//         participants: {
//           create: [
//             // Business participant
//             {
//               userId,
//               businessId: business.id,
//             },
//             // Influencer participant
//             {
//               userId, // This will be updated when the influencer joins
//               influencerId,
//             },
//           ],
//         },
//       },
//       include: {
//         participants: true,
//       },
//     })

//     // Create a notification for the influencer
//     const influencer = await client.influencer.findUnique({
//       where: { id: influencerId },
//       include: { user: true },
//     })

//     if (influencer?.userId) {
//       await client.userNotification.create({
//         data: {
//           userId: influencer.userId,
//           title: "New Message",
//           message: `${business.businessName} wants to chat with you`,
//           type: "chat",
//         },
//       })

//       // Trigger real-time notification
//       await pusherServer.trigger(`user-${influencer.userId}`, "notification", {
//         title: "New Message",
//         message: `${business.businessName} wants to chat with you`,
//         type: "chat",
//         chatId: newChat.id,
//       })
//     }

//     return {
//       status: 200,
//       data: newChat,
//       isNew: true,
//     }
//   } catch (error) {
//     console.error("Error in getOrCreateChat:", error)
//     return { status: 500, message: "Failed to create or retrieve chat" }
//   }
// }

// // Get all chats for the current user
// export async function getUserChats() {
//   try {
//     const user = await onUserInfor()
//     const userId = user.data?.id

//     if (!userId) {
//       return { status: 401, message: "Unauthorized" }
//     }

//     // Get all chats where the user is a participant
//     const chatParticipations = await client.collabChatParticipant.findMany({
//       where: { userId },
//       include: {
//         chat: {
//           include: {
//             participants: {
//               include: {
//                 influencer: true,
//                 business: true,
//               },
//             },
//             messages: {
//               orderBy: { createdAt: "desc" },
//               take: 1,
//             },
//           },
//         },
//       },
//       orderBy: {
//         chat: {
//           updatedAt: "desc",
//         },
//       },
//     })

//     // Format the chats for the frontend
//     const chats = chatParticipations.map((participation) => {
//       const chat = participation.chat

//       // Find the other participant (not the current user)
//       const otherParticipants = chat.participants.filter(
//         (p) =>
//           p.userId !== userId ||
//           (p.businessId && participation.businessId !== p.businessId) ||
//           (p.influencerId && participation.influencerId !== p.influencerId),
//       )

//       const lastMessage = chat.messages[0] || null

//       // Determine if there are unread messages
//       const hasUnread = lastMessage && lastMessage.senderId !== participation.id && !lastMessage.readAt

//       return {
//         id: chat.id,
//         title: chat.title || "Conversation",
//         lastMessage: lastMessage
//           ? {
//               content: lastMessage.content,
//               createdAt: lastMessage.createdAt,
//               isRead: !!lastMessage.readAt,
//             }
//           : null,
//         participants: otherParticipants.map((p) => ({
//           id: p.id,
//           userId: p.userId,
//           businessId: p.businessId,
//           influencerId: p.influencerId,
//           businessName: p.business?.businessName,
//           influencerName: p.influencer?.name,
//           profilePicture: p.influencer?.profilePicture,
//         })),
//         hasUnread,
//         updatedAt: chat.updatedAt,
//       }
//     })

//     return { status: 200, data: chats }
//   } catch (error) {
//     console.error("Error in getUserChats:", error)
//     return { status: 500, message: "Failed to retrieve chats" }
//   }
// }

// // Get chat by ID with messages
// export async function getChatById(chatId: string) {
//   try {
//     const user = await onUserInfor()
//     const userId = user.data?.id

//     if (!userId) {
//       return { status: 401, message: "Unauthorized" }
//     }

//     // Check if user is a participant in this chat
//     const userParticipation = await client.collabChatParticipant.findFirst({
//       where: {
//         chatId,
//         userId,
//       },
//     })

//     if (!userParticipation) {
//       return { status: 403, message: "You don't have access to this chat" }
//     }

//     // Get the chat with participants and messages
//     const chat = await client.collabChat.findUnique({
//       where: { id: chatId },
//       include: {
//         participants: {
//           include: {
//             influencer: true,
//             business: true,
//           },
//         },
//         messages: {
//           orderBy: { createdAt: "asc" },
//           include: {
//             sender: {
//               include: {
//                 influencer: true,
//                 business: true,
//               },
//             },
//           },
//         },
//       },
//     })

//     if (!chat) {
//       return { status: 404, message: "Chat not found" }
//     }

//     // Mark unread messages as read
//     await client.collabMessage.updateMany({
//       where: {
//         chatId,
//         senderId: { not: userParticipation.id },
//         readAt: null,
//       },
//       data: {
//         readAt: new Date(),
//       },
//     })

//     // Format the chat for the frontend
//     const formattedChat = {
//       id: chat.id,
//       title: chat.title || "Conversation",
//       participants: chat.participants.map((p) => ({
//         id: p.id,
//         userId: p.userId,
//         businessId: p.businessId,
//         influencerId: p.influencerId,
//         businessName: p.business?.businessName,
//         influencerName: p.influencer?.name,
//         profilePicture: p.influencer?.profilePicture,
//         isCurrentUser: p.userId === userId,
//       })),
//       messages: chat.messages.map((msg) => ({
//         id: msg.id,
//         content: msg.content,
//         contentType: msg.contentType,
//         createdAt: msg.createdAt,
//         isRead: !!msg.readAt,
//         sender: {
//           id: msg.sender.id,
//           businessName: msg.sender.business?.businessName,
//           influencerName: msg.sender.influencer?.name,
//           profilePicture: msg.sender.influencer?.profilePicture,
//           isCurrentUser: msg.sender.userId === userId,
//         },
//       })),
//       currentParticipantId: userParticipation.id,
//     }

//     return { status: 200, data: formattedChat }
//   } catch (error) {
//     console.error("Error in getChatById:", error)
//     return { status: 500, message: "Failed to retrieve chat" }
//   }
// }

// // Send a message in a chat
// export async function sendMessage(chatId: string, content: string, contentType = "text") {
//   try {
//     const user = await onUserInfor()
//     const userId = user.data?.id

//     if (!userId) {
//       return { status: 401, message: "Unauthorized" }
//     }

//     // Check if user is a participant in this chat
//     const userParticipation = await client.collabChatParticipant.findFirst({
//       where: {
//         chatId,
//         userId,
//       },
//     })

//     if (!userParticipation) {
//       return { status: 403, message: "You don't have access to this chat" }
//     }

//     // Create the message
//     const message = await client.collabMessage.create({
//       data: {
//         chatId,
//         senderId: userParticipation.id,
//         content,
//         contentType,
//       },
//       include: {
//         sender: {
//           include: {
//             influencer: true,
//             business: true,
//           },
//         },
//       },
//     })

//     // Update the chat's updatedAt timestamp
//     await client.collabChat.update({
//       where: { id: chatId },
//       data: { updatedAt: new Date() },
//     })

//     // Get all other participants to notify them
//     const otherParticipants = await client.collabChatParticipant.findMany({
//       where: {
//         chatId,
//         id: { not: userParticipation.id },
//       },
//       include: {
//         user: true,
//       },
//     })

//     // Create notifications for other participants
//     for (const participant of otherParticipants) {
//       // Create database notification
//       await client.userNotification.create({
//         data: {
//           userId: participant.userId,
//           title: "New Message",
//           message: `You have a new message from ${userParticipation.businessId || userParticipation.influencerId || "a user"}`,
//           type: "chat",
//         },
//       })

//       // Trigger real-time notification
//       await pusherServer.trigger(`user-${participant.userId}`, "notification", {
//         title: "New Message",
//         message: `You have a new message from ${userParticipation.businessId || userParticipation.influencerId || "a user"}`,
//         type: "chat",
//         chatId,
//       })

//       // Trigger real-time message update
//       await pusherServer.trigger(`chat-${chatId}`, "new-message", {
//         id: message.id,
//         content: message.content,
//         contentType: message.contentType,
//         createdAt: message.createdAt,
//         isRead: !!message.readAt,
//         sender: {
//           id: message.sender.id,
//           businessName: message.sender.business?.businessName,
//           influencerName: message.sender.influencer?.name,
//           profilePicture: message.sender.influencer?.profilePicture,
//           isCurrentUser: false,
//         },
//       })
//     }

//     // Format the message for the frontend
//     const formattedMessage = {
//       id: message.id,
//       content: message.content,
//       contentType: message.contentType,
//       createdAt: message.createdAt,
//       isRead: !!message.readAt,
//       sender: {
//         id: message.sender.id,
//         businessName: message.sender.business?.businessName,
//         influencerName: message.sender.influencer?.name,
//         profilePicture: message.sender.influencer?.profilePicture,
//         isCurrentUser: true,
//       },
//     }

//     revalidatePath(`/messages/${chatId}`)

//     return { status: 200, data: formattedMessage }
//   } catch (error) {
//     console.error("Error in sendMessage:", error)
//     return { status: 500, message: "Failed to send message" }
//   }
// }

// // Get unread message count for the current user
// export async function getUnreadMessageCount() {
//   try {
//     const user = await onUserInfor()
//     const userId = user.data?.id

//     if (!userId) {
//       return { status: 401, message: "Unauthorized" }
//     }

//     // Get all user's chat participations
//     const userParticipations = await client.collabChatParticipant.findMany({
//       where: { userId },
//       select: { id: true },
//     })

//     const participationIds = userParticipations.map((p) => p.id)

//     // Count unread messages where the user is not the sender
//     const unreadCount = await client.collabMessage.count({
//       where: {
//         sender: {
//           id: { notIn: participationIds },
//         },
//         chat: {
//           participants: {
//             some: {
//               id: { in: participationIds },
//             },
//           },
//         },
//         readAt: null,
//       },
//     })

//     return { status: 200, data: { unreadCount } }
//   } catch (error) {
//     console.error("Error in getUnreadMessageCount:", error)
//     return { status: 500, message: "Failed to get unread message count" }
//   }
// }

// // Mark all messages in a chat as read
// export async function markChatAsRead(chatId: string) {
//   try {
//     const user = await onUserInfor()
//     const userId = user.data?.id

//     if (!userId) {
//       return { status: 401, message: "Unauthorized" }
//     }

//     // Check if user is a participant in this chat
//     const userParticipation = await client.collabChatParticipant.findFirst({
//       where: {
//         chatId,
//         userId,
//       },
//     })

//     if (!userParticipation) {
//       return { status: 403, message: "You don't have access to this chat" }
//     }

//     // Mark all messages not sent by the user as read
//     await client.collabMessage.updateMany({
//       where: {
//         chatId,
//         senderId: { not: userParticipation.id },
//         readAt: null,
//       },
//       data: {
//         readAt: new Date(),
//       },
//     })

//     revalidatePath(`/messages/${chatId}`)

//     return { status: 200, message: "Messages marked as read" }
//   } catch (error) {
//     console.error("Error in markChatAsRead:", error)
//     return { status: 500, message: "Failed to mark messages as read" }
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { onUserInfor } from "@/actions/user"
import { revalidatePath } from "next/cache"
import { pusherServer } from "@/lib/pusher"

// Get or create a chat between a business and an influencer
export async function getOrCreateChat(influencerId: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Find the business associated with the current user
    const business = await client.business.findFirst({
      where: { userId },
    })

    if (!business) {
      return { status: 404, message: "Business not found for current user" }
    }

    // Check if a chat already exists between this business and influencer
    const existingChatParticipant = await client.collabChatParticipant.findFirst({
      where: {
        businessId: business.id,
        AND: {
          chat: {
            participants: {
              some: {
                influencerId,
              },
            },
          },
        },
      },
      include: {
        chat: {
          include: {
            participants: true,
          },
        },
      },
    })

    if (existingChatParticipant) {
      // Chat already exists, return it
      return {
        status: 200,
        data: existingChatParticipant.chat,
        isNew: false,
      }
    }

    // Create a new chat
    const newChat = await client.collabChat.create({
      data: {
        title: "New Conversation",
        participants: {
          create: [
            // Business participant
            {
              userId,
              businessId: business.id,
            },
            // Influencer participant
            {
              userId, // This will be updated when the influencer joins
              influencerId,
            },
          ],
        },
      },
      include: {
        participants: true,
      },
    })

    // Create a notification for the influencer
    const influencer = await client.influencer.findUnique({
      where: { id: influencerId },
      include: { user: true },
    })

    if (influencer?.userId) {
      await client.userNotification.create({
        data: {
          userId: influencer.userId,
          title: "New Message",
          message: `${business.businessName} wants to chat with you`,
          type: "chat",
        },
      })

      // Trigger real-time notification
      await pusherServer.trigger(`user-${influencer.userId}`, "notification", {
        title: "New Message",
        message: `${business.businessName} wants to chat with you`,
        type: "chat",
        chatId: newChat.id,
      })
    }

    return {
      status: 200,
      data: newChat,
      isNew: true,
    }
  } catch (error) {
    console.error("Error in getOrCreateChat:", error)
    return { status: 500, message: "Failed to create or retrieve chat" }
  }
}

// Get all chats for the current user
export async function getUserChats() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Get all chats where the user is a participant
    const chatParticipations = await client.collabChatParticipant.findMany({
      where: { userId },
      include: {
        chat: {
          include: {
            participants: {
              include: {
                influencer: true,
                business: true,
              },
            },
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        chat: {
          updatedAt: "desc",
        },
      },
    })

    // Format the chats for the frontend
    const chats = chatParticipations.map((participation) => {
      const chat = participation.chat

      // Find the other participant (not the current user)
      const otherParticipants = chat.participants.filter(
        (p) =>
          p.userId !== userId ||
          (p.businessId && participation.businessId !== p.businessId) ||
          (p.influencerId && participation.influencerId !== p.influencerId),
      )

      const lastMessage = chat.messages[0] || null

      // Determine if there are unread messages
      const hasUnread = lastMessage && lastMessage.senderId !== participation.id && !lastMessage.readAt

      return {
        id: chat.id,
        title: chat.title || "Conversation",
        lastMessage: lastMessage
          ? {
              content: lastMessage.content,
              createdAt: lastMessage.createdAt,
              isRead: !!lastMessage.readAt,
            }
          : null,
        participants: otherParticipants.map((p) => ({
          id: p.id,
          userId: p.userId,
          businessId: p.businessId,
          influencerId: p.influencerId,
          businessName: p.business?.businessName,
          influencerName: p.influencer?.name,
          profilePicture: p.influencer?.profilePicture,
        })),
        hasUnread,
        updatedAt: chat.updatedAt,
      }
    })

    return { status: 200, data: chats }
  } catch (error) {
    console.error("Error in getUserChats:", error)
    return { status: 500, message: "Failed to retrieve chats" }
  }
}

// Get chat by ID with messages
export async function getChatById(chatId: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Check if user is a participant in this chat
    const userParticipation = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId,
      },
    })

    if (!userParticipation) {
      return { status: 403, message: "You don't have access to this chat" }
    }

    // Get the chat with participants and messages
    const chat = await client.collabChat.findUnique({
      where: { id: chatId },
      include: {
        participants: {
          include: {
            influencer: true,
            business: true,
          },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: {
              include: {
                influencer: true,
                business: true,
              },
            },
          },
        },
      },
    })

    if (!chat) {
      return { status: 404, message: "Chat not found" }
    }

    // Mark unread messages as read
    await client.collabMessage.updateMany({
      where: {
        chatId,
        senderId: { not: userParticipation.id },
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    })

    // Format the chat for the frontend
    const formattedChat = {
      id: chat.id,
      title: chat.title || "Conversation",
      participants: chat.participants.map((p) => ({
        id: p.id,
        userId: p.userId,
        businessId: p.businessId,
        influencerId: p.influencerId,
        businessName: p.business?.businessName,
        influencerName: p.influencer?.name,
        profilePicture: p.influencer?.profilePicture,
        isCurrentUser: p.userId === userId,
      })),
      messages: chat.messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        contentType: msg.contentType,
        createdAt: msg.createdAt,
        isRead: !!msg.readAt,
        sender: {
          id: msg.sender.id,
          businessName: msg.sender.business?.businessName,
          influencerName: msg.sender.influencer?.name,
          profilePicture: msg.sender.influencer?.profilePicture,
          isCurrentUser: msg.sender.userId === userId,
        },
      })),
      currentParticipantId: userParticipation.id,
    }

    return { status: 200, data: formattedChat }
  } catch (error) {
    console.error("Error in getChatById:", error)
    return { status: 500, message: "Failed to retrieve chat" }
  }
}

// Send a message in a chat
export async function sendMessage(chatId: string, content: string, contentType = "text") {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Check if user is a participant in this chat
    const userParticipation = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId,
      },
    })

    if (!userParticipation) {
      return { status: 403, message: "You don't have access to this chat" }
    }

    // Create the message
    const message = await client.collabMessage.create({
      data: {
        chatId,
        senderId: userParticipation.id,
        content,
        contentType,
      },
      include: {
        sender: {
          include: {
            influencer: true,
            business: true,
          },
        },
      },
    })

    // Update the chat's updatedAt timestamp
    await client.collabChat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    })

    // Get all other participants to notify them
    const otherParticipants = await client.collabChatParticipant.findMany({
      where: {
        chatId,
        id: { not: userParticipation.id },
      },
      include: {
        user: true,
      },
    })

    // Create notifications for other participants
    for (const participant of otherParticipants) {
      // Create database notification
      await client.userNotification.create({
        data: {
          userId: participant.userId,
          title: "New Message",
          message: `You have a new message from ${userParticipation.businessId || userParticipation.influencerId|| "a user"}`,
          type: "chat",
        },
      })

      // Trigger real-time notification
      await pusherServer.trigger(`user-${participant.userId}`, "notification", {
        title: "New Message",
        message: `You have a new message from ${userParticipation.businessId || userParticipation.influencerId || "a user"}`,
        type: "chat",
        chatId,
      })

      // Trigger real-time message update
      await pusherServer.trigger(`chat-${chatId}`, "new-message", {
        id: message.id,
        content: message.content,
        contentType: message.contentType,
        createdAt: message.createdAt,
        isRead: !!message.readAt,
        sender: {
          id: message.sender.id,
          businessName: message.sender.business?.businessName,
          influencerName: message.sender.influencer?.name,
          profilePicture: message.sender.influencer?.profilePicture,
          isCurrentUser: false,
        },
      })
    }

    // Format the message for the frontend
    const formattedMessage = {
      id: message.id,
      content: message.content,
      contentType: message.contentType,
      createdAt: message.createdAt,
      isRead: !!message.readAt,
      sender: {
        id: message.sender.id,
        businessName: message.sender.business?.businessName,
        influencerName: message.sender.influencer?.name,
        profilePicture: message.sender.influencer?.profilePicture,
        isCurrentUser: true,
      },
    }

    revalidatePath(`/messages/${chatId}`)

    return { status: 200, data: formattedMessage }
  } catch (error) {
    console.error("Error in sendMessage:", error)
    return { status: 500, message: "Failed to send message" }
  }
}

// Get unread message count for the current user
export async function getUnreadMessageCount() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Get all user's chat participations
    const userParticipations = await client.collabChatParticipant.findMany({
      where: { userId },
      select: { id: true },
    })

    const participationIds = userParticipations.map((p) => p.id)

    // Count unread messages where the user is not the sender
    const unreadCount = await client.collabMessage.count({
      where: {
        sender: {
          id: { notIn: participationIds },
        },
        chat: {
          participants: {
            some: {
              id: { in: participationIds },
            },
          },
        },
        readAt: null,
      },
    })

    return { status: 200, data: { unreadCount } }
  } catch (error) {
    console.error("Error in getUnreadMessageCount:", error)
    return { status: 500, message: "Failed to get unread message count" }
  }
}

// Mark all messages in a chat as read
export async function markChatAsRead(chatId: string) {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Check if user is a participant in this chat
    const userParticipation = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId,
      },
    })

    if (!userParticipation) {
      return { status: 403, message: "You don't have access to this chat" }
    }

    // Mark all messages not sent by the user as read
    await client.collabMessage.updateMany({
      where: {
        chatId,
        senderId: { not: userParticipation.id },
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    })

    revalidatePath(`/messages/${chatId}`)

    return { status: 200, message: "Messages marked as read" }
  } catch (error) {
    console.error("Error in markChatAsRead:", error)
    return { status: 500, message: "Failed to mark messages as read" }
  }
}
