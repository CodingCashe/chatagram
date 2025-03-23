// import { DashboardHeader } from "./components/dashboard-header"
// import { DashboardCards } from "./components/dashboard-cards"
// import { RecentUsers } from "./components/recent-users"
// import { SubscriptionChart } from "./components/subscription-chart"
// import { AutomationStats } from "./components/automation-stats"
// import { getDashboardStats, getRecentUsers } from "./actions"

// export default async function AdminDashboard() {
//   // Fetch dashboard data
//   const stats = await getDashboardStats()
//   const recentUsers = await getRecentUsers(5)

//   return (
//     <div className="container p-6 space-y-8">
//       <DashboardHeader />
//       <DashboardCards stats={stats} />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <SubscriptionChart />
//         <AutomationStats />
//       </div>

//       <RecentUsers initialUsers={recentUsers} />
//     </div>
//   )
// }

// import { DashboardHeader } from "./components/dashboard-header"
// import { DashboardCards } from "./components/dashboard-cards"
// import { RecentUsers } from "./components/recent-users"
// import { SubscriptionChart } from "./components/subscription-chart"
// import { AutomationStats } from "./components/automation-stats"
// import { QuickActions } from "./components/quick-actions"
// import { SystemHealth } from "./components/system-health"
// import { ActivityTimeline } from "./components/activity-timeline"
// import { getDashboardStats, getRecentUsers } from "./actions"

// export default async function AdminDashboard() {
//   // Fetch dashboard data
//   const stats = await getDashboardStats()
//   const recentUsers = await getRecentUsers(5)

//   return (
//     <div className="container p-6 space-y-8">
//       <DashboardHeader />

//       <DashboardCards stats={stats} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <QuickActions />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <SubscriptionChart />
//             <AutomationStats />
//           </div>

//           <RecentUsers initialUsers={recentUsers} />
//         </div>

//         <div className="space-y-6">
//           <SystemHealth />
//           <ActivityTimeline />
//         </div>
//       </div>
//     </div>
//   )
// }

import { DashboardHeader } from "./components/dashboard-header"
import { DashboardCards } from "./components/dashboard-cards"
import { RecentUsers } from "./components/recent-users"
import { SubscriptionChart } from "./components/subscription-chart"
import { AutomationStats } from "./components/automation-stats"
import { QuickActions } from "./components/quick-actions"
import { SystemHealth } from "./components/system-health"
import { ActivityTimeline } from "./components/activity-timeline"
import { getDashboardStats, getRecentUsers, getCurrentAdmin } from "./actions"

export default async function AdminDashboard() {
  // Fetch admin details
  const admin = await getCurrentAdmin()

  // Fetch dashboard data
  const stats = await getDashboardStats()
  const recentUsers = await getRecentUsers(5)

  return (
    <div className="container p-6 space-y-8">
      <DashboardHeader adminName={admin.name} />

      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SubscriptionChart />
            <AutomationStats />
          </div>

          <RecentUsers initialUsers={recentUsers} />
        </div>

        <div className="space-y-6">
          <SystemHealth />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  )
}

