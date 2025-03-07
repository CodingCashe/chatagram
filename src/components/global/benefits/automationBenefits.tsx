"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const benefits = [
  {
    emoji: "⚡",
    title: "Boost Efficiency",
    description: "Streamline your workflow, reducing manual tasks and boosting overall productivity.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    emoji: "🎯",
    title: "Trigger-based Actions",
    description: "Set up automations to respond to specific keywords or events, ensuring timely and relevant actions.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    emoji: "⏱️",
    title: "Save Time",
    description: "Handle repetitive tasks automatically, freeing up your time for more important work.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    emoji: "🔄",
    title: "Ensure Consistency",
    description: "Perform tasks consistently every time, reducing human error and variability.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function AutomationBenefits() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-4xl bg-[#1D1D1D] p-6 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="w-1/2 pr-4">
          <div className="flex items-center mb-2">
            <span className="text-4xl mr-2">{benefits[currentIndex].emoji}</span>
            <h3 className="text-xl font-semibold text-white/90">{benefits[currentIndex].title}</h3>
          </div>
          <p className="text-white/70">{benefits[currentIndex].description}</p>
        </div>
        <div className="w-1/2 relative h-48">
          <Image
            src={benefits[currentIndex].image || "/placeholder.svg"}
            alt={benefits[currentIndex].title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {benefits.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? "bg-blue-500" : "bg-gray-500"}`}
          />
        ))}
      </div>
    </div>
  )
}

