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

const VOICEFLOW_API_URL = 'https://general-runtime.voiceflow.com';

interface VoiceflowResponse {
  trace: Array<{
    type: string;
    payload: any;
  }>;
}

export async function getVoiceflowResponse(message: string, userId: string): Promise<VoiceflowResponse> {
  try {
    const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}/interact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VOICEFLOW_API_KEY}`,
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
        versionID: process.env.VOICEFLOW_VERSION_ID,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: VoiceflowResponse = await response.json();
    console.log('Voiceflow raw response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error getting Voiceflow response:', error);
    throw error;
  }
}

export function processVoiceflowResponse(response: VoiceflowResponse): string {
  let processedResponse = '';

  if (!response.trace || !Array.isArray(response.trace)) {
    console.warn('Invalid Voiceflow response structure:', response);
    return 'Sorry, I couldn0t process the response. Please try again.';
  }

  for (const trace of response.trace) {
    switch (trace.type) {
      case 'speak':
      case 'text':
        processedResponse += trace.payload.message + '\n';
        break;
      case 'visual':
        processedResponse += `[Image: ${trace.payload.image}]\n`;
        break;
      case 'choice':
        processedResponse += 'Options:\n';
        for (const choice of trace.payload.buttons) {
          processedResponse += `- ${choice.name}\n`;
        }
        break;
      default:
        console.warn(`Unhandled trace type: ${trace.type}`);
    }
  }

  const trimmedResponse = processedResponse.trim();
  console.log('Processed Voiceflow response:', trimmedResponse);
  return trimmedResponse || 'Sorry, I couldnoot generate a response. Please try again.';
}

export async function createVoiceflowUser(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${VOICEFLOW_API_URL}/state/user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VOICEFLOW_API_KEY}`,
      },
      body: JSON.stringify({
        versionID: process.env.VOICEFLOW_VERSION_ID,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Voiceflow user created successfully: ${userId}`);
    return true;
  } catch (error) {
    console.error('Error creating Voiceflow user:', error);
    throw error;
  }
}

