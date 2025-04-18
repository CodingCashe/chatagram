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
// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"

// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar } from "@/components/ui/avatar"
// import { Send, ArrowLeft, Clock, CheckCheck, Smile, PaperclipIcon, Calendar, MoreHorizontal } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/hooks/use-toast"
// import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/collab/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MessageTemplates } from "@/components/global/templates/message-templates"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"

// export default function ChatPage() {
//   const params = useParams()
//   const router = useRouter()
//   const chatId = params.chatId as string
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [chat, setChat] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState<string | null>(null)
//   const [isTyping, setIsTyping] = useState(false)
//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
//   const [showTemplates, setShowTemplates] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

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
//     if (!chatId || !pusherClient) return

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

//     // Handle typing indicator
//     channel.bind("typing", (data: any) => {
//       if (data.userId !== userId) {
//         setIsTyping(true)

//         // Clear typing indicator after 3 seconds of inactivity
//         setTimeout(() => {
//           setIsTyping(false)
//         }, 3000)
//       }
//     })

//     return () => {
//       pusherClient.unsubscribe(`chat-${chatId}`)
//     }
//   }, [chatId, userId])

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

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value)

//     // Send typing indicator
//     if (chatId) {
//       // Clear previous timeout
//       if (typingTimeout) {
//         clearTimeout(typingTimeout)
//       }

//       // Throttle typing events to avoid flooding the channel
//       const newTimeout = setTimeout(() => {
//         sendTypingIndicator(chatId)
//       }, 500)

//       setTypingTimeout(newTimeout)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setMessage((prev) => prev + emoji.native)
//   }

//   const handleTemplateSelect = (templateText: string) => {
//     setMessage(templateText)
//     setShowTemplates(false)
//   }

//   const handleFileUpload = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // For now, just show a toast that file upload is coming soon
//     toast({
//       title: "Coming Soon",
//       description: "File uploads will be available in the next update!",
//     })

//     // Reset the input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
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
//       return date.toLocaleDateString(undefined, {
//         weekday: "long",
//         month: "short",
//         day: "numeric",
//       })
//     }
//   }

//   // Group messages by date
//   const groupMessagesByDate = (messages: any[]) => {
//     const groups: { [key: string]: any[] } = {}

//     messages.forEach((msg) => {
//       const date = new Date(msg.createdAt).toDateString()
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(msg)
//     })

//     return Object.entries(groups).map(([date, messages]) => ({
//       date,
//       messages,
//     }))
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
//   const messageGroups = chat.messages ? groupMessagesByDate(chat.messages) : []

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
//                   <p className="text-xs text-gray-400">
//                     {isTyping ? (
//                       <span className="text-green-400">Typing...</span>
//                     ) : otherParticipant?.influencerId ? (
//                       "Influencer"
//                     ) : (
//                       "Business"
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
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
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreHorizontal className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Schedule Meeting</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
//                       Clear Chat
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6">
//               {chat.messages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
//                     <Send className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
//                 </div>
//               ) : (
//                 messageGroups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="space-y-4">
//                     <div className="flex justify-center">
//                       <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-400">
//                         {formatDate(group.messages[0].createdAt)}
//                       </div>
//                     </div>

//                     {group.messages.map((msg: any) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg p-3 ${
//                             msg.sender.isCurrentUser ? "bg-gray-800 text-white" : "bg-gray-700 text-white"
//                           }`}
//                         >
//                           <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
//                           <div className="flex justify-end mt-1 gap-2 items-center">
//                             <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                             {msg.sender.isCurrentUser && (
//                               <span className="text-xs text-gray-400">
//                                 {msg.isRead ? <CheckCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t border-gray-800">
//               {showTemplates && (
//                 <div className="mb-4">
//                   <MessageTemplates onSelect={handleTemplateSelect} />
//                 </div>
//               )}
//               <div className="flex gap-2 items-center">
//                 <div className="flex gap-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowTemplates(!showTemplates)}
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                   >
//                     <Calendar className="h-5 w-5" />
//                   </Button>

//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0 border-gray-700 bg-gray-800" side="top" align="start">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>

//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                     onClick={handleFileUpload}
//                   >
//                     <PaperclipIcon className="h-5 w-5" />
//                   </Button>

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept="image/*,.pdf,.doc,.docx"
//                   />
//                 </div>

//                 <Input
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={handleInputChange}
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

// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"
// import { DashboardShell } from "@/components/global/influencer-relation/dashboard/updat/dashboard-shell"
// import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar } from "@/components/ui/avatar"
// import { Send, ArrowLeft, Clock, CheckCheck, Smile, PaperclipIcon, Calendar, MoreHorizontal } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/hooks/use-toast"
// import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/collab/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MessageTemplates } from "@/components/global/templates/message-templates"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"

// export default function ChatPage() {
//   const params = useParams()
//   const router = useRouter()
//   const chatId = params.chatId as string
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [chat, setChat] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState<string | null>(null)
//   const [isTyping, setIsTyping] = useState(false)
//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
//   const [showTemplates, setShowTemplates] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

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
//     if (!chatId || !pusherClient) return

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

//     // Handle typing indicator
//     channel.bind("typing", (data: any) => {
//       if (data.userId !== userId) {
//         setIsTyping(true)

//         // Clear typing indicator after 3 seconds of inactivity
//         setTimeout(() => {
//           setIsTyping(false)
//         }, 3000)
//       }
//     })

//     return () => {
//       pusherClient.unsubscribe(`chat-${chatId}`)
//     }
//   }, [chatId, userId])

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

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value)

//     // Send typing indicator
//     if (chatId) {
//       // Clear previous timeout
//       if (typingTimeout) {
//         clearTimeout(typingTimeout)
//       }

//       // Throttle typing events to avoid flooding the channel
//       const newTimeout = setTimeout(() => {
//         sendTypingIndicator(chatId)
//       }, 500)

//       setTypingTimeout(newTimeout)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setMessage((prev) => prev + emoji.native)
//   }

//   const handleTemplateSelect = (templateText: string) => {
//     setMessage(templateText)
//     setShowTemplates(false)
//   }

//   const handleFileUpload = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // For now, just show a toast that file upload is coming soon
//     toast({
//       title: "Coming Soon",
//       description: "File uploads will be available in the next update!",
//     })

//     // Reset the input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
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
//       return date.toLocaleDateString(undefined, {
//         weekday: "long",
//         month: "short",
//         day: "numeric",
//       })
//     }
//   }

//   // Group messages by date
//   const groupMessagesByDate = (messages: any[]) => {
//     const groups: { [key: string]: any[] } = {}

//     messages.forEach((msg) => {
//       const date = new Date(msg.createdAt).toDateString()
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(msg)
//     })

//     return Object.entries(groups).map(([date, messages]) => ({
//       date,
//       messages,
//     }))
//   }

//   // Get other participant info
//   const getOtherParticipant = () => {
//     if (!chat) return null

//     const otherParticipant = chat.participants.find((p: any) => !p.isCurrentUser)
//     return otherParticipant
//   }

//   if (loading) {
//     return (
//       <DashboardShell>
//       <DashboardHeader heading="Opportunities" text="Find and apply to opportunities that match your profile" />
            
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
//       </DashboardShell>
//     )
//   }

//   const otherParticipant = getOtherParticipant()
//   const messageGroups = chat.messages ? groupMessagesByDate(chat.messages) : []

//   return (
//     <DashboardShell>
//     <DashboardHeader heading="Opportunities" text="Find and apply to opportunities that match your profile" />
            
    
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
//                   <p className="text-xs text-gray-400">
//                     {isTyping ? (
//                       <span className="text-green-400">Typing...</span>
//                     ) : otherParticipant?.influencerId ? (
//                       "Influencer"
//                     ) : (
//                       "Business"
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
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
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreHorizontal className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Schedule Meeting</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
//                       Clear Chat
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6">
//               {chat.messages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
//                     <Send className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
//                 </div>
//               ) : (
//                 messageGroups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="space-y-4">
//                     <div className="flex justify-center">
//                       <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-400">
//                         {formatDate(group.messages[0].createdAt)}
//                       </div>
//                     </div>

//                     {group.messages.map((msg: any) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg p-3 ${
//                             msg.sender.isCurrentUser ? "bg-gray-800 text-white" : "bg-gray-700 text-white"
//                           }`}
//                         >
//                           <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
//                           <div className="flex justify-end mt-1 gap-2 items-center">
//                             <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                             {msg.sender.isCurrentUser && (
//                               <span className="text-xs text-gray-400">
//                                 {msg.isRead ? <CheckCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t border-gray-800">
//               {showTemplates && (
//                 <div className="mb-4">
//                   <MessageTemplates onSelect={handleTemplateSelect} />
//                 </div>
//               )}
//               <div className="flex gap-2 items-center">
//                 <div className="flex gap-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowTemplates(!showTemplates)}
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                   >
//                     <Calendar className="h-5 w-5" />
//                   </Button>

//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0 border-gray-700 bg-gray-800" side="top" align="start">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>

//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                     onClick={handleFileUpload}
//                   >
//                     <PaperclipIcon className="h-5 w-5" />
//                   </Button>

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept="image/*,.pdf,.doc,.docx"
//                   />
//                 </div>

//                 <Input
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={handleInputChange}
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
//     </DashboardShell>
//   )
// }


// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar } from "@/components/ui/avatar"
// import {
//   Send,
//   ArrowLeft,
//   Clock,
//   CheckCircle,
//   CheckCheck,
//   Smile,
//   PaperclipIcon,
//   Calendar,
//   MoreHorizontal,
//   FileText,
//   Mic,
//   ImageIcon,
// } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/hooks/use-toast"
// import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/collab/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MessageTemplates } from "@/components/global/templates/message-templates"
// import { ScheduleMeeting } from "@/components/global/templates/schedule-meeting"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// // Add this import at the top of the file
// import { MeetingInvitation } from "@/components/global/templates/meeting-invitation"

// export default function ChatPage() {
//   const params = useParams()
//   const router = useRouter()
//   const chatId = params.chatId as string
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [chat, setChat] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState<string | null>(null)
//   const [isTyping, setIsTyping] = useState(false)
//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
//   const [showTemplates, setShowTemplates] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [messageStatus, setMessageStatus] = useState<Record<string, "sending" | "sent" | "delivered" | "read">>({})
//   const [optimisticMessages, setOptimisticMessages] = useState<any[]>([])

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

//           // Set initial message statuses
//           const initialStatuses: Record<string, "sending" | "sent" | "delivered" | "read"> = {}
//           data.messages.forEach((msg: any) => {
//             if (msg.sender.isCurrentUser) {
//               initialStatuses[msg.id] = msg.isRead ? "read" : "delivered"
//             }
//           })
//           setMessageStatus(initialStatuses)
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
//     if (!chatId || !pusherClient) return

//     // Subscribe to chat channel
//     const channel = pusherClient.subscribe(`chat-${chatId}`)

//     // Handle new messages
//     channel.bind("new-message", (newMessage: any) => {
//       // Only add the message if it's not from the current user
//       // This prevents duplicate messages
//       if (!newMessage.sender.isCurrentUser) {
//         setChat((prevChat: any) => {
//           if (!prevChat) return prevChat

//           // Add new message to chat
//           return {
//             ...prevChat,
//             messages: [...prevChat.messages, newMessage],
//           }
//         })

//         // Mark message as read
//         markChatAsRead(chatId)
//       } else {
//         // Update message status for sent messages
//         setMessageStatus((prev) => ({
//           ...prev,
//           [newMessage.id]: "delivered",
//         }))

//         // Remove from optimistic messages if it exists
//         setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== newMessage.tempId))
//       }
//     })

//     // Handle message read status updates
//     channel.bind("message-read", (data: any) => {
//       if (data.messageIds && data.messageIds.length > 0) {
//         setMessageStatus((prev) => {
//           const updated = { ...prev }
//           data.messageIds.forEach((id: string) => {
//             if (updated[id]) {
//               updated[id] = "read"
//             }
//           })
//           return updated
//         })
//       }
//     })

//     // Handle typing indicator
//     channel.bind("typing", (data: any) => {
//       if (data.userId !== userId) {
//         setIsTyping(true)

//         // Clear typing indicator after 3 seconds of inactivity
//         setTimeout(() => {
//           setIsTyping(false)
//         }, 3000)
//       }
//     })

//     return () => {
//       pusherClient.unsubscribe(`chat-${chatId}`)
//     }
//   }, [chatId, userId])

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [chat?.messages, optimisticMessages])

//   // Mark messages as read when viewed
//   useEffect(() => {
//     if (chat && chatId) {
//       markChatAsRead(chatId)
//     }
//   }, [chat, chatId])

//   const handleSendMessage = async () => {
//     if (!message.trim() || !chatId) return

//     // Create a temporary ID for optimistic UI
//     const tempId = `temp-${Date.now()}`

//     // Create optimistic message
//     const optimisticMessage = {
//       id: tempId,
//       tempId,
//       content: message,
//       contentType: "text",
//       createdAt: new Date().toISOString(),
//       isRead: false,
//       sender: {
//         id: userId,
//         isCurrentUser: true,
//       },
//     }

//     // Add to optimistic messages
//     setOptimisticMessages((prev) => [...prev, optimisticMessage])

//     // Set initial status
//     setMessageStatus((prev) => ({
//       ...prev,
//       [tempId]: "sending",
//     }))

//     // Clear input
//     setMessage("")

//     try {
//       const { status, data, message: errorMessage } = await sendMessage(chatId, message)

//       if (status === 200 && data) {
//         // Update message status
//         setMessageStatus((prev) => ({
//           ...prev,
//           [tempId]: "sent",
//           [data.id]: "sent",
//         }))

//         // The real message will be added via Pusher
//       } else {
//         // Show error and keep the optimistic message with an error state
//         toast({
//           title: "Error",
//           description: errorMessage || "Failed to send message",
//           variant: "destructive",
//         })

//         // Remove failed message from optimistic messages
//         setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })

//       // Remove failed message from optimistic messages
//       setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value)

//     // Send typing indicator
//     if (chatId) {
//       // Clear previous timeout
//       if (typingTimeout) {
//         clearTimeout(typingTimeout)
//       }

//       // Throttle typing events to avoid flooding the channel
//       const newTimeout = setTimeout(() => {
//         sendTypingIndicator(chatId)
//       }, 500)

//       setTypingTimeout(newTimeout)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setMessage((prev) => prev + emoji.native)
//   }

//   const handleTemplateSelect = (templateText: string) => {
//     setMessage(templateText)
//     setShowTemplates(false)
//   }

//   const handleFileUpload = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // For now, just show a toast that file upload is coming soon
//     toast({
//       title: "Coming Soon",
//       description: "File uploads will be available in the next update!",
//       variant: "info",
//     })

//     // Reset the input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const handleScheduleMeeting = (meetingData: any) => {
//     // Format meeting details as a message
//     const meetingMessage = `📅 Meeting Invitation\n\nTopic: ${meetingData.topic}\nDate: ${meetingData.date}\nTime: ${meetingData.time}\nDuration: ${meetingData.duration} minutes\n\n${meetingData.notes ? `Notes: ${meetingData.notes}` : ""}`

//     // Send the meeting invitation as a message
//     if (chatId) {
//       sendMessage(chatId, meetingMessage)

//       toast({
//         title: "Meeting Scheduled",
//         description: "Your meeting invitation has been sent",
//         variant: "success",
//       })
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
//       return date.toLocaleDateString(undefined, {
//         weekday: "long",
//         month: "short",
//         day: "numeric",
//       })
//     }
//   }

//   // Group messages by date
//   const groupMessagesByDate = (messages: any[]) => {
//     const groups: { [key: string]: any[] } = {}

//     messages.forEach((msg) => {
//       const date = new Date(msg.createdAt).toDateString()
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(msg)
//     })

//     return Object.entries(groups).map(([date, messages]) => ({
//       date,
//       messages,
//     }))
//   }

//   // Get other participant info
//   const getOtherParticipant = () => {
//     if (!chat) return null

//     const otherParticipant = chat.participants.find((p: any) => !p.isCurrentUser)
//     return otherParticipant
//   }

//   // Render message status indicator
//   const renderMessageStatus = (messageId: string) => {
//     const status = messageStatus[messageId]

//     switch (status) {
//       case "sending":
//         return <Clock className="h-3 w-3 text-gray-400" />
//       case "sent":
//         return <CheckCircle className="h-3 w-3 text-gray-400" />
//       case "delivered":
//         return <CheckCheck className="h-3 w-3 text-gray-400" />
//       case "read":
//         return <CheckCheck className="h-3 w-3 text-blue-400" />
//       default:
//         return <Clock className="h-3 w-3 text-gray-400" />
//     }
//   }

//   // Combine regular and optimistic messages
//   const getAllMessages = () => {
//     const regularMessages = chat?.messages || []
//     return [...regularMessages, ...optimisticMessages]
//   }

//   // Add this helper function before the return statement
//   const isMeetingInvitation = (content: string) => {
//     return content.startsWith("📅 Meeting Invitation")
//   }

//   // Replace the parseMeetingData function with this improved version
//   const parseMeetingData = (content: string) => {
//     try {
//       const lines = content.split("\n")

//       // Extract topic (after "Topic: ")
//       const topicLine = lines.find((line) => line.startsWith("Topic:"))
//       const topic = topicLine ? topicLine.replace("Topic:", "").trim() : "Meeting"

//       // Extract date (after "Date: ")
//       const dateLine = lines.find((line) => line.startsWith("Date:"))
//       const date = dateLine ? dateLine.replace("Date:", "").trim() : ""

//       // Extract time (after "Time: ")
//       const timeLine = lines.find((line) => line.startsWith("Time:"))
//       const time = timeLine ? timeLine.replace("Time:", "").trim() : ""

//       // Extract duration (after "Duration: ")
//       const durationLine = lines.find((line) => line.startsWith("Duration:"))
//       const durationText = durationLine ? durationLine.replace("Duration:", "").trim() : "30 minutes"
//       const duration = durationText.split(" ")[0] // Extract just the number

//       // Extract notes (after "Notes: ")
//       const notesLine = lines.find((line) => line.startsWith("Notes:"))
//       const notes = notesLine ? notesLine.replace("Notes:", "").trim() : ""

//       return {
//         topic,
//         date,
//         time,
//         duration,
//         notes,
//       }
//     } catch (error) {
//       console.error("Error parsing meeting data:", error)
//       return null
//     }
//   }

//   // Replace the respondToMeeting function with this updated version
//   const handleMeetingResponse = async (messageId: string, action: "accept" | "decline") => {
//     try {
//       // Optimistically update the UI
//       toast({
//         title: action === "accept" ? "Meeting Accepted" : "Meeting Declined",
//         description:
//           action === "accept"
//             ? "You have accepted this meeting invitation"
//             : "You have declined this meeting invitation",
//         variant: action === "accept" ? "success" : "info",
//       })

//       // Send the meeting response to the server
//       const response = await fetch(`/api/meetings/respond`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chatId,
//           messageId,
//           action,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to respond to meeting: ${response.status}`)
//       }

//       // Optionally, handle the server response here
//       const result = await response.json()
//       console.log("Meeting response result:", result)
//     } catch (error: any) {
//       console.error("Error responding to meeting:", error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to respond to meeting",
//         variant: "destructive",
//       })
//     }
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
//   const allMessages = getAllMessages()
//   const messageGroups = allMessages.length > 0 ? groupMessagesByDate(allMessages) : []

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
//       <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
//         <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
//           <div className="flex-1 flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80 backdrop-blur-sm">
//               <div className="flex items-center gap-3">
//                 <Button variant="ghost" size="icon" onClick={() => router.push("/messages")} className="mr-2">
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//                 <Avatar className="h-10 w-10 bg-gray-700 flex items-center justify-center overflow-hidden">
//                   {otherParticipant?.influencerId ? (
//                     <img src="/influencer-svg.svg" alt="Influencer" className="w-8 h-8" />
//                   ) : otherParticipant?.businessId ? (
//                     <img src="/business-svg.svg" alt="Business" className="w-8 h-8" />
//                   ) : (
//                     <div className="text-lg font-semibold text-white">?</div>
//                   )}
//                 </Avatar>
//                 <div>
//                   <h3 className="font-medium text-white">
//                     {otherParticipant?.influencerName || otherParticipant?.businessName || "Chat"}
//                   </h3>
//                   <p className="text-xs text-gray-400">
//                     {isTyping ? (
//                       <span className="text-green-400">Typing...</span>
//                     ) : otherParticipant?.influencerId ? (
//                       "Influencer"
//                     ) : (
//                       "Business"
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
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
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreHorizontal className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
//                       Clear Chat
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-gray-900 to-gray-950">
//               {allMessages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
//                     <Send className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
//                 </div>
//               ) : (
//                 messageGroups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="space-y-4">
//                     <div className="flex justify-center">
//                       <div className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-400">
//                         {formatDate(group.messages[0].createdAt)}
//                       </div>
//                     </div>

//                     {group.messages.map((msg: any) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg p-3 relative overflow-hidden ${
//                             isMeetingInvitation(msg.content)
//                               ? "bg-transparent" // No background for meeting invitations
//                               : msg.sender.isCurrentUser
//                                 ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 text-white"
//                                 : "bg-gradient-to-br from-gray-800/90 to-gray-900/80 text-white"
//                           }`}
//                         >
//                           {!isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Subtle shimmer effect */}
//                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent subtle-shimmer opacity-30 pointer-events-none"></div>
//                               <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
//                               <div className="flex justify-end mt-1 gap-2 items-center">
//                                 <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                 {msg.sender.isCurrentUser && (
//                                   <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Render meeting invitation component */}
//                               {(() => {
//                                 const meetingData = parseMeetingData(msg.content)
//                                 if (!meetingData) return <p className="whitespace-pre-wrap">{msg.content}</p>

//                                 // Check if there's a response message for this meeting
//                                 const hasAcceptedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Accepted") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const hasDeclinedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Declined") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const meetingStatus = hasAcceptedResponse
//                                   ? "accepted"
//                                   : hasDeclinedResponse
//                                     ? "declined"
//                                     : "pending"

//                                 return (
//                                   <div className="w-full">
//                                     <MeetingInvitation
//                                       topic={meetingData.topic}
//                                       date={meetingData.date}
//                                       time={meetingData.time}
//                                       duration={meetingData.duration}
//                                       notes={meetingData.notes}
//                                       status={meetingStatus}
//                                       isCurrentUserSender={msg.sender.isCurrentUser}
//                                       onAccept={() => handleMeetingResponse(msg.id, "accept")}
//                                       onDecline={() => handleMeetingResponse(msg.id, "decline")}
//                                     />
//                                     <div className="flex justify-end mt-1 gap-2 items-center">
//                                       <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                       {msg.sender.isCurrentUser && (
//                                         <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                       )}
//                                     </div>
//                                   </div>
//                                 )
//                               })()}
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t border-gray-800 bg-gray-900/90 backdrop-blur-sm">
//               {showTemplates && (
//                 <div className="mb-4">
//                   <MessageTemplates onSelect={handleTemplateSelect} />
//                 </div>
//               )}
//               <div className="flex gap-2 items-center">
//                 <div className="flex gap-2">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0 border-gray-700 bg-gray-800" side="top" align="start">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <PaperclipIcon className="h-5 w-5" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <FileText className="h-4 w-4 mr-2" />
//                         Document
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <ImageIcon className="h-4 w-4 mr-2" />
//                         Image
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
//                         <Mic className="h-4 w-4 mr-2" />
//                         Voice Message
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept="image/*,.pdf,.doc,.docx"
//                   />

//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowTemplates(!showTemplates)}
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                   >
//                     <Calendar className="h-5 w-5" />
//                   </Button>

//                   <ScheduleMeeting
//                     conversationId={chatId}
//                     recipientId={otherParticipant?.id || ""}
//                     onSchedule={handleScheduleMeeting}
//                   />
//                 </div>

//                 <Input
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault()
//                       handleSendMessage()
//                     }
//                   }}
//                   className="bg-gray-800 border-gray-700 text-white focus:ring-blue-600 focus:border-blue-600"
//                 />

//                 <Button
//                   onClick={handleSendMessage}
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
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


// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar } from "@/components/ui/avatar"
// import {
//   Send,
//   ArrowLeft,
//   Clock,
//   CheckCircle,
//   CheckCheck,
//   Smile,
//   PaperclipIcon,
//   Calendar,
//   MoreHorizontal,
//   FileText,
//   Mic,
//   ImageIcon,
// } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/hooks/use-toast"
// import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/collab/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MessageTemplates } from "@/components/global/templates/message-templates"
// import { ScheduleMeeting } from "@/components/global/templates/schedule-meeting"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// // Add this import at the top of the file
// import { MeetingInvitation } from "@/components/global/templates/meeting-invitation"

// export default function ChatPage() {
//   const params = useParams()
//   const router = useRouter()
//   const chatId = params.chatId as string
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [chat, setChat] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState<string | null>(null)
//   const [isTyping, setIsTyping] = useState(false)
//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
//   const [showTemplates, setShowTemplates] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [messageStatus, setMessageStatus] = useState<Record<string, "sending" | "sent" | "delivered" | "read">>({})
//   const [optimisticMessages, setOptimisticMessages] = useState<any[]>([])

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

//           // Set initial message statuses
//           const initialStatuses: Record<string, "sending" | "sent" | "delivered" | "read"> = {}
//           data.messages.forEach((msg: any) => {
//             if (msg.sender.isCurrentUser) {
//               initialStatuses[msg.id] = msg.isRead ? "read" : "delivered"
//             }
//           })
//           setMessageStatus(initialStatuses)
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
//     if (!chatId || !pusherClient) return

//     // Subscribe to chat channel
//     const channel = pusherClient.subscribe(`chat-${chatId}`)

//     // Handle new messages
//     channel.bind("new-message", (newMessage: any) => {
//       if (!newMessage.sender.isCurrentUser) {
//         // Message from other user - add it to the chat
//         setChat((prevChat: any) => {
//           if (!prevChat) return prevChat

//           // Add new message to chat
//           return {
//             ...prevChat,
//             messages: [...prevChat.messages, newMessage],
//           }
//         })

//         // Mark message as read
//         markChatAsRead(chatId)
//       } else {
//         // Message from current user - update the chat and clean up optimistic messages
//         setChat((prevChat: any) => {
//           if (!prevChat) return prevChat

//           // Check if this message already exists in the chat (to prevent duplicates)
//           const messageExists = prevChat.messages.some((msg: any) => msg.id === newMessage.id)

//           if (messageExists) {
//             return prevChat
//           }

//           // Add the confirmed message to the chat
//           return {
//             ...prevChat,
//             messages: [...prevChat.messages, newMessage],
//           }
//         })

//         // Update message status for sent messages
//         setMessageStatus((prev) => ({
//           ...prev,
//           [newMessage.id]: "delivered",
//         }))

//         // Clean up any optimistic messages that match this confirmed message
//         setOptimisticMessages((prev) => {
//           return prev.filter((msg) => {
//             // Remove if it's the exact temp message being confirmed
//             if (msg.tempId === newMessage.tempId) return false

//             // Also remove if content matches and was sent around the same time
//             const contentMatches = msg.content === newMessage.content
//             const timeDiff = Math.abs(new Date(msg.createdAt).getTime() - new Date(newMessage.createdAt).getTime())
//             const isRecentEnough = timeDiff < 10000 // 10 seconds

//             // Keep the message if it doesn't match
//             return !(contentMatches && isRecentEnough)
//           })
//         })
//       }
//     })

//     // Handle message read status updates
//     channel.bind("message-read", (data: any) => {
//       if (data.messageIds && data.messageIds.length > 0) {
//         setMessageStatus((prev) => {
//           const updated = { ...prev }
//           data.messageIds.forEach((id: string) => {
//             if (updated[id]) {
//               updated[id] = "read"
//             }
//           })
//           return updated
//         })
//       }
//     })

//     // Handle typing indicator
//     channel.bind("typing", (data: any) => {
//       if (data.userId !== userId) {
//         setIsTyping(true)

//         // Clear typing indicator after 3 seconds of inactivity
//         setTimeout(() => {
//           setIsTyping(false)
//         }, 3000)
//       }
//     })

//     return () => {
//       pusherClient.unsubscribe(`chat-${chatId}`)
//     }
//   }, [chatId, userId])

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [chat?.messages, optimisticMessages])

//   // Mark messages as read when viewed
//   useEffect(() => {
//     if (chat && chatId) {
//       markChatAsRead(chatId)
//     }
//   }, [chat, chatId])

//   const handleSendMessage = async () => {
//     if (!message.trim() || !chatId) return

//     // Store the message content before clearing the input
//     const messageContent = message.trim()

//     // Create a temporary ID for optimistic UI
//     const tempId = `temp-${Date.now()}`

//     // Create optimistic message
//     const optimisticMessage = {
//       id: tempId,
//       tempId,
//       content: messageContent,
//       contentType: "text",
//       createdAt: new Date().toISOString(),
//       isRead: false,
//       sender: {
//         id: userId,
//         isCurrentUser: true,
//       },
//     }

//     // Add to optimistic messages
//     setOptimisticMessages((prev) => [...prev, optimisticMessage])

//     // Set initial status
//     setMessageStatus((prev) => ({
//       ...prev,
//       [tempId]: "sending",
//     }))

//     // Clear input
//     setMessage("")

//     try {
//       const { status, data, message: errorMessage } = await sendMessage(chatId, messageContent)

//       if (status === 200 && data) {
//         // Link the temporary ID with the real message ID
//         setMessageStatus((prev) => ({
//           ...prev,
//           [tempId]: "sent",
//           [data.id]: "sent",
//         }))

//         // Store the relationship between temp ID and real ID
//         // This helps with cleaning up optimistic messages when real ones arrive
//         optimisticMessage.realId = data.id

//         // The real message will be added via Pusher, and the optimistic one
//         // will be filtered out by our improved getAllMessages function
//       } else {
//         // Show error and keep the optimistic message with an error state
//         toast({
//           title: "Error",
//           description: errorMessage || "Failed to send message",
//           variant: "destructive",
//         })

//         // Remove failed message from optimistic messages
//         setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })

//       // Remove failed message from optimistic messages
//       setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value)

//     // Send typing indicator
//     if (chatId) {
//       // Clear previous timeout
//       if (typingTimeout) {
//         clearTimeout(typingTimeout)
//       }

//       // Throttle typing events to avoid flooding the channel
//       const newTimeout = setTimeout(() => {
//         sendTypingIndicator(chatId)
//       }, 500)

//       setTypingTimeout(newTimeout)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setMessage((prev) => prev + emoji.native)
//   }

//   const handleTemplateSelect = (templateText: string) => {
//     setMessage(templateText)
//     setShowTemplates(false)
//   }

//   const handleFileUpload = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // For now, just show a toast that file upload is coming soon
//     toast({
//       title: "Coming Soon",
//       description: "File uploads will be available in the next update!",
//       variant: "info",
//     })

//     // Reset the input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const handleScheduleMeeting = (meetingData: any) => {
//     // Format meeting details as a message
//     const meetingMessage = `📅 Meeting Invitation\n\nTopic: ${meetingData.topic}\nDate: ${meetingData.date}\nTime: ${meetingData.time}\nDuration: ${meetingData.duration} minutes\n\n${meetingData.notes ? `Notes: ${meetingData.notes}` : ""}`

//     // Send the meeting invitation as a message
//     if (chatId) {
//       sendMessage(chatId, meetingMessage)

//       toast({
//         title: "Meeting Scheduled",
//         description: "Your meeting invitation has been sent",
//         variant: "success",
//       })
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
//       return date.toLocaleDateString(undefined, {
//         weekday: "long",
//         month: "short",
//         day: "numeric",
//       })
//     }
//   }

//   // Group messages by date
//   const groupMessagesByDate = (messages: any[]) => {
//     const groups: { [key: string]: any[] } = {}

//     messages.forEach((msg) => {
//       const date = new Date(msg.createdAt).toDateString()
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(msg)
//     })

//     return Object.entries(groups).map(([date, messages]) => ({
//       date,
//       messages,
//     }))
//   }

//   // Get other participant info
//   const getOtherParticipant = () => {
//     if (!chat) return null

//     const otherParticipant = chat.participants.find((p: any) => !p.isCurrentUser)
//     return otherParticipant
//   }

//   // Render message status indicator
//   const renderMessageStatus = (messageId: string) => {
//     const status = messageStatus[messageId]

//     switch (status) {
//       case "sending":
//         return <Clock className="h-3 w-3 text-gray-400" />
//       case "sent":
//         return <CheckCircle className="h-3 w-3 text-gray-400" />
//       case "delivered":
//         return <CheckCheck className="h-3 w-3 text-gray-400" />
//       case "read":
//         return <CheckCheck className="h-3 w-3 text-blue-400" />
//       default:
//         return <Clock className="h-3 w-3 text-gray-400" />
//     }
//   }

//   // Combine regular and optimistic messages
//   const getAllMessages = () => {
//     const regularMessages = chat?.messages || []

//     // Filter out optimistic messages that have corresponding real messages
//     // by checking if any real message has the same content and was sent within a short time window
//     const filteredOptimisticMessages = optimisticMessages.filter((optMsg) => {
//       // Don't show optimistic messages that have a corresponding real message
//       return !regularMessages.some((realMsg) => {
//         // Check if content matches and time difference is small (within 10 seconds)
//         const contentMatches = realMsg.content === optMsg.content
//         const timeDiff = Math.abs(new Date(realMsg.createdAt).getTime() - new Date(optMsg.createdAt).getTime())
//         const isRecentEnough = timeDiff < 10000 // 10 seconds

//         return contentMatches && isRecentEnough && realMsg.sender.isCurrentUser
//       })
//     })

//     return [...regularMessages, ...filteredOptimisticMessages]
//   }

//   // Add this helper function before the return statement
//   const isMeetingInvitation = (content: string) => {
//     return content.startsWith("📅 Meeting Invitation")
//   }

//   // Replace the parseMeetingData function with this improved version
//   const parseMeetingData = (content: string) => {
//     try {
//       const lines = content.split("\n")

//       // Extract topic (after "Topic: ")
//       const topicLine = lines.find((line) => line.startsWith("Topic:"))
//       const topic = topicLine ? topicLine.replace("Topic:", "").trim() : "Meeting"

//       // Extract date (after "Date: ")
//       const dateLine = lines.find((line) => line.startsWith("Date:"))
//       const date = dateLine ? dateLine.replace("Date:", "").trim() : ""

//       // Extract time (after "Time: ")
//       const timeLine = lines.find((line) => line.startsWith("Time:"))
//       const time = timeLine ? timeLine.replace("Time:", "").trim() : ""

//       // Extract duration (after "Duration: ")
//       const durationLine = lines.find((line) => line.startsWith("Duration:"))
//       const durationText = durationLine ? durationLine.replace("Duration:", "").trim() : "30 minutes"
//       const duration = durationText.split(" ")[0] // Extract just the number

//       // Extract notes (after "Notes: ")
//       const notesLine = lines.find((line) => line.startsWith("Notes:"))
//       const notes = notesLine ? notesLine.replace("Notes:", "").trim() : ""

//       return {
//         topic,
//         date,
//         time,
//         duration,
//         notes,
//       }
//     } catch (error) {
//       console.error("Error parsing meeting data:", error)
//       return null
//     }
//   }

//   // Replace the respondToMeeting function with this updated version
//   const handleMeetingResponse = async (messageId: string, action: "accept" | "decline") => {
//     try {
//       // Optimistically update the UI
//       toast({
//         title: action === "accept" ? "Meeting Accepted" : "Meeting Declined",
//         description:
//           action === "accept"
//             ? "You have accepted this meeting invitation"
//             : "You have declined this meeting invitation",
//         variant: action === "accept" ? "success" : "info",
//       })

//       // Send the meeting response to the server
//       const response = await fetch(`/api/meetings/respond`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chatId,
//           messageId,
//           action,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to respond to meeting: ${response.status}`)
//       }

//       // Optionally, handle the server response here
//       const result = await response.json()
//       console.log("Meeting response result:", result)
//     } catch (error: any) {
//       console.error("Error responding to meeting:", error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to respond to meeting",
//         variant: "destructive",
//       })
//     }
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
//   const allMessages = getAllMessages()
//   const messageGroups = allMessages.length > 0 ? groupMessagesByDate(allMessages) : []

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
//       <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
//         <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
//           <div className="flex-1 flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80 backdrop-blur-sm">
//               <div className="flex items-center gap-3">
//                 <Button variant="ghost" size="icon" onClick={() => router.push("/messages")} className="mr-2">
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//                 <Avatar className="h-10 w-10 bg-gray-700 flex items-center justify-center overflow-hidden">
//                   {otherParticipant?.influencerId ? (
//                     <img src="/influencer-svg.svg" alt="Influencer" className="w-8 h-8" />
//                   ) : otherParticipant?.businessId ? (
//                     <img src="/business-svg.svg" alt="Business" className="w-8 h-8" />
//                   ) : (
//                     <div className="text-lg font-semibold text-white">?</div>
//                   )}
//                 </Avatar>
//                 <div>
//                   <h3 className="font-medium text-white">
//                     {otherParticipant?.influencerName || otherParticipant?.businessName || "Chat"}
//                   </h3>
//                   <p className="text-xs text-gray-400">
//                     {isTyping ? (
//                       <span className="text-green-400">Typing...</span>
//                     ) : otherParticipant?.influencerId ? (
//                       "Influencer"
//                     ) : (
//                       "Business"
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
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
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreHorizontal className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
//                       Clear Chat
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-gray-900 to-gray-950">
//               {allMessages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
//                     <Send className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
//                 </div>
//               ) : (
//                 messageGroups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="space-y-4">
//                     <div className="flex justify-center">
//                       <div className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-400">
//                         {formatDate(group.messages[0].createdAt)}
//                       </div>
//                     </div>

//                     {group.messages.map((msg: any) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg p-3 relative overflow-hidden ${
//                             isMeetingInvitation(msg.content)
//                               ? "bg-transparent" // No background for meeting invitations
//                               : msg.sender.isCurrentUser
//                                 ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 text-white"
//                                 : "bg-gradient-to-br from-gray-800/90 to-gray-900/80 text-white"
//                           }`}
//                         >
//                           {!isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Subtle shimmer effect */}
//                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent subtle-shimmer opacity-30 pointer-events-none"></div>
//                               <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
//                               <div className="flex justify-end mt-1 gap-2 items-center">
//                                 <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                 {msg.sender.isCurrentUser && (
//                                   <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Render meeting invitation component */}
//                               {(() => {
//                                 const meetingData = parseMeetingData(msg.content)
//                                 if (!meetingData) return <p className="whitespace-pre-wrap">{msg.content}</p>

//                                 // Check if there's a response message for this meeting
//                                 const hasAcceptedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Accepted") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const hasDeclinedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Declined") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const meetingStatus = hasAcceptedResponse
//                                   ? "accepted"
//                                   : hasDeclinedResponse
//                                     ? "declined"
//                                     : "pending"

//                                 return (
//                                   <div className="w-full">
//                                     <MeetingInvitation
//                                       topic={meetingData.topic}
//                                       date={meetingData.date}
//                                       time={meetingData.time}
//                                       duration={meetingData.duration}
//                                       notes={meetingData.notes}
//                                       status={meetingStatus}
//                                       isCurrentUserSender={msg.sender.isCurrentUser}
//                                       onAccept={() => handleMeetingResponse(msg.id, "accept")}
//                                       onDecline={() => handleMeetingResponse(msg.id, "decline")}
//                                     />
//                                     <div className="flex justify-end mt-1 gap-2 items-center">
//                                       <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                       {msg.sender.isCurrentUser && (
//                                         <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                       )}
//                                     </div>
//                                   </div>
//                                 )
//                               })()}
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t border-gray-800 bg-gray-900/90 backdrop-blur-sm">
//               {showTemplates && (
//                 <div className="mb-4">
//                   <MessageTemplates onSelect={handleTemplateSelect} />
//                 </div>
//               )}
//               <div className="flex gap-2 items-center">
//                 <div className="flex gap-2">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0 border-gray-700 bg-gray-800" side="top" align="start">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <PaperclipIcon className="h-5 w-5" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <FileText className="h-4 w-4 mr-2" />
//                         Document
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <ImageIcon className="h-4 w-4 mr-2" />
//                         Image
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
//                         <Mic className="h-4 w-4 mr-2" />
//                         Voice Message
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept="image/*,.pdf,.doc,.docx"
//                   />

//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowTemplates(!showTemplates)}
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                   >
//                     <Calendar className="h-5 w-5" />
//                   </Button>

//                   <ScheduleMeeting
//                     conversationId={chatId}
//                     recipientId={otherParticipant?.id || ""}
//                     onSchedule={handleScheduleMeeting}
//                   />
//                 </div>

//                 <Input
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault()
//                       handleSendMessage()
//                     }
//                   }}
//                   className="bg-gray-800 border-gray-700 text-white focus:ring-blue-600 focus:border-blue-600"
//                 />

//                 <Button
//                   onClick={handleSendMessage}
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
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


// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar } from "@/components/ui/avatar"
// import {
//   Send,
//   ArrowLeft,
//   Clock,
//   CheckCircle,
//   CheckCheck,
//   Smile,
//   PaperclipIcon,
//   Calendar,
//   MoreHorizontal,
//   FileText,
//   Mic,
//   ImageIcon,
// } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/hooks/use-toast"
// import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/messaging/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MessageTemplates } from "@/components/message-templates"
// import { ScheduleMeeting } from "@/components/schedule-meeting"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// // Add this import at the top of the file
// import { MeetingInvitation } from "@/components/meeting-invitation"

// export default function ChatPage() {
//   const params = useParams()
//   const router = useRouter()
//   const chatId = params.chatId as string
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [chat, setChat] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState<string | null>(null)
//   const [isTyping, setIsTyping] = useState(false)
//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
//   const [showTemplates, setShowTemplates] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [messageStatus, setMessageStatus] = useState<Record<string, "sending" | "sent" | "delivered" | "read">>({})
//   const [optimisticMessages, setOptimisticMessages] = useState<any[]>([])

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

//           // Set initial message statuses
//           const initialStatuses: Record<string, "sending" | "sent" | "delivered" | "read"> = {}
//           data.messages.forEach((msg: any) => {
//             if (msg.sender.isCurrentUser) {
//               initialStatuses[msg.id] = msg.isRead ? "read" : "delivered"
//             }
//           })
//           setMessageStatus(initialStatuses)
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
//     if (!chatId || !pusherClient) return

//     // Subscribe to chat channel
//     const channel = pusherClient.subscribe(`chat-${chatId}`)

//     // Update the real-time subscription for new messages in the useEffect
//     // Replace the existing channel.bind("new-message", ...) code with this improved version:

//     channel.bind("new-message", (newMessage: any) => {
//       // Check if this message is from the current user
//       const isFromCurrentUser = newMessage.sender.isCurrentUser || newMessage.sender.id === userId

//       if (!isFromCurrentUser) {
//         // Message from other user - add it to the chat
//         setChat((prevChat: any) => {
//           if (!prevChat) return prevChat

//           // Check if this message already exists in the chat (to prevent duplicates)
//           const messageExists = prevChat.messages.some((msg: any) => msg.id === newMessage.id)

//           if (messageExists) {
//             return prevChat
//           }

//           // Add new message to chat
//           return {
//             ...prevChat,
//             messages: [...prevChat.messages, newMessage],
//           }
//         })

//         // Mark message as read
//         markChatAsRead(chatId)
//       } else {
//         // Message from current user - update the chat and clean up optimistic messages
//         setChat((prevChat: any) => {
//           if (!prevChat) return prevChat

//           // Check if this message already exists in the chat (to prevent duplicates)
//           const messageExists = prevChat.messages.some((msg: any) => msg.id === newMessage.id)

//           if (messageExists) {
//             return prevChat
//           }

//           // Add the confirmed message to the chat
//           return {
//             ...prevChat,
//             messages: [
//               ...prevChat.messages,
//               {
//                 ...newMessage,
//                 sender: {
//                   ...newMessage.sender,
//                   isCurrentUser: true, // Ensure it's marked as from current user
//                 },
//               },
//             ],
//           }
//         })

//         // Update message status for sent messages
//         setMessageStatus((prev) => ({
//           ...prev,
//           [newMessage.id]: "delivered",
//         }))

//         // Clean up any optimistic messages that match this confirmed message
//         setOptimisticMessages((prev) => {
//           return prev.filter((msg) => {
//             // Remove if it's the exact temp message being confirmed
//             if (msg.tempId === newMessage.tempId) return false

//             // Also remove if content matches and was sent around the same time
//             const contentMatches = msg.content === newMessage.content
//             const timeDiff = Math.abs(new Date(msg.createdAt).getTime() - new Date(newMessage.createdAt).getTime())
//             const isRecentEnough = timeDiff < 10000 // 10 seconds

//             // Keep the message if it doesn't match
//             return !(contentMatches && isRecentEnough)
//           })
//         })
//       }
//     })

//     // Handle message read status updates
//     channel.bind("message-read", (data: any) => {
//       if (data.messageIds && data.messageIds.length > 0) {
//         setMessageStatus((prev) => {
//           const updated = { ...prev }
//           data.messageIds.forEach((id: string) => {
//             if (updated[id]) {
//               updated[id] = "read"
//             }
//           })
//           return updated
//         })
//       }
//     })

//     // Handle typing indicator
//     channel.bind("typing", (data: any) => {
//       if (data.userId !== userId) {
//         setIsTyping(true)

//         // Clear typing indicator after 3 seconds of inactivity
//         setTimeout(() => {
//           setIsTyping(false)
//         }, 3000)
//       }
//     })

//     return () => {
//       pusherClient.unsubscribe(`chat-${chatId}`)
//     }
//   }, [chatId, userId])

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [chat?.messages, optimisticMessages])

//   // Mark messages as read when viewed
//   useEffect(() => {
//     if (chat && chatId) {
//       markChatAsRead(chatId)
//     }
//   }, [chat, chatId])

//   const handleSendMessage = async () => {
//     if (!message.trim() || !chatId) return

//     // Store the message content before clearing the input
//     const messageContent = message.trim()

//     // Create a temporary ID for optimistic UI
//     const tempId = `temp-${Date.now()}`

//     // Create optimistic message
//     const optimisticMessage = {
//       id: tempId,
//       tempId,
//       content: messageContent,
//       contentType: "text",
//       createdAt: new Date().toISOString(),
//       isRead: false,
//       sender: {
//         id: userId,
//         isCurrentUser: true,
//       },
//     }

//     // Add to optimistic messages
//     setOptimisticMessages((prev) => [...prev, optimisticMessage])

//     // Set initial status
//     setMessageStatus((prev) => ({
//       ...prev,
//       [tempId]: "sending",
//     }))

//     // Clear input
//     setMessage("")

//     try {
//       const { status, data, message: errorMessage } = await sendMessage(chatId, messageContent)

//       if (status === 200 && data) {
//         // Link the temporary ID with the real message ID
//         setMessageStatus((prev) => ({
//           ...prev,
//           [tempId]: "sent",
//           [data.id]: "sent",
//         }))

//         // Store the relationship between temp ID and real ID
//         // This helps with cleaning up optimistic messages when real ones arrive
//         optimisticMessage.realId = data.id

//         // The real message will be added via Pusher, and the optimistic one
//         // will be filtered out by our improved getAllMessages function
//       } else {
//         // Show error and keep the optimistic message with an error state
//         toast({
//           title: "Error",
//           description: errorMessage || "Failed to send message",
//           variant: "destructive",
//         })

//         // Remove failed message from optimistic messages
//         setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })

//       // Remove failed message from optimistic messages
//       setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value)

//     // Send typing indicator
//     if (chatId) {
//       // Clear previous timeout
//       if (typingTimeout) {
//         clearTimeout(typingTimeout)
//       }

//       // Throttle typing events to avoid flooding the channel
//       const newTimeout = setTimeout(() => {
//         sendTypingIndicator(chatId)
//       }, 500)

//       setTypingTimeout(newTimeout)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setMessage((prev) => prev + emoji.native)
//   }

//   const handleTemplateSelect = (templateText: string) => {
//     setMessage(templateText)
//     setShowTemplates(false)
//   }

//   const handleFileUpload = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // For now, just show a toast that file upload is coming soon
//     toast({
//       title: "Coming Soon",
//       description: "File uploads will be available in the next update!",
//       variant: "info",
//     })

//     // Reset the input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const handleScheduleMeeting = (meetingData: any) => {
//     // Format meeting details as a message
//     const meetingMessage = `📅 Meeting Invitation\n\nTopic: ${meetingData.topic}\nDate: ${meetingData.date}\nTime: ${meetingData.time}\nDuration: ${meetingData.duration} minutes\n\n${meetingData.notes ? `Notes: ${meetingData.notes}` : ""}`

//     // Send the meeting invitation as a message
//     if (chatId) {
//       sendMessage(chatId, meetingMessage)

//       toast({
//         title: "Meeting Scheduled",
//         description: "Your meeting invitation has been sent",
//         variant: "success",
//       })
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
//       return date.toLocaleDateString(undefined, {
//         weekday: "long",
//         month: "short",
//         day: "numeric",
//       })
//     }
//   }

//   // Group messages by date
//   const groupMessagesByDate = (messages: any[]) => {
//     const groups: { [key: string]: any[] } = {}

//     messages.forEach((msg) => {
//       const date = new Date(msg.createdAt).toDateString()
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(msg)
//     })

//     return Object.entries(groups).map(([date, messages]) => ({
//       date,
//       messages,
//     }))
//   }

//   // Get other participant info
//   const getOtherParticipant = () => {
//     if (!chat) return null

//     const otherParticipant = chat.participants.find((p: any) => !p.isCurrentUser)
//     return otherParticipant
//   }

//   // Render message status indicator
//   const renderMessageStatus = (messageId: string) => {
//     const status = messageStatus[messageId]

//     switch (status) {
//       case "sending":
//         return <Clock className="h-3 w-3 text-gray-400" />
//       case "sent":
//         return <CheckCircle className="h-3 w-3 text-gray-400" />
//       case "delivered":
//         return <CheckCheck className="h-3 w-3 text-gray-400" />
//       case "read":
//         return <CheckCheck className="h-3 w-3 text-blue-400" />
//       default:
//         return <Clock className="h-3 w-3 text-gray-400" />
//     }
//   }

//   // Combine regular and optimistic messages
//   const getAllMessages = () => {
//     const regularMessages = chat?.messages || []

//     // Filter out optimistic messages that have corresponding real messages
//     // by checking if any real message has the same content and was sent within a short time window
//     const filteredOptimisticMessages = optimisticMessages.filter((optMsg) => {
//       // Don't show optimistic messages that have a corresponding real message
//       return !regularMessages.some((realMsg) => {
//         // Check if content matches and time difference is small (within 10 seconds)
//         const contentMatches = realMsg.content === optMsg.content
//         const timeDiff = Math.abs(new Date(realMsg.createdAt).getTime() - new Date(optMsg.createdAt).getTime())
//         const isRecentEnough = timeDiff < 10000 // 10 seconds

//         return contentMatches && isRecentEnough && realMsg.sender.isCurrentUser
//       })
//     })

//     return [...regularMessages, ...filteredOptimisticMessages]
//   }

//   // Add this helper function before the return statement
//   const isMeetingInvitation = (content: string) => {
//     return content.startsWith("📅 Meeting Invitation")
//   }

//   // Replace the parseMeetingData function with this improved version
//   const parseMeetingData = (content: string) => {
//     try {
//       const lines = content.split("\n")

//       // Extract topic (after "Topic: ")
//       const topicLine = lines.find((line) => line.startsWith("Topic:"))
//       const topic = topicLine ? topicLine.replace("Topic:", "").trim() : "Meeting"

//       // Extract date (after "Date: ")
//       const dateLine = lines.find((line) => line.startsWith("Date:"))
//       const date = dateLine ? dateLine.replace("Date:", "").trim() : ""

//       // Extract time (after "Time: ")
//       const timeLine = lines.find((line) => line.startsWith("Time:"))
//       const time = timeLine ? timeLine.replace("Time:", "").trim() : ""

//       // Extract duration (after "Duration: ")
//       const durationLine = lines.find((line) => line.startsWith("Duration:"))
//       const durationText = durationLine ? durationLine.replace("Duration:", "").trim() : "30 minutes"
//       const duration = durationText.split(" ")[0] // Extract just the number

//       // Extract notes (after "Notes: ")
//       const notesLine = lines.find((line) => line.startsWith("Notes:"))
//       const notes = notesLine ? notesLine.replace("Notes:", "").trim() : ""

//       return {
//         topic,
//         date,
//         time,
//         duration,
//         notes,
//       }
//     } catch (error) {
//       console.error("Error parsing meeting data:", error)
//       return null
//     }
//   }

//   // Replace the respondToMeeting function with this updated version
//   const handleMeetingResponse = async (messageId: string, action: "accept" | "decline") => {
//     try {
//       // Optimistically update the UI
//       toast({
//         title: action === "accept" ? "Meeting Accepted" : "Meeting Declined",
//         description:
//           action === "accept"
//             ? "You have accepted this meeting invitation"
//             : "You have declined this meeting invitation",
//         variant: action === "accept" ? "success" : "info",
//       })

//       // Send the meeting response to the server
//       const response = await fetch(`/api/meetings/respond`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chatId,
//           messageId,
//           action,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to respond to meeting: ${response.status}`)
//       }

//       // Optionally, handle the server response here
//       const result = await response.json()
//       console.log("Meeting response result:", result)
//     } catch (error: any) {
//       console.error("Error responding to meeting:", error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to respond to meeting",
//         variant: "destructive",
//       })
//     }
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
//   const allMessages = getAllMessages()
//   const messageGroups = allMessages.length > 0 ? groupMessagesByDate(allMessages) : []

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
//       <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
//         <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
//           <div className="flex-1 flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80 backdrop-blur-sm">
//               <div className="flex items-center gap-3">
//                 <Button variant="ghost" size="icon" onClick={() => router.push("/messages")} className="mr-2">
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//                 <Avatar className="h-10 w-10 bg-gray-700 flex items-center justify-center overflow-hidden">
//                   {otherParticipant?.influencerId ? (
//                     <img src="/influencer-svg.svg" alt="Influencer" className="w-8 h-8" />
//                   ) : otherParticipant?.businessId ? (
//                     <img src="/business-svg.svg" alt="Business" className="w-8 h-8" />
//                   ) : (
//                     <div className="text-lg font-semibold text-white">?</div>
//                   )}
//                 </Avatar>
//                 <div>
//                   <h3 className="font-medium text-white">
//                     {otherParticipant?.influencerName || otherParticipant?.businessName || "Chat"}
//                   </h3>
//                   <p className="text-xs text-gray-400">
//                     {isTyping ? (
//                       <span className="text-green-400">Typing...</span>
//                     ) : otherParticipant?.influencerId ? (
//                       "Influencer"
//                     ) : (
//                       "Business"
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
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
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreHorizontal className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
//                       Clear Chat
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-gray-900 to-gray-950">
//               {allMessages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
//                     <Send className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
//                 </div>
//               ) : (
//                 messageGroups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="space-y-4">
//                     <div className="flex justify-center">
//                       <div className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-400">
//                         {formatDate(group.messages[0].createdAt)}
//                       </div>
//                     </div>

//                     {group.messages.map((msg: any) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg p-3 relative overflow-hidden ${
//                             isMeetingInvitation(msg.content)
//                               ? "bg-transparent" // No background for meeting invitations
//                               : msg.sender.isCurrentUser
//                                 ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 text-white"
//                                 : "bg-gradient-to-br from-gray-800/90 to-gray-900/80 text-white"
//                           }`}
//                         >
//                           {!isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Subtle shimmer effect */}
//                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent subtle-shimmer opacity-30 pointer-events-none"></div>
//                               <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
//                               <div className="flex justify-end mt-1 gap-2 items-center">
//                                 <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                 {msg.sender.isCurrentUser && (
//                                   <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Render meeting invitation component */}
//                               {(() => {
//                                 const meetingData = parseMeetingData(msg.content)
//                                 if (!meetingData) return <p className="whitespace-pre-wrap">{msg.content}</p>

//                                 // Check if there's a response message for this meeting
//                                 const hasAcceptedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Accepted") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const hasDeclinedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Declined") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const meetingStatus = hasAcceptedResponse
//                                   ? "accepted"
//                                   : hasDeclinedResponse
//                                     ? "declined"
//                                     : "pending"

//                                 return (
//                                   <div className="w-full">
//                                     <MeetingInvitation
//                                       topic={meetingData.topic}
//                                       date={meetingData.date}
//                                       time={meetingData.time}
//                                       duration={meetingData.duration}
//                                       notes={meetingData.notes}
//                                       status={meetingStatus}
//                                       isCurrentUserSender={msg.sender.isCurrentUser}
//                                       onAccept={() => handleMeetingResponse(msg.id, "accept")}
//                                       onDecline={() => handleMeetingResponse(msg.id, "decline")}
//                                     />
//                                     <div className="flex justify-end mt-1 gap-2 items-center">
//                                       <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                       {msg.sender.isCurrentUser && (
//                                         <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                       )}
//                                     </div>
//                                   </div>
//                                 )
//                               })()}
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t border-gray-800 bg-gray-900/90 backdrop-blur-sm">
//               {showTemplates && (
//                 <div className="mb-4">
//                   <MessageTemplates onSelect={handleTemplateSelect} />
//                 </div>
//               )}
//               <div className="flex gap-2 items-center">
//                 <div className="flex gap-2">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0 border-gray-700 bg-gray-800" side="top" align="start">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <PaperclipIcon className="h-5 w-5" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <FileText className="h-4 w-4 mr-2" />
//                         Document
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <ImageIcon className="h-4 w-4 mr-2" />
//                         Image
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
//                         <Mic className="h-4 w-4 mr-2" />
//                         Voice Message
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept="image/*,.pdf,.doc,.docx"
//                   />

//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowTemplates(!showTemplates)}
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                   >
//                     <Calendar className="h-5 w-5" />
//                   </Button>

//                   <ScheduleMeeting
//                     conversationId={chatId}
//                     recipientId={otherParticipant?.id || ""}
//                     onSchedule={handleScheduleMeeting}
//                   />
//                 </div>

//                 <Input
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault()
//                       handleSendMessage()
//                     }
//                   }}
//                   className="bg-gray-800 border-gray-700 text-white focus:ring-blue-600 focus:border-blue-600"
//                 />

//                 <Button
//                   onClick={handleSendMessage}
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
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

// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar } from "@/components/ui/avatar"
// import {
//   Send,
//   ArrowLeft,
//   Clock,
//   CheckCircle,
//   CheckCheck,
//   Smile,
//   PaperclipIcon,
//   Calendar,
//   MoreHorizontal,
//   FileText,
//   Mic,
//   ImageIcon,
//   RefreshCw,
// } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { toast } from "@/hooks/use-toast"
// import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/collab/chat-actions"
// import { pusherClient } from "@/lib/pusher"
// import { onUserInfor } from "@/actions/user"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MessageTemplates } from "@/components/global/templates/message-templates"
// import { ScheduleMeeting } from "@/components/global/templates/schedule-meeting"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// // Add this import at the top of the file
// import { MeetingInvitation } from "@/components/global/templates/meeting-invitation"
// // Add this import at the top of the file
// import { CollaborativeWhiteboard } from "@/components/global/templates/collaborative-whiteboard"
// import { WhiteboardMessage } from "@/components/global/templates/whiteboard-message"

// export default function ChatPage() {
//   const params = useParams()
//   const router = useRouter()
//   const chatId = params.chatId as string
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const [message, setMessage] = useState("")
//   const [chat, setChat] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState<string | null>(null)
//   const [isTyping, setIsTyping] = useState(false)
//   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
//   const [showTemplates, setShowTemplates] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [messageStatus, setMessageStatus] = useState<Record<string, "sending" | "sent" | "delivered" | "read">>({})
//   const [optimisticMessages, setOptimisticMessages] = useState<any[]>([])
//   const [refreshKey, setRefreshKey] = useState(0) // Add this for forcing re-renders
//   const [isRefreshing, setIsRefreshing] = useState(false) // Add this for refresh indicator
//   // Add this state variable in the component
//   const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false)

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
//         setIsRefreshing(true)
//         const { status, data, message } = await getChatById(chatId)

//         if (status === 200 && data) {
//           setChat(data)

//           // Set initial message statuses
//           const initialStatuses: Record<string, "sending" | "sent" | "delivered" | "read"> = {}
//           data.messages.forEach((msg: any) => {
//             if (msg.sender.isCurrentUser) {
//               initialStatuses[msg.id] = msg.isRead ? "read" : "delivered"
//             }
//           })
//           setMessageStatus(initialStatuses)
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
//         setIsRefreshing(false)
//       }
//     }

//     if (userId && chatId) {
//       fetchChat()
//     }
//   }, [userId, chatId, router, refreshKey]) // Add refreshKey to dependencies

//   // Set up real-time subscription for new messages
//   useEffect(() => {
//     if (!chatId || !pusherClient) return

//     // Subscribe to chat channel
//     const channel = pusherClient.subscribe(`chat-${chatId}`)

//     // Handle new messages
//     channel.bind("new-message", (newMessage: any) => {
//       if (!newMessage.sender.isCurrentUser) {
//         // Message from other user - add it to the chat
//         setChat((prevChat: any) => {
//           if (!prevChat) return prevChat

//           // Check if this message already exists in the chat (to prevent duplicates)
//           const messageExists = prevChat.messages.some((msg: any) => msg.id === newMessage.id)

//           if (messageExists) {
//             return prevChat
//           }

//           // Add new message to chat
//           return {
//             ...prevChat,
//             messages: [...prevChat.messages, newMessage],
//           }
//         })

//         // Mark message as read
//         markChatAsRead(chatId)
//       } else {
//         // For messages from the current user, we'll handle them in the handleSendMessage function
//         // by refreshing the chat data
//       }
//     })

//     // Handle message read status updates
//     channel.bind("message-read", (data: any) => {
//       if (data.messageIds && data.messageIds.length > 0) {
//         setMessageStatus((prev) => {
//           const updated = { ...prev }
//           data.messageIds.forEach((id: string) => {
//             if (updated[id]) {
//               updated[id] = "read"
//             }
//           })
//           return updated
//         })
//       }
//     })

//     // Handle typing indicator
//     channel.bind("typing", (data: any) => {
//       if (data.userId !== userId) {
//         setIsTyping(true)

//         // Clear typing indicator after 3 seconds of inactivity
//         setTimeout(() => {
//           setIsTyping(false)
//         }, 3000)
//       }
//     })

//     return () => {
//       pusherClient.unsubscribe(`chat-${chatId}`)
//     }
//   }, [chatId, userId])

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [chat?.messages, optimisticMessages])

//   // Mark messages as read when viewed
//   useEffect(() => {
//     if (chat && chatId) {
//       markChatAsRead(chatId)
//     }
//   }, [chat, chatId])

//   // Function to refresh chat data
//   const refreshChat = async () => {
//     setRefreshKey((prev) => prev + 1)
//   }

//   const handleSendMessage = async () => {
//     if (!message.trim() || !chatId) return

//     // Store the message content before clearing the input
//     const messageContent = message.trim()

//     // Create a temporary ID for optimistic UI
//     const tempId = `temp-${Date.now()}`

//     // Create optimistic message
//     const optimisticMessage = {
//       id: tempId,
//       tempId,
//       content: messageContent,
//       contentType: "text",
//       createdAt: new Date().toISOString(),
//       isRead: false,
//       sender: {
//         id: userId,
//         isCurrentUser: true,
//       },
//     }

//     // Add to optimistic messages
//     setOptimisticMessages((prev) => [...prev, optimisticMessage])

//     // Set initial status
//     setMessageStatus((prev) => ({
//       ...prev,
//       [tempId]: "sending",
//     }))

//     // Clear input
//     setMessage("")

//     try {
//       const { status, data, message: errorMessage } = await sendMessage(chatId, messageContent)

//       if (status === 200 && data) {
//         // Link the temporary ID with the real message ID
//         setMessageStatus((prev) => ({
//           ...prev,
//           [tempId]: "sent",
//           [data.id]: "sent",
//         }))

//         // Instead of relying on Pusher to update the UI, refresh the chat data
//         // This will clear any duplicate messages
//         setTimeout(() => {
//           refreshChat()
//           // Clear optimistic messages after refresh
//           setOptimisticMessages([])
//         }, 500) // Small delay to ensure the message is saved on the server
//       } else {
//         // Show error and keep the optimistic message with an error state
//         toast({
//           title: "Error",
//           description: errorMessage || "Failed to send message",
//           variant: "destructive",
//         })

//         // Remove failed message from optimistic messages
//         setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       })

//       // Remove failed message from optimistic messages
//       setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value)

//     // Send typing indicator
//     if (chatId) {
//       // Clear previous timeout
//       if (typingTimeout) {
//         clearTimeout(typingTimeout)
//       }

//       // Throttle typing events to avoid flooding the channel
//       const newTimeout = setTimeout(() => {
//         sendTypingIndicator(chatId)
//       }, 500)

//       setTypingTimeout(newTimeout)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setMessage((prev) => prev + emoji.native)
//   }

//   const handleTemplateSelect = (templateText: string) => {
//     setMessage(templateText)
//     setShowTemplates(false)
//   }

//   const handleFileUpload = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // For now, just show a toast that file upload is coming soon
//     toast({
//       title: "Coming Soon",
//       description: "File uploads will be available in the next update!",
//       variant: "info",
//     })

//     // Reset the input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const handleScheduleMeeting = (meetingData: any) => {
//     // Format meeting details as a message
//     const meetingMessage = `📅 Meeting Invitation\n\nTopic: ${meetingData.topic}\nDate: ${meetingData.date}\nTime: ${meetingData.time}\nDuration: ${meetingData.duration} minutes\n\n${meetingData.notes ? `Notes: ${meetingData.notes}` : ""}`

//     // Send the meeting invitation as a message
//     if (chatId) {
//       sendMessage(chatId, meetingMessage)

//       toast({
//         title: "Meeting Scheduled",
//         description: "Your meeting invitation has been sent",
//         variant: "success",
//       })
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
//       return date.toLocaleDateString(undefined, {
//         weekday: "long",
//         month: "short",
//         day: "numeric",
//       })
//     }
//   }

//   // Group messages by date
//   const groupMessagesByDate = (messages: any[]) => {
//     const groups: { [key: string]: any[] } = {}

//     messages.forEach((msg) => {
//       const date = new Date(msg.createdAt).toDateString()
//       if (!groups[date]) {
//         groups[date] = []
//       }
//       groups[date].push(msg)
//     })

//     return Object.entries(groups).map(([date, messages]) => ({
//       date,
//       messages,
//     }))
//   }

//   // Get other participant info
//   const getOtherParticipant = () => {
//     if (!chat) return null

//     const otherParticipant = chat.participants.find((p: any) => !p.isCurrentUser)
//     return otherParticipant
//   }

//   // Render message status indicator
//   const renderMessageStatus = (messageId: string) => {
//     const status = messageStatus[messageId]

//     switch (status) {
//       case "sending":
//         return <Clock className="h-3 w-3 text-gray-400" />
//       case "sent":
//         return <CheckCircle className="h-3 w-3 text-gray-400" />
//       case "delivered":
//         return <CheckCheck className="h-3 w-3 text-gray-400" />
//       case "read":
//         return <CheckCheck className="h-3 w-3 text-blue-400" />
//       default:
//         return <Clock className="h-3 w-3 text-gray-400" />
//     }
//   }

//   // Combine regular and optimistic messages
//   const getAllMessages = () => {
//     const regularMessages = chat?.messages || []

//     // During refresh, don't show optimistic messages to avoid flicker
//     if (isRefreshing) {
//       return regularMessages
//     }

//     return [...regularMessages, ...optimisticMessages]
//   }

//   // Add this helper function before the return statement
//   const isMeetingInvitation = (content: string) => {
//     return content.startsWith("📅 Meeting Invitation")
//   }

//   // Replace the parseMeetingData function with this improved version
//   const parseMeetingData = (content: string) => {
//     try {
//       const lines = content.split("\n")

//       // Extract topic (after "Topic: ")
//       const topicLine = lines.find((line) => line.startsWith("Topic:"))
//       const topic = topicLine ? topicLine.replace("Topic:", "").trim() : "Meeting"

//       // Extract date (after "Date: ")
//       const dateLine = lines.find((line) => line.startsWith("Date:"))
//       const date = dateLine ? dateLine.replace("Date:", "").trim() : ""

//       // Extract time (after "Time: ")
//       const timeLine = lines.find((line) => line.startsWith("Time:"))
//       const time = timeLine ? timeLine.replace("Time:", "").trim() : ""

//       // Extract duration (after "Duration: ")
//       const durationLine = lines.find((line) => line.startsWith("Duration:"))
//       const durationText = durationLine ? durationLine.replace("Duration:", "").trim() : "30 minutes"
//       const duration = durationText.split(" ")[0] // Extract just the number

//       // Extract notes (after "Notes: ")
//       const notesLine = lines.find((line) => line.startsWith("Notes:"))
//       const notes = notesLine ? notesLine.replace("Notes:", "").trim() : ""

//       return {
//         topic,
//         date,
//         time,
//         duration,
//         notes,
//       }
//     } catch (error) {
//       console.error("Error parsing meeting data:", error)
//       return null
//     }
//   }

//   // Replace the respondToMeeting function with this improved version
//   const handleMeetingResponse = async (messageId: string, action: "accept" | "decline") => {
//     try {
//       // Optimistically update the UI
//       toast({
//         title: action === "accept" ? "Meeting Accepted" : "Meeting Declined",
//         description:
//           action === "accept"
//             ? "You have accepted this meeting invitation"
//             : "You have declined this meeting invitation",
//         variant: action === "accept" ? "success" : "info",
//       })

//       // Send the meeting response to the server
//       const response = await fetch(`/api/meetings/respond`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chatId,
//           messageId,
//           action,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to respond to meeting: ${response.status}`)
//       }

//       // Refresh the chat data after responding
//       setTimeout(() => {
//         refreshChat()
//       }, 500)

//       // Optionally, handle the server response here
//       const result = await response.json()
//       console.log("Meeting response result:", result)
//     } catch (error: any) {
//       console.error("Error responding to meeting:", error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to respond to meeting",
//         variant: "destructive",
//       })
//     }
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
//   const allMessages = getAllMessages()
//   const messageGroups = allMessages.length > 0 ? groupMessagesByDate(allMessages) : []

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
//       <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
//         <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
//           <div className="flex-1 flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80 backdrop-blur-sm">
//               <div className="flex items-center gap-3">
//                 <Button variant="ghost" size="icon" onClick={() => router.push("/messages")} className="mr-2">
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//                 <Avatar className="h-10 w-10 bg-gray-700 flex items-center justify-center overflow-hidden">
//                   {otherParticipant?.influencerId ? (
//                     <img src="/influencer-svg.svg" alt="Influencer" className="w-8 h-8" />
//                   ) : otherParticipant?.businessId ? (
//                     <img src="/business-svg.svg" alt="Business" className="w-8 h-8" />
//                   ) : (
//                     <div className="text-lg font-semibold text-white">?</div>
//                   )}
//                 </Avatar>
//                 <div>
//                   <h3 className="font-medium text-white">
//                     {otherParticipant?.influencerName || otherParticipant?.businessName || "Chat"}
//                   </h3>
//                   <p className="text-xs text-gray-400">
//                     {isTyping ? (
//                       <span className="text-green-400">Typing...</span>
//                     ) : otherParticipant?.influencerId ? (
//                       "Influencer"
//                     ) : (
//                       "Business"
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 {/* Manual refresh button */}
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={refreshChat}
//                   disabled={isRefreshing}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
//                 </Button>

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
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreHorizontal className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
//                     <DropdownMenuItem
//                       className="cursor-pointer hover:bg-gray-700"
//                       onClick={() => setIsWhiteboardOpen(true)}
//                     >
//                       Open Whiteboard
//                     </DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
//                       Clear Chat
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-gray-900 to-gray-950">
//               {allMessages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
//                     <Send className="h-6 w-6 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-medium text-white mb-2">No messages yet</h3>
//                   <p className="text-gray-400 max-w-md">Send a message to start the conversation.</p>
//                 </div>
//               ) : (
//                 messageGroups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="space-y-4">
//                     <div className="flex justify-center">
//                       <div className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-400">
//                         {formatDate(group.messages[0].createdAt)}
//                       </div>
//                     </div>

//                     {group.messages.map((msg: any) => (
//                       <div
//                         key={msg.id}
//                         className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[70%] rounded-lg p-3 relative overflow-hidden ${
//                             isMeetingInvitation(msg.content)
//                               ? "bg-transparent" // No background for meeting invitations
//                               : msg.sender.isCurrentUser
//                                 ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 text-white"
//                                 : "bg-gradient-to-br from-gray-800/90 to-gray-900/80 text-white"
//                           }`}
//                         >
//                           {!isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Subtle shimmer effect */}
//                               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent subtle-shimmer opacity-30 pointer-events-none"></div>
//                               <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
//                               <div className="flex justify-end mt-1 gap-2 items-center">
//                                 <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                 {msg.sender.isCurrentUser && (
//                                   <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {isMeetingInvitation(msg.content) && (
//                             <>
//                               {/* Render meeting invitation component */}
//                               {(() => {
//                                 const meetingData = parseMeetingData(msg.content)
//                                 if (!meetingData) return <p className="whitespace-pre-wrap">{msg.content}</p>

//                                 // Check if there's a response message for this meeting
//                                 const hasAcceptedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Accepted") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const hasDeclinedResponse = chat.messages.some(
//                                   (m: any) =>
//                                     m.contentType === "meeting-response" &&
//                                     m.content.includes("Meeting Declined") &&
//                                     m.content.includes(meetingData.topic),
//                                 )

//                                 const meetingStatus = hasAcceptedResponse
//                                   ? "accepted"
//                                   : hasDeclinedResponse
//                                     ? "declined"
//                                     : "pending"

//                                 return (
//                                   <div className="w-full">
//                                     <MeetingInvitation
//                                       topic={meetingData.topic}
//                                       date={meetingData.date}
//                                       time={meetingData.time}
//                                       duration={meetingData.duration}
//                                       notes={meetingData.notes}
//                                       status={meetingStatus}
//                                       isCurrentUserSender={msg.sender.isCurrentUser}
//                                       onAccept={() => handleMeetingResponse(msg.id, "accept")}
//                                       onDecline={() => handleMeetingResponse(msg.id, "decline")}
//                                     />
//                                     <div className="flex justify-end mt-1 gap-2 items-center">
//                                       <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
//                                       {msg.sender.isCurrentUser && (
//                                         <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
//                                       )}
//                                     </div>
//                                   </div>
//                                 )
//                               })()}
//                             </>
//                           )}
//                           {msg.contentType === "whiteboard" && msg.metadata?.imageData && (
//                             <WhiteboardMessage imageData={msg.metadata.imageData} />
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input */}
//             <div className="p-4 border-t border-gray-800 bg-gray-900/90 backdrop-blur-sm">
//               {showTemplates && (
//                 <div className="mb-4">
//                   <MessageTemplates onSelect={handleTemplateSelect} />
//                 </div>
//               )}
//               <div className="flex gap-2 items-center">
//                 <div className="flex gap-2">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0 border-gray-700 bg-gray-800" side="top" align="start">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
//                         <PaperclipIcon className="h-5 w-5" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <FileText className="h-4 w-4 mr-2" />
//                         Document
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
//                         <ImageIcon className="h-4 w-4 mr-2" />
//                         Image
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
//                         <Mic className="h-4 w-4 mr-2" />
//                         Voice Message
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept="image/*,.pdf,.doc,.docx"
//                   />

//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowTemplates(!showTemplates)}
//                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                   >
//                     <Calendar className="h-5 w-5" />
//                   </Button>

//                   <ScheduleMeeting
//                     conversationId={chatId}
//                     recipientId={otherParticipant?.id || ""}
//                     onSchedule={handleScheduleMeeting}
//                   />
//                 </div>

//                 <Input
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault()
//                       handleSendMessage()
//                     }
//                   }}
//                   className="bg-gray-800 border-gray-700 text-white focus:ring-blue-600 focus:border-blue-600"
//                 />

//                 <Button
//                   onClick={handleSendMessage}
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                   disabled={!message.trim()}
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isWhiteboardOpen && (
//         <CollaborativeWhiteboard chatId={chatId} isOpen={isWhiteboardOpen} onClose={() => setIsWhiteboardOpen(false)} />
//       )}
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
import {
  Send,
  ArrowLeft,
  Clock,
  CheckCircle,
  CheckCheck,
  Smile,
  PaperclipIcon,
  Calendar,
  MoreHorizontal,
  FileText,
  Mic,
  ImageIcon,
  RefreshCw,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { getChatById, sendMessage, markChatAsRead, sendTypingIndicator } from "@/actions/collab/chat-actions"
import { pusherClient } from "@/lib/pusher"
import { onUserInfor } from "@/actions/user"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageTemplates } from "@/components/global/templates/message-templates"
import { ScheduleMeeting } from "@/components/global/templates/schedule-meeting"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
// Add this import at the top of the file
import { MeetingInvitation } from "@/components/global/templates/meeting-invitation"
// Add this import at the top of the file
import { CollaborativeWhiteboard } from "@/components/global/templates/collaborative-whiteboard"
import { WhiteboardMessage } from "@/components/global/templates/whiteboard-message"
import { MessageReaction } from "@/components/global/templates/message-reaction"

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
  const [messageStatus, setMessageStatus] = useState<Record<string, "sending" | "sent" | "delivered" | "read">>({})
  const [optimisticMessages, setOptimisticMessages] = useState<any[]>([])
  const [refreshKey, setRefreshKey] = useState(0) // Add this for forcing re-renders
  const [isRefreshing, setIsRefreshing] = useState(false) // Add this for refresh indicator
  // Add this state variable in the component
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false)
  const [messageReactions, setMessageReactions] = useState<Record<string, any[]>>({})

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
        setIsRefreshing(true)
        const { status, data, message } = await getChatById(chatId)

        if (status === 200 && data) {
          setChat(data)

          // Set initial message statuses
          const initialStatuses: Record<string, "sending" | "sent" | "delivered" | "read"> = {}
          const initialReactions: Record<string, any[]> = {}

          data.messages.forEach((msg: any) => {
            if (msg.sender.isCurrentUser) {
              initialStatuses[msg.id] = msg.isRead ? "read" : "delivered"
            }

            // Extract reactions from metadata if they exist
            if (msg.metadata?.reactions) {
              initialReactions[msg.id] = msg.metadata.reactions
            }
          })

          setMessageStatus(initialStatuses)
          setMessageReactions(initialReactions)
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
        setIsRefreshing(false)
      }
    }

    if (userId && chatId) {
      fetchChat()
    }
  }, [userId, chatId, router, refreshKey]) // Add refreshKey to dependencies

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!chatId || !pusherClient) return

    // Subscribe to chat channel
    const channel = pusherClient.subscribe(`chat-${chatId}`)

    // Handle new messages
    channel.bind("new-message", (newMessage: any) => {
      if (!newMessage.sender.isCurrentUser) {
        // Message from other user - add it to the chat
        setChat((prevChat: any) => {
          if (!prevChat) return prevChat

          // Check if this message already exists in the chat (to prevent duplicates)
          const messageExists = prevChat.messages.some((msg: any) => msg.id === newMessage.id)

          if (messageExists) {
            return prevChat
          }

          // Add new message to chat
          return {
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
          }
        })

        // Mark message as read
        markChatAsRead(chatId)
      } else {
        // For messages from the current user, we'll handle them in the handleSendMessage function
        // by refreshing the chat data
      }
    })

    // Handle message read status updates
    channel.bind("message-read", (data: any) => {
      if (data.messageIds && data.messageIds.length > 0) {
        setMessageStatus((prev) => {
          const updated = { ...prev }
          data.messageIds.forEach((id: string) => {
            if (updated[id]) {
              updated[id] = "read"
            }
          })
          return updated
        })
      }
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

    channel.bind("message-reaction", (data: any) => {
      if (data.messageId && data.reactions) {
        setMessageReactions((prev) => ({
          ...prev,
          [data.messageId]: data.reactions,
        }))
      }
    })

    return () => {
      pusherClient.unsubscribe(`chat-${chatId}`)
    }
  }, [chatId, userId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat?.messages, optimisticMessages])

  // Mark messages as read when viewed
  useEffect(() => {
    if (chat && chatId) {
      markChatAsRead(chatId)
    }
  }, [chat, chatId])

  // Function to refresh chat data
  const refreshChat = async () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId) return

    // Store the message content before clearing the input
    const messageContent = message.trim()

    // Create a temporary ID for optimistic UI
    const tempId = `temp-${Date.now()}`

    // Create optimistic message
    const optimisticMessage = {
      id: tempId,
      tempId,
      content: messageContent,
      contentType: "text",
      createdAt: new Date().toISOString(),
      isRead: false,
      sender: {
        id: userId,
        isCurrentUser: true,
      },
    }

    // Add to optimistic messages
    setOptimisticMessages((prev) => [...prev, optimisticMessage])

    // Set initial status
    setMessageStatus((prev) => ({
      ...prev,
      [tempId]: "sending",
    }))

    // Clear input
    setMessage("")

    try {
      const { status, data, message: errorMessage } = await sendMessage(chatId, messageContent)

      if (status === 200 && data) {
        // Link the temporary ID with the real message ID
        setMessageStatus((prev) => ({
          ...prev,
          [tempId]: "sent",
          [data.id]: "sent",
        }))

        // Instead of relying on Pusher to update the UI, refresh the chat data
        // This will clear any duplicate messages
        setTimeout(() => {
          refreshChat()
          // Clear optimistic messages after refresh
          setOptimisticMessages([])
        }, 500) // Small delay to ensure the message is saved on the server
      } else {
        // Show error and keep the optimistic message with an error state
        toast({
          title: "Error",
          description: errorMessage || "Failed to send message",
          variant: "destructive",
        })

        // Remove failed message from optimistic messages
        setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })

      // Remove failed message from optimistic messages
      setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
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
      variant: "info",
    })

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleScheduleMeeting = (meetingData: any) => {
    // Format meeting details as a message
    const meetingMessage = `📅 Meeting Invitation\n\nTopic: ${meetingData.topic}\nDate: ${meetingData.date}\nTime: ${meetingData.time}\nDuration: ${meetingData.duration} minutes\n\n${meetingData.notes ? `Notes: ${meetingData.notes}` : ""}`

    // Send the meeting invitation as a message
    if (chatId) {
      sendMessage(chatId, meetingMessage)

      toast({
        title: "Meeting Scheduled",
        description: "Your meeting invitation has been sent",
        variant: "success",
      })
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

  // Render message status indicator
  const renderMessageStatus = (messageId: string) => {
    const status = messageStatus[messageId]

    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "sent":
        return <CheckCircle className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-400" />
      default:
        return <Clock className="h-3 w-3 text-gray-400" />
    }
  }

  // Combine regular and optimistic messages
  const getAllMessages = () => {
    const regularMessages = chat?.messages || []

    // During refresh, don't show optimistic messages to avoid flicker
    if (isRefreshing) {
      return regularMessages
    }

    return [...regularMessages, ...optimisticMessages]
  }

  // Add this helper function before the return statement
  const isMeetingInvitation = (content: string) => {
    return content.startsWith("📅 Meeting Invitation")
  }

  // Replace the parseMeetingData function with this improved version
  const parseMeetingData = (content: string) => {
    try {
      const lines = content.split("\n")

      // Extract topic (after "Topic: ")
      const topicLine = lines.find((line) => line.startsWith("Topic:"))
      const topic = topicLine ? topicLine.replace("Topic:", "").trim() : "Meeting"

      // Extract date (after "Date: ")
      const dateLine = lines.find((line) => line.startsWith("Date:"))
      const date = dateLine ? dateLine.replace("Date:", "").trim() : ""

      // Extract time (after "Time: ")
      const timeLine = lines.find((line) => line.startsWith("Time:"))
      const time = timeLine ? timeLine.replace("Time:", "").trim() : ""

      // Extract duration (after "Duration: ")
      const durationLine = lines.find((line) => line.startsWith("Duration:"))
      const durationText = durationLine ? durationLine.replace("Duration:", "").trim() : "30 minutes"
      const duration = durationText.split(" ")[0] // Extract just the number

      // Extract notes (after "Notes: ")
      const notesLine = lines.find((line) => line.startsWith("Notes:"))
      const notes = notesLine ? notesLine.replace("Notes:", "").trim() : ""

      return {
        topic,
        date,
        time,
        duration,
        notes,
      }
    } catch (error) {
      console.error("Error parsing meeting data:", error)
      return null
    }
  }

  // Replace the respondToMeeting function with this improved version
  const handleMeetingResponse = async (messageId: string, action: "accept" | "decline") => {
    try {
      // Optimistically update the UI
      toast({
        title: action === "accept" ? "Meeting Accepted" : "Meeting Declined",
        description:
          action === "accept"
            ? "You have accepted this meeting invitation"
            : "You have declined this meeting invitation",
        variant: action === "accept" ? "success" : "info",
      })

      // Send the meeting response to the server
      const response = await fetch(`/api/meetings/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          messageId,
          action,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to respond to meeting: ${response.status}`)
      }

      // Refresh the chat data after responding
      setTimeout(() => {
        refreshChat()
      }, 500)

      // Optionally, handle the server response here
      const result = await response.json()
      console.log("Meeting response result:", result)
    } catch (error: any) {
      console.error("Error responding to meeting:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to respond to meeting",
        variant: "destructive",
      })
    }
  }

  const handleAddReaction = async (messageId: string, emoji: string) => {
    try {
      const response = await fetch(`/api/messages/${chatId}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          emoji,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add reaction")
      }
    } catch (error) {
      console.error("Error adding reaction:", error)
      toast({
        title: "Error",
        description: "Failed to add reaction",
        variant: "destructive",
      })
    }
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
  const allMessages = getAllMessages()
  const messageGroups = allMessages.length > 0 ? groupMessagesByDate(allMessages) : []

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-950">
      <div className="container mx-auto p-4 flex flex-1 overflow-hidden">
        <div className="flex w-full h-full overflow-hidden bg-gray-900 rounded-lg shadow-xl border border-gray-800">
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => router.push("/messages")} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10 bg-gray-700 flex items-center justify-center overflow-hidden">
                  {otherParticipant?.influencerId ? (
                    <img src="/influencer-svg.svg" alt="Influencer" className="w-8 h-8" />
                  ) : otherParticipant?.businessId ? (
                    <img src="/business-svg.svg" alt="Business" className="w-8 h-8" />
                  ) : (
                    <div className="text-lg font-semibold text-white">?</div>
                  )}
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
                {/* Manual refresh button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={refreshChat}
                  disabled={isRefreshing}
                  className="text-gray-400 hover:text-white"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </Button>

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
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-700"
                      onClick={() => setIsWhiteboardOpen(true)}
                    >
                      Open Whiteboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Share Contact</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 text-red-400">
                      Clear Chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-gray-900 to-gray-950">
              {allMessages.length === 0 ? (
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
                      <div className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-400">
                        {formatDate(group.messages[0].createdAt)}
                      </div>
                    </div>

                    {group.messages.map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender.isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 relative overflow-hidden ${
                            isMeetingInvitation(msg.content)
                              ? "bg-transparent" // No background for meeting invitations
                              : msg.sender.isCurrentUser
                                ? "bg-gradient-to-br from-blue-900/80 to-blue-950/90 text-white"
                                : "bg-gradient-to-br from-gray-800/90 to-gray-900/80 text-white"
                          }`}
                        >
                          {!isMeetingInvitation(msg.content) && (
                            <>
                              {/* Subtle shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent subtle-shimmer opacity-30 pointer-events-none"></div>
                              <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
                              <div className="flex flex-col">
                                <MessageReaction
                                  messageId={msg.id}
                                  chatId={chatId}
                                  reactions={messageReactions[msg.id] || msg.metadata?.reactions || []}
                                  currentUserId={userId || ""}
                                  onReactionAdd={handleAddReaction}
                                />
                                <div className="flex justify-end mt-1 gap-2 items-center">
                                  <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                                  {msg.sender.isCurrentUser && (
                                    <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {isMeetingInvitation(msg.content) && (
                            <>
                              {/* Render meeting invitation component */}
                              {(() => {
                                const meetingData = parseMeetingData(msg.content)
                                if (!meetingData) return <p className="whitespace-pre-wrap">{msg.content}</p>

                                // Check if there's a response message for this meeting
                                const hasAcceptedResponse = chat.messages.some(
                                  (m: any) =>
                                    m.contentType === "meeting-response" &&
                                    m.content.includes("Meeting Accepted") &&
                                    m.content.includes(meetingData.topic),
                                )

                                const hasDeclinedResponse = chat.messages.some(
                                  (m: any) =>
                                    m.contentType === "meeting-response" &&
                                    m.content.includes("Meeting Declined") &&
                                    m.content.includes(meetingData.topic),
                                )

                                const meetingStatus = hasAcceptedResponse
                                  ? "accepted"
                                  : hasDeclinedResponse
                                    ? "declined"
                                    : "pending"

                                return (
                                  <div className="w-full">
                                    <MeetingInvitation
                                      topic={meetingData.topic}
                                      date={meetingData.date}
                                      time={meetingData.time}
                                      duration={meetingData.duration}
                                      notes={meetingData.notes}
                                      status={meetingStatus}
                                      isCurrentUserSender={msg.sender.isCurrentUser}
                                      onAccept={() => handleMeetingResponse(msg.id, "accept")}
                                      onDecline={() => handleMeetingResponse(msg.id, "decline")}
                                    />
                                    <div className="flex justify-end mt-1 gap-2 items-center">
                                      <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                                      {msg.sender.isCurrentUser && (
                                        <span className="text-xs text-gray-400">{renderMessageStatus(msg.id)}</span>
                                      )}
                                    </div>
                                  </div>
                                )
                              })()}
                            </>
                          )}
                          {msg.contentType === "whiteboard" && (
                            <WhiteboardMessage imageData={msg.metadata?.imageData} messageId={msg.id} />
                          )}
                          {!isMeetingInvitation(msg.content) && msg.contentType !== "whiteboard" && (
                            <MessageReaction
                              messageId={msg.id}
                              chatId={chatId}
                              reactions={messageReactions[msg.id] || msg.metadata?.reactions || []}
                              currentUserId={userId || ""}
                              onReactionAdd={handleAddReaction}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-800 bg-gray-900/90 backdrop-blur-sm">
              {showTemplates && (
                <div className="mb-4">
                  <MessageTemplates onSelect={handleTemplateSelect} />
                </div>
              )}
              <div className="flex gap-2 items-center">
                <div className="flex gap-2">
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

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <PaperclipIcon className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
                        <FileText className="h-4 w-4 mr-2" />
                        Document
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={handleFileUpload}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Image
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
                        <Mic className="h-4 w-4 mr-2" />
                        Voice Message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    <Calendar className="h-5 w-5" />
                  </Button>

                  <ScheduleMeeting
                    conversationId={chatId}
                    recipientId={otherParticipant?.id || ""}
                    onSchedule={handleScheduleMeeting}
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
                  className="bg-gray-800 border-gray-700 text-white focus:ring-blue-600 focus:border-blue-600"
                />

                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isWhiteboardOpen && (
        <CollaborativeWhiteboard chatId={chatId} isOpen={isWhiteboardOpen} onClose={() => setIsWhiteboardOpen(false)} />
      )}
    </div>
  )
}
