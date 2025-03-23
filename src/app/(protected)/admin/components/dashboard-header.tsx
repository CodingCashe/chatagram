// "use client"

// import { useState, useEffect } from "react"
// import { CalendarDays } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"

// export function DashboardHeader() {
//   const [greeting, setGreeting] = useState("")
//   const [currentDate, setCurrentDate] = useState("")

//   useEffect(() => {
//     const hour = new Date().getHours()
//     if (hour < 12) setGreeting("Good morning")
//     else if (hour < 18) setGreeting("Good afternoon")
//     else setGreeting("Good evening")

//     const options: Intl.DateTimeFormatOptions = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }
//     setCurrentDate(new Date().toLocaleDateString("en-US", options))
//   }, [])

//   return (
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">{greeting}, Admin</h1>
//         <p className="text-muted-foreground">Here is whats happening with your platform today.</p>
//       </div>
//       <Card className="mt-4 md:mt-0">
//         <CardContent className="flex items-center p-4">
//           <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
//           <span className="text-sm text-muted-foreground">{currentDate}</span>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Bell, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../actions"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  adminName: string
}

export function DashboardHeader({ adminName }: DashboardHeaderProps) {
  const [greeting, setGreeting] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    setCurrentDate(new Date().toLocaleDateString("en-US", options))

    // Fetch notifications
    async function fetchNotifications() {
      try {
        const data = await getNotifications()
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      }
    }

    fetchNotifications()

    // Set up polling for notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id)
      setNotifications(
        notifications.map((notification) => {
          if (notification.id === id) {
            return { ...notification, read: true }
          }
          return notification
        }),
      )
      setUnreadCount(Math.max(0, unreadCount - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead()
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      )
      setUnreadCount(0)
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const formatNotificationTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {adminName}
        </h1>
        <p className="text-muted-foreground">Heres whats happening with your platform today.</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full md:w-[200px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[350px]">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start p-3 ${!notification.read ? "bg-muted/50" : ""}`}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                  >
                    <div className="flex w-full gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {notification.type === "user" ? "U" : notification.type === "subscription" ? "S" : "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatNotificationTime(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1"></div>}
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center">
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Card className="w-full md:w-auto">
          <CardContent className="flex items-center p-3">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{currentDate}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

