'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Zap, Users } from 'lucide-react'

const stats = [
  { icon: MessageSquare, label: 'DMs Automated', value: 1000000, increment: 17 },
  { icon: Zap, label: 'Time Saved (hours)', value: 50000, increment: 2 },
  { icon: Users, label: 'Active Users', value: 10000, increment: 1 },
]

export default function DynamicStats() {
  const [currentStats, setCurrentStats] = useState(stats.map(stat => ({ ...stat, currentValue: stat.value })))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prevStats =>
        prevStats.map(stat => ({
          ...stat,
          currentValue: stat.currentValue + stat.increment
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {currentStats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <stat.icon className="w-12 h-12 text-[#2563EB] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {stat.currentValue.toLocaleString()}
          </h3>
          <p className="text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

