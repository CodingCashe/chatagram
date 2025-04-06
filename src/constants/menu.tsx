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

import {
  HomeDuoToneWhite,
  AutomationDuoToneWhite,
  RocketDuoToneWhite,
  SettingsDuoToneWhite,
  PencilDuoToneBlack,
  Chat,
} from '@/icons'
import { MessageCircle,Instagram,Clock, BarChart2, Users,DollarSign, Calendar, Zap, FileText, HelpCircle, Sparkles, Target, Palette, Megaphone, TargetIcon, PersonStanding, Gift, Group, Award } from 'lucide-react'
import { v4 as uuid } from 'uuid'

export type SideBarItemProps = {
  id: string
  label: string
  icon: React.ReactNode
  subItems?: Omit<SideBarItemProps, 'subItems'>[]
}

export type SideBarGroupProps = {
  id: string
  label: string
  items: SideBarItemProps[]
}

export const SIDEBAR_MENU: SideBarGroupProps[] = [
  {
    id: uuid(),
    label: 'Main',
    items: [
      {
        id: uuid(),
        label: 'Home',
        icon: <HomeDuoToneWhite />,
      },
      {
        id: uuid(),
        label: 'Automations',
        icon: <AutomationDuoToneWhite />,
      },
      {
        id: uuid(),
        label: 'leads',
        icon: <PersonStanding />,
      },
      {
        id: uuid(),
        label: 'Customize',
        icon: <TargetIcon />,
      },
    ]
  },
  {
    id: uuid(),
    label: 'Influencer',
    items: [
      {
        id: uuid(),
        label: 'Integrations',
        icon: <HomeDuoToneWhite />,
      },
      {
        id: uuid(),
        label: 'campaigns',
        icon: <AutomationDuoToneWhite />,
        subItems: [
          { id: uuid(), label: 'Create New', icon: <Zap size={18} /> },
          { id: uuid(), label: 'Templates', icon: <FileText size={18} /> },
          { id: uuid(), label: 'Analytics', icon: <BarChart2 size={18} /> },
        ]
      },
      {
        id: uuid(),
        label: 'Portal',
        icon: <AutomationDuoToneWhite />,
        subItems: [
          { id: uuid(), label: 'Settings', icon: <Zap size={18} /> },
        ]
      },
      {
        id: uuid(),
        label: 'influencers',
        icon: <AutomationDuoToneWhite />,
        subItems: [
          { id: uuid(), label: 'ai-discovery', icon: <Zap size={18} /> },
          { id: uuid(), label: 'discover', icon: <FileText size={18} /> },
          { id: uuid(), label: 'import', icon: <BarChart2 size={18} /> },
        ]
      },
    ]
  },
 
  {
    id: uuid(),
    label: 'System',
    items: [
      {
        id: uuid(),
        label: 'Integrations',
        icon: <RocketDuoToneWhite />,
      },
      {
        id: uuid(),
        label: 'Pricing',
        icon: <SettingsDuoToneWhite />,
      },
      {
        id: uuid(),
        label: 'Payment',
        icon: <DollarSign />,
      },
      {
        id: uuid(),
        label: 'Information',
        icon: <PencilDuoToneBlack />,
      },
      {
        id: uuid(),
        label: 'Posting',
        icon: <Clock />,
      },
      {
        id: uuid(),
        label: 'Chat',
        icon: <MessageCircle />,
      },
      {
        id: uuid(),
        label: 'Referral',
        icon: <Gift />,
      },
      {
        id: uuid(),
        label: 'Affiliate',
        icon: <Award />,
      },
      {
        
        id: uuid(),
        label: 'Whatsapp',
        icon: <Chat />,
      },
    ]
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


