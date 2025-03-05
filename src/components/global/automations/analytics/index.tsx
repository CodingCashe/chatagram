"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type AnalyticsData = {
  automationPerformance: {
    totalTriggered: number
    totalResponses: number
    avgResponseTime: string
    trend: "up" | "down"
    percentage: number
  }
  keywordInsights: {
    topKeywords: Array<{
      keyword: string
      count: number
      trend: "up" | "down"
    }>
  }
  audienceEngagement: {
    totalEngagements: number
    trend: "up" | "down"
    percentage: number
    breakdown: {
      comments: number
      directMessages: number
    }
  }
}

// Sample data
const sampleData: AnalyticsData = {
  automationPerformance: {
    totalTriggered: 342,
    totalResponses: 298,
    avgResponseTime: "1.2s",
    trend: "up",
    percentage: 12,
  },
  keywordInsights: {
    topKeywords: [
      { keyword: "price", count: 87, trend: "up" },
      { keyword: "discount", count: 64, trend: "down" },
      { keyword: "shipping", count: 53, trend: "up" },
      { keyword: "help", count: 41, trend: "up" },
      { keyword: "size", count: 32, trend: "down" },
    ],
  },
  audienceEngagement: {
    totalEngagements: 523,
    trend: "up",
    percentage: 8,
    breakdown: {
      comments: 342,
      directMessages: 181,
    },
  },
}

export const AnalyticsTab = () => {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week")
  const [data] = useState<AnalyticsData>(sampleData)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-light-blue" />
          Automation Analytics
        </h3>

        <div className="flex bg-background-80 rounded-md p-1">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs px-3 ${timeframe === "week" ? "bg-background-90" : ""}`}
            onClick={() => setTimeframe("week")}
          >
            Week
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs px-3 ${timeframe === "month" ? "bg-background-90" : ""}`}
            onClick={() => setTimeframe("month")}
          >
            Month
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs px-3 ${timeframe === "year" ? "bg-background-90" : ""}`}
            onClick={() => setTimeframe("year")}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-background-80 p-4 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-secondary">Total Triggered</p>
              <h4 className="text-2xl font-bold mt-1">{data.automationPerformance.totalTriggered}</h4>
            </div>
            <div className="p-2 bg-light-blue/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-light-blue" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            {data.automationPerformance.trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-xs ${data.automationPerformance.trend === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {data.automationPerformance.percentage}% from last {timeframe}
            </span>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-background-80 p-4 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-secondary">Responses Sent</p>
              <h4 className="text-2xl font-bold mt-1">{data.automationPerformance.totalResponses}</h4>
            </div>
            <div className="p-2 bg-keyword-purple/10 rounded-full">
              <MessageSquare className="h-5 w-5 text-keyword-purple" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            <span className="text-white">
              {Math.round(
                (data.automationPerformance.totalResponses / data.automationPerformance.totalTriggered) * 100,
              )}
              %
            </span>{" "}
            response rate
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-background-80 p-4 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-secondary">Avg. Response Time</p>
              <h4 className="text-2xl font-bold mt-1">{data.automationPerformance.avgResponseTime}</h4>
            </div>
            <div className="p-2 bg-keyword-green/10 rounded-full">
              <Clock className="h-5 w-5 text-keyword-green" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">Faster than 98% of similar accounts</div>
        </motion.div>
      </div>

      {/* Keyword Insights */}
      <div className="bg-background-80 p-4 rounded-xl">
        <h4 className="font-medium mb-3">Top Performing Keywords</h4>
        <div className="space-y-2">
          {data.keywordInsights.topKeywords.map((keyword, index) => (
            <div key={keyword.keyword} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 text-text-secondary text-sm">{index + 1}</div>
                <div className="px-2.5 py-1 bg-light-blue/10 text-light-blue rounded-full text-xs">
                  {keyword.keyword}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">{keyword.count}</span>
                {keyword.trend === "up" ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Engagement */}
      <div className="bg-background-80 p-4 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-medium">Audience Engagement</h4>
          <div className="flex items-center">
            {data.audienceEngagement.trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-xs ${data.audienceEngagement.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {data.audienceEngagement.percentage}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background-90 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-text-secondary">Comments</p>
                <h5 className="text-lg font-medium mt-1">{data.audienceEngagement.breakdown.comments}</h5>
              </div>
              <div className="p-1.5 bg-light-blue/10 rounded-full">
                <MessageSquare className="h-4 w-4 text-light-blue" />
              </div>
            </div>
          </div>

          <div className="bg-background-90 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-text-secondary">Direct Messages</p>
                <h5 className="text-lg font-medium mt-1">{data.audienceEngagement.breakdown.directMessages}</h5>
              </div>
              <div className="p-1.5 bg-keyword-purple/10 rounded-full">
                <Users className="h-4 w-4 text-keyword-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-background-80 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-light-blue" />
            Upcoming Automated Posts
          </h4>
          <Button variant="ghost" size="sm" className="text-xs text-light-blue">
            View all
          </Button>
        </div>

        <div className="space-y-2">
          <div className="bg-background-90 p-2 rounded-lg flex items-center">
            <div className="h-10 w-10 bg-background-80 rounded-md mr-3 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-light-blue" />
            </div>
            <div>
              <p className="text-sm">Product Launch Announcement</p>
              <p className="text-xs text-text-secondary">Tomorrow, 9:00 AM</p>
            </div>
          </div>

          <div className="bg-background-90 p-2 rounded-lg flex items-center">
            <div className="h-10 w-10 bg-background-80 rounded-md mr-3 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-keyword-purple" />
            </div>
            <div>
              <p className="text-sm">Weekly Tips & Tricks</p>
              <p className="text-xs text-text-secondary">Friday, 3:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsTab

