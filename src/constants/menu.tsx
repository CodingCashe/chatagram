// import {
//     AutomationDuoToneWhite,
//     HomeDuoToneWhite,
//     RocketDuoToneWhite,
//     SettingsDuoToneWhite,
//   } from '@/icons'
//   import { v4 as uuid } from 'uuid'
  
//   export type FieldProps = {
//     label: string
//     id: string
//   }
  
//   type SideBarProps = {
//     icon: React.ReactNode
//   } & FieldProps
  
//   export const SIDEBAR_MENU: SideBarProps[] = [
//     {
//       id: uuid(),
//       label: 'home',
//       icon: <HomeDuoToneWhite />,
//     },
//     {
//       id: uuid(),
//       label: 'automations',
//       icon: <AutomationDuoToneWhite />,
//     },
//     {
//       id: uuid(),
//       label: 'integrations',
//       icon: <RocketDuoToneWhite />,
//     },
//     {
//       id: uuid(),
//       label: 'settings',
//       icon: <SettingsDuoToneWhite />,
//     },
//   ]

// import {
//   HomeDuoToneWhite,
//   AutomationDuoToneWhite,
//   RocketDuoToneWhite,
//   SettingsDuoToneWhite,
// } from '@/icons'
// import { MessageCircle, BarChart2, Users, Calendar, Zap, FileText, HelpCircle, Bell } from 'lucide-react'
// import { v4 as uuid } from 'uuid'

// export type SideBarItemProps = {
//   id: string
//   label: string
//   icon: React.ReactNode
//   subItems?: Omit<SideBarItemProps, 'subItems'>[]
// }

// export const SIDEBAR_MENU: SideBarItemProps[] = [
//   {
//     id: uuid(),
//     label: 'Dashboard',
//     icon: <HomeDuoToneWhite />,
//   },
//   {
//     id: uuid(),
//     label: 'Automations',
//     icon: <AutomationDuoToneWhite />,
//     subItems: [
//       { id: uuid(), label: 'Create New', icon: <Zap size={18} /> },
//       { id: uuid(), label: 'Templates', icon: <FileText size={18} /> },
//       { id: uuid(), label: 'Analytics', icon: <BarChart2 size={18} /> },
//     ]
//   },
//   {
//     id: uuid(),
//     label: 'Conversations',
//     icon: <MessageCircle />,
//   },
//   {
//     id: uuid(),
//     label: 'Audience',
//     icon: <Users />,
//   },
//   {
//     id: uuid(),
//     label: 'Campaigns',
//     icon: <Calendar />,
//   },
//   {
//     id: uuid(),
//     label: 'Integrations',
//     icon: <RocketDuoToneWhite />,
//   },
//   {
//     id: uuid(),
//     label: 'Analytics',
//     icon: <BarChart2 />,
//   },
//   {
//     id: uuid(),
//     label: 'Settings',
//     icon: <SettingsDuoToneWhite />,
//   },
// ]

// import {
//   HomeDuoToneWhite,
//   AutomationDuoToneWhite,
//   RocketDuoToneWhite,
//   SettingsDuoToneWhite,
//   PencilDuoToneBlack,
//   Chat,
// } from '@/icons'
// import { MessageCircle,Instagram,Clock, BarChart2, Users,DollarSign, Calendar, Zap, FileText, HelpCircle, Sparkles, Target, Palette, Megaphone, TargetIcon, PersonStanding, Gift, Group, Award } from 'lucide-react'
// import { v4 as uuid } from 'uuid'

// export type SideBarItemProps = {
//   id: string
//   label: string
//   icon: React.ReactNode
//   subItems?: Omit<SideBarItemProps, 'subItems'>[]
// }

// export type SideBarGroupProps = {
//   id: string
//   label: string
//   items: SideBarItemProps[]
// }

// export const SIDEBAR_MENU: SideBarGroupProps[] = [
//   {
//     id: uuid(),
//     label: 'Main',
//     items: [
//       {
//         id: uuid(),
//         label: 'Home',
//         icon: <HomeDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'Automations',
//         icon: <AutomationDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'leads',
//         icon: <PersonStanding />,
//       },
//       {
//         id: uuid(),
//         label: 'Customize',
//         icon: <TargetIcon />,
//       },
//     ]
//   },
//   {
//     id: uuid(),
//     label: 'Influencer',
//     items: [
//       {
//         id: uuid(),
//         label: 'Integrations',
//         icon: <HomeDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'campaigns',
//         icon: <AutomationDuoToneWhite />,
//         subItems: [
//           { id: uuid(), label: 'Create New', icon: <Zap size={18} /> },
//           { id: uuid(), label: 'Templates', icon: <FileText size={18} /> },
//           { id: uuid(), label: 'Analytics', icon: <BarChart2 size={18} /> },
//         ]
//       },
//       {
//         id: uuid(),
//         label: 'Portal',
//         icon: <AutomationDuoToneWhite />,
//         subItems: [
//           { id: uuid(), label: 'Settings', icon: <Zap size={18} /> },
//         ]
//       },
//       {
//         id: uuid(),
//         label: 'influencers',
//         icon: <AutomationDuoToneWhite />,
//         subItems: [
//           { id: uuid(), label: 'ai-discovery', icon: <Zap size={18} /> },
//           { id: uuid(), label: 'discover', icon: <FileText size={18} /> },
//           { id: uuid(), label: 'import', icon: <BarChart2 size={18} /> },
//         ]
//       },
//     ]
//   },
 
//   {
//     id: uuid(),
//     label: 'System',
//     items: [
//       {
//         id: uuid(),
//         label: 'Integrations',
//         icon: <RocketDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'Pricing',
//         icon: <SettingsDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'Payment',
//         icon: <DollarSign />,
//       },
//       {
//         id: uuid(),
//         label: 'Information',
//         icon: <PencilDuoToneBlack />,
//       },
//       {
//         id: uuid(),
//         label: 'Posting',
//         icon: <Clock />,
//       },
//       {
//         id: uuid(),
//         label: 'Chat',
//         icon: <MessageCircle />,
//       },
//       {
//         id: uuid(),
//         label: 'Referral',
//         icon: <Gift />,
//       },
//       {
//         id: uuid(),
//         label: 'Affiliate',
//         icon: <Award />,
//       },
//       {

//         id: uuid(),
//         label: 'Whatsapp',
//         icon: <Chat />,
//       },
//     ]
//   },
// ]


import { v4 as uuid } from "uuid"
import {
  Home,
  Zap,
  Users,
  Settings,
  Target,
  BarChart2,
  Sparkles,
  MessageCircle,
  Clock,
  DollarSign,
  Gift,
  Award,
  Plug,
  PanelTop,
  Search,
  Upload,
  PlusCircle,
  Layout,
  HelpCircle,
  CreditCard,
  Info,
  Send,
  Instagram,
} from "lucide-react"
import type React from "react"

export type SideBarItemProps = {
  id: string
  label: string
  icon: React.ReactNode
  subItems?: Omit<SideBarItemProps, "subItems">[]
}

export type SideBarGroupProps = {
  id: string
  label: string
  items: SideBarItemProps[]
}

// Helper function to add color to icons
const colorIcon = (Icon: React.ComponentType<any>, color: string, size = 20) => {
  return <Icon size={size} className={`${color} transition-colors duration-200`} />
}

export const SIDEBAR_MENU: SideBarGroupProps[] = [
  {
    id: uuid(),
    label: "Main",
    items: [
      {
        id: uuid(),
        label: "Home",
        icon: colorIcon(Home, "text-blue-400"),
      },
      {
        id: uuid(),
        label: "Automations",
        icon: colorIcon(Zap, "text-yellow-400"),
      },
      {
        id: uuid(),
        label: "Leads",
        icon: colorIcon(Users, "text-green-400"),
      },
      {
        id: uuid(),
        label: "Customize",
        icon: colorIcon(Target, "text-purple-400"),
      },
    ],
  },
  {
    id: uuid(),
    label: "Influencer",
    items: [
      {
        id: uuid(),
        label: "Integrations",
        icon: colorIcon(Plug, "text-cyan-400"),
      },
      {
        id: uuid(),
        label: "Campaigns",
        icon: colorIcon(Target, "text-pink-400"),
        subItems: [
          { id: uuid(), label: "Create New", icon: colorIcon(PlusCircle, "text-green-400", 18) },
          { id: uuid(), label: "Templates", icon: colorIcon(Layout, "text-blue-400", 18) },
          { id: uuid(), label: "Analytics", icon: colorIcon(BarChart2, "text-purple-400", 18) },
        ],
      },
      {
        id: uuid(),
        label: "Influencers",
        icon: colorIcon(Instagram, "text-rose-400"),
        subItems: [
          { id: uuid(), label: "AI-Discovery", icon: colorIcon(Sparkles, "text-yellow-400", 18) },
          { id: uuid(), label: "Discover", icon: colorIcon(Search, "text-blue-400", 18) },
          { id: uuid(), label: "Import", icon: colorIcon(Upload, "text-green-400", 18) },
        ],
      },
      {
        id: uuid(),
        label: "Portal",
        icon: colorIcon(PanelTop, "text-indigo-400"),
        subItems: [{ id: uuid(), label: "Settings", icon: colorIcon(Settings, "text-gray-400", 18) }],
      },
    ],
  },
  {
    id: uuid(),
    label: "System",
    items: [
      // Communication group
      {
        id: uuid(),
        label: "Chat",
        icon: colorIcon(MessageCircle, "text-green-400"),
      },
      {
        id: uuid(),
        label: "Whatsapp",
        icon: colorIcon(Send, "text-green-500"),
      },
      {
        id: uuid(),
        label: "Posting",
        icon: colorIcon(Clock, "text-blue-400"),
      },

      // Financial group
      {
        id: uuid(),
        label: "Payment",
        icon: colorIcon(CreditCard, "text-purple-400"),
      },
      {
        id: uuid(),
        label: "Pricing",
        icon: colorIcon(DollarSign, "text-emerald-400"),
      },
      {
        id: uuid(),
        label: "Referral",
        icon: colorIcon(Gift, "text-pink-400"),
      },
      {
        id: uuid(),
        label: "Affiliate",
        icon: colorIcon(Award, "text-amber-400"),
      },

      {
        id: uuid(),
        label: "Opportunities",
        icon: colorIcon(Award, "text-green-400"),
      },


      // Information group
      {
        id: uuid(),
        label: "Information",
        icon: colorIcon(Info, "text-cyan-400"),
      },
      {
        id: uuid(),
        label: "Help",
        icon: colorIcon(HelpCircle, "text-blue-400"),
      },
    ],
  },
]



// import {
//   InstagramDuoToneBlue,
//   HomeDuoToneWhite,
//   AutomationDuoToneWhite,
//   RocketDuoToneWhite,
//   SettingsDuoToneWhite,
//   PencilDuoToneBlack,
//   Chat,
// } from '@/icons'
// import { MessageCircle,Instagram,Clock, BarChart2, Users,DollarSign, Calendar, Zap, FileText, HelpCircle, Sparkles, Target, Palette, Megaphone, TargetIcon, PersonStanding, Gift, Group, Award } from 'lucide-react'
// import { v4 as uuid } from 'uuid'


// export type SideBarItemProps = {
//   id: string
//   label: string
//   icon: React.ReactNode
//   subItems?: Omit<SideBarItemProps, 'subItems'>[]
// }


// // export interface SideBarItemProps {
// //   id: string
// //   label: string
// //   icon: React.ReactNode
// //   url?: string
// //   subItems?: SideBarItemProps[]
// // }

// export interface SideBarGroupProps {
//   id: string
//   label: string
//   items: SideBarItemProps[]
  
// }

// export const SIDEBAR_MENU: SideBarGroupProps[] = [
//   {
//     id: uuid(),
//     label: 'Main',
//     items: [
//       {
//         id: uuid(),
//         label: 'Home',
//         icon: <HomeDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'Automations',
//         icon: <AutomationDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'leads',
//         icon: <PersonStanding />,
//       },
//       {
//         id: uuid(),
//         label: 'Customize',
//         icon: <TargetIcon />,
//       },
//     ]
//   },
//   {
//     id: uuid(),
//     label: 'System',
//     items: [
//       {
//         id: uuid(),
//         label: 'Integrations',
//         icon: <RocketDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'Pricing',
//         icon: <SettingsDuoToneWhite />,
//       },
//       {
//         id: uuid(),
//         label: 'Payment',
//         icon: <DollarSign />,
//       },
//       {
//         id: uuid(),
//         label: 'Information',
//         icon: <PencilDuoToneBlack />,
//       },
//       {
//         id: uuid(),
//         label: 'Posting',
//         icon: <Clock />,
//       },
//       {
//         id: uuid(),
//         label: 'Chat',
//         icon: <MessageCircle />,
//       },
//       {
//         id: uuid(),
//         label: 'Referral',
//         icon: <Gift />,
//       },
//       {
//         id: uuid(),
//         label: 'Affiliate',
//         icon: <Award />,
//       },
//       {
//         id: uuid(),
//         label: 'Whatsapp',
//         icon: <Chat />,
//       },
//     ]
//   },
// ]


