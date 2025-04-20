"use client"

import { cn } from "@/lib/utils"

interface DoubleTickSpinnerProps {
  isSpinning?: boolean
  className?: string
  color?: string
}

export default function DoubleTickSpinner({ isSpinning = true, className, color }: DoubleTickSpinnerProps) {
  // Default colors if not provided
  const primaryColor = color || "text-blue-600"
  const secondaryColor = color === "text-yellow-400" ? "text-yellow-300" : "text-green-500"

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Spinning circles container */}
      <div className={cn("absolute inset-0", isSpinning && "animate-spin-slow")}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Complete circles that will be masked */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className={primaryColor} />

          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 3"
            className={secondaryColor}
          />
        </svg>
      </div>

      {/* Stationary ticks container - Moved up by adjusting the transform */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Mask to hide part of the circle */}
          <defs>
            <mask id="tickMask">
              <rect width="100" height="100" fill="white" />
              {/* The black parts of the mask will hide the circle - Moved up by adjusting y position */}
              <g transform="translate(25, 45)">
                {/* First stylized tick mask */}
                <path
                  d="M 5,10 C 10,15 15,20 25,28 C 35,15 45,0 60,-15"
                  fill="none"
                  stroke="black"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Second stylized tick mask */}
                <path
                  d="M 15,10 C 20,15 25,20 35,28 C 45,15 55,0 70,-15"
                  fill="none"
                  stroke="black"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </mask>
          </defs>

          {/* White background for the mask area - Moved up by adjusting y position */}
          <g transform="translate(25, 45)">
            <path
              d="M 5,10 C 10,15 15,20 25,28 C 35,15 45,0 60,-15"
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 15,10 C 20,15 25,20 35,28 C 45,15 55,0 70,-15"
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Stylized double tick marks - Moved up by adjusting y position */}
          <g transform="translate(25, 45)">
            {/* First stylized tick - Blue */}
            <path
              d="M 5,10 C 10,15 15,20 25,28 C 35,15 45,0 60,-15"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={primaryColor}
            />

            {/* Second stylized tick - Green */}
            <path
              d="M 15,10 C 20,15 25,20 35,28 C 45,15 55,0 70,-15"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={secondaryColor}
            />
          </g>
        </svg>
      </div>

      {/* This div applies the mask to the spinning circles */}
      <div className="absolute inset-0 [mask-image:url('#tickMask')]">
        <div className={cn("w-full h-full", isSpinning && "animate-spin-slow")}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className={primaryColor} />

            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 3"
              className={secondaryColor}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

