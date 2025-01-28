// "use client"

// import type React from "react"
// import { useMemo } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
// import { format, parseISO } from "date-fns"
// import type { EngagementData } from "@/types/dashboard"

// interface TopDMDaysProps {
//   data: EngagementData[]
// }

// const TopDMDays: React.FC<TopDMDaysProps> = ({ data }) => {
//   const topDays = useMemo(() => {
//     return data
//       .sort((a, b) => b.dms - a.dms)
//       .slice(0, 5)
//       .map((day) => ({
//         date: format(parseISO(day.date), "MMM dd"),
//         dms: day.dms,
//       }))
//   }, [data])

//   return (
//     <Card className="bg-gray-900 border-gray-800">
//       <CardContent className="p-6">
//         <h3 className="text-lg font-semibold mb-4 text-gray-200">Top 5 DM Days</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={topDays}>
//             <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
//             <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
//             <Tooltip
//               contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
//               labelStyle={{ color: "#e5e7eb" }}
//               itemStyle={{ color: "#8884d8" }}
//             />
//             <Bar dataKey="dms" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }

// export default TopDMDays

"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format, parseISO } from "date-fns"
import type { EngagementData } from "@/types/dashboard"

interface TopDMDaysProps {
  data: EngagementData[]
}

const TopDMDays: React.FC<TopDMDaysProps> = ({ data }) => {
  const topDays = useMemo(() => {
    return data
      .sort((a, b) => b.dms - a.dms)
      .slice(0, 5)
      .map((day) => ({
        date: format(parseISO(day.date), "MMM dd"),
        dms: day.dms,
      }))
  }, [data])

  return (
    <Card className="bg-background/50 border-primary/20">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Top 5 DM Days</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topDays}>
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              itemStyle={{ color: "hsl(var(--primary))" }}
            />
            <Bar dataKey="dms" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default TopDMDays

