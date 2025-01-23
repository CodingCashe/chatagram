// export interface Automation {
//     id: string;
//     name: string;
//     active: boolean;
//     createdAt: Date;
//     listener: {
//       dmCount: number;
//       commentCount: number;
//     } | null;
//   }
  
//   export interface DashboardData {
//     status: number;
//     data: {
//       automations: Automation[];
//       engagementData: Array<{
//         createdAt: Date;
//         _count: { id: number };
//       }>;
//       commentData: Array<{
//         Automation: { createdAt: Date };
//         commentCount: number;
//       }>;
//       recentDms: any[];
//       recentKeywords: any[];
//       automationsCount: number;
//       activeConversations: number;
//     } | null;
//   }


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
  comments: number
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
  } | null
}

