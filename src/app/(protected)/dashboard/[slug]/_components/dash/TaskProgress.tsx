'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

const TaskProgress = () => {
  const progress = 75

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <motion.circle
              className="text-primary stroke-current"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                strokeDasharray: "251.2",
                strokeDashoffset: "251.2",
              }}
            ></motion.circle>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
            {progress}%
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskProgress

