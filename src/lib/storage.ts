import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadMedia(file: File) {
  try {
    const filename = `${nanoid()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })

    return {
      url: blob.url,
      success: true,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return {
      success: false,
      error: "Failed to upload file",
    }
  }
}

