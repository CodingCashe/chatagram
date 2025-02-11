// import { NextResponse } from "next/server"
// import { getScheduledPosts, createScheduledPost } from "@/lib/insta"
// import { auth } from "@clerk/nextjs"

// export async function GET() {
//   try {
//     const { userId } = auth()
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const posts = await getScheduledPosts(userId)
//     return NextResponse.json({ posts })
//   } catch (error) {
//     console.error("Error in GET /api/scheduled-posts:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth()
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const postData = await req.json()
//     const newPost = await createScheduledPost(userId, postData)
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

    const posts = await getScheduledContent(user.id)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error in GET /api/scheduled-posts:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const postData = await req.json()
    const newPost = await createScheduledContent(user.id, postData)
    return NextResponse.json(newPost)
  } catch (error) {
    console.error("Error in POST /api/scheduled-posts:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

