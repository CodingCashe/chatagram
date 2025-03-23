"use client"

import { Users, CreditCard, Bot, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardsProps {
  stats: {
    totalUsers: number
    proSubscriptions: number
    totalAutomations: number
    activeAutomations: number
    totalScheduledContent: number
  }
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">12%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pro Subscriptions</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.proSubscriptions}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">8%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Automations</CardTitle>
          <Bot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAutomations}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">24%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
          <Bot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeAutomations}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {stats.activeAutomations < stats.totalAutomations * 0.8 ? (
              <>
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-red-500">
                  {Math.round((stats.activeAutomations / stats.totalAutomations) * 100)}%
                </span>{" "}
                active rate
              </>
            ) : (
              <>
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">
                  {Math.round((stats.activeAutomations / stats.totalAutomations) * 100)}%
                </span>{" "}
                active rate
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

