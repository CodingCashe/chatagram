import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Standard",
    price: "FREE",
    description: "Perfect for small businesses and influencers",
    features: [
      "Up to 4 automated DMs per month",
      "Basic message templates",
      "24/7 customer support",
      "Analytics dashboard"
    ]
  },
  {
    name: "Pro",
    price: "$89",
    description: "Ideal for growing brands and power users",
    features: [
      "Unlimited automated DMs",
      "Advanced message personalization",
      "Priority 24/7 customer support",
      "Advanced analytics and reporting",
      "Multi-account management",
      "API access"
    ]
  }
]

export default function PricingPlans() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Automation Plan</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="w-full max-w-sm mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal text-gray-600">/month</span></p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#2563EB] hover:bg-blue-700">Choose {plan.name}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

