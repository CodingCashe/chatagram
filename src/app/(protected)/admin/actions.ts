// "use server"


// import { client } from "@/lib/prisma"
// import { onCurrentUser } from "@/actions/user"
// import type { Prisma } from "@prisma/client"
// // import { onCurrentUser } from "@clerk/nextjs"
// import { revalidatePath } from "next/cache"
// import { headers } from "next/headers"
// import os from "os"


// // Get all scheduled content with pagination
// // export async function getAllScheduledContent(page = 1, limit = 10, search = "") {
// //   try {
// //     const skip = (page - 1) * limit

// //     // Create a where clause for searching content or related users
// //     const where = search
// //       ? {
// //           OR: [
// //             { caption: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //             {
// //               User: {
// //                 OR: [
// //                   { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //                   { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //                   { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //                 ],
// //               },
// //             },
// //           ],
// //         }
// //       : {}

// //     const [scheduledContent, totalCount] = await Promise.all([
// //       client.scheduledContent.findMany({
// //         where,
// //         skip,
// //         take: limit,
// //         orderBy: {
// //           scheduledDate: "asc",
// //         },
// //         include: {
// //           User: {
// //             select: {
// //               id: true,
// //               email: true,
// //               firstname: true,
// //               lastname: true,
// //             },
// //           },
// //           automation: {
// //             select: {
// //               id: true,
// //               name: true,
// //             },
// //           },
// //         },
// //       }),
// //       client.scheduledContent.count({ where }),
// //     ])

// //     return {
// //       scheduledContent: scheduledContent.map((content) => ({
// //         id: content.id,
// //         caption: content.caption,
// //         mediaType: content.mediaType,
// //         thumbnailUrl: content.thumbnailUrl || content.mediaUrl,
// //         scheduledDate: content.scheduledDate.toISOString(),
// //         status: content.status,
// //         userId: content.userId,
// //         userName: `${content.User?.firstname || ""} ${content.User?.lastname || ""}`.trim(),
// //         userEmail: content.User?.email,
// //         automationId: content.automationId,
// //         automationName: content.automation?.name || "No Automation",
// //       })),
// //       totalCount,
// //       totalPages: Math.ceil(totalCount / limit),
// //     }
// //   } catch (error) {
// //     console.error("Error fetching scheduled content:", error)
// //     throw new Error("Failed to fetch scheduled content")
// //   }
// // }

// // Update user admin status
// export async function updateUserAdminStatus(userId: string, isAdmin: boolean) {
//   try {
//     await client.user.update({
//       where: { id: userId },
//       data: { isAdmin },
//     })

//     return { success: true }
//   } catch (error) {
//     console.error("Error updating user admin status:", error)
//     throw new Error("Failed to update user admin status")
//   }
// }

// // Update subscription plan
// // export async function updateSubscriptionPlan(subscriptionId: string, plan: "PRO" | "FREE") {
// //   try {
// //     await client.subscription.update({
// //       where: { id: subscriptionId },
// //       data: { plan },
// //     })

// //     return { success: true }
// //   } catch (error) {
// //     console.error("Error updating subscription plan:", error)
// //     throw new Error("Failed to update subscription plan")
// //   }
// // }

// // Get subscription growth data
// // export async function getSubscriptionGrowthData(period: "weekly" | "monthly" | "yearly") {
// //   try {
// //     const now = new Date()
// //     let startDate: Date
// //     let groupByFormat: string
// //     let labels: string[] = []

// //     // Set the appropriate time range and format based on the period
// //     if (period === "weekly") {
// //       startDate = new Date(now)
// //       startDate.setDate(now.getDate() - 7)
// //       groupByFormat = "%Y-%m-%d" // Daily format

// //       // Generate labels for the last 7 days
// //       labels = Array.from({ length: 7 }, (_, i) => {
// //         const date = new Date(now)
// //         date.setDate(now.getDate() - 6 + i)
// //         return date.toLocaleDateString("en-US", { weekday: "short" })
// //       })
// //     } else if (period === "monthly") {
// //       startDate = new Date(now)
// //       startDate.setMonth(now.getMonth() - 12)
// //       groupByFormat = "%Y-%m" // Monthly format

// //       // Generate labels for the last 12 months
// //       labels = Array.from({ length: 12 }, (_, i) => {
// //         const date = new Date(now)
// //         date.setMonth(now.getMonth() - 11 + i)
// //         return date.toLocaleDateString("en-US", { month: "short" })
// //       })
// //     } else {
// //       // yearly
// //       startDate = new Date(now)
// //       startDate.setFullYear(now.getFullYear() - 5)
// //       groupByFormat = "%Y" // Yearly format

// //       // Generate labels for the last 5 years
// //       labels = Array.from({ length: 5 }, (_, i) => {
// //         const date = new Date(now)
// //         date.setFullYear(now.getFullYear() - 4 + i)
// //         return date.getFullYear().toString()
// //       })
// //     }

// //     // For a real implementation, you would use a database query that supports grouping by date
// //     // Since we're using Prisma, we'll fetch all subscriptions in the date range and group them in JavaScript
// //     const subscriptions = await client.subscription.findMany({
// //       where: {
// //         createdAt: {
// //           gte: startDate,
// //         },
// //       },
// //       select: {
// //         createdAt: true,
// //         plan: true,
// //       },
// //       orderBy: {
// //         createdAt: "asc",
// //       },
// //     })

// //     // Group subscriptions by the appropriate time period
// //     const groupedData: Record<string, { total: number; pro: number }> = {}

// //     // Initialize the groups with zeros
// //     labels.forEach((label) => {
// //       groupedData[label] = { total: 0, pro: 0 }
// //     })

// //     // Count subscriptions for each group
// //     subscriptions.forEach((sub) => {
// //       let key: string

// //       if (period === "weekly") {
// //         key = sub.createdAt.toLocaleDateString("en-US", { weekday: "short" })
// //       } else if (period === "monthly") {
// //         key = sub.createdAt.toLocaleDateString("en-US", { month: "short" })
// //       } else {
// //         // yearly
// //         key = sub.createdAt.getFullYear().toString()
// //       }

// //       if (groupedData[key]) {
// //         groupedData[key].total += 1
// //         if (sub.plan === "PRO") {
// //           groupedData[key].pro += 1
// //         }
// //       }
// //     })

// //     // Convert to arrays for the chart
// //     const data = labels.map((label) => ({
// //       label,
// //       total: groupedData[label].total,
// //       pro: groupedData[label].pro,
// //     }))

// //     return { labels, data }
// //   } catch (error) {
// //     console.error("Error fetching subscription growth data:", error)
// //     throw new Error("Failed to fetch subscription growth data")
// //   }
// // }

// // Get automation type distribution
// // export async function getAutomationTypeDistribution() {
// //   try {
// //     const automations = await client.automation.findMany({
// //       include: {
// //         listener: true,
// //       },
// //     })

// //     // Count automations by type
// //     const typeCounts: Record<string, number> = {
// //       MESSAGE: 0,
// //       SMARTAI: 0,
// //       OTHER: 0,
// //     }

// //     automations.forEach((auto) => {
// //       if (auto.listener?.listener === "MESSAGE") {
// //         typeCounts.MESSAGE += 1
// //       } else if (auto.listener?.listener === "SMARTAI") {
// //         typeCounts.SMARTAI += 1
// //       } else {
// //         typeCounts.OTHER += 1
// //       }
// //     })

// //     // Calculate percentages
// //     const total = automations.length
// //     const types = [
// //       {
// //         name: "Message Responders",
// //         count: typeCounts.MESSAGE,
// //         percentage: Math.round((typeCounts.MESSAGE / total) * 100) || 0,
// //       },
// //       { name: "Smart AI", count: typeCounts.SMARTAI, percentage: Math.round((typeCounts.SMARTAI / total) * 100) || 0 },
// //       { name: "Other", count: typeCounts.OTHER, percentage: Math.round((typeCounts.OTHER / total) * 100) || 0 },
// //     ]

// //     return types
// //   } catch (error) {
// //     console.error("Error fetching automation type distribution:", error)
// //     throw new Error("Failed to fetch automation type distribution")
// //   }
// // }


// /////////

// // Get current admin user details
// // export async function getCurrentAdmin() {
// //   try {
// //     const user = await onCurrentUser()

// //     if (!user) {
// //       throw new Error("Not authenticated")
// //     }

// //     const dbUser = await client.user.findUnique({
// //       where: {
// //         clerkId: user.id,
// //       },
// //       select: {
// //         id: true,
// //         firstname: true,
// //         lastname: true,
// //         email: true,
// //         isAdmin: true,
// //       },
// //     })

// //     if (!dbUser?.isAdmin) {
// //       throw new Error("Not authorized")
// //     }

// //     return {
// //       id: dbUser.id,
// //       name: `${dbUser.firstname || ""} ${dbUser.lastname || ""}`.trim() || "Admin",
// //       email: dbUser.email,
// //       isAdmin: dbUser.isAdmin,
// //     }
// //   } catch (error) {
// //     console.error("Error getting current admin:", error)
// //     throw new Error("Failed to get admin details")
// //   }
// // }

// // // Check if the current user is an admin
// // export async function checkIsAdmin() {
// //   try {
// //     const user = await onCurrentUser()

// //     const dbUser = await client.user.findUnique({
// //       where: {
// //         clerkId: user.id,
// //       },
// //       select: {
// //         isAdmin: true,
// //       },
// //     })

// //     if (!dbUser?.isAdmin) {
// //       return false
// //     }

// //     return true
// //   } catch (error) {
// //     console.error("Error checking admin status:", error)
// //     return false
// //   }
// // }

// // // Get dashboard stats
// // export async function getDashboardStats() {
// //   try {
// //     // Get current stats
// //     const [totalUsers, proSubscriptions, totalAutomations, activeAutomations, totalScheduledContent, messagesSent] =
// //       await Promise.all([
// //         client.user.count(),
// //         client.subscription.count({
// //           where: {
// //             plan: "PRO",
// //           },
// //         }),
// //         client.automation.count(),
// //         client.automation.count({
// //           where: {
// //             active: true,
// //           },
// //         }),
// //         client.scheduledContent.count(),
// //         client.message.count(),
// //       ])

// //     // Get stats from 30 days ago for growth calculation
// //     const thirtyDaysAgo = new Date()
// //     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

// //     const [previousTotalUsers, previousProSubscriptions, previousTotalAutomations] = await Promise.all([
// //       client.user.count({
// //         where: {
// //           createdAt: {
// //             lt: thirtyDaysAgo,
// //           },
// //         },
// //       }),
// //       client.subscription.count({
// //         where: {
// //           plan: "PRO",
// //           createdAt: {
// //             lt: thirtyDaysAgo,
// //           },
// //         },
// //       }),
// //       client.automation.count({
// //         where: {
// //           createdAt: {
// //             lt: thirtyDaysAgo,
// //           },
// //         },
// //       }),
// //     ])

// //     // Calculate growth percentages
// //     const userGrowth =
// //       previousTotalUsers > 0 ? Math.round(((totalUsers - previousTotalUsers) / previousTotalUsers) * 100) : 100

// //     const subscriptionGrowth =
// //       previousProSubscriptions > 0
// //         ? Math.round(((proSubscriptions - previousProSubscriptions) / previousProSubscriptions) * 100)
// //         : 100

// //     const automationGrowth =
// //       previousTotalAutomations > 0
// //         ? Math.round(((totalAutomations - previousTotalAutomations) / previousTotalAutomations) * 100)
// //         : 100

// //     return {
// //       totalUsers,
// //       proSubscriptions,
// //       totalAutomations,
// //       activeAutomations,
// //       totalScheduledContent,
// //       messagesSent,
// //       userGrowth,
// //       subscriptionGrowth,
// //       automationGrowth,
// //     }
// //   } catch (error) {
// //     console.error("Error fetching dashboard stats:", error)
// //     throw new Error("Failed to fetch dashboard stats")
// //   }
// // }

// // // Get notifications
// // export async function getNotifications() {
// //   try {
// //     // Fetch notifications from the database
// //     const notifications = await client.notification.findMany({
// //       where: {
// //         // You can add filters here if needed
// //       },
// //       orderBy: {
// //         createdAt: "desc",
// //       },
// //       take: 10,
// //     })

// //     // Count unread notifications
// //     const unreadCount = await client.notification.count({
// //       where: {
// //         read: false,
// //       },
// //     })

// //     return {
// //       notifications: notifications.map((notification) => ({
// //         id: notification.id,
// //         title: notification.title,
// //         message: notification.message,
// //         timestamp: notification.createdAt.toISOString(),
// //         read: notification.read,
// //         type: notification.type,
// //       })),
// //       unreadCount,
// //     }
// //   } catch (error) {
// //     console.error("Error fetching notifications:", error)
// //     // Return empty data if there's an error
// //     return {
// //       notifications: [],
// //       unreadCount: 0,
// //     }
// //   }
// // }

// // // Mark notification as read
// // export async function markNotificationAsRead(id: string) {
// //   try {
// //     await client.notification.update({
// //       where: { id },
// //       data: { read: true },
// //     })

// //     revalidatePath("/admin")
// //     return { success: true }
// //   } catch (error) {
// //     console.error("Error marking notification as read:", error)
// //     throw new Error("Failed to mark notification as read")
// //   }
// // }

// // // Mark all notifications as read
// // export async function markAllNotificationsAsRead() {
// //   try {
// //     await client.notification.updateMany({
// //       where: { read: false },
// //       data: { read: true },
// //     })

// //     revalidatePath("/admin")
// //     return { success: true }
// //   } catch (error) {
// //     console.error("Error marking all notifications as read:", error)
// //     throw new Error("Failed to mark all notifications as read")
// //   }
// // }

// // // Get system health
// // export async function getSystemHealth() {
// //   try {
// //     // Get real system metrics
// //     const cpuUsage = (os.loadavg()[0] / os.cpus().length) * 100
// //     const totalMem = os.totalmem()
// //     const freeMem = os.freemem()
// //     const memoryUsage = ((totalMem - freeMem) / totalMem) * 100

// //     // For storage, we'd need a more sophisticated approach in a real app
// //     // This is a simplified version
// //     const storageUsage = 45 // This would be calculated based on actual disk usage

// //     // Check database connection
// //     let databaseStatus: "healthy" | "degraded" | "down" = "down"
// //     try {
// //       await client.$queryRaw`SELECT 1`
// //       databaseStatus = "healthy"
// //     } catch (dbError) {
// //       console.error("Database health check failed:", dbError)
// //       databaseStatus = "down"
// //     }

// //     // Get uptime in seconds
// //     const uptime = os.uptime()

// //     // Check for recent incidents
// //     const recentIncident = await client.incident.findFirst({
// //       where: {
// //         resolvedAt: null,
// //       },
// //       orderBy: {
// //         createdAt: "desc",
// //       },
// //     })

// //     return {
// //       cpu: Math.round(cpuUsage),
// //       memory: Math.round(memoryUsage),
// //       storage: storageUsage,
// //       apiStatus: "healthy" as const, // This would be determined by actual API health checks
// //       databaseStatus,
// //       lastIncident: recentIncident ? recentIncident.description : null,
// //       uptime,
// //     }
// //   } catch (error) {
// //     console.error("Error fetching system health:", error)
// //     throw new Error("Failed to fetch system health")
// //   }
// // }

// // // Get user activity
// // export async function getUserActivity(limit = 10) {
// //   try {
// //     // Fetch recent activity from the database
// //     // This would typically come from an audit log or activity tracking table
// //     const activities = await client.auditLog.findMany({
// //       take: limit,
// //       orderBy: {
// //         timestamp: "desc",
// //       },
// //       include: {
// //         user: {
// //           select: {
// //             id: true,
// //             firstname: true,
// //             lastname: true,
// //             email: true,
// //           },
// //         },
// //       },
// //     })

// //     return activities.map((activity) => ({
// //       id: activity.id,
// //       userId: activity.userId,
// //       userName: `${activity.user.firstname || ""} ${activity.user.lastname || ""}`.trim(),
// //       userEmail: activity.user.email,
// //       action: activity.action,
// //       target: activity.target,
// //       timestamp: activity.timestamp.toISOString(),
// //       details: activity.details || undefined,
// //     }))
// //   } catch (error) {
// //     console.error("Error fetching user activity:", error)
// //     // If the audit log table doesn't exist yet, return an empty array
// //     return []
// //   }
// // }

// // // Send system notification
// // export async function sendSystemNotification(title: string, message: string) {
// //   try {
// //     // Create a new notification in the database
// //     await client.notification.create({
// //       data: {
// //         title,
// //         message,
// //         type: "system",
// //         read: false,
// //       },
// //     })

// //     revalidatePath("/admin")
// //     return { success: true }
// //   } catch (error) {
// //     console.error("Error sending system notification:", error)
// //     throw new Error("Failed to send system notification")
// //   }
// // }

// // // Get recent users
// // export async function getRecentUsers(limit = 5) {
// //   try {
// //     const users = await client.user.findMany({
// //       take: limit,
// //       orderBy: {
// //         createdAt: "desc",
// //       },
// //       include: {
// //         subscription: true,
// //         integrations: {
// //           select: {
// //             id: true,
// //           },
// //         },
// //         automations: {
// //           select: {
// //             id: true,
// //           },
// //         },
// //       },
// //     })

// //     return users.map((user) => ({
// //       id: user.id,
// //       name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
// //       email: user.email,
// //       plan: user.subscription?.plan || "FREE",
// //       createdAt: user.createdAt.toISOString(),
// //       integrations: user.integrations.length,
// //       automations: user.automations.length,
// //     }))
// //   } catch (error) {
// //     console.error("Error fetching recent users:", error)
// //     throw new Error("Failed to fetch recent users")
// //   }
// // }

// // // Get all users with pagination
// // export async function getAllUsers(page = 1, limit = 10, search = "") {
// //   try {
// //     const skip = (page - 1) * limit

// //     const where = search
// //       ? {
// //           OR: [
// //             { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //             { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //             { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //           ],
// //         }
// //       : {}

// //     const [users, totalCount] = await Promise.all([
// //       client.user.findMany({
// //         where,
// //         skip,
// //         take: limit,
// //         orderBy: {
// //           createdAt: "desc",
// //         },
// //         include: {
// //           subscription: true,
// //           integrations: {
// //             select: {
// //               id: true,
// //             },
// //           },
// //           automations: {
// //             select: {
// //               id: true,
// //               active: true,
// //             },
// //           },
// //         },
// //       }),
// //       client.user.count({ where }),
// //     ])

// //     return {
// //       users: users.map((user) => ({
// //         id: user.id,
// //         name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
// //         email: user.email,
// //         plan: user.subscription?.plan || "FREE",
// //         createdAt: user.createdAt.toISOString(),
// //         integrations: user.integrations.length,
// //         automations: user.automations.length,
// //         activeAutomations: user.automations.filter((a) => a.active).length,
// //         status: user.integrations.length > 0 ? "active" : "inactive",
// //       })),
// //       totalCount,
// //       totalPages: Math.ceil(totalCount / limit),
// //     }
// //   } catch (error) {
// //     console.error("Error fetching all users:", error)
// //     throw new Error("Failed to fetch users")
// //   }
// // }

// // // Get all subscriptions with pagination
// // export async function getAllSubscriptions(page = 1, limit = 10, search = "") {
// //   try {
// //     const skip = (page - 1) * limit

// //     // Create a where clause for searching users related to subscriptions
// //     const where = search
// //       ? {
// //           User: {
// //             OR: [
// //               { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //               { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //               { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //             ],
// //           },
// //         }
// //       : {}

// //     const [subscriptions, totalCount] = await Promise.all([
// //       client.subscription.findMany({
// //         where,
// //         skip,
// //         take: limit,
// //         orderBy: {
// //           createdAt: "desc",
// //         },
// //         include: {
// //           User: {
// //             select: {
// //               id: true,
// //               email: true,
// //               firstname: true,
// //               lastname: true,
// //             },
// //           },
// //         },
// //       }),
// //       client.subscription.count({ where }),
// //     ])

// //     return {
// //       subscriptions: subscriptions.map((sub) => ({
// //         id: sub.id,
// //         userId: sub.userId,
// //         userName: `${sub.User?.firstname || ""} ${sub.User?.lastname || ""}`.trim(),
// //         userEmail: sub.User?.email,
// //         plan: sub.plan,
// //         status: sub.plan === "PRO" ? "active" : "free",
// //         startDate: sub.createdAt.toISOString(),
// //         updatedAt: sub.updatedAt.toISOString(),
// //         customerId: sub.customerId,
// //       })),
// //       totalCount,
// //       totalPages: Math.ceil(totalCount / limit),
// //     }
// //   } catch (error) {
// //     console.error("Error fetching all subscriptions:", error)
// //     throw new Error("Failed to fetch subscriptions")
// //   }
// // }

// // // Get all automations with pagination
// // export async function getAllAutomations(page = 1, limit = 10, search = "") {
// //   try {
// //     const skip = (page - 1) * limit

// //     // Create a where clause for searching automations or related users
// //     const where = search
// //       ? {
// //           OR: [
// //             { name: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //             {
// //               User: {
// //                 OR: [
// //                   { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //                   { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //                   { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
// //                 ],
// //               },
// //             },
// //           ],
// //         }
// //       : {}

// //     const [automations, totalCount] = await Promise.all([
// //       client.automation.findMany({
// //         where,
// //         skip,
// //         take: limit,
// //         orderBy: {
// //           createdAt: "desc",
// //         },
// //         include: {
// //           User: {
// //             select: {
// //               id: true,
// //               email: true,
// //               firstname: true,
// //               lastname: true,
// //             },
// //           },
// //           keywords: true,
// //           listener: true,
// //           messages: {
// //             orderBy: {
// //               createdAt: "desc",
// //             },
// //             take: 1,
// //           },
// //         },
// //       }),
// //       client.automation.count({ where }),
// //     ])

// //     return {
// //       automations: automations.map((auto) => ({
// //         id: auto.id,
// //         name: auto.name,
// //         userId: auto.userId,
// //         userName: `${auto.User?.firstname || ""} ${auto.User?.lastname || ""}`.trim(),
// //         userEmail: auto.User?.email,
// //         type: auto.listener?.listener || "UNKNOWN",
// //         status: auto.active ? "active" : "inactive",
// //         createdAt: auto.createdAt.toISOString(),
// //         lastTriggered: auto.messages[0]?.createdAt.toISOString() || null,
// //         keywords: auto.keywords.map((k) => k.word),
// //       })),
// //       totalCount,
// //       totalPages: Math.ceil(totalCount / limit),
// //     }
// //   } catch (error) {
// //     console.error("Error fetching all automations:", error)
// //     throw new Error("Failed to fetch automations")
// //   }
// // }

// // // Make a user an admin (temporary utility function)
// // export async function makeUserAdmin(email: string) {
// //   try {
// //     const updated = await client.user.update({
// //       where: { email },
// //       data: { isAdmin: true },
// //     })

// //     return { success: true, user: updated }
// //   } catch (error) {
// //     console.error("Error making user admin:", error)
// //     throw new Error("Failed to make user admin")
// //   }
// // }

// // // Log admin actions for audit trail
// // export async function logAdminAction(action: string, target: string, details?: string) {
// //   try {
// //     const user = await onCurrentUser()

// //     if (!user) {
// //       throw new Error("Not authenticated")
// //     }

// //     const dbUser = await client.user.findUnique({
// //       where: {
// //         clerkId: user.id,
// //       },
// //       select: {
// //         id: true,
// //       },
// //     })

// //     if (!dbUser) {
// //       throw new Error("User not found")
// //     }

// //     // Log the action to the audit log
// //     await client.auditLog.create({
// //       data: {
// //         userId: dbUser.id,
// //         action,
// //         target,
// //         details,
// //         ipAddress: headers().get("x-forwarded-for") || "unknown",
// //         userAgent: headers().get("user-agent") || "unknown",
// //         timestamp: new Date(),
// //       },
// //     })

// //     return { success: true }
// //   } catch (error) {
// //     console.error("Error logging admin action:", error)
// //     // Don't throw here, just log the error - we don't want to break functionality
// //     // if audit logging fails
// //     return { success: false }
// //   }
// // }

// // // Update automation status
// // export async function updateAutomationStatus(automationId: string, active: boolean) {
// //   try {
// //     await client.automation.update({
// //       where: { id: automationId },
// //       data: { active },
// //     })

// //     // Log the admin action
// //     await logAdminAction(
// //       active ? "activate_automation" : "deactivate_automation",
// //       `automation:${automationId}`,
// //       `Set automation status to ${active ? "active" : "inactive"}`,
// //     )

// //     return { success: true }
// //   } catch (error) {
// //     console.error("Error updating automation status:", error)
// //     throw new Error("Failed to update automation status")
// //   }
// // }

// // // Verify admin access for the admin login page
// // export async function verifyAdminAccess(email: string, password: string, twoFactorCode?: string) {
// //   try {
// //     // First, check if the user exists and is an admin
// //     const user = await client.user.findUnique({
// //       where: { email },
// //       select: {
// //         id: true,
// //         isAdmin: true,
// //         clerkId: true,
// //       },
// //     })

// //     if (!user || !user.isAdmin) {
// //       // Log failed login attempt
// //       console.warn(`Failed admin login attempt for email: ${email}`)
// //       return { success: false, requiresTwoFactor: false }
// //     }

// //     // In a real implementation, you would verify the password against Clerk or your auth provider
// //     // This is a simplified version that assumes the password verification happens through Clerk

// //     // For two-factor authentication
// //     if (!twoFactorCode && process.env.ADMIN_REQUIRES_2FA === "true") {
// //       // In a real implementation, you would send a 2FA code to the user
// //       // For now, we'll just indicate that 2FA is required
// //       return { success: false, requiresTwoFactor: true }
// //     }

// //     if (twoFactorCode) {
// //       // Verify the 2FA code
// //       // In a real implementation, you would check the code against what was sent
// //       const isValidCode = twoFactorCode === "123456" // Replace with actual verification

// //       if (!isValidCode) {
// //         console.warn(`Invalid 2FA code for admin login: ${email}`)
// //         return { success: false, requiresTwoFactor: true }
// //       }
// //     }

// //     // Log successful login
// //     await client.auditLog.create({
// //       data: {
// //         userId: user.id,
// //         action: "admin_login",
// //         target: "admin_panel",
// //         ipAddress: headers().get("x-forwarded-for") || "unknown",
// //         userAgent: headers().get("user-agent") || "unknown",
// //         timestamp: new Date(),
// //       },
// //     })

// //     return { success: true, requiresTwoFactor: false }
// //   } catch (error) {
// //     console.error("Error verifying admin access:", error)
// //     return { success: false, requiresTwoFactor: false }
// //   }
// // }


// ////

// // Get current admin user details
// export async function getCurrentAdmin() {
//   try {
//     const user = await onCurrentUser()

//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     const dbUser = await client.user.findUnique({
//       where: {
//         clerkId: user.id,
//       },
//       select: {
//         id: true,
//         firstname: true,
//         lastname: true,
//         email: true,
//         isAdmin: true,
//       },
//     })

//     if (!dbUser?.isAdmin) {
//       throw new Error("Not authorized")
//     }

//     return {
//       id: dbUser.id,
//       name: `${dbUser.firstname || ""} ${dbUser.lastname || ""}`.trim() || "Admin",
//       email: dbUser.email,
//       isAdmin: dbUser.isAdmin,
//     }
//   } catch (error) {
//     console.error("Error getting current admin:", error)
//     throw new Error("Failed to get admin details")
//   }
// }

// // Check if the current user is an admin
// export async function checkIsAdmin() {
//   try {
//     const user = await onCurrentUser()

//     const dbUser = await client.user.findUnique({
//       where: {
//         clerkId: user.id,
//       },
//       select: {
//         isAdmin: true,
//       },
//     })

//     if (!dbUser?.isAdmin) {
//       return false
//     }

//     return true
//   } catch (error) {
//     console.error("Error checking admin status:", error)
//     return false
//   }
// }

// // Get dashboard stats
// export async function getDashboardStats() {
//   try {
//     // Get current stats
//     const [totalUsers, proSubscriptions, totalAutomations, activeAutomations, totalScheduledContent, messagesSent] =
//       await Promise.all([
//         client.user.count(),
//         client.subscription.count({
//           where: {
//             plan: "PRO",
//           },
//         }),
//         client.automation.count(),
//         client.automation.count({
//           where: {
//             active: true,
//           },
//         }),
//         client.scheduledContent.count(),
//         client.message.count(),
//       ])

//     // Get stats from 30 days ago for growth calculation
//     const thirtyDaysAgo = new Date()
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

//     const [previousTotalUsers, previousProSubscriptions, previousTotalAutomations] = await Promise.all([
//       client.user.count({
//         where: {
//           createdAt: {
//             lt: thirtyDaysAgo,
//           },
//         },
//       }),
//       client.subscription.count({
//         where: {
//           plan: "PRO",
//           createdAt: {
//             lt: thirtyDaysAgo,
//           },
//         },
//       }),
//       client.automation.count({
//         where: {
//           createdAt: {
//             lt: thirtyDaysAgo,
//           },
//         },
//       }),
//     ])

//     // Calculate growth percentages
//     const userGrowth =
//       previousTotalUsers > 0 ? Math.round(((totalUsers - previousTotalUsers) / previousTotalUsers) * 100) : 100

//     const subscriptionGrowth =
//       previousProSubscriptions > 0
//         ? Math.round(((proSubscriptions - previousProSubscriptions) / previousProSubscriptions) * 100)
//         : 100

//     const automationGrowth =
//       previousTotalAutomations > 0
//         ? Math.round(((totalAutomations - previousTotalAutomations) / previousTotalAutomations) * 100)
//         : 100

//     return {
//       totalUsers,
//       proSubscriptions,
//       totalAutomations,
//       activeAutomations,
//       totalScheduledContent,
//       messagesSent,
//       userGrowth,
//       subscriptionGrowth,
//       automationGrowth,
//     }
//   } catch (error) {
//     console.error("Error fetching dashboard stats:", error)
//     throw new Error("Failed to fetch dashboard stats")
//   }
// }

// // Get platform insights
// export async function getPlatformInsights(type: "growth" | "engagement" | "retention") {
//   try {
//     // This would typically come from your database with real data
//     // For now, we'll generate realistic sample data

//     if (type === "growth") {
//       // Generate growth data for the last 7 days
//       const growthData = []
//       const today = new Date()

//       for (let i = 6; i >= 0; i--) {
//         const date = new Date(today)
//         date.setDate(date.getDate() - i)

//         // Get actual user count for this date
//         const dayStart = new Date(date)
//         dayStart.setHours(0, 0, 0, 0)

//         const dayEnd = new Date(date)
//         dayEnd.setHours(23, 59, 59, 999)

//         const [userCount, subscriptionCount, automationCount] = await Promise.all([
//           client.user.count({
//             where: {
//               createdAt: {
//                 lte: dayEnd,
//               },
//             },
//           }),
//           client.subscription.count({
//             where: {
//               plan: "PRO",
//               createdAt: {
//                 lte: dayEnd,
//               },
//             },
//           }),
//           client.automation.count({
//             where: {
//               createdAt: {
//                 lte: dayEnd,
//               },
//             },
//           }),
//         ])

//         growthData.push({
//           date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//           users: userCount,
//           subscriptions: subscriptionCount,
//           automations: automationCount,
//         })
//       }

//       return { growthData }
//     }

//     if (type === "engagement") {
//       // Generate engagement data for the last 7 days
//       const engagementData = []
//       const today = new Date()

//       for (let i = 6; i >= 0; i--) {
//         const date = new Date(today)
//         date.setDate(date.getDate() - i)

//         // Get actual engagement metrics for this date
//         const dayStart = new Date(date)
//         dayStart.setHours(0, 0, 0, 0)

//         const dayEnd = new Date(date)
//         dayEnd.setHours(23, 59, 59, 999)

//         // In a real implementation, you would query your database for these metrics
//         // For now, we'll generate realistic sample data
//         const activeUsers = Math.floor(Math.random() * 100) + 50
//         const messagesSent = Math.floor(Math.random() * 500) + 100
//         const automationTriggers = Math.floor(Math.random() * 300) + 50

//         engagementData.push({
//           date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//           activeUsers,
//           messagesSent,
//           automationTriggers,
//         })
//       }

//       return { engagementData }
//     }

//     if (type === "retention") {
//       // Generate retention data
//       // In a real implementation, you would calculate these from your database

//       const userTypes = [
//         { name: "Active", value: 65 },
//         { name: "Inactive", value: 20 },
//         { name: "Churned", value: 15 },
//       ]

//       const churnReasons = [
//         { name: "Price", value: 40 },
//         { name: "Features", value: 25 },
//         { name: "Usability", value: 20 },
//         { name: "Support", value: 15 },
//       ]

//       return {
//         retentionData: {
//           userTypes,
//           churnReasons,
//         },
//       }
//     }

//     return {}
//   } catch (error) {
//     console.error(`Error fetching ${type} insights:`, error)
//     throw new Error(`Failed to fetch ${type} insights`)
//   }
// }

// // Get notifications
// export async function getNotifications() {
//   try {
//     // Fetch notifications from the database
//     const notifications = await client.notification.findMany({
//       where: {
//         // You can add filters here if needed
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       take: 10,
//     })

//     // Count unread notifications
//     const unreadCount = await client.notification.count({
//       where: {
//         read: false,
//       },
//     })

//     return {
//       notifications: notifications.map((notification) => ({
//         id: notification.id,
//         title: notification.title,
//         message: notification.message,
//         timestamp: notification.createdAt.toISOString(),
//         read: notification.read,
//         type: notification.type,
//       })),
//       unreadCount,
//     }
//   } catch (error) {
//     console.error("Error fetching notifications:", error)
//     // Return empty data if there's an error
//     return {
//       notifications: [],
//       unreadCount: 0,
//     }
//   }
// }

// // Mark notification as read
// export async function markNotificationAsRead(id: string) {
//   try {
//     await client.notification.update({
//       where: { id },
//       data: { read: true },
//     })

//     revalidatePath("/admin")
//     return { success: true }
//   } catch (error) {
//     console.error("Error marking notification as read:", error)
//     throw new Error("Failed to mark notification as read")
//   }
// }

// // Mark all notifications as read
// export async function markAllNotificationsAsRead() {
//   try {
//     await client.notification.updateMany({
//       where: { read: false },
//       data: { read: true },
//     })

//     revalidatePath("/admin")
//     return { success: true }
//   } catch (error) {
//     console.error("Error marking all notifications as read:", error)
//     throw new Error("Failed to mark all notifications as read")
//   }
// }

// // Get subscription growth data
// export async function getSubscriptionGrowthData(period: "weekly" | "monthly" | "yearly") {
//   try {
//     const data = []
//     const labels = []
//     const today = new Date()

//     if (period === "weekly") {
//       // Get data for the last 7 days
//       for (let i = 6; i >= 0; i--) {
//         const date = new Date(today)
//         date.setDate(date.getDate() - i)

//         const dayStart = new Date(date)
//         dayStart.setHours(0, 0, 0, 0)

//         const dayEnd = new Date(date)
//         dayEnd.setHours(23, 59, 59, 999)

//         // Get subscription counts for this day
//         const [totalCount, proCount, freeCount] = await Promise.all([
//           client.subscription.count({
//             where: {
//               createdAt: {
//                 lte: dayEnd,
//               },
//             },
//           }),
//           client.subscription.count({
//             where: {
//               plan: "PRO",
//               createdAt: {
//                 lte: dayEnd,
//               },
//             },
//           }),
//           client.subscription.count({
//             where: {
//               plan: "FREE",
//               createdAt: {
//                 lte: dayEnd,
//               },
//             },
//           }),
//         ])

//         data.push({
//           date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//           total: totalCount,
//           pro: proCount,
//           free: freeCount,
//         })

//         labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
//       }
//     } else if (period === "monthly") {
//       // Get data for the last 6 months
//       for (let i = 5; i >= 0; i--) {
//         const date = new Date(today)
//         date.setMonth(date.getMonth() - i)

//         const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
//         const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)

//         // Get subscription counts for this month
//         const [totalCount, proCount, freeCount] = await Promise.all([
//           client.subscription.count({
//             where: {
//               createdAt: {
//                 lte: monthEnd,
//               },
//             },
//           }),
//           client.subscription.count({
//             where: {
//               plan: "PRO",
//               createdAt: {
//                 lte: monthEnd,
//               },
//             },
//           }),
//           client.subscription.count({
//             where: {
//               plan: "FREE",
//               createdAt: {
//                 lte: monthEnd,
//               },
//             },
//           }),
//         ])

//         data.push({
//           date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
//           total: totalCount,
//           pro: proCount,
//           free: freeCount,
//         })

//         labels.push(date.toLocaleDateString("en-US", { month: "short", year: "numeric" }))
//       }
//     } else if (period === "yearly") {
//       // Get data for the last 5 years
//       for (let i = 4; i >= 0; i--) {
//         const date = new Date(today)
//         date.setFullYear(date.getFullYear() - i)

//         const yearStart = new Date(date.getFullYear(), 0, 1)
//         const yearEnd = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)

//         // Get subscription counts for this year
//         const [totalCount, proCount, freeCount] = await Promise.all([
//           client.subscription.count({
//             where: {
//               createdAt: {
//                 lte: yearEnd,
//               },
//             },
//           }),
//           client.subscription.count({
//             where: {
//               plan: "PRO",
//               createdAt: {
//                 lte: yearEnd,
//               },
//             },
//           }),
//           client.subscription.count({
//             where: {
//               plan: "FREE",
//               createdAt: {
//                 lte: yearEnd,
//               },
//             },
//           }),
//         ])

//         data.push({
//           date: date.getFullYear().toString(),
//           total: totalCount,
//           pro: proCount,
//           free: freeCount,
//         })

//         labels.push(date.getFullYear().toString())
//       }
//     }

//     return { labels, data }
//   } catch (error) {
//     console.error("Error fetching subscription growth data:", error)
//     return { labels: [], data: [] }
//   }
// }

// // Get automation type distribution
// // Get automation type distribution
// // Get automation type distribution
// export async function getAutomationTypeDistribution() {
//   try {
//     // Define the type for the result items
//     interface AutomationType {
//       name: string;
//       count: number;
//       percentage: number;
//     }

//     // Get all automation types and their counts
//     const automations = await client.automation.findMany({
//       include: {
//         listener: true,
//       },
//     })

//     // Group automations by type
//     const typeMap = new Map<string, number>()

//     automations.forEach((automation) => {
//       const type = automation.listener?.listener || "Unknown"
//       if (!typeMap.has(type)) {
//         typeMap.set(type, 0)
//       }
//       typeMap.set(type, typeMap.get(type)! + 1)
//     })

//     // Calculate percentages
//     const totalCount = automations.length
//     const result: AutomationType[] = []

//     // Using forEach instead of for...of with entries()
//     typeMap.forEach((count, type) => {
//       const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
//       result.push({
//         name: type,
//         count,
//         percentage,
//       })
//     })

//     // Sort by count in descending order
//     return result.sort((a, b) => b.count - a.count)
//   } catch (error) {
//     console.error("Error fetching automation type distribution:", error)
//     return []
//   }
// }
// // Get system health
// export async function getSystemHealth() {
//   try {
//     // Get real system metrics
//     const cpuUsage = (os.loadavg()[0] / os.cpus().length) * 100
//     const totalMem = os.totalmem()
//     const freeMem = os.freemem()
//     const memoryUsage = ((totalMem - freeMem) / totalMem) * 100

//     // For storage, we'd need a more sophisticated approach in a real app
//     // This is a simplified version
//     const storageUsage = 45 // This would be calculated based on actual disk usage

//     // Check database connection
//     let databaseStatus: "healthy" | "degraded" | "down" = "down"
//     try {
//       await client.$queryRaw`SELECT 1`
//       databaseStatus = "healthy"
//     } catch (dbError) {
//       console.error("Database health check failed:", dbError)
//       databaseStatus = "down"
//     }

//     // Get uptime in seconds
//     const uptime = os.uptime()

//     // Check for recent incidents
//     const recentIncident = await client.incident.findFirst({
//       where: {
//         resolvedAt: null,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     })

//     return {
//       cpu: Math.round(cpuUsage),
//       memory: Math.round(memoryUsage),
//       storage: storageUsage,
//       apiStatus: "healthy" as const, // This would be determined by actual API health checks
//       databaseStatus,
//       lastIncident: recentIncident ? recentIncident.description : null,
//       uptime,
//     }
//   } catch (error) {
//     console.error("Error fetching system health:", error)
//     throw new Error("Failed to fetch system health")
//   }
// }

// // Get user activity
// export async function getUserActivity(limit = 10) {
//   try {
//     // Fetch recent activity from the database
//     // This would typically come from an audit log or activity tracking table
//     const activities = await client.auditLog.findMany({
//       take: limit,
//       orderBy: {
//         timestamp: "desc",
//       },
//       include: {
//         user: {
//           select: {
//             id: true,
//             firstname: true,
//             lastname: true,
//             email: true,
//           },
//         },
//       },
//     })

//     return activities.map((activity) => ({
//       id: activity.id,
//       userId: activity.userId,
//       userName: `${activity.user.firstname || ""} ${activity.user.lastname || ""}`.trim(),
//       userEmail: activity.user.email,
//       action: activity.action,
//       target: activity.target,
//       timestamp: activity.timestamp.toISOString(),
//       details: activity.details || undefined,
//     }))
//   } catch (error) {
//     console.error("Error fetching user activity:", error)
//     // If the audit log table doesn't exist yet, return an empty array
//     return []
//   }
// }

// // Get upcoming content
// export async function getUpcomingContent(limit = 3) {
//   try {
//     const now = new Date()

//     const content = await client.scheduledContent.findMany({
//       where: {
//         scheduledDate: {
//           gte: now,
//         },
//       },
//       orderBy: {
//         scheduledDate: "asc",
//       },
//       take: limit,
//       include: {
//         User: {
//           select: {
//             firstname: true,
//             lastname: true,
//           },
//         },
//       },
//     })

//     return content.map((item) => ({
//       id: item.id,
//       caption: item.caption || "No caption",
//       mediaType: item.mediaType || "IMAGE",
//       thumbnailUrl: item.thumbnailUrl || "",
//       scheduledDate: item.scheduledDate.toISOString(),
//       status: item.status || "SCHEDULED",
//       userName: `${item.User?.firstname || ""} ${item.User?.lastname || ""}`.trim() || "Unknown User",
//     }))
//   } catch (error) {
//     console.error("Error fetching upcoming content:", error)
//     return []
//   }
// }

// // Send system notification
// export async function sendSystemNotification(title: string, message: string) {
//   try {
//     // Create a new notification in the database
//     await client.notification.create({
//       data: {
//         title,
//         message,
//         type: "system",
//         read: false,
//       },
//     })

//     revalidatePath("/admin")
//     return { success: true }
//   } catch (error) {
//     console.error("Error sending system notification:", error)
//     throw new Error("Failed to send system notification")
//   }
// }

// // Get recent users
// export async function getRecentUsers(limit = 5) {
//   try {
//     const users = await client.user.findMany({
//       take: limit,
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         subscription: true,
//         integrations: {
//           select: {
//             id: true,
//           },
//         },
//         automations: {
//           select: {
//             id: true,
//           },
//         },
//       },
//     })

//     return users.map((user) => ({
//       id: user.id,
//       name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
//       email: user.email,
//       plan: user.subscription?.plan || "FREE",
//       createdAt: user.createdAt.toISOString(),
//       integrations: user.integrations.length,
//       automations: user.automations.length,
//     }))
//   } catch (error) {
//     console.error("Error fetching recent users:", error)
//     throw new Error("Failed to fetch recent users")
//   }
// }

// // Get all users with pagination
// export async function getAllUsers(page = 1, limit = 10, search = "") {
//   try {
//     const skip = (page - 1) * limit

//     const where = search
//       ? {
//           OR: [
//             { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//             { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//             { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//           ],
//         }
//       : {}

//     const [users, totalCount] = await Promise.all([
//       client.user.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: {
//           createdAt: "desc",
//         },
//         include: {
//           subscription: true,
//           integrations: {
//             select: {
//               id: true,
//             },
//           },
//           automations: {
//             select: {
//               id: true,
//               active: true,
//             },
//           },
//         },
//       }),
//       client.user.count({ where }),
//     ])

//     return {
//       users: users.map((user) => ({
//         id: user.id,
//         name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
//         email: user.email,
//         plan: user.subscription?.plan || "FREE",
//         createdAt: user.createdAt.toISOString(),
//         integrations: user.integrations.length,
//         automations: user.automations.length,
//         activeAutomations: user.automations.filter((a) => a.active).length,
//         status: user.integrations.length > 0 ? "active" : "inactive",
//       })),
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//     }
//   } catch (error) {
//     console.error("Error fetching all users:", error)
//     throw new Error("Failed to fetch users")
//   }
// }

// // Update automation status
// export async function updateAutomationStatus(automationId: string, active: boolean) {
//   try {
//     await client.automation.update({
//       where: { id: automationId },
//       data: { active },
//     })

//     // Log the admin action
//     await logAdminAction(
//       active ? "activate_automation" : "deactivate_automation",
//       `automation:${automationId}`,
//       `Set automation status to ${active ? "active" : "inactive"}`,
//     )

//     return { success: true }
//   } catch (error) {
//     console.error("Error updating automation status:", error)
//     throw new Error("Failed to update automation status")
//   }
// }

// // Verify admin access for the admin login page
// export async function verifyAdminAccess(email: string, password: string, twoFactorCode?: string) {
//   try {
//     // First, check if the user exists and is an admin
//     const user = await client.user.findUnique({
//       where: { email },
//       select: {
//         id: true,
//         isAdmin: true,
//         clerkId: true,
//       },
//     })

//     if (!user || !user.isAdmin) {
//       // Log failed login attempt
//       console.warn(`Failed admin login attempt for email: ${email}`)
//       return { success: false, requiresTwoFactor: false }
//     }

//     // In a real implementation, you would verify the password against Clerk or your auth provider
//     // This is a simplified version that assumes the password verification happens through Clerk

//     // For two-factor authentication
//     if (!twoFactorCode && process.env.ADMIN_REQUIRES_2FA === "true") {
//       // In a real implementation, you would send a 2FA code to the user
//       // For now, we'll just indicate that 2FA is required
//       return { success: false, requiresTwoFactor: true }
//     }

//     if (twoFactorCode) {
//       // Verify the 2FA code
//       // In a real implementation, you would check the code against what was sent
//       const isValidCode = twoFactorCode === "123456" // Replace with actual verification

//       if (!isValidCode) {
//         console.warn(`Invalid 2FA code for admin login: ${email}`)
//         return { success: false, requiresTwoFactor: true }
//       }
//     }

//     // Log successful login
//     await client.auditLog.create({
//       data: {
//         userId: user.id,
//         action: "admin_login",
//         target: "admin_panel",
//         ipAddress: headers().get("x-forwarded-for") || "unknown",
//         userAgent: headers().get("user-agent") || "unknown",
//         timestamp: new Date(),
//       },
//     })

//     return { success: true, requiresTwoFactor: false }
//   } catch (error) {
//     console.error("Error verifying admin access:", error)
//     return { success: false, requiresTwoFactor: false }
//   }
// }

// // Log admin actions for audit trail
// export async function logAdminAction(action: string, target: string, details?: string) {
//   try {
//     const user = await onCurrentUser()

//     if (!user) {
//       throw new Error("Not authenticated")
//     }

//     const dbUser = await client.user.findUnique({
//       where: {
//         clerkId: user.id,
//       },
//       select: {
//         id: true,
//       },
//     })

//     if (!dbUser) {
//       throw new Error("User not found")
//     }

//     // Log the action to the audit log
//     await client.auditLog.create({
//       data: {
//         userId: dbUser.id,
//         action,
//         target,
//         details,
//         ipAddress: headers().get("x-forwarded-for") || "unknown",
//         userAgent: headers().get("user-agent") || "unknown",
//         timestamp: new Date(),
//       },
//     })

//     return { success: true }
//   } catch (error) {
//     console.error("Error logging admin action:", error)
//     // Don't throw here, just log the error - we don't want to break functionality
//     // if audit logging fails
//     return { success: false }
//   }
// }

// // Make a user an admin
// export async function makeUserAdmin(email: string) {
//   try {
//     const updated = await client.user.update({
//       where: { email },
//       data: { isAdmin: true },
//     })

//     return { success: true, user: updated }
//   } catch (error) {
//     console.error("Error making user admin:", error)
//     throw new Error("Failed to make user admin")
//   }
// }

// // Get all subscriptions with pagination
// export async function getAllSubscriptions(page = 1, limit = 10, search = "") {
//   try {
//     const skip = (page - 1) * limit

//     // Create a where clause for searching users related to subscriptions
//     const where = search
//       ? {
//           User: {
//             OR: [
//               { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//               { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//               { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//             ],
//           },
//         }
//       : {}

//     const [subscriptions, totalCount] = await Promise.all([
//       client.subscription.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: {
//           createdAt: "desc",
//         },
//         include: {
//           User: {
//             select: {
//               id: true,
//               email: true,
//               firstname: true,
//               lastname: true,
//             },
//           },
//         },
//       }),
//       client.subscription.count({ where }),
//     ])

//     return {
//       subscriptions: subscriptions.map((sub) => ({
//         id: sub.id,
//         userId: sub.userId,
//         userName: `${sub.User?.firstname || ""} ${sub.User?.lastname || ""}`.trim(),
//         userEmail: sub.User?.email,
//         plan: sub.plan,
//         status: sub.plan === "PRO" ? "active" : "free",
//         startDate: sub.createdAt.toISOString(),
//         updatedAt: sub.updatedAt.toISOString(),
//         customerId: sub.customerId,
//       })),
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//     }
//   } catch (error) {
//     console.error("Error fetching all subscriptions:", error)
//     throw new Error("Failed to fetch subscriptions")
//   }
// }

// // Update subscription plan
// export async function updateSubscriptionPlan(id: string, plan: "PRO" | "FREE") {
//   try {
//     await client.subscription.update({
//       where: { id },
//       data: { plan },
//     })

//     // Log the admin action
//     await logAdminAction(
//       plan === "PRO" ? "upgrade_subscription" : "downgrade_subscription",
//       `subscription:${id}`,
//       `Changed subscription plan to ${plan}`,
//     )

//     return { success: true }
//   } catch (error) {
//     console.error("Error updating subscription plan:", error)
//     throw new Error("Failed to update subscription plan")
//   }
// }

// // Get all automations with pagination
// export async function getAllAutomations(page = 1, limit = 10, search = "") {
//   try {
//     const skip = (page - 1) * limit

//     // Create a where clause for searching automations or related users
//     const where = search
//       ? {
//           OR: [
//             { name: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//             {
//               User: {
//                 OR: [
//                   { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//                   { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//                   { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//                 ],
//               },
//             },
//           ],
//         }
//       : {}

//     const [automations, totalCount] = await Promise.all([
//       client.automation.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: {
//           createdAt: "desc",
//         },
//         include: {
//           User: {
//             select: {
//               id: true,
//               email: true,
//               firstname: true,
//               lastname: true,
//             },
//           },
//           keywords: true,
//           listener: true,
//           messages: {
//             orderBy: {
//               createdAt: "desc",
//             },
//             take: 1,
//           },
//         },
//       }),
//       client.automation.count({ where }),
//     ])

//     return {
//       automations: automations.map((auto) => ({
//         id: auto.id,
//         name: auto.name,
//         userId: auto.userId,
//         userName: `${auto.User?.firstname || ""} ${auto.User?.lastname || ""}`.trim(),
//         userEmail: auto.User?.email,
//         type: auto.listener?.listener || "UNKNOWN",
//         status: auto.active ? "active" : "inactive",
//         createdAt: auto.createdAt.toISOString(),
//         lastTriggered: auto.messages[0]?.createdAt.toISOString() || null,
//         keywords: auto.keywords.map((k) => k.word),
//       })),
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//     }
//   } catch (error) {
//     console.error("Error fetching all automations:", error)
//     throw new Error("Failed to fetch automations")
//   }
// }

// // Get all scheduled content with pagination
// export async function getAllScheduledContent(page = 1, limit = 10, search = "") {
//   try {
//     const skip = (page - 1) * limit

//     // Create a where clause for searching scheduled content or related users
//     const where = search
//       ? {
//           OR: [
//             { caption: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//             {
//               User: {
//                 OR: [
//                   { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//                   { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//                   { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//                 ],
//               },
//             },
//           ],
//         }
//       : {}

//     const [scheduledContent, totalCount] = await Promise.all([
//       client.scheduledContent.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: {
//           scheduledDate: "asc",
//         },
//         include: {
//           User: {
//             select: {
//               id: true,
//               email: true,
//               firstname: true,
//               lastname: true,
//             },
//           },
//           automation: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//         },
//       }),
//       client.scheduledContent.count({ where }),
//     ])

//     return {
//       scheduledContent: scheduledContent.map((content) => ({
//         id: content.id,
//         caption: content.caption || "No caption",
//         mediaType: content.mediaType || "IMAGE",
//         thumbnailUrl: content.thumbnailUrl || "",
//         scheduledDate: content.scheduledDate.toISOString(),
//         status: content.status || "SCHEDULED",
//         userId: content.userId,
//         userName: `${content.User?.firstname || ""} ${content.User?.lastname || ""}`.trim(),
//         userEmail: content.User?.email,
//         automationId: content.automationId,
//         automationName: content.automation?.name || "Manual",
//       })),
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//     }
//   } catch (error) {
//     console.error("Error fetching all scheduled content:", error)
//     throw new Error("Failed to fetch scheduled content")
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"
import type { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import os from "os"

// Get current admin user details
export async function getCurrentAdmin() {
  try {
    const user = await onCurrentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        isAdmin: true,
      },
    })

    if (!dbUser?.isAdmin) {
      throw new Error("Not authorized")
    }

    return {
      id: dbUser.id,
      name: `${dbUser.firstname || ""} ${dbUser.lastname || ""}`.trim() || "Admin",
      email: dbUser.email,
      isAdmin: dbUser.isAdmin,
    }
  } catch (error) {
    console.error("Error getting current admin:", error)
    throw new Error("Failed to get admin details")
  }
}

// Check if the current user is an admin
export async function checkIsAdmin() {
  try {
    const user = await onCurrentUser()

    const dbUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        isAdmin: true,
      },
    })

    if (!dbUser?.isAdmin) {
      return false
    }

    return true
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Get dashboard stats
export async function getDashboardStats() {
  try {
    // Get current stats
    const [totalUsers, proSubscriptions, totalAutomations, activeAutomations, totalScheduledContent, messagesSent] =
      await Promise.all([
        client.user.count(),
        client.subscription.count({
          where: {
            plan: "PRO",
          },
        }),
        client.automation.count(),
        client.automation.count({
          where: {
            active: true,
          },
        }),
        client.scheduledContent.count(),
        client.message.count(),
      ])

    // Get stats from 30 days ago for growth calculation
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [previousTotalUsers, previousProSubscriptions, previousTotalAutomations] = await Promise.all([
      client.user.count({
        where: {
          createdAt: {
            lt: thirtyDaysAgo,
          },
        },
      }),
      client.subscription.count({
        where: {
          plan: "PRO",
          createdAt: {
            lt: thirtyDaysAgo,
          },
        },
      }),
      client.automation.count({
        where: {
          createdAt: {
            lt: thirtyDaysAgo,
          },
        },
      }),
    ])

    // Calculate growth percentages
    const userGrowth =
      previousTotalUsers > 0 ? Math.round(((totalUsers - previousTotalUsers) / previousTotalUsers) * 100) : 100

    const subscriptionGrowth =
      previousProSubscriptions > 0
        ? Math.round(((proSubscriptions - previousProSubscriptions) / previousProSubscriptions) * 100)
        : 100

    const automationGrowth =
      previousTotalAutomations > 0
        ? Math.round(((totalAutomations - previousTotalAutomations) / previousTotalAutomations) * 100)
        : 100

    return {
      totalUsers,
      proSubscriptions,
      totalAutomations,
      activeAutomations,
      totalScheduledContent,
      messagesSent,
      userGrowth,
      subscriptionGrowth,
      automationGrowth,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw new Error("Failed to fetch dashboard stats")
  }
}

// Get platform insights
export async function getPlatformInsights(type: "growth" | "engagement" | "retention") {
  try {
    // This would typically come from your database with real data
    // For now, we'll generate realistic sample data

    if (type === "growth") {
      // Generate growth data for the last 7 days
      const growthData = []
      const today = new Date()

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Get actual user count for this date
        const dayStart = new Date(date)
        dayStart.setHours(0, 0, 0, 0)

        const dayEnd = new Date(date)
        dayEnd.setHours(23, 59, 59, 999)

        const [userCount, subscriptionCount, automationCount] = await Promise.all([
          client.user.count({
            where: {
              createdAt: {
                lte: dayEnd,
              },
            },
          }),
          client.subscription.count({
            where: {
              plan: "PRO",
              createdAt: {
                lte: dayEnd,
              },
            },
          }),
          client.automation.count({
            where: {
              createdAt: {
                lte: dayEnd,
              },
            },
          }),
        ])

        growthData.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          users: userCount,
          subscriptions: subscriptionCount,
          automations: automationCount,
        })
      }

      return { growthData }
    }

    if (type === "engagement") {
      // Generate engagement data for the last 7 days
      const engagementData = []
      const today = new Date()

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Get actual engagement metrics for this date
        const dayStart = new Date(date)
        dayStart.setHours(0, 0, 0, 0)

        const dayEnd = new Date(date)
        dayEnd.setHours(23, 59, 59, 999)

        // In a real implementation, you would query your database for these metrics
        // For now, we'll generate realistic sample data
        const activeUsers = Math.floor(Math.random() * 100) + 50
        const messagesSent = Math.floor(Math.random() * 500) + 100
        const automationTriggers = Math.floor(Math.random() * 300) + 50

        engagementData.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          activeUsers,
          messagesSent,
          automationTriggers,
        })
      }

      return { engagementData }
    }

    if (type === "retention") {
      // Generate retention data
      // In a real implementation, you would calculate these from your database

      const userTypes = [
        { name: "Active", value: 65 },
        { name: "Inactive", value: 20 },
        { name: "Churned", value: 15 },
      ]

      const churnReasons = [
        { name: "Price", value: 40 },
        { name: "Features", value: 25 },
        { name: "Usability", value: 20 },
        { name: "Support", value: 15 },
      ]

      return {
        retentionData: {
          userTypes,
          churnReasons,
        },
      }
    }

    return {}
  } catch (error) {
    console.error(`Error fetching ${type} insights:`, error)
    throw new Error(`Failed to fetch ${type} insights`)
  }
}

// Get notifications
export async function getNotifications() {
  try {
    // Fetch notifications from the database
    const notifications = await client.notification.findMany({
      where: {
        // You can add filters here if needed
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    })

    // Count unread notifications
    const unreadCount = await client.notification.count({
      where: {
        read: false,
      },
    })

    return {
      notifications: notifications.map((notification) => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        timestamp: notification.createdAt.toISOString(),
        read: notification.read,
        type: notification.type,
      })),
      unreadCount,
    }
  } catch (error) {
    console.error("Error fetching notifications:", error)
    // Return empty data if there's an error
    return {
      notifications: [],
      unreadCount: 0,
    }
  }
}

// Mark notification as read
export async function markNotificationAsRead(id: string) {
  try {
    await client.notification.update({
      where: { id },
      data: { read: true },
    })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error marking notification as read:", error)
    throw new Error("Failed to mark notification as read")
  }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead() {
  try {
    await client.notification.updateMany({
      where: { read: false },
      data: { read: true },
    })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    throw new Error("Failed to mark all notifications as read")
  }
}

// Get subscription growth data
export async function getSubscriptionGrowthData(period: "weekly" | "monthly" | "yearly") {
  try {
    const data = []
    const labels = []
    const today = new Date()

    if (period === "weekly") {
      // Get data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        const dayStart = new Date(date)
        dayStart.setHours(0, 0, 0, 0)

        const dayEnd = new Date(date)
        dayEnd.setHours(23, 59, 59, 999)

        // Get subscription counts for this day
        const [totalCount, proCount, freeCount] = await Promise.all([
          client.subscription.count({
            where: {
              createdAt: {
                lte: dayEnd,
              },
            },
          }),
          client.subscription.count({
            where: {
              plan: "PRO",
              createdAt: {
                lte: dayEnd,
              },
            },
          }),
          client.subscription.count({
            where: {
              plan: "FREE",
              createdAt: {
                lte: dayEnd,
              },
            },
          }),
        ])

        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          total: totalCount,
          pro: proCount,
          free: freeCount,
        })

        labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
      }
    } else if (period === "monthly") {
      // Get data for the last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(today)
        date.setMonth(date.getMonth() - i)

        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)

        // Get subscription counts for this month
        const [totalCount, proCount, freeCount] = await Promise.all([
          client.subscription.count({
            where: {
              createdAt: {
                lte: monthEnd,
              },
            },
          }),
          client.subscription.count({
            where: {
              plan: "PRO",
              createdAt: {
                lte: monthEnd,
              },
            },
          }),
          client.subscription.count({
            where: {
              plan: "FREE",
              createdAt: {
                lte: monthEnd,
              },
            },
          }),
        ])

        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          total: totalCount,
          pro: proCount,
          free: freeCount,
        })

        labels.push(date.toLocaleDateString("en-US", { month: "short", year: "numeric" }))
      }
    } else if (period === "yearly") {
      // Get data for the last 5 years
      for (let i = 4; i >= 0; i--) {
        const date = new Date(today)
        date.setFullYear(date.getFullYear() - i)

        const yearStart = new Date(date.getFullYear(), 0, 1)
        const yearEnd = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)

        // Get subscription counts for this year
        const [totalCount, proCount, freeCount] = await Promise.all([
          client.subscription.count({
            where: {
              createdAt: {
                lte: yearEnd,
              },
            },
          }),
          client.subscription.count({
            where: {
              plan: "PRO",
              createdAt: {
                lte: yearEnd,
              },
            },
          }),
          client.subscription.count({
            where: {
              plan: "FREE",
              createdAt: {
                lte: yearEnd,
              },
            },
          }),
        ])

        data.push({
          date: date.getFullYear().toString(),
          total: totalCount,
          pro: proCount,
          free: freeCount,
        })

        labels.push(date.getFullYear().toString())
      }
    }

    return { labels, data }
  } catch (error) {
    console.error("Error fetching subscription growth data:", error)
    return { labels: [], data: [] }
  }
}

// Get automation type distribution
// Get automation type distribution
export async function getAutomationTypeDistribution() {
  try {
    // Define the type for the result items
    interface AutomationType {
      name: string;
      count: number;
      percentage: number;
    }

    // Get all automation types and their counts
    const automations = await client.automation.findMany({
      include: {
        listener: true,
      },
    })

    // Group automations by type
    const typeMap = new Map<string, number>()

    automations.forEach((automation) => {
      const type = automation.listener?.listener || "Unknown"
      if (!typeMap.has(type)) {
        typeMap.set(type, 0)
      }
      typeMap.set(type, typeMap.get(type)! + 1)
    })

    // Calculate percentages
    const totalCount = automations.length
    const result: AutomationType[] = []

    // Using forEach instead of for...of with entries()
    typeMap.forEach((count, type) => {
      const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
      result.push({
        name: type,
        count,
        percentage,
      })
    })

    // Sort by count in descending order
    return result.sort((a, b) => b.count - a.count)
  } catch (error) {
    console.error("Error fetching automation type distribution:", error)
    return []
  }
}
// Get system health
export async function getSystemHealth() {
  try {
    // Get real system metrics
    const cpuUsage = (os.loadavg()[0] / os.cpus().length) * 100
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const memoryUsage = ((totalMem - freeMem) / totalMem) * 100

    // For storage, we'd need a more sophisticated approach in a real app
    // This is a simplified version
    const storageUsage = 45 // This would be calculated based on actual disk usage

    // Check database connection
    let databaseStatus: "healthy" | "degraded" | "down" = "down"
    try {
      await client.$queryRaw`SELECT 1`
      databaseStatus = "healthy"
    } catch (dbError) {
      console.error("Database health check failed:", dbError)
      databaseStatus = "down"
    }

    // Get uptime in seconds
    const uptime = os.uptime()

    // Check for recent incidents
    const recentIncident = await client.incident.findFirst({
      where: {
        resolvedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return {
      cpu: Math.round(cpuUsage),
      memory: Math.round(memoryUsage),
      storage: storageUsage,
      apiStatus: "healthy" as const, // This would be determined by actual API health checks
      databaseStatus,
      lastIncident: recentIncident ? recentIncident.description : null,
      uptime,
    }
  } catch (error) {
    console.error("Error fetching system health:", error)
    throw new Error("Failed to fetch system health")
  }
}

// Get user activity
export async function getUserActivity(limit = 10) {
  try {
    // Fetch recent activity from the database
    // This would typically come from an audit log or activity tracking table
    const activities = await client.auditLog.findMany({
      take: limit,
      orderBy: {
        timestamp: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    })

    return activities.map((activity) => ({
      id: activity.id,
      userId: activity.userId,
      userName: `${activity.user.firstname || ""} ${activity.user.lastname || ""}`.trim(),
      userEmail: activity.user.email,
      action: activity.action,
      target: activity.target,
      timestamp: activity.timestamp.toISOString(),
      details: activity.details || undefined,
    }))
  } catch (error) {
    console.error("Error fetching user activity:", error)
    // If the audit log table doesn't exist yet, return an empty array
    return []
  }
}

// Get upcoming content
export async function getUpcomingContent(limit = 3) {
  try {
    const now = new Date()

    const content = await client.scheduledContent.findMany({
      where: {
        scheduledDate: {
          gte: now,
        },
      },
      orderBy: {
        scheduledDate: "asc",
      },
      take: limit,
      include: {
        User: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    })

    return content.map((item) => ({
      id: item.id,
      caption: item.caption || "No caption",
      mediaType: item.mediaType || "IMAGE",
      thumbnailUrl: item.thumbnailUrl || "",
      scheduledDate: item.scheduledDate.toISOString(),
      status: item.status || "SCHEDULED",
      userName: `${item.User?.firstname || ""} ${item.User?.lastname || ""}`.trim() || "Unknown User",
    }))
  } catch (error) {
    console.error("Error fetching upcoming content:", error)
    return []
  }
}

// Send system notification
export async function sendSystemNotification(title: string, message: string) {
  try {
    // Create a new notification in the database
    await client.notification.create({
      data: {
        title,
        message,
        type: "system",
        read: false,
      },
    })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error sending system notification:", error)
    throw new Error("Failed to send system notification")
  }
}

// Get recent users
export async function getRecentUsers(limit = 5) {
  try {
    const users = await client.user.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subscription: true,
        integrations: {
          select: {
            id: true,
          },
        },
        automations: {
          select: {
            id: true,
          },
        },
      },
    })

    return users.map((user) => ({
      id: user.id,
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      email: user.email,
      plan: user.subscription?.plan || "FREE",
      createdAt: user.createdAt.toISOString(),
      integrations: user.integrations.length,
      automations: user.automations.length,
    }))
  } catch (error) {
    console.error("Error fetching recent users:", error)
    throw new Error("Failed to fetch recent users")
  }
}

// Get all users with pagination
export async function getAllUsers(page = 1, limit = 10, search = "") {
  try {
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
          ],
        }
      : {}

    const [users, totalCount] = await Promise.all([
      client.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          subscription: true,
          integrations: {
            select: {
              id: true,
            },
          },
          automations: {
            select: {
              id: true,
              active: true,
            },
          },
        },
      }),
      client.user.count({ where }),
    ])

    return {
      users: users.map((user) => ({
        id: user.id,
        name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
        email: user.email,
        plan: user.subscription?.plan || "FREE",
        createdAt: user.createdAt.toISOString(),
        integrations: user.integrations.length,
        automations: user.automations.length,
        activeAutomations: user.automations.filter((a) => a.active).length,
        status: user.integrations.length > 0 ? "active" : "inactive",
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    }
  } catch (error) {
    console.error("Error fetching all users:", error)
    throw new Error("Failed to fetch users")
  }
}

// Update automation status
export async function updateAutomationStatus(automationId: string, active: boolean) {
  try {
    await client.automation.update({
      where: { id: automationId },
      data: { active },
    })

    // Log the admin action
    await logAdminAction(
      active ? "activate_automation" : "deactivate_automation",
      `automation:${automationId}`,
      `Set automation status to ${active ? "active" : "inactive"}`,
    )

    return { success: true }
  } catch (error) {
    console.error("Error updating automation status:", error)
    throw new Error("Failed to update automation status")
  }
}

// Verify admin access for the admin login page
export async function verifyAdminAccess(email: string, password: string, twoFactorCode?: string) {
  try {
    // First, check if the user exists and is an admin
    const user = await client.user.findUnique({
      where: { email },
      select: {
        id: true,
        isAdmin: true,
        clerkId: true,
      },
    })

    if (!user || !user.isAdmin) {
      // Log failed login attempt
      console.warn(`Failed admin login attempt for email: ${email}`)
      return { success: false, requiresTwoFactor: false }
    }

    // In a real implementation, you would verify the password against Clerk or your auth provider
    // This is a simplified version that assumes the password verification happens through Clerk

    // For two-factor authentication
    if (!twoFactorCode && process.env.ADMIN_REQUIRES_2FA === "true") {
      // In a real implementation, you would send a 2FA code to the user
      // For now, we'll just indicate that 2FA is required
      return { success: false, requiresTwoFactor: true }
    }

    if (twoFactorCode) {
      // Verify the 2FA code
      // In a real implementation, you would check the code against what was sent
      const isValidCode = twoFactorCode === "123456" // Replace with actual verification

      if (!isValidCode) {
        console.warn(`Invalid 2FA code for admin login: ${email}`)
        return { success: false, requiresTwoFactor: true }
      }
    }

    // Log successful login
    await client.auditLog.create({
      data: {
        userId: user.id,
        action: "admin_login",
        target: "admin_panel",
        ipAddress: headers().get("x-forwarded-for") || "unknown",
        userAgent: headers().get("user-agent") || "unknown",
        timestamp: new Date(),
      },
    })

    return { success: true, requiresTwoFactor: false }
  } catch (error) {
    console.error("Error verifying admin access:", error)
    return { success: false, requiresTwoFactor: false }
  }
}

// Log admin actions for audit trail
export async function logAdminAction(action: string, target: string, details?: string) {
  try {
    const user = await onCurrentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Log the action to the audit log
    await client.auditLog.create({
      data: {
        userId: dbUser.id,
        action,
        target,
        details,
        ipAddress: headers().get("x-forwarded-for") || "unknown",
        userAgent: headers().get("user-agent") || "unknown",
        timestamp: new Date(),
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error logging admin action:", error)
    // Don't throw here, just log the error - we don't want to break functionality
    // if audit logging fails
    return { success: false }
  }
}

// Make a user an admin
export async function makeUserAdmin(email: string) {
  try {
    const updated = await client.user.update({
      where: { email },
      data: { isAdmin: true },
    })

    return { success: true, user: updated }
  } catch (error) {
    console.error("Error making user admin:", error)
    throw new Error("Failed to make user admin")
  }
}

// Get all subscriptions with pagination
export async function getAllSubscriptions(page = 1, limit = 10, search = "") {
  try {
    const skip = (page - 1) * limit

    // Create a where clause for searching users related to subscriptions
    const where = search
      ? {
          User: {
            OR: [
              { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
              { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
              { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            ],
          },
        }
      : {}

    const [subscriptions, totalCount] = await Promise.all([
      client.subscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          User: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      }),
      client.subscription.count({ where }),
    ])

    return {
      subscriptions: subscriptions.map((sub) => ({
        id: sub.id,
        userId: sub.userId,
        userName: `${sub.User?.firstname || ""} ${sub.User?.lastname || ""}`.trim(),
        userEmail: sub.User?.email,
        plan: sub.plan,
        status: sub.plan === "PRO" ? "active" : "free",
        startDate: sub.createdAt.toISOString(),
        updatedAt: sub.updatedAt.toISOString(),
        customerId: sub.customerId,
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    }
  } catch (error) {
    console.error("Error fetching all subscriptions:", error)
    throw new Error("Failed to fetch subscriptions")
  }
}

// Update subscription plan
export async function updateSubscriptionPlan(id: string, plan: "PRO" | "FREE") {
  try {
    await client.subscription.update({
      where: { id },
      data: { plan },
    })

    // Log the admin action
    await logAdminAction(
      plan === "PRO" ? "upgrade_subscription" : "downgrade_subscription",
      `subscription:${id}`,
      `Changed subscription plan to ${plan}`,
    )

    return { success: true }
  } catch (error) {
    console.error("Error updating subscription plan:", error)
    throw new Error("Failed to update subscription plan")
  }
}

// Get all automations with pagination
export async function getAllAutomations(page = 1, limit = 10, search = "") {
  try {
    const skip = (page - 1) * limit

    // Create a where clause for searching automations or related users
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            {
              User: {
                OR: [
                  { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
                  { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
                  { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
                ],
              },
            },
          ],
        }
      : {}

    const [automations, totalCount] = await Promise.all([
      client.automation.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          User: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
          keywords: true,
          listener: true,
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      }),
      client.automation.count({ where }),
    ])

    return {
      automations: automations.map((auto) => ({
        id: auto.id,
        name: auto.name,
        userId: auto.userId,
        userName: `${auto.User?.firstname || ""} ${auto.User?.lastname || ""}`.trim(),
        userEmail: auto.User?.email,
        type: auto.listener?.listener || "UNKNOWN",
        status: auto.active ? "active" : "inactive",
        createdAt: auto.createdAt.toISOString(),
        lastTriggered: auto.messages[0]?.createdAt.toISOString() || null,
        keywords: auto.keywords.map((k) => k.word),
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    }
  } catch (error) {
    console.error("Error fetching all automations:", error)
    throw new Error("Failed to fetch automations")
  }
}

// Get all scheduled content with pagination
export async function getAllScheduledContent(page = 1, limit = 10, search = "") {
  try {
    const skip = (page - 1) * limit

    // Create a where clause for searching scheduled content or related users
    const where = search
      ? {
          OR: [
            { caption: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            {
              User: {
                OR: [
                  { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
                  { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
                  { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
                ],
              },
            },
          ],
        }
      : {}

    const [scheduleddContent, totalCount] = await Promise.all([
      client.scheduledContent.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          scheduledDate: "asc",
        },
        include: {
          User: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
          automation: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      client.scheduledContent.count({ where }),
    ])

    return {
      scheduledContent: scheduleddContent.map((content) => ({
        id: content.id,
        caption: content.caption || "No caption",
        mediaType: content.mediaType || "IMAGE",
        thumbnailUrl: content.thumbnailUrl || "",
        scheduledDate: content.scheduledDate.toISOString(),
        status: content.status || "SCHEDULED",
        userId: content.userId,
        userName: `${content.User?.firstname || ""} ${content.User?.lastname || ""}`.trim(),
        userEmail: content.User?.email,
        automationId: content.automationId,
        automationName: content.automation?.name || "Manual",
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    }
  } catch (error) {
    console.error("Error fetching all scheduled content:", error)
    throw new Error("Failed to fetch scheduled content")
  }
}

// Get all users with chat information
export async function getChatUsers(search = "") {
  try {
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            { firstname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
            { lastname: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
          ],
        }
      : {}

    const users = await client.user.findMany({
      where: {
        ...where,
        isAdmin: false, // Only non-admin users
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        sentMessages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        receivedMessages: {
          where: {
            isRead: false,
            isFromAdmin: true,
          },
        },
      },
    })

    // Format users for the chat interface
    return users.map((user) => {
      const lastMessage = user.sentMessages[0]

      return {
        id: user.id,
        name: `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Unnamed User",
        email: user.email,
        unreadCount: user.receivedMessages.length,
        lastMessage: lastMessage ? lastMessage.content : undefined,
        lastMessageTime: lastMessage
          ? new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : undefined,
        isActive: Math.random() > 0.5, // Simulate active status for demo
      }
    })
  } catch (error) {
    console.error("Error fetching chat users:", error)
    throw new Error("Failed to fetch chat users")
  }
}

// Get messages between admin and user
export async function getUserMessages(userId: string) {
  try {
    const adminUser = await getCurrentAdmin()

    const messages = await client.chatMessage.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: adminUser.id,
          },
          {
            senderId: adminUser.id,
            receiverId: userId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Mark unread messages as read
    const unreadMessageIds = messages.filter((msg) => !msg.isRead && msg.senderId === userId).map((msg) => msg.id)

    if (unreadMessageIds.length > 0) {
      await client.chatMessage.updateMany({
        where: {
          id: {
            in: unreadMessageIds,
          },
        },
        data: {
          isRead: true,
        },
      })
    }

    return messages.map((message) => ({
      ...message,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    }))
  } catch (error) {
    console.error("Error fetching user messages:", error)
    throw new Error("Failed to fetch user messages")
  }
}

