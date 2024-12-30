import { onIntegrate } from '@/actions/integrations'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    code: string
  }
}

const Page = async ({ searchParams: { code } }: Props) => {
  if (code) {
    console.log(code)
    const user = await onIntegrate(code.split('#_')[0])
    if (user.status === 200) {
      return redirect(
        `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`
      )
    }
  }
  return redirect('/sign-up')
}

export default Page



// // import { onIntegrate } from '@/actions/integrations';
// // import React from 'react';

// // type Props = {
// //   searchParams: {
// //     code: string;
// //   };
// // };


// import { onIntegrate } from '@/actions/integrations';
// import React from 'react';

// type Props = {
//   searchParams: {
//     code: string;
//   };
// };

// const Page = async ({ searchParams: { code } }: Props) => {
//   if (code) {
//     console.log(code);
//     const result = await onIntegrate(code.split('#_')[0]);
//     return (
//       <div>
//         <h1>Integration Result</h1>
//         {result.content}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>No Code Provided</h1>
//     </div>
//   );
// };

// export default Page;