import { Suspense } from "react"
import { ReferralProgramsTable } from "./referral-programs-table"
import { ReferralStatsCards } from "./referral-stats-cards"
import { ReferralProgramSkeleton } from "./referral-program-skeleton"

export const metadata = {
  title: "Referral Programs",
  description: "Manage your referral programs",
}

export default function ReferralProgramsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Referral Programs</h1>

      <Suspense fallback={<ReferralProgramSkeleton />}>
        <ReferralStatsCards />
        <div className="mt-8">
          <ReferralProgramsTable />
        </div>
      </Suspense>
    </div>
  )
}

