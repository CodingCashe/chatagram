"use client"

import { useEffect, useRef } from "react"
import { useSocket } from "@/hooks/use-socket"
import { useNotificationStore } from "@/stores/notification-store"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/hooks/use-toast"

interface NotificationListenerProps {
  userId: string
}

export function NotificationListener({ userId }: NotificationListenerProps) {
  const { socket, isConnected } = useSocket(userId)
  const { addNotification, shouldPlaySound } = useNotificationStore()
  const { toast } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element for notification sounds
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/notification.mp3")
    }

    if (!socket || !isConnected) return

    // Listen for new notifications
    const handleNewNotification = (data: any) => {
      console.log("New notification received:", data)

      // Add to notification store
      addNotification({
        id: uuidv4(),
        title: data.title || `New ${data.type} notification`,
        message: data.message,
        type: data.type,
        read: false,
        timestamp: new Date().toISOString(),
      })

      // Show toast notification
      toast({
        title: data.title || `New ${data.type} notification`,
        description: data.message,
      })

      // Play sound if appropriate
      if (shouldPlaySound() && audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("Failed to play notification sound:", err)
        })
      }
    }

    // Listen for automation creation
    const handleAutomationCreated = (data: any) => {
      console.log("Automation created:", data)

      handleNewNotification({
        type: "automation",
        title: "New Automation Created",
        message: `A new automation "${data.name}" was created by ${data.userName || "a user"}`,
      })
    }

    // Listen for new user registration
    const handleNewUser = (data: any) => {
      console.log("New user registered:", data)

      handleNewNotification({
        type: "user",
        title: "New User Registered",
        message: `${data.name || "A new user"} has registered on the platform`,
      })
    }

    // Listen for subscription changes
    const handleSubscriptionChanged = (data: any) => {
      console.log("Subscription changed:", data)

      handleNewNotification({
        type: "subscription",
        title: "Subscription Update",
        message: `${data.userName || "A user"} has ${data.action} to ${data.plan} plan`,
      })
    }

    socket.on("new_notification", handleNewNotification)
    socket.on("automation_created", handleAutomationCreated)
    socket.on("new_user", handleNewUser)
    socket.on("subscription_changed", handleSubscriptionChanged)

    return () => {
      socket.off("new_notification", handleNewNotification)
      socket.off("automation_created", handleAutomationCreated)
      socket.off("new_user", handleNewUser)
      socket.off("subscription_changed", handleSubscriptionChanged)
    }
  }, [socket, isConnected, addNotification, toast, shouldPlaySound])

  return null // This component doesn't render anything
}

