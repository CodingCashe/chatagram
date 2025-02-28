import type {
    AutomationGoalsData,
    CustomerJourneyData,
    FeatureSelectionData,
    BusinessTypeData,
    WebsiteAnalysisData,
  } from "./business" // Update this path
  
  export interface FormSchema {
    id?: string
    targetAudience: string
    website:string
    businessName: string
    businessType: string
    businessDescription: string
    industry: string
    instagramHandle: string
    welcomeMessage: string
    responseLanguage: string
    businessHours: string
    promotionMessage: string
    autoReplyEnabled: boolean
    // New fields
    automationGoals?: AutomationGoalsData
    customerJourney?: CustomerJourneyData
    features?: FeatureSelectionData
    businessTypeData?: BusinessTypeData
    websiteAnalysis?: WebsiteAnalysisData
    automationSetupComplete?: boolean
    automationSetupDate?: Date
    automationAdditionalNotes?: string
  }
  
  