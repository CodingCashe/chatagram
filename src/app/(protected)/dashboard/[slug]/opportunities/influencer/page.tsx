"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/global/influencer-relation/dashboard/shell"
import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
import { OpportunityFilters } from "@/components/global/influencer-relation/opportunities/opportunity-filters"
import { InfluencerOpportunityList } from "@/components/global/influencer-relation/opportunities/influencer-opportunity-list"
import { InfluencerApplicationStats } from "@/components/global/influencer-relation/opportunities/influencer-application-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"

export default function InfluencerOpportunitiesPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "all"
  const [selectedFilters, setSelectedFilters] = useState({
    status: status,
    category: [],
    budget: null,
    platform: [],
    location: [],
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Opportunities" text="Find and apply to opportunities that match your profile" />

      <InfluencerApplicationStats />

      <div className="mb-8 mt-4">
        <OpportunityFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Opportunities</TabsTrigger>
          <TabsTrigger value="applied">My Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="space-y-4">
          <InfluencerOpportunityList type="available" filters={selectedFilters} />
        </TabsContent>
        <TabsContent value="applied" className="space-y-4">
          <InfluencerOpportunityList type="applied" filters={selectedFilters} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
