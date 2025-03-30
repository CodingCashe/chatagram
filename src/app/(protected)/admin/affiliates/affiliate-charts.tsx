// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Line, Bar, ResponsiveContainer, LineChart, BarChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// interface MonthlyData {
//   month: string
//   year: number
//   clicks: number
//   referrals: number
//   commissions: number
// }

// interface AffiliateChartsProps {
//   data: MonthlyData[]
// }

// export default function AffiliateCharts({ data }: AffiliateChartsProps) {
//   return (
//     <div className="grid gap-4 md:grid-cols-2">
//       <Card>
//         <CardHeader>
//           <CardTitle>Referrals vs Clicks</CardTitle>
//           <CardDescription>Monthly comparison of total clicks and successful referrals</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer
//             config={{
//               clicks: {
//                 label: "Clicks",
//                 color: "hsl(var(--chart-1))",
//               },
//               referrals: {
//                 label: "Referrals",
//                 color: "hsl(var(--chart-2))",
//               },
//             }}
//             className="h-[300px]"
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" tickFormatter={(value, index) => `${value} ${data[index]?.year}`} />
//                 <YAxis />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Legend />
//                 <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="referrals" stroke="var(--color-referrals)" />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Commission Earnings</CardTitle>
//           <CardDescription>Monthly commission earnings from affiliate program</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer
//             config={{
//               commissions: {
//                 label: "Commissions ($)",
//                 color: "hsl(var(--chart-3))",
//               },
//             }}
//             className="h-[300px]"
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" tickFormatter={(value, index) => `${value} ${data[index]?.year}`} />
//                 <YAxis />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Legend />
//                 <Bar dataKey="commissions" fill="var(--color-commissions)" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, Bar, ResponsiveContainer, LineChart, BarChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MonthlyData {
  month: string
  year: number
  clicks: number
  referrals: number
  commissions: number
}

interface AffiliateChartsProps {
  data: MonthlyData[]
}

export default function AffiliateCharts({ data }: AffiliateChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Referrals vs Clicks</CardTitle>
          <CardDescription>Monthly comparison of total clicks and successful referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              clicks: {
                label: "Clicks",
                color: "hsl(var(--chart-1))",
              },
              referrals: {
                label: "Referrals",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(value, index) => `${value} ${data[index]?.year}`} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="referrals" stroke="var(--color-referrals)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Earnings</CardTitle>
          <CardDescription>Monthly commission earnings from affiliate program</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              commissions: {
                label: "Commissions ($)",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(value, index) => `${value} ${data[index]?.year}`} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="commissions" fill="var(--color-commissions)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

