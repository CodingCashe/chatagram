"use server"

import { client } from "@/lib/prisma"
import { onUserInfor } from "@/actions/user"
import { revalidatePath } from "next/cache"

// Get all notifications for the current user
export async function getUserNotifications() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Get notifications from the database
    const notifications = await client.userNotification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20, // Limit to most recent 20
    })

    // Format notifications for the frontend
    const formattedNotifications = notifications.map((notification) => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: notification.read,
      createdAt: notification.createdAt.toISOString(),
    }))

    return { status: 200, data: formattedNotifications }
  } catch (error) {
    console.error("Error in getUserNotifications:", error)
    return { status: 500, message: "Failed to retrieve notifications" }
  }
}

// Mark all notifications as read
export async function markNotificationsAsRead() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Update all unread notifications
    await client.userNotification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
        updatedAt: new Date(),
      },
    })

    revalidatePath("/")
    return { status: 200, message: "Notifications marked as read" }
  } catch (error) {
    console.error("Error in markNotificationsAsRead:", error)
    return { status: 500, message: "Failed to mark notifications as read" }
  }
}

// Get unread notification count
export async function getUnreadNotificationCount() {
  try {
    const user = await onUserInfor()
    const userId = user.data?.id

    if (!userId) {
      return { status: 401, message: "Unauthorized" }
    }

    // Count unread notifications
    const unreadCount = await client.userNotification.count({
      where: {
        userId,
        read: false,
      },
    })

    return { status: 200, data: { unreadCount } }
  } catch (error) {
    console.error("Error in getUnreadNotificationCount:", error)
    return { status: 500, message: "Failed to get unread notification count" }
  }
}
