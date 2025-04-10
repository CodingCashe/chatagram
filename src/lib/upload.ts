import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadToBlob(file: File) {
  try {
    // Generate a unique filename with the original extension
    const extension = file.name.split(".").pop() || ""
    const filename = `${nanoid()}.${extension}`

    // Upload to Vercel Blob
    const { url } = await put(`profiles/${filename}`, file, {
      access: "public",
      addRandomSuffix: false, // We're already using nanoid for uniqueness
    })

    return { success: true, url }
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    return { success: false, error }
  }
}
