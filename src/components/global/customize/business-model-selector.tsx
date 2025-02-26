"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  ShoppingBag,
  Briefcase,
  Palette,
  GraduationCap,
  BookOpen,
  Stethoscope,
  Home,
  UtensilsCrossed,
  Plane,
  Scissors,
  Laptop,
  Heart,
  Film,
  ShoppingCart,
  Gift,
} from "lucide-react"

const businessModels = [
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Online retail and product sales",
    icon: ShoppingBag,
    features: ["Product inquiries", "Order status", "Shopping assistance"],
    examples: ["Fashion store", "Electronics shop", "Home goods"],
  },
  {
    id: "service",
    name: "Service Provider",
    description: "Professional services and consulting",
    icon: Briefcase,
    features: ["Appointment booking", "Service inquiries", "Quote requests"],
    examples: ["Law firm", "Marketing agency", "IT services"],
  },
  {
    id: "creator",
    name: "Creator/Influencer",
    description: "Content creation and social influence",
    icon: Palette,
    features: ["Content requests", "Collaboration inquiries", "Brand partnerships"],
    examples: ["YouTuber", "Instagram influencer", "Blogger"],
  },
  {
    id: "education",
    name: "Education",
    description: "Courses and educational content",
    icon: GraduationCap,
    features: ["Course information", "Student support", "Enrollment"],
    examples: ["Online courses", "Tutoring", "Workshops"],
  },
  {
    id: "consulting",
    name: "Consulting",
    description: "Expert advice and consulting services",
    icon: BookOpen,
    features: ["Strategy sessions", "Project scoping", "Expert advice"],
    examples: ["Business consultant", "Financial advisor", "Life coach"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical and wellness services",
    icon: Stethoscope,
    features: ["Appointment scheduling", "Medical inquiries", "Follow-ups"],
    examples: ["Medical practice", "Wellness center", "Therapy"],
  },
  {
    id: "realestate",
    name: "Real Estate",
    description: "Property sales and rentals",
    icon: Home,
    features: ["Property inquiries", "Viewings", "Market information"],
    examples: ["Real estate agency", "Property management", "Rentals"],
  },
  {
    id: "food",
    name: "Food & Beverage",
    description: "Restaurants and food services",
    icon: UtensilsCrossed,
    features: ["Reservations", "Menu inquiries", "Orders"],
    examples: ["Restaurant", "Cafe", "Food delivery"],
  },
  {
    id: "travel",
    name: "Travel & Tourism",
    description: "Travel and tourism services",
    icon: Plane,
    features: ["Booking inquiries", "Travel info", "Customer support"],
    examples: ["Travel agency", "Tour operator", "Hotel"],
  },
  {
    id: "beauty",
    name: "Fashion & Beauty",
    description: "Fashion and beauty services",
    icon: Scissors,
    features: ["Style advice", "Appointments", "Product info"],
    examples: ["Salon", "Fashion boutique", "Spa"],
  },
  {
    id: "tech",
    name: "Tech Startup",
    description: "Technology and software companies",
    icon: Laptop,
    features: ["Product demos", "Technical support", "Sales"],
    examples: ["SaaS company", "App developer", "Tech platform"],
  },
  {
    id: "nonprofit",
    name: "Non-Profit",
    description: "Charitable and non-profit organizations",
    icon: Heart,
    features: ["Donation info", "Volunteer coordination", "Impact updates"],
    examples: ["Charity", "Foundation", "NGO"],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Entertainment and events",
    icon: Film,
    features: ["Event info", "Bookings", "Performance details"],
    examples: ["Event venue", "Theater", "Music venue"],
  },
  {
    id: "retail",
    name: "Retail Store",
    description: "Physical retail locations",
    icon: ShoppingCart,
    features: ["Store info", "Product availability", "Customer service"],
    examples: ["Boutique", "Department store", "Specialty shop"],
  },
  {
    id: "subscription",
    name: "Subscription Service",
    description: "Recurring subscription products",
    icon: Gift,
    features: ["Subscription management", "Billing support", "Product updates"],
    examples: ["Box subscription", "Digital service", "Membership"],
  },
]

export function BusinessModelSelector() {
  const [selected, setSelected] = useState("")
  const [showAll, setShowAll] = useState(false)
  const displayCount = 6

  const visibleModels = showAll ? businessModels : businessModels.slice(0, displayCount)

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Select Your Business Model</h2>
        <p className="text-gray-400">
          Choose the model that best describes your business to customize your automation flow.
        </p>
      </div>

      <RadioGroup value={selected} onValueChange={setSelected} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleModels.map(({ id, name, description, icon: Icon, features, examples }) => (
          <Label
            key={id}
            className={`cursor-pointer transition-all duration-300 ${
              selected === id
                ? "ring-2 ring-purple-500 bg-gradient-to-br from-gray-800 to-gray-900"
                : "bg-gray-800/50 hover:bg-gray-800 hover:scale-[1.02]"
            }`}
          >
            <RadioGroupItem value={id} className="sr-only" />
            <Card className="border-gray-700 p-6 transition-all duration-200">
              <div className="flex items-start space-x-4">
                <div
                  className={`rounded-full p-2 ${
                    selected === id ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-100">{name}</h3>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Key Features:</h4>
                  <ul className="text-sm space-y-1">
                    {features.map((feature, index) => (
                      <li key={index} className="text-gray-400 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-purple-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Examples:</h4>
                  <div className="flex flex-wrap gap-2">
                    {examples.map((example, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>

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
              Show More Options
            </>
          )}
        </Button>
      </div>
    </section>
  )
}

