"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Send,
  Paperclip,
  ImageIcon,
  File,
  Calendar,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Star,
  Clock,
  Loader2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { getChats,getChatMessages, sendMessage } from "@/actions/messages"
import { useToast } from "@/hooks/use-toast"

export default function MessagingPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<any[]>([])
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sending, setSending] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadConversations()
  }, [])

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation.id)
    }
  }, [activeConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadConversations = async () => {
    setLoading(true)
    try {
      const result = await getChats()

      if (result.status === 200) {
        setConversations(result.data || [])

        // Set first conversation as active if available
        if (result.data && result.data.length > 0) {
          setActiveConversation(result.data[0])
        }
      } else {
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result : "Failed to load conversations",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading conversations:", error)
      toast({
        title: "Error",
        description: "An error occurred while loading your conversations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    setLoadingMessages(true)
    try {
      const result = await getChatMessages(conversationId)

      if (result.status === 200) {
        setMessages(result.data?.messages || []) //was initially result.data
      } else {
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result : "Failed to load messages",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading messages:", error)
      toast({
        title: "Error",
        description: "An error occurred while loading messages",
        variant: "destructive",
      })
    } finally {
      setLoadingMessages(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !activeConversation) return

    setSending(true)

    try {
      const result = await sendMessage(
        activeConversation.id,  // chatId
        newMessage,             // content
        "text"                  // contentType (optional)
      );

      if (result.status === 200) {
        // Add the new message to the list
        setMessages((prev) => [...prev, result.data])
        setNewMessage("")
      } else {
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result : "Failed to send message",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "An error occurred while sending your message",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()

    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
      return format(date, "h:mm a")
    }

    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return format(date, "MMM d")
    }

    // Otherwise show full date
    return format(date, "MMM d, yyyy")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with influencers and brands about collaborations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-320px)]">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredConversations.length > 0 ? (
                  <div>
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 hover:bg-muted cursor-pointer ${
                          activeConversation?.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveConversation(conversation)}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{conversation.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unreadCount > 0 && <Badge className="ml-auto">{conversation.unreadCount}</Badge>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No conversations found</p>
                  </div>
                )}
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 flex flex-col">
          {activeConversation ? (
            <>
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                      <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {activeConversation.name}
                        {activeConversation.verified && (
                          <Badge variant="secondary" className="h-5 px-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activeConversation.lastActive ? `Last active ${activeConversation.lastActive}` : "Online"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  {loadingMessages ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        const isCurrentUser = message.senderId === "current-user"
                        const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId

                        return (
                          <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                            {!isCurrentUser && showAvatar && (
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                                <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}

                            <div className={`max-w-[70%] ${!isCurrentUser && !showAvatar ? "ml-10" : ""}`}>
                              <div
                                className={`rounded-lg p-3 ${
                                  isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                {message.content}
                              </div>
                              <div
                                className={`text-xs text-muted-foreground mt-1 ${
                                  isCurrentUser ? "text-right" : "text-left"
                                }`}
                              >
                                {formatMessageTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No messages yet</p>
                      <p className="text-sm text-muted-foreground">Send a message to start the conversation</p>
                    </div>
                  )}
                </ScrollArea>

                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Image
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <File className="h-4 w-4 mr-2" />
                          Document
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />

                    <Button type="submit" size="icon" disabled={sending || !newMessage.trim()}>
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

