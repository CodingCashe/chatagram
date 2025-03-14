"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, MessageSquare, Share2, Clock, Users, Globe } from "lucide-react"

interface BenefitProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

const Benefit = ({ icon, title, description, delay }: BenefitProps) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
    <Card className="h-full glassEffect hoverScale">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mb-4">{icon}</div>
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)

export default function PlatformBenefits({ platform }: { platform: string }) {
  const benefits =
    platform === "instagram"
      ? [
          {
            icon: <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Advanced Analytics",
            description: "Track engagement, reach, and follower growth with detailed insights",
            delay: 0.1,
          },
          {
            icon: <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Auto Responses",
            description: "Set up automated replies to common DM inquiries",
            delay: 0.2,
          },
          {
            icon: <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Cross-Platform Posting",
            description: "Share content seamlessly across all your connected accounts",
            delay: 0.3,
          },
          {
            icon: <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Scheduled Posts",
            description: "Plan and schedule your content calendar in advance",
            delay: 0.4,
          },
        ]
      : [
          {
            icon: <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Group Management",
            description: "Organize contacts into groups for targeted messaging",
            delay: 0.1,
          },
          {
            icon: <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Automated Responses",
            description: "Create quick replies and chatbots for common questions",
            delay: 0.2,
          },
          {
            icon: <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Conversation Analytics",
            description: "Track message volume, response times, and customer satisfaction",
            delay: 0.3,
          },
          {
            icon: <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
            title: "Multi-Device Access",
            description: "Manage conversations from any device with synchronized history",
            delay: 0.4,
          },
        ]

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-6 text-center">
        {platform === "instagram" ? "Instagram" : "WhatsApp"} Integration Benefits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit, index) => (
          <Benefit key={index} {...benefit} />
        ))}
      </div>
    </div>
  )
}

