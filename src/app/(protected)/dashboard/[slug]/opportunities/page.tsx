"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/global/influencer-relation/dashboard/user-shell"
import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
import { OpportunityFilters } from "@/components/global/influencer-relation/opportunities/opportunity-filters"
import { OpportunityList } from "@/components/global/influencer-relation/opportunities/opportunity-list"
import { OpportunityStats } from "@/components/global/influencer-relation/opportunities/opportunity-stats"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { useSearchParams, useRouter, usePathname  } from "next/navigation"

export default function OpportunitiesPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "all"
  const [selectedFilters, setSelectedFilters] = useState({
    status: status,
    category: [],
    budget: null,
    platform: [],
    location: [],
  })


    const router = useRouter()
    const pathname = usePathname()
    const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
    const slug = slugMatch ? slugMatch[1] : ""
  
    // Unified navigation handler
    const handleNavigation = (path: string) => {
      router.push(`/dashboard/${slug}/${path}`);
    };
  
  

  return (
    <DashboardShell>
      <DashboardHeader heading="Opportunities" text="Manage and create opportunities for influencers">
        <Link href={`/dashboard/${slug}/opportunities/create`}>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Opportunity
          </Button>
        </Link>
      </DashboardHeader>

      <OpportunityStats />

      <div className="mb-8 mt-4">
        <OpportunityFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="all">All Opportunities</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <OpportunityList status="active" filters={selectedFilters} />
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <OpportunityList status="draft" filters={selectedFilters} />
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <OpportunityList status="archived" filters={selectedFilters} />
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <OpportunityList status="all" filters={selectedFilters} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
