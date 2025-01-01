// import { useState, useEffect } from 'react'
// import { Notification, NotificationType } from '@/types/notifications'

// const sampleNotifications: Notification[] = [
//   {
//     id: '1',
//     type: 'like',
//     user: {
//       id: 'user1',
//       username: 'Angel Mamaa',
//       avatar: 'https://i.pravatar.cc/150?img=1'
//     },
//     action: 'liked your post.',
//     read: false,
//     timestamp: '2m'
//   },
//   {
//     id: '2',
//     type: 'comment',
//     user: {
//       id: 'user2',
//       username: 'Mrs.Cashe',
//       avatar: 'https://i.pravatar.cc/150?img=2'
//     },
//     action: 'commented on your post:',
//     content: 'Great photo! 😍',
//     read: false,
//     timestamp: '1h'
//   },
//   {
//     id: '3',
//     type: 'follow',
//     user: {
//       id: 'user3',
//       username: 'Cashe King',
//       avatar: 'https://i.pravatar.cc/150?img=3'
//     },
//     action: 'started following you.',
//     read: true,
//     timestamp: '2d'
//   },
//   {
//     id: '4',
//     type: 'mention',
//     user: {
//       id: 'user4',
//       username: 'Brayo Mbiggie',
//       avatar: 'https://i.pravatar.cc/150?img=4'
//     },
//     action: 'mentioned you in a comment:',
//     content: 'Hey @Casheisking, check this out!',
//     read: false,
//     timestamp: '5h'
//   },
// ]

// export const useNotifications = () => {
//   const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)

//   const addNotification = (notification: Notification) => {
//     setNotifications(prev => [notification, ...prev])
//   }

//   const markAsRead = (id: string) => {
//     setNotifications(prev =>
//       prev.map(notif =>
//         notif.id === id ? { ...notif, read: true } : notif
//       )
//     )
//   }

//   const clearAll = () => {
//     setNotifications([])
//   }

//   // Simulating real-time notifications (replace this with actual Instagram integration)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newNotification: Notification = {
//         id: Date.now().toString(),
//         type: ['like', 'comment', 'follow', 'mention'][Math.floor(Math.random() * 4)] as NotificationType,
//         user: {
//           id: `user${Math.floor(Math.random() * 1000)}`,
//           username: `user${Math.floor(Math.random() * 1000)}`,
//           avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
//         },
//         action: `performed a ${['like', 'comment', 'follow', 'mention'][Math.floor(Math.random() * 4)]} action.`,
//         content: Math.random() > 0.5 ? 'Some optional content for comments or mentions.' : undefined,
//         read: false,
//         timestamp: 'Just now'
//       }
//       addNotification(newNotification)
//     }, 60000) // Add a new notification every 1 min

//     return () => clearInterval(interval)
//   }, [])

//   return { notifications, addNotification, markAsRead, clearAll }
// }

import { useState, useEffect } from 'react'
import { useQueryAutomations } from '@/hooks/user-queries'
import { Notification } from '@/types/notifications'

export const useNotifications = () => {
  const { data } = useQueryAutomations()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Function to map Instagram data to notification format
  const mapInstagramDataToNotifications = (data: any): Notification[] => {
    return data?.data.map((item: any, index: number) => ({
      id: `notif-${index}`,
      type: item.listener?.commentCount ? 'comment' : item.listener?.dmCount ? 'dm' : 'other',
      user: {
        id: `user-${index}`,
        username: item.listener?.username || 'Unknown User',
        avatar: `https://i.pravatar.cc/150?img=${index + 1}`, // Placeholder avatar
      },
      action: item.listener?.commentCount
        ? 'commented on your post.'
        : item.listener?.dmCount
        ? 'sent you a direct message.'
        : 'performed an action.',
      content: item.listener?.commentCount
        ? item.listener?.lastComment
        : item.listener?.dmCount
        ? item.listener?.lastDm
        : undefined,
      read: false,
      timestamp: new Date(item.timestamp || Date.now()).toLocaleTimeString(),
    })) || []
  }

  // Update notifications whenever Instagram data changes
  useEffect(() => {
    if (data) {
      const newNotifications = mapInstagramDataToNotifications(data)
      setNotifications(newNotifications)
    }
  }, [data])

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return { notifications, addNotification, markAsRead, clearAll }
}
