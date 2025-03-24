"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useToast } from "./use-toast"

let socket: Socket | null = null

export function useSocket(userId: string | undefined) {
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!userId) return

    // Initialize socket connection if not already established
    if (!socket) {
      const socketInitializer = async () => {
        await fetch("/api/socket")

        socket = io({
          path: "/api/socket",
        })

        socket.on("connect", () => {
          console.log("Socket connected")
          setIsConnected(true)

          // Authenticate with userId
          socket?.emit("authenticate", userId)
        })

        socket.on("disconnect", () => {
          console.log("Socket disconnected")
          setIsConnected(false)
        })

        socket.on("connect_error", (err) => {
          console.error("Connection error:", err)
          toast({
            title: "Connection Error",
            description: "Unable to connect to chat server. Please refresh the page.",
            variant: "destructive",
          })
          setIsConnected(false)
        })
      }

      socketInitializer()
    } else if (socket && userId) {
      // Re-authenticate if we already have a socket but userId changed
      socket.emit("authenticate", userId)
    }

    return () => {
      // We don't disconnect the socket on component unmount
      // because we want to keep the connection alive for background notifications
      // socket?.disconnect();
    }
  }, [userId, toast])

  return {
    socket,
    isConnected,
  }
}

