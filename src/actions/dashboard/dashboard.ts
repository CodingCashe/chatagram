"use server"

import { client } from "@/lib/prisma"
import { getAutomations } from "@/actions/automations/queries"

export async function getDashboardDati(userId: string) {
  try {
    const automations = await getAutomations(userId)

    const activeConversations = await client.conversationState.count({
      where: { isActive: true },
    })

    const recentDms = await client.dms.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: { Automation: true },
    })

    const recentKeywords = await client.keyword.findMany({
      take: 5,
      orderBy: { Automation: { createdAt: "desc" } },
      include: { Automation: true },
    })

    // Fetch data for the engagement chart
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const engagementData = await client.dms.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    const commentData = await client.listener.findMany({
      where: {
        Automation: {
          createdAt: {
            gte: sixMonthsAgo,
          },
        },
      },
      select: {
        Automation: {
          select: {
            createdAt: true,
          },
        },
        commentCount: true,
      },
      orderBy: {
        Automation: {
          createdAt: "asc",
        },
      },
    })

    return {
      automations: automations?.automations || [],
      activeConversations,
      recentDms,
      recentKeywords,
      engagementData,
      commentData,
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw new Error("Failed to fetch dashboard data")
  }
}

