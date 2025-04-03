"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Calendar, ChevronDown, Instagram, Plus, Search, Settings, Sparkles, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobiles"

export default function AutomationDashboardHeader() {
  const [isHovering, setIsHovering] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMobile()

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Show notification dot periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(true)
      const timeout = setTimeout(() => {
        setShowNotification(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      {/* Main Header Card */}
      <Card className="border-2 border-blue-500/20 overflow-hidden relative">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left Section - Title and Instagram Icon */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-blue-500" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: showNotification ? 1 : 0 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                />
              </motion.div>

              {/* <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">Instagram Automation</h2>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                    Pro
                  </Badge>
                </div>
                <p className="text-muted-foreground">Manage your Instagram DM automations</p>
              </div>
            </div> */}

            {/* Right Section - Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {/* Quick Action Buttons - Responsive */}
              <div className="flex gap-2">
                {/* Settings Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10"
                      >
                        <Settings className="h-5 w-5 text-green-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Calendar Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10"
                      >
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Schedule</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Notifications Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10 relative"
                      >
                        <Bell className="h-5 w-5 text-green-500" />
                        <AnimatePresence>
                          {showNotification && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                            />
                          )}
                        </AnimatePresence>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Search Button/Input */}
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative"
                  >
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search automations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10 h-12 border-blue-500/30 focus-visible:ring-blue-500/50 w-[250px] md:w-[300px]"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-blue-500/10"
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="search-button"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search className="h-5 w-5 text-green-500" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Create Button - Responsive */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                className="relative"
              >
                <AnimatePresence mode="wait">
                  {isMobile ? (
                    <motion.div
                      key="mobile-button"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            className="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-lg h-12 w-12 rounded-full"
                          >
                            <Plus className="h-5 w-5" />
                            <span className="sr-only">Create New Automation</span>
                            <motion.div
                              animate={{
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1 : 0.8,
                                rotate: isHovering ? [0, 15, -15, 0] : 0,
                              }}
                              transition={{
                                rotate: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
                                opacity: { duration: 0.2 },
                              }}
                              className="absolute -top-2 -right-2"
                            >
                              <Sparkles className="h-5 w-5 text-yellow-300" />
                            </motion.div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Create New</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Instagram className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Welcome Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4 text-green-500" />
                            <span>Notification Sequence</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Scheduled Campaign</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="desktop-button"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="lg"
                            className="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-lg group h-12 px-6 rounded-full"
                          >
                            <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                            Create New Automation
                            <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                            <motion.div
                              animate={{
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1 : 0.8,
                                rotate: isHovering ? [0, 15, -15, 0] : 0,
                              }}
                              transition={{
                                rotate: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
                                opacity: { duration: 0.2 },
                              }}
                              className="absolute -top-2 -right-2"
                            >
                              <Sparkles className="h-5 w-5 text-yellow-300" />
                            </motion.div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Create New</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Instagram className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Welcome Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4 text-green-500" />
                            <span>Notification Sequence</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Scheduled Campaign</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="mt-4 mx-auto max-w-fit"
      >
        <Badge
          variant="outline"
          className="bg-blue-500/5 text-blue-500 border-blue-500/20 px-3 py-1.5 text-xs flex items-center gap-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          All systems operational
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-muted-foreground text-xs">Updated just now</span>
        </Badge>
      </motion.div>
    </div>
  )
}

