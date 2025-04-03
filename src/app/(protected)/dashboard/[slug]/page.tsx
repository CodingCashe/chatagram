// Add this line at the top of your file
export const dynamic = 'force-dynamic'

// Rest of your page component
import { Suspense } from "react"
import  InstagramDashboard  from "./_components/insta/profile"
import { getDashboardData } from "@/actions/dashboard"
import { getDashboardDati } from "@/actions/dashboard/dashboard"
import { onCurrentUser } from "@/actions/user"
import { Card, CardContent } from "@/components/ui/card"
import { AutomationList } from "./_components/newdash/automation-list"
import { RecentConversations } from "./_components/newdash/recent-dms"
import ContentSuggestions from "./_components/dash/ContentSuggestions"
import { BarDuoToneBlue } from "@/icons"
import DoubleGradientCard from "@/components/global/double-gradient-card"
import { DASHBOARD_CARDS } from "@/constants/dashboard"
import EnhancedMetricsCard from "./_components/dash/EnhancedMetricsCard"
import SentimentAnalysis from "./_components/dash/SentimentAnalysis"
import EngagementPredictor from "./_components/dash/EngagementPredictor"
import AIPerformance from "./_components/dash/AIPerformance"
import EngagementInsights from "./_components/dash/EngagementInsights"
import HashtagCloud from "./_components/dash/HashtagCloud"
import type { Automation, Conversation } from "@/types/dashboard"

export default async function DashboardPage() {
  const user = await onCurrentUser()
  const dashboardData = await getDashboardData()

  return (
    <div className="flex flex-col gap-y-10">

      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card) => (
          <DoubleGradientCard key={card.id} {...card} />
        ))}
      </div>

      <div className="flex gap-5 lg:flex-row flex-col">
        <EngagementInsights />
      </div>
      

      <div className="border-[1px] relative border-in-active/50 p-5 rounded-xl">
        <span className="flex gap-x-1 z-50 items-center mb-5">
          <BarDuoToneBlue />
          <div className="z-0">
            <h2 className="text-2xl font-medium text-white">Engagement Analytics</h2>
            <p className="text-text-secondary text-sm">Monitor Your Engagement in Real Time</p>
          </div>
        </span>
        <div className="w-full flex lg:flex-row flex-col gap-5">
          <div className="lg:w-6/12">
            <InstagramDashboard />
          </div>
          <div className="lg:w-6/12">
            <EnhancedMetricsCard />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense fallback={<Card className="w-full h-[300px] animate-pulse" />}>
            {dashboardData.data ? (
              <AutomationList automations={dashboardData.data.automations as Automation[]} />
            ) : (
              <Card className="w-full h-[300px]">
                <CardContent className="flex items-center justify-center h-full">
                  <p>Failed to load automations</p>
                </CardContent>
              </Card>
            )}
          </Suspense>
          <EngagementPredictor />
        </div>
        <div className="grid grid-cols-1 gap-6">
        {/* <SentimentAnalysis /> */}
        <HashtagCloud />
      </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentSuggestions />
        <AIPerformance />
      </div>
      
    </div>
  )
}

