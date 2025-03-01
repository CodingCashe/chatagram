// import React from 'react'
// import { SignIn } from '@clerk/nextjs'

// type Props = {}

// const Page = (props: Props) => {
//   return (
//     <SignIn />
//   )
// }
// export default Page

import { SignIn } from "@clerk/nextjs"
import Link from "next/link"

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-white/70 text-sm">Sign in to your account to continue</p>
      </div>

      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-md",
            card: "bg-transparent shadow-none",
            headerTitle: "text-white",
            headerSubtitle: "text-white/70",
            formFieldLabel: "text-white/90",
            formFieldInput: "bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded-md",
            footerActionLink: "text-blue-300 hover:text-blue-200",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-blue-300 hover:text-blue-200",
          },
        }}
      />

      <div className="text-center mt-4">
        <p className="text-white/70 text-sm">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-300 hover:text-blue-200 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page

