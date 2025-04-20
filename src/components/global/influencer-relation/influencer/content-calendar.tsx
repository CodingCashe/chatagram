"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Instagram, Video, ImageIcon } from "lucide-react"
import { getContentCalendar } from "@/actions/influencer-relations/influencer"

export function ContentCalendar() {
  const [calendarData, setCalendarData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const { status, data, message } = await getContentCalendar()

        if (status === 200 && data) {
          setCalendarData(data)
        } else {
          setError(message || "Failed to load content calendar")
        }
      } catch (err) {
        setError("An error occurred while fetching content calendar")
      } finally {
        setLoading(false)
      }
    }

    fetchCalendar()
  }, [])

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-500/20 text-yellow-500"
      case "scheduled":
        return "bg-primary/20 text-primary"
      case "published":
        return "bg-green-500/20 text-green-500"
      default:
        return ""
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-3 w-3" />
      case "TikTok":
        return <Video className="h-3 w-3" />
      default:
        return <ImageIcon className="h-3 w-3" />
    }
  }

  const today = new Date()
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Content Calendar</CardTitle>
            <CardDescription>Plan and schedule your content</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {monthNames[currentMonth]} {currentYear}
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span>New Content</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex h-[300px] items-center justify-center text-center text-sm text-muted-foreground">
            {error}
          </div>
        ) : calendarData.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-center text-sm text-muted-foreground">
            No calendar data available
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Fill in empty days at the start of the month */}
            {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
              <div key={`empty-start-${i}`} className="h-24 rounded-md border border-dashed opacity-50" />
            ))}

            {calendarData.map((day) => (
              <div
                key={day.day}
                className={`h-24 overflow-hidden rounded-md border p-1 transition-colors hover:bg-muted/50 ${
                  isToday(day.date) ? "border-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${isToday(day.date) ? "text-primary" : ""}`}>{day.day}</span>
                  {day.hasContent && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </div>

                {day.hasContent && (
                  <div className="mt-1 space-y-1">
                    {day.content.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-sm bg-muted/50 px-1 py-0.5 text-[10px]"
                      >
                        <div className="flex items-center gap-1 truncate">
                          {getPlatformIcon(item.platform)}
                          <span className="truncate">{item.type}</span>
                        </div>
                        <Badge className={`ml-1 px-1 py-0 text-[8px] ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Fill in empty days at the end of the month */}
            {Array.from({
              length: 6 - new Date(currentYear, currentMonth + 1, 0).getDay(),
            }).map((_, i) => (
              <div key={`empty-end-${i}`} className="h-24 rounded-md border border-dashed opacity-50" />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
