import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ChatMessage = {
  id: string
  content: string
  senderId: string
  receiverId: string | null
  isFromAdmin: boolean
  isRead: boolean
  createdAt: string
  updatedAt: string
  isPending?:boolean
}

export type ChatUser = {
  id: string
  name: string
  email?: string
  unreadCount: number
  lastMessage?: string
  lastMessageTime?: string
  isActive: boolean
}

interface ChatState {
  activeChat: string | null
  messages: Record<string, ChatMessage[]>
  users: ChatUser[]
  setActiveChat: (userId: string | null) => void
  addMessage: (message: ChatMessage) => void
  markMessageAsRead: (messageId: string) => void
  setMessages: (userId: string, messages: ChatMessage[]) => void
  setUsers: (users: ChatUser[]) => void
  updateUserUnreadCount: (userId: string, count: number) => void
  updateUserLastMessage: (userId: string, message: string, time: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      activeChat: null,
      messages: {},
      users: [],

      setActiveChat: (userId) => set({ activeChat: userId }),

      addMessage: (message) =>
        set((state) => {
          const userId = message.isFromAdmin ? message.receiverId : message.senderId
          if (!userId) return state

          const userMessages = state.messages[userId] || []
          // Skip if message already exists
          if (userMessages.some((m) => m.id === message.id)) {
            return state
          }

          return {
            messages: {
              ...state.messages,
              [userId]: [...userMessages, message].sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
              ),
            },
          }
        }),

      markMessageAsRead: (messageId) =>
        set((state) => {
          const newMessages = { ...state.messages }

          // Find the user that has this message
          for (const userId in newMessages) {
            newMessages[userId] = newMessages[userId].map((message) =>
              message.id === messageId ? { ...message, isRead: true } : message,
            )
          }

          return { messages: newMessages }
        }),

      setMessages: (userId, messages) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [userId]: messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
          },
        })),

      setUsers: (users) => set({ users }),

      updateUserUnreadCount: (userId, count) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === userId ? { ...user, unreadCount: count } : user)),
        })),

      updateUserLastMessage: (userId, message, time) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, lastMessage: message, lastMessageTime: time } : user,
          ),
        })),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        messages: state.messages,
        users: state.users,
      }),
    },
  ),
)

