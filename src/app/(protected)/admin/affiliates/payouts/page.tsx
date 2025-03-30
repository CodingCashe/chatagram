import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AffiliatePayoutsTable from "./affiliate-payouts-table"
import Loading from "../loading"

export const metadata = {
  title: "Affiliate Payouts",
}

export default function AffiliatePayoutsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Affiliate Payouts</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Payouts</CardTitle>
          <CardDescription>Process and track affiliate commission payouts</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Loading />}>
            <AffiliatePayoutsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

