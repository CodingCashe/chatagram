"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const slugMatch = pathname.match(/^\/influencers\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  const routes = [
    {
      href: `/influencers/${slug}/dashboard/`,
      label: "Dashboard",
    },
    {
      href: `/influencers/${slug}/analytics/`,
      label: "Analytics",
    },
    {
      href: `/influencers/${slug}/content/`,
      label: "Content",
    },
    {
      href: `/influencers/${slug}/campaigns/`,
      label: "Campaigns",
    },
    {
      href: `/influencers/${slug}/audience/`,
      label: "Audience",
    },
    {
      href: `/influencers/${slug}/calendar/`,
      label: "Calendar",
    },
    {
      href: `/influencers/${slug}/hashtags/`,
      label: "Hashtags",
    },
    {
      href: `/influencers/${slug}/ideas/`,
      label: "Content Ideas",
    },
    {
      href: `/influencers/${slug}/messages/`,
      label: "Messages",
      badge: 3,
    },
    {
      href: `/influencers/${slug}/earnings/`,
      label: "Earnings",
    },
    {
      href: `/influencers/${slug}/growth/`,
      label: "Growth",
    },
    {
      href: `/influencers/${slug}/opportunities/`,
      label: "Opportunities",
      badge: 5,
    },
    {
      href: `/influencers/${slug}/insights/`,
      label: "Insights",
    },
    {
      href: `/influencers/${slug}/settings/`,
      label: "Settings",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            InstaGrowth
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                  pathname === route.href ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
              >
                {route.label}
                {route.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                    {route.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
