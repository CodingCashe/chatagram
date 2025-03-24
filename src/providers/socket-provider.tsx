"use client"

import type { ReactNode } from "react"
import { useSocket } from "@/hooks/use-socket"

interface SocketProviderProps {
  userId?: string
  children: ReactNode
}

export function SocketProvider({ userId, children }: SocketProviderProps) {
  const { socket, isConnected } = useSocket(userId)

  // This component doesn't render anything visible
  // It just initializes and maintains the socket connection
  return <>{children}</>
}

