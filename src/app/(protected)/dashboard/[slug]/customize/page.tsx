'use client'
import type { Metadata } from "next"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import BusinessInfoForm from "@/components/global/customize/business-info-form"
import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
import FeatureSelection from "@/components/global/customize/feature-selection"
import PreviewFlow from "@/components/global/customize/preview-flow"
import SubmissionSummary from "@/components/global/customize/submission-summary"
import BusinessTypeSelector from "@/components/global/customize/business-type-selector"
import { onCurrentUser } from "@/actions/user"
import { getAllBusinesses } from "@/actions/businfo"
import {getBusinessAutomationData} from '@/actions/businfo/queries'

type BusinessData = {
  name?: string | null
  industry?: string
  primaryGoal?: string
  responseTime?: number
  selectedFeatures?: string[]
  journeySteps?: Array<{
    id?: string
    type?: string
    message?: string
  }>
}


export default async function CustomAutomationRequestPage() {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const business = await getAllBusinesses()
  const businessId = business.data.businesses[0].id

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const user = await onCurrentUser()
        const data = await getBusinessAutomationData(user.id)
        setBusinessData({
          name: data?.name,
          industry: data?.industry,
          primaryGoal: data?.automationGoals,
          selectedFeatures: data?.features,
          journeySteps: data?.customerJourney,
        })
      } catch (error) {
        console.error("Error fetching business data:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching business data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessData()
  }, [toast])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Custom Automation Request
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Tell us about your business and automation needs, and we will create a custom Instagram DM flow that converts
          visitors into customers.
        </p>

        <div className="space-y-16">
          <BusinessTypeSelector businessId={businessId} />
          <WebsiteAnalyzer businessId={businessId} />
          <BusinessInfoForm businessId={businessId} />
          <AutomationGoalsForm businessId={businessId} />
          <CustomerJourneyForm businessId={businessId} />
          <FeatureSelection businessId={businessId} />
          <PreviewFlow />
          {/* <SubmissionSummary businessId={businessId} businessData={businessData} /> */}
        </div>
      </div>
    </div>
  )
}



