"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Filter, Download, Bot, MessageSquare, Brain } from "lucide-react"
import { getAllAutomations, updateAutomationStatus } from "../actions"
import { toast } from "@/hooks/use-toast"

type Automation = {
  id: string
  name: string
  userId: string | null
  userName: string
  userEmail: string | undefined
  type: string
  status: string
  createdAt: string
  lastTriggered: string | null
  keywords: string[]
}

export function AutomationsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [automations, setAutomations] = useState<Automation[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchAutomations() {
      try {
        setLoading(true)
        const result = await getAllAutomations(page, 10, searchQuery)
        setAutomations(result.automations)
        setTotalPages(result.totalPages)
      } catch (error) {
        console.error("Error fetching automations:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const handler = setTimeout(() => {
      fetchAutomations()
    }, 300)

    return () => clearTimeout(handler)
  }, [page, searchQuery])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString()
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active"
      await updateAutomationStatus(id, !newStatus)

      // Update local state
      setAutomations(
        automations.map((auto) => (auto.id === id ? { ...auto, status: newStatus ? "inactive" : "active" } : auto)),
      )

      toast({
        title: "Automation updated",
        description: `Automation ${newStatus ? "deactivated" : "activated"} successfully`,
      })
    } catch (error) {
      console.error("Error updating automation:", error)
      toast({
        title: "Error",
        description: "Failed to update automation",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Automations</CardTitle>
            <CardDescription>Monitor and manage automations across the platform</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search automations..."
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading automations...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Automation</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {automations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No automations found
                    </TableCell>
                  </TableRow>
                ) : (
                  automations.map((auto) => (
                    <TableRow key={auto.id}>
                      <TableCell>
                        <div className="font-medium">{auto.name}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{auto.userName || "Unnamed User"}</p>
                          <p className="text-sm text-muted-foreground">{auto.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {auto.type === "MESSAGE" ? (
                            <>
                              <MessageSquare className="mr-1 h-4 w-4 text-blue-500" />
                              <span>Message</span>
                            </>
                          ) : auto.type === "SMARTAI" ? (
                            <>
                              <Brain className="mr-1 h-4 w-4 text-purple-500" />
                              <span>Smart AI</span>
                            </>
                          ) : (
                            <>
                              <Bot className="mr-1 h-4 w-4 text-gray-500" />
                              <span>Unknown</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={auto.status === "active"}
                            onCheckedChange={() => handleToggleStatus(auto.id, auto.status)}
                          />
                          <Badge variant={auto.status === "active" ? "default" : "destructive"}>
                            {auto.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(auto.createdAt)}</TableCell>
                      <TableCell>{formatDate(auto.lastTriggered)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {auto.keywords.slice(0, 2).map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                          {auto.keywords.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{auto.keywords.length - 2}
                            </Badge>
                          )}
                        </div>
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
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit automation</DropdownMenuItem>
                            <DropdownMenuItem>View analytics</DropdownMenuItem>
                            <DropdownMenuItem>View user</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete automation</DropdownMenuItem>
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

