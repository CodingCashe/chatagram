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

    const { businessName, phoneNumber, phoneNumberId, wabaId, accessToken } = await request.json()

    if (!businessName || !phoneNumber || !phoneNumberId || !wabaId || !accessToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate token expiration (usually 60 days for long-lived tokens)
    const tokenExpiresAt = new Date()
    tokenExpiresAt.setDate(tokenExpiresAt.getDate() + 60)

    // Create a new WhatsApp account for the user
    const whatsappBusiness = await client.whatsAppBusiness.create({
      data: {
        userId: dbUser.id,
        businessName,
        phoneNumber,
        phoneNumberId,
        wabaId,
        accessToken,
        tokenExpiresAt,
        verificationStatus: "verified",
      },
    })

    return NextResponse.json({
      id: whatsappBusiness.id,
      businessName: whatsappBusiness.businessName,
      phoneNumber: whatsappBusiness.phoneNumber,
      verificationStatus: whatsappBusiness.verificationStatus,
    })
  } catch (error) {
    console.error("Error creating WhatsApp business:", error)
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

    // Get all WhatsApp accounts for the user
    const whatsappBusinesses = await client.whatsAppBusiness.findMany({
      where: {
        userId: dbUser.id,
      },
      select: {
        id: true,
        businessName: true,
        phoneNumber: true,
        verificationStatus: true,
        createdAt: true,
      },
    })

    return NextResponse.json(whatsappBusinesses)
  } catch (error) {
    console.error("Error fetching WhatsApp businesses:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

