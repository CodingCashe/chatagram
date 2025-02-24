"use client"

import { Suspense, useState } from "react"
import PostCreator from "../_components/schedulers/PostCreator"
import ScheduledPosts from "../_components/schedulers/ScheduledPosts"
import Analytics from "../_components/schedulers/Analytics"
import AIAssistant from "../_components/schedulers/AIAssistant"
import ContentInspiration from "../_components/schedulers/ContentInspiration"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

const tabItems = [
  { value: "create", label: "Create", color: "bg-gray-600" },
  { value: "scheduled", label: "Scheduled", color: "bg-gray-600" },
  { value: "analytics", label: "Analytics", color: "bg-gray-600" },
  { value: "ai-assistant", label: "AI Assistant", color: "bg-gray-600" },
  { value: "inspiration", label: "Inspiration", color: "bg-gray-600" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("create")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-2 sm:p-4">
      <div className="container mx-auto space-y-4 sm:space-y-8">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
          Instagram Post Scheduler
        </h1>

        {/* Desktop Tabs */}
        <div className="hidden sm:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 rounded-xl bg-gray-800 p-1">
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="rounded-lg text-gray-300 data-[state=active]:text-white transition-all duration-300 data-[state=active]:bg-gray-700"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-gray-800 text-gray-100 border-gray-700">
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {tabItems.map((item) => (
                <SelectItem key={item.value} value={item.value} className="text-gray-100">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-800 border-2 border-gray-700 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
              <CardHeader className="bg-gray-750 p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                  {tabItems.find((item) => item.value === activeTab)?.label}
                </CardTitle>
                <CardDescription className="text-gray-300">{getCardDescription(activeTab)}</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <Suspense fallback={<div className="text-center">Loading...</div>}>{getTabContent(activeTab)}</Suspense>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function getCardDescription(tab: string) {
  switch (tab) {
    case "create":
      return "Upload files or generate content with AI"
    case "scheduled":
      return "Manage your upcoming posts"
    case "analytics":
      return "Track your post performance"
    case "ai-assistant":
      return "Get AI-powered content suggestions"
    case "inspiration":
      return "Get fresh ideas for your posts"
    default:
      return ""
  }
}

function getTabContent(tab: string) {
  switch (tab) {
    case "create":
      return <PostCreator />
    case "scheduled":
      return <ScheduledPosts />
    case "analytics":
      return <Analytics />
    case "ai-assistant":
      return <AIAssistant />
    case "inspiration":
      return <ContentInspiration />
    default:
      return null
  }
}

