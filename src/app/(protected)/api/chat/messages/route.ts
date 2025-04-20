// Add this line at the top of your file
export const dynamic = 'force-dynamic'

// Rest of your page component
import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user in database
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    })

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get admin users
    const admins = await client.user.findMany({
      where: { isAdmin: true },
      select: { id: true },
    })

    const adminIds = admins.map((admin) => admin.id)

    // Get messages between user and any admin
    const messages = await client.chatMessage.findMany({
      where: {
        OR: [
          {
            senderId: dbUser.id,
            receiverId: { in: adminIds },
          },
          {
            senderId: { in: adminIds },
            receiverId: dbUser.id,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json({
      messages: messages.map((message) => ({
        ...message,
        createdAt: message.createdAt.toISOString(),
        updatedAt: message.updatedAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

