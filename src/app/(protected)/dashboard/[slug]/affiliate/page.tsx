import { Suspense } from "react"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AffiliateRegistration from "./affiliate-registration"
import AffiliateDashboard from "./affiliate-dashboard"
import AffiliateLinks from "./affiliate-links"
import AffiliateLeaderboard from "./affiliate-leaderboard"
import Loading from "./loading"
import {client} from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

export const metadata = {
  title: "Affiliate Dashboard",
}

export default async function AffiliatePage() {
  const userd = await onCurrentUser()
  const userId = userd.id
  const emailId = userd.emailAddresses[0].emailAddress

  // Check if user is already an affiliate
  const affiliate = await client.affiliateUser.findFirst({
    where: {  email:emailId},
  })

  const activePrograms = await client.affiliateProgram.findMany({
    where: { status: "active" },
  })

  return (
    <div className="container max-w-7xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Affiliate Program</h1>

      {affiliate ? (
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="links">Your Links</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Suspense fallback={<Loading />}>
              <AffiliateDashboard affiliateId={affiliate.id} />
            </Suspense>
          </TabsContent>

          <TabsContent value="links">
            <Suspense fallback={<Loading />}>
              <AffiliateLinks affiliateId={affiliate.id} />
            </Suspense>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Suspense fallback={<Loading />}>
              <AffiliateLeaderboard />
            </Suspense>
          </TabsContent>
        </Tabs>
      ) : activePrograms.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Join Our Affiliate Program</CardTitle>
            <CardDescription>Earn commissions by referring new customers to our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <AffiliateRegistration userId={userId} programs={activePrograms} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Affiliate Program Coming Soon</CardTitle>
            <CardDescription>Our affiliate program is not yet available. Please check back later.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}

