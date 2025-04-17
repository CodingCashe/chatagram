// "use client"

// import { useEffect, useState } from "react"
// import { Bell } from "lucide-react"
// import { getUnreadMessageCount } from "@/actions/collab/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"

// type NotificationBadgeProps = {
//   className?: string
// }

// export function NotificationBadge({ className }: NotificationBadgeProps) {
//   const [unreadCount, setUnreadCount] = useState(0)
//   const [userId, setUserId] = useState<string | null>(null)

//   // Fetch current user
//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const user = await onUserInfor()
//       if (user.data?.id) {
//         setUserId(user.data.id)
//       }
//     }

//     fetchCurrentUser()
//   }, [])

//   // Fetch unread message count
//   useEffect(() => {
//     const fetchUnreadCount = async () => {
//       if (!userId) return

//       const { status, data } = await getUnreadMessageCount()

//       if (status === 200 && data) {
//         setUnreadCount(data.unreadCount)
//       }
//     }

//     if (userId) {
//       fetchUnreadCount()
//     }
//   }, [userId])

//   // Set up real-time subscription for notifications
//   useEffect(() => {
//     if (!userId) return

//     // Subscribe to user's notification channel
//     const channel = pusherClient.subscribe(`user-${userId}`)

//     // Handle notifications
//     channel.bind("notification", (data: any) => {
//       if (data.type === "chat") {
//         // Increment unread count
//         setUnreadCount((prev) => prev + 1)
//       }
//     })

//     return () => {
//       pusherClient.unsubscribe(`user-${userId}`)
//     }
//   }, [userId])

//   if (unreadCount === 0) {
//     return <Bell className={`h-5 w-5 ${className || ""}`} />
//   }

//   return (
//     <div className="relative">
//       <Bell className={`h-5 w-5 ${className || ""}`} />
//       <span className="absolute -top-1 -right-1 flex h-4 w-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
//         {unreadCount > 9 ? "9+" : unreadCount}
//       </span>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { getUserNotifications, markNotificationsAsRead } from "@/actions/collab/notification-actions"
import { pusherClient } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"
import { toast } from "@/hooks/use-toast"

type Notification = {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

export function NotificationsPopover({ className }: { className?: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

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

  // Fetch notifications and unread count
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return

      setLoading(true)

      try {
        // Fetch notifications
        const { status, data } = await getUserNotifications()

        if (status === 200 && data) {
          setNotifications(data)

          // Calculate unread count
          const unreadNotifications = data.filter((n) => !n.read).length
          setUnreadCount(unreadNotifications)
        }
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchData()
    }
  }, [userId])

  // Set up real-time subscription for notifications
  useEffect(() => {
    if (!userId || !pusherClient) return

    // Subscribe to user's notification channel
    const channel = pusherClient.subscribe(`user-${userId}`)

    // Handle new notifications
    channel.bind("notification", (data: any) => {
      // Add the new notification to the list
      const newNotification = {
        id: data.id || `temp-${Date.now()}`,
        title: data.title,
        message: data.message,
        type: data.type,
        read: false,
        createdAt: new Date().toISOString(),
      }

      setNotifications((prev) => [newNotification, ...prev])

      // Increment unread count
      setUnreadCount((prev) => prev + 1)

      // Show toast notification if popover is closed
      if (!open) {
        toast({
          title: data.title,
          description: data.message,
        })
      }
    })

    return () => {
      pusherClient.unsubscribe(`user-${userId}`)
    }
  }, [userId, open])

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    if (!userId || notifications.length === 0) return

    try {
      const { status } = await markNotificationsAsRead()

      if (status === 200) {
        // Update local state
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        setUnreadCount(0)
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error)
    }
  }

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSecs < 60) return "just now"
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`

    return date.toLocaleDateString()
  }

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        // Mark as read when opening the popover
        if (isOpen && unreadCount > 0) {
          handleMarkAllAsRead()
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className={`h-5 w-5 ${className || ""}`} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-gray-900 border-gray-800 text-white" align="end">
        <div className="flex items-center justify-between border-b border-gray-800 p-3">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs hover:bg-gray-800"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading notifications...</div>
          ) : notifications.length > 0 ? (
            <div className="grid gap-1 p-1">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-md p-3 text-left text-sm transition-colors hover:bg-gray-800",
                    !notification.read && "bg-gray-800/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid gap-0.5">
                      <div className="font-medium">{notification.title}</div>
                      <div className="line-clamp-1 text-xs text-gray-400">{notification.message}</div>
                      <div className="line-clamp-1 text-xs text-gray-500">
                        {formatRelativeTime(notification.createdAt)}
                      </div>
                    </div>
                    {!notification.read && <div className="flex h-2 w-2 shrink-0 rounded-full bg-red-500" />}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">No notifications</div>
          )}
        </ScrollArea>
        <div className="border-t border-gray-800 p-2">
          <Button variant="ghost" size="sm" className="w-full justify-center hover:bg-gray-800">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
