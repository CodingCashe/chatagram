"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, MessageCircle, BarChart3, Users, ShoppingCart, Zap, Calendar, Layers, Sparkles } from "lucide-react"

const features = [
  {
    icon: <Bot className="h-6 w-6 text-blue-400" />,
    title: "AI-Powered Responses",
    description:
      "Our advanced AI understands context and responds naturally to customer inquiries, providing personalized interactions at scale.",
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-blue-400" />,
    title: "24/7 Availability",
    description:
      "Never miss a potential customer again. Respond to DMs instantly, any time of day or night, even when you're sleeping.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
    title: "Detailed Analytics",
    description: "Track conversation metrics, response rates, and conversion data to optimize your messaging strategy.",
  },
  {
    icon: <Users className="h-6 w-6 text-blue-400" />,
    title: "Audience Segmentation",
    description: "Categorize your audience based on interests, behavior, and engagement level for targeted messaging.",
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-blue-400" />,
    title: "Sales Automation",
    description: "Convert followers into customers with automated product recommendations and checkout processes.",
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    title: "Quick Replies",
    description: "Create templates for common questions and customize them on the fly for efficient communication.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-blue-400" />,
    title: "Scheduled Campaigns",
    description: "Plan and schedule DM campaigns to announce new products, promotions, or content to your followers.",
  },
  {
    icon: <Layers className="h-6 w-6 text-blue-400" />,
    title: "Multi-Account Support",
    description: "Manage multiple Instagram accounts from a single dashboard with unified analytics and messaging.",
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="features" ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-950/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border border-blue-700 rounded-full bg-blue-900/20 text-blue-400 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Everything You Need to Automate Your Instagram DMs
            </h2>
            <p className="text-slate-300">
              Our comprehensive suite of tools helps you engage with your audience, convert followers into customers,
              and scale your Instagram presence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6 hover:border-blue-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

