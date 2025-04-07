"use server"

import { client } from "@/lib/prisma"
import { onCurrentUser } from "../user"
import { revalidatePath } from "next/cache"
// types/chat.ts
export type Business = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  companyName: string;
  industry: string | null;
  website: string | null;
  logo: string | null;
  description: string | null;
  location: string | null;
  size: string | null;
  foundedYear: number | null;
};

export type Influencer = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  username: string;
  bio: string | null;
  profilePicture: string | null;
  niche: string | null;
  location: string | null;
  followerCount: number | null;
};

export type Participant = {
  userId: string;
  business: Business | null;
  influencer: Influencer | null;
};

export type Message = {
  id: string;
  content: string;
  contentType: string;
  createdAt: Date;
  chatId: string;
  senderId: string;
  readAt: Date | null;
  sender: {
    business: {
      id: string;
      companyName: string;
      // ... other business fields
    } | null;
    influencer: {
      id: string;
      username: string;
      // ... other influencer fields
    } | null;
  };
};

export type PaginatedMessages = {
  messages: Message[];
  pagination: {
    hasMore: boolean;
    cursor?: string;
  };
};

// Updated Chat type without name field
export type Chat = {
  id: string;
  updatedAt: Date;
  participants: {
    userId: string;
    influencer: {
      id: string;
      username: string;
    } | null;
    business: {
      id: string;
      companyName: string;
    } | null;
  }[];
  messages: Message[];
};

// Chat Actions
export const getChats = async () => {
  try {
    const user = await onCurrentUser()

    // Get all chats where user is a participant
    const chats = await client.collabChat.findMany({
      where: {
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            influencer: true,
            business: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return { status: 200, data: chats }
  } catch (error) {
    console.error("Error fetching chats:", error)
    return { status: 500, error: "Failed to fetch chats" }
  }
}



export const getChatMessages = async (chatId: string, page = 1, limit = 20) => {
  try {
    const user = await onCurrentUser()

    // Check if user is a participant
    const participant = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId: user.id,
      },
    })

    if (!participant) {
      return { status: 403, error: "Not authorized to view this chat" }
    }

    const skip = (page - 1) * limit

    const [messages, total] = await Promise.all([
      client.collabMessage.findMany({
        where: {
          chatId,
        },
        include: {
          sender: {
            include: {
              influencer: true,
              business: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      client.collabMessage.count({
        where: {
          chatId,
        },
      }),
    ])

    // Mark messages as read
    await client.collabMessage.updateMany({
      where: {
        chatId,
        senderId: {
          not: participant.id,
        },
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    })

    return {
      status: 200,
      data: {
        messages: messages.reverse(), // Return in chronological order
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
    }
  } catch (error) {
    console.error("Error fetching messages:", error)
    return { status: 500, error: "Failed to fetch messages" }
  }
}

export const sendMessage = async (chatId: string, content: string, contentType = "text") => {
  try {
    const user = await onCurrentUser()

    // Check if user is a participant
    const participant = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId: user.id,
      },
    })

    if (!participant) {
      return { status: 403, error: "Not authorized to send messages in this chat" }
    }

    const message = await client.collabMessage.create({
      data: {
        chatId,
        senderId: participant.id,
        content,
        contentType,
      },
    })

    // Update chat's updatedAt
    await client.collabChat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    })

    revalidatePath("/messaging")
    return { status: 201, data: message }
  } catch (error) {
    console.error("Error sending message:", error)
    return { status: 500, error: "Failed to send message" }
  }
}

export const createChat = async (participantId: string, isInfluencer: boolean) => {
  try {
    const user = await onCurrentUser()

    // Get user profiles
    const [influencerProfile, businessProfile] = await Promise.all([
      client.influencer.findUnique({
        where: { userId: user.id },
      }),
      client.businessProfile.findUnique({
        where: { userId: user.id },
      }),
    ])

    // Determine if current user is influencer or business
    const isCurrentUserInfluencer = !!influencerProfile

    // If both users are the same type, return error
    if (isCurrentUserInfluencer === isInfluencer) {
      return { status: 400, error: "Cannot create chat between same user types" }
    }

    // Get the other participant's profile
    let otherParticipant
    if (isInfluencer) {
      otherParticipant = await client.influencer.findUnique({
        where: { id: participantId },
        include: { user: true },
      })
    } else {
      otherParticipant = await client.businessProfile.findUnique({
        where: { id: participantId },
        include: { user: true },
      })
    }

    if (!otherParticipant) {
      return { status: 404, error: "Participant not found" }
    }

    // Check if chat already exists between these users
    const existingChat = await client.collabChat.findFirst({
      where: {
        AND: [
          {
            participants: {
              some: {
                userId: user.id,
              },
            },
          },
          {
            participants: {
              some: {
                userId: otherParticipant.user.id,
              },
            },
          },
        ],
      },
    })

    if (existingChat) {
      return { status: 200, data: existingChat }
    }

    // Create new chat
    const chat = await client.collabChat.create({
      data: {
        participants: {
          create: [
            {
              userId: user.id,
              ...(isCurrentUserInfluencer
                ? { influencerId: influencerProfile!.id }
                : { businessId: businessProfile!.id }),
            },
            {
              userId: otherParticipant.user.id,
              ...(isInfluencer ? { influencerId: participantId } : { businessId: participantId }),
            },
          ],
        },
      },
      include: {
        participants: {
          include: {
            influencer: true,
            business: true,
          },
        },
      },
    })

    revalidatePath("/messaging")
    return { status: 201, data: chat }
  } catch (error) {
    console.error("Error creating chat:", error)
    return { status: 500, error: "Failed to create chat" }
  }
}

export const getUnreadMessageCount = async () => {
  try {
    const user = await onCurrentUser()

    // Get all chats where user is a participant
    const chats = await client.collabChat.findMany({
      where: {
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        participants: {
          where: {
            userId: user.id,
          },
        },
      },
    })

    // Get unread message count for each chat
    const unreadCounts = await Promise.all(
      chats.map(async (chat) => {
        const participantId = chat.participants[0].id

        const count = await client.collabMessage.count({
          where: {
            chatId: chat.id,
            senderId: {
              not: participantId,
            },
            readAt: null,
          },
        })

        return {
          chatId: chat.id,
          count,
        }
      }),
    )

    const totalUnread = unreadCounts.reduce((sum, item) => sum + item.count, 0)

    return {
      status: 200,
      data: {
        total: totalUnread,
        chats: unreadCounts,
      },
    }
  } catch (error) {
    console.error("Error getting unread message count:", error)
    return { status: 500, error: "Failed to get unread message count" }
  }
}

