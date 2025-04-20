import { NextResponse } from "next/server"
import {client} from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { onCurrentUser } from "@/actions/user"

export async function GET() {
  try {
    const thisUser = await onCurrentUser()
    const userId = thisUser.id

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get the user from the database
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Format the name
    const name = `${user.firstname || ""} ${user.lastname || ""}`.trim() || "User"

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: name,
      },
    })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch user data" }, { status: 500 })
  }
}

