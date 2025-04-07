// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Search,
//   Filter,
//   X,
//   Save,
//   Download,
//   SlidersHorizontal,
//   Loader2,
//   Instagram,
//   Youtube,
//   Twitter,
//   Users,
//   MapPin,
// } from "lucide-react"
// import { searchInfluencers, saveSearch, getSavedSearches } from "@/actions/business"
// import { useToast } from "@/hooks/use-toast"
// import InfluencerCard from "@/components/global/influencers/influencer-card"

// export default function InfluencerSearchPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [influencers, setInfluencers] = useState<any[]>([])
//   const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 12 })
//   const [savedSearches, setSavedSearches] = useState<any[]>([])
//   const [savingSearch, setSavingSearch] = useState(false)
//   const [searchName, setSearchName] = useState("")
//   const [showSaveDialog, setShowSaveDialog] = useState(false)

//   // Search filters
//   const [filters, setFilters] = useState({
//     query: searchParams.get("q") || "",
//     platforms: [] as string[],
//     minFollowers: 1000,
//     maxFollowers: 1000000,
//     minEngagement: 1,
//     maxEngagement: 20,
//     niches: [] as string[],
//     locations: [] as string[],
//     contentTypes: [] as string[],
//     verified: false,
//     availableForHire: false,
//     sortBy: "relevance",
//   })

//   // Convert follower counts to log scale for slider
//   const minFollowersLog = Math.log10(filters.minFollowers)
//   const maxFollowersLog = Math.log10(filters.maxFollowers)

//   useEffect(() => {
//     // Load saved searches
//     const loadSavedSearches = async () => {
//       try {
//         const result = await getSavedSearches()
//         if (result.status === 200) {
//           setSavedSearches(result?.data)
//         }
//       } catch (error) {
//         console.error("Error loading saved searches:", error)
//       }
//     }

//     loadSavedSearches()

//     // Apply initial search if query parameter exists
//     if (searchParams.get("q")) {
//       handleSearch()
//     }
//   }, [searchParams])

//   const handleSearch = async () => {
//     setLoading(true)

//     try {
//       const result = await searchInfluencers({
//         query: filters.query,
//         platforms: filters.platforms.length > 0 ? filters.platforms : undefined,
//         minFollowers: filters.minFollowers,
//         maxFollowers: filters.maxFollowers,
//         minEngagement: filters.minEngagement,
//         maxEngagement: filters.maxEngagement,
//         niches: filters.niches.length > 0 ? filters.niches : undefined,
//         locations: filters.locations.length > 0 ? filters.locations : undefined,
//         contentTypes: filters.contentTypes.length > 0 ? filters.contentTypes : undefined,
//         verified: filters.verified || undefined,
//         availableForHire: filters.availableForHire || undefined,
//         sortBy: filters.sortBy,
//         page: pagination.page,
//         limit: pagination.limit,
//       })

//       if (result.status === 200) {
//         setInfluencers(result.data.influencers || [])
//         setPagination(result.data.pagination || { total: 0, pages: 0, page: 1, limit: 12 })
//       } else {
//         toast({
//           title: "Search error",
//           description: typeof result.data === "string" ? result.data : "Failed to search influencers",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error searching influencers:", error)
//       toast({
//         title: "Search error",
//         description: "An error occurred while searching. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFilterChange = (key: string, value: any) => {
//     setFilters((prev) => ({ ...prev, [key]: value }))
//   }

//   const handleFollowerRangeChange = (values: number[]) => {
//     // Convert from log scale back to actual values
//     const minFollowers = Math.pow(10, values[0])
//     const maxFollowers = Math.pow(10, values[1])

//     setFilters((prev) => ({
//       ...prev,
//       minFollowers: Math.floor(minFollowers),
//       maxFollowers: Math.ceil(maxFollowers),
//     }))
//   }

//   const handleEngagementRangeChange = (values: number[]) => {
//     setFilters((prev) => ({
//       ...prev,
//       minEngagement: values[0],
//       maxEngagement: values[1],
//     }))
//   }

//   const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
//     if (checked) {
//       setFilters((prev) => ({
//         ...prev,
//         [key]: [...(prev[key as keyof typeof prev] as string[]), value],
//       }))
//     } else {
//       setFilters((prev) => ({
//         ...prev,
//         [key]: (prev[key as keyof typeof prev] as string[]).filter((item) => item !== value),
//       }))
//     }
//   }

//   const handleSwitchChange = (key: string, checked: boolean) => {
//     setFilters((prev) => ({ ...prev, [key]: checked }))
//   }

//   const handleResetFilters = () => {
//     setFilters({
//       query: "",
//       platforms: [],
//       minFollowers: 1000,
//       maxFollowers: 1000000,
//       minEngagement: 1,
//       maxEngagement: 20,
//       niches: [],
//       locations: [],
//       contentTypes: [],
//       verified: false,
//       availableForHire: false,
//       sortBy: "relevance",
//     })
//   }

//   const handleSaveSearch = async () => {
//     if (!searchName.trim()) {
//       toast({
//         title: "Name required",
//         description: "Please enter a name for your saved search",
//         variant: "destructive",
//       })
//       return
//     }

//     setSavingSearch(true)

//     try {
//       const result = await saveSearch({
//         name: searchName,
//         filters,
//       })

//       if (result.status === 200) {
//         toast({
//           title: "Search saved",
//           description: "Your search has been saved successfully",
//         })

//         // Update saved searches list
//         setSavedSearches((prev) => [...prev, result.data])
//         setShowSaveDialog(false)
//         setSearchName("")
//       } else {
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Failed to save search",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error saving search:", error)
//       toast({
//         title: "Error",
//         description: "An error occurred while saving your search",
//         variant: "destructive",
//       })
//     } finally {
//       setSavingSearch(false)
//     }
//   }

//   const applySavedSearch = (savedSearch: any) => {
//     setFilters(savedSearch.filters)
//     handleSearch()
//   }

//   const formatNumber = (num: number) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + "M"
//     } else if (num >= 1000) {
//       return (num / 1000).toFixed(1) + "K"
//     }
//     return num.toString()
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Find Influencers</h1>
//         <p className="text-muted-foreground">
//           Discover and connect with influencers that match your brand and campaign needs
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="md:col-span-1 space-y-6">
//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Filter className="h-4 w-4 mr-2" />
//                   Filters
//                 </div>
//                 <Button variant="ghost" size="sm" onClick={handleResetFilters}>
//                   <X className="h-4 w-4 mr-1" />
//                   Reset
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               <div className="space-y-1.5">
//                 <Label htmlFor="followers-range">Followers</Label>
//                 <div className="flex items-center justify-between text-xs text-muted-foreground">
//                   <span>{formatNumber(filters.minFollowers)}</span>
//                   <span>{formatNumber(filters.maxFollowers)}</span>
//                 </div>
//                 <Slider
//                   id="followers-range"
//                   value={[minFollowersLog, maxFollowersLog]}
//                   min={3}
//                   max={7}
//                   step={0.1}
//                   onValueChange={handleFollowerRangeChange}
//                   className="my-2"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <Label htmlFor="engagement-range">Engagement Rate (%)</Label>
//                 <div className="flex items-center justify-between text-xs text-muted-foreground">
//                   <span>{filters.minEngagement}%</span>
//                   <span>{filters.maxEngagement}%</span>
//                 </div>
//                 <Slider
//                   id="engagement-range"
//                   value={[filters.minEngagement, filters.maxEngagement]}
//                   min={0}
//                   max={20}
//                   step={0.5}
//                   onValueChange={handleEngagementRangeChange}
//                   className="my-2"
//                 />
//               </div>

//               <Accordion type="multiple" className="w-full">
//                 <AccordionItem value="platforms">
//                   <AccordionTrigger className="py-2">Platforms</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="space-y-2">
//                       {[
//                         { id: "instagram", label: "Instagram", icon: Instagram },
//                         { id: "youtube", label: "YouTube", icon: Youtube },
//                         { id: "twitter", label: "Twitter", icon: Twitter },
//                         { id: "tiktok", label: "TikTok", icon: Users },
//                       ].map((platform) => (
//                         <div key={platform.id} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={`platform-${platform.id}`}
//                             checked={filters.platforms.includes(platform.id)}
//                             onCheckedChange={(checked) =>
//                               handleCheckboxChange("platforms", platform.id, checked as boolean)
//                             }
//                           />
//                           <Label htmlFor={`platform-${platform.id}`} className="flex items-center cursor-pointer">
//                             <platform.icon className="h-4 w-4 mr-1" />
//                             {platform.label}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="niches">
//                   <AccordionTrigger className="py-2">Niches</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="grid grid-cols-2 gap-2">
//                       {[
//                         "Fashion",
//                         "Beauty",
//                         "Fitness",
//                         "Travel",
//                         "Food",
//                         "Lifestyle",
//                         "Technology",
//                         "Gaming",
//                         "Business",
//                         "Education",
//                       ].map((niche) => (
//                         <div key={niche} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={`niche-${niche}`}
//                             checked={filters.niches.includes(niche.toLowerCase())}
//                             onCheckedChange={(checked) =>
//                               handleCheckboxChange("niches", niche.toLowerCase(), checked as boolean)
//                             }
//                           />
//                           <Label htmlFor={`niche-${niche}`} className="cursor-pointer">
//                             {niche}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="location">
//                   <AccordionTrigger className="py-2">Location</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="space-y-2">
//                       <div className="grid grid-cols-2 gap-2">
//                         {["North America", "Europe", "Asia", "Australia", "South America", "Africa", "Middle East"].map(
//                           (location) => (
//                             <div key={location} className="flex items-center space-x-2">
//                               <Checkbox
//                                 id={`location-${location}`}
//                                 checked={filters.locations.includes(location.toLowerCase())}
//                                 onCheckedChange={(checked) =>
//                                   handleCheckboxChange("locations", location.toLowerCase(), checked as boolean)
//                                 }
//                               />
//                               <Label htmlFor={`location-${location}`} className="cursor-pointer">
//                                 {location}
//                               </Label>
//                             </div>
//                           ),
//                         )}
//                       </div>

//                       <div className="pt-2">
//                         <Label htmlFor="location-search">Search Location</Label>
//                         <div className="relative mt-1">
//                           <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                           <Input id="location-search" placeholder="City or Country" className="pl-8" />
//                         </div>
//                       </div>
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="content-types">
//                   <AccordionTrigger className="py-2">Content Types</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="grid grid-cols-2 gap-2">
//                       {["Photos", "Videos", "Reels", "Stories", "Reviews", "Tutorials", "Livestreams"].map((type) => (
//                         <div key={type} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={`content-${type}`}
//                             checked={filters.contentTypes.includes(type.toLowerCase())}
//                             onCheckedChange={(checked) =>
//                               handleCheckboxChange("contentTypes", type.toLowerCase(), checked as boolean)
//                             }
//                           />
//                           <Label htmlFor={`content-${type}`} className="cursor-pointer">
//                             {type}
//                           </Label>
//                         </div>
//                       ))}
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>

//               <div className="space-y-3 pt-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="verified" className="cursor-pointer">
//                     Verified Profiles Only
//                   </Label>
//                   <Switch
//                     id="verified"
//                     checked={filters.verified}
//                     onCheckedChange={(checked) => handleSwitchChange("verified", checked)}
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="available" className="cursor-pointer">
//                     Available for Hire
//                   </Label>
//                   <Switch
//                     id="available"
//                     checked={filters.availableForHire}
//                     onCheckedChange={(checked) => handleSwitchChange("availableForHire", checked)}
//                   />
//                 </div>
//               </div>

//               <div className="pt-2 space-y-2">
//                 <Button className="w-full" onClick={handleSearch}>
//                   Apply Filters
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg flex items-center">
//                 <Save className="h-4 w-4 mr-2" />
//                 Saved Searches
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {savedSearches.length > 0 ? (
//                 <div className="space-y-2">
//                   {savedSearches.map((search) => (
//                     <div
//                       key={search.id}
//                       className="flex items-center justify-between p-2 border rounded-md hover:bg-muted cursor-pointer"
//                       onClick={() => applySavedSearch(search)}
//                     >
//                       <div>
//                         <p className="font-medium">{search.name}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {search.filters.niches.length > 0 ? search.filters.niches.join(", ") : "All niches"}
//                         </p>
//                       </div>
//                       <Button variant="ghost" size="sm">
//                         Apply
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-muted-foreground text-center py-2">No saved searches yet</p>
//               )}

//               {showSaveDialog ? (
//                 <div className="space-y-3 pt-2 border-t">
//                   <Label htmlFor="search-name">Save Current Search</Label>
//                   <Input
//                     id="search-name"
//                     placeholder="Enter a name for this search"
//                     value={searchName}
//                     onChange={(e) => setSearchName(e.target.value)}
//                   />
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowSaveDialog(false)}>
//                       Cancel
//                     </Button>
//                     <Button size="sm" className="flex-1" onClick={handleSaveSearch} disabled={savingSearch}>
//                       {savingSearch ? (
//                         <>
//                           <Loader2 className="h-4 w-4 mr-1 animate-spin" />
//                           Saving...
//                         </>
//                       ) : (
//                         "Save"
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <Button variant="outline" className="w-full" onClick={() => setShowSaveDialog(true)}>
//                   <Save className="h-4 w-4 mr-1" />
//                   Save Current Search
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="md:col-span-3 space-y-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault()
//                   handleSearch()
//                 }}
//                 className="relative"
//               >
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by name, niche, or keywords..."
//                   className="pl-10"
//                   value={filters.query}
//                   onChange={(e) => handleFilterChange("query", e.target.value)}
//                 />
//               </form>
//             </div>

//             <div className="flex items-center gap-2">
//               <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="relevance">Relevance</SelectItem>
//                   <SelectItem value="followers_high">Followers: High to Low</SelectItem>
//                   <SelectItem value="followers_low">Followers: Low to High</SelectItem>
//                   <SelectItem value="engagement">Engagement Rate</SelectItem>
//                   <SelectItem value="recent">Recently Active</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Button variant="outline" className="md:hidden" onClick={() => {}}>
//                 <SlidersHorizontal className="h-4 w-4" />
//               </Button>

//               <Button variant="outline" onClick={() => {}}>
//                 <Download className="h-4 w-4 mr-2" />
//                 Export
//               </Button>
//             </div>
//           </div>

//           {/* Active filters display */}
//           {(filters.platforms.length > 0 ||
//             filters.niches.length > 0 ||
//             filters.locations.length > 0 ||
//             filters.contentTypes.length > 0 ||
//             filters.verified ||
//             filters.availableForHire) && (
//             <div className="flex flex-wrap gap-2 items-center">
//               <span className="text-sm text-muted-foreground">Active filters:</span>

//               {filters.platforms.map((platform) => (
//                 <Badge key={platform} variant="secondary" className="flex items-center gap-1">
//                   {platform}
//                   <X
//                     className="h-3 w-3 ml-1 cursor-pointer"
//                     onClick={() => handleCheckboxChange("platforms", platform, false)}
//                   />
//                 </Badge>
//               ))}

//               {filters.niches.map((niche) => (
//                 <Badge key={niche} variant="secondary" className="flex items-center gap-1">
//                   {niche}
//                   <X
//                     className="h-3 w-3 ml-1 cursor-pointer"
//                     onClick={() => handleCheckboxChange("niches", niche, false)}
//                   />
//                 </Badge>
//               ))}

//               {filters.locations.map((location) => (
//                 <Badge key={location} variant="secondary" className="flex items-center gap-1">
//                   {location}
//                   <X
//                     className="h-3 w-3 ml-1 cursor-pointer"
//                     onClick={() => handleCheckboxChange("locations", location, false)}
//                   />
//                 </Badge>
//               ))}

//               {filters.contentTypes.map((type) => (
//                 <Badge key={type} variant="secondary" className="flex items-center gap-1">
//                   {type}
//                   <X
//                     className="h-3 w-3 ml-1 cursor-pointer"
//                     onClick={() => handleCheckboxChange("contentTypes", type, false)}
//                   />
//                 </Badge>
//               ))}

//               {filters.verified && (
//                 <Badge variant="secondary" className="flex items-center gap-1">
//                   Verified
//                   <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleSwitchChange("verified", false)} />
//                 </Badge>
//               )}

//               {filters.availableForHire && (
//                 <Badge variant="secondary" className="flex items-center gap-1">
//                   Available for Hire
//                   <X
//                     className="h-3 w-3 ml-1 cursor-pointer"
//                     onClick={() => handleSwitchChange("availableForHire", false)}
//                   />
//                 </Badge>
//               )}

//               <Button variant="ghost" size="sm" onClick={handleResetFilters}>
//                 Clear All
//               </Button>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//           ) : influencers.length > 0 ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {influencers.map((influencer) => (
//                   <InfluencerCard key={influencer.id} influencer={influencer} showActions={true} />
//                 ))}
//               </div>

//               {pagination.pages > 1 && (
//                 <div className="flex justify-center mt-6">
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))
//                         handleSearch()
//                       }}
//                       disabled={pagination.page === 1}
//                     >
//                       Previous
//                     </Button>

//                     <span className="text-sm">
//                       Page {pagination.page} of {pagination.pages}
//                     </span>

//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         setPagination((prev) => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))
//                         handleSearch()
//                       }}
//                       disabled={pagination.page === pagination.pages}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-12 border rounded-md">
//               <Search className="h-12 w-12 text-muted-foreground mb-4" />
//               <h3 className="text-lg font-medium">No influencers found</h3>
//               <p className="text-muted-foreground mt-1 mb-4">Try adjusting your filters or search terms</p>
//               <Button onClick={handleResetFilters}>Reset Filters</Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  X,
  Save,
  Download,
  SlidersHorizontal,
  Loader2,
  Instagram,
  Youtube,
  Twitter,
  Users,
  MapPin,
} from "lucide-react"
import { searchInfluencers, saveSearch, getSavedSearches } from "@/actions/business"
import { useToast } from "@/hooks/use-toast"
import InfluencerCard from "@/components/global/influencers/influencer-card"

export default function InfluencerSearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [influencers, setInfluencers] = useState<any[]>([])
  const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 12 })
  const [savedSearches, setSavedSearches] = useState<any[]>([])
  const [savingSearch, setSavingSearch] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // Search filters
  const [filters, setFilters] = useState({
    query: searchParams.get("q") || "",
    platforms: [] as string[],
    minFollowers: 1000,
    maxFollowers: 1000000,
    minEngagement: 1,
    maxEngagement: 20,
    niches: [] as string[],
    locations: [] as string[],
    contentTypes: [] as string[],
    verified: false,
    availableForHire: false,
    sortBy: "relevance",
  })

  // Convert follower counts to log scale for slider
  const minFollowersLog = Math.log10(filters.minFollowers)
  const maxFollowersLog = Math.log10(filters.maxFollowers)

  useEffect(() => {
    // Load saved searches
    const loadSavedSearches = async () => {
      try {
        const result = await getSavedSearches()
        if (result.status === 200 && result.data) {
          setSavedSearches(result.data)
        }
      } catch (error) {
        console.error("Error loading saved searches:", error)
      }
    }

    loadSavedSearches()

    // Apply initial search if query parameter exists
    if (searchParams.get("q")) {
      handleSearch()
    }
  }, [searchParams])

  const handleSearch = async () => {
    setLoading(true)

    try {
      const result = await searchInfluencers({
        search: filters.query, // Changed from query to search
        platforms: filters.platforms.length > 0 ? filters.platforms : undefined,
        minFollowers: filters.minFollowers,
        maxFollowers: filters.maxFollowers,
        minEngagementRate: filters.minEngagement, // This might need to be changed too
        maxEngagementRate: filters.maxEngagement, // This might need to be changed too
        niche: filters.niches.length > 0 ? filters.niches[0] : undefined, // Changed from niches array to single niche
        location: filters.locations.length > 0 ? filters.locations[0] : undefined, // Note: API seems to accept a single location
        isAvailableForHire: filters.availableForHire || undefined,
        page: pagination.page,
        limit: pagination.limit,
      })

      if (result.status === 200 && result.data) {
        setInfluencers(result.data.influencers || [])
        setPagination(result.data.pagination || { total: 0, pages: 0, page: 1, limit: 12 })
      } else {
        toast({
          title: "Search error",
          description: result.error || "Failed to search influencers",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error searching influencers:", error)
      toast({
        title: "Search error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleFollowerRangeChange = (values: number[]) => {
    // Convert from log scale back to actual values
    const minFollowers = Math.pow(10, values[0])
    const maxFollowers = Math.pow(10, values[1])

    setFilters((prev) => ({
      ...prev,
      minFollowers: Math.floor(minFollowers),
      maxFollowers: Math.ceil(maxFollowers),
    }))
  }

  const handleEngagementRangeChange = (values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minEngagement: values[0],
      maxEngagement: values[1],
    }))
  }

  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    if (checked) {
      setFilters((prev) => ({
        ...prev,
        [key]: [...(prev[key as keyof typeof prev] as string[]), value],
      }))
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: (prev[key as keyof typeof prev] as string[]).filter((item) => item !== value),
      }))
    }
  }

  const handleSwitchChange = (key: string, checked: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: checked }))
  }

  const handleResetFilters = () => {
    setFilters({
      query: "",
      platforms: [],
      minFollowers: 1000,
      maxFollowers: 1000000,
      minEngagement: 1,
      maxEngagement: 20,
      niches: [],
      locations: [],
      contentTypes: [],
      verified: false,
      availableForHire: false,
      sortBy: "relevance",
    })
  }

  const handleSaveSearch = async () => {
    if (!searchName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your saved search",
        variant: "destructive",
      })
      return
    }

    setSavingSearch(true)

    try {
      const result = await saveSearch({
        name: searchName,
        filters,
      })

      if (result.status === 200 && result.data) {
        toast({
          title: "Search saved",
          description: "Your search has been saved successfully",
        })

        // Update saved searches list
        setSavedSearches((prev) => [...prev, result.data])
        setShowSaveDialog(false)
        setSearchName("")
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save search",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving search:", error)
      toast({
        title: "Error",
        description: "An error occurred while saving your search",
        variant: "destructive",
      })
    } finally {
      setSavingSearch(false)
    }
  }

  const applySavedSearch = (savedSearch: any) => {
    setFilters(savedSearch.filters)
    handleSearch()
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Find Influencers</h1>
        <p className="text-muted-foreground">
          Discover and connect with influencers that match your brand and campaign needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </div>
                <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="followers-range">Followers</Label>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatNumber(filters.minFollowers)}</span>
                  <span>{formatNumber(filters.maxFollowers)}</span>
                </div>
                <Slider
                  id="followers-range"
                  value={[minFollowersLog, maxFollowersLog]}
                  min={3}
                  max={7}
                  step={0.1}
                  onValueChange={handleFollowerRangeChange}
                  className="my-2"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="engagement-range">Engagement Rate (%)</Label>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{filters.minEngagement}%</span>
                  <span>{filters.maxEngagement}%</span>
                </div>
                <Slider
                  id="engagement-range"
                  value={[filters.minEngagement, filters.maxEngagement]}
                  min={0}
                  max={20}
                  step={0.5}
                  onValueChange={handleEngagementRangeChange}
                  className="my-2"
                />
              </div>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="platforms">
                  <AccordionTrigger className="py-2">Platforms</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[
                        { id: "instagram", label: "Instagram", icon: Instagram },
                        { id: "youtube", label: "YouTube", icon: Youtube },
                        { id: "twitter", label: "Twitter", icon: Twitter },
                        { id: "tiktok", label: "TikTok", icon: Users },
                      ].map((platform) => (
                        <div key={platform.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`platform-${platform.id}`}
                            checked={filters.platforms.includes(platform.id)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("platforms", platform.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={`platform-${platform.id}`} className="flex items-center cursor-pointer">
                            <platform.icon className="h-4 w-4 mr-1" />
                            {platform.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="niches">
                  <AccordionTrigger className="py-2">Niches</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Fashion",
                        "Beauty",
                        "Fitness",
                        "Travel",
                        "Food",
                        "Lifestyle",
                        "Technology",
                        "Gaming",
                        "Business",
                        "Education",
                      ].map((niche) => (
                        <div key={niche} className="flex items-center space-x-2">
                          <Checkbox
                            id={`niche-${niche}`}
                            checked={filters.niches.includes(niche.toLowerCase())}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("niches", niche.toLowerCase(), checked as boolean)
                            }
                          />
                          <Label htmlFor={`niche-${niche}`} className="cursor-pointer">
                            {niche}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="location">
                  <AccordionTrigger className="py-2">Location</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {["North America", "Europe", "Asia", "Australia", "South America", "Africa", "Middle East"].map(
                          (location) => (
                            <div key={location} className="flex items-center space-x-2">
                              <Checkbox
                                id={`location-${location}`}
                                checked={filters.locations.includes(location.toLowerCase())}
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange("locations", location.toLowerCase(), checked as boolean)
                                }
                              />
                              <Label htmlFor={`location-${location}`} className="cursor-pointer">
                                {location}
                              </Label>
                            </div>
                          ),
                        )}
                      </div>

                      <div className="pt-2">
                        <Label htmlFor="location-search">Search Location</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="location-search" placeholder="City or Country" className="pl-8" />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="content-types">
                  <AccordionTrigger className="py-2">Content Types</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {["Photos", "Videos", "Reels", "Stories", "Reviews", "Tutorials", "Livestreams"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`content-${type}`}
                            checked={filters.contentTypes.includes(type.toLowerCase())}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("contentTypes", type.toLowerCase(), checked as boolean)
                            }
                          />
                          <Label htmlFor={`content-${type}`} className="cursor-pointer">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified" className="cursor-pointer">
                    Verified Profiles Only
                  </Label>
                  <Switch
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(checked) => handleSwitchChange("verified", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="available" className="cursor-pointer">
                    Available for Hire
                  </Label>
                  <Switch
                    id="available"
                    checked={filters.availableForHire}
                    onCheckedChange={(checked) => handleSwitchChange("availableForHire", checked)}
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button className="w-full" onClick={handleSearch}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Saved Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedSearches.length > 0 ? (
                <div className="space-y-2">
                  {savedSearches.map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center justify-between p-2 border rounded-md hover:bg-muted cursor-pointer"
                      onClick={() => applySavedSearch(search)}
                    >
                      <div>
                        <p className="font-medium">{search.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {search.filters.niches.length > 0 ? search.filters.niches.join(", ") : "All niches"}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Apply
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">No saved searches yet</p>
              )}

              {showSaveDialog ? (
                <div className="space-y-3 pt-2 border-t">
                  <Label htmlFor="search-name">Save Current Search</Label>
                  <Input
                    id="search-name"
                    placeholder="Enter a name for this search"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowSaveDialog(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" className="flex-1" onClick={handleSaveSearch} disabled={savingSearch}>
                      {savingSearch ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => setShowSaveDialog(true)}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Current Search
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSearch()
                }}
                className="relative"
              >
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, niche, or keywords..."
                  className="pl-10"
                  value={filters.query}
                  onChange={(e) => handleFilterChange("query", e.target.value)}
                />
              </form>
            </div>

            <div className="flex items-center gap-2">
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="followers_high">Followers: High to Low</SelectItem>
                  <SelectItem value="followers_low">Followers: Low to High</SelectItem>
                  <SelectItem value="engagement">Engagement Rate</SelectItem>
                  <SelectItem value="recent">Recently Active</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="md:hidden" onClick={() => {}}>
                <SlidersHorizontal className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => {}}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Active filters display */}
          {(filters.platforms.length > 0 ||
            filters.niches.length > 0 ||
            filters.locations.length > 0 ||
            filters.contentTypes.length > 0 ||
            filters.verified ||
            filters.availableForHire) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>

              {filters.platforms.map((platform) => (
                <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                  {platform}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleCheckboxChange("platforms", platform, false)}
                  />
                </Badge>
              ))}

              {filters.niches.map((niche) => (
                <Badge key={niche} variant="secondary" className="flex items-center gap-1">
                  {niche}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleCheckboxChange("niches", niche, false)}
                  />
                </Badge>
              ))}

              {filters.locations.map((location) => (
                <Badge key={location} variant="secondary" className="flex items-center gap-1">
                  {location}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleCheckboxChange("locations", location, false)}
                  />
                </Badge>
              ))}

              {filters.contentTypes.map((type) => (
                <Badge key={type} variant="secondary" className="flex items-center gap-1">
                  {type}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleCheckboxChange("contentTypes", type, false)}
                  />
                </Badge>
              ))}

              {filters.verified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Verified
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleSwitchChange("verified", false)} />
                </Badge>
              )}

              {filters.availableForHire && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Available for Hire
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleSwitchChange("availableForHire", false)}
                  />
                </Badge>
              )}

              <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                Clear All
              </Button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : influencers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {influencers.map((influencer) => (
                  <InfluencerCard key={influencer.id} influencer={influencer} showActions={true} />
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))
                        handleSearch()
                      }}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>

                    <span className="text-sm">
                      Page {pagination.page} of {pagination.pages}
                    </span>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setPagination((prev) => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))
                        handleSearch()
                      }}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border rounded-md">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No influencers found</h3>
              <p className="text-muted-foreground mt-1 mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={handleResetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

