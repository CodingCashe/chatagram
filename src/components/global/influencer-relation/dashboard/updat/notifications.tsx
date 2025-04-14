"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Check, Clock, MessageSquare, Heart, DollarSign, Zap } from "lucide-react"

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message from EcoStyle",
      description: "We'd like to discuss a potential collaboration...",
      time: "2 minutes ago",
      read: false,
      type: "message",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ES",
    },
    {
      id: 2,
      title: "Campaign approved",
      description: "Your BeautyGlow campaign has been approved!",
      time: "1 hour ago",
      read: false,
      type: "campaign",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "BG",
    },
    {
      id: 3,
      title: "Payment received",
      description: "You received $1,250 from TechGadgets",
      time: "3 hours ago",
      read: true,
      type: "payment",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TG",
    },
    {
      id: 4,
      title: "New opportunity",
      description: "FitLife is looking for fitness influencers",
      time: "Yesterday",
      read: true,
      type: "opportunity",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "FL",
    },
    {
      id: 5,
      title: "Content milestone",
      description: "Your latest post reached 10k likes!",
      time: "2 days ago",
      read: true,
      type: "milestone",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "IG",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "campaign":
        return <Check className="h-4 w-4 text-emerald-500" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "opportunity":
        return <Zap className="h-4 w-4 text-amber-500" />
      case "milestone":
        return <Heart className="h-4 w-4 text-pink-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {unreadCount}
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto text-xs px-2 py-1" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-3 p-3 cursor-pointer ${notification.read ? "opacity-70" : "bg-muted/50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="relative mt-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{notification.initials}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                    {getIconForType(notification.type)}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                  <div className="flex items-center pt-1">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center">View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
