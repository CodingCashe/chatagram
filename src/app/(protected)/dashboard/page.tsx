import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import {onUserInfo} from '@/actions/user'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const user = await onBoardUser()
  const businessInfo = await onUserInfo()
  if (user.status === 200 || user.status === 201) {
    return redirect(`dashboard/${user.data?.firstname}-${user.data?.lastname}`)
    // return redirect(`/onboarding`)
  }

  return redirect('/sign-in')
}

export default Page

// import { onBoardUser } from "@/actions/user"
// import { client } from "@/lib/prisma"
// import { onCurrentUser } from "@/actions/user"
// import { redirect } from "next/navigation"

// type Props = {}

// const Page = async (props: Props) => {
//   try {
//     // Get the current user from Clerk
//     const clerkUser = await onCurrentUser()

//     // If no user is signed in, redirect to sign-in

//     //commented out
//     // if (!clerkUser) {
//     //   return redirect("/sign-in")
//     // }

//     // Check if user is an admin directly from the database
//     const dbUser = await client.user.findUnique({
//       where: {
//         clerkId: clerkUser.id,
//       },
//       select: {
//         id: true,
//         isAdmin: true,
//         firstname: true,
//         lastname: true,
//       },
//     })

//     // If user exists in our database
//     if (dbUser) {
//       // Check if user is an admin
//       if (dbUser.isAdmin) {
//         // Redirect admin users to the admin dashboard
//         return redirect("/admin")
//       }

//       // // Redirect regular users to their dashboard
//       // return redirect(`/dashboard/${dbUser.firstname}-${dbUser.lastname}`)
//     }

//     // If user is authenticated with Clerk but not in our database yet,
//     // proceed with onboarding
//     const user = await onBoardUser()

//     if (user.status === 200 || user.status === 201) {
//       return redirect(`/dashboard/${user.data?.firstname}-${user.data?.lastname}`)
//     }

//     // If onboarding failed, redirect to sign-in
//     return redirect("/sign-in")
//   } catch (error) {
//     console.error("Error in root page:", error)
//     return redirect("/sign-in")
//   }
// }

// export default Page

