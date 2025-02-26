"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Bot,
  Calendar,
  Clock,
  Languages,
  MessageSquare,
  CreditCard,
  Video,
  Palette,
  PieChart,
  Mail,
  Brain,
  Users,
  BugIcon as AbTesting,
  Workflow,
  Bell,
  Smartphone,
  CloudRain,
  Database,
  LineChart,
  Settings,
  Headphones,
} from "lucide-react"

const features = [
  {
    id: "ai_responses",
    name: "AI-Powered Responses",
    description: "Dynamic responses based on customer queries",
    icon: Bot,
    category: "Intelligence",
    popular: true,
  },
  {
    id: "scheduling",
    name: "Appointment Scheduling",
    description: "Automated booking and calendar management",
    icon: Calendar,
    category: "Core",
    popular: true,
  },
  {
    id: "multi_language",
    name: "Multi-language Support",
    description: "Automatic translation for global reach",
    icon: Languages,
    category: "Communication",
    popular: true,
  },
  {
    id: "analytics",
    name: "Advanced Analytics",
    description: "Track and analyze conversation metrics",
    icon: PieChart,
    category: "Analytics",
    popular: true,
  },
  {
    id: "quick_replies",
    name: "Quick Replies",
    description: "Pre-defined responses for common queries",
    icon: MessageSquare,
    category: "Communication",
  },
  {
    id: "24_7",
    name: "24/7 Availability",
    description: "Round-the-clock automated responses",
    icon: Clock,
    category: "Core",
  },
  {
    id: "payment_processing",
    name: "Payment Processing",
    description: "Secure payment handling within chat",
    icon: CreditCard,
    category: "Commerce",
    popular: true,
  },
  {
    id: "video_chat",
    name: "Video Chat Integration",
    description: "Seamless video call scheduling and handling",
    icon: Video,
    category: "Communication",
  },
  {
    id: "custom_branding",
    name: "Custom Branding",
    description: "Personalized look and feel",
    icon: Palette,
    category: "Customization",
  },
  {
    id: "email_integration",
    name: "Email Integration",
    description: "Automated email follow-ups and notifications",
    icon: Mail,
    category: "Communication",
  },
  {
    id: "sentiment_analysis",
    name: "Sentiment Analysis",
    description: "Understand customer emotions in real-time",
    icon: Brain,
    category: "Intelligence",
  },
  {
    id: "team_collaboration",
    name: "Team Collaboration",
    description: "Multi-user access and role management",
    icon: Users,
    category: "Team",
  },
  {
    id: "ab_testing",
    name: "A/B Testing",
    description: "Test different message variations",
    icon: AbTesting,
    category: "Optimization",
  },
  {
    id: "workflows",
    name: "Custom Workflows",
    description: "Create complex automation flows",
    icon: Workflow,
    category: "Automation",
  },
  {
    id: "notifications",
    name: "Push Notifications",
    description: "Real-time alerts and reminders",
    icon: Bell,
    category: "Communication",
  },
  {
    id: "mobile_app",
    name: "Mobile App Access",
    description: "Manage on the go with mobile app",
    icon: Smartphone,
    category: "Access",
  },
  {
    id: "webhooks",
    name: "Webhooks Integration",
    description: "Connect with external services",
    icon: CloudRain,
    category: "Integration",
  },
  {
    id: "data_export",
    name: "Data Export",
    description: "Export conversations and analytics",
    icon: Database,
    category: "Data",
  },
  {
    id: "advanced_reporting",
    name: "Advanced Reporting",
    description: "Detailed insights and reports",
    icon: LineChart,
    category: "Analytics",
  },
  {
    id: "api_access",
    name: "API Access",
    description: "Build custom integrations",
    icon: Settings,
    category: "Development",
  },
  {
    id: "voice_support",
    name: "Voice Support",
    description: "Voice message handling",
    icon: Headphones,
    category: "Communication",
  },
]

const categories = Array.from(new Set(features.map((f) => f.category)))

export function FeatureSelector() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((current) =>
      current.includes(featureId) ? current.filter((id) => id !== featureId) : [...current, featureId],
    )
  }

  const displayCount = 9
  const visibleFeatures = showAll ? features : features.slice(0, displayCount)

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Customize Your Features</h2>
        <p className="text-gray-400">Select the features you want to enable for your automation flow.</p>
      </div>

      <div className="flex flex-wrap gap-2 pb-4 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            className={`border-gray-700 ${
              activeCategory === category
                ? "bg-purple-500 text-white border-purple-500"
                : "text-gray-400 hover:text-gray-100"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleFeatures
          .filter((f) => !activeCategory || f.category === activeCategory)
          .map(({ id, name, description, icon: Icon, category, popular }) => (
            <Card
              key={id}
              className={`p-6 transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                selectedFeatures.includes(id)
                  ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500"
                  : "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
              }`}
              onClick={() => toggleFeature(id)}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`rounded-full p-2 ${
                    selectedFeatures.includes(id) ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={id} className="text-base font-medium text-gray-100">
                          {name}
                        </Label>
                        {popular && (
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{description}</p>
                    </div>
                    <Switch id={id} checked={selectedFeatures.includes(id)} onCheckedChange={() => toggleFeature(id)} />
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs border-gray-700">
                    {category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => setShowAll(!showAll)} className="text-gray-400 hover:text-gray-100">
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show More Features
            </>
          )}
        </Button>
      </div>
    </section>
  )
}

