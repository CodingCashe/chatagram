// import { onIntegrate } from '@/actions/integrations'
// import { redirect } from 'next/navigation'
// import React from 'react'

// type Props = {
//   searchParams: {
//     code: string
//   }
// }

// const Page = async ({ searchParams: { code } }: Props) => {
//   if (code) {
//     console.log(code)
//     const user = await onIntegrate(code.split('#_')[0])
//     if (user.status === 200) {
//       return redirect(
//         `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`
//       )
//     }
//   }
//   return redirect('/sign-up')
// }

// export default Page


// import { onIntegrate } from '@/actions/integrations';
// import { redirect } from 'next/navigation';
// import React from 'react';

// type Props = {
//   searchParams: {
//     code: string;
//   };
// };

// const Page = async ({ searchParams: { code } }: Props) => {
//   try {
//     // Log the received search parameter
//     console.log('Received searchParams:', { code });

//     if (!code) {
//       console.error('Error: No code parameter received.');
//       return redirect('/sign-in');
//     }

//     // Clean the code if it contains additional fragments
//     const cleanedCode = code.split('#_')[0];
//     console.log('Cleaned code:', cleanedCode);

//     // Attempt to integrate the user
//     const user = await onIntegrate(cleanedCode);
//     console.log('Integration response:', user);

//     // Check if the integration was successful
//     if (user.status === 200) {
//       const redirectPath = `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`;
//       console.log('Redirecting to:', redirectPath);
//       return redirect(redirectPath);
//     } else {
//       console.error('Integration failed with status:', user.status, 'Response:', user);
//     }
//   } catch (error) {
//     console.error('Error during integration process:', error);
//   }

//   // Redirect to sign-up if any issues occur
//   console.warn('Redirecting to /sign-up due to an error or invalid response.');
//   return redirect('/privacy');
// };

// export default Page;


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { onIntegrate } from '@/actions/integrations';
import { generateTokens } from '@/lib/fetch';

const InstagramCallbackPage: React.FC = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string>('Processing your Instagram integration...');

  useEffect(() => {
    const processIntegration = async () => {
      // Extract the code from the URL query parameters
      const { code } = router.query;

      if (!code) {
        console.error('🔴 Error: No code received from Instagram.');
        setStatusMessage('Error: No code received from Instagram.');
        return;
      }

      try {
        // Step 1: Clean the code in case there are fragments after '#_'
        const cleanedCode = Array.isArray(code) ? code[0].split('#_')[0] : code.split('#_')[0];
        console.log('🟢 Cleaned code:', cleanedCode);

        // Step 2: Generate tokens using the cleaned code
        const tokenResponse = await generateTokens(cleanedCode);
        if (!tokenResponse || !tokenResponse.access_token) {
          console.error('🔴 Error: Failed to retrieve Instagram token.');
          setStatusMessage('Error: Failed to retrieve Instagram token.');
          return;
        }
        console.log('🟢 Token Response:', tokenResponse);

        // Step 3: Fetch Instagram user data using the access token
        const instaResponse = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=id&access_token=${tokenResponse.access_token}`
        );

        if (!instaResponse.data || !instaResponse.data.id) {
          console.error('🔴 Error: Failed to fetch Instagram user data.');
          setStatusMessage('Error: Failed to retrieve Instagram user data.');
          return;
        }
        console.log('🟢 Instagram User Data:', instaResponse.data);

        // Step 4: Integrate the user using the onIntegrate function
        const integrationResponse = await onIntegrate(cleanedCode);
        console.log('🟢 User Integration Response:', integrationResponse);

        if (integrationResponse?.status === 200) {
          setStatusMessage('Integration successful! You can now use Instagram features.');
          router.push('/dashboard'); // Redirect to the desired page after successful integration
        } else {
          console.error('🔴 Error: Integration failed with status:', integrationResponse?.status);
          setStatusMessage('Integration failed. Please try again later.');
        }
      } catch (error) {
        console.error('🔴 Error during Instagram callback processing:', error);
        setStatusMessage('Error: Something went wrong during integration.');
      }
    };

    if (router.isReady) {
      processIntegration();
    }
  }, [router]);

  return <div>{statusMessage}</div>;
};

export default InstagramCallbackPage;
