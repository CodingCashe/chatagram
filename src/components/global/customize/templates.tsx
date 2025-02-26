"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ShoppingCart, Calendar, Star, FileText, Users, Rocket } from "lucide-react"

type Template = {
  id: string
  name: string
  description: string
  category: string
  icon: any
  popular?: boolean
  flow: {
    steps: {
      type: string
      message: string
      options?: string[]
      conditions?: { if: string; then: string }[]
    }[]
  }
}

const templates: Template[] = [
  {
    id: "sales_funnel",
    name: "Sales Funnel",
    description: "Qualify leads and guide them through your sales process",
    category: "Sales",
    icon: ShoppingCart,
    popular: true,
    flow: {
      steps: [
        {
          type: "message",
          message: "👋 Hi there! Thanks for your interest in [Product Name]. How can I help you today?",
        },
        {
          type: "choice",
          message: "I'd be happy to help! What are you interested in?",
          options: ["Learn about products", "Get pricing information", "Schedule a demo", "Speak to sales rep"],
        },
        {
          type: "conditional",
          message: "Great choice! Let me help you with that.",
          conditions: [
            {
              if: "Learn about products",
              then: "Our product line includes: [Product List]. Which one interests you most?",
            },
            {
              if: "Get pricing information",
              then: "Our pricing starts at $X/month. Would you like to see our detailed pricing plans?",
            },
            {
              if: "Schedule a demo",
              then: "I'll help you schedule a demo. What's your preferred date and time?",
            },
            {
              if: "Speak to sales rep",
              then: "I'll connect you with our sales team. Could you share your contact details?",
            },
          ],
        },
      ],
    },
  },
  {
    id: "customer_support",
    name: "Customer Support",
    description: "Handle common customer inquiries and support requests",
    category: "Support",
    icon: MessageSquare,
    popular: true,
    flow: {
      steps: [
        {
          type: "message",
          message: "Hello! I'm here to help. What can I assist you with today?",
        },
        {
          type: "choice",
          message: "Please select your issue category:",
          options: ["Technical Issue", "Billing Question", "Product Information", "Other"],
        },
        {
          type: "conditional",
          message: "I understand you need help with that.",
          conditions: [
            {
              if: "Technical Issue",
              then: "Could you describe the technical issue you're experiencing?",
            },
            {
              if: "Billing Question",
              then: "What specific billing information do you need?",
            },
            {
              if: "Product Information",
              then: "What would you like to know about our products?",
            },
            {
              if: "Other",
              then: "Please describe how I can help you today.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "appointment_booking",
    name: "Appointment Booking",
    description: "Streamline appointment scheduling and management",
    category: "Scheduling",
    icon: Calendar,
    flow: {
      steps: [
        {
          type: "message",
          message: "Hi! Let's help you schedule an appointment.",
        },
        {
          type: "choice",
          message: "What type of appointment would you like to schedule?",
          options: ["Consultation", "Follow-up", "Initial Meeting", "Check availability"],
        },
        {
          type: "message",
          message: "Great! Let me check our available time slots.",
        },
      ],
    },
  },
  {
    id: "product_launch",
    name: "Product Launch",
    description: "Generate buzz and handle inquiries for new products",
    category: "Marketing",
    icon: Rocket,
    popular: true,
    flow: {
      steps: [
        {
          type: "message",
          message: "🎉 Exciting news! Our new product is launching soon!",
        },
        {
          type: "choice",
          message: "Would you like to:",
          options: ["Get early access", "Learn more", "Join waitlist", "See pricing"],
        },
      ],
    },
  },
  {
    id: "feedback_collection",
    name: "Feedback Collection",
    description: "Gather and process customer feedback",
    category: "Feedback",
    icon: Star,
    flow: {
      steps: [
        {
          type: "message",
          message: "We'd love to hear your feedback!",
        },
        {
          type: "choice",
          message: "How would you rate your experience?",
          options: ["Excellent", "Good", "Fair", "Poor"],
        },
      ],
    },
  },
  {
    id: "lead_qualification",
    name: "Lead Qualification",
    description: "Qualify leads and route them appropriately",
    category: "Sales",
    icon: Users,
    flow: {
      steps: [
        {
          type: "message",
          message: "Hi! Let's find the best solution for your needs.",
        },
        {
          type: "choice",
          message: "What's your company size?",
          options: ["1-10", "11-50", "51-200", "201+"],
        },
      ],
    },
  },
  {
    id: "event_registration",
    name: "Event Registration",
    description: "Handle event registrations and inquiries",
    category: "Events",
    icon: Calendar,
    flow: {
      steps: [
        {
          type: "message",
          message: "Welcome! Let's get you registered for our upcoming event.",
        },
        {
          type: "choice",
          message: "Which session would you like to attend?",
          options: ["Morning", "Afternoon", "Evening"],
        },
      ],
    },
  },
  {
    id: "onboarding",
    name: "Customer Onboarding",
    description: "Guide new customers through your product",
    category: "Onboarding",
    icon: FileText,
    popular: true,
    flow: {
      steps: [
        {
          type: "message",
          message: "Welcome aboard! Let's get you started with [Product Name].",
        },
        {
          type: "choice",
          message: "What would you like to do first?",
          options: ["Take product tour", "Set up account", "Import data", "Get help"],
        },
      ],
    },
  },
]

const categories = Array.from(new Set(templates.map((t) => t.category)))

export function Templates() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const filteredTemplates = activeCategory ? templates.filter((t) => t.category === activeCategory) : templates

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Choose a Template</h2>
        <p className="text-gray-400">Start with a pre-built flow and customize it to your needs.</p>
      </div>

      <div className="flex flex-wrap gap-2 pb-4 overflow-x-auto scrollbar-hide">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveCategory(null)}
          className={`border-gray-700 ${
            !activeCategory ? "bg-purple-500 text-white border-purple-500" : "text-gray-400 hover:text-gray-100"
          }`}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => setActiveCategory(category)}
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
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
              selectedTemplate?.id === template.id
                ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500"
                : "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`rounded-full p-2 ${
                  selectedTemplate?.id === template.id ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-400"
                }`}
              >
                <template.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-100">{template.name}</h3>
                  {template.popular && (
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400">{template.description}</p>
                <Badge variant="outline" className="mt-2 text-xs border-gray-700">
                  {template.category}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedTemplate && (
        <Card className="p-6 mt-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="preview" className="data-[state=active]:bg-gray-700">
                Preview
              </TabsTrigger>
              <TabsTrigger value="flow" className="data-[state=active]:bg-gray-700">
                Flow Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{selectedTemplate.name}</h3>
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-gray-100">
                    Use Template
                  </Button>
                </div>
                <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  {selectedTemplate.flow.steps.map((step, index) => (
                    <div key={index} className="space-y-2">
                      <Badge variant="outline" className="text-xs border-gray-700">
                        {step.type}
                      </Badge>
                      {step.type === "message" && (
                        <div className="p-3 bg-gray-800/50 rounded border border-gray-700">{step.message}</div>
                      )}
                      {step.type === "choice" && (
                        <div className="space-y-2">
                          <div className="p-3 bg-gray-800/50 rounded border border-gray-700">{step.message}</div>
                          <div className="grid gap-2">
                            {step.options?.map((option, idx) => (
                              <div
                                key={idx}
                                className="p-2 bg-gray-800/30 rounded border border-gray-700 text-sm text-gray-400"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {step.type === "conditional" && (
                        <div className="space-y-2">
                          <div className="p-3 bg-gray-800/50 rounded border border-gray-700">{step.message}</div>
                          <div className="grid gap-2">
                            {step.conditions?.map((condition, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="text-sm text-purple-400">If: {condition.if}</div>
                                <div className="p-2 bg-gray-800/30 rounded border border-gray-700 text-sm text-gray-400">
                                  Then: {condition.then}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="flow" className="mt-4">
              <div className="space-y-4">
                <div className="grid gap-4">
                  {selectedTemplate.flow.steps.map((step, index) => (
                    <Card key={index} className="p-4 bg-gray-800/50 border-gray-700">
                      <div className="space-y-2">
                        <div className="font-medium text-gray-100">Step {index + 1}</div>
                        <div className="text-sm text-gray-400">
                          <strong>Type:</strong> {step.type}
                        </div>
                        <div className="text-sm text-gray-400">
                          <strong>Message:</strong> {step.message}
                        </div>
                        {step.options && (
                          <div className="text-sm text-gray-400">
                            <strong>Options:</strong> {step.options.join(", ")}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </section>
  )
}

