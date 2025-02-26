"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileTabsProps {
  tabs: {
    value: string
    label: string
    icon: React.ReactNode
  }[]
  activeTab: string
  onChange: (value: string) => void
}

export function MobileTabs({ tabs, activeTab, onChange }: MobileTabsProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const activeTabData = tabs.find((tab) => tab.value === activeTab)

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800"
      >
        <div className="flex items-center gap-2">
          {activeTabData?.icon}
          <span className="text-sm font-medium">{activeTabData?.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.value}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onChange(tab.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm",
                  tab.value === activeTab && "text-purple-400",
                )}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

