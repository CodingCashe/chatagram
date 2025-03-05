"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CalendarClock, CheckCircle, Clock, ChevronLeft, ChevronRight, Info, Search, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { format, parseISO, isAfter, isBefore, addDays } from "date-fns"
import { getScheduledPosts, type ScheduledPost } from "@/actions/schedule/schedule-post"
import { cn } from "@/lib/utils"
import FloatingPanel from "../../panel"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

type ScheduledPostsSelectorProps = {
  userId: string
  onSelectPost: (post: ScheduledPost) => void
  selectedPosts?: ScheduledPost[]
}

export const ScheduledPostsSelector = ({ userId, onSelectPost, selectedPosts = [] }: ScheduledPostsSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<"all" | "upcoming" | "week" | "month">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [visiblePosts, setVisiblePosts] = useState<ScheduledPost[]>([])
  const [calendarView, setCalendarView] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Fetch scheduled posts
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true)
      try {
        const response = await getScheduledPosts(userId)
        if (response.success && response.data) {
          setPosts(response.data)
        }
      } catch (error) {
        console.error("Error loading scheduled posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [userId])

  // Filter posts based on search and date filter
  useEffect(() => {
    let filtered = [...posts]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((post) => post.caption.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply date filter
    const now = new Date()
    if (dateFilter === "upcoming") {
      filtered = filtered.filter((post) => isAfter(parseISO(post.scheduledDate), now))
    } else if (dateFilter === "week") {
      const nextWeek = addDays(now, 7)
      filtered = filtered.filter(
        (post) => isAfter(parseISO(post.scheduledDate), now) && isBefore(parseISO(post.scheduledDate), nextWeek),
      )
    } else if (dateFilter === "month") {
      const nextMonth = addDays(now, 30)
      filtered = filtered.filter(
        (post) => isAfter(parseISO(post.scheduledDate), now) && isBefore(parseISO(post.scheduledDate), nextMonth),
      )
    }

    setVisiblePosts(filtered)
  }, [searchTerm, dateFilter, posts])

  // Group posts by date for calendar view
  const groupedByDate = visiblePosts.reduce(
    (acc, post) => {
      const date = post.scheduledDate.split("T")[0]
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(post)
      return acc
    },
    {} as Record<string, ScheduledPost[]>,
  )

  return (
    <FloatingPanel
      title="Select Scheduled Posts"
      trigger={
        <Button className="bg-gradient-to-r from-light-blue via-keyword-purple to-keyword-red text-white animate-gradient-x">
          <CalendarClock className="mr-2 h-4 w-4" />
          Scheduled Posts
        </Button>
      }
    >
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex items-center gap-3 mb-1">
          <CalendarClock className="h-5 w-5 text-light-blue" />
          <p className="text-lg font-medium text-white">Attach upcoming posts to your automation</p>
        </div>

        <div className="bg-background-80 p-3 rounded-xl">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                placeholder="Search scheduled posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background-90 border-none"
              />
            </div>

            <Tabs defaultValue="all" onValueChange={(v) => setDateFilter(v as any)}>
              <TabsList className="h-auto bg-background-90 p-1">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="text-xs">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="week" className="text-xs">
                  This Week
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs">
                  This Month
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCalendarView(!calendarView)}
              className={cn(
                "border-background-90 bg-background-90",
                calendarView && "border-light-blue text-light-blue",
              )}
            >
              <Calendar className="h-4 w-4 mr-1" />
              {calendarView ? "List View" : "Calendar"}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background-80 p-3 rounded-xl flex gap-3">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 rounded-full bg-light-blue/10 flex items-center justify-center mb-3">
              <CalendarClock className="h-6 w-6 text-light-blue" />
            </div>
            <p className="text-white font-medium">No scheduled posts found</p>
            <p className="text-sm text-text-secondary mt-1 max-w-xs">
              {searchTerm
                ? "Try a different search term or date filter"
                : "Schedule some posts to automate your responses"}
            </p>
          </div>
        ) : calendarView ? (
          // Calendar View
          <div className="bg-background-80 p-3 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(addDays(currentMonth, -30))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
              <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs text-text-secondary py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => {
                const d = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  i - new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 1,
                )
                const dateStr = format(d, "yyyy-MM-dd")
                const hasEvents = !!groupedByDate[dateStr]
                const isCurrentMonth = d.getMonth() === currentMonth.getMonth()

                return (
                  <div
                    key={i}
                    className={cn(
                      "h-16 p-1 rounded-md text-xs relative",
                      isCurrentMonth ? "bg-background-90" : "bg-background-90/50",
                      hasEvents && "ring-1 ring-light-blue/30",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 left-1 h-5 w-5 text-center leading-5 rounded-full",
                        format(new Date(), "yyyy-MM-dd") === dateStr && "bg-light-blue text-white",
                      )}
                    >
                      {format(d, "d")}
                    </span>

                    {hasEvents && (
                      <div className="absolute bottom-1 right-1 left-1 flex flex-wrap gap-1 justify-end">
                        {groupedByDate[dateStr].slice(0, 3).map((post, i) => (
                          <motion.div
                            key={post.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-2 w-2 rounded-full bg-light-blue cursor-pointer"
                            onClick={() => onSelectPost(post)}
                          />
                        ))}
                        {groupedByDate[dateStr].length > 3 && (
                          <span className="text-[10px] text-text-secondary">+{groupedByDate[dateStr].length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-3 border-t border-background-90 pt-3">
              <h4 className="text-sm font-medium mb-2">Upcoming posts</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {Object.entries(groupedByDate)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .slice(0, 5)
                  .map(([date, posts]) => (
                    <div key={date} className="text-xs">
                      <div className="text-text-secondary mb-1">{format(parseISO(date), "EEEE, MMMM d")}</div>
                      {posts.map((post) => (
                        <motion.div
                          key={post.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={cn(
                            "p-2 rounded-md flex items-center gap-2 cursor-pointer",
                            selectedPosts?.find((p) => p.id === post.id) ? "bg-light-blue/20" : "bg-background-90",
                          )}
                          onClick={() => onSelectPost(post)}
                        >
                          <div className="w-2 h-2 rounded-full bg-light-blue" />
                          <div className="truncate">{post.caption.substring(0, 30)}...</div>
                          <div className="ml-auto text-text-secondary">
                            {format(parseISO(post.scheduledDate), "h:mm a")}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          // List View
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visiblePosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative rounded-xl overflow-hidden cursor-pointer group border-2",
                  selectedPosts?.find((p) => p.id === post.id) ? "border-light-blue" : "border-transparent",
                )}
                onClick={() => onSelectPost(post)}
              >
                <div className="aspect-square bg-background-80 rounded-lg overflow-hidden relative">
                  <Image
                    src={post.mediaUrl || "/placeholder.svg?height=300&width=300"}
                    alt={post.caption || "Scheduled post"}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background-90 to-transparent opacity-70" />

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-background-90/80 text-xs font-normal">
                        {post.mediaType || "Image"}
                      </Badge>
                      <Badge variant="outline" className="bg-light-blue/80 text-xs font-normal">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(parseISO(post.scheduledDate), "MMM d, h:mm a")}
                      </Badge>
                    </div>
                    <p className="text-xs text-white line-clamp-2">{post.caption}</p>
                  </div>
                </div>

                {selectedPosts?.find((p) => p.id === post.id) && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-light-blue rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {selectedPosts && selectedPosts.length > 0 && (
          <div className="mt-3 pt-3 border-t border-background-80">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium flex items-center">
                <Info className="h-4 w-4 mr-1 text-light-blue" />
                Selected Posts ({selectedPosts.length})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-keyword-red hover:text-keyword-red hover:bg-keyword-red/10"
              >
                Clear all
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto py-1 pb-2">
              {selectedPosts.map((post) => (
                <div key={post.id} className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden group">
                  <Image
                    src={post.mediaUrl || "/placeholder.svg?height=64&width=64"}
                    alt="Selected post"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <X className="h-4 w-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </FloatingPanel>
  )
}

