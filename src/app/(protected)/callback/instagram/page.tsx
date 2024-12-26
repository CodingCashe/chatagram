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

import { onIntegrate } from '@/actions/integrations';
import React from 'react';

type Props = {
  searchParams: {
    code: string;
  };
};

const Page = async ({ searchParams: { code } }: Props) => {
  if (code) {
    console.log(code);
    const user = await onIntegrate(code.split('#_')[0]);
    if (user.status === 200) {
      return (
        <div>
          <h1>Integration Successful</h1>
          <p>User: {JSON.stringify(user.data)}</p>
          <p>Code: {code}</p>
        </div>
      );
    }
    return (
      <div>
        <h1>Integration Failed</h1>
        <p>Code: {code}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>No Code Provided</h1>
    </div>
  );
};

export default Page;



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


// 'use client'

// import { useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { onIntegrate } from '@/actions/integrations';
// import { exchangeCodeForToken } from '@/actions/exchange/actions'

// export default function InstagramCallback() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     const code = searchParams.get('code')
    
//     if (code) {
//       // If we have a code, exchange it for an access token
//       exchangeCodeForToken(code)
//         .then((result) => {
//           if (result.success) {
//             // Redirect to a success page or dashboard
//             console.log('success')
//           } else {
//             // Handle error
//             console.error('Failed to exchange code for token:')
            
//           }
//         })
//     } else {
//       // If there's no code, redirect to an error page
//       console.log('error2')
//     }
//   }, [searchParams, router])

//   return <div>Processing your Instagram login...</div>
// }

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { exchangeCodeForToken } from '@/actions/exchange/actions'

// export default function InstagramCallback() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const code = searchParams.get('code')
//     const error = searchParams.get('error')
    
//     if (error) {
//       setError(`Instagram authorization error: ${error}`)
//       return
//     }
    
//     if (code) {
//       exchangeCodeForToken(code)
//         .then((result) => {
//           if (result.success) {
//             router.push('/dashboard')
//           } else {
//             setError(result.error || 'Failed to exchange code for token')
//           }
//         })
//         .catch((err) => {
//           setError(`Unexpected error: ${err.message}`)
//         })
//     } else {
//       setError('No authorization code received from Instagram')
//     }
//   }, [searchParams, router])

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="p-8 bg-white rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
//           <p className="text-gray-700">{error}</p>
//           <button
//             onClick={() => router.push('/')}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Processing your Instagram login...</h1>
//         <p className="text-gray-700">Please wait while we complete the authentication process.</p>
//       </div>
//     </div>
//   )
// }

// import { redirect } from 'next/navigation'
// import { onIntegrate } from '@/actions/integrations'

// type Props = {
//   searchParams: {
//     code: string
//   }
// }

// export default async function InstagramCallback({ searchParams: { code } }: Props) {
//   if (!code) {
//     console.error('No authorization code received from Instagram')
//     return redirect('/privacy')
//   }

//   const cleanCode = code.split('#_')[0]
  
//   try {
//     const result = await onIntegrate(cleanCode)
    
//     if (result.status === 200 && result.data) {
//       const { firstname, lastname } = result.data
//       return redirect(`/dashboard/${firstname}${lastname}/integrations`)
//     } else {
//       console.error('Integration failed:', result)
//       return redirect('/error')
//     }
//   } catch (error) {
//     console.error('Error during integration:', error)
//     return redirect('/last')
//   }
// }

