import { DashboardHeader } from "./components/dashboard-header"
import { DashboardCards } from "./components/dashboard-cards"
import { RecentUsers } from "./components/recent-users"
import { SubscriptionChart } from "./components/subscription-chart"
import { AutomationStats } from "./components/automation-stats"
import { getDashboardStats, getRecentUsers } from "./actions"

export default async function AdminDashboard() {
  // Fetch dashboard data
  const stats = await getDashboardStats()
  const recentUsers = await getRecentUsers(5)

  return (
    <div className="container p-6 space-y-8">
      <DashboardHeader />
      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscriptionChart />
        <AutomationStats />
      </div>

      <RecentUsers initialUsers={recentUsers} />
    </div>
  )
}

