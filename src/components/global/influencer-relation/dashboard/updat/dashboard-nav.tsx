"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import {
  BarChart3,
  Calendar,
  CreditCard,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  Zap,
  Briefcase,
  Hash,
  Lightbulb,
  PieChart,
} from "lucide-react"

interface NavProps {
  pathname: string
}

export function DashboardNav({ pathname }: NavProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const slugMatch = pathname.match(/^\/influencers\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  const routes = [
    {
      href: `/influencers/${slug}/dashboard/`,
      icon: LayoutDashboard,
      title: "Dashboard",
      color: "from-violet-500 to-indigo-500",
      description: "Overview of your account",
    },
    {
      href: `/influencers/${slug}/analytics/`,
      icon: BarChart3,
      title: "Analytics",
      color: "from-blue-500 to-cyan-500",
      description: "Track your performance",
    },
    {
      href: `/influencers/${slug}/content/`,
      icon: ImageIcon,
      title: "Content",
      color: "from-pink-500 to-rose-500",
      description: "Manage your posts",
    },
    {
      href: `/influencers/${slug}/campaigns/`,
      icon: Briefcase,
      title: "Campaigns",
      color: "from-amber-500 to-orange-500",
      description: "Active brand partnerships",
    },
    {
      href: `/influencers/${slug}/audience/`,
      icon: Users,
      title: "Audience",
      color: "from-emerald-500 to-green-500",
      description: "Understand your followers",
    },
    {
      href: `/influencers/${slug}/calendar/`,
      icon: Calendar,
      title: "Calendar",
      color: "from-blue-500 to-indigo-500",
      description: "Schedule your content",
    },
    {
      href: `/influencers/${slug}/hashtags/`,
      icon: Hash,
      title: "Hashtags",
      color: "from-purple-500 to-violet-500",
      description: "Research trending tags",
    },
    {
      href: `/influencers/${slug}/ideas/`,
      icon: Lightbulb,
      title: "Content Ideas",
      color: "from-amber-500 to-yellow-500",
      description: "Get inspired",
    },
    {
      href: `/influencers/${slug}/messages/`,
      icon: MessageSquare,
      title: "Messages",
      color: "from-blue-500 to-sky-500",
      description: "Chat with brands",
      badge: 3,
    },
    {
      href: `/influencers/${slug}/earnings/`,
      icon: CreditCard,
      title: "Earnings",
      color: "from-emerald-500 to-teal-500",
      description: "Track your revenue",
    },
    {
      href: `/influencers/${slug}/growth/`,
      icon: TrendingUp,
      title: "Growth",
      color: "from-green-500 to-emerald-500",
      description: "Follower analytics",
    },
    {
      href: `/influencers/${slug}/opportunities/`,
      icon: Zap,
      title: "Opportunities",
      color: "from-amber-500 to-red-500",
      description: "Find new partnerships",
      badge: 5,
    },
    {
      href: `/influencers/${slug}/insights/`,
      icon: PieChart,
      title: "Insights",
      color: "from-violet-500 to-purple-500",
      description: "Advanced analytics",
    },
    {
      href: `/influencers/${slug}/settings/`,
      icon: Settings,
      title: "Settings",
      color: "from-slate-500 to-gray-500",
      description: "Manage your account",
    },
  ]

  return (
    <ScrollArea className="flex-1 px-3 py-4">
      <div className="space-y-1 pb-4">
        <div className="px-3 py-2">
          <h3 className="mb-1 text-xs font-medium text-muted-foreground">Overview</h3>
          <div className="space-y-1">
            {routes.slice(0, 5).map((route) => (
              <NavItem
                key={route.href}
                route={route}
                pathname={pathname}
                isHovered={hoveredItem === route.href}
                onHover={() => setHoveredItem(route.href)}
                onLeave={() => setHoveredItem(null)}
              />
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h3 className="mb-1 text-xs font-medium text-muted-foreground">Content</h3>
          <div className="space-y-1">
            {routes.slice(5, 9).map((route) => (
              <NavItem
                key={route.href}
                route={route}
                pathname={pathname}
                isHovered={hoveredItem === route.href}
                onHover={() => setHoveredItem(route.href)}
                onLeave={() => setHoveredItem(null)}
              />
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h3 className="mb-1 text-xs font-medium text-muted-foreground">Business</h3>
          <div className="space-y-1">
            {routes.slice(9, 13).map((route) => (
              <NavItem
                key={route.href}
                route={route}
                pathname={pathname}
                isHovered={hoveredItem === route.href}
                onHover={() => setHoveredItem(route.href)}
                onLeave={() => setHoveredItem(null)}
              />
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h3 className="mb-1 text-xs font-medium text-muted-foreground">Account</h3>
          <div className="space-y-1">
            {routes.slice(13).map((route) => (
              <NavItem
                key={route.href}
                route={route}
                pathname={pathname}
                isHovered={hoveredItem === route.href}
                onHover={() => setHoveredItem(route.href)}
                onLeave={() => setHoveredItem(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

interface NavItemProps {
  route: {
    href: string
    icon: React.ElementType
    title: string
    color: string
    description?: string
    badge?: number
  }
  pathname: string
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function NavItem({ route, pathname, isHovered, onHover, onLeave }: NavItemProps) {
  const isActive = pathname === route.href
  const Icon = route.icon

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={route.href} passHref>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start relative overflow-hidden group",
                isActive && "bg-primary/10 font-medium text-primary",
              )}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <div className="relative z-10 flex items-center w-full">
                <div
                  className={cn(
                    "mr-2 h-4 w-4 transition-all duration-300",
                    isActive ? "text-primary" : isHovered ? "scale-110" : "",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {isHovered && !isActive && (
                    <motion.div
                      className={cn("absolute inset-0 bg-gradient-to-r opacity-100", route.color)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ mixBlendMode: "lighten" }}
                    />
                  )}
                </div>
                <span className={cn("transition-all duration-200", isHovered && !isActive && "translate-x-1")}>
                  {route.title}
                </span>
                {route.badge && (
                  <span
                    className={cn(
                      "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold transition-colors duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isHovered
                          ? `bg-gradient-to-r ${route.color} text-white`
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {route.badge}
                  </span>
                )}
              </div>

              {/* Background gradient on hover */}
              {isHovered && !isActive && (
                <motion.div
                  className={cn("absolute inset-0 bg-gradient-to-r opacity-10", route.color)}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 0.1, x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex flex-col">
          <p className="font-medium">{route.title}</p>
          {route.description && <p className="text-xs text-muted-foreground">{route.description}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
