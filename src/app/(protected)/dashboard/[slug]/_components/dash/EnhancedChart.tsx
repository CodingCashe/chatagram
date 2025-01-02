'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

const chartData = [
  { month: 'January', desktop: 86, mobile: 78, tablet: 63 },
  { month: 'February', desktop: 50, mobile: 65, tablet: 42 },
  { month: 'March', desktop: 37, mobile: 52, tablet: 34 },
  { month: 'April', desktop: 73, mobile: 89, tablet: 68 },
  { month: 'May', desktop: 29, mobile: 41, tablet: 25 },
  { month: 'June', desktop: 14, mobile: 23, tablet: 18 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
  tablet: {
    label: 'Tablet',
    color: 'hsl(var(--chart-3))',
  },
}

const EnhancedChart = () => {
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <Card className="border-none p-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>DM Interactions</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer height={300} width={'100%'}>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTablet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-tablet)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-tablet)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Area
                type="monotone"
                dataKey="desktop"
                stackId="1"
                stroke="var(--color-desktop)"
                fillOpacity={1}
                fill="url(#colorDesktop)"
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stackId="1"
                stroke="var(--color-mobile)"
                fillOpacity={1}
                fill="url(#colorMobile)"
              />
              <Area
                type="monotone"
                dataKey="tablet"
                stackId="1"
                stroke="var(--color-tablet)"
                fillOpacity={1}
                fill="url(#colorTablet)"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default EnhancedChart

