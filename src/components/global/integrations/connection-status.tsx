// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Loader2 } from "lucide-react"

// interface ConnectionStatusProps {
//   platform: string
//   accounts: { id: string; isActive: boolean }[]
//   onRefresh?: () => Promise<void>
//   isRefreshing?: boolean
// }

// export default function ConnectionStatus({
//   platform,
//   accounts,
//   onRefresh,
//   isRefreshing = false,
// }: ConnectionStatusProps) {
//   const [lastChecked, setLastChecked] = useState<Date>(new Date())

//   const activeAccounts = accounts.filter((a) => a.isActive).length
//   const totalAccounts = accounts.length

//   let status: "healthy" | "warning" | "error" = "healthy"

//   if (totalAccounts === 0) {
//     status = "error"
//   } else if (activeAccounts < totalAccounts) {
//     status = "warning"
//   }

//   const statusInfo = {
//     healthy: {
//       icon: <CheckCircle className="h-5 w-5 text-green-500" />,
//       color: "bg-green-100 dark:bg-green-900",
//       text: "All connections healthy",
//       badge: <Badge className="bg-green-600 hover:bg-green-700">Healthy</Badge>,
//     },
//     warning: {
//       icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
//       color: "bg-amber-100 dark:bg-amber-900",
//       text: "Some connections need attention",
//       badge: <Badge className="bg-amber-600 hover:bg-amber-700">Warning</Badge>,
//     },
//     error: {
//       icon: <XCircle className="h-5 w-5 text-red-500" />,
//       color: "bg-red-100 dark:bg-red-900",
//       text: "No active connections",
//       badge: <Badge className="bg-red-600 hover:bg-red-700">Disconnected</Badge>,
//     },
//   }

//   const handleRefresh = async () => {
//     if (onRefresh) {
//       await onRefresh()
//       setLastChecked(new Date())
//     }
//   }

//   useEffect(() => {
//     // Simulate automatic refresh every 30 seconds
//     const interval = setInterval(() => {
//       setLastChecked(new Date())
//     }, 30000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//       <Card className="glassEffect">
//         <CardContent className="p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className={`rounded-full p-2 ${statusInfo[status].color}`}>{statusInfo[status].icon}</div>
//               <div>
//                 <div className="flex items-center space-x-2">
//                   <h3 className="font-medium">Connection Status</h3>
//                   {statusInfo[status].badge}
//                 </div>
//                 <p className="text-sm text-muted-foreground">{statusInfo[status].text}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleRefresh}
//               className="p-2 rounded-full hover:bg-muted transition-colors"
//               disabled={isRefreshing}
//             >
//               {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//             </button>
//           </div>
//           <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
//             Last checked: {lastChecked.toLocaleTimeString()}
//             {totalAccounts > 0 && (
//               <span className="ml-2">
//                 • {activeAccounts}/{totalAccounts} accounts active
//               </span>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Loader2 } from "lucide-react"

interface ConnectionStatusProps {
  platform: string
  accounts: { id: string; isActive: boolean }[]
  onRefresh?: () => Promise<void>
  isRefreshing?: boolean
}

export default function ConnectionStatus({
  platform,
  accounts = [], // Provide default empty array
  onRefresh,
  isRefreshing = false,
}: ConnectionStatusProps) {
  const [lastChecked, setLastChecked] = useState<Date>(new Date())

  // Safely handle accounts array
  const safeAccounts = Array.isArray(accounts) ? accounts : []
  const activeAccounts = safeAccounts.filter((a) => a && a.isActive).length
  const totalAccounts = safeAccounts.length

  let status: "healthy" | "warning" | "error" = "healthy"

  if (totalAccounts === 0) {
    status = "error"
  } else if (activeAccounts < totalAccounts) {
    status = "warning"
  }

  const statusInfo = {
    healthy: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900",
      text: "All connections healthy",
      badge: <Badge className="bg-green-600 hover:bg-green-700">Healthy</Badge>,
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-100 dark:bg-amber-900",
      text: "Some connections need attention",
      badge: <Badge className="bg-amber-600 hover:bg-amber-700">Warning</Badge>,
    },
    error: {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      color: "bg-red-100 dark:bg-red-900",
      text: "No active connections",
      badge: <Badge className="bg-red-600 hover:bg-red-700">Disconnected</Badge>,
    },
  }

  const handleRefresh = async () => {
    if (onRefresh) {
      try {
        await onRefresh()
        setLastChecked(new Date())
      } catch (error) {
        console.error("Error refreshing data:", error)
      }
    }
  }

  useEffect(() => {
    // Simulate automatic refresh every 30 seconds
    const interval = setInterval(() => {
      setLastChecked(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="glassEffect">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`rounded-full p-2 ${statusInfo[status].color}`}>{statusInfo[status].icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Connection Status</h3>
                  {statusInfo[status].badge}
                </div>
                <p className="text-sm text-muted-foreground">{statusInfo[status].text}</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              disabled={isRefreshing}
            >
              {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            Last checked: {lastChecked.toLocaleTimeString()}
            {totalAccounts > 0 && (
              <span className="ml-2">
                • {activeAccounts}/{totalAccounts} accounts active
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

