"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface LogoProps {
  maxWidth?: number
  maxHeight?: number
}

export const LogoSmall: React.FC<LogoProps> = ({ maxWidth = 300, maxHeight = 100 }) => {
  const [dimensions, setDimensions] = useState({ width: maxWidth, height: maxHeight })

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(maxWidth, window.innerWidth * 0.8)
      const height = (width / maxWidth) * maxHeight
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [maxWidth, maxHeight])

  return (
    <div
      style={{
        width: "100%",
        maxWidth: `${dimensions.width}px`,
        ...styles.logoWrapper,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={styles.svg}
      >
        <defs>
          <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#405DE6" />
            <stop offset="50%" stopColor="#5851DB" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Instagram-inspired camera outline */}
        <rect x="10" y="10" width="80" height="80" rx="20" ry="20" fill="url(#instagramGradient)" />
        <rect x="15" y="15" width="70" height="70" rx="18" ry="18" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="73" cy="27" r="5" fill="white" />

    


        {/* Company name */}
        <text
          x="110"
          y="50"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="#405DE6"
          filter="url(#glow)"
        >
          Chatal
        </text>

        {/* Tagline */}
        <text x="110" y="75" fontFamily="Arial, sans-serif" fontSize="12" fill="#833AB4">
          Engage.Automate.Grow
        </text>
      </svg>
    </div>
  )
}

const styles = {
  logoWrapper: {
    "@media (max-width: 768px)": {
      maxWidth: "240px",
    },
    "@media (max-width: 480px)": {
      maxWidth: "180px",
    },
  },
  svg: {
    display: "block",
    margin: "0",
    verticalAlign: "top",
  },
} as const


export default LogoSmall


// "use client"

// import React, { useEffect, useState } from 'react'

// interface ChatalLogoProps {
//   maxWidth?: number
//   maxHeight?: number
// }

// export const LogoSmall: React.FC<ChatalLogoProps> = ({ maxWidth = 300, maxHeight = 100 }) => {
//   const [dimensions, setDimensions] = useState({ width: maxWidth, height: maxHeight })

//   useEffect(() => {
//     const updateDimensions = () => {
//       const width = Math.min(maxWidth, window.innerWidth * 0.8)
//       const height = (width / maxWidth) * maxHeight
//       setDimensions({ width, height })
//     }

//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)
//     return () => window.removeEventListener('resize', updateDimensions)
//   }, [maxWidth, maxHeight])

//   return (
//     <div style={{
//       width: '100%',
//       maxWidth: `${dimensions.width}px`,
//       ...styles.logoWrapper,
//     }}>
//       <svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 300 100"
//         preserveAspectRatio="xMidYMid meet"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={styles.svg}
//       >
//         <defs>
//           <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#260AFF" />
//             <stop offset="100%" stopColor="#0A68FF" />
//           </linearGradient>
//           <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
//             <feMerge>
//               <feMergeNode in="coloredBlur"/>
//               <feMergeNode in="SourceGraphic"/>
//             </feMerge>
//           </filter>
//           <clipPath id="chatBubbleClip">
//             <path d="M10 50 Q 10 10, 50 10 Q 90 10, 90 50 Q 90 90, 50 90 Q 30 90, 20 80 L 5 95 L 15 75 Q 10 65, 10 50" />
//           </clipPath>
//         </defs>
        
//         {/* Main chat bubble */}
//         <g clipPath="url(#chatBubbleClip)">
//           <rect width="100" height="100" fill="url(#bubbleGradient)" />
//           {/* <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)" /> */}
//           <circle cx="50" cy="50" r="40" fill="#1B5CFF" />
//           <path
//             d="M30 30 Q 50 0, 70 30 Q 100 50, 70 70 Q 50 100, 30 70 Q 0 50, 30 30"
//             fill="#2563EB"
//             transform="rotate(45 50 50)"
//           >
//             <animateTransform
//               attributeName="transform"
//               type="rotate"
//               from="0 50 50"
//               to="360 50 50"
//               dur="40s"
//               repeatCount="indefinite"
//             />
//           </path>
//         </g>
        
//         {/* Automation representation */}
//         <g transform="translate(50, 50)">
//           <circle r="25" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="5,5">
//             <animateTransform
//               attributeName="transform"
//               type="rotate"
//               from="0"
//               to="360"
//               dur="20s"
//               repeatCount="indefinite"
//             />
//           </circle>
//           <circle r="18" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="3,3">
//             <animateTransform
//               attributeName="transform"
//               type="rotate"
//               from="360"
//               to="0"
//               dur="14s"
//               repeatCount="indefinite"
//             />
//           </circle>
//         </g>
        
//         {/* AI/Automation core */}
//         <g transform="translate(50, 50)">
//           <path
//             d="M-10 -10 L10 10 M-10 10 L10 -10"
//             fill="#AABBFF"
//             strokeWidth="3"
//             strokeLinecap="round"
//           >
//             <animateTransform
//               attributeName="transform"
//               type="scale"
//               values="1;1.2;1"
//               dur="13s"
//               repeatCount="indefinite"
//             />
//           </path>
//         </g>
        
//         {/* Dynamic message lines */}
//         <g>
//           <path d="M15 40 Q 30 20, 45 40" stroke="#FFFFFF" strokeWidth="2" fill="none">
//             <animate
//               attributeName="d"
//               values="M15 40 Q 30 20, 45 40;M15 40 Q 30 60, 45 40;M15 40 Q 30 20, 45 40"
//               dur="13s"
//               repeatCount="indefinite"
//             />
//           </path>
//           <path d="M55 60 Q 70 80, 85 60" stroke="#FFFFFF" strokeWidth="2" fill="none">
//             <animate
//               attributeName="d"
//               values="M55 60 Q 70 80, 85 60;M55 60 Q 70 40, 85 60;M55 60 Q 70 80, 85 60"
//               dur="13s"
//               repeatCount="indefinite"
//             />
//           </path>
//         </g>
        
//         {/* Company name with dynamic effect */}
//         <text
//           x="120"
//           y="60"
//           fontFamily="Arial, sans-serif"
//           fontSize="40"
//           fontWeight="bold"
//           fill="#2563EB"
//           filter="url(#neonGlow)"
//         >
//           Chatal
//           <animate
//             attributeName="opacity"
//             values="1;0.7;1"
//             dur="13s"
//             repeatCount="indefinite"
//           />
//         </text>
        
//         {/* Tagline */}
//         <text
//           x="120"
//           y="80"
//           fontFamily="Arial, sans-serif"
//           fontSize="14"
//           fill="#AABBFF"
//         >
//           Automate. Engage. Grow.
//         </text>
//       </svg>
//     </div>
//   )
// }

// const styles = {
//   logoWrapper: {
//     '@media (max-width: 768px)': {
//       maxWidth: '240px',
//     },
//     '@media (max-width: 480px)': {
//       maxWidth: '180px',
//     },
//   },
//   svg: {
//     display: 'block',
//     margin: '0',
//     verticalAlign: 'top',
//   },
// } as const

// export default LogoSmall


// export const LogoSmall = () => {
//   return (
//     <svg
//       width="116"
//       height="61"
//       viewBox="0 0 116 61"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M10 30
//         A20 20 0 1 1 50 30
//         L40 30
//         A10 10 0 1 0 20 30
//         Z"
//         fill="#AABBFF"
//       /> {/* C */}
//       <path
//         d="M10 10 
//         L10 50 
//         L20 50 
//         L20 30 
//         L40 30 
//         L40 50 
//         L50 50 
//         L50 10 
//         L40 10 
//         L40 20 
//         L20 20 
//         L20 10 
//         Z" 
//         fill="#AABBFF"
//       /> {/* h */}
//       <path
//         d="M30 50 
//         L20 10 
//         L10 50 
//         L15 50 
//         L18 40 
//         L28 40 
//         L32 50 
//         L30 50 
//         Z 
//         M22 35 
//         L18 35 
//         L20 25 
//         L22 35 
//         Z" 
//         fill="#AABBFF"
//       /> {/* a */}
//       <path
//         d="M20 40V60H30V50H40V60H50V40H40V50H30V40H20Z" 
//         fill="#AABBFF"
//       /> {/* t */}
//       <path
//         d="M30 50 
//         L20 10 
//         L10 50 
//         L15 50 
//         L18 40 
//         L28 40 
//         L32 50 
//         L30 50 
//         Z 
//         M22 35 
//         L18 35 
//         L20 25 
//         L22 35 
//         Z" 
//         fill="#AABBFF"
//       /> {/* a */}
//       <path
//         d="M10 10 
//         V50 
//         H40 
//         V40 
//         H20 
//         V10 
//         Z" 
//         fill="#AABBFF"
//       /> {/* l */}
//     </svg>
//   );
// };

// export const LogoSmall = () => {
//     return (
//       <svg
//         width="116"
//         height="61"
//         viewBox="0 0 116 61"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M86.542 48H84.9589L82.4164 44.4741C81.7928 45.0338 81.1292 45.5615 80.4256 46.0572C79.7381 46.5369 79.0105 46.9606 78.243 47.3284C77.4754 47.6802 76.6839 47.96 75.8684 48.1679C75.0689 48.3758 74.2534 48.4797 73.4219 48.4797C71.6149 48.4797 69.912 48.1439 68.3129 47.4723C66.7299 46.7847 65.3387 45.8413 64.1395 44.642C62.9562 43.4268 62.0207 41.9956 61.3331 40.3486C60.6456 38.6856 60.3018 36.8787 60.3018 34.9279C60.3018 32.993 60.6456 31.1941 61.3331 29.5311C62.0207 27.8681 62.9562 26.429 64.1395 25.2137C65.3387 23.9985 66.7299 23.047 68.3129 22.3594C69.912 21.6719 71.6149 21.3281 73.4219 21.3281C73.9975 21.3281 74.5892 21.376 75.1968 21.472C75.8204 21.5679 76.4201 21.7278 76.9957 21.9517C77.5873 22.1596 78.139 22.4394 78.6507 22.7912C79.1624 23.143 79.5941 23.5747 79.9459 24.0864V12.0936H86.542V48ZM79.9459 34.9279C79.9459 34.0324 79.77 33.1689 79.4182 32.3374C79.0824 31.4899 78.6187 30.7464 78.0271 30.1068C77.4354 29.4512 76.7399 28.9315 75.9403 28.5477C75.1568 28.148 74.3173 27.9481 73.4219 27.9481C72.5264 27.9481 71.6789 28.108 70.8794 28.4278C70.0959 28.7476 69.4083 29.2113 68.8166 29.819C68.241 30.4106 67.7853 31.1382 67.4495 32.0016C67.1137 32.8651 66.9458 33.8405 66.9458 34.9279C66.9458 35.8713 67.1137 36.7668 67.4495 37.6143C67.7853 38.4617 68.241 39.2053 68.8166 39.8449C69.4083 40.4845 70.0959 40.9882 70.8794 41.356C71.6789 41.7238 72.5264 41.9077 73.4219 41.9077C74.3173 41.9077 75.1568 41.7158 75.9403 41.332C76.7399 40.9323 77.4354 40.4126 78.0271 39.773C78.6187 39.1174 79.0824 38.3738 79.4182 37.5423C79.77 36.6948 79.9459 35.8233 79.9459 34.9279ZM101.773 41.7158C102.029 41.7957 102.284 41.8517 102.54 41.8837C102.796 41.8997 103.052 41.9077 103.308 41.9077C103.947 41.9077 104.563 41.8197 105.155 41.6438C105.746 41.4679 106.298 41.2201 106.81 40.9003C107.337 40.5645 107.801 40.1647 108.201 39.701C108.617 39.2213 108.952 38.6936 109.208 38.118L114.005 42.939C113.398 43.8025 112.694 44.5781 111.895 45.2656C111.111 45.9532 110.256 46.5369 109.328 47.0166C108.417 47.4963 107.449 47.8561 106.426 48.0959C105.419 48.3518 104.379 48.4797 103.308 48.4797C101.501 48.4797 99.798 48.1439 98.1989 47.4723C96.6159 46.8007 95.2247 45.8653 94.0254 44.666C92.8422 43.4667 91.9067 42.0436 91.2191 40.3966C90.5316 38.7336 90.1878 36.9107 90.1878 34.9279C90.1878 32.8971 90.5316 31.0422 91.2191 29.3632C91.9067 27.6842 92.8422 26.2531 94.0254 25.0698C95.2247 23.8865 96.6159 22.9671 98.1989 22.3115C99.798 21.6559 101.501 21.3281 103.308 21.3281C104.379 21.3281 105.427 21.456 106.45 21.7118C107.473 21.9677 108.441 22.3355 109.352 22.8152C110.28 23.2949 111.143 23.8865 111.943 24.5901C112.742 25.2777 113.446 26.0532 114.053 26.9167L101.773 41.7158ZM105.131 28.2119C104.827 28.1 104.523 28.028 104.219 27.996C103.931 27.9641 103.628 27.9481 103.308 27.9481C102.412 27.9481 101.565 28.116 100.765 28.4518C99.9819 28.7716 99.2943 29.2353 98.7026 29.8429C98.127 30.4506 97.6713 31.1861 97.3355 32.0496C96.9997 32.8971 96.8318 33.8565 96.8318 34.9279C96.8318 35.1677 96.8398 35.4396 96.8557 35.7434C96.8877 36.0472 96.9277 36.359 96.9757 36.6788C97.0396 36.9826 97.1116 37.2785 97.1915 37.5663C97.2715 37.8541 97.3754 38.11 97.5034 38.3338L105.131 28.2119Z"
//           fill="#AABBFF"
//         />
//         <path
//           d="M1.95264 23.9185C1.95264 22.4954 2.22447 21.1602 2.76814 19.9129C3.31182 18.6657 4.04737 17.5783 4.97482 16.6509C5.91825 15.7075 7.01359 14.9639 8.26084 14.4202C9.50808 13.8766 10.8433 13.6047 12.2664 13.6047L28.0489 13.6047V20.4886H12.2664C11.7867 20.4886 11.339 20.5765 10.9232 20.7524C10.5075 20.9283 10.1397 21.1762 9.8199 21.496C9.51608 21.7998 9.27622 22.1596 9.10033 22.5753C8.92444 22.9911 8.83649 23.4388 8.83649 23.9185C8.83649 24.3982 8.92444 24.8539 9.10033 25.2857C9.27622 25.7014 9.51608 26.0692 9.8199 26.389C10.1397 26.6928 10.5075 26.9327 10.9232 27.1086C11.339 27.2845 11.7867 27.3724 12.2664 27.3724H19.1503C20.5734 27.3724 21.9086 27.6443 23.1559 28.1879C24.4191 28.7156 25.5144 29.4512 26.4419 30.3946C27.3853 31.322 28.1209 32.4174 28.6486 33.6806C29.1922 34.9279 29.4641 36.2631 29.4641 37.6862C29.4641 39.1094 29.1922 40.4446 28.6486 41.6918C28.1209 42.939 27.3853 44.0344 26.4419 44.9778C25.5144 45.9053 24.4191 46.6408 23.1559 47.1845C21.9086 47.7282 20.5734 48 19.1503 48H3.87148L3.87148 41.1161H19.1503C19.63 41.1161 20.0777 41.0282 20.4935 40.8523C20.9092 40.6764 21.269 40.4366 21.5728 40.1327C21.8926 39.8129 22.1405 39.4452 22.3164 39.0294C22.4923 38.6137 22.5802 38.1659 22.5802 37.6862C22.5802 37.2065 22.4923 36.7588 22.3164 36.343C22.1405 35.9273 21.8926 35.5675 21.5728 35.2637C21.269 34.9439 20.9092 34.696 20.4935 34.5201C20.0777 34.3442 19.63 34.2563 19.1503 34.2563H12.2664C10.8433 34.2563 9.50808 33.9844 8.26084 33.4408C7.01359 32.8971 5.91825 32.1615 4.97482 31.2341C4.04737 30.2907 3.31182 29.1953 2.76814 27.9481C2.22447 26.6848 1.95264 25.3416 1.95264 23.9185Z"
//           fill="#AABBFF"
//         />
//         <path
//           d="M29.98 22.9948C33.7041 41.0907 45.869 46.2111 61.1018 43.7636"
//           stroke="#AABBFF"
//           stroke-width="6.38743"
//         />
//         <path
//           d="M41.2124 25.9109C41.7282 28.558 44.102 34.4987 49.4707 37.0849"
//           stroke="#AABBFF"
//           stroke-width="5.10995"
//         />
//         <circle
//           cx="41.0184"
//           cy="20.1204"
//           r="2.87435"
//           fill="#AABBFF"
//         />
//       </svg>
//     )
//   }

// export const LogoSmall = () => {
//   return (
//     <svg
//       width="116"
//       height="61"
//       viewBox="0 0 116 61"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Replace paths here to spell "Chatal" */}
//       <path
//         d="M10 40 L20 10 L30 40 Z" /* Example of 'C' */
//         fill="#AABBFF"
//       />
//       <path
//         d="M40 10 L50 40 L60 10 Z" /* Example of 'H' */
//         fill="#AABBFF"
//       />
//       {/* Additional paths to complete "Chatal" */}
//       <path
//         d="M70 20 A10 10 0 1 1 70 40 Z" /* Example of 'A' */
//         fill="#AABBFF"
//       />
//       <path
//         d="M90 10 L100 40 L110 10 Z" /* Example of 'T' */
//         fill="#AABBFF"
//       />
//       <path
//         d="M120 40 L130 10 L140 40 Z" /* Example of 'A' */
//         fill="#AABBFF"
//       />
//       <path
//         d="M150 10 L160 40 L170 10 Z" /* Example of 'L' */
//         fill="#AABBFF"
//       />
//     </svg>
//   );
// };

// export const LogoSmall = () => {
//   return (
//     <svg
//       width="116"
//       height="61"
//       viewBox="0 0 116 61"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Instagram-inspired camera outline */}
//       <rect x="10" y="10" width="96" height="41" rx="10" stroke="#E1306C" strokeWidth="4"/>
      
//       {/* Camera lens */}
//       <circle cx="58" cy="30.5" r="15" stroke="#E1306C" strokeWidth="4"/>
      
//       {/* Flash */}
//       <circle cx="86" cy="20" r="4" fill="#E1306C"/>
      
//       {/* Automation gears */}
//       <path d="M30 25a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="#4CAF50"/>
//       <path d="M25 30h10M30 20v25" stroke="#4CAF50" strokeWidth="2"/>
      
//       {/* Message bubble */}
//       <path d="M65 35l10 10h16c2.76 0 5-2.24 5-5V25c0-2.76-2.24-5-5-5H75c-2.76 0-5 2.24-5 5v10z" fill="#4CAF50"/>
      
//       {/* Automation lines */}
//       <path d="M35 30h25M90 30h16" stroke="#4CAF50" strokeWidth="2" strokeDasharray="2 2"/>
//     </svg>
//   );
// };

// export const LogoSmall = () => {
//   return (
//     <svg
//       width="116"
//       height="61"
//       // width="50"
//       // height="30"
//       viewBox="0 0 116 61"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Background gradient */}
//       <defs>
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#405DE6" />
//           <stop offset="50%" stopColor="#5851DB" />
//           <stop offset="100%" stopColor="#833AB4" />
//         </linearGradient>
//       </defs>
      
//       {/* Abstract Instagram-inspired shape */}
//       <path d="M10 30.5C10 18.073 20.073 8 32.5 8h51C95.927 8 106 18.073 106 30.5S95.927 53 83.5 53h-51C20.073 53 10 42.927 10 30.5z" fill="url(#gradient)"/>
      
//       {/* Stylized camera lens */}
//       <circle cx="32.5" cy="30.5" r="15" stroke="white" strokeWidth="3" strokeDasharray="4 2"/>
      
//       {/* Abstract message bubbles */}
//       <path d="M55 20c5.523 0 10 4.477 10 10s-4.477 10-10 10S45 35.523 45 30s4.477-10 10-10z" fill="#FCAF45"/>
//       <path d="M75 25c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z" fill="#AABBFF"/>
//       <path d="M90 15c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" fill="#F77737"/>
      
//       {/* Automation lines */}
//       <path d="M47.5 30.5c-30 20 30 20 0 0z" stroke="white" strokeWidth="2" strokeDasharray="4 2">
//         <animateTransform
//           attributeName="transform"
//           attributeType="XML"
//           type="translate"
//           from="0 0"
//           to="15 0"
//           dur="20s"
//           repeatCount="indefinite"
//         />
//       </path>
      
//       {/* Wi-Fi-like automation waves */}
//       <path d="M70 40c5.523 0 10 4.477 10 10M70 35c8.284 0 15 6.716 15 15M70 30c11.046 0 20 8.954 20 20" stroke="white" strokeWidth="2" strokeLinecap="round">
//         <animate
//           attributeName="opacity"
//           values="0;1;0"
//           dur="10s"
//           repeatCount="indefinite"
//         />
//       </path>
//     </svg>
//   );
// };


// import React from 'react';

// export const LogoSmall: React.FC = () => {
//   return (
//     <svg
//       width="116"
//       height="61"
//       viewBox="0 0 116 61"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         <filter id="glow">
//           <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
//           <feMerge>
//             <feMergeNode in="coloredBlur"/>
//             <feMergeNode in="SourceGraphic"/>
//           </feMerge>
//         </filter>
//         <linearGradient id="instagram" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#405DE6">
//             <animate attributeName="stop-color" values="#405DE6; #5851DB; #833AB4; #C13584; #E1306C; #FD1D1D; #F56040; #F77737; #FCAF45; #FFDC80; #405DE6" dur="20s" repeatCount="indefinite" />
//           </stop>
//           <stop offset="100%" stopColor="#FFDC80">
//             <animate attributeName="stop-color" values="#FFDC80; #405DE6; #5851DB; #833AB4; #C13584; #E1306C; #FD1D1D; #F56040; #F77737; #FCAF45; #FFDC80" dur="20s" repeatCount="indefinite" />
//           </stop>
//         </linearGradient>
//       </defs>

//       {/* Main circular path */}
//       <path d="M58 5A25 25 0 0 1 58 56A25 25 0 0 1 58 5" stroke="url(#instagram)" strokeWidth="3" fill="none">
//         <animateTransform
//           attributeName="transform"
//           attributeType="XML"
//           type="rotate"
//           from="0 58 30.5"
//           to="360 58 30.5"
//           dur="20s"
//           repeatCount="indefinite"
//         />
//       </path>

//       {/* Central hub */}
//       <circle cx="58" cy="30.5" r="15" fill="#E1306C" filter="url(#glow)">
//         <animate attributeName="r" values="15;17;15" dur="2s" repeatCount="indefinite" />
//       </circle>

//       {/* Orbiting messages */}
//       {[0, 72, 144, 216, 288].map((angle, index) => (
//         <React.Fragment key={index}>
//           <circle cx="58" cy="30.5" r="25" fill="none" stroke="#FCAF45" strokeWidth="2" strokeDasharray="2 4">
//             <animateTransform
//               attributeName="transform"
//               attributeType="XML"
//               type="rotate"
//               from={`${angle} 58 30.5`}
//               to={`${angle + 360} 58 30.5`}
//               dur={`${10 + index}s`}
//               repeatCount="indefinite"
//             />
//           </circle>
//           <circle cx="83" cy="30.5" r="4" fill="#FCAF45">
//             <animateTransform
//               attributeName="transform"
//               attributeType="XML"
//               type="rotate"
//               from={`${angle} 58 30.5`}
//               to={`${angle + 360} 58 30.5`}
//               dur={`${10 + index}s`}
//               repeatCount="indefinite"
//             />
//             <animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" />
//           </circle>
//         </React.Fragment>
//       ))}

//       {/* Automation beams */}
//       {[0, 72, 144, 216, 288].map((angle, index) => (
//         <path
//           key={index}
//           d="M58 30.5L83 30.5"
//           stroke="#FFF"
//           strokeWidth="2"
//           strokeLinecap="round"
//           opacity="0.7"
//           transform={`rotate(${angle} 58 30.5)`}
//         >
//           <animate
//             attributeName="stroke-dasharray"
//             values="0,25;25,0"
//             dur={`${1 + index * 0.2}s`}
//             repeatCount="indefinite"
//           />
//         </path>
//       ))}

//       {/* Instagram camera icon */}
//       <path d="M52 25h12v11H52z" stroke="#FFF" strokeWidth="2" fill="none" />
//       <circle cx="58" cy="30.5" r="2" stroke="#FFF" strokeWidth="2" fill="none" />
//       <circle cx="62" cy="26.5" r="1" fill="#FFF" />
//     </svg>
//   );
// };


// import React from 'react'

// interface ChatalLogoProps {
//   width?: number
//   height?: number
// }

// export const LogoSmall: React.FC<ChatalLogoProps> = ({ width = 300, height = 100 }) => {
//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox="0 0 300 100"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{
//         display: 'block', /* Ensures no extra space above */
//         margin: '0', /* Resets any default margins */
//         verticalAlign: 'top', /* Aligns to the top of the container */
//       }}
//     >
//       <defs>
//         <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#4A00E0" />
//           <stop offset="100%" stopColor="#8E2DE2" />
//         </linearGradient>
//         <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
//           <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
//           <feMerge>
//             <feMergeNode in="coloredBlur"/>
//             <feMergeNode in="SourceGraphic"/>
//           </feMerge>
//         </filter>
//         <clipPath id="chatBubbleClip">
//           <path d="M10 50 Q 10 10, 50 10 Q 90 10, 90 50 Q 90 90, 50 90 Q 30 90, 20 80 L 5 95 L 15 75 Q 10 65, 10 50" />
//         </clipPath>
//       </defs>
      
//       {/* Main chat bubble */}
//       <g clipPath="url(#chatBubbleClip)">
//         <rect width="100" height="100" fill="url(#bubbleGradient)" />
//         <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)" />
//         <path
//           d="M30 30 Q 50 0, 70 30 Q 100 50, 70 70 Q 50 100, 30 70 Q 0 50, 30 30"
//           fill="rgba(255,255,255,0.1)"
//           transform="rotate(45 50 50)"
//         >
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             from="0 50 50"
//             to="360 50 50"
//             dur="40s"
//             repeatCount="indefinite"
//           />
//         </path>
//       </g>
      
//       {/* Automation representation */}
//       <g transform="translate(50, 50)">
//         <circle r="25" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="5,5">
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             from="0"
//             to="360"
//             dur="20s"
//             repeatCount="indefinite"
//           />
//         </circle>
//         <circle r="18" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="3,3">
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             from="360"
//             to="0"
//             dur="14s"
//             repeatCount="indefinite"
//           />
//         </circle>
//       </g>
      
//       {/* AI/Automation core */}
//       <g transform="translate(50, 50)">
//         <path
//           d="M-10 -10 L10 10 M-10 10 L10 -10"
//           // stroke="#FFD700"
//            fill = '#AABBFF'
//           strokeWidth="3"
//           strokeLinecap="round"
//         >
//           <animateTransform
//             attributeName="transform"
//             type="scale"
//             values="1;1.2;1"
//             dur="13s"
//             repeatCount="indefinite"
//           />
//         </path>
//       </g>
      
//       {/* Dynamic message lines */}
//       <g>
//         <path d="M15 40 Q 30 20, 45 40" stroke="#FFFFFF" strokeWidth="2" fill="none">
//           <animate
//             attributeName="d"
//             values="M15 40 Q 30 20, 45 40;M15 40 Q 30 60, 45 40;M15 40 Q 30 20, 45 40"
//             dur="13s"
//             repeatCount="indefinite"
//           />
//         </path>
//         <path d="M55 60 Q 70 80, 85 60" stroke="#FFFFFF" strokeWidth="2" fill="none">
//           <animate
//             attributeName="d"
//             values="M55 60 Q 70 80, 85 60;M55 60 Q 70 40, 85 60;M55 60 Q 70 80, 85 60"
//             dur="13s"
//             repeatCount="indefinite"
//           />
//         </path>
//       </g>
      
//       {/* Company name with dynamic effect */}
//       <text
//         x="120"
//         y="60"
//         fontFamily="Arial, sans-serif"
//         fontSize="40"
//         fontWeight="bold"
//         // fill="#4A00E0"
//         fill = '#AABBFF'
//         filter="url(#neonGlow)"
//       >
//         Chatal
//         <animate
//           attributeName="opacity"
//           values="1;0.7;1"
//           dur="13s"
//           repeatCount="indefinite"
//         />
//       </text>
      
//       {/* Tagline */}
//       <text
//         x="120"
//         y="80"
//         fontFamily="Arial, sans-serif"
//         fontSize="14"
//         // fill="#8E2DE2"
//          fill = '#AABBFF'
//       >
//         Automate. Engage. Grow.
//       </text>
//     </svg>
//   )
// }




// import React, { useEffect, useState } from 'react'
// import styles from '../styles/LogoSmall.module.css'

// interface ChatalLogoProps {
//   maxWidth?: number
//   maxHeight?: number
// }

// export const LogoSmall: React.FC<ChatalLogoProps> = ({ maxWidth = 300, maxHeight = 100 }) => {
//   const [dimensions, setDimensions] = useState({ width: maxWidth, height: maxHeight })

//   useEffect(() => {
//     const updateDimensions = () => {
//       const width = Math.min(maxWidth, window.innerWidth * 0.8)
//       const height = (width / maxWidth) * maxHeight
//       setDimensions({ width, height })
//     }

//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)
//     return () => window.removeEventListener('resize', updateDimensions)
//   }, [maxWidth, maxHeight])

//   return (
//     <div className={styles.logoWrapper}>
//       <svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 300 100"
//         preserveAspectRatio="xMidYMid meet"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
        
//       >
//         {/* SVG content remains the same */}
//         {/* ... */}

//         <defs>
//         <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#4A00E0" />
//           <stop offset="100%" stopColor="#8E2DE2" />
//         </linearGradient>
//         <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
//           <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
//           <feMerge>
//             <feMergeNode in="coloredBlur"/>
//             <feMergeNode in="SourceGraphic"/>
//           </feMerge>
//         </filter>
//         <clipPath id="chatBubbleClip">
//           <path d="M10 50 Q 10 10, 50 10 Q 90 10, 90 50 Q 90 90, 50 90 Q 30 90, 20 80 L 5 95 L 15 75 Q 10 65, 10 50" />
//         </clipPath>
//       </defs>
      
//       {/* Main chat bubble */}
//       <g clipPath="url(#chatBubbleClip)">
//         <rect width="100" height="100" fill="url(#bubbleGradient)" />
//         <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)" />
//         <path
//           d="M30 30 Q 50 0, 70 30 Q 100 50, 70 70 Q 50 100, 30 70 Q 0 50, 30 30"
//           fill="rgba(255,255,255,0.1)"
//           transform="rotate(45 50 50)"
//         >
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             from="0 50 50"
//             to="360 50 50"
//             dur="40s"
//             repeatCount="indefinite"
//           />
//         </path>
//       </g>
      
//       {/* Automation representation */}
//       <g transform="translate(50, 50)">
//         <circle r="25" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="5,5">
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             from="0"
//             to="360"
//             dur="20s"
//             repeatCount="indefinite"
//           />
//         </circle>
//         <circle r="18" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="3,3">
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             from="360"
//             to="0"
//             dur="14s"
//             repeatCount="indefinite"
//           />
//         </circle>
//       </g>
      
//       {/* AI/Automation core */}
//       <g transform="translate(50, 50)">
//         <path
//           d="M-10 -10 L10 10 M-10 10 L10 -10"
//           // stroke="#FFD700"
//            fill = '#AABBFF'
//           strokeWidth="3"
//           strokeLinecap="round"
//         >
//           <animateTransform
//             attributeName="transform"
//             type="scale"
//             values="1;1.2;1"
//             dur="13s"
//             repeatCount="indefinite"
//           />
//         </path>
//       </g>
      
//       {/* Dynamic message lines */}
//       <g>
//         <path d="M15 40 Q 30 20, 45 40" stroke="#FFFFFF" strokeWidth="2" fill="none">
//           <animate
//             attributeName="d"
//             values="M15 40 Q 30 20, 45 40;M15 40 Q 30 60, 45 40;M15 40 Q 30 20, 45 40"
//             dur="13s"
//             repeatCount="indefinite"
//           />
//         </path>
//         <path d="M55 60 Q 70 80, 85 60" stroke="#FFFFFF" strokeWidth="2" fill="none">
//           <animate
//             attributeName="d"
//             values="M55 60 Q 70 80, 85 60;M55 60 Q 70 40, 85 60;M55 60 Q 70 80, 85 60"
//             dur="13s"
//             repeatCount="indefinite"
//           />
//         </path>
//       </g>
      
//       {/* Company name with dynamic effect */}
//       <text
//         x="120"
//         y="60"
//         fontFamily="Arial, sans-serif"
//         fontSize="40"
//         fontWeight="bold"
//         // fill="#4A00E0"
//         fill = '#AABBFF'
//         filter="url(#neonGlow)"
//       >
//         Chatal
//         <animate
//           attributeName="opacity"
//           values="1;0.7;1"
//           dur="13s"
//           repeatCount="indefinite"
//         />
//       </text>
      
//       {/* Tagline */}
//       <text
//         x="120"
//         y="80"
//         fontFamily="Arial, sans-serif"
//         fontSize="14"
//         // fill="#8E2DE2"
//          fill = '#AABBFF'
//       >
//         Automate. Engage. Grow.
//       </text>
    
//       </svg>
//     </div>
//   )
// }

