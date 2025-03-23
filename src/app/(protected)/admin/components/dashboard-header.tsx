"use client"

import { useState, useEffect } from "react"
import { CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardHeader() {
  const [greeting, setGreeting] = useState("")
  const [currentDate, setCurrentDate] = useState("")

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
  }, [])

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{greeting}, Admin</h1>
        <p className="text-muted-foreground">Here's what's happening with your platform today.</p>
      </div>
      <Card className="mt-4 md:mt-0">
        <CardContent className="flex items-center p-4">
          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{currentDate}</span>
        </CardContent>
      </Card>
    </div>
  )
}

