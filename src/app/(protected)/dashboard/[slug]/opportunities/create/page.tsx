"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname  } from "next/navigation"
import { DashboardShell } from "@/components/global/influencer-relation/dashboard/user-shell"
import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
import { OpportunityForm } from "@/components/global/influencer-relation/opportunities/opportunity-form"
import { InfluencerRecommendations } from "@/components/global/influencer-relation/opportunities/influencer-recommendations"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { createOpportunity } from "@/actions/influencer-relations/opportunities"
import { toast } from "@/hooks/use-toast"


export default function CreateOpportunityPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    brandName:"To be changed",
    description: "",
    category: "",
    budget: { min: 0, max: 0 },
    deadline: new Date(),
    platforms: [],
    requirements: "",
    isPublic: true,
    location: "",
    minFollowers: 0,
    maxFollowers: 0,
    minEngagementRate: 0,
    contentType: [],
  })

  const [loading, setLoading] = useState(false)
  const [formStep, setFormStep] = useState(1)


  const pathname = usePathname()
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await createOpportunity(formData)
      if (result.status === 200) {
        toast({
          title: "Opportunity Created",
          description: "Your opportunity has been successfully created.",
        })
        router.push(`/dashboard/${slug}/opportunities/${result?.data?.id}`)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create opportunity",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Opportunity" text="Create a new opportunity for influencers">
        <Button variant="outline" onClick={() => router.back()} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Opportunity Details</TabsTrigger>
          <TabsTrigger value="influencers" disabled={!formData.category}>
            Find Influencers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <OpportunityForm
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="influencers" className="space-y-4">
          <InfluencerRecommendations
            criteria={{
              category: formData.category,
              platforms: formData.platforms,
              location: formData.location,
              minFollowers: formData.minFollowers,
              maxFollowers: formData.maxFollowers,
              minEngagementRate: formData.minEngagementRate,
            }}
          />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
