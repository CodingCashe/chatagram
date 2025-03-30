import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AffiliateUsersTable from "./affiliate-users-table"
import AffiliateApplicationsTable from "./affiliate-applications-table"
import AffiliateLeaderboard from "./affiliate-leaderboard"
import Loading from "../loading"

export const metadata = {
  title: "Affiliate Users",
}

export default function AffiliateUsersPage({ searchParams }: { searchParams: { program?: string } }) {
  const programId = searchParams.program

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Affiliate Users</h1>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Affiliates</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Affiliates</CardTitle>
              <CardDescription>Manage your approved affiliate users</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loading />}>
                <AffiliateUsersTable programId={programId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>Review and approve new affiliate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loading />}>
                <AffiliateApplicationsTable programId={programId} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Leaderboard</CardTitle>
              <CardDescription>Top performing affiliates by earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loading />}>
                <AffiliateLeaderboard />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

