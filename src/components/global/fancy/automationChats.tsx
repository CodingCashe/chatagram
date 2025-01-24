// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronRight, MessageCircle, User } from 'lucide-react';
// import { ScrollArea } from '@/components/ui/scroll-area';

// interface Chat {
//   id: string;
//   messages: { role: 'user' | 'assistant'; content: string }[];
// }

// interface Client {
//   id: string;
//   name: string;
//   lastMessage: string;
//   chats: Chat[];
// }

// interface AutomationChatsProps {
//   automationId: string;
// }

// const mockClients: Client[] = [
//   {
//     id: '1',
//     name: 'John Doe',
//     lastMessage: 'Thanks for your help!',
//     chats: [
//       {
//         id: '1',
//         messages: [
//           { role: 'user', content: 'Hi, I need help with my order.' },
//           { role: 'assistant', content: 'Of course! What seems to be the problem?' },
//           { role: 'user', content: 'I haven\'t received my package yet.' },
//           { role: 'assistant', content: 'I\'m sorry to hear that. Let me check the status for you.' },
//           { role: 'assistant', content: 'Your package is currently in transit and should arrive within 2 business days.' },
//           { role: 'user', content: 'Thanks for your help!' },
//         ],
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     lastMessage: 'That sounds great, thank you!',
//     chats: [
//       {
//         id: '1',
//         messages: [
//           { role: 'user', content: 'Hello, I\'m interested in your premium plan.' },
//           { role: 'assistant', content: 'That\'s great! I\'d be happy to tell you more about our premium plan.' },
//           { role: 'assistant', content: 'Our premium plan includes 24/7 support, unlimited storage, and access to exclusive features.' },
//           { role: 'user', content: 'That sounds great, thank you!' },
//         ],
//       },
//     ],
//   },
// ];

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

//   return (
//     <div className="h-full flex flex-col">
//       <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
//       <ScrollArea className="flex-grow">
//         <AnimatePresence mode="wait">
//           {!selectedClient ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               {mockClients.map((client) => (
//                 <div
//                   key={client.id}
//                   className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedClient(client)}
//                 >
//                   <div>
//                     <p className="font-medium">{client.name}</p>
//                     <p className="text-sm text-gray-400 truncate">{client.lastMessage}</p>
//                   </div>
//                   <ChevronRight size={20} className="text-gray-400" />
//                 </div>
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <button
//                 className="mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
//                 onClick={() => {
//                   setSelectedClient(null);
//                   setSelectedChat(null);
//                 }}
//               >
//                 ← Back to clients
//               </button>
//               <h4 className="font-medium mb-2">{selectedClient.name}</h4>
//               {selectedClient.chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedChat(chat)}
//                 >
//                   <p className="text-sm text-gray-400">
//                     {chat.messages[chat.messages.length - 1].content}
//                   </p>
//                 </div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </ScrollArea>
//       {selectedChat && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           transition={{ duration: 0.3 }}
//           className="mt-4 border-t border-[#545454] pt-4"
//         >
//           <button
//             className="mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
//             onClick={() => setSelectedChat(null)}
//           >
//             ← Back to conversation list
//           </button>
//           <ScrollArea className="h-64">
//             {selectedChat.messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex items-start mb-4 ${
//                   message.role === 'assistant' ? 'justify-start' : 'justify-end'
//                 }`}
//               >
//                 {message.role === 'assistant' && (
//                   <MessageCircle size={24} className="mr-2 text-blue-400" />
//                 )}
//                 <div
//                   className={`max-w-[80%] p-3 rounded-lg ${
//                     message.role === 'assistant'
//                       ? 'bg-blue-500/20 text-white'
//                       : 'bg-gray-700 text-white'
//                   }`}
//                 >
//                   {message.content}
//                 </div>
//                 {message.role === 'user' && (
//                   <User size={24} className="ml-2 text-gray-400" />
//                 )}
//               </div>
//             ))}
//           </ScrollArea>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default AutomationChats;

//woorrkkiinngg

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronRight, MessageCircle, User } from 'lucide-react';
// import { ScrollArea } from '@/components/ui/scroll-area';

// interface Chat {
//   id: string;
//   messages: { role: 'user' | 'assistant'; content: string }[];
// }

// interface Client {
//   id: string;
//   name: string;
//   lastMessage: string;
//   chats: Chat[];
// }

// interface AutomationChatsProps {
//   automationId: string;
// }

// const mockClients: Client[] = [
//   {
//     id: '1',
//     name: 'John Doe',
//     lastMessage: 'Thanks for your help!',
//     chats: [
//       {
//         id: '1',
//         messages: [
//           { role: 'user', content: 'Hi, I need help with my order.' },
//           { role: 'assistant', content: 'Of course! What seems to be the problem?' },
//           { role: 'user', content: 'I haven\'t received my package yet.' },
//           { role: 'assistant', content: 'I\'m sorry to hear that. Let me check the status for you.' },
//           { role: 'assistant', content: 'Your package is currently in transit and should arrive within 2 business days.' },
//           { role: 'user', content: 'Thanks for your help!' },
//         ],
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     lastMessage: 'That sounds great, thank you!',
//     chats: [
//       {
//         id: '1',
//         messages: [
//           { role: 'user', content: 'Hello, I\'m interested in your premium plan.' },
//           { role: 'assistant', content: 'That\'s great! I\'d be happy to tell you more about our premium plan.' },
//           { role: 'assistant', content: 'Our premium plan includes 24/7 support, unlimited storage, and access to exclusive features.' },
//           { role: 'user', content: 'That sounds great, thank you!' },
//         ],
//       },
//     ],
//   },
// ];

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [selectedClient, setSelectedClient] = useState<Client | null>(null);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

//   return (
//     <div className="h-full flex flex-col">
//       <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
//       <ScrollArea className="flex-grow">
//         <AnimatePresence mode="wait">
//           {!selectedClient ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               {mockClients.map((client) => (
//                 <div
//                   key={client.id}
//                   className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedClient(client)}
//                 >
//                   <div>
//                     <p className="font-medium">{client.name}</p>
//                     <p className="text-sm text-gray-400 truncate">{client.lastMessage}</p>
//                   </div>
//                   <ChevronRight size={20} className="text-gray-400" />
//                 </div>
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <button
//                 className="mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
//                 onClick={() => {
//                   setSelectedClient(null);
//                   setSelectedChat(null);
//                 }}
//               >
//                 ← Back to clients
//               </button>
//               <h4 className="font-medium mb-2">{selectedClient.name}</h4>
//               {selectedClient.chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedChat(chat)}
//                 >
//                   <p className="text-sm text-gray-400">
//                     {chat.messages[chat.messages.length - 1].content}
//                   </p>
//                 </div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </ScrollArea>
//       {selectedChat && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           transition={{ duration: 0.3 }}
//           className="mt-4 border-t border-[#545454] pt-4"
//         >
//           <button
//             className="mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
//             onClick={() => setSelectedChat(null)}
//           >
//             ← Back to conversation list
//           </button>
//           <ScrollArea className="h-64 md:h-96">
//             {selectedChat.messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex items-start mb-4 ${
//                   message.role === 'assistant' ? 'justify-start' : 'justify-end'
//                 }`}
//               >
//                 {message.role === 'assistant' && (
//                   <MessageCircle size={24} className="mr-2 text-blue-400 flex-shrink-0" />
//                 )}
//                 <div
//                   className={`max-w-[80%] p-3 rounded-lg ${
//                     message.role === 'assistant'
//                       ? 'bg-blue-500/20 text-white'
//                       : 'bg-gray-700 text-white'
//                   }`}
//                 >
//                   {message.content}
//                 </div>
//                 {message.role === 'user' && (
//                   <User size={24} className="ml-2 text-gray-400 flex-shrink-0" />
//                 )}
//               </div>
//             ))}
//           </ScrollArea>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default AutomationChats;


// 'use client'

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronRight, MessageCircle, User } from 'lucide-react';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { getChats, Conversation, Message } from '@/actions/chats/chatAction';

// interface AutomationChatsProps {
//   automationId: string;
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true);
//       try {
//         const data = await getChats(automationId);
//         setConversations(data);
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchChats();
//   }, [automationId]);

//   if (isLoading) {
//     return <div>Loading chats...</div>;
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
//       <ScrollArea className="flex-grow">
//         <AnimatePresence mode="wait">
//           {!selectedConversation ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               {conversations.map((conversation) => (
//                 <div
//                   key={conversation.id}
//                   className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <div>
//                     <p className="font-medium">User {conversation.senderId === automationId ? conversation.reciever : conversation.senderId}</p>
//                     <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
//                   </div>
//                   <ChevronRight size={20} className="text-gray-400" />
//                 </div>
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <button
//                 className="mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
//                 onClick={() => setSelectedConversation(null)}
//               >
//                 ← Back to conversations
//               </button>
//               <h4 className="font-medium mb-2">Conversation with User {selectedConversation.senderId === automationId ? selectedConversation.reciever : selectedConversation.senderId}</h4>
//               <ScrollArea className="h-64 md:h-96">
//                 {selectedConversation.messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-start mb-4 ${
//                       message.role === 'assistant' ? 'justify-start' : 'justify-end'
//                     }`}
//                   >
//                     {message.role === 'assistant' && (
//                       <MessageCircle size={24} className="mr-2 text-blue-400 flex-shrink-0" />
//                     )}
//                     <div
//                       className={`max-w-[80%] p-3 rounded-lg ${
//                         message.role === 'assistant'
//                           ? 'bg-blue-500/20 text-white'
//                           : 'bg-gray-700 text-white'
//                       }`}
//                     >
//                       {message.content}
//                     </div>
//                     {message.role === 'user' && (
//                       <User size={24} className="ml-2 text-gray-400 flex-shrink-0" />
//                     )}
//                   </div>
//                 ))}
//               </ScrollArea>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </ScrollArea>
//     </div>
//   );
// };

// export default AutomationChats;



// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight, MessageCircle, User } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { getChatHistori } from "@/actions/webhook/queries"
// import { type Conversation, Message } from "@/types/chat"

// interface AutomationChatsProps {
//   automationId: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       try {
//         const result = await getChatHistori(automationId)
//         setConversations(result.conversations)
//       } catch (error) {
//         console.error("Error fetching chats:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   if (isLoading) {
//     return <div>Loading chats...</div>
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
//       <ScrollArea className="flex-grow">
//         <AnimatePresence mode="wait">
//           {!selectedConversation ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               {conversations.map((conversation) => (
//                 <div
//                   key={conversation.userId}
//                   className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <div>
//                     <p className="font-medium">User {conversation.userId}</p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                   <ChevronRight size={20} className="text-gray-400" />
//                 </div>
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <button
//                 className="mb-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
//                 onClick={() => setSelectedConversation(null)}
//               >
//                 ← Back to conversations
//               </button>
//               <h4 className="font-medium mb-2">Conversation with User {selectedConversation.userId}</h4>
//               <ScrollArea className="h-64 md:h-96">
//                 {selectedConversation.messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-start mb-4 ${
//                       message.role === "assistant" ? "justify-start" : "justify-end"
//                     }`}
//                   >
//                     {message.role === "assistant" && (
//                       <MessageCircle size={24} className="mr-2 text-blue-500 flex-shrink-0" />
//                     )}
//                     <div
//                       className={`max-w-[80%] p-3 rounded-lg ${
//                         message.role === "assistant"
//                           ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
//                           : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
//                       }`}
//                     >
//                       {message.content}
//                     </div>
//                     {message.role === "user" && <User size={24} className="ml-2 text-gray-500 flex-shrink-0" />}
//                   </div>
//                 ))}
//               </ScrollArea>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </ScrollArea>
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight, MessageCircle, User } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { getChatHistori } from "@/actions/webhook/queries"
// import { type Conversation, Message } from "@/types/chat"

// interface AutomationChatsProps {
//   automationId: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         console.log(`Fetching chat history for automation ID: ${automationId}`)
//         const result = await getChatHistori(automationId)
//         console.log("Chat history result:", result)

//         if (result && result.conversations) {
//           setConversations(result.conversations)
//           console.log(`Successfully fetched ${result.conversations.length} conversations`)
//         } else {
//           throw new Error("Invalid response structure from getChatHistori")
//         }
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   if (isLoading) {
//     return <div>Loading chats...</div>
//   }

//   if (error) {
//     return <div className="text-red-500">Error: {error}</div>
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
//       {conversations.length === 0 ? (
//         <div>No conversations found.</div>
//       ) : (
//         <ScrollArea className="flex-grow">
//           <AnimatePresence mode="wait">
//             {!selectedConversation ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {conversations.map((conversation) => (
//                   <div
//                     key={conversation.userId}
//                     className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
//                     onClick={() => {
//                       console.log("Selected conversation:", conversation)
//                       setSelectedConversation(conversation)
//                     }}
//                   >
//                     <div>
//                       <p className="font-medium">User {conversation.userId}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                     <ChevronRight size={20} className="text-gray-400" />
//                   </div>
//                 ))}
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <button
//                   className="mb-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
//                   onClick={() => {
//                     console.log("Returning to conversation list")
//                     setSelectedConversation(null)
//                   }}
//                 >
//                   ← Back to conversations
//                 </button>
//                 <h4 className="font-medium mb-2">Conversation with User {selectedConversation.userId}</h4>
//                 <ScrollArea className="h-64 md:h-96">
//                   {selectedConversation.messages.map((message, index) => (
//                     <div
//                       key={index}
//                       className={`flex items-start mb-4 ${
//                         message.role === "assistant" ? "justify-start" : "justify-end"
//                       }`}
//                     >
//                       {message.role === "assistant" && (
//                         <MessageCircle size={24} className="mr-2 text-blue-500 flex-shrink-0" />
//                       )}
//                       <div
//                         className={`max-w-[80%] p-3 rounded-lg ${
//                           message.role === "assistant"
//                             ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
//                             : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
//                         }`}
//                       >
//                         {message.content}
//                       </div>
//                       {message.role === "user" && <User size={24} className="ml-2 text-gray-500 flex-shrink-0" />}
//                     </div>
//                   ))}
//                 </ScrollArea>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </ScrollArea>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, MessageCircle, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getChatHistori } from "@/actions/webhook/queries"
import { type Conversation, Message } from "@/types/chat"

interface AutomationChatsProps {
  automationId: string
}

const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true)
      setError(null)
      try {
        console.log(`Fetching chat history for automation ID: ${automationId}`)
        const result = await getChatHistori(automationId)
        console.log("Chat history result:", result)

        if (result && result.conversations) {
          setConversations(result.conversations)
          console.log(`Successfully fetched ${result.conversations.length} conversations`)
        } else {
          throw new Error("Invalid response structure from getChatHistory")
        }
      } catch (error) {
        console.error("Error in fetchChats:", error)
        setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChats()
  }, [automationId])

  if (isLoading) {
    return <div>Loading chats...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
      {conversations.length === 0 ? (
        <div>No conversations found.</div>
      ) : (
        <ScrollArea className="flex-grow">
          <AnimatePresence mode="wait">
            {!selectedConversation ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {conversations.map((conversation) => (
                  <div
                    key={conversation.userId}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      console.log("Selected conversation:", conversation)
                      setSelectedConversation(conversation)
                    }}
                  >
                    <div>
                      <p className="font-medium">User {conversation.userId}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className="mb-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                  onClick={() => {
                    console.log("Returning to conversation list")
                    setSelectedConversation(null)
                  }}
                >
                  ← Back to conversations
                </button>
                <h4 className="font-medium mb-2">Conversation with User {selectedConversation.userId}</h4>
                <ScrollArea className="h-64 md:h-96">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start mb-4 ${
                        message.role === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <MessageCircle size={24} className="mr-2 text-blue-500 flex-shrink-0" />
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "assistant"
                            ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.role === "user" && <User size={24} className="ml-2 text-gray-500 flex-shrink-0" />}
                    </div>
                  ))}
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      )}
    </div>
  )
}

export default AutomationChats

