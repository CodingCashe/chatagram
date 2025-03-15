"use client"

import { useRef, useEffect } from "react"
import { MessageCircle, Users, ShoppingCart, Clock, BarChart3, Zap } from "lucide-react"

const stats = [
  {
    icon: <MessageCircle className="h-4 w-4 text-blue-400" />,
    label: "Messages Automated",
    value: "5.2M+",
  },
  {
    icon: <Users className="h-4 w-4 text-blue-400" />,
    label: "Active Users",
    value: "2,000+",
  },
  {
    icon: <ShoppingCart className="h-4 w-4 text-blue-400" />,
    label: "Sales Generated",
    value: "$12M+",
  },
  {
    icon: <Clock className="h-4 w-4 text-blue-400" />,
    label: "Hours Saved",
    value: "120,000+",
  },
  {
    icon: <BarChart3 className="h-4 w-4 text-blue-400" />,
    label: "Conversion Rate",
    value: "35%",
  },
  {
    icon: <Zap className="h-4 w-4 text-blue-400" />,
    label: "Response Time",
    value: "<1 min",
  },
]

export default function StatsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    let animationId: number
    let position = 0

    const scroll = () => {
      if (!scrollElement) return

      position += 0.5
      if (position >= scrollElement.scrollWidth / 2) {
        position = 0
      }

      scrollElement.scrollLeft = position
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="bg-blue-950/30 border-y border-blue-900/30 py-3 overflow-hidden">
      <div ref={scrollRef} className="flex items-center space-x-12 overflow-x-hidden whitespace-nowrap w-full">
        {[...stats, ...stats].map((stat, index) => (
          <div key={index} className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center">{stat.icon}</div>
            <span className="text-blue-400 font-medium">{stat.value}</span>
            <span className="text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

