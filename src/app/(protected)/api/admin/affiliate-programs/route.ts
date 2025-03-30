import { NextResponse } from "next/server"
import {client} from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { onCurrentUser } from "@/actions/user"

export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const thisUser = await onCurrentUser()
    const userId = thisUser.id

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is an admin
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!user?.isAdmin) {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 })
    }

    // Fetch all affiliate programs with counts
    const programs = await client.affiliateProgram.findMany({
      include: {
        _count: {
          select: {
            affiliates: true,
            referrals: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      programs,
    })
  } catch (error) {
    console.error("Error fetching affiliate programs:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate programs" }, { status: 500 })
  }
}

// Create a new affiliate program
export async function POST(request: Request) {
  try {
    const thisUser = await onCurrentUser()
    const userId = thisUser.id

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is an admin
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      select: { isAdmin: true },
    })

    if (!user?.isAdmin) {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || typeof data.commissionRate !== "number" || typeof data.cookieDuration !== "number") {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Create the program
    const program = await client.affiliateProgram.create({
      data: {
        name: data.name,
        description: data.description,
        commissionRate: data.commissionRate,
        cookieDuration: data.cookieDuration,
        minimumPayout: data.minimumPayout || 50,
        termsAndConditions: data.termsAndConditions,
      },
    })

    return NextResponse.json({
      success: true,
      program,
    })
  } catch (error) {
    console.error("Error creating affiliate program:", error)
    return NextResponse.json({ success: false, message: "Failed to create affiliate program" }, { status: 500 })
  }
}

