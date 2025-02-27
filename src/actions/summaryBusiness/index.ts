import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getBusinessAutomationData(businessId: string) {
  try {
    const business = await prisma.business.findUnique({
      where: { id: businessId},
      select: {
        id: true,
        name: true,
        industry: true,
        automationGoals: true,
        customerJourney: true,
        features: true,
        businessTypeData: true,
        websiteAnalysis: true,
      },
    })

    if (!business) {
      throw new Error("Business not found")
    }

    // Parse JSON fields
    const parsedBusiness = {
      ...business,
      automationGoals: business.automationGoals ? JSON.parse(business.automationGoals as string) : null,
      customerJourney: business.customerJourney ? JSON.parse(business.customerJourney as string) : null,
      features: business.features ? JSON.parse(business.features as string) : null,
      businessTypeData: business.businessTypeData ? JSON.parse(business.businessTypeData as string) : null,
      websiteAnalysis: business.websiteAnalysis ? JSON.parse(business.websiteAnalysis as string) : null,
    }

    return {
      id: parsedBusiness.id,
      name: parsedBusiness.name,
      industry: parsedBusiness.industry,
      primaryGoal: parsedBusiness.automationGoals?.primaryGoal || "",
      responseTime: parsedBusiness.automationGoals?.responseTime || 30,
      selectedFeatures: parsedBusiness.features?.features.filter((f: any) => f.enabled).map((f: any) => f.name) || [],
      journeySteps: parsedBusiness.customerJourney?.journeySteps || [],
      businessTypeData: parsedBusiness.businessTypeData,
      websiteAnalysis: parsedBusiness.websiteAnalysis,
    }
  } catch (error) {
    console.error("Error fetching business automation data:", error)
    throw error
  }
}

