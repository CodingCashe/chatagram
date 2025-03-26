import { Suspense } from "react"
import { EmailAnalyticsDashboard } from "../components/email-analytics-dashboard"
import { Separator } from "@/components/ui/separator"
import { EmailAnalyticsLoading } from "./loading"

export const metadata = {
  title: "Email Analytics | Admin Dashboard",
  description: "View analytics for your email marketing campaigns",
}

export default async function EmailAnalyticsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Analytics</h1>
        <p className="text-muted-foreground">Track the performance of your email marketing campaigns</p>
      </div>

      <Separator />

      <Suspense fallback={<EmailAnalyticsLoading />}>
        <EmailAnalyticsDashboard />
      </Suspense>
    </div>
  )
}

