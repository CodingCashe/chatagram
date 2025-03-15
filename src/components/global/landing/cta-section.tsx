"use client"

import { useRef } from "react"
import Link from 'next/link'
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Bot, BarChart3 } from "lucide-react"

export default function CtaSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gradient-to-b from-blue-900/20 to-slate-900/20 backdrop-blur-md border border-blue-900/30 rounded-2xl p-8 md:p-12 text-center shimmerBorder"
        >
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-white">24/7 Responses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                <Bot className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-white">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-white">Detailed Analytics</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Instagram Engagement?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and creators who have automated their Instagram DMs and increased their
            conversion rates.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/dashboard">Start Your Free Trial</Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-700 text-blue-400 hover:bg-blue-900/20">
              Schedule a Demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-400">No credit card required. 14-day free trial.</p>
        </motion.div>
      </div>
    </section>
  )
}

