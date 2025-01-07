// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { motion, AnimatePresence } from 'framer-motion'

// type Activity = {
//   id: string
//   type: 'comment' | 'dm'
//   message: string
//   timestamp: Date
// }

// const ActivityFeed = () => {
//   const [activities, setActivities] = useState<Activity[]>([])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newActivity: Activity = {
//         id: Math.random().toString(36).substr(2, 9),
//         type: Math.random() > 0.5 ? 'comment' : 'dm',
//         message: `New ${Math.random() > 0.5 ? 'comment' : 'DM'} received`,
//         timestamp: new Date(),
//       }
//       setActivities(prev => [newActivity, ...prev.slice(0, 4)])
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Real-time Activity</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <AnimatePresence>
//           {activities.map((activity) => (
//             <motion.div
//               key={activity.id}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3 }}
//               className="flex items-center justify-between py-2 border-b last:border-b-0"
//             >
//               <div className="flex items-center">
//                 <div className={`w-2 h-2 rounded-full mr-2 ${activity.type === 'comment' ? 'bg-green-500' : 'bg-blue-500'}`} />
//                 <span>{activity.message}</span>
//               </div>
//               <span className="text-sm text-text-secondary">
//                 {activity.timestamp.toLocaleTimeString()}
//               </span>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </CardContent>
//     </Card>
//   )
// }

// export default ActivityFeed


// 'use client'

// import React, { useEffect, useState, useRef } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// type Activity = {
//   id: string
//   type: 'comment' | 'dm'
//   message: string
//   timestamp: Date
// }

// const ActivityFeed = () => {
//   const [activities, setActivities] = useState<Activity[]>([])
//   const feedRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newActivity: Activity = {
//         id: Math.random().toString(36).substr(2, 9),
//         type: Math.random() > 0.5 ? 'comment' : 'dm',
//         message: `New ${Math.random() > 0.5 ? 'comment' : 'DM'} received`,
//         timestamp: new Date(),
//       }
//       setActivities(prev => [newActivity, ...prev.slice(0, 5)]) // Keep only the latest 20 activities
//     }, 12000)

//     return () => clearInterval(interval)
//   }, [])

//   useEffect(() => {
//     if (feedRef.current) {
//       feedRef.current.scrollTop = 0
//     }
//   }, [activities])

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Real-time Activity</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div ref={feedRef} className="h-[300px] overflow-y-auto">
//           {activities.map((activity) => (
//             <div
//               key={activity.id}
//               className="flex items-center justify-between py-2 border-b last:border-b-0"
//             >
//               <div className="flex items-center">
//                 <div className={`w-2 h-2 rounded-full mr-2 ${activity.type === 'comment' ? 'bg-green-500' : 'bg-blue-500'}`} />
//                 <span>{activity.message}</span>
//               </div>
//               <span className="text-sm text-text-secondary">
//                 {activity.timestamp.toLocaleTimeString()}
//               </span>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default ActivityFeed

'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQueryAutomations } from '@/hooks/user-queries'
import { MessageSquare, Mail } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

type Activity = {
  id: string
  type: 'comment' | 'dm'
  message: string
  timestamp: Date
}

const ActivityFeed: React.FC = () => {
  const { data, isLoading, error } = useQueryAutomations()

  const activities: Activity[] = useMemo(() => {
    if (!data?.data) return []

    return data.data.flatMap(item => {
      const activities: Activity[] = []

      if (item.listener?.lastComment) {
        activities.push({
          id: `comment-${item.id}`,
          type: 'comment',
          message: item.listener.lastComment,
          timestamp: new Date(item.createdAt)
        })
      }

      if (item.listener?.lastDm) {
        activities.push({
          id: `dm-${item.id}`,
          type: 'dm',
          message: item.listener.lastDm,
          timestamp: new Date(item.createdAt)
        })
      }

      return activities
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10)
  }, [data])

  const renderActivityItem = (activity: Activity) => (
    <div
      key={activity.id}
      className="flex items-start space-x-4 py-3 border-b last:border-b-0"
    >
      <div className="flex-shrink-0 mt-1">
        {activity.type === 'comment' ? (
          <MessageSquare className="w-5 h-5 text-green-500" />
        ) : (
          <Mail className="w-5 h-5 text-blue-500" />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {activity.type === 'comment' ? 'New comment' : 'New DM'}
        </p>
        <p className="text-sm text-gray-500 truncate">{activity.message}</p>
      </div>
      <div className="flex-shrink-0 text-xs text-gray-500">
        {formatTimestamp(activity.timestamp)}
      </div>
    </div>
  )

  const renderContent = () => {
    if (isLoading) {
      return Array(5).fill(0).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 py-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="space-y-2 flex-grow">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))
    }

    if (error) {
      return <p className="text-red-500">Error loading activities. Please try again later.</p>
    }

    if (activities.length === 0) {
      return <p className="text-gray-500">No recent activities.</p>
    }

    return activities.map(renderActivityItem)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Real-time Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] overflow-y-auto pr-4">
          {renderContent()}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

const formatTimestamp = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return date.toLocaleDateString()
}

export default ActivityFeed

