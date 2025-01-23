// "use server"

// import { onCurrentUser } from "../user"
// import {
//   getDashboardDataQuery,
//   getEngagementDataQuery,
//   getCommentDataQuery,
//   getRecentDmsQuery,
//   getRecentKeywordsQuery,
// } from "./queries"

// export async function getDashboardData() {
//   const user = await onCurrentUser()
//   try {
//     const dashboardData = await getDashboardDataQuery(user.id)
//     const engagementData = await getEngagementDataQuery(user.id)
//     const commentData = await getCommentDataQuery(user.id)
//     const recentDms = await getRecentDmsQuery()
//     const recentKeywords = await getRecentKeywordsQuery()

//     return {
//       status: 200,
//       data: {
//         ...dashboardData,
//         engagementData,
//         commentData,
//         recentDms,
//         recentKeywords,
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error)
//     return { status: 500, data: null }
//   }
// }

// export async function getActiveConversations() {
//   const user = await onCurrentUser()
//   try {
//     const { activeConversations } = await getDashboardDataQuery(user.id)
//     return { status: 200, data: activeConversations }
//   } catch (error) {
//     console.error("Error fetching active conversations:", error)
//     return { status: 500, data: "Failed to fetch active conversations" }
//   }
// }

// export async function getAutomationsCount() {
//   const user = await onCurrentUser()
//   try {
//     const { automationsCount } = await getDashboardDataQuery(user.id)
//     return { status: 200, data: automationsCount }
//   } catch (error) {
//     console.error("Error fetching automations count:", error)
//     return { status: 500, data: "Failed to fetch automations count" }
//   }
// }

// "use server"

// import type { DashboardData } from "@/types/dashboard"
// import { onCurrentUser } from "../user"
// import {
//   getDashboardDataQuery,
//   getEngagementDataQuery,
//   getCommentDataQuery,
//   getRecentDmsQuery,
//   getRecentKeywordsQuery,
// } from "./queries"

// export async function getDashboardData(): Promise<DashboardData> {
//   const user = await onCurrentUser()
//   try {
//     const dashboardData = await getDashboardDataQuery(user.id)
//     const engagementData = await getEngagementDataQuery(user.id)
//     const commentData = await getCommentDataQuery(user.id)
//     const recentDms = await getRecentDmsQuery()
//     const recentKeywords = await getRecentKeywordsQuery()

//     return {
//       status: 200,
//       data: {
//         ...dashboardData,
//         engagementData,
//         commentData,
//         recentDms,
//         recentKeywords,
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error)
//     return { status: 500, data: null }
//   }
// }

"use server"

import type { DashboardData, Automation, EngagementData } from "@/types/dashboard"
import { onCurrentUser } from "../user"
import {
  getDashboardDataQuery,
  getEngagementDataForAutomationQuery,
  getCommentDataForAutomationQuery,
  getRecentDmsQuery,
  getRecentKeywordsQuery,
  getAutomationsForUserQuery,
} from "./queries"

export async function getDashboardData(): Promise<DashboardData> {
  const user = await onCurrentUser()
  try {
    const dashboardData = await getDashboardDataQuery(user.id)
    const recentDms = await getRecentDmsQuery()
    const recentKeywords = await getRecentKeywordsQuery()
    const engagementData = await getEngagementDataForAutomationQuery(dashboardData.automations[0]?.id || "")
    const commentData = await getCommentDataForAutomationQuery(dashboardData.automations[0]?.id || "")

    return {
      status: 200,
      data: {
        ...dashboardData,
        recentDms,
        recentKeywords,
        engagementData,
        commentData: commentData ? [commentData] : [],
      },
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return { status: 500, data: null }
  }
}

export async function getAutomationsForUser(): Promise<Automation[]> {
  const user = await onCurrentUser()
  try {
    const automations = await getAutomationsForUserQuery(user.id)
    return automations.map((automation) => ({
      id: automation.id,
      name: automation.name,
      active: automation.active,
      createdAt: automation.createdAt,
      listener: automation.listener,
    }))
  } catch (error) {
    console.error("Error fetching automations:", error)
    return []
  }
}

export async function getEngagementDataForAutomation(automationId: string): Promise<{
  engagementData: EngagementData[]
  commentData: { Automation: { createdAt: Date }; commentCount: number } | null
}> {
  try {
    const engagementData = await getEngagementDataForAutomationQuery(automationId)
    const commentData = await getCommentDataForAutomationQuery(automationId)
    return {
      engagementData: engagementData.map((data) => ({
        date: data.createdAt.toISOString().split("T")[0],
        dms: data._count.id,
        comments: 0, // We'll update this with comment data later
      })),
      commentData,
    }
  } catch (error) {
    console.error("Error fetching engagement data:", error)
    return { engagementData: [], commentData: null }
  }
}

