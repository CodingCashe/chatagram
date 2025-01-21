"use server"

import { client } from "@/lib/prisma"

export async function getDashboardDataQuery(userId: string) {
  const user = await client.user.findUnique({
    where: { clerkId: userId },
    include: {
      automations: {
        include: {
          listener: true,
        },
      },
    },
  })

  const activeConversations = await client.conversationState.count({
    where: { isActive: true },
  })

  return {
    automations: user?.automations || [],
    automationsCount: user?.automations.length || 0,
    activeConversations,
  }
}

export async function getEngagementDataQuery(userId: string) {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  return await client.dms.groupBy({
    by: ["createdAt"],
    where: {
      Automation: {
        User: {
          clerkId: userId,
        },
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })
}

export async function getCommentDataQuery(userId: string) {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  return await client.listener.findMany({
    where: {
      Automation: {
        User: {
          clerkId: userId,
        },
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
}

export async function getRecentDmsQuery() {
  return await client.dms.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    include: { Automation: true },
  })
}

export async function getRecentKeywordsQuery() {
  return await client.keyword.findMany({
    take: 5,
    orderBy: { Automation: { createdAt: "desc" } },
    include: { Automation: true },
  })
}

