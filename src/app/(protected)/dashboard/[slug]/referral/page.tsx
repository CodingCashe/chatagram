import { Suspense } from "react"
import { ReferralDashboard } from "./dashboard"
import { ReferralSkeleton } from "./skeleton"

export const metadata = {
  title: "Referral Program",
  description: "Refer friends and earn rewards",
}

export default function ReferralsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Referral Program</h1>
      <Suspense fallback={<ReferralSkeleton />}>
        <ReferralDashboard />
      </Suspense>
    </div>
  )
}

