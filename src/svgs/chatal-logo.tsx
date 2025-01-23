import type React from "react"

interface ChatalLogoProps {
  width?: number
  height?: number
  color?: string
}

const ChatalLogo: React.FC<ChatalLogoProps> = ({ width = 100, height = 100, color = "#0066cc" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="10" fill={color} />
      <path d="M20 30H80V70L60 50H20V30Z" fill="white" stroke="white" strokeWidth="2" />
      <circle cx="35" cy="50" r="5" fill={color} />
      <circle cx="50" cy="50" r="5" fill={color} />
      <circle cx="65" cy="50" r="5" fill={color} />
    </svg>
  )
}

export default ChatalLogo

