"use server"

import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"
import type { Prisma } from "@prisma/client"

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
    const [totalUsers, proSubscriptions, totalAutomations, activeAutomations, totalScheduledContent] =
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
      ])

    return {
      totalUsers,
      proSubscriptions,
      totalAutomations,
      activeAutomations,
      totalScheduledContent,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw new Error("Failed to fetch dashboard stats")
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

    // Create a where clause for searching content or related users
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

    const [scheduledContent, totalCount] = await Promise.all([
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
      scheduledContent: scheduledContent.map((content) => ({
        id: content.id,
        caption: content.caption,
        mediaType: content.mediaType,
        thumbnailUrl: content.thumbnailUrl || content.mediaUrl,
        scheduledDate: content.scheduledDate.toISOString(),
        status: content.status,
        userId: content.userId,
        userName: `${content.User?.firstname || ""} ${content.User?.lastname || ""}`.trim(),
        userEmail: content.User?.email,
        automationId: content.automationId,
        automationName: content.automation?.name || "No Automation",
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    }
  } catch (error) {
    console.error("Error fetching scheduled content:", error)
    throw new Error("Failed to fetch scheduled content")
  }
}

// Update user admin status
export async function updateUserAdminStatus(userId: string, isAdmin: boolean) {
  try {
    await client.user.update({
      where: { id: userId },
      data: { isAdmin },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating user admin status:", error)
    throw new Error("Failed to update user admin status")
  }
}

// Update subscription plan
export async function updateSubscriptionPlan(subscriptionId: string, plan: "PRO" | "FREE") {
  try {
    await client.subscription.update({
      where: { id: subscriptionId },
      data: { plan },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating subscription plan:", error)
    throw new Error("Failed to update subscription plan")
  }
}

// Update automation status
export async function updateAutomationStatus(automationId: string, active: boolean) {
  try {
    await client.automation.update({
      where: { id: automationId },
      data: { active },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating automation status:", error)
    throw new Error("Failed to update automation status")
  }
}

// Get subscription growth data
export async function getSubscriptionGrowthData(period: "weekly" | "monthly" | "yearly") {
  try {
    const now = new Date()
    let startDate: Date
    let groupByFormat: string
    let labels: string[] = []

    // Set the appropriate time range and format based on the period
    if (period === "weekly") {
      startDate = new Date(now)
      startDate.setDate(now.getDate() - 7)
      groupByFormat = "%Y-%m-%d" // Daily format

      // Generate labels for the last 7 days
      labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now)
        date.setDate(now.getDate() - 6 + i)
        return date.toLocaleDateString("en-US", { weekday: "short" })
      })
    } else if (period === "monthly") {
      startDate = new Date(now)
      startDate.setMonth(now.getMonth() - 12)
      groupByFormat = "%Y-%m" // Monthly format

      // Generate labels for the last 12 months
      labels = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(now)
        date.setMonth(now.getMonth() - 11 + i)
        return date.toLocaleDateString("en-US", { month: "short" })
      })
    } else {
      // yearly
      startDate = new Date(now)
      startDate.setFullYear(now.getFullYear() - 5)
      groupByFormat = "%Y" // Yearly format

      // Generate labels for the last 5 years
      labels = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(now)
        date.setFullYear(now.getFullYear() - 4 + i)
        return date.getFullYear().toString()
      })
    }

    // For a real implementation, you would use a database query that supports grouping by date
    // Since we're using Prisma, we'll fetch all subscriptions in the date range and group them in JavaScript
    const subscriptions = await client.subscription.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
        plan: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Group subscriptions by the appropriate time period
    const groupedData: Record<string, { total: number; pro: number }> = {}

    // Initialize the groups with zeros
    labels.forEach((label) => {
      groupedData[label] = { total: 0, pro: 0 }
    })

    // Count subscriptions for each group
    subscriptions.forEach((sub) => {
      let key: string

      if (period === "weekly") {
        key = sub.createdAt.toLocaleDateString("en-US", { weekday: "short" })
      } else if (period === "monthly") {
        key = sub.createdAt.toLocaleDateString("en-US", { month: "short" })
      } else {
        // yearly
        key = sub.createdAt.getFullYear().toString()
      }

      if (groupedData[key]) {
        groupedData[key].total += 1
        if (sub.plan === "PRO") {
          groupedData[key].pro += 1
        }
      }
    })

    // Convert to arrays for the chart
    const data = labels.map((label) => ({
      label,
      total: groupedData[label].total,
      pro: groupedData[label].pro,
    }))

    return { labels, data }
  } catch (error) {
    console.error("Error fetching subscription growth data:", error)
    throw new Error("Failed to fetch subscription growth data")
  }
}

// Get automation type distribution
export async function getAutomationTypeDistribution() {
  try {
    const automations = await client.automation.findMany({
      include: {
        listener: true,
      },
    })

    // Count automations by type
    const typeCounts: Record<string, number> = {
      MESSAGE: 0,
      SMARTAI: 0,
      OTHER: 0,
    }

    automations.forEach((auto) => {
      if (auto.listener?.listener === "MESSAGE") {
        typeCounts.MESSAGE += 1
      } else if (auto.listener?.listener === "SMARTAI") {
        typeCounts.SMARTAI += 1
      } else {
        typeCounts.OTHER += 1
      }
    })

    // Calculate percentages
    const total = automations.length
    const types = [
      {
        name: "Message Responders",
        count: typeCounts.MESSAGE,
        percentage: Math.round((typeCounts.MESSAGE / total) * 100) || 0,
      },
      { name: "Smart AI", count: typeCounts.SMARTAI, percentage: Math.round((typeCounts.SMARTAI / total) * 100) || 0 },
      { name: "Other", count: typeCounts.OTHER, percentage: Math.round((typeCounts.OTHER / total) * 100) || 0 },
    ]

    return types
  } catch (error) {
    console.error("Error fetching automation type distribution:", error)
    throw new Error("Failed to fetch automation type distribution")
  }
}

// Make a user an admin (temporary utility function)
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

