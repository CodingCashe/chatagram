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

// import { DashboardHeader } from "./components/dashboard-header"
// import { DashboardCards } from "./components/dashboard-cards"
// import { RecentUsers } from "./components/recent-users"
// import { SubscriptionChart } from "./components/subscription-chart"
// import { AutomationStats } from "./components/automation-stats"
// import { QuickActions } from "./components/quick-actions"
// import { SystemHealth } from "./components/system-health"
// import { ActivityTimeline } from "./components/activity-timeline"
// import { getDashboardStats, getRecentUsers, getCurrentAdmin } from "./actions"

// export default async function AdminDashboard() {
//   // Fetch admin details
//   const admin = await getCurrentAdmin()

//   // Fetch dashboard data
//   const stats = await getDashboardStats()
//   const recentUsers = await getRecentUsers(5)

//   return (
//     <div className="container p-6 space-y-8">
//       <DashboardHeader adminName={admin.name} />

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

// import { DashboardHeader } from "./components/dashboard-header"
// import { DashboardCards } from "./components/dashboard-cards"
// import { RecentUsers } from "./components/recent-users"
// import { SubscriptionChart } from "./components/subscription-chart"
// import { AutomationStats } from "./components/automation-stats"
// import { QuickActions } from "./components/quick-actions"
// import { SystemHealth } from "./components/system-health"
// import { ActivityTimeline } from "./components/activity-timeline"
// import { PlatformInsights } from "./components/platform-insights"
// import { UpcomingContent } from "./components/upcoming-content"
// import { getDashboardStats, getRecentUsers, getCurrentAdmin, getUpcomingContent } from "./actions"

// export default async function AdminDashboard() {
//   // Fetch admin details
//   const admin = await getCurrentAdmin()

//   // Fetch dashboard data
//   const stats = await getDashboardStats()
//   const recentUsers = await getRecentUsers(5)
//   const upcomingContent = await getUpcomingContent(3)

//   return (
//     <div className="flex flex-col min-h-screen">
//       <DashboardHeader adminName={admin.name} adminEmail={admin.email} />

//       <div className="flex-1 container p-4 md:p-6 space-y-6">
//         <div className="flex flex-col gap-2">
//           <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//           <p className="text-muted-foreground">Monitor account activities.</p>
//         </div>

//         <DashboardCards stats={stats} />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <PlatformInsights />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <SubscriptionChart />
//               <AutomationStats />
//             </div>

//             <RecentUsers initialUsers={recentUsers} />
//           </div>

//           <div className="space-y-6">
//             <QuickActions />
//             <UpcomingContent initialContent={upcomingContent} />
//             <SystemHealth />
//             <ActivityTimeline />
//           </div>
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
import { PlatformInsights } from "./components/platform-insights"
import { UpcomingContent } from "./components/upcoming-content"
import { DashboardOverview } from "./components/dashboard-overview"
import { MessageTemplates } from "./components/message-template"
import { getDashboardStats, getRecentUsers, getCurrentAdmin, getUpcomingContent } from "./actions"

export default async function AdminDashboard() {
  // Fetch admin details
  const admin = await getCurrentAdmin()

  // Fetch dashboard data
  const stats = await getDashboardStats()
  const recentUsers = await getRecentUsers(5)
  const upcomingContent = await getUpcomingContent(3)

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader adminName={admin.name} adminEmail={admin.email} />

      <div className="flex-1 container p-4 md:p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor Account activities</p>
        </div>

        {/* New Dashboard Overview Component */}
        <DashboardOverview />

        <DashboardCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PlatformInsights />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SubscriptionChart />
              <AutomationStats />
            </div>

            <RecentUsers initialUsers={recentUsers} />

            {/* New Message Templates Component */}
            <MessageTemplates />
          </div>

          <div className="space-y-6">
            <QuickActions />
            <UpcomingContent initialContent={upcomingContent} />
            <SystemHealth />
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </div>
  )
}

