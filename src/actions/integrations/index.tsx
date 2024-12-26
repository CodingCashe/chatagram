// 'use server'

// import { redirect } from 'next/navigation'
// import { onCurrentUser } from '../user'
// import { createIntegration, getIntegration } from './queries'
// import { generateTokens } from '@/lib/fetch'
// import axios from 'axios'

// export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
//   if (strategy === 'INSTAGRAM') {
//     return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
//   }
// }

// export const onIntegrate = async (code: string) => {
//   const user = await onCurrentUser()

//   try {
//     const integration = await getIntegration(user.id)

//     if (integration && integration.integrations.length < 5) {
//       const token = await generateTokens(code)
//       console.log('Token:', {token})

//       if (token) {
//         const insta_id = await axios.get(
//           `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
//         )

//         const today = new Date()
//         const expire_date = today.setDate(today.getDate() + 60)
//         const create = await createIntegration(
//           user.id,
//           token.access_token,
//           new Date(expire_date),
//           insta_id.data.user_id
//         )
//         return { status: 200, data: create }
//       }
//       console.log('🔴 401')
//       return { status: 401 }
//     }
//     console.log('🔴 404')
//     return { status: 404 }
//   } catch (error) {
//     console.log('🔴 500', error)
//     return { status: 500 }
//   }
// }


// 'use server'

// import { redirect } from 'next/navigation'
// import { onCurrentUser } from '../user'
// import { createIntegration, getIntegration } from './queries'
// import { generateTokens } from '@/lib/fetch'
// import axios from 'axios'

// export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
//   if (strategy === 'INSTAGRAM') {
//     return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
//   }
// }

// export const onIntegrate = async (code: string) => {
//   const user = await onCurrentUser();

//   if (!user) {
//     return {
//       status: 401,
//       content: (
//         <div>
//           <h1>Integration Failed</h1>
//           <p>User not authenticated.</p>
//         </div>
//       ),
//     };
//   }

//   try {
//     const integration = await getIntegration(user.id);

//     if (integration && integration.integrations.length >= 5) {
//       return {
//         status: 404,
//         content: (
//           <div>
//             <h1>Integration Limit Reached</h1>
//             <p>You have already integrated the maximum number of accounts.</p>
//           </div>
//         ),
//       };
//     }

//     const token = await generateTokens(code);

//     if (!token) {
//       return {
//         status: 401,
//         content: (
//           <div>
//             <h1>Token Generation Failed</h1>
//             <p>Could not generate a token with the provided code.</p>
//           </div>
//         ),
//       };
//     }

//     const insta_id = await axios.get(
//       `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
//     );

//     if (!insta_id.data.user_id) {
//       return {
//         status: 401,
//         content: (
//           <div>
//             <h1>Instagram ID Retrieval Failed</h1>
//             <p>Could not retrieve Instagram user ID with the token.</p>
//           </div>
//         ),
//       };
//     }

//     const today = new Date();
//     const expire_date = today.setDate(today.getDate() + 60);

//     const create = await createIntegration(
//       user.id,
//       token.access_token,
//       new Date(expire_date),
//       insta_id.data.user_id
//     );

//     return {
//       status: 200,
//       content: (
//         <div>
//           <h1>Integration Successful</h1>
//           <p>Integration Data: {JSON.stringify(create)}</p>
//         </div>
//       ),
//       data: create,
//     };
//   } catch (error: any) {
//     return {
//       status: 500,
//       content: (
//         <div>
//           <h1>Integration Failed</h1>
//           <p>Error: {error.message}</p>
//         </div>
//       ),
//     };
//   }
// };



'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, getIntegration } from './queries'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
  if (strategy === 'INSTAGRAM') {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
}


export const onIntegrate = async (code: string) => {
  console.log("Starting integration process...");

  const user = await onCurrentUser();

  if (!user) {
    console.warn("User not authenticated.");
    return {
      status: 401,
      content: (
        <div>
          <h1>Integration Failed</h1>
          <p>User not authenticated.</p>
        </div>
      ),
    };
  }

  try {
    // Step 1: Check integration limit
    console.log("Fetching existing integrations for user ID:", user.id);
    const integration = await getIntegration(user.id);

    if (integration && integration.integrations.length >= 5) {
      console.warn("User has reached the integration limit.");
      return {
        status: 404,
        content: (
          <div>
            <h1>Integration Limit Reached</h1>
            <p>You have already integrated the maximum number of accounts.</p>
          </div>
        ),
      };
    }
    console.log("Integration limit check passed.");

    // Step 2: Generate tokens
    console.log("Generating tokens with code:", code);
    const token = await generateTokens(code);

    if (!token) {
      console.error("Token generation failed.");
      return {
        status: 401,
        content: (
          <div>
            <h1>Token Generation Failed</h1>
            <p>Could not generate a token with the provided code.</p>
          </div>
        ),
      };
    }
    console.log("Token generated successfully:", token);

    // Step 3: Retrieve Instagram user ID
    console.log("Retrieving Instagram user ID using token...");
    const insta_id = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
    );

    if (!insta_id.data.user_id) {
      console.error("Instagram ID retrieval failed.");
      return {
        status: 401,
        content: (
          <div>
            <h1>Instagram ID Retrieval Failed</h1>
            <p>Could not retrieve Instagram user ID with the token.</p>
          </div>
        ),
      };
    }
    console.log("Instagram user ID retrieved:", insta_id.data.user_id);

    // Step 4: Create integration
    console.log("Creating integration for user ID:", user.id);
    const today = new Date();
    const expire_date = today.setDate(today.getDate() + 60);

    const create = await createIntegration(
      user.id,
      token.access_token,
      new Date(expire_date),
      insta_id.data.user_id
    );

    console.log("Integration created successfully:", create);

    // Success response
    return {
      status: 200,
      content: (
        <div>
          <h1>Integration Successful</h1>
          <p>Integration Data: {JSON.stringify(create)}</p>
        </div>
      ),
      data: create,
    };
  } catch (error: any) {
    console.error("Integration process failed:", error);

    return {
      status: 500,
      content: (
        <div>
          <h1>Integration Failed</h1>
          <p>Error: {error.message}</p>
          <pre>{error.stack}</pre> {/* Optional for development */}
        </div>
      ),
    };
  }
};



// 'use server'

// import { redirect } from 'next/navigation'
// import { cookies } from 'next/headers'
// import { createIntegration, getIntegration } from './queries'
// import { generateTokens} from '@/lib/fetch'
// import { onCurrentUser } from '../user'
// import axios from 'axios'

// export async function onOAuthInstagram() {
//   redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
// }

// export async function onIntegrate(code: string) {
//   const userId = cookies().get('userId')?.value
//   if (!userId) {
//     console.error('User not authenticated')
//     return { status: 401, error: 'User not authenticated' }
//   }

//   try {
//     const existingIntegration = await getIntegration(userId)
//     const user = await  onCurrentUser ()

//     if (existingIntegration) {
//       console.log('🔴 404: Integration already exists')
//       return { status: 404, error: 'Integration already exists' }
//     }

    

//     const token = await generateTokens(code)
//     if (!token) {
//       console.log('🔴 401: Token generation failed')
//       return { status: 401, error: 'Token generation failed' }
//     }

//     if (token) {
//       const insta_id = await axios.get(
//         `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
//       )
//       const expireDate = new Date()
//       expireDate.setDate(expireDate.getDate() + 60)
      
//       const create = await createIntegration(
//           user.id,
//           token.access_token,
//           expireDate,
//           insta_id.data.user_id
//       )
      
//       return { status: 200, data: create }
//       }
    

    
//   } catch (error) {
//     console.error('🔴 500', error)
//     return { status: 500, error: 'Internal server error' }
//   }
// }

