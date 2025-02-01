import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const influencers = [
  {
    name: "Sophia Lee",
    handle: "@sophia_beauty",
    niche: "Beauty",
    followers: "500K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Alex Chen",
    handle: "@alex_tech",
    niche: "Technology",
    followers: "750K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Maya Patel",
    handle: "@maya_fitness",
    niche: "Fitness",
    followers: "1M",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Carlos Rodriguez",
    handle: "@carlos_travel",
    niche: "Travel",
    followers: "350K",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function InfluencerNetwork() {
  return (
    <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Influencer Network</h2>
      <div className="space-y-4">
        {influencers.map((influencer, index) => (
          <motion.div
            key={influencer.handle}
            className="flex items-center space-x-4 bg-white bg-opacity-5 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Avatar>
              <AvatarImage src={influencer.avatar} alt={influencer.name} />
              <AvatarFallback>
                {influencer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="font-semibold">{influencer.name}</p>
              <p className="text-sm text-gray-400">{influencer.handle}</p>
            </div>
            <Badge variant="secondary">{influencer.niche}</Badge>
            <span className="text-sm font-medium">{influencer.followers} followers</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

