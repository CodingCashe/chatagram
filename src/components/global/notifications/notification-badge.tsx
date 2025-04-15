"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { getUnreadMessageCount } from "@/actions/collab/chat-actions"
import { pusherClient } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"

type NotificationBadgeProps = {
  className?: string
}

export function NotificationBadge({ className }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await onUserInfor()
      if (user.data?.id) {
        setUserId(user.data.id)
      }
    }

    fetchCurrentUser()
  }, [])

  // Fetch unread message count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!userId) return

      const { status, data } = await getUnreadMessageCount()

      if (status === 200 && data) {
        setUnreadCount(data.unreadCount)
      }
    }

    if (userId) {
      fetchUnreadCount()
    }
  }, [userId])

  // Set up real-time subscription for notifications
  useEffect(() => {
    if (!userId) return

    // Subscribe to user's notification channel
    const channel = pusherClient.subscribe(`user-${userId}`)

    // Handle notifications
    channel.bind("notification", (data: any) => {
      if (data.type === "chat") {
        // Increment unread count
        setUnreadCount((prev) => prev + 1)
      }
    })

    return () => {
      pusherClient.unsubscribe(`user-${userId}`)
    }
  }, [userId])

  if (unreadCount === 0) {
    return <Bell className={`h-5 w-5 ${className || ""}`} />
  }

  return (
    <div className="relative">
      <Bell className={`h-5 w-5 ${className || ""}`} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    </div>
  )
}
