"use server"
import { client } from "@/lib/prisma"
import { onUserInfor } from "@/actions/user"

// Get influencer profile
export async function getInfluencerProfile() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
      include: {
        socialAccounts: true,
        rates: true,
      },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    return { status: 200, data: influencer }
  } catch (error) {
    console.error("Error fetching influencer profile:", error)
    return { status: 500, message: "Failed to fetch influencer profile" }
  }
}

// Get influencer metrics
export async function getInfluencerMetrics() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    const metrics = await client.influencerMetrics.findMany({
      where: { influencerId: influencer.id },
      orderBy: { date: "desc" },
      take: 30,
    })

    // Get latest metrics
    const latestMetrics = metrics[0] || null

    return {
      status: 200,
      data: {
        metrics,
        latestMetrics,
        followers: influencer.followers,
        engagementRate: influencer.engagementRate,
        averageLikes: influencer.averageLikes,
        averageComments: influencer.averageComments,
      },
    }
  } catch (error) {
    console.error("Error fetching influencer metrics:", error)
    return { status: 500, message: "Failed to fetch influencer metrics" }
  }
}

// Get upcoming campaigns
export async function getUpcomingCampaigns() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    const campaigns = await client.campaignInfluencer.findMany({
      where: {
        influencerId: influencer.id,
        status: { in: ["invited", "accepted", "in_progress"] },
      },
      include: {
        campaign: true,
      },
      orderBy: { dueDate: "asc" },
      take: 5,
    })

    return { status: 200, data: campaigns }
  } catch (error) {
    console.error("Error fetching upcoming campaigns:", error)
    return { status: 500, message: "Failed to fetch upcoming campaigns" }
  }
}

// Get content performance
export async function getContentPerformance() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    // This would typically fetch from a content performance table
    // For now, we'll return mock data
    const mockContentPerformance = [
      {
        id: "post-1",
        type: "Reel",
        platform: "Instagram",
        date: "2023-04-05",
        likes: 12400,
        comments: 840,
        shares: 320,
        saves: 560,
        engagement: 5.2,
        impressions: 85000,
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "post-2",
        type: "Post",
        platform: "Instagram",
        date: "2023-04-02",
        likes: 8700,
        comments: 520,
        shares: 180,
        saves: 420,
        engagement: 4.8,
        impressions: 65000,
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "post-3",
        type: "Story",
        platform: "Instagram",
        date: "2023-04-06",
        likes: 0,
        comments: 0,
        shares: 120,
        saves: 0,
        engagement: 4.5,
        impressions: 52000,
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "post-4",
        type: "Video",
        platform: "TikTok",
        date: "2023-04-04",
        likes: 18500,
        comments: 1240,
        shares: 850,
        saves: 720,
        engagement: 6.2,
        impressions: 120000,
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
    ]

    return { status: 200, data: mockContentPerformance }
  } catch (error) {
    console.error("Error fetching content performance:", error)
    return { status: 500, message: "Failed to fetch content performance" }
  }
}

// Get audience insights
export async function getAudienceInsights() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    // This would typically fetch from audience demographics data
    // For now, we'll use the data from the influencer model
    const audienceData = influencer.audienceDemographics || {
      ageGroups: [
        { name: "18-24", value: 45 },
        { name: "25-34", value: 32 },
        { name: "35-44", value: 15 },
        { name: "45+", value: 8 },
      ],
      gender: [
        { name: "Female", value: 68 },
        { name: "Male", value: 30 },
        { name: "Other", value: 2 },
      ],
      topLocations: [
        { name: "United States", value: 65 },
        { name: "United Kingdom", value: 12 },
        { name: "Canada", value: 8 },
        { name: "Australia", value: 6 },
        { name: "Germany", value: 4 },
      ],
      interests: [
        { name: "Fashion", value: 85 },
        { name: "Beauty", value: 72 },
        { name: "Travel", value: 68 },
        { name: "Fitness", value: 45 },
        { name: "Food", value: 38 },
      ],
    }

    return { status: 200, data: audienceData }
  } catch (error) {
    console.error("Error fetching audience insights:", error)
    return { status: 500, message: "Failed to fetch audience insights" }
  }
}

// Get revenue analytics
export async function getRevenueAnalytics() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    const earnings = await client.influencerEarnings.findMany({
      where: { influencerId: influencer.id },
      orderBy: { date: "asc" },
      take: 12,
    })

    // If no earnings data, return mock data
    if (earnings.length === 0) {
      const mockEarnings = [
        { month: "Nov", campaigns: 2800, affiliate: 400, sponsorships: 0, total: 3200 },
        { month: "Dec", campaigns: 3000, affiliate: 450, sponsorships: 150, total: 3600 },
        { month: "Jan", campaigns: 3200, affiliate: 500, sponsorships: 200, total: 3900 },
        { month: "Feb", campaigns: 3400, affiliate: 550, sponsorships: 250, total: 4200 },
        { month: "Mar", campaigns: 3600, affiliate: 600, sponsorships: 300, total: 4500 },
        { month: "Apr", campaigns: 3800, affiliate: 650, sponsorships: 300, total: 4750 },
      ]

      return {
        status: 200,
        data: {
          earnings: mockEarnings,
          totalEarnings: influencer.totalEarnings,
          pendingEarnings: influencer.pendingEarnings,
          currentMonthEarnings: influencer.currentMonthEarnings,
          monthlyEarningsGrowth: influencer.monthlyEarningsGrowth,
        },
      }
    }

    return {
      status: 200,
      data: {
        earnings,
        totalEarnings: influencer.totalEarnings,
        pendingEarnings: influencer.pendingEarnings,
        currentMonthEarnings: influencer.currentMonthEarnings,
        monthlyEarningsGrowth: influencer.monthlyEarningsGrowth,
      },
    }
  } catch (error) {
    console.error("Error fetching revenue analytics:", error)
    return { status: 500, message: "Failed to fetch revenue analytics" }
  }
}

// Get brand opportunities
export async function getBrandOpportunities() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    const opportunities = await client.opportunity.findMany({
      where: {
        isPublic: true,
        status: "OPEN",
        // Could add more filters based on influencer niche, etc.
      },
      include: {
        business: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    // Calculate match score based on influencer profile and opportunity
    const opportunitiesWithMatch = opportunities.map((opportunity) => {
      // This would be a more complex algorithm in production
      const matchScore = Math.floor(Math.random() * 30) + 70 // 70-100% match

      return {
        ...opportunity,
        matchScore,
      }
    })

    return { status: 200, data: opportunitiesWithMatch }
  } catch (error) {
    console.error("Error fetching brand opportunities:", error)
    return { status: 500, message: "Failed to fetch brand opportunities" }
  }
}

// Get content calendar
export async function getContentCalendar() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    const influencer = await client.influencer.findUnique({
      where: { userId },
    })

    if (!influencer) {
      return { status: 404, message: "Influencer profile not found" }
    }

    // This would typically fetch from a content calendar table
    // For now, we'll return mock data
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    // Generate mock calendar data for the current month
    const mockCalendar = Array.from({ length: 30 }, (_, i) => {
      const day = i + 1
      const date = new Date(currentYear, currentMonth, day)

      // Random content on some days
      const hasContent = Math.random() > 0.7

      return {
        date,
        day,
        hasContent,
        content: hasContent
          ? [
              {
                id: `content-${day}-1`,
                type: ["Post", "Reel", "Story"][Math.floor(Math.random() * 3)],
                platform: ["Instagram", "TikTok"][Math.floor(Math.random() * 2)],
                status: ["draft", "scheduled", "published"][Math.floor(Math.random() * 3)],
                time: `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? "30" : "00"} ${Math.random() > 0.5 ? "AM" : "PM"}`,
              },
              // Some days have multiple content pieces
              ...(Math.random() > 0.7
                ? [
                    {
                      id: `content-${day}-2`,
                      type: ["Post", "Reel", "Story"][Math.floor(Math.random() * 3)],
                      platform: ["Instagram", "TikTok"][Math.floor(Math.random() * 2)],
                      status: ["draft", "scheduled", "published"][Math.floor(Math.random() * 3)],
                      time: `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? "30" : "00"} ${Math.random() > 0.5 ? "AM" : "PM"}`,
                    },
                  ]
                : []),
            ]
          : [],
      }
    })

    return { status: 200, data: mockCalendar }
  } catch (error) {
    console.error("Error fetching content calendar:", error)
    return { status: 500, message: "Failed to fetch content calendar" }
  }
}



////////////////////////////////////////////////////////////////////////////////////////
