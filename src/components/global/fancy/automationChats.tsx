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

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory, storeConversation } from "@/actions/chats/queries"
// import { matchKeyword, getKeywordAutomation } from "@/actions/webhook/queries"
// import { sendPrivateMessage } from "@/lib/fetch"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { getInstagramToken } from "@/actions/token/getToken"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"

// interface AutomationChatsProps {
//   automationId: string
//   excludedChatId?: string
//   userId: string
//   pageId: string
//   businessVariables: {
//     business_name: string
//     welcome_message: string
//     business_industry: string
//   }
// }

// const AutomationChats: React.FC<AutomationChatsProps> = ({
//   automationId,
//   excludedChatId,
//   userId,
//   pageId,
//   businessVariables,
// }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([])
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
//   const [newMessage, setNewMessage] = useState("")
//   const [isTyping, setIsTyping] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [isConversationActive, setIsConversationActive] = useState(false)
//   const [token, setToken] = useState<string | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== excludedChatId)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))

//       // Fetch the Instagram token
//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)
//     } catch (error) {
//       console.error("Error in fetchChats:", error)
//       setError(`Failed to fetch chats: ${error instanceof Error ? error.message : String(error)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [automationId, excludedChatId])

//   useEffect(() => {
//     fetchChats()
//   }, [fetchChats])

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [scrollRef.current]) //Corrected useEffect dependency

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token) return

//     setIsTyping(true)

//     try {
//       // Check if conversation is active or if there's a keyword match
//       if (!isConversationActive) {
//         const matcher = await matchKeyword(newMessage)
//         if (matcher && matcher.automationId) {
//           setIsConversationActive(true)
//         } else {
//           // No keyword match and conversation not active, don't respond
//           setIsTyping(false)
//           return
//         }
//       }

//       // Create Voiceflow user if not exists
//       await createVoiceflowUser(userId)

//       // Get Voiceflow response
//       const response = await getVoiceflowResponse(newMessage, userId, businessVariables)
//       const voiceflowResponse = processVoiceflowResponse(response)

//       // Send message using Instagram API
//       await sendPrivateMessage(pageId, selectedConversation.userId, newMessage, token)

//       // Store conversation
//       await storeConversation(pageId, selectedConversation.userId, newMessage, voiceflowResponse, automationId)

//       // Update UI
//       const userMessage: Message = {
//         id: Date.now().toString(),
//         role: "user",
//         content: newMessage,
//         senderId: userId,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: voiceflowResponse,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }

//       setSelectedConversation((prev) =>
//         prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//       )

//       setNewMessage("")
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
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
//       ) : !token ? (
//         <div className="p-4 text-red-500">Error: Unable to fetch Instagram token</div>
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

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { matchKeyword, getKeywordAutomation } from "@/actions/webhook/queries"
// import { sendPrivateMessage } from "@/lib/fetch"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { getInstagramToken } from "@/actions/token/getToken"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291" // Replace with your constant value

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
//   const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set())
//   const [isConversationActive, setIsConversationActive] = useState(false)
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))

//       // Set pageId from the first conversation if available
//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       // Fetch the Instagram token
//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)
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
//   }, [scrollRef]) // Removed unnecessary dependency: selectedConversation

  

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       // Check if conversation is active or if there's a keyword match
//       if (!isConversationActive) {
//         const matcher = await matchKeyword(newMessage)
//         if (matcher && matcher.automationId) {
//           setIsConversationActive(true)
//         } else {
//           // No keyword match and conversation not active, don't respond
//           setIsTyping(false)
//           return
//         }
//       }


//       // Create Voiceflow user if not exists
//       await createVoiceflowUser(selectedConversation.userId)

//       // Get Voiceflow response
//       const response = await getVoiceflowResponse(newMessage, selectedConversation.userId,businessVariables)
//       const voiceflowResponse = processVoiceflowResponse(response)

//       // Send message using Instagram API
//       await sendPrivateMessage(pageId, selectedConversation.userId, newMessage, token)

//       // Store conversation
//       await storeConversation(pageId, selectedConversation.userId, newMessage, voiceflowResponse, automationId)

//       // Update UI
//       const userMessage: Message = {
//         id: Date.now().toString(),
//         role: "user",
//         content: newMessage,
//         senderId: selectedConversation.userId,
//         receiverId: pageId,
//         timestamp: new Date(),
//       }

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: voiceflowResponse,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }

//       setSelectedConversation((prev) =>
//         prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//       )

//       setNewMessage("")
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.chatId)
//       return newUnreadChats
//     })
//   }

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     }
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden text-gray-900 dark:text-gray-100">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">Error: {error}</div>
//       ) : !token ? (
//         <div className="p-4 text-red-500">Error: Unable to fetch Instagram token</div>
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
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-8 h-8 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-2 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleDeleteConversation(conversation)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </Button>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { matchKeyword, getKeywordAutomation } from "@/actions/webhook/queries"
// import { sendPrivateMessage } from "@/lib/fetch"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { getInstagramToken } from "@/actions/token/getToken"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import { client } from "@/lib/prisma"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "your-excluded-chat-id-here" // Replace with your constant value

// interface AutomationChatsProps {
//   automationId: string
// }

// interface BusinessVariables {
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
//   const [isConversationActive, setIsConversationActive] = useState(false)
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))

//       // Set pageId from the first conversation if available
//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       // Fetch the Instagram token
//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)

//       // Fetch business variables
//       const automation = await client.automation.findUnique({
//         where: { id: automationId },
//         include: { User: true },
//       })

//       if (automation?.User?.id) {
//         console.log("Fetching business for automation userId:", automation.User.id)
//         try {
//           const business = await client.business.findFirst({
//             where: { userId: automation.User.id },
//           })
//           console.log("Fetched business:", business)

//           if (business) {
//             const newBusinessVariables = {
//               business_name: business.businessName,
//               welcome_message: business.welcomeMessage,
//               business_industry: business.industry,
//             }
//             setBusinessVariables(newBusinessVariables)
//             console.log("Set business variables:", newBusinessVariables)
//           }
//         } catch (error) {
//           console.error("Error fetching business:", error)
//         }
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
//   }, [scrollRef])

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       // Check if conversation is active or if there's a keyword match
//       if (!isConversationActive) {
//         const matcher = await matchKeyword(newMessage)
//         if (matcher && matcher.automationId) {
//           setIsConversationActive(true)
//         } else {
//           // No keyword match and conversation not active, don't respond
//           setIsTyping(false)
//           return
//         }
//       }

//       // Create Voiceflow user if not exists
//       await createVoiceflowUser(selectedConversation.userId)

//       // Get Voiceflow response
//       const response = await getVoiceflowResponse(newMessage, selectedConversation.userId, newBusinessVariables)
//       const voiceflowResponse = processVoiceflowResponse(response)

//       // Send message using Instagram API
//       await sendPrivateMessage(pageId, selectedConversation.userId, newMessage, token)

//       // Store conversation
//       await storeConversation(pageId, selectedConversation.userId, newMessage, voiceflowResponse, automationId)

//       // Update UI
//       const userMessage: Message = {
//         id: Date.now().toString(),
//         role: "user",
//         content: newMessage,
//         senderId: selectedConversation.userId,
//         receiverId: pageId,
//         timestamp: new Date(),
//       }

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: voiceflowResponse,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }

//       setSelectedConversation((prev) =>
//         prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//       )

//       setNewMessage("")
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.chatId)
//       return newUnreadChats
//     })
//   }

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     }
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden text-gray-900 dark:text-gray-100">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">Error: {error}</div>
//       ) : !token ? (
//         <div className="p-4 text-red-500">Error: Unable to fetch Instagram token</div>
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
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-8 h-8 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-2 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleDeleteConversation(conversation)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </Button>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { matchKeyword, getKeywordAutomation, trackResponses, createChatHistory } from "@/actions/webhook/queries"
// import { sendPrivateMessage } from "@/lib/fetch"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import { client } from "@/lib/prisma"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "your-excluded-chat-id-here" // Replace with your constant value

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
//   const [isConversationActive, setIsConversationActive] = useState(false)
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))

//       // Set pageId from the first conversation if available
//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       // Fetch the Instagram token
//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)

//       // Fetch business variables
//       const automation = await findAutomation(automationId)

//       if (automation?.userId) {
//         console.log("Fetching business for automation userId:", automation.userId)
//         try {
//           const business = await client.business.findFirst({
//             where: { userId: automation.userId },
//           })
//           console.log("Fetched business:", business)

//           if (business) {
//             const newBusinessVariables: BusinessVariables = {
//               business_name: business.businessName || "",
//               welcome_message: business.welcomeMessage || "",
//               business_industry: business.industry || "",
//             }
//             setBusinessVariables(newBusinessVariables)
//             console.log("Set business variables:", newBusinessVariables)
//           }
//         } catch (error) {
//           console.error("Error fetching business:", error)
//         }
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
//   })

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`

//       // Check if the conversation is already active
//       const conversationState = await client.conversationState.findUnique({
//         where: { userId },
//       })

//       let isConversationActive = conversationState?.isActive || false

//       if (!isConversationActive) {
//         // If the conversation is not active, check for keyword match
//         const matcher = await matchKeyword(newMessage)

//         if (!matcher || !matcher.automationId) {
//           // No keyword match and conversation not active, don't respond
//           setIsTyping(false)
//           return
//         }

//         // Keyword matched, set the conversation as active
//         await client.conversationState.upsert({
//           where: { userId },
//           update: { isActive: true, updatedAt: new Date() },
//           create: { userId, isActive: true },
//         })
//         isConversationActive = true
//       }

//       console.log("Attempting to create Voiceflow user:", userId)
//       const userCreated = await createVoiceflowUser(userId)
//       if (!userCreated) {
//         console.warn(`Failed to create Voiceflow user: ${userId}. Proceeding with the request.`)
//       }

//       let automation
//       const matcher = await matchKeyword(newMessage)
//       if (matcher && matcher.automationId) {
//         automation = await getKeywordAutomation(matcher.automationId, true)
//       } else {
//         const customer_history = await getConversationHistory(automationId)
//         if (customer_history.length > 0) {
//           automation = await findAutomation(automationId)
//         }
//       }

//       let voiceflowResponse =
//         "I'm sorry, but I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."

//       try {
//         const response = await getVoiceflowResponse(newMessage, userId, businessVariables as Record<string, string>)
//         voiceflowResponse = processVoiceflowResponse(response)
//       } catch (error) {
//         console.error("Error getting or processing Voiceflow response:", error)
//       }

//       console.log("Processed Voiceflow response:", voiceflowResponse)

//       // Store the conversation
//       await storeConversation(pageId, selectedConversation.userId, newMessage, voiceflowResponse, automationId)
//       console.log("Conversation stored successfully")

//       // Send the message
//       const messageSent = await sendPrivateMessage(pageId, selectedConversation.userId, voiceflowResponse, token)

//       if (messageSent.status === 200) {
//         if (automation) {
//           await trackResponses(automationId, "DM")
//         }
//         await createChatHistory(automationId, pageId, selectedConversation.userId, newMessage)
//         await createChatHistory(automationId, pageId, selectedConversation.userId, voiceflowResponse)
//       }

//       // Update UI
//       const userMessage: Message = {
//         id: Date.now().toString(),
//         role: "user",
//         content: newMessage,
//         senderId: selectedConversation.userId,
//         receiverId: pageId,
//         timestamp: new Date(),
//       }

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: voiceflowResponse,
//         senderId: BOT_ID,
//         receiverId: selectedConversation.userId,
//         timestamp: new Date(),
//       }

//       setSelectedConversation((prev) =>
//         prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//       )

//       setNewMessage("")
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.chatId)
//       return newUnreadChats
//     })
//   }

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     }
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden text-gray-900 dark:text-gray-100">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">Error: {error}</div>
//       ) : !token ? (
//         <div className="p-4 text-red-500">Error: Unable to fetch Instagram token</div>
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
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-8 h-8 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-2 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleDeleteConversation(conversation)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </Button>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { matchKeyword, getKeywordAutomation, trackResponses, createChatHistory } from "@/actions/webhook/queries"
// import { sendPrivateMessage } from "@/lib/fetch"
// import { getVoiceflowResponse, processVoiceflowResponse, createVoiceflowUser } from "@/lib/voiceflow"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"

// const BOT_NAME = "AiAssist"
// const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
// const BOT_ID = "17841444435951291"
// const EXCLUDED_CHAT_ID = "17841444435951291" // Replace with your constant value

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
//   const [isConversationActive, setIsConversationActive] = useState(false)
//   const [token, setToken] = useState<string | null>(null)
//   const [pageId, setPageId] = useState<string | null>(null)
//   const [businessVariables, setBusinessVariables] = useState<BusinessVariables>({
//     business_name: "",
//     welcome_message: "",
//     business_industry: "",
//   })
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))

//       // Set pageId from the first conversation if available
//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       // Fetch the Instagram token
//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)

//       // Fetch business variables
//       const automation = await findAutomation(automationId)

//       if (automation?.userId) {
//         console.log("Fetching business for automation userId:", automation.userId)
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//           console.log("Set business variables:", businessData)
//         }
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
//   })

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage && result.botMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           timestamp: result.userMessage.timestamp,
//         }

//         const botMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: result.botMessage.content,
//           senderId: BOT_ID,
//           receiverId: selectedConversation.userId,
//           timestamp: result.botMessage.timestamp,
//         }

//         setSelectedConversation((prev) =>
//           prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//         )

//         setNewMessage("")
//       } else {
//         setError(`Failed to send message: ${result.message || "Unknown error"}`)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     // return userId === BOT_ID ? BOT_NAME : `Client ${userId.slice(-4)}`
//     return '@Cashe'
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.chatId)
//       return newUnreadChats
//     })
//   }

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
//     }
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden text-gray-900 dark:text-gray-100">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-white-500">Try Connecting your instagram on the integrations tab first. </div>
//       ) : !token ? (
//         <div className="p-4 text-white-500">Instagram not connected yet. Please connect your instagram account first.</div>
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
//           <div className="p-2 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-t border-gray-700">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                     <Smile className="h-4 w-4" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-gray-700">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-white dark:bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] text-gray-900 dark:text-gray-100"
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
//           <h3 className="text-sm font-semibold p-2 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D]">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={setSelectedConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <div
//                   key={conversation.chatId}
//                   className="flex items-center p-2 hover:bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] cursor-pointer transition-colors duration-200"
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-8 h-8 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-2 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleDeleteConversation(conversation)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </Button>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2 } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

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
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))

//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
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
//   })

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage && result.botMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           timestamp: result.userMessage.timestamp,
//         }

//         const botMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: result.botMessage.content,
//           senderId: BOT_ID,
//           receiverId: selectedConversation.userId,
//           timestamp: result.botMessage.timestamp,
//         }

//         setSelectedConversation((prev) =>
//           prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//         )

//         setNewMessage("")
//       } else {
//         setError(`Failed to send message: ${result.message || "Unknown error"}`)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return "@Cashe"
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setUnreadChats((prev) => {
//       const newUnreadChats = new Set(prev)
//       newUnreadChats.delete(conversation.chatId)
//       return newUnreadChats
//     })
//   }

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
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

//   return (
//     <div className="h-full flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-lg overflow-hidden text-gray-100">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-white-500">Try connecting your Instagram on the integrations tab first.</div>
//       ) : !token ? (
//         <div className="p-4 text-white-500">
//           Instagram not connected yet. Please connect your Instagram account first.
//         </div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-4 bg-gradient-to-r from-[#2A2A2A] to-[#252525] border-b border-gray-600 flex items-center">
//             <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={20} />
//             </Button>
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-3 flex-grow">
//               <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
//               <p className="text-sm text-gray-400">
//                 {getActivityStatus(
//                   new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                 )}
//               </p>
//             </div>
//           </div>
//           <ScrollArea
//             className="flex-grow p-4 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D]"
//             ref={scrollRef}
//           >
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-8 h-8 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-3 rounded-lg text-sm ${
//                       message.senderId === BOT_ID ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
//                     }`}
//                   >
//                     <p className="break-words">{message.content}</p>
//                     <p className="text-xs text-gray-300 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-8 h-8 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-4 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-t border-gray-600">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                     <Smile className="h-5 w-5" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-gray-600">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       size="icon"
//                       onClick={handleSendMessage}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       <Send size={18} />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Send message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                       onClick={handleVoiceMessage}
//                     >
//                       <Mic className="h-5 w-5" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Record voice message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <label htmlFor="file-upload">
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                         <Paperclip className="h-5 w-5" />
//                       </Button>
//                     </label>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Attach file</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold p-4 bg-gradient-to-r from-[#2A2A2A] to-[#252525]">Recent Chats</h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={handleSelectConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <motion.div
//                   key={conversation.chatId}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center p-4 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-10 h-10 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-blue-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-3 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end ml-2">
//                     <p className="text-xs text-gray-400">
//                       {getActivityStatus(new Date(conversation.messages[conversation.messages.length - 1].timestamp))}
//                     </p>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteConversation(conversation)}
//                             className="text-gray-400 hover:text-red-500 mt-1"
//                           >
//                             <Trash2 size={18} />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Delete conversation</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 </motion.div>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2 } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

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
//   const [displayedMessages, setDisplayedMessages] = useState(6)
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
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
//   })

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage && result.botMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           timestamp: result.userMessage.timestamp,
//         }

//         const botMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: result.botMessage.content,
//           senderId: BOT_ID,
//           receiverId: selectedConversation.userId,
//           timestamp: result.botMessage.timestamp,
//         }

//         setSelectedConversation((prev) =>
//           prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//         )

//         setNewMessage("")
//       } else {
//         setError(`Failed to send message: ${result.message || "Unknown error"}`)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return "@Cashe"
//   }

//   const loadMoreMessages = () => {
//     setDisplayedMessages((prev) => prev + 6)
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

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
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

//   return (
//     <div className="h-full flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-lg overflow-hidden text-gray-100 border border-[1px] border-gradient-to-br from-green-500 via-red-500 to-orange-500">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-white-500">Try connecting your Instagram on the integrations tab first.</div>
//       ) : !token ? (
//         <div className="p-4 text-white-500">
//           Instagram not connected yet. Please connect your Instagram account first.
//         </div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-4 bg-gradient-to-r from-[#2A2A2A] to-[#252525] border-b border-gray-600 flex items-center">
//             <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={20} />
//             </Button>
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-3 flex-grow">
//               <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
//               <p className="text-sm text-gray-400">
//                 {getActivityStatus(
//                   new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                 )}
//               </p>
//             </div>
//           </div>
//           <ScrollArea
//             className="flex-grow p-4 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D]"
//             ref={scrollRef}
//             onScrollCapture={(e) => {
//               if (e.currentTarget.scrollTop === 0) {
//                 loadMoreMessages()
//               }
//             }}
//           >
//             {selectedConversation.messages.length > displayedMessages && (
//               <Button
//                 variant="ghost"
//                 className="w-full text-sm text-gray-400 hover:text-gray-200"
//                 onClick={loadMoreMessages}
//               >
//                 Load more messages
//               </Button>
//             )}
//             <AnimatePresence>
//               {selectedConversation.messages.slice(-displayedMessages).map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-8 h-8 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-3 rounded-lg text-sm ${
//                       message.senderId === BOT_ID ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
//                     }`}
//                   >
//                     <p className="break-words">{message.content}</p>
//                     <p className="text-xs text-gray-300 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-8 h-8 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-4 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-t border-gray-600">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                     <Smile className="h-5 w-5" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-gray-600">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       size="icon"
//                       onClick={handleSendMessage}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       <Send size={18} />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Send message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                       onClick={handleVoiceMessage}
//                     >
//                       <Mic className="h-5 w-5" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Record voice message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <label htmlFor="file-upload">
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                         <Paperclip className="h-5 w-5" />
//                       </Button>
//                     </label>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Attach file</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold p-4 bg-gradient-to-r from-[#2A2A2A] to-[#252525] flex justify-between items-center">
//             <span>Recent Chats</span>
//             {totalUnreadMessages > 0 && (
//               <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                 {totalUnreadMessages}
//               </span>
//             )}
//           </h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={handleSelectConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <motion.div
//                   key={conversation.chatId}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center p-4 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-10 h-10 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-blue-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-3 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end ml-2">
//                     <p className="text-xs text-gray-400">
//                       {getActivityStatus(new Date(conversation.messages[conversation.messages.length - 1].timestamp))}
//                     </p>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteConversation(conversation)}
//                             className="text-gray-400 hover:text-red-500 mt-1"
//                           >
//                             <Trash2 size={18} />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Delete conversation</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 </motion.div>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2 } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

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
//   const [displayedMessages, setDisplayedMessages] = useState(6)
//   const [totalUnreadMessages, setTotalUnreadMessages] = useState(0)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
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
//   })

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage && result.botMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           timestamp: result.userMessage.timestamp,
//         }

//         const botMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: result.botMessage.content,
//           senderId: BOT_ID,
//           receiverId: selectedConversation.userId,
//           timestamp: result.botMessage.timestamp,
//         }

//         setSelectedConversation((prev) =>
//           prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//         )

//         setNewMessage("")
//       } else {
//         setError(`Failed to send message: ${result.message || "Unknown error"}`)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return "@Cashe"
//   }

//   const loadMoreMessages = () => {
//     setDisplayedMessages((prev) => prev + 6)
//   }

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation)
//     setDisplayedMessages(6)
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

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
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

//   return (
//     <div className="h-full flex flex-col bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] rounded-lg overflow-hidden text-gray-100 border border-[1px] border-gradient-to-br from-green-500 via-red-500 to-orange-500">
//       {isLoading ? (
//         <div className="p-4 text-gray-300">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-white-500">Try connecting your Instagram on the integrations tab first.</div>
//       ) : !token ? (
//         <div className="p-4 text-white-500">
//           Instagram not connected yet. Please connect your Instagram account first.
//         </div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-4 bg-gradient-to-r from-[#2A2A2A] to-[#252525] border-b border-gray-600 flex items-center">
//             <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={20} />
//             </Button>
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-3 flex-grow">
//               <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
//               <p className="text-sm text-gray-400">
//                 {getActivityStatus(
//                   new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                 )}
//               </p>
//             </div>
//           </div>
//           <ScrollArea
//             className="flex-grow p-4 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D]"
//             ref={scrollRef}
//           >
//             {selectedConversation.messages.length > displayedMessages && (
//               <Button
//                 variant="ghost"
//                 className="w-full text-sm text-gray-400 hover:text-gray-200 mb-4"
//                 onClick={loadMoreMessages}
//               >
//                 Load more messages
//               </Button>
//             )}
//             <AnimatePresence>
//               {selectedConversation.messages.slice(-displayedMessages).map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-8 h-8 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-3 rounded-lg text-sm ${
//                       message.senderId === BOT_ID ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
//                     }`}
//                   >
//                     <p className="break-words">{message.content}</p>
//                     <p className="text-xs text-gray-300 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-8 h-8 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-gray-400">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-4 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-t border-gray-600">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                     <Smile className="h-5 w-5" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0 bg-gradient-to-br from-[#2A2A2A] via-[#252525] to-[#1D1D1D] border-gray-600">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       size="icon"
//                       onClick={handleSendMessage}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       <Send size={18} />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Send message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                       onClick={handleVoiceMessage}
//                     >
//                       <Mic className="h-5 w-5" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Record voice message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <label htmlFor="file-upload">
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                         <Paperclip className="h-5 w-5" />
//                       </Button>
//                     </label>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Attach file</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold p-4 bg-gradient-to-r from-[#2A2A2A] to-[#252525] flex justify-between items-center">
//             <span>Recent Chats</span>
//             {totalUnreadMessages > 0 && (
//               <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                 {totalUnreadMessages}
//               </span>
//             )}
//           </h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={handleSelectConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <motion.div
//                   key={conversation.chatId}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center p-4 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-10 h-10 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-blue-500 transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-3 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-gray-200">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-gray-400 truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end ml-2">
//                     <p className="text-xs text-gray-400">
//                       {getActivityStatus(new Date(conversation.messages[conversation.messages.length - 1].timestamp))}
//                     </p>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteConversation(conversation)}
//                             className="text-gray-400 hover:text-red-500 mt-1"
//                           >
//                             <Trash2 size={18} />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Delete conversation</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 </motion.div>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

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
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       const fetchedToken = await getInstagramToken(automationId)
//       setToken(fetchedToken)

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
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
//   })

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation || !token || !pageId) return

//     setIsTyping(true)

//     try {
//       const userId = `${pageId}_${selectedConversation.userId}`
//       const result = await sendMessage(newMessage, userId, pageId, automationId, token, businessVariables)

//       if (result.success && result.userMessage && result.botMessage) {
//         const userMessage: Message = {
//           id: Date.now().toString(),
//           role: "user",
//           content: result.userMessage.content,
//           senderId: selectedConversation.userId,
//           receiverId: pageId,
//           timestamp: result.userMessage.timestamp,
//           status: "sent",
//         }

//         const botMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: result.botMessage.content,
//           senderId: BOT_ID,
//           receiverId: selectedConversation.userId,
//           timestamp: result.botMessage.timestamp,
//         }

//         setSelectedConversation((prev) =>
//           prev ? { ...prev, messages: [...prev.messages, userMessage, botMessage] } : null,
//         )

//         setNewMessage("")
//       } else {
//         setError(`Failed to send message: ${result.message || "Unknown error"}`)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//       setError(`Failed to send message: ${error instanceof Error ? error.message : String(error)}`)
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
//     return "@Cashe"
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

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
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

//   return (
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">Try connecting your Instagram on the integrations tab first.</div>
//       ) : !token ? (
//         <div className="p-4 text-muted-foreground">
//           Instagram not connected yet. Please connect your Instagram account first.
//         </div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//             <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={20} />
//             </Button>
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-3 flex-grow">
//               <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
//               <p className="text-sm text-muted-foreground">
//                 {getActivityStatus(
//                   new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                 )}
//               </p>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-4 bg-background" ref={scrollRef}>
//             <AnimatePresence>
//               {selectedConversation.messages.slice(-4).map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-8 h-8 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-3 rounded-lg text-sm ${
//                       message.senderId === BOT_ID ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
//                     }`}
//                   >
//                     <p className="break-words">{message.content}</p>
//                     <div className="flex justify-between items-center mt-1">
//                       <p className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</p>
//                       {message.senderId !== BOT_ID && message.status === "sent" && (
//                         <div className="flex items-center text-green-500">
//                           <Check size={12} className="mr-1" />
//                           <span className="text-xs">Sent</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-8 h-8 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-muted-foreground">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-4 bg-background border-t border-primary/10">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                     <Smile className="h-5 w-5" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground"
//               />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       size="icon"
//                       onClick={handleSendMessage}
//                       className="bg-primary hover:bg-primary/90 text-primary-foreground"
//                     >
//                       <Send size={18} />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Send message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                       onClick={handleVoiceMessage}
//                     >
//                       <Mic className="h-5 w-5" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Record voice message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <label htmlFor="file-upload">
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                         <Paperclip className="h-5 w-5" />
//                       </Button>
//                     </label>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Attach file</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//             <span>Recent Chats</span>
//             {totalUnreadMessages > 0 && (
//               <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                 {totalUnreadMessages}
//               </span>
//             )}
//           </h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={handleSelectConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <motion.div
//                   key={conversation.chatId}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-10 h-10 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-3 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-muted-foreground truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end ml-2">
//                     <p className="text-xs text-muted-foreground">
//                       {getActivityStatus(new Date(conversation.messages[conversation.messages.length - 1].timestamp))}
//                     </p>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteConversation(conversation)}
//                             className="text-muted-foreground hover:text-red-500 mt-1"
//                           >
//                             <Trash2 size={18} />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Delete conversation</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 </motion.div>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

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
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       const fetchedToken = await getInstagramToken(automationId)
//       if (fetchedToken) {
//         setToken(fetchedToken)
//       } else {
//         setError("Instagram token not found. Please connect your Instagram account.")
//       }

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
//       }

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
//   })

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

//         setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, userMessage] } : null))

//         setConversations((prevConversations) =>
//           prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           ),
//         )

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
//     return "@Cashe"
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

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
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

//   return (
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : !token ? (
//         <div className="p-4 text-muted-foreground">
//           Instagram not connected yet. Please connect your Instagram account first.
//         </div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//             <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={20} />
//             </Button>
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-3 flex-grow">
//               <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
//               <p className="text-sm text-muted-foreground">
//                 {getActivityStatus(
//                   new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                 )}
//               </p>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow p-4 bg-background" ref={scrollRef}>
//             <AnimatePresence>
//               {selectedConversation.messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                 >
//                   {message.senderId === BOT_ID && (
//                     <Avatar className="w-8 h-8 mr-2">
//                       <AvatarImage src={BOT_AVATAR} />
//                       <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-[75%] p-3 rounded-lg text-sm ${
//                       message.senderId === BOT_ID ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
//                     }`}
//                   >
//                     <p className="break-words">{message.content}</p>
//                     <div className="flex justify-between items-center mt-1">
//                       <p className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</p>
//                       {message.senderId !== BOT_ID && (
//                         <div className="flex items-center text-green-500">
//                           <Check size={12} className="mr-1" />
//                           <span className="text-xs">Sent</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {message.senderId !== BOT_ID && (
//                     <Avatar className="w-8 h-8 ml-2">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                       <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                     </Avatar>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {isTyping && (
//               <div className="flex items-center text-muted-foreground">
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse mr-2">●</span>
//                 <span className="animate-pulse">●</span>
//               </div>
//             )}
//           </ScrollArea>
//           <div className="p-4 bg-background border-t border-primary/10">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                     <Smile className="h-5 w-5" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground"
//               />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       size="icon"
//                       onClick={handleSendMessage}
//                       className="bg-primary hover:bg-primary/90 text-primary-foreground"
//                     >
//                       <Send size={18} />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Send message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                       onClick={handleVoiceMessage}
//                     >
//                       <Mic className="h-5 w-5" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Record voice message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <label htmlFor="file-upload">
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                         <Paperclip className="h-5 w-5" />
//                       </Button>
//                     </label>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Attach file</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//             <span>Recent Chats</span>
//             {totalUnreadMessages > 0 && (
//               <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                 {totalUnreadMessages}
//               </span>
//             )}
//           </h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={handleSelectConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <motion.div
//                   key={conversation.chatId}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-10 h-10 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-3 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-muted-foreground truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end ml-2">
//                     <p className="text-xs text-muted-foreground">
//                       {getActivityStatus(new Date(conversation.messages[conversation.messages.length - 1].timestamp))}
//                     </p>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteConversation(conversation)}
//                             className="text-muted-foreground hover:text-red-500 mt-1"
//                           >
//                             <Trash2 size={18} />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Delete conversation</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 </motion.div>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

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
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)
//       setConversations(filteredConversations)
//       setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
//       setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

//       if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
//         setPageId(filteredConversations[0].messages[0].receiverId)
//       }

//       const fetchedToken = await getInstagramToken(automationId)
//       if (fetchedToken) {
//         setToken(fetchedToken)
//       } else {
//         setError("Instagram token not found. Please connect your Instagram account.")
//       }

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
//       }

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
//   })

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

//         setSelectedConversation((prev) => (prev ? { ...prev, messages: [...prev.messages, userMessage] } : null))

//         setConversations((prevConversations) =>
//           prevConversations.map((conv) =>
//             conv.chatId === selectedConversation.chatId ? { ...conv, messages: [...conv.messages, userMessage] } : conv,
//           ),
//         )

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
//     return "@Cashe"
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

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
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

//   return (
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : !token ? (
//         <div className="p-4 text-muted-foreground">
//           Instagram not connected yet. Please connect your Instagram account first.
//         </div>
//       ) : selectedConversation ? (
//         <>
//           <div className="p-4 bg-background border-b border-primary/10 flex items-center">
//             <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
//               <ArrowLeft size={20} />
//             </Button>
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
//               <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-3 flex-grow">
//               <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
//               <p className="text-sm text-muted-foreground">
//                 {getActivityStatus(
//                   new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                 )}
//               </p>
//             </div>
//           </div>
//           <ScrollArea className="flex-grow">
//             <div className="p-4 space-y-4" ref={scrollRef}>
//               <AnimatePresence>
//                 {selectedConversation.messages.map((message) => (
//                   <motion.div
//                     key={message.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                   >
//                     {message.senderId === BOT_ID && (
//                       <Avatar className="w-8 h-8 mr-2">
//                         <AvatarImage src={BOT_AVATAR} />
//                         <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                       </Avatar>
//                     )}
//                     <div
//                       className={`max-w-[75%] p-3 rounded-lg text-sm ${
//                         message.senderId === BOT_ID ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
//                       }`}
//                     >
//                       <p className="break-words">{message.content}</p>
//                       <div className="flex justify-between items-center mt-1">
//                         <p className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</p>
//                         {message.senderId !== BOT_ID && (
//                           <div className="flex items-center text-green-500">
//                             <Check size={12} className="mr-1" />
//                             <span className="text-xs">Sent</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     {message.senderId !== BOT_ID && (
//                       <Avatar className="w-8 h-8 ml-2">
//                         <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                         <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                       </Avatar>
//                     )}
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               {isTyping && (
//                 <div className="flex items-center text-muted-foreground">
//                   <span className="animate-pulse mr-2">●</span>
//                   <span className="animate-pulse mr-2">●</span>
//                   <span className="animate-pulse">●</span>
//                 </div>
//               )}
//             </div>
//           </ScrollArea>
//           <div className="p-4 bg-background border-t border-primary/10">
//             <div className="flex items-center">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                     <Smile className="h-5 w-5" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-0">
//                   <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                 </PopoverContent>
//               </Popover>
//               <Input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-grow mx-2 text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground"
//               />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       size="icon"
//                       onClick={handleSendMessage}
//                       className="bg-primary hover:bg-primary/90 text-primary-foreground"
//                     >
//                       <Send size={18} />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Send message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                       onClick={handleVoiceMessage}
//                     >
//                       <Mic className="h-5 w-5" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Record voice message</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//               <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <label htmlFor="file-upload">
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                         <Paperclip className="h-5 w-5" />
//                       </Button>
//                     </label>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Attach file</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//             <span>Recent Chats</span>
//             {totalUnreadMessages > 0 && (
//               <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                 {totalUnreadMessages}
//               </span>
//             )}
//           </h3>
//           <ScrollArea className="flex-grow">
//             {conversations.length === 0 ? (
//               <ExampleConversations onSelectConversation={handleSelectConversation} />
//             ) : (
//               conversations.map((conversation) => (
//                 <motion.div
//                   key={conversation.chatId}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
//                 >
//                   <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
//                     <Avatar className="w-10 h-10 relative">
//                       <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`} />
//                       <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                       {unreadChats.has(conversation.chatId) && (
//                         <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                       )}
//                     </Avatar>
//                     <div className="ml-3 flex-grow overflow-hidden">
//                       <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                       <p className="text-xs text-muted-foreground truncate">
//                         {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end ml-2">
//                     <p className="text-xs text-muted-foreground">
//                       {getActivityStatus(new Date(conversation.messages[conversation.messages.length - 1].timestamp))}
//                     </p>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteConversation(conversation)}
//                             className="text-muted-foreground hover:text-red-500 mt-1"
//                           >
//                             <Trash2 size={18} />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Delete conversation</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 </motion.div>
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
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"

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
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)

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

//       const fetchedToken = await getInstagramToken(automationId)
//       if (fetchedToken) {
//         setToken(fetchedToken)
//       } else {
//         setError("Instagram token not found. Please connect your Instagram account.")
//       }

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
//       }

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
//   })

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
//     return "@Cashe"
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

//   const handleDeleteConversation = async (conversation: Conversation) => {
//     if (!pageId) return

//     try {
//       await deleteConversation(pageId, conversation.userId)
//       setConversations((prev) => prev.filter((conv) => conv.chatId !== conversation.chatId))
//       if (selectedConversation?.chatId === conversation.chatId) {
//         setSelectedConversation(null)
//       }
//     } catch (error) {
//       console.error("Error deleting conversation:", error)
//       setError(`Failed to delete conversation: ${error instanceof Error ? error.message : String(error)}`)
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

//   return (
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
//       {isLoading ? (
//         <div className="p-4 text-muted-foreground">Loading chats...</div>
//       ) : error ? (
//         <div className="p-4 text-red-500">{error}</div>
//       ) : !token ? (
//         <div className="p-4 text-muted-foreground">
//           Instagram not connected yet. Please connect your Instagram account first.
//         </div>
//       ) : (
//         <>
//           {selectedConversation && (
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
//                   <p className="text-sm text-muted-foreground">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto">
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message) => (
//                     <motion.div
//                       key={message.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.senderId === BOT_ID && (
//                         <Avatar className="w-8 h-8 mr-2">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm ${
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
//                           {message.senderId !== BOT_ID && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       {message.senderId !== BOT_ID && (
//                         <Avatar className="w-8 h-8 ml-2">
//                           <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-80 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <Input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     className="flex-grow mx-2 text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground"
//                   />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="icon"
//                           onClick={handleSendMessage}
//                           className="bg-primary hover:bg-primary/90 text-primary-foreground"
//                         >
//                           <Send size={18} />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Send message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                           onClick={handleVoiceMessage}
//                         >
//                           <Mic className="h-5 w-5" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Record voice message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <label htmlFor="file-upload">
//                           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                             <Paperclip className="h-5 w-5" />
//                           </Button>
//                         </label>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Attach file</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </div>
//               </div>
//             </>
//           )}
//           {selectedConversation === null && (
//             <>
//               <h3 className="text-lg font-semibold p-4 bg-background flex justify-between items-center">
//                 <span>Recent Chats</span>
//                 {totalUnreadMessages > 0 && (
//                   <span className="bg-red-500 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
//                     {totalUnreadMessages}
//                   </span>
//                 )}
//               </h3>
//               <ScrollArea className="flex-grow">
//                 {conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} />
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
//                           <Avatar className="w-10 h-10 relative">
//                             <AvatarImage
//                               src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`}
//                             />
//                             <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.chatId) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
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
//     </div>
//   )
// }

// export default AutomationChats

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { getConversationHistory, storeConversation, deleteConversation } from "@/actions/chats/queries"
// import { sendMessage, fetchBusinessData } from "@/actions/messageAction/messageAction"
// import { getInstagramToken } from "@/actions/token/getToken"
// import { findAutomation } from "@/actions/automations/queries"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"

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

//   const fetchChats = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getConversationHistory(automationId)
//       const filteredConversations = result.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)

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

//       const fetchedToken = await getInstagramToken(automationId)
//       if (fetchedToken) {
//         setToken(fetchedToken)
//       } else {
//         setError("Instagram token not found. Please connect your Instagram account.")
//       }

//       const automation = await findAutomation(automationId)
//       if (automation?.userId) {
//         const businessData = await fetchBusinessData(automation.userId)
//         if (businessData) {
//           setBusinessVariables(businessData)
//         }
//       }

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
//   })

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
//     return "@Cashe"
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
//       await deleteConversation(pageId, conversationToDelete.userId)
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

//   return (
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
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
//                   <p className="text-sm text-muted-foreground">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto">
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message) => (
//                     <motion.div
//                       key={message.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.senderId === BOT_ID && (
//                         <Avatar className="w-8 h-8 mr-2">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm ${
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
//                           {message.senderId !== BOT_ID && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       {message.senderId !== BOT_ID && (
//                         <Avatar className="w-8 h-8 ml-2">
//                           <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-80 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <Input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     className="flex-grow mx-2 text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground"
//                   />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="icon"
//                           onClick={handleSendMessage}
//                           className="bg-primary hover:bg-primary/90 text-primary-foreground"
//                         >
//                           <Send size={18} />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Send message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                           onClick={handleVoiceMessage}
//                         >
//                           <Mic className="h-5 w-5" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Record voice message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <label htmlFor="file-upload">
//                           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                             <Paperclip className="h-5 w-5" />
//                           </Button>
//                         </label>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Attach file</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
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
//               <ScrollArea className="flex-grow">
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} />
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
//                           <Avatar className="w-10 h-10 relative">
//                             <AvatarImage
//                               src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`}
//                             />
//                             <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.chatId) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
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
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"

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
//   }, [selectedConversation]) //Corrected useEffect dependency

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
//     return "@Cashe"
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

//   return (
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
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
//                   <p className="text-sm text-muted-foreground">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto">
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message) => (
//                     <motion.div
//                       key={message.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.senderId === BOT_ID && (
//                         <Avatar className="w-8 h-8 mr-2">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm ${
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
//                           {message.senderId !== BOT_ID && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       {message.senderId !== BOT_ID && (
//                         <Avatar className="w-8 h-8 ml-2">
//                           <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-80 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <Input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     className="flex-grow mx-2 text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground"
//                   />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="icon"
//                           onClick={handleSendMessage}
//                           className="bg-primary hover:bg-primary/90 text-primary-foreground"
//                         >
//                           <Send size={18} />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Send message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                           onClick={handleVoiceMessage}
//                         >
//                           <Mic className="h-5 w-5" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Record voice message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <label htmlFor="file-upload">
//                           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                             <Paperclip className="h-5 w-5" />
//                           </Button>
//                         </label>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Attach file</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
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
//               <ScrollArea className="flex-grow">
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} />
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
//                           <Avatar className="w-10 h-10 relative">
//                             <AvatarImage
//                               src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.userId}`}
//                             />
//                             <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.chatId) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages[conversation.messages.length - 1]?.content ?? "No messages"}
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
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"

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
//   }, [selectedConversation]) //Corrected useEffect dependency

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

//   return (
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
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
//                   <p className="text-sm text-muted-foreground">
//                     {getActivityStatus(
//                       new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex-grow overflow-y-auto">
//                 <div className="p-4 space-y-4">
//                   {selectedConversation.messages.map((message) => (
//                     <motion.div
//                       key={message.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
//                     >
//                       {message.senderId === BOT_ID && (
//                         <Avatar className="w-8 h-8 mr-2">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm ${
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
//                           {message.senderId !== BOT_ID && (
//                             <div className="flex items-center text-green-500">
//                               <Check size={12} className="mr-1" />
//                               <span className="text-xs">Sent</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       {message.senderId !== BOT_ID && (
//                         <Avatar className="w-8 h-8 ml-2">
//                           <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-4 bg-background border-t border-primary/10">
//                 <div className="flex items-center space-x-2">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-80 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <Input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground"
//                   />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="icon"
//                           onClick={handleSendMessage}
//                           className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 sm:p-3 flex-shrink-0"
//                         >
//                           <Send size={18} />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Send message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                           onClick={handleVoiceMessage}
//                         >
//                           <Mic className="h-5 w-5" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Record voice message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <label htmlFor="file-upload">
//                           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                             <Paperclip className="h-5 w-5" />
//                           </Button>
//                         </label>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Attach file</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
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
//               <ScrollArea className="flex-grow">
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} />
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
//                           <Avatar className="w-10 h-10 relative">
//                             <AvatarImage src={`https://i.pravatar.cc/150?u=${conversation.userId}`} />
//                             <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.chatId) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                             <p className="text-xs text-muted-foreground truncate pr-2">
//                               {conversation.messages.length > 0
//                                 ? `${conversation.messages[conversation.messages.length - 1].content.slice(0, 30)}...`
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
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"
// import type { Conversation, Message } from "@/types/chat"
// import data from "@emoji-mart/data"
// import Picker from "@emoji-mart/react"
// import ExampleConversations from "./exampleConvo"
// import DeleteConfirmationModal from "./confirmDelete"

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
//   }, [selectedConversation]) //Corrected useEffect dependency

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
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
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
//               <div className="flex-grow overflow-y-auto">
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
//                         <Avatar className="w-8 h-8 mr-2">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm ${
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
//                           {message.senderId !== BOT_ID && message.role === "user" && (
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
//                 <div className="flex items-center space-x-2">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full flex-shrink-0">
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-80 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <Input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground h-12 px-4"
//                   />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="icon"
//                           onClick={handleSendMessage}
//                           className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 sm:p-3 flex-shrink-0"
//                         >
//                           <Send size={18} />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Send message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className={`h-10 w-10 rounded-full ml-2 ${isRecording ? "text-red-500" : ""}`}
//                           onClick={handleVoiceMessage}
//                         >
//                           <Mic className="h-5 w-5" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Record voice message</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <label htmlFor="file-upload">
//                           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full ml-2">
//                             <Paperclip className="h-5 w-5" />
//                           </Button>
//                         </label>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Attach file</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
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
//               <ScrollArea className="flex-grow">
//                 {!token ? (
//                   <div className="p-4 space-y-4">
//                     <ExampleConversations onSelectConversation={handleSelectConversation} />
//                     <div className="text-center">
//                       <p className="text-muted-foreground mb-2">
//                         Connect your Instagram account to start receiving real messages.
//                       </p>
//                       <Button
//                         onClick={() => {
//                           // Implement navigation to integration page
//                           console.log("Navigate to integration page")
//                         }}
//                         className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
//                       >
//                         Connect Instagram
//                       </Button>
//                     </div>
//                   </div>
//                 ) : conversations.length === 0 ? (
//                   <ExampleConversations onSelectConversation={handleSelectConversation} />
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
//                           <Avatar className="w-10 h-10 relative">
//                             <AvatarImage src={`https://i.pravatar.cc/150?u=${conversation.userId}`} />
//                             <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
//                             {unreadChats.has(conversation.chatId) && (
//                               <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
//                             )}
//                           </Avatar>
//                           <div className="ml-3 flex-grow overflow-hidden pr-4">
//                             <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
//                             <p className="text-xs text-muted-foreground truncate">
//                               {conversation.messages.length > 0
//                                 ? `${conversation.messages[conversation.messages.length - 1].content.slice(0, 30)}...`
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
// import { motion, AnimatePresence } from "framer-motion"
// import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import type { Conversation, Message } from "@/types/chat"
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
//   }, [selectedConversation]) //Corrected useEffect dependency

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
//     <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
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
//               <div className="flex-grow overflow-y-auto">
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
//                         <Avatar className="w-8 h-8 mr-2">
//                           <AvatarImage src={BOT_AVATAR} />
//                           <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       ) : (
//                         <Avatar className="w-8 h-8 ml-2 order-last">
//                           <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
//                           <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
//                         </Avatar>
//                       )}
//                       <div
//                         className={`max-w-[75%] p-3 rounded-lg text-sm ${
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
//                           {message.senderId !== BOT_ID && message.role === "user" && (
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
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-10 w-10 rounded-full flex-shrink-0 absolute left-2 top-1/2 transform -translate-y-1/2"
//                       >
//                         <Smile className="h-5 w-5" />
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-80 p-0">
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
//                     </PopoverContent>
//                   </Popover>
//                   <div className="flex-grow relative">
//                     <Textarea
//                       placeholder="Type a message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
//                       className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[48px] max-h-[96px] py-3 px-12 rounded-full resize-none"
//                     />
//                   </div>
//                   <div className="flex items-center space-x-2 absolute right-2 top-1/2 transform -translate-y-1/2">
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className={`h-8 w-8 rounded-full ${isRecording ? "text-red-500" : ""}`}
//                             onClick={handleVoiceMessage}
//                           >
//                             <Mic className="h-4 w-4" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Record voice message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <label htmlFor="file-upload">
//                             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
//                               <Paperclip className="h-4 w-4" />
//                             </Button>
//                           </label>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Attach file</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             size="icon"
//                             onClick={handleSendMessage}
//                             className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 w-8 rounded-full flex-shrink-0"
//                           >
//                             <Send size={16} />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Send message</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
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
//               <ScrollArea className="flex-grow">
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
//                           <Avatar className="w-10 h-10 relative">
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

"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, ArrowLeft, Smile, Paperclip, Mic, Trash2, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Conversation, Message } from "@/types/chat"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import ExampleConversations from "./exampleConvo"
import DeleteConfirmationModal from "./confirmDelete"
import { fetchChatsAndBusinessVariables, sendMessage } from "@/actions/messageAction/messageAction"

const BOT_NAME = "AiAssist"
const BOT_AVATAR = "https://api.dicebear.com/6.x/bottts/svg?seed=AiAssist"
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
  const scrollRef = useRef<HTMLDivElement>(null)

  const getAvatarUrl = (userId: string) => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${userId}`
  }

  const fetchChats = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { conversations, token, businessVariables } = await fetchChatsAndBusinessVariables(automationId)
      const filteredConversations = conversations.filter((conv) => conv.chatId !== EXCLUDED_CHAT_ID)

      // Sort conversations by the timestamp of the last message
      filteredConversations.sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1]
        const lastMessageB = b.messages[b.messages.length - 1]
        return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime()
      })

      setConversations(filteredConversations)
      setUnreadChats(new Set(filteredConversations.map((conv) => conv.chatId)))
      setTotalUnreadMessages(filteredConversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0))

      if (filteredConversations.length > 0 && filteredConversations[0].messages.length > 0) {
        setPageId(filteredConversations[0].messages[0].receiverId)
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
          timestamp: result.userMessage.timestamp,
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
            return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime()
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
    const names = ["Sarah Johnson", "Mike Chen", "Emma Davis", "Alex Rodriguez", "Olivia Taylor"]
    return names[Math.floor(Math.random() * names.length)]
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setUnreadChats((prev) => {
      const newUnreadChats = new Set(prev)
      newUnreadChats.delete(conversation.chatId)
      return newUnreadChats
    })
    setTotalUnreadMessages((prev) => Math.max(0, prev - (conversation.unreadCount || 0)))
    // Reset the unread count for the selected conversation
    setConversations((prevConversations) =>
      prevConversations.map((conv) => (conv.chatId === conversation.chatId ? { ...conv, unreadCount: 0 } : conv)),
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
      setConversations((prev) => prev.filter((conv) => conv.chatId !== conversationToDelete.chatId))
      if (selectedConversation?.chatId === conversationToDelete.chatId) {
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

  return (
    <div className="h-full flex flex-col bg-background text-foreground border border-primary/10 rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="p-4 text-muted-foreground">Loading chats...</div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : (
        <>
          {selectedConversation ? (
            <>
              <div className="p-4 bg-background border-b border-primary/10 flex items-center">
                <Button variant="ghost" className="mr-4 p-2" onClick={() => setSelectedConversation(null)}>
                  <ArrowLeft size={20} />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.userId}`} />
                  <AvatarFallback>{getFancyName(selectedConversation.userId).slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-grow">
                  <h4 className="font-medium text-lg">{getFancyName(selectedConversation.userId)}</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    {getActivityStatus(
                      new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
                    )}
                    {getActivityStatus(
                      new Date(selectedConversation.messages[selectedConversation.messages.length - 1].timestamp),
                    ) === "Active now" && <ActiveNowIndicator />}
                  </p>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto">
                <div className="p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-end mb-4 ${message.senderId === BOT_ID ? "justify-start" : "justify-end"}`}
                    >
                      {message.senderId === BOT_ID ? (
                        <Avatar className="w-8 h-8 mr-2 border-2 border-primary">
                          <AvatarImage src={BOT_AVATAR} />
                          <AvatarFallback>{BOT_NAME.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="w-8 h-8 ml-2 order-last border-2 border-primary">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
                          <AvatarFallback>{getFancyName(message.senderId).slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[75%] p-3 rounded-lg text-sm ${
                          message.senderId === BOT_ID
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="break-words">{message.content}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleString()}
                          </p>
                          {message.senderId === "17841444435951291" && (
                            <div className="flex items-center text-green-500">
                              <Check size={12} className="mr-1" />
                              <span className="text-xs">Sent</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-background border-t border-primary/10">
                <div className="flex items-center space-x-2 relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full flex-shrink-0 absolute left-2 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                    </PopoverContent>
                  </Popover>
                  <div className="flex-grow relative">
                    <Textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                      className="flex-grow text-sm bg-muted border-primary/20 text-foreground placeholder-muted-foreground min-h-[48px] max-h-[96px] py-3 px-12 rounded-lg resize-none overflow-hidden"
                      style={{ height: "48px", transition: "height 0.1s ease" }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = "48px"
                        target.style.height = `${target.scrollHeight}px`
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2 absolute right-2 top-1/2 transform -translate-y-1/2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-full ${isRecording ? "text-red-500" : ""}`}
                            onClick={handleVoiceMessage}
                          >
                            <Mic className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Record voice message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <input type="file" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <label htmlFor="file-upload">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Attach file</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={handleSendMessage}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 w-8 rounded-full flex-shrink-0"
                          >
                            <Send size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
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
              <ScrollArea className="flex-grow">
                {!token ? (
                  <div className="p-4 space-y-4">
                    <ExampleConversations onSelectConversation={handleSelectConversation} className="px-4" />
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">
                        Connect your Instagram account to start receiving real messages.
                      </p>
                      <Button
                        onClick={() => {
                          // Implement navigation to integration page
                          console.log("Navigate to integration page")
                        }}
                        className="bg-[#3352CC] hover:bg-[#3352CC]/90 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 w-full sm:w-auto whitespace-nowrap"
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
                        key={conversation.chatId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200"
                      >
                        <div className="flex-grow" onClick={() => handleSelectConversation(conversation)}>
                          <Avatar className="w-10 h-10 relative border-2 border-primary">
                            <AvatarImage src={getAvatarUrl(conversation.userId)} />
                            <AvatarFallback>{getFancyName(conversation.userId).slice(0, 2)}</AvatarFallback>
                            {unreadChats.has(conversation.chatId) && (
                              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primary transform translate-x-1/2 -translate-y-1/2"></span>
                            )}
                          </Avatar>
                          <div className="ml-3 flex-grow overflow-hidden pr-4">
                            <p className="font-medium text-sm text-foreground">{getFancyName(conversation.userId)}</p>
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
                          <p className="text-xs text-muted-foreground">
                            {getActivityStatus(
                              new Date(conversation.messages[conversation.messages.length - 1].timestamp),
                            )}
                          </p>
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
                          onClick={() => setDisplayedConversations((prev) => Math.min(prev + 4, conversations.length))}
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
  )
}

export default AutomationChats

