import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const influencers = [
  {
    name: "Jane Doe",
    handle: "@janedoe",
    avatar: "https://via.placeholder.com/50",
    niche: "Beauty",
    followers: 10000,
  },
  {
    name: "John Smith",
    handle: "@johnsmith",
    avatar: "https://via.placeholder.com/50",
    niche: "Tech",
    followers: 50000,
  },
  {
    name: "Alice Johnson",
    handle: "@alicejohnson",
    avatar: "https://via.placeholder.com/50",
    niche: "Travel",
    followers: 25000,
  },
]

export default function InfluencerNetwork() {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Influencer Network</h2>
      <div className="space-y-2 md:space-y-4">
        {influencers.map((influencer, index) => (
          <motion.div
            key={influencer.handle}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-700 bg-opacity-50 rounded-lg p-2 md:p-4"
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
              <p className="text-xs md:text-sm text-gray-400">{influencer.handle}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Badge variant="secondary">{influencer.niche}</Badge>
              <span className="text-xs md:text-sm font-medium">{influencer.followers} followers</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

