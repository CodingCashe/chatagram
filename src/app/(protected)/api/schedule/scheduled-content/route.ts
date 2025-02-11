// import { NextResponse } from "next/server"
// import { getScheduledContent, createScheduledContent } from "@/lib/insta"
// import { currentUser } from "@clerk/nextjs/server"

// export async function GET() {
//   try {
//     const user = await currentUser()
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const posts = await getScheduledContent(user.id)
//     return NextResponse.json({ posts })
//   } catch (error) {
//     console.error("Error in GET /api/scheduled-posts:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const user = await currentUser()
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const postData = await req.json()
//     const newPost = await createScheduledContent(user.id, postData)
//     return NextResponse.json(newPost)
//   } catch (error) {
//     console.error("Error in POST /api/scheduled-posts:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { getScheduledContent, createScheduledContent } from "@/lib/insta"
import { currentUser } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const scheduledContent = await getScheduledContent(user.id)
    return NextResponse.json({ scheduledContent })
  } catch (error) {
    console.error("Error in GET /api/scheduled-content:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const postType = formData.get("postType") as string
    const content = formData.get("content") as string
    const scheduledDate = formData.get("scheduledDate") as string
    const hashtags = formData.getAll("hashtags[]") as string[]
    const file = formData.get("file") as File | null

    const contentData = {
      postType,
      content,
      scheduledDate,
      hashtags,
      file,
    }

    const newContent = await createScheduledContent(user.id, contentData)
    return NextResponse.json(newContent)
  } catch (error) {
    console.error("Error in POST /api/scheduled-content:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

