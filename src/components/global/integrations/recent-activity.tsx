// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Instagram, MessageCircle, Heart, Share2, RefreshCw, UserPlus } from "lucide-react"

// export default function RecentActivity({ userData }: { userData?: any }) {
//   // Generate activities based on real user data if available
//   const generateActivities = () => {
//     const defaultActivities = [
//       {
//         id: 1,
//         type: "comment",
//         platform: "instagram",
//         user: "sarah_designs",
//         avatar: "/placeholder.svg?height=40&width=40",
//         content: "Left a comment on your latest post",
//         time: "10 minutes ago",
//         icon: <MessageCircle className="h-4 w-4" />,
//       },
//       {
//         id: 2,
//         type: "like",
//         platform: "instagram",
//         user: "travel_photography",
//         avatar: "/placeholder.svg?height=40&width=40",
//         content: "Liked your photo",
//         time: "25 minutes ago",
//         icon: <Heart className="h-4 w-4" />,
//       },
//       {
//         id: 3,
//         type: "follow",
//         platform: "instagram",
//         user: "design_hub",
//         avatar: "/placeholder.svg?height=40&width=40",
//         content: "Started following you",
//         time: "1 hour ago",
//         icon: <UserPlus className="h-4 w-4" />,
//       },
//       {
//         id: 4,
//         type: "share",
//         platform: "instagram",
//         user: "creative_minds",
//         avatar: "/placeholder.svg?height=40&width=40",
//         content: "Shared your post",
//         time: "3 hours ago",
//         icon: <Share2 className="h-4 w-4" />,
//       },
//       {
//         id: 5,
//         type: "refresh",
//         platform: "system",
//         content: "Instagram data refreshed",
//         time: "5 hours ago",
//         icon: <RefreshCw className="h-4 w-4" />,
//       },
//     ]

//     // If we have real user data, add some activities based on it
//     if (userData?.integrations?.length > 0) {
//       const instagramIntegration = userData.integrations.find((i: any) => i.name === "INSTAGRAM")

//       if (instagramIntegration) {
//         // Add a real activity based on the integration data
//         defaultActivities.unshift({
//           id: 0,
//           type: "connect",
//           platform: "instagram",
//           user: instagramIntegration.username || "instagram_user",
//           avatar: instagramIntegration.profilePicture || "/placeholder.svg?height=40&width=40",
//           content: "Account connected successfully",
//           time: "Just now",
//           icon: <Instagram className="h-4 w-4" />,
//         })
//       }
//     }

//     return defaultActivities
//   }

//   const activities = generateActivities()

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//       className="mt-8"
//     >
//       <Card className="glassEffect">
//         <CardHeader>
//           <CardTitle className="text-lg">Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {activities.map((activity) => (
//               <div
//                 key={activity.id}
//                 className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md transition-colors"
//               >
//                 {activity.platform === "instagram" ? (
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={activity.avatar} alt={activity.user} />
//                     <AvatarFallback>{activity?.user?.substring(0, 2).toUpperCase()}</AvatarFallback>
//                   </Avatar>
//                 ) : (
//                   <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
//                     {activity.icon}
//                   </div>
//                 )}

//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <div className="font-medium">
//                       {activity.platform === "instagram" ? (
//                         <span className="flex items-center">
//                           {activity.user}
//                           <Instagram className="h-3 w-3 ml-1 text-blue-600 dark:text-blue-400" />
//                         </span>
//                       ) : (
//                         <span>System</span>
//                       )}
//                     </div>
//                     <span className="text-xs text-muted-foreground">{activity.time}</span>
//                   </div>
//                   <p className="text-sm text-muted-foreground">{activity.content}</p>
//                 </div>

//                 <Badge variant="outline" className="ml-2 flex items-center gap-1">
//                   {activity.icon}
//                   {activity.type}
//                 </Badge>
//               </div>
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Instagram, MessageCircle, Heart, Share2, RefreshCw, UserPlus } from "lucide-react"

export default function RecentActivity({ userData }: { userData?: any }) {
  // Generate activities based on real user data if available
  const generateActivities = () => {
    const defaultActivities = [
      {
        id: 1,
        type: "comment",
        platform: "instagram",
        user: "sarah_designs",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Left a comment on your latest post",
        time: "10 minutes ago",
        icon: <MessageCircle className="h-4 w-4" />,
      },
      {
        id: 2,
        type: "like",
        platform: "instagram",
        user: "travel_photography",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Liked your photo",
        time: "25 minutes ago",
        icon: <Heart className="h-4 w-4" />,
      },
      {
        id: 3,
        type: "follow",
        platform: "instagram",
        user: "design_hub",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Started following you",
        time: "1 hour ago",
        icon: <UserPlus className="h-4 w-4" />,
      },
      {
        id: 4,
        type: "share",
        platform: "instagram",
        user: "creative_minds",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Shared your post",
        time: "3 hours ago",
        icon: <Share2 className="h-4 w-4" />,
      },
      {
        id: 5,
        type: "refresh",
        platform: "system",
        content: "Instagram data refreshed",
        time: "5 hours ago",
        icon: <RefreshCw className="h-4 w-4" />,
      },
    ]

    // If we have real user data, add some activities based on it
    try {
      if (userData?.integrations && Array.isArray(userData.integrations) && userData.integrations.length > 0) {
        const instagramIntegration = userData.integrations.find((i: any) => i && i.name === "INSTAGRAM")

        if (instagramIntegration) {
          // Add a real activity based on the integration data
          defaultActivities.unshift({
            id: 0,
            type: "connect",
            platform: "instagram",
            user: instagramIntegration.username || "instagram_user",
            avatar: instagramIntegration.profilePicture || "/placeholder.svg?height=40&width=40",
            content: "Account connected successfully",
            time: "Just now",
            icon: <Instagram className="h-4 w-4" />,
          })
        }
      }
    } catch (error) {
      console.error("Error generating activities:", error)
    }

    return defaultActivities
  }

  const activities = generateActivities()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <Card className="glassEffect">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md transition-colors"
              >
                {activity.platform === "instagram" ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>{activity?.user?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    {activity.icon}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {activity.platform === "instagram" ? (
                        <span className="flex items-center">
                          {activity.user}
                          <Instagram className="h-3 w-3 ml-1 text-blue-600 dark:text-blue-400" />
                        </span>
                      ) : (
                        <span>System</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.content}</p>
                </div>

                <Badge variant="outline" className="ml-2 flex items-center gap-1">
                  {activity.icon}
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

