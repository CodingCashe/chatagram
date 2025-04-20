import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Generate a unique filename with the original extension
    const extension = file.name.split(".").pop() || ""
    const filename = `profiles/${nanoid()}.${extension}`

    // Upload to Vercel Blob
    const { url } = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
