// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Send, Paperclip, Search } from "lucide-react"
// import { getAllUsers } from "../actions"

// // Mock data for team members - in a real implementation, you would fetch this from your API
// const mockTeamMembers = [
//   {
//     id: "101",
//     name: "Admin Team",
//     avatar: null,
//     lastMessage: "Weekly meeting tomorrow",
//     lastMessageTime: "11:45 AM",
//     unread: 0,
//     online: true,
//   },
//   {
//     id: "102",
//     name: "Support Team",
//     avatar: null,
//     lastMessage: "New ticket assigned to you",
//     lastMessageTime: "Yesterday",
//     unread: 3,
//     online: true,
//   },
// ]

// // Mock messages for a conversation - in a real implementation, you would fetch this from your API
// const mockMessages = [
//   {
//     id: "msg1",
//     senderId: "2",
//     senderName: "Jane Smith",
//     content: "Hi there, I'm having an issue with my automation. It's not responding to messages as expected.",
//     timestamp: "2023-12-15T10:30:00",
//     isAdmin: false,
//   },
//   {
//     id: "msg2",
//     senderId: "admin",
//     senderName: "Admin",
//     content:
//       "Hello Jane, I'd be happy to help. Could you tell me more about the specific automation you're having trouble with?",
//     timestamp: "2023-12-15T10:32:00",
//     isAdmin: true,
//   },
//   {
//     id: "msg3",
//     senderId: "2",
//     senderName: "Jane Smith",
//     content:
//       "It's my message responder automation. I set it up to respond to specific keywords, but it's not triggering when those words are used.",
//     timestamp: "2023-12-15T10:35:00",
//     isAdmin: false,
//   },
//   {
//     id: "msg4",
//     senderId: "admin",
//     senderName: "Admin",
//     content: "I see. Let me check your automation settings. Could you confirm which keywords you've set up?",
//     timestamp: "2023-12-15T10:38:00",
//     isAdmin: true,
//   },
//   {
//     id: "msg5",
//     senderId: "2",
//     senderName: "Jane Smith",
//     content: "I've set up 'pricing', 'cost', and 'subscription' as keywords.",
//     timestamp: "2023-12-15T10:40:00",
//     isAdmin: false,
//   },
//   {
//     id: "msg6",
//     senderId: "admin",
//     senderName: "Admin",
//     content:
//       "Thanks for confirming. I've checked your automation and found the issue. The keyword listener wasn't properly activated. I've fixed it now, and it should be working correctly. Could you test it and let me know if it works?",
//     timestamp: "2023-12-15T10:45:00",
//     isAdmin: true,
//   },
//   {
//     id: "msg7",
//     senderId: "2",
//     senderName: "Jane Smith",
//     content: "I'll test it right away and let you know. Thank you!",
//     timestamp: "2023-12-15T10:47:00",
//     isAdmin: false,
//   },
// ]

// type User = {
//   id: string
//   name: string
//   email: string
//   lastMessage?: string
//   lastMessageTime?: string
//   unread?: number
//   online?: boolean
// }

// export function ChatInterface() {
//   const [activeTab, setActiveTab] = useState("users")
//   const [selectedUser, setSelectedUser] = useState<string | null>(null)
//   const [messages, setMessages] = useState(mockMessages)
//   const [newMessage, setNewMessage] = useState("")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [users, setUsers] = useState<User[]>([])
//   const [loading, setLoading] = useState(true)

//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   // Fetch users
//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         setLoading(true)
//         const result = await getAllUsers(1, 20, searchQuery)

//         // Transform users to include chat-specific properties
//         const chatUsers = result.users.map((user) => ({
//           ...user,
//           lastMessage: "No messages yet",
//           lastMessageTime: "N/A",
//           unread: 0,
//           online: Math.random() > 0.5, // Random online status for demo
//         }))

//         setUsers(chatUsers)
//       } catch (error) {
//         console.error("Error fetching users:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     // Debounce search
//     const handler = setTimeout(() => {
//       fetchUsers()
//     }, 300)

//     return () => clearTimeout(handler)
//   }, [searchQuery])

//   // Filter users based on search query
//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const filteredTeamMembers = mockTeamMembers.filter((member) =>
//     member.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   // Scroll to bottom of messages when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   // Handle sending a new message
//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") return

//     const newMsg = {
//       id: `msg${messages.length + 1}`,
//       senderId: "admin",
//       senderName: "Admin",
//       content: newMessage,
//       timestamp: new Date().toISOString(),
//       isAdmin: true,
//     }

//     setMessages([...messages, newMsg])
//     setNewMessage("")
//   }

//   // Handle pressing Enter to send message
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
//       {/* Chat list */}
//       <Card className="md:col-span-1 flex flex-col">
//         <CardHeader>
//           <CardTitle>Conversations</CardTitle>
//           <CardDescription>Chat with users and team members</CardDescription>
//           <div className="relative mt-2">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search conversations..."
//               className="pl-8"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Tabs defaultValue="users" className="mt-2" onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="users">Users</TabsTrigger>
//               <TabsTrigger value="team">Team</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </CardHeader>
//         <CardContent className="flex-1 overflow-hidden p-0">
//           <ScrollArea className="h-full">
//             <div className="px-4 py-2">
//               {loading ? (
//                 <div className="p-4 text-center">Loading conversations...</div>
//               ) : activeTab === "users" ? (
//                 filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <div
//                       key={user.id}
//                       className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
//                         selectedUser === user.id ? "bg-muted" : ""
//                       }`}
//                       onClick={() => setSelectedUser(user.id)}
//                     >
//                       <div className="relative">
//                         <Avatar>
//                           <AvatarFallback>
//                             {user.name
//                               ? user.name
//                                   .split(" ")
//                                   .map((n) => n[0])
//                                   .join("")
//                               : "U"}
//                           </AvatarFallback>
//                         </Avatar>
//                         {user.online && (
//                           <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-center">
//                           <p className="font-medium truncate">{user.name || "Unnamed User"}</p>
//                           <span className="text-xs text-muted-foreground">{user.lastMessageTime}</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
//                       </div>
//                       {user.unread && user.unread > 0 && (
//                         <div className="flex-shrink-0 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
//                           <span className="text-xs text-primary-foreground">{user.unread}</span>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="p-4 text-center text-muted-foreground">No users found matching your search.</div>
//                 )
//               ) : filteredTeamMembers.length > 0 ? (
//                 filteredTeamMembers.map((member) => (
//                   <div
//                     key={member.id}
//                     className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
//                       selectedUser === member.id ? "bg-muted" : ""
//                     }`}
//                     onClick={() => setSelectedUser(member.id)}
//                   >
//                     <div className="relative">
//                       <Avatar>
//                         <AvatarFallback>
//                           {member.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       {member.online && (
//                         <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-center">
//                         <p className="font-medium truncate">{member.name}</p>
//                         <span className="text-xs text-muted-foreground">{member.lastMessageTime}</span>
//                       </div>
//                       <p className="text-sm text-muted-foreground truncate">{member.lastMessage}</p>
//                     </div>
//                     {member.unread > 0 && (
//                       <div className="flex-shrink-0 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
//                         <span className="text-xs text-primary-foreground">{member.unread}</span>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-4 text-center text-muted-foreground">No team members found matching your search.</div>
//               )}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       </Card>

//       {/* Chat messages */}
//       <Card className="md:col-span-2 flex flex-col">
//         {selectedUser ? (
//           <>
//             <CardHeader className="border-b">
//               <div className="flex items-center gap-3">
//                 <Avatar>
//                   <AvatarFallback>
//                     {activeTab === "users"
//                       ? (users.find((u) => u.id === selectedUser)?.name || "U")
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")
//                       : (mockTeamMembers.find((m) => m.id === selectedUser)?.name || "T")
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <CardTitle>
//                     {activeTab === "users"
//                       ? users.find((u) => u.id === selectedUser)?.name || "Unnamed User"
//                       : mockTeamMembers.find((m) => m.id === selectedUser)?.name || "Team Member"}
//                   </CardTitle>
//                   <CardDescription>
//                     {activeTab === "users"
//                       ? users.find((u) => u.id === selectedUser)?.online
//                         ? "Online"
//                         : "Offline"
//                       : mockTeamMembers.find((m) => m.id === selectedUser)?.online
//                         ? "Online"
//                         : "Offline"}
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="flex-1 overflow-hidden p-0">
//               <ScrollArea className="h-[calc(100%-120px)] p-4">
//                 <div className="space-y-4">
//                   {messages.map((message) => (
//                     <div key={message.id} className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}>
//                       <div
//                         className={`max-w-[80%] rounded-lg p-3 ${
//                           message.isAdmin ? "bg-primary text-primary-foreground" : "bg-muted"
//                         }`}
//                       >
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="font-medium">{message.senderName}</span>
//                           <span className="text-xs opacity-70">
//                             {new Date(message.timestamp).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                         <p>{message.content}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messagesEndRef} />
//                 </div>
//               </ScrollArea>
//             </CardContent>
//             <div className="p-4 border-t">
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon">
//                   <Paperclip className="h-4 w-4" />
//                 </Button>
//                 <Input
//                   placeholder="Type your message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                 />
//                 <Button onClick={handleSendMessage}>
//                   <Send className="h-4 w-4 mr-2" />
//                   Send
//                 </Button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-muted-foreground">
//             Select a conversation to start chatting
//           </div>
//         )}
//       </Card>
//     </div>
//   )
// }

"use client"

import { AdminChat } from "../components/admin-chat"

interface ChatInterfaceProps {
  adminId: string
}

export function ChatInterface({ adminId }: ChatInterfaceProps) {
  return <AdminChat userId={adminId} />
}

