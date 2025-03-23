// import { onBoardUser } from '@/actions/user'
// import { redirect } from 'next/navigation'
// import React from 'react'

// type Props = {}

// const Page = async (props: Props) => {
//   const user = await onBoardUser()
//   if (user.status === 200 || user.status === 201) {
//     return redirect(`dashboard/${user.data?.firstname}-${user.data?.lastname}`)
//   }

//   return redirect('/sign-in')
// }

// export default Page

import { onBoardUser } from "@/actions/user"
import { checkIsAdmin } from "../admin/actions"
import { redirect } from "next/navigation"

type Props = {}

const Page = async (props: Props) => {
  const user = await onBoardUser()

  // If user is authenticated
  if (user.status === 200 || user.status === 201) {
    // Check if user is an admin
    const isAdmin = await checkIsAdmin()

    if (isAdmin) {
      // Redirect admin users to the admin dashboard
      return redirect("/admin")
    }

    // Redirect regular users to their dashboard
    return redirect(`dashboard/${user.data?.firstname}-${user.data?.lastname}`)
  }

  // Redirect unauthenticated users to sign-in
  return redirect("/sign-in")
}

export default Page

