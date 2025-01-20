// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface Dm {
//   id: string
//   senderId: string | null
//   message: string | null
//   createdAt: Date
//   Automation: { name: string } | null
// }

// export function RecentDms({ dms }: { dms: Dm[] }) {
//   return (
//     <Card className="w-full bg-gray-900 text-white">
//       <CardHeader>
//         <CardTitle>Recent DMs</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[200px]">
//           {dms.map((dm) => (
//             <div key={dm.id} className="mb-4">
//               <p className="text-sm text-gray-400">
//                 {new Date(dm.createdAt).toLocaleString()} - Automation: {dm.Automation?.name || "N/A"}
//               </p>
//               <p className="mt-1">
//                 From: {dm.senderId || "Unknown"} - {dm.message}
//               </p>
//             </div>
//           ))}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Dm {
  id: string
  senderId: string | null
  message: string | null
  createdAt: Date
  Automation: { id: string; name: string } | null
}

interface Automation {
  id: string
  name: string
}

export function RecentDms({ dms, automations }: { dms: Dm[]; automations: Automation[] }) {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)

  const filteredDms = selectedAutomation ? dms.filter((dm) => dm.Automation?.id === selectedAutomation) : dms

  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Recent DMs</CardTitle>
        <Select onValueChange={(value) => setSelectedAutomation(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Automation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Automations</SelectItem>
            {automations.map((automation) => (
              <SelectItem key={automation.id} value={automation.id}>
                {automation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredDms.map((dm) => {
              const isClient = dm.senderId !== null
              return (
                <div key={dm.id} className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
                  <div className={`flex items-end space-x-2 ${isClient ? "flex-row" : "flex-row-reverse"}`}>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={isClient ? "/placeholder-user.jpg" : "/placeholder-bot.jpg"} />
                      <AvatarFallback>{isClient ? "C" : "M"}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        isClient ? "bg-gray-700 text-white" : "bg-blue-600 text-white"
                      }`}
                    >
                      <p className="text-sm">{dm.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(dm.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

