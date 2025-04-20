// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Switch } from "@/components/ui/switch"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Trash2, MoreVertical, ExternalLink, RefreshCw } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// interface Account {
//   id: string
//   title: string
//   subtitle: string
//   avatar: string
//   isActive: boolean
//   platform: string
// }

// interface AccountsListProps {
//   accounts: Account[]
//   onRemove: (id: string) => void
// }

// export default function AccountsList({ accounts, onRemove }: AccountsListProps) {
//   const [expandedAccount, setExpandedAccount] = useState<string | null>(null)

//   if (accounts.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-10 text-center">
//         <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
//           <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//         </div>
//         <h3 className="mt-4 text-lg font-medium">No accounts connected</h3>
//         <p className="mt-1 text-sm text-muted-foreground max-w-sm">
//           Connect your first account to start managing your social media presence
//         </p>
//       </div>
//     )
//   }

//   return (
//     <ul className="space-y-3 staggeredFadeIn">
//       <AnimatePresence>
//         {accounts.map((account) => (
//           <motion.li
//             key={account.id}
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="rounded-lg border bg-card text-card-foreground shadow-sm shimmerBorder"
//           >
//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Avatar>
//                     <AvatarImage src={account.avatar} alt={account.title} />
//                     <AvatarFallback>{account.title.substring(0, 2).toUpperCase()}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="flex items-center">
//                       <h4 className="font-medium">{account.title}</h4>
//                       {account.isActive ? (
//                         <Badge className="ml-2 bg-green-600 hover:bg-green-700">Active</Badge>
//                       ) : (
//                         <Badge variant="outline" className="ml-2">
//                           Inactive
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-sm text-muted-foreground">{account.subtitle}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     checked={account.isActive}
//                     onCheckedChange={() => {}}
//                     aria-label="Toggle account active state"
//                   />
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical className="h-4 w-4" />
//                         <span className="sr-only">More options</span>
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Account Options</DropdownMenuLabel>
//                       <DropdownMenuItem>
//                         <RefreshCw className="mr-2 h-4 w-4" />
//                         Refresh Connection
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <ExternalLink className="mr-2 h-4 w-4" />
//                         View Profile
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         className="text-red-600 focus:text-red-600"
//                         onClick={() => onRemove(account.id)}
//                       >
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Remove Account
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>

//               <div
//                 className="mt-2 cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
//                 onClick={() => setExpandedAccount(expandedAccount === account.id ? null : account.id)}
//               >
//                 {expandedAccount === account.id ? "Hide details" : "Show details"}
//               </div>

//               {expandedAccount === account.id && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="mt-3 pt-3 border-t"
//                 >
//                   <div className="grid gap-2">
//                     <div className="grid grid-cols-2 gap-1 text-sm">
//                       <span className="text-muted-foreground">Status:</span>
//                       <span>{account.isActive ? "Active" : "Inactive"}</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-1 text-sm">
//                       <span className="text-muted-foreground">Connected on:</span>
//                       <span>March 14, 2025</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-1 text-sm">
//                       <span className="text-muted-foreground">Last synced:</span>
//                       <span>2 hours ago</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-1 text-sm">
//                       <span className="text-muted-foreground">Permissions:</span>
//                       <span>Read, Write, Analytics</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </motion.li>
//         ))}
//       </AnimatePresence>
//     </ul>
//   )
// }

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, MoreVertical, ExternalLink, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Account {
  id: string
  title: string
  subtitle: string
  avatar: string
  isActive: boolean
  platform: string
}

interface AccountsListProps {
  accounts: Account[]
  onRemove: (id: string) => void
}

export default function AccountsList({ accounts = [], onRemove }: AccountsListProps) {
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null)

  // Ensure accounts is an array
  const safeAccounts = Array.isArray(accounts) ? accounts : []

  if (safeAccounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
          <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No accounts connected</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
          Connect your first account to start managing your social media presence
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-3 staggeredFadeIn">
      <AnimatePresence>
        {safeAccounts.map((account) => (
          <motion.li
            key={account.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border bg-card text-card-foreground shadow-sm shimmerBorder"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={account.avatar} alt={account.title} />
                    <AvatarFallback>{account.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{account.title}</h4>
                      {account.isActive ? (
                        <Badge className="ml-2 bg-green-600 hover:bg-green-700">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="ml-2">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={account.isActive}
                    onCheckedChange={() => {}}
                    aria-label="Toggle account active state"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Account Options</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Connection
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => onRemove(account.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div
                className="mt-2 cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                onClick={() => setExpandedAccount(expandedAccount === account.id ? null : account.id)}
              >
                {expandedAccount === account.id ? "Hide details" : "Show details"}
              </div>

              {expandedAccount === account.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t"
                >
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{account.isActive ? "Active" : "Inactive"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      <span className="text-muted-foreground">Connected on:</span>
                      <span>{"---"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      <span className="text-muted-foreground">Last synced:</span>
                      <span>2 hours ago</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      <span className="text-muted-foreground">Permissions:</span>
                      <span>Read, Write, Analytics</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

