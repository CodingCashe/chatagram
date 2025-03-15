"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Influencer",
    avatar: "/placeholder.svg?height=80&width=80&text=SJ",
    content:
      "Yazil has completely transformed how I engage with my followers. I'm now able to respond to every message, even when I'm asleep or creating content. My engagement rate has increased by 40% and I've seen a significant boost in conversions from my product recommendations.",
    rating: 5,
    platform: "Instagram",
  },
  {
    name: "Mark Williams",
    role: "E-commerce Owner",
    avatar: "/placeholder.svg?height=80&width=80&text=MW",
    content:
      "As a small business owner, I couldn't keep up with all the DMs asking about products. Yazil now handles all inquiries 24/7, answers questions about pricing and availability, and even helps customers complete purchases. It's like having a full-time customer service team at a fraction of the cost.",
    rating: 5,
    platform: "Instagram",
  },
  {
    name: "Jessica Chen",
    role: "Marketing Agency Director",
    avatar: "/placeholder.svg?height=80&width=80&text=JC",
    content:
      "We manage Instagram accounts for over 20 clients, and Yazil has been a game-changer for our agency. The multi-account support and detailed analytics help us demonstrate clear ROI to our clients. The AI responses are so natural that most followers don't realize they're not talking to a human.",
    rating: 5,
    platform: "Instagram",
  },
  {
    name: "David Rodriguez",
    role: "Fitness Coach",
    avatar: "/placeholder.svg?height=80&width=80&text=DR",
    content:
      "I was skeptical about using AI for my coaching business, but Yazil exceeded my expectations. It handles initial inquiries, qualifies leads, and books consultations directly into my calendar. My client acquisition has increased by 35% while I focus on creating quality content and coaching.",
    rating: 4,
    platform: "Instagram",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border border-blue-700 rounded-full bg-blue-900/20 text-blue-400 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Customers Say</h2>
            <p className="text-slate-300">
              Join thousands of businesses and creators who have transformed their Instagram engagement with Yazil.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-blue-900/50 bg-slate-900/80 backdrop-blur-sm hover:bg-blue-900/20 hover:border-blue-700"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5 text-blue-400" />
            </Button>
          </div>

          <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-blue-900/50 bg-slate-900/80 backdrop-blur-sm hover:bg-blue-900/20 hover:border-blue-700"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </Button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-slate-900/50 backdrop-blur-sm border border-blue-900/30 rounded-xl p-8 relative"
                  >
                    <div className="absolute -top-6 -right-6">
                      <div className="bg-blue-900/50 rounded-full p-3">
                        <Quote className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <Avatar className="h-20 w-20 border-2 border-blue-900">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-blue-900 text-blue-200">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`}
                            />
                          ))}
                        </div>

                        <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-blue-400 mb-4">{testimonial.role}</p>

                        <p className="text-slate-300 italic">{testimonial.content}</p>

                        <div className="mt-4 flex items-center">
                          <Instagram className="h-4 w-4 text-blue-400 mr-1.5" />
                          <span className="text-sm text-slate-400">via {testimonial.platform}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === activeIndex ? "bg-blue-500" : "bg-slate-700"}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/30 backdrop-blur-sm border border-blue-900/20 rounded-lg p-6"
          >
            <div className="text-3xl font-bold text-white mb-1">2,000+</div>
            <p className="text-slate-400">Active Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/30 backdrop-blur-sm border border-blue-900/20 rounded-lg p-6"
          >
            <div className="text-3xl font-bold text-white mb-1">5M+</div>
            <p className="text-slate-400">Messages Handled</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-900/30 backdrop-blur-sm border border-blue-900/20 rounded-lg p-6"
          >
            <div className="text-3xl font-bold text-white mb-1">98%</div>
            <p className="text-slate-400">Customer Satisfaction</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-900/30 backdrop-blur-sm border border-blue-900/20 rounded-lg p-6"
          >
            <div className="text-3xl font-bold text-white mb-1">35%</div>
            <p className="text-slate-400">Avg. Conversion Increase</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Instagram(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

