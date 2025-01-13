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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MessageCircle, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
}

interface Client {
  id: string;
  name: string;
  lastMessage: string;
  chats: Chat[];
}

interface AutomationChatsProps {
  automationId: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Thanks for your help!',
    chats: [
      {
        id: '1',
        messages: [
          { role: 'user', content: 'Hi, I need help with my order.' },
          { role: 'assistant', content: 'Of course! What seems to be the problem?' },
          { role: 'user', content: 'I haven\'t received my package yet.' },
          { role: 'assistant', content: 'I\'m sorry to hear that. Let me check the status for you.' },
          { role: 'assistant', content: 'Your package is currently in transit and should arrive within 2 business days.' },
          { role: 'user', content: 'Thanks for your help!' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'That sounds great, thank you!',
    chats: [
      {
        id: '1',
        messages: [
          { role: 'user', content: 'Hello, I\'m interested in your premium plan.' },
          { role: 'assistant', content: 'That\'s great! I\'d be happy to tell you more about our premium plan.' },
          { role: 'assistant', content: 'Our premium plan includes 24/7 support, unlimited storage, and access to exclusive features.' },
          { role: 'user', content: 'That sounds great, thank you!' },
        ],
      },
    ],
  },
];

const AutomationChats: React.FC<AutomationChatsProps> = ({ automationId }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
      <ScrollArea className="flex-grow">
        <AnimatePresence mode="wait">
          {!selectedClient ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {mockClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors duration-200"
                  onClick={() => setSelectedClient(client)}
                >
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-400 truncate">{client.lastMessage}</p>
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
                className="mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                onClick={() => {
                  setSelectedClient(null);
                  setSelectedChat(null);
                }}
              >
                ← Back to clients
              </button>
              <h4 className="font-medium mb-2">{selectedClient.name}</h4>
              {selectedClient.chats.map((chat) => (
                <div
                  key={chat.id}
                  className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors duration-200"
                  onClick={() => setSelectedChat(chat)}
                >
                  <p className="text-sm text-gray-400">
                    {chat.messages[chat.messages.length - 1].content}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
      {selectedChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mt-4 border-t border-[#545454] pt-4"
        >
          <button
            className="mb-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            onClick={() => setSelectedChat(null)}
          >
            ← Back to conversation list
          </button>
          <ScrollArea className="h-64 md:h-96">
            {selectedChat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.role === 'assistant' && (
                  <MessageCircle size={24} className="mr-2 text-blue-400 flex-shrink-0" />
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'assistant'
                      ? 'bg-blue-500/20 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <User size={24} className="ml-2 text-gray-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </ScrollArea>
        </motion.div>
      )}
    </div>
  );
};

export default AutomationChats;

