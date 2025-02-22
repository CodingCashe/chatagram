"use client"

import type React from "react"

import { PostScheduler } from "../_components/newSchedule/post-scheduler"
import { ScheduledPosts } from "../_components/newSchedule/scheduled-post"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SchedulePageClientProps {
  userId: string
}

export default function SchedulePageClient({ userId }: SchedulePageClientProps) {
  const [activeTab, setActiveTab] = useState<"scheduler" | "posts">("scheduler")

  return (
    <>
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4">
        <TabButton active={activeTab === "scheduler"} onClick={() => setActiveTab("scheduler")}>
          Scheduler
        </TabButton>
        <TabButton active={activeTab === "posts"} onClick={() => setActiveTab("posts")}>
          Scheduled Posts
        </TabButton>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeTab === "scheduler" ? (
          <motion.div
            key="scheduler"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <PostScheduler userId={userId} />
          </motion.div>
        ) : (
          <motion.div
            key="posts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ScheduledPosts userId={userId} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 ${
        active ? "bg-gray-800 text-white" : "bg-transparent text-gray-600"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Button>
  )
}

