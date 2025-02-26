"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Users, Briefcase, Palette, Megaphone, GraduationCap } from "lucide-react"

const businessModels = [
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Online retail and product sales",
    icon: ShoppingBag,
    features: ["Product inquiries", "Order status", "Shopping assistance"],
  },
  {
    id: "service",
    name: "Service Provider",
    description: "Professional services and consulting",
    icon: Briefcase,
    features: ["Appointment booking", "Service inquiries", "Quote requests"],
  },
  {
    id: "creator",
    name: "Creator/Influencer",
    description: "Content creation and social influence",
    icon: Palette,
    features: ["Content requests", "Collaboration inquiries", "Brand partnerships"],
  },
  {
    id: "education",
    name: "Education",
    description: "Courses and educational content",
    icon: GraduationCap,
    features: ["Course information", "Student support", "Enrollment assistance"],
  },
  {
    id: "marketing",
    name: "Marketing Agency",
    description: "Marketing and advertising services",
    icon: Megaphone,
    features: ["Campaign inquiries", "Strategy consultation", "Pricing information"],
  },
  {
    id: "community",
    name: "Community/Membership",
    description: "Community management and memberships",
    icon: Users,
    features: ["Member support", "Access requests", "Community guidelines"],
  },
]

export function BusinessModelSelector() {
  const [selected, setSelected] = useState("")

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Select Your Business Model</h2>
        <p className="text-gray-400">
          Choose the model that best describes your business to customize your automation flow.
        </p>
      </div>

      <RadioGroup value={selected} onValueChange={setSelected} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businessModels.map(({ id, name, description, icon: Icon, features }) => (
          <Label
            key={id}
            className={`cursor-pointer ${
              selected === id
                ? "ring-2 ring-purple-500 bg-gradient-to-br from-gray-800 to-gray-900"
                : "bg-gray-800/50 hover:bg-gray-800"
            }`}
          >
            <RadioGroupItem value={id} className="sr-only" />
            <Card className="border-gray-700 p-6 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div
                  className={`rounded-full p-2 ${
                    selected === id ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-100">{name}</h3>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    • {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </section>
  )
}

