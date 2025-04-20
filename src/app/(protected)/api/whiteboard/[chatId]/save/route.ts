// import { NextResponse } from "next/server"
// import { pusherServer } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"
// import { client } from "@/lib/prisma"

// export async function POST(request: Request, { params }: { params: { chatId: string } }) {
//   try {
//     const user = await onUserInfor()
//     if (!user.data?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const chatId = params.chatId
//     const { imageData } = await request.json()

//     // Check if user is a participant in this chat
//     const userParticipation = await client.collabChatParticipant.findFirst({
//       where: {
//         chatId,
//         userId: user.data.id,
//       },
//       include: {
//         business: true,
//         influencer: true,
//       },
//     })

//     if (!userParticipation) {
//       return NextResponse.json({ error: "You don't have access to this chat" }, { status: 403 })
//     }

//     // Create a message with the whiteboard image
//     const message = await client.collabMessage.create({
//       data: {
//         chatId,
//         senderId: userParticipation.id,
//         content: "Shared a whiteboard",
//         contentType: "whiteboard",
//         metadata: {
//           imageData,
//         },
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
//       const notification = await client.userNotification.create({
//         data: {
//           userId: participant.userId,
//           title: "New Whiteboard",
//           message: `${userParticipation.business?.businessName || userParticipation.influencer?.name || "A user"} shared a whiteboard`,
//           type: "chat",
//         },
//       })

//       // Trigger real-time notification
//       if (pusherServer) {
//         await pusherServer.trigger(`user-${participant.userId}`, "notification", {
//           id: notification.id,
//           title: notification.title,
//           message: notification.message,
//           type: notification.type,
//           chatId,
//         })

//         // Trigger real-time message update
//         await pusherServer.trigger(`chat-${chatId}`, "new-message", {
//           id: message.id,
//           content: message.content,
//           contentType: message.contentType,
//           createdAt: message.createdAt,
//           isRead: !!message.readAt,
//           metadata: message.metadata,
//           sender: {
//             id: message.sender.id,
//             businessName: message.sender.business?.businessName,
//             influencerName: message.sender.influencer?.name,
//             profilePicture: message.sender.influencer?.profilePicture,
//             isCurrentUser: false,
//           },
//         })
//       }
//     }

//     return NextResponse.json({ success: true, data: message })
//   } catch (error) {
//     console.error("Error in whiteboard save API:", error)
//     return NextResponse.json({ error: "Failed to save whiteboard" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { pusherServer } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"
import { client } from "@/lib/prisma"

export async function POST(request: Request, { params }: { params: { chatId: string } }) {
  try {
    const user = await onUserInfor()
    if (!user.data?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chatId = params.chatId
    const { imageData } = await request.json()

    // Check if user is a participant in this chat
    const userParticipation = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId: user.data.id,
      },
      include: {
        business: true,
        influencer: true,
      },
    })

    if (!userParticipation) {
      return NextResponse.json({ error: "You don't have access to this chat" }, { status: 403 })
    }

    // Create a message with the whiteboard image
    const message = await client.collabMessage.create({
      data: {
        chatId,
        senderId: userParticipation.id,
        content: "Shared a whiteboard",
        contentType: "whiteboard",
        metadata: {
          imageData,
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
        business: true,
        influencer: true,
      },
    })

    // Create notifications for other participants
    for (const participant of otherParticipants) {
      // Create database notification
      const notification = await client.userNotification.create({
        data: {
          userId: participant.userId,
          title: "New Whiteboard",
          message: `${userParticipation.business?.businessName || userParticipation.influencer?.name || "A user"} shared a whiteboard`,
          type: "chat",
        },
      })

      // Trigger real-time notification
      if (pusherServer) {
        await pusherServer.trigger(`user-${participant.userId}`, "notification", {
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          chatId,
        })

        // Trigger real-time message update
        await pusherServer.trigger(`chat-${chatId}`, "new-message", {
          id: message.id,
          content: message.content,
          contentType: message.contentType,
          createdAt: message.createdAt,
          isRead: !!message.readAt,
          metadata: message.metadata,
          sender: {
            id: userParticipation.id,
            businessName: userParticipation.business?.businessName,
            influencerName: userParticipation.influencer?.name,
            profilePicture: userParticipation.influencer?.profilePicture,
            isCurrentUser: false,
          },
        })
      }
    }

    // Also send a message to the current user
    if (pusherServer) {
      await pusherServer.trigger(`chat-${chatId}`, "new-message", {
        id: message.id,
        content: message.content,
        contentType: message.contentType,
        createdAt: message.createdAt,
        isRead: true,
        metadata: message.metadata,
        sender: {
          id: userParticipation.id,
          businessName: userParticipation.business?.businessName,
          influencerName: userParticipation.influencer?.name,
          profilePicture: userParticipation.influencer?.profilePicture,
          isCurrentUser: true,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: message.id,
        content: message.content,
        contentType: message.contentType,
        createdAt: message.createdAt,
        metadata: message.metadata,
        sender: {
          id: userParticipation.id,
          businessName: userParticipation.business?.businessName,
          influencerName: userParticipation.influencer?.name,
          profilePicture: userParticipation.influencer?.profilePicture,
          isCurrentUser: true,
        },
      },
    })
  } catch (error) {
    console.error("Error in whiteboard save API:", error)
    return NextResponse.json({ error: "Failed to save whiteboard" }, { status: 500 })
  }
}
