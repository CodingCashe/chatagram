// const VOICEFLOW_API_URL = 'https://general-runtime.voiceflow.com';

// export async function getVoiceflowResponse(message: string, context?: any) {
//   try {
//     const response = await fetch(`${VOICEFLOW_API_URL}/state/user/interact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: process.env.VOICEFLOW_API_KEY!,
//       },
//       body: JSON.stringify({
//         action: {
//           type: 'text',
//           payload: message,
//         },
//         config: {
//           tts: false,
//           stripSSML: true,
//         },
//         state: context || {},
//         versionID: process.env.VOICEFLOW_VERSION_ID,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error getting Voiceflow response:', error);
//     throw error;
//   }
// }

// export function processVoiceflowResponse(response: any) {
//   let processedResponse = '';

//   for (const trace of response.trace) {
//     switch (trace.type) {
//       case 'speak':
//       case 'text':
//         processedResponse += trace.payload.message + '\n';
//         break;
//       case 'visual':
//         processedResponse += `[Image: ${trace.payload.image}]\n`;
//         break;
//       case 'choice':
//         processedResponse += 'Options:\n';
//         for (const choice of trace.payload.buttons) {
//           processedResponse += `- ${choice.name}\n`;
//         }
//         break;
//       // Add more cases for other response types as needed
//     }
//   }

//   return processedResponse.trim();
// }


// const VOICEFLOW_API_URL = 'https://general-runtime.voiceflow.com';

// export async function getVoiceflowResponse(message: string, userId: string) {
//   try {
//     const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}/interact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: process.env.VOICEFLOW_API_KEY!,
//       },
//       body: JSON.stringify({
//         action: {
//           type: 'text',
//           payload: message,
//         },
//         config: {
//           tts: false,
//           stripSSML: true,
//         },
//         versionID: process.env.VOICEFLOW_VERSION_ID,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error getting Voiceflow response:', error);
//     throw error;
//   }
// }

// export function processVoiceflowResponse(response: any) {
//   let processedResponse = '';

//   for (const trace of response.trace) {
//     switch (trace.type) {
//       case 'speak':
//       case 'text':
//         processedResponse += trace.payload.message + '\n';
//         break;
//       case 'visual':
//         processedResponse += `[Image: ${trace.payload.image}]\n`;
//         break;
//       case 'choice':
//         processedResponse += 'Options:\n';
//         for (const choice of trace.payload.buttons) {
//           processedResponse += `- ${choice.name}\n`;
//         }
//         break;
//       // Add more cases for other response types as needed
//     }
//   }

//   return processedResponse.trim();
// }

// export async function createVoiceflowUser(userId: string) {
//   try {
//     const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: process.env.VOICEFLOW_API_KEY!,
//       },
//       body: JSON.stringify({
//         versionID: process.env.VOICEFLOW_VERSION_ID,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return true;
//   } catch (error) {
//     console.error('Error creating Voiceflow user:', error);
//     throw error;
//   }
// }

// const VOICEFLOW_API_URL = 'https://general-runtime.voiceflow.com';

// interface VoiceflowResponse {
//   trace: Array<{
//     type: string;
//     payload: any;
//   }>;
// }

// export async function getVoiceflowResponse(message: string, userId: string): Promise<VoiceflowResponse> {
//   try {
//     const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}/interact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.VOICEFLOW_API_KEY}`,
//       },
//       body: JSON.stringify({
//         action: {
//           type: 'text',
//           payload: message,
//         },
//         config: {
//           tts: false,
//           stripSSML: true,
//         },
//         versionID: process.env.VOICEFLOW_VERSION_ID,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data: VoiceflowResponse = await response.json();
//     console.log('Voiceflow raw response:', JSON.stringify(data, null, 2));
//     return data;
//   } catch (error) {
//     console.error('Error getting Voiceflow response:', error);
//     throw error;
//   }
// }

// export function processVoiceflowResponse(response: VoiceflowResponse): string {
//   let processedResponse = '';

//   if (!response.trace || !Array.isArray(response.trace)) {
//     console.warn('Invalid Voiceflow response structure:', response);
//     return 'Sorry, I couldn0t process the response. Please try again.';
//   }

//   for (const trace of response.trace) {
//     switch (trace.type) {
//       case 'speak':
//       case 'text':
//         processedResponse += trace.payload.message + '\n';
//         break;
//       case 'visual':
//         processedResponse += `[Image: ${trace.payload.image}]\n`;
//         break;
//       case 'choice':
//         processedResponse += 'Options:\n';
//         for (const choice of trace.payload.buttons) {
//           processedResponse += `- ${choice.name}\n`;
//         }
//         break;
//       default:
//         console.warn(`Unhandled trace type: ${trace.type}`);
//     }
//   }

//   const trimmedResponse = processedResponse.trim();
//   console.log('Processed Voiceflow response:', trimmedResponse);
//   return trimmedResponse || 'Sorry, I couldnoot generate a response. Please try again.';
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   try {
//     const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.VOICEFLOW_API_KEY}`,
//       },
//       body: JSON.stringify({
//         versionID: process.env.VOICEFLOW_VERSION_ID,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     console.log(`Voiceflow user created successfully: ${userId}`);
//     return true;
//   } catch (error) {
//     console.error('Error creating Voiceflow user:', error);
//     throw error;
//   }
// }

import fetch from 'node-fetch';
import { RateLimiter } from 'limiter';

const VOICEFLOW_API_URL = 'https://general-runtime.voiceflow.com';
const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
const VOICEFLOW_VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

if (!VOICEFLOW_API_KEY || !VOICEFLOW_VERSION_ID) {
  throw new Error('Voiceflow API key or version ID is not set');
}

const limiter = new RateLimiter({ tokensPerInterval: 5, interval: 'second' });

interface VoiceflowResponse {
  trace: Array<{
    type: string;
    payload: any;
  }>;
}

async function callVoiceflowWithRateLimit<T>(fn: () => Promise<T>): Promise<T> {
  await limiter.removeTokens(1);
  return fn();
}

async function retryVoiceflowCall<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callVoiceflowWithRateLimit(fn);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.warn(`Voiceflow API call failed, retrying (${i + 1}/${maxRetries})...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries reached');
}

export async function getVoiceflowResponse(message: string, userId: string): Promise<VoiceflowResponse> {
  return retryVoiceflowCall(async () => {
    const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}/interact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
      },
      body: JSON.stringify({
        action: {
          type: 'text',
          payload: message,
        },
        config: {
          tts: false,
          stripSSML: true,
        },
        versionID: VOICEFLOW_VERSION_ID,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Voiceflow API error (${response.status}):`, errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: VoiceflowResponse = await response.json();
    console.log('Voiceflow raw response:', JSON.stringify(data, null, 2));
    return data;
  });
}

export function processVoiceflowResponse(response: VoiceflowResponse): string {
  let processedResponse = '';

  if (!response || !response.trace || !Array.isArray(response.trace)) {
    console.warn('Invalid Voiceflow response structure:', JSON.stringify(response, null, 2));
    return 'Sorry, I couldnot process the response. Please try again.';
  }

  for (const trace of response.trace) {
    if (!trace || typeof trace !== 'object') {
      console.warn('Invalid trace item:', trace);
      continue;
    }

    switch (trace.type) {
      case 'speak':
      case 'text':
        if (trace.payload && typeof trace.payload.message === 'string') {
          processedResponse += trace.payload.message + '\n';
        }
        break;
      case 'visual':
        if (trace.payload && typeof trace.payload.image === 'string') {
          processedResponse += `[Image: ${trace.payload.image}]\n`;
        }
        break;
      case 'choice':
        if (trace.payload && Array.isArray(trace.payload.buttons)) {
          processedResponse += 'Options:\n';
          for (const choice of trace.payload.buttons) {
            if (typeof choice.name === 'string') {
              processedResponse += `- ${choice.name}\n`;
            }
          }
        }
        break;
      default:
        console.warn(`Unhandled trace type: ${trace.type}`);
    }
  }

  const trimmedResponse = processedResponse.trim();
  console.log('Processed Voiceflow response:', trimmedResponse);
  return trimmedResponse || 'Sorry, I couldnot generate a response. Please try again.';
}

export async function createVoiceflowUser(userId: string): Promise<boolean> {
  return retryVoiceflowCall(async () => {
    const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
      },
      body: JSON.stringify({
        versionID: VOICEFLOW_VERSION_ID,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Voiceflow API error (${response.status}):`, errorBody);
      return false;
    }

    console.log(`Voiceflow user created successfully: ${userId}`);
    return true;
  });
}

