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


'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Activity = {
  id: string
  type: 'comment' | 'dm'
  message: string
  timestamp: Date
}

const ActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Math.random().toString(36).substr(2, 9),
        type: Math.random() > 0.5 ? 'comment' : 'dm',
        message: `New ${Math.random() > 0.5 ? 'comment' : 'DM'} received`,
        timestamp: new Date(),
      }
      setActivities(prev => [newActivity, ...prev.slice(0, 5)]) // Keep only the latest 20 activities
    }, 120000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0
    }
  }, [activities])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={feedRef} className="h-[300px] overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${activity.type === 'comment' ? 'bg-green-500' : 'bg-blue-500'}`} />
                <span>{activity.message}</span>
              </div>
              <span className="text-sm text-text-secondary">
                {activity.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityFeed

