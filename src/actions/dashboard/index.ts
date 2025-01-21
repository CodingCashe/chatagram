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

"use server"

import type { DashboardData } from "@/types/dashboard"
import { onCurrentUser } from "../user"
import {
  getDashboardDataQuery,
  getEngagementDataQuery,
  getCommentDataQuery,
  getRecentDmsQuery,
  getRecentKeywordsQuery,
} from "./queries"

export async function getDashboardData(): Promise<DashboardData> {
  const user = await onCurrentUser()
  try {
    const dashboardData = await getDashboardDataQuery(user.id)
    const engagementData = await getEngagementDataQuery(user.id)
    const commentData = await getCommentDataQuery(user.id)
    const recentDms = await getRecentDmsQuery()
    const recentKeywords = await getRecentKeywordsQuery()

    return {
      status: 200,
      data: {
        ...dashboardData,
        engagementData,
        commentData,
        recentDms,
        recentKeywords,
      },
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return { status: 500, data: null }
  }
}

