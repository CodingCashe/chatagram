// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, Loader2 } from "lucide-react"
// import InfluencerCard from "@/components/global/influencers/influencer-card"
// import InfluencerFilters from "@/components/global/influencers/influencer-filters"
// import DataSourceSelector from "@/components/global/influencers/data-source-selector"
// import { discoverInfluencers } from "@/actions/influencers"
// import { InfluencerSource } from "@prisma/client"

// export default function DiscoverInfluencers() {
//   const [influencers, setInfluencers] = useState([])
//   const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState("all")
//   const [sortBy, setSortBy] = useState("relevance")
//   const [filters, setFilters] = useState({
//     minFollowers: 0,
//     maxFollowers: 1000000,
//     minEngagement: 0,
//     maxEngagement: 20,
//     niche: [],
//     location: "",
//     verified: undefined,
//   })

//   const fetchInfluencers = async () => {
//     setLoading(true)
//     try {
//       // Map the active tab to source filter
//       let sourceFilter: InfluencerSource[] | undefined = undefined
//       if (activeTab !== "all") {
//         const sourceMap: Record<string, InfluencerSource> = {
//           instagram: InfluencerSource.INSTAGRAM_API,
//           "third-party": InfluencerSource.THIRD_PARTY,
//           ai: InfluencerSource.AI_DISCOVERY,
//           portal: InfluencerSource.PORTAL_SIGNUP,
//         }
//         sourceFilter = [sourceMap[activeTab]]
//       }

//       // Map sortBy to actual sort parameters
//       let sortField = "followers"
//       let sortDirection: "asc" | "desc" = "desc"

//       switch (sortBy) {
//         case "followers":
//           sortField = "followers"
//           sortDirection = "desc"
//           break
//         case "engagement":
//           sortField = "engagementRate"
//           sortDirection = "desc"
//           break
//         case "recent":
//           sortField = "createdAt"
//           sortDirection = "desc"
//           break
//       }

//       const result = await discoverInfluencers({
//         source: sourceFilter,
//         search: searchQuery || undefined,
//         minFollowers: filters.minFollowers,
//         maxFollowers: filters.maxFollowers,
//         minEngagement: filters.minEngagement,
//         maxEngagement: filters.maxEngagement,
//         niche: filters.niche.length > 0 ? filters.niche : undefined,
//         location: filters.location || undefined,
//         verified: filters.verified,
//         sortBy: sortField,
//         sortDirection,
//         page: pagination.page,
//         limit: pagination.limit,
//       })

//       if (result.status === 200) {
//         setInfluencers(result.data.influencers)
//         setPagination(result.data.pagination)
//       } else {
//         console.error("Error fetching influencers:", result.data)
//       }
//     } catch (error) {
//       console.error("Error fetching influencers:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchInfluencers()
//   }, [activeTab, sortBy, pagination.page, searchQuery])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     fetchInfluencers()
//   }

//   const handleFilterChange = (newFilters: any) => {
//     setFilters({ ...filters, ...newFilters })
//   }

//   const handleApplyFilters = () => {
//     // Reset to page 1 when applying new filters
//     setPagination((prev) => ({ ...prev, page: 1 }))
//     fetchInfluencers()
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Discover Influencers</h1>
//         <p className="text-muted-foreground">
//           Find the perfect influencers for your campaigns using our multi-source discovery platform.
//         </p>
//       </div>

//       <DataSourceSelector />

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="md:col-span-1">
//           <InfluencerFilters filters={filters} onChange={handleFilterChange} onApply={handleApplyFilters} />
//         </div>

//         <div className="md:col-span-3 space-y-6">
//           <div className="flex items-center space-x-2">
//             <form onSubmit={handleSearch} className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search by name, niche, or keywords..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </form>
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="relevance">Relevance</SelectItem>
//                 <SelectItem value="followers">Followers: High to Low</SelectItem>
//                 <SelectItem value="engagement">Engagement Rate</SelectItem>
//                 <SelectItem value="recent">Recently Added</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//             <TabsList>
//               <TabsTrigger value="all">All Sources</TabsTrigger>
//               <TabsTrigger value="instagram">Instagram API</TabsTrigger>
//               <TabsTrigger value="third-party">Third-Party Data</TabsTrigger>
//               <TabsTrigger value="ai">AI Discovered</TabsTrigger>
//               <TabsTrigger value="portal">Portal Signups</TabsTrigger>
//             </TabsList>

//             <TabsContent value={activeTab} className="space-y-4 mt-4">
//               {loading ? (
//                 <div className="flex justify-center items-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : influencers.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {influencers.map((influencer: any) => (
//                     <InfluencerCard
//                       key={influencer.id}
//                       influencer={influencer}
//                       source={influencer.source.toLowerCase()}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 border rounded-md">
//                   <p className="text-muted-foreground">No influencers found matching your criteria.</p>
//                 </div>
//               )}

//               {pagination.pages > 1 && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
//                     disabled={pagination.page === 1}
//                   >
//                     Previous
//                   </Button>
//                   <span className="flex items-center px-3">
//                     Page {pagination.page} of {pagination.pages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
//                     disabled={pagination.page === pagination.pages}
//                   >
//                     Next
//                   </Button>
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, Loader2 } from "lucide-react"
// import InfluencerCard from "@/components/global/influencers/influencer-card"
// import InfluencerFilters from "@/components/global/influencers/influencer-filters"
// import DataSourceSelector from "@/components/global/influencers/data-source-selector"
// import { discoverInfluencers } from "@/actions/influencers"
// // import InfluencerCard from "@/components/influencer-card"
// // import InfluencerFilters from "@/components/influencer-filters"
// // import DataSourceSelector from "@/components/data-source-selector"
// // import { discoverInfluencers } from "@/app/actions/influencers"
// import { InfluencerSource } from "@prisma/client"

// export default function DiscoverInfluencers() {
//   const [influencers, setInfluencers] = useState([])
//   const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState("all")
//   const [sortBy, setSortBy] = useState("relevance")
//   const [filters, setFilters] = useState({
//     minFollowers: 0,
//     maxFollowers: 1000000,
//     minEngagement: 0,
//     maxEngagement: 20,
//     niche: [],
//     location: "",
//     verified: undefined,
//   })

//   const fetchInfluencers = async () => {
//     setLoading(true)
//     try {
//       // Map the active tab to source filter
//       let sourceFilter: InfluencerSource[] | undefined = undefined
//       if (activeTab !== "all") {
//         const sourceMap: Record<string, InfluencerSource> = {
//           instagram: InfluencerSource.INSTAGRAM_API,
//           "third-party": InfluencerSource.THIRD_PARTY,
//           ai: InfluencerSource.AI_DISCOVERY,
//           portal: InfluencerSource.PORTAL_SIGNUP,
//         }
//         sourceFilter = [sourceMap[activeTab]]
//       }

//       // Map sortBy to actual sort parameters
//       let sortField = "followers"
//       let sortDirection: "asc" | "desc" = "desc"

//       switch (sortBy) {
//         case "followers":
//           sortField = "followers"
//           sortDirection = "desc"
//           break
//         case "engagement":
//           sortField = "engagementRate"
//           sortDirection = "desc"
//           break
//         case "recent":
//           sortField = "createdAt"
//           sortDirection = "desc"
//           break
//       }

//       const result = await discoverInfluencers({
//         source: sourceFilter,
//         search: searchQuery || undefined,
//         minFollowers: filters.minFollowers,
//         maxFollowers: filters.maxFollowers,
//         minEngagement: filters.minEngagement,
//         maxEngagement: filters.maxEngagement,
//         niche: filters.niche.length > 0 ? filters.niche : undefined,
//         location: filters.location || undefined,
//         verified: filters.verified,
//         sortBy: sortField,
//         sortDirection,
//         page: pagination.page,
//         limit: pagination.limit,
//       })

//       if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
//         setInfluencers(result.data.influencers || [])
//         setPagination(result.data.pagination || { total: 0, pages: 0, page: 1, limit: 10 })
//       } else {
//         console.error("Error fetching influencers:", result.data)
//       }
//     } catch (error) {
//       console.error("Error fetching influencers:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchInfluencers()
//   }, [activeTab, sortBy, pagination.page, searchQuery])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     fetchInfluencers()
//   }

//   const handleFilterChange = (newFilters: any) => {
//     setFilters({ ...filters, ...newFilters })
//   }

//   const handleApplyFilters = () => {
//     // Reset to page 1 when applying new filters
//     setPagination((prev) => ({ ...prev, page: 1 }))
//     fetchInfluencers()
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Discover Influencers</h1>
//         <p className="text-muted-foreground">
//           Find the perfect influencers for your campaigns using our multi-source discovery platform.
//         </p>
//       </div>

//       <DataSourceSelector />

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="md:col-span-1">
//           <InfluencerFilters filters={filters} onChange={handleFilterChange} onApply={handleApplyFilters} />
//         </div>

//         <div className="md:col-span-3 space-y-6">
//           <div className="flex items-center space-x-2">
//             <form onSubmit={handleSearch} className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search by name, niche, or keywords..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </form>
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="relevance">Relevance</SelectItem>
//                 <SelectItem value="followers">Followers: High to Low</SelectItem>
//                 <SelectItem value="engagement">Engagement Rate</SelectItem>
//                 <SelectItem value="recent">Recently Added</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//             <TabsList>
//               <TabsTrigger value="all">All Sources</TabsTrigger>
//               <TabsTrigger value="instagram">Instagram API</TabsTrigger>
//               <TabsTrigger value="third-party">Third-Party Data</TabsTrigger>
//               <TabsTrigger value="ai">AI Discovered</TabsTrigger>
//               <TabsTrigger value="portal">Portal Signups</TabsTrigger>
//             </TabsList>

//             <TabsContent value={activeTab} className="space-y-4 mt-4">
//               {loading ? (
//                 <div className="flex justify-center items-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : influencers.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {influencers.map((influencer: any) => (
//                     <InfluencerCard
//                       key={influencer.id}
//                       influencer={influencer}
//                       source={influencer.source.toLowerCase()}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 border rounded-md">
//                   <p className="text-muted-foreground">No influencers found matching your criteria.</p>
//                 </div>
//               )}

//               {pagination.pages > 1 && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
//                     disabled={pagination.page === 1}
//                   >
//                     Previous
//                   </Button>
//                   <span className="flex items-center px-3">
//                     Page {pagination.page} of {pagination.pages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
//                     disabled={pagination.page === pagination.pages}
//                   >
//                     Next
//                   </Button>
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, Loader2 } from "lucide-react"
// import InfluencerCard from "@/components/global/influencers/influencer-card"
// import InfluencerFilters from "@/components/global/influencers/influencer-filters"
// import DataSourceSelector from "@/components/global/influencers/data-source-selector"
// import { discoverInfluencers } from "@/actions/influencers"
// import { InfluencerSource } from "@prisma/client"

// export default function DiscoverInfluencers() {
//   const [influencers, setInfluencers] = useState<any[]>([])
//   const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState("all")
//   const [sortBy, setSortBy] = useState("relevance")
//   const [filters, setFilters] = useState({
//     minFollowers: 0,
//     maxFollowers: 1000000,
//     minEngagement: 0,
//     maxEngagement: 20,
//     niche: [],
//     location: "",
//     verified: undefined,
//   })

//   const fetchInfluencers = async () => {
//     setLoading(true)
//     try {
//       // Map the active tab to source filter
//       let sourceFilter: InfluencerSource[] | undefined = undefined
//       if (activeTab !== "all") {
//         const sourceMap: Record<string, InfluencerSource> = {
//           instagram: InfluencerSource.INSTAGRAM_API,
//           "third-party": InfluencerSource.THIRD_PARTY,
//           ai: InfluencerSource.AI_DISCOVERY,
//           portal: InfluencerSource.PORTAL_SIGNUP,
//         }
//         sourceFilter = [sourceMap[activeTab]]
//       }

//       // Map sortBy to actual sort parameters
//       let sortField = "followers"
//       let sortDirection: "asc" | "desc" = "desc"

//       switch (sortBy) {
//         case "followers":
//           sortField = "followers"
//           sortDirection = "desc"
//           break
//         case "engagement":
//           sortField = "engagementRate"
//           sortDirection = "desc"
//           break
//         case "recent":
//           sortField = "createdAt"
//           sortDirection = "desc"
//           break
//       }

//       const result = await discoverInfluencers({
//         source: sourceFilter,
//         search: searchQuery || undefined,
//         minFollowers: filters.minFollowers,
//         maxFollowers: filters.maxFollowers,
//         minEngagement: filters.minEngagement,
//         maxEngagement: filters.maxEngagement,
//         niche: filters.niche.length > 0 ? filters.niche : undefined,
//         location: filters.location || undefined,
//         verified: filters.verified,
//         sortBy: sortField,
//         sortDirection,
//         page: pagination.page,
//         limit: pagination.limit,
//       })

//       if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
//         setInfluencers(result.data.influencers || [])
//         setPagination(result.data.pagination || { total: 0, pages: 0, page: 1, limit: 10 })
//       } else {
//         console.error("Error fetching influencers:", result.data)
//       }
//     } catch (error) {
//       console.error("Error fetching influencers:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchInfluencers()
//   }, [activeTab, sortBy, pagination.page, searchQuery])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     fetchInfluencers()
//   }

//   const handleFilterChange = (newFilters: any) => {
//     setFilters({ ...filters, ...newFilters })
//   }

//   const handleApplyFilters = () => {
//     // Reset to page 1 when applying new filters
//     setPagination((prev) => ({ ...prev, page: 1 }))
//     fetchInfluencers()
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Discover Influencers</h1>
//         <p className="text-muted-foreground">
//           Find the perfect influencers for your campaigns using our multi-source discovery platform.
//         </p>
//       </div>

//       <DataSourceSelector />

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="md:col-span-1">
//           <InfluencerFilters filters={filters} onChange={handleFilterChange} onApply={handleApplyFilters} />
//         </div>

//         <div className="md:col-span-3 space-y-6">
//           <div className="flex items-center space-x-2">
//             <form onSubmit={handleSearch} className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search by name, niche, or keywords..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </form>
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="relevance">Relevance</SelectItem>
//                 <SelectItem value="followers">Followers: High to Low</SelectItem>
//                 <SelectItem value="engagement">Engagement Rate</SelectItem>
//                 <SelectItem value="recent">Recently Added</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//             <TabsList>
//               <TabsTrigger value="all">All Sources</TabsTrigger>
//               <TabsTrigger value="instagram">Instagram API</TabsTrigger>
//               <TabsTrigger value="third-party">Third-Party Data</TabsTrigger>
//               <TabsTrigger value="ai">AI Discovered</TabsTrigger>
//               <TabsTrigger value="portal">Portal Signups</TabsTrigger>
//             </TabsList>

//             <TabsContent value={activeTab} className="space-y-4 mt-4">
//               {loading ? (
//                 <div className="flex justify-center items-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : influencers.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {influencers.map((influencer: any) => (
//                     <InfluencerCard
//                       key={influencer.id}
//                       influencer={influencer}
//                       source={influencer.source.toLowerCase()}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 border rounded-md">
//                   <p className="text-muted-foreground">No influencers found matching your criteria.</p>
//                 </div>
//               )}

//               {pagination.pages > 1 && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
//                     disabled={pagination.page === 1}
//                   >
//                     Previous
//                   </Button>
//                   <span className="flex items-center px-3">
//                     Page {pagination.page} of {pagination.pages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
//                     disabled={pagination.page === pagination.pages}
//                   >
//                     Next
//                   </Button>
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Loader2, AlertCircle } from "lucide-react"
import InfluencerCard from "@/components/global/influencers/influencer-card"
import InfluencerFilters from "@/components/global/influencers/influencer-filters"
import DataSourceSelector from "@/components/global/influencers/data-source-selector"
import { discoverInfluencers } from "@/actions/influencers"
import { InfluencerSource } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"

export default function DiscoverInfluencers() {
  const { toast } = useToast()
  const [influencers, setInfluencers] = useState<any[]>([])
  const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [filters, setFilters] = useState({
    minFollowers: 1000,
    maxFollowers: 1000000,
    minEngagement: 0,
    maxEngagement: 20,
    niche: [] as string[],
    location: "",
    verified: undefined as boolean | undefined,
  })

  const fetchInfluencers = async () => {
    setLoading(true)
    setError(null)
    try {
      // Map the active tab to source filter
      let sourceFilter: InfluencerSource[] | undefined = undefined
      if (activeTab !== "all") {
        const sourceMap: Record<string, InfluencerSource> = {
          instagram: InfluencerSource.INSTAGRAM_API,
          "third-party": InfluencerSource.THIRD_PARTY,
          ai: InfluencerSource.AI_DISCOVERY,
          portal: InfluencerSource.PORTAL_SIGNUP,
        }
        sourceFilter = [sourceMap[activeTab]]
      }

      // Map sortBy to actual sort parameters
      let sortField = "followers"
      let sortDirection: "asc" | "desc" = "desc"

      switch (sortBy) {
        case "followers":
          sortField = "followers"
          sortDirection = "desc"
          break
        case "engagement":
          sortField = "engagementRate"
          sortDirection = "desc"
          break
        case "recent":
          sortField = "createdAt"
          sortDirection = "desc"
          break
      }

      const result = await discoverInfluencers({
        source: sourceFilter,
        search: searchQuery || undefined,
        minFollowers: filters.minFollowers,
        maxFollowers: filters.maxFollowers,
        minEngagement: filters.minEngagement,
        maxEngagement: filters.maxEngagement,
        niche: filters.niche.length > 0 ? filters.niche : undefined,
        location: filters.location || undefined,
        verified: filters.verified,
        sortBy: sortField,
        sortDirection,
        page: pagination.page,
        limit: pagination.limit,
      })

      if (result.status === 200) {
        if (typeof result.data === "object" && result.data !== null) {
          setInfluencers(result.data.influencers || [])
          setPagination(result.data.pagination || { total: 0, pages: 0, page: 1, limit: 10 })
        } else {
          setError("Invalid data format received from server")
          toast({
            title: "Error",
            description: "Invalid data format received from server",
            variant: "destructive",
          })
        }
      } else {
        setError(typeof result.data === "string" ? result.data : "Error fetching influencers")
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result.data : "Error fetching influencers",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch influencers"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error fetching influencers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInfluencers()
  }, [activeTab, sortBy, pagination.page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination((prev) => ({ ...prev, page: 1 }))
    fetchInfluencers()
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
  }

  const handleApplyFilters = () => {
    // Reset to page 1 when applying new filters
    setPagination((prev) => ({ ...prev, page: 1 }))
    fetchInfluencers()
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Discover Influencers</h1>
        <p className="text-muted-foreground">
          Find the perfect influencers for your campaigns using our multi-source discovery platform.
        </p>
      </div>

      <DataSourceSelector />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <InfluencerFilters filters={filters} onChange={handleFilterChange} onApply={handleApplyFilters} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center space-x-2">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, niche, or keywords..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="followers">Followers: High to Low</SelectItem>
                <SelectItem value="engagement">Engagement Rate</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Sources</TabsTrigger>
              <TabsTrigger value="instagram">Instagram API</TabsTrigger>
              <TabsTrigger value="third-party">Third-Party Data</TabsTrigger>
              <TabsTrigger value="ai">AI Discovered</TabsTrigger>
              <TabsTrigger value="portal">Portal Signups</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 border rounded-md">
                  <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                  <p className="text-muted-foreground">{error}</p>
                  <Button onClick={fetchInfluencers} variant="outline" className="mt-4">
                    Retry
                  </Button>
                </div>
              ) : influencers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {influencers.map((influencer: any) => (
                    <InfluencerCard
                      key={influencer.id}
                      influencer={influencer}
                      // source={influencer.source.toLowerCase()}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">No influencers found matching your criteria.</p>
                </div>
              )}

              {pagination.pages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page === 1 || loading}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-3">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                    disabled={pagination.page === pagination.pages || loading}
                  >
                    Next
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

