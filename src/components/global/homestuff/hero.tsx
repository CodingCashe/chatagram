'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Zap, BarChart } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
      <div className="max-w-2xl mb-10 lg:mb-0 z-10">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
          Revolutionize Your <span className="text-[#2563EB]">Instagram DMs</span> with AI-Powered Automation
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Boost engagement, save time, and grow your audience with Chatal cutting-edge DM automation tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-[#2563EB] hover:bg-[#2563EB]">
          <Link href="/dashboard">Get Started</Link> <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </div>
      <div className="w-full max-w-lg relative">
        <InstagramAutomationSVG animationStep={animationStep} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <FeatureBubble icon={MessageSquare} label="Smart Replies" delay={0} />
          <FeatureBubble icon={Zap} label="Instant Automation" delay={1} />
          <FeatureBubble icon={BarChart} label="Detailed Analytics" delay={2} />
        </div>
      </div>
    </section>
  )
}

function InstagramAutomationSVG({ animationStep }: { animationStep: number }) {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto filter drop-shadow-xl">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#833AB4" />
          <stop offset="50%" stopColor="#FD1D1D" />
          <stop offset="100%" stopColor="#FCB045" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="50" y="50" width="300" height="200" rx="20" fill="#fff" stroke="url(#grad1)" strokeWidth="4" />
      <circle cx="200" cy="100" r="30" fill="url(#grad1)" filter="url(#glow)">
        <animate attributeName="r" values="30;32;30" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M185 95 h30 M200 80 v30" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <g className="messages">
        <g transform={`translate(${animationStep === 0 ? 0 : -400}, 0)`}>
          <rect x="80" y="150" width="240" height="40" rx="10" fill="#f3f4f6" />
          <circle cx="100" cy="170" r="10" fill="#833AB4" />
          <rect x="120" y="165" width="180" height="10" rx="5" fill="#e5e7eb" />
          <path d="M340 170 l-20 -10 v20 z" fill="url(#grad1)">
            <animate attributeName="opacity" values="0;1;0" dur="1s" begin={`${animationStep * 0.75}s`} repeatCount="1" />
          </path>
        </g>
        <g transform={`translate(${animationStep === 1 ? 0 : 400}, 30)`}>
          <rect x="80" y="150" width="240" height="40" rx="10" fill="#f3f4f6" />
          <circle cx="100" cy="170" r="10" fill="#FD1D1D" />
          <rect x="120" y="165" width="140" height="10" rx="5" fill="#e5e7eb" />
          <path d="M340 170 l-20 -10 v20 z" fill="url(#grad1)">
            <animate attributeName="opacity" values="0;1;0" dur="1s" begin={`${animationStep * 0.75 + 0.25}s`} repeatCount="1" />
          </path>
        </g>
      </g>
      <circle cx="320" cy="70" r="15" fill="#FCB045">
        <animate attributeName="r" values="15;17;15" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M313 70 h14 M320 63 v14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function FeatureBubble({ icon: Icon, label, delay }: { icon: React.ElementType, label: string, delay: number }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center justify-center flex-col animate-bounce" style={{ animationDelay: `${delay * 0.2}s` }}>
      <Icon className="h-8 w-8 text-[#2563EB]" />
      <span className="text-xs font-semibold mt-1 text-gray-800">{label}</span>
    </div>
  )
}

