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
import { MoreHorizontal, Search, Filter, Download, CheckCircle, XCircle } from "lucide-react"
import { getAllSubscriptions, updateSubscriptionPlan } from "../actions"
import { toast } from "@/hooks/use-toast"

type Subscription = {
  id: string
  userId: string | null
  userName: string
  userEmail: string | undefined
  plan: "PRO" | "FREE"
  status: string
  startDate: string
  updatedAt: string
  customerId: string | null
}

export function SubscriptionsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        setLoading(true)
        const result = await getAllSubscriptions(page, 10, searchQuery)
        setSubscriptions(result.subscriptions)
        setTotalPages(result.totalPages)
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const handler = setTimeout(() => {
      fetchSubscriptions()
    }, 300)

    return () => clearTimeout(handler)
  }, [page, searchQuery])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleUpdatePlan = async (id: string, currentPlan: "PRO" | "FREE") => {
    try {
      const newPlan = currentPlan === "PRO" ? "FREE" : "PRO"
      await updateSubscriptionPlan(id, newPlan)

      // Update local state
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === id ? { ...sub, plan: newPlan, status: newPlan === "PRO" ? "active" : "free" } : sub,
        ),
      )

      toast({
        title: "Subscription updated",
        description: `Subscription plan changed to ${newPlan}`,
      })
    } catch (error) {
      console.error("Error updating subscription:", error)
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Subscriptions</CardTitle>
            <CardDescription>Manage user subscriptions and billing</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
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
          <div className="flex justify-center p-4">Loading subscriptions...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No subscriptions found
                    </TableCell>
                  </TableRow>
                ) : (
                  subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sub.userName || "Unnamed User"}</p>
                          <p className="text-sm text-muted-foreground">{sub.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={sub.plan === "PRO" ? "default" : "outline"}>{sub.plan}</Badge>
                      </TableCell>
                      <TableCell>
                        {sub.status === "active" && (
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-green-600">Active</span>
                          </div>
                        )}
                        {sub.status === "free" && (
                          <div className="flex items-center">
                            <XCircle className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Free</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(sub.startDate)}</TableCell>
                      <TableCell>{formatDate(sub.updatedAt)}</TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">
                          {sub.customerId ? sub.customerId.substring(0, 10) + "..." : "N/A"}
                        </span>
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
                            <DropdownMenuItem>View payment history</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {sub.plan === "PRO" ? (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleUpdatePlan(sub.id, sub.plan)}
                              >
                                Downgrade to Free
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => handleUpdatePlan(sub.id, sub.plan)}
                              >
                                Upgrade to Pro
                              </DropdownMenuItem>
                            )}
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

