import React from 'react'

interface WarningProps {
  className?: string;
}

export const Warningx: React.FC<WarningProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 9v2m0 4v.01m0 4v2m0-10h2m-2 0h-2"/>
    </svg>
  )
}

