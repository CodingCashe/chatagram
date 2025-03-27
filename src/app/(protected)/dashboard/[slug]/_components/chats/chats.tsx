// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Badge } from "@/components/ui/badge"
// import { MessageSquare, Send, X, PaperclipIcon } from "lucide-react"
// import { useSocket } from "@/hooks/use-socket"
// import { motion, AnimatePresence } from "framer-motion"
// import { useToast } from "@/hooks/use-toast"

// interface UserChatProps {
//   userId: string
//   userName: string
// }

// type Message = {
//   id: string
//   content: string
//   senderId: string
//   receiverId: string | null
//   isFromAdmin: boolean
//   createdAt: string
//   read?: boolean
// }

// export function UserChat({ userId, userName }: UserChatProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [newMessage, setNewMessage] = useState("")
//   const [messages, setMessages] = useState<Message[]>([])
//   const [unreadCount, setUnreadCount] = useState(0)
//   const [loading, setLoading] = useState(false)
//   const [initialized, setInitialized] = useState(false)
//   const [adminTyping, setAdminTyping] = useState(false)
//   const { socket, isConnected } = useSocket(userId)
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const { toast } = useToast()
//   const audioRef = useRef<HTMLAudioElement | null>(null)

//   // Create audio element for message sounds
//   useEffect(() => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio("/sounds/message.mp3")
//     }
//   }, [])

//   // Initialize chat and load messages
//   useEffect(() => {
//     if (!isConnected || initialized) return

//     async function initialize() {
//       try {
//         setLoading(true)
//         // Fetch messages from API
//         const response = await fetch("/api/chat/messages")
//         if (!response.ok) throw new Error("Failed to load messages")

//         const data = await response.json()
//         setMessages(data.messages || [])

//         // Count unread messages from admin
//         const unread = (data.messages || []).filter((msg: Message) => msg.isFromAdmin && !msg.read).length
//         setUnreadCount(unread)

//         setInitialized(true)
//       } catch (error) {
//         console.error("Error initializing chat:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     initialize()
//   }, [isConnected, initialized])

//   // Socket event listeners
//   useEffect(() => {
//     if (!socket || !isConnected) return

//     const handleNewMessage = (message: Message) => {
//       console.log("New message received:", message)

//       // Add to messages
//       setMessages((prev) => {
//         // Check if message already exists
//         if (prev.some((m) => m.id === message.id)) return prev
//         return [...prev, message].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
//       })

//       // If message is from admin and chat is not open, increment unread count
//       if (message.isFromAdmin && !isOpen) {
//         setUnreadCount((prev) => prev + 1)

//         // Show toast notification
//         toast({
//           title: "New message from Admin",
//           description: message.content.length > 30 ? message.content.substring(0, 30) + "..." : message.content,
//         })

//         // Play sound
//         if (audioRef.current) {
//           audioRef.current.play().catch((err) => {
//             console.error("Failed to play message sound:", err)
//           })
//         }
//       }

//       // If chat is open and message is from admin, mark as read
//       if (isOpen && message.isFromAdmin && socket) {
//         socket.emit("mark_as_read", message.id)
//       }
//     }

//     const handleAdminTyping = (data: any) => {
//       if (data.typing) {
//         setAdminTyping(true)
//         // Clear typing indicator after 3 seconds
//         setTimeout(() => setAdminTyping(false), 3000)
//       } else {
//         setAdminTyping(false)
//       }
//     }

//     socket.on("new_message", handleNewMessage)
//     socket.on("admin_typing", handleAdminTyping)

//     return () => {
//       socket.off("new_message", handleNewMessage)
//       socket.off("admin_typing", handleAdminTyping)
//     }
//   }, [socket, isConnected, isOpen, toast])

//   // Scroll to bottom when messages change or chat opens
//   useEffect(() => {
//     if (isOpen) {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

//       // Mark messages as read when chat opens
//       if (unreadCount > 0 && socket && isConnected) {
//         const unreadMsgs = messages.filter((msg) => msg.isFromAdmin && !msg.read)

//         unreadMsgs.forEach((msg) => {
//           socket.emit("mark_as_read", msg.id)
//         })

//         setUnreadCount(0)
//       }
//     }
//   }, [isOpen, messages, unreadCount, socket, isConnected])

//   // Send typing indicator
//   const handleTyping = () => {
//     if (socket && isConnected) {
//       socket.emit("user_typing", { typing: true })
//     }
//   }

//   // Send message
//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !socket || !isConnected) return

//     try {
//       // Emit message to socket
//       socket.emit("send_message", {
//         content: newMessage.trim(),
//         senderId: userId,
//         receiverId: null, // null means to all admins
//         isFromAdmin: false,
//       })

//       // Clear input
//       setNewMessage("")
//     } catch (error) {
//       console.error("Error sending message:", error)
//       toast({
//         title: "Error",
//         description: "Failed to send message. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   // Handle pressing Enter to send message
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   const formatTime = (timestamp: string) => {
//     return new Date(timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   const formatDate = (timestamp: string) => {
//     const date = new Date(timestamp)
//     const today = new Date()
//     const yesterday = new Date(today)
//     yesterday.setDate(yesterday.getDate() - 1)

//     if (date.toDateString() === today.toDateString()) {
//       return "Today"
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return "Yesterday"
//     } else {
//       return date.toLocaleDateString()
//     }
//   }

//   // Group messages by date
//   const groupedMessages = messages.reduce(
//     (groups, message) => {
//       const date = formatDate(message.createdAt)
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(message)
//       return groups
//     },
//     {} as Record<string, Message[]>,
//   )

//   return (
//     <>
//       {/* Chat bubble button */}
//       <motion.div
//         className="fixed bottom-5 right-5 z-50"
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 1, duration: 0.3 }}
//       >
//         <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
//           <MessageSquare className="h-6 w-6" />
//           <AnimatePresence>
//             {unreadCount > 0 && (
//               <motion.div
//                 initial={{ scale: 0.5, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.5, opacity: 0 }}
//                 className="absolute -top-2 -right-2"
//               >
//                 <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
//                   {unreadCount}
//                 </Badge>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </Button>
//       </motion.div>

//       {/* Chat panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed bottom-5 right-5 w-[350px] sm:w-[400px] z-50"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 50, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="shadow-xl border-2">
//               <CardHeader className="p-4 flex flex-row items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Avatar className="h-9 w-9">
//                     <AvatarFallback>AD</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="font-semibold text-sm">Support Chat</h3>
//                     <p className="text-xs text-muted-foreground">{isConnected ? "Online" : "Connecting..."}</p>
//                   </div>
//                 </div>
//                 <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
//                   <X className="h-4 w-4" />
//                 </Button>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <ScrollArea className="h-[350px] p-4">
//                   {loading ? (
//                     <div className="flex justify-center items-center h-full">
//                       <p className="text-muted-foreground">Loading messages...</p>
//                     </div>
//                   ) : Object.keys(groupedMessages).length === 0 ? (
//                     <div className="flex flex-col justify-center items-center h-full">
//                       <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
//                       <p className="text-muted-foreground text-center">
//                         No messages yet. Start a conversation with our support team.
//                       </p>
//                     </div>
//                   ) : (
//                     Object.entries(groupedMessages).map(([date, dateMessages]) => (
//                       <div key={date}>
//                         <div className="flex justify-center my-4">
//                           <Badge variant="outline" className="bg-background">
//                             {date}
//                           </Badge>
//                         </div>
//                         <div className="space-y-4">
//                           {dateMessages.map((message) => (
//                             <motion.div
//                               key={message.id}
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.3 }}
//                               className={`flex ${message.isFromAdmin ? "justify-start" : "justify-end"}`}
//                             >
//                               <div
//                                 className={`max-w-[80%] rounded-lg p-3 ${
//                                   message.isFromAdmin ? "bg-muted" : "bg-primary text-primary-foreground"
//                                 }`}
//                               >
//                                 <div className="flex items-center gap-2 mb-1">
//                                   <span className="text-xs opacity-70">{formatTime(message.createdAt)}</span>
//                                 </div>
//                                 <p className="whitespace-pre-wrap break-words">{message.content}</p>
//                               </div>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                   {adminTyping && (
//                     <div className="flex justify-start mt-4">
//                       <div className="bg-muted rounded-lg p-3 animate-pulse">
//                         <div className="flex space-x-1">
//                           <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
//                           <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
//                           <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </ScrollArea>
//               </CardContent>
//               <CardFooter className="p-3 border-t">
//                 <div className="flex w-full gap-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="shrink-0"
//                     onClick={() =>
//                       toast({ title: "Feature coming soon", description: "File attachments will be available soon" })
//                     }
//                   >
//                     <PaperclipIcon className="h-4 w-4" />
//                   </Button>
//                   <Input
//                     placeholder="Type your message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     onInput={handleTyping}
//                     disabled={!isConnected}
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={handleSendMessage}
//                     disabled={!newMessage.trim() || !isConnected}
//                     className="shrink-0"
//                   >
//                     <Send className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 {!isConnected && (
//                   <p className="text-xs text-destructive mt-2 w-full text-center">Connecting to chat server...</p>
//                 )}
//               </CardFooter>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, X, PaperclipIcon, Smile, Image, File, Loader2 } from "lucide-react"
import { useSocket } from "@/hooks/use-socket"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useOfflineQueue } from "@/hooks/use-offline-queue"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"

interface UserChatProps {
  userId: string
  userName: string
  isPage?: boolean
}

type Message = {
  id: string
  content: string
  senderId: string
  receiverId: string | null
  isFromAdmin: boolean
  createdAt: string
  isPending?: boolean
  read?:boolean
}

export function UserChat({ userId, userName, isPage = false }: UserChatProps) {
  const [isOpen, setIsOpen] = useState(isPage) 
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [adminTyping, setAdminTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [fileUploads, setFileUploads] = useState<{ file: File; progress: number; uploading: boolean }[]>([])
  const { socket, isConnected } = useSocket(userId)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { addToQueue, isSending, queueLength, pendingMessages } = useOfflineQueue(socket, isConnected, userId)

  // Create audio element for message sounds
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/message.mp3")
    }
  }, [])

  // Initialize chat and load messages
  useEffect(() => {
    if (!isConnected || initialized) return

    async function initialize() {
      try {
        setLoading(true)
        // Fetch messages from API
        const response = await fetch("/api/chat/messages")
        if (!response.ok) throw new Error("Failed to load messages")

        const data = await response.json()
        setMessages(data.messages || [])

        // Count unread messages from admin
        const unread = (data.messages || []).filter((msg: Message) => msg.isFromAdmin && !msg.read).length
        setUnreadCount(unread)

        setInitialized(true)
      } catch (error) {
        console.error("Error initializing chat:", error)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [isConnected, initialized])

  // Socket event listeners
  useEffect(() => {
    if (!socket || !isConnected) return

    const handleNewMessage = (message: Message) => {
      console.log("New message received:", message)

      // Add to messages
      setMessages((prev) => {
        // Check if message already exists
        if (prev.some((m) => m.id === message.id)) return prev
        return [...prev, message].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      })

      // If message is from admin and chat is not open, increment unread count
      if (message.isFromAdmin && !isOpen) {
        setUnreadCount((prev) => prev + 1)

        // Show toast notification
        toast({
          title: "New message from Admin",
          description: message.content.length > 30 ? message.content.substring(0, 30) + "..." : message.content,
        })

        // Play sound
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.error("Failed to play message sound:", err)
          })
        }
      }

      // If chat is open and message is from admin, mark as read
      if (isOpen && message.isFromAdmin && socket) {
        socket.emit("mark_as_read", message.id)
      }
    }

    const handleAdminTyping = (data: any) => {
      if (data.typing) {
        setAdminTyping(true)
        // Clear typing indicator after 3 seconds
        setTimeout(() => setAdminTyping(false), 3000)
      } else {
        setAdminTyping(false)
      }
    }

    socket.on("new_message", handleNewMessage)
    socket.on("admin_typing", handleAdminTyping)

    // Listen for message_sent confirmation
    socket.on("message_sent", (data) => {
      if (data.success && data.pendingId) {
        // Replace pending message with confirmed message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === `pending-${data.pendingId}` ? { ...msg, id: data.messageId, isPending: false } : msg,
          ),
        )
      }
    })

    return () => {
      socket.off("new_message", handleNewMessage)
      socket.off("admin_typing", handleAdminTyping)
      socket.off("message_sent")
    }
  }, [socket, isConnected, isOpen, toast])

  // Scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

      // Mark messages as read when chat opens
      if (unreadCount > 0 && socket && isConnected) {
        const unreadMsgs = messages.filter((msg) => msg.isFromAdmin && !msg.read)

        unreadMsgs.forEach((msg) => {
          socket.emit("mark_as_read", msg.id)
        })

        setUnreadCount(0)
      }
    }
  }, [isOpen, messages, unreadCount, socket, isConnected])

  // Send typing indicator
  const handleTyping = () => {
    if (socket && isConnected) {
      socket.emit("user_typing", { typing: true })
    }
  }

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim() && fileUploads.length === 0) return

    try {
      // If we're offline, add to queue
      if (!isConnected || !socket) {
        const pendingId = addToQueue({
          content: newMessage.trim(),
          senderId: userId,
          receiverId: null, // null means to all admins
          isFromAdmin: false,
          createdAt: new Date().toISOString(),
        })

        // Add a temporary message to the UI
        setMessages((prev) => [
          ...prev,
          {
            id: `pending-${pendingId}`,
            content: newMessage.trim(),
            senderId: userId,
            receiverId: null,
            isFromAdmin: false,
            createdAt: new Date().toISOString(),
            isPending: true,
          },
        ])

        // Clear input
        setNewMessage("")
        return
      }

      // Handle file uploads first
      Promise.all(
        fileUploads.map(async (upload) => {
          if (upload.uploading) {
            const formData = new FormData()
            formData.append("file", upload.file)
            formData.append("userId", userId)

            try {
              const response = await fetch("/api/chat/upload", {
                method: "POST",
                body: formData,
              })

              if (!response.ok) {
                throw new Error("File upload failed")
              }

              const data = await response.json()
              return data.fileUrl
            } catch (error) {
              console.error("Error uploading file:", error)
              toast({
                title: "Upload Failed",
                description: `Failed to upload ${upload.file.name}`,
                variant: "destructive",
              })
              return null
            }
          }
          return null
        }),
      ).then((uploadedFiles) => {
        // Filter out failed uploads
        const successfulUploads = uploadedFiles.filter(Boolean)

        // Prepare message content
        let finalContent = newMessage.trim()

        // Add file links to message
        if (successfulUploads.length > 0) {
          if (finalContent) finalContent += "\n\n"
          finalContent += successfulUploads.map((url) => `[File](${url})`).join("\n")
        }

        // Emit message to socket
        socket.emit("send_message", {
          content: finalContent,
          senderId: userId,
          receiverId: null, // null means to all admins
          isFromAdmin: false,
        })

        // Clear input and uploads
        setNewMessage("")
        setFileUploads([])
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle emoji selection
  const handleEmojiSelect = (emoji: any) => {
    setNewMessage((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        progress: 0,
        uploading: true,
      }))

      setFileUploads((prev) => [...prev, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((fileUpload, index) => {
        const interval = setInterval(() => {
          setFileUploads((prev) => {
            const newUploads = [...prev]
            const fileIndex = newUploads.findIndex((f) => f.file === fileUpload.file)

            if (fileIndex !== -1) {
              if (newUploads[fileIndex].progress < 100) {
                newUploads[fileIndex].progress += 10
              } else {
                newUploads[fileIndex].uploading = false
                clearInterval(interval)
              }
            } else {
              clearInterval(interval)
            }

            return newUploads
          })
        }, 300)
      })
    }
  }

  // Remove file from uploads
  const removeFile = (index: number) => {
    setFileUploads((prev) => prev.filter((_, i) => i !== index))
  }

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

  // Group messages by date
  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = formatDate(message.createdAt)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
      return groups
    },
    {} as Record<string, Message[]>,
  )

  // If this is a page component, render the full chat interface
  if (isPage) {
    return (
      <Card className="h-full">
        <CardHeader className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">Support Chat</h3>
              <p className="text-xs text-muted-foreground">{isConnected ? "Online" : "Connecting..."}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <ScrollArea className="h-[calc(100vh-300px)] p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground">Loading messages...</p>
              </div>
            ) : Object.keys(groupedMessages).length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-center">
                  No messages yet. Start a conversation with our support team.
                </p>
              </div>
            ) : (
              Object.entries(groupedMessages).map(([date, dateMessages]) => (
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
                        className={`flex ${message.isFromAdmin ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.isFromAdmin
                              ? "bg-muted"
                              : message.isPending
                                ? "bg-primary/70 text-primary-foreground"
                                : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs opacity-70">{formatTime(message.createdAt)}</span>
                            {message.isPending && (
                              <span className="text-xs flex items-center gap-1">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Sending...
                              </span>
                            )}
                          </div>
                          <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
            {adminTyping && (
              <div className="flex justify-start mt-4">
                <div className="bg-muted rounded-lg p-3 animate-pulse">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-3 border-t">
          {/* File uploads preview */}
          {fileUploads.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 w-full">
              {fileUploads.map((upload, index) => (
                <div key={index} className="relative bg-muted rounded-md p-2 pr-8">
                  <div className="flex items-center gap-2">
                    {upload.file.type.startsWith("image/") ? (
                      <Image className="h-4 w-4" />
                    ) : (
                      <File className="h-4 w-4" />
                    )}
                    <span className="text-xs truncate max-w-[150px]">{upload.file.name}</span>
                  </div>
                  {upload.uploading && <Progress value={upload.progress} className="h-1 mt-1 w-full" />}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 absolute top-1 right-1 p-0"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex w-full gap-2">
            <div className="flex gap-2">
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" />
                </PopoverContent>
              </Popover>

              <Button variant="outline" size="icon" className="shrink-0" onClick={() => fileInputRef.current?.click()}>
                <PaperclipIcon className="h-4 w-4" />
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} multiple />
              </Button>
            </div>

            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleTyping}
              disabled={!isConnected && queueLength === 0}
              className="flex-1"
            />

            <Button
              onClick={handleSendMessage}
              disabled={(!newMessage.trim() && fileUploads.length === 0) || isSending}
              className="shrink-0"
            >
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          {!isConnected && (
            <p className="text-xs text-amber-600 mt-2 w-full text-center flex items-center justify-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Offline mode - Messages will be sent when connection is restored
              {queueLength > 0 && ` (${queueLength} pending)`}
            </p>
          )}
        </CardFooter>
      </Card>
    )
  }

  // Otherwise, render the floating chat bubble
  return (
    <>
      {/* Chat bubble button */}
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-6 w-6" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute -top-2 -right-2"
              >
                <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-5 right-5 w-[350px] sm:w-[400px] z-50"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-2">
              <CardHeader className="p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">Support Chat</h3>
                    <p className="text-xs text-muted-foreground">{isConnected ? "Online" : "Connecting..."}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-muted-foreground">Loading messages...</p>
                    </div>
                  ) : Object.keys(groupedMessages).length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-full">
                      <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground text-center">
                        No messages yet. Start a conversation with our support team.
                      </p>
                    </div>
                  ) : (
                    Object.entries(groupedMessages).map(([date, dateMessages]) => (
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
                              className={`flex ${message.isFromAdmin ? "justify-start" : "justify-end"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.isFromAdmin
                                    ? "bg-muted"
                                    : message.isPending
                                      ? "bg-primary/70 text-primary-foreground"
                                      : "bg-primary text-primary-foreground"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs opacity-70">{formatTime(message.createdAt)}</span>
                                  {message.isPending && (
                                    <span className="text-xs flex items-center gap-1">
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                      Sending...
                                    </span>
                                  )}
                                </div>
                                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                  {adminTyping && (
                    <div className="flex justify-start mt-4">
                      <div className="bg-muted rounded-lg p-3 animate-pulse">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t">
                {/* File uploads preview */}
                {fileUploads.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2 w-full">
                    {fileUploads.map((upload, index) => (
                      <div key={index} className="relative bg-muted rounded-md p-2 pr-8">
                        <div className="flex items-center gap-2">
                          {upload.file.type.startsWith("image/") ? (
                            <Image className="h-4 w-4" />
                          ) : (
                            <File className="h-4 w-4" />
                          )}
                          <span className="text-xs truncate max-w-[150px]">{upload.file.name}</span>
                        </div>
                        {upload.uploading && <Progress value={upload.progress} className="h-1 mt-1 w-full" />}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 absolute top-1 right-1 p-0"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex w-full gap-2">
                  <div className="flex gap-2">
                    <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" />
                      </PopoverContent>
                    </Popover>

                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <PaperclipIcon className="h-4 w-4" />
                      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} multiple />
                    </Button>
                  </div>

                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onInput={handleTyping}
                    disabled={!isConnected && queueLength === 0}
                    className="flex-1"
                  />

                  <Button
                    onClick={handleSendMessage}
                    disabled={(!newMessage.trim() && fileUploads.length === 0) || isSending}
                    className="shrink-0"
                  >
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>

                {!isConnected && (
                  <p className="text-xs text-amber-600 mt-2 w-full text-center flex items-center justify-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Offline mode - Messages will be sent when connection is restored
                    {queueLength > 0 && ` (${queueLength} pending)`}
                  </p>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

