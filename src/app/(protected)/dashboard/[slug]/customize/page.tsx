// import type { Metadata } from "next"
// import BusinessInfoForm from "@/components/global/customize/business-info-form"
// import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
// import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
// import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
// import FeatureSelection from "@/components/global/customize/feature-selection"
// import PreviewFlow from "@/components/global/customize/preview-flow"
// import SubmissionSummary from "@/components/global/customize/submission-summary"
// import BusinessTypeSelector  from "@/components/global/customize/business-type-selector"
// import { onCurrentUser } from "@/actions/user"

// export const metadata: Metadata = {
//   title: "Custom Automation Request | Instagram DM Automation",
//   description: "Request a custom Instagram DM automation flow tailored to your business needs",
// }

// export default async function CustomAutomationRequestPage() {

//   const user = await onCurrentUser()
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
//           Custom Automation Request
//         </h1>
//         <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
//           Tell us about your business and automation needs, and we will create a custom Instagram DM flow that converts
//           visitors into customers.
//         </p>

//         <div className="space-y-16">
//           <BusinessTypeSelector businessId={user.id} />
//           <WebsiteAnalyzer businessId={user.id} />
//           <BusinessInfoForm />
//           <AutomationGoalsForm businessId={user.id} />
//           <CustomerJourneyForm businessId={user.id} />
//           <FeatureSelection businessId={user.id} />
//           <PreviewFlow />
//           {/* <SubmissionSummary businessId={user.id} businessData={user.}  /> */}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { getBusinessIdForUser } from "@/actions/businfo/queries"
import { onCurrentUser } from "@/actions/user"
import BusinessTypeSelector from "@/components/global/customize/business-type-selector"
import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
import BusinessInfoForm from "@/components/global/customize/business-info-form"
import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
import FeatureSelection from "@/components/global/customize/feature-selection"
import PreviewFlow from "@/components/global/customize/preview-flow"
import SubmissionSummary from "@/components/global/customize/submission-summary"

export default function CustomAutomationRequestPage() {
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBusinessId = async () => {
      try {
        const user = await onCurrentUser()
        const result = await getBusinessIdForUser(user.id)
        setBusinessId(result)
      } catch (error) {
        console.error("Error fetching business ID:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching business data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessId()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <p>Loading...</p>
      </div>
    )
  }

  if (!businessId) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <p>No business found. Please create a business first.</p>
      </div>
    )
  }

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
           <BusinessInfoForm />
           <AutomationGoalsForm businessId={businessId} />
           <CustomerJourneyForm businessId={businessId} />
           <FeatureSelection businessId={businessId} />
           <PreviewFlow />
           {/* <SubmissionSummary businessId={user.id} businessData={user.}  /> */}
        </div>
      </div>
    </div>
  )
}

