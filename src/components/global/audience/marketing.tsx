"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

type MarketingInfo = {
  id: string
  email?: string | null
  phone?: string | null
  name?: string | null
}

export default function MarketingInfoList({ marketingInfo }: { marketingInfo: MarketingInfo[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const filteredMarketingInfo = marketingInfo
    .filter(
      (info) =>
        info.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.phone?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const direction = sortOrder === "asc" ? 1 : -1
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "") * direction
      } else if (sortBy === "email") {
        return (a.email || "").localeCompare(b.email || "") * direction
      } else {
        return (a.phone || "").localeCompare(b.phone || "") * direction
      }
    })

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Marketing Information</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search marketing info..."
          className="w-full p-2 pl-10 bg-gray-700 bg-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3352CC]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="hidden md:flex justify-between mb-2 text-sm font-medium text-gray-400">
        <span className="w-1/3 cursor-pointer flex items-center" onClick={() => toggleSort("name")}>
          Name{" "}
          {sortBy === "name" &&
            (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
        </span>
        <span className="w-1/3 cursor-pointer flex items-center" onClick={() => toggleSort("email")}>
          Email{" "}
          {sortBy === "email" &&
            (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
        </span>
        <span className="w-1/3 cursor-pointer flex items-center" onClick={() => toggleSort("phone")}>
          Phone{" "}
          {sortBy === "phone" &&
            (sortOrder === "desc" ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />)}
        </span>
      </div>
      <div className="space-y-2 md:space-y-4 max-h-80 md:max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredMarketingInfo.map((info, index) => (
            <motion.div
              key={info.id}
              className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 bg-gray-700 bg-opacity-50 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Avatar className="w-16 h-16 md:w-12 md:h-12">
                <AvatarFallback>
                  {info.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "N/A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center md:text-left">
                <p className="font-semibold text-white">{info.name || "N/A"}</p>
                <p className="text-sm text-gray-400">{info.email || "N/A"}</p>
              </div>
              <div className="flex flex-col md:flex-row items-center md:space-x-4">
                <Badge variant="secondary">{info.phone || "N/A"}</Badge>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

