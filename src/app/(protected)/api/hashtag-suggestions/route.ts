import { NextResponse } from 'next/server'
import { getHashtagSuggestions } from '@/lib/instagram'

export async function GET() {
  try {
    const suggestions = await getHashtagSuggestions()
    return NextResponse.json(suggestions)
  } catch (error) {
    console.error('Error fetching hashtag suggestions:', error)
    return NextResponse.json({ error: 'Failed to fetch hashtag suggestions' }, { status: 500 })
  }
}

