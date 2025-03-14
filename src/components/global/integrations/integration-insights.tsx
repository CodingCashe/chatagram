// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { BarChart, TrendingUp, Users, MessageSquare } from "lucide-react"

// export default function IntegrationInsights({ userData }: { userData?: any }) {
//   // Use real data if available, otherwise use defaults
//   const instagramData = userData?.integrations?.find((i: any) => i.name === "INSTAGRAM")

//   const insights = [
//     {
//       title: "Engagement Rate",
//       value: instagramData ? `${((instagramData.followersCount || 0) / 100).toFixed(1)}%` : "0.0%",
//       change: "+0.6%",
//       trend: "up",
//       icon: <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
//     },
//     {
//       title: "Follower Count",
//       value: instagramData?.followersCount?.toLocaleString() || "0",
//       change: "+12%",
//       trend: "up",
//       icon: <Users className="h-5 w-5 text-green-600 dark:text-green-400" />,
//     },
//     {
//       title: "Following Count",
//       value: instagramData?.followingCount?.toLocaleString() || "0",
//       change: "-3%",
//       trend: "down",
//       icon: <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
//     },
//     {
//       title: "Posts Count",
//       value: instagramData?.postsCount?.toLocaleString() || "0",
//       change: "+5%",
//       trend: "up",
//       icon: <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
//     },
//   ]

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="mt-8"
//     >
//       <Card className="glassEffect">
//         <CardHeader>
//           <CardTitle className="text-lg">Integration Insights</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {insights.map((insight, index) => (
//               <motion.div
//                 key={insight.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * index, duration: 0.5 }}
//               >
//                 <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="rounded-full bg-blue-50 dark:bg-blue-900 p-2">{insight.icon}</div>
//                       <span
//                         className={`text-xs font-medium flex items-center ${
//                           insight.trend === "up"
//                             ? "text-green-600 dark:text-green-400"
//                             : "text-red-600 dark:text-red-400"
//                         }`}
//                       >
//                         {insight.change}
//                         {insight.trend === "up" ? (
//                           <svg
//                             className="w-3 h-3 ml-1"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                           </svg>
//                         ) : (
//                           <svg
//                             className="w-3 h-3 ml-1"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                           </svg>
//                         )}
//                       </span>
//                     </div>
//                     <div className="space-y-1">
//                       <h3 className="text-sm font-medium text-muted-foreground">{insight.title}</h3>
//                       <p className="text-2xl font-bold">{insight.value}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, TrendingUp, Users, MessageSquare } from "lucide-react"

export default function IntegrationInsights({ userData }: { userData?: any }) {
  // Use real data if available, otherwise use defaults
  let instagramData

  try {
    instagramData = userData?.integrations?.find((i: any) => i && i.name === "INSTAGRAM") || null
  } catch (error) {
    console.error("Error finding Instagram data:", error)
    instagramData = null
  }

  const insights = [
    {
      title: "Engagement Rate",
      value:
        instagramData && instagramData.followersCount
          ? `${((instagramData.followersCount || 0) / 100).toFixed(1)}%`
          : "0.0%",
      change: "+0.6%",
      trend: "up",
      icon: <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Follower Count",
      value: instagramData?.followersCount?.toLocaleString() || "0",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5 text-green-600 dark:text-green-400" />,
    },
    {
      title: "Following Count",
      value: instagramData?.followingCount?.toLocaleString() || "0",
      change: "-3%",
      trend: "down",
      icon: <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
    },
    {
      title: "Posts Count",
      value: instagramData?.postsCount?.toLocaleString() || "0",
      change: "+5%",
      trend: "up",
      icon: <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <Card className="glassEffect">
        <CardHeader>
          <CardTitle className="text-lg">Integration Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="rounded-full bg-blue-50 dark:bg-blue-900 p-2">{insight.icon}</div>
                      <span
                        className={`text-xs font-medium flex items-center ${
                          insight.trend === "up"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {insight.change}
                        {insight.trend === "up" ? (
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">{insight.title}</h3>
                      <p className="text-2xl font-bold">{insight.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

