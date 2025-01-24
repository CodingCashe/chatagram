"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { EngagementData } from "@/types/dashboard"

interface DMDistributionProps {
  data: EngagementData[]
}

const DMDistribution: React.FC<DMDistributionProps> = ({ data }) => {
  const distributionData = useMemo(() => {
    const counts: { [key: number]: number } = {}
    data.forEach((day) => {
      const roundedDMs = Math.floor(day.dms / 10) * 10
      counts[roundedDMs] = (counts[roundedDMs] || 0) + 1
    })
    const sortedCounts = Object.entries(counts)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([dms, count]) => ({ dms: Number(dms), count }))
    const maxCount = Math.max(...sortedCounts.map((d) => d.count))
    return sortedCounts.map((d) => ({ ...d, intensity: d.count / maxCount }))
  }, [data])

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="flex items-end h-64 sm:h-80 space-x-2">
          {distributionData.map((d, index) => (
            <div key={d.dms} className="flex-1 flex flex-col items-center">
              <motion.div
                className="w-full bg-gradient-to-t from-gray-700 to-gray-500 rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${d.intensity * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
              <div className="text-xs text-gray-500 mt-2">{d.dms}+</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">Number of DMs per day</div>
      </CardContent>
    </Card>
  )
}

export default DMDistribution

