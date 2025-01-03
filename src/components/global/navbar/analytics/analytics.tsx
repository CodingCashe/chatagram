'use client'

import React from 'react'
import { BarChart2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const Analytics = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <BarChart2 className="h-5 w-5" />
            <span className="sr-only">Analytics</span>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="hidden sm:block">Analytics Dashboard</p>
          <p className="sm:hidden">Analytics</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Analytics
