// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Search, ChevronDown, ChevronUp } from "lucide-react"

// const clients = [
//   {
//     name: "Emma Johnson",
//     handle: "@emma_styles",
//     engagement: "High",
//     avatar: "/placeholder.svg?height=40&width=40",
//     followers: "120K",
//     posts: 450,
//   },
//   {
//     name: "Liam Brown",
//     handle: "@liam_photos",
//     engagement: "Medium",
//     avatar: "/placeholder.svg?height=40&width=40",
//     followers: "85K",
//     posts: 320,
//   },
//   {
//     name: "Olivia Davis",
//     handle: "@olivia_travels",
//     engagement: "Low",
//     avatar: "/placeholder.svg?height=40&width=40",
//     followers: "50K",
//     posts: 180,
//   },
//   {
//     name: "Noah Wilson",
//     handle: "@noah_fitness",
//     engagement: "High",
//     avatar: "/placeholder.svg?height=40&width=40",
//     followers: "200K",
//     posts: 600,
//   },
//   {
//     name: "Ava Martinez",
//     handle: "@ava_foodie",
//     engagement: "Medium",
//     avatar: "/placeholder.svg?height=40&width=40",
//     followers: "75K",
//     posts: 280,
//   },
//   {
//     name: "Ethan Lee",
//     handle: "@ethan_tech",
//     engagement: "High",
//     avatar: "/placeholder.svg?height=40&width=40",
//     followers: "150K",
//     posts: 520,
//   },
// ]

// export default function ClientList() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState("engagement")
//   const [sortOrder, setSortOrder] = useState("desc")

//   const filteredClients = clients
//     .filter(
//       (client) =>
//         client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         client.handle.toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//     .sort((a, b) => {
//       if (sortBy === "engagement") {
//         const order = { High: 3, Medium: 2, Low: 1 }
//         return sortOrder === "desc"
//           ? order[b.engagement] - order[a.engagement]
//           : order[a.engagement] - order[b.engagement]
//       } else if (sortBy === "followers") {
//         return sortOrder === "desc"
//           ? Number.parseInt(b.followers) - Number.parseInt(a.followers)
//           : Number.parseInt(a.followers) - Number.parseInt(b.followers)
//       } else {
//         return sortOrder === "desc" ? b.posts - a.posts : a.posts - b.posts
//       }
//     })

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "desc" ? "asc" : "desc")
//     } else {
//       setSortBy(field)
//       setSortOrder("desc")
//     }
//   }

//   return (
//     <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Top Clients</h2>
//       <div className="mb-4 relative">
//         <input
//           type="text"
//           placeholder="Search clients..."
//           className="w-full p-2 pl-10 bg-white bg-opacity-10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Search className="absolute left-3 top-2.5 text-gray-400" />
//       </div>
//       <div className="flex justify-between mb-2 text-sm font-medium text-gray-400">
//         <span className="w-1/3">Client</span>
//         <span className="w-1/4 cursor-pointer flex items-center" onClick={() => toggleSort("engagement")}>
//           Engagement{" "}
//           {sortBy === "engagement" &&
//             (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
//         </span>
//         <span className="w-1/4 cursor-pointer flex items-center" onClick={() => toggleSort("followers")}>
//           Followers{" "}
//           {sortBy === "followers" &&
//             (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
//         </span>
//         <span className="w-1/4 cursor-pointer flex items-center" onClick={() => toggleSort("posts")}>
//           Posts{" "}
//           {sortBy === "posts" &&
//             (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
//         </span>
//       </div>
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         <AnimatePresence>
//           {filteredClients.map((client, index) => (
//             <motion.div
//               key={client.handle}
//               className="flex items-center space-x-4 bg-white bg-opacity-5 rounded-lg p-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//             >
//               <Avatar>
//                 <AvatarImage src={client.avatar} alt={client.name} />
//                 <AvatarFallback>
//                   {client.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-grow">
//                 <p className="font-semibold">{client.name}</p>
//                 <p className="text-sm text-gray-400">{client.handle}</p>
//               </div>
//               <Badge
//                 variant={
//                   client.engagement === "High" ? "default" : client.engagement === "Medium" ? "secondary" : "outline"
//                 }
//               >
//                 {client.engagement}
//               </Badge>
//               <span className="text-sm">{client.followers}</span>
//               <span className="text-sm">{client.posts}</span>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

type EngagementLevel = "High" | "Medium" | "Low"

interface Client {
  name: string
  handle: string
  engagement: EngagementLevel
  avatar: string
  followers: string
  posts: number
}

const clients: Client[] = [
  {
    name: "Emma Johnson",
    handle: "@emma_styles",
    engagement: "High",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "120K",
    posts: 450,
  },
  {
    name: "Liam Brown",
    handle: "@liam_photos",
    engagement: "Medium",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "85K",
    posts: 320,
  },
  {
    name: "Olivia Davis",
    handle: "@olivia_travels",
    engagement: "Low",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "50K",
    posts: 180,
  },
  {
    name: "Noah Wilson",
    handle: "@noah_fitness",
    engagement: "High",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "200K",
    posts: 600,
  },
  {
    name: "Ava Martinez",
    handle: "@ava_foodie",
    engagement: "Medium",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "75K",
    posts: 280,
  },
  {
    name: "Ethan Lee",
    handle: "@ethan_tech",
    engagement: "High",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "150K",
    posts: 520,
  },
]

const engagementOrder: Record<EngagementLevel, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
}

export default function ClientList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"engagement" | "followers" | "posts">("engagement")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.handle.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "engagement") {
        return sortOrder === "desc"
          ? engagementOrder[b.engagement] - engagementOrder[a.engagement]
          : engagementOrder[a.engagement] - engagementOrder[b.engagement]
      } else if (sortBy === "followers") {
        const followersA = Number.parseInt(a.followers.replace(/[^0-9]/g, ""))
        const followersB = Number.parseInt(b.followers.replace(/[^0-9]/g, ""))
        return sortOrder === "desc" ? followersB - followersA : followersA - followersB
      } else {
        return sortOrder === "desc" ? b.posts - a.posts : a.posts - b.posts
      }
    })

  const toggleSort = (field: "engagement" | "followers" | "posts") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Top Clients</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full p-2 pl-10 bg-white bg-opacity-10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="flex justify-between mb-2 text-sm font-medium text-gray-400">
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
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.handle}
              className="flex items-center space-x-4 bg-white bg-opacity-5 rounded-lg p-4"
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
                <p className="text-sm text-gray-400">{client.handle}</p>
              </div>
              <Badge
                variant={
                  client.engagement === "High" ? "default" : client.engagement === "Medium" ? "secondary" : "outline"
                }
              >
                {client.engagement}
              </Badge>
              <span className="text-sm">{client.followers}</span>
              <span className="text-sm">{client.posts}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

