import { Suspense } from "react"
import { getDashboardData } from "@/actions/dashboard/dashboard"
import { onCurrentUser } from "@/actions/user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AutomationList } from "./automation-list"
import { RecentDms } from "./recent-dms"
import { ActiveConversations } from "./active-conversations"
import { RecentKeywords } from "./recent-keywords"

export default async function DashboardPage() {
  const user = await onCurrentUser()
  const dashboardData = await getDashboardData(user.id)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Instagram Bot Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
          <AutomationList automations={dashboardData.automations} />
        </Suspense>
        <Suspense fallback={<Card className="w-full h-[300px] animate-pulse bg-gray-800" />}>
          <RecentDms dms={dashboardData.recentDms} />
        </Suspense>
        <Suspense fallback={<Card className="w-full h-[200px] animate-pulse bg-gray-800" />}>
          <ActiveConversations count={dashboardData.activeConversations} />
        </Suspense>
      </div>
    </div>
  )
}

