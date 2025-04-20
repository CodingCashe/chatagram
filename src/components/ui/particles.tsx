"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export const Particles = ({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const { theme } = useTheme()

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()
    animate()
    window.addEventListener("resize", initCanvas)

    return () => {
      window.removeEventListener("resize", initCanvas)
    }
  }, [])

  useEffect(() => {
    initCanvas()
  }, [refresh, theme])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = []
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
    }
  }

  const circleParams = () => {
    const baseColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0"
    const colorVariation =
      theme === "dark" ? ["70, 130, 255", "255, 70, 180", "120, 255, 200"] : ["0, 0, 255", "255, 0, 0", "0, 255, 0"]
    const colorIndex = Math.floor(Math.random() * colorVariation.length)
    const color = Math.random() > 0.5 ? baseColor : colorVariation[colorIndex]

    return {
      x: Math.floor(Math.random() * canvasSize.current.w),
      y: Math.floor(Math.random() * canvasSize.current.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 1,
      alpha: 0,
      targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
      color,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
    }
  }

  const drawParticles = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)

      if (circles.current.length < quantity) {
        for (let i = 0; i < quantity - circles.current.length; i++) {
          circles.current.push(circleParams())
        }
      }

      for (let i = 0; i < circles.current.length; i++) {
        const circle = circles.current[i]

        // Handle alpha
        if (circle.alpha < circle.targetAlpha) {
          circle.alpha += 0.01
        } else if (circle.alpha > circle.targetAlpha) {
          circle.alpha -= 0.01
        }

        // Update position with slight movement
        circle.x += circle.dx
        circle.y += circle.dy
        circle.rotation += circle.rotationSpeed

        // Bounce off edges
        if (circle.x < 0 || circle.x > canvasSize.current.w) {
          circle.dx = -circle.dx
        }
        if (circle.y < 0 || circle.y > canvasSize.current.h) {
          circle.dy = -circle.dy
        }

        // Draw the circle
        context.current.save()
        context.current.beginPath()
        context.current.translate(circle.x + circle.translateX, circle.y + circle.translateY)
        context.current.rotate(circle.rotation)
        context.current.translate(-(circle.x + circle.translateX), -(circle.y + circle.translateY))
        context.current.fillStyle = `rgba(${circle.color}, ${circle.alpha})`
        context.current.fillRect(
          circle.x - circle.size / 2 + circle.translateX,
          circle.y - circle.size / 2 + circle.translateY,
          circle.size,
          circle.size,
        )
        context.current.restore()
      }
    }
  }

  const animate = () => {
    drawParticles()
    requestAnimationFrame(animate)
  }

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
