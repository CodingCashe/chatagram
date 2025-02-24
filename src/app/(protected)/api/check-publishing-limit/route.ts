import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"

const INSTAGRAM_API_BASE = "https://graph.instagram.com/v22.0"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    // Fetch the user's Instagram integration
    const user = await client.user.findUnique({
      where: { clerkId: userId },
      include: { integrations: { where: { name: "INSTAGRAM" } } },
    })

    if (!user || !user.integrations[0]) {
      return NextResponse.json({ error: "User not found or Instagram not integrated" }, { status: 404 })
    }

    const instagramIntegration = user.integrations[0]

    const response = await fetch(`${INSTAGRAM_API_BASE}/${instagramIntegration.instagramId}/content_publishing_limit`, {
      headers: {
        Authorization: `Bearer ${instagramIntegration.token}`,
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

