// 'use client'
// import { onOAuthInstagram } from '@/actions/integrations'
// import { onUserInfo } from '@/actions/user'
// import { Button } from '@/components/ui/button'
// import { useQuery } from '@tanstack/react-query'
// import React from 'react'

// type Props = {
//   title: string
//   description: string
//   icon: React.ReactNode
//   strategy: 'INSTAGRAM' | 'CRM'
// }

// const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
//   const onInstaOAuth = () => onOAuthInstagram(strategy)

//   const { data } = useQuery({
//     queryKey: ['user-profile'],
//     queryFn: onUserInfo,
//   })

//   const integrated = data?.data?.integrations.find(
//     (integration) => integration.name === strategy
//   )

//   return (
//     <div className="border-2 border-[#3352CC] rounded-2xl gap-4 p-5 flex flex-col sm:flex-row items-center sm:items-start">
//       {/* Icon Section */}
//       <div className="flex-shrink-0 mb-2 sm:mb-0">{icon}</div>

//       {/* Title and Description */}
//       <div className="flex flex-col flex-1 text-center sm:text-left">
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-[#9D9D9D] text-base">{description}</p>
//       </div>

//       {/* Button Section */}
//       <Button
//         onClick={onInstaOAuth}
//         disabled={integrated?.name === strategy}
//         className="bg-gradient-to-br text-white rounded-full text-lg px-6 py-2 from-[#3352CC] font-medium to-[#1C2D70] hover:opacity-70 transition duration-100"
//       >
//         {integrated ? 'Connected' : 'Connect'}
//       </Button>
//     </div>
//   )
// }

// export default IntegrationCard


"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import type * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { onOAuthInstagram } from "@/actions/integrations"
import { onUserInfo } from "@/actions/user"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  description: string
  icon: React.ReactNode
  strategy: "INSTAGRAM" | "CRM"
}

const FloatingIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  const iconRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (iconRef.current) {
      iconRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
      iconRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <mesh ref={iconRef} scale={[viewport.width / 15, viewport.width / 15, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial transparent>
        <canvasTexture attach="map" image={renderToCanvas(icon)} />
      </meshBasicMaterial>
    </mesh>
  )
}

const renderToCanvas = (icon: React.ReactNode): HTMLCanvasElement => {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.fillStyle = "white"
    ctx.font = "64px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(icon as string, 64, 64)
  }
  return canvas
}

const IntegrationCard: React.FC<Props> = ({ description, icon, strategy, title }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  })

  useEffect(() => {
    const integrated = data?.data?.integrations.find((integration) => integration.name === strategy)
    setIsConnected(!!integrated)
  }, [data, strategy])

  const onInstaOAuth = async () => {
    await onOAuthInstagram(strategy)
    setIsConnected(true)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      x.set(mouseX - rect.width / 2)
      y.set(mouseY - rect.height / 2)
    }
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  useEffect(() => {
    if (isHovered) {
      controls.start({
        scale: 1.05,
        transition: { duration: 0.3 },
      })
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.3 },
      })
    }
  }, [isHovered, controls])

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden border-2 border-[#3352CC] rounded-2xl p-6 bg-gradient-to-br from-[#1C2D70] to-[#3352CC] text-white shadow-2xl"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 flex flex-col items-center sm:items-start sm:flex-row gap-6">
        <div className="w-24 h-24 relative">
          <Canvas>
            <FloatingIcon icon={icon} />
          </Canvas>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-[#D1D5DB] text-lg">{description}</p>
        </div>
        <Button
          onClick={onInstaOAuth}
          disabled={isConnected}
          className={`
            relative overflow-hidden rounded-full text-lg px-8 py-3 font-medium
            ${
              isConnected
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-[#3352CC] to-[#1C2D70] hover:from-[#1C2D70] hover:to-[#3352CC]"
            }
            transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3352CC]
          `}
        >
          <span className="relative z-10">{isConnected ? "Connected" : "Connect"}</span>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={isConnected ? { scale: 30, opacity: 0.2 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </Button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#3352CC] opacity-30" />
      <motion.div
        className="absolute inset-0 bg-[url('/particle-bg.png')] bg-repeat"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration: 20,
        }}
      />
    </motion.div>
  )
}

export default IntegrationCard

