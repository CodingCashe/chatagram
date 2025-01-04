// import { NextResponse } from 'next/server';
// import { generateText } from 'ai';
// import { openai } from '@ai-sdk/openai';

// export async function POST(req: Request) {
//   const { keyword } = await req.json();

//   const prompt = `Generate 5 content ideas for a social media calendar based on the keyword or theme: "${keyword}". For each idea, provide a date (starting from today and spaced 2 days apart), a topic, and a brief description. Format the output as a JSON array of objects with "date", "topic", and "description" fields.`;

//   try {
//     const { text } = await generateText({
//       model: openai('gpt-4o'),
//       prompt: prompt,
//     });

//     const contentIdeas = JSON.parse(text);
//     return NextResponse.json(contentIdeas);
//   } catch (error) {
//     console.error('Error generating content ideas:', error);
//     return NextResponse.json({ error: 'Failed to generate content ideas' }, { status: 500 });
//   }
// }
//
// import { NextResponse } from 'next/server';
// import { generateText } from 'ai';
// import { openai } from '@ai-sdk/openai';

// export async function POST(req: Request) {
//   const { keyword } = await req.json();

//   const prompt = `Generate 5 content ideas for a social media calendar based on the keyword or theme: "${keyword}". For each idea, provide a date (starting from today and spaced 2 days apart), a topic, and a brief description. Format the output as a JSON array of objects with "date", "topic", and "description" fields.`;

//   try {
//     const { text } = await generateText({
//       model: openai('gpt-4o'),
//       prompt: prompt,
//     });

//     const contentIdeas = JSON.parse(text);
//     return NextResponse.json(contentIdeas);
//   } catch (error) {
//     console.error('Error generating content ideas:', error);
//     return NextResponse.json({ error: 'Failed to generate content ideas' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in the environment variables');
    }

    const prompt = `Generate 5 content ideas for a social media calendar based on the keyword or theme: "${keyword}". For each idea, provide a date (starting from today and spaced 2 days apart), a topic, and a brief description. Format the output as a JSON array of objects with "date", "topic", and "description" fields.`;

    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: prompt,
    });

    const contentIdeas = JSON.parse(text);
    return NextResponse.json(contentIdeas);
  } catch (error: unknown) {
    console.error('Detailed error in generate-content:', error);
    
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return NextResponse.json({ error: 'Failed to generate content ideas', details: errorMessage }, { status: 500 });
  }
}

