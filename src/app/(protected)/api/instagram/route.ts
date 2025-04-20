import { type NextRequest, NextResponse } from "next/server"
import { onCurrentUser } from "@/actions/user"
import { client } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const user = await onCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Get Instagram API credentials from database
    const instagramCredentials = await client.instagramCredentials.findFirst({
      where: { userId: user.id },
    })

    if (!instagramCredentials) {
      return NextResponse.json({ error: "Instagram API not configured" }, { status: 400 })
    }

    // This is where you would make a real API call to Instagram Graph API
    // For now, we'll simulate a response

    // In production, you would use the Instagram Graph API:
    // const response = await fetch(`https://graph.instagram.com/v12.0/${username}?fields=id,username,media_count,followers_count&access_token=${instagramCredentials.accessToken}`)
    // const data = await response.json()

    // Simulated response
    const data = {
      id: `ig_${Math.random().toString(36).substring(7)}`,
      username: username.replace("@", ""),
      name: username
        .replace("@", "")
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      followers_count: Math.floor(Math.random() * 100000) + 5000,
      media_count: Math.floor(Math.random() * 500) + 50,
      engagement_rate: (Math.random() * 5 + 1).toFixed(2),
      verified: Math.random() > 0.8,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Instagram API error:", error)
    return NextResponse.json({ error: "Failed to fetch Instagram data" }, { status: 500 })
  }
}

