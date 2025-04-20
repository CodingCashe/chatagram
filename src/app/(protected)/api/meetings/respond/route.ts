import { NextResponse } from "next/server"
import { respondToMeeting } from "@/actions/collab/chat-actions"

export async function POST(request: Request) {
  try {
    const { chatId, messageId, action } = await request.json()

    if (!chatId || !messageId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (action !== "accept" && action !== "decline") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const result = await respondToMeeting(chatId, messageId, action)

    if (result.status === 200) {
      return NextResponse.json({ success: true, data: result.data })
    } else {
      return NextResponse.json({ error: result.message }, { status: result.status })
    }
  } catch (error) {
    console.error("Error in meeting response API:", error)
    return NextResponse.json({ error: "Failed to process meeting response" }, { status: 500 })
  }
}
