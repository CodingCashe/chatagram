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
import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { keyword } = await req.json();

  const prompt = `Generate 5 content ideas for a social media calendar based on the keyword or theme: "${keyword}". For each idea, provide a date (starting from today and spaced 2 days apart), a topic, and a brief description. Format the output as a JSON array of objects with "date", "topic", and "description" fields.`;

  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    });

    const contentIdeas = JSON.parse(text);
    return NextResponse.json(contentIdeas);
  } catch (error) {
    console.error('Error generating content ideas:', error);
    return NextResponse.json({ error: 'Failed to generate content ideas' }, { status: 500 });
  }
}

