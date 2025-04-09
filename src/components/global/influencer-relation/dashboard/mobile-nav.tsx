"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Calendar,
  CreditCard,
  ImageIcon,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  Zap,
  Briefcase,
  X,
} from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/influencer-dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/influencer-dashboard/analytics",
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: "/influencer-dashboard/content",
      icon: ImageIcon,
      title: "Content",
    },
    {
      href: "/influencer-dashboard/campaigns",
      icon: Briefcase,
      title: "Campaigns",
    },
    {
      href: "/influencer-dashboard/audience",
      icon: Users,
      title: "Audience",
    },
    {
      href: "/influencer-dashboard/calendar",
      icon: Calendar,
      title: "Calendar",
    },
    {
      href: "/influencer-dashboard/messages",
      icon: MessageSquare,
      title: "Messages",
    },
    {
      href: "/influencer-dashboard/earnings",
      icon: CreditCard,
      title: "Earnings",
    },
    {
      href: "/influencer-dashboard/growth",
      icon: TrendingUp,
      title: "Growth",
    },
    {
      href: "/influencer-dashboard/opportunities",
      icon: Zap,
      title: "Opportunities",
    },
    {
      href: "/influencer-dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-6 shadow-lg md:hidden"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold">
                  InstaGrowth
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close Menu</span>
                </Button>
              </div>

              <ScrollArea className="mt-6 h-[calc(100vh-5rem)]">
                <div className="space-y-1">
                  {routes.map((route) => (
                    <Link key={route.href} href={route.href} passHref>
                      <Button
                        variant={pathname === route.href ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start",
                          pathname === route.href && "bg-primary/10 font-medium text-primary",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <route.icon className={cn("mr-2 h-5 w-5", pathname === route.href && "text-primary")} />
                        {route.title}
                        {route.title === "Messages" && (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                            3
                          </span>
                        )}
                      </Button>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
