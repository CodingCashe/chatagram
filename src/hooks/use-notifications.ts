import { useState, useEffect } from 'react'
import { Notification, NotificationType } from '@/types/notifications'

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      id: 'user1',
      username: 'Cashe King',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    action: 'liked your post.',
    read: false,
    timestamp: '2m'
  },
  {
    id: '2',
    type: 'comment',
    user: {
      id: 'user2',
      username: 'Mrs.Cashe',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    action: 'commented on your post:',
    content: 'Great photo! 😍',
    read: false,
    timestamp: '1h'
  },
  {
    id: '3',
    type: 'follow',
    user: {
      id: 'user3',
      username: 'Angel',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    action: 'started following you.',
    read: true,
    timestamp: '2d'
  },
  {
    id: '4',
    type: 'mention',
    user: {
      id: 'user4',
      username: 'Brayo Mbiggie',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    action: 'mentioned you in a comment:',
    content: 'Hey @Casheisking, check this out!',
    read: false,
    timestamp: '5h'
  },
]

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  // Simulating real-time notifications (replace this with actual Instagram integration)
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ['like', 'comment', 'follow', 'mention'][Math.floor(Math.random() * 4)] as NotificationType,
        user: {
          id: `user${Math.floor(Math.random() * 1000)}`,
          username: `user${Math.floor(Math.random() * 1000)}`,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        },
        action: `performed a ${['like', 'comment', 'follow', 'mention'][Math.floor(Math.random() * 4)]} action.`,
        content: Math.random() > 0.5 ? 'Some optional content for comments or mentions.' : undefined,
        read: false,
        timestamp: 'Just now'
      }
      addNotification(newNotification)
    }, 30000) // Add a new notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { notifications, addNotification, markAsRead, clearAll }
}

