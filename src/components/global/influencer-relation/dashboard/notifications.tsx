"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Campaign Invitation",
      description: "FashionBrand has invited you to a new campaign",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "Content Performance",
      description: "Your latest post is performing 25% better than average",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      title: "Payment Received",
      description: "You received a payment of $1,200 from FitnessGear",
      time: "1 day ago",
      read: true,
    },
    {
      id: "4",
      title: "Milestone Reached",
      description: "Congratulations! You've reached 125K followers",
      time: "2 days ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="grid gap-1 p-1">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-md p-3 text-left text-sm transition-colors hover:bg-muted",
                    !notification.read && "bg-muted/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid gap-0.5">
                      <div className="font-medium">{notification.title}</div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">{notification.description}</div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">{notification.time}</div>
                    </div>
                    {!notification.read && <div className="flex h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">No new notifications</div>
          )}
        </ScrollArea>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full justify-center">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
