import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { v4 as uuidv4 } from "uuid"
import { writeFile } from "fs/promises"
import path from "path"
import { mkdir } from "fs/promises"

export async function POST(request: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user in database
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    })

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })

    // Generate unique filename  "uploads")
    await mkdir(uploadsDir, { recursive: true })

    // Generate unique filename
    const uniqueFilename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
    const filePath = path.join(uploadsDir, uniqueFilename)

    // Convert file to buffer and save
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    // Create public URL
    const fileUrl = `/uploads/${uniqueFilename}`

    // Save file reference in database
    await client.chatAttachment.create({
      data: {
        filename: file.name,
        filePath: fileUrl,
        fileType: file.type,
        fileSize: file.size,
        uploadedBy: dbUser.id,
        receiverId: (formData.get("receiverId") as string) || null,
      },
    })

    return NextResponse.json({
      success: true,
      fileUrl,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

