import { motion } from "framer-motion"
import { Instagram, Mail, Phone, TrendingUp, Users, DollarSign } from "lucide-react"

export default function Header() {
  return (
    <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <motion.h1
        className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Instagram Marketing Hub
      </motion.h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: Instagram, label: "Followers", value: "1.2M", color: "from-pink-500 to-red-500" },
          { icon: Mail, label: "Emails Collected", value: "45.3K", color: "from-purple-500 to-indigo-500" },
          { icon: Phone, label: "Phone Numbers", value: "32.1K", color: "from-blue-500 to-cyan-500" },
          { icon: TrendingUp, label: "Engagement Rate", value: "4.7%", color: "from-green-500 to-emerald-500" },
          { icon: Users, label: "New Followers", value: "+2.3K", color: "from-yellow-500 to-orange-500" },
          { icon: DollarSign, label: "Revenue", value: "$18.6K", color: "from-red-500 to-pink-500" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-4 bg-gradient-to-r ${item.color} rounded-lg p-4`}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <item.icon className="w-8 h-8 text-white" />
            <div>
              <p className="text-sm text-gray-200">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

