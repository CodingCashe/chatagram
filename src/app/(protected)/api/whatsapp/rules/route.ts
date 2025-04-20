import { type NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"

export async function POST(request: NextRequest) {
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

    const { name, trigger, triggerValue, response, isActive, whatsappBusinessId } = await request.json()

    if (!name || !trigger || !response) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify the WhatsApp account belongs to the user
    if (whatsappBusinessId) {
      const account = await client.whatsAppBusiness.findUnique({
        where: {
          id: whatsappBusinessId,
          userId: dbUser.id,
        },
      })

      if (!account) {
        return NextResponse.json({ error: "WhatsApp business not found" }, { status: 404 })
      }
    }

    // Create a new automation rule
    const rule = await client.whatsAppRule.create({
      data: {
        name,
        trigger,
        triggerValue: triggerValue || "",
        response,
        isActive: isActive ?? true,
        userId: dbUser.id,
        whatsappBusinessId,
      },
    })

    return NextResponse.json(rule)
  } catch (error) {
    console.error("Error creating rule:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams
    const accountId = searchParams.get("accountId")

    // Get rules for the user, optionally filtered by WhatsApp account
    const rules = await client.whatsAppRule.findMany({
      where: {
        userId: dbUser.id,
        ...(accountId ? { whatsappBusinessId: accountId } : {}),
      },
    })

    return NextResponse.json(rules)
  } catch (error) {
    console.error("Error fetching rules:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

