import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

type Client = {
  name: string
  handle: string
  avatar: string
  engagement: "High" | "Medium" | "Low"
  followers: number
  posts: number
}

const clients: Client[] = [
  {
    name: "John Doe",
    handle: "@johndoe",
    avatar: "https://via.placeholder.com/50",
    engagement: "High",
    followers: 1000,
    posts: 100,
  },
  {
    name: "Jane Doe",
    handle: "@janedoe",
    avatar: "https://via.placeholder.com/50",
    engagement: "Medium",
    followers: 500,
    posts: 50,
  },
  {
    name: "Peter Jones",
    handle: "@peterjones",
    avatar: "https://via.placeholder.com/50",
    engagement: "Low",
    followers: 250,
    posts: 25,
  },
  {
    name: "Sarah Williams",
    handle: "@sarahwilliams",
    avatar: "https://via.placeholder.com/50",
    engagement: "High",
    followers: 1500,
    posts: 150,
  },
  {
    name: "David Brown",
    handle: "@davidbrown",
    avatar: "https://via.placeholder.com/50",
    engagement: "Medium",
    followers: 750,
    posts: 75,
  },
]

export default function ClientList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("engagement")
  const [sortOrder, setSortOrder] = useState("desc")

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const filteredClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.handle.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const direction = sortOrder === "asc" ? 1 : -1
      if (sortBy === "engagement") {
        return a.engagement.localeCompare(b.engagement) * direction
      } else if (sortBy === "followers") {
        return (a.followers - b.followers) * direction
      } else {
        return (a.posts - b.posts) * direction
      }
    })

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Top Clients</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full p-2 pl-10 bg-gray-700 bg-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3352CC]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="flex justify-between mb-2 text-xs md:text-sm font-medium text-gray-400">
        <span className="w-1/3">Client</span>
        <span className="w-1/4 cursor-pointer flex items-center" onClick={() => toggleSort("engagement")}>
          Engagement{" "}
          {sortBy === "engagement" &&
            (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
        </span>
        <span className="w-1/4 cursor-pointer flex items-center" onClick={() => toggleSort("followers")}>
          Followers{" "}
          {sortBy === "followers" &&
            (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
        </span>
        <span className="w-1/4 cursor-pointer flex items-center" onClick={() => toggleSort("posts")}>
          Posts{" "}
          {sortBy === "posts" &&
            (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
        </span>
      </div>
      <div className="space-y-2 md:space-y-4 max-h-80 md:max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.handle}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-700 bg-opacity-50 rounded-lg p-2 md:p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Avatar>
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-semibold">{client.name}</p>
                <p className="text-xs md:text-sm text-gray-400">{client.handle}</p>
              </div>
              <Badge
                variant={
                  client.engagement === "High" ? "default" : client.engagement === "Medium" ? "secondary" : "outline"
                }
              >
                {client.engagement}
              </Badge>
              <span className="text-xs md:text-sm">{client.followers}</span>
              <span className="text-xs md:text-sm">{client.posts}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

