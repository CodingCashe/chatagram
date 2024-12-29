// 'use server'
// import axios from 'axios' //axioss

// import { InstagramShortLivedToken, InstagramLongLivedToken, EnvironmentVariables } from '@/types/instagram';


// export const refreshToken = async (token: string) => {
//   const refresh_token = await axios.get(
//     `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
//   )

//   return refresh_token.data
// }

// export const sendDM = async (
//   userId: string,
//   recieverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending message')
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
//     {
//       recipient: {
//         id: recieverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// export const sendPrivateMessage = async (
//   userId: string,
//   recieverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending message')
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
//     {
//       recipient: {
//         comment_id: recieverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }


// //THIS ONE ONLY USES THE SHORT LIVED TOKEN

// const env = process.env as unknown as EnvironmentVariables;

// const validateEnvironmentVariables = (): void => {
//   const requiredVars: (keyof EnvironmentVariables)[] = [
//     'INSTAGRAM_CLIENT_ID',
//     'INSTAGRAM_CLIENT_SECRET',
//     'NEXT_PUBLIC_HOST_URL',
//     'INSTAGRAM_TOKEN_URL'
//   ];

//   for (const varName of requiredVars) {
//     if (!env[varName]) {
//       throw new Error(`Missing environment variable: ${varName}`);
//     }
//   }
// };

// export const generateTokens = async (code: string): Promise<InstagramShortLivedToken> => {
//   try {
//     validateEnvironmentVariables();

//     // Fetch short-lived token
//     const insta_form = new URLSearchParams({
//       client_id: env.INSTAGRAM_CLIENT_ID,
//       client_secret: env.INSTAGRAM_CLIENT_SECRET,
//       grant_type: 'authorization_code',
//       redirect_uri: `${env.NEXT_PUBLIC_HOST_URL}/callback/instagram`,
//       code: code
//     });

//     console.log('Fetching short-lived token with params:', insta_form.toString());

//     const shortTokenRes = await fetch(env.INSTAGRAM_TOKEN_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: insta_form
//     });

//     if (!shortTokenRes.ok) {
//       const errorText = await shortTokenRes.text();
//       throw new Error(`Failed to fetch short-lived token: ${shortTokenRes.statusText}. Error: ${errorText}`);
//     }

//     const token: InstagramShortLivedToken = await shortTokenRes.json();
//     console.log('Received short-lived token:', JSON.stringify(token, null, 2));

//     if (!token.access_token) {
//       throw new Error('Invalid token response: missing access_token');
//     }

//     return token;
//   } catch (error) {
//     console.error('Error in generateTokens:', error);
//     throw error;
//   }
// };


'use server'
import axios from 'axios' //axioss

import { InstagramShortLivedToken, InstagramLongLivedToken, EnvironmentVariables } from '@/types/instagram';

// Updated refreshToken function
export const refreshToken = async (token: string) => {
  try {
    console.log("Short-lived tokens cannot be refreshed. Ensure you handle expiration by obtaining a new token.");
    return { access_token: token };

    // Uncomment below if using long-lived tokens in the future
    /*
    const refresh_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    );

    return refresh_token.data;
    */
  } catch (error) {
    console.error("Error while attempting to refresh token:", error);
    throw new Error("Failed to refresh token");
  }
};

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('sending message');
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    {
      recipient: {
        id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('sending message');
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    {
      recipient: {
        comment_id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

// THIS ONE ONLY USES THE SHORT-LIVED TOKEN

const env = process.env as unknown as EnvironmentVariables;

const validateEnvironmentVariables = (): void => {
  const requiredVars: (keyof EnvironmentVariables)[] = [
    'INSTAGRAM_CLIENT_ID',
    'INSTAGRAM_CLIENT_SECRET',
    'NEXT_PUBLIC_HOST_URL',
    'INSTAGRAM_TOKEN_URL',
  ];

  for (const varName of requiredVars) {
    if (!env[varName]) {
      throw new Error(`Missing environment variable: ${varName}`);
    }
  }
};

export const generateTokens = async (code: string): Promise<InstagramShortLivedToken> => {
  try {
    validateEnvironmentVariables();

    // Fetch short-lived token
    const insta_form = new URLSearchParams({
      client_id: env.INSTAGRAM_CLIENT_ID,
      client_secret: env.INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: `${env.NEXT_PUBLIC_HOST_URL}/callback/instagram`,
      code: code,
    });

    console.log('Fetching short-lived token with params:', insta_form.toString());

    const shortTokenRes = await fetch(env.INSTAGRAM_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: insta_form,
    });

    if (!shortTokenRes.ok) {
      const errorText = await shortTokenRes.text();
      throw new Error(`Failed to fetch short-lived token: ${shortTokenRes.statusText}. Error: ${errorText}`);
    }

    const token: InstagramShortLivedToken = await shortTokenRes.json();
    console.log('Received short-lived token:', JSON.stringify(token, null, 2));

    if (!token.access_token) {
      throw new Error('Invalid token response: missing access_token');
    }

    return token;
  } catch (error) {
    console.error('Error in generateTokens:', error);
    throw error;
  }
};
