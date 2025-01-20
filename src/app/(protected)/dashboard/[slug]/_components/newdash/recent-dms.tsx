// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface Dm {
//   id: string
//   senderId: string | null
//   message: string | null
//   createdAt: Date
//   Automation: { id: string; name: string } | null
// }

// interface Automation {
//   id: string
//   name: string
// }

// export function RecentDms({ dms, automations }: { dms: Dm[]; automations: Automation[] }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)

//   const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : dms

//   return (
//     <Card className="w-full bg-gray-900 text-white">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle>Recent DMs</CardTitle>
//         <Select onValueChange={(value) => setSelectedAutomation(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Automation" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Automations</SelectItem>
//             {automations.map((automation) => (
//               <SelectItem key={automation.id} value={automation.id}>
//                 {automation.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4">
//           <div className="space-y-4">
//             {filteredDms.map((dm) => {
//               const isClient = dm.senderId !== null
//               return (
//                 <div key={dm.id} className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
//                   <div className={`flex items-end space-x-2 ${isClient ? "flex-row" : "flex-row-reverse"}`}>
//                     <Avatar className="w-6 h-6">
//                       <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
//                       <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
//                     </Avatar>
//                     <div
//                       className={`max-w-xs px-4 py-2 rounded-lg ${
//                         isClient ? "bg-gray-700 text-white" : "bg-blue-600 text-white"
//                       }`}
//                     >
//                       <p className="text-sm">{dm.message}</p>
//                       <p className="text-xs text-gray-400 mt-1">{new Date(dm.createdAt).toLocaleTimeString()}</p>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface Dm {
//   id: string
//   senderId: string | null
//   message: string | null
//   createdAt: Date
//   Automation: { id: string; name: string } | null
// }

// interface Automation {
//   id: string
//   name: string
// }

// export function RecentDms({ dms, automations }: { dms: Dm[]; automations: Automation[] }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)

//   const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : dms

//   return (
//     <Card className="w-full bg-gray-900 text-white">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle>Recent DMs</CardTitle>
//         <Select onValueChange={(value) => setSelectedAutomation(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Automation" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Automations</SelectItem>
//             {automations.map((automation) => (
//               <SelectItem key={automation.id} value={automation.id}>
//                 {automation.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4">
//           <div className="space-y-4">
//             {filteredDms.map((dm) => {
//               const isClient = dm.senderId !== null
//               return (
//                 <div key={dm.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
//                   <div className={`flex items-end space-x-2 ${isClient ? "flex-row-reverse" : "flex-row"}`}>
//                     <Avatar className="w-6 h-6">
//                       <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
//                       <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
//                     </Avatar>
//                     <div
//                       className={`max-w-xs px-4 py-2 rounded-lg ${
//                         isClient ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
//                       }`}
//                     >
//                       <p className="text-sm">{dm.message}</p>
//                       <p className="text-xs text-gray-400 mt-1">{new Date(dm.createdAt).toLocaleTimeString()}</p>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }



// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface Dm {
//   id: string
//   senderId: string | null
//   reciever: string | null
//   message: string | null
//   createdAt: Date
//   Automation: { id: string; name: string } | null
// }

// interface Automation {
//   id: string
//   name: string
// }

// // This should be the ID of your bot/page from the Instagram API
// const BOT_ID = "1336784737460417"

// export function RecentDms({ dms, automations }: { dms: Dm[]; automations: Automation[] }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)

//   const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : dms

//   return (
//     <Card className="w-full bg-gray-800 text-white">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle>Recent DMs</CardTitle>
//         <Select onValueChange={(value) => setSelectedAutomation(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Automation" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Automations</SelectItem>
//             {automations.map((automation) => (
//               <SelectItem key={automation.id} value={automation.id}>
//                 {automation.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4">
//           <div className="space-y-4">
//             {filteredDms.map((dm) => {
//               const isClient = dm.senderId == BOT_ID
//               return (
//                 <div key={dm.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
//                   <div className={`flex items-end space-x-2 ${isClient ? "flex-row-reverse" : "flex-row"}`}>
//                     <Avatar className="w-6 h-6">
//                       <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
//                       <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
//                     </Avatar>
//                     <div
//                       className={`max-w-xs px-4 py-2 rounded-lg ${
//                         isClient ? "bg-gray-800 text-white" : "bg-gray-700 text-white"
//                       }`}
//                     >
//                       <p className="text-sm">{dm.message}</p>
//                       <p className="text-xs text-gray-400 mt-1">{new Date(dm.createdAt).toLocaleTimeString()}</p>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface Dm {
//   id: string
//   senderId: string | null
//   reciever: string | null
//   message: string | null
//   createdAt: Date
//   Automation: { id: string; name: string } | null
// }

// interface Automation {
//   id: string
//   name: string
// }

// const BOT_ID = "1336784737460417"

// export function RecentDms({ dms, automations }: { dms: Dm[]; automations: Automation[] }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)

//   // Filter DMs by selected automation
//   const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : dms

//   // Sort DMs by date, ensuring the latest messages are at the bottom
//   const sortedDms = [...filteredDms].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

//   return (
//     <Card className="w-full bg-gray-800 text-white">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle>Recent DMs</CardTitle>
//         <Select onValueChange={(value) => setSelectedAutomation(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Automation" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Automations</SelectItem>
//             {automations.map((automation) => (
//               <SelectItem key={automation.id} value={automation.id}>
//                 {automation.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4 flex flex-col-reverse">
//           <div className="space-y-4">
//             {sortedDms.map((dm) => {
//               const isClient = dm.senderId === BOT_ID
//               const date = new Date(dm.createdAt)

//               // Format time as "HH:mm" and get day of the week
//               const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//               const dayOfWeek = date.toLocaleDateString([], { weekday: "long" })

//               return (
//                 <div key={dm.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
//                   <div className={`flex items-end space-x-2 ${isClient ? "flex-row-reverse" : "flex-row"}`}>
//                     <Avatar className="w-6 h-6">
//                       <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
//                       <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
//                     </Avatar>
//                     <div
//                       className={`max-w-xs px-4 py-2 rounded-lg ${
//                         isClient ? "bg-indigo-600 text-white" : "bg-gray-700 text-white"
//                       }`}
//                     >
//                       <p className="text-sm">{dm.message}</p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         {formattedTime} · {dayOfWeek}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

// 'use client'

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { motion, AnimatePresence } from "framer-motion";

// interface Dm {
//   id: string;
//   senderId: string | null;
//   reciever: string | null;
//   message: string | null;
//   createdAt: Date;
//   Automation: { id: string; name: string } | null;
// }

// interface Automation {
//   id: string;
//   name: string;
// }

// const BOT_ID = "1336784737460417";

// export function RecentDms({
//   dms,
//   automations,
// }: {
//   dms: Dm[];
//   automations: Automation[];
// }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(
//     null
//   );

//   // Filter DMs by selected automation
//   const filteredDms = selectedAutomation
//     ? dms.filter((dm) => dm.Automation?.id === selectedAutomation)
//     : dms;

//   // Sort DMs by date, ensuring the latest messages are at the bottom
//   const sortedDms = [...filteredDms].sort(
//     (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//   );

//   return (
//     <Card className="w-full bg-opacity-60 backdrop-blur-lg border border-gray-700 shadow-xl">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-gradient-to-r from-purple-500 to-indigo-500">
//           Recent DMs
//         </CardTitle>
//         <Select onValueChange={(value) => setSelectedAutomation(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Automation" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Automations</SelectItem>
//             {automations.map((automation) => (
//               <SelectItem key={automation.id} value={automation.id}>
//                 {automation.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4 flex flex-col-reverse">
//           <AnimatePresence>
//             <div className="space-y-4">
//               {sortedDms.map((dm) => {
//                 const isClient = dm.senderId === BOT_ID;
//                 const date = new Date(dm.createdAt);

//                 // Format time as "HH:mm" and get day of the week
//                 const formattedTime = date.toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });
//                 const dayOfWeek = date.toLocaleDateString([], {
//                   weekday: "long",
//                 });

//                 return (
//                   <motion.div
//                     key={dm.id}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.2 }}
//                     className={`flex ${
//                       isClient ? "justify-end" : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`flex items-end space-x-2 ${
//                         isClient ? "flex-row-reverse" : "flex-row"
//                       }`}
//                     >
//                       <Avatar className="w-8 h-8">
//                         <AvatarImage
//                           src={
//                             isClient
//                               ? "/placeholder-user.jpg"
//                               : "/placeholder-bot.jpg"
//                           }
//                         />
//                         <AvatarFallback>
//                           {isClient ? "C" : "M"}
//                         </AvatarFallback>
//                       </Avatar>
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         className={`max-w-xs px-4 py-2 rounded-lg shadow-lg transform transition-transform ${
//                           isClient
//                             ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
//                             : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
//                         }`}
//                       >
//                         <p className="text-sm">{dm.message}</p>
//                         <p className="text-xs text-gray-300 mt-1">
//                           {formattedTime} · {dayOfWeek}
//                         </p>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </AnimatePresence>
//           <div className="text-center text-gray-400 py-4">
//             <motion.span
//               className="inline-block px-2 py-1 rounded-md bg-gray-700 text-white"
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ repeat: Infinity, duration: 1.5 }}
//             >
//               Typing...
//             </motion.span>
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// }


// 'use client';

// import { useState, useEffect, useRef } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { motion } from "framer-motion";

// interface Dm {
//   id: string;
//   senderId: string | null;
//   reciever: string | null;
//   message: string | null;
//   createdAt: Date;
//   read: boolean;
//   Automation: { id: string; name: string } | null;
// }

// interface Automation {
//   id: string;
//   name: string;
// }

// const BOT_ID = "1336784737460417";

// export function RecentDms({
//   dms,
//   automations,
// }: {
//   dms: Dm[];
//   automations: Automation[];
// }) {
//   const [selectedAutomation, setSelectedAutomation] = useState<string | null>(
//     automations.length > 0 ? automations[0].id : null
//   );
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // Filter DMs by selected automation
//   const filteredDms = selectedAutomation
//     ? dms.filter((dm) => dm.Automation?.id === selectedAutomation)
//     : [];

//   // Sort DMs by date
//   const sortedDms = [...filteredDms].sort(
//     (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//   );

//   // Count unread messages
//   const unreadCount = sortedDms.filter((dm) => !dm.read).length;

//   // Mark all messages as read on view
//   useEffect(() => {
//     if (selectedAutomation) {
//       sortedDms.forEach((dm) => (dm.read = true));
//     }
//   }, [selectedAutomation, sortedDms]);

//   // Scroll to the latest read message
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [selectedAutomation]);

//   return (
//     <Card className="w-full bg-gray-900 border border-gray-700 shadow-xl">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-white">Recent DMs</CardTitle>
//         {automations.length > 0 && (
//           <Select
//             onValueChange={(value) => setSelectedAutomation(value)}
//             defaultValue={automations[0].id}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Automation" />
//             </SelectTrigger>
//             <SelectContent>
//               {automations.map((automation) => (
//                 <SelectItem key={automation.id} value={automation.id}>
//                   {automation.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}
//       </CardHeader>
//       <CardContent>
//         <ScrollArea ref={scrollRef} className="h-[400px] pr-4">
//           <div className="space-y-4">
//             {sortedDms.map((dm) => {
//               const isClient = dm.senderId === BOT_ID;
//               const date = new Date(dm.createdAt);

//               // Format time
//               const formattedTime = date.toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               });

//               return (
//                 <motion.div
//                   key={dm.id}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className={`flex ${
//                     isClient ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`flex items-end space-x-2 ${
//                       isClient ? "flex-row-reverse" : "flex-row"
//                     }`}
//                   >
//                     <Avatar className="w-8 h-8">
//                       <AvatarImage
//                         src={
//                           isClient
//                             ? "/placeholder-user.jpg"
//                             : "/placeholder-bot.jpg"
//                         }
//                       />
//                       <AvatarFallback>
//                         {isClient ? "C" : "M"}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div
//                       className={`max-w-xs px-4 py-2 rounded-lg border shadow-sm relative ${
//                         isClient
//                           ? "border-green-500 text-white bg-transparent"
//                           : "border-blue-500 text-white bg-transparent"
//                       }`}
//                     >
//                       <p className="text-sm">{dm.message}</p>
//                       <p className="text-xs text-gray-400 mt-1">{formattedTime}</p>
//                       <div
//                         className={`absolute top-full w-0 h-0 border-t-[8px] border-l-[8px] border-r-[8px] ${
//                           isClient
//                             ? "border-t-green-500 right-2"
//                             : "border-t-blue-500 left-2"
//                         }`}
//                         style={{ borderLeftColor: "transparent", borderRightColor: "transparent" }}
//                       ></div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </ScrollArea>
//         <div className="text-center text-gray-400 mt-2">
//           {unreadCount > 0 && `${unreadCount} unread message(s)`}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface Dm {
  id: string;
  senderId: string | null;
  reciever: string | null;
  message: string | null;
  createdAt: Date;
  Automation: { id: string; name: string } | null;
}

interface Automation {
  id: string;
  name: string;
}

const BOT_ID = "1336784737460417";

export function RecentDms({
  dms,
  automations,
}: {
  dms: Dm[];
  automations: Automation[];
}) {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(
    automations.length > 0 ? automations[0].id : null
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter DMs by selected automation
  const filteredDms = selectedAutomation
    ? dms.filter((dm) => dm.Automation?.id === selectedAutomation)
    : [];

  // Sort DMs by date
  const sortedDms = [...filteredDms].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedAutomation]);

  return (
    <Card className="w-full bg-gray-900 border border-gray-700 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-white">Recent DMs</CardTitle>
        {automations.length > 0 && (
          <Select
            onValueChange={(value) => setSelectedAutomation(value)}
            defaultValue={automations[0].id}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Automation" />
            </SelectTrigger>
            <SelectContent>
              {automations.map((automation) => (
                <SelectItem key={automation.id} value={automation.id}>
                  {automation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea ref={scrollRef} className="h-[400px] pr-4">
          <div className="space-y-4">
            {sortedDms.map((dm) => {
              const isClient = dm.senderId === BOT_ID;
              const date = new Date(dm.createdAt);

              // Format time
              const formattedTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <motion.div
                  key={dm.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex ${
                    isClient ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end space-x-2 ${
                      isClient ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          isClient
                            ? "/placeholder-user.jpg"
                            : "/placeholder-bot.jpg"
                        }
                      />
                      <AvatarFallback>
                        {isClient ? "C" : "M"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg border shadow-sm relative ${
                        isClient
                          ? "border-green-500 text-white bg-transparent"
                          : "border-blue-500 text-white bg-transparent"
                      }`}
                    >
                      <p className="text-sm">{dm.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formattedTime}</p>
                      <div
                        className={`absolute top-full w-0 h-0 border-t-[8px] border-l-[8px] border-r-[8px] ${
                          isClient
                            ? "border-t-green-500 right-2"
                            : "border-t-blue-500 left-2"
                        }`}
                        style={{ borderLeftColor: "transparent", borderRightColor: "transparent" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
