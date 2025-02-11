import { NextResponse } from "next/server"
import { refreshInstagramData } from "@/lib/insta"
import { currentUser } from "@clerk/nextjs/server"

export async function POST() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await refreshInstagramData(user.id)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in POST /api/refresh-instagram:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

