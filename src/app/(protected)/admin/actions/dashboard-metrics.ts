// "use server"

// import { client } from "@/lib/prisma"
// import { onCurrentUser } from "@/actions/user"

// export async function getDashboardMetrics() {
//   try {
//     // Get current user
//     const user = await onCurrentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Get current date
//     const now = new Date()
//     const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

//     // Get metrics from database
//     const [
//       totalUsers,
//       activeUsers,
//       totalMessages,
//       messagesSentToday,
//       totalAutomations,
//       activeAutomations,
//       scheduledMessages,
//     ] = await Promise.all([
//       client.user.count(),
//       client.user.count({
//         where: {
//           // Users who have logged in within the last 7 days
//           lastLoginAt: {
//             gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
//           },
//         },
//       }),
//       client.message.count(),
//       client.message.count({
//         where: {
//           createdAt: {
//             gte: startOfDay,
//           },
//         },
//       }),
//       client.automation.count(),
//       client.automation.count({
//         where: {
//           active: true,
//         },
//       }),
//       client.scheduledContent.count({
//         where: {
//           scheduledDate: {
//             gte: now,
//           },
//         },
//       }),
//     ])

//     // Calculate average response time (mock data for now)
//     const averageResponseTime = 2.5

//     // Calculate engagement rate (mock data for now)
//     const engagementRate = 68

//     // Calculate conversion rate (mock data for now)
//     const conversionRate = 12

//     return {
//       totalUsers,
//       activeUsers,
//       totalMessages,
//       messagesSentToday,
//       totalAutomations,
//       activeAutomations,
//       scheduledMessages,
//       averageResponseTime,
//       engagementRate,
//       conversionRate,
//     }
//   } catch (error) {
//     console.error("Error fetching dashboard metrics:", error)
//     throw new Error("Failed to fetch dashboard metrics")
//   }
// }

// export async function getRecentAutomationActivity(limit = 5) {
//   try {
//     // Get current user
//     const user = await onCurrentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Get recent automation activity
//     const automations = await client.automation.findMany({
//       take: limit,
//       orderBy: {
//         updatedAt: "desc",
//       },
//       include: {
//         User: {
//           select: {
//             firstname: true,
//             lastname: true,
//           },
//         },
//         messages: {
//           take: 1,
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         listener: true,
//       },
//     })

//     return automations.map((automation) => ({
//       id: automation.id,
//       name: automation.name,
//       type: automation.listener?.listener || "UNKNOWN",
//       status: automation.active ? "active" : "inactive",
//       lastTriggered: automation.messages[0]?.createdAt.toISOString() || automation.updatedAt.toISOString(),
//       messagesTriggered: Math.floor(Math.random() * 100) + 1, // Mock data for now
//       userName: `${automation.User?.firstname || ""} ${automation.User?.lastname || ""}`.trim() || "Unknown User",
//     }))
//   } catch (error) {
//     console.error("Error fetching recent automation activity:", error)
//     throw new Error("Failed to fetch recent automation activity")
//   }
// }

// export async function getSystemStatus() {
//   try {
//     // Get current user
//     const user = await onCurrentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // In a real implementation, you would check the status of your systems
//     // For now, we'll return mock data
//     return {
//       apiStatus: "healthy" as const,
//       databaseStatus: "healthy" as const,
//       instagramStatus: "healthy" as const,
//       lastSyncTime: new Date().toISOString(),
//       pendingTasks: Math.floor(Math.random() * 5),
//     }
//   } catch (error) {
//     console.error("Error fetching system status:", error)
//     throw new Error("Failed to fetch system status")
//   }
// }

// export async function getUnreadNotificationsCount() {
//   try {
//     // Get current user
//     const user = await onCurrentUser()
//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     // Check if user is admin
//     const dbUser = await client.user.findUnique({
//       where: { clerkId: user.id },
//       select: { isAdmin: true, id: true },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     // Get unread notifications count
//     const count = await client.userNotification.count({
//       where: {
//         userId: dbUser.id,
//         read: false,
//       },
//     })

//     return count
//   } catch (error) {
//     console.error("Error fetching unread notifications count:", error)
//     return 0
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export async function getDashboardMetrics() {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // Get current date
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Get metrics from database
    const [
      totalUsers,
      activeUsers,
      totalMessages,
      messagesSentToday,
      totalAutomations,
      activeAutomations,
      scheduledMessages,
    ] = await Promise.all([
      client.user.count(),
      client.user.count({
        where: {
          // Users who have been active recently (using createdAt as a proxy since lastLoginAt doesn't exist)
          createdAt: {
            gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // Last 30 days as a proxy
          },
        },
      }),
      client.message.count(),
      client.message.count({
        where: {
          createdAt: {
            gte: startOfDay,
          },
        },
      }),
      client.automation.count(),
      client.automation.count({
        where: {
          active: true,
        },
      }),
      client.scheduledContent.count({
        where: {
          scheduledDate: {
            gte: now,
          },
        },
      }),
    ])

    // Calculate average response time (mock data for now)
    const averageResponseTime = 2.5

    // Calculate engagement rate (mock data for now)
    const engagementRate = 68

    // Calculate conversion rate (mock data for now)
    const conversionRate = 12

    return {
      totalUsers,
      activeUsers,
      totalMessages,
      messagesSentToday,
      totalAutomations,
      activeAutomations,
      scheduledMessages,
      averageResponseTime,
      engagementRate,
      conversionRate,
    }
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error)
    throw new Error("Failed to fetch dashboard metrics")
  }
}

export async function getRecentAutomationActivity(limit = 5) {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // Get recent automation activity
    const automations = await client.automation.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc", // Use createdAt instead of updatedAt
      },
      include: {
        User: true, // Assuming the relation is named 'user' not 'User'
      },
    })

    return automations.map((automation) => ({
      id: automation.id,
      name: automation.name,
      type: automation.platform || "UNKNOWN", // Use platform instead of listener
      status: automation.active ? "active" : "inactive",
      lastTriggered: automation.createdAt.toISOString(), // Use createdAt as a proxy
      messagesTriggered: Math.floor(Math.random() * 100) + 1, // Mock data
      userName: automation.userId || "Unknown User",
    }))
  } catch (error) {
    console.error("Error fetching recent automation activity:", error)
    throw new Error("Failed to fetch recent automation activity")
  }
}

export async function getSystemStatus() {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // In a real implementation, you would check the status of your systems
    // For now, we'll return mock data
    return {
      apiStatus: "healthy" as const,
      databaseStatus: "healthy" as const,
      instagramStatus: "healthy" as const,
      lastSyncTime: new Date().toISOString(),
      pendingTasks: Math.floor(Math.random() * 5),
    }
  } catch (error) {
    console.error("Error fetching system status:", error)
    throw new Error("Failed to fetch system status")
  }
}

export async function getUnreadNotificationsCount() {
  try {
    // Get current user
    const user = await currentUser()
    if (!user) {
      throw new Error("Not authenticated")
    }

    // Check if user is admin
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { isAdmin: true, id: true },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    // Get unread notifications count
    const count = await client.userNotification.count({
      where: {
        userId: dbUser.id,
        read: false,
      },
    })

    return count
  } catch (error) {
    console.error("Error fetching unread notifications count:", error)
    return 0
  }
}

