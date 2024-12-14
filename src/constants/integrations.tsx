import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

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
      'Connect and increase sales through the power of automated DMs',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
  {
    title: 'Connect Facebook',
    description:
      'Connect and increase sales through the power of automated DMs',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
  {
    title: 'Connect Threads',
    description:
      'Connect and increase sales through the power of automated DMs',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
  {
    title: 'Connect WeChat',
    description:
      'Connect and increase sales through the power of automated DMs',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
  {
    title: 'Connect Tiktok',
    description:
      'Connect and increase sales through the power of automated DMs',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
]
