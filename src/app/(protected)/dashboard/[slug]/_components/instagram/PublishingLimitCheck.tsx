"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle, Instagram } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

interface PublishingLimitCheckProps {
  userId: string
}

export default function PublishingLimitCheck({ userId }: PublishingLimitCheckProps) {
  const [limit, setLimit] = useState<number | null>(null)
  const [used, setUsed] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    async function checkLimit() {
      try {
        const response = await fetch(`/api/instagram-publishing-limit?userId=${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch publishing limit")
        }
        const data = await response.json()
        setLimit(data.quota_total)
        setUsed(data.quota_usage)
      } catch (err) {
        setError("Make sure your Instagram is integrated first")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkLimit()
  }, [userId])

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800 shadow-lg">
        <CardContent className="flex items-center justify-center h-40">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Instagram className="w-8 h-8 text-purple-500" />
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-red-900 border-red-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-100 flex items-center">
            <XCircle className="w-6 h-6 mr-2 text-red-300" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-100">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (limit === null || used === null) {
    return null
  }

  const remaining = limit - used
  const usagePercentage = (used / limit) * 100

  return (
    <Card className="bg-gray-900 border-gray-800 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-900 to-pink-900">
        <CardTitle className="text-white flex items-center">
          <Instagram className="w-6 h-6 mr-2" />
          Publishing Limit
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <p className="text-gray-300 mb-2 md:mb-0">
            Used: <span className="text-purple-400 font-bold">{used}</span> / {limit}
          </p>
          <p className="text-gray-300">
            Remaining: <span className="text-green-400 font-bold">{remaining}</span>
          </p>
        </div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
            <motion.div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
              style={{
                backgroundColor: usagePercentage > 80 ? "#ef4444" : "#8b5cf6",
                width: `${usagePercentage}%`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${usagePercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <AnimatePresence>
          {remaining <= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-yellow-900 rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 text-yellow-300 mr-2" />
              <p className="text-yellow-100 text-sm">Warning: You are close to your publishing limit!</p>
            </motion.div>
          )}
          {remaining > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-green-900 rounded-lg flex items-center"
            >
              <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
              <p className="text-green-100 text-sm">You have plenty of posts available!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

