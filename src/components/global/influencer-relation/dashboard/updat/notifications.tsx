// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { motion, AnimatePresence } from "framer-motion"
// import { Bell, Check, Clock, MessageSquare, Heart, DollarSign, Zap } from "lucide-react"

// export function NotificationsPopover() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "New message from EcoStyle",
//       description: "We'd like to discuss a potential collaboration...",
//       time: "2 minutes ago",
//       read: false,
//       type: "message",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "ES",
//     },
//     {
//       id: 2,
//       title: "Campaign approved",
//       description: "Your BeautyGlow campaign has been approved!",
//       time: "1 hour ago",
//       read: false,
//       type: "campaign",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "BG",
//     },
//     {
//       id: 3,
//       title: "Payment received",
//       description: "You received $1,250 from TechGadgets",
//       time: "3 hours ago",
//       read: true,
//       type: "payment",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "TG",
//     },
//     {
//       id: 4,
//       title: "New opportunity",
//       description: "FitLife is looking for fitness influencers",
//       time: "Yesterday",
//       read: true,
//       type: "opportunity",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "FL",
//     },
//     {
//       id: 5,
//       title: "Content milestone",
//       description: "Your latest post reached 10k likes!",
//       time: "2 days ago",
//       read: true,
//       type: "milestone",
//       avatar: "/placeholder.svg?height=32&width=32",
//       initials: "IG",
//     },
//   ])

//   const unreadCount = notifications.filter((n) => !n.read).length

//   const markAsRead = (id: number) => {
//     setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
//   }

//   const markAllAsRead = () => {
//     setNotifications(notifications.map((n) => ({ ...n, read: true })))
//   }

//   const getIconForType = (type: string) => {
//     switch (type) {
//       case "message":
//         return <MessageSquare className="h-4 w-4 text-blue-500" />
//       case "campaign":
//         return <Check className="h-4 w-4 text-emerald-500" />
//       case "payment":
//         return <DollarSign className="h-4 w-4 text-green-500" />
//       case "opportunity":
//         return <Zap className="h-4 w-4 text-amber-500" />
//       case "milestone":
//         return <Heart className="h-4 w-4 text-pink-500" />
//       default:
//         return <Bell className="h-4 w-4 text-muted-foreground" />
//     }
//   }

//   return (
//     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-[1.2rem] w-[1.2rem]" />
//           <AnimatePresence>
//             {unreadCount > 0 && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
//               >
//                 {unreadCount}
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <span className="sr-only">Notifications</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-80" align="end">
//         <DropdownMenuLabel className="flex items-center justify-between">
//           <span>Notifications</span>
//           {unreadCount > 0 && (
//             <Button variant="ghost" size="sm" className="h-auto text-xs px-2 py-1" onClick={markAllAsRead}>
//               Mark all as read
//             </Button>
//           )}
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup className="max-h-[300px] overflow-auto">
//           {notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <DropdownMenuItem
//                 key={notification.id}
//                 className={`flex items-start gap-3 p-3 cursor-pointer ${notification.read ? "opacity-70" : "bg-muted/50"}`}
//                 onClick={() => markAsRead(notification.id)}
//               >
//                 <div className="relative mt-1">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={notification.avatar || "/placeholder.svg"} />
//                     <AvatarFallback>{notification.initials}</AvatarFallback>
//                   </Avatar>
//                   <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
//                     {getIconForType(notification.type)}
//                   </div>
//                 </div>
//                 <div className="flex-1 space-y-1">
//                   <p className="text-sm font-medium leading-none">{notification.title}</p>
//                   <p className="text-xs text-muted-foreground">{notification.description}</p>
//                   <div className="flex items-center pt-1">
//                     <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
//                     <span className="text-xs text-muted-foreground">{notification.time}</span>
//                   </div>
//                 </div>
//                 {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
//               </DropdownMenuItem>
//             ))
//           ) : (
//             <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
//           )}
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem className="cursor-pointer justify-center">View all notifications</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Bell } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { cn } from "@/lib/utils"

// export function NotificationsPopover() {
//   const [notifications, setNotifications] = useState([
//     {
//       id: "1",
//       title: "New Campaign Invitation",
//       description: "FashionBrand has invited you to a new campaign",
//       time: "2 hours ago",
//       read: false,
//     },
//     {
//       id: "2",
//       title: "Content Performance",
//       description: "Your latest post is performing 25% better than average",
//       time: "5 hours ago",
//       read: false,
//     },
//     {
//       id: "3",
//       title: "Payment Received",
//       description: "You received a payment of $1,200 from FitnessGear",
//       time: "1 day ago",
//       read: true,
//     },
//     {
//       id: "4",
//       title: "Milestone Reached",
//       description: "Congratulations! You've reached 125K followers",
//       time: "2 days ago",
//       read: true,
//     },
//   ])

//   const unreadCount = notifications.filter((n) => !n.read).length

//   const markAllAsRead = () => {
//     setNotifications(notifications.map((n) => ({ ...n, read: true })))
//   }

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" size="icon" className="relative">
//           <Bell className="h-4 w-4" />
//           {unreadCount > 0 && (
//             <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//               {unreadCount}
//             </span>
//           )}
//           <span className="sr-only">Notifications</span>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-0" align="end">
//         <div className="flex items-center justify-between border-b p-3">
//           <h4 className="font-medium">Notifications</h4>
//           {unreadCount > 0 && (
//             <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={markAllAsRead}>
//               Mark all as read
//             </Button>
//           )}
//         </div>
//         <ScrollArea className="h-[300px]">
//           {notifications.length > 0 ? (
//             <div className="grid gap-1 p-1">
//               {notifications.map((notification) => (
//                 <button
//                   key={notification.id}
//                   className={cn(
//                     "flex flex-col gap-1 rounded-md p-3 text-left text-sm transition-colors hover:bg-muted",
//                     !notification.read && "bg-muted/50",
//                   )}
//                 >
//                   <div className="flex items-start justify-between gap-2">
//                     <div className="grid gap-0.5">
//                       <div className="font-medium">{notification.title}</div>
//                       <div className="line-clamp-1 text-xs text-muted-foreground">{notification.description}</div>
//                       <div className="line-clamp-1 text-xs text-muted-foreground">{notification.time}</div>
//                     </div>
//                     {!notification.read && <div className="flex h-2 w-2 shrink-0 rounded-full bg-primary" />}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <div className="p-8 text-center text-muted-foreground">No new notifications</div>
//           )}
//         </ScrollArea>
//         <div className="border-t p-2">
//           <Button variant="ghost" size="sm" className="w-full justify-center">
//             View all notifications
//           </Button>
//         </div>
//       </PopoverContent>
//     </Popover>
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
