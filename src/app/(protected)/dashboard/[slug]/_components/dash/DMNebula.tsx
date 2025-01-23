"use client"

import type React from "react"
import { useMemo, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { format, parseISO } from "date-fns"
import type { EngagementData } from "@/types/dashboard"

interface DMNebulaProps {
  data: EngagementData[]
}

const DMNebula: React.FC<DMNebulaProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const nebulaData = useMemo(() => {
    const maxDMs = Math.max(...data.map((d) => d.dms))
    return data.map((day) => ({
      ...day,
      intensity: day.dms / maxDMs,
    }))
  }, [data])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawNebula = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particleCount = 1000
      const particles: { x: number; y: number; size: number; color: string }[] = []

      nebulaData.forEach((day, index) => {
        const x = (index / (nebulaData.length - 1)) * canvas.width
        const y = canvas.height / 2

        const particlesForDay = Math.floor(day.intensity * particleCount)

        for (let i = 0; i < particlesForDay; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 100 * day.intensity
          particles.push({
            x: x + Math.cos(angle) * distance,
            y: y + Math.sin(angle) * distance,
            size: Math.random() * 2 + 1,
            color: `rgba(59, 130, 246, ${day.intensity})`,
          })
        }
      })

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })
    }

    const animate = () => {
      drawNebula()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [nebulaData])

  return (
    <div ref={containerRef} className="relative w-full h-64 sm:h-80">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-400">
        {nebulaData
          .filter((_, i) => i % Math.floor(nebulaData.length / 5) === 0)
          .map((day) => (
            <div key={day.date}>{format(parseISO(day.date), "MMM d")}</div>
          ))}
      </div>
      <motion.div
        className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 rounded px-2 py-1 text-sm text-blue-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Total DMs: {nebulaData.reduce((sum, day) => sum + day.dms, 0)}
      </motion.div>
    </div>
  )
}

export default DMNebula

