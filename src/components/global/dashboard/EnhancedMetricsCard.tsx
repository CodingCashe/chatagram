'use client'

import { useQueryAutomations } from '@/hooks/user-queries'
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const EnhancedMetricsCard = () => {
  const { data } = useQueryAutomations()
  const comments = data?.data.reduce((current, next) => {
    return current + next.listener?.commentCount!
  }, 0) || 0
  const dms = data?.data?.reduce((current, next) => {
    return current + next.listener?.dmCount!
  }, 0) || 0

  const metrics = [
    { title: 'Comments', value: comments, subtext: 'On your posts' },
    { title: 'Direct Messages', value: dms, subtext: 'On your account' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {metrics.map((metric, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center h-40"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <span className="text-4xl font-bold">{metric.value}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className="text-sm text-text-secondary mt-2"
              >
                {metric.subtext}
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: index * 0.1 + 0.6 }}
                className="h-2 bg-primary mt-4 rounded-full"
              />
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default EnhancedMetricsCard

