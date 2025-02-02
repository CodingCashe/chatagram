import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, Users, Target } from "lucide-react"

const insights = [
  {
    title: "Content Optimization",
    icon: Brain,
    description: "AI suggests posting lifestyle content between 6-8 PM for maximum engagement.",
  },
  {
    title: "Growth Opportunity",
    icon: TrendingUp,
    description: "Potential for 20% follower increase by collaborating with tech influencers.",
  },
  {
    title: "Audience Insight",
    icon: Users,
    description: "65% of your audience is interested in sustainable fashion. Consider featuring eco-friendly brands.",
  },
  {
    title: "Campaign Idea",
    icon: Target,
    description: "Launch a user-generated content campaign around summer travel to boost engagement.",
  },
]

export default function AIInsights() {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4">AI-Powered Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-gray-700 bg-opacity-50 border-none h-full">
              <CardHeader className="flex flex-row items-center space-x-2">
                <insight.icon className="w-6 h-6 text-[#3352CC]" />
                <CardTitle>{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">{insight.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

