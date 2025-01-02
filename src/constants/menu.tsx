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

import {
  HomeDuoToneWhite,
  AutomationDuoToneWhite,
  RocketDuoToneWhite,
  SettingsDuoToneWhite,
} from '@/icons'
import { MessageCircle, BarChart2, Users, Calendar, Zap, FileText, HelpCircle, Bell } from 'lucide-react'
import { v4 as uuid } from 'uuid'

export type SideBarItemProps = {
  id: string
  label: string
  icon: React.ReactNode
  subItems?: Omit<SideBarItemProps, 'subItems'>[]
}

export const SIDEBAR_MENU: SideBarItemProps[] = [
  {
    id: uuid(),
    label: 'Dashboard',
    icon: <HomeDuoToneWhite />,
  },
  {
    id: uuid(),
    label: 'Automations',
    icon: <AutomationDuoToneWhite />,
    subItems: [
      { id: uuid(), label: 'Create New', icon: <Zap size={18} /> },
      { id: uuid(), label: 'Templates', icon: <FileText size={18} /> },
      { id: uuid(), label: 'Analytics', icon: <BarChart2 size={18} /> },
    ]
  },
  {
    id: uuid(),
    label: 'Conversations',
    icon: <MessageCircle />,
  },
  {
    id: uuid(),
    label: 'Audience',
    icon: <Users />,
  },
  {
    id: uuid(),
    label: 'Campaigns',
    icon: <Calendar />,
  },
  {
    id: uuid(),
    label: 'Integrations',
    icon: <RocketDuoToneWhite />,
  },
  {
    id: uuid(),
    label: 'Analytics',
    icon: <BarChart2 />,
  },
  {
    id: uuid(),
    label: 'Settings',
    icon: <SettingsDuoToneWhite />,
  },
]

