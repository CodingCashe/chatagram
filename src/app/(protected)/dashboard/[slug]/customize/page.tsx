// 'use client'
// import type { Metadata } from "next"
// import { useState, useEffect } from "react"
// import { useToast } from "@/hooks/use-toast"
// import BusinessInfoForm from "@/components/global/customize/business-info-form"
// import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
// import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
// import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
// import FeatureSelection from "@/components/global/customize/feature-selection"
// import PreviewFlow from "@/components/global/customize/preview-flow"
// import SubmissionSummary from "@/components/global/customize/submission-summary"
// import BusinessTypeSelector from "@/components/global/customize/business-type-selector"
// import { onCurrentUser } from "@/actions/user"
// import { getAllBusinesses } from "@/actions/businfo"
// import {getBusinessAutomationData} from '@/actions/businfo/queries'

// type BusinessData = {
//   name?: string | null
//   industry?: string
//   primaryGoal?: string
//   responseTime?: number
//   selectedFeatures?: string[]
//   journeySteps?: Array<{
//     id?: string
//     type?: string
//     message?: string
//   }>
// }


// export default async function CustomAutomationRequestPage() {
//   const [businessData, setBusinessData] = useState<BusinessData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const { toast } = useToast()
//   const business = await getAllBusinesses()
//   const businessId = business.data.businesses[0].id

//   useEffect(() => {
//     const fetchBusinessData = async () => {
//       try {
//         const user = await onCurrentUser()
//         const data = await getBusinessAutomationData(user.id)
//         setBusinessData({
//           name: data?.name,
//           industry: data?.industry,
//           primaryGoal: data?.automationGoals,
//           selectedFeatures: data?.features,
//           journeySteps: data?.customerJourney,
//         })
//       } catch (error) {
//         console.error("Error fetching business data:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred while fetching business data.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchBusinessData()
//   }, [toast])

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
//           <BusinessTypeSelector businessId={businessId} />
//           <WebsiteAnalyzer businessId={businessId} />
//           <BusinessInfoForm businessId={businessId} />
//           <AutomationGoalsForm businessId={businessId} />
//           <CustomerJourneyForm businessId={businessId} />
//           <FeatureSelection businessId={businessId} />
//           <PreviewFlow />
//           {/* <SubmissionSummary businessId={businessId} businessData={businessData} /> */}
//         </div>
//       </div>
//     </div>
//   )
// }



// "use client"
// import { useState, useEffect } from "react"
// import { useToast } from "@/hooks/use-toast"
// import BusinessInfoForm from "@/components/global/customize/business-info-form"
// import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
// import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
// import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
// import FeatureSelection from "@/components/global/customize/feature-selection"
// import PreviewFlow from "@/components/global/customize/preview-flow"
// import BusinessTypeSelector from "@/components/global/customize/business-type-selector"
// import { onCurrentUser } from "@/actions/user"
// import { getAllBusinesses } from "@/actions/businfo"
// import { getBusinessAutomationData } from "@/actions/businfo/queries"
// import SubmissionSummary from "@/components/global/customize/submission-summary"

// type BusinessData = {
//   name?: string | null
//   industry?: string
//   primaryGoal?: string
//   responseTime?: number
//   selectedFeatures?: string[]
//   journeySteps?: Array<{
//     id?: string
//     type?: string
//     message?: string
//   }>
// }

// export default function CustomAutomationRequestPage() {
//   const [businessData, setBusinessData] = useState<BusinessData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [businessId, setBusinessId] = useState<string | null>(null)
//   const { toast } = useToast()

//   // Fetch business ID on component mount
//   useEffect(() => {
//     const fetchBusinessId = async () => {
//       try {
//         const business = await getAllBusinesses()
//         if (business.data.businesses && business.data.businesses.length > 0) {
//           setBusinessId(business.data.businesses[0].id)
//         }
//       } catch (error) {
//         console.error("Error fetching business ID:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred while fetching business data.",
//           variant: "destructive",
//         })
//       }
//     }

//     fetchBusinessId()
//   }, [toast])

//   // Fetch business data on component mount
//   useEffect(() => {
//     const fetchBusinessData = async () => {
//       try {
//         const user = await onCurrentUser()
//         const data = await getBusinessAutomationData(user.id)
//         setBusinessData({
//           name: data?.name,
//           industry: data?.industry,
//           primaryGoal: data?.automationGoals,
//           selectedFeatures: data?.features,
//           journeySteps: data?.customerJourney,
//         })
//       } catch (error) {
//         console.error("Error fetching business data:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred while fetching business data.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchBusinessData()
//   }, [toast])

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
//           {businessId && <BusinessTypeSelector businessId={businessId} />}
//           {businessId && <WebsiteAnalyzer businessId={businessId} />}
//           {businessId && <BusinessInfoForm businessId={businessId} />}
//           {businessId && <AutomationGoalsForm businessId={businessId} />}
//           {businessId && <CustomerJourneyForm businessId={businessId} />}
//           {businessId && <FeatureSelection businessId={businessId} />}
//           <PreviewFlow />
//           {businessId && businessData && <SubmissionSummary businessId={businessId} businessData={businessData} />}
//         </div>
//       </div>
//     </div>
//   )
// }

//WORKING BUT WITHOUT SUBMISSIONSUMMARY

// "use client"
// import { useState, useEffect } from "react"
// import { useToast } from "@/hooks/use-toast"
// import BusinessInfoForm from "@/components/global/customize/business-info-form"
// import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
// import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
// import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
// import FeatureSelection from "@/components/global/customize/feature-selection"
// import PreviewFlow from "@/components/global/customize/preview-flow"
// import BusinessTypeSelector from "@/components/global/customize/business-type-selector"
// import { onCurrentUser } from "@/actions/user"
// import { getAllBusinesses } from "@/actions/businfo"
// import { getBusinessAutomationData } from "@/actions/businfo/queries"
// import SubmissionSummary from "@/components/global/customize/submission-summary"

// // Define the shape of the incoming data
// type AutomationDataStep = {
//   id?: string
//   type?: string
//   message?: string
// }

// type AutomationData = {
//   name?: string | null
//   industry?: string
//   automationGoals?: string
//   responseTime?: number
//   features?: string[]
//   customerJourney?: AutomationDataStep[]
// } | null

// // Define the shape of the processed business data
// type BusinessData = {
//   name: string
//   industry: string
//   primaryGoal: string
//   responseTime: number
//   selectedFeatures: string[]
//   journeySteps: Array<{
//     id: string
//     type: string
//     message: string
//   }>
// }

// export default function CustomAutomationRequestPage() {
//   const [businessData, setBusinessData] = useState<BusinessData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [businessId, setBusinessId] = useState<string | null>(null)
//   const { toast } = useToast()

//   // Fetch business ID on component mount
//   useEffect(() => {
//     const fetchBusinessId = async () => {
//       try {
//         const business = await getAllBusinesses()
//         if (business.data.businesses && business.data.businesses.length > 0) {
//           setBusinessId(business.data.businesses[0].id)
//         }
//       } catch (error) {
//         console.error("Error fetching business ID:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred while fetching business data.",
//           variant: "destructive",
//         })
//       }
//     }

//     fetchBusinessId()
//   }, [toast])

//   // Fetch business data on component mount
//   useEffect(() => {
//     const fetchBusinessData = async () => {
//       try {
//         const user = await onCurrentUser()
//         const data: AutomationData = await getBusinessAutomationData(user.id)

//         // Only set businessData if all required fields are available
//         if (data?.name && data?.industry && data?.automationGoals) {
//           setBusinessData({
//             name: data.name,
//             industry: data.industry,
//             primaryGoal: data.automationGoals,
//             responseTime: data.responseTime || 0,
//             selectedFeatures: data.features || [],
//             journeySteps: (data.customerJourney || []).map((step: AutomationDataStep) => ({
//               id: step?.id || generateId(),
//               type: step?.type || "default",
//               message: step?.message || "",
//             })),
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching business data:", error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred while fetching business data.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchBusinessData()
//   }, [toast])

//   function generateId(): string {
//     return Math.random().toString(36).substring(2, 9)
//   }

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
//           {businessId && <BusinessTypeSelector businessId={businessId} />}
//           {businessId && <WebsiteAnalyzer businessId={businessId} />}
//           {businessId && <BusinessInfoForm businessId={businessId} />}
//           {businessId && <AutomationGoalsForm businessId={businessId} />}
//           {businessId && <CustomerJourneyForm businessId={businessId} />}
//           {businessId && <FeatureSelection businessId={businessId} />}
//           <PreviewFlow />
//           {businessId && businessData && <SubmissionSummary businessId={businessId} businessData={businessData} />}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import BusinessInfoForm from "@/components/global/customize/business-info-form"
import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
import FeatureSelection from "@/components/global/customize/feature-selection"
import PreviewFlow from "@/components/global/customize/preview-flow"
import BusinessTypeSelector from "@/components/global/customize/business-type-selector"
import { onCurrentUser } from "@/actions/user"
import { getAllBusinesses } from "@/actions/businfo"
import { getBusinessAutomationData } from "@/actions/businfo/queries"
import SubmissionSummary from "@/components/global/customize/submission-summary"

// Define the shape of the incoming data
type AutomationData = {
  name: string | null
  industry: string | null
  automationGoals: {
    primaryGoal: string
    responseTime: number
  } | null
  features: {
    features: Array<{ name: string; enabled: boolean }>
  } | null
  customerJourney: {
    journeySteps: Array<{
      id: string
      type: string
      message: string
    }>
  } | null
} | null

// Define the shape of the processed business data
type BusinessData = {
  name: string
  industry: string
  primaryGoal: string
  responseTime: number
  selectedFeatures: string[]
  journeySteps: Array<{
    id: string
    type: string
    message: string
  }>
}

export default function CustomAutomationRequestPage() {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [businessId, setBusinessId] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch business ID on component mount
  useEffect(() => {
    const fetchBusinessId = async () => {
      try {
        const business = await getAllBusinesses()
        if (business.data.businesses && business.data.businesses.length > 0) {
          setBusinessId(business.data.businesses[0].id)
        }
      } catch (error) {
        console.error("Error fetching business ID:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching business data.",
          variant: "destructive",
        })
      }
    }

    fetchBusinessId()
  }, [toast])

  // Fetch business data on component mount
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const user = await onCurrentUser()
        const data: AutomationData = await getBusinessAutomationData(user.id)

        console.log("Raw data from getBusinessAutomationData:", JSON.stringify(data, null, 2))

        if (data) {
          const processedData: BusinessData = {
            name: data.name || "Not specified",
            industry: data.industry || "Not specified",
            primaryGoal: data.automationGoals?.primaryGoal || "Not specified",
            responseTime: data.automationGoals?.responseTime || 5,
            selectedFeatures:
              data.features?.features.filter((feature) => feature.enabled).map((feature) => feature.name) || [],
            journeySteps: data.customerJourney?.journeySteps || [],
          }

          console.log("Processed business data:", JSON.stringify(processedData, null, 2))

          // Check for non-serializable data
          const serializedData = JSON.parse(JSON.stringify(processedData))
          if (JSON.stringify(processedData) !== JSON.stringify(serializedData)) {
            console.error(
              "Non-serializable data detected:",
              JSON.stringify(processedData, (key, value) =>
                typeof value === "object" && value !== null ? "[Object]" : value,
              ),
            )
            throw new Error("Non-serializable data detected in business data")
          }

          setBusinessData(processedData)
        } else {
          console.warn("No data returned from getBusinessAutomationData")
        }
      } catch (error) {
        console.error("Error in fetchBusinessData:", error)
        if (error instanceof Error) {
          console.error("Error name:", error.name)
          console.error("Error message:", error.message)
          console.error("Error stack:", error.stack)
        }
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

  useEffect(() => {
    if (businessId && businessData) {
      console.log("Rendering SubmissionSummary with data:", JSON.stringify(businessData, null, 2))
    }
  }, [businessId, businessData])

  if (isLoading) {
    return <div>Loading...</div>
  }
 /**bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 */
  return (
    <div className="min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Custom Automation Request
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Tell us about your business and automation needs, and we will create a custom Instagram DM flow that converts
          visitors into customers.
        </p>

        <div className="space-y-16">
          {businessId && <BusinessTypeSelector businessId={businessId} />}
          {businessId && <WebsiteAnalyzer businessId={businessId} />}
          {businessId && <BusinessInfoForm businessId={businessId} />}
          {businessId && <AutomationGoalsForm businessId={businessId} />}
          {businessId && <CustomerJourneyForm businessId={businessId} />}
          {businessId && <FeatureSelection businessId={businessId} />}
          <PreviewFlow />
          {businessId && businessData && <SubmissionSummary businessId={businessId} businessData={businessData} />}
        </div>
      </div>
    </div>
  )
}

