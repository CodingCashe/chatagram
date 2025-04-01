import { type NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the current user with Clerk
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

    const id = params.id
    const updates = await request.json()

    // Verify the rule belongs to the user
    const existingRule = await client.whatsAppRule.findUnique({
      where: {
        id,
        userId: dbUser.id,
      },
    })

    if (!existingRule) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 })
    }

    // Update the rule
    const rule = await client.whatsAppRule.update({
      where: { id },
      data: updates,
    })

    return NextResponse.json(rule)
  } catch (error) {
    console.error("Error updating rule:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the current user with Clerk
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

    const id = params.id

    // Verify the rule belongs to the user
    const existingRule = await client.whatsAppRule.findUnique({
      where: {
        id,
        userId: dbUser.id,
      },
    })

    if (!existingRule) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 })
    }

    // Delete the rule
    await client.whatsAppRule.delete({
      where: { id },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting rule:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

