// import React, { Children } from 'react'

// type Props = {children: React.ReactNode}

// const Layout = ({children}: Props) => {
//   return (
//     <div className='h-screen flex justify-center items-center'>{children}</div>
//   )
// }

// export default Layout

// import type React from "react"

// type Props = {
//   children: React.ReactNode
// }

// const Layout = ({ children }: Props) => {
//   return (
//     <div className="relative min-h-screen w-full bg-[#0A1233] flex flex-col lg:flex-row items-center justify-center p-4 md:p-6 lg:p-8">
//       {/* Subtle background pattern */}
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(#3352CC 1px, transparent 1px)`,
//           backgroundSize: "40px 40px",
//           opacity: "0.05",
//         }}
//       ></div>

//       {/* Left side with illustration (desktop only) */}
//       <div className="hidden lg:flex lg:w-1/2 lg:h-full items-center justify-center p-8">
//         <div className="relative w-full max-w-lg">
//           {/* Simple Instagram DM Automation SVG */}
//           <svg
//             viewBox="0 0 400 400"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-full h-auto drop-shadow-lg"
//           >
//             {/* Main chat bubble */}
//             <rect
//               x="40"
//               y="80"
//               width="320"
//               height="240"
//               rx="20"
//               fill="#3352CC"
//               fillOpacity="0.1"
//               stroke="#3352CC"
//               strokeWidth="2"
//             />

//             {/* Message bubbles */}
//             <rect x="80" y="120" width="160" height="40" rx="20" fill="#3352CC" fillOpacity="0.2" />
//             <rect x="160" y="180" width="160" height="40" rx="20" fill="#3352CC" fillOpacity="0.2" />
//             <rect x="80" y="240" width="160" height="40" rx="20" fill="#3352CC" fillOpacity="0.2" />  
//           </svg>
//         </div>
//       </div>

//       {/* Right side content */}
//       <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg mx-auto">
//         {/* Logo and product name for mobile */}
//         <div className="flex flex-col items-center mb-6 lg:hidden space-y-3">
//           <div className="w-12 h-12 bg-[#3352CC] rounded-xl flex items-center justify-center shadow-lg shadow-[#3352CC]/20">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Auth container */}
//         <div className="relative group">
//           {/* Border gradient */}
//           <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#3352CC] via-[#5E77E5] to-[#3352CC] opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>

//           {/* Main content */}
//           <div className="relative bg-[#0F1A40] rounded-xl shadow-2xl shadow-[#3352CC]/10 border border-white/10 overflow-hidden">
//             <div className="p-6 sm:p-8 flex justify-center items-center">{children}</div>

//             {/* Footer */}
//             <div className="border-t border-white/10 p-4 bg-black/20">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
//                 <p className="text-xs text-white/60">Secure • Automated • Scalable</p>
//                 <div className="flex items-center space-x-4">
//                   <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
//                     Privacy
//                   </a>
//                   <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
//                     Terms
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom text */}
//         <p className="text-center text-xs text-white/40 mt-6">
//           © {new Date().getFullYear()} Yazil. All rights reserved.
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Layout

// import type React from "react"

// type Props = {
//   children: React.ReactNode
// }

// const Layout = ({ children }: Props) => {
//   return (
//     <div className="relative min-h-screen w-full bg-gray-950 flex flex-col lg:flex-row items-center justify-center p-4 md:p-6 lg:p-8">
//       {/* Subtle background pattern */}
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(#4B5563 1px, transparent 1px)`,
//           backgroundSize: "40px 40px",
//           opacity: "0.05",
//         }}
//       ></div>

//       {/* Left side with illustration (desktop only) */}
//       <div className="hidden lg:flex lg:w-1/2 lg:h-full items-center justify-center p-8">
//         <div className="relative w-full max-w-lg">
//           {/* Simple Instagram DM Automation SVG */}
//           <svg
//             viewBox="0 0 400 400"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-full h-auto drop-shadow-lg"
//           >
//             {/* Main chat bubble */}
//             <rect
//               x="40"
//               y="80"
//               width="320"
//               height="240"
//               rx="20"
//               fill="#374151"
//               fillOpacity="0.1"
//               stroke="#4B5563"
//               strokeWidth="2"
//             />

//             {/* Message bubbles */}
//             <rect x="80" y="120" width="160" height="40" rx="20" fill="#374151" fillOpacity="0.2" />
//             <rect x="160" y="180" width="160" height="40" rx="20" fill="#374151" fillOpacity="0.2" />
//             <rect x="80" y="240" width="160" height="40" rx="20" fill="#374151" fillOpacity="0.2" />
//           </svg>
//         </div>
//       </div>

//       {/* Right side content */}
//       <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg mx-auto">
//         {/* Logo and product name for mobile */}
//         <div className="flex flex-col items-center mb-6 lg:hidden space-y-3">
//           <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/20">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Auth container */}
//         <div className="relative group">
//           {/* Border gradient */}
//           <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>

//           {/* Main content */}
//           <div className="relative bg-gray-900 rounded-xl shadow-2xl shadow-black/40 border border-white/10 overflow-hidden">
//             <div className="p-6 sm:p-8 flex justify-center items-center">{children}</div>

//             {/* Footer */}
//             <div className="border-t border-white/10 p-4 bg-black/20">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
//                 <p className="text-xs text-white/60">Secure • Automated • Scalable</p>
//                 <div className="flex items-center space-x-4">
//                   <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
//                     Privacy
//                   </a>
//                   <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
//                     Terms
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom text */}
//         <p className="text-center text-xs text-white/40 mt-6">
//           © {new Date().getFullYear()} Yazil. All rights reserved.
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Layout


import type React from "react"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen w-full bg-gray-950 flex flex-col lg:flex-row items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(#4B5563 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: "0.05",
        }}
      ></div>

      {/* Left side with illustration (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 lg:h-full items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          {/* Business Solutions Dashboard SVG */}
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-lg"
          >
            {/* Main dashboard container */}
            <rect x="40" y="60" width="320" height="280" rx="12" fill="#1F2937" stroke="#374151" strokeWidth="2" />

            {/* Header bar */}
            <rect x="40" y="60" width="320" height="40" rx="12" fill="#374151" />

            {/* Header dots */}
            <circle cx="65" cy="80" r="6" fill="#EF4444" fillOpacity="0.8" />
            <circle cx="85" cy="80" r="6" fill="#F59E0B" fillOpacity="0.8" />
            <circle cx="105" cy="80" r="6" fill="#10B981" fillOpacity="0.8" />

            {/* Left sidebar */}
            <rect x="40" y="100" width="80" height="240" fill="#111827" />

            {/* Sidebar menu items */}
            <rect x="55" y="120" width="50" height="8" rx="4" fill="#4B5563" />
            <rect x="55" y="140" width="50" height="8" rx="4" fill="#4B5563" />
            <rect x="55" y="160" width="50" height="8" rx="4" fill="#4B5563" />
            <rect x="55" y="180" width="50" height="8" rx="4" fill="#4B5563" />
            <rect x="55" y="200" width="50" height="8" rx="4" fill="#4B5563" />

            {/* Main content area - Analytics */}

            {/* Title */}
            <rect x="140" y="120" width="100" height="10" rx="5" fill="#6B7280" />

            {/* Charts */}
            <rect x="140" y="145" width="100" height="70" rx="6" fill="#374151" />
            <rect x="250" y="145" width="100" height="70" rx="6" fill="#374151" />

            {/* Bar chart elements */}
            <rect x="150" y="185" width="10" height="20" rx="2" fill="#9CA3AF" />
            <rect x="165" y="175" width="10" height="30" rx="2" fill="#9CA3AF" />
            <rect x="180" y="165" width="10" height="40" rx="2" fill="#9CA3AF" />
            <rect x="195" y="155" width="10" height="50" rx="2" fill="#9CA3AF" />
            <rect x="210" y="175" width="10" height="30" rx="2" fill="#9CA3AF" />
            <rect x="225" y="180" width="10" height="25" rx="2" fill="#9CA3AF" />

            {/* Line chart */}
            <path
              d="M260 195 L270 175 L285 185 L300 165 L315 180 L330 160"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Data cards */}
            <rect x="140" y="225" width="70" height="50" rx="6" fill="#374151" />
            <rect x="220" y="225" width="70" height="50" rx="6" fill="#374151" />
            <rect x="300" y="225" width="50" height="50" rx="6" fill="#374151" />

            {/* Card icons */}
            <circle cx="155" cy="240" r="8" fill="#4B5563" />
            <circle cx="235" cy="240" r="8" fill="#4B5563" />
            <circle cx="315" cy="240" r="8" fill="#4B5563" />

            {/* Card data */}
            <rect x="150" y="255" width="50" height="6" rx="3" fill="#6B7280" />
            <rect x="150" y="265" width="30" height="6" rx="3" fill="#6B7280" />

            <rect x="230" y="255" width="50" height="6" rx="3" fill="#6B7280" />
            <rect x="230" y="265" width="30" height="6" rx="3" fill="#6B7280" />

            <rect x="310" y="255" width="30" height="6" rx="3" fill="#6B7280" />
            <rect x="310" y="265" width="20" height="6" rx="3" fill="#6B7280" />
          </svg>
        </div>
      </div>

      {/* Right side content */}
      <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg mx-auto">
        {/* Logo and product name for mobile */}
        <div className="flex flex-col items-center mb-6 lg:hidden space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/20">
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
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>

          {/* Main content */}
          <div className="relative bg-gray-900 rounded-xl shadow-2xl shadow-black/40 border border-white/10 overflow-hidden">
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
