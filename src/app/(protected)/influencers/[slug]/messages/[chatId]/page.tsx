// "use client"

// import { useEffect, useState, useRef } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar } from "@/components/ui/avatar"
// import { Send, ArrowLeft, Clock, CheckCheck } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/hooks/use-toast"
// import { getChatById, sendMessage, markChatAsRead } from "@/actions/collab/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"

// export default function ChatPage() {
//   const params = useParams()
//   const router = useRouter()
//   const chatId = params.chatId as string
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [chat, setChat] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState<string | null>(null)

//   // Fetch current user
//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const user = await onUserInfor()
//       if (user.data?.id) {
//         setUserId(user.data.id)
//       } else {
//         // Redirect to login if not authenticated
//         router.push("/login")
//       }
//     }

//     fetchCurrentUser()
//   }, [router])

//   // Fetch chat data
//   useEffect(() => {
//     const fetchChat = async () => {
//       if (!userId || !chatId) return

//       try {
//         const { status, data, message } = await getChatById(chatId)

//         if (status === 200 && data) {
//           setChat(data)
//         } else {
//           toast({
//             title: "Error",
//             description: message || "Failed to load chat",
//             variant: "destructive",
//           })
//           router.push("/messages")
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred",
//           variant: "destructive",
//         })
//         router.push("/messages")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (userId && chatId) {
//       fetchChat()
//     }
//   }, [userId, chatId, router])

//   // Set up real-time subscription for new messages
//   useEffect(() => {
//     if (!chatId) return

//     // Subscribe to chat channel
//     const channel = pusherClient.subscribe(`chat-${chatId}`)

//     // Handle new messages
//     channel.bind("new-message", (newMessage: any) => {
//       setChat((prevChat: any) => {
//         if (!prevChat) return prevChat

//         // Add new message to chat
//         return {
//           ...prevChat,
//           messages: [...prevChat.messages, newMessage],
//         }
//       })

//       // Mark message as read
//       markChatAsRead(chatId)
//     })

//     return () => {
//       pusherClient.unsubscribe(`chat-${chatId}`)
//     }
//   }, [chatId])

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [chat?.messages])

//   // Mark messages as read when viewed
//   useEffect(() => {
//     if (chat && chatId) {
//       markChatAsRead(chatId)
//     }
//   }, [chat, chatId])

//   const handleSendMessage = async () => {
//     if (!message.trim() || !chatId) return

//     try {
//       const { status, data, message: errorMessage } = await sendMessage(chatId, message)

//       if (status === 200 && data) {
//         // Clear input
//         setMessage("")

//         // Add message to chat (optimistic update)
//         setChat((prevChat: any) => ({
//           ...prevChat,
//           messages: [...prevChat.messages, data],
//         }))
//       } else {
//         toast({
//           title: "Error",
//           description: errorMessage || "Failed to send message",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })
//     }
//   }

//   const formatTime = (timestamp: string) => {
//     return new Date(timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   // Get other participant info
//   const getOtherParticipant = () => {
//     if (!chat) return null

//     const otherParticipant = chat.participants.find((p: any) => !p.isCurrentUser)
//     return otherParticipant
//   }

//   if (loading) {
//     return (
//       <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
//         <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
//           <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
//             <div className="flex-1 flex flex-col">
//               <div className="p-4 border-b border-gray-800 flex items-center gap-3">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <div>
//                   <Skeleton className="h-5 w-32" />
//                   <Skeleton className="h-4 w-24 mt-1" />
//                 </div>
//               </div>
//               <div className="flex-1 p-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"} mb-4`}>
//                     <Skeleton className={`h-12 ${i % 2 === 0 ? "w-64" : "w-48"} rounded-lg`} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const otherParticipant = getOtherParticipant()

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
//       <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
//         <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
//           <div className="flex-1 flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-800 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Button variant="ghost" size="icon" onClick={() => router.push("/messages")} className="mr-2">
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//                 <Avatar className="h-10 w-10 bg-gray-700">
//                   <div className="text-lg font-semibold text-white">
//                     {otherParticipant?.influencerName?.charAt(0) || otherParticipant?.businessName?.charAt(0) || "?"}
//                   </div>
//                 </Avatar>
//                 <div>
//                   <h3 className="font-medium text-white">
//                     {otherParticipant?.influencerName || otherParticipant?.businessName || "Chat"}
//                   </h3>
//                   <p className="text-xs text-gray-400">{otherParticipant?.influencerId ? "Influencer" : "Business"}</p>
//                 </div>
//               </div>
//               <div>
//                 {otherParticipant?.influencerId && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="text-gray-300 border-gray-700"
//                     onClick={() => router.push(`/influencers/${otherParticipant.influencerId}`)}
//                   >
//                     View Profile
//                   </Button>
//                 )}
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {chat.messages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
//                     <Send className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
//                 </div>
//               ) : (
//                 chat.messages.map((msg: any) => (
//                   <div key={msg.id} className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[70%] rounded-lg p-3 ${
//                         msg.sender.isCurrentUser ? "bg-gray-800 text-white" : "bg-gray-700 text-white"
//                       }`}
//                     >
//                       <p className="mt-1">{msg.content}</p>
//                       <div className="flex justify-end mt-1 gap-2 items-center">
//                         <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                         {msg.sender.isCurrentUser && (
//                           <span className="text-xs text-gray-400">
//                             {msg.isRead ? <CheckCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t border-gray-800">
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault()
//                       handleSendMessage()
//                     }
//                   }}
//                   className="bg-gray-800 border-gray-700 text-white"
//                 />
//                 <Button
//                   onClick={handleSendMessage}
//                   className="bg-gray-800 hover:bg-gray-700"
//                   disabled={!message.trim()}
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Send, ArrowLeft, Clock, CheckCheck, Smile, PaperclipIcon, Calendar, MoreHorizontal } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/collab/chat-actions"
import { pusherClient } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageTemplates } from "@/components/global/templates/message-templates"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.chatId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Fetch chat data
  useEffect(() => {
    const fetchChat = async () => {
      if (!userId || !chatId) return

      try {
        const { status, data, message } = await getChatById(chatId)

        if (status === 200 && data) {
          setChat(data)
        } else {
          toast({
            title: "Error",
            description: message || "Failed to load chat",
            variant: "destructive",
          })
          router.push("/messages")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
        router.push("/messages")
      } finally {
        setLoading(false)
      }
    }

    if (userId && chatId) {
      fetchChat()
    }
  }, [userId, chatId, router])

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!chatId || !pusherClient) return

    // Subscribe to chat channel
    const channel = pusherClient.subscribe(`chat-${chatId}`)

    // Handle new messages
    channel.bind("new-message", (newMessage: any) => {
      setChat((prevChat: any) => {
        if (!prevChat) return prevChat

        // Add new message to chat
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }
      })

      // Mark message as read
      markChatAsRead(chatId)
    })

    // Handle typing indicator
    channel.bind("typing", (data: any) => {
      if (data.userId !== userId) {
        setIsTyping(true)

        // Clear typing indicator after 3 seconds of inactivity
        setTimeout(() => {
          setIsTyping(false)
        }, 3000)
      }
    })

    return () => {
      pusherClient.unsubscribe(`chat-${chatId}`)
    }
  }, [chatId, userId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages])

  // Mark messages as read when viewed
  useEffect(() => {
    if (chat && chatId) {
      markChatAsRead(chatId)
    }
  }, [chat, chatId])

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId) return

    try {
      const { status, data, message: errorMessage } = await sendMessage(chatId, message)

      if (status === 200 && data) {
        // Clear input
        setMessage("")

        // Add message to chat (optimistic update)
        setChat((prevChat: any) => ({
          ...prevChat,
          messages: [...prevChat.messages, data],
        }))
      } else {
        toast({
          title: "Error",
          description: errorMessage || "Failed to send message",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)

    // Send typing indicator
    if (chatId) {
      // Clear previous timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }

      // Throttle typing events to avoid flooding the channel
      const newTimeout = setTimeout(() => {
        sendTypingIndicator(chatId)
      }, 500)

      setTypingTimeout(newTimeout)
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native)
  }

  const handleTemplateSelect = (templateText: string) => {
    setMessage(templateText)
    setShowTemplates(false)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For now, just show a toast that file upload is coming soon
    toast({
      title: "Coming Soon",
      description: "File uploads will be available in the next update!",
    })

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
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
      return date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    }
  }

  // Group messages by date
  const groupMessagesByDate = (messages: any[]) => {
    const groups: { [key: string]: any[] } = {}

    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(msg)
    })

    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages,
    }))
  }

  // Get other participant info
  const getOtherParticipant = () => {
    if (!chat) return null

    const otherParticipant = chat.participants.find((p: any) => !p.isCurrentUser)
    return otherParticipant
  }

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
        <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
          <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
              </div>
              <div className="flex-1 p-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"} mb-4`}>
                    <Skeleton className={`h-12 ${i % 2 === 0 ? "w-64" : "w-48"} rounded-lg`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const otherParticipant = getOtherParticipant()
  const messageGroups = chat.messages ? groupMessagesByDate(chat.messages) : []

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
      <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
        <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => router.push("/messages")} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10 bg-gray-700">
                  <div className="text-lg font-semibold text-white">
                    {otherParticipant?.influencerName?.charAt(0) || otherParticipant?.businessName?.charAt(0) || "?"}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">
                    {otherParticipant?.influencerName || otherParticipant?.businessName || "Chat"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {isTyping ? (
                      <span className="text-green-400">Typing...</span>
                    ) : otherParticipant?.influencerId ? (
                      "Influencer"
                    ) : (
                      "Business"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {otherParticipant?.influencerId && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-300 border-gray-700"
                    onClick={() => router.push(`/influencers/${otherParticipant.influencerId}`)}
                  >
                    View Profile
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Schedule Meeting</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
                      Clear Chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {chat.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Send className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
                  <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
                </div>
              ) : (
                messageGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-400">
                        {formatDate(group.messages[0].createdAt)}
                      </div>
                    </div>

                    {group.messages.map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.sender.isCurrentUser ? "bg-gray-800 text-white" : "bg-gray-700 text-white"
                          }`}
                        >
                          <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
                          <div className="flex justify-end mt-1 gap-2 items-center">
                            <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                            {msg.sender.isCurrentUser && (
                              <span className="text-xs text-gray-400">
                                {msg.isRead ? <CheckCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-800">
              {showTemplates && (
                <div className="mb-4">
                  <MessageTemplates onSelect={handleTemplateSelect} />
                </div>
              )}
              <div className="flex gap-2 items-center">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    <Calendar className="h-5 w-5" />
                  </Button>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <Smile className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-gray-700 bg-gray-800" side="top" align="start">
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={handleFileUpload}
                  >
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </div>

                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="bg-gray-800 border-gray-700 text-white"
                />

                <Button
                  onClick={handleSendMessage}
                  className="bg-gray-800 hover:bg-gray-700"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
