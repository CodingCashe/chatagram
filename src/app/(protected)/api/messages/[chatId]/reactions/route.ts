// import { NextResponse } from "next/server"
// import { client } from "@/lib/prisma"
// import { pusherServer } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"

// export async function POST(request: Request, { params }: { params: { chatId: string } }) {
//   try {
//     const user = await onUserInfor()
//     if (!user.data?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const chatId = params.chatId
//     const { messageId, emoji } = await request.json()

//     if (!messageId || !emoji) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     // Check if user is a participant in this chat
//     const userParticipation = await client.collabChatParticipant.findFirst({
//       where: {
//         chatId,
//         userId: user.data.id,
//       },
//     })

//     if (!userParticipation) {
//       return NextResponse.json({ error: "You don't have access to this chat" }, { status: 403 })
//     }

//     // Get the message
//     const message = await client.collabMessage.findUnique({
//       where: { id: messageId },
//     })

//     if (!message) {
//       return NextResponse.json({ error: "Message not found" }, { status: 404 })
//     }

//     // Get current reactions or initialize empty array
//     const currentMetadata = message.metadata || {}
//     const currentReactions = currentMetadata.reactions || []

//     // Check if user already reacted with this emoji
//     const existingReactionIndex = currentReactions.findIndex(
//       (r: any) => r.emoji === emoji && r.users.includes(user.data.id),
//     )

//     const updatedReactions = [...currentReactions]

//     if (existingReactionIndex >= 0) {
//       // User already reacted with this emoji, remove their reaction
//       const reaction = updatedReactions[existingReactionIndex]

//       if (reaction.users.length === 1) {
//         // If this is the only user who reacted with this emoji, remove the reaction
//         updatedReactions.splice(existingReactionIndex, 1)
//       } else {
//         // Otherwise, remove the user from the users array and decrement count
//         reaction.users = reaction.users.filter((id: string) => id !== user.data.id)
//         reaction.count -= 1
//         updatedReactions[existingReactionIndex] = reaction
//       }
//     } else {
//       // Find if this emoji already exists
//       const emojiIndex = updatedReactions.findIndex((r: any) => r.emoji === emoji)

//       if (emojiIndex >= 0) {
//         // Emoji exists, add user to it
//         const reaction = updatedReactions[emojiIndex]
//         reaction.users.push(user.data.id)
//         reaction.count += 1
//         updatedReactions[emojiIndex] = reaction
//       } else {
//         // New emoji reaction
//         updatedReactions.push({
//           emoji,
//           count: 1,
//           users: [user.data.id],
//         })
//       }
//     }

//     // Update message metadata with new reactions
//     const updatedMetadata = {
//       ...currentMetadata,
//       reactions: updatedReactions,
//     }

//     // Update the message in the database
//     await client.collabMessage.update({
//       where: { id: messageId },
//       data: {
//         metadata: updatedMetadata,
//       },
//     })

//     // Notify all participants about the reaction update
//     if (pusherServer) {
//       await pusherServer.trigger(`chat-${chatId}`, "message-reaction", {
//         messageId,
//         reactions: updatedReactions,
//       })
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         messageId,
//         reactions: updatedReactions,
//       },
//     })
//   } catch (error) {
//     console.error("Error in message reaction API:", error)
//     return NextResponse.json({ error: "Failed to process reaction" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"

export async function POST(request: Request, { params }: { params: { chatId: string } }) {
  try {
    const user = await onUserInfor()
    if (!user.data?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chatId = params.chatId
    const { messageId, emoji } = await request.json()

    if (!messageId || !emoji) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user is a participant in this chat
    const userParticipation = await client.collabChatParticipant.findFirst({
      where: {
        chatId,
        userId: user.data.id,
      },
    })

    if (!userParticipation) {
      return NextResponse.json({ error: "You don't have access to this chat" }, { status: 403 })
    }

    // Get the message
    const message = await client.collabMessage.findUnique({
      where: { id: messageId },
    })

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    // Get current reactions or initialize empty array
    const currentMetadata = message.metadata || {}
    // Use type assertion to tell TypeScript about the structure
    const typedMetadata = currentMetadata as { reactions?: any[] }
    const currentReactions = typedMetadata.reactions || []

    // Check if user already reacted with this emoji
    const existingReactionIndex = currentReactions.findIndex(
      (r: any) => r.emoji === emoji && r.users.includes(user.data.id),
    )

    const updatedReactions = [...currentReactions]

    if (existingReactionIndex >= 0) {
      // User already reacted with this emoji, remove their reaction
      const reaction = updatedReactions[existingReactionIndex]

      if (reaction.users.length === 1) {
        // If this is the only user who reacted with this emoji, remove the reaction
        updatedReactions.splice(existingReactionIndex, 1)
      } else {
        // Otherwise, remove the user from the users array and decrement count
        reaction.users = reaction.users.filter((id: string) => id !== user.data.id)
        reaction.count -= 1
        updatedReactions[existingReactionIndex] = reaction
      }
    } else {
      // Find if this emoji already exists
      const emojiIndex = updatedReactions.findIndex((r: any) => r.emoji === emoji)

      if (emojiIndex >= 0) {
        // Emoji exists, add user to it
        const reaction = updatedReactions[emojiIndex]
        reaction.users.push(user.data.id)
        reaction.count += 1
        updatedReactions[emojiIndex] = reaction
      } else {
        // New emoji reaction
        updatedReactions.push({
          emoji,
          count: 1,
          users: [user.data.id],
        })
      }
    }

    // Update message metadata with new reactions
    // const updatedMetadata = {
    //   ...currentMetadata,
    //   reactions: updatedReactions,
    // }
    if (typeof currentMetadata === 'object' && !Array.isArray(currentMetadata) && currentMetadata !== null) {
        const updatedMetadata = {
          ...currentMetadata,
          reactions: updatedReactions,
        };
        await client.collabMessage.update({
            where: { id: messageId },
            data: {
              metadata: updatedMetadata,
            },
          })
        // Do something with updatedMetadata
      } else {
        // Handle the case where currentMetadata is not an object
        console.error("currentMetadata is not an object", currentMetadata);
      }

    // Update the message in the database
   

    // Notify all participants about the reaction update
    if (pusherServer) {
      await pusherServer.trigger(`chat-${chatId}`, "message-reaction", {
        messageId,
        reactions: updatedReactions,
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        messageId,
        reactions: updatedReactions,
      },
    })
  } catch (error) {
    console.error("Error in message reaction API:", error)
    return NextResponse.json({ error: "Failed to process reaction" }, { status: 500 })
  }
}
