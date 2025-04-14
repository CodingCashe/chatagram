"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarPlus, Instagram, Youtube, Twitter, Linkedin, Facebook } from "lucide-react"

// Sample content calendar data
const contentEvents = [
  { date: new Date(2025, 3, 15), platform: "instagram", title: "Product Review" },
  { date: new Date(2025, 3, 18), platform: "youtube", title: "Tutorial Video" },
  { date: new Date(2025, 3, 20), platform: "twitter", title: "Trend Commentary" },
  { date: new Date(2025, 3, 22), platform: "instagram", title: "Behind the Scenes" },
  { date: new Date(2025, 3, 25), platform: "linkedin", title: "Industry Insights" },
]

export function ContentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)

  // Get events for the selected date
  const selectedDateEvents = contentEvents.filter((event) => date && event.date.toDateString() === date.toDateString())

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-500" />
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-400" />
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-600" />
      default:
        return <Facebook className="h-4 w-4 text-blue-500" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20"
      case "youtube":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "twitter":
        return "bg-blue-400/10 text-blue-400 hover:bg-blue-400/20"
      case "linkedin":
        return "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20"
      default:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Content Calendar</CardTitle>
            <CardDescription>Plan and schedule your content across platforms</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <CalendarPlus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule New Content</DialogTitle>
                <DialogDescription>Plan your content ahead of time to maintain consistency.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Content Title</Label>
                  <Input id="title" placeholder="Enter content title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Content Description</Label>
                  <Textarea id="description" placeholder="Describe your content" />
                </div>
                <div className="grid gap-2">
                  <Label>Publication Date</Label>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setOpen(false)}>
                  Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr_300px]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              booked: contentEvents.map((event) => event.date),
            }}
            modifiersStyles={{
              booked: {
                fontWeight: "bold",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                color: "#6366f1",
                borderRadius: "0",
              },
            }}
          />
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {date
                  ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                  : "Select a date"}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length} {selectedDateEvents.length === 1 ? "post" : "posts"} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 rounded-lg border p-3">
                      {getPlatformIcon(event.platform)}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{event.title}</p>
                        <Badge variant="outline" className={getPlatformColor(event.platform)}>
                          {event.platform.charAt(0).toUpperCase() + event.platform.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[140px] flex-col items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">No content scheduled for this day</p>
                  <Button variant="link" size="sm" className="mt-2" onClick={() => setOpen(true)}>
                    Schedule content
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
