import { NextResponse } from 'next/server'
import { optimizePost } from '@/lib/instagram'

export async function POST(req: Request) {
  const { caption, hashtags, scheduledTime } = await req.json()

  try {
    const result = await optimizePost({ caption, hashtags, scheduledTime })
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error optimizing post:', error)
    return NextResponse.json({ error: 'Failed to optimize post' }, { status: 500 })
  }
}

