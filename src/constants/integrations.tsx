import { InstagramDuoToneBlue, SalesForceDuoToneBlue,TikTok,Twitter, WeChat } from "@/icons"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description:
      'Instantly Connect your account to access our automation services',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
    
  },
  {
    title: 'Connect X (Formerly Twitter)',
    description:
      'Automatically engage your audience on X',
    icon: <Twitter />,
    strategy: 'CRM',
  },
  {
    title: 'Connect SalesForce',
    description:
      'Connect and increase sales through the power of automated DMs',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
  {
    title: 'Connect TikTok',
    description:
      'Connect and increase TikTok Engagements',
    icon: <TikTok />,
    strategy: 'CRM',
  },
  {
    title: 'Connect WeChat',
    description:
      'Experience the power of DM automation on WeChat',
    icon: <WeChat />,
    strategy: 'CRM',
  },
]
