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
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  searchParams: {
    code: string;
  };
};

const Page = async ({ searchParams: { code } }: Props) => {
  try {
    // Log the received search parameter
    console.log('Received searchParams:', { code });

    if (!code) {
      console.error('Error: No code parameter received.');
      return redirect('/sign-in');
    }

    // Clean the code if it contains additional fragments
    const cleanedCode = code.split('#_')[0];
    console.log('Cleaned code:', cleanedCode);

    // Attempt to integrate the user
    const user = await onIntegrate(cleanedCode);
    console.log('Integration response:', user);

    // Check if the integration was successful
    if (user.status === 200) {
      const redirectPath = `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`;
      console.log('Redirecting to:', redirectPath);
      return redirect(redirectPath);
    } else {
      console.error('Integration failed with status:', user.status, 'Response:', user);
    }
  } catch (error) {
    console.error('Error during integration process:', error);
  }

  // Redirect to sign-up if any issues occur
  console.warn('Redirecting to /sign-up due to an error or invalid response.');
  return redirect('/privacy');
};

export default Page;


