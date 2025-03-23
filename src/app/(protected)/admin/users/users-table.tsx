"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { MoreHorizontal, Search, Filter, UserPlus, Download } from "lucide-react"

// Mock data - in a real implementation, you would fetch this from your API
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    plan: "PRO",
    createdAt: "2023-05-15",
    integrations: 2,
    automations: 5,
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "FREE",
    createdAt: "2023-06-20",
    integrations: 1,
    automations: 2,
    status: "active",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    plan: "PRO",
    createdAt: "2023-07-10",
    integrations: 3,
    automations: 8,
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    plan: "FREE",
    createdAt: "2023-08-05",
    integrations: 1,
    automations: 1,
    status: "inactive",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    plan: "PRO",
    createdAt: "2023-09-15",
    integrations: 2,
    automations: 4,
    status: "active",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah@example.com",
    plan: "FREE",
    createdAt: "2023-10-01",
    integrations: 1,
    automations: 3,
    status: "active",
  },
  {
    id: "7",
    name: "David Lee",
    email: "david@example.com",
    plan: "PRO",
    createdAt: "2023-10-15",
    integrations: 2,
    automations: 6,
    status: "active",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa@example.com",
    plan: "FREE",
    createdAt: "2023-11-05",
    integrations: 1,
    automations: 2,
    status: "inactive",
  },
  {
    id: "9",
    name: "Kevin Martin",
    email: "kevin@example.com",
    plan: "PRO",
    createdAt: "2023-11-20",
    integrations: 3,
    automations: 7,
    status: "active",
  },
  {
    id: "10",
    name: "Amanda Clark",
    email: "amanda@example.com",
    plan: "FREE",
    createdAt: "2023-12-10",
    integrations: 1,
    automations: 1,
    status: "active",
  },
]

export function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Manage users and their subscriptions</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
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
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Integrations</TableHead>
              <TableHead>Automations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.plan === "PRO" ? "default" : "outline"}>{user.plan}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "outline"}>{user.status}</Badge>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.integrations}</TableCell>
                <TableCell>{user.automations}</TableCell>
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
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuItem>Manage subscription</DropdownMenuItem>
                      <DropdownMenuItem>View automations</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUsers.length === 0 && (
          <div className="flex justify-center p-4 text-muted-foreground">No users found matching your search.</div>
        )}
      </CardContent>
    </Card>
  )
}

