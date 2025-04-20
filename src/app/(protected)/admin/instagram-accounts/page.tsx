"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Instagram,
  Plus,
  Search,
  MoreHorizontal,
  RefreshCw,
  LinkIcon,
  Unlink,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export default function InstagramAccountsPage() {
  const [accounts, setAccounts] = useState([
    {
      id: "1",
      username: "business_account1",
      profilePic: "/placeholder.svg?height=40&width=40",
      followers: 5243,
      following: 1025,
      status: "connected",
      lastSync: "2023-05-15T10:30:00Z",
      owner: "John Doe",
      ownerEmail: "john@example.com",
    },
    {
      id: "2",
      username: "fashion_brand22",
      profilePic: "/placeholder.svg?height=40&width=40",
      followers: 12500,
      following: 850,
      status: "connected",
      lastSync: "2023-05-14T14:45:00Z",
      owner: "Jane Smith",
      ownerEmail: "jane@example.com",
    },
    {
      id: "3",
      username: "travel_photography",
      profilePic: "/placeholder.svg?height=40&width=40",
      followers: 8750,
      following: 1200,
      status: "disconnected",
      lastSync: "2023-05-10T09:15:00Z",
      owner: "Mike Johnson",
      ownerEmail: "mike@example.com",
    },
    {
      id: "4",
      username: "fitness_coach",
      profilePic: "/placeholder.svg?height=40&width=40",
      followers: 15200,
      following: 520,
      status: "limited",
      lastSync: "2023-05-13T16:20:00Z",
      owner: "Sarah Williams",
      ownerEmail: "sarah@example.com",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  const filteredAccounts = accounts.filter(
    (account) =>
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRefresh = () => {
    setRefreshing(true)

    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
      toast({
        title: "Accounts Refreshed",
        description: "Instagram account data has been updated",
      })
    }, 1500)
  }

  const handleConnect = () => {
    toast({
      title: "Instagram Connection",
      description: "Redirecting to Instagram authorization page...",
    })

    // In a real implementation, this would redirect to Instagram OAuth
    setTimeout(() => {
      window.open("https://www.instagram.com", "_blank")
    }, 1000)
  }

  const handleDisconnect = (id: string) => {
    setAccounts(accounts.map((account) => (account.id === id ? { ...account, status: "disconnected" } : account)))

    toast({
      title: "Account Disconnected",
      description: "Instagram account has been disconnected",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <Unlink className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        )
      case "limited":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Limited Access
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Instagram Accounts</h1>
        <p className="text-muted-foreground">Manage connected Instagram accounts for DM automation</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Instagram accounts connected to your platform</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Connect Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect Instagram Account</DialogTitle>
                    <DialogDescription>Connect an Instagram account to enable DM automation</DialogDescription>
                  </DialogHeader>
                  <div className="py-6 flex flex-col items-center justify-center space-y-4">
                    <Instagram className="h-16 w-16 text-pink-500" />
                    <p className="text-center">
                      You will be redirected to Instagram to authorize access to your account. We only request the minimum
                      permissions needed for DM automation.
                    </p>
                    <div className="flex items-center justify-center p-2 bg-muted rounded-md w-full">
                      <Shield className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Your account credentials are never stored</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleConnect}>
                      <Instagram className="h-4 w-4 mr-2" />
                      Connect with Instagram
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search accounts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No accounts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAccounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={account.profilePic} alt={account.username} />
                              <AvatarFallback>{account.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">@{account.username}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{account.followers.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">
                              Following: {account.following.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(account.status)}</TableCell>
                        <TableCell>{formatDate(account.lastSync)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{account.owner}</span>
                            <span className="text-xs text-muted-foreground">{account.ownerEmail}</span>
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
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View on Instagram
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Sync Now
                              </DropdownMenuItem>
                              {account.status === "connected" ? (
                                <DropdownMenuItem onClick={() => handleDisconnect(account.id)}>
                                  <Unlink className="h-4 w-4 mr-2" />
                                  Disconnect
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={handleConnect}>
                                  <LinkIcon className="h-4 w-4 mr-2" />
                                  Reconnect
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
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredAccounts.length} account{filteredAccounts.length !== 1 ? "s" : ""} found
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="https://developers.facebook.com/docs/instagram-api/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              API Documentation
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

