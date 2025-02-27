"use client"

import type React from "react"

import { useState } from "react"
import { Puzzle, Bot, Zap, Sparkles, MessageSquareText, FileText, BarChart3, Repeat2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Feature = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  enabled: boolean
}

export default function FeatureSelection() {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "ai-responses",
      name: "AI-Powered Responses",
      description: "Generate dynamic, personalized responses based on customer inquiries",
      icon: <Bot className="h-5 w-5 text-purple-400" />,
      enabled: true,
    },
    {
      id: "quick-replies",
      name: "Quick Replies",
      description: "Predefined response templates for common questions",
      icon: <Zap className="h-5 w-5 text-purple-400" />,
      enabled: true,
    },
    {
      id: "nlp",
      name: "Natural Language Processing",
      description: "Understand customer intent even with typos and colloquial language",
      icon: <Sparkles className="h-5 w-5 text-purple-400" />,
      enabled: false,
    },
    {
      id: "multi-language",
      name: "Multi-language Support",
      description: "Automatically detect and respond in the customer's language",
      icon: <MessageSquareText className="h-5 w-5 text-purple-400" />,
      enabled: false,
    },
    {
      id: "product-catalog",
      name: "Product Catalog Integration",
      description: "Show and recommend products directly in the conversation",
      icon: <FileText className="h-5 w-5 text-purple-400" />,
      enabled: true,
    },
    {
      id: "analytics",
      name: "Conversation Analytics",
      description: "Track engagement, conversion rates, and common questions",
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />,
      enabled: true,
    },
    {
      id: "workflows",
      name: "Custom Workflows",
      description: "Create complex decision trees based on user responses",
      icon: <Repeat2 className="h-5 w-5 text-purple-400" />,
      enabled: false,
    },
  ])

  const toggleFeature = (id: string) => {
    setFeatures(features.map((feature) => (feature.id === id ? { ...feature, enabled: !feature.enabled } : feature)))
  }

  return (
    <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Puzzle className="h-6 w-6 text-purple-400" />
          Automation Features
        </CardTitle>
        <CardDescription className="text-gray-400">
          Select the features you want to include in your Instagram DM automation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TooltipProvider>
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`flex items-start justify-between p-4 rounded-lg border ${
                  feature.enabled ? "border-purple-500 bg-purple-900/20" : "border-gray-700 bg-gray-900/50"
                } transition-colors`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">{feature.icon}</div>
                  <div>
                    <Label htmlFor={feature.id} className="font-medium text-gray-200">
                      {feature.name}
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Switch
                        id={feature.id}
                        checked={feature.enabled}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-gray-800 text-gray-200 border-gray-700">
                    {feature.enabled ? "Disable" : "Enable"} this feature
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}

