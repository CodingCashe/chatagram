// import { DashboardShell } from "@/components/global/influencer-relation/dashboard/updat/dashboard-shell"

// export default function DashboardPage() {
//   return (
//     <DashboardShell>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//           <p className="text-muted-foreground">
//             Manage your influencer profile, track performance, and find new opportunities.
//           </p>
//         </div>
//       </div>
//     </DashboardShell>
//   )
// }



"use client"

import { useState, useEffect, Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
// import { DashboardShell } from "@/components/global/influencer-relation/dashboard/shell"
import { DashboardShell } from "@/components/global/influencer-relation/dashboard/updat/dashboard-shell"
import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
import { InfluencerOverview } from "@/components/global/influencer-relation/influencer/overview"
import { InfluencerStats } from "@/components/global/influencer-relation/influencer/stats"
import { ContentPerformance } from "@/components/global/influencer-relation/influencer/content-performance"
import { UpcomingCampaigns } from "@/components/global/influencer-relation/influencer/upcoming-campaigns"
import { AudienceInsights } from "@/components/global/influencer-relation/influencer/audience-insights"
import { RevenueAnalytics } from "@/components/global/influencer-relation/influencer/revenue-analytics"
import { GrowthMetrics } from "@/components/global/influencer-relation/influencer/growth-metrics"
import { BrandOpportunities } from "@/components/global/influencer-relation/influencer/brand-opportunities"
import { BrandOpportunity } from "@/components/global/influencer-relation/influencer/available-opportunities"
import { ContentCalendar } from "@/components/global/influencer-relation/influencer/content-calendar"
import { ProfileCompletion } from "@/components/global/influencer-relation/influencer/profile-completion"
import { getInfluencerProfile } from "@/actions/influencer-relations/influencer"
import { User } from "lucide-react"

export default function InfluencerDashboardPage() {
  const [profileExists, setProfileExists] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkProfile() {
      try {
        const response = await getInfluencerProfile()
        setProfileExists(response.status === 200)
      } catch (error) {
        console.error("Error checking profile:", error)
        setProfileExists(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkProfile()
  }, [])

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Influencer Dashboard"
          text="Manage your content, campaigns, and analytics in one place."
        />
        <Skeleton className="h-[200px] w-full" />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Influencer Dashboard"
        text="Manage your content, campaigns, and analytics in one place."
      />

      {/* Profile Completion Banner - only shows if profile is incomplete */}
      <ProfileCompletion className="mb-6" />

      {/* Only show dashboard content if profile exists */}
      {profileExists && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
              <InfluencerOverview />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
              <InfluencerStats />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
              <GrowthMetrics />
            </Suspense>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full lg:col-span-2">
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <ContentPerformance />
              </Suspense>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <UpcomingCampaigns />
              </Suspense>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <AudienceInsights />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <RevenueAnalytics />
            </Suspense>
          </div>

          <div className="mt-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <ContentCalendar />
            </Suspense>
          </div>

          {/* <div className="mt-4">
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <BrandOpportunities />
            </Suspense>
          </div> */}
          <div className="mt-4">
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <BrandOpportunity />
            </Suspense>
          </div>
        </>
      )}

      {/* Show a full page profile setup prompt if profile doesn't exist */}
      {profileExists === false && (
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <User className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-amber-800">Set Up Your Influencer Profile</h2>
          <p className="mx-auto mb-6 max-w-md text-amber-700">
            Complete your profile to unlock all features of the influencer dashboard, get discovered by brands, and
            receive personalized campaign opportunities.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => (window.location.href = "/onboarding")}
              className="inline-flex items-center justify-center rounded-md bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Start Onboarding Process
            </button>
            <button
              onClick={() => (window.location.href = "/settings/profile")}
              className="inline-flex items-center justify-center rounded-md border border-amber-600 bg-transparent px-6 py-3 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Go to Profile Settings
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
