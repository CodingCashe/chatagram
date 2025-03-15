"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles, MessageSquare, BarChart3, Calendar, PenTool, Heart, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContentFeatures() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border border-blue-700 rounded-full bg-blue-900/20 text-blue-400 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Beyond DM Automation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Complete Instagram Management</h2>
            <p className="text-slate-300">
              Yazil offers a comprehensive suite of tools to manage all aspects of your Instagram presence from a
              single dashboard.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-slate-900/50 border border-blue-900/30">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white"
              >
                Dashboard Replies
              </TabsTrigger>
              <TabsTrigger
                value="sentiment"
                className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white"
              >
                Sentiment Analysis
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white"
              >
                Content Generation
              </TabsTrigger>
              <TabsTrigger
                value="scheduling"
                className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-white"
              >
                Post Scheduling
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Reply to DMs Directly</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Manage all your Instagram conversations from our intuitive dashboard. Reply to messages, view
                  conversation history, and seamlessly switch between automated and manual responses.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Unified inbox for all Instagram accounts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">AI-suggested quick replies for common questions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Assign conversations to team members</span>
                  </li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="bg-slate-900 border border-blue-900/50 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-slate-800 p-3 border-b border-blue-900/30 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                      <MessageSquare className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Conversation Dashboard</div>
                      <div className="text-xs text-slate-400">3 active conversations</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-slate-800 rounded-lg p-2 text-center border border-blue-900/30">
                        <div className="text-sm text-slate-400">New</div>
                        <div className="text-xl font-bold text-white">12</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-2 text-center border border-blue-900/30">
                        <div className="text-sm text-slate-400">Active</div>
                        <div className="text-xl font-bold text-white">3</div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-2 text-center border border-blue-900/30">
                        <div className="text-sm text-slate-400">Resolved</div>
                        <div className="text-xl font-bold text-white">28</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-800 rounded-lg p-3 border border-blue-900/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-2"></div>
                              <div>
                                <div className="text-sm font-medium text-white">user_{i}23</div>
                                <div className="text-xs text-slate-400">2 min ago</div>
                              </div>
                            </div>
                            <div className="text-xs bg-blue-900/30 text-blue-400 py-0.5 px-2 rounded">Active</div>
                          </div>
                          <div className="text-sm text-slate-300 mb-2">
                            {i === 1
                              ? "Do you have this in size medium?"
                              : i === 2
                                ? "When will you restock the blue version?"
                                : "Can I get a discount if I order 3 items?"}
                          </div>
                          <div className="flex justify-between">
                            <div className="text-xs text-slate-400">AI handling: {i === 1 ? "Yes" : "No"}</div>
                            <button className="text-xs text-blue-400 hover:text-blue-300">Reply now</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="sentiment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Monitor Sentiment</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Our advanced AI analyzes the sentiment of every message to help you understand how your audience
                  feels. Track sentiment trends over time and identify potential issues before they escalate.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Real-time sentiment analysis of all messages</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Automatic alerts for negative sentiment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Detailed sentiment reports and trends</span>
                  </li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="bg-slate-900 border border-blue-900/50 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-slate-800 p-3 border-b border-blue-900/30 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Sentiment Dashboard</div>
                      <div className="text-xs text-slate-400">Last 30 days</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-green-900/20 rounded-lg p-2 text-center border border-green-900/30">
                        <div className="text-sm text-green-400">Positive</div>
                        <div className="text-xl font-bold text-white">68%</div>
                      </div>
                      <div className="bg-yellow-900/20 rounded-lg p-2 text-center border border-yellow-900/30">
                        <div className="text-sm text-yellow-400">Neutral</div>
                        <div className="text-xl font-bold text-white">24%</div>
                      </div>
                      <div className="bg-red-900/20 rounded-lg p-2 text-center border border-red-900/30">
                        <div className="text-sm text-red-400">Negative</div>
                        <div className="text-xl font-bold text-white">8%</div>
                      </div>
                    </div>

                    <div className="h-48 relative mb-4">
                      <div className="absolute inset-0 flex items-end">
                        {[...Array(14)].map((_, i) => {
                          const height = 30 + Math.random() * 70
                          const color = height > 70 ? "bg-green-500" : height > 40 ? "bg-yellow-500" : "bg-red-500"
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center">
                              <div
                                className={`w-full ${color} rounded-t opacity-70`}
                                style={{ height: `${height}%` }}
                              ></div>
                              <div className="text-xs text-slate-500 mt-1">{i + 1}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white mb-1">Recent Sentiment Alerts</div>
                      <div className="bg-red-900/20 rounded-lg p-2 border border-red-900/30 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-red-900/50 flex items-center justify-center mr-2">
                            <svg className="h-3 w-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          </div>
                          <span className="text-xs text-red-400">Negative sentiment spike detected</span>
                        </div>
                        <span className="text-xs text-slate-400">2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                    <PenTool className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Generate Content</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Never run out of content ideas again. Our AI content generator creates engaging posts, captions, and
                  hashtags tailored to your brand voice and audience preferences.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">AI-generated post ideas and captions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Optimized hashtag suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Content calendar suggestions</span>
                  </li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="bg-slate-900 border border-blue-900/50 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-slate-800 p-3 border-b border-blue-900/30 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                      <PenTool className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Content Generator</div>
                      <div className="text-xs text-slate-400">Create engaging content</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="bg-slate-800 rounded-lg p-3 border border-blue-900/30 mb-4">
                      <div className="text-sm text-slate-400 mb-2">Content Type</div>
                      <div className="flex space-x-2 mb-4">
                        <button className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-400 text-sm">Post</button>
                        <button className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">Story</button>
                        <button className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">Reel</button>
                        <button className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">Carousel</button>
                      </div>

                      <div className="text-sm text-slate-400 mb-2">Topic</div>
                      <input
                        type="text"
                        placeholder="e.g., Summer collection, Product launch"
                        className="w-full bg-slate-700 border-none rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                      />

                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm">
                        Generate Content
                      </button>
                    </div>

                    <div className="bg-slate-800 rounded-lg p-3 border border-blue-900/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-white">Generated Caption</div>
                        <div className="text-xs bg-green-900/30 text-green-400 py-0.5 px-2 rounded">New</div>
                      </div>

                      <div className="text-sm text-slate-300 mb-3">
                        ✨ Summer vibes are in full swing! Our new collection has everything you need to make a splash
                        this season. From beach-ready outfits to evening essentials, we got you covered. 🌊☀️
                        #SummerStyle #NewCollection #BeachVibes
                      </div>

                      <div className="flex justify-between">
                        <button className="text-xs text-blue-400 hover:text-blue-300">Regenerate</button>
                        <button className="text-xs text-blue-400 hover:text-blue-300">Copy to clipboard</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="scheduling">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Schedule Posts</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Plan and schedule your Instagram content in advance. Our intelligent scheduling tool recommends the
                  best times to post based on your audience activity patterns.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Visual content calendar</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Optimal posting time recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Bulk scheduling and queue management</span>
                  </li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="bg-slate-900 border border-blue-900/50 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-slate-800 p-3 border-b border-blue-900/30 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Content Calendar</div>
                      <div className="text-xs text-slate-400">March 2025</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div key={i} className="text-xs text-slate-400">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {[...Array(35)].map((_, i) => {
                        const day = i - 4 // Start from previous month
                        const isCurrentMonth = day > 0 && day <= 31
                        const hasPost = isCurrentMonth && [3, 7, 12, 15, 19, 23, 27].includes(day)

                        return (
                          <div
                            key={i}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                              isCurrentMonth ? "bg-slate-800 border border-blue-900/30" : "bg-slate-900/50"
                            } ${hasPost ? "ring-2 ring-blue-600/50" : ""}`}
                          >
                            {isCurrentMonth && (
                              <>
                                <div className={`text-xs ${hasPost ? "text-white font-medium" : "text-slate-400"}`}>
                                  {day}
                                </div>
                                {hasPost && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1"></div>}
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white mb-1">Upcoming Posts</div>
                      {[
                        { day: "Today", time: "5:30 PM", type: "Photo" },
                        { day: "Tomorrow", time: "9:00 AM", type: "Carousel" },
                        { day: "Mar 19", time: "12:15 PM", type: "Reel" },
                      ].map((post, i) => (
                        <div
                          key={i}
                          className="bg-slate-800 rounded-lg p-2 border border-blue-900/30 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-slate-700 mr-2"></div>
                            <div>
                              <div className="text-xs font-medium text-white">{post.type} Post</div>
                              <div className="text-xs text-slate-400">
                                {post.day} at {post.time}
                              </div>
                            </div>
                          </div>
                          <button className="text-xs text-blue-400 hover:text-blue-300">Edit</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

