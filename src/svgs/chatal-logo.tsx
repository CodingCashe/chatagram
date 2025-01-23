import type React from "react"

interface ChatalLogoProps {
  size?: number
  primaryColor?: string
  accentColor?: string
}

const ChatalLogo: React.FC<ChatalLogoProps> = ({ size = 200, primaryColor = "#1a1a2e", accentColor = "#4a00e0" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chatal Logo"
    >
      {/* Main Circle */}
      <circle cx="100" cy="100" r="90" fill={primaryColor} />

      {/* Outer Pattern */}
      <path d="M100 10 A90 90 0 0 1 190 100 L170 100 A70 70 0 0 0 100 30 Z" fill={accentColor} />
      <path d="M190 100 A90 90 0 0 1 100 190 L100 170 A70 70 0 0 0 170 100 Z" fill={accentColor} />
      <path d="M100 190 A90 90 0 0 1 10 100 L30 100 A70 70 0 0 0 100 170 Z" fill={accentColor} />

      {/* Inner Pattern (Simplified Chat Bubble) */}
      <path d="M70 90 L100 70 L130 90 L130 120 L100 140 L70 120 Z" fill={accentColor} />

      {/* Central Dot */}
      <circle cx="100" cy="100" r="10" fill={primaryColor} />
    </svg>
  )
}

export default ChatalLogo

