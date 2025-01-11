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

// import fetch from 'node-fetch';
// import { RateLimiter } from 'limiter';

// const VOICEFLOW_API_URL = 'https://general-runtime.voiceflow.com';
// const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
// const VOICEFLOW_VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// if (!VOICEFLOW_API_KEY || !VOICEFLOW_VERSION_ID) {
//   throw new Error('Voiceflow API key or version ID is not set');
// }

// const limiter = new RateLimiter({ tokensPerInterval: 5, interval: 'second' });

// interface VoiceflowResponse {
//   trace: Array<{
//     type: string;
//     payload: any;
//   }>;
// }

// async function callVoiceflowWithRateLimit<T>(fn: () => Promise<T>): Promise<T> {
//   await limiter.removeTokens(1);
//   return fn();
// }

// async function retryVoiceflowCall<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       return await callVoiceflowWithRateLimit(fn);
//     } catch (error) {
//       console.error(`Voiceflow API call failed (attempt ${i + 1}/${maxRetries}):`, error);
//       if (i === maxRetries - 1) throw error;
//       await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
//     }
//   }
//   throw new Error('Max retries reached');
// }

// export async function getVoiceflowResponse(message: string, userId: string): Promise<VoiceflowResponse> {
//   try {
//     return await retryVoiceflowCall(async () => {
//       const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}/interact`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
//         },
//         body: JSON.stringify({
//           action: {
//             type: 'text',
//             payload: message,
//           },
//           config: {
//             tts: false,
//             stripSSML: true,
//           },
//           versionID: VOICEFLOW_VERSION_ID,
//         }),
//       });

//       if (!response.ok) {
//         const errorBody = await response.text();
//         console.error(`Voiceflow API error (${response.status}):`, errorBody);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: VoiceflowResponse = await response.json();
//       console.log('Voiceflow raw response:', JSON.stringify(data, null, 2));
//       return data;
//     });
//   } catch (error) {
//     console.error('Failed to get Voiceflow response after retries:', error);
//     // Return a default response
//     return {
//       trace: [
//         {
//           type: 'text',
//           payload: {
//             message: "Sorry, but I am having trouble processing your request right now. Please try again later or contact support if the issue persists."
//           }
//         }
//       ]
//     };
//   }
// }

// export function processVoiceflowResponse(response: VoiceflowResponse): string {
//   let processedResponse = '';

//   if (!response || !response.trace || !Array.isArray(response.trace)) {
//     console.warn('Invalid Voiceflow response structure:', JSON.stringify(response, null, 2));
//     return 'Sorry, I couldnt process the response. again.';
//   }

//   for (const trace of response.trace) {
//     if (!trace || typeof trace !== 'object') {
//       console.warn('Invalid trace item:', trace);
//       continue;
//     }

//     switch (trace.type) {
//       case 'speak':
//       case 'text':
//         if (trace.payload && typeof trace.payload.message === 'string') {
//           processedResponse += trace.payload.message + '\n';
//         }
//         break;
//       case 'visual':
//         if (trace.payload && typeof trace.payload.image === 'string') {
//           processedResponse += `[Image: ${trace.payload.image}]\n`;
//         }
//         break;
//       case 'choice':
//         if (trace.payload && Array.isArray(trace.payload.buttons)) {
//           processedResponse += 'Options:\n';
//           for (const choice of trace.payload.buttons) {
//             if (typeof choice.name === 'string') {
//               processedResponse += `- ${choice.name}\n`;
//             }
//           }
//         }
//         break;
//       default:
//         console.warn(`Unhandled trace type: ${trace.type}`);
//     }
//   }

//   const trimmedResponse = processedResponse.trim();
//   console.log('Processed Voiceflow response:', trimmedResponse);
//   return trimmedResponse || 'Sorry';
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   try {
//     return await retryVoiceflowCall(async () => {
//       const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
//         },
//         body: JSON.stringify({
//           versionID: VOICEFLOW_VERSION_ID,
//         }),
//       });

//       if (!response.ok) {
//         const errorBody = await response.text();
//         console.error(`Voiceflow API error (${response.status}):`, errorBody);
//         return false;
//       }

//       console.log(`Voiceflow user created successfully: ${userId}`);
//       return true;
//     });
//   } catch (error) {
//     console.error('Failed to create Voiceflow user after retries:', error);
//     return false;
//   }
// }

// import fetch from 'node-fetch';
// import { RateLimiter } from 'limiter';

// const VOICEFLOW_API_URL = 'https://general-runtime.voiceflow.com';
// const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
// const VOICEFLOW_VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// if (!VOICEFLOW_API_KEY || !VOICEFLOW_VERSION_ID) {
//   throw new Error('Voiceflow API key or version ID is not set');
// }

// const limiter = new RateLimiter({ tokensPerInterval: 5, interval: 'second' });

// interface VoiceflowResponse {
//   trace: Array<{
//     type: string;
//     payload: any;
//   }>;
// }

// class CircuitBreaker {
//   private failures: number = 0;
//   private lastFailureTime: number = 0;
//   private readonly threshold: number = 5;
//   private readonly cooldownPeriod: number = 60000; // 1 minute

//   isOpen(): boolean {
//     if (this.failures >= this.threshold) {
//       const timeSinceLastFailure = Date.now() - this.lastFailureTime;
//       if (timeSinceLastFailure < this.cooldownPeriod) {
//         return true;
//       }
//       this.reset();
//     }
//     return false;
//   }

//   recordFailure(): void {
//     this.failures++;
//     this.lastFailureTime = Date.now();
//   }

//   reset(): void {
//     this.failures = 0;
//     this.lastFailureTime = 0;
//   }
// }

// const circuitBreaker = new CircuitBreaker();

// async function callVoiceflowAPI<T>(userId: string, body: any): Promise<VoiceflowResponse> {
//   await limiter.removeTokens(1);

//   if (circuitBreaker.isOpen()) {
//     throw new Error('Circuit breaker is open');
//   }

//   try {
//     const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}/interact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${VOICEFLOW_API_KEY}`,
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       const errorBody = await response.text();
//       console.error(`Voiceflow API error (${response.status}):`, errorBody);
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data: VoiceflowResponse = await response.json();
//     console.log('Voiceflow raw response:', JSON.stringify(data, null, 2));
//     circuitBreaker.reset(); // Reset the circuit breaker on success
//     return data;
//   } catch (error) {
//     console.error('Voiceflow API call failed:', error);
//     circuitBreaker.recordFailure();
//     throw error;
//   }
// }

// export async function getVoiceflowResponse(message: string, userId: string): Promise<VoiceflowResponse> {
//   try {
//     const body = {
//       action: {
//         type: 'text',
//         payload: message,
//       },
//       config: {
//         tts: false,
//         stripSSML: true,
//       },
//       versionID: VOICEFLOW_VERSION_ID,
//     };

//     return await callVoiceflowAPI(userId, body);
//   } catch (error) {
//     console.error('Failed to get Voiceflow response:', error);
//     // Return a default fallback response
//     return {
//       trace: [
//         {
//           type: 'text',
//           payload: {
//             message: "I'm sorry, but I'm having trouble blablaaaaa.",
//           },
//         },
//       ],
//     };
//   }
// }

// export function processVoiceflowResponse(response: VoiceflowResponse): string {
//   let processedResponse = '';

//   if (!response || !response.trace || !Array.isArray(response.trace)) {
//     console.warn('Invalid Voiceflow response structure:', JSON.stringify(response, null, 2));
//     return 'Sorry, I couldn\'t process the response. Please try again.';
//   }

//   for (const trace of response.trace) {
//     if (!trace || typeof trace !== 'object') {
//       console.warn('Invalid trace item:', trace);
//       continue;
//     }

//     switch (trace.type) {
//       case 'speak':
//       case 'text':
//         if (trace.payload && typeof trace.payload.message === 'string') {
//           processedResponse += trace.payload.message + '\n';
//         }
//         break;
//       case 'visual':
//         if (trace.payload && typeof trace.payload.image === 'string') {
//           processedResponse += `[Image: ${trace.payload.image}]\n`;
//         }
//         break;
//       case 'choice':
//         if (trace.payload && Array.isArray(trace.payload.buttons)) {
//           processedResponse += 'Options:\n';
//           for (const choice of trace.payload.buttons) {
//             if (typeof choice.name === 'string') {
//               processedResponse += `- ${choice.name}\n`;
//             }
//           }
//         }
//         break;
//       default:
//         console.warn(`Unhandled trace type: ${trace.type}`);
//     }
//   }

//   const trimmedResponse = processedResponse.trim();
//   console.log('Processed Voiceflow response:', trimmedResponse);
//   return trimmedResponse || 'Sorry, I couldn\'t generate a response. Please try again.';
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   try {
//     const body = {
//       versionID: VOICEFLOW_VERSION_ID,
//     };

//     const response = await callVoiceflowAPI(userId, body);
//     console.log(`Voiceflow user created successfully: ${userId}`);
//     return true;
//   } catch (error) {
//     console.error('Failed to create Voiceflow user:', error);
//     return false;
//   }
// }
//
//
//


import axios from 'axios';

const API_KEY = process.env.VOICEFLOW_API_KEY;
const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

interface VoiceflowResponse {
  type: string;
  payload: any;
}

export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
  try {
    const response = await axios.post(
      `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
      { request: { type: 'text', payload: userInput } },
      {
        headers: {
          'Authorization': API_KEY,
          'versionID': VERSION_ID,
          "accept": "application/json",
          "content-type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error interacting with Voiceflow:', error);
    throw error;
  }
}

export function processVoiceflowResponse(traces: VoiceflowResponse[]): string {
  let result = '';
  for (let trace of traces) {
    if (trace.type === 'text') {
      result += trace.payload.message + '\n';
    } else if (trace.type === 'choice') {
      result += 'Options:\n';
      for (let button of trace.payload.buttons) {
        result += `- ${button.name}\n`;
      }
    }
  }
  return result.trim();
}

export async function createVoiceflowUser(userId: string): Promise<boolean> {
  try {
    await axios.put(
      'https://api.voiceflow.com/v2/transcripts',
      {
        projectID: PROJECT_ID,
        versionID: VERSION_ID,
        sessionID: userId
      },
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': API_KEY
        }
      }
    );
    return true;
  } catch (error) {
    console.error('Error creating Voiceflow user:', error);
    return false;
  }
}

// import axios from 'axios';

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

// export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
//   try {
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       { request: { type: 'text', payload: userInput } },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           "accept": "application/json",
//           "content-type": "application/json"
//         }
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error interacting with Voiceflow:', error);
//     throw error;
//   }
// }

// export function processVoiceflowResponse(traces: VoiceflowResponse[]): string {
//   let result = '';
//   for (let trace of traces) {
//     if (trace.type === 'text') {
//       result += trace.payload.message + '\n';
//     } else if (trace.type === 'choice') {
//       result += '\nOptions:\n';
//       for (let button of trace.payload.buttons) {
//         result += `- ${button.name}\n`;
//       }
//     }
//   }
//   return result.trim();
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   try {
//     await axios.put(
//       'https://api.voiceflow.com/v2/transcripts',
//       {
//         projectID: PROJECT_ID,
//         versionID: VERSION_ID,
//         sessionID: userId
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY
//         }
//       }
//     );
//     return true;
//   } catch (error) {
//     console.error('Error creating Voiceflow user:', error);
//     return false;
//   }
// }

// export async function resetVoiceflowUser(userId: string): Promise<boolean> {
//   try {
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       { request: { type: 'reset' } },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           "accept": "application/json",
//           "content-type": "application/json"
//         }
//       }
//     );
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:', error);
//     return false;
//   }
// }

