import { NextRequest, NextResponse } from 'next/server';
import { InstagramAPI } from '@/lib/instagram-api'; // Adjust the import path as needed

const instagramApi = new InstagramAPI(process.env.INSTAGRAM_ACCESS_TOKEN as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { instagramBusinessAccountId, mediaUrl, caption } = body;

    if (!instagramBusinessAccountId || !mediaUrl || !caption) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await instagramApi.publishNow(instagramBusinessAccountId, { mediaUrl, caption });

    return NextResponse.json({ message: 'Content published successfully', id: result.id });
  } catch (error) {
    console.error('Error publishing content:', error);
    return NextResponse.json({ error: 'Error publishing content' }, { status: 500 });
  }
}