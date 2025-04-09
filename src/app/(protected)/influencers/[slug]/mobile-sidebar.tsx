"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  BriefcaseBusiness,
  DollarSign,
  HelpCircle,
  ImageIcon,
  Instagram,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Settings,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileSidebar({ isOpen, onClose, activeTab, onTabChange }: MobileSidebarProps) {
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-sidebar]")) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    // Prevent scrolling when sidebar is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleTabClick = (tab: string) => {
    onTabChange(tab)
    onClose()
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "campaigns", label: "Campaigns", icon: <BriefcaseBusiness className="h-5 w-5" /> },
    { id: "content", label: "Content", icon: <ImageIcon className="h-5 w-5" /> },
    { id: "earnings", label: "Earnings", icon: <DollarSign className="h-5 w-5" /> },
    { id: "audience", label: "Audience", icon: <Users className="h-5 w-5" /> },
    { id: "opportunities", label: "Opportunities", icon: <Zap className="h-5 w-5" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="h-5 w-5" /> },
    { id: "tasks", label: "Tasks", icon: <ListChecks className="h-5 w-5" /> },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            data-mobile-sidebar
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] bg-card shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-14 items-center justify-between border-b px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Instagram className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-semibold">InstaGrowth</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <ScrollArea className="flex-1 px-2 py-4">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`group flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors
                        ${
                          activeTab === item.id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }
                      `}
                    >
                      <div
                        className={`
                        flex h-8 w-8 items-center justify-center rounded-md 
                        ${
                          activeTab === item.id
                            ? "bg-primary/20 text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        }
                      `}
                      >
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                      {item.id === "messages" && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                          3
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </ScrollArea>

              {/* Footer */}
              <div className="border-t p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => handleTabClick("settings")}
                    className={`group flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors
                      ${
                        activeTab === "settings"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                    `}
                  >
                    <div
                      className={`
                      flex h-8 w-8 items-center justify-center rounded-md 
                      ${
                        activeTab === "settings"
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }
                    `}
                    >
                      <Settings className="h-5 w-5" />
                    </div>
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => window.open("/help", "_blank")}
                    className="group flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground group-hover:text-foreground">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <span>Help Center</span>
                  </button>
                </nav>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
