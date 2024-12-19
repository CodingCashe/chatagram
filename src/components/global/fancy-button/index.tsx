'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export const FancyHomeButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/">
      <div
        className="relative w-10 h-10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#4299e1"
            strokeWidth="2"
            className={`transform transition-transform duration-2000 ${
              isHovered ? 'scale-100' : 'scale-90'
            }`}
          />
          <path
            d="M50 25 L25 50 L35 50 L35 70 L65 70 L65 50 L75 50 Z"
            fill="#4299e1"
            className={`transform transition-transform duration-300 ${
              isHovered ? 'translate-y-1' : 'translate-y-0'
            }`}
            filter="url(#glow)"
          />
        </svg>
        <div
          className={`absolute inset-0 bg-blue-400 rounded-full opacity-0 transition-opacity duration-300 ${
            isHovered ? 'animate-ping opacity-20' : ''
          }`}
        ></div>
      </div>
    </Link>
  )
}

