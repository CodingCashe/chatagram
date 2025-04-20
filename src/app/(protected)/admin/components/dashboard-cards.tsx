// "use client"

// import { Users, CreditCard, Bot, ArrowUp, ArrowDown } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// interface DashboardCardsProps {
//   stats: {
//     totalUsers: number
//     proSubscriptions: number
//     totalAutomations: number
//     activeAutomations: number
//     totalScheduledContent: number
//   }
// }

// export function DashboardCards({ stats }: DashboardCardsProps) {
//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.totalUsers}</div>
//           <p className="text-xs text-muted-foreground flex items-center mt-1">
//             <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
//             <span className="text-green-500">12%</span> from last month
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Pro Subscriptions</CardTitle>
//           <CreditCard className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.proSubscriptions}</div>
//           <p className="text-xs text-muted-foreground flex items-center mt-1">
//             <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
//             <span className="text-green-500">8%</span> from last month
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Automations</CardTitle>
//           <Bot className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.totalAutomations}</div>
//           <p className="text-xs text-muted-foreground flex items-center mt-1">
//             <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
//             <span className="text-green-500">24%</span> from last month
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
//           <Bot className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.activeAutomations}</div>
//           <p className="text-xs text-muted-foreground flex items-center mt-1">
//             {stats.activeAutomations < stats.totalAutomations * 0.8 ? (
//               <>
//                 <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
//                 <span className="text-red-500">
//                   {Math.round((stats.activeAutomations / stats.totalAutomations) * 100)}%
//                 </span>{" "}
//                 active rate
//               </>
//             ) : (
//               <>
//                 <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
//                 <span className="text-green-500">
//                   {Math.round((stats.activeAutomations / stats.totalAutomations) * 100)}%
//                 </span>{" "}
//                 active rate
//               </>
//             )}
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { Users, CreditCard, Bot, ArrowUp, ArrowDown, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface DashboardCardsProps {
  stats: {
    totalUsers: number
    proSubscriptions: number
    totalAutomations: number
    activeAutomations: number
    totalScheduledContent: number
    userGrowth?: number
    subscriptionGrowth?: number
    automationGrowth?: number
    messagesSent?: number
  }
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  const router = useRouter()

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="overflow-hidden h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stats.userGrowth && stats.userGrowth > 0 ? (
                <>
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">{stats.userGrowth}%</span> from last month
                </>
              ) : (
                <>
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{Math.abs(stats.userGrowth || 0)}%</span> from last month
                </>
              )}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push("/admin/users")}>
              View all users
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="overflow-hidden h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardTitle className="text-sm font-medium">Pro Subscriptions</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-purple-700 dark:text-purple-300" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.proSubscriptions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stats.subscriptionGrowth && stats.subscriptionGrowth > 0 ? (
                <>
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">{stats.subscriptionGrowth}%</span> from last month
                </>
              ) : (
                <>
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{Math.abs(stats.subscriptionGrowth || 0)}%</span> from last month
                </>
              )}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push("/admin/subscriptions")}>
              View subscriptions
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="overflow-hidden h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
              <Bot className="h-4 w-4 text-green-700 dark:text-green-300" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {stats.activeAutomations.toLocaleString()} / {stats.totalAutomations.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stats.automationGrowth && stats.automationGrowth > 0 ? (
                <>
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">{stats.automationGrowth}%</span> from last month
                </>
              ) : (
                <>
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{Math.abs(stats.automationGrowth || 0)}%</span> from last month
                </>
              )}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push("/admin/automations")}>
              View automations
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="overflow-hidden h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
            <CardTitle className="text-sm font-medium">Scheduled Content</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-amber-700 dark:text-amber-300" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.totalScheduledContent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">Upcoming posts</span>
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => router.push("/admin/scheduled-content")}
            >
              View schedule
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

