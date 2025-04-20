// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { DashboardShell } from "@/components/global/influencer-relation/dashboard/shell"
// import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
// import { OpportunityDetails } from "@/components/global/influencer-relation/opportunities/opportunity-details"
// import { InfluencerApplications } from "@/components/global/influencer-relation/opportunities/influencer-applications"
// import { InfluencerRecommendations } from "@/components/global/influencer-relation/opportunities/influencer-recommendations"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ArrowLeft, Share, Edit } from "lucide-react"
// import { getOpportunity } from "@/actions/influencer-relations/opportunities"
// import { toast } from "@/hooks/use-toast"
// import { Skeleton } from "@/components/ui/skeleton"

// export default function OpportunityPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const [opportunity, setOpportunity] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchOpportunity = async () => {
//       try {
//         const { status, data, message } = await getOpportunity(params.id)

//         if (status === 200 && data) {
//           setOpportunity(data)
//         } else {
//           setError(message || "Failed to load opportunity")
//         }
//       } catch (err) {
//         setError("An error occurred while fetching the opportunity")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOpportunity()
//   }, [params.id])

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href)
//     toast({
//       title: "Link Copied",
//       description: "Opportunity link copied to clipboard",
//     })
//   }

//   if (loading) {
//     return (
//       <DashboardShell>
//         <DashboardHeader heading={<Skeleton className="h-8 w-64" />} text={<Skeleton className="h-5 w-96" />}>
//           <Skeleton className="h-10 w-24" />
//         </DashboardHeader>
//         <Card className="p-6">
//           <div className="space-y-4">
//             <Skeleton className="h-8 w-full" />
//             <Skeleton className="h-32 w-full" />
//             <div className="flex gap-4">
//               <Skeleton className="h-10 w-48" />
//               <Skeleton className="h-10 w-48" />
//             </div>
//           </div>
//         </Card>
//       </DashboardShell>
//     )
//   }

//   if (error || !opportunity) {
//     return (
//       <DashboardShell>
//         <DashboardHeader heading="Error" text={error || "Opportunity not found"}>
//           <Button variant="outline" onClick={() => router.back()} className="gap-1">
//             <ArrowLeft className="h-4 w-4" />
//             Back
//           </Button>
//         </DashboardHeader>
//       </DashboardShell>
//     )
//   }

//   return (
//     <DashboardShell>
//       <DashboardHeader
//         heading={opportunity.title}
//         text={`Created on ${new Date(opportunity.createdAt).toDateString()}`}
//       >
//         <div className="flex gap-2">
//           <Button variant="outline" onClick={() => router.back()} className="gap-1">
//             <ArrowLeft className="h-4 w-4" />
//             Back
//           </Button>
//           <Button variant="outline" onClick={handleShare} className="gap-1">
//             <Share className="h-4 w-4" />
//             Share
//           </Button>
//           <Button variant="outline" className="gap-1" asChild>
//             <a href={`/opportunities/edit/${params.id}`}>
//               <Edit className="h-4 w-4" />
//               Edit
//             </a>
//           </Button>
//         </div>
//       </DashboardHeader>

//       <Tabs defaultValue="details" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="details">Opportunity Details</TabsTrigger>
//           <TabsTrigger value="applications">Applications ({opportunity.applications?.length || 0})</TabsTrigger>
//           <TabsTrigger value="recommended">AI Recommendations</TabsTrigger>
//         </TabsList>
//         <TabsContent value="details" className="space-y-4">
//           <OpportunityDetails opportunity={opportunity} />
//         </TabsContent>
//         <TabsContent value="applications" className="space-y-4">
//           <InfluencerApplications opportunityId={params.id} />
//         </TabsContent>
//         <TabsContent value="recommended" className="space-y-4">
//           <InfluencerRecommendations
//             criteria={{
//               category: opportunity.category,
//               platforms: opportunity.platforms,
//               location: opportunity.location,
//               minFollowers: opportunity.minFollowers,
//               maxFollowers: opportunity.maxFollowers,
//               minEngagementRate: opportunity.minEngagementRate,
//             }}
//           />
//         </TabsContent>
//       </Tabs>
//     </DashboardShell>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/global/influencer-relation/dashboard/user-shell"
import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
import { OpportunityDetails } from "@/components/global/influencer-relation/opportunities/opportunity-details"
import { InfluencerApplications } from "@/components/global/influencer-relation/opportunities/influencer-applications"
import { InfluencerRecommendations } from "@/components/global/influencer-relation/opportunities/influencer-recommendations"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Share, Edit } from "lucide-react"
import { getOpportunity } from "@/actions/influencer-relations/opportunities"
import { toast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter, usePathname  } from "next/navigation"

export default function OpportunityPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [opportunity, setOpportunity] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""
  

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const { status, data, message } = await getOpportunity(params.id)

        if (status === 200 && data) {
          setOpportunity(data)
        } else {
          setError(message || "Failed to load opportunity")
        }
      } catch (err) {
        setError("An error occurred while fetching the opportunity")
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunity()
  }, [params.id])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Opportunity link copied to clipboard",
    })
  }

  // Loading state UI
  if (loading) {
    return (
      <DashboardShell>
        {/* Use a different approach for the loading state */}
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-48" />
            </div>
          </div>
        </Card>
      </DashboardShell>
    )
  }

  // Error state UI
  if (error || !opportunity) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text={error || "Opportunity not found"}>
          <Button variant="outline" onClick={() => router.back()} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </DashboardHeader>
      </DashboardShell>
    )
  }

  // Loaded state UI
  return (
    <DashboardShell>
      <DashboardHeader
        heading={opportunity.title}
        text={`Created on ${new Date(opportunity.createdAt).toDateString()}`}
      >
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" onClick={handleShare} className="gap-1">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="gap-1" asChild>
            <a href={`/dashboard/${slug}/opportunities/edit/${params.id}`}>
              <Edit className="h-4 w-4" />
              Edit
            </a>
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Opportunity Details</TabsTrigger>
          <TabsTrigger value="applications">Applications ({opportunity.applications?.length || 0})</TabsTrigger>
          <TabsTrigger value="recommended">AI Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <OpportunityDetails opportunity={opportunity} />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <InfluencerApplications opportunityId={params.id} />
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <InfluencerRecommendations
            criteria={{
              category: opportunity.category,
              platforms: opportunity.platforms,
              location: opportunity.location,
              minFollowers: opportunity.minFollowers,
              maxFollowers: opportunity.maxFollowers,
              minEngagementRate: opportunity.minEngagementRate,
            }}
          />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
