import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const count = searchParams.get("count")

  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    },
  )

  const data = await response.json()

  return NextResponse.json(data)
}

