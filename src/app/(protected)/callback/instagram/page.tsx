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

const Page = () => {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return; // Wait until the router is ready

    try {
      // Extract the "code" query parameter from the URL
      const { code } = router.query;

      if (!code) {
        setError('No code parameter found in the URL.');
        return;
      }

      // Clean the code (in case of fragments like '#_')
      const cleanedCode = Array.isArray(code) ? code[0].split('#_')[0] : code.split('#_')[0];
      setCode(cleanedCode);
    } catch (err) {
      setError('An error occurred while extracting the code.');
      console.error('Error extracting code:', err);
    }
  }, [router]);

  return (
    <div>
      <h1>Instagram Callback Debugging</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : code ? (
        <p style={{ color: 'green' }}>Code successfully extracted: {code}</p>
      ) : (
        <p>Waiting for the code...</p>
      )}
    </div>
  );
};

export default Page;
