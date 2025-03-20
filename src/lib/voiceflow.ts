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
//       result += 'Options:\n';
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


// import axios from 'axios';
// import { PrismaClient } from '@prisma/client';
// const client = new PrismaClient();
// import {getAllBusinesses} from '@/actions/businfo'

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;


// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

  

// export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
//   try {
//     const busresult = await getAllBusinesses()
    
  
//     const bus = busresult.data.businesses[0] // Fetch the first (and only) business
  
//     // Static test variables
//     const BusinessVariables = {
//       business_name: bus.businessName,
//       business_type: bus.businessType,
//       owner_name: 'John Doe',
//       welcome_message: bus.welcomeMessage
//     };

//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: BusinessVariables }, // Inject test variables here
//       },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
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
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
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
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:', error);
//     return false;
//   }
// }


// import axios from 'axios';
// import { PrismaClient } from '@prisma/client';

// const client = new PrismaClient();

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

// interface BusinessVariables {
//   business_name: string;
//   business_type: string;
//   business_info: string;
//   industry: string;
//   instagram_handle: string;
//   welcome_message: string;
//   response_language: string;
//   business_hours: string;
//   auto_reply_enabled: boolean;
//   promotion_message: string;
// }

// async function fetchBusinessVariables(userId: string): Promise<BusinessVariables> {
//   const user = await client.user.findUnique({
//     where: { id: userId },
//     include: {
//       businesses: true
//     }
//   });

//   if (!user || !user.businesses || user.businesses.length === 0) {
//     throw new Error('No business information found for this user');
//   }

//   const business = user.businesses[0]; // Fetch the first (and only) business

//   return {
//     business_name: business.businessName,
//     business_type: business.businessType,
//     business_info: business.businessDescription,
//     industry: business.industry,
//     instagram_handle: business.instagramHandle,
//     welcome_message: business.welcomeMessage,
//     response_language: business.responseLanguage,
//     business_hours: business.businessHours,
//     auto_reply_enabled: business.autoReplyEnabled,
//     promotion_message: business.promotionMessage,
//   };
// }

// export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
//   try {
//     const businessVariables = await fetchBusinessVariables(userId);

//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: businessVariables },
//       },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
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
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
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
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:', error);
//     return false;
//   }
// }

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
//     const BusinessVariables = {
//       business_name:"Cashe Ent",
//       welcome_message:"Hey hello hello jello"
//     }

//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: BusinessVariables }, // Inject test variables here
//       },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
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
//       result += '\nSelect-One:\n';
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
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
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
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:', error);
//     return false;
//   }
// }


// import axios from 'axios';
// import { getAllBusinesses } from '@/actions/businfo';

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

// export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
//   try {
//     // Fetch business data
//     const businessResponse = await getAllBusinesses();
    
//     if (businessResponse.status !== 200 || !businessResponse.data) {
//       throw new Error('Failed to fetch business data');
//     }

//     const businessData = businessResponse.data.businesses[0];

//     const BusinessVariables = {
//       business_name: businessData.businessName || "Alternate name",
//       welcome_message: businessData.welcomeMessage || "Alternate Welcome",
//       business_industry: businessData.industry || "Alternate industry",
//       // Add more business-related variables as needed
//     };

//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: BusinessVariables },
//       },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error interacting with Voiceflow:', error);
//     throw error;
//   }
// }

// // The rest of the file remains unchanged

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
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
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
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:', error);
//     return false;
//   }
// }

// import axios from 'axios';
// import { getAllBusinesses } from '@/actions/businfo';
// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

// interface BusinessData {
//   businessName: string;
//   welcomeMessage: string;
//   industry: string;
// }

// export async function fetchBusinessVariables(): Promise<Record<string, string>> {
//   try {
//     const businessResponse = await getAllBusinesses();

//     if (businessResponse.status !== 200 || !businessResponse.data || !businessResponse.data.businesses.length) {
//       throw new Error('Failed to fetch business data or no businesses found');
//     }

//     const businessData: BusinessData = businessResponse.data.businesses[0];

//     return {
//       business_name: businessData.businessName || 'Default Business Name',
//       welcome_message: businessData.welcomeMessage || 'Welcome to our business!',
//       business_industry: businessData.industry || 'General',
//     };
//   } catch (error) {
//     console.error('Error fetching business variables:', error);
//     throw error;
//   }
// }

// export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
//   let businessVariables: Record<string, string> = {
//     business_name: 'Default Business Name',
//     welcome_message: 'Welcome to our business!',
//     business_industry: 'General',
//   };

//   try {
//     businessVariables = await fetchBusinessVariables();
//   } catch (error) {
//     console.warn('Failed to fetch business variables, using default values:', error);
//   }

//   try {
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: businessVariables },
//       },
//       {
//         headers: {
//           Authorization: API_KEY,
//           versionID: VERSION_ID,
//           accept: 'application/json',
//           'content-type': 'application/json',
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
//   for (const trace of traces) {
//     if (trace.type === 'text') {
//       result += trace.payload.message + '\n';
//     } else if (trace.type === 'choice') {
//       result += '\nOptions:\n';
//       for (const button of trace.payload.buttons) {
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
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
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
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:', error);
//     return false;
//   }
// }

// import axios, { AxiosError } from 'axios';
// import { getAllBusinesses } from '@/actions/businfo';

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

// interface BusinessData {
//   businessName: string;
//   welcomeMessage: string;
//   industry: string;
// }

// export async function fetchBusinessVariables(): Promise<Record<string, string>> {
//   console.log('Entering fetchBusinessVariables function');
//   try {
//     console.log('Attempting to call getAllBusinesses');
//     const businessResponse = await getAllBusinesses();
//     console.log('getAllBusinesses response:', JSON.stringify(businessResponse, null, 2));

//     if (businessResponse.status !== 200) {
//       console.error(`Unexpected status code: ${businessResponse.status}`);
//       console.error('Full response:', JSON.stringify(businessResponse, null, 2));
//       throw new Error(`Failed to fetch business data. Status: ${businessResponse.status}`);
//     }

//     if (!businessResponse.data) {
//       console.error('No data received from getAllBusinesses');
//       throw new Error('No data received from getAllBusinesses');
//     }

//     if (!businessResponse.data.businesses || !Array.isArray(businessResponse.data.businesses)) {
//       console.error('Invalid businesses data structure:', JSON.stringify(businessResponse.data, null, 2));
//       throw new Error('Invalid businesses data structure');
//     }

//     if (businessResponse.data.businesses.length === 0) {
//       console.error('No businesses found in the response');
//       throw new Error('No businesses found');
//     }

//     const businessData: BusinessData = businessResponse.data.businesses[0];
//     console.log('First business data:', JSON.stringify(businessData, null, 2));

//     if (!businessData.businessName && !businessData.welcomeMessage && !businessData.industry) {
//       console.error('All business data fields are empty');
//       throw new Error('All business data fields are empty');
//     }

//     const result = {
//       business_name: businessData.businessName || 'Default Business Name',
//       welcome_message: businessData.welcomeMessage || 'Welcome to our business!',
//       business_industry: businessData.industry || 'General',
//     };

//     console.log('Returning business variables:', JSON.stringify(result, null, 2));
//     return result;
//   } catch (error) {
//     console.error('Error in fetchBusinessVariables:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting fetchBusinessVariables function');
//   }
// }

// export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
//   console.log('Entering getVoiceflowResponse function');
//   console.log('User input:', userInput);
//   console.log('User ID:', userId);

//   let businessVariables: Record<string, string> = {
//     business_name: 'Default Business Name',
//     welcome_message: 'Welcome to our business!',
//     business_industry: 'General',
//   };

//   try {
//     console.log('Attempting to fetch business variables');
//     businessVariables = await fetchBusinessVariables();
//     console.log('Fetched business variables:', JSON.stringify(businessVariables, null, 2));
//   } catch (error) {
//     console.warn('Failed to fetch business variables, using default values:');
//     console.warn('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//   }

//   try {
//     console.log('Sending request to Voiceflow API');
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: businessVariables },
//       },
//       {
//         headers: {
//           Authorization: API_KEY,
//           versionID: VERSION_ID,
//           accept: 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );

//     console.log('Voiceflow API response status:', response.status);
//     console.log('Voiceflow API response data:', JSON.stringify(response.data, null, 2));

//     return response.data;
//   } catch (error) {
//     console.error('Error interacting with Voiceflow:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting getVoiceflowResponse function');
//   }
// }

// export function processVoiceflowResponse(traces: VoiceflowResponse[]): string {
//   console.log('Entering processVoiceflowResponse function');
//   console.log('Input traces:', JSON.stringify(traces, null, 2));

//   let result = '';
//   try {
//     for (const trace of traces) {
//       console.log('Processing trace:', JSON.stringify(trace, null, 2));
//       if (trace.type === 'text') {
//         result += trace.payload.message + '\n';
//       } else if (trace.type === 'choice') {
//         result += '\nOptions:\n';
//         for (const button of trace.payload.buttons) {
//           result += `- ${button.name}\n`;
//         }
//       }
//     }
//     result = result.trim();
//     console.log('Processed result:', result);
//   } catch (error) {
//     console.error('Error in processVoiceflowResponse:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting processVoiceflowResponse function');
//   }
//   return result;
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering createVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to create Voiceflow user');
//     const response = await axios.put(
//       'https://api.voiceflow.com/v2/transcripts',
//       {
//         projectID: PROJECT_ID,
//         versionID: VERSION_ID,
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
//         }
//       }
//     );
//     console.log('Voiceflow user creation response status:', response.status);
//     console.log('Voiceflow user creation response data:', JSON.stringify(response.data, null, 2));
//     return true;
//   } catch (error) {
//     console.error('Error creating Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting createVoiceflowUser function');
//   }
// }

// export async function resetVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering resetVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to reset Voiceflow user');
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       { request: { type: 'reset' } },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     console.log('Voiceflow user reset response status:', response.status);
//     console.log('Voiceflow user reset response data:', JSON.stringify(response.data, null, 2));
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting resetVoiceflowUser function');
//   }
// }

// import axios, { AxiosError } from 'axios';
// import { getBusinessForWebhook } from '@/actions/businfo';

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

// interface BusinessData {
//   businessName: string;
//   welcomeMessage: string;
//   industry: string;
// }

// export async function fetchBusinessVariables(): Promise<Record<string, string>> {
//   console.log('Entering fetchBusinessVariables function');
//   try {
//     console.log('Attempting to call getAllBusinesses');
//     const businessResponse = await getBusinessForWebhook();
//     console.log('getAllBusinesses response:', JSON.stringify(businessResponse, null, 2));

//     if (businessResponse.status !== 200) {
//       console.error(`Unexpected status code: ${businessResponse.status}`);
//       console.error('Full response:', JSON.stringify(businessResponse, null, 2));
//       throw new Error(`Failed to fetch business data. Status: ${businessResponse.status}`);
//     }

//     if (!businessResponse.data) {
//       console.error('No data received from getAllBusinesses');
//       throw new Error('No data received from getAllBusinesses');
//     }

//     if (!businessResponse.data.business || !Array.isArray(businessResponse.data.business)) {
//       console.error('Invalid businesses data structure:', JSON.stringify(businessResponse.data, null, 2));
//       throw new Error('Invalid businesses data structure');
//     }

//     if (businessResponse.data.business.length === 0) {
//       console.error('No businesses found in the response');
//       throw new Error('No businesses found');
//     }

//     const businessData: BusinessData = businessResponse.data.business[0];
//     console.log('First business data:', JSON.stringify(businessData, null, 2));

//     if (!businessData.businessName && !businessData.welcomeMessage && !businessData.industry) {
//       console.error('All business data fields are empty');
//       throw new Error('All business data fields are empty');
//     }

//     const result = {
//       business_name: businessData.businessName || 'Default Business Name',
//       welcome_message: businessData.welcomeMessage || 'Welcome to our business!',
//       business_industry: businessData.industry || 'General',
//     };

//     console.log('Returning business variables:', JSON.stringify(result, null, 2));
//     return result;
//   } catch (error) {
//     console.error('Error in fetchBusinessVariables:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting fetchBusinessVariables function');
//   }
// }

// export async function getVoiceflowResponse(userInput: string, userId: string): Promise<VoiceflowResponse[]> {
//   console.log('Entering getVoiceflowResponse function');
//   console.log('User input:', userInput);
//   console.log('User ID:', userId);

//   let businessVariables: Record<string, string> = {
//     business_name: 'Default Business Name',
//     welcome_message: 'Welcome to our business!',
//     business_industry: 'General',
//   };

//   try {
//     console.log('Attempting to fetch business variables');
//     businessVariables = await fetchBusinessVariables();
//     console.log('Fetched business variables:', JSON.stringify(businessVariables, null, 2));
//   } catch (error) {
//     console.warn('Failed to fetch business variables, using default values:');
//     console.warn('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//   }

//   try {
//     console.log('Sending request to Voiceflow API');
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: businessVariables },
//       },
//       {
//         headers: {
//           Authorization: API_KEY,
//           versionID: VERSION_ID,
//           accept: 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );

//     console.log('Voiceflow API response status:', response.status);
//     console.log('Voiceflow API response data:', JSON.stringify(response.data, null, 2));

//     return response.data;
//   } catch (error) {
//     console.error('Error interacting with Voiceflow:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting getVoiceflowResponse function');
//   }
// }

// export function processVoiceflowResponse(traces: VoiceflowResponse[]): string {
//   console.log('Entering processVoiceflowResponse function');
//   console.log('Input traces:', JSON.stringify(traces, null, 2));

//   let result = '';
//   try {
//     for (const trace of traces) {
//       console.log('Processing trace:', JSON.stringify(trace, null, 2));
//       if (trace.type === 'text') {
//         result += trace.payload.message + '\n';
//       } else if (trace.type === 'choice') {
//         result += '\nOptions:\n';
//         for (const button of trace.payload.buttons) {
//           result += `- ${button.name}\n`;
//         }
//       }
//     }
//     result = result.trim();
//     console.log('Processed result:', result);
//   } catch (error) {
//     console.error('Error in processVoiceflowResponse:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting processVoiceflowResponse function');
//   }
//   return result;
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering createVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to create Voiceflow user');
//     const response = await axios.put(
//       'https://api.voiceflow.com/v2/transcripts',
//       {
//         projectID: PROJECT_ID,
//         versionID: VERSION_ID,
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
//         }
//       }
//     );
//     console.log('Voiceflow user creation response status:', response.status);
//     console.log('Voiceflow user creation response data:', JSON.stringify(response.data, null, 2));
//     return true;
//   } catch (error) {
//     console.error('Error creating Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting createVoiceflowUser function');
//   }
// }

// export async function resetVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering resetVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to reset Voiceflow user');
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       { request: { type: 'reset' } },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     console.log('Voiceflow user reset response status:', response.status);
//     console.log('Voiceflow user reset response data:', JSON.stringify(response.data, null, 2));
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting resetVoiceflowUser function');
//   }
// }

//WOOOOORKIIIIING
// import axios, { AxiosError } from 'axios';
// import { getBusinessForWebhook } from '@/actions/businfo';

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }

// interface BusinessData {
//   id: string;
//   businessName: string;
//   businessType: string;
//   businessDescription: string;
//   industry: string;
//   instagramHandle: string;
//   welcomeMessage: string;
//   responseLanguage: string;
//   businessHours: string;
//   autoReplyEnabled: boolean;
//   promotionMessage: string;
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string | null;
// }

// export async function fetchBusinessVariables(businessId: string): Promise<Record<string, string>> {
//   console.log('Entering fetchBusinessVariables function');
//   try {
//     console.log('Attempting to call getBusinessForWebhook');
//     const businessResponse = await getBusinessForWebhook(businessId);
//     console.log('getBusinessForWebhook response:', JSON.stringify(businessResponse, null, 2));

//     if (businessResponse.status !== 200 || !businessResponse.data.business) {
//       console.error(`Unexpected response: ${JSON.stringify(businessResponse, null, 2)}`);
//       throw new Error(`Failed to fetch business data. Status: ${businessResponse.status}`);
//     }

//     const businessData: BusinessData = businessResponse.data.business;

//     console.log('Business data:', JSON.stringify(businessData, null, 2));

//     if (!businessData.businessName && !businessData.welcomeMessage && !businessData.industry) {
//       console.error('All business data fields are empty');
//       throw new Error('All business data fields are empty');
//     }

//     const result = {
//       business_name: businessData.businessName || 'Default Business Name',
//       welcome_message: businessData.welcomeMessage || 'Welcome to our business!',
//       business_industry: businessData.industry || 'General',
//     };

//     console.log('Returning business variables:', JSON.stringify(result, null, 2));
//     return result;
//   } catch (error) {
//     console.error('Error in fetchBusinessVariables:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting fetchBusinessVariables function');
//   }
// }


// export async function getVoiceflowResponse(
//   userInput: string, 
//   userId: string, 
//   businessVariables: Record<string, string>
// ): Promise<VoiceflowResponse[]> {
//   console.log('Entering getVoiceflowResponse function');
//   console.log('User input:', userInput);
//   console.log('User ID:', userId);
//   console.log('Business variables:', JSON.stringify(businessVariables, null, 2));

//   try {
//     console.log('Sending request to Voiceflow API');
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: 'text', payload: userInput },
//         state: { variables: businessVariables },
//       },
//       {
//         headers: {
//           Authorization: API_KEY,
//           versionID: VERSION_ID,
//           accept: 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );

//     console.log('Voiceflow API response status:', response.status);
//     console.log('Voiceflow API response data:', JSON.stringify(response.data, null, 2));

//     return response.data;
//   } catch (error) {
//     console.error('Error interacting with Voiceflow:', error);
//     throw error;
//   }
// }


// export function processVoiceflowResponse(traces: VoiceflowResponse[]): string {
//   console.log('Entering processVoiceflowResponse function');
//   console.log('Input traces:', JSON.stringify(traces, null, 2));

//   let result = '';
//   try {
//     for (const trace of traces) {
//       console.log('Processing trace:', JSON.stringify(trace, null, 2));
//       if (trace.type === 'text') {
//         result += trace.payload.message + '\n';
//       } else if (trace.type === 'choice') {
//         result += '\nOptions:\n';
//         for (const button of trace.payload.buttons) {
//           result += `- ${button.name}\n`;
//         }
//       }
//     }
//     result = result.trim();
//     console.log('Processed result:', result);
//   } catch (error) {
//     console.error('Error in processVoiceflowResponse:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting processVoiceflowResponse function');
//   }
//   return result;
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering createVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to create Voiceflow user');
//     const response = await axios.put(
//       'https://api.voiceflow.com/v2/transcripts',
//       {
//         projectID: PROJECT_ID,
//         versionID: VERSION_ID,
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
//         }
//       }
//     );
//     console.log('Voiceflow user creation response status:', response.status);
//     console.log('Voiceflow user creation response data:', JSON.stringify(response.data, null, 2));
//     return true;
//   } catch (error) {
//     console.error('Error creating Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting createVoiceflowUser function');
//   }
// }

// export async function resetVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering resetVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to reset Voiceflow user');
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       { request: { type: 'reset' } },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     console.log('Voiceflow user reset response status:', response.status);
//     console.log('Voiceflow user reset response data:', JSON.stringify(response.data, null, 2));
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting resetVoiceflowUser function');
//   }
// }


// import axios, { AxiosError } from 'axios';
// import { getBusinessForWebhook } from '@/actions/businfo';
// import type { VoiceflowVariables, VoiceflowResult } from "@/types/voiceflow"

// const API_KEY = process.env.VOICEFLOW_API_KEY;
// const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID;
// const VERSION_ID = process.env.VOICEFLOW_VERSION_ID;

// interface VoiceflowResponse {
//   type: string;
//   payload: any;
// }



// interface BusinessData {
//   id: string;
//   businessName: string;
//   businessType: string;
//   businessDescription: string;
//   industry: string;
//   instagramHandle: string;
//   welcomeMessage: string;
//   responseLanguage: string;
//   businessHours: string;
//   autoReplyEnabled: boolean;
//   promotionMessage: string;
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string | null;
// }

// export async function fetchBusinessVariables(businessId: string): Promise<Record<string, string>> {
//   console.log('Entering fetchBusinessVariables function');
//   try {
//     console.log('Attempting to call getBusinessForWebhook');
//     const businessResponse = await getBusinessForWebhook(businessId);
//     console.log('getBusinessForWebhook response:', JSON.stringify(businessResponse, null, 2));

//     if (businessResponse.status !== 200 || !businessResponse.data.business) {
//       console.error(`Unexpected response: ${JSON.stringify(businessResponse, null, 2)}`);
//       throw new Error(`Failed to fetch business data. Status: ${businessResponse.status}`);
//     }

//     const businessData: BusinessData = businessResponse.data.business;

//     console.log('Business data:', JSON.stringify(businessData, null, 2));

//     if (!businessData.businessName && !businessData.welcomeMessage && !businessData.industry) {
//       console.error('All business data fields are empty');
//       throw new Error('All business data fields are empty');
//     }

//     const result = {
//       business_name: businessData.businessName || 'Default Business Name',
//       welcome_message: businessData.welcomeMessage || 'Welcome to our business!',
//       business_industry: businessData.industry || 'General',
//     };

//     console.log('Returning business variables:', JSON.stringify(result, null, 2));
//     return result;
//   } catch (error) {
//     console.error('Error in fetchBusinessVariables:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting fetchBusinessVariables function');
//   }
// }

// export async function getVoiceflowResponse(
//   userInput: string,
//   userId: string,
//   businessVariables: Record<string, string>,
// ): Promise<VoiceflowResult> {
//   console.log("Entering getVoiceflowResponse function")
//   console.log("User input:", userInput)
//   console.log("User ID:", userId)
//   console.log("Business variables:", JSON.stringify(businessVariables, null, 2))

//   try {
//     console.log("Sending request to Voiceflow API")
//     const response = await axios.post<VoiceflowResponse[]>(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       {
//         request: { type: "text", payload: userInput },
//         state: { variables: businessVariables },
//       },
//       {
//         headers: {
//           Authorization: API_KEY,
//           versionID: VERSION_ID,
//           accept: "application/json",
//           "content-type": "application/json",
//         },
//       },
//     )

//     console.log("Voiceflow API response status:", response.status)
//     console.log("Voiceflow API response data:", JSON.stringify(response.data, null, 2))

//     // Fetch updated variables after interaction
//     const updatedVariables = await fetchVoiceflowVariables(userId)

//     return { response: response.data, variables: updatedVariables }
//   } catch (error) {
//     console.error("Error interacting with Voiceflow:", error)
//     throw error
//   }
// }

// async function fetchVoiceflowVariables(userId: string): Promise<VoiceflowVariables> {
//   console.log("Entering fetchVoiceflowVariables function")
//   console.log("User ID:", userId)

//   try {
//     console.log("Sending request to fetch Voiceflow variables")
//     const response = await axios.get<{ variables: VoiceflowVariables }>(
//       `https://general-runtime.voiceflow.com/state/user/${userId}`,
//       {
//         headers: {
//           Authorization: API_KEY,
//           versionID: VERSION_ID,
//           accept: "application/json",
//         },
//       },
//     )
//     console.log("Voiceflow variables fetch response status:", response.status)
//     console.log("Voiceflow variables fetch response data:", JSON.stringify(response.data, null, 2))

//     return response.data.variables || {}
//   } catch (error) {
//     console.error("Error fetching Voiceflow variables:", error)
//     throw error
//   }
// }


// export function processVoiceflowResponse(traces: VoiceflowResponse[]): string {
//   console.log('Entering processVoiceflowResponse function');
//   console.log('Input traces:', JSON.stringify(traces, null, 2));

//   let result = '';
//   try {
//     for (const trace of traces) {
//       console.log('Processing trace:', JSON.stringify(trace, null, 2));
//       if (trace.type === 'text') {
//         result += trace.payload.message + '\n';
//       } else if (trace.type === 'choice') {
//         result += '\nOptions:\n';
//         for (const button of trace.payload.buttons) {
//           result += `- ${button.name}\n`;
//         }
//       }
//     }
//     result = result.trim();
//     console.log('Processed result:', result);
//   } catch (error) {
//     console.error('Error in processVoiceflowResponse:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     throw error;
//   } finally {
//     console.log('Exiting processVoiceflowResponse function');
//   }
//   return result;
// }

// export async function createVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering createVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to create Voiceflow user');
//     const response = await axios.put(
//       'https://api.voiceflow.com/v2/transcripts',
//       {
//         projectID: PROJECT_ID,
//         versionID: VERSION_ID,
//         sessionID: userId,
//       },
//       {
//         headers: {
//           'accept': 'application/json',
//           'content-type': 'application/json',
//           'Authorization': API_KEY,
//         }
//       }
//     );
//     console.log('Voiceflow user creation response status:', response.status);
//     console.log('Voiceflow user creation response data:', JSON.stringify(response.data, null, 2));
//     return true;
//   } catch (error) {
//     console.error('Error creating Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting createVoiceflowUser function');
//   }
// }

// export async function resetVoiceflowUser(userId: string): Promise<boolean> {
//   console.log('Entering resetVoiceflowUser function');
//   console.log('User ID:', userId);

//   try {
//     console.log('Sending request to reset Voiceflow user');
//     const response = await axios.post(
//       `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
//       { request: { type: 'reset' } },
//       {
//         headers: {
//           'Authorization': API_KEY,
//           'versionID': VERSION_ID,
//           'accept': 'application/json',
//           'content-type': 'application/json',
//         }
//       }
//     );
//     console.log('Voiceflow user reset response status:', response.status);
//     console.log('Voiceflow user reset response data:', JSON.stringify(response.data, null, 2));
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error resetting Voiceflow user:');
//     if (error instanceof Error) {
//       console.error('Error name:', error.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error('Axios error details:');
//       console.error('Request URL:', axiosError.config?.url);
//       console.error('Request method:', axiosError.config?.method);
//       console.error('Request headers:', JSON.stringify(axiosError.config?.headers, null, 2));
//       console.error('Request data:', JSON.stringify(axiosError.config?.data, null, 2));
//       console.error('Response status:', axiosError.response?.status);
//       console.error('Response data:', JSON.stringify(axiosError.response?.data, null, 2));
//     }
//     console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return false;
//   } finally {
//     console.log('Exiting resetVoiceflowUser function');
//   }
// }




import axios, { type AxiosError } from "axios"
import { getBusinessForWebhook } from "@/actions/businfo"
import type { VoiceflowVariables, VoiceflowResult } from "@/types/voiceflow"
import type { JsonValue } from "@prisma/client/runtime/library"

const API_KEY = process.env.VOICEFLOW_API_KEY
const PROJECT_ID = process.env.VOICEFLOW_PROJECT_ID
const VERSION_ID = process.env.VOICEFLOW_VERSION_ID

interface VoiceflowResponse {
  type: string
  payload: any
}

interface BusinessData {
  id: string
  name: string | null
  businessName: string
  businessType: string
  businessDescription: string
  industry: string
  automationSetupComplete: boolean
  automationSetupDate: Date | null
  automationAdditionalNotes: string | null
  automationGoals: JsonValue | null
  customerJourney: JsonValue | null
  features: JsonValue | null
  businessTypeData: JsonValue | null
  websiteAnalysis: JsonValue | null
  targetAudience: string
  website: string
  instagramHandle: string
  welcomeMessage: string
  responseLanguage: string
  businessHours: string
  autoReplyEnabled: boolean
  promotionMessage: string
  createdAt: Date
  updatedAt: Date
  userId: string | null
}

export async function fetchBusinessVariables(businessId: string): Promise<Record<string, string>> {
  console.log("Entering fetchBusinessVariables functione")
  try {
    console.log("Attempting to call getBusinessForWebhook")
    const businessResponse = await getBusinessForWebhook(businessId)
    console.log("getBusinessForWebhook response:", JSON.stringify(businessResponse, null, 2))

    if (businessResponse.status !== 200 || !businessResponse.data.business) {
      console.error(`Unexpected response: ${JSON.stringify(businessResponse, null, 2)}`)
      throw new Error(`Failed to fetch business data. Status: ${businessResponse.status}`)
    }

    const businessData: BusinessData = businessResponse.data.business

    console.log("Business data:", JSON.stringify(businessData, null, 2))

    if (!businessData.businessName && !businessData.welcomeMessage && !businessData.industry) {
      console.error("All business data fields are empty")
      throw new Error("All business data fields are empty")
    }

    const result: Record<string, string> = {
      business_name: businessData.businessName || "Default Business Name",
      welcome_message: businessData.welcomeMessage || "Welcome to our business!",
      business_industry: businessData.industry || "General",
      business_type: businessData.businessType || "General",
      business_description: businessData.businessDescription || "No description provided",
      instagram_handle: businessData.instagramHandle || "",
      response_language: businessData.responseLanguage || "English",
      business_hours: businessData.businessHours || "Not specified",
      auto_reply_enabled: businessData.autoReplyEnabled ? "Yes" : "No",
      promotion_message: businessData.promotionMessage || "No current promotions",
    }

    // Parse and add new fields
    if (businessData.automationGoals) {
      const automationGoals = businessData.automationGoals as Record<string, any>
      result.primary_goal = automationGoals.primaryGoal || ""
      result.response_time = automationGoals.responseTime?.toString() || ""
      result.custom_goals = automationGoals.customGoals || ""
    }

    if (businessData.customerJourney) {
      const customerJourney = businessData.customerJourney as Record<string, any>
      result.journey_steps = JSON.stringify(customerJourney.journeySteps || [])
    }

    if (businessData.features) {
      const features = businessData.features as Record<string, any>
      result.enabled_features =
        features.features
          ?.filter((f: any) => f.enabled)
          .map((f: any) => f.name)
          .join(", ") || ""
    }

    if (businessData.businessTypeData) {
      result.business_type_data = JSON.stringify(businessData.businessTypeData)
    }

    if (businessData.websiteAnalysis) {
      result.website_analysis = JSON.stringify(businessData.websiteAnalysis)
    }

    result.automation_setup_complete = businessData.automationSetupComplete ? "Yes" : "No"
    result.automation_setup_date = businessData.automationSetupDate?.toISOString() || ""
    result.automation_additional_notes = businessData.automationAdditionalNotes || ""

    console.log("Returning business variables:", JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.error("Error in fetchBusinessVariables:")
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error("Axios error details:")
      console.error("Request URL:", axiosError.config?.url)
      console.error("Request method:", axiosError.config?.method)
      console.error("Request headers:", JSON.stringify(axiosError.config?.headers, null, 2))
      console.error("Request data:", JSON.stringify(axiosError.config?.data, null, 2))
      console.error("Response status:", axiosError.response?.status)
      console.error("Response data:", JSON.stringify(axiosError.response?.data, null, 2))
    }
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    throw error
  } finally {
    console.log("Exiting fetchBusinessVariables function")
  }
}

export async function getVoiceflowResponse(
  userInput: string,
  userId: string,
  businessVariables: Record<string, string>,
): Promise<VoiceflowResult> {
  console.log("Entering getVoiceflowResponse function")
  console.log("User input:", userInput)
  console.log("User ID:", userId)
  console.log("Business variables:", JSON.stringify(businessVariables, null, 2))

  try {
    console.log("Sending request to Voiceflow API")
    const response = await axios.post<VoiceflowResponse[]>(
      `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
      {
        request: { type: "text", payload: userInput },
        state: { variables: businessVariables },
      },
      {
        headers: {
          Authorization: API_KEY,
          versionID: VERSION_ID,
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    )

    console.log("Voiceflow API response status:", response.status)
    console.log("Voiceflow API response data:", JSON.stringify(response.data, null, 2))

    // Fetch updated variables after interaction
    const updatedVariables = await fetchVoiceflowVariables(userId)

    return { response: response.data, variables: updatedVariables }
  } catch (error) {
    console.error("Error interacting with Voiceflow:", error)
    throw error
  }
}

async function fetchVoiceflowVariables(userId: string): Promise<VoiceflowVariables> {
  console.log("Entering fetchVoiceflowVariables function")
  console.log("User ID:", userId)

  try {
    console.log("Sending request to fetch Voiceflow variables")
    const response = await axios.get<{ variables: VoiceflowVariables }>(
      `https://general-runtime.voiceflow.com/state/user/${userId}`,
      {
        headers: {
          Authorization: API_KEY,
          versionID: VERSION_ID,
          accept: "application/json",
        },
      },
    )
    console.log("Voiceflow variables fetch response status:", response.status)
    console.log("Voiceflow variables fetch response data:", JSON.stringify(response.data, null, 2))

    return response.data.variables || {}
  } catch (error) {
    console.error("Error fetching Voiceflow variables:", error)
    throw error
  }
}

// export function processVoiceflowResponse(traces: VoiceflowResponse[]): string {
//   console.log("Entering processVoiceflowResponse function")
//   console.log("Input traces:", JSON.stringify(traces, null, 2))

//   let result = ""
//   try {
//     for (const trace of traces) {
//       console.log("Processing trace:", JSON.stringify(trace, null, 2))
//       if (trace.type === "text") {
//         result += trace.payload.message + "\n"
//       } else if (trace.type === "choice") {
//         result += "\nOptions:\n"
//         for (const button of trace.payload.buttons) {
//           result += `- ${button.name}\n`
//         }
//       }
//     }
//     result = result.trim()
//     console.log("Processed result:", result)
//   } catch (error) {
//     console.error("Error in processVoiceflowResponse:")
//     if (error instanceof Error) {
//       console.error("Error name:", error.name)
//       console.error("Error message:", error.message)
//       console.error("Error stack:", error.stack)
//     }
//     console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
//     throw error
//   } finally {
//     console.log("Exiting processVoiceflowResponse function")
//   }
//   return result
// }

// export function processVoiceflowResponse(traces: VoiceflowResponse[]): { text: string; buttons?: { name: string; payload: string }[] } {
//   console.log("Entering processVoiceflowResponse function")
//   console.log("Input traces:", JSON.stringify(traces, null, 2))

//   let result = ""
//   let buttons: { name: string; payload: string }[] = []

//   try {
//     for (const trace of traces) {
//       console.log("Processing trace:", JSON.stringify(trace, null, 2))
//       if (trace.type === "text") {
//         result += trace.payload.message + "\n"
//       } else if (trace.type === "choice") {
//         result += "\nOptions:\n"
//         for (const button of trace.payload.buttons) {
//           buttons.push({ name: button.name, payload: button.name })
//         }
//       }
//     }
//     result = result.trim()
//     console.log("Processed result:", result)
//   } catch (error) {
//     console.error("Error in processVoiceflowResponse:")
//     if (error instanceof Error) {
//       console.error("Error name:", error.name)
//       console.error("Error message:", error.message)
//       console.error("Error stack:", error.stack)
//     }
//     console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
//     throw error
//   } finally {
//     console.log("Exiting processVoiceflowResponse function")
//   }

//   return { text: result, buttons: buttons.length > 0 ? buttons : undefined }
// }


export function processVoiceflowResponse(traces: VoiceflowResponse[]): { text: string; buttons?: { name: string; payload: string }[] } {
  let result = "";
  let buttons: { name: string; payload: string }[] = [];

  for (const trace of traces) {
    if (trace.type === "text") {
      result += trace.payload.message + "\n";
    } else if (trace.type === "choice") {
      result += "\nSelect one:\n";
      for (const button of trace.payload.buttons) {
        buttons.push({ name: button.name, payload: button.name }); // Use button.name as payload
      }
    }
  }

  console.log("Your Extracted buttons,cashe:", buttons); // Log extracted buttons
  return { text: result.trim(), buttons: buttons.length > 0 ? buttons : undefined };
}


export async function createVoiceflowUser(userId: string): Promise<boolean> {
  console.log("Entering createVoiceflowUser function")
  console.log("User ID:", userId)

  try {
    console.log("Sending request to create Voiceflow user")
    const response = await axios.put(
      "https://api.voiceflow.com/v2/transcripts",
      {
        projectID: PROJECT_ID,
        versionID: VERSION_ID,
        sessionID: userId,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: API_KEY,
        },
      },
    )
    console.log("Voiceflow user creation response status:", response.status)
    console.log("Voiceflow user creation response data:", JSON.stringify(response.data, null, 2))
    return true
  } catch (error) {
    console.error("Error creating Voiceflow user:")
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error("Axios error details:")
      console.error("Request URL:", axiosError.config?.url)
      console.error("Request method:", axiosError.config?.method)
      console.error("Request headers:", JSON.stringify(axiosError.config?.headers, null, 2))
      console.error("Request data:", JSON.stringify(axiosError.config?.data, null, 2))
      console.error("Response status:", axiosError.response?.status)
      console.error("Response data:", JSON.stringify(axiosError.response?.data, null, 2))
    }
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    return false
  } finally {
    console.log("Exiting createVoiceflowUser function")
  }
}

export async function resetVoiceflowUser(userId: string): Promise<boolean> {
  console.log("Entering resetVoiceflowUser function")
  console.log("User ID:", userId)

  try {
    console.log("Sending request to reset Voiceflow user")
    const response = await axios.post(
      `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
      { request: { type: "reset" } },
      {
        headers: {
          Authorization: API_KEY,
          versionID: VERSION_ID,
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    )
    console.log("Voiceflow user reset response status:", response.status)
    console.log("Voiceflow user reset response data:", JSON.stringify(response.data, null, 2))
    return response.status === 200
  } catch (error) {
    console.error("Error resetting Voiceflow user:")
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error("Axios error details:")
      console.error("Request URL:", axiosError.config?.url)
      console.error("Request method:", axiosError.config?.method)
      console.error("Request headers:", JSON.stringify(axiosError.config?.headers, null, 2))
      console.error("Request data:", JSON.stringify(axiosError.config?.data, null, 2))
      console.error("Response status:", axiosError.response?.status)
      console.error("Response data:", JSON.stringify(axiosError.response?.data, null, 2))
    }
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    return false
  } finally {
    console.log("Exiting resetVoiceflowUser function")
  }
}

