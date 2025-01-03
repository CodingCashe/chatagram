import { NextResponse } from 'next/server'
import { generateImage } from '@/lib/instagram'

export async function POST(req: Request) {
  const { prompt } = await req.json()
  
  try {
    const result = await generateImage(prompt)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}

