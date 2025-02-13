// import { NextResponse } from "next/server"
// import { getScheduledContent, createScheduledContent } from "@/lib/insta"
// import { currentUser } from "@clerk/nextjs/server"

// export async function GET() {
//   try {
//     const user = await currentUser()
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const scheduledContent = await getScheduledContent(user.id)
//     return NextResponse.json({ scheduledContent })
//   } catch (error) {
//     console.error("Error in GET /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const user = await currentUser()
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const formData = await req.formData()
//     const postType = formData.get("postType") as string
//     const content = formData.get("content") as string
//     const scheduledDate = formData.get("scheduledDate") as string
//     const hashtags = formData.getAll("hashtags[]") as string[]
//     const file = formData.get("file") as File | null

//     const contentData = {
//       postType,
//       content,
//       scheduledDate,
//       hashtags,
//       file,
//     }

//     const newContent = await createScheduledContent(user.id, contentData)
//     return NextResponse.json(newContent)
//   } catch (error) {
//     console.error("Error in POST /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// import { NextResponse } from "next/server"
// import { getScheduledContent, createScheduledContent } from "@/lib/insta"
// import { currentUser } from "@clerk/nextjs/server"

// export async function GET() {
//   console.log("GET /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("GET /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     console.log(`GET /api/scheduled-content: Fetching content for user ${user.id}`)
//     const scheduledContent = await getScheduledContent(user.id)
//     console.log(`GET /api/scheduled-content: Successfully fetched ${scheduledContent.length} items`)
//     return NextResponse.json({ scheduledContent })
//   } catch (error) {
//     console.error("Error in GET /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   console.log("POST /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("POST /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const formData = await req.formData()
//     const postType = formData.get("postType") as string
//     const content = formData.get("content") as string
//     const scheduledDate = formData.get("scheduledDate") as string
//     const hashtags = formData.getAll("hashtags[]") as string[]
//     const file = formData.get("file") as File | null

//     console.log(`POST /api/scheduled-content: Creating content for user ${user.id}`, {
//       postType,
//       contentPreview: content.substring(0, 100), // Log only the first 100 characters of content
//       scheduledDate,
//       hashtags,
//       hasFile: !!file,
//     })

//     const contentData = {
//       postType,
//       content,
//       scheduledDate,
//       hashtags,
//       file,
//     }

//     const newContent = await createScheduledContent(user.id, contentData)
//     console.log(`POST /api/scheduled-content: Successfully created content for user ${user.id}`)
//     return NextResponse.json(newContent)
//   } catch (error) {
//     console.error("Error in POST /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }


// import { NextResponse } from "next/server"
// import { getScheduledContent, createScheduledContent } from "@/lib/insta"
// import { currentUser } from "@clerk/nextjs/server"

// // Temporary in-memory storage for files
// const fileStorage: { [key: string]: { data: string; type: string } } = {}

// export async function GET(req: Request) {
//   const url = new URL(req.url)
//   const fileId = url.pathname.split("/").pop()

//   if (fileId && fileId in fileStorage) {
//     const file = fileStorage[fileId]
//     return new NextResponse(Buffer.from(file.data, "base64"), {
//       headers: { "Content-Type": file.type },
//     })
//   }

//   console.log("GET /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("GET /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     console.log(`GET /api/scheduled-content: Fetching content for user ${user.id}`)
//     const scheduledContent = await getScheduledContent(user.id)
//     console.log(`GET /api/scheduled-content: Successfully fetched ${scheduledContent.length} items`)
//     return NextResponse.json({ scheduledContent })
//   } catch (error) {
//     console.error("Error in GET /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   console.log("POST /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("POST /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const formData = await req.formData()
//     const postType = formData.get("postType") as string
//     const content = formData.get("content") as string
//     const scheduledDate = formData.get("scheduledDate") as string
//     const hashtags = formData.getAll("hashtags[]") as string[]
//     const file = formData.get("file") as File | null

//     console.log(`POST /api/scheduled-content: Creating content for user ${user.id}`, {
//       postType,
//       contentPreview: content.substring(0, 100),
//       scheduledDate,
//       hashtags,
//       hasFile: !!file,
//     })

//     let mediaUrl = null
//     if (file) {
//       mediaUrl = await uploadFileAndGetUrl(file)
//     }

//     const contentData = {
//       postType,
//       content,
//       scheduledDate,
//       hashtags,
//       file,
//       mediaUrl,
//     }

//     const newContent = await createScheduledContent(user.id, contentData)
//     console.log(`POST /api/scheduled-content: Successfully created content for user ${user.id}`)
//     return NextResponse.json(newContent)
//   } catch (error) {
//     console.error("Error in POST /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// async function uploadFileAndGetUrl(file: File): Promise<string> {
//   const buffer = await file.arrayBuffer()
//   const base64 = Buffer.from(buffer).toString("base64")
//   const fileId = Date.now().toString()
//   fileStorage[fileId] = { data: base64, type: file.type }
//   const fileUrl = `/api/files/${fileId}`
//   console.log(`File uploaded successfully: ${fileUrl}`)
//   return fileUrl
// }

// import { NextResponse } from "next/server"
// import {
//   getScheduledContent,
//   createScheduledContent,
//   deleteScheduledContent,
//   updateScheduledContent,
// } from "@/lib/insta"
// import { currentUser } from "@clerk/nextjs/server"

// export async function GET(req: Request) {
//   console.log("GET /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("GET /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     console.log(`GET /api/scheduled-content: Fetching content for user ${user.id}`)
//     const scheduledContent = await getScheduledContent(user.id)
//     console.log(`GET /api/scheduled-content: Successfully fetched ${scheduledContent.length} items`)
//     return NextResponse.json({ scheduledContent })
//   } catch (error) {
//     console.error("Error in GET /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   console.log("POST /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("POST /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const formData = await req.formData()
//     const postType = formData.get("postType") as string
//     const content = formData.get("content") as string
//     const scheduledDate = formData.get("scheduledDate") as string
//     const hashtags = formData.getAll("hashtags[]") as string[]
//     const mediaUrl = formData.get("mediaUrl") as string | undefined

//     console.log(`POST /api/scheduled-content: Creating content for user ${user.id}`, {
//       postType,
//       contentPreview: content.substring(0, 100),
//       scheduledDate,
//       hashtags,
//       hasMediaUrl: !!mediaUrl,
//     })

//     const contentData = {
//       postType,
//       content,
//       scheduledDate,
//       hashtags,
//       mediaUrl,
//     }

//     const newContent = await createScheduledContent(user.id, contentData)
//     console.log(`POST /api/scheduled-content: Successfully created content for user ${user.id}`)
//     return NextResponse.json(newContent)
//   } catch (error) {
//     console.error("Error in POST /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function DELETE(req: Request) {
//   console.log("DELETE /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("DELETE /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { searchParams } = new URL(req.url)
//     const contentId = searchParams.get("id")

//     if (!contentId) {
//       return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
//     }

//     const deletedContent = await deleteScheduledContent(user.id, contentId)
//     console.log(`DELETE /api/scheduled-content: Successfully deleted content for user ${user.id}`)
//     return NextResponse.json(deletedContent)
//   } catch (error) {
//     console.error("Error in DELETE /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function PUT(req: Request) {
//   console.log("PUT /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("PUT /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { searchParams } = new URL(req.url)
//     const contentId = searchParams.get("id")

//     if (!contentId) {
//       return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
//     }

//     const formData = await req.formData()
//     const content = formData.get("content") as string
//     const scheduledDate = formData.get("scheduledDate") as string

//     const updateData = {
//       caption: content,
//       timestamp: scheduledDate,
//     }

//     const updatedContent = await updateScheduledContent(user.id, contentId, updateData)
//     console.log(`PUT /api/scheduled-content: Successfully updated content for user ${user.id}`)
//     return NextResponse.json(updatedContent)
//   } catch (error) {
//     console.error("Error in PUT /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// import { NextResponse } from "next/server"
// import {
//   getScheduledContent,
//   createScheduledContent,
//   deleteScheduledContent,
//   updateScheduledContent,
// } from "@/lib/insta"
// import { currentUser } from "@clerk/nextjs/server"
// import { AxiosError } from "axios"

// export async function GET(req: Request) {
//   console.log("GET /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("GET /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     console.log(`GET /api/scheduled-content: Fetching content for user ${user.id}`)
//     const scheduledContent = await getScheduledContent(user.id)
//     console.log(`GET /api/scheduled-content: Successfully fetched ${scheduledContent.length} items`)
//     return NextResponse.json({ scheduledContent })
//   } catch (error) {
//     console.error("Error in GET /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   console.log("POST /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("POST /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const formData = await req.formData()
//     const postType = formData.get("postType") as string
//     const content = formData.get("content") as string
//     const scheduledDate = formData.get("scheduledDate") as string
//     const hashtags = formData.getAll("hashtags[]") as string[]
//     const mediaUrl = formData.get("mediaUrl") as string | null

//     console.log(`POST /api/scheduled-content: Creating content for user ${user.id}`, {
//       postType,
//       contentPreview: content.substring(0, 100),
//       scheduledDate,
//       hashtags,
//       hasMediaUrl: !!mediaUrl,
//     })

//     const contentData = {
//       postType,
//       content,
//       scheduledDate,
//       hashtags,
//       mediaUrl: mediaUrl || undefined,
//     }

//     const newContent = await createScheduledContent(user.id, contentData)
//     console.log(`POST /api/scheduled-content: Successfully created content for user ${user.id}`)
//     return NextResponse.json(newContent)
//   } catch (error) {
//     console.error("Error in POST /api/scheduled-content:", error)

//     if (error instanceof AxiosError) {
//       console.error("Axios Error Details:", {
//         message: error.message,
//         code: error.code,
//         response: {
//           status: error.response?.status,
//           statusText: error.response?.statusText,
//           data: error.response?.data,
//         },
//       })

//       // Check if it's an Instagram API error
//       if (error.response?.data?.error) {
//         const instagramError = error.response.data.error
//         console.error("Instagram API Error:", {
//           message: instagramError.message,
//           type: instagramError.type,
//           code: instagramError.code,
//           subcode: instagramError.subcode,
//           fbtrace_id: instagramError.fbtrace_id,
//         })

//         return NextResponse.json(
//           { error: "Instagram API Error", details: instagramError },
//           { status: error.response.status },
//         )
//       }
//     }

//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function DELETE(req: Request) {
//   console.log("DELETE /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("DELETE /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { searchParams } = new URL(req.url)
//     const contentId = searchParams.get("id")

//     if (!contentId) {
//       return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
//     }

//     const deletedContent = await deleteScheduledContent(user.id, contentId)
//     console.log(`DELETE /api/scheduled-content: Successfully deleted content for user ${user.id}`)
//     return NextResponse.json(deletedContent)
//   } catch (error) {
//     console.error("Error in DELETE /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// export async function PUT(req: Request) {
//   console.log("PUT /api/scheduled-content: Started")
//   try {
//     const user = await currentUser()
//     if (!user) {
//       console.warn("PUT /api/scheduled-content: Unauthorized access attempt")
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { searchParams } = new URL(req.url)
//     const contentId = searchParams.get("id")

//     if (!contentId) {
//       return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
//     }

//     const formData = await req.formData()
//     const content = formData.get("content") as string
//     const scheduledDate = formData.get("scheduledDate") as string

//     const updateData = {
//       caption: content,
//       timestamp: scheduledDate,
//     }

//     const updatedContent = await updateScheduledContent(user.id, contentId, updateData)
//     console.log(`PUT /api/scheduled-content: Successfully updated content for user ${user.id}`)
//     return NextResponse.json(updatedContent)
//   } catch (error) {
//     console.error("Error in PUT /api/scheduled-content:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import {
  getScheduledContent,
  createScheduledContent,
  deleteScheduledContent,
  updateScheduledContent,
} from "@/lib/insta"
import { currentUser } from "@clerk/nextjs/server"
import { AxiosError } from "axios"

export async function GET(req: Request) {
  console.log("GET /api/scheduled-content: Started")
  try {
    const user = await currentUser()
    if (!user) {
      console.warn("GET /api/scheduled-content: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log(`GET /api/scheduled-content: Fetching content for user ${user.id}`)
    const scheduledContent = await getScheduledContent(user.id)
    console.log(`GET /api/scheduled-content: Successfully fetched ${scheduledContent.length} items`)
    return NextResponse.json({ scheduledContent })
  } catch (error) {
    console.error("Error in GET /api/scheduled-content:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  console.log("POST /api/scheduled-content: Started")
  try {
    const user = await currentUser()
    if (!user) {
      console.warn("POST /api/scheduled-content: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const postType = formData.get("postType") as string
    const content = formData.get("content") as string
    const scheduledDate = formData.get("scheduledDate") as string
    const hashtags = formData.getAll("hashtags[]") as string[]
    const mediaUrl = formData.get("mediaUrl") as string | null

    console.log(`POST /api/scheduled-content: Creating content for user ${user.id}`, {
      postType,
      contentPreview: content.substring(0, 100),
      scheduledDate,
      hashtags,
      hasMediaUrl: !!mediaUrl,
    })

    const contentData = {
      postType,
      content,
      scheduledDate,
      hashtags,
      mediaUrl: mediaUrl || undefined,
    }

    const newContent = await createScheduledContent(user.id, contentData)
    console.log(`POST /api/scheduled-content: Successfully created content for user ${user.id}`)
    return NextResponse.json(newContent)
  } catch (error) {
    console.error("Error in POST /api/scheduled-content:", error)

    if (error instanceof AxiosError) {
      console.error("Axios Error Details:", {
        message: error.message,
        code: error.code,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        },
      })

      // Check if it's an Instagram API error
      if (error.response?.data?.error) {
        const instagramError = error.response.data.error
        console.error("Instagram API Error:", {
          message: instagramError.message,
          type: instagramError.type,
          code: instagramError.code,
          subcode: instagramError.subcode,
          fbtrace_id: instagramError.fbtrace_id,
        })

        return NextResponse.json(
          { error: "Instagram API Error", details: instagramError },
          { status: error.response.status },
        )
      }
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  console.log("DELETE /api/scheduled-content: Started")
  try {
    const user = await currentUser()
    if (!user) {
      console.warn("DELETE /api/scheduled-content: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const contentId = searchParams.get("id")

    if (!contentId) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
    }

    const deletedContent = await deleteScheduledContent(user.id, contentId)
    console.log(`DELETE /api/scheduled-content: Successfully deleted content for user ${user.id}`)
    return NextResponse.json(deletedContent)
  } catch (error) {
    console.error("Error in DELETE /api/scheduled-content:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  console.log("PUT /api/scheduled-content: Started")
  try {
    const user = await currentUser()
    if (!user) {
      console.warn("PUT /api/scheduled-content: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const contentId = searchParams.get("id")

    if (!contentId) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
    }

    const formData = await req.formData()
    const content = formData.get("content") as string
    const scheduledDate = formData.get("scheduledDate") as string

    const updateData = {
      caption: content,
      timestamp: scheduledDate,
    }

    const updatedContent = await updateScheduledContent(user.id, contentId, updateData)
    console.log(`PUT /api/scheduled-content: Successfully updated content for user ${user.id}`)
    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error("Error in PUT /api/scheduled-content:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

