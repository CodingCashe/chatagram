"use client"

import { useQueryAutomations } from "@/hooks/user-queries"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Mail } from "lucide-react"

const CounterAnimation = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = Number.parseInt(value.toString(), 10)
    if (start === end) return

    const duration = 1000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      setCount(Math.floor(start))
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <span className="text-5xl font-bold">{count.toLocaleString()}</span>
}

const EnhancedMetricsCard = () => {
  const { data } = useQueryAutomations()
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null)

  const automations = data?.data || []

  const filteredAutomations = selectedAutomation
    ? automations.filter((automation) => automation.id === selectedAutomation)
    : automations

  const comments = filteredAutomations.reduce((current, next) => {
    return current + (next.listener?.commentCount || 0)
  }, 0)

  const dms = filteredAutomations.reduce((current, next) => {
    return current + (next.listener?.dmCount || 0)
  }, 0)

  const metrics = [
    { title: "Comments", value: comments, subtext: "On your posts", icon: MessageSquare },
    { title: "Dms", value: dms, subtext: "On your account", icon: Mail },
  ]

  return (
    <div className="space-y-8">
      <Select value={selectedAutomation || ""} onValueChange={(value) => setSelectedAutomation(value || null)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an automation (or all)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Automations</SelectItem> {/* Changed value to "all" */}
          {automations.map((automation) => (
            <SelectItem key={automation.id} value={automation.id}>
              {automation.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="wait">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <metric.icon className="w-6 h-6 text-primary" />
                    <span>{metric.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-48">
                    <CounterAnimation value={metric.value} />
                    <p className="text-sm text-muted-foreground mt-2">{metric.subtext}</p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-2 bg-gradient-to-r from-primary to-secondary mt-6 rounded-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EnhancedMetricsCard

