"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CheckCircle2, XCircle, Sparkles } from "lucide-react"

export default function PricingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small creators",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { included: true, text: "1 Instagram account" },
        { included: true, text: "Basic AI responses" },
        { included: true, text: "Up to 500 messages/month" },
        { included: true, text: "Standard analytics" },
        { included: false, text: "Custom AI training" },
        { included: false, text: "Multi-account management" },
        { included: false, text: "Advanced analytics" },
        { included: false, text: "Priority support" },
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "from-slate-700 to-slate-800",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and influencers",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        { included: true, text: "3 Instagram accounts" },
        { included: true, text: "Advanced AI responses" },
        { included: true, text: "Up to 2,000 messages/month" },
        { included: true, text: "Advanced analytics" },
        { included: true, text: "Custom AI training" },
        { included: true, text: "Multi-account management" },
        { included: false, text: "API access" },
        { included: false, text: "Dedicated account manager" },
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Enterprise",
      description: "For agencies and large businesses",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        { included: true, text: "Unlimited Instagram accounts" },
        { included: true, text: "Premium AI responses" },
        { included: true, text: "Unlimited messages" },
        { included: true, text: "Enterprise analytics" },
        { included: true, text: "Advanced AI training" },
        { included: true, text: "Team collaboration tools" },
        { included: true, text: "API access" },
        { included: true, text: "Dedicated account manager" },
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-slate-700 to-slate-800",
    },
  ]

  return (
    <section id="pricing" ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950"></div>
      <div className="absolute -top-40 left-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border border-blue-700 rounded-full bg-blue-900/20 text-blue-400 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Simple Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Choose the Perfect Plan for Your Needs</h2>
            <p className="text-slate-300 mb-8">
              No hidden fees or complicated pricing structures. Choose the plan that works for you and start automating
              your Instagram DMs today.
            </p>

            <div className="flex items-center justify-center space-x-3">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>Monthly</span>
              <Switch
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
              />
              <span
                className={`text-sm flex items-center ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}
              >
                Yearly
                <span className="ml-1.5 bg-green-900/30 text-green-400 text-xs py-0.5 px-1.5 rounded">Save 20%</span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              )}

              <div
                className={`h-full bg-gradient-to-b ${plan.color} border border-blue-900/30 rounded-xl p-6 flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-blue-900/50 text-blue-400 text-xs py-1 px-2 rounded">Most Popular</div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-300 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">
                        ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-slate-400 ml-2 mb-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <div className="text-sm text-green-400 mt-1">
                        Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} per year
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-slate-600 mr-2 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-slate-200" : "text-slate-500"}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  )
}

