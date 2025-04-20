"use client"

import { useState, useEffect, useCallback } from "react"

interface NetworkStatusHook {
  isOnline: boolean
  wasOffline: boolean
  lastOffline: number | null
  setWasOffline: (value: boolean) => void
  checkConnection: () => boolean
}

/**
 * Custom hook to manage network connection status
 * Provides online status, whether the user was recently offline,
 * and the timestamp of when they were last offline
 */
export function useNetworkStatus(): NetworkStatusHook {
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [wasOffline, setWasOffline] = useState<boolean>(false)
  const [lastOffline, setLastOffline] = useState<number | null>(null)

  const handleOnline = useCallback(() => {
    if (!isOnline) {
      setWasOffline(true)
    }
    setIsOnline(true)
  }, [isOnline])

  const handleOffline = useCallback(() => {
    setIsOnline(false)
    setLastOffline(Date.now())
  }, [])

  // Check connection status manually (useful for reconnect buttons)
  const checkConnection = useCallback((): boolean => {
    if (typeof navigator !== "undefined") {
      const online = navigator.onLine
      setIsOnline(online)
      if (!online) {
        setLastOffline(Date.now())
      }
      return online
    }
    return true
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize with current online status
      setIsOnline(navigator.onLine)

      // Add event listeners for online/offline events
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      // Clean up event listeners
      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [handleOnline, handleOffline])

  return {
    isOnline,
    wasOffline,
    lastOffline,
    setWasOffline,
    checkConnection,
  }
}

