// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { PlusCircle, Search, Filter, Calendar, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { getAllCampaigns } from "@/actions/campaigns"
// import type { MyCampaignStatus } from "@prisma/client"
// import { format } from "date-fns"

// export default function CampaignsPage() {
//   const [campaigns, setCampaigns] = useState([])
//   const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState<MyCampaignStatus | "ALL">("ALL")
//   const [sortBy, setSortBy] = useState("createdAt")
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

//   const fetchCampaigns = async () => {
//     setLoading(true)
//     try {
//       // Map the active tab to status filter
//       let statusFilter: MyCampaignStatus[] | undefined = undefined
//       if (activeTab !== "ALL") {
//         statusFilter = [activeTab]
//       }

//       const result = await getAllCampaigns({
//         status: statusFilter,
//         search: searchQuery || undefined,
//         sortBy,
//         sortDirection,
//         page: pagination.page,
//         limit: pagination.limit,
//       })

//       if (result.status === 200) {
//         setCampaigns(result.data.campaigns)
//         setPagination(result.data.pagination)
//       } else {
//         console.error("Error fetching campaigns:", result.data)
//       }
//     } catch (error) {
//       console.error("Error fetching campaigns:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCampaigns()
//   }, [activeTab, sortBy, sortDirection, pagination.page])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     fetchCampaigns()
//   }

//   const getStatusBadge = (status: MyCampaignStatus) => {
//     switch (status) {
//       case "DRAFT":
//         return <Badge variant="outline">Draft</Badge>
//       case "PLANNED":
//         return <Badge variant="secondary">Planned</Badge>
//       case "ACTIVE":
//         return <Badge variant="default">Active</Badge>
//       case "PAUSED":
//         return (
//           <Badge variant="outline" className="text-yellow-500 border-yellow-500">
//             Paused
//           </Badge>
//         )
//       case "COMPLETED":
//         return (
//           <Badge variant="outline" className="text-green-500 border-green-500">
//             Completed
//           </Badge>
//         )
//       case "CANCELLED":
//         return (
//           <Badge variant="outline" className="text-red-500 border-red-500">
//             Cancelled
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
//           <p className="text-muted-foreground">Create and manage your influencer marketing campaigns</p>
//         </div>
//         <Link href="/campaigns/new">
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             New Campaign
//           </Button>
//         </Link>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Campaign Management</CardTitle>
//           <CardDescription>View and manage all your influencer marketing campaigns</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-between mb-4">
//             <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search campaigns..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </form>
//             <div className="flex items-center space-x-2">
//               <Button variant="outline">
//                 <Filter className="mr-2 h-4 w-4" />
//                 Filter
//               </Button>
//               <Button variant="outline">
//                 <Calendar className="mr-2 h-4 w-4" />
//                 Date Range
//               </Button>
//             </div>
//           </div>

//           <Tabs
//             defaultValue="ALL"
//             value={activeTab}
//             onValueChange={(value) => setActiveTab(value as MyCampaignStatus | "ALL")}
//           >
//             <TabsList>
//               <TabsTrigger value="ALL">All</TabsTrigger>
//               <TabsTrigger value="DRAFT">Draft</TabsTrigger>
//               <TabsTrigger value="PLANNED">Planned</TabsTrigger>
//               <TabsTrigger value="ACTIVE">Active</TabsTrigger>
//               <TabsTrigger value="PAUSED">Paused</TabsTrigger>
//               <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
//             </TabsList>

//             <TabsContent value={activeTab} className="mt-4">
//               {loading ? (
//                 <div className="flex justify-center items-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : campaigns.length > 0 ? (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Influencers</TableHead>
//                       <TableHead>Start Date</TableHead>
//                       <TableHead>End Date</TableHead>
//                       <TableHead>Budget</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {campaigns.map((campaign: any) => (
//                       <TableRow key={campaign.id}>
//                         <TableCell className="font-medium">{campaign.name}</TableCell>
//                         <TableCell>{getStatusBadge(campaign.status)}</TableCell>
//                         <TableCell>{campaign._count?.influencers || 0}</TableCell>
//                         <TableCell>
//                           {campaign.startDate ? format(new Date(campaign.startDate), "MMM d, yyyy") : "Not set"}
//                         </TableCell>
//                         <TableCell>
//                           {campaign.endDate ? format(new Date(campaign.endDate), "MMM d, yyyy") : "Not set"}
//                         </TableCell>
//                         <TableCell>${campaign.budget?.toLocaleString() || "N/A"}</TableCell>
//                         <TableCell className="text-right">
//                           <Link href={`/campaigns/${campaign.id}`}>
//                             <Button variant="outline" size="sm">
//                               View
//                             </Button>
//                           </Link>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               ) : (
//                 <div className="text-center py-12 border rounded-md">
//                   <p className="text-muted-foreground">No campaigns found.</p>
//                   <Link href="/campaigns/new">
//                     <Button className="mt-4">Create Your First Campaign</Button>
//                   </Link>
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
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { PlusCircle, Search, Filter, Calendar, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { getAllCampaigns } from "@/actions/campaigns"
// import type { MyCampaignStatus } from "@prisma/client"
// import { format } from "date-fns"

// export default function CampaignsPage() {
//   const [campaigns, setCampaigns] = useState([])
//   const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState<MyCampaignStatus | "ALL">("ALL")
//   const [sortBy, setSortBy] = useState("createdAt")
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

//   const fetchCampaigns = async () => {
//     setLoading(true)
//     try {
//       // Map the active tab to status filter
//       let statusFilter: MyCampaignStatus[] | undefined = undefined
//       if (activeTab !== "ALL") {
//         statusFilter = [activeTab]
//       }

//       const result = await getAllCampaigns({
//         status: statusFilter,
//         search: searchQuery || undefined,
//         sortBy,
//         sortDirection,
//         page: pagination.page,
//         limit: pagination.limit,
//       })

//       if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
//         setCampaigns(result.data.campaigns || [])
//         setPagination(result.data.pagination || { total: 0, pages: 0, page: 1, limit: 10 })
//       } else {
//         console.error("Error fetching campaigns:", result.data)
//       }
//     } catch (error) {
//       console.error("Error fetching campaigns:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCampaigns()
//   }, [activeTab, sortBy, sortDirection, pagination.page])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     fetchCampaigns()
//   }

//   const getStatusBadge = (status: MyCampaignStatus) => {
//     switch (status) {
//       case "DRAFT":
//         return <Badge variant="outline">Draft</Badge>
//       case "PLANNED":
//         return <Badge variant="secondary">Planned</Badge>
//       case "ACTIVE":
//         return <Badge variant="default">Active</Badge>
//       case "PAUSED":
//         return (
//           <Badge variant="outline" className="text-yellow-500 border-yellow-500">
//             Paused
//           </Badge>
//         )
//       case "COMPLETED":
//         return (
//           <Badge variant="outline" className="text-green-500 border-green-500">
//             Completed
//           </Badge>
//         )
//       case "CANCELLED":
//         return (
//           <Badge variant="outline" className="text-red-500 border-red-500">
//             Cancelled
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
//           <p className="text-muted-foreground">Create and manage your influencer marketing campaigns</p>
//         </div>
//         <Link href="/campaigns/new">
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             New Campaign
//           </Button>
//         </Link>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Campaign Management</CardTitle>
//           <CardDescription>View and manage all your influencer marketing campaigns</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-between mb-4">
//             <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search campaigns..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </form>
//             <div className="flex items-center space-x-2">
//               <Button variant="outline">
//                 <Filter className="mr-2 h-4 w-4" />
//                 Filter
//               </Button>
//               <Button variant="outline">
//                 <Calendar className="mr-2 h-4 w-4" />
//                 Date Range
//               </Button>
//             </div>
//           </div>

//           <Tabs
//             defaultValue="ALL"
//             value={activeTab}
//             onValueChange={(value) => setActiveTab(value as MyCampaignStatus | "ALL")}
//           >
//             <TabsList>
//               <TabsTrigger value="ALL">All</TabsTrigger>
//               <TabsTrigger value="DRAFT">Draft</TabsTrigger>
//               <TabsTrigger value="PLANNED">Planned</TabsTrigger>
//               <TabsTrigger value="ACTIVE">Active</TabsTrigger>
//               <TabsTrigger value="PAUSED">Paused</TabsTrigger>
//               <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
//             </TabsList>

//             <TabsContent value={activeTab} className="mt-4">
//               {loading ? (
//                 <div className="flex justify-center items-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : campaigns.length > 0 ? (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Influencers</TableHead>
//                       <TableHead>Start Date</TableHead>
//                       <TableHead>End Date</TableHead>
//                       <TableHead>Budget</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {campaigns.map((campaign: any) => (
//                       <TableRow key={campaign.id}>
//                         <TableCell className="font-medium">{campaign.name}</TableCell>
//                         <TableCell>{getStatusBadge(campaign.status)}</TableCell>
//                         <TableCell>{campaign._count?.influencers || 0}</TableCell>
//                         <TableCell>
//                           {campaign.startDate ? format(new Date(campaign.startDate), "MMM d, yyyy") : "Not set"}
//                         </TableCell>
//                         <TableCell>
//                           {campaign.endDate ? format(new Date(campaign.endDate), "MMM d, yyyy") : "Not set"}
//                         </TableCell>
//                         <TableCell>${campaign.budget?.toLocaleString() || "N/A"}</TableCell>
//                         <TableCell className="text-right">
//                           <Link href={`/campaigns/${campaign.id}`}>
//                             <Button variant="outline" size="sm">
//                               View
//                             </Button>
//                           </Link>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               ) : (
//                 <div className="text-center py-12 border rounded-md">
//                   <p className="text-muted-foreground">No campaigns found.</p>
//                   <Link href="/campaigns/new">
//                     <Button className="mt-4">Create Your First Campaign</Button>
//                   </Link>
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
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { PlusCircle, Search, Filter, Calendar, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { getAllCampaigns } from "@/actions/campaigns"
// import type { MyCampaignStatus } from "@prisma/client"
// import { format } from "date-fns"

// export default function CampaignsPage() {
//   const [campaigns, setCampaigns] = useState<any[]>([])
//   const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState<MyCampaignStatus | "ALL">("ALL")
//   const [sortBy, setSortBy] = useState("createdAt")
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

//   const fetchCampaigns = async () => {
//     setLoading(true)
//     try {
//       // Map the active tab to status filter
//       let statusFilter: MyCampaignStatus[] | undefined = undefined
//       if (activeTab !== "ALL") {
//         statusFilter = [activeTab]
//       }

//       const result = await getAllCampaigns({
//         status: statusFilter,
//         search: searchQuery || undefined,
//         sortBy,
//         sortDirection,
//         page: pagination.page,
//         limit: pagination.limit,
//       })

//       if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
//         setCampaigns(result.data.campaigns || [])
//         setPagination(result.data.pagination || { total: 0, pages: 0, page: 1, limit: 10 })
//       } else {
//         console.error("Error fetching campaigns:", result.data)
//       }
//     } catch (error) {
//       console.error("Error fetching campaigns:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCampaigns()
//   }, [activeTab, sortBy, sortDirection, pagination.page])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     fetchCampaigns()
//   }

//   const getStatusBadge = (status: MyCampaignStatus) => {
//     switch (status) {
//       case "DRAFT":
//         return <Badge variant="outline">Draft</Badge>
//       case "PLANNED":
//         return <Badge variant="secondary">Planned</Badge>
//       case "ACTIVE":
//         return <Badge variant="default">Active</Badge>
//       case "PAUSED":
//         return (
//           <Badge variant="outline" className="text-yellow-500 border-yellow-500">
//             Paused
//           </Badge>
//         )
//       case "COMPLETED":
//         return (
//           <Badge variant="outline" className="text-green-500 border-green-500">
//             Completed
//           </Badge>
//         )
//       case "CANCELLED":
//         return (
//           <Badge variant="outline" className="text-red-500 border-red-500">
//             Cancelled
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
//           <p className="text-muted-foreground">Create and manage your influencer marketing campaigns</p>
//         </div>
//         <Link href="/campaigns/new">
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             New Campaign
//           </Button>
//         </Link>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Campaign Management</CardTitle>
//           <CardDescription>View and manage all your influencer marketing campaigns</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-between mb-4">
//             <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search campaigns..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </form>
//             <div className="flex items-center space-x-2">
//               <Button variant="outline">
//                 <Filter className="mr-2 h-4 w-4" />
//                 Filter
//               </Button>
//               <Button variant="outline">
//                 <Calendar className="mr-2 h-4 w-4" />
//                 Date Range
//               </Button>
//             </div>
//           </div>

//           <Tabs
//             defaultValue="ALL"
//             value={activeTab}
//             onValueChange={(value) => setActiveTab(value as MyCampaignStatus | "ALL")}
//           >
//             <TabsList>
//               <TabsTrigger value="ALL">All</TabsTrigger>
//               <TabsTrigger value="DRAFT">Draft</TabsTrigger>
//               <TabsTrigger value="PLANNED">Planned</TabsTrigger>
//               <TabsTrigger value="ACTIVE">Active</TabsTrigger>
//               <TabsTrigger value="PAUSED">Paused</TabsTrigger>
//               <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
//             </TabsList>

//             <TabsContent value={activeTab} className="mt-4">
//               {loading ? (
//                 <div className="flex justify-center items-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : campaigns.length > 0 ? (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Influencers</TableHead>
//                       <TableHead>Start Date</TableHead>
//                       <TableHead>End Date</TableHead>
//                       <TableHead>Budget</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {campaigns.map((campaign: any) => (
//                       <TableRow key={campaign.id}>
//                         <TableCell className="font-medium">{campaign.name}</TableCell>
//                         <TableCell>{getStatusBadge(campaign.status)}</TableCell>
//                         <TableCell>{campaign._count?.influencers || 0}</TableCell>
//                         <TableCell>
//                           {campaign.startDate ? format(new Date(campaign.startDate), "MMM d, yyyy") : "Not set"}
//                         </TableCell>
//                         <TableCell>
//                           {campaign.endDate ? format(new Date(campaign.endDate), "MMM d, yyyy") : "Not set"}
//                         </TableCell>
//                         <TableCell>${campaign.budget?.toLocaleString() || "N/A"}</TableCell>
//                         <TableCell className="text-right">
//                           <Link href={`/campaigns/${campaign.id}`}>
//                             <Button variant="outline" size="sm">
//                               View
//                             </Button>
//                           </Link>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               ) : (
//                 <div className="text-center py-12 border rounded-md">
//                   <p className="text-muted-foreground">No campaigns found.</p>
//                   <Link href="/campaigns/new">
//                     <Button className="mt-4">Create Your First Campaign</Button>
//                   </Link>
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
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search, Filter, Calendar, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { getAllCampaigns } from "@/actions/campaigns"
import type { MyCampaignStatus } from "@prisma/client"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export default function CampaignsPage() {
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [pagination, setPagination] = useState({ total: 0, pages: 0, page: 1, limit: 10 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<MyCampaignStatus | "ALL">("ALL")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const fetchCampaigns = async () => {
    setLoading(true)
    setError(null)
    try {
      // Map the active tab to status filter
      let statusFilter: MyCampaignStatus[] | undefined = undefined
      if (activeTab !== "ALL") {
        statusFilter = [activeTab]
      }

      const result = await getAllCampaigns({
        status: statusFilter,
        search: searchQuery || undefined,
        sortBy,
        sortDirection,
        page: pagination.page,
        limit: pagination.limit,
      })

      if (result.status === 200) {
        if (typeof result.data === "object" && result.data !== null) {
          setCampaigns(result.data.campaigns || [])
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
        setError(typeof result.data === "string" ? result.data : "Error fetching campaigns")
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result.data : "Error fetching campaigns",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch campaigns"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [activeTab, sortBy, sortDirection, pagination.page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination((prev) => ({ ...prev, page: 1 }))
    fetchCampaigns()
  }

  const getStatusBadge = (status: MyCampaignStatus) => {
    switch (status) {
      case "DRAFT":
        return <Badge variant="outline">Draft</Badge>
      case "PLANNED":
        return <Badge variant="secondary">Planned</Badge>
      case "ACTIVE":
        return <Badge variant="default">Active</Badge>
      case "PAUSED":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Paused
          </Badge>
        )
      case "COMPLETED":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Completed
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Create and manage your influencer marketing campaigns</p>
        </div>
        <Link href="/campaigns/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>View and manage all your influencer marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="ALL"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as MyCampaignStatus | "ALL")}
          >
            <TabsList>
              <TabsTrigger value="ALL">All</TabsTrigger>
              <TabsTrigger value="DRAFT">Draft</TabsTrigger>
              <TabsTrigger value="PLANNED">Planned</TabsTrigger>
              <TabsTrigger value="ACTIVE">Active</TabsTrigger>
              <TabsTrigger value="PAUSED">Paused</TabsTrigger>
              <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 border rounded-md">
                  <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                  <p className="text-muted-foreground">{error}</p>
                  <Button onClick={fetchCampaigns} variant="outline" className="mt-4">
                    Retry
                  </Button>
                </div>
              ) : campaigns.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Influencers</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign: any) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell>{campaign._count?.influencers || 0}</TableCell>
                        <TableCell>
                          {campaign.startDate ? format(new Date(campaign.startDate), "MMM d, yyyy") : "Not set"}
                        </TableCell>
                        <TableCell>
                          {campaign.endDate ? format(new Date(campaign.endDate), "MMM d, yyyy") : "Not set"}
                        </TableCell>
                        <TableCell>${campaign.budget?.toLocaleString() || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/campaigns/${campaign.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">No campaigns found.</p>
                  <Link href="/campaigns/new">
                    <Button className="mt-4">Create Your First Campaign</Button>
                  </Link>
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
        </CardContent>
      </Card>
    </div>
  )
}

