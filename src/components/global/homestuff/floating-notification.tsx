'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell } from 'lucide-react'

// const notifications = [
//   "Sarah just automated 100 DMs!",
//   "New feature: Advanced targeting",
//   "Join our webinar on DM strategies",
//   "50% off Pro plan - Limited time!",
// ]
const notifications = [
  "Sarah just automated 100 DMs! 🚀",
  "New feature: Advanced targeting 🎯",
  "Join our webinar on DM strategies 💡",
  "50% off Pro plan - Limited time! 🔥",
  "Mike gained 200 followers with automated replies! 🎉",
  "Set up keyword triggers in under 5 minutes ⏱️",
  "Boost engagement by 80% with Chatal! 📈",
  "New integration: Track performance analytics 📊",
  "Emily doubled her sales using auto-DMs! 💰",
  "Your free trial starts now—sign up today! 🎁",
];

export default function FloatingNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState('')

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
      setCurrentNotification(randomNotification)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }

    const interval = setInterval(showNotification, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm flex items-center space-x-3"
        >
          <Bell className="h-6 w-6 text-purple-600" />
          <p className="text-sm text-gray-800">{currentNotification}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

