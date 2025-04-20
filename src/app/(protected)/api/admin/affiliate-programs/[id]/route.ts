import { NextResponse } from "next/server"
import {client} from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { onCurrentUser } from "@/actions/user"

// Get a specific affiliate program
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const thisUser = await onCurrentUser()
    const  userId  = thisUser.id

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

    const { id } = params

    const program = await client.affiliateProgram.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            affiliates: true,
            referrals: true,
          },
        },
      },
    })

    if (!program) {
      return NextResponse.json({ success: false, message: "Affiliate program not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      program,
    })
  } catch (error) {
    console.error("Error fetching affiliate program:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate program" }, { status: 500 })
  }
}

// Update an affiliate program
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await onCurrentUser()
    const  userId  = currentUser.id

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

    const { id } = params
    const data = await request.json()

    // Check if program exists
    const existingProgram = await client.affiliateProgram.findUnique({
      where: { id },
    })

    if (!existingProgram) {
      return NextResponse.json({ success: false, message: "Affiliate program not found" }, { status: 404 })
    }

    // Update the program
    const updatedProgram = await client.affiliateProgram.update({
      where: { id },
      data: {
        name: data.name !== undefined ? data.name : undefined,
        description: data.description !== undefined ? data.description : undefined,
        commissionRate: data.commissionRate !== undefined ? data.commissionRate : undefined,
        cookieDuration: data.cookieDuration !== undefined ? data.cookieDuration : undefined,
        minimumPayout: data.minimumPayout !== undefined ? data.minimumPayout : undefined,
        status: data.status !== undefined ? data.status : undefined,
        termsAndConditions: data.termsAndConditions !== undefined ? data.termsAndConditions : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      program: updatedProgram,
    })
  } catch (error) {
    console.error("Error updating affiliate program:", error)
    return NextResponse.json({ success: false, message: "Failed to update affiliate program" }, { status: 500 })
  }
}

// Delete an affiliate program
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const theUser = await onCurrentUser()
    const  userId  = theUser.id

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

    const { id } = params

    // Check if program exists
    const existingProgram = await client.affiliateProgram.findUnique({
      where: { id },
    })

    if (!existingProgram) {
      return NextResponse.json({ success: false, message: "Affiliate program not found" }, { status: 404 })
    }

    // Delete the program
    await client.affiliateProgram.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Affiliate program deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting affiliate program:", error)
    return NextResponse.json({ success: false, message: "Failed to delete affiliate program" }, { status: 500 })
  }
}

