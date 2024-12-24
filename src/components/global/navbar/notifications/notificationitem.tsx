import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Notification, NotificationType } from '@/types/notifications'
import { cn } from '@/lib/utils'

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: () => void
  index: number
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  like: <Heart className="w-5 h-5 text-red-500" />,
  comment: <MessageCircle className="w-5 h-5 text-blue-500" />,
  follow: <UserPlus className="w-5 h-5 text-green-500" />,
  mention: <AtSign className="w-5 h-5 text-purple-500" />,
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "p-4 border-b last:border-b-0 flex items-start gap-3 hover:bg-gray-50 transition-colors duration-200",
        !notification.read && "bg-blue-50"
      )}
    >
      <div className="flex-shrink-0">{iconMap[notification.type]}</div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <img src={notification.user.avatar} alt={notification.user.username} className="w-8 h-8 rounded-full" />
          <div>
            <span className="text-black font-semibold">{notification.user.username}</span>
            <span className="text-gray-600"> {notification.action}</span>
          </div>
        </div>
        {notification.content && (
          <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
        )}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-gray-400">{notification.timestamp}</span>
          {!notification.read && (
            <Button
              onClick={onMarkAsRead}
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700"
            >
              Mark as read
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

