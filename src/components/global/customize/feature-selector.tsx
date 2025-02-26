"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bot, Calendar, Clock, Globe, Languages, MessageSquare, Share2, ShieldCheck, Tags, Zap } from "lucide-react"

const features = [
  {
    id: "ai_responses",
    name: "AI-Powered Responses",
    description: "Dynamic responses based on customer queries",
    icon: Bot,
  },
  {
    id: "scheduling",
    name: "Appointment Scheduling",
    description: "Automated booking and calendar management",
    icon: Calendar,
  },
  {
    id: "multi_language",
    name: "Multi-language Support",
    description: "Automatic translation for global reach",
    icon: Languages,
  },
  {
    id: "analytics",
    name: "Advanced Analytics",
    description: "Track and analyze conversation metrics",
    icon: Share2,
  },
  {
    id: "quick_replies",
    name: "Quick Replies",
    description: "Pre-defined responses for common queries",
    icon: MessageSquare,
  },
  {
    id: "24_7",
    name: "24/7 Availability",
    description: "Round-the-clock automated responses",
    icon: Clock,
  },
  {
    id: "smart_routing",
    name: "Smart Routing",
    description: "Intelligent conversation forwarding",
    icon: Share2,
  },
  {
    id: "security",
    name: "Enhanced Security",
    description: "Advanced data protection measures",
    icon: ShieldCheck,
  },
  {
    id: "keyword_triggers",
    name: "Keyword Triggers",
    description: "Automated responses based on keywords",
    icon: Tags,
  },
  {
    id: "integration",
    name: "CRM Integration",
    description: "Connect with your existing tools",
    icon: Globe,
  },
  {
    id: "performance",
    name: "Performance Optimization",
    description: "Fast and reliable response times",
    icon: Zap,
  },
]

export function FeatureSelector() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((current) =>
      current.includes(featureId) ? current.filter((id) => id !== featureId) : [...current, featureId],
    )
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Customize Your Features</h2>
        <p className="text-gray-400">Select the features you want to enable for your automation flow.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ id, name, description, icon: Icon }) => (
          <Card
            key={id}
            className={`p-6 transition-all duration-200 cursor-pointer hover:bg-gray-800/70 ${
              selectedFeatures.includes(id)
                ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500"
                : "bg-gray-800/50 border-gray-700"
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
                  <Label htmlFor={id} className="text-base font-medium text-gray-100">
                    {name}
                  </Label>
                  <Switch id={id} checked={selectedFeatures.includes(id)} onCheckedChange={() => toggleFeature(id)} />
                </div>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

