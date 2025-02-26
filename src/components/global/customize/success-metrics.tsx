"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, TrendingUp, Clock, Users, MessageSquare, ThumbsUp, RefreshCcw } from "lucide-react"

type Metric = {
  label: string
  value: number
  target: number
  trend: number
  icon: any
  color: string
}

export function SuccessMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: "Response Rate",
      value: 92,
      target: 95,
      trend: 5,
      icon: MessageSquare,
      color: "purple",
    },
    {
      label: "Customer Satisfaction",
      value: 88,
      target: 90,
      trend: 3,
      icon: ThumbsUp,
      color: "green",
    },
    {
      label: "Average Response Time",
      value: 75,
      target: 85,
      trend: -2,
      icon: Clock,
      color: "blue",
    },
    {
      label: "User Engagement",
      value: 82,
      target: 88,
      trend: 4,
      icon: Users,
      color: "orange",
    },
  ])

  const simulateMetrics = () => {
    setMetrics(
      metrics.map((metric) => ({
        ...metric,
        value: Math.min(100, Math.max(0, metric.value + (Math.random() * 10 - 5))),
        trend: Math.random() * 10 - 5,
      })),
    )
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Success Metrics Simulator</h2>
          <p className="text-gray-400">Preview potential performance metrics for your automation</p>
        </div>
        <Button
          onClick={simulateMetrics}
          className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Simulate
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}-500/10`}>
                    <metric.icon className={`w-5 h-5 text-${metric.color}-500`} />
                  </div>
                  <h3 className="font-medium text-gray-100">{metric.label}</h3>
                </div>
                <div className={`flex items-center gap-1 ${metric.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                  <TrendingUp className={`w-4 h-4 ${metric.trend < 0 && "rotate-180"}`} />
                  <span className="text-sm">{Math.abs(metric.trend).toFixed(1)}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Current</span>
                  <span className="font-medium text-gray-100">{metric.value.toFixed(1)}%</span>
                </div>
                <Progress value={metric.value} className="bg-gray-700 h-2">
                  <div
                    className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 rounded-full`}
                  />
                </Progress>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Target</span>
                  <span className="font-medium text-gray-100">{metric.target}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-100">Performance Insights</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-400">Overall Performance</span>
              </div>
              <div className="h-32 bg-gray-800/50 rounded-lg border border-gray-700 p-4">
                {/* Add chart visualization here */}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-400">Growth Trajectory</span>
              </div>
              <div className="h-32 bg-gray-800/50 rounded-lg border border-gray-700 p-4">
                {/* Add chart visualization here */}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

