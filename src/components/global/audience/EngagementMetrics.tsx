import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Repeat, BarChart2 } from "lucide-react"

const metrics = [
  { title: "Likes", icon: Heart, value: "1.2K", change: "+5.3%" },
  { title: "Comments", icon: MessageCircle, value: "342", change: "+2.1%" },
  { title: "Shares", icon: Repeat, value: "87", change: "+12.7%" },
  { title: "Reach", icon: BarChart2, value: "15.6K", change: "+8.4%" },
]

export default function EngagementMetrics() {
  return (
    <div className="mt-4 md:mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Engagement Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-[#3352CC]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <p className="text-xs text-green-500">{metric.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

