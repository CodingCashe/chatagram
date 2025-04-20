// import { Suspense } from "react"
// import { getAffiliateSystemStats } from "../actions/affiliate-admin-actions"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { BarChart, LineChart } from "lucide-react"
// import AffiliateStatsCards from "./affiliate-stats-cards"
// import AffiliateCharts from "./affiliate-charts"
// import AffiliateProgramsList from "./affiliate-programs-list"
// import Loading from "./loading"

// export const metadata = {
//   title: "Affiliate Management",
// }

// export default async function AffiliateManagementPage() {
//   const { success, stats } = await getAffiliateSystemStats()

//   if (!success) {
//     return <div className="p-6">Failed to load affiliate statistics</div>
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold tracking-tight">Affiliate Management</h1>
//       </div>

//       <Suspense fallback={<Loading />}>
//         <AffiliateStatsCards stats={stats} />
//       </Suspense>

//       <Tabs defaultValue="performance">
//         <TabsList>
//           <TabsTrigger value="performance">
//             <LineChart className="mr-2 h-4 w-4" />
//             Performance
//           </TabsTrigger>
//           <TabsTrigger value="programs">
//             <BarChart className="mr-2 h-4 w-4" />
//             Programs
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="performance" className="space-y-4">
//           <Suspense fallback={<Loading />}>
//             <AffiliateCharts data={stats.monthlyPerformance} />
//           </Suspense>
//         </TabsContent>

//         <TabsContent value="programs" className="space-y-4">
//           <Suspense fallback={<Loading />}>
//             <AffiliateProgramsList />
//           </Suspense>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// import { Suspense } from "react"
// import { getAffiliateSystemStats } from "../actions/affiliate-admin-actions"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { BarChart, LineChart } from "lucide-react"
// import AffiliateStatsCards from "./affiliate-stats-cards"
// import AffiliateCharts from "./affiliate-charts"
// import AffiliateProgramsList from "./affiliate-programs-list"
// import Loading from "./loading"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import Link from "next/link"

// export const metadata = {
//   title: "Affiliate Management",
// }

// export default async function AffiliatesPage() {
//   // Get the stats
//   const statsResult = await getAffiliateSystemStats()

//   // Provide default values if stats are undefined
//   const stats = statsResult.success
//     ? statsResult.stats
//     : {
//         totalPrograms: 0,
//         totalAffiliates: 0,
//         totalReferrals: 0,
//         totalCommissions: 0,
//         pendingPayouts: 0,
//         conversionRate: 0,
//         monthlyPerformance: [],
//       }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold tracking-tight">Affiliate Management</h1>
//         <Link href="/admin/affiliates/programs/new">
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             New Program
//           </Button>
//         </Link>
//       </div>

//       <AffiliateStatsCards stats={stats} />

//       <Tabs defaultValue="performance">
//         <TabsList>
//           <TabsTrigger value="performance">
//             <LineChart className="mr-2 h-4 w-4" />
//             Performance
//           </TabsTrigger>
//           <TabsTrigger value="programs">
//             <BarChart className="mr-2 h-4 w-4" />
//             Programs
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="performance" className="space-y-4">
//           {stats?.monthlyPerformance && stats.monthlyPerformance.length > 0 && (
//             <AffiliateCharts data={stats.monthlyPerformance} />
//           )}
//         </TabsContent>

//         <TabsContent value="programs" className="space-y-4">
//           <Suspense fallback={<Loading />}>
//             <AffiliateProgramsList />
//           </Suspense>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

import { Suspense } from "react"
import { getAffiliateSystemStats } from "../actions/affiliate-admin-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, Plus } from "lucide-react"
import AffiliateStatsCards from "./affiliate-stats-cards"
import AffiliateCharts from "./affiliate-charts"
import AffiliateProgramsList from "./affiliate-programs-list"
import Loading from "./loading"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Affiliate Management",
}

export default async function AffiliatesPage() {
  // Get the stats
  const statsResult = await getAffiliateSystemStats()

  // Provide default values if stats are undefined
  const stats = {
    totalPrograms: statsResult.success ? (statsResult.stats?.totalPrograms ?? 0) : 0,
    totalAffiliates: statsResult.success ? (statsResult.stats?.totalAffiliates ?? 0) : 0,
    totalReferrals: statsResult.success ? (statsResult.stats?.totalReferrals ?? 0) : 0,
    totalCommissions: statsResult.success ? (statsResult.stats?.totalCommissions ?? 0) : 0,
    pendingPayouts: statsResult.success ? (statsResult.stats?.pendingPayouts ?? 0) : 0,
    conversionRate: statsResult.success ? (statsResult.stats?.conversionRate ?? 0) : 0,
    monthlyPerformance: statsResult.success ? (statsResult.stats?.monthlyPerformance ?? []) : [],
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Affiliate Management</h1>
        <Link href="/admin/affiliates/programs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Program
          </Button>
        </Link>
      </div>

      <AffiliateStatsCards stats={stats} />

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">
            <LineChart className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="programs">
            <BarChart className="mr-2 h-4 w-4" />
            Programs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          {stats.monthlyPerformance && stats.monthlyPerformance.length > 0 && (
            <AffiliateCharts data={stats.monthlyPerformance} />
          )}
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Suspense fallback={<Loading />}>
            <AffiliateProgramsList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

