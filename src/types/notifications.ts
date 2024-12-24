export type NotificationType = 'like' | 'comment' | 'follow' | 'mention'

export interface User {
  id: string
  username: string
  avatar: string
}

export interface Notification {
  id: string
  type: NotificationType
  user: User
  action: string
  content?: string
  read: boolean
  timestamp: string
}

