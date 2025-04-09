"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ArrowUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { getRevenueAnalytics } from "@/actions/influencer-relations/influencer"

export function RevenueAnalytics() {
  const [revenue, setRevenue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const { status, data, message } = await getRevenueAnalytics()

        if (status === 200 && data) {
          setRevenue(data)
        } else {
          setError(message || "Failed to load revenue analytics")
        }
      } catch (err) {
        setError("An error occurred while fetching revenue analytics")
      } finally {
        setLoading(false)
      }
    }

    fetchRevenue()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Your earnings breakdown</CardDescription>
          </div>
          <div className="rounded-full bg-primary/10 p-1.5">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {loading ? (
              <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                {error}
              </div>
            ) : !revenue ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                No revenue data available
              </div>
            ) : (
              <>
                <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border p-2">
                    <div className="text-xs text-muted-foreground">Total</div>
                    <div className="text-lg font-bold">{formatCurrency(revenue.totalEarnings)}</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-xs text-muted-foreground">This Month</div>
                    <div className="text-lg font-bold">{formatCurrency(revenue.currentMonthEarnings)}</div>
                    <div className="flex items-center justify-center text-[10px] text-green-500">
                      <ArrowUp className="mr-0.5 h-2.5 w-2.5" />
                      {revenue.monthlyEarningsGrowth}%
                    </div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-xs text-muted-foreground">Pending</div>
                    <div className="text-lg font-bold">{formatCurrency(revenue.pendingEarnings)}</div>
                  </div>
                </div>

                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenue.earnings}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value: any) => [formatCurrency(value), "Revenue"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="breakdown">
            {loading ? (
              <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                {error}
              </div>
            ) : !revenue ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                No revenue data available
              </div>
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenue.earnings}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value: any) => [formatCurrency(value), "Revenue"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend formatter={(value) => <span className="text-xs capitalize">{value}</span>} />
                    <Bar dataKey="campaigns" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="affiliate" stackId="a" fill="hsl(var(--primary) / 0.7)" />
                    <Bar dataKey="sponsorships" stackId="a" fill="hsl(var(--primary) / 0.4)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
