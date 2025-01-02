// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Bell, X, Check, AlertTriangle, Info } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { NotificationItem } from '@/components/global/navbar/notifications/notificationitem'
// // import { NotificationBadge } from './NotificationBadge' // Removed import
// import { useNotifications } from '@/hooks/use-notifications'
// import { Notification, NotificationType } from '@/types/notifications'
// import { cn } from '@/lib/utils'

// export const Notifications: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const notificationRef = useRef<HTMLDivElement>(null)
//   const { notifications, markAsRead, clearAll } = useNotifications()
//   const unreadCount = notifications.filter(n => !n.read).length

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
//         setIsOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const toggleNotifications = () => setIsOpen(!isOpen)

//   return (
//     <div className="relative" ref={notificationRef}>
//       <Button
//         onClick={toggleNotifications}
//         className={cn(
//           "bg-white rounded-full py-6 transition-all duration-300 ease-in-out relative",
//           isOpen && "ring-2 ring-blue-500 ring-opacity-50"
//         )}
//       >
//         <Bell
//         color="#3352CC"
//         fill="#3352CC"
//           // className="w-6 h-6 text-blue-600"
//           // style={{ 
//           //   filter: isOpen ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : 'none'
//           // }}
//         />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
//             {unreadCount > 99 ? '99+' : unreadCount}
//           </span>
//         )}
//       </Button>
      
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 10 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
//           >
//             <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
//               <h3 className="text-lg font-semibold">Notifications</h3>
//               <Button
//                 onClick={clearAll}
//                 variant="ghost"
//                 size="sm"
//                 className="text-white hover:bg-blue-700"
//               >
//                 Clear All
//               </Button>
//             </div>
//             <div className="max-h-96 overflow-y-auto">
//               <AnimatePresence initial={false}>
//                 {notifications.length > 0 ? (
//                   notifications.map((notification, index) => (
//                     <NotificationItem
//                       key={notification.id}
//                       notification={notification}
//                       onMarkAsRead={() => markAsRead(notification.id)}
//                       index={index}
//                     />
//                   ))
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="p-4 text-center text-gray-500"
//                   >
//                     No notifications
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotificationItem } from '@/components/global/navbar/notifications/notificationitem'
import { useNotifications } from '@/hooks/use-notifications'
import { cn } from '@/lib/utils'

export const Notifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)
  const { notifications, markAsRead, clearAll } = useNotifications()
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleNotifications = () => setIsOpen(!isOpen)

  return (
    <div className="relative" ref={notificationRef}>
      <Button
        onClick={toggleNotifications}
        className={cn(
          "bg-gray-800 rounded-full py-6 transition-all duration-300 ease-in-out relative",
          isOpen && "ring-2 ring-blue-500 ring-opacity-50"
        )}
      >
        <Bell className="w-6 h-6 text-blue-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 sm:w-72 md:w-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50 border border-blue-500"
          >
          
            <div className="p-4 bg-gray-800 text-blue-400 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <Button
                onClick={clearAll}
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-500"
              >
                Clear All
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <AnimatePresence initial={false}>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={() => markAsRead(notification.id)}
                      index={index}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 text-center text-gray-500"
                  >                 
                    No notifications
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
