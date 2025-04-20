import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const user = await client.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ isAdmin: user.isAdmin })
  } catch (error) {
    console.error("Error checking admin status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

