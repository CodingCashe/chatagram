// Define types for the automation goals data
export interface AutomationGoalsData {
  primaryGoal: string
  responseTime: number
  customGoals: string
}

// Define types for the customer journey data
export interface JourneyStep {
  id: string
  type: string
  message: string
  nextAction: string
}

export interface CustomerJourneyData {
  journeySteps: JourneyStep[]
}

// Define types for the feature selection data
export interface Feature {
  id: string
  icon?: React.ReactNode
  name: string
  description: string
  enabled: boolean
  iconName?: string // Add this if you want to include icon information
}

export interface FeatureSelectionData {
  features: Feature[]
}

// Define types for the business type specific data
export interface FAQItem {
  question: string
  answer: string
}

export interface ContactInfo {
  email: string
  phone: string
  countryCode: string
  address: string
}

// Base interface for all business types
export interface BusinessTypeBaseData {
  businessTypeId: string
  contactInfo: ContactInfo
  faqs: FAQItem[]
}

// E-commerce specific data
export interface EcommerceData extends BusinessTypeBaseData {
  platform: string
  productCategories: string
  targetAudience: string
  orderProcessingOptions: string[]
}

// Restaurant specific data
export interface RestaurantData extends BusinessTypeBaseData {
  cuisineType: string
  menuHighlights: string
  ambiance: string
  servicesOffered: string[]
  operatingHours: string
}

// Travel specific data
export interface TravelData extends BusinessTypeBaseData {
  travelType: string
  destinationFocus: string
  travelStyle: string
  servicesOffered: string[]
  bookingHours: string
}

// Real Estate specific data
export interface RealEstateData extends BusinessTypeBaseData {
  propertyType: string
  propertyLocation: string
  propertySpecialty: string
  servicesOffered: string[]
  officeHours: string
}

// Healthcare specific data
export interface HealthcareData extends BusinessTypeBaseData {
  specialty: string
  servicesOffered: string
  insuranceAccepted: string
  appointmentOptions: string[]
  appointmentHours: string
}

// Education specific data
export interface EducationData extends BusinessTypeBaseData {
  educationType: string
  subjectsTaught: string
  targetStudents: string
  learningOptions: string[]
  classHours: string
}

// Professional Services specific data
export interface ProfessionalServicesData extends BusinessTypeBaseData {
  serviceType: string
  servicesProvided: string
  industryFocus: string
  serviceOptions: string[]
  serviceHours: string
}

// Beauty & Wellness specific data
export interface BeautyWellnessData extends BusinessTypeBaseData {
  serviceCategory: string
  servicesOffered: string
  productLines: string
  appointmentOptions: string[]
  appointmentHours: string
}

// Union type for all business type data
export type BusinessTypeData =
  | EcommerceData
  | RestaurantData
  | TravelData
  | RealEstateData
  | HealthcareData
  | EducationData
  | ProfessionalServicesData
  | BeautyWellnessData

// Define types for the website analysis data
export interface WebsiteAnalysisData {
  url: string
  businessName: string
  industry: string
  description: string
  products: string
  tone: string
  formattedDescription: string
}

