import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const perPage = searchParams.get("per_page")
  const size = searchParams.get("size")

  const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=${perPage}&size=${size}`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY || "",
    },
  })

  const data = await response.json()

  return NextResponse.json(data)
}

