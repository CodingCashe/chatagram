"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
} from "lucide-react"

interface NavProps {
  pathname: string
}

export function DashboardNav({ pathname }: NavProps) {
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
    <ScrollArea className="flex-1 px-2 py-4">
      <div className="space-y-1">
        <TooltipProvider delayDuration={0}>
          {routes.map((route) => (
            <Tooltip key={route.href}>
              <TooltipTrigger asChild>
                <Link href={route.href} passHref>
                  <Button
                    variant={pathname === route.href ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start",
                      pathname === route.href && "bg-primary/10 font-medium text-primary",
                    )}
                  >
                    <route.icon className={cn("mr-2 h-4 w-4", pathname === route.href && "text-primary")} />
                    {route.title}
                    {route.title === "Messages" && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        3
                      </span>
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{route.title}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </ScrollArea>
  )
}
