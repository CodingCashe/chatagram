"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Instagram, MessageCircle, Bot, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden" style={{ minHeight: "calc(100vh - 80px)" }}>
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 bg-blue-600/10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.15) 0%, rgba(0, 0, 0, 0) 50%)`,
        }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 py-1.5 px-4 bg-blue-900/50 text-blue-400 border-blue-700 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Powered by AI
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                <span className="block text-white">Automate Your</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Instagram DMs
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Engage with your audience 24/7, convert followers into customers, and scale your Instagram presence with
                our intelligent DM automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/onboarding">Get Started Free</Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-700 text-blue-400 hover:bg-blue-900/20">
                  Watch Demo
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-slate-400">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      IG
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                      FB
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                      SM
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                      YT
                    </div>
                  </div>
                </div>
                <span>
                  Trusted by <span className="text-blue-400 font-medium">2,000+</span> businesses & creators
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right content - App preview */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative mx-auto w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-xl overflow-hidden">
                {/* Status bar */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-950 flex items-center justify-between px-6">
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full"></div>
                  <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                </div>

                {/* Instagram DM interface */}
                <div className="pt-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-white">fashion_brand</div>
                        <div className="text-xs text-slate-400">Active now</div>
                      </div>
                    </div>
                    <Instagram className="h-5 w-5 text-blue-400" />
                  </div>

                  {/* Chat area */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-950">
                    {/* Incoming message */}
                    <div className="flex items-end">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-2"></div>
                      <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-2 max-w-[70%]">
                        <p className="text-sm text-white">
                          Hi! can I customize my replies?
                        </p>
                      </div>
                    </div>

                    {/* Outgoing message */}
                    <div className="flex items-end justify-end">
                      <div className="bg-blue-600 rounded-2xl rounded-br-none px-4 py-2 max-w-[70%]">
                        <p className="text-sm text-white">Hey there! 👋 Thanks for reaching out!</p>
                      </div>
                    </div>

                    <div className="flex items-end justify-end">
                      <div className="bg-blue-600 rounded-2xl rounded-br-none px-4 py-2 max-w-[70%]">
                        <p className="text-sm text-white">Yes, you make a request and consider it done!</p>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex items-end">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-2"></div>
                      <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>
                          <div
                            className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Assistant Panel */}
                  <div className="p-3 bg-slate-900 border-t border-slate-800">
                    <div className="bg-blue-900/30 rounded-lg p-2 mb-2 flex items-center">
                      <Bot className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-xs text-blue-400">AI Assistant Active</span>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-800 border-none rounded-l-full px-4 py-2 text-sm text-white focus:outline-none"
                      />
                      <button className="bg-blue-600 rounded-r-full px-3 py-2">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>

              {/* Feature highlights */}
              <div className="absolute left-0 sm:-left-20 top-1/4 bg-slate-900/90 backdrop-blur-sm border border-blue-900/50 rounded-lg p-3 shadow-lg shimmerBorder">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">AI Responses</div>
                    <div className="text-xs text-slate-400">Instant & personalized</div>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 sm:-right-16 bottom-1/3 bg-slate-900/90 backdrop-blur-sm border border-blue-900/50 rounded-lg p-3 shadow-lg shimmerBorder">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-2">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">24/7 Engagement</div>
                    <div className="text-xs text-slate-400">Never miss a message</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

