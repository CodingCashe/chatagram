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
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Subtle glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>

      {/* Content container */}
      <div className="relative h-full flex justify-center items-center px-4">
        <div className="w-full max-w-md">
          {/* Logo/branding section */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg">
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
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">SecureAuth</span>
            </div>
          </div>

          {/* Card container */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">{children}</div>

            {/* Footer with subtle branding */}
            <div className="border-t border-white/10 p-4 text-center">
              <p className="text-xs text-white/60">Secure authentication powered by SecureAuth™</p>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-white/60">© {new Date().getFullYear()} SecureAuth Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout

