// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { DollarSign, Users, BarChart3, RefreshCw } from "lucide-react"

// interface AffiliateStatsCardsProps {
//   stats: {
//     totalPrograms: number
//     totalAffiliates: number
//     totalReferrals: number
//     totalCommissions: number
//     pendingPayouts: number
//     conversionRate: number
//   }
// }

// export default function AffiliateStatsCards({ stats }: AffiliateStatsCardsProps) {
//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
//           <DollarSign className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">${stats.totalCommissions.toFixed(2)}</div>
//           <p className="text-xs text-muted-foreground">From {stats.totalReferrals} successful referrals</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.totalAffiliates}</div>
//           <p className="text-xs text-muted-foreground">Across {stats.totalPrograms} programs</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//           <BarChart3 className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.conversionRate.toFixed(2)}%</div>
//           <p className="text-xs text-muted-foreground">Of affiliate traffic converts</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
//           <RefreshCw className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.pendingPayouts}</div>
//           <p className="text-xs text-muted-foreground">Waiting for processing</p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, BarChart3, RefreshCw } from "lucide-react"

interface AffiliateStatsCardsProps {
  stats: {
    totalPrograms: number
    totalAffiliates: number
    totalReferrals: number
    totalCommissions: number
    pendingPayouts: number
    conversionRate: number
    monthlyPerformance?: any[] // Add this to match the actual data structure
  }
}

export default function AffiliateStatsCards({ stats }: AffiliateStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalCommissions.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">From {stats.totalReferrals} successful referrals</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAffiliates}</div>
          <p className="text-xs text-muted-foreground">Across {stats.totalPrograms} programs</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversionRate.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">Of affiliate traffic converts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingPayouts}</div>
          <p className="text-xs text-muted-foreground">Waiting for processing</p>
        </CardContent>
      </Card>
    </div>
  )
}

