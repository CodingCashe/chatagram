import { v4 } from 'uuid'

type Props = {
  id: string
  label: string
  subLabel: string
  description: string
}

export const DASHBOARD_CARDS: Props[] = [
  {
    id: v4(),
    label: 'Set-up Auto Replies',
    subLabel: '',
    description: 'Get products in front of your followers in as many places',
  },
  {
    id: v4(),
    label: 'Answer Questions with AI',
    subLabel: '',
    description: 'The intention of the message will be automatically detected',
  },
  {
    id: v4(),
    label: 'Give quality replies',
    subLabel: '',
    description: 'The AI answers based on a well designed database and creativity',
  },
]
