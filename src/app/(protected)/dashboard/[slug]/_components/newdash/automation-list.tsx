// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   createdAt: Date
// }

// export function AutomationList({ automations }: { automations: Automation[] }) {
//   return (
//     <Card className="w-full bg-gray-800 text-white">
//       <CardHeader>
//         <CardTitle>My Automations</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[200px]">
//           {automations.map((automation) => (
//             <div key={automation.id} className="mb-4 flex items-center justify-between">
//               <div>
//                 <p className="font-semibold">{automation.name}</p>
//                 <p className="text-sm text-gray-400">Created: {new Date(automation.createdAt).toLocaleDateString()}</p>
//               </div>
//               <span className={`px-2 py-1 rounded-full text-xs ${automation.active ? "bg-green-500" : "bg-red-500"}`}>
//                 {automation.active ? "Active" : "Inactive"}
//               </span>
//             </div>
//           ))}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

// "use client"

// import React from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { motion, AnimatePresence } from "framer-motion"
// import { Activity, Power } from "lucide-react"

// interface Automation {
//   id: string
//   name: string
//   active: boolean
//   createdAt: Date
// }

// export function AutomationList({ automations }: { automations: Automation[] }) {
//   return (
//     <Card className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 border-gray-700 shadow-xl overflow-hidden">
//       <CardHeader className="relative">
//         <CardTitle className="flex items-center space-x-2 z-10">
//           <Activity className="w-6 h-6 text-purple-400" />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//             My Automations
//           </span>
//         </CardTitle>
//         <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[300px] pr-4">
//           <AnimatePresence>
//             {automations.map((automation, index) => (
//               <motion.div
//                 key={automation.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Card className="mb-4 bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300 backdrop-filter backdrop-blur-sm">
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
//                           {automation.name}
//                         </h3>
//                         <p className="text-sm text-gray-400">
//                           Created: {new Date(automation.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="relative">
//                         <Power className={`w-6 h-6 ${automation.active ? "text-green-400" : "text-red-400"}`} />
//                         <span
//                           className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
//                             automation.active ? "bg-green-400" : "bg-red-400"
//                           } animate-ping`}
//                         ></span>
//                       </div>
//                     </div>
//                     <div className="mt-2 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
//                       <motion.div
//                         className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
//                         initial={{ width: 0 }}
//                         animate={{ width: "100%" }}
//                         transition={{ duration: 1, delay: index * 0.2 }}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Power } from "lucide-react"

interface Automation {
  id: string
  name: string
  active: boolean
  createdAt: Date
}

export function AutomationList({ automations }: { automations: Automation[] }) {
  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="relative">
        <CardTitle className="flex items-center space-x-2 z-10">
          <Activity className="w-6 h-6 text-primary" />
          <span className="text-foreground">My Automations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence>
            {automations.map((automation, index) => (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="mb-4 bg-background/50 border border-primary/20 hover:bg-background/70 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{automation.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(automation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="relative">
                        <Power className={`w-6 h-6 ${automation.active ? "text-primary" : "text-muted-foreground"}`} />
                        <span
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                            automation.active ? "bg-green-400" : "bg-red-400"
                          } animate-ping`}
                        ></span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-muted h-1 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

