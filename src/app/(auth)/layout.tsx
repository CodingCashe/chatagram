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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A1233] flex flex-col lg:flex-row items-center justify-center px-4 py-8 lg:py-0 lg:px-0">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full 
          bg-[radial-gradient(circle_at_0%_0%,_#3352CC_0%,_transparent_50%),radial-gradient(circle_at_100%_100%,_#3352CC_0%,_transparent_50%)]
          opacity-20"
        ></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#3352CC 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: "0.1",
          }}
        ></div>
      </div>

      {/* Left side illustration (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 lg:h-screen items-center justify-center p-8">
        <div className="relative w-full max-w-2xl">
          {/* Abstract SVG illustration */}
          <svg
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 0 20px rgba(51, 82, 204, 0.3))" }}
          >
            <circle
              cx="400"
              cy="300"
              r="200"
              stroke="#3352CC"
              strokeWidth="2"
              strokeDasharray="10 10"
              className="animate-[spin_60s_linear_infinite]"
            />
            <circle
              cx="400"
              cy="300"
              r="150"
              stroke="#3352CC"
              strokeWidth="2"
              strokeDasharray="20 20"
              className="animate-[spin_40s_linear_infinite_reverse]"
            />
            <path
              d="M400 100 L400 500"
              stroke="#3352CC"
              strokeWidth="2"
              strokeDasharray="10 10"
              className="animate-pulse"
            />
            <path
              d="M200 300 L600 300"
              stroke="#3352CC"
              strokeWidth="2"
              strokeDasharray="10 10"
              className="animate-pulse"
            />
            <circle cx="400" cy="300" r="50" fill="#3352CC" fillOpacity="0.1" />
            <circle cx="400" cy="300" r="10" fill="#3352CC" />
            {/* Animated dots */}
            <circle cx="400" cy="100" r="6" fill="#3352CC" className="animate-ping" />
            <circle cx="600" cy="300" r="6" fill="#3352CC" className="animate-ping [animation-delay:0.5s]" />
            <circle cx="400" cy="500" r="6" fill="#3352CC" className="animate-ping [animation-delay:1s]" />
            <circle cx="200" cy="300" r="6" fill="#3352CC" className="animate-ping [animation-delay:1.5s]" />
          </svg>

          {/* Branding text */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3352CC] to-[#5E77E5]">
              SecureAuth Platform
            </h2>
            <p className="text-white/60 mt-2">Enterprise-grade authentication</p>
          </div>
        </div>
      </div>

      {/* Right side content */}
      <div className="relative w-full max-w-md lg:w-1/2 lg:max-w-xl">
        {/* Logo for mobile */}
        <div className="flex justify-center mb-8 lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#3352CC] rounded-xl flex items-center justify-center shadow-lg shadow-[#3352CC]/20">
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
            <span className="text-xl font-bold text-white">Secure</span>
          </div>
        </div>

        {/* Auth container */}
        <div className="relative group">
          {/* Animated border gradient */}
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#3352CC] via-[#5E77E5] to-[#3352CC] opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>

          {/* Main content */}
          <div className="relative bg-[#0F1A40] rounded-xl shadow-2xl shadow-[#3352CC]/10 backdrop-blur-xl border border-white/10 overflow-hidden">
            <div className="p-6 sm:p-8">{children}</div>

            {/* Footer */}
            <div className="border-t border-white/10 p-4 bg-black/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
          © {new Date().getFullYear()} Yazi. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Layout

