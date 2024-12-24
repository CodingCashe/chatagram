import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquareIcon as MessageSquareAutoIcon, ZapIcon, BarChartIcon, UsersIcon } from 'lucide-react'

const features = [
  {
    title: "Smart Auto-Replies",
    description: "Engage with your audience instantly using AI-powered responses.",
    icon: MessageSquareAutoIcon,
  },
  {
    title: "Workflow Automation",
    description: "Create complex DM workflows to nurture leads and provide support.",
    icon: ZapIcon,
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into your DM performance and audience engagement.",
    icon: BarChartIcon,
  },
  {
    title: "Multi-Account Management",
    description: "Manage multiple Instagram accounts from a single dashboard.",
    icon: UsersIcon,
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <feature.icon className="h-12 w-12 text-[#2563EB] mb-2" />
              <CardTitle className="text-black">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

