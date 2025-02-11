import { NextResponse } from "next/server"
import { updateScheduledContent, deleteScheduledContent } from "@/lib/insta"
import { currentUser } from "@clerk/nextjs/server"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const content = formData.get("content") as string
    const scheduledDate = formData.get("scheduledDate") as string

    const updatedContent = await updateScheduledContent(user.id, params.id, { content, scheduledDate })
    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error("Error in PUT /api/scheduled-content/[id]:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteScheduledContent(user.id, params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in DELETE /api/scheduled-content/[id]:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

