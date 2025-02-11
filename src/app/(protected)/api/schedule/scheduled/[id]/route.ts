// import { NextResponse } from "next/server"
// import { deleteScheduledPost } from "@/lib/insta"
// import { auth } from "@clerk/nextjs"

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { userId } = auth()
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     await deleteScheduledPost(userId, params.id)
//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Error in DELETE /api/scheduled-posts/[id]:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { deleteScheduledContent } from "@/lib/insta"
import { currentUser } from "@clerk/nextjs/server"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteScheduledContent(user.id, params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in DELETE /api/scheduled-posts/[id]:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

