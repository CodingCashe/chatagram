
export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  senderId?: string
  receiverId?:string
  createdAt: Date
  status?: "sending" | "sent" | "error"
  read?: boolean
}

export interface Conversation {
  chatId?:string
  id:string
  userId?: string
  pageId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  unreadCount: number
  read?: boolean
  Automation: {
    id: string
    name: string
  } | null
}


export interface Automation {
  id: string
  name: string
  active: boolean
  createdAt: Date
  listener: {
    dmCount: number
    commentCount: number
  } | null
}

export interface AutomationOption {
  value: string
  label: string
}

export interface EngagementData {
  date: string
  dms: number
}

export interface DashboardData {
  status: number
  data: {
    automations: Automation[]
    engagementData: Array<{
      createdAt: Date
      _count: { id: number }
    }>
    commentData: Array<{
      Automation: { createdAt: Date }
      commentCount: number
    }>
    recentDms: any[]
    recentKeywords: any[]
    automationsCount: number
    activeConversations: number
    conversations: Conversation[]
  } | null
}

