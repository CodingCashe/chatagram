// import React from 'react'
// import { SignUp } from '@clerk/nextjs'

// type Props = {}

// const Page = (props: Props) => {
//   return (
//     <SignUp />
//   )
// }
// export default Page

import { SignUp } from "@clerk/nextjs"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Create Your Account</h1>
        <p className="text-white/70 text-sm sm:text-base">Join thousands of professionals today</p>
      </div>

      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-[#3352CC] hover:bg-[#4365E5] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-[#3352CC]/25 hover:shadow-[#3352CC]/40 hover:scale-[1.02]",
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

      <div className="space-y-6">
        <div className="flex items-center justify-center space-x-2 group cursor-pointer">
          <Link href="/sign-in" className="text-white/70 text-sm sm:text-base group-hover:text-white transition-colors">
            Already have an account? <span className="text-[#3352CC] group-hover:text-[#4365E5]">Sign in instead</span>
          </Link>
          <ArrowRight className="w-4 h-4 text-[#3352CC] group-hover:text-[#4365E5] group-hover:translate-x-1 transition-all" />
        </div>

        <div className="text-center">
          <p className="text-xs sm:text-sm text-white/50 max-w-sm mx-auto">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-[#3352CC] hover:text-[#4365E5] underline transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#3352CC] hover:text-[#4365E5] underline transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page

