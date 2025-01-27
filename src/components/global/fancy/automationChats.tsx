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
//           throw new Error("Invalid response structure from getChatHistory")
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

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight, MessageCircle, User } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { getConversationHistory } from "@/actions/chats/queries"
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
//         const result = await getConversationHistory(automationId)
//         console.log("Chat history result:", result)

//         if (result) {
//           setConversations(result)
//           console.log(`Successfully fetched ${result.length} conversations`)
//         } else {
//           throw new Error("Invalid response structure from getConversationHistory")
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

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight, MessageCircle, User } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { getConversationHistory } from "@/actions/chats/queries"
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
//         const result = await getConversationHistory(automationId)
//         console.log("Chat history result:", result)

//         setConversations(result)
//         console.log(`Successfully fetched ${result.length} conversations`)
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

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight, MessageCircle, User } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { getConversationHistory } from "@/actions/chats/queries"
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
//         const result = await getConversationHistory(automationId)
//         console.log("Chat history result:", result)

//         setConversations(result)
//         console.log(`Successfully fetched ${result.length} conversations`)
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
//       <h3 className="text-lg font-semibold mb-4">Recent Dms</h3>
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
//                     key={conversation.chatId}
//                     className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
//                     onClick={() => {
//                       console.log("Selected conversation:", conversation)
//                       setSelectedConversation(conversation)
//                     }}
//                   >
//                     <div>
//                       <p className="font-medium">Chat ID: {conversation.chatId}</p>
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
//                 <h4 className="font-medium mb-2">Conversation: {selectedConversation.chatId}</h4>
//                 <ScrollArea className="h-64 md:h-96">
//                   {selectedConversation.messages.map((message, index) => (
//                     <div
//                       key={message.id}
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
//                         <p>{message.content}</p>
//                         <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
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

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight, MessageCircle, User, Send } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // You may want to replace this with an actual bot ID

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         console.log(`Fetching chat history for automation ID: ${automationId}`)
//         const result = await getConversationHistory(automationId)
//         console.log("Chat history result:", result)

//         setConversations(result)
//         console.log(`Successfully fetched ${result.length} conversations`)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     // Here you would typically call your API to send the message and get a response
//     // For now, we'll just simulate a response after a short delay
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 1000)
//   }

//   const getFancyName = (userId: string) => {
//     return `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) {
//     return <div>Loading chats...</div>
//   }

//   if (error) {
//     return <div className="text-red-500">Error: {error}</div>
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       <h3 className="text-lg font-semibold p-4 bg-white dark:bg-gray-900">Recent Conversations</h3>
//       {conversations.length === 0 ? (
//         <div className="p-4">No conversations found.</div>
//       ) : (
//         <div className="flex-grow flex overflow-hidden">
//           <ScrollArea className="w-1/3 border-r border-gray-200 dark:border-gray-700">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {conversations.map((conversation) => (
//                   <div
//                     key={conversation.chatId}
//                     className="flex items-center p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                     onClick={() => setSelectedConversation(conversation)}
//                   >
//                     <Avatar className="w-10 h-10">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-3 flex-grow">
//                       <p className="font-medium">{getFancyName(conversation.userId)}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                     <ChevronRight size={20} className="text-gray-400" />
//                   </div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </ScrollArea>
//           <div className="flex-grow flex flex-col">
//             {selectedConversation ? (
//               <>
//                 <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
//                   <h4 className="font-medium">Chat with {getFancyName(selectedConversation.userId)}</h4>
//                 </div>
//                 <ScrollArea className="flex-grow p-4">
//                   <AnimatePresence>
//                     {selectedConversation.messages.map((message) => (
//                       <motion.div
//                         key={message.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.2 }}
//                         className={`flex items-start mb-4 ${
//                           message.role === "assistant" ? "justify-start" : "justify-end"
//                         }`}
//                       >
//                         {message.role === "assistant" && (
//                           <Avatar className="w-8 h-8 mr-2">
//                             <AvatarImage src={BOT_AVATAR} />
//                             <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                           </Avatar>
//                         )}
//                         <div
//                           className={`max-w-[70%] p-3 rounded-lg ${
//                             message.role === "assistant"
//                               ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
//                               : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
//                           }`}
//                         >
//                           <p>{message.content}</p>
//                           <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                         </div>
//                         {message.role === "user" && (
//                           <Avatar className="w-8 h-8 ml-2">
//                             <AvatarImage
//                               src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`}
//                             />
//                             <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//                           </Avatar>
//                         )}
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </ScrollArea>
//                 <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center">
//                     <Input
//                       type="text"
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                       className="flex-grow mr-2"
//                     />
//                     <Button onClick={handleSendMessage}>
//                       <Send size={18} />
//                     </Button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex-grow flex items-center justify-center text-gray-500">
//                 Select a conversation to view messages
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // Replace with actual bot ID

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         setConversations(result)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     // Simulate bot response (replace with actual API call in production)
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 1000)
//   }

//   const getFancyName = (userId: string) => {
//     return `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) return <div className="p-4">Loading chats...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       {selectedConversation ? (
//         <>
//           <div className="p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={18} />
//             </Button>
//             <Avatar className="w-8 h-8">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//               <div className="text-xs text-green-500 flex items-center">
//                 <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
//                 Online
//               </div>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2">
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-start mb-2 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.role === "assistant" && (
//                     <Avatar className="w-6 h-6 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[80%] p-2 rounded-lg text-sm ${
//                       message.role === "assistant"
//                         ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
//                         : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </ScrollArea>
//           <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mr-2 text-sm"
//               />
//               <Button size="sm" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-white dark:bg-gray-900">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <div className="p-2 text-sm">No conversations found.</div>
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // This should be the actual ID of your bot

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const scrollRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         setConversations(result)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, []) // Removed unnecessary dependency: selectedConversation

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     // Simulate bot response (replace with actual API call in production)
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 1000)
//   }

//   const getFancyName = (userId: string) => {
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) return <div className="p-4">Loading chats...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       {selectedConversation ? (
//         <>
//           <div className="p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={16} />
//             </Button>
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//               <div className="text-xs text-green-500 flex items-center">
//                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
//                 Online
//               </div>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2" ref={scrollRef}>
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-6 h-6 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-2 rounded-lg text-sm ${
//                       message.senderId === BOT_ID
//                         ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
//                         : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-6 h-6 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </ScrollArea>
//           <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mr-2 text-sm"
//               />
//               <Button size="sm" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-white dark:bg-gray-900">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <div className="p-2 text-sm">No conversations found.</div>
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // This should be the actual ID of your bot

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isRecording, setIsRecording] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         setConversations(result)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation]) //Corrected dependency

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     // Simulate bot typing
//     setIsTyping(true)

//     // Simulate bot response (replace with actual API call in production)
//     setTimeout(() => {
//       setIsTyping(false)
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 2000)
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//     // Implement actual voice recording logic here
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Implement file upload logic here
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) return <div className="p-4">Loading chats...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       {selectedConversation ? (
//         <>
//           <div className="p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={16} />
//             </Button>
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//               <div className="text-xs text-green-500 flex items-center">
//                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
//                 Online
//               </div>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2" ref={scrollRef}>
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-6 h-6 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-2 rounded-lg text-sm ${
//                       message.senderId === BOT_ID
//                         ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded-bl-none"
//                         : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 rounded-br-none"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-6 h-6 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-gray-500 dark:text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Smile className="h-4 w-4" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} />
//                 </PopoverContent>
//               </Popover>
//               <Input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
//               <label htmlFor="file-upload">
//                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" as="span">
//                   <Paperclip className="h-4 w-4" />
//                 </Button>
//               </label>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={`h-8 w-8 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                 onClick={handleVoiceMessage}
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm"
//               />
//               <Button size="sm" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-white dark:bg-gray-900">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <div className="p-2 text-sm">No conversations found.</div>
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // This should be the actual ID of your bot

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isRecording, setIsRecording] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         setConversations(result)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation]) //Corrected dependency

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     // Simulate bot typing
//     setIsTyping(true)

//     // Simulate bot response (replace with actual API call in production)
//     setTimeout(() => {
//       setIsTyping(false)
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 2000)
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//     // Implement actual voice recording logic here
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Implement file upload logic here
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) return <div className="p-4">Loading chats...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       {selectedConversation ? (
//         <>
//           <div className="p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={16} />
//             </Button>
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//               <div className="text-xs text-green-500 flex items-center">
//                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
//                 Online
//               </div>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2" ref={scrollRef}>
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-6 h-6 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-2 rounded-lg text-sm ${
//                       message.senderId === BOT_ID
//                         ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded-bl-none"
//                         : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 rounded-br-none"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-6 h-6 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-gray-500 dark:text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Smile className="h-4 w-4" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} />
//                 </PopoverContent>
//               </Popover>
//               <Input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
//               <label htmlFor="file-upload">
//                 <span className="inline-block">
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Paperclip className="h-4 w-4" />
//                   </Button>
//                 </span>
//               </label>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={`h-8 w-8 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                 onClick={handleVoiceMessage}
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm"
//               />
//               <Button size="sm" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-white dark:bg-gray-900">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <div className="p-2 text-sm">No conversations found.</div>
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronRight, MessageCircle, User, Send } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "bot_id_123" // You may want to replace this with an actual bot ID

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         console.log(`Fetching chat history for automation ID: ${automationId}`)
//         const result = await getConversationHistory(automationId)
//         console.log("Chat history result:", result)

//         setConversations(result)
//         console.log(`Successfully fetched ${result.length} conversations`)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     // Here you would typically call your API to send the message and get a response
//     // For now, we'll just simulate a response after a short delay
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 1000)
//   }

//   const getFancyName = (userId: string) => {
//     return `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) {
//     return <div>Loading chats...</div>
//   }

//   if (error) {
//     return <div className="text-red-500">Error: {error}</div>
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       <h3 className="text-lg font-semibold p-4 bg-white dark:bg-gray-900">Recent Conversations</h3>
//       {conversations.length === 0 ? (
//         <div className="p-4">No conversations found.</div>
//       ) : (
//         <div className="flex-grow flex overflow-hidden">
//           <ScrollArea className="w-1/3 border-r border-gray-200 dark:border-gray-700">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {conversations.map((conversation) => (
//                   <div
//                     key={conversation.chatId}
//                     className="flex items-center p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                     onClick={() => setSelectedConversation(conversation)}
//                   >
//                     <Avatar className="w-10 h-10">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-3 flex-grow">
//                       <p className="font-medium">{getFancyName(conversation.userId)}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                     <ChevronRight size={20} className="text-gray-400" />
//                   </div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </ScrollArea>
//           <div className="flex-grow flex flex-col">
//             {selectedConversation ? (
//               <>
//                 <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
//                   <h4 className="font-medium">Chat with {getFancyName(selectedConversation.userId)}</h4>
//                 </div>
//                 <ScrollArea className="flex-grow p-4">
//                   <AnimatePresence>
//                     {selectedConversation.messages.map((message) => (
//                       <motion.div
//                         key={message.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.2 }}
//                         className={`flex items-start mb-4 ${
//                           message.role === "assistant" ? "justify-start" : "justify-end"
//                         }`}
//                       >
//                         {message.role === "assistant" && (
//                           <Avatar className="w-8 h-8 mr-2">
//                             <AvatarImage src={BOT_AVATAR} />
//                             <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                           </Avatar>
//                         )}
//                         <div
//                           className={`max-w-[70%] p-3 rounded-lg ${
//                             message.role === "assistant"
//                               ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
//                               : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100"
//                           }`}
//                         >
//                           <p>{message.content}</p>
//                           <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                         </div>
//                         {message.role === "user" && (
//                           <Avatar className="w-8 h-8 ml-2">
//                             <AvatarImage
//                               src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`}
//                             />
//                             <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//                           </Avatar>
//                         )}
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </ScrollArea>
//                 <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center">
//                     <Input
//                       type="text"
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                       className="flex-grow mr-2"
//                     />
//                     <Button onClick={handleSendMessage}>
//                       <Send size={18} />
//                     </Button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex-grow flex items-center justify-center text-gray-500">
//                 Select a conversation to view messages
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "0417" // This should be the actual ID of your bot

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isRecording, setIsRecording] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         setConversations(result)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation]) //Corrected dependency

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     // Simulate bot typing
//     setIsTyping(true)

//     // Simulate bot response (replace with actual API call in production)
//     setTimeout(() => {
//       setIsTyping(false)
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 2000)
//   }

//   const handleEmojiSelect = (emoji: any) => {
//     setNewMessage((prev) => prev + emoji.native)
//   }

//   const handleVoiceMessage = () => {
//     setIsRecording(!isRecording)
//     // Implement actual voice recording logic here
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Implement file upload logic here
//       console.log("File selected:", file.name)
//     }
//   }

//   const getFancyName = (userId: string) => {
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) return <div className="p-4">Loading chats...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       {selectedConversation ? (
//         <>
//           <div className="p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={16} />
//             </Button>
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//               <div className="text-xs text-green-500 flex items-center">
//                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
//                 Online
//               </div>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2" ref={scrollRef}>
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-6 h-6 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-2 rounded-lg text-sm ${
//                       message.senderId === BOT_ID
//                         ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded-bl-none"
//                         : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 rounded-br-none"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-6 h-6 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-gray-500 dark:text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Smile className="h-4 w-4" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} />
//                 </PopoverContent>
//               </Popover>
//               <Input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
//               <label htmlFor="file-upload">
//                 <span className="inline-block">
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Paperclip className="h-4 w-4" />
//                   </Button>
//                 </span>
//               </label>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={`h-8 w-8 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                 onClick={handleVoiceMessage}
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm"
//               />
//               <Button size="sm" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-white dark:bg-gray-900">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <div className="p-2 text-sm">No conversations found.</div>
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"

// interface AutomationChatsProps {
//   automationId: string
// }

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // This should be the actual ID of your bot

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isRecording, setIsRecording] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         setConversations(result)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [scrollRef]) // Removed unnecessary dependency: selectedConversation

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     setIsTyping(true)

//     setTimeout(() => {
//       setIsTyping(false)
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 2000)
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
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   if (isLoading) return <div className="p-4">Loading chats...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
//       {selectedConversation ? (
//         <>
//           <div className="p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={16} />
//             </Button>
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//               <div className="text-xs text-green-500 flex items-center">
//                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
//                 Active
//               </div>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2" ref={scrollRef}>
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-6 h-6 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-2 rounded-lg text-sm ${
//                       message.senderId === BOT_ID
//                         ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded-bl-none"
//                         : "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 rounded-br-none"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-6 h-6 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-gray-500 dark:text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Smile className="h-4 w-4" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} />
//                 </PopoverContent>
//               </Popover>
//               <Input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
//               <label htmlFor="file-upload">
//                 <span className="inline-block">
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Paperclip className="h-4 w-4" />
//                   </Button>
//                 </span>
//               </label>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={`h-8 w-8 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                 onClick={handleVoiceMessage}
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm"
//               />
//               <Button size="sm" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-white dark:bg-gray-900">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <div className="p-2 text-sm">No conversations found.</div>
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats


// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // This should be the actual ID of your bot

// interface AutomationChatsProps {
//   automationId: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         setConversations(result)
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [selectedConversation])

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     setIsTyping(true)

//     setTimeout(() => {
//       setIsTyping(false)
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 2000)
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
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden text-gray-900 dark:text-gray-100">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">Error: {error}</div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={16} />
//             </Button>
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2 bg-gray-900" ref={scrollRef}>
//             {selectedConversation.messages.map((message) => (
//               <motion.div
//                 key={message.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//               >
//                 <div
//                   className={`max-w-[75%] p-2 rounded-lg text-sm ${
//                     message.senderId === BOT_ID
//                       ? "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100 rounded-bl-none"
//                       : "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100 rounded-br-none"
//                   }`}
//                 >
//                   <p>{message.content}</p>
//                   <p className="text-xs text-gray-400 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                 </div>
//                 {message.senderId !== BOT_ID && (
//                   <Avatar className="w-6 h-6 ml-2">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                     <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                 )}
//               </motion.div>
//             ))}
//             {isTyping && (
//               <div className="flex items-center text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-2 bg-gray-800 border-t border-gray-700">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Smile className="h-4 w-4" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0 bg-gray-800 border-gray-700">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//               <Button size="sm" onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
//                 <Send size={16} />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={`h-8 w-8 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                 onClick={handleVoiceMessage}
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <label htmlFor="file-upload">
//                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-2">
//                   <Paperclip className="h-4 w-4" />
//                 </Button>
//               </label>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-gray-800">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={setSelectedConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, User, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory } from "@/actions/chats/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291" // This should be the actual ID of your bot

// interface AutomationChatsProps {
//   automationId: string
//   excludedChatId?: string
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId, excludedChatId }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const scrollRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const fetchChats = async () => {
//       setIsLoading(true)
//       setError(null)
//       try {
//         const result = await getConversationHistory(automationId)
//         const filteredConversations = result.filter((conv) => conv.chatId !== excludedChatId)
//         setConversations(filteredConversations)
//         // Initialize unread chats
//         setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
//       } catch (error) {
//         console.error("Error in fetchChats:", error)
//         setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchChats()
//   }, [automationId, excludedChatId])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [scrollRef]) // Removed unnecessary dependency: selectedConversation

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !selectedConversation) return

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: newMessage,
//       senderId: selectedConversation.userId,
//       receiverId: BOT_ID,
//       timestamp: new Date(),
//     }

//     setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, tempMessage] } : null))
//     setNewMessage("")

//     setIsTyping(true)

//     setTimeout(() => {
//       setIsTyping(false)
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: `This is a simulated response to: "${newMessage}"`,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }
//       setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, botResponse] } : null))
//     }, 2000)
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
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     // Mark the chat as read
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.chatId)
//       return newUnreadChats
//     })
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden text-gray-900 dark:text-gray-100">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">Error: {error}</div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
//             <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={16} />
//             </Button>
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2 flex-grow">
//               <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-2 bg-gray-900" ref={scrollRef}>
//             {selectedConversation.messages.map((message) => (
//               <motion.div
//                 key={message.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//               >
//                 <div
//                   className={`max-w-[75%] p-2 rounded-lg text-sm ${
//                     message.senderId === BOT_ID
//                       ? "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100 rounded-bl-none"
//                       : "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100 rounded-br-none"
//                   }`}
//                 >
//                   <p>{message.content}</p>
//                   <p className="text-xs text-gray-400 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                 </div>
//                 {message.senderId !== BOT_ID && (
//                   <Avatar className="w-6 h-6 ml-2">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                     <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                   </Avatar>
//                 )}
//               </motion.div>
//             ))}
//             {isTyping && (
//               <div className="flex items-center text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-2 bg-gray-800 border-t border-gray-700">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Smile className="h-4 w-4" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0 bg-gray-800 border-gray-700">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//               <Button size="sm" onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
//                 <Send size={16} />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={`h-8 w-8 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                 onClick={handleVoiceMessage}
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <label htmlFor="file-upload">
//                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-2">
//                   <Paperclip className="h-4 w-4" />
//                 </Button>
//               </label>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-sm font-semibold p-2 bg-gray-800">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={setSelectedConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                   onClick={() => handleSelectConversation(conversation)}
//                 >
//                   <Avatar className="w-8 h-8 relative">
//                     <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                     <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                     {unreadChats.has(conversation.chatId) && (
//                       <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                     )}
//                   </Avatar>
//                   <div className="ml-2 flex-grow overflow-hidden">
//                     <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                     <p className="text-xs text-gray-400 truncate">
//                       {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </>
//       )}
//     </div>
//   )
// }

// export default AutomationChats

"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getConversationHistory, storeConversation } from "@/actions/chats/queries"
import { matchKeyword, getKeywordAutomation } from "@/actions/webhook/queries"
import { sendPrivateMessage } from "@/lib/fetch"
import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
import type { Conversation, Message } from "@/types/chat"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import ExampleConversations from "./exampleConvo"

const BOT_NAME = "AiAssist"
const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
const BOT_ID = "17841444435951291"

interface AutomationChatsProps {
  automationId: string
  excludedChatId?: string
  userId: string
  token: string
  pageId: string
  businessVariables: {
    business_name: string
    welcome_message: string
    business_industry: string
  }
}

const AutomationChats: React.FC<AutomationChatsProps> = ({
  automationId,
  excludedChatId,
  userId,
  token,
  pageId,
  businessVariables,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
  const [isConversationActive, setIsConversationActive] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchChats = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getConversationHistory(automationId)
      const filteredConversations = result.filter((conv) => conv.chatId !== excludedChatId)
      setConversations(filteredConversations)
      setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
    } catch (error) {
      console.error("Error in fetchChats:", error)
      setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }, [automationId, excludedChatId])

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [scrollRef])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    setIsTyping(true)

    try {
      // Check if conversation is active or if there's a keyword match
      if (!isConversationActive) {
        const matcher = await matchKeyword(newMessage)
        if (matcher && matcher.automationId) {
          setIsConversationActive(true)
        } else {
          // No keyword match and conversation not active, don't respond
          setIsTyping(false)
          return
        }
      }

      // Create Voiceflow user if not exists
      await createVoiceflowUser(userId)

      // Get Voiceflow response
      const response = await getVoiceflowResponse(newMessage, userId, businessVariables)
      const voiceflowResponse = processVoiceflowResponse(response)

      // Send message using Instagram API
      await sendPrivateMessage(pageId, selectedConversation.userId, newMessage, token)

      // Store conversation
      await storeConversation(pageId, selectedConversation.userId, newMessage, voiceflowResponse, automationId)

      // Update UI
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: newMessage,
        senderId: userId,
        receiverId: selectedConversation.userId,
        timestamp: new Date(),
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: voiceflowResponse,
        senderId: BOT_ID,
        receiverId: selectedConversation.userId,
        timestamp: new Date(),
      }

      setSelectedConversation((prev) =>
        prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
      )

      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsTyping(false)
    }
  }

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
    return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setUnreadChats((prev) => {
      const newUnreadChats = new Set(prev)
      newUnreadChats.delete(conversation.chatId)
      return newUnreadChats
    })
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden text-gray-900 dark:text-gray-100">
      {isLoading ? (
        <div className="p-4 text-gray-300">Loading chats...</div>
      ) : error ? (
        <div className="p-4 text-red-500">Error: {error}</div>
      ) : selectedConversation ? (
        <>
          <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center">
            <Button variant="ghost" className="mr-2 p-1" onClick={() => setSelectedConversation(null)}>
              <ArrowLeft size={16} />
            </Button>
            <Avatar className="w-6 h-6">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
              <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-grow">
              <h4 className="font-medium text-sm">{getFancyName(selectedConversation.userId)}</h4>
            </div>
          </div>
          <ScrollArea className="flex-grow p-2 bg-gray-900" ref={scrollRef}>
            {selectedConversation.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end mb-2 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[75%] p-2 rounded-lg text-sm ${
                    message.senderId === BOT_ID
                      ? "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100 rounded-bl-none"
                      : "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100 rounded-br-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
                </div>
                {message.senderId !== BOT_ID && (
                  <Avatar className="w-6 h-6 ml-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
                    <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex items-center text-gray-400">
                <span className="animate-pulse mr-2">●</span>
                <span className="animate-pulse mr-2">●</span>
                <span className="animate-pulse">●</span>
              </div>
            )}
          </ScrollArea>
          <div className="p-2 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Smile className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 bg-gray-800 border-gray-700">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                </PopoverContent>
              </Popover>
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow mx-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <Button size="sm" onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Send size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
                onClick={handleVoiceMessage}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
              <label htmlFor="file-upload">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full ml-2">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </label>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-sm font-semibold p-2 bg-gray-800">Recent Chats</h3>
          <ScrollArea className="flex-grow">
            {conversations.length === 0 ? (
              <ExampleConversations onSelectConversation={setSelectedConversation} />
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.chatId}
                  className="flex items-center p-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <Avatar className="w-8 h-8 relative">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
                    <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
                    {unreadChats.has(conversation.chatId) && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
                    )}
                  </Avatar>
                  <div className="ml-2 flex-grow overflow-hidden">
                    <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </>
      )}
    </div>
  )
}

export default AutomationChats

