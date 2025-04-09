import type React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children ? (
        children
      ) : (
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline-block">New Content</span>
          <span className="sm:hidden">New</span>
        </Button>
      )}
    </div>
  )
}
