'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export const FollowerGrowthGame = () => {
  const [followers, setFollowers] = useState(100)
  const [engagement, setEngagement] = useState(0)
  const [autoMode, setAutoMode] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoMode) {
      interval = setInterval(() => {
        setFollowers((prev) => Math.floor(prev * (1 + Math.random() * 0.05)))
        setEngagement((prev) => Math.min(100, prev + Math.random() * 5))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [autoMode])

  const handleManualEngage = () => {
    setFollowers((prev) => Math.floor(prev * (1 + Math.random() * 0.02)))
    setEngagement((prev) => Math.min(100, prev + Math.random() * 2))
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-center">Grow Your Following</h3>
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-lg font-semibold">Followers</p>
          <motion.p
            key={followers}
            initial={{ scale: 1.5, color: '#4CAF50' }}
            animate={{ scale: 1, color: '#000000' }}
            className="text-3xl font-bold"
          >
            {followers.toLocaleString()}
          </motion.p>
        </div>
        <div>
          <p className="text-lg font-semibold">Engagement</p>
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center"
            style={{
              background: `conic-gradient(#3B82F6 ${engagement}%, #E5E7EB ${engagement}% 100%)`,
            }}
          >
            <p className="text-2xl font-bold">{Math.round(engagement)}%</p>
          </motion.div>
        </div>
      </div>
      <div className="space-y-4">
        <Button
          onClick={handleManualEngage}
          className="w-full"
          disabled={autoMode}
        >
          Engage Manually
        </Button>
        <Button
          onClick={() => setAutoMode(!autoMode)}
          variant={autoMode ? 'destructive' : 'outline'}
          className="w-full"
        >
          {autoMode ? 'Disable' : 'Enable'} Chatal Auto-Engage
        </Button>
      </div>
    </div>
  )
}

