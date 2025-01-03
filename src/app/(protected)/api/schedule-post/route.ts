import { NextResponse } from 'next/server'
import { schedulePost } from '@/lib/instagram'

export async function POST(req: Request) {
  const { caption, image, hashtags, scheduledTime } = await req.json()

  try {
    const result = await schedulePost({ caption, image, hashtags, scheduledTime })
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error scheduling post:', error)
    return NextResponse.json({ error: 'Failed to schedule post' }, { status: 500 })
  }
}

