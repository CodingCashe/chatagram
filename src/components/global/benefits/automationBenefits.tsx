"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const benefits = [
  {
    emoji: "",
    title: "Enhanced customer Journey",
    description: "Let AI deal with the task of converting potential customers",
    image: "/instagram-automation-5.svg",
  },
  {
    emoji: "",
    title: "Analyze",
    description: "Get sentiment analysis in real time",
    image: "/instagram-automation-4.svg",
  },
  {
    emoji: "",
    title: "Save Time",
    description: "Handle repetitive tasks automatically, freeing up your time for more important work.",
    image: "/instagram-automation-1.svg",
  },
  {
    emoji: "",
    title: "Ensure Consistency",
    description: "Perform tasks consistently every time, reducing human error and variability.",
    image: "/instagram-automation-3.svg",
  },
]

export default function AutomationBenefits() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
    }, 8000) // Change every 8 seconds

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

