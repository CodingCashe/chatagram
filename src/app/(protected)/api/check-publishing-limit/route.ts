import { NextResponse } from "next/server"

const INSTAGRAM_API_BASE = "https://graph.instagram.com/v22.0"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`${INSTAGRAM_API_BASE}/${userId}/content_publishing_limit`, {
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch publishing limit")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking publishing limit:", error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

