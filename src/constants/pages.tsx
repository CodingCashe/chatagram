import {
  AutomationDuoToneBlue,
  ContactsDuoToneBlue,
  HomeDuoToneBlue,
  RocketDuoToneBlue,
  SettingsDuoToneWhite,
  Tech,
  InstagramDuoToneBlue,
  MegaPhoneDuoToneWhite,
  PencilDuoToneBlack,
  Chat
} from '@/icons'
import { MessageCircle,Send, BarChart2, Users, Calendar, Zap, FileText, HelpCircle, Sparkles, Target, Palette, Megaphone, Clock, TargetIcon, PersonStanding, Gift, Group, Award } from 'lucide-react'

export const PAGE_BREAD_CRUMBS: string[] = [
  'contacts',
  'automations',
  'integrations',
  'customize',
  'settings',
  'audience',
  'information',
  'schedule',
  'posting',
  'leads',
  'chat',
  'referral',
  'influencer',
  'whatsapp',
  


]

type Props = {
  [page in string]: React.ReactNode
}

export const PAGE_ICON: Props = {
  AUTOMATION: <AutomationDuoToneBlue />,
  AUTOMATIONS: <AutomationDuoToneBlue />,
  CONTACTS: <ContactsDuoToneBlue />,
  INTEGRATIONS: <RocketDuoToneBlue />,
  SETTINGS: <SettingsDuoToneWhite />,
  HOME: <HomeDuoToneBlue />,
  AUDIENCE: <Users />,
  POSTING: <InstagramDuoToneBlue />,
  SCHEDULE: <Clock />,
  INFORMATION:<PencilDuoToneBlack/>,
  CUSTOMIZE:<TargetIcon/>,
  LEADS:<PersonStanding/>,
  CHAT:<MessageCircle/>,
  WHATSAPP:<Chat/>,
  INFLUENCER:<Chat/>,
  AFFILIATE:<Award/>,
}

export const PLANS = [
  {
    name: 'Free Plan',
    description: 'Perfect for getting started',
    price: '$0',
    features: [
      'Boost engagement with target responses',
      'Automate comment replies to enhance audience interaction',
      'Turn followers into customers with targeted messaging',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Smart AI Plan',
    description: 'Advanced features for power users',
    price: '$89',
    features: [
      'All features from Free Plan',
      'AI-powered response generation',
      'Advanced analytics and insights',
      'Priority customer support',
      'Custom branding options',
    ],
    cta: 'Upgrade Now',
  },
]
