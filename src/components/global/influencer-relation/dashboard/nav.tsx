"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname  } from "next/navigation"
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
  const pathnamme = usePathname()
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  

  const routes = [
    {
      href: `/influencers/${slug}/dashboard/`,
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: `/influencers/${slug}/analytics/`,
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: `/influencers/${slug}/content/`,
      icon: ImageIcon,
      title: "Content",
    },
    {
      href: `/influencers/${slug}/campaigns/`,
      icon: Briefcase,
      title: "Campaigns",
    },
    {
      href: `/influencers/${slug}/audience/`,
      icon: Users,
      title: "Audience",
    },
    {
      href: `/influencers/${slug}/calendar/`,
      icon: Calendar,
      title: "Calendar",
    },
    {
      href: `/influencers/${slug}/messages/`,
      icon: MessageSquare,
      title: "Messages",
    },
    {
      href: `/influencers/${slug}/earnings/`,
      icon: CreditCard,
      title: "Earnings",
    },
    {
      href: `/influencers/${slug}/growth/`,
      icon: TrendingUp,
      title: "Growth",
    },
    {
      href: `/influencers/${slug}/opportunities/`,
      icon: Zap,
      title: "Opportunities",
    },
    {
      href: `/influencers/${slug}/settings/`,
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
