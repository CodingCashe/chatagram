// "use client"

// import type React from "react"

// import { useState, useEffect, Suspense } from "react"
// import {
//   ArrowDown,
//   ArrowRight,
//   ArrowUp,
//   BriefcaseBusiness,
//   Calendar,
//   ChevronDown,
//   Compass,
//   DollarSign,
//   Eye,
//   Heart,
//   ImageIcon,
//   Instagram,
//   MessageSquare,
//   Share2,
//   TrendingUp,
//   Trophy,
//   Video,
//   Check,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { useIsMobile } from "@/hooks/use-mobile"
// import { DashboardShell } from "@/components/global/influencer-relation/dashboard/shell"
// import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
// import { InfluencerOverview } from "@/components/global/influencer-relation/influencer/overview"
// import { InfluencerStats } from "@/components/global/influencer-relation/influencer/stats"
// import { ContentPerformance } from "@/components/global/influencer-relation/influencer/content-performance"
// import { UpcomingCampaigns } from "@/components/global/influencer-relation/influencer/upcoming-campaigns"
// import { AudienceInsights } from "@/components/global/influencer-relation/influencer/audience-insights"
// import { RevenueAnalytics } from "@/components/global/influencer-relation/influencer/revenue-analytics"
// import { GrowthMetrics } from "@/components/global/influencer-relation/influencer/growth-metrics"
// import { BrandOpportunities } from "@/components/global/influencer-relation/influencer/brand-opportunities"
// import { ContentCalendar } from "@/components/global/influencer-relation/influencer/content-calendar"
// import { Skeleton } from "@/components/ui/skeleton"

// // Mock data for the dashboard
// const mockInfluencer = {
//   id: "inf-123",
//   name: "Jane Doe",
//   username: "janedoecreator",
//   bio: "Lifestyle & Fashion Content Creator | Sharing my journey and style tips",
//   profilePicture: "/placeholder.svg?height=200&width=200",
//   location: "Los Angeles, CA",
//   niche: "Fashion & Lifestyle",
//   email: "jane@example.com",
//   website: "janedoe.com",
//   verified: true,
//   isAvailableForHire: true,
//   platforms: ["Instagram", "TikTok", "YouTube"],
//   followers: 124800,
//   following: 1250,
//   postsCount: 342,
//   engagementRate: 4.7,
//   averageLikes: 5840,
//   averageComments: 312,
//   totalEarnings: 28450.75,
//   pendingEarnings: 3200.0,
//   currentMonthEarnings: 4750.25,
//   monthlyEarningsGrowth: 12.3,
//   brandFit: 85,
//   audienceMatch: 92,
//   estimatedCost: 1200,
//   audienceDemographics: {
//     ageGroups: [
//       { name: "18-24", value: 45 },
//       { name: "25-34", value: 32 },
//       { name: "35-44", value: 15 },
//       { name: "45+", value: 8 },
//     ],
//     gender: [
//       { name: "Female", value: 68 },
//       { name: "Male", value: 30 },
//       { name: "Other", value: 2 },
//     ],
//     topLocations: [
//       { name: "United States", value: 65 },
//       { name: "United Kingdom", value: 12 },
//       { name: "Canada", value: 8 },
//       { name: "Australia", value: 6 },
//       { name: "Germany", value: 4 },
//     ],
//     interests: [
//       { name: "Fashion", value: 85 },
//       { name: "Beauty", value: 72 },
//       { name: "Travel", value: 68 },
//       { name: "Fitness", value: 45 },
//       { name: "Food", value: 38 },
//     ],
//   },
//   authenticity: 88,
//   growthRate: 2.5,
//   status: "ACTIVE",
//   lastActive: "2023-04-08T15:30:00Z",
//   aiDiscoveryScore: 92.5,
// }

// const mockMetrics = {
//   daily: [
//     { date: "Apr 1", followers: 122100, engagement: 4.5, views: 15200, earnings: 350 },
//     { date: "Apr 2", followers: 122300, engagement: 4.6, views: 14800, earnings: 320 },
//     { date: "Apr 3", followers: 122600, engagement: 4.7, views: 16100, earnings: 410 },
//     { date: "Apr 4", followers: 122900, engagement: 4.5, views: 15700, earnings: 380 },
//     { date: "Apr 5", followers: 123200, engagement: 4.8, views: 17200, earnings: 450 },
//     { date: "Apr 6", followers: 123600, engagement: 4.6, views: 16500, earnings: 420 },
//     { date: "Apr 7", followers: 124100, engagement: 4.9, views: 18300, earnings: 520 },
//     { date: "Apr 8", followers: 124800, engagement: 4.7, views: 17500, earnings: 480 },
//   ],
//   monthly: [
//     { month: "Nov", followers: 110200, engagement: 4.2, views: 320000, earnings: 3200 },
//     { month: "Dec", followers: 114500, engagement: 4.3, views: 350000, earnings: 3600 },
//     { month: "Jan", followers: 118000, engagement: 4.4, views: 380000, earnings: 3900 },
//     { month: "Feb", followers: 120500, engagement: 4.5, views: 410000, earnings: 4200 },
//     { month: "Mar", followers: 123000, engagement: 4.6, views: 440000, earnings: 4500 },
//     { month: "Apr", followers: 124800, engagement: 4.7, views: 470000, earnings: 4750 },
//   ],
//   performance: {
//     profileViews: { value: 17500, growth: 8.2, percentile: 92 },
//     searchAppearances: { value: 4200, growth: 12.5, percentile: 88 },
//     campaignInvites: { value: 12, growth: 20, percentile: 95 },
//     brandContacts: { value: 8, growth: 33.3, percentile: 90 },
//     acceptanceRate: { value: 85, change: 5, percentile: 92 },
//     completionRate: { value: 98, change: 2, percentile: 96 },
//     clientSatisfaction: { value: 4.8, percentile: 94 },
//     reviewCount: 24,
//   },
// }

// const mockCampaigns = [
//   {
//     id: "camp-1",
//     brand: "FashionBrand",
//     status: "In Progress",
//     dueDate: "Apr 15, 2023",
//     budget: 1500,
//     contentType: "Instagram Post",
//     brief: "Spring collection showcase",
//     progress: 65,
//   },
//   {
//     id: "camp-2",
//     brand: "BeautyCompany",
//     status: "Pending Approval",
//     dueDate: "Apr 22, 2023",
//     budget: 2000,
//     contentType: "Instagram Reel + Story",
//     brief: "Product review and tutorial",
//     progress: 40,
//   },
//   {
//     id: "camp-3",
//     brand: "TravelApp",
//     status: "Scheduled",
//     dueDate: "May 5, 2023",
//     budget: 2500,
//     contentType: "YouTube Video",
//     brief: "Travel planning with our app",
//     progress: 20,
//   },
//   {
//     id: "camp-4",
//     brand: "FitnessGear",
//     status: "Completed",
//     dueDate: "Apr 2, 2023",
//     budget: 1200,
//     contentType: "Instagram Post + Story",
//     brief: "Workout routine with our products",
//     progress: 100,
//   },
// ]

// const mockOpportunities = [
//   {
//     id: "opp-1",
//     brand: "LuxuryBrand",
//     match: 95,
//     budget: "2,000 - 3,000",
//     contentType: "Instagram Post + Story",
//     deadline: "Apr 20, 2023",
//     description: "Looking for fashion influencers to showcase our summer collection",
//   },
//   {
//     id: "opp-2",
//     brand: "TechGadgets",
//     match: 82,
//     budget: "1,500 - 2,500",
//     contentType: "YouTube Video",
//     deadline: "Apr 25, 2023",
//     description: "Product review of our new smart home devices",
//   },
//   {
//     id: "opp-3",
//     brand: "EcoFriendly",
//     match: 88,
//     budget: "1,000 - 1,800",
//     contentType: "Instagram Reel",
//     deadline: "May 2, 2023",
//     description: "Sustainable lifestyle content featuring our products",
//   },
// ]

// const mockContentPerformance = [
//   {
//     id: "post-1",
//     type: "Reel",
//     platform: "Instagram",
//     date: "Apr 5, 2023",
//     likes: 12400,
//     comments: 840,
//     shares: 320,
//     saves: 560,
//     engagement: 5.2,
//     impressions: 85000,
//     thumbnail: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     id: "post-2",
//     type: "Post",
//     platform: "Instagram",
//     date: "Apr 2, 2023",
//     likes: 8700,
//     comments: 520,
//     shares: 180,
//     saves: 420,
//     engagement: 4.8,
//     impressions: 65000,
//     thumbnail: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     id: "post-3",
//     type: "Story",
//     platform: "Instagram",
//     date: "Apr 6, 2023",
//     likes: 0,
//     comments: 0,
//     shares: 120,
//     saves: 0,
//     engagement: 4.5,
//     impressions: 52000,
//     thumbnail: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     id: "post-4",
//     type: "Video",
//     platform: "TikTok",
//     date: "Apr 4, 2023",
//     likes: 18500,
//     comments: 1240,
//     shares: 850,
//     saves: 720,
//     engagement: 6.2,
//     impressions: 120000,
//     thumbnail: "/placeholder.svg?height=100&width=100",
//   },
// ]

// const mockEarningsHistory = [
//   { month: "Nov", campaigns: 2800, affiliate: 400, sponsorships: 0, total: 3200 },
//   { month: "Dec", campaigns: 3000, affiliate: 450, sponsorships: 150, total: 3600 },
//   { month: "Jan", campaigns: 3200, affiliate: 500, sponsorships: 200, total: 3900 },
//   { month: "Feb", campaigns: 3400, affiliate: 550, sponsorships: 250, total: 4200 },
//   { month: "Mar", campaigns: 3600, affiliate: 600, sponsorships: 300, total: 4500 },
//   { month: "Apr", campaigns: 3800, affiliate: 650, sponsorships: 300, total: 4750 },
// ]

// const mockNotifications = [
//   {
//     id: "notif-1",
//     type: "campaign",
//     title: "New Campaign Invitation",
//     message: "FashionBrand has invited you to a new campaign",
//     time: "2 hours ago",
//     read: false,
//   },
//   {
//     id: "notif-2",
//     type: "message",
//     title: "New Message",
//     message: "BeautyCompany sent you a message about your recent post",
//     time: "5 hours ago",
//     read: false,
//   },
//   {
//     id: "notif-3",
//     type: "payment",
//     title: "Payment Received",
//     message: "You received a payment of $1,200 from FitnessGear",
//     time: "1 day ago",
//     read: true,
//   },
//   {
//     id: "notif-4",
//     type: "milestone",
//     title: "Milestone Reached",
//     message: "Congratulations! You've reached 125K followers",
//     time: "2 days ago",
//     read: true,
//   },
// ]

// const mockTasks = [
//   {
//     id: "task-1",
//     title: "Submit content for FashionBrand campaign",
//     dueDate: "Apr 15, 2023",
//     priority: "High",
//     completed: false,
//   },
//   {
//     id: "task-2",
//     title: "Review BeautyCompany contract",
//     dueDate: "Apr 12, 2023",
//     priority: "Medium",
//     completed: false,
//   },
//   {
//     id: "task-3",
//     title: "Plan content for TravelApp campaign",
//     dueDate: "Apr 20, 2023",
//     priority: "Medium",
//     completed: false,
//   },
//   {
//     id: "task-4",
//     title: "Send invoice to FitnessGear",
//     dueDate: "Apr 10, 2023",
//     priority: "High",
//     completed: true,
//   },
// ]

// const mockRates = {
//   instagram: {
//     post: 800,
//     story: 400,
//     reel: 1200,
//   },
//   tiktok: {
//     video: 1000,
//   },
//   youtube: {
//     video: 2500,
//   },
// }

// // Helper function to format numbers
// const formatNumber = (num: number) => {
//   if (num >= 1000000) {
//     return (num / 1000000).toFixed(1) + "M"
//   }
//   if (num >= 1000) {
//     return (num / 1000).toFixed(1) + "K"
//   }
//   return num.toString()
// }

// // Helper function to calculate growth indicator
// const getGrowthIndicator = (value: number) => {
//   if (value > 0) {
//     return (
//       <span className="flex items-center text-green-500">
//         <ArrowUp className="mr-1 h-3 w-3" />
//         {value}%
//       </span>
//     )
//   }
//   if (value < 0) {
//     return (
//       <span className="flex items-center text-red-500">
//         <ArrowDown className="mr-1 h-3 w-3" />
//         {Math.abs(value)}%
//       </span>
//     )
//   }
//   return <span className="text-muted-foreground">0%</span>
// }

// // Dashboard components
// const StatsCard = ({
//   title,
//   value,
//   icon,
//   change,
//   trend = "up",
//   subtitle,
//   percentile,
// }: {
//   title: string
//   value: string | number
//   icon: React.ReactNode
//   change?: number
//   trend?: "up" | "down" | "neutral"
//   subtitle?: string
//   percentile?: number
// }) => {
//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-md">
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="rounded-md bg-gradient-to-br from-primary/20 to-primary/10 p-2">{icon}</div>
//           {change !== undefined && (
//             <div
//               className={`flex items-center gap-1 text-xs font-medium ${
//                 trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
//               }`}
//             >
//               {trend === "up" ? (
//                 <TrendingUp className="h-3 w-3" />
//               ) : trend === "down" ? (
//                 <TrendingUp className="h-3 w-3 rotate-180 transform" />
//               ) : null}
//               {change > 0 ? "+" : ""}
//               {change}%
//             </div>
//           )}
//           {percentile !== undefined && (
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 px-2 py-1 text-xs font-medium">
//                     <Trophy className="h-3 w-3 text-primary" />
//                     Top {100 - percentile}%
//                   </div>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>You&apos;re in the top {100 - percentile}% of creators</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           )}
//         </div>
//         <div className="mt-4">
//           <div className="text-sm font-medium text-muted-foreground">{title}</div>
//           <div className="text-2xl font-bold">{value}</div>
//           {subtitle && <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// const CampaignCard = ({ campaign }: { campaign: (typeof mockCampaigns)[0] }) => {
//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-md">
//       <CardHeader className="p-4">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-base">{campaign.brand}</CardTitle>
//           <Badge
//             variant={
//               campaign.status === "Completed"
//                 ? "outline"
//                 : campaign.status === "In Progress"
//                   ? "default"
//                   : campaign.status === "Pending Approval"
//                     ? "secondary"
//                     : "outline"
//             }
//             className={
//               campaign.status === "Completed"
//                 ? "border-green-500 text-green-500"
//                 : campaign.status === "In Progress"
//                   ? "bg-primary/20 text-primary"
//                   : campaign.status === "Pending Approval"
//                     ? "bg-yellow-500/20 text-yellow-500"
//                     : ""
//             }
//           >
//             {campaign.status}
//           </Badge>
//         </div>
//         <CardDescription className="flex items-center gap-1 text-xs">
//           <Calendar className="h-3 w-3" /> Due: {campaign.dueDate}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         <div className="grid gap-2 text-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Budget:</span>
//             <span className="font-medium">${campaign.budget}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Content:</span>
//             <span className="font-medium">{campaign.contentType}</span>
//           </div>
//           <div className="mt-2">
//             <div className="mb-1 flex items-center justify-between text-xs">
//               <span>Progress</span>
//               <span>{campaign.progress}%</span>
//             </div>
//             <Progress value={campaign.progress} className="h-1.5" />
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="border-t bg-muted/50 p-2">
//         <Button variant="ghost" size="sm" className="w-full text-xs">
//           View Details
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

// const OpportunityCard = ({ opportunity }: { opportunity: (typeof mockOpportunities)[0] }) => {
//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-md">
//       <CardHeader className="p-4">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-base">{opportunity.brand}</CardTitle>
//           <Badge className="bg-green-500/20 text-green-500">{opportunity.match}% Match</Badge>
//         </div>
//         <CardDescription className="flex items-center gap-1 text-xs">
//           <Calendar className="h-3 w-3" /> Deadline: {opportunity.deadline}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         <div className="grid gap-2 text-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Budget:</span>
//             <span className="font-medium">${opportunity.budget}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Content:</span>
//             <span className="font-medium">{opportunity.contentType}</span>
//           </div>
//           <p className="mt-2 text-xs text-muted-foreground">{opportunity.description}</p>
//         </div>
//       </CardContent>
//       <CardFooter className="flex gap-2 border-t bg-muted/50 p-2">
//         <Button variant="default" size="sm" className="w-full text-xs">
//           Apply Now
//         </Button>
//         <Button variant="outline" size="sm" className="w-full text-xs">
//           View Details
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

// const ContentCard = ({ content }: { content: (typeof mockContentPerformance)[0] }) => {
//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-md">
//       <CardContent className="p-4">
//         <div className="flex gap-3">
//           <div className="relative h-16 w-16 overflow-hidden rounded-md">
//             <img
//               src={content.thumbnail || "/placeholder.svg"}
//               alt={`${content.type} thumbnail`}
//               className="h-full w-full object-cover"
//             />
//             <div className="absolute bottom-0 right-0 rounded-tl-md bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
//               {content.type}
//             </div>
//           </div>
//           <div className="flex flex-1 flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-1 text-sm font-medium">
//                 {content.platform === "Instagram" ? (
//                   <Instagram className="h-3.5 w-3.5" />
//                 ) : content.platform === "TikTok" ? (
//                   <Video className="h-3.5 w-3.5" />
//                 ) : (
//                   <ImageIcon className="h-3.5 w-3.5" />
//                 )}
//                 {content.platform} {content.type}
//               </div>
//               <div className="text-xs text-muted-foreground">{content.date}</div>
//             </div>
//             <div className="flex items-center gap-3 text-xs">
//               <div className="flex items-center gap-1">
//                 <Heart className="h-3 w-3" />
//                 {formatNumber(content.likes)}
//               </div>
//               <div className="flex items-center gap-1">
//                 <MessageSquare className="h-3 w-3" />
//                 {formatNumber(content.comments)}
//               </div>
//               <div className="flex items-center gap-1">
//                 <Share2 className="h-3 w-3" />
//                 {formatNumber(content.shares)}
//               </div>
//               <div className="flex items-center gap-1">
//                 <Eye className="h-3 w-3" />
//                 {formatNumber(content.impressions)}
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-end justify-between">
//             <Badge className="bg-primary/20 text-primary">{content.engagement}% Eng</Badge>
//             <Button variant="ghost" size="sm" className="h-7 text-xs">
//               Details
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// const TaskItem = ({ task }: { task: (typeof mockTasks)[0] }) => {
//   const [isCompleted, setIsCompleted] = useState(task.completed)

//   return (
//     <div className="flex items-center gap-3 rounded-md border p-3 transition-all hover:shadow-sm">
//       <div className="flex h-5 w-5 items-center justify-center">
//         <input
//           type="checkbox"
//           checked={isCompleted}
//           onChange={() => setIsCompleted(!isCompleted)}
//           className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
//         />
//       </div>
//       <div className="flex-1">
//         <div className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>{task.title}</div>
//         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//           <span className="flex items-center gap-1">
//             <Calendar className="h-3 w-3" /> {task.dueDate}
//           </span>
//           <Badge
//             variant="outline"
//             className={`
//               ${
//                 task.priority === "High"
//                   ? "border-red-500 text-red-500"
//                   : task.priority === "Medium"
//                     ? "border-yellow-500 text-yellow-500"
//                     : "border-blue-500 text-blue-500"
//               }
//             `}
//           >
//             {task.priority}
//           </Badge>
//         </div>
//       </div>
//       <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//         <MoreHorizontal className="h-4 w-4" />
//       </Button>
//     </div>
//   )
// }

// const NotificationItem = ({ notification }: { notification: (typeof mockNotifications)[0] }) => {
//   return (
//     <div className={`flex gap-3 rounded-md p-3 ${notification.read ? "" : "bg-primary/5"}`}>
//       <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary/10`}>
//         {notification.type === "campaign" && <BriefcaseBusiness className="h-4 w-4 text-primary" />}
//         {notification.type === "message" && <MessageSquare className="h-4 w-4 text-primary" />}
//         {notification.type === "payment" && <DollarSign className="h-4 w-4 text-primary" />}
//         {notification.type === "milestone" && <Trophy className="h-4 w-4 text-primary" />}
//       </div>
//       <div className="flex-1">
//         <div className="font-medium">{notification.title}</div>
//         <div className="text-sm text-muted-foreground">{notification.message}</div>
//         <div className="mt-1 text-xs text-muted-foreground">{notification.time}</div>
//       </div>
//       {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
//     </div>
//   )
// }

// // Missing component
// const MoreHorizontal = (props: any) => {
//   return <ChevronDown {...props} />
// }

// // Main dashboard component
// export default function InfluencerDashboardPage() {
//   const [activeTab, setActiveTab] = useState("overview")
//   const [dateRange, setDateRange] = useState("7d")
//   const [isLoading, setIsLoading] = useState(false)
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
//     // Initialize from localStorage if available, default to false on larger screens and true on mobile
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("sidebarCollapsed")
//       return saved !== null ? JSON.parse(saved) : window.innerWidth < 1024
//     }
//     return false
//   })
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
//   const isMobile = useIsMobile()

//   // Save sidebar state to localStorage
//   useEffect(() => {
//     localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed))
//   }, [sidebarCollapsed])

//   // Handle window resize for responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setSidebarCollapsed(true)
//       }
//     }

//     window.addEventListener("resize", handleResize)
//     handleResize() // Check on initial load

//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   // Simulate loading state when changing tabs
//   const handleTabChange = (value: string) => {
//     setIsLoading(true)
//     setActiveTab(value)
//     setTimeout(() => {
//       setIsLoading(false)
//     }, 500)
//   }

//   // Toggle sidebar collapsed state
//   const toggleSidebar = () => {
//     if (isMobile) {
//       setMobileSidebarOpen(!mobileSidebarOpen)
//     } else {
//       setSidebarCollapsed(!sidebarCollapsed)
//     }
//   }

//   return (
//     <DashboardShell>
//       <DashboardHeader
//         heading="Influencer Dashboard"
//         text="Manage your content, campaigns, and analytics in one place."
//       />

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
//           <InfluencerOverview />
//         </Suspense>

//         <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
//           <InfluencerStats />
//         </Suspense>

//         <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
//           <GrowthMetrics />
//         </Suspense>
//       </div>

//       <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <div className="col-span-full lg:col-span-2">
//           <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
//             <ContentPerformance />
//           </Suspense>
//         </div>

//         <div className="md:col-span-2 lg:col-span-1">
//           <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
//             <UpcomingCampaigns />
//           </Suspense>
//         </div>
//       </div>

//       <div className="mt-4 grid gap-4 md:grid-cols-2">
//         <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
//           <AudienceInsights />
//         </Suspense>

//         <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
//           <RevenueAnalytics />
//         </Suspense>
//       </div>

//       <div className="mt-4">
//         <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
//           <ContentCalendar />
//         </Suspense>
//       </div>

//       <div className="mt-4">
//         <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
//           <BrandOpportunities />
//         </Suspense>
//       </div>
//     </DashboardShell>
//   )
// }

// // Missing components
// function Play(props: any) {
//   return <Video {...props} />
// }

// function Globe(props: any) {
//   return <Compass {...props} />
// }

// function CheckCircle(props: any) {
//   return <Check {...props} />
// }

// function LogOut(props: any) {
//   return <ArrowRight {...props} />
// }


"use client"

import { useState, useEffect, Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardShell } from "@/components/global/influencer-relation/dashboard/shell"
import { DashboardHeader } from "@/components/global/influencer-relation/dashboard/header"
import { InfluencerOverview } from "@/components/global/influencer-relation/influencer/overview"
import { InfluencerStats } from "@/components/global/influencer-relation/influencer/stats"
import { ContentPerformance } from "@/components/global/influencer-relation/influencer/content-performance"
import { UpcomingCampaigns } from "@/components/global/influencer-relation/influencer/upcoming-campaigns"
import { AudienceInsights } from "@/components/global/influencer-relation/influencer/audience-insights"
import { RevenueAnalytics } from "@/components/global/influencer-relation/influencer/revenue-analytics"
import { GrowthMetrics } from "@/components/global/influencer-relation/influencer/growth-metrics"
import { BrandOpportunities } from "@/components/global/influencer-relation/influencer/brand-opportunities"
import { BrandOpportunity } from "@/components/global/influencer-relation/influencer/available-opportunities"
import { ContentCalendar } from "@/components/global/influencer-relation/influencer/content-calendar"
import { ProfileCompletion } from "@/components/global/influencer-relation/influencer/profile-completion"
import { getInfluencerProfile } from "@/actions/influencer-relations/influencer"
import { User } from "lucide-react"

export default function InfluencerDashboardPage() {
  const [profileExists, setProfileExists] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkProfile() {
      try {
        const response = await getInfluencerProfile()
        setProfileExists(response.status === 200)
      } catch (error) {
        console.error("Error checking profile:", error)
        setProfileExists(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkProfile()
  }, [])

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Influencer Dashboard"
          text="Manage your content, campaigns, and analytics in one place."
        />
        <Skeleton className="h-[200px] w-full" />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Influencer Dashboard"
        text="Manage your content, campaigns, and analytics in one place."
      />

      {/* Profile Completion Banner - only shows if profile is incomplete */}
      <ProfileCompletion className="mb-6" />

      {/* Only show dashboard content if profile exists */}
      {profileExists && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
              <InfluencerOverview />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
              <InfluencerStats />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
              <GrowthMetrics />
            </Suspense>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full lg:col-span-2">
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <ContentPerformance />
              </Suspense>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <UpcomingCampaigns />
              </Suspense>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <AudienceInsights />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <RevenueAnalytics />
            </Suspense>
          </div>

          <div className="mt-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <ContentCalendar />
            </Suspense>
          </div>

          {/* <div className="mt-4">
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <BrandOpportunities />
            </Suspense>
          </div> */}
          <div className="mt-4">
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <BrandOpportunity />
            </Suspense>
          </div>
        </>
      )}

      {/* Show a full page profile setup prompt if profile doesn't exist */}
      {profileExists === false && (
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <User className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-amber-800">Set Up Your Influencer Profile</h2>
          <p className="mx-auto mb-6 max-w-md text-amber-700">
            Complete your profile to unlock all features of the influencer dashboard, get discovered by brands, and
            receive personalized campaign opportunities.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => (window.location.href = "/onboarding")}
              className="inline-flex items-center justify-center rounded-md bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Start Onboarding Process
            </button>
            <button
              onClick={() => (window.location.href = "/settings/profile")}
              className="inline-flex items-center justify-center rounded-md border border-amber-600 bg-transparent px-6 py-3 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Go to Profile Settings
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
