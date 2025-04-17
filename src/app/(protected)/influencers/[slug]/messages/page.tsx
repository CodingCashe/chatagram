"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/global/influencer-relation/dashboard/updat/dashboard-shell"
import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { getUserChats } from "@/actions/collab/chat-actions"
import { pusherClient } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"

export default function MessagesListPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [userId, setUserId] = useState<string | null>(null)

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await onUserInfor()
      if (user.data?.id) {
        setUserId(user.data.id)
      } else {
        // Redirect to login if not authenticated
        router.push("/login")
      }
    }

    fetchCurrentUser()
  }, [router])

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) return

      try {
        const { status, data, message } = await getUserChats()

        if (status === 200 && data) {
          setConversations(data)
        } else {
          toast({
            title: "Error",
            description: message || "Failed to load conversations",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchConversations()
    }
  }, [userId])

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!userId) return

    // Subscribe to user's notification channel
    const channel = pusherClient.subscribe(`user-${userId}`)

    // Handle new message notifications
    channel.bind("notification", (data: any) => {
      if (data.type === "chat") {
        // Refresh the conversations list
        getUserChats().then(({ status, data }) => {
          if (status === 200 && data) {
            setConversations(data)
          }
        })

        // Show toast notification
        toast({
          title: data.title,
          description: data.message,
        })
      }
    })

    return () => {
      pusherClient.unsubscribe(`user-${userId}`)
    }
  }, [userId])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()

    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // If this week, show day name
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    }

    // Otherwise show date
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  const filteredConversations = conversations.filter((conv) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      conv.participants.some(
        (p: any) =>
          (p.businessName && p.businessName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.influencerName && p.influencerName.toLowerCase().includes(searchQuery.toLowerCase())),
      )

    // Apply type filter (influencer/business)
    const matchesType =
      filter === "all" ||
      (filter === "influencers" && conv.participants.some((p: any) => p.influencerId)) ||
      (filter === "businesses" && conv.participants.some((p: any) => p.businessId))

    return matchesSearch && matchesType
  })

  const selectConversation = (conversationId: string) => {
    router.push(`/messages/${conversationId}`)
  }

  if (loading) {
    return (
      <DashboardShell>
      <DashboardHeader heading="Opportunities" text="Find and apply to opportunities that match your profile" />
      
      <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
        <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
          <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
            <div className="w-full flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
              <div className="p-4">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-8 w-full mb-6" />

                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3 mb-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
    <DashboardHeader heading="Opportunities" text="Find and apply to opportunities that match your profile" />
      
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
      <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
        <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
          <div className="w-full flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Messages</h2>
              <p className="text-gray-400 text-sm">Communicate with influencers and businesses</p>
            </div>

            <div className="p-4 border-b border-gray-800">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <Tabs value={filter} onValueChange={setFilter} className="w-full">
                <TabsList className="w-full bg-gray-800">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="influencers" className="flex-1">
                    Influencers
                  </TabsTrigger>
                  <TabsTrigger value="businesses" className="flex-1">
                    Businesses
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Send className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No conversations yet</h3>
                  <p className="text-gray-400 max-w-md">
                    {searchQuery
                      ? "No conversations match your search criteria."
                      : "Start messaging influencers or businesses to collaborate on opportunities."}
                  </p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="p-3 cursor-pointer transition-colors hover:bg-gray-800/50"
                    onClick={() => selectConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 bg-gray-700">
                        <div className="text-lg font-semibold text-white">
                          {conversation.participants[0]?.influencerName?.charAt(0) ||
                            conversation.participants[0]?.businessName?.charAt(0) ||
                            "?"}
                        </div>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium text-white truncate">
                            {conversation.participants[0]?.influencerName ||
                              conversation.participants[0]?.businessName ||
                              "Unknown"}
                          </h3>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {conversation.lastMessage ? formatTime(conversation.lastMessage.createdAt) : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <p
                            className={`text-sm truncate ${
                              conversation.hasUnread ? "text-white font-medium" : "text-gray-400"
                            }`}
                          >
                            {conversation.lastMessage?.content || "No messages yet"}
                          </p>
                          {conversation.hasUnread && (
                            <div className="min-w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center ml-1 text-xs px-1.5">
                              •
                            </div>
                          )}
                        </div>
                        <div className="mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                            {conversation.participants[0]?.influencerId ? "influencer" : "business"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardShell>
  )
}
