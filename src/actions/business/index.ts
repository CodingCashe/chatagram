"use server"

import { client } from "@/lib/prisma"
import { onCurrentUser } from "../user"
import { revalidatePath } from "next/cache"

// Business Profile Actions
export const getBusinessProfile = async (userId?: string) => {
  try {
    const user = userId ? { id: userId } : await onCurrentUser()

    const profile = await client.businessProfile.findUnique({
      where: { userId: user.id },
    })

    return { status: 200, data: profile }
  } catch (error) {
    console.error("Error fetching business profile:", error)
    return { status: 500, data: null, error: "Failed to fetch business profile" }
  }
}

export const createBusinessProfile = async (data: {
  companyName: string
  industry?: string
  website?: string
  logo?: string
  description?: string
  location?: string
  size?: string
  foundedYear?: number
}) => {
  try {
    const user = await onCurrentUser()

    // Check if profile already exists
    const existingProfile = await client.businessProfile.findUnique({
      where: { userId: user.id },
    })

    if (existingProfile) {
      return { status: 400, error: "Profile already exists" }
    }

    const profile = await client.businessProfile.create({
      data: {
        ...data,
        userId: user.id,
      },
    })

    revalidatePath("/business")
    return { status: 201, data: profile }
  } catch (error) {
    console.error("Error creating business profile:", error)
    return { status: 500, error: "Failed to create business profile" }
  }
}

export const updateBusinessProfile = async (data: {
  companyName?: string
  industry?: string
  website?: string
  logo?: string
  description?: string
  location?: string
  size?: string
  foundedYear?: number
}) => {
  try {
    const user = await onCurrentUser()

    // Check if profile exists
    const existingProfile = await client.businessProfile.findUnique({
      where: { userId: user.id },
    })

    if (!existingProfile) {
      return { status: 404, error: "Profile not found" }
    }

    const profile = await client.businessProfile.update({
      where: { userId: user.id },
      data,
    })

    revalidatePath("/business")
    return { status: 200, data: profile }
  } catch (error) {
    console.error("Error updating business profile:", error)
    return { status: 500, error: "Failed to update business profile" }
  }
}

// Influencer Search Actions
export const searchInfluencers = async (filters?: {
  niche?: string
  platforms?: string[]
  tags?: string[]
  location?: string
  minFollowers?: number
  maxFollowers?: number
  minEngagementRate?: number
  maxEngagementRate?: number
  isAvailableForHire?: boolean
  search?: string
  page?: number
  limit?: number
}) => {
  try {
    const user = await onCurrentUser()

    const {
      niche,
      platforms,
      tags,
      location,
      minFollowers,
      maxFollowers,
      minEngagementRate,
      maxEngagementRate,
      isAvailableForHire,
      search,
      page = 1,
      limit = 10,
    } = filters || {}

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (niche) {
      where.niche = niche
    }

    if (platforms && platforms.length > 0) {
      where.platforms = {
        hasSome: platforms,
      }
    }

    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      }
    }

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      }
    }

    if (minFollowers) {
      where.followers = {
        ...where.followers,
        gte: minFollowers,
      }
    }

    if (maxFollowers) {
      where.followers = {
        ...where.followers,
        lte: maxFollowers,
      }
    }

    if (minEngagementRate) {
      where.engagementRate = {
        ...where.engagementRate,
        gte: minEngagementRate,
      }
    }

    if (maxEngagementRate) {
      where.engagementRate = {
        ...where.engagementRate,
        lte: maxEngagementRate,
      }
    }

    if (isAvailableForHire !== undefined) {
      where.isAvailableForHire = isAvailableForHire
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { bio: { contains: search, mode: "insensitive" } },
      ]
    }

    const [influencers, total] = await Promise.all([
      client.influencer.findMany({
        where,
        include: {
          socialAccounts: true,
          contentTypes: true,
          rates: true,
        },
        orderBy: [{ verified: "desc" }, { followers: "desc" }],
        skip,
        take: limit,
      }),
      client.influencer.count({ where }),
    ])

    return {
      status: 200,
      data: {
        influencers,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
    }
  } catch (error) {
    console.error("Error searching influencers:", error)
    return { status: 500, error: "Failed to search influencers" }
  }
}

export const saveSearch = async (data: {
  name: string
  filters: any
}) => {
  try {
    const user = await onCurrentUser()

    const businessProfile = await client.businessProfile.findUnique({
      where: { userId: user.id },
    })

    if (!businessProfile) {
      return { status: 404, error: "Business profile not found" }
    }

    const savedSearch = await client.savedSearch.create({
      data: {
        name: data.name,
        filters: data.filters,
        userId: user.id,
        businessId: businessProfile.id,
      },
    })

    return { status: 201, data: savedSearch }
  } catch (error) {
    console.error("Error saving search:", error)
    return { status: 500, error: "Failed to save search" }
  }
}

export const getSavedSearches = async () => {
  try {
    const user = await onCurrentUser()

    const savedSearches = await client.savedSearch.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    return { status: 200, data: savedSearches }
  } catch (error) {
    console.error("Error fetching saved searches:", error)
    return { status: 500, error: "Failed to fetch saved searches" }
  }
}

export const deleteSavedSearch = async (id: string) => {
  try {
    const user = await onCurrentUser()

    // Check if search belongs to user
    const savedSearch = await client.savedSearch.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!savedSearch) {
      return { status: 404, error: "Saved search not found" }
    }

    await client.savedSearch.delete({
      where: { id },
    })

    return { status: 200, data: { success: true } }
  } catch (error) {
    console.error("Error deleting saved search:", error)
    return { status: 500, error: "Failed to delete saved search" }
  }
}


export const getBusinessOpportunities = async (filters?: {
  status?: string
  search?: string
  page?: number
  limit?: number
}) => {
  try {
    const user = await onCurrentUser()

    const businessProfile = await client.businessProfile.findUnique({
      where: { userId: user.id },
    })

    if (!businessProfile) {
      return { status: 404, error: "Business profile not found" }
    }

    const { status, search, page = 1, limit = 10 } = filters || {}

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      businessId: businessProfile.id,
    }

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const [opportunities, total] = await Promise.all([
      client.opportunity.findMany({
        where,
        include: {
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      client.opportunity.count({ where }),
    ])

    return {
      status: 200,
      data: {
        opportunities,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
    }
  } catch (error) {
    console.error("Error fetching opportunities:", error)
    return { status: 500, error: "Failed to fetch opportunities" }
  }
}

export const getOpportunityApplications = async (
  opportunityId: string,
  filters?: {
    status?: string
    page?: number
    limit?: number
  },
) => {
  try {
    const user = await onCurrentUser()

    const businessProfile = await client.businessProfile.findUnique({
      where: { userId: user.id },
    })

    if (!businessProfile) {
      return { status: 404, error: "Business profile not found" }
    }

    // Check if opportunity belongs to business
    const opportunity = await client.opportunity.findFirst({
      where: {
        id: opportunityId,
        businessId: businessProfile.id,
      },
    })

    if (!opportunity) {
      return { status: 404, error: "Opportunity not found" }
    }

    const { status, page = 1, limit = 10 } = filters || {}

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      opportunityId,
    }

    if (status) {
      where.status = status
    }

    const [applications, total] = await Promise.all([
      client.opportunityApplication.findMany({
        where,
        include: {
          influencer: {
            include: {
              socialAccounts: true,
              rates: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      client.opportunityApplication.count({ where }),
    ])

    return {
      status: 200,
      data: {
        applications,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
    }
  } catch (error) {
    console.error("Error fetching applications:", error)
    return { status: 500, error: "Failed to fetch applications" }
  }
}



// Only showing the createOpportunity function that needs to be fixed
export const createOpportunity = async (data: {
  brandName: string
  title: string
  description: string
  requirements?: string
  platforms: string[]
  contentType: string[] // Changed to array to match schema
  budget: number
  category: string // Added required field
  deadline?: Date
  deliveryDate?: Date
  tags?: string[]
  isPublic?: boolean
}) => {
  try {
    const user = await onCurrentUser()

    const businessProfile = await client.businessProfile.findUnique({
      where: { userId: user.id },
    })

    if (!businessProfile) {
      return { status: 404, error: "Business profile not found" }
    }

    // Calculate budgetMin and budgetMax from the budget
    const budgetMin = Math.round(data.budget * 0.9)
    const budgetMax = Math.round(data.budget * 1.1)

    const opportunity = await client.opportunity.create({
      data: {
        businessId: businessProfile.id,
        brandName: data.brandName,
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        platforms: data.platforms,
        contentType: Array.isArray(data.contentType) ? data.contentType : [data.contentType],
        budget: data.budget,
        budgetMin: budgetMin, // Added required field
        budgetMax: budgetMax, // Added required field
        category: data.category, // Added required field
        deadline: data.deadline,
        deliveryDate: data.deliveryDate,
        tags: data.tags || [],
        isPublic: data.isPublic ?? true,
        // Default values for other required fields
        minFollowers: 0,
        minEngagementRate: 0,
        location: "",
      },
    })

    revalidatePath("/business/opportunities")
    return { status: 201, data: opportunity }
  } catch (error) {
    console.error("Error creating opportunity:", error)
    return { status: 500, error: "Failed to create opportunity" }
  }
}
