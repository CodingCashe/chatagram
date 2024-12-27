'use server'
import axios from 'axios' //axioss

import { InstagramShortLivedToken, InstagramLongLivedToken, EnvironmentVariables } from '@/types/instagram';


export const refreshToken = async (token: string) => {
  const refresh_token = await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  )

  return refresh_token.data
}

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('sending message')
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
  )
}

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('sending message')
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
  )
}





// export const generateTokens = async (code: string) => {
//   const insta_form = new FormData()
//   insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)

//   insta_form.append(
//     'client_secret',
//     process.env.INSTAGRAM_CLIENT_SECRET as string
//   )
//   insta_form.append('grant_type', 'authorization_code')
//   insta_form.append(
//     'redirect_uri',
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
//   )
//   insta_form.append('code', code)

//   const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//     method: 'POST',
//     body: insta_form,
//   })

//   const token = await shortTokenRes.json()
//   if (token.permissions.length > 0) {
//     console.log(token, 'got permissions')
//     const long_token = await axios.get(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
//     )

//     return long_token.data
//   }
// }






// import { redirect } from 'next/navigation'

// export const generateTokens = async (code: string) => {
//   const clientId = process.env.INSTAGRAM_CLIENT_ID
//   const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET
//   const redirectUri = `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
//   const tokenUrl = process.env.INSTAGRAM_TOKEN_URL
//   const baseUrl = process.env.INSTAGRAM_BASE_URL

//   if (!clientId || !clientSecret || !redirectUri || !tokenUrl || !baseUrl) {
//     throw new Error('Missing Instagram credentials in environment variables')
//   }

//   try {
//     // Step 1: Exchange code for short-lived access token
//     const shortTokenRes = await fetch(tokenUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         client_id: clientId,
//         client_secret: clientSecret,
//         grant_type: 'authorization_code',
//         redirect_uri: redirectUri,
//         code: code,
//       }),
//     })

//     if (!shortTokenRes.ok) {
//       throw new Error(`HTTP error! status: ${shortTokenRes.status}`)
//     }

//     const shortToken = await shortTokenRes.json()

//     if (!shortToken.access_token) {
//       throw new Error('Failed to obtain short-lived access token')
//     }

//     // Step 2: Exchange short-lived token for long-lived token
//     const longTokenRes = await fetch(
//       `${baseUrl}/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortToken.access_token}`,
//       { method: 'GET' }
//     )

//     if (!longTokenRes.ok) {
//       throw new Error(`HTTP error! status: ${longTokenRes.status}`)
//     }

//     const longToken = await longTokenRes.json()

//     if (!longToken.access_token) {
//       throw new Error('Failed to obtain long-lived access token')
//     }

//     return {
//       accessToken: longToken.access_token,
//       tokenType: longToken.token_type,
//       expiresIn: longToken.expires_in,
//     }
//   } catch (error) {
//     console.error('Error generating Instagram token:', error)
//     throw error
//   }
// }




// const env = process.env as unknown as EnvironmentVariables;

// const validateEnvironmentVariables = (): void => {
//   const requiredVars: (keyof EnvironmentVariables)[] = [
//     'INSTAGRAM_CLIENT_ID',
//     'INSTAGRAM_CLIENT_SECRET',
//     'NEXT_PUBLIC_HOST_URL',
//     'INSTAGRAM_TOKEN_URL',
//     'INSTAGRAM_BASE_URL'
//   ];

//   for (const varName of requiredVars) {
//     if (!env[varName]) {
//       throw new Error(`Missing environment variable: ${varName}`);
//     }
//   }
// };

// export const generateTokens = async (code: string): Promise<InstagramLongLivedToken> => {
//   try {
//     validateEnvironmentVariables();

//     const insta_form = new URLSearchParams({
//       client_id: env.INSTAGRAM_CLIENT_ID,
//       client_secret: env.INSTAGRAM_CLIENT_SECRET,
//       grant_type: 'authorization_code',
//       redirect_uri: `${env.NEXT_PUBLIC_HOST_URL}/callback/instagram`,
//       code: code
//     });

//     const shortTokenRes = await fetch(env.INSTAGRAM_TOKEN_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: insta_form
//     });

//     if (!shortTokenRes.ok) {
//       throw new Error(`Failed to fetch short-lived token: ${shortTokenRes.statusText}`);
//     }

//     const token: InstagramShortLivedToken = await shortTokenRes.json();

//     if (!token.access_token) {
//       throw new Error('Invalid token response: missing access_token');
//     }

//     const longTokenUrl = new URL(`${env.INSTAGRAM_BASE_URL}/access_token`);
//     longTokenUrl.searchParams.append('grant_type', 'ig_exchange_token');
//     longTokenUrl.searchParams.append('client_secret', env.INSTAGRAM_CLIENT_SECRET);
//     longTokenUrl.searchParams.append('access_token', token.access_token);

//     const longTokenRes = await fetch(longTokenUrl.toString());

//     if (!longTokenRes.ok) {
//       throw new Error(`Failed to fetch long-lived token: ${longTokenRes.statusText}`);
//     }

//     const longToken: InstagramLongLivedToken = await longTokenRes.json();

//     if (!longToken.access_token) {
//       throw new Error('Invalid long-lived token response: missing access_token');
//     }

//     return longToken;
//   } catch (error) {
//     console.error('Error in generateTokens:', error);
//     throw error;
//   }
// };




// const env = process.env as unknown as EnvironmentVariables;

// const validateEnvironmentVariables = (): void => {
//   const requiredVars: (keyof EnvironmentVariables)[] = [
//     'INSTAGRAM_CLIENT_ID',
//     'INSTAGRAM_CLIENT_SECRET',
//     'NEXT_PUBLIC_HOST_URL',
//     'INSTAGRAM_TOKEN_URL',
//     'INSTAGRAM_BASE_URL'
//   ];

//   for (const varName of requiredVars) {
//     if (!env[varName]) {
//       throw new Error(`Missing environment variable: ${varName}`);
//     }
//   }
// };

// export const generateTokens = async (code: string): Promise<InstagramLongLivedToken> => {
//   try {
//     validateEnvironmentVariables();

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

//     const longTokenUrl = new URL(`${env.INSTAGRAM_BASE_URL}/access_token`);
//     longTokenUrl.searchParams.append('grant_type', 'ig_exchange_token');
//     longTokenUrl.searchParams.append('client_secret', env.INSTAGRAM_CLIENT_SECRET);
//     longTokenUrl.searchParams.append('access_token', token.access_token);

//     console.log('Fetching long-lived token with URL:', longTokenUrl.toString());

//     const longTokenRes = await fetch(longTokenUrl.toString());

//     if (!longTokenRes.ok) {
//       const errorText = await longTokenRes.text();
//       throw new Error(`Failed to fetch long-lived token: ${longTokenRes.statusText}. Error: ${errorText}`);
//     }

//     const longToken: InstagramLongLivedToken = await longTokenRes.json();
//     console.log('Received long-lived token:', JSON.stringify(longToken, null, 2));

//     if (!longToken.access_token) {
//       throw new Error('Invalid long-lived token response: missing access_token');
//     }

//     return longToken;
//   } catch (error) {
//     console.error('Error in generateTokens:', error);
//     throw error;
//   }
// };



const env = process.env as unknown as EnvironmentVariables;

const validateEnvironmentVariables = (): void => {
  const requiredVars: (keyof EnvironmentVariables)[] = [
    'INSTAGRAM_CLIENT_ID',
    'INSTAGRAM_CLIENT_SECRET',
    'NEXT_PUBLIC_HOST_URL',
    'INSTAGRAM_TOKEN_URL',
    'INSTAGRAM_BASE_URL'
  ];

  for (const varName of requiredVars) {
    if (!env[varName]) {
      throw new Error(`Missing environment variable: ${varName}`);
    }
  }
};

export const generateTokens = async (code: string): Promise<InstagramLongLivedToken> => {
  try {
    validateEnvironmentVariables();

    // Fetch short-lived token
    const insta_form = new URLSearchParams({
      client_id: env.INSTAGRAM_CLIENT_ID,
      client_secret: env.INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: `${env.NEXT_PUBLIC_HOST_URL}/callback/instagram`,
      code: code
    });

    console.log('Fetching short-lived token with params:', insta_form.toString());

    const shortTokenRes = await fetch(env.INSTAGRAM_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: insta_form
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

    // Fetch long-lived token
    const longTokenUrl = `https://graph.instagram.com/access_token?` +
      new URLSearchParams({
        grant_type: 'ig_exchange_token',
        client_secret: env.INSTAGRAM_CLIENT_SECRET,
        access_token: token.access_token
      }).toString();

    console.log('Fetching long-lived token from URL:', longTokenUrl);

    const longTokenRes = await fetch(longTokenUrl, { method: 'GET' });

    if (!longTokenRes.ok) {
      const errorText = await longTokenRes.text();
      throw new Error(`Failed to fetch long-lived token: ${longTokenRes.statusText}. Error: ${errorText}`);
    }

    const longToken: InstagramLongLivedToken = await longTokenRes.json();
    console.log('Received long-lived token:', JSON.stringify(longToken, null, 2));

    if (!longToken.access_token) {
      throw new Error('Invalid long-lived token response: missing access_token');
    }

    return longToken;
  } catch (error) {
    console.error('Error in generateTokens:', error);
    throw error;
  }
};


// export const generateTokens = async (code: string): Promise<InstagramLongLivedToken> => {
//   try {
//     validateEnvironmentVariables();

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

//     const longTokenUrl = new URL(`${env.INSTAGRAM_BASE_URL}/access_token`);
//     longTokenUrl.search = new URLSearchParams({
//       grant_type: 'ig_exchange_token',
//       client_secret: env.INSTAGRAM_CLIENT_SECRET,
//       access_token: token.access_token
//     }).toString();

//     console.log('Fetching long-lived token with URL:', longTokenUrl.toString());

//     const longTokenRes = await fetch(longTokenUrl.toString(), { method: 'GET' });

//     if (!longTokenRes.ok) {
//       const errorText = await longTokenRes.text();
//       throw new Error(`Failed to fetch long-lived token: ${longTokenRes.statusText}. Error: ${errorText}`);
//     }


//     if (!longTokenRes.ok) {
//       const errorText = await longTokenRes.text();
//       throw new Error(`Failed to fetch long-lived token: ${longTokenRes.statusText}. Error: ${errorText}`);
//     }

//     const longToken: InstagramLongLivedToken = await longTokenRes.json();
//     console.log('Received long-lived token:', JSON.stringify(longToken, null, 2));

//     if (!longToken.access_token) {
//       throw new Error('Invalid long-lived token response: missing access_token');
//     }

//     return longToken;
//   } catch (error) {
//     console.error('Error in generateTokens:', error);
//     throw error;
//   }
// };







// export const generateTokens = async (code: string) => {
//   try {
//     // Step 1: Prepare FormData for the short-lived token request
//     console.log('Preparing form data for short-lived token request...');
//     const insta_form = new FormData();
//     insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string);
//     insta_form.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET as string);
//     insta_form.append('grant_type', 'authorization_code');
//     insta_form.append(
//       'redirect_uri',
//       `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
//     );
//     insta_form.append('code', code);

//     // Step 2: Make the POST request to get a short-lived access token
//     console.log('Requesting short-lived token...');
//     const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//       method: 'POST',
//       body: insta_form,
//     });

//     // Validate response
//     if (!shortTokenRes.ok) {
//       const errorResponse = await shortTokenRes.json();
//       throw new Error(
//         `Failed to fetch short-lived token. Status: ${shortTokenRes.status}. Error: ${JSON.stringify(errorResponse)}`
//       );
//     }

//     const token = await shortTokenRes.json();
//     console.log('Short-lived token response:', token);

//     // Step 3: Validate permissions
//     if (!token.permissions || token.permissions.length === 0) {
//       throw new Error('Permissions are missing in the short-lived token response.');
//     }

//     // Step 4: Exchange short-lived token for a long-lived token
//     console.log('Requesting long-lived token...');
//     const longTokenRes = await axios.get(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token`,
//       {
//         params: {
//           grant_type: 'ig_exchange_token',
//           client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
//           access_token: token.access_token,
//         },
//       }
//     );

//     console.log('Long-lived token response:', longTokenRes.data);
//     return longTokenRes.data;
//   } catch (error: any) {
//     console.error('Error generating tokens:', error.message);
//     throw new Error(`Token generation error: ${error.message}`);
//   }
// };





// //USING FETCH

// export const generateTokens = async (code: string) => {
//   const insta_form = new FormData();
//   insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string);
//   insta_form.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET as string);
//   insta_form.append('grant_type', 'authorization_code');
//   insta_form.append('redirect_uri', `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`);
//   insta_form.append('code', code);

//   // Fetch short-lived token
//   const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//     method: 'POST',
//     body: insta_form,
//   });

//   if (!shortTokenRes.ok) {
//     console.error(`Failed to fetch short-lived token: ${shortTokenRes.status}`);
//     throw new Error(`Error fetching short-lived token: ${shortTokenRes.status}`);
//   }

//   const token = await shortTokenRes.json();

//   if (token.permissions?.length > 0) {
//     console.log(token, 'got permissions');

//     // Fetch long-lived token
//     const longTokenRes = await fetch(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
//     );

//     if (!longTokenRes.ok) {
//       console.error(`Failed to fetch long-lived token: ${longTokenRes.status}`);
//       throw new Error(`Error fetching long-lived token: ${longTokenRes.status}`);
//     }

//     const long_token = await longTokenRes.json();
//     return long_token;
//   }

//   console.error('No permissions found in token');
//   throw new Error('No permissions found in token');
// };




// export async function generateTokens(code: string) {
//   try {
//     const shortTokenRes = await axios.post(
//       process.env.INSTAGRAM_TOKEN_URL as string,
//       {
//         client_id: process.env.INSTAGRAM_CLIENT_ID,
//         client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
//         grant_type: 'authorization_code',
//         redirect_uri: `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`,
//         code: code,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     )

//     if (!shortTokenRes.data.access_token) {
//       console.error('Failed to obtain short-lived token:', shortTokenRes.data)
//       return null
//     }

//     const longTokenRes = await axios.get(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token`,
//       {
//         params: {
//           grant_type: 'ig_exchange_token',
//           client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
//           access_token: shortTokenRes.data.access_token,
//         },
//       }
//     )

//     return longTokenRes.data
//   } catch (error) {
//     console.error('Error generating tokens:', error)
//     return null
//   }
// }