import { BusinessUrlAnalyzer } from "@/components/global/customize/business-url-analyzer"
import { BusinessModelSelector } from "@/components/global/customize/business-model-selector"
import { CustomerFlowBuilder } from "@/components/global/customize/customer-flow-builder"
import { FeatureSelector } from "@/components/global/customize/feature-selector"
import { PreviewFlow } from "@/components/global/customize/preview-flow"
import { CompetitorAnalysis } from "@/components/global/customize/competitor-analysis"
import { ThemeCustomizer } from "@/components/global/customize/theme-customizer"
import { SuccessMetrics } from "@/components/global/customize/success-metrics"

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Build Your Custom Instagram DM Automation
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Create a personalized automation flow that matches your business needs
          </p>
        </div>

        <div className="mt-16 space-y-16">
          <BusinessUrlAnalyzer />
          <CompetitorAnalysis />
          <BusinessModelSelector />
          <CustomerFlowBuilder />
          <FeatureSelector />
          <ThemeCustomizer />
          <SuccessMetrics />
          <PreviewFlow />
        </div>
      </div>
    </div>
  )
}

