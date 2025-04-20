"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { DashboardNav } from "./dashboard-nav"
import { MobileNav } from "./mobile-nav"
import { UserNav } from "./user-nav"
import { NotificationsPopover } from "./notifications"
import { Search, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EnhancedDashboard } from "./enhanced-dashboard"
import { useTheme } from "@/providers/themeProvider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DashboardShellProps {
  children?: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showEnhancedDashboard, setShowEnhancedDashboard] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMounted) {
    return null
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {isMobile ? (
                <MobileNav key="mobile-nav" />
              ) : (
                <motion.button
                  key="sidebar-toggle"
                  onClick={toggleSidebar}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </motion.button>
              )}
            </AnimatePresence>
            <motion.span
              className="hidden font-bold md:inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Yazil
            </motion.span>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 md:justify-between">
            <motion.div
              className={cn(
                "relative hidden w-full max-w-sm md:flex",
                searchFocused && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-lg",
              )}
              animate={{
                width: searchFocused ? "100%" : "auto",
                maxWidth: searchFocused ? "460px" : "340px",
              }}
              transition={{ duration: 0.2 }}
            >
              <Search
                className={cn(
                  "absolute left-2.5 top-2.5 h-4 w-4 transition-colors duration-200",
                  searchFocused ? "text-primary" : "text-muted-foreground",
                )}
              />
              <Input
                type="search"
                placeholder="Search anything..."
                className="w-full rounded-lg bg-background pl-8 pr-4 transition-all duration-200 border-muted"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </motion.div>

            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative overflow-hidden group"
                      onClick={() => setShowEnhancedDashboard(!showEnhancedDashboard)}
                    >
                      <Sparkles className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all group-hover:text-indigo-500" />
                      <span className="sr-only">Toggle Enhanced Dashboard</span>
                      <span className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showEnhancedDashboard ? "Hide" : "Show"} Enhanced Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <NotificationsPopover />
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <motion.aside
          initial={false}
          animate={{
            width: isSidebarOpen ? 280 : 0,
            opacity: isSidebarOpen ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "fixed inset-y-0 left-0 z-30 hidden h-full flex-col border-r bg-background pt-16 md:flex",
            !isSidebarOpen && "hidden",
          )}
        >
          <DashboardNav pathname={pathname} />

          <div className="mt-auto p-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full group relative overflow-hidden"
              onClick={toggleSidebar}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Collapse</span>
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </div>
        </motion.aside>

        <motion.div
          initial={false}
          animate={{
            marginLeft: isSidebarOpen && !isMobile ? 280 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="flex-1"
        >
          <main className="flex-1 p-4 md:p-6">
            {!isSidebarOpen && !isMobile && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-4 group relative overflow-hidden"
                  onClick={toggleSidebar}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <span>Expand Sidebar</span>
                  </span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </Button>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {showEnhancedDashboard ? (
                <motion.div
                  key="enhanced-dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EnhancedDashboard />
                </motion.div>
              ) : (
                <motion.div
                  key="regular-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </motion.div>
      </div>
    </div>
  )
}
