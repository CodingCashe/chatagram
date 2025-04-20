"use client"

import {
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  type TooltipProps,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

// Line Chart
export function LineChart({
  data,
  xAxisKey = "name",
  series,
  title,
  description,
  className,
  ...props
}: {
  data: any[]
  xAxisKey?: string
  series: { name: string; key: string; color: string }[]
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
              {...props}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              {series.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  name={s.name}
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Bar Chart
export function BarChart({
  data,
  xAxisKey = "name",
  series,
  title,
  description,
  className,
  ...props
}: {
  data: any[]
  xAxisKey?: string
  series: { name: string; key: string; color: string }[]
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
              {...props}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              {series.map((s) => (
                <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.name} radius={[4, 4, 0, 0]} />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Pie Chart
export function PieChart({
  data,
  nameKey = "name",
  dataKey = "value",
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
  title,
  description,
  className,
  ...props
}: {
  data: any[]
  nameKey?: string
  dataKey?: string
  colors?: string[]
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
              {...props}
            >
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey}
                nameKey={nameKey}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom tooltip component
function ChartTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          <span className="font-bold text-muted-foreground">{payload[0]?.name}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
          <span className="font-bold">{payload[0]?.value}</span>
        </div>
      </div>
    </div>
  )
}

