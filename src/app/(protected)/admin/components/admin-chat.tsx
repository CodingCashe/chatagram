"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Paperclip, Phone, Video, MoreHorizontal } from "lucide-react"
import { useSocket } from "@/hooks/use-socket"
import { useChatStore, type ChatMessage } from "@/stores/chat-store"
import { getCurrentAdmin, getChatUsers, getUserMessages } from "../actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface AdminChatProps {
  userId: string
}

export function AdminChat({ userId }: AdminChatProps) {
  const { socket, isConnected } = useSocket(userId)
  const { activeChat, messages, users, setActiveChat, addMessage, markMessageAsRead, setMessages, setUsers } =
    useChatStore()
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Create audio element for message sounds
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/message.mp3")
    }
  }, [])

  // Load users on mount
  useEffect(() => {
    async function loadChatUsers() {
      try {
        setLoading(true)
        const adminData = await getCurrentAdmin()
        const usersData = await getChatUsers(searchQuery)
        setUsers(usersData)
      } catch (error) {
        console.error("Error loading chat users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadChatUsers()
    // Refresh user list every 60 seconds
    const interval = setInterval(loadChatUsers, 60000)
    return () => clearInterval(interval)
  }, [searchQuery, setUsers, toast])

  // Load messages when active chat changes
  useEffect(() => {
    if (!activeChat) return

    async function loadMessages() {
      try {
        const messagesData = await getUserMessages(activeChat || "Hello")
        setMessages(activeChat||"Hello", messagesData)
      } catch (error) {
        console.error("Error loading messages:", error)
        toast({
          title: "Error",
          description: "Failed to load messages. Please try again.",
          variant: "destructive",
        })
      }
    }

    loadMessages()
  }, [activeChat, setMessages, toast]) 

  // Socket event listeners
  useEffect(() => {
    if (!socket || !isConnected) return

    const handleNewMessage = (message: ChatMessage) => {
      console.log("New message received:", message)

      // Add message to store
      addMessage(message)

      // Play sound for new messages not from the current admin
      if (message.senderId !== userId && audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("Failed to play message sound:", err)
        })
      }

      // If this chat is currently active, mark message as read
      if (activeChat === message.senderId && socket) {
        socket.emit("mark_as_read", message.id)
        markMessageAsRead(message.id)
      }
    }

    socket.on("new_message", handleNewMessage)

    return () => {
      socket.off("new_message", handleNewMessage)
    }
  }, [socket, isConnected, userId, activeChat, addMessage, markMessageAsRead])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat, messages])

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !socket || !isConnected) return

    try {
      setSendingMessage(true)

      // Emit message to socket
      socket.emit("send_message", {
        content: newMessage.trim(),
        senderId: userId,
        receiverId: activeChat,
        isFromAdmin: true,
      })

      // Clear input
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSendingMessage(false)
    }
  }

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Filter users by search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Group messages by date
  const groupedMessages =
    activeChat && messages[activeChat]
      ? messages[activeChat].reduce(
          (groups, message) => {
            const date = formatDate(message.createdAt)
            if (!groups[date]) {
              groups[date] = []
            }
            groups[date].push(message)
            return groups
          },
          {} as Record<string, ChatMessage[]>,
        )
      : {}

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* User list */}
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>Message with users of your platform</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="px-4 py-2">
              {loading ? (
                <div className="p-4 text-center">Loading users...</div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                      activeChat === user.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveChat(user.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      {user.isActive && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{user.name}</p>
                        <span className="text-xs text-muted-foreground">{user.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{user.lastMessage || "No messages yet"}</p>
                    </div>
                    {user.unreadCount > 0 && (
                      <div className="flex-shrink-0 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">{user.unreadCount}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">No users found matching your search</div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat messages */}
      <Card className="md:col-span-2 flex flex-col">
        {activeChat ? (
          <>
            <CardHeader className="border-b p-4">
              {activeChat && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(users.find((u) => u.id === activeChat)?.name || "User")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {users.find((u) => u.id === activeChat)?.name || "User"}
                      </CardTitle>
                      <CardDescription>
                        {users.find((u) => u.id === activeChat)?.isActive ? "Active now" : "Offline"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        toast({ title: "Feature coming soon", description: "Voice chat is coming in a future update" })
                      }
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        toast({ title: "Feature coming soon", description: "Video chat is coming in a future update" })
                      }
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View user profile</DropdownMenuItem>
                        <DropdownMenuItem>Clear chat history</DropdownMenuItem>
                        <DropdownMenuItem>Block user</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-[calc(100%-120px)] p-4">
                <div className="space-y-4">
                  {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                    <div key={date}>
                      <div className="flex justify-center my-4">
                        <Badge variant="outline" className="bg-background">
                          {date}
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        {dateMessages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.isFromAdmin ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.isFromAdmin ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs opacity-70">{formatTime(message.createdAt)}</span>
                              </div>
                              <p className="whitespace-pre-wrap break-words">{message.content}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    toast({
                      title: "Feature coming soon",
                      description: "File attachments are coming in a future update",
                    })
                  }
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!isConnected || sendingMessage}
                />
                <Button onClick={handleSendMessage} disabled={!isConnected || !newMessage.trim() || sendingMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              {!isConnected && (
                <p className="text-xs text-destructive mt-2">Disconnected from chat server. Please refresh the page.</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground flex-col p-4">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground/50"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
            <p className="text-center max-w-md">
              Choose a user from the list to start chatting. You can provide support, answer questions, or send updates
              about their account.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

