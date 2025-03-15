"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles } from "lucide-react"

const integrations = [
  {
    name: "Instagram",
    logo: "/placeholder.svg?height=40&width=40&text=IG",
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "Shopify",
    logo: "/placeholder.svg?height=40&width=40&text=SP",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Stripe",
    logo: "/placeholder.svg?height=40&width=40&text=ST",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Zapier",
    logo: "/placeholder.svg?height=40&width=40&text=ZP",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Slack",
    logo: "/placeholder.svg?height=40&width=40&text=SL",
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "Google Analytics",
    logo: "/placeholder.svg?height=40&width=40&text=GA",
    color: "from-yellow-500 to-amber-600",
  },
]

export default function IntegrationLogos() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border border-blue-700 rounded-full bg-blue-900/20 text-blue-400 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Seamless Integrations
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Connect With Your Favorite Tools</h2>
            <p className="text-slate-300">
              DM Pilot integrates with the tools you already use to streamline your workflow and maximize efficiency.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-blue-900/30 rounded-xl p-4 flex flex-col items-center hover:border-blue-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${integration.color} flex items-center justify-center mb-3 text-white font-bold`}
              >
                {integration.name.substring(0, 2)}
              </div>
              <span className="text-white text-sm font-medium">{integration.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

