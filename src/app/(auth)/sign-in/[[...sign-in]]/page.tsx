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
import { ArrowRight } from "lucide-react"

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="space-y-6 py-2">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome Back!</h1>
        <p className="text-white/70 text-sm mx-auto max-w-sm">Sign in to manage your Instagram automation</p>
      </div>

      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-[#3352CC] hover:bg-[#4365E5] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-[#3352CC]/25 hover:shadow-[#3352CC]/40",
            card: "bg-transparent shadow-none",
            headerTitle: "text-white",
            headerSubtitle: "text-white/70",
            formFieldLabel: "text-white/90",
            formFieldInput:
              "bg-white/10 border-2 border-white/20 focus:border-[#3352CC] text-white placeholder:text-white/40 rounded-lg transition-all duration-200",
            footerActionLink: "text-[#3352CC] hover:text-[#4365E5]",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-[#3352CC] hover:text-[#4365E5]",
            formFieldInputShowPasswordButton: "text-white/60 hover:text-white",
            dividerLine: "bg-white/10",
            dividerText: "text-white/60",
            formFieldWarning: "text-yellow-500",
            formFieldError: "text-red-500",
            socialButtonsBlockButton:
              "border-2 border-white/20 hover:border-[#3352CC] bg-white/5 hover:bg-white/10 transition-all duration-200",
            socialButtonsBlockButtonText: "text-white font-medium",
            socialButtonsBlockButtonArrow: "text-white/60",
          },
          layout: {
            socialButtonsPlacement: "bottom",
            showOptionalFields: false,
          },
        }}
      />
    </div>
  )
}

export default Page

