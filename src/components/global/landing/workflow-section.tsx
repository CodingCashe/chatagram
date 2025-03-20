"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Bot, Users, BarChart3, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

export default function WorkflowSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const steps = [
    {
      number: "01",
      title: "Connect Your Instagram",
      description: "Securely link your Instagram business account with just a few clicks. No technical setup required.",
      icon: <Users className="h-6 w-6 text-blue-400" />,
    },
    {
      number: "02",
      title: "Train Your AI Assistant",
      description:
        "Customize your AI to match your brand voice and provide the right information about your products or services.",
      icon: <Bot className="h-6 w-6 text-blue-400" />,
    },
    {
      number: "03",
      title: "Set Up Automation Rules",
      description: "Define when and how your AI responds to different types of messages, from inquiries to complaints.",
      icon: <MessageCircle className="h-6 w-6 text-blue-400" />,
    },
    {
      number: "04",
      title: "Monitor & Optimize",
      description: "Track performance metrics and continuously improve your automation strategy based on real data.",
      icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border border-blue-700 rounded-full bg-blue-900/20 text-blue-400 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Simple Workflow
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Get Started in Minutes, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Not Days</span>
            </h2>
            <p className="text-slate-300 mb-8">
              Our intuitive platform makes it easy to set up sophisticated Instagram DM automation without any technical
              knowledge. Follow these simple steps to transform your Instagram engagement.
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium text-blue-500 mr-2">{step.number}</span>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Right content - Dashboard preview */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="bg-slate-900 border border-blue-900/50 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20 glassEffect">
                {/* Dashboard header */}
                <div className="bg-slate-800 p-4 border-b border-blue-900/30 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="ml-2 font-medium text-white">Yazil Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800 rounded-lg p-4 border border-blue-900/30">
                      <div className="text-sm text-slate-400 mb-1">Total Messages</div>
                      <div className="text-2xl font-bold text-white">1,248</div>
                      <div className="text-xs text-green-400 mt-1 flex items-center">
                        <ArrowRight className="h-3 w-3 rotate-45 mr-1" />
                        +12% this week
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 border border-blue-900/30">
                      <div className="text-sm text-slate-400 mb-1">Response Rate</div>
                      <div className="text-2xl font-bold text-white">98.7%</div>
                      <div className="text-xs text-green-400 mt-1 flex items-center">
                        <ArrowRight className="h-3 w-3 rotate-45 mr-1" />
                        +2.3% this week
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 border border-blue-900/30">
                      <div className="text-sm text-slate-400 mb-1">Conversions</div>
                      <div className="text-2xl font-bold text-white">64</div>
                      <div className="text-xs text-green-400 mt-1 flex items-center">
                        <ArrowRight className="h-3 w-3 rotate-45 mr-1" />
                        +8% this week
                      </div>
                    </div>
                  </div>

                  {/* AI Assistant Configuration */}
                  <div className="bg-slate-800 rounded-lg p-4 border border-blue-900/30 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Bot className="h-5 w-5 text-blue-400 mr-2" />
                        <span className="font-medium text-white">AI Assistant Configuration</span>
                      </div>
                      <div className="bg-blue-900/50 text-blue-400 text-xs py-1 px-2 rounded">Active</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-slate-300">Brand voice training complete</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-slate-300">Product catalog connected</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-slate-300">Response templates configured</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-slate-300">Escalation rules set up</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Conversations */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">Recent Conversations</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-1 h-auto"
                      >
                        View All
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-slate-800 rounded-lg p-3 border border-blue-900/30 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-3"></div>
                            <div>
                              <div className="text-sm font-medium text-white">user_{i + 1}23</div>
                              <div className="text-xs text-slate-400">Product inquiry • 10 min ago</div>
                            </div>
                          </div>
                          <div className="text-xs bg-green-900/30 text-green-400 py-0.5 px-2 rounded">Resolved</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-blue-600/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-blue-600/30 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

