// "use client"

// import React from "react"
// import { useEffect, useState, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useSpring, animated } from "react-spring"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check, Sparkles, Zap, Loader2, Search, X, Bell, BellOff, Filter, MessageSquare, Pin, Star, MoreHorizontal, Phone, Video, Info } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
//     read?: boolean
//   }>
// }

// const BOT_NAME = "AiAssist"
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

// // Keyboard shortcuts helper
// const KeyboardShortcut = ({ keys }: { keys: string[] }) => (
//   <div className="flex items-center space-x-1">
//     {keys.map((key, index) => (
//       <React.Fragment key={index}>
//         <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
//           {key}
//         </kbd>
//         {index < keys.length - 1 && <span className="text-gray-500">+</span>}
//       </React.Fragment>
//     ))}
//   </div>
// )

// // Help modal component
// const HelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   if (!isOpen) return null

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center justify-between">
//               <span>New message</span>
//               <KeyboardShortcut keys={["N"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Search conversations</span>
//               <KeyboardShortcut keys={["Ctrl", "K"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Send message</span>
//               <KeyboardShortcut keys={["Enter"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>New line in message</span>
//               <KeyboardShortcut keys={["Shift", "Enter"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Close conversation</span>
//               <KeyboardShortcut keys={["Esc"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Toggle sound</span>
//               <KeyboardShortcut keys={["M"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Mark all as read</span>
//               <KeyboardShortcut keys={["Shift", "A"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Help</span>
//               <KeyboardShortcut keys={["?"]} />
//             </div>
//           </div>

//           <div className="mt-6 pt-4 border-t">
//             <h3 className="font-semibold mb-2">Tips</h3>
//             <ul className="list-disc pl-5 space-y-2 text-sm">
//               <li>Click on a conversation to open it</li>
//               <li>Unread messages are highlighted with a red indicator</li>
//               <li>Use quick replies for common responses</li>
//               <li>Hover over messages to see the timestamp</li>
//               <li>Use the search bar to find specific conversations</li>
//             </ul>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

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

// // Add a dedicated UnreadChatsList component to better organize and display unread chats
// const UnreadChatsList = ({
//   conversations,
//   onSelectConversation,
// }: {
//   conversations: Conversation[]
//   onSelectConversation: (conversation: Conversation) => void
// }) => {
//   const unreadConversations = conversations.filter((conv) => conv.unreadCount > 0)

//   if (unreadConversations.length === 0) {
//     return null
//   }

//   return (
//     <div className="mb-6">
//       <h4 className="text-sm font-semibold mb-3 flex items-center">
//         <span className="relative flex h-3 w-3 mr-2">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//         </span>
//         Unread Messages ({unreadConversations.length})
//       </h4>
//       <div className="space-y-2">
//         {unreadConversations.map((conversation) => (
//           <motion.div
//             key={`unread-${conversation.id}`}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//             className="p-3 bg-background/80 border-l-4 border-red-500 rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 flex items-center"
//             onClick={() => onSelectConversation(conversation)}
//           >
//             <Avatar className="w-10 h-10 relative border-2 border-primary">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.id}`} />
//               <AvatarFallback>{conversation.id.slice(0, 2).toUpperCase()}</AvatarFallback>
//               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//             </Avatar>
//             <div className="ml-3 overflow-hidden flex-grow">
//               <p className="font-medium text-sm text-foreground truncate">Client</p>
//               <p className="text-xs text-muted-foreground truncate">
//                 {conversation.messages.length > 0
//                   ? conversation.messages[conversation.messages.length - 1].content
//                   : "No messages"}
//               </p>
//             </div>
//             <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
//               {conversation.unreadCount}
//             </span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // Add a visual notification indicator component
// const NotificationIndicator = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
//   if (!show) return null

//   return (
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: [1, 1.2, 1] }}
//       transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//       className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50 cursor-pointer"
//       onClick={onClick}
//     >
//       <motion.div
//         animate={{ rotate: [0, 15, -15, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, repeatDelay: 2 }}
//       >
//         <Bell className="h-6 w-6" />
//       </motion.div>
//     </motion.div>
//   )
// }

// // Message time component
// const MessageTime = ({ time }: { time: Date }) => {
//   return (
//     <span className="text-xs text-gray-400">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
//   )
// }

// // Typing indicator component
// const TypingIndicator = () => {
//   return (
//     <div className="flex space-x-1 items-center p-2">
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.2 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.4 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//     </div>
//   )
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(true) // Start with loading true
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
//   const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
//   const [unreadSeparatorIndex, setUnreadSeparatorIndex] = useState<number | null>(null)
//   const [hasNewMessages, setHasNewMessages] = useState(false)
//   const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
//   const fetchAttemptsRef = useRef(0) // Track fetch attempts
//   const [soundEnabled, setSoundEnabled] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([])
//   const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "recent">("all")
//   const [showHelpModal, setShowHelpModal] = useState(false)
//   const [pinnedConversations, setPinnedConversations] = useState<Set<string>>(new Set())
//   const [starredConversations, setStarredConversations] = useState<Set<string>>(new Set())
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
//   const [isSearchFocused, setIsSearchFocused] = useState(false)
//   const searchInputRef = useRef<HTMLInputElement>(null)
//   const messageInputRef = useRef<HTMLTextAreaElement>(null)
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const lastMessageTimeRef = useRef<Record<string, number>>({})
//   const [readConversations, setReadConversations] = useState<Set<string>>(new Set())

//   // Load read conversations from localStorage on component mount
//   // Remove these lines:
//   // const savedReadConversations = localStorage.getItem("readConversations")
//   // if (savedReadConversations) {
//   //   try {
//   //     const parsedData = JSON.parse(savedReadConversations)
//   //     setReadConversations(new Set(parsedData))
//   //   } catch (e) {
//   //     console.error("Error parsing saved read conversations:", e)
//   //   }
//   // }

//   // And add this useEffect hook after the state declarations:
//   useEffect(() => {
//     // Only run on client-side
//     if (typeof window !== "undefined") {
//       try {
//         const savedReadConversations = localStorage.getItem("readConversations")
//         if (savedReadConversations) {
//           const parsedData = JSON.parse(savedReadConversations)
//           setReadConversations(new Set(parsedData))
//         }
//       } catch (e) {
//         console.error("Error loading read conversations from localStorage:", e)
//       }
//     }
//   }, [])

//   // Save read conversations to localStorage whenever it changes
//   // Also update the localStorage saving effect to include better error handling:
//   useEffect(() => {
//     if (typeof window !== "undefined" && readConversations.size > 0) {
//       try {
//         localStorage.setItem("readConversations", JSON.stringify(Array.from(readConversations)))
//       } catch (e) {
//         console.error("Error saving read conversations to localStorage:", e)
//       }
//     }
//   }, [readConversations])

//   // Initialize audio element
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Create a new audio element
//       const audio = new Audio("/message-notification.mp3")

//       // Preload the audio
//       audio.load()

//       // Store the audio element in the ref
//       audioRef.current = audio

//       // Add event listeners for debugging
//       audio.addEventListener("play", () => console.log("Audio started playing"))
//       audio.addEventListener("error", (e) => console.error("Audio error:", e))

//       // Clean up function
//       return () => {
//         if (audioRef.current) {
//           audioRef.current.pause()
//           audioRef.current = null
//         }
//       }
//     }
//   }, [])

//   // Play notification sound function
//   const playNotificationSound = useCallback(() => {
//     if (!soundEnabled || !audioRef.current) return

//     try {
//       // Reset the audio to the beginning
//       audioRef.current.currentTime = 0

//       // Play the sound
//       const playPromise = audioRef.current.play()

//       // Handle promise rejection (happens when browser prevents autoplay)
//       if (playPromise !== undefined) {
//         playPromise.catch((error) => {
//           console.error("Audio play failed:", error)
//           // Try again with user interaction
//           document.addEventListener(
//             "click",
//             function playOnClick() {
//               audioRef.current?.play().catch((e) => console.error("Play on click failed:", e))
//               document.removeEventListener("click", playOnClick)
//             },
//             { once: true },
//           )
//         })
//       }
//     } catch (e) {
//       console.error("Error playing sound:", e)
//     }
//   }, [soundEnabled])

//   const getAvatarUrl = () => {
//     return `https://source.unsplash.com/random/100x100?portrait&${Math.random()}`
//   }

//   // Filter conversations based on search query and active filter
//   useEffect(() => {
//     if (!conversations.length) {
//       setFilteredConversations([])
//       return
//     }

//     let filtered = [...conversations]

//     // Apply search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter((conv) => {
//         // Search in messages
//         const hasMatchingMessage = conv.messages.some((msg) => msg.content.toLowerCase().includes(query))

//         // Search in conversation ID or other properties
//         const matchesId = conv.id.toLowerCase().includes(query)

//         return hasMatchingMessage || matchesId
//       })
//     }

//     // Apply category filter
//     if (activeFilter === "unread") {
//       filtered = filtered.filter((conv) => conv.unreadCount > 0)
//     } else if (activeFilter === "recent") {
//       // Sort by most recent and take top 5
//       filtered = filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5)
//     }

//     // Sort pinned conversations to the top
//     filtered.sort((a, b) => {
//       if (pinnedConversations.has(a.id) && !pinnedConversations.has(b.id)) return -1
//       if (!pinnedConversations.has(a.id) && pinnedConversations.has(b.id)) return 1
//       return b.updatedAt.getTime() - a.updatedAt.getTime()
//     })

//     setFilteredConversations(filtered)
//   }, [conversations, searchQuery, activeFilter, pinnedConversations])

//   const fetchChats = useCallback(
//     async (preserveReadStatus = false) => {
//       const fetchTimeout = setTimeout(() => {
//         if (isLoading) {
//           setIsLoading(false)
//           setError("Request timed out. Please refresh the page.")
//         }
//       }, 15000) // 15 second timeout
//       if (!automationId) {
//         setError("Missing automation ID")
//         setIsLoading(false)
//         return
//       }

//       // Don't set error to null if we're preserving read status (polling)
//       // This prevents UI flicker during background polling
//       if (!preserveReadStatus) {
//         setError(null)
//       }

//       try {
//         // Increment fetch attempts
//         fetchAttemptsRef.current += 1

//         if (!preserveReadStatus) {
//           console.log(`Fetching chats for automation ID: ${automationId}, attempt: ${fetchAttemptsRef.current}`)
//         }

//         const result = await fetchChatsAndBusinessVariables(automationId)

//         // Reset fetch attempts on success
//         fetchAttemptsRef.current = 0

//         if (!result || typeof result !== "object") {
//           throw new Error("Invalid response from server")
//         }

//         const { conversations, token, businessVariables } = result as {
//           conversations: RawConversation[]
//           token: string
//           businessVariables: BusinessVariables
//         }

//         if (!Array.isArray(conversations)) {
//           throw new Error("Conversations data is not in the expected format")
//         }

//         // Map of existing conversations to preserve read status
//         const existingConversationsMap = new Map(
//           preserveReadStatus
//             ? conversations.map((conv) => [
//                 conv.chatId,
//                 conversations
//                   .find((c) => c.chatId === conv.chatId)
//                   ?.messages.map((m) => ({ id: m.id, read: m.read })) || [],
//               ])
//             : [],
//         )

//         const filteredConversations = conversations
//           .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//           .map((conv): Conversation => {
//             // Get existing message read statuses if preserving
//             const existingMessages = preserveReadStatus ? existingConversationsMap.get(conv.chatId) || [] : []

//             // Map messages and preserve read status for existing messages
//             const mappedMessages = conv.messages.map((msg): Message => {
//               const existingMsg = existingMessages.find((m) => m.id === msg.id)

//               // If this conversation was manually marked as read in localStorage, mark all messages as read
//               const isRead = readConversations.has(conv.chatId)
//                 ? true
//                 : existingMsg
//                   ? existingMsg.read
//                   : Boolean(msg.read)

//               return {
//                 id: msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//                 read: isRead,
//               }
//             })

//             return {
//               id: conv.chatId,
//               userId: conv.messages[0]?.senderId || conv.chatId,
//               pageId: conv.pageId,
//               messages: mappedMessages,
//               createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//               updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//               unreadCount: readConversations.has(conv.chatId) ? 0 : mappedMessages.filter((msg) => !msg.read).length,
//               Automation: null,
//             }
//           })

//         // Check for new messages
//         if (preserveReadStatus && conversations.length > 0) {
//           const currentConversationsMap = new Map(conversations.map((conv) => [conv.chatId, conv.messages.length]))

//           // Compare with previous state to detect new messages
//           let hasNew = false
//           let newMessageConversationId = null

//           setConversations((prevConvs) => {
//             prevConvs.forEach((prevConv) => {
//               const newMsgCount = currentConversationsMap.get(prevConv.id) || 0
//               const prevMsgCount = prevConv.messages.length

//               if (newMsgCount > prevMsgCount) {
//                 // Check if this is truly a new message (not just a refresh)
//                 const lastMessageTime = lastMessageTimeRef.current[prevConv.id] || 0
//                 const latestMessageTime = new Date(
//                   conversations.find((c) => c.chatId === prevConv.id)?.messages[newMsgCount - 1]?.createdAt || 0,
//                 ).getTime()

//                 // Only consider it new if the message timestamp is newer than what we've seen
//                 if (latestMessageTime > lastMessageTime) {
//                   hasNew = true
//                   newMessageConversationId = prevConv.id
//                   lastMessageTimeRef.current[prevConv.id] = latestMessageTime
//                 }
//               }
//             })
//             return prevConvs
//           })

//           if (hasNew) {
//             setHasNewMessages(true)

//             // Only play sound if we're not currently viewing the conversation with new messages
//             if (selectedConversation?.id !== newMessageConversationId) {
//               playNotificationSound()
//             }
//           }
//         }

//         filteredConversations.sort((a, b) => {
//           const lastMessageA = a.messages[a.messages.length - 1]
//           const lastMessageB = b.messages[b.messages.length - 1]
//           return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//         })

//         // Update conversations state without affecting the selected conversation
//         setConversations((prevConversations) => {
//           // If we're preserving read status and have a selected conversation,
//           // make sure we don't reset its read status
//           if (preserveReadStatus && selectedConversation) {
//             const updatedConversations = [...filteredConversations]
//             const selectedIndex = updatedConversations.findIndex((c) => c.id === selectedConversation.id)

//             if (selectedIndex !== -1) {
//               // Keep the messages as read for the selected conversation
//               updatedConversations[selectedIndex] = {
//                 ...updatedConversations[selectedIndex],
//                 messages: updatedConversations[selectedIndex].messages.map((m) => ({ ...m, read: true })),
//                 unreadCount: 0,
//               }
//             }

//             return updatedConversations
//           }

//           return filteredConversations
//         })

//         // Update unread chats set
//         setUnreadChats(new Set(filteredConversations.filter((conv) => conv.unreadCount > 0).map((conv) => conv.id)))
//         setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + conv.unreadCount, 0))

//         if (filteredConversations.length > 0 && !pageId) {
//           setPageId(filteredConversations[0].pageId)
//         }

//         if (token) {
//           setToken(token)
//         }

//         if (businessVariables) {
//           setBusinessVariables(businessVariables)
//         }

//         // Only update selected conversation if it exists in the new data
//         // and we're not in the middle of a conversation
//         if (selectedConversation) {
//           const updatedSelectedConv = filteredConversations.find((conv) => conv.id === selectedConversation.id)
//           if (updatedSelectedConv) {
//             // Preserve the read status of messages in the selected conversation
//             const updatedWithReadStatus = {
//               ...updatedSelectedConv,
//               messages: updatedSelectedConv.messages.map((msg) => ({
//                 ...msg,
//                 read: true,
//               })),
//               unreadCount: 0,
//             }

//             // Only update if there are new messages
//             if (updatedSelectedConv.messages.length > selectedConversation.messages.length) {
//               setSelectedConversation(updatedWithReadStatus)

//               // Update displayed messages with new messages
//               const newMessages = updatedSelectedConv.messages.slice(selectedConversation.messages.length)
//               setDisplayedMessages((prev) => [...prev, ...newMessages.map((msg) => ({ ...msg, read: true }))])

//               // Scroll to bottom when new messages arrive
//               setTimeout(() => {
//                 if (scrollRef.current) {
//                   scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//                 }
//               }, 100)
//             }
//           }
//         }

//         // Set loading to false after successful fetch
//         if (!preserveReadStatus) {
//           setIsLoading(false)
//         }
//       } catch (error) {
//         console.error("Error fetching chats:", error)

//         // Only show error after multiple attempts and not during background polling
//         if (!preserveReadStatus && fetchAttemptsRef.current > 3) {
//           setError(`Getting things ready... (Attempt ${fetchAttemptsRef.current})`)
//         }

//         // Exponential backoff for retries (max 10 seconds)
//         const retryDelay = Math.min(2000 * Math.pow(1.5, fetchAttemptsRef.current - 1), 10000)

//         // Retry after delay
//         setTimeout(() => {
//           fetchChats(preserveReadStatus)
//         }, retryDelay)
        
//         // Use mock data as fallback if loading takes too long
//         if (isLoading && fetchAttemptsRef.current > 3) {
//           console.log("Using mock data as fallback")
//           const mockConversations: Conversation[] = [
//             {
//               id: "mock_conv_1",
//               userId: "user123",
//               pageId: "page123",
//               messages: [
//                 {
//                   id: "msg1",
//                   role: "user",
//                   content: "Hi, I'm interested in your services",
//                   senderId: "user123",
//                   createdAt: new Date(Date.now() - 3600000),
//                   read: true,
//                 },
//                 {
//                   id: "msg2",
//                   role: "assistant",
//                   content: "Hello! Thank you for your interest. How can I help you today?",
//                   senderId: "bot",
//                   createdAt: new Date(Date.now() - 3500000),
//                   read: true,
//                 },
//               ],
//               createdAt: new Date(Date.now() - 3600000),
//               updatedAt: new Date(Date.now() - 3500000),
//               unreadCount: 0,
//               Automation: null,
//             },
//           ]
//           setConversations(mockConversations)
//           setFilteredConversations(mockConversations)
//           setIsLoading(false)
//         }
//       } finally {
//         clearTimeout(fetchTimeout)
//       }
//     },
//     [automationId, selectedConversation, playNotificationSound, pageId, readConversations, isLoading],
//   )

//   useEffect(() => {
//     // Initial fetch
//     fetchChats()

//     // Set up polling for real-time updates
//     pollingIntervalRef.current = setInterval(() => {
//       // Only poll if component is mounted
//       fetchChats(true) // preserve read status when polling
//     }, 5000) // Poll every 5 seconds

//     // Clean up interval on unmount
//     return () => {
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current)
//         pollingIntervalRef.current = null
//       }
//     }
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [displayedMessages])

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Don't trigger shortcuts when typing in input fields
//       if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
//         // Allow Escape key to close conversation even when in input
//         if (e.key === "Escape" && selectedConversation) {
//           e.preventDefault()
//           setSelectedConversation(null)
//           return
//         }

//         return
//       }

//       // Keyboard shortcuts
//       switch (e.key) {
//         case "n":
//         case "N":
//           // Focus message input if in conversation
//           if (selectedConversation && messageInputRef.current) {
//             e.preventDefault()
//             messageInputRef.current.focus()
//           }
//           break

//         case "k":
//           if (e.ctrlKey || e.metaKey) {
//             e.preventDefault()
//             searchInputRef.current?.focus()
//           }
//           break

//         case "Escape":
//           if (selectedConversation) {
//             e.preventDefault()
//             setSelectedConversation(null)
//           }
//           break

//         case "m":
//         case "M":
//           e.preventDefault()
//           setSoundEnabled((prev) => !prev)
//           break

//         case "a":
//         case "A":
//           if (e.shiftKey) {
//             e.preventDefault()
//             markAllAsRead()
//           }
//           break

//         case "?":
//           e.preventDefault()
//           setShowHelpModal(true)
//           break
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown)
//     return () => document.removeEventListener("keydown", handleKeyDown)
//   }, [selectedConversation])

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
//           read: true,
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.id === selectedConversation.id ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")

//         setDisplayedMessages((prev) => [...prev, userMessage])

//         // Scroll to the bottom after sending a message
//         if (scrollRef.current) {
//           scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//         }
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
//     setShowEmojiPicker(false)
//     messageInputRef.current?.focus()
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

//   const markAllAsRead = () => {
//     // Create a new set with all conversation IDs
//     const allConversationIds = new Set(conversations.map((conv) => conv.id))
//     setReadConversations(allConversationIds)

//     // Update conversations to mark all as read
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => ({
//         ...conv,
//         messages: conv.messages.map((msg) => ({ ...msg, read: true })),
//         unreadCount: 0,
//       })),
//     )

//     // Clear unread chats
//     setUnreadChats(new Set())
//     setTotalUnreadMessages(0)
//     setHasNewMessages(false)
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     // Add this conversation to the read conversations set
//     setReadConversations((prev) => {
//       const newSet = new Set(prev)
//       newSet.add(conversation.id)
//       return newSet
//     })

//     // Create a copy with all messages marked as read
//     const conversationWithReadMessages = {
//       ...conversation,
//       messages: conversation.messages.map((msg) => ({ ...msg, read: true })),
//       unreadCount: 0,
//     }

//     // Set the selected conversation first
//     setSelectedConversation(conversationWithReadMessages)

//     // Update unread chats
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })

//     // Update total unread count
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount ?? 0)))

//     // Set displayed messages
//     const lastMessages = conversation.messages.slice(-10)
//     setDisplayedMessages(lastMessages.map((msg) => ({ ...msg, read: true })))

//     // Find unread separator index
//     const unreadIndex = lastMessages.findIndex((msg) => !msg.read)
//     setUnreadSeparatorIndex(unreadIndex !== -1 ? unreadIndex : null)

//     // Update conversations with read messages
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? conversationWithReadMessages : conv)),
//     )

//     // Reset new message indicator when viewing the conversation
//     setHasNewMessages(false)

//     // Focus the message input
//     setTimeout(() => {
//       messageInputRef.current?.focus()
//     }, 100)
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }

//       // Remove from pinned/starred if needed
//       if (pinnedConversations.has(conversationToDelete.id)) {
//         setPinnedConversations((prev) => {
//           const newSet = new Set(prev)
//           newSet.delete(conversationToDelete.id)
//           return newSet
//         })
//       }

//       if (starredConversations.has(conversationToDelete.id)) {
//         setStarredConversations((prev) => {
//           const newSet = new Set(prev)
//           newSet.delete(conversationToDelete.id)
//           return newSet
//         })
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

//   const generateAiSuggestion = useCallback(() => {
//     const suggestions = [
//       "Would you like to know more about our products?",
//       "Can I assist you with anything specific today?",
//       "Have you checked out our latest offers?",
//       "Is there anything else I can help you with?",
//     ]
//     setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
//   }, [])

//   useEffect(() => {
//     if (selectedConversation && selectedConversation.messages.length > 0) {
//       const lastMessage = selectedConversation.messages[selectedConversation.messages.length - 1]
//       if (lastMessage && lastMessage.role === "user") {
//         generateAiSuggestion()
//       }
//     }
//   }, [selectedConversation, generateAiSuggestion])

//   const togglePinConversation = (conversationId: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setPinnedConversations((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(conversationId)) {
//         newSet.delete(conversationId)
//       } else {
//         newSet.add(conversationId)
//       }
//       return newSet
//     })
//   }

//   const toggleStarConversation = (conversationId: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setStarredConversations((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(conversationId)) {
//         newSet.delete(conversationId)
//       } else {
//         newSet.add(conversationId)
//       }
//       return newSet
//     })
//   }

//   const FancyErrorMessage: React.FC<{ message: string }> = ({ message }) => {
//     return (
//       <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         >
//           <Zap className="w-16 h-16 text-yellow-400 mb-4" />
//         </motion.div>
//         <h3 className="text-xl font-semibold mb-2">Hang tight!</h3>
//         <p className="text-muted-foreground mb-4">{message}</p>
//         <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
//           <Loader2 className="w-6 h-6 text-primary animate-spin" />
//         </motion.div>
//       </div>
//     )
//   }

//   const loadMoreMessages = useCallback(() => {
//     if (selectedConversation) {
//       const currentLength = displayedMessages.length
//       const newMessages = selectedConversation.messages.slice(
//         Math.max(0, selectedConversation.messages.length - currentLength - 10),
//         selectedConversation.messages.length - currentLength,
//       )
//       setDisplayedMessages((prevMessages) => [...newMessages, ...prevMessages])
//     }
//   }, [selectedConversation, displayedMessages])

//   useEffect(() => {
//     if (selectedConversation) {
//       const lastMessages = selectedConversation.messages.slice(-10)
//       setDisplayedMessages(lastMessages)
//     }
//   }, [selectedConversation])

//   useEffect(() => {
//     const scrollArea = scrollRef.current
//     if (!scrollArea) return

//     const handleScroll = () => {
//       if (scrollArea.scrollTop === 0) {
//         loadMoreMessages()
//       }
//     }

//     scrollArea.addEventListener("scroll", handleScroll)
//     return () => scrollArea.removeEventListener("scroll", handleScroll)
//   }, [loadMoreMessages])

//   useEffect(() => {
//     // Update document title with unread count
//     if (totalUnreadMessages > 0) {
//       document.title = `(${totalUnreadMessages}) New Messages`
//     } else {
//       document.title = "Chat Dashboard"
//     }

//     return () => {
//       document.title = "Chat Dashboard"
//     }
//   }, [totalUnreadMessages])

//   // Render conversation list item
//   const ConversationListItem = ({ conversation }: { conversation: Conversation }) => {
//     const isPinned = pinnedConversations.has(conversation.id)
//     const isStarred = starredConversations.has(conversation.id)
//     const isUnread = conversation.unreadCount > 0

//     return (
//       <motion.div
//         key={conversation.id}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.2 }}
//         className={cn(
//           "p-4 bg-background rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 relative",
//           isPinned && "border-l-4 border-blue-500",
//           isUnread && "bg-background/90 border-l-4 border-red-500",
//         )}
//         onClick={() => handleSelectConversation(conversation)}
//       >
//         <div className="flex items-start space-x-3">
//           <Avatar className="w-12 h-12 relative border-2 border-primary flex-shrink-0">
//             <AvatarImage src={getAvatarUrl()} />
//             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//             {isUnread && (
//               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//             )}
//           </Avatar>

//           <div className="flex-grow overflow-hidden">
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center">
//                 <p className={cn("font-medium text-sm text-foreground", isUnread && "font-bold")}>
//                   {getFancyName(conversation.id)}
//                 </p>
//                 {isPinned && (
//                   <Badge variant="outline" className="ml-2 px-1">
//                     <Pin className="h-3 w-3 text-blue-500" />
//                   </Badge>
//                 )}
//                 {isStarred && (
//                   <Badge variant="outline" className="ml-2 px-1">
//                     <Star className="h-3 w-3 text-yellow-500" />
//                   </Badge>
//                 )}
//               </div>
//               <span className="text-xs text-muted-foreground">
//                 {new Date(conversation.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//               </span>
//             </div>

//             <p className="text-xs text-muted-foreground flex items-center mb-1">
//               {getActivityStatus(conversation.updatedAt)}
//               {getActivityStatus(conversation.updatedAt) === "Active now" && <ActiveNowIndicator />}
//             </p>

//             <p className={cn("text-sm text-muted-foreground truncate", isUnread && "text-foreground font-medium")}>
//               {conversation.messages.length > 0
//                 ? conversation.messages[conversation.messages.length - 1].content
//                 : "No messages"}
//             </p>

//             <div className="flex justify-between items-center mt-2">
//               <div className="flex space-x-1">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => togglePinConversation(conversation.id, e)}
//                 >
//                   <Pin className={cn("h-4 w-4", isPinned ? "text-blue-500 fill-blue-500" : "text-muted-foreground")} />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => toggleStarConversation(conversation.id, e)}
//                 >
//                   <Star
//                     className={cn("h-4 w-4", isStarred ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground")}
//                   />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleDeleteConversation(conversation)
//                   }}
//                 >
//                   <Trash2 size={16} className="text-muted-foreground hover:text-red-500" />
//                 </Button>
//               </div>

//               {isUnread && (
//                 <Badge variant="destructive" className="text-xs">
//                   {conversation.unreadCount}
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     )
//   }

//   // Update the main component's return statement to include the new unread chats section
//   // Replace the existing return statement with this improved version
//   return (
//     <>
//       {/* Add audio element for notification sound */}
//       <audio id="notification-sound" src="/message-notification.mp3" preload="auto" />

//       <NotificationIndicator
//         show={hasNewMessages && !selectedConversation}
//         onClick={() => {
//           // Find the first unread conversation and open it
//           const firstUnread = conversations.find((conv) => conv.unreadCount > 0)
//           if (firstUnread) {
//             handleSelectConversation(firstUnread)
//           }
//         }}
//       />

//       <AnimatePresence>
//         {showHelpModal && <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />}
//       </AnimatePresence>

//       <ShimmeringBorder>
//         <div
//           className={`flex flex-col ${fancyBackground} text-foreground rounded-lg overflow-hidden h-full max-h-[90vh] sm:max-h-[80vh]`}
//         >
//           {isLoading ? (
//             <FancyLoader />
//           ) : error ? (
//             <FancyErrorMessage message={error} />
//           ) : (
//             <>
//               {selectedConversation ? (
//                 <>
//                   <div className="p-2 sm:p-4 bg-background border-b border-primary/10 flex items-center">
//                     <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                       <ArrowLeft size={20} />
//                     </Button>
//                     <Avatar className="w-10 h-10">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                       <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-3 flex-grow">
//                       <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                       {selectedConversation && selectedConversation.messages.length > 0 && (
//                         <p className="text-sm text-muted-foreground flex items-center">
//                           {getActivityStatus(
//                             new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                           )}
//                           {getActivityStatus(
//                             new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                           ) === "Active now" && <ActiveNowIndicator />}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Phone className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Call</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Video className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Video call</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Info className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Info</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                   <ScrollArea className="flex-grow h-[calc(100vh-300px)] overflow-hidden">
//                     <div className="p-4 space-y-4" ref={scrollRef}>
//                       {displayedMessages.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64 text-center">
//                           <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                           <h3 className="text-lg font-medium mb-2">No messages yet</h3>
//                           <p className="text-muted-foreground max-w-md">
//                             Start the conversation by sending a message below.
//                           </p>
//                         </div>
//                       ) : (
//                         <>
//                           {displayedMessages.map((message, index) => (
//                             <React.Fragment key={`msg-fragment-${message.id}-${index}`}>
//                               {index === unreadSeparatorIndex && (
//                                 <div className="flex items-center my-2">
//                                   <div className="flex-grow border-t border-gray-600"></div>
//                                   <span className="mx-4 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
//                                     Unread messages
//                                   </span>
//                                   <div className="flex-grow border-t border-gray-600"></div>
//                                 </div>
//                               )}

//                               {/* Show date separator if needed */}
//                               {index > 0 &&
//                                 new Date(message.createdAt).toDateString() !==
//                                   new Date(displayedMessages[index - 1].createdAt).toDateString() && (
//                                   <div className="flex justify-center my-4">
//                                     <Badge variant="outline" className="bg-background/50 px-3 py-1">
//                                       {new Date(message.createdAt).toLocaleDateString(undefined, {
//                                         weekday: "long",
//                                         month: "short",
//                                         day: "numeric",
//                                       })}
//                                     </Badge>
//                                   </div>
//                                 )}

//                               <motion.div
//                                 key={`msg-${message.id}-${index}`}
//                                 initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                                 className={`flex items-end mb-4 group ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                               >
//                                 {message.role === "assistant" ? (
//                                   <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                                     <AvatarImage src={BOT_AVATAR} />
//                                     <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                                   </Avatar>
//                                 ) : (
//                                   <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                                     <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                                     <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                                   </Avatar>
//                                 )}
//                                 <div
//                                   className={cn(
//                                     "max-w-[85%] sm:max-w-[75%] p-2 sm:p-3 rounded-3xl text-sm relative",
//                                     message.role === "assistant"
//                                       ? "bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 text-white"
//                                       : "bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-2 border-purple-500/50 text-white",
//                                   )}
//                                   style={{
//                                     backdropFilter: "blur(10px)",
//                                     WebkitBackdropFilter: "blur(10px)",
//                                   }}
//                                 >
//                                   <p className="break-words relative z-10">{message.content}</p>
//                                   <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
//                                     <MessageTime time={new Date(message.createdAt)} />
//                                     {message.role === "assistant" && (
//                                       <div
//                                         className={`flex items-center ${
//                                           message.status === "sent" ? "text-green-400" : "text-green-400"
//                                         }`}
//                                       >
//                                         {message.status === "sent" || true ? (
//                                           <>
//                                             <Check size={12} className="mr-1" />
//                                             <span>Sent</span>
//                                           </>
//                                         ) : (
//                                           <span>Failed</span>
//                                         )}
//                                       </div>
//                                     )}
//                                   </div>
//                                   <div
//                                     className={cn(
//                                       "absolute inset-0 rounded-3xl opacity-20",
//                                       message.role === "assistant"
//                                         ? "bg-gradient-to-br from-blue-400 to-blue-600"
//                                         : "bg-gradient-to-br from-purple-400 to-purple-600",
//                                     )}
//                                   ></div>

//                                   {/* Message actions on hover */}
//                                   <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-8 bg-background rounded-full shadow-md p-1 flex space-x-1">
//                                     <TooltipProvider>
//                                       <Tooltip>
//                                         <TooltipTrigger asChild>
//                                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                                             <MoreHorizontal className="h-4 w-4" />
//                                           </Button>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                           <p>More options</p>
//                                         </TooltipContent>
//                                       </Tooltip>
//                                     </TooltipProvider>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             </React.Fragment>
//                           ))}

//                           {/* Typing indicator */}
//                           {isTyping && (
//                             <div className="flex items-start">
//                               <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                                 <AvatarImage src={BOT_AVATAR} />
//                                 <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                               </Avatar>
//                               <div className="bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 rounded-3xl p-3">
//                                 <TypingIndicator />
//                               </div>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </ScrollArea>
//                   <div className="p-2 sm:p-4 bg-background border-t border-primary/10">
//                     <div className="flex space-x-2 mb-2 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
//                       {[
//                         "Hello!",
//                         "Torever",
//                         "Hi there",
//                         "Awesome",
//                         "How can I help?",
//                         "Thank you!",
//                         "I'll get back to you soon.",
//                         "You are welcome",
//                       ].map((response, index) => (
//                         <motion.button
//                           key={index}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
//                           onClick={() => setNewMessage(response)}
//                         >
//                           {response}
//                         </motion.button>
//                       ))}
//                     </div>
//                     {isTyping && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="flex items-center space-x-2 p-2 bg-muted rounded-lg mb-2"
//                       >
//                         <span className="text-sm text-muted-foreground">AiAssist is typing</span>
//                         <motion.div
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             transition: { repeat: Number.POSITIVE_INFINITY, duration: 1 },
//                           }}
//                         >
//                           <Sparkles className="h-4 w-4 text-primary" />
//                         </motion.div>
//                       </motion.div>
//                     )}
//                     <div className="flex items-center space-x-2 relative">
//                       <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
//                         <PopoverTrigger asChild>
//                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                             <Smile className="h-5 w-5" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                           <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                         </PopoverContent>
//                       </Popover>
//                       <div className="flex-grow relative">
//                         <Textarea
//                           ref={messageInputRef}
//                           placeholder="Type here..."
//                           value={newMessage}
//                           onChange={(e) => setNewMessage(e.target.value)}
//                           onKeyPress={(e) => {
//                             if (e.key === "Enter" && !e.shiftKey) {
//                               e.preventDefault()
//                               handleSendMessage()
//                             }
//                           }}
//                           className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden w-full"
//                           style={{ height: "36px", transition: "height 0.1s ease" }}
//                           onInput={(e) => {
//                             const target = e.target as HTMLTextAreaElement
//                             target.style.height = "36px"
//                             target.style.height = `${Math.min(target.scrollHeight, 96)}px`
//                           }}
//                         />
//                       </div>
//                       <div className="flex space-x-1">
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={handleSendMessage}
//                                 className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center"
//                               >
//                                 <Send className="h-5 w-5" />
//                               </motion.button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Send Message</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                                 onClick={handleVoiceMessage}
//                               >
//                                 <Mic className="h-5 w-5" />
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Record voice message</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <label htmlFor="file-upload">
//                                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                                   <Paperclip className="h-5 w-5" />
//                                 </Button>
//                               </label>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Attach file</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                       <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                     </div>
//                     {aiSuggestion && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="mt-2 p-2 bg-blue-500/20 rounded-lg flex items-center space-x-2"
//                       >
//                         <Zap className="h-4 w-4 text-blue-500" />
//                         <p className="text-sm text-blue-500">{aiSuggestion}</p>
//                         <button
//                           className="text-xs text-blue-700 hover:underline"
//                           onClick={() => setNewMessage(aiSuggestion)}
//                         >
//                           Use
//                         </button>
//                       </motion.div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="p-4 bg-background border-b border-primary/10">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold flex items-center">
//                         <span>Recent Chats</span>
//                         {hasNewMessages && (
//                           <motion.div
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//                             className="ml-2 w-2 h-2 bg-green-500 rounded-full"
//                           />
//                         )}
//                         {totalUnreadMessages > 0 && (
//                           <Badge variant="destructive" className="ml-2">
//                             {totalUnreadMessages}
//                           </Badge>
//                         )}
//                       </h3>

//                       <div className="flex items-center space-x-2">
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="rounded-full"
//                                 onClick={() => setSoundEnabled(!soundEnabled)}
//                               >
//                                 {soundEnabled ? (
//                                   <Bell className="h-5 w-5 text-primary" />
//                                 ) : (
//                                   <BellOff className="h-5 w-5 text-muted-foreground" />
//                                 )}
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>{soundEnabled ? "Mute notifications" : "Unmute notifications"}</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button variant="ghost" size="icon" className="rounded-full" onClick={markAllAsRead}>
//                                 <Check className="h-5 w-5 text-muted-foreground" />
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Mark all as read</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="rounded-full"
//                                 onClick={() => setShowHelpModal(true)}
//                               >
//                                 <span className="text-sm font-semibold">?</span>
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Help</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                     </div>

//                     <div className="relative mb-4">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         ref={searchInputRef}
//                         placeholder="Search conversations..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onFocus={() => setIsSearchFocused(true)}
//                         onBlur={() => setIsSearchFocused(false)}
//                         className={cn(
//                           "pl-10 pr-10 py-2 bg-muted border-primary/20",
//                           isSearchFocused && "ring-2 ring-primary/50",
//                         )}
//                       />
//                       {searchQuery && (
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full"
//                           onClick={() => setSearchQuery("")}
//                         >
//                           <X className="h-4 w-4 text-muted-foreground" />
//                         </Button>
//                       )}

//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
//                         <KeyboardShortcut keys={["Ctrl", "K"]} />
//                       </div>
//                     </div>

//                     <Tabs
//                       defaultValue="all"
//                       className="w-full"
//                       onValueChange={(value) => setActiveFilter(value as any)}
//                     >
//                       <TabsList className="grid grid-cols-3 mb-4">
//                         <TabsTrigger value="all" className="text-xs">
//                           All Chats
//                         </TabsTrigger>
//                         <TabsTrigger value="unread" className="text-xs">
//                           Unread
//                           {totalUnreadMessages > 0 && (
//                             <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1">
//                               {totalUnreadMessages}
//                             </Badge>
//                           )}
//                         </TabsTrigger>
//                         <TabsTrigger value="recent" className="text-xs">
//                           Recent
//                         </TabsTrigger>
//                       </TabsList>
//                     </Tabs>
//                   </div>

//                   <ScrollArea className="flex-grow">
//                     <div className="flex flex-col p-4 space-y-4">
//                       {!token ? (
//                         <div className="w-full p-4 bg-background rounded-lg shadow-md">
//                           <ExampleConversations onSelectConversation={handleSelectConversation} className="mb-4" />
//                           <div className="text-center">
//                             <p className="text-muted-foreground mb-4 text-sm sm:text-base">
//                               Connect your Instagram account to start receiving real messages.
//                             </p>
//                             <Button
//                               onClick={() => {
//                                 console.log("Navigate to integration page")
//                               }}
//                               className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full"
//                             >
//                               Connect Instagram
//                             </Button>
//                           </div>
//                         </div>
//                       ) : filteredConversations.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64 text-center">
//                           {searchQuery ? (
//                             <>
//                               <Search className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                               <h3 className="text-lg font-medium mb-2">No results found</h3>
//                               <p className="text-muted-foreground max-w-md">
//                                 We couldnt find any conversations matching {searchQuery}.
//                               </p>
//                               <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
//                                 Clear search
//                               </Button>
//                             </>
//                           ) : (
//                             <>
//                               <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                               <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
//                               <p className="text-muted-foreground max-w-md">
//                                 Connect your account to start receiving messages.
//                               </p>
//                               <ExampleConversations onSelectConversation={handleSelectConversation} className="mt-6" />
//                             </>
//                           )}
//                         </div>
//                       ) : (
//                         <>
//                           {/* Unread chats section */}
//                           <UnreadChatsList
//                             conversations={conversations}
//                             onSelectConversation={handleSelectConversation}
//                           />

//                           {/* All chats section */}
//                           <div className="space-y-3">
//                             <div className="flex items-center justify-between">
//                               <h4 className="text-sm font-semibold">
//                                 {activeFilter === "all"
//                                   ? "All Conversations"
//                                   : activeFilter === "unread"
//                                     ? "Unread Conversations"
//                                     : "Recent Conversations"}
//                               </h4>
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                   <Button variant="ghost" size="sm" className="h-8 px-2">
//                                     <Filter className="h-4 w-4 mr-1" />
//                                     <span className="text-xs">Sort</span>
//                                   </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                   <DropdownMenuItem>Newest first</DropdownMenuItem>
//                                   <DropdownMenuItem>Oldest first</DropdownMenuItem>
//                                   <DropdownMenuItem>Unread first</DropdownMenuItem>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             </div>

//                             <div className="grid grid-cols-1 gap-3">
//                               {filteredConversations.map((conversation) => (
//                                 <ConversationListItem key={conversation.id} conversation={conversation} />
//                               ))}
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </ScrollArea>
//                 </>
//               )}
//             </>
//           )}
//           <DeleteConfirmationModal
//             isOpen={isDeleteModalOpen}
//             onClose={() => setIsDeleteModalOpen(false)}
//             onConfirm={confirmDelete}
//           />
//         </div>
//       </ShimmeringBorder>
//     </>
//   )
// }

// export default AutomationChats

// "use client"

// import React from "react"
// import { useEffect, useState, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useSpring, animated } from "react-spring"
// import { Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check, Sparkles, Zap, Loader2, Search, X, Bell, BellOff, Filter, MessageSquare, Pin, Star, MoreHorizontal, Phone, Video, Info } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
//     read?: boolean
//   }>
// }

// const BOT_NAME = "AiAssist"
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

// // Keyboard shortcuts helper
// const KeyboardShortcut = ({ keys }: { keys: string[] }) => (
//   <div className="flex items-center space-x-1">
//     {keys.map((key, index) => (
//       <React.Fragment key={index}>
//         <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
//           {key}
//         </kbd>
//         {index < keys.length - 1 && <span className="text-gray-500">+</span>}
//       </React.Fragment>
//     ))}
//   </div>
// )

// // Help modal component
// const HelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   if (!isOpen) return null

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center justify-between">
//               <span>New message</span>
//               <KeyboardShortcut keys={["N"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Search conversations</span>
//               <KeyboardShortcut keys={["Ctrl", "K"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Send message</span>
//               <KeyboardShortcut keys={["Enter"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>New line in message</span>
//               <KeyboardShortcut keys={["Shift", "Enter"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Close conversation</span>
//               <KeyboardShortcut keys={["Esc"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Toggle sound</span>
//               <KeyboardShortcut keys={["M"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Mark all as read</span>
//               <KeyboardShortcut keys={["Shift", "A"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Help</span>
//               <KeyboardShortcut keys={["?"]} />
//             </div>
//           </div>

//           <div className="mt-6 pt-4 border-t">
//             <h3 className="font-semibold mb-2">Tips</h3>
//             <ul className="list-disc pl-5 space-y-2 text-sm">
//               <li>Click on a conversation to open it</li>
//               <li>Unread messages are highlighted with a red indicator</li>
//               <li>Use quick replies for common responses</li>
//               <li>Hover over messages to see the timestamp</li>
//               <li>Use the search bar to find specific conversations</li>
//             </ul>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

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

// // Add a dedicated UnreadChatsList component to better organize and display unread chats
// const UnreadChatsList = ({
//   conversations,
//   onSelectConversation,
// }: {
//   conversations: Conversation[]
//   onSelectConversation: (arg0:Conversation) => void
// }) => {
//   const unreadConversations = conversations.filter((conv) => conv.unreadCount > 0)

//   if (unreadConversations.length === 0) {
//     return null
//   }

//   return (
//     <div className="mb-6">
//       <h4 className="text-sm font-semibold mb-3 flex items-center">
//         <span className="relative flex h-3 w-3 mr-2">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//         </span>
//         Unread Messages ({unreadConversations.length})
//       </h4>
//       <div className="space-y-2">
//         {unreadConversations.map((conversation) => (
//           <motion.div
//             key={`unread-${conversation.id}`}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//             className="p-3 bg-background/80 border-l-4 border-red-500 rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 flex items-center"
//             onClick={() => onSelectConversation(conversation)}
//           >
//             <Avatar className="w-10 h-10 relative border-2 border-primary">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.id}`} />
//               <AvatarFallback>{conversation.id.slice(0, 2).toUpperCase()}</AvatarFallback>
//               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//             </Avatar>
//             <div className="ml-3 overflow-hidden flex-grow">
//               <p className="font-medium text-sm text-foreground truncate">Client</p>
//               <p className="text-xs text-muted-foreground truncate">
//                 {conversation.messages.length > 0
//                   ? conversation.messages[conversation.messages.length - 1].content
//                   : "No messages"}
//               </p>
//             </div>
//             <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
//               {conversation.unreadCount}
//             </span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // Add a visual notification indicator component
// const NotificationIndicator = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
//   if (!show) return null

//   return (
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: [1, 1.2, 1] }}
//       transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//       className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50 cursor-pointer"
//       onClick={onClick}
//     >
//       <motion.div
//         animate={{ rotate: [0, 15, -15, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, repeatDelay: 2 }}
//       >
//         <Bell className="h-6 w-6" />
//       </motion.div>
//     </motion.div>
//   )
// }

// // Message time component
// const MessageTime = ({ time }: { time: Date }) => {
//   return (
//     <span className="text-xs text-gray-400">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
//   )
// }

// // Typing indicator component
// const TypingIndicator = () => {
//   return (
//     <div className="flex space-x-1 items-center p-2">
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.2 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.4 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//     </div>
//   )
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(true) // Start with loading true
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
//   const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
//   const [unreadSeparatorIndex, setUnreadSeparatorIndex] = useState<number | null>(null)
//   const [hasNewMessages, setHasNewMessages] = useState(false)
//   const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
//   const fetchAttemptsRef = useRef(0) // Track fetch attempts
//   const [soundEnabled, setSoundEnabled] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([])
//   const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "recent">("all")
//   const [showHelpModal, setShowHelpModal] = useState(false)
//   const [pinnedConversations, setPinnedConversations] = useState<Set<string>>(new Set())
//   const [starredConversations, setStarredConversations] = useState<Set<string>>(new Set())
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
//   const [isSearchFocused, setIsSearchFocused] = useState(false)
//   const searchInputRef = useRef<HTMLInputElement>(null)
//   const messageInputRef = useRef<HTMLTextAreaElement>(null)
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const lastMessageTimeRef = useRef<Record<string, number>>({})
//   const [readConversations, setReadConversations] = useState<Set<string>>(new Set())

//   // Load read conversations from localStorage on component mount
//   // Remove these lines:
//   // const savedReadConversations = localStorage.getItem("readConversations")
//   // if (savedReadConversations) {
//   //   try {
//   //     const parsedData = JSON.parse(savedReadConversations)
//   //     setReadConversations(new Set(parsedData))
//   //   } catch (e) {
//   //     console.error("Error parsing saved read conversations:", e)
//   //   }
//   // }

//   // And add this useEffect hook after the state declarations:
//   useEffect(() => {
//     // Only run on client-side
//     if (typeof window !== "undefined") {
//       try {
//         const savedReadConversations = localStorage.getItem("readConversations")
//         if (savedReadConversations) {
//           const parsedData = JSON.parse(savedReadConversations)
//           setReadConversations(new Set(parsedData))
//         }
//       } catch (e) {
//         console.error("Error loading read conversations from localStorage:", e)
//       }
//     }
//   }, [])

//   // Save read conversations to localStorage whenever it changes
//   // Also update the localStorage saving effect to include better error handling:
//   useEffect(() => {
//     if (typeof window !== "undefined" && readConversations.size > 0) {
//       try {
//         localStorage.setItem("readConversations", JSON.stringify(Array.from(readConversations)))
//       } catch (e) {
//         console.error("Error saving read conversations to localStorage:", e)
//       }
//     }
//   }, [readConversations])

//   // Initialize audio element
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Create a new audio element
//       const audio = new Audio("/message-notification.mp3")

//       // Preload the audio
//       audio.load()

//       // Store the audio element in the ref
//       audioRef.current = audio

//       // Add event listeners for debugging
//       audio.addEventListener("play", () => console.log("Audio started playing"))
//       audio.addEventListener("error", (e) => console.error("Audio error:", e))

//       // Clean up function
//       return () => {
//         if (audioRef.current) {
//           audioRef.current.pause()
//           audioRef.current = null
//         }
//       }
//     }
//   }, [])

//   // Play notification sound function
//   const playNotificationSound = useCallback(() => {
//     if (!soundEnabled || !audioRef.current) return

//     try {
//       // Reset the audio to the beginning
//       audioRef.current.currentTime = 0

//       // Play the sound
//       const playPromise = audioRef.current.play()

//       // Handle promise rejection (happens when browser prevents autoplay)
//       if (playPromise !== undefined) {
//         playPromise.catch((error) => {
//           console.error("Audio play failed:", error)
//           // Try again with user interaction
//           document.addEventListener(
//             "click",
//             function playOnClick() {
//               audioRef.current?.play().catch((e) => console.error("Play on click failed:", e))
//               document.removeEventListener("click", playOnClick)
//             },
//             { once: true },
//           )
//         })
//       }
//     } catch (e) {
//       console.error("Error playing sound:", e)
//     }
//   }, [soundEnabled])

//   const getAvatarUrl = () => {
//     return `https://source.unsplash.com/random/100x100?portrait&${Math.random()}`
//   }

//   // Filter conversations based on search query and active filter
//   useEffect(() => {
//     if (!conversations.length) {
//       setFilteredConversations([])
//       return
//     }

//     let filtered = [...conversations]

//     // Apply search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter((conv) => {
//         // Search in messages
//         const hasMatchingMessage = conv.messages.some((msg) => msg.content.toLowerCase().includes(query))

//         // Search in conversation ID or other properties
//         const matchesId = conv.id.toLowerCase().includes(query)

//         return hasMatchingMessage || matchesId
//       })
//     }

//     // Apply category filter
//     if (activeFilter === "unread") {
//       filtered = filtered.filter((conv) => conv.unreadCount > 0)
//     } else if (activeFilter === "recent") {
//       // Sort by most recent and take top 5
//       filtered = filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5)
//     }

//     // Sort pinned conversations to the top
//     filtered.sort((a, b) => {
//       if (pinnedConversations.has(a.id) && !pinnedConversations.has(b.id)) return -1
//       if (!pinnedConversations.has(a.id) && pinnedConversations.has(b.id)) return 1
//       return b.updatedAt.getTime() - a.updatedAt.getTime()
//     })

//     setFilteredConversations(filtered)
//   }, [conversations, searchQuery, activeFilter, pinnedConversations])

//   // Find the fetchChats function and modify the beginning part to prevent loading loops
//   const fetchChats = useCallback(
//     async (preserveReadStatus = false) => {
//       // Only set up timeout if we're not in a polling call
//       let fetchTimeout: NodeJS.Timeout | null = null;
//       if (!preserveReadStatus) {
//         fetchTimeout = setTimeout(() => {
//           setIsLoading(false)
//           setError("Request timed out. Please refresh the page.")
//         }, 15000) // 15 second timeout
//       }
      
//       if (!automationId) {
//         setError("Missing automation ID")
//         setIsLoading(false)
//         return
//       }

//       // Don't set error to null if we're preserving read status (polling)
//       // This prevents UI flicker during background polling
//       if (!preserveReadStatus) {
//         setError(null)
//       }

//       try {
//         // Increment fetch attempts
//         fetchAttemptsRef.current += 1

//         if (!preserveReadStatus) {
//           console.log(`Fetching chats for automation ID: ${automationId}, attempt: ${fetchAttemptsRef.current}`)
//         }

//         const result = await fetchChatsAndBusinessVariables(automationId)

//         // Reset fetch attempts on success
//         fetchAttemptsRef.current = 0

//         if (!result || typeof result !== "object") {
//           throw new Error("Invalid response from server")
//         }

//         const { conversations, token, businessVariables } = result as {
//           conversations: RawConversation[]
//           token: string
//           businessVariables: BusinessVariables
//         }

//         if (!Array.isArray(conversations)) {
//           throw new Error("Conversations data is not in the expected format")
//         }

//         // Map of existing conversations to preserve read status
//         const existingConversationsMap = new Map(
//           preserveReadStatus
//             ? conversations.map((conv) => [
//                 conv.chatId,
//                 conversations
//                   .find((c) => c.chatId === conv.chatId)
//                   ?.messages.map((m) => ({ id: m.id, read: m.read })) || [],
//               ])
//             : [],
//         )

//         const filteredConversations = conversations
//           .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//           .map((conv): Conversation => {
//             // Get existing message read statuses if preserving
//             const existingMessages = preserveReadStatus ? existingConversationsMap.get(conv.chatId) || [] : []

//             // Map messages and preserve read status for existing messages
//             const mappedMessages = conv.messages.map((msg): Message => {
//               const existingMsg = existingMessages.find((m) => m.id === msg.id)

//               // If this conversation was manually marked as read in localStorage, mark all messages as read
//               const isRead = readConversations.has(conv.chatId)
//                 ? true
//                 : existingMsg
//                   ? existingMsg.read
//                   : Boolean(msg.read)

//               return {
//                 id: msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//                 read: isRead,
//               }
//             })

//             return {
//               id: conv.chatId,
//               userId: conv.messages[0]?.senderId || conv.chatId,
//               pageId: conv.pageId,
//               messages: mappedMessages,
//               createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//               updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//               unreadCount: readConversations.has(conv.chatId) ? 0 : mappedMessages.filter((msg) => !msg.read).length,
//               Automation: null,
//             }
//           })

//         // Check for new messages
//         if (preserveReadStatus && conversations.length > 0) {
//           const currentConversationsMap = new Map(conversations.map((conv) => [conv.chatId, conv.messages.length]))

//           // Compare with previous state to detect new messages
//           let hasNew = false
//           let newMessageConversationId = null

//           setConversations((prevConvs) => {
//             prevConvs.forEach((prevConv) => {
//               const newMsgCount = currentConversationsMap.get(prevConv.id) || 0
//               const prevMsgCount = prevConv.messages.length

//               if (newMsgCount > prevMsgCount) {
//                 // Check if this is truly a new message (not just a refresh)
//                 const lastMessageTime = lastMessageTimeRef.current[prevConv.id] || 0
//                 const latestMessageTime = new Date(
//                   conversations.find((c) => c.chatId === prevConv.id)?.messages[newMsgCount - 1]?.createdAt || 0,
//                 ).getTime()

//                 // Only consider it new if the message timestamp is newer than what we've seen
//                 if (latestMessageTime > lastMessageTime) {
//                   hasNew = true
//                   newMessageConversationId = prevConv.id
//                   lastMessageTimeRef.current[prevConv.id] = latestMessageTime
//                 }
//               }
//             })
//             return prevConvs
//           })

//           if (hasNew) {
//             setHasNewMessages(true)

//             // Only play sound if we're not currently viewing the conversation with new messages
//             if (selectedConversation?.id !== newMessageConversationId) {
//               playNotificationSound()
//             }
//           }
//         }

//         filteredConversations.sort((a, b) => {
//           const lastMessageA = a.messages[a.messages.length - 1]
//           const lastMessageB = b.messages[b.messages.length - 1]
//           return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//         })

//         // Update conversations state without affecting the selected conversation
//         setConversations((prevConversations) => {
//           // If we're preserving read status and have a selected conversation,
//           // make sure we don't reset its read status
//           if (preserveReadStatus && selectedConversation) {
//             const updatedConversations = [...filteredConversations]
//             const selectedIndex = updatedConversations.findIndex((c) => c.id === selectedConversation.id)

//             if (selectedIndex !== -1) {
//               // Keep the messages as read for the selected conversation
//               updatedConversations[selectedIndex] = {
//                 ...updatedConversations[selectedIndex],
//                 messages: updatedConversations[selectedIndex].messages.map((m) => ({ ...m, read: true })),
//                 unreadCount: 0,
//               }
//             }

//             return updatedConversations
//           }

//           return filteredConversations
//         })

//         // Update unread chats set
//         setUnreadChats(new Set(filteredConversations.filter((conv) => conv.unreadCount > 0).map((conv) => conv.id)))
//         setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + conv.unreadCount, 0))

//         if (filteredConversations.length > 0 && !pageId) {
//           setPageId(filteredConversations[0].pageId)
//         }

//         if (token) {
//           setToken(token)
//         }

//         if (businessVariables) {
//           setBusinessVariables(businessVariables)
//         }

//         // Only update selected conversation if it exists in the new data
//         // and we're not in the middle of a conversation
//         if (selectedConversation) {
//           const updatedSelectedConv = filteredConversations.find((conv) => conv.id === selectedConversation.id)
//           if (updatedSelectedConv) {
//             // Preserve the read status of messages in the selected conversation
//             const updatedWithReadStatus = {
//               ...updatedSelectedConv,
//               messages: updatedSelectedConv.messages.map((msg) => ({
//                 ...msg,
//                 read: true,
//               })),
//               unreadCount: 0,
//             }

//             // Only update if there are new messages
//             if (updatedSelectedConv.messages.length > selectedConversation.messages.length) {
//               setSelectedConversation(updatedWithReadStatus)

//               // Update displayed messages with new messages
//               const newMessages = updatedSelectedConv.messages.slice(selectedConversation.messages.length)
//               setDisplayedMessages((prev) => [...prev, ...newMessages.map((msg) => ({ ...msg, read: true }))])

//               // Scroll to bottom when new messages arrive
//               setTimeout(() => {
//                 if (scrollRef.current) {
//                   scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//                 }
//               }, 100)
//             }
//           }
//         }

//         // Set loading to false after successful fetch
//         if (!preserveReadStatus) {
//           setIsLoading(false)
//         }
//       } catch (error) {
//         console.error("Error fetching chats:", error)

//         // Only show error after multiple attempts and not during background polling
//         if (!preserveReadStatus && fetchAttemptsRef.current > 3) {
//           setError(`Getting things ready... (Attempt ${fetchAttemptsRef.current})`)
//         }

//         // Exponential backoff for retries (max 10 seconds)
//         const retryDelay = Math.min(2000 * Math.pow(1.5, fetchAttemptsRef.current - 1), 10000)

//         // Retry after delay, but only if not using mock data
//         if (isLoading && fetchAttemptsRef.current > 3) {
//           console.log("Using mock data as fallback")
//           const mockConversations: Conversation[] = [
//             {
//               id: "mock_conv_1",
//               userId: "user123",
//               pageId: "page123",
//               messages: [
//                 {
//                   id: "msg1",
//                   role: "user",
//                   content: "Hi, I'm interested in your services",
//                   senderId: "user123",
//                   createdAt: new Date(Date.now() - 3600000),
//                   read: true,
//                 },
//                 {
//                   id: "msg2",
//                   role: "assistant",
//                   content: "Hello! Thank you for your interest. How can I help you today?",
//                   senderId: "bot",
//                   createdAt: new Date(Date.now() - 3500000),
//                   read: true,
//                 },
//               ],
//               createdAt: new Date(Date.now() - 3600000),
//               updatedAt: new Date(Date.now() - 3500000),
//               unreadCount: 0,
//               Automation: null,
//             },
//           ]
//           setConversations(mockConversations)
//           setFilteredConversations(mockConversations)
//           setIsLoading(false)
//           // Don't retry if we're using mock data
//           return;
//         }
        
//         // Only retry if not using mock data
//         setTimeout(() => {
//           fetchChats(preserveReadStatus)
//         }, retryDelay)
//       } finally {
//         if (fetchTimeout) {
//           clearTimeout(fetchTimeout)
//         }
//       }
//     },
//     [automationId, selectedConversation, playNotificationSound, pageId, readConversations, isLoading],
//   )

//   useEffect(() => {
//     // Initial fetch
//     fetchChats()

//     // Set up polling for real-time updates
//     pollingIntervalRef.current = setInterval(() => {
//       // Only poll if component is mounted and not in loading state
//       if (!isLoading) {
//         fetchChats(true) // preserve read status when polling
//       }
//     }, 5000) // Poll every 5 seconds

//     // Clean up interval on unmount
//     return () => {
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current)
//         pollingIntervalRef.current = null
//       }
//     }
//   }, [fetchChats, isLoading])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [displayedMessages])

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Don't trigger shortcuts when typing in input fields
//       if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
//         // Allow Escape key to close conversation even when in input
//         if (e.key === "Escape" && selectedConversation) {
//           e.preventDefault()
//           setSelectedConversation(null)
//           return
//         }

//         return
//       }

//       // Keyboard shortcuts
//       switch (e.key) {
//         case "n":
//         case "N":
//           // Focus message input if in conversation
//           if (selectedConversation && messageInputRef.current) {
//             e.preventDefault()
//             messageInputRef.current.focus()
//           }
//           break

//         case "k":
//           if (e.ctrlKey || e.metaKey) {
//             e.preventDefault()
//             searchInputRef.current?.focus()
//           }
//           break

//         case "Escape":
//           if (selectedConversation) {
//             e.preventDefault()
//             setSelectedConversation(null)
//           }
//           break

//         case "m":
//         case "M":
//           e.preventDefault()
//           setSoundEnabled((prev) => !prev)
//           break

//         case "a":
//         case "A":
//           if (e.shiftKey) {
//             e.preventDefault()
//             markAllAsRead()
//           }
//           break

//         case "?":
//           e.preventDefault()
//           setShowHelpModal(true)
//           break
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown)
//     return () => document.removeEventListener("keydown", handleKeyDown)
//   }, [selectedConversation])

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
//           read: true,
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.id === selectedConversation.id ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")

//         setDisplayedMessages((prev) => [...prev, userMessage])

//         // Scroll to the bottom after sending a message
//         if (scrollRef.current) {
//           scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//         }
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
//     setShowEmojiPicker(false)
//     messageInputRef.current?.focus()
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

//   const markAllAsRead = () => {
//     // Create a new set with all conversation IDs
//     const allConversationIds = new Set(conversations.map((conv) => conv.id))
//     setReadConversations(allConversationIds)

//     // Update conversations to mark all as read
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => ({
//         ...conv,
//         messages: conv.messages.map((msg) => ({ ...msg, read: true })),
//         unreadCount: 0,
//       })),
//     )

//     // Clear unread chats
//     setUnreadChats(new Set())
//     setTotalUnreadMessages(0)
//     setHasNewMessages(false)
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     // Add this conversation to the read conversations set
//     setReadConversations((prev) => {
//       const newSet = new Set(prev)
//       newSet.add(conversation.id)
//       return newSet
//     })

//     // Create a copy with all messages marked as read
//     const conversationWithReadMessages = {
//       ...conversation,
//       messages: conversation.messages.map((msg) => ({ ...msg, read: true })),
//       unreadCount: 0,
//     }

//     // Set the selected conversation first
//     setSelectedConversation(conversationWithReadMessages)

//     // Update unread chats
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })

//     // Update total unread count
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount ?? 0)))

//     // Set displayed messages
//     const lastMessages = conversation.messages.slice(-10)
//     setDisplayedMessages(lastMessages.map((msg) => ({ ...msg, read: true })))

//     // Find unread separator index
//     const unreadIndex = lastMessages.findIndex((msg) => !msg.read)
//     setUnreadSeparatorIndex(unreadIndex !== -1 ? unreadIndex : null)

//     // Update conversations with read messages
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? conversationWithReadMessages : conv)),
//     )

//     // Reset new message indicator when viewing the conversation
//     setHasNewMessages(false)

//     // Focus the message input
//     setTimeout(() => {
//       messageInputRef.current?.focus()
//     }, 100)
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }

//       // Remove from pinned/starred if needed
//       if (pinnedConversations.has(conversationToDelete.id)) {
//         setPinnedConversations((prev) => {
//           const newSet = new Set(prev)
//           newSet.delete(conversationToDelete.id)
//           return newSet
//         })
//       }

//       if (starredConversations.has(conversationToDelete.id)) {
//         setStarredConversations((prev) => {
//           const newSet = new Set(prev)
//           newSet.delete(conversationToDelete.id)
//           return newSet
//         })
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

//   const generateAiSuggestion = useCallback(() => {
//     const suggestions = [
//       "Would you like to know more about our products?",
//       "Can I assist you with anything specific today?",
//       "Have you checked out our latest offers?",
//       "Is there anything else I can help you with?",
//     ]
//     setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
//   }, [])

//   useEffect(() => {
//     if (selectedConversation && selectedConversation.messages.length > 0) {
//       const lastMessage = selectedConversation.messages[selectedConversation.messages.length - 1]
//       if (lastMessage && lastMessage.role === "user") {
//         generateAiSuggestion()
//       }
//     }
//   }, [selectedConversation, generateAiSuggestion])

//   const togglePinConversation = (conversationId: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setPinnedConversations((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(conversationId)) {
//         newSet.delete(conversationId)
//       } else {
//         newSet.add(conversationId)
//       }
//       return newSet
//     })
//   }

//   const toggleStarConversation = (conversationId: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setStarredConversations((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(conversationId)) {
//         newSet.delete(conversationId)
//       } else {
//         newSet.add(conversationId)
//       }
//       return newSet
//     })
//   }

//   const FancyErrorMessage: React.FC<{ message: string }> = ({ message }) => {
//     return (
//       <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         >
//           <Zap className="w-16 h-16 text-yellow-400 mb-4" />
//         </motion.div>
//         <h3 className="text-xl font-semibold mb-2">Hang tight!</h3>
//         <p className="text-muted-foreground mb-4">{message}</p>
//         <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
//           <Loader2 className="w-6 h-6 text-primary animate-spin" />
//         </motion.div>
//       </div>
//     )
//   }

//   const loadMoreMessages = useCallback(() => {
//     if (selectedConversation) {
//       const currentLength = displayedMessages.length
//       const newMessages = selectedConversation.messages.slice(
//         Math.max(0, selectedConversation.messages.length - currentLength - 10),
//         selectedConversation.messages.length - currentLength,
//       )
//       setDisplayedMessages((prevMessages) => [...newMessages, ...prevMessages])
//     }
//   }, [selectedConversation, displayedMessages])

//   useEffect(() => {
//     if (selectedConversation) {
//       const lastMessages = selectedConversation.messages.slice(-10)
//       setDisplayedMessages(lastMessages)
//     }
//   }, [selectedConversation])

//   useEffect(() => {
//     const scrollArea = scrollRef.current
//     if (!scrollArea) return

//     const handleScroll = () => {
//       if (scrollArea.scrollTop === 0) {
//         loadMoreMessages()
//       }
//     }

//     scrollArea.addEventListener("scroll", handleScroll)
//     return () => scrollArea.removeEventListener("scroll", handleScroll)
//   }, [loadMoreMessages])

//   useEffect(() => {
//     // Update document title with unread count
//     if (totalUnreadMessages > 0) {
//       document.title = `(${totalUnreadMessages}) New Messages`
//     } else {
//       document.title = "Chat Dashboard"
//     }

//     return () => {
//       document.title = "Chat Dashboard"
//     }
//   }, [totalUnreadMessages])

//   // Render conversation list item
//   const ConversationListItem = ({ conversation }: { conversation: Conversation }) => {
//     const isPinned = pinnedConversations.has(conversation.id)
//     const isStarred = starredConversations.has(conversation.id)
//     const isUnread = conversation.unreadCount > 0

//     return (
//       <motion.div
//         key={conversation.id}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.2 }}
//         className={cn(
//           "p-4 bg-background rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 relative",
//           isPinned && "border-l-4 border-blue-500",
//           isUnread && "bg-background/90 border-l-4 border-red-500",
//         )}
//         onClick={() => handleSelectConversation(conversation)}
//       >
//         <div className="flex items-start space-x-3">
//           <Avatar className="w-12 h-12 relative border-2 border-primary flex-shrink-0">
//             <AvatarImage src={getAvatarUrl()} />
//             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//             {isUnread && (
//               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//             )}
//           </Avatar>

//           <div className="flex-grow overflow-hidden">
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center">
//                 <p className={cn("font-medium text-sm text-foreground", isUnread && "font-bold")}>
//                   {getFancyName(conversation.id)}
//                 </p>
//                 {isPinned && (
//                   <Badge variant="outline" className="ml-2 px-1">
//                     <Pin className="h-3 w-3 text-blue-500" />
//                   </Badge>
//                 )}
//                 {isStarred && (
//                   <Badge variant="outline" className="ml-2 px-1">
//                     <Star className="h-3 w-3 text-yellow-500" />
//                   </Badge>
//                 )}
//               </div>
//               <span className="text-xs text-muted-foreground">
//                 {new Date(conversation.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//               </span>
//             </div>

//             <p className="text-xs text-muted-foreground flex items-center mb-1">
//               {getActivityStatus(conversation.updatedAt)}
//               {getActivityStatus(conversation.updatedAt) === "Active now" && <ActiveNowIndicator />}
//             </p>

//             <p className={cn("text-sm text-muted-foreground truncate", isUnread && "text-foreground font-medium")}>
//               {conversation.messages.length > 0
//                 ? conversation.messages[conversation.messages.length - 1].content
//                 : "No messages"}
//             </p>

//             <div className="flex justify-between items-center mt-2">
//               <div className="flex space-x-1">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => togglePinConversation(conversation.id, e)}
//                 >
//                   <Pin className={cn("h-4 w-4", isPinned ? "text-blue-500 fill-blue-500" : "text-muted-foreground")} />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => toggleStarConversation(conversation.id, e)}
//                 >
//                   <Star
//                     className={cn("h-4 w-4", isStarred ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground")}
//                   />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleDeleteConversation(conversation)
//                   }}
//                 >
//                   <Trash2 size={16} className="text-muted-foreground hover:text-red-500" />
//                 </Button>
//               </div>

//               {isUnread && (
//                 <Badge variant="destructive" className="text-xs">
//                   {conversation.unreadCount}
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     )
//   }

//   // Update the main component's return statement to include the new unread chats section
//   // Replace the existing return statement with this improved version
//   return (
//     <>
//       {/* Add audio element for notification sound */}
//       <audio id="notification-sound" src="/message-notification.mp3" preload="auto" />

//       <NotificationIndicator
//         show={hasNewMessages && !selectedConversation}
//         onClick={() => {
//           // Find the first unread conversation and open it
//           const firstUnread = conversations.find((conv) => conv.unreadCount > 0)
//           if (firstUnread) {
//             handleSelectConversation(firstUnread)
//           }
//         }}
//       />

//       <AnimatePresence>
//         {showHelpModal && <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />}
//       </AnimatePresence>

//       <ShimmeringBorder>
//         <div
//           className={`flex flex-col ${fancyBackground} text-foreground rounded-lg overflow-hidden h-full max-h-[90vh] sm:max-h-[80vh]`}
//         >
//           {isLoading ? (
//             <FancyLoader />
//           ) : error ? (
//             <FancyErrorMessage message={error} />
//           ) : (
//             <>
//               {selectedConversation ? (
//                 <>
//                   <div className="p-2 sm:p-4 bg-background border-b border-primary/10 flex items-center">
//                     <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                       <ArrowLeft size={20} />
//                     </Button>
//                     <Avatar className="w-10 h-10">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                       <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-3 flex-grow">
//                       <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                       {selectedConversation && selectedConversation.messages.length > 0 && (
//                         <p className="text-sm text-muted-foreground flex items-center">
//                           {getActivityStatus(
//                             new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                           )}
//                           {getActivityStatus(
//                             new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                           ) === "Active now" && <ActiveNowIndicator />}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Phone className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Call</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Video className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Video call</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Info className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Info</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                   <ScrollArea className="flex-grow h-[calc(100vh-300px)] overflow-hidden">
//                     <div className="p-4 space-y-4" ref={scrollRef}>
//                       {displayedMessages.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64 text-center">
//                           <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                           <h3 className="text-lg font-medium mb-2">No messages yet</h3>
//                           <p className="text-muted-foreground max-w-md">
//                             Start the conversation by sending a message below.
//                           </p>
//                         </div>
//                       ) : (
//                         <>
//                           {displayedMessages.map((message, index) => (
//                             <React.Fragment key={`msg-fragment-${message.id}-${index}`}>
//                               {index === unreadSeparatorIndex && (
//                                 <div className="flex items-center my-2">
//                                   <div className="flex-grow border-t border-gray-600"></div>
//                                   <span className="mx-4 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
//                                     Unread messages
//                                   </span>
//                                   <div className="flex-grow border-t border-gray-600"></div>
//                                 </div>
//                               )}

//                               {/* Show date separator if needed */}
//                               {index > 0 &&
//                                 new Date(message.createdAt).toDateString() !==
//                                   new Date(displayedMessages[index - 1].createdAt).toDateString() && (
//                                   <div className="flex justify-center my-4">
//                                     <Badge variant="outline" className="bg-background/50 px-3 py-1">
//                                       {new Date(message.createdAt).toLocaleDateString(undefined, {
//                                         weekday: "long",
//                                         month: "short",
//                                         day: "numeric",
//                                       })}
//                                     </Badge>
//                                   </div>
//                                 )}

//                               <motion.div
//                                 key={`msg-${message.id}-${index}`}
//                                 initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                                 className={`flex items-end mb-4 group ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                               >
//                                 {message.role === "assistant" ? (
//                                   <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                                     <AvatarImage src={BOT_AVATAR} />
//                                     <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                                   </Avatar>
//                                 ) : (
//                                   <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                                     <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                                     <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                                   </Avatar>
//                                 )}
//                                 <div
//                                   className={cn(
//                                     "max-w-[85%] sm:max-w-[75%] p-2 sm:p-3 rounded-3xl text-sm relative",
//                                     message.role === "assistant"
//                                       ? "bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 text-white"
//                                       : "bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-2 border-purple-500/50 text-white",
//                                   )}
//                                   style={{
//                                     backdropFilter: "blur(10px)",
//                                     WebkitBackdropFilter: "blur(10px)",
//                                   }}
//                                 >
//                                   <p className="break-words relative z-10">{message.content}</p>
//                                   <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
//                                     <MessageTime time={new Date(message.createdAt)} />
//                                     {message.role === "assistant" && (
//                                       <div
//                                         className={`flex items-center ${
//                                           message.status === "sent" ? "text-green-400" : "text-green-400"
//                                         }`}
//                                       >
//                                         {message.status === "sent" || true ? (
//                                           <>
//                                             <Check size={12} className="mr-1" />
//                                             <span>Sent</span>
//                                           </>
//                                         ) : (
//                                           <span>Failed</span>
//                                         )}
//                                       </div>
//                                     )}
//                                   </div>
//                                   <div
//                                     className={cn(
//                                       "absolute inset-0 rounded-3xl opacity-20",
//                                       message.role === "assistant"
//                                         ? "bg-gradient-to-br from-blue-400 to-blue-600"
//                                         : "bg-gradient-to-br from-purple-400 to-purple-600",
//                                     )}
//                                   ></div>

//                                   {/* Message actions on hover */}
//                                   <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-8 bg-background rounded-full shadow-md p-1 flex space-x-1">
//                                     <TooltipProvider>
//                                       <Tooltip>
//                                         <TooltipTrigger asChild>
//                                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                                             <MoreHorizontal className="h-4 w-4" />
//                                           </Button>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                           <p>More options</p>
//                                         </TooltipContent>
//                                       </Tooltip>
//                                     </TooltipProvider>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             </React.Fragment>
//                           ))}

//                           {/* Typing indicator */}
//                           {isTyping && (
//                             <div className="flex items-start">
//                               <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                                 <AvatarImage src={BOT_AVATAR} />
//                                 <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                               </Avatar>
//                               <div className="bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 rounded-3xl p-3">
//                                 <TypingIndicator />
//                               </div>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </ScrollArea>
//                   <div className="p-2 sm:p-4 bg-background border-t border-primary/10">
//                     <div className="flex space-x-2 mb-2 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
//                       {[
//                         "Hello!",
//                         "Torever",
//                         "Hi there",
//                         "Awesome",
//                         "How can I help?",
//                         "Thank you!",
//                         "I'll get back to you soon.",
//                         "You are welcome",
//                       ].map((response, index) => (
//                         <motion.button
//                           key={index}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
//                           onClick={() => setNewMessage(response)}
//                         >
//                           {response}
//                         </motion.button>
//                       ))}
//                     </div>
//                     {isTyping && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="flex items-center space-x-2 p-2 bg-muted rounded-lg mb-2"
//                       >
//                         <span className="text-sm text-muted-foreground">AiAssist is typing</span>
//                         <motion.div
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             transition: { repeat: Number.POSITIVE_INFINITY, duration: 1 },
//                           }}
//                         >
//                           <Sparkles className="h-4 w-4 text-primary" />
//                         </motion.div>
//                       </motion.div>
//                     )}
//                     <div className="flex items-center space-x-2 relative">
//                       <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
//                         <PopoverTrigger asChild>
//                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                             <Smile className="h-5 w-5" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                           <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                         </PopoverContent>
//                       </Popover>
//                       <div className="flex-grow relative">
//                         <Textarea
//                           ref={messageInputRef}
//                           placeholder="Type here..."
//                           value={newMessage}
//                           onChange={(e) => setNewMessage(e.target.value)}
//                           onKeyPress={(e) => {
//                             if (e.key === "Enter" && !e.shiftKey) {
//                               e.preventDefault()
//                               handleSendMessage()
//                             }
//                           }}
//                           className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden w-full"
//                           style={{ height: "36px", transition: "height 0.1s ease" }}
//                           onInput={(e) => {
//                             const target = e.target as HTMLTextAreaElement
//                             target.style.height = "36px"
//                             target.style.height = `${Math.min(target.scrollHeight, 96)}px`
//                           }}
//                         />
//                       </div>
//                       <div className="flex space-x-1">
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={handleSendMessage}
//                                 className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center"
//                               >
//                                 <Send className="h-5 w-5" />
//                               </motion.button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Send Message</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                                 onClick={handleVoiceMessage}
//                               >
//                                 <Mic className="h-5 w-5" />
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Record voice message</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <label htmlFor="file-upload">
//                                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                                   <Paperclip className="h-5 w-5" />
//                                 </Button>
//                               </label>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Attach file</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                       <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                     </div>
//                     {aiSuggestion && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="mt-2 p-2 bg-blue-500/20 rounded-lg flex items-center space-x-2"
//                       >
//                         <Zap className="h-4 w-4 text-blue-500" />
//                         <p className="text-sm text-blue-500">{aiSuggestion}</p>
//                         <button
//                           className="text-xs text-blue-700 hover:underline"
//                           onClick={() => setNewMessage(aiSuggestion)}
//                         >
//                           Use
//                         </button>
//                       </motion.div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="p-4 bg-background border-b border-primary/10">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold flex items-center">
//                         <span>Recent Chats</span>
//                         {hasNewMessages && (
//                           <motion.div
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//                             className="ml-2 w-2 h-2 bg-green-500 rounded-full"
//                           />
//                         )}
//                         {totalUnreadMessages > 0 && (
//                           <Badge variant="destructive" className="ml-2">
//                             {totalUnreadMessages}
//                           </Badge>
//                         )}
//                       </h3>

//                       <div className="flex items-center space-x-2">
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="rounded-full"
//                                 onClick={() => setSoundEnabled(!soundEnabled)}
//                               >
//                                 {soundEnabled ? (
//                                   <Bell className="h-5 w-5 text-primary" />
//                                 ) : (
//                                   <BellOff className="h-5 w-5 text-muted-foreground" />
//                                 )}
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>{soundEnabled ? "Mute notifications" : "Unmute notifications"}</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button variant="ghost" size="icon" className="rounded-full" onClick={markAllAsRead}>
//                                 <Check className="h-5 w-5 text-muted-foreground" />
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Mark all as read</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="rounded-full"
//                                 onClick={() => setShowHelpModal(true)}
//                               >
//                                 <span className="text-sm font-semibold">?</span>
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Help</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                     </div>

//                     <div className="relative mb-4">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         ref={searchInputRef}
//                         placeholder="Search conversations..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onFocus={() => setIsSearchFocused(true)}
//                         onBlur={() => setIsSearchFocused(false)}
//                         className={cn(
//                           "pl-10 pr-10 py-2 bg-muted border-primary/20",
//                           isSearchFocused && "ring-2 ring-primary/50",
//                         )}
//                       />
//                       {searchQuery && (
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full"
//                           onClick={() => setSearchQuery("")}
//                         >
//                           <X className="h-4 w-4 text-muted-foreground" />
//                         </Button>
//                       )}

//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
//                         <KeyboardShortcut keys={["Ctrl", "K"]} />
//                       </div>
//                     </div>

//                     <Tabs
//                       defaultValue="all"
//                       className="w-full"
//                       onValueChange={(value) => setActiveFilter(value as any)}
//                     >
//                       <TabsList className="grid grid-cols-3 mb-4">
//                         <TabsTrigger value="all" className="text-xs">
//                           All Chats
//                         </TabsTrigger>
//                         <TabsTrigger value="unread" className="text-xs">
//                           Unread
//                           {totalUnreadMessages > 0 && (
//                             <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1">
//                               {totalUnreadMessages}
//                             </Badge>
//                           )}
//                         </TabsTrigger>
//                         <TabsTrigger value="recent" className="text-xs">
//                           Recent
//                         </TabsTrigger>
//                       </TabsList>
//                     </Tabs>
//                   </div>

//                   <ScrollArea className="flex-grow">
//                     <div className="flex flex-col p-4 space-y-4">
//                       {!token ? (
//                         <div className="w-full p-4 bg-background rounded-lg shadow-md">
//                           <ExampleConversations onSelectConversation={handleSelectConversation} className="mb-4" />
//                           <div className="text-center">
//                             <p className="text-muted-foreground mb-4 text-sm sm:text-base">
//                               Connect your Instagram account to start receiving real messages.
//                             </p>
//                             <Button
//                               onClick={() => {
//                                 console.log("Navigate to integration page")
//                               }}
//                               className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full"
//                             >
//                               Connect Instagram
//                             </Button>
//                           </div>
//                         </div>
//                       ) : filteredConversations.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64 text-center">
//                           {searchQuery ? (
//                             <>
//                               <Search className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                               <h3 className="text-lg font-medium mb-2">No results found</h3>
//                               <p className="text-muted-foreground max-w-md">
//                                 We couldnt find any conversations matching {searchQuery}.
//                               </p>
//                               <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
//                                 Clear search
//                               </Button>
//                             </>
//                           ) : (
//                             <>
//                               <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                               <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
//                               <p className="text-muted-foreground max-w-md">
//                                 Connect your account to start receiving messages.
//                               </p>
//                               <ExampleConversations onSelectConversation={handleSelectConversation} className="mt-6" />
//                             </>
//                           )}
//                         </div>
//                       ) : (
//                         <>
//                           {/* Unread chats section */}
//                           <UnreadChatsList
//                             conversations={conversations}
//                             onSelectConversation={handleSelectConversation}
//                           />

//                           {/* All chats section */}
//                           <div className="space-y-3">
//                             <div className="flex items-center justify-between">
//                               <h4 className="text-sm font-semibold">
//                                 {activeFilter === "all"
//                                   ? "All Conversations"
//                                   : activeFilter === "unread"
//                                     ? "Unread Conversations"
//                                     : "Recent Conversations"}
//                               </h4>
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                   <Button variant="ghost" size="sm" className="h-8 px-2">
//                                     <Filter className="h-4 w-4 mr-1" />
//                                     <span className="text-xs">Sort</span>
//                                   </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                   <DropdownMenuItem>Newest first</DropdownMenuItem>
//                                   <DropdownMenuItem>Oldest first</DropdownMenuItem>
//                                   <DropdownMenuItem>Unread first</DropdownMenuItem>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             </div>

//                             <div className="grid grid-cols-1 gap-3">
//                               {filteredConversations.map((conversation) => (
//                                 <ConversationListItem key={conversation.id} conversation={conversation} />
//                               ))}
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </ScrollArea>
//                 </>
//               )}
//             </>
//           )}
//           <DeleteConfirmationModal
//             isOpen={isDeleteModalOpen}
//             onClose={() => setIsDeleteModalOpen(false)}
//             onConfirm={confirmDelete}
//           />
//         </div>
//       </ShimmeringBorder>
//     </>
//   )
// }

// export default AutomationChats

// "use client"

// import React from "react"
// import { useEffect, useState, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useSpring, animated } from "react-spring"
// import {
//   Send,
//   ArrowLeft,
//   Smile,
//   Paperclip,
//   Mic,
//   Trash2,
//   Check,
//   Sparkles,
//   Zap,
//   Loader2,
//   Search,
//   X,
//   Bell,
//   BellOff,
//   Filter,
//   MessageSquare,
//   Pin,
//   Star,
//   MoreHorizontal,
//   Phone,
//   Video,
//   Info,
//   Wifi,
// } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
//     read?: boolean
//   }>
// }

// const BOT_NAME = "AiAssist"
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

// // Keyboard shortcuts helper
// const KeyboardShortcut = ({ keys }: { keys: string[] }) => (
//   <div className="flex items-center space-x-1">
//     {keys.map((key, index) => (
//       <React.Fragment key={index}>
//         <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
//           {key}
//         </kbd>
//         {index < keys.length - 1 && <span className="text-gray-500">+</span>}
//       </React.Fragment>
//     ))}
//   </div>
// )

// // Help modal component
// const HelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   if (!isOpen) return null

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center justify-between">
//               <span>New message</span>
//               <KeyboardShortcut keys={["N"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Search conversations</span>
//               <KeyboardShortcut keys={["Ctrl", "K"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Send message</span>
//               <KeyboardShortcut keys={["Enter"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>New line in message</span>
//               <KeyboardShortcut keys={["Shift", "Enter"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Close conversation</span>
//               <KeyboardShortcut keys={["Esc"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Toggle sound</span>
//               <KeyboardShortcut keys={["M"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Mark all as read</span>
//               <KeyboardShortcut keys={["Shift", "A"]} />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Help</span>
//               <KeyboardShortcut keys={["?"]} />
//             </div>
//           </div>

//           <div className="mt-6 pt-4 border-t">
//             <h3 className="font-semibold mb-2">Tips</h3>
//             <ul className="list-disc pl-5 space-y-2 text-sm">
//               <li>Click on a conversation to open it</li>
//               <li>Unread messages are highlighted with a red indicator</li>
//               <li>Use quick replies for common responses</li>
//               <li>Hover over messages to see the timestamp</li>
//               <li>Use the search bar to find specific conversations</li>
//             </ul>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

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

// // Add a dedicated UnreadChatsList component to better organize and display unread chats
// const UnreadChatsList = ({
//   conversations,
//   onSelectConversation,
// }: {
//   conversations: Conversation[]
//   onSelectConversation: (arg0: Conversation) => void
// }) => {
//   const unreadConversations = conversations.filter((conv) => conv.unreadCount > 0)

//   if (unreadConversations.length === 0) {
//     return null
//   }

//   return (
//     <div className="mb-6">
//       <h4 className="text-sm font-semibold mb-3 flex items-center">
//         <span className="relative flex h-3 w-3 mr-2">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//         </span>
//         Unread Messages ({unreadConversations.length})
//       </h4>
//       <div className="space-y-2">
//         {unreadConversations.map((conversation) => (
//           <motion.div
//             key={`unread-${conversation.id}`}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.2 }}
//             className="p-3 bg-background/80 border-l-4 border-red-500 rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 flex items-center"
//             onClick={() => onSelectConversation(conversation)}
//           >
//             <Avatar className="w-10 h-10 relative border-2 border-primary">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.id}`} />
//               <AvatarFallback>{conversation.id.slice(0, 2).toUpperCase()}</AvatarFallback>
//               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//             </Avatar>
//             <div className="ml-3 overflow-hidden flex-grow">
//               <p className="font-medium text-sm text-foreground truncate">Client</p>
//               <p className="text-xs text-muted-foreground truncate">
//                 {conversation.messages.length > 0
//                   ? conversation.messages[conversation.messages.length - 1].content
//                   : "No messages"}
//               </p>
//             </div>
//             <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
//               {conversation.unreadCount}
//             </span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // Add a visual notification indicator component
// const NotificationIndicator = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
//   if (!show) return null

//   return (
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: [1, 1.2, 1] }}
//       transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//       className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50 cursor-pointer"
//       onClick={onClick}
//     >
//       <motion.div
//         animate={{ rotate: [0, 15, -15, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, repeatDelay: 2 }}
//       >
//         <Bell className="h-6 w-6" />
//       </motion.div>
//     </motion.div>
//   )
// }

// // Offline notification component
// const OfflineNotification = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="fixed top-0 left-0 right-0 bg-yellow-600 text-white p-2 z-50 flex items-center justify-center"
//     >
//       <div className="flex items-center space-x-2">
//         <Wifi className="h-4 w-4" />
//         <p className="text-sm font-medium">You are currently offline. Some features may be limited.</p>
//         <Button
//           variant="outline"
//           size="sm"
//           className="ml-2 h-7 text-xs bg-yellow-700 hover:bg-yellow-800 border-yellow-500"
//           onClick={() => window.location.reload()}
//         >
//           Try reconnecting
//         </Button>
//       </div>
//     </motion.div>
//   )
// }

// // Message time component
// const MessageTime = ({ time }: { time: Date }) => {
//   return (
//     <span className="text-xs text-gray-400">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
//   )
// }

// // Typing indicator component
// const TypingIndicator = () => {
//   return (
//     <div className="flex space-x-1 items-center p-2">
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.2 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, -5, 0] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.4 }}
//         className="w-2 h-2 bg-primary rounded-full"
//       />
//     </div>
//   )
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(true) // Start with loading true
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
//   const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
//   const [unreadSeparatorIndex, setUnreadSeparatorIndex] = useState<number | null>(null)
//   const [hasNewMessages, setHasNewMessages] = useState(false)
//   const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
//   const fetchAttemptsRef = useRef(0) // Track fetch attempts
//   const [soundEnabled, setSoundEnabled] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([])
//   const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "recent">("all")
//   const [showHelpModal, setShowHelpModal] = useState(false)
//   const [pinnedConversations, setPinnedConversations] = useState<Set<string>>(new Set())
//   const [starredConversations, setStarredConversations] = useState<Set<string>>(new Set())
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
//   const [isSearchFocused, setIsSearchFocused] = useState(false)
//   const searchInputRef = useRef<HTMLInputElement>(null)
//   const messageInputRef = useRef<HTMLTextAreaElement>(null)
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const lastMessageTimeRef = useRef<Record<string, number>>({})
//   const [readConversations, setReadConversations] = useState<Set<string>>(new Set())
//   const [isOnline, setIsOnline] = useState(true)

//   // Load read conversations from localStorage on component mount
//   // Remove these lines:
//   // const savedReadConversations = localStorage.getItem("readConversations")
//   // if (savedReadConversations) {
//   //   try {
//   //     const parsedData = JSON.parse(savedReadConversations)
//   //     setReadConversations(new Set(parsedData))
//   //   } catch (e) {
//   //     console.error("Error parsing saved read conversations:", e)
//   //   }
//   // }

//   // And add this useEffect hook after the state declarations:
//   useEffect(() => {
//     // Only run on client-side
//     if (typeof window !== "undefined") {
//       try {
//         const savedReadConversations = localStorage.getItem("readConversations")
//         if (savedReadConversations) {
//           const parsedData = JSON.parse(savedReadConversations)
//           setReadConversations(new Set(parsedData))
//         }
//       } catch (e) {
//         console.error("Error loading read conversations from localStorage:", e)
//       }
//     }
//   }, [])

//   // Save read conversations to localStorage whenever it changes
//   // Also update the localStorage saving effect to include better error handling:
//   useEffect(() => {
//     if (typeof window !== "undefined" && readConversations.size > 0) {
//       try {
//         localStorage.setItem("readConversations", JSON.stringify(Array.from(readConversations)))
//       } catch (e) {
//         console.error("Error saving read conversations to localStorage:", e)
//       }
//     }
//   }, [readConversations])

//   // Monitor network status
//   useEffect(() => {
//     // Set initial online status
//     setIsOnline(navigator.onLine)

//     // Create event handlers
//     const handleOnline = () => {
//       console.log("Network connection restored")
//       setIsOnline(true)
//       // We'll trigger a fetch in the dependency effect instead of directly here
//     }

//     const handleOffline = () => {
//       console.log("Network connection lost")
//       setIsOnline(false)
//     }

//     // Add event listeners
//     window.addEventListener("online", handleOnline)
//     window.addEventListener("offline", handleOffline)

//     // Clean up
//     return () => {
//       window.removeEventListener("online", handleOnline)
//       window.removeEventListener("offline", handleOffline)
//     }
//   }, [])

//   // Add a separate effect to handle reconnection when online status changes
//   useEffect(() => {
//     if (isOnline && !isLoading) {
//       // Attempt to fetch chats when coming back online
//       const reconnect = async () => {
//         console.log("Reconnecting after network status change")
//         try {
//           // Reset any error states
//           setError(null)
//           // Fetch with preserveReadStatus=false to do a full refresh
//           await fetchChats()
//         } catch (err) {
//           console.error("Reconnection failed:", err)
//         }
//       }

//       reconnect()
//     }
//   }, [isOnline, isLoading])

//   // Initialize audio element
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Create a new audio element
//       const audio = new Audio("/message-notification.mp3")

//       // Preload the audio
//       audio.load()

//       // Store the audio element in the ref
//       audioRef.current = audio

//       // Add event listeners for debugging
//       audio.addEventListener("play", () => console.log("Audio started playing"))
//       audio.addEventListener("error", (e) => console.error("Audio error:", e))

//       // Clean up function
//       return () => {
//         if (audioRef.current) {
//           audioRef.current.pause()
//           audioRef.current = null
//         }
//       }
//     }
//   }, [])

//   // Play notification sound function
//   const playNotificationSound = useCallback(() => {
//     if (!soundEnabled || !audioRef.current) return

//     try {
//       // Reset the audio to the beginning
//       audioRef.current.currentTime = 0

//       // Play the sound
//       const playPromise = audioRef.current.play()

//       // Handle promise rejection (happens when browser prevents autoplay)
//       if (playPromise !== undefined) {
//         playPromise.catch((error) => {
//           console.error("Audio play failed:", error)
//           // Try again with user interaction
//           document.addEventListener(
//             "click",
//             function playOnClick() {
//               audioRef.current?.play().catch((e) => console.error("Play on click failed:", e))
//               document.removeEventListener("click", playOnClick)
//             },
//             { once: true },
//           )
//         })
//       }
//     } catch (e) {
//       console.error("Error playing sound:", e)
//     }
//   }, [soundEnabled])

//   const getAvatarUrl = () => {
//     return `https://source.unsplash.com/random/100x100?portrait&${Math.random()}`
//   }

//   // Filter conversations based on search query and active filter
//   useEffect(() => {
//     if (!conversations.length) {
//       setFilteredConversations([])
//       return
//     }

//     let filtered = [...conversations]

//     // Apply search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter((conv) => {
//         // Search in messages
//         const hasMatchingMessage = conv.messages.some((msg) => msg.content.toLowerCase().includes(query))

//         // Search in conversation ID or other properties
//         const matchesId = conv.id.toLowerCase().includes(query)

//         return hasMatchingMessage || matchesId
//       })
//     }

//     // Apply category filter
//     if (activeFilter === "unread") {
//       filtered = filtered.filter((conv) => conv.unreadCount > 0)
//     } else if (activeFilter === "recent") {
//       // Sort by most recent and take top 5
//       filtered = filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5)
//     }

//     // Sort pinned conversations to the top
//     filtered.sort((a, b) => {
//       if (pinnedConversations.has(a.id) && !pinnedConversations.has(b.id)) return -1
//       if (!pinnedConversations.has(a.id) && pinnedConversations.has(b.id)) return 1
//       return b.updatedAt.getTime() - a.updatedAt.getTime()
//     })

//     setFilteredConversations(filtered)
//   }, [conversations, searchQuery, activeFilter, pinnedConversations])

//   // Find the fetchChats function and modify the beginning part to prevent loading loops
//   const fetchChats = useCallback(
//     async (preserveReadStatus = false) => {
//       // Check if we're offline
//       if (!navigator.onLine) {
//         console.log("Offline: skipping fetch")
//         if (!preserveReadStatus) {
//           setIsLoading(false)
//         }
//         return
//       }

//       // Only set up timeout if we're not in a polling call
//       let fetchTimeout: NodeJS.Timeout | null = null
//       if (!preserveReadStatus) {
//         fetchTimeout = setTimeout(() => {
//           setIsLoading(false)
//           setError("Request timed out. Please refresh the page.")
//         }, 15000) // 15 second timeout
//       }

//       if (!automationId) {
//         setError("Missing automation ID")
//         setIsLoading(false)
//         return
//       }

//       // Don't set error to null if we're preserving read status (polling)
//       // This prevents UI flicker during background polling
//       if (!preserveReadStatus) {
//         setError(null)
//       }

//       try {
//         // Increment fetch attempts
//         fetchAttemptsRef.current += 1

//         if (!preserveReadStatus) {
//           console.log(`Fetching chats for automation ID: ${automationId}, attempt: ${fetchAttemptsRef.current}`)
//         }

//         const result = await fetchChatsAndBusinessVariables(automationId)

//         // Reset fetch attempts on success
//         fetchAttemptsRef.current = 0

//         if (!result || typeof result !== "object") {
//           throw new Error("Invalid response from server")
//         }

//         const { conversations, token, businessVariables } = result as {
//           conversations: RawConversation[]
//           token: string
//           businessVariables: BusinessVariables
//         }

//         if (!Array.isArray(conversations)) {
//           throw new Error("Conversations data is not in the expected format")
//         }

//         // Map of existing conversations to preserve read status
//         const existingConversationsMap = new Map(
//           preserveReadStatus
//             ? conversations.map((conv) => [
//                 conv.chatId,
//                 conversations
//                   .find((c) => c.chatId === conv.chatId)
//                   ?.messages.map((m) => ({ id: m.id, read: m.read })) || [],
//               ])
//             : [],
//         )

//         const filteredConversations = conversations
//           .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//           .map((conv): Conversation => {
//             // Get existing message read statuses if preserving
//             const existingMessages = preserveReadStatus ? existingConversationsMap.get(conv.chatId) || [] : []

//             // Map messages and preserve read status for existing messages
//             const mappedMessages = conv.messages.map((msg): Message => {
//               const existingMsg = existingMessages.find((m) => m.id === msg.id)

//               // If this conversation was manually marked as read in localStorage, mark all messages as read
//               const isRead = readConversations.has(conv.chatId)
//                 ? true
//                 : existingMsg
//                   ? existingMsg.read
//                   : Boolean(msg.read)

//               return {
//                 id: msg.id,
//                 role: msg.role,
//                 content: msg.content,
//                 senderId: msg.senderId,
//                 createdAt: new Date(msg.createdAt),
//                 read: isRead,
//               }
//             })

//             return {
//               id: conv.chatId,
//               userId: conv.messages[0]?.senderId || conv.chatId,
//               pageId: conv.pageId,
//               messages: mappedMessages,
//               createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
//               updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
//               unreadCount: readConversations.has(conv.chatId) ? 0 : mappedMessages.filter((msg) => !msg.read).length,
//               Automation: null,
//             }
//           })

//         // Check for new messages
//         if (preserveReadStatus && conversations.length > 0) {
//           const currentConversationsMap = new Map(conversations.map((conv) => [conv.chatId, conv.messages.length]))

//           // Compare with previous state to detect new messages
//           let hasNew = false
//           let newMessageConversationId = null

//           setConversations((prevConvs) => {
//             prevConvs.forEach((prevConv) => {
//               const newMsgCount = currentConversationsMap.get(prevConv.id) || 0
//               const prevMsgCount = prevConv.messages.length

//               if (newMsgCount > prevMsgCount) {
//                 // Check if this is truly a new message (not just a refresh)
//                 const lastMessageTime = lastMessageTimeRef.current[prevConv.id] || 0
//                 const latestMessageTime = new Date(
//                   conversations.find((c) => c.chatId === prevConv.id)?.messages[newMsgCount - 1]?.createdAt || 0,
//                 ).getTime()

//                 // Only consider it new if the message timestamp is newer than what we've seen
//                 if (latestMessageTime > lastMessageTime) {
//                   hasNew = true
//                   newMessageConversationId = prevConv.id
//                   lastMessageTimeRef.current[prevConv.id] = latestMessageTime
//                 }
//               }
//             })
//             return prevConvs
//           })

//           if (hasNew) {
//             setHasNewMessages(true)

//             // Only play sound if we're not currently viewing the conversation with new messages
//             if (selectedConversation?.id !== newMessageConversationId) {
//               playNotificationSound()
//             }
//           }
//         }

//         filteredConversations.sort((a, b) => {
//           const lastMessageA = a.messages[a.messages.length - 1]
//           const lastMessageB = b.messages[b.messages.length - 1]
//           return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//         })

//         // Update conversations state without affecting the selected conversation
//         setConversations((prevConversations) => {
//           // If we're preserving read status and have a selected conversation,
//           // make sure we don't reset its read status
//           if (preserveReadStatus && selectedConversation) {
//             const updatedConversations = [...filteredConversations]
//             const selectedIndex = updatedConversations.findIndex((c) => c.id === selectedConversation.id)

//             if (selectedIndex !== -1) {
//               // Keep the messages as read for the selected conversation
//               updatedConversations[selectedIndex] = {
//                 ...updatedConversations[selectedIndex],
//                 messages: updatedConversations[selectedIndex].messages.map((m) => ({ ...m, read: true })),
//                 unreadCount: 0,
//               }
//             }

//             return updatedConversations
//           }

//           return filteredConversations
//         })

//         // Update unread chats set
//         setUnreadChats(new Set(filteredConversations.filter((conv) => conv.unreadCount > 0).map((conv) => conv.id)))
//         setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + conv.unreadCount, 0))

//         if (filteredConversations.length > 0 && !pageId) {
//           setPageId(filteredConversations[0].pageId)
//         }

//         if (token) {
//           setToken(token)
//         }

//         if (businessVariables) {
//           setBusinessVariables(businessVariables)
//         }

//         // Only update selected conversation if it exists in the new data
//         // and we're not in the middle of a conversation
//         if (selectedConversation) {
//           const updatedSelectedConv = filteredConversations.find((conv) => conv.id === selectedConversation.id)
//           if (updatedSelectedConv) {
//             // Preserve the read status of messages in the selected conversation
//             const updatedWithReadStatus = {
//               ...updatedSelectedConv,
//               messages: updatedSelectedConv.messages.map((msg) => ({
//                 ...msg,
//                 read: true,
//               })),
//               unreadCount: 0,
//             }

//             // Only update if there are new messages
//             if (updatedSelectedConv.messages.length > selectedConversation.messages.length) {
//               setSelectedConversation(updatedWithReadStatus)

//               // Update displayed messages with new messages
//               const newMessages = updatedSelectedConv.messages.slice(selectedConversation.messages.length)
//               setDisplayedMessages((prev) => [...prev, ...newMessages.map((msg) => ({ ...msg, read: true }))])

//               // Scroll to bottom when new messages arrive
//               setTimeout(() => {
//                 if (scrollRef.current) {
//                   scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//                 }
//               }, 100)
//             }
//           }
//         }

//         // Set loading to false after successful fetch
//         if (!preserveReadStatus) {
//           setIsLoading(false)
//         }
//       } catch (error) {
//         console.error("Error fetching chats:", error)

//         // Only show error after multiple attempts and not during background polling
//         if (!preserveReadStatus && fetchAttemptsRef.current > 3) {
//           setError(`Getting things ready... (Attempt ${fetchAttemptsRef.current})`)
//         }

//         // Exponential backoff for retries (max 10 seconds)
//         const retryDelay = Math.min(2000 * Math.pow(1.5, fetchAttemptsRef.current - 1), 10000)

//         // Retry after delay, but only if not using mock data
//         if (isLoading && fetchAttemptsRef.current > 3) {
//           console.log("Using mock data as fallback")
//           const mockConversations: Conversation[] = [
//             {
//               id: "mock_conv_1",
//               userId: "user123",
//               pageId: "page123",
//               messages: [
//                 {
//                   id: "msg1",
//                   role: "user",
//                   content: "Hi, I'm interested in your services",
//                   senderId: "user123",
//                   createdAt: new Date(Date.now() - 3600000),
//                   read: true,
//                 },
//                 {
//                   id: "msg2",
//                   role: "assistant",
//                   content: "Hello! Thank you for your interest. How can I help you today?",
//                   senderId: "bot",
//                   createdAt: new Date(Date.now() - 3500000),
//                   read: true,
//                 },
//               ],
//               createdAt: new Date(Date.now() - 3600000),
//               updatedAt: new Date(Date.now() - 3500000),
//               unreadCount: 0,
//               Automation: null,
//             },
//           ]
//           setConversations(mockConversations)
//           setFilteredConversations(mockConversations)
//           setIsLoading(false)
//           // Don't retry if we're using mock data
//           return
//         }

//         // Only retry if not using mock data
//         setTimeout(() => {
//           fetchChats(preserveReadStatus)
//         }, retryDelay)
//       } finally {
//         if (fetchTimeout) {
//           clearTimeout(fetchTimeout)
//         }
//       }
//     },
//     [automationId, selectedConversation, playNotificationSound, pageId, readConversations, isLoading, isOnline],
//   )

//   useEffect(() => {
//     // Initial fetch
//     fetchChats()

//     // Set up polling for real-time updates
//     pollingIntervalRef.current = setInterval(() => {
//       // Only poll if component is mounted, not in loading state, and online
//       if (!isLoading && isOnline) {
//         fetchChats(true) // preserve read status when polling
//       }
//     }, 5000) // Poll every 5 seconds

//     // Clean up interval on unmount
//     return () => {
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current)
//         pollingIntervalRef.current = null
//       }
//     }
//   }, [fetchChats, isLoading, isOnline])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [displayedMessages])

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Don't trigger shortcuts when typing in input fields
//       if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
//         // Allow Escape key to close conversation even when in input
//         if (e.key === "Escape" && selectedConversation) {
//           e.preventDefault()
//           setSelectedConversation(null)
//           return
//         }

//         return
//       }

//       // Keyboard shortcuts
//       switch (e.key) {
//         case "n":
//         case "N":
//           // Focus message input if in conversation
//           if (selectedConversation && messageInputRef.current) {
//             e.preventDefault()
//             messageInputRef.current.focus()
//           }
//           break

//         case "k":
//           if (e.ctrlKey || e.metaKey) {
//             e.preventDefault()
//             searchInputRef.current?.focus()
//           }
//           break

//         case "Escape":
//           if (selectedConversation) {
//             e.preventDefault()
//             setSelectedConversation(null)
//           }
//           break

//         case "m":
//         case "M":
//           e.preventDefault()
//           setSoundEnabled((prev) => !prev)
//           break

//         case "a":
//         case "A":
//           if (e.shiftKey) {
//             e.preventDefault()
//             markAllAsRead()
//           }
//           break

//         case "?":
//           e.preventDefault()
//           setShowHelpModal(true)
//           break
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown)
//     return () => document.removeEventListener("keydown", handleKeyDown)
//   }, [selectedConversation])

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
//           read: true,
//         }

//         setSelectedConversation((prev) => {
//           if (!prev) return null
//           const updatedMessages = [...prev.messages, userMessage]
//           return { ...prev, messages: updatedMessages }
//         })

//         setConversations((prevConversations) => {
//           const updatedConversations = prevConversations.map((conv) =>
//             conv.id === selectedConversation.id ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           )

//           return updatedConversations.sort((a, b) => {
//             const lastMessageA = a.messages[a.messages.length - 1]
//             const lastMessageB = b.messages[b.messages.length - 1]
//             return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
//           })
//         })

//         setNewMessage("")

//         setDisplayedMessages((prev) => [...prev, userMessage])

//         // Scroll to the bottom after sending a message
//         if (scrollRef.current) {
//           scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//         }
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
//     setShowEmojiPicker(false)
//     messageInputRef.current?.focus()
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

//   const markAllAsRead = () => {
//     // Create a new set with all conversation IDs
//     const allConversationIds = new Set(conversations.map((conv) => conv.id))
//     setReadConversations(allConversationIds)

//     // Update conversations to mark all as read
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => ({
//         ...conv,
//         messages: conv.messages.map((msg) => ({ ...msg, read: true })),
//         unreadCount: 0,
//       })),
//     )

//     // Clear unread chats
//     setUnreadChats(new Set())
//     setTotalUnreadMessages(0)
//     setHasNewMessages(false)
//   }

//   const attemptReconnection = () => {
//     if (!isOnline) {
//       console.log("Attempting to reconnect...")
//       // Try to fetch chats again
//       fetchChats()
//     }
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     // Add this conversation to the read conversations set
//     setReadConversations((prev) => {
//       const newSet = new Set(prev)
//       newSet.add(conversation.id)
//       return newSet
//     })

//     // Create a copy with all messages marked as read
//     const conversationWithReadMessages = {
//       ...conversation,
//       messages: conversation.messages.map((msg) => ({ ...msg, read: true })),
//       unreadCount: 0,
//     }

//     // Set the selected conversation first
//     setSelectedConversation(conversationWithReadMessages)

//     // Update unread chats
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.id)
//       return newUnreadChats
//     })

//     // Update total unread count
//     setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount ?? 0)))

//     // Set displayed messages
//     const lastMessages = conversation.messages.slice(-10)
//     setDisplayedMessages(lastMessages.map((msg) => ({ ...msg, read: true })))

//     // Find unread separator index
//     const unreadIndex = lastMessages.findIndex((msg) => !msg.read)
//     setUnreadSeparatorIndex(unreadIndex !== -1 ? unreadIndex : null)

//     // Update conversations with read messages
//     setConversations((prevConversations) =>
//       prevConversations.map((conv) => (conv.id === conversation.id ? conversationWithReadMessages : conv)),
//     )

//     // Reset new message indicator when viewing the conversation
//     setHasNewMessages(false)

//     // Focus the message input
//     setTimeout(() => {
//       messageInputRef.current?.focus()
//     }, 100)
//   }

//   const handleDeleteConversation = (conversation: Conversation) => {
//     setConversationToDelete(conversation)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!conversationToDelete || !pageId) return

//     try {
//       setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
//       if (selectedConversation?.id === conversationToDelete.id) {
//         setSelectedConversation(null)
//       }

//       // Remove from pinned/starred if needed
//       if (pinnedConversations.has(conversationToDelete.id)) {
//         setPinnedConversations((prev) => {
//           const newSet = new Set(prev)
//           newSet.delete(conversationToDelete.id)
//           return newSet
//         })
//       }

//       if (starredConversations.has(conversationToDelete.id)) {
//         setStarredConversations((prev) => {
//           const newSet = new Set(prev)
//           newSet.delete(conversationToDelete.id)
//           return newSet
//         })
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

//   const generateAiSuggestion = useCallback(() => {
//     const suggestions = [
//       "Would you like to know more about our products?",
//       "Can I assist you with anything specific today?",
//       "Have you checked out our latest offers?",
//       "Is there anything else I can help you with?",
//     ]
//     setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
//   }, [])

//   useEffect(() => {
//     if (selectedConversation && selectedConversation.messages.length > 0) {
//       const lastMessage = selectedConversation.messages[selectedConversation.messages.length - 1]
//       if (lastMessage && lastMessage.role === "user") {
//         generateAiSuggestion()
//       }
//     }
//   }, [selectedConversation, generateAiSuggestion])

//   const togglePinConversation = (conversationId: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setPinnedConversations((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(conversationId)) {
//         newSet.delete(conversationId)
//       } else {
//         newSet.add(conversationId)
//       }
//       return newSet
//     })
//   }

//   const toggleStarConversation = (conversationId: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setStarredConversations((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(conversationId)) {
//         newSet.delete(conversationId)
//       } else {
//         newSet.add(conversationId)
//       }
//       return newSet
//     })
//   }

//   const FancyErrorMessage: React.FC<{ message: string }> = ({ message }) => {
//     return (
//       <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         >
//           <Zap className="w-16 h-16 text-yellow-400 mb-4" />
//         </motion.div>
//         <h3 className="text-xl font-semibold mb-2">Hang tight!</h3>
//         <p className="text-muted-foreground mb-4">{message}</p>
//         <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
//           <Loader2 className="w-6 h-6 text-primary animate-spin" />
//         </motion.div>
//       </div>
//     )
//   }

//   const loadMoreMessages = useCallback(() => {
//     if (selectedConversation) {
//       const currentLength = displayedMessages.length
//       const newMessages = selectedConversation.messages.slice(
//         Math.max(0, selectedConversation.messages.length - currentLength - 10),
//         selectedConversation.messages.length - currentLength,
//       )
//       setDisplayedMessages((prevMessages) => [...newMessages, ...prevMessages])
//     }
//   }, [selectedConversation, displayedMessages])

//   useEffect(() => {
//     if (selectedConversation) {
//       const lastMessages = selectedConversation.messages.slice(-10)
//       setDisplayedMessages(lastMessages)
//     }
//   }, [selectedConversation])

//   useEffect(() => {
//     const scrollArea = scrollRef.current
//     if (!scrollArea) return

//     const handleScroll = () => {
//       if (scrollArea.scrollTop === 0) {
//         loadMoreMessages()
//       }
//     }

//     scrollArea.addEventListener("scroll", handleScroll)
//     return () => scrollArea.removeEventListener("scroll", handleScroll)
//   }, [loadMoreMessages])

//   useEffect(() => {
//     // Update document title with unread count
//     if (totalUnreadMessages > 0) {
//       document.title = `(${totalUnreadMessages}) New Messages`
//     } else {
//       document.title = "Chat Dashboard"
//     }

//     return () => {
//       document.title = "Chat Dashboard"
//     }
//   }, [totalUnreadMessages])

//   // Render conversation list item
//   const ConversationListItem = ({ conversation }: { conversation: Conversation }) => {
//     const isPinned = pinnedConversations.has(conversation.id)
//     const isStarred = starredConversations.has(conversation.id)
//     const isUnread = conversation.unreadCount > 0

//     return (
//       <motion.div
//         key={conversation.id}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.2 }}
//         className={cn(
//           "p-4 bg-background rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 relative",
//           isPinned && "border-l-4 border-blue-500",
//           isUnread && "bg-background/90 border-l-4 border-red-500",
//         )}
//         onClick={() => handleSelectConversation(conversation)}
//       >
//         <div className="flex items-start space-x-3">
//           <Avatar className="w-12 h-12 relative border-2 border-primary flex-shrink-0">
//             <AvatarImage src={getAvatarUrl()} />
//             <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
//             {isUnread && (
//               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//             )}
//           </Avatar>

//           <div className="flex-grow overflow-hidden">
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center">
//                 <p className={cn("font-medium text-sm text-foreground", isUnread && "font-bold")}>
//                   {getFancyName(conversation.id)}
//                 </p>
//                 {isPinned && (
//                   <Badge variant="outline" className="ml-2 px-1">
//                     <Pin className="h-3 w-3 text-blue-500" />
//                   </Badge>
//                 )}
//                 {isStarred && (
//                   <Badge variant="outline" className="ml-2 px-1">
//                     <Star className="h-3 w-3 text-yellow-500" />
//                   </Badge>
//                 )}
//               </div>
//               <span className="text-xs text-muted-foreground">
//                 {new Date(conversation.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//               </span>
//             </div>

//             <p className="text-xs text-muted-foreground flex items-center mb-1">
//               {getActivityStatus(conversation.updatedAt)}
//               {getActivityStatus(conversation.updatedAt) === "Active now" && <ActiveNowIndicator />}
//             </p>

//             <p className={cn("text-sm text-muted-foreground truncate", isUnread && "text-foreground font-medium")}>
//               {conversation.messages.length > 0
//                 ? conversation.messages[conversation.messages.length - 1].content
//                 : "No messages"}
//             </p>

//             <div className="flex justify-between items-center mt-2">
//               <div className="flex space-x-1">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => togglePinConversation(conversation.id, e)}
//                 >
//                   <Pin className={cn("h-4 w-4", isPinned ? "text-blue-500 fill-blue-500" : "text-muted-foreground")} />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => toggleStarConversation(conversation.id, e)}
//                 >
//                   <Star
//                     className={cn("h-4 w-4", isStarred ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground")}
//                   />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-7 w-7 rounded-full"
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleDeleteConversation(conversation)
//                   }}
//                 >
//                   <Trash2 size={16} className="text-muted-foreground hover:text-red-500" />
//                 </Button>
//               </div>

//               {isUnread && (
//                 <Badge variant="destructive" className="text-xs">
//                   {conversation.unreadCount}
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     )
//   }

//   // Update the main component's return statement to include the new unread chats section
//   // Replace the existing return statement with this improved version
//   return (
//     <>
//       {/* Add audio element for notification sound */}
//       <audio id="notification-sound" src="/message-notification.mp3" preload="auto" />

//       {/* Show offline notification when offline */}
//       {!isOnline && <OfflineNotification />}

//       <NotificationIndicator
//         show={hasNewMessages && !selectedConversation}
//         onClick={() => {
//           // Find the first unread conversation and open it
//           const firstUnread = conversations.find((conv) => conv.unreadCount > 0)
//           if (firstUnread) {
//             handleSelectConversation(firstUnread)
//           }
//         }}
//       />

//       <AnimatePresence>
//         {showHelpModal && <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />}
//       </AnimatePresence>

//       <ShimmeringBorder>
//         <div
//           className={`flex flex-col ${fancyBackground} text-foreground rounded-lg overflow-hidden h-full max-h-[90vh] sm:max-h-[80vh]`}
//         >
//           {isLoading ? (
//             <FancyLoader />
//           ) : error && isOnline ? (
//             <FancyErrorMessage message={error} />
//           ) : (
//             <>
//               {selectedConversation ? (
//                 <>
//                   <div className="p-2 sm:p-4 bg-background border-b border-primary/10 flex items-center">
//                     <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//                       <ArrowLeft size={20} />
//                     </Button>
//                     <Avatar className="w-10 h-10">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.id}`} />
//                       <AvatarFallback>{getFancyName(selectedConversation.id).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-3 flex-grow">
//                       <h4 className="font-medium text-lg">{getFancyName(selectedConversation.id)}</h4>
//                       {selectedConversation && selectedConversation.messages.length > 0 && (
//                         <p className="text-sm text-muted-foreground flex items-center">
//                           {getActivityStatus(
//                             new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                           )}
//                           {getActivityStatus(
//                             new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt),
//                           ) === "Active now" && <ActiveNowIndicator />}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Phone className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Call</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Video className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Video call</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>

//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                               <Info className="h-5 w-5 text-muted-foreground" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Info</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                   <ScrollArea className="flex-grow h-[calc(100vh-300px)] overflow-hidden">
//                     <div className="p-4 space-y-4" ref={scrollRef}>
//                       {displayedMessages.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64 text-center">
//                           <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                           <h3 className="text-lg font-medium mb-2">No messages yet</h3>
//                           <p className="text-muted-foreground max-w-md">
//                             Start the conversation by sending a message below.
//                           </p>
//                         </div>
//                       ) : (
//                         <>
//                           {displayedMessages.map((message, index) => (
//                             <React.Fragment key={`msg-fragment-${message.id}-${index}`}>
//                               {index === unreadSeparatorIndex && (
//                                 <div className="flex items-center my-2">
//                                   <div className="flex-grow border-t border-gray-600"></div>
//                                   <span className="mx-4 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
//                                     Unread messages
//                                   </span>
//                                   <div className="flex-grow border-t border-gray-600"></div>
//                                 </div>
//                               )}

//                               {/* Show date separator if needed */}
//                               {index > 0 &&
//                                 new Date(message.createdAt).toDateString() !==
//                                   new Date(displayedMessages[index - 1].createdAt).toDateString() && (
//                                   <div className="flex justify-center my-4">
//                                     <Badge variant="outline" className="bg-background/50 px-3 py-1">
//                                       {new Date(message.createdAt).toLocaleDateString(undefined, {
//                                         weekday: "long",
//                                         month: "short",
//                                         day: "numeric",
//                                       })}
//                                     </Badge>
//                                   </div>
//                                 )}

//                               <motion.div
//                                 key={`msg-${message.id}-${index}`}
//                                 initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                                 className={`flex items-end mb-4 group ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                               >
//                                 {message.role === "assistant" ? (
//                                   <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                                     <AvatarImage src={BOT_AVATAR} />
//                                     <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                                   </Avatar>
//                                 ) : (
//                                   <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
//                                     <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                                     <AvatarFallback>{getFancyName("123456789").slice(0, 2)}</AvatarFallback>
//                                   </Avatar>
//                                 )}
//                                 <div
//                                   className={cn(
//                                     "max-w-[85%] sm:max-w-[75%] p-2 sm:p-3 rounded-3xl text-sm relative",
//                                     message.role === "assistant"
//                                       ? "bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 text-white"
//                                       : "bg-gradient-to-br from-purple-400/30 to-purple-600/30 border-2 border-purple-500/50 text-white",
//                                   )}
//                                   style={{
//                                     backdropFilter: "blur(10px)",
//                                     WebkitBackdropFilter: "blur(10px)",
//                                   }}
//                                 >
//                                   <p className="break-words relative z-10">{message.content}</p>
//                                   <div className="flex justify-between items-center mt-1 text-xs text-gray-300">
//                                     <MessageTime time={new Date(message.createdAt)} />
//                                     {message.role === "assistant" && (
//                                       <div
//                                         className={`flex items-center ${
//                                           message.status === "sent" ? "text-green-400" : "text-green-400"
//                                         }`}
//                                       >
//                                         {message.status === "sent" || true ? (
//                                           <>
//                                             <Check size={12} className="mr-1" />
//                                             <span>Sent</span>
//                                           </>
//                                         ) : (
//                                           <span>Failed</span>
//                                         )}
//                                       </div>
//                                     )}
//                                   </div>
//                                   <div
//                                     className={cn(
//                                       "absolute inset-0 rounded-3xl opacity-20",
//                                       message.role === "assistant"
//                                         ? "bg-gradient-to-br from-blue-400 to-blue-600"
//                                         : "bg-gradient-to-br from-purple-400 to-purple-600",
//                                     )}
//                                   ></div>

//                                   {/* Message actions on hover */}
//                                   <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-8 bg-background rounded-full shadow-md p-1 flex space-x-1">
//                                     <TooltipProvider>
//                                       <Tooltip>
//                                         <TooltipTrigger asChild>
//                                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                                             <MoreHorizontal className="h-4 w-4" />
//                                           </Button>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                           <p>More options</p>
//                                         </TooltipContent>
//                                       </Tooltip>
//                                     </TooltipProvider>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             </React.Fragment>
//                           ))}

//                           {/* Typing indicator */}
//                           {isTyping && (
//                             <div className="flex items-start">
//                               <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
//                                 <AvatarImage src={BOT_AVATAR} />
//                                 <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                               </Avatar>
//                               <div className="bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 rounded-3xl p-3">
//                                 <TypingIndicator />
//                               </div>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </ScrollArea>
//                   <div className="p-2 sm:p-4 bg-background border-t border-primary/10">
//                     <div className="flex space-x-2 mb-2 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
//                       {[
//                         "Hello!",
//                         "Torever",
//                         "Hi there",
//                         "Awesome",
//                         "How can I help?",
//                         "Thank you!",
//                         "I'll get back to you soon.",
//                         "You are welcome",
//                       ].map((response, index) => (
//                         <motion.button
//                           key={index}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
//                           onClick={() => setNewMessage(response)}
//                         >
//                           {response}
//                         </motion.button>
//                       ))}
//                     </div>
//                     {isTyping && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="flex items-center space-x-2 p-2 bg-muted rounded-lg mb-2"
//                       >
//                         <span className="text-sm text-muted-foreground">AiAssist is typing</span>
//                         <motion.div
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             transition: { repeat: Number.POSITIVE_INFINITY, duration: 1 },
//                           }}
//                         >
//                           <Sparkles className="h-4 w-4 text-primary" />
//                         </motion.div>
//                       </motion.div>
//                     )}
//                     <div className="flex items-center space-x-2 relative">
//                       <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
//                         <PopoverTrigger asChild>
//                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
//                             <Smile className="h-5 w-5" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                           <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                         </PopoverContent>
//                       </Popover>
//                       <div className="flex-grow relative">
//                         <Textarea
//                           ref={messageInputRef}
//                           placeholder="Type here..."
//                           value={newMessage}
//                           onChange={(e) => setNewMessage(e.target.value)}
//                           onKeyPress={(e) => {
//                             if (e.key === "Enter" && !e.shiftKey) {
//                               e.preventDefault()
//                               handleSendMessage()
//                             }
//                           }}
//                           className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[36px] max-h-[96px] py-2 px-2 rounded-lg resize-none overflow-hidden w-full"
//                           style={{ height: "36px", transition: "height 0.1s ease" }}
//                           onInput={(e) => {
//                             const target = e.target as HTMLTextAreaElement
//                             target.style.height = "36px"
//                             target.style.height = `${Math.min(target.scrollHeight, 96)}px`
//                           }}
//                         />
//                       </div>
//                       <div className="flex space-x-1">
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={handleSendMessage}
//                                 className="bg-primary hover:bg-green text-primary-foreground h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center"
//                               >
//                                 <Send className="h-5 w-5" />
//                               </motion.button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Send Message</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className={`h-6 w-6 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                                 onClick={handleVoiceMessage}
//                               >
//                                 <Mic className="h-5 w-5" />
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Record voice message</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <label htmlFor="file-upload">
//                                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
//                                   <Paperclip className="h-5 w-5" />
//                                 </Button>
//                               </label>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Attach file</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                       <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: "none" }} />
//                     </div>
//                     {aiSuggestion && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className="mt-2 p-2 bg-blue-500/20 rounded-lg flex items-center space-x-2"
//                       >
//                         <Zap className="h-4 w-4 text-blue-500" />
//                         <p className="text-sm text-blue-500">{aiSuggestion}</p>
//                         <button
//                           className="text-xs text-blue-700 hover:underline"
//                           onClick={() => setNewMessage(aiSuggestion)}
//                         >
//                           Use
//                         </button>
//                       </motion.div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="p-4 bg-background border-b border-primary/10">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold flex items-center">
//                         <span>Recent Chats</span>
//                         {hasNewMessages && (
//                           <motion.div
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//                             className="ml-2 w-2 h-2 bg-green-500 rounded-full"
//                           />
//                         )}
//                         {totalUnreadMessages > 0 && (
//                           <Badge variant="destructive" className="ml-2">
//                             {totalUnreadMessages}
//                           </Badge>
//                         )}
//                       </h3>

//                       <div className="flex items-center space-x-2">
//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="rounded-full"
//                                 onClick={() => setSoundEnabled(!soundEnabled)}
//                               >
//                                 {soundEnabled ? (
//                                   <Bell className="h-5 w-5 text-primary" />
//                                 ) : (
//                                   <BellOff className="h-5 w-5 text-muted-foreground" />
//                                 )}
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>{soundEnabled ? "Mute notifications" : "Unmute notifications"}</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button variant="ghost" size="icon" className="rounded-full" onClick={markAllAsRead}>
//                                 <Check className="h-5 w-5 text-muted-foreground" />
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Mark all as read</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>

//                         <TooltipProvider>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="rounded-full"
//                                 onClick={() => setShowHelpModal(true)}
//                               >
//                                 <span className="text-sm font-semibold">?</span>
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Help</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       </div>
//                     </div>

//                     <div className="relative mb-4">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         ref={searchInputRef}
//                         placeholder="Search conversations..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onFocus={() => setIsSearchFocused(true)}
//                         onBlur={() => setIsSearchFocused(false)}
//                         className={cn(
//                           "pl-10 pr-10 py-2 bg-muted border-primary/20",
//                           isSearchFocused && "ring-2 ring-primary/50",
//                         )}
//                       />
//                       {searchQuery && (
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full"
//                           onClick={() => setSearchQuery("")}
//                         >
//                           <X className="h-4 w-4 text-muted-foreground" />
//                         </Button>
//                       )}

//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
//                         <KeyboardShortcut keys={["Ctrl", "K"]} />
//                       </div>
//                     </div>

//                     <Tabs
//                       defaultValue="all"
//                       className="w-full"
//                       onValueChange={(value) => setActiveFilter(value as any)}
//                     >
//                       <TabsList className="grid grid-cols-3 mb-4">
//                         <TabsTrigger value="all" className="text-xs">
//                           All Chats
//                         </TabsTrigger>
//                         <TabsTrigger value="unread" className="text-xs">
//                           Unread
//                           {totalUnreadMessages > 0 && (
//                             <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1">
//                               {totalUnreadMessages}
//                             </Badge>
//                           )}
//                         </TabsTrigger>
//                         <TabsTrigger value="recent" className="text-xs">
//                           Recent
//                         </TabsTrigger>
//                       </TabsList>
//                     </Tabs>
//                   </div>

//                   <ScrollArea className="flex-grow">
//                     <div className="flex flex-col p-4 space-y-4">
//                       {!token ? (
//                         <div className="w-full p-4 bg-background rounded-lg shadow-md">
//                           <ExampleConversations onSelectConversation={handleSelectConversation} className="mb-4" />
//                           <div className="text-center">
//                             <p className="text-muted-foreground mb-4 text-sm sm:text-base">
//                               Connect your Instagram account to start receiving real messages.
//                             </p>
//                             <Button
//                               onClick={() => {
//                                 console.log("Navigate to integration page")
//                               }}
//                               className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full"
//                             >
//                               Connect Instagram
//                             </Button>
//                           </div>
//                         </div>
//                       ) : filteredConversations.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64 text-center">
//                           {searchQuery ? (
//                             <>
//                               <Search className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                               <h3 className="text-lg font-medium mb-2">No results found</h3>
//                               <p className="text-muted-foreground max-w-md">
//                                 We couldnt find any conversations matching {searchQuery}.
//                               </p>
//                               <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
//                                 Clear search
//                               </Button>
//                             </>
//                           ) : (
//                             <>
//                               <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
//                               <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
//                               <p className="text-muted-foreground max-w-md">
//                                 Connect your account to start receiving messages.
//                               </p>
//                               <ExampleConversations onSelectConversation={handleSelectConversation} className="mt-6" />
//                             </>
//                           )}
//                         </div>
//                       ) : (
//                         <>
//                           {/* Unread chats section */}
//                           <UnreadChatsList
//                             conversations={conversations}
//                             onSelectConversation={handleSelectConversation}
//                           />

//                           {/* All chats section */}
//                           <div className="space-y-3">
//                             <div className="flex items-center justify-between">
//                               <h4 className="text-sm font-semibold">
//                                 {activeFilter === "all"
//                                   ? "All Conversations"
//                                   : activeFilter === "unread"
//                                     ? "Unread Conversations"
//                                     : "Recent Conversations"}
//                               </h4>
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                   <Button variant="ghost" size="sm" className="h-8 px-2">
//                                     <Filter className="h-4 w-4 mr-1" />
//                                     <span className="text-xs">Sort</span>
//                                   </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                   <DropdownMenuItem>Newest first</DropdownMenuItem>
//                                   <DropdownMenuItem>Oldest first</DropdownMenuItem>
//                                   <DropdownMenuItem>Unread first</DropdownMenuItem>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             </div>

//                             <div className="grid grid-cols-1 gap-3">
//                               {filteredConversations.map((conversation) => (
//                                 <ConversationListItem key={conversation.id} conversation={conversation} />
//                               ))}
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </ScrollArea>
//                 </>
//               )}
//             </>
//           )}
//           <DeleteConfirmationModal
//             isOpen={isDeleteModalOpen}
//             onClose={() => setIsDeleteModalOpen(false)}
//             onConfirm={confirmDelete}
//           />
//         </div>
//       </ShimmeringBorder>
//     </>
//   )
// }

// export default AutomationChats

"use client"

import React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSpring, animated } from "react-spring"
import {
  Send,
  ArrowLeft,
  Smile,
  Paperclip,
  Mic,
  Trash2,
  Check,
  Sparkles,
  Zap,
  Loader2,
  Search,
  X,
  Bell,
  BellOff,
  Filter,
  MessageSquare,
  Pin,
  Star,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Wifi,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
    read?: boolean
  }>
}

const BOT_NAME = "AiAssist"
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

// Keyboard shortcuts helper
const KeyboardShortcut = ({ keys }: { keys: string[] }) => (
  <div className="flex items-center space-x-1">
    {keys.map((key, index) => (
      <React.Fragment key={index}>
        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          {key}
        </kbd>
        {index < keys.length - 1 && <span className="text-gray-500">+</span>}
      </React.Fragment>
    ))}
  </div>
)

// Help modal component
const HelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span>New message</span>
              <KeyboardShortcut keys={["N"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>Search conversations</span>
              <KeyboardShortcut keys={["Ctrl", "K"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>Send message</span>
              <KeyboardShortcut keys={["Enter"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>New line in message</span>
              <KeyboardShortcut keys={["Shift", "Enter"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>Close conversation</span>
              <KeyboardShortcut keys={["Esc"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>Toggle sound</span>
              <KeyboardShortcut keys={["M"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>Mark all as read</span>
              <KeyboardShortcut keys={["Shift", "A"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>Help</span>
              <KeyboardShortcut keys={["?"]} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold mb-2">Tips</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Click on a conversation to open it</li>
              <li>Unread messages are highlighted with a red indicator</li>
              <li>Use quick replies for common responses</li>
              <li>Hover over messages to see the timestamp</li>
              <li>Use the search bar to find specific conversations</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

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

// Add a dedicated UnreadChatsList component to better organize and display unread chats
const UnreadChatsList = ({
  conversations,
  onSelectConversation,
}: {
  conversations: Conversation[]
  onSelectConversation: (arg0: Conversation) => void
}) => {
  const unreadConversations = conversations.filter((conv) => conv.unreadCount > 0)

  if (unreadConversations.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold mb-3 flex items-center">
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        Unread Messages ({unreadConversations.length})
      </h4>
      <div className="space-y-2">
        {unreadConversations.map((conversation) => (
          <motion.div
            key={`unread-${conversation.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3 bg-background/80 border-l-4 border-red-500 rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 flex items-center"
            onClick={() => onSelectConversation(conversation)}
          >
            <Avatar className="w-10 h-10 relative border-2 border-primary">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.id}`} />
              <AvatarFallback>{conversation.id.slice(0, 2).toUpperCase()}</AvatarFallback>
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
            </Avatar>
            <div className="ml-3 overflow-hidden flex-grow">
              <p className="font-medium text-sm text-foreground truncate">Client</p>
              <p className="text-xs text-muted-foreground truncate">
                {conversation.messages.length > 0
                  ? conversation.messages[conversation.messages.length - 1].content
                  : "No messages"}
              </p>
            </div>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
              {conversation.unreadCount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Add a visual notification indicator component
const NotificationIndicator = ({ show, onClick }: { show: boolean; onClick: () => void }) => {
  if (!show) return null

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, repeatDelay: 2 }}
      >
        <Bell className="h-6 w-6" />
      </motion.div>
    </motion.div>
  )
}

// Offline notification component
const OfflineNotification = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 bg-yellow-600 text-white p-2 z-50 flex items-center justify-center"
    >
      <div className="flex items-center space-x-2">
        <Wifi className="h-4 w-4" />
        <p className="text-sm font-medium">You are currently offline. Some features may be limited.</p>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 h-7 text-xs bg-yellow-700 hover:bg-yellow-800 border-yellow-500"
          onClick={() => window.location.reload()}
        >
          Try reconnecting
        </Button>
      </div>
    </motion.div>
  )
}

// Message time component
const MessageTime = ({ time }: { time: Date }) => {
  return (
    <span className="text-xs text-gray-400">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
  )
}

// Typing indicator component
const TypingIndicator = () => {
  return (
    <div className="flex space-x-1 items-center p-2">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0 }}
        className="w-2 h-2 bg-primary rounded-full"
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.2 }}
        className="w-2 h-2 bg-primary rounded-full"
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, delay: 0.4 }}
        className="w-2 h-2 bg-primary rounded-full"
      />
    </div>
  )
}

const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
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
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
  const [unreadSeparatorIndex, setUnreadSeparatorIndex] = useState<number | null>(null)
  const [hasNewMessages, setHasNewMessages] = useState(false)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fetchAttemptsRef = useRef(0) // Track fetch attempts
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([])
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "recent">("all")
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [pinnedConversations, setPinnedConversations] = useState<Set<string>>(new Set())
  const [starredConversations, setStarredConversations] = useState<Set<string>>(new Set())
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const lastMessageTimeRef = useRef<Record<string, number>>({})
  const [readConversations, setReadConversations] = useState<Set<string>>(new Set())
  const [isOnline, setIsOnline] = useState(true)

  // Load read conversations from localStorage on component mount
  // Remove these lines:
  // const savedReadConversations = localStorage.getItem("readConversations")
  // if (savedReadConversations) {
  //   try {
  //     const parsedData = JSON.parse(savedReadConversations)
  //     setReadConversations(new Set(parsedData))
  //   } catch (e) {
  //     console.error("Error parsing saved read conversations:", e)
  //   }
  // }

  // And add this useEffect hook after the state declarations:
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      try {
        const savedReadConversations = localStorage.getItem("readConversations")
        if (savedReadConversations) {
          const parsedData = JSON.parse(savedReadConversations)
          setReadConversations(new Set(parsedData))
        }
      } catch (e) {
        console.error("Error loading read conversations from localStorage:", e)
      }
    }
  }, [])

  // Save read conversations to localStorage whenever it changes
  // Also update the localStorage saving effect to include better error handling:
  useEffect(() => {
    if (typeof window !== "undefined" && readConversations.size > 0) {
      try {
        localStorage.setItem("readConversations", JSON.stringify(Array.from(readConversations)))
      } catch (e) {
        console.error("Error saving read conversations to localStorage:", e)
      }
    }
  }, [readConversations])

  // Monitor network status
  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine)

    // Create event handlers
    const handleOnline = () => {
      console.log("Network connection restored")
      setIsOnline(true)
      // We'll trigger a fetch in the dependency effect instead of directly here
    }

    const handleOffline = () => {
      console.log("Network connection lost")
      setIsOnline(false)
    }

    // Add event listeners
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Add a separate effect to handle reconnection when online status changes
  useEffect(() => {
    if (isOnline && !isLoading) {
      // Attempt to fetch chats when coming back online
      const reconnect = async () => {
        console.log("Reconnecting after network status change")
        try {
          // Reset any error states
          setError(null)
          // Fetch with preserveReadStatus=false to do a full refresh
          await fetchChats()
        } catch (err) {
          console.error("Reconnection failed:", err)
        }
      }

      reconnect()
    }
  }, [isOnline, isLoading])

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create a new audio element
      const audio = new Audio("/message-notification.mp3")

      // Preload the audio
      audio.load()

      // Store the audio element in the ref
      audioRef.current = audio

      // Add event listeners for debugging
      audio.addEventListener("play", () => console.log("Audio started playing"))
      audio.addEventListener("error", (e) => console.error("Audio error:", e))

      // Clean up function
      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
      }
    }
  }, [])

  // Play notification sound function
  const playNotificationSound = useCallback(() => {
    if (!soundEnabled || !audioRef.current) return

    try {
      // Reset the audio to the beginning
      audioRef.current.currentTime = 0

      // Play the sound
      const playPromise = audioRef.current.play()

      // Handle promise rejection (happens when browser prevents autoplay)
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio play failed:", error)
          // Try again with user interaction
          document.addEventListener(
            "click",
            function playOnClick() {
              audioRef.current?.play().catch((e) => console.error("Play on click failed:", e))
              document.removeEventListener("click", playOnClick)
            },
            { once: true },
          )
        })
      }
    } catch (e) {
      console.error("Error playing sound:", e)
    }
  }, [soundEnabled])

  const getAvatarUrl = () => {
    return `https://source.unsplash.com/random/100x100?portrait&${Math.random()}`
  }

  // Filter conversations based on search query and active filter
  useEffect(() => {
    if (!conversations.length) {
      setFilteredConversations([])
      return
    }

    let filtered = [...conversations]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((conv) => {
        // Search in messages
        const hasMatchingMessage = conv.messages.some((msg) => msg.content.toLowerCase().includes(query))

        // Search in conversation ID or other properties
        const matchesId = conv.id.toLowerCase().includes(query)

        return hasMatchingMessage || matchesId
      })
    }

    // Apply category filter
    if (activeFilter === "unread") {
      filtered = filtered.filter((conv) => conv.unreadCount > 0)
    } else if (activeFilter === "recent") {
      // Sort by most recent and take top 5
      filtered = filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5)
    }

    // Sort pinned conversations to the top
    filtered.sort((a, b) => {
      if (pinnedConversations.has(a.id) && !pinnedConversations.has(b.id)) return -1
      if (!pinnedConversations.has(a.id) && pinnedConversations.has(b.id)) return 1
      return b.updatedAt.getTime() - a.updatedAt.getTime()
    })

    setFilteredConversations(filtered)
  }, [conversations, searchQuery, activeFilter, pinnedConversations])

  // Find the fetchChats function and modify the beginning part to prevent loading loops
  const fetchChats = useCallback(
    async (preserveReadStatus = false) => {
      // Check if we're offline
      if (!navigator.onLine) {
        console.log("Offline: skipping fetch")
        if (!preserveReadStatus) {
          setIsLoading(false)
        }
        return
      }

      // Only set up timeout if we're not in a polling call
      let fetchTimeout: NodeJS.Timeout | null = null
      if (!preserveReadStatus) {
        fetchTimeout = setTimeout(() => {
          setIsLoading(false)
          setError("Request timed out. Please refresh the page.")
        }, 15000) // 15 second timeout
      }

      if (!automationId) {
        setError("Missing automation ID")
        setIsLoading(false)
        return
      }

      // Don't set error to null if we're preserving read status (polling)
      // This prevents UI flicker during background polling
      if (!preserveReadStatus) {
        setError(null)
      }

      try {
        // Increment fetch attempts
        fetchAttemptsRef.current += 1

        if (!preserveReadStatus) {
          console.log(`Fetching chats for automation ID: ${automationId}, attempt: ${fetchAttemptsRef.current}`)
        }

        const result = await fetchChatsAndBusinessVariables(automationId)

        // Reset fetch attempts on success
        fetchAttemptsRef.current = 0

        if (!result || typeof result !== "object") {
          throw new Error("Invalid response from server")
        }

        const { conversations, token, businessVariables } = result as {
          conversations: RawConversation[]
          token: string
          businessVariables: BusinessVariables
        }

        if (!Array.isArray(conversations)) {
          throw new Error("Conversations data is not in the expected format")
        }

        // Map of existing conversations to preserve read status
        const existingConversationsMap = new Map(
          preserveReadStatus
            ? conversations.map((conv) => [
                conv.chatId,
                conversations
                  .find((c) => c.chatId === conv.chatId)
                  ?.messages.map((m) => ({ id: m.id, read: m.read })) || [],
              ])
            : [],
        )

        const filteredConversations = conversations
          .filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
          .map((conv): Conversation => {
            // Get existing message read statuses if preserving
            const existingMessages = preserveReadStatus ? existingConversationsMap.get(conv.chatId) || [] : []

            // Map messages and preserve read status for existing messages
            const mappedMessages = conv.messages.map((msg): Message => {
              const existingMsg = existingMessages.find((m) => m.id === msg.id)

              // If this conversation was manually marked as read in localStorage, mark all messages as read
              const isRead = readConversations.has(conv.chatId)
                ? true
                : existingMsg
                  ? existingMsg.read
                  : Boolean(msg.read)

              return {
                id: msg.id,
                role: msg.role,
                content: msg.content,
                senderId: msg.senderId,
                createdAt: new Date(msg.createdAt),
                read: isRead,
              }
            })

            return {
              id: conv.chatId,
              userId: conv.messages[0]?.senderId || conv.chatId,
              pageId: conv.pageId,
              messages: mappedMessages,
              createdAt: new Date(conv.messages[0]?.createdAt ?? Date.now()),
              updatedAt: new Date(conv.messages[conv.messages.length - 1]?.createdAt ?? Date.now()),
              unreadCount: readConversations.has(conv.chatId) ? 0 : mappedMessages.filter((msg) => !msg.read).length,
              Automation: null,
            }
          })

        // Check for new messages
        if (preserveReadStatus && conversations.length > 0) {
          const currentConversationsMap = new Map(conversations.map((conv) => [conv.chatId, conv.messages.length]))

          // Compare with previous state to detect new messages
          let hasNew = false
          let newMessageConversationId = null

          setConversations((prevConvs) => {
            prevConvs.forEach((prevConv) => {
              const newMsgCount = currentConversationsMap.get(prevConv.id) || 0
              const prevMsgCount = prevConv.messages.length

              if (newMsgCount > prevMsgCount) {
                // Check if this is truly a new message (not just a refresh)
                const lastMessageTime = lastMessageTimeRef.current[prevConv.id] || 0
                const latestMessageTime = new Date(
                  conversations.find((c) => c.chatId === prevConv.id)?.messages[newMsgCount - 1]?.createdAt || 0,
                ).getTime()

                // Only consider it new if the message timestamp is newer than what we've seen
                if (latestMessageTime > lastMessageTime) {
                  hasNew = true
                  newMessageConversationId = prevConv.id
                  lastMessageTimeRef.current[prevConv.id] = latestMessageTime
                }
              }
            })
            return prevConvs
          })

          if (hasNew) {
            setHasNewMessages(true)

            // Only play sound if we're not currently viewing the conversation with new messages
            if (selectedConversation?.id !== newMessageConversationId) {
              playNotificationSound()
            }
          }
        }

        filteredConversations.sort((a, b) => {
          const lastMessageA = a.messages[a.messages.length - 1]
          const lastMessageB = b.messages[b.messages.length - 1]
          return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
        })

        // Update conversations state without affecting the selected conversation
        setConversations((prevConversations) => {
          // If we're preserving read status and have a selected conversation,
          // make sure we don't reset its read status
          if (preserveReadStatus && selectedConversation) {
            const updatedConversations = [...filteredConversations]
            const selectedIndex = updatedConversations.findIndex((c) => c.id === selectedConversation.id)

            if (selectedIndex !== -1) {
              // Keep the messages as read for the selected conversation
              updatedConversations[selectedIndex] = {
                ...updatedConversations[selectedIndex],
                messages: updatedConversations[selectedIndex].messages.map((m) => ({ ...m, read: true })),
                unreadCount: 0,
              }
            }

            return updatedConversations
          }

          return filteredConversations
        })

        // Update unread chats set
        setUnreadChats(new Set(filteredConversations.filter((conv) => conv.unreadCount > 0).map((conv) => conv.id)))
        setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + conv.unreadCount, 0))

        if (filteredConversations.length > 0 && !pageId) {
          setPageId(filteredConversations[0].pageId)
        }

        if (token) {
          setToken(token)
        }

        if (businessVariables) {
          setBusinessVariables(businessVariables)
        }

        // Only update selected conversation if it exists in the new data
        // and we're not in the middle of a conversation
        if (selectedConversation) {
          const updatedSelectedConv = filteredConversations.find((conv) => conv.id === selectedConversation.id)
          if (updatedSelectedConv) {
            // Preserve the read status of messages in the selected conversation
            const updatedWithReadStatus = {
              ...updatedSelectedConv,
              messages: updatedSelectedConv.messages.map((msg) => ({
                ...msg,
                read: true,
              })),
              unreadCount: 0,
            }

            // Only update if there are new messages
            if (updatedSelectedConv.messages.length > selectedConversation.messages.length) {
              setSelectedConversation(updatedWithReadStatus)

              // Update displayed messages with new messages
              const newMessages = updatedSelectedConv.messages.slice(selectedConversation.messages.length)
              setDisplayedMessages((prev) => [...prev, ...newMessages.map((msg) => ({ ...msg, read: true }))])

              // Scroll to bottom when new messages arrive
              setTimeout(() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                }
              }, 100)
            }
          }
        }

        // Set loading to false after successful fetch
        if (!preserveReadStatus) {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error fetching chats:", error)

        // Check for Prisma UUID format error
        const errorMessage = error instanceof Error ? error.message : String(error)
        const isPrismaUUIDError =
          errorMessage.includes("Error creating UUID") ||
          errorMessage.includes("P2023") ||
          errorMessage.includes("invalid length")

        if (isPrismaUUIDError) {
          console.log("Database UUID format error detected - using mock data")
          // This is a database format error that won't be resolved with retries
          // Use mock data instead
          const mockConversations: Conversation[] = [
            {
              id: "mock_conv_1",
              userId: "user123",
              pageId: "page123",
              messages: [
                {
                  id: "msg1",
                  role: "user",
                  content: "Hi, I'm interested in your services",
                  senderId: "user123",
                  createdAt: new Date(Date.now() - 3600000),
                  read: true,
                },
                {
                  id: "msg2",
                  role: "assistant",
                  content: "Hello! Thank you for your interest. How can I help you today?",
                  senderId: "bot",
                  createdAt: new Date(Date.now() - 3500000),
                  read: true,
                },
              ],
              createdAt: new Date(Date.now() - 3600000),
              updatedAt: new Date(Date.now() - 3500000),
              unreadCount: 0,
              Automation: null,
            },
          ]
          setConversations(mockConversations)
          setFilteredConversations(mockConversations)
          setIsLoading(false)

          // Set a more specific error message for the user
          if (!preserveReadStatus) {
            setError("There was an issue connecting to the database. Showing sample data instead.")
          }

          return
        }

        // Only show error after multiple attempts and not during background polling
        if (!preserveReadStatus) {
          if (fetchAttemptsRef.current >= 5) {
            // After 5 attempts, stop trying and show a final error
            setError(`Unable to load conversations. Please check your connection and try again later.`)
            setIsLoading(false)
            return
          } else if (fetchAttemptsRef.current > 3) {
            setError(`Getting things ready... (Attempt ${fetchAttemptsRef.current})`)
          }
        }

        // Exponential backoff for retries (max 10 seconds)
        const retryDelay = Math.min(2000 * Math.pow(1.5, fetchAttemptsRef.current - 1), 10000)

        // Retry after delay, but only if not using mock data and not exceeded max attempts
        if (isLoading && fetchAttemptsRef.current > 3 && fetchAttemptsRef.current < 5) {
          console.log("Using mock data as fallback")
          const mockConversations: Conversation[] = [
            {
              id: "mock_conv_1",
              userId: "user123",
              pageId: "page123",
              messages: [
                {
                  id: "msg1",
                  role: "user",
                  content: "Hi, I'm interested in your services",
                  senderId: "user123",
                  createdAt: new Date(Date.now() - 3600000),
                  read: true,
                },
                {
                  id: "msg2",
                  role: "assistant",
                  content: "Hello! Thank you for your interest. How can I help you today?",
                  senderId: "bot",
                  createdAt: new Date(Date.now() - 3500000),
                  read: true,
                },
              ],
              createdAt: new Date(Date.now() - 3600000),
              updatedAt: new Date(Date.now() - 3500000),
              unreadCount: 0,
              Automation: null,
            },
          ]
          setConversations(mockConversations)
          setFilteredConversations(mockConversations)
          setIsLoading(false)
          // Don't retry if we're using mock data
          return
        }

        // Only retry if not exceeded max attempts
        if (fetchAttemptsRef.current < 5) {
          setTimeout(() => {
            fetchChats(preserveReadStatus)
          }, retryDelay)
        } else {
          // Ensure we exit loading state after max attempts
          setIsLoading(false)
        }
      }
    },
    [automationId, selectedConversation, playNotificationSound, pageId, readConversations, isLoading, isOnline],
  )

  useEffect(() => {
    // Initial fetch
    fetchChats()

    // Set up polling for real-time updates
    pollingIntervalRef.current = setInterval(() => {
      // Only poll if component is mounted, not in loading state, and online
      if (!isLoading && isOnline) {
        fetchChats(true) // preserve read status when polling
      }
    }, 5000) // Poll every 5 seconds

    // Clean up interval on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
    }
  }, [fetchChats, isLoading, isOnline])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayedMessages])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        // Allow Escape key to close conversation even when in input
        if (e.key === "Escape" && selectedConversation) {
          e.preventDefault()
          setSelectedConversation(null)
          return
        }

        return
      }

      // Keyboard shortcuts
      switch (e.key) {
        case "n":
        case "N":
          // Focus message input if in conversation
          if (selectedConversation && messageInputRef.current) {
            e.preventDefault()
            messageInputRef.current.focus()
          }
          break

        case "k":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            searchInputRef.current?.focus()
          }
          break

        case "Escape":
          if (selectedConversation) {
            e.preventDefault()
            setSelectedConversation(null)
          }
          break

        case "m":
        case "M":
          e.preventDefault()
          setSoundEnabled((prev) => !prev)
          break

        case "a":
        case "A":
          if (e.shiftKey) {
            e.preventDefault()
            markAllAsRead()
          }
          break

        case "?":
          e.preventDefault()
          setShowHelpModal(true)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedConversation])

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
          read: true,
        }

        setSelectedConversation((prev) => {
          if (!prev) return null
          const updatedMessages = [...prev.messages, userMessage]
          return { ...prev, messages: updatedMessages }
        })

        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map((conv) =>
            conv.id === selectedConversation.id ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
          )

          return updatedConversations.sort((a, b) => {
            const lastMessageA = a.messages[a.messages.length - 1]
            const lastMessageB = b.messages[b.messages.length - 1]
            return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime()
          })
        })

        setNewMessage("")

        setDisplayedMessages((prev) => [...prev, userMessage])

        // Scroll to the bottom after sending a message
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
      } else {
        console.error("Failed to send message:", result.message)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
    messageInputRef.current?.focus()
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

  const markAllAsRead = () => {
    // Create a new set with all conversation IDs
    const allConversationIds = new Set(conversations.map((conv) => conv.id))
    setReadConversations(allConversationIds)

    // Update conversations to mark all as read
    setConversations((prevConversations) =>
      prevConversations.map((conv) => ({
        ...conv,
        messages: conv.messages.map((msg) => ({ ...msg, read: true })),
        unreadCount: 0,
      })),
    )

    // Clear unread chats
    setUnreadChats(new Set())
    setTotalUnreadMessages(0)
    setHasNewMessages(false)
  }

  const attemptReconnection = () => {
    if (!isOnline) {
      console.log("Attempting to reconnect...")
      // Try to fetch chats again
      fetchChats()
    }
  }

  const handleSelectConversation = (conversation: Conversation) => {
    // Add this conversation to the read conversations set
    setReadConversations((prev) => {
      const newSet = new Set(prev)
      newSet.add(conversation.id)
      return newSet
    })

    // Create a copy with all messages marked as read
    const conversationWithReadMessages = {
      ...conversation,
      messages: conversation.messages.map((msg) => ({ ...msg, read: true })),
      unreadCount: 0,
    }

    // Set the selected conversation first
    setSelectedConversation(conversationWithReadMessages)

    // Update unread chats
    setUnreadChats((prev) => {
      const newUnreadChats = new Set(prev)
      newUnreadChats.delete(conversation.id)
      return newUnreadChats
    })

    // Update total unread count
    setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount ?? 0)))

    // Set displayed messages
    const lastMessages = conversation.messages.slice(-10)
    setDisplayedMessages(lastMessages.map((msg) => ({ ...msg, read: true })))

    // Find unread separator index
    const unreadIndex = lastMessages.findIndex((msg) => !msg.read)
    setUnreadSeparatorIndex(unreadIndex !== -1 ? unreadIndex : null)

    // Update conversations with read messages
    setConversations((prevConversations) =>
      prevConversations.map((conv) => (conv.id === conversation.id ? conversationWithReadMessages : conv)),
    )

    // Reset new message indicator when viewing the conversation
    setHasNewMessages(false)

    // Focus the message input
    setTimeout(() => {
      messageInputRef.current?.focus()
    }, 100)
  }

  const handleDeleteConversation = (conversation: Conversation) => {
    setConversationToDelete(conversation)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!conversationToDelete || !pageId) return

    try {
      setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete.id))
      if (selectedConversation?.id === conversationToDelete.id) {
        setSelectedConversation(null)
      }

      // Remove from pinned/starred if needed
      if (pinnedConversations.has(conversationToDelete.id)) {
        setPinnedConversations((prev) => {
          const newSet = new Set(prev)
          newSet.delete(conversationToDelete.id)
          return newSet
        })
      }

      if (starredConversations.has(conversationToDelete.id)) {
        setStarredConversations((prev) => {
          const newSet = new Set(prev)
          newSet.delete(conversationToDelete.id)
          return newSet
        })
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

  const generateAiSuggestion = useCallback(() => {
    const suggestions = [
      "Would you like to know more about our products?",
      "Can I assist you with anything specific today?",
      "Have you checked out our latest offers?",
      "Is there anything else I can help you with?",
    ]
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
  }, [])

  useEffect(() => {
    if (selectedConversation && selectedConversation.messages.length > 0) {
      const lastMessage = selectedConversation.messages[selectedConversation.messages.length - 1]
      if (lastMessage && lastMessage.role === "user") {
        generateAiSuggestion()
      }
    }
  }, [selectedConversation, generateAiSuggestion])

  const togglePinConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setPinnedConversations((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(conversationId)) {
        newSet.delete(conversationId)
      } else {
        newSet.add(conversationId)
      }
      return newSet
    })
  }

  const toggleStarConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setStarredConversations((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(conversationId)) {
        newSet.delete(conversationId)
      } else {
        newSet.add(conversationId)
      }
      return newSet
    })
  }

  const FancyErrorMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Zap className="w-16 h-16 text-yellow-400 mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">Hang tight!</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </motion.div>
      </div>
    )
  }

  const loadMoreMessages = useCallback(() => {
    if (selectedConversation) {
      const currentLength = displayedMessages.length
      const newMessages = selectedConversation.messages.slice(
        Math.max(0, selectedConversation.messages.length - currentLength - 10),
        selectedConversation.messages.length - currentLength,
      )
      setDisplayedMessages((prevMessages) => [...newMessages, ...prevMessages])
    }
  }, [selectedConversation, displayedMessages])

  useEffect(() => {
    if (selectedConversation) {
      const lastMessages = selectedConversation.messages.slice(-10)
      setDisplayedMessages(lastMessages)
    }
  }, [selectedConversation])

  useEffect(() => {
    const scrollArea = scrollRef.current
    if (!scrollArea) return

    const handleScroll = () => {
      if (scrollArea.scrollTop === 0) {
        loadMoreMessages()
      }
    }

    scrollArea.addEventListener("scroll", handleScroll)
    return () => scrollArea.removeEventListener("scroll", handleScroll)
  }, [loadMoreMessages])

  useEffect(() => {
    // Update document title with unread count
    if (totalUnreadMessages > 0) {
      document.title = `(${totalUnreadMessages}) New Messages`
    } else {
      document.title = "Chat Dashboard"
    }

    return () => {
      document.title = "Chat Dashboard"
    }
  }, [totalUnreadMessages])

  // Render conversation list item
  const ConversationListItem = ({ conversation }: { conversation: Conversation }) => {
    const isPinned = pinnedConversations.has(conversation.id)
    const isStarred = starredConversations.has(conversation.id)
    const isUnread = conversation.unreadCount > 0

    return (
      <motion.div
        key={conversation.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "p-4 bg-background rounded-lg shadow-md hover:bg-muted cursor-pointer transition-colors duration-200 relative",
          isPinned && "border-l-4 border-blue-500",
          isUnread && "bg-background/90 border-l-4 border-red-500",
        )}
        onClick={() => handleSelectConversation(conversation)}
      >
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12 relative border-2 border-primary flex-shrink-0">
            <AvatarImage src={getAvatarUrl()} />
            <AvatarFallback>{getFancyName(conversation.id).slice(0, 2)}</AvatarFallback>
            {isUnread && (
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
            )}
          </Avatar>

          <div className="flex-grow overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <p className={cn("font-medium text-sm text-foreground", isUnread && "font-bold")}>
                  {getFancyName(conversation.id)}
                </p>
                {isPinned && (
                  <Badge variant="outline" className="ml-2 px-1">
                    <Pin className="h-3 w-3 text-blue-500" />
                  </Badge>
                )}
                {isStarred && (
                  <Badge variant="outline" className="ml-2 px-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(conversation.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <p className="text-xs text-muted-foreground flex items-center mb-1">
              {getActivityStatus(conversation.updatedAt)}
              {getActivityStatus(conversation.updatedAt) === "Active now" && <ActiveNowIndicator />}
            </p>

            <p className={cn("text-sm text-muted-foreground truncate", isUnread && "text-foreground font-medium")}>
              {conversation.messages.length > 0
                ? conversation.messages[conversation.messages.length - 1].content
                : "No messages"}
            </p>

            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => togglePinConversation(conversation.id, e)}
                >
                  <Pin className={cn("h-4 w-4", isPinned ? "text-blue-500 fill-blue-500" : "text-muted-foreground")} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => toggleStarConversation(conversation.id, e)}
                >
                  <Star
                    className={cn("h-4 w-4", isStarred ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground")}
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteConversation(conversation)
                  }}
                >
                  <Trash2 size={16} className="text-muted-foreground hover:text-red-500" />
                </Button>
              </div>

              {isUnread && (
                <Badge variant="destructive" className="text-xs">
                  {conversation.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Update the main component's return statement to include the new unread chats section
  // Replace the existing return statement with this improved version
  return (
    <>
      {/* Add audio element for notification sound */}
      <audio id="notification-sound" src="/message-notification.mp3" preload="auto" />

      {/* Show offline notification when offline */}
      {!isOnline && <OfflineNotification />}

      <NotificationIndicator
        show={hasNewMessages && !selectedConversation}
        onClick={() => {
          // Find the first unread conversation and open it
          const firstUnread = conversations.find((conv) => conv.unreadCount > 0)
          if (firstUnread) {
            handleSelectConversation(firstUnread)
          }
        }}
      />

      <AnimatePresence>
        {showHelpModal && <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />}
      </AnimatePresence>

      <ShimmeringBorder>
        <div
          className={`flex flex-col ${fancyBackground} text-foreground rounded-lg overflow-hidden h-full max-h-[90vh] sm:max-h-[80vh]`}
        >
          {isLoading ? (
            <FancyLoader />
          ) : error && isOnline ? (
            <FancyErrorMessage message={error} />
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

                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <Phone className="h-5 w-5 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Call</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <Video className="h-5 w-5 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Video call</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <Info className="h-5 w-5 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Info</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <ScrollArea className="flex-grow h-[calc(100vh-300px)] overflow-hidden">
                    <div className="p-4 space-y-4" ref={scrollRef}>
                      {displayedMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                          <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                          <p className="text-muted-foreground max-w-md">
                            Start the conversation by sending a message below.
                          </p>
                        </div>
                      ) : (
                        <>
                          {displayedMessages.map((message, index) => (
                            <React.Fragment key={`msg-fragment-${message.id}-${index}`}>
                              {index === unreadSeparatorIndex && (
                                <div className="flex items-center my-2">
                                  <div className="flex-grow border-t border-gray-600"></div>
                                  <span className="mx-4 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                                    Unread messages
                                  </span>
                                  <div className="flex-grow border-t border-gray-600"></div>
                                </div>
                              )}

                              {/* Show date separator if needed */}
                              {index > 0 &&
                                new Date(message.createdAt).toDateString() !==
                                  new Date(displayedMessages[index - 1].createdAt).toDateString() && (
                                  <div className="flex justify-center my-4">
                                    <Badge variant="outline" className="bg-background/50 px-3 py-1">
                                      {new Date(message.createdAt).toLocaleDateString(undefined, {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </Badge>
                                  </div>
                                )}

                              <motion.div
                                key={`msg-${message.id}-${index}`}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`flex items-end mb-4 group ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
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
                                    <MessageTime time={new Date(message.createdAt)} />
                                    {message.role === "assistant" && (
                                      <div
                                        className={`flex items-center ${
                                          message.status === "sent" ? "text-green-400" : "text-green-400"
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

                                  {/* Message actions on hover */}
                                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-8 bg-background rounded-full shadow-md p-1 flex space-x-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>More options</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </motion.div>
                            </React.Fragment>
                          ))}

                          {/* Typing indicator */}
                          {isTyping && (
                            <div className="flex items-start">
                              <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
                                <AvatarImage src={BOT_AVATAR} />
                                <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="bg-gradient-to-br from-blue-400/30 to-blue-600/30 border-2 border-blue-500/50 rounded-3xl p-3">
                                <TypingIndicator />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="p-2 sm:p-4 bg-background border-t border-primary/10">
                    <div className="flex space-x-2 mb-2 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
                      {[
                        "Hello!",
                        "Torever",
                        "Hi there",
                        "Awesome",
                        "How can I help?",
                        "Thank you!",
                        "I'll get back to you soon.",
                        "You are welcome",
                      ].map((response, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
                          onClick={() => setNewMessage(response)}
                        >
                          {response}
                        </motion.button>
                      ))}
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
                      <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full flex-shrink-0">
                            <Smile className="h-5 w-5" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                        </PopoverContent>
                      </Popover>
                      <div className="flex-grow relative">
                        <Textarea
                          ref={messageInputRef}
                          placeholder="Type here..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
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
                              <p>Send Message</p>
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
                  <div className="p-4 bg-background border-b border-primary/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <span>Recent Chats</span>
                        {hasNewMessages && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                            className="ml-2 w-2 h-2 bg-green-500 rounded-full"
                          />
                        )}
                        {totalUnreadMessages > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {totalUnreadMessages}
                          </Badge>
                        )}
                      </h3>

                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => setSoundEnabled(!soundEnabled)}
                              >
                                {soundEnabled ? (
                                  <Bell className="h-5 w-5 text-primary" />
                                ) : (
                                  <BellOff className="h-5 w-5 text-muted-foreground" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{soundEnabled ? "Mute notifications" : "Unmute notifications"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-full" onClick={markAllAsRead}>
                                <Check className="h-5 w-5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mark all as read</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => setShowHelpModal(true)}
                              >
                                <span className="text-sm font-semibold">?</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Help</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        ref={searchInputRef}
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className={cn(
                          "pl-10 pr-10 py-2 bg-muted border-primary/20",
                          isSearchFocused && "ring-2 ring-primary/50",
                        )}
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}

                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                        <KeyboardShortcut keys={["Ctrl", "K"]} />
                      </div>
                    </div>

                    <Tabs
                      defaultValue="all"
                      className="w-full"
                      onValueChange={(value) => setActiveFilter(value as any)}
                    >
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="all" className="text-xs">
                          All Chats
                        </TabsTrigger>
                        <TabsTrigger value="unread" className="text-xs">
                          Unread
                          {totalUnreadMessages > 0 && (
                            <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1">
                              {totalUnreadMessages}
                            </Badge>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="recent" className="text-xs">
                          Recent
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <ScrollArea className="flex-grow">
                    <div className="flex flex-col p-4 space-y-4">
                      {!token ? (
                        <div className="w-full p-4 bg-background rounded-lg shadow-md">
                          <ExampleConversations onSelectConversation={handleSelectConversation} className="mb-4" />
                          <div className="text-center">
                            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                              Connect your Instagram account to start receiving real messages.
                            </p>
                            <Button
                              onClick={() => {
                                console.log("Navigate to integration page")
                              }}
                              className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full"
                            >
                              Connect Instagram
                            </Button>
                          </div>
                        </div>
                      ) : filteredConversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          {searchQuery ? (
                            <>
                              <Search className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                              <h3 className="text-lg font-medium mb-2">No results found</h3>
                              <p className="text-muted-foreground max-w-md">
                                We couldnt find any conversations matching {searchQuery}.
                              </p>
                              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                                Clear search
                              </Button>
                            </>
                          ) : (
                            <>
                              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                              <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
                              <p className="text-muted-foreground max-w-md">
                                Connect your account to start receiving messages.
                              </p>
                              <ExampleConversations onSelectConversation={handleSelectConversation} className="mt-6" />
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          {/* Unread chats section */}
                          <UnreadChatsList
                            conversations={conversations}
                            onSelectConversation={handleSelectConversation}
                          />

                          {/* All chats section */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold">
                                {activeFilter === "all"
                                  ? "All Conversations"
                                  : activeFilter === "unread"
                                    ? "Unread Conversations"
                                    : "Recent Conversations"}
                              </h4>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <Filter className="h-4 w-4 mr-1" />
                                    <span className="text-xs">Sort</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Newest first</DropdownMenuItem>
                                  <DropdownMenuItem>Oldest first</DropdownMenuItem>
                                  <DropdownMenuItem>Unread first</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                              {filteredConversations.map((conversation) => (
                                <ConversationListItem key={conversation.id} conversation={conversation} />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
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
    </>
  )
}

export default AutomationChats

