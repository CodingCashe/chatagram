"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

type QueuedMessage = {
  id: string
  content: string
  senderId: string
  receiverId: string | null
  isFromAdmin: boolean
  createdAt: string
  pendingId: string
  attempts: number
}

export function useOfflineQueue(socket: any, isConnected: boolean, userId: string) {
  const [queue, setQueue] = useState<QueuedMessage[]>([])
  const [isSending, setIsSending] = useState(false)

  // Load queue from localStorage on mount
  useEffect(() => {
    const savedQueue = localStorage.getItem(`message_queue_${userId}`)
    if (savedQueue) {
      try {
        setQueue(JSON.parse(savedQueue))
      } catch (e) {
        console.error("Failed to parse saved message queue:", e)
      }
    }
  }, [userId])

  // Save queue to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`message_queue_${userId}`, JSON.stringify(queue))
  }, [queue, userId])

  // Process queue when connection is established
  useEffect(() => {
    if (isConnected && queue.length > 0 && !isSending) {
      processQueue()
    }
  }, [isConnected, queue, isSending])

  const addToQueue = (message: Omit<QueuedMessage, "id" | "pendingId" | "attempts">) => {
    const pendingId = uuidv4()
    setQueue((prev) => [
      ...prev,
      {
        ...message,
        id: uuidv4(), // Temporary ID until server assigns one
        pendingId,
        attempts: 0,
      },
    ])
    return pendingId
  }

  const processQueue = async () => {
    if (queue.length === 0 || !isConnected || !socket) return

    setIsSending(true)
    const currentMessage = queue[0]

    // If message has been attempted too many times, remove it
    if (currentMessage.attempts >= 5) {
      setQueue((prev) => prev.slice(1))
      setIsSending(false)
      return
    }

    try {
      // Emit message to socket with a promise wrapper
      const result = await new Promise((resolve, reject) => {
        socket.emit("send_message", {
          content: currentMessage.content,
          senderId: currentMessage.senderId,
          receiverId: currentMessage.receiverId,
          isFromAdmin: currentMessage.isFromAdmin,
          pendingId: currentMessage.pendingId,
        })

        // Set a timeout in case we don't get a response
        const timeout = setTimeout(() => {
          reject(new Error("Message send timeout"))
        }, 5000)

        // Listen for confirmation
        const handleMessageSent = (data: any) => {
          clearTimeout(timeout)
          socket.off("message_sent", handleMessageSent)
          resolve(data)
        }

        socket.on("message_sent", handleMessageSent)
      })

      // If successful, remove from queue
      setQueue((prev) => prev.slice(1))
    } catch (error) {
      console.error("Failed to send message:", error)
      // Increment attempt count
      setQueue((prev) => [{ ...prev[0], attempts: prev[0].attempts + 1 }, ...prev.slice(1)])
    } finally {
      setIsSending(false)
    }
  }

  return {
    addToQueue,
    isSending,
    queueLength: queue.length,
    pendingMessages: queue,
  }
}

