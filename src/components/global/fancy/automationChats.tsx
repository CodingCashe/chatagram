// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check, MoreVertical } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = await fetchChatsAndBusinessVariables(automationId)
//       const filteredConversations = conversations.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)

//       // Sort conversations by the timestamp of the last message
//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           timestamp: result.userMessage.timestamp,
//           status: "sent",
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime()
//           })
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.chatId)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.chatId === conversation.chatId ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversationToDelete.chatId))
//       if (selectedConversation?.chatId === conversationToDelete.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message) => (
//                     <motion.div
//                       key={message.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.senderId === BOT_ID ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm border-2 border-primary ${
//                           message.senderId === BOT_ID
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-muted text-foreground"
//                         }`}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.timestamp).toLocaleString()}
//                           </p>
//                           {message.senderId === "17841444435951291" && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="icon"
//                           onClick={handleSendMessage}
//                           className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                         >
//                           <Send className="h-5 w-5" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Send message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.chatId}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.userId)} />
//                             <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.chatId) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">
//                             {getActivityStatus(
//                               new Date(conversation.messages[conversation.messages.length - 1].timestamp),
//                             )}
//                           </p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats


// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"



// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = await fetchChatsAndBusinessVariables(automationId)
//       const filteredConversations = conversations.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
      

//       // Sort conversations by the timestamp of the last message
      
//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const result = await sendMessage(
//         newMessage,
//         selectedConversation.id,
//         pageId,
//         automationId,
//         token,
//         businessVariables,
//       )

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.id,
//           createdAt: result.userMessage.timestamp,
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages, updatedAt: new Date() }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.id === selectedConversation.id
//               ? { ...conv, messages: [...conv.messages, userMessage], updatedAt: new Date() }
//               : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm border-2 border-primary ${
//                           message.role === "assistant"
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-muted text-foreground"
//                         }`}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.createdAt).toLocaleString()}
//                           </p>
//                           {message.role === "user" && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from 'lucide-react'
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"



// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = await fetchChatsAndBusinessVariables(automationId)
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map((conv): Conversation => ({
//           id: conv.chatId,
//           pageId: conv.pageId,
//           messages: conv.messages.map((msg: any): Message => ({
//             role: msg.role,
//             content: msg.content,
//             senderId: msg.senderId,
//             createdAt: new Date(msg.createdAt)
//           })),
//           createdAt: new Date(conv.messages[0]?.createdAt || Date.now()),
//           updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt || Date.now()),
//           unreadCount: 0,
//           Automation: null
//         }))

//       // Sort conversations by the timestamp of the last message

//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const result = await sendMessage(
//         newMessage,
//         selectedConversation.id,
//         pageId,
//         automationId,
//         token,
//         businessVariables,
//       )

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.id,
//           createdAt: result.userMessage.timestamp,
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages, updatedAt: new Date() }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.id === selectedConversation.id
//               ? {
//                   ...conv,
//                   messages: [...conv.messages, userMessage],
//                   updatedAt: new Date(),
//                   Automation: conv.Automation, // Ensure this property is included
//                 }
//               : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm border-2 border-primary ${
//                           message.role === "assistant"
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-muted text-foreground"
//                         }`}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.createdAt).toLocaleString()}
//                           </p>
//                           {message.role === "user" && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from 'lucide-react'
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"



// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = await fetchChatsAndBusinessVariables(automationId)
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map((conv): Conversation => ({
//           id: conv.chatId,
//           pageId: conv.pageId,
//           messages: conv.messages.map((msg: any): Message => ({
//             role: msg.role,
//             content: msg.content,
//             senderId: msg.senderId,
//             createdAt: new Date(msg.createdAt)
//           })),
//           createdAt: new Date(conv.messages[0]?.createdAt || Date.now()),
//           updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt || Date.now()),
//           unreadCount: 0,
//           Automation: null
//         }))

//       // Sort conversations by the timestamp of the last message

//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const result = await sendMessage(
//         newMessage,
//         selectedConversation.id,
//         pageId,
//         automationId,
//         token,
//         businessVariables,
//       )

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.id,
//           createdAt: result.userMessage.timestamp,
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages, updatedAt: new Date() }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.id === selectedConversation.id
//               ? {
//                   ...conv,
//                   messages: [...conv.messages, userMessage],
//                   updatedAt: new Date(),
//                   Automation: conv.Automation, // Ensure this property is included
//                 }
//               : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm border-2 border-primary ${
//                           message.role === "assistant"
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-muted text-foreground"
//                         }`}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.createdAt).toLocaleString()}
//                           </p>
//                           {message.role === "user" && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"

// interface RawConversation {
//   chatId: string
//   pageId: string
//   messages: Array<{
//     role: "user" | "assistant"
//     content: string
//     senderId: string
//     createdAt: string
//   }>
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = (await fetchChatsAndBusinessVariables(automationId)) as {
//         conversations: RawConversation[]
//         token: string
//         businessVariables: BusinessVariables
//       }
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map(
//           (conv): Conversation => ({
//             id: conv.chatId,
//             pageId: conv.pageId,
//             messages: conv.messages.map(
//               (msg): Message => ({
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//               }),
//             ),
//             createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//             updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//             unreadCount: 0,
//             Automation: null,
//           }),
//         )

//       // Sort conversations by the timestamp of the last message

//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const result = await sendMessage(
//         newMessage,
//         selectedConversation.id,
//         pageId,
//         automationId,
//         token,
//         businessVariables,
//       )

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.id,
//           createdAt: result.userMessage.timestamp,
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages, updatedAt: new Date() }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.id === selectedConversation.id
//               ? {
//                   ...conv,
//                   messages: [...conv.messages, userMessage],
//                   updatedAt: new Date(),
//                   Automation: conv.Automation, // Ensure this property is included
//                 }
//               : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm border-2 border-primary ${
//                           message.role === "assistant"
//                             ? "bg-primary text-primary-foreground"
//                             : "bg-muted text-foreground"
//                         }`}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.createdAt).toLocaleString()}
//                           </p>
//                           {message.role === "user" && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import { cn } from "@/lib/utils"

// interface RawConversation {

//   chatId: string
//   pageId: string
//   messages: Array<{
//     id:string
//     role: "user" | "assistant"
//     content: string
//     senderId: string
//     createdAt: string
//   }>
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const gradientBorder = "bg-gradient-to-r from-primary to-secondary p-[2px] rounded-lg"

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = (await fetchChatsAndBusinessVariables(automationId)) as {
//         conversations: RawConversation[]
//         token: string
//         businessVariables: BusinessVariables
//       }
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map(
//           (conv): Conversation => ({
//             id: conv.chatId,
//             pageId: conv.pageId,
//             messages: conv.messages.map(
//               (msg): Message => ({
//                 id:msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//               }),
//             ),
//             createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//             updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//             unreadCount: 0,
//             Automation: null,
//           }),
//         )

//       // Sort conversations by the timestamp of the last message

//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

  
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           createdAt: result.userMessage.timestamp,
//           status: "sent",
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }
//   //----------------------------------------

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={cn(
//                           "max-w-[75%] p-3 rounded-lg text-sm",
//                           message.role === "assistant" ? "bg-primary text-primary-foreground" : gradientBorder,
//                         )}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.createdAt).toLocaleString()}
//                           </p>
//                           {message.role === "user" && (
//                             <div
//                               className={`flex items-center ${message.status === "sent" ? "text-green-500" : "text-red-500"}`}
//                             >
//                               {message.status === "sent" ? (
//                                 <>
//                                   <Check size={12} className="mr-1" />
//                                   <span className="text-xs">Sent</span>
//                                 </>
//                               ) : (
//                                 <span className="text-xs">Not sent</span>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats



// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from 'lucide-react'
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import { cn } from "@/lib/utils"

// interface RawConversation {

//   chatId: string
//   pageId: string
//   messages: Array<{
//     id:string
//     role: "user" | "assistant"
//     content: string
//     senderId: string
//     createdAt: string
//   }>
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const gradientBorder = "bg-gradient-to-r from-primary to-secondary p-[2px] rounded-lg"

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = (await fetchChatsAndBusinessVariables(automationId)) as {
//         conversations: RawConversation[]
//         token: string
//         businessVariables: BusinessVariables
//       }
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map(
//           (conv): Conversation => ({
//             id: conv.chatId,
//             userId: conv.messages[0]?.senderId || conv.chatId, // Use senderId from the first message, or fallback to chatId
//             pageId: conv.pageId,
//             messages: conv.messages.map(
//               (msg): Message => ({
//                 id: msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//               }),
//             ),
//             createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//             updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//             unreadCount: 0,
//             Automation: null,
//           }),
//         )

//       // Sort conversations by the timestamp of the last message
//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

  
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           createdAt: result.userMessage.timestamp,
//           status: "sent",
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }
//   //----------------------------------------

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={cn(
//                           "max-w-[75%] p-3 rounded-lg text-sm",
//                           message.role === "assistant" ? "bg-primary text-primary-foreground" : gradientBorder,
//                         )}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.createdAt).toLocaleString()}
//                           </p>
//                           {message.role === "user" && (
//                             <div
//                               className={`flex items-center ${message.status === "sent" ? "text-green-500" : "text-red-500"}`}
//                             >
//                               {message.status === "sent" ? (
//                                 <>
//                                   <Check size={12} className="mr-1" />
//                                   <span className="text-xs">Sent</span>
//                                 </>
//                               ) : (
//                                 <span className="text-xs">Not sent</span>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import { cn } from "@/lib/utils"

// interface RawConversation {
//   chatId: string
//   pageId: string
//   messages: Array<{
//     id: string
//     role: "user" | "assistant"
//     content: string
//     senderId: string
//     createdAt: string
//   }>
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const gradientBorder = "bg-gradient-to-r from-primary to-secondary p-[2px] rounded-lg"

// const chatBubbleStyles: React.CSSProperties = {
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = (await fetchChatsAndBusinessVariables(automationId)) as {
//         conversations: RawConversation[]
//         token: string
//         businessVariables: BusinessVariables
//       }
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map(
//           (conv): Conversation => ({
//             id: conv.chatId,
//             userId: conv.messages[0]?.senderId || conv.chatId, // Use senderId from the first message, or fallback to chatId
//             pageId: conv.pageId,
//             messages: conv.messages.map(
//               (msg): Message => ({
//                 id: msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//               }),
//             ),
//             createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//             updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//             unreadCount: 0,
//             Automation: null,
//           }),
//         )

//       // Sort conversations by the timestamp of the last message
//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           createdAt: result.userMessage.timestamp,
//           status: "sent",
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }
//   //----------------------------------------

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       style={chatBubbleStyles}
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={cn(
//                           "max-w-[75%] p-4 rounded-3xl text-sm backdrop-blur-md backdrop-filter",
//                           message.role === "assistant"
//                             ? "bg-primary/10 border-2 border-primary text-primary-foreground chat-bubble-assistant rounded-tl-sm"
//                             : "bg-secondary/10 border-2 border-secondary text-secondary-foreground chat-bubble-user rounded-tr-sm",
//                         )}
//                       >
//                         <p className="break-words">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1">
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(message.createdAt).toLocaleString()}
//                           </p>
//                           {message.role === "user" && (
//                             <div
//                               className={`flex items-center ${message.status === "sent" ? "text-green-500" : "text-red-500"}`}
//                             >
//                               {message.status === "sent" ? (
//                                 <>
//                                   <Check size={12} className="mr-1" />
//                                   <span className="text-xs">Sent</span>
//                                 </>
//                               ) : (
//                                 <span className="text-xs">Not sent</span>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import { cn } from "@/lib/utils"

// interface RawConversation {
//   chatId: string
//   pageId: string
//   messages: Array<{
//     id: string
//     role: "user" | "assistant"
//     content: string
//     senderId: string
//     createdAt: string
//   }>
// }

// const BOT_NAME = "AiAssist"
// // const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_AVATAR = "/fancy-profile-pic.svg"

// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const gradientBorder = "bg-gradient-to-r from-primary to-secondary p-[2px] rounded-lg"

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = (await fetchChatsAndBusinessVariables(automationId)) as {
//         conversations: RawConversation[]
//         token: string
//         businessVariables: BusinessVariables
//       }
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map(
//           (conv): Conversation => ({
//             id: conv.chatId,
//             userId: conv.messages[0]?.senderId || conv.chatId, // Use senderId from the first message, or fallback to chatId
//             pageId: conv.pageId,
//             messages: conv.messages.map(
//               (msg): Message => ({
//                 id: msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//               }),
//             ),
//             createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//             updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//             unreadCount: 0,
//             Automation: null,
//           }),
//         )

//       // Sort conversations by the timestamp of the last message
//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation?.messages])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           createdAt: result.userMessage.timestamp,
//           status: "sent",
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }
//   //----------------------------------------

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Client","Client","Client"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   return (
//     <div
//       className={`flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-foreground border border-primary/10 rounded-lg overflow-hidden ${selectedConversation ? "h-[calc(100vh-8rem)]" : ""}`}
//     >
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : (
//         <>
//           {selectedConversation ? (
//             <>
//               <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                 <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                   <ArrowLeft size={20} />
//                 </Button>
//                 <Avatar className="w-10 h-10">
//                   <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                   <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-3 flex-grow">
//                   <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                   <p className="text-sm text-muted-foreground flex items-center">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     )}
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                     ) === "Active now" && <ActiveNowIndicator />}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-end" : "justify-start"}`}
//                     >
//                       {message.role === "assistant" ? (
//                         <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={cn(
//                           "max-w-[75%] p-3 rounded-3xl text-sm relative",
//                           message.role === "assistant"
//                             ? "bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 text-white"
//                             : "bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-2 border-purple-500/50 text-white",
//                         )}
//                         style={{
//                           backdropFilter: "blur(10px)",
//                           WebkitBackdropFilter: "blur(10px)",
//                         }}
//                       >
//                         <p className="break-words relative z-10">{message.content}</p>
//                         <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
//                           <p>{new Date(message.createdAt).toLocaleString()}</p>
//                           {message.role === "assistant" && (
//                             <div
//                               className={`flex items-center ${
//                                 message.status === "sent" ? "text-green-400" : "text-red-400"
//                               }`}
//                             >
//                               {message.status === "sent" || true ? (
//                                 <>
//                                   <Check size={12} className="mr-1" />
//                                   <span>Sent</span>
//                                 </>
//                               ) : (
//                                 <span>Failed</span>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                         <div
//                           className={cn(
//                             "absolute inset-0 rounded-3xl opacity-20",
//                             message.role === "assistant"
//                               ? "bg-gradient-to-br from-blue-400 to-blue-600"
//                               : "bg-gradient-to-br from-purple-400 to-purple-600",
//                           )}
//                         ></div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2 relative">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-60 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                       style={{ height: "36px", transition: "height 0.1s ease" }}
//                       onInput={(e) => {
//                         const target = e.target as HTMLTextAreaElement
//                         target.style.height = "36px"
//                         target.style.height = `${target.scrollHeight}px`
//                       }}
//                     />
//                   </div>
//                   <div className="flex space-x-1">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0"
//                           >
//                             <Send className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                               <Paperclip className="h-5 w-5" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                   <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                 ) : (
//                   <>
//                     {conversations.slice(0, displayedConversations).map((conversation) => (
//                       <motion.div
//                         key={conversation.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                       >
//                         <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                           <Avatar className="w-10 h-10 relative border-2 border-primary">
//                             <AvatarImage src={getAvatarUrl(conversation.id)} />
//                             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.id) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? conversation.messages[conversation.messages.length - 1].content
//                                     .split(" ")
//                                     .slice(0, 2)
//                                     .join(" ") + "..."
//                                 : "No messages"}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end ml-2">
//                           <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDeleteConversation(conversation)}
//                                   className="text-muted-foreground hover:text-red-500 mt-1"
//                                 >
//                                   <Trash2 size={18} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Delete conversation</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {displayedConversations < conversations.length && (
//                       <div className="p-4">
//                         <Button
//                           onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
//                           variant="outline"
//                           className="w-full"
//                         >
//                           Load More
//                         </Button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </ScrollArea>
//             </>
//           )}
//         </>
//       )}
//       <DeleteConfirmationModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//       />
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { useSpring, animated } from "react-spring"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check, Sparkles, Zap } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/dashboard"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import { cn } from "@/lib/utils"
// import FancyLoader from "./fancy-loader"

// interface RawConversation {
//   chatId: string
//   pageId: string
//   messages: Array<{
//     id: string
//     role: "user" | "assistant"
//     content: string
//     senderId: string
//     createdAt: string
//   }>
// }

// const BOT_NAME = "AiAssist"
// // const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_AVATAR = "/fancy-profile-pic.svg"

// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
//   [key: string]: string
//   business_name: string
//   welcome_message: string
//   business_industry: string
// }

// const gradientBorder = "bg-gradient-to-r from-primary via-purple-500 to-secondary p-[2px] rounded-lg"
// const fancyBackground = "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1d1d1d]"

// const ShimmeringBorder = ({ children }: { children: React.ReactNode }) => {
//   const styles = useSpring({
//     from: { backgroundPosition: "0% 50%" },
//     to: { backgroundPosition: "100% 50%" },
//     config: { duration: 5000 },
//     loop: true,
//   })

//   return (
//     <animated.div
//       style={{
//         ...styles,
//         backgroundSize: "200% 200%",
//       }}
//       className={`${gradientBorder} p-[2px] rounded-lg`}
//     >
//       {children}
//     </animated.div>
//   )
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const [displayedConversations, setDisplayedConversations] = useState(4)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
//   const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const getAvatarUrl = (userId: string) => {
//     return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
//   }

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const { conversations, token, businessVariables } = (await fetchChatsAndBusinessVariables(automationId)) as {
//         conversations: RawConversation[]
//         token: string
//         businessVariables: BusinessVariables
//       }
//       const filteredConversations = conversations
//         .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//         .map(
//           (conv): Conversation => ({
//             id: conv.chatId,
//             userId: conv.messages[0]?.senderId || conv.chatId, // Use senderId from the first message, or fallback to chatId
//             pageId: conv.pageId,
//             messages: conv.messages.map(
//               (msg): Message => ({
//                 id: msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//               }),
//             ),
//             createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//             updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//             unreadCount: 0,
//             Automation: null,
//           }),
//         )

//       // Sort conversations by the timestamp of the last message
//       filteredConversations.sort((a, b) => {
//         const lastMessageA = a.messages[a.messages.length - 1]
//         const lastMessageB = b.messages[b.messages.length - 1]
//         return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//       })

//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0) {
//         setPageId(filteredConversations[0].pageId)
//       }

//       setToken(token)
//       setBusinessVariables(businessVariables)

//       // Show example conversations by default if there are no active conversations
//       if (filteredConversations.length === 0) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [scrollRef, conversations]) //Corrected useEffect dependency

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)
//     setError(null)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           createdAt: result.userMessage.timestamp,
//           status: "sent",
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           // Sort conversations to ensure the most recent one is at the top
//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")
//       } else {
//         console.error("Failed to send message:", result.message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     } finally {
//       setIsTyping(false)
//     }
//   }
//   //----------------------------------------

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     const names = ["Client", "Client", "Client"]
//     return names[Math.floor(Math.random() * names.length)]
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
//     // Reset the unread count for the selected conversation
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
//     )
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       // Implement the delete functionality here
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsDeleteModalOpen(false)
//       setConversationToDelete(null)
//     }
//   }

//   const getActivityStatus = (lastActive: Date) => {
//     const now = new Date()
//     const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

//     if (diffInMinutes < 1) return "Active now"
//     if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const ActiveNowIndicator = () => (
//     <span className="relative flex h-3 w-3 ml-2">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//     </span>
//   )

//   const generateAiSuggestion = () => {
//     const suggestions = [
//       "Would you like to know more about our products?",
//       "Can I assist you with anything specific today?",
//       "Have you checked out our latest offers?",
//       "Is there anything else I can help you with?",
//     ]
//     setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
//   }

//   useEffect(() => {
//     if (selectedConversation && selectedConversation.messages.length > 0) {
//       const lastMessage = selectedConversation.messages[selectedConversation.messages.length - 1]
//       if (lastMessage && lastMessage.role === "user") {
//         generateAiSuggestion()
//       }
//     }
//   }, [selectedConversation])

//   return (
//     <ShimmeringBorder>
//       <div
//         className={`flex flex-col ${fancyBackground} text-foreground rounded-lg overflow-hidden ${
//           selectedConversation ? "h-[calc(100vh-8rem)]" : ""
//         }`}
//       >
//         {isLoading ? (
//           <FancyLoader />
//         ) : error ? (
//           <div className="p-4 text-red-500">{error}</div>
//         ) : (
//           <>
//             {selectedConversation ? (
//               <>
//                 <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//                   <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                     <ArrowLeft size={20} />
//                   </Button>
//                   <Avatar className="w-10 h-10">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                     <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-3 flex-grow">
//                     <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                     {selectedConversation && selectedConversation.messages.length > 0 && (
//                       <p className="text-sm text-muted-foreground flex items-center">
//                         {getActivityStatus(
//                           new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                         )}
//                         {getActivityStatus(
//                           new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                         ) === "Active now" && <ActiveNowIndicator />}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex-grow overflow-y-auto" ref={scrollRef}>
//                   <div className="p-4 space-y-4">
//                     {selectedConversation.messages.map((message, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                         className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-end" : "justify-start"}`}
//                       >
//                         {message.role === "assistant" ? (
//                           <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                             <AvatarImage src={BOT_AVATAR} />
//                             <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                           </Avatar>
//                         ) : (
//                           <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                             <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                             <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                           </Avatar>
//                         )}
//                         <div
//                           className={cn(
//                             "max-w-[75%] p-3 rounded-3xl text-sm relative",
//                             message.role === "assistant"
//                               ? "bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 text-white"
//                               : "bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-2 border-purple-500/50 text-white",
//                           )}
//                           style={{
//                             backdropFilter: "blur(10px)",
//                             WebkitBackdropFilter: "blur(10px)",
//                           }}
//                         >
//                           <p className="break-words relative z-10">{message.content}</p>
//                           <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
//                             <p>{new Date(message.createdAt).toLocaleString()}</p>
//                             {message.role === "assistant" && (
//                               <div
//                                 className={`flex items-center ${
//                                   message.status === "sent" ? "text-green-400" : "text-red-400"
//                                 }`}
//                               >
//                                 {message.status === "sent" || true ? (
//                                   <>
//                                     <Check size={12} className="mr-1" />
//                                     <span>Sent</span>
//                                   </>
//                                 ) : (
//                                   <span>Failed</span>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                           <div
//                             className={cn(
//                               "absolute inset-0 rounded-3xl opacity-20",
//                               message.role === "assistant"
//                                 ? "bg-gradient-to-br from-blue-400 to-blue-600"
//                                 : "bg-gradient-to-br from-purple-400 to-purple-600",
//                             )}
//                           ></div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="p-4 bg-background border-t border-primary/10">
//                   <div className="flex space-x-2 mb-2 overflow-x-auto pb-2">
//                     {["Hello!", "How can I help?", "Thank you!", "I'll get back to you soon."].map(
//                       (response, index) => (
//                         <motion.button
//                           key={index}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
//                           onClick={() => setNewMessage(response)}
//                         >
//                           {response}
//                         </motion.button>
//                       ),
//                     )}
//                   </div>
//                   {isTyping && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="flex items-center space-x-2 p-2 bg-muted rounded-lg mb-2"
//                     >
//                       <span className="text-sm text-muted-foreground">AiAssist is typing</span>
//                       <motion.div
//                         animate={{
//                           scale: [1, 1.2, 1],
//                           transition: { repeat: Number.POSITIVE_INFINITY, duration: 1 },
//                         }}
//                       >
//                         <Sparkles className="h-4 w-4 text-primary" />
//                       </motion.div>
//                     </motion.div>
//                   )}
//                   <div className="flex items-center space-x-2 relative">
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                           <Smile className="h-5 w-5" />
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-60 p-0">
//                         <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                       </PopoverContent>
//                     </Popover>
//                     <div className="flex-grow relative">
//                       <Textarea
//                         placeholder="Type a message..."
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                         className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden"
//                         style={{ height: "36px", transition: "height 0.1s ease" }}
//                         onInput={(e) => {
//                           const target = e.target as HTMLTextAreaElement
//                           target.style.height = "36px"
//                           target.style.height = `${target.scrollHeight}px`
//                         }}
//                       />
//                     </div>
//                     <div className="flex space-x-1">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={handleSendMessage}
//                               className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center"
//                             >
//                               <Send className="h-5 w-5" />
//                             </motion.button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Send message</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                               onClick={handleVoiceMessage}
//                             >
//                               <Mic className="h-5 w-5" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Record voice message</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <label htmlFor="file-upload">
//                               <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                                 <Paperclip className="h-5 w-5" />
//                               </Button>
//                             </label>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Attach file</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                     <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                   </div>
//                   {aiSuggestion && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="mt-2 p-2 bg-blue-500/20 rounded-lg flex items-center space-x-2"
//                     >
//                       <Zap className="h-4 w-4 text-blue-500" />
//                       <p className="text-sm text-blue-500">{aiSuggestion}</p>
//                       <button
//                         className="text-xs text-blue-700 hover:underline"
//                         onClick={() => setNewMessage(aiSuggestion)}
//                       >
//                         Use
//                       </button>
//                     </motion.div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                   <span>Recent Chats</span>
//                   {totalUnreadMessages < 0 && (
//                     <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                       {4}
//                     </span>
//                   )}
//                 </h3>
//                 <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
//                   {!token ? (
//                     <div className="p-4 space-y-4">
//                       <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                       <div className="text-center">
//                         <p className="text-muted-foreground mb-2">
//                           Connect your Instagram account to start receiving real messages.
//                         </p>
//                         <Button
//                           onClick={() => {
//                             // Implement navigation to integration page
//                             console.log("Navigate to integration page")
//                           }}
//                           className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                         >
//                           Connect Instagram
//                         </Button>
//                       </div>
//                     </div>
//                   ) : conversations.length === 0 ? (
//                     <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
//                   ) : (
//                     <>
//                       {conversations.slice(0, displayedConversations).map((conversation) => (
//                         <motion.div
//                           key={conversation.id}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.2 }}
//                           className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                         >
//                           <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                             <Avatar className="w-10 h-10 relative border-2 border-primary">
//                               <AvatarImage src={getAvatarUrl(conversation.id)} />
//                               <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//                               {unreadChats.has(conversation.id) && (
//                                 <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                               )}
//                             </Avatar>
//                             <div className="ml-3 flex-grow overflow-hidden pr-4">
//                               <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
//                               <p className="text-xs text-muted-foreground truncate">
//                                 {conversation.messages.length > 0
//                                   ? conversation.messages[conversation.messages.length - 1].content
//                                       .split(" ")
//                                       .slice(0, 2)
//                                       .join(" ") + "..."
//                                   : "No messages"}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end ml-2">
//                             <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => handleDeleteConversation(conversation)}
//                                     className="text-muted-foreground hover:text-red-500 mt-1"
//                                   >
//                                     <Trash2 size={18} />
//                                   </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                   <p>Delete conversation</p>
//                                 </TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </div>
//                         </motion.div>
//                       ))}
//                       {displayedConversations < conversations.length && (
//                         <div className="p-4">
//                           <Button
//                             onClick={() =>
//                               setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))
//                             }
//                             variant="outline"
//                             className="w-full"
//                           >
//                             Load More
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </ScrollArea>
//               </>
//             )}
//           </>
//         )}
//         <DeleteConfirmationModal
//           isOpen={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={confirmDelete}
//         />
//       </div>
//     </ShimmeringBorder>
//   )
// }

// export default AutomationChats



"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useSpring, animated } from "react-spring"
import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check, Sparkles, Zap } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Conversation, Message } from "@/types/dashboard"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import ExampleConversations from "./exampleConvo"
import DeleteConfirmationModal from "./confirmDelete"
import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
import { cn } from "@/lib/utils"
import FancyLoader from "./fancy-loader"

interface RawConversation {
  chatId: string
  pageId: string
  messages: Array<{
    id: string
    role: "user" | "assistant"
    content: string
    senderId: string
    createdAt: string
  }>
}

const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
const BOT_AVATAR = "/fancy-profile-pic.svg"

const BOT_ID = "17841444435951291"
const EXCLUDED_CHAT_ID = "17841444435951291"

interface AutomationChatsProps {
  automationId: string
}

interface BusinessVariables {
  [key: string]: string
  business_name: string
  welcome_message: string
  business_industry: string
}

const gradientBorder = "bg-gradient-to-r from-primary via-purple-500 to-secondary p-[2px] rounded-lg"
const fancyBackground = "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1d1d1d]"

const ShimmeringBorder = ({ children }: { children: React.ReactNode }) => {
  const styles = useSpring({
    from: { backgroundPosition: "0% 50%" },
    to: { backgroundPosition: "100% 50%" },
    config: { duration: 5000 },
    loop: true,
  })

  return (
    <animated.div
      style={{
        ...styles,
        backgroundSize: "200% 200%",
      }}
      className={`${gradientBorder} p-[2px] rounded-lg`}
    >
      {children}
    </animated.div>
  )
}

const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
  const [token, setToken] = useState<string | null>(null)
  const [pageId, setPageId] = useState<string | null>(null)
  const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
    business_name: "",
    welcome_message: "",
    business_industry: "",
  })
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
  const [displayedConversations, setDisplayedConversations] = useState(4)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const getAvatarUrl = (userId: string) => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
  }

  const fetchChats = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { conversations, token, businessVariables } = (await fetchChatsAndBusinessVariables(automationId)) as {
        conversations: RawConversation[]
        token: string
        businessVariables: BusinessVariables
      }
      const filteredConversations = conversations
        .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
        .map(
          (conv): Conversation => ({
            id: conv.chatId,
            userId: conv.messages[0]?.senderId || conv.chatId, // Use senderId from the first message, or fallback to chatId
            pageId: conv.pageId,
            messages: conv.messages.map(
              (msg): Message => ({
                id: msg.id,
                role: msg.role,
                content: msg.content,
                senderId: msg.senderId,
                createdAt: new Date(msg.createdAt),
              }),
            ),
            createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
            updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
            unreadCount: 0,
            Automation: null,
          }),
        )

      // Sort conversations by the timestamp of the last message
      filteredConversations.sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1]
        const lastMessageB = b.messages[b.messages.length - 1]
        return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
      })

      setConversations(filteredConversations)
      setUnreadChats(new Set(filteredConversations.map((conv) => conv.id)))
      setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

      if (filteredConversations.length > 0) {
        setPageId(filteredConversations[0].pageId)
      }

      setToken(token)
      setBusinessVariables(businessVariables)

      // Show example conversations by default if there are no active conversations
      if (filteredConversations.length === 0) {
        setSelectedConversation(null)
      }
    } catch (error) {
      console.error("Error in fetchChats:", error)
      setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }, [automationId])

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [scrollRef]) //Corrected useEffect dependency

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

    setIsTyping(true)
    setError(null)

    try {
      const userId = `${pageId}_${selectedConversation.userId}`
      const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

      if (result.success && result.userMessage) {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: result.userMessage.content,
          senderId: selectedConversation.userId,
          receiverId: pageId,
          createdAt: result.userMessage.timestamp,
          status: "sent",
        }

        setSelectedConversation((prev) => {
          if (!prev) return null
          const updatedMessages = [...prev.messages, userMessage]
          return { ...prev, messages: updatedMessages }
        })

        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map((conv) =>
            conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
          )

          // Sort conversations to ensure the most recent one is at the top
          return updatedConversations.sort((a, b) => {
            const lastMessageA = a.messages[a.messages.length - 1]
            const lastMessageB = b.messages[b.messages.length - 1]
            return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
          })
        })

        setNewMessage("")
      } else {
        console.error("Failed to send message:", result.message)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsTyping(false)
    }
  }
  //----------------------------------------

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage((prev) => prev + emoji.native)
  }

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("File selected:", file.name)
    }
  }

  const getFancyName = (userId: string) => {
    const names = ["Client", "Client", "Client"]
    return names[Math.floor(Math.random() * names.length)]
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setUnreadChats((prev) => {
      const newUnreadChats = new Set(prev)
      newUnreadChats.delete(conversation.id)
      return newUnreadChats
    })
    setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
    // Reset the unread count for the selected conversation
    setConversations((prevConversations) =>
      prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
    )
  }

  const handleDeleteConversation = (conversation: Conversation) => {
    setConversationToDelete(conversation)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!conversationToDelete || !pageId) return

    try {
      // Implement the delete functionality here
      setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
      if (selectedConversation?.id === conversationToDelete.id) {
        setSelectedConversation(null)
      }
    } catch (error) {
      console.error("Error deleting conversation:", error)
      setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsDeleteModalOpen(false)
      setConversationToDelete(null)
    }
  }

  const getActivityStatus = (lastActive: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / 60000)

    if (diffInMinutes < 1) return "Active now"
    if (diffInMinutes < 60) return `Active ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `Active ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  const ActiveNowIndicator = () => (
    <span className="relative flex h-3 w-3 ml-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </span>
  )

  const generateAiSuggestion = () => {
    const suggestions = [
      "Would you like to know more about our products?",
      "Can I assist you with anything specific today?",
      "Have you checked out our latest offers?",
      "Is there anything else I can help you with?",
    ]
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
  }

  useEffect(() => {
    if (selectedConversation && selectedConversation.messages.length > 0) {
      const lastMessage = selectedConversation.messages[selectedConversation.messages.length - 1]
      if (lastMessage && lastMessage.role === "user") {
        generateAiSuggestion()
      }
    }
  }, [selectedConversation])

  return (
    <ShimmeringBorder>
      <div
        className={`flex flex-col ${fancyBackground} text-foreground rounded-lg overflow-hidden ${
          selectedConversation ? "h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)]" : ""
        }`}
      >
        {isLoading ? (
          <FancyLoader />
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <>
            {selectedConversation ? (
              <>
                <div className="p-2 sm:p-4 bg-background border-b border-primary/10 flex items-center">
                  <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
                    <ArrowLeft size={20} />
                  </Button>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
                    <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-grow">
                    <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
                    {selectedConversation && selectedConversation.messages.length > 0 && (
                      <p className="text-sm text-muted-foreground flex items-center">
                        {getActivityStatus(
                          new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
                        )}
                        {getActivityStatus(
                          new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
                        ) === "Active now" && <ActiveNowIndicator />}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto" ref={scrollRef}>
                  <div className="p-4 space-y-4">
                    {selectedConversation.messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-end mb-4 ${message.role === "assistant" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" ? (
                          <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
                            <AvatarImage src={BOT_AVATAR} />
                            <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
                            <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "max-w-[85%] sm:max-w-[75%] p-2 sm:p-3 rounded-3xl text-sm relative",
                            message.role === "assistant"
                              ? "bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 text-white"
                              : "bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-2 border-purple-500/50 text-white",
                          )}
                          style={{
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                          }}
                        >
                          <p className="break-words relative z-10">{message.content}</p>
                          <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
                            <p>{new Date(message.createdAt).toLocaleString()}</p>
                            {message.role === "assistant" && (
                              <div
                                className={`flex items-center ${
                                  message.status === "sent" ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {message.status === "sent" || true ? (
                                  <>
                                    <Check size={12} className="mr-1" />
                                    <span>Sent</span>
                                  </>
                                ) : (
                                  <span>Failed</span>
                                )}
                              </div>
                            )}
                          </div>
                          <div
                            className={cn(
                              "absolute inset-0 rounded-3xl opacity-20",
                              message.role === "assistant"
                                ? "bg-gradient-to-br from-blue-400 to-blue-600"
                                : "bg-gradient-to-br from-purple-400 to-purple-600",
                            )}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-2 sm:p-4 bg-background border-t border-primary/10">
                  <div className="flex space-x-2 mb-2 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
                    {["Hello!", "How can I help?", "Thank you!", "I'll get back to you soon."].map(
                      (response, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
                          onClick={() => setNewMessage(response)}
                        >
                          {response}
                        </motion.button>
                      ),
                    )}
                  </div>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center space-x-2 p-2 bg-muted rounded-lg mb-2"
                    >
                      <span className="text-sm text-muted-foreground">AiAssist is typing</span>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          transition: { repeat: Number.POSITIVE_INFINITY, duration: 1 },
                        }}
                      >
                        <Sparkles className="h-4 w-4 text-primary" />
                      </motion.div>
                    </motion.div>
                  )}
                  <div className="flex items-center space-x-2 relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
                          <Smile className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 p-0">
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                      </PopoverContent>
                    </Popover>
                    <div className="flex-grow relative">
                      <Textarea
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                        className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden w-full"
                        style={{ height: "36px", transition: "height 0.1s ease" }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement
                          target.style.height = "36px"
                          target.style.height = `${Math.min(target.scrollHeight, 96)}px`
                        }}
                      />
                    </div>
                    <div className="flex space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleSendMessage}
                              className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center"
                            >
                              <Send className="h-5 w-5" />
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send message</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
                              onClick={handleVoiceMessage}
                            >
                              <Mic className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Record voice message</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <label htmlFor="file-upload">
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                <Paperclip className="h-5 w-5" />
                              </Button>
                            </label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Attach file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
                  </div>
                  {aiSuggestion && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-2 p-2 bg-blue-500/20 rounded-lg flex items-center space-x-2"
                    >
                      <Zap className="h-4 w-4 text-blue-500" />
                      <p className="text-sm text-blue-500">{aiSuggestion}</p>
                      <button
                        className="text-xs text-blue-700 hover:underline"
                        onClick={() => setNewMessage(aiSuggestion)}
                      >
                        Use
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
                  <span>Recent Chats</span>
                  {totalUnreadMessages > 0 && (
                    <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                      {totalUnreadMessages}
                    </span>
                  )}
                </h3>
                <ScrollArea className={selectedConversation ? "flex-grow" : "max-h-[calc(100vh-8rem)]"}>
                  {!token ? (
                    <div className="p-4 space-y-4">
                      <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
                      <div className="text-center px-2 sm:px-4">
                        <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                          Connect your Instagram account to start receiving real messages.
                        </p>
                        <Button
                          onClick={() => {
                            // Implement navigation to integration page
                            console.log("Navigate to integration page")
                          }}
                          className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full max-w-[250px]"
                        >
                          Connect Instagram
                        </Button>
                      </div>
                    </div>
                  ) : conversations.length === 0 ? (
                    <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
                  ) : (
                    <>
                      {conversations.slice(0, displayedConversations).map((conversation) => (
                        <motion.div
                          key={conversation.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center p-2 sm:p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
                        >
                          <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
                            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 relative border-2 border-primary">
                              <AvatarImage src={getAvatarUrl(conversation.id)} />
                              <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
                              {unreadChats.has(conversation.id) && (
                                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
                              )}
                            </Avatar>
                            <div className="ml-3 flex-grow overflow-hidden pr-4">
                              <p className="font-medium text-sm text-foreground">{getFancyName(conversation.id)}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {conversation.messages.length > 0
                                  ? conversation.messages[conversation.messages.length - 1].content
                                      .split(" ")
                                      .slice(0, 2)
                                      .join(" ") + "..."
                                  : "No messages"}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end ml-2">
                            <p className="text-xs text-muted-foreground">{getActivityStatus(conversation.updatedAt)}</p>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteConversation(conversation)}
                                    className="text-muted-foreground hover:text-red-500 mt-1"
                                  >
                                    <Trash2 size={18} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete conversation</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </motion.div>
                      ))}
                      {displayedConversations < conversations.length && (
                        <div className="p-4">
                          <Button
                            onClick={() =>
                              setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))
                            }
                            variant="outline"
                            className="w-full"
                          >
                            Load More
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </ScrollArea>
              </>
            )}
          </>
        )}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </ShimmeringBorder>
  )
}

export default AutomationChats

