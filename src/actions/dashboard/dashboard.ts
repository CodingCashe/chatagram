// "use server"

// import { client } from "@/lib/prisma"
// import { getAutomations } from "../automations/queries"

// export async function getDashboardData(userId: string) {
//   try {
//     const automations = await getAutomations(userId)

//     const activeConversations = await client.conversationState.count({
//       where: { isActive: true },
//     })

//     const recentDms = await client.dms.findMany({
//       take: 5,
//       orderBy: { createdAt: "desc" },
//       include: { Automation: true },
//     })

//     const recentKeywords = await client.keyword.findMany({
//       take: 5,
//       orderBy: { Automation: { createdAt: "desc" } },
//       include: { Automation: true },
//     })

//     return {
//       automations: automations?.automations || [],
//       activeConversations,
//       recentDms,
//       recentKeywords,
//     }
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error)
//     throw new Error("Failed to fetch dashboard data")
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { getAutomations } from "@/actions/automations/queries"

export async function getDashboardData(userId: string) {
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

    return {
      automations: automations?.automations || [],
      activeConversations,
      recentDms,
      recentKeywords,
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw new Error("Failed to fetch dashboard data")
  }
}

