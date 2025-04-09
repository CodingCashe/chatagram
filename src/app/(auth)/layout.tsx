// import React, { Children } from 'react'

// type Props = {children: React.ReactNode}

// const Layout = ({children}: Props) => {
//   return (
//     <div className='h-screen flex justify-center items-center'>{children}</div>
//   )
// }

// export default Layout

import type React from "react"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen w-full bg-[#0A1233] flex flex-col lg:flex-row items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(#3352CC 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: "0.05",
        }}
      ></div>

      {/* Left side with illustration (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 lg:h-full items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          {/* Simple Instagram DM Automation SVG */}
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-lg"
          >
            {/* Main chat bubble */}
            <rect
              x="40"
              y="80"
              width="320"
              height="240"
              rx="20"
              fill="#3352CC"
              fillOpacity="0.1"
              stroke="#3352CC"
              strokeWidth="2"
            />

            {/* Message bubbles */}
            <rect x="80" y="120" width="160" height="40" rx="20" fill="#3352CC" fillOpacity="0.2" />
            <rect x="160" y="180" width="160" height="40" rx="20" fill="#3352CC" fillOpacity="0.2" />
            <rect x="80" y="240" width="160" height="40" rx="20" fill="#3352CC" fillOpacity="0.2" />  
          </svg>
        </div>
      </div>

      {/* Right side content */}
      <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg mx-auto">
        {/* Logo and product name for mobile */}
        <div className="flex flex-col items-center mb-6 lg:hidden space-y-3">
          <div className="w-12 h-12 bg-[#3352CC] rounded-xl flex items-center justify-center shadow-lg shadow-[#3352CC]/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </div>

        {/* Auth container */}
        <div className="relative group">
          {/* Border gradient */}
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#3352CC] via-[#5E77E5] to-[#3352CC] opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>

          {/* Main content */}
          <div className="relative bg-[#0F1A40] rounded-xl shadow-2xl shadow-[#3352CC]/10 border border-white/10 overflow-hidden">
            <div className="p-6 sm:p-8 flex justify-center items-center">{children}</div>

            {/* Footer */}
            <div className="border-t border-white/10 p-4 bg-black/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <p className="text-xs text-white/60">Secure • Automated • Scalable</p>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
                    Terms
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} Yazil. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Layout

