import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Notification = {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  timestamp: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  lastNotificationSound: number
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  setNotifications: (notifications: Notification[]) => void
  shouldPlaySound: () => boolean
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      lastNotificationSound: 0,

      addNotification: (notification) =>
        set((state) => {
          // Avoid duplicates
          if (state.notifications.some((n) => n.id === notification.id)) {
            return state
          }

          const newNotifications = [notification, ...state.notifications]
          const newUnreadCount = newNotifications.filter((n) => !n.read).length

          return {
            notifications: newNotifications,
            unreadCount: newUnreadCount,
            lastNotificationSound: Date.now(),
          }
        }),

      markAsRead: (id) =>
        set((state) => {
          const newNotifications = state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          )

          const newUnreadCount = newNotifications.filter((n) => !n.read).length

          return {
            notifications: newNotifications,
            unreadCount: newUnreadCount,
          }
        }),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
          unreadCount: 0,
        })),

      setNotifications: (notifications) =>
        set(() => ({
          notifications,
          unreadCount: notifications.filter((n) => !n.read).length,
        })),

      shouldPlaySound: () => {
        const lastSound = get().lastNotificationSound
        const now = Date.now()
        // Only play sound if it's been at least 3 seconds since the last one
        // to avoid sound spam
        return now - lastSound > 3000
      },
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({
        notifications: state.notifications.slice(0, 50), // Only store the last 50 notifications
      }),
    },
  ),
)

