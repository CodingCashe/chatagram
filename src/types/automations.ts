export interface Automation {
    name: string
    id: string
    createdAt: Date
    updatedAt: Date
    keywords: string[]
    scheduledPosts?: ScheduledPost[]
  }
  
  // Add or update this type definition file

export type Listener = {
  id: string
  listener: "SMARTAI" | "MESSAGE"
  prompt: string
  commentReply: string | null
  lastComment: string | null
  lastDm: string | null
  dmCount: number
  commentCount: number
  automationId: string
}

export type Trigger = {
  id: string
  type: "COMMENT" | "DM"
  automationId: string
}

export type User = {
  id: string
  name: string
  email: string
  // Add other user properties as needed
}

export type Post = {
  id: string
  postid: string
  media: string
  mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"
  caption?: string
  automationId: string
}

export type Keyword = {
  id: string
  word: string
  automationId: string | null
}

export type ScheduledPost = {
  id: string
  mediaUrl: string
  caption: string
  scheduledDate: string
  automationId?: string
}

export type AutomationData = {
  id: string
  name: string
  active: boolean
  userId: string
  createdAt: string
  updatedAt: string
  listener: Listener | null
  trigger: Trigger[]
  User: User | null
  posts: Post[]
  keywords: Keyword[]
  scheduledPosts?: ScheduledPost[] // Making this optional since it might not exist in older responses
}

export type AutomationResponse = {
  status: number
  data: AutomationData
}

