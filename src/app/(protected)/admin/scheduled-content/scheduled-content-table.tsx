"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { MoreHorizontal, Search, Filter, Download, Image, Video, FileImage, Calendar, Eye } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getAllScheduledContent } from "../actions"

type ScheduledContent = {
  id: string
  caption: string
  mediaType: string
  thumbnailUrl: string
  scheduledDate: string
  status: string
  userId: string | null
  userName: string
  userEmail: string | undefined
  automationId: string | null
  automationName: string
}

export function ScheduledContentTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchScheduledContent() {
      try {
        setLoading(true)
        const result = await getAllScheduledContent(page, 10, searchQuery)
        setScheduledContent(result.scheduledContent)
        setTotalPages(result.totalPages)
      } catch (error) {
        console.error("Error fetching scheduled content:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const handler = setTimeout(() => {
      fetchScheduledContent()
    }, 300)

    return () => clearTimeout(handler)
  }, [page, searchQuery])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "IMAGE":
        return <Image className="h-4 w-4 text-blue-500" />
      case "VIDEO":
        return <Video className="h-4 w-4 text-red-500" />
      case "CAROSEL_ALBUM":
        return <FileImage className="h-4 w-4 text-green-500" />
      default:
        return <Image className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Scheduled Content</CardTitle>
            <CardDescription>View and manage scheduled Instagram content</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading scheduled content...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Media Type</TableHead>
                  <TableHead>Scheduled For</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Automation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No scheduled content found
                    </TableCell>
                  </TableRow>
                ) : (
                  scheduledContent.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            {getMediaIcon(content.mediaType)}
                          </div>
                          <div className="max-w-[300px]">
                            <p className="text-sm truncate">{content.caption}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {content.mediaType === "IMAGE" && "Image"}
                          {content.mediaType === "VIDEO" && "Video"}
                          {content.mediaType === "CAROSEL_ALBUM" && "Carousel"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(content.scheduledDate)}</TableCell>
                      <TableCell>
                        <Badge variant="default">{content.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {content.userName
                                ? content.userName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{content.userName || "Unnamed User"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[150px] truncate">{content.automationName}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit content</DropdownMenuItem>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem>View automation</DropdownMenuItem>
                            <DropdownMenuItem>View user</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel scheduled post</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

