import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"

// Webhook endpoint for external services to send messages
export async function POST(request: Request, { params }: { params: { chatId: string } }) {
  try {
    const usar = await onUserInfor()
    const  userId  = usar.data?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chatId = params.chatId
    const { content, contentType = "text" } = await request.json()

    // Validate required fields
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Check if user is a participant in this chat
    const user = await client.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userParticipation = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId: user.id,
      },
    })

    if (!userParticipation) {
      return NextResponse.json({ error: "You don't have access to this chat" }, { status: 403 })
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
          message: `You have a new message from ${userParticipation.businessId || userParticipation.influencerId || "a user"}`,
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

    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    console.error("Error in message API:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
