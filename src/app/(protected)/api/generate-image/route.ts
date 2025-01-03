// import { NextResponse } from 'next/server'
// import { generateImage } from '@/lib/instagram'

// export async function POST(req: Request) {
//   const { prompt } = await req.json()
  
//   try {
//     const result = await generateImage(prompt)
//     return NextResponse.json(result)
//   } catch (error) {
//     console.error('Error generating image:', error)
//     return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.data && response.data.data[0] && response.data.data[0].url) {
      return NextResponse.json({ image: response.data.data[0].url });
    } else {
      throw new Error('Unexpected response structure from OpenAI API');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: `API Error: ${error.response.status} - ${error.response.data.error?.message || 'Unknown error'}` },
        { status: error.response.status }
      );
    }
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}

