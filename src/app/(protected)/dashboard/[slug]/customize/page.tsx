import type { Metadata } from "next"
import BusinessInfoForm from "@/components/global/customize/business-info-form"
import AutomationGoalsForm from "@/components/global/customize/automation-goals-form"
import CustomerJourneyForm from "@/components/global/customize/customer-journey-form"
import WebsiteAnalyzer from "@/components/global/customize/website-analyzer"
import FeatureSelection from "@/components/global/customize/feature-selection"
import PreviewFlow from "@/components/global/customize/preview-flow"
import SubmissionSummary from "@/components/global/customize/submission-summary"
import BusinessTypeSelector  from "@/components/global/customize/business-type-selector"

export const metadata: Metadata = {
  title: "Custom Automation Request | Instagram DM Automation",
  description: "Request a custom Instagram DM automation flow tailored to your business needs",
}

export default function CustomAutomationRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Custom Automation Request
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Tell us about your business and automation needs, and we'll create a custom Instagram DM flow that converts
          visitors into customers.
        </p>

        <div className="space-y-16">
          <BusinessTypeSelector />
          <WebsiteAnalyzer />
          <BusinessInfoForm />
          <AutomationGoalsForm />
          <CustomerJourneyForm />
          <FeatureSelection />
          <PreviewFlow />
          <SubmissionSummary />
        </div>
      </div>
    </div>
  )
}

