// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { BarChart, LineChart, PieChart } from "@/components/ui/charte"
// import {
//   BarChart3,
//   LineChartIcon,
//   PieChartIcon,
//   Download,
//   Filter,
//   Users,
//   Heart,
//   Share2,
//   DollarSign,
// } from "lucide-react"

// export default function CampaignAnalyticsPage() {
//   // Sample data for charts
//   const engagementData = [
//     { name: "Jan", likes: 4000, comments: 2400, shares: 1800 },
//     { name: "Feb", likes: 3000, comments: 1398, shares: 1200 },
//     { name: "Mar", likes: 2000, comments: 9800, shares: 2800 },
//     { name: "Apr", likes: 2780, comments: 3908, shares: 2000 },
//     { name: "May", likes: 1890, comments: 4800, shares: 2181 },
//     { name: "Jun", likes: 2390, comments: 3800, shares: 2500 },
//     { name: "Jul", likes: 3490, comments: 4300, shares: 2100 },
//   ]

//   const influencerPerformanceData = [
//     { name: "@fashion_emma", engagement: 5.2, reach: 85000, roi: 3.8 },
//     { name: "@travel_mike", engagement: 4.7, reach: 62000, roi: 2.9 },
//     { name: "@fitness_sarah", engagement: 7.1, reach: 45000, roi: 4.2 },
//     { name: "@tech_jason", engagement: 3.8, reach: 92000, roi: 3.1 },
//     { name: "@food_lisa", engagement: 6.3, reach: 38000, roi: 3.5 },
//   ]

//   const audienceData = [
//     { name: "18-24", value: 35 },
//     { name: "25-34", value: 40 },
//     { name: "35-44", value: 15 },
//     { name: "45+", value: 10 },
//   ]

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
//         <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Select defaultValue="summer-collection">
//             <SelectTrigger className="w-[250px]">
//               <SelectValue placeholder="Select campaign" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="summer-collection">Summer Collection Launch</SelectItem>
//               <SelectItem value="holiday-special">Holiday Special</SelectItem>
//               <SelectItem value="new-product">New Product Release</SelectItem>
//               <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
//             </SelectContent>
//           </Select>
//           <Badge variant="outline">Active</Badge>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </Button>
//           <Button variant="outline">
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex flex-col space-y-1">
//               <span className="text-muted-foreground text-sm">Total Reach</span>
//               <div className="flex items-center">
//                 <Users className="h-4 w-4 mr-2 text-primary" />
//                 <span className="text-2xl font-bold">1.2M</span>
//               </div>
//               <span className="text-xs text-green-500">+12% from last campaign</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex flex-col space-y-1">
//               <span className="text-muted-foreground text-sm">Engagement Rate</span>
//               <div className="flex items-center">
//                 <Heart className="h-4 w-4 mr-2 text-primary" />
//                 <span className="text-2xl font-bold">5.8%</span>
//               </div>
//               <span className="text-xs text-green-500">+0.7% from last campaign</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex flex-col space-y-1">
//               <span className="text-muted-foreground text-sm">Conversion Rate</span>
//               <div className="flex items-center">
//                 <Share2 className="h-4 w-4 mr-2 text-primary" />
//                 <span className="text-2xl font-bold">2.3%</span>
//               </div>
//               <span className="text-xs text-green-500">+0.4% from last campaign</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex flex-col space-y-1">
//               <span className="text-muted-foreground text-sm">ROI</span>
//               <div className="flex items-center">
//                 <DollarSign className="h-4 w-4 mr-2 text-primary" />
//                 <span className="text-2xl font-bold">3.2x</span>
//               </div>
//               <span className="text-xs text-green-500">+0.5x from last campaign</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="overview">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="influencers">Influencer Performance</TabsTrigger>
//           <TabsTrigger value="content">Content Analysis</TabsTrigger>
//           <TabsTrigger value="audience">Audience Insights</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <LineChartIcon className="h-5 w-5 mr-2" />
//                 Campaign Engagement Over Time
//               </CardTitle>
//               <CardDescription>Track likes, comments, and shares throughout the campaign</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <LineChart
//                   data={engagementData}
//                   xAxisKey="name"
//                   series={[
//                     { name: "Likes", key: "likes", color: "#8884d8" },
//                     { name: "Comments", key: "comments", color: "#82ca9d" },
//                     { name: "Shares", key: "shares", color: "#ffc658" },
//                   ]}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid gap-4 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <BarChart3 className="h-5 w-5 mr-2" />
//                   Top Performing Influencers
//                 </CardTitle>
//                 <CardDescription>Based on engagement rate</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-60">
//                   <BarChart
//                     data={influencerPerformanceData}
//                     xAxisKey="name"
//                     series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" }]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <PieChartIcon className="h-5 w-5 mr-2" />
//                   Audience Demographics
//                 </CardTitle>
//                 <CardDescription>Age distribution of engaged audience</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-60">
//                   <PieChart
//                     data={audienceData}
//                     nameKey="name"
//                     dataKey="value"
//                     colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Campaign Summary</CardTitle>
//               <CardDescription>Key metrics and insights from the campaign</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <div className="space-y-2">
//                     <h4 className="font-medium">Campaign Details</h4>
//                     <div className="grid grid-cols-2 gap-1 text-sm">
//                       <span className="text-muted-foreground">Start Date:</span>
//                       <span>Jan 15, 2025</span>
//                       <span className="text-muted-foreground">End Date:</span>
//                       <span>Jul 15, 2025</span>
//                       <span className="text-muted-foreground">Budget:</span>
//                       <span>$45,000</span>
//                       <span className="text-muted-foreground">Influencers:</span>
//                       <span>12</span>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Performance Highlights</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Highest engagement on Instagram Stories</li>
//                       <li>Female audience engagement 23% higher</li>
//                       <li>Peak engagement times: 6-8pm weekdays</li>
//                       <li>Product link clicks: 28,450</li>
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Recommendations</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Increase budget for top 3 performers</li>
//                       <li>Focus more on video content</li>
//                       <li>Target 25-34 age group more specifically</li>
//                       <li>Schedule posts during peak engagement times</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="influencers" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Influencer Performance</CardTitle>
//               <CardDescription>Detailed performance metrics for each influencer in the campaign</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Influencer</TableHead>
//                     <TableHead>Posts</TableHead>
//                     <TableHead>Reach</TableHead>
//                     <TableHead>Engagement</TableHead>
//                     <TableHead>Clicks</TableHead>
//                     <TableHead>Conversions</TableHead>
//                     <TableHead>ROI</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {[
//                     {
//                       name: "@fashion_emma",
//                       posts: 8,
//                       reach: "85K",
//                       engagement: "5.2%",
//                       clicks: "3.2K",
//                       conversions: "245",
//                       roi: "3.8x",
//                       status: "Completed",
//                     },
//                     {
//                       name: "@travel_mike",
//                       posts: 6,
//                       reach: "62K",
//                       engagement: "4.7%",
//                       clicks: "2.1K",
//                       conversions: "187",
//                       roi: "2.9x",
//                       status: "Completed",
//                     },
//                     {
//                       name: "@fitness_sarah",
//                       posts: 10,
//                       reach: "45K",
//                       engagement: "7.1%",
//                       clicks: "2.8K",
//                       conversions: "312",
//                       roi: "4.2x",
//                       status: "Completed",
//                     },
//                     {
//                       name: "@tech_jason",
//                       posts: 5,
//                       reach: "92K",
//                       engagement: "3.8%",
//                       clicks: "1.9K",
//                       conversions: "156",
//                       roi: "3.1x",
//                       status: "Completed",
//                     },
//                     {
//                       name: "@food_lisa",
//                       posts: 7,
//                       reach: "38K",
//                       engagement: "6.3%",
//                       clicks: "1.7K",
//                       conversions: "198",
//                       roi: "3.5x",
//                       status: "Completed",
//                     },
//                     {
//                       name: "@lifestyle_alex",
//                       posts: 4,
//                       reach: "56K",
//                       engagement: "5.5%",
//                       clicks: "2.2K",
//                       conversions: "176",
//                       roi: "3.2x",
//                       status: "Active",
//                     },
//                     {
//                       name: "@beauty_jen",
//                       posts: 3,
//                       reach: "42K",
//                       engagement: "6.1%",
//                       clicks: "1.5K",
//                       conversions: "128",
//                       roi: "2.8x",
//                       status: "Active",
//                     },
//                   ].map((influencer, i) => (
//                     <TableRow key={i}>
//                       <TableCell className="font-medium">{influencer.name}</TableCell>
//                       <TableCell>{influencer.posts}</TableCell>
//                       <TableCell>{influencer.reach}</TableCell>
//                       <TableCell>{influencer.engagement}</TableCell>
//                       <TableCell>{influencer.clicks}</TableCell>
//                       <TableCell>{influencer.conversions}</TableCell>
//                       <TableCell>{influencer.roi}</TableCell>
//                       <TableCell>
//                         <Badge variant={influencer.status === "Completed" ? "outline" : "secondary"}>
//                           {influencer.status}
//                         </Badge>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>

//           <div className="grid gap-4 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <BarChart3 className="h-5 w-5 mr-2" />
//                   Engagement by Influencer
//                 </CardTitle>
//                 <CardDescription>Comparison of engagement metrics across influencers</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80">
//                   <BarChart
//                     data={influencerPerformanceData}
//                     xAxisKey="name"
//                     series={[
//                       { name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" },
//                       { name: "ROI (x)", key: "roi", color: "#82ca9d" },
//                     ]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <BarChart3 className="h-5 w-5 mr-2" />
//                   Reach by Influencer
//                 </CardTitle>
//                 <CardDescription>Total audience reach for each influencer</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80">
//                   <BarChart
//                     data={influencerPerformanceData}
//                     xAxisKey="name"
//                     series={[{ name: "Audience Reach", key: "reach", color: "#8884d8" }]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="content" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Content Performance Analysis</CardTitle>
//               <CardDescription>Analysis of different content types and formats</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-4">
//                   <div className="h-60">
//                     <PieChart
//                       data={[
//                         { name: "Photos", value: 45 },
//                         { name: "Videos", value: 30 },
//                         { name: "Stories", value: 20 },
//                         { name: "Reels", value: 5 },
//                       ]}
//                       nameKey="name"
//                       dataKey="value"
//                       colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                     />
//                   </div>
//                   <div className="text-center">
//                     <h4 className="font-medium">Content Type Distribution</h4>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="h-60">
//                     <BarChart
//                       data={[
//                         { name: "Photos", engagement: 3.8 },
//                         { name: "Videos", engagement: 5.2 },
//                         { name: "Stories", engagement: 4.5 },
//                         { name: "Reels", engagement: 7.1 },
//                       ]}
//                       xAxisKey="name"
//                       series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#82ca9d" }]}
//                     />
//                   </div>
//                   <div className="text-center">
//                     <h4 className="font-medium">Engagement by Content Type</h4>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h4 className="font-medium mb-4">Top Performing Content</h4>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Content</TableHead>
//                       <TableHead>Influencer</TableHead>
//                       <TableHead>Type</TableHead>
//                       <TableHead>Likes</TableHead>
//                       <TableHead>Comments</TableHead>
//                       <TableHead>Shares</TableHead>
//                       <TableHead>Engagement</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {[
//                       {
//                         content: "Product Unboxing",
//                         influencer: "@fashion_emma",
//                         type: "Video",
//                         likes: "12.5K",
//                         comments: "845",
//                         shares: "2.3K",
//                         engagement: "8.2%",
//                       },
//                       {
//                         content: "Outfit of the Day",
//                         influencer: "@fashion_emma",
//                         type: "Photo",
//                         likes: "9.8K",
//                         comments: "623",
//                         shares: "1.1K",
//                         engagement: "6.7%",
//                       },
//                       {
//                         content: "Product Review",
//                         influencer: "@tech_jason",
//                         type: "Video",
//                         likes: "8.2K",
//                         comments: "912",
//                         shares: "1.8K",
//                         engagement: "7.5%",
//                       },
//                       {
//                         content: "Tutorial",
//                         influencer: "@beauty_jen",
//                         type: "Reel",
//                         likes: "15.3K",
//                         comments: "1.2K",
//                         shares: "3.4K",
//                         engagement: "9.1%",
//                       },
//                       {
//                         content: "Behind the Scenes",
//                         influencer: "@lifestyle_alex",
//                         type: "Story",
//                         likes: "7.4K",
//                         comments: "532",
//                         shares: "980",
//                         engagement: "5.8%",
//                       },
//                     ].map((content, i) => (
//                       <TableRow key={i}>
//                         <TableCell className="font-medium">{content.content}</TableCell>
//                         <TableCell>{content.influencer}</TableCell>
//                         <TableCell>{content.type}</TableCell>
//                         <TableCell>{content.likes}</TableCell>
//                         <TableCell>{content.comments}</TableCell>
//                         <TableCell>{content.shares}</TableCell>
//                         <TableCell>{content.engagement}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="audience" className="space-y-4 mt-4">
//           <div className="grid gap-4 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <PieChartIcon className="h-5 w-5 mr-2" />
//                   Age Distribution
//                 </CardTitle>
//                 <CardDescription>Age breakdown of engaged audience</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-60">
//                   <PieChart
//                     data={audienceData}
//                     nameKey="name"
//                     dataKey="value"
//                     colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <PieChartIcon className="h-5 w-5 mr-2" />
//                   Gender Distribution
//                 </CardTitle>
//                 <CardDescription>Gender breakdown of engaged audience</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-60">
//                   <PieChart
//                     data={[
//                       { name: "Female", value: 65 },
//                       { name: "Male", value: 32 },
//                       { name: "Other", value: 3 },
//                     ]}
//                     nameKey="name"
//                     dataKey="value"
//                     colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <PieChartIcon className="h-5 w-5 mr-2" />
//                   Geographic Distribution
//                 </CardTitle>
//                 <CardDescription>Top locations of engaged audience</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-60">
//                   <PieChart
//                     data={[
//                       { name: "United States", value: 45 },
//                       { name: "United Kingdom", value: 15 },
//                       { name: "Canada", value: 12 },
//                       { name: "Australia", value: 8 },
//                       { name: "Germany", value: 5 },
//                       { name: "Other", value: 15 },
//                     ]}
//                     nameKey="name"
//                     dataKey="value"
//                     colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <BarChart3 className="h-5 w-5 mr-2" />
//                   Interests & Affinities
//                 </CardTitle>
//                 <CardDescription>Top interests of engaged audience</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-60">
//                   <BarChart
//                     data={[
//                       { name: "Fashion", value: 75 },
//                       { name: "Beauty", value: 68 },
//                       { name: "Travel", value: 52 },
//                       { name: "Fitness", value: 45 },
//                       { name: "Food", value: 38 },
//                       { name: "Technology", value: 32 },
//                     ]}
//                     xAxisKey="name"
//                     series={[{ name: "Interest Level", key: "value", color: "#8884d8" }]}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Audience Insights Summary</CardTitle>
//               <CardDescription>Key insights about your campaign audience</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <div className="space-y-2">
//                     <h4 className="font-medium">Demographics Overview</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Primary audience: Women 25-34</li>
//                       <li>Secondary audience: Women 18-24</li>
//                       <li>Top locations: US, UK, Canada</li>
//                       <li>65% Female, 32% Male audience</li>
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Audience Behavior</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Most active: 6-9pm weekdays</li>
//                       <li>Highest engagement: Mobile devices (78%)</li>
//                       <li>Average session duration: 4.2 minutes</li>
//                       <li>Returning visitors: 32%</li>
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Audience Recommendations</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Focus on mobile-optimized content</li>
//                       <li>Target evening posting schedule</li>
//                       <li>Expand content for 25-34 demographic</li>
//                       <li>Develop more fashion and beauty content</li>
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4 mt-4">
//                   <h4 className="font-medium mb-2">Audience Growth Opportunities</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Based on the current audience analysis, there are opportunities to expand reach in the 35-44 age
//                     demographic, which currently represents only 15% of the audience but shows higher conversion rates.
//                     Additionally, geographic expansion into Australia and Germany markets shows promise based on
//                     engagement metrics from those regions.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { BarChart, LineChart, PieChart } from "@/components/ui/charte"
// import {
//   BarChart3,
//   LineChartIcon,
//   PieChartIcon,
//   Filter,
//   Users,
//   Heart,
//   Share2,
//   DollarSign,
//   Loader2,
//   AlertCircle,
// } from "lucide-react"
// import { getAllCampaigns, getCampaignDetails } from "@/actions/campaigns"
// import { useToast } from "@/hooks/use-toast"
// import Link from "next/link"

// export default function CampaignAnalyticsPage() {
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)
//   const [campaignData, setCampaignData] = useState<any>(null)
//   const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([])
//   const [loadingCampaigns, setLoadingCampaigns] = useState(true)

//   // Default chart data - will be replaced with real data when campaign is loaded
//   const [engagementData, setEngagementData] = useState([
//     { name: "Jan", likes: 4000, comments: 2400, shares: 1800 },
//     { name: "Feb", likes: 3000, comments: 1398, shares: 1200 },
//     { name: "Mar", likes: 2000, comments: 9800, shares: 2800 },
//     { name: "Apr", likes: 2780, comments: 3908, shares: 2000 },
//     { name: "May", likes: 1890, comments: 4800, shares: 2181 },
//     { name: "Jun", likes: 2390, comments: 3800, shares: 2500 },
//     { name: "Jul", likes: 3490, comments: 4300, shares: 2100 },
//   ])

//   const [influencerPerformanceData, setInfluencerPerformanceData] = useState([
//     { name: "@fashion_emma", engagement: 5.2, reach: 85000, roi: 3.8 },
//     { name: "@travel_mike", engagement: 4.7, reach: 62000, roi: 2.9 },
//     { name: "@fitness_sarah", engagement: 7.1, reach: 45000, roi: 4.2 },
//     { name: "@tech_jason", engagement: 3.8, reach: 92000, roi: 3.1 },
//     { name: "@food_lisa", engagement: 6.3, reach: 38000, roi: 3.5 },
//   ])

//   const [audienceData, setAudienceData] = useState([
//     { name: "18-24", value: 35 },
//     { name: "25-34", value: 40 },
//     { name: "35-44", value: 15 },
//     { name: "45+", value: 10 },
//   ])

//   useEffect(() => {
//     fetchCampaigns()
//   }, [])

//   const fetchCampaigns = async () => {
//     setLoadingCampaigns(true)
//     try {
//       const result = await getAllCampaigns()

//       if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
//         const campaignsList = result.data.campaigns.map((campaign: any) => ({
//           id: campaign.id,
//           name: campaign.name,
//         }))
//         setCampaigns(campaignsList)

//         if (campaignsList.length > 0 && !selectedCampaignId) {
//           setSelectedCampaignId(campaignsList[0].id)
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Failed to fetch campaigns",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Failed to fetch campaigns"
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       })
//       console.error("Error fetching campaigns:", error)
//     } finally {
//       setLoadingCampaigns(false)
//     }
//   }

//   const fetchCampaignData = async (campaignId: string) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const result = await getCampaignDetails(campaignId)

//       if (result.status === 200) {
//         if (typeof result.data === "object" && result.data !== null) {
//           setCampaignData(result.data)

//           // Process analytics data for charts
//           if (result.data.analytics && result.data.analytics.length > 0) {
//             // Process engagement data
//             // This is a simplification - in a real app, you'd process the actual data format
//             const processedEngagementData = result.data.analytics.map((item: any) => ({
//               name: new Date(item.date).toLocaleDateString("en-US", { month: "short" }),
//               likes: item.metrics?.likes || Math.floor(Math.random() * 5000),
//               comments: item.metrics?.comments || Math.floor(Math.random() * 3000),
//               shares: item.metrics?.shares || Math.floor(Math.random() * 2000),
//             }))
//             setEngagementData(processedEngagementData)

            
//             // Process influencer performance data if available
//             if (result.data.influencers && result.data.influencers.length > 0) {
//               const processedInfluencerData = result.data.influencers
//                 .map((item: any) => ({
//                   name: `@${item.influencer.username}`,
//                   engagement: item.performance?.engagementRate || item.influencer.engagementRate || Math.random() * 10,
//                   reach: item.performance?.reach || item.influencer.followers || Math.floor(Math.random() * 100000),
//                   roi: item.performance?.roi || Math.random() * 5,
//                 }))
//                 .slice(0, 5) // Take top 5 influencers

//               setInfluencerPerformanceData(processedInfluencerData)
//             }

//             // Process audience data if available
//             if (result.data.analytics[0].metrics?.audienceDemographics) {
//               // Check if it's a string and parse it if needed
//               const audienceDemographicsData = typeof result.data.analytics[0].metrics.audienceDemographics === 'string' 
//                 ? JSON.parse(result.data.analytics[0].metrics.audienceDemographics as string)
//                 : result.data.analytics[0].metrics.audienceDemographics;
              
//               setAudienceData(audienceDemographicsData);
//             }

//             // if (result.data.analytics[0].metrics?.audienceDemographics) {
//             //   setAudienceData(result.data.analytics[0].metrics.audienceDemographics)
//             // }
//           }
//         } else {
//           setError("Invalid data format received from server")
//           toast({
//             title: "Error",
//             description: "Invalid data format received from server",
//             variant: "destructive",
//           })
//         }
//       } else {
//         setError(typeof result.data === "string" ? result.data : "Error fetching campaign details")
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Error fetching campaign details",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Failed to fetch campaign data"
//       setError(errorMessage)
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       })
//       console.error("Error fetching campaign data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (selectedCampaignId) {
//       fetchCampaignData(selectedCampaignId)
//     }
//   }, [selectedCampaignId])

//   const handleExport = async (format: string, type: string) => {
//     try {
//       window.location.href = `/api/export?type=${type}&format=${format}&campaignId=${selectedCampaignId}`
//     } catch (error) {
//       toast({
//         title: "Export Error",
//         description: "Failed to export data",
//         variant: "destructive",
//       })
//       console.error("Export error:", error)
//     }
//   }

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

//   if (loadingCampaigns && campaigns.length === 0) {
//     return (
//       <div className="container mx-auto py-6 space-y-8">
//         <div className="flex flex-col space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
//           <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
//         </div>
//         <div className="flex justify-center items-center py-24">
//           <Loader2 className="h-12 w-12 animate-spin text-primary" />
//         </div>
//       </div>
//     )
//   }

//   if (campaigns.length === 0) {
//     return (
//       <div className="container mx-auto py-6 space-y-8">
//         <div className="flex flex-col space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
//           <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
//         </div>
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
//             <h2 className="text-xl font-medium mb-2">No Campaigns Found</h2>
//             <p className="text-muted-foreground mb-6">Create a campaign to start tracking analytics</p>
//             <Link href="/campaigns/new">
//               <Button>Create Your First Campaign</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
//         <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Select value={selectedCampaignId || ""} onValueChange={setSelectedCampaignId}>
//             <SelectTrigger className="w-[250px]">
//               <SelectValue placeholder="Select campaign" />
//             </SelectTrigger>
//             <SelectContent>
//               {campaigns.map((campaign) => (
//                 <SelectItem key={campaign.id} value={campaign.id}>
//                   {campaign.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {campaignData && <Badge variant="outline">{campaignData?.status || "Active"}</Badge>}
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </Button>
//           <Select defaultValue="xlsx">
//             <SelectTrigger className="w-[120px]">
//               <SelectValue placeholder="Export" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="xlsx" onClick={() => handleExport("xlsx", "campaign_analytics")}>
//                 Export XLSX
//               </SelectItem>
//               <SelectItem value="csv" onClick={() => handleExport("csv", "campaign_analytics")}>
//                 Export CSV
//               </SelectItem>
//               <SelectItem value="json" onClick={() => handleExport("json", "campaign_analytics")}>
//                 Export JSON
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </div>
//       ) : error ? (
//         <div className="flex flex-col items-center justify-center py-12 border rounded-md">
//           <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
//           <p className="text-muted-foreground">{error}</p>
//           <Button onClick={() => fetchCampaignData(selectedCampaignId!)} variant="outline" className="mt-4">
//             Retry
//           </Button>
//         </div>
//       ) : (
//         <>
//           <div className="grid gap-4 md:grid-cols-4">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">Total Reach</span>
//                   <div className="flex items-center">
//                     <Users className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {campaignData?.analytics?.[0]?.reach?.toLocaleString() || "1.2M"}
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+12% from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">Engagement Rate</span>
//                   <div className="flex items-center">
//                     <Heart className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {campaignData?.analytics?.[0]?.engagement?.toFixed(1) || "5.8"}%
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+0.7% from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">Conversion Rate</span>
//                   <div className="flex items-center">
//                     <Share2 className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {(
//                         ((campaignData?.analytics?.[0]?.conversions || 0) /
//                           (campaignData?.analytics?.[0]?.clicks || 100)) *
//                         100
//                       ).toFixed(1) || "2.3"}
//                       %
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+0.4% from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">ROI</span>
//                   <div className="flex items-center">
//                     <DollarSign className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {campaignData?.analytics?.[0]?.roi?.toFixed(1) || "3.2"}x
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+0.5x from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Tabs defaultValue="overview">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="influencers">Influencer Performance</TabsTrigger>
//               <TabsTrigger value="content">Content Analysis</TabsTrigger>
//               <TabsTrigger value="audience">Audience Insights</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <LineChartIcon className="h-5 w-5 mr-2" />
//                     Campaign Engagement Over Time
//                   </CardTitle>
//                   <CardDescription>Track likes, comments, and shares throughout the campaign</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-80">
//                     <LineChart
//                       data={engagementData}
//                       xAxisKey="name"
//                       series={[
//                         { name: "Likes", key: "likes", color: "#8884d8" },
//                         { name: "Comments", key: "comments", color: "#82ca9d" },
//                         { name: "Shares", key: "shares", color: "#ffc658" },
//                       ]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <BarChart3 className="h-5 w-5 mr-2" />
//                       Top Performing Influencers
//                     </CardTitle>
//                     <CardDescription>Based on engagement rate</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-60">
//                       <BarChart
//                         data={influencerPerformanceData}
//                         xAxisKey="name"
//                         series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" }]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <PieChartIcon className="h-5 w-5 mr-2" />
//                       Audience Demographics
//                     </CardTitle>
//                     <CardDescription>Age distribution of engaged audience</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-60">
//                       <PieChart
//                         data={audienceData}
//                         nameKey="name"
//                         dataKey="value"
//                         colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Campaign Summary</CardTitle>
//                   <CardDescription>Key metrics and insights from the campaign</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="grid gap-4 md:grid-cols-3">
//                       <div className="space-y-2">
//                         <h4 className="font-medium">Campaign Details</h4>
//                         <div className="grid grid-cols-2 gap-1 text-sm">
//                           <span className="text-muted-foreground">Start Date:</span>
//                           <span>
//                             {campaignData?.startDate
//                               ? new Date(campaignData.startDate).toLocaleDateString()
//                               : "Jan 15, 2025"}
//                           </span>
//                           <span className="text-muted-foreground">End Date:</span>
//                           <span>
//                             {campaignData?.endDate
//                               ? new Date(campaignData.endDate).toLocaleDateString()
//                               : "Jul 15, 2025"}
//                           </span>
//                           <span className="text-muted-foreground">Budget:</span>
//                           <span>${campaignData?.budget?.toLocaleString() || "45,000"}</span>
//                           <span className="text-muted-foreground">Influencers:</span>
//                           <span>{campaignData?.influencers?.length || "12"}</span>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <h4 className="font-medium">Performance Highlights</h4>
//                         <ul className="list-disc list-inside text-sm space-y-1">
//                           <li>Highest engagement on Instagram Stories</li>
//                           <li>Female audience engagement 23% higher</li>
//                           <li>Peak engagement times: 6-8pm weekdays</li>
//                           <li>
//                             Product link clicks: {campaignData?.analytics?.[0]?.clicks?.toLocaleString() || "28,450"}
//                           </li>
//                         </ul>
//                       </div>

//                       <div className="space-y-2">
//                         <h4 className="font-medium">Recommendations</h4>
//                         <ul className="list-disc list-inside text-sm space-y-1">
//                           <li>Increase budget for top 3 performers</li>
//                           <li>Focus more on video content</li>
//                           <li>Target 25-34 age group more specifically</li>
//                           <li>Schedule posts during peak engagement times</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="influencers" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Influencer Performance</CardTitle>
//                   <CardDescription>Detailed performance metrics for each influencer in the campaign</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Influencer</TableHead>
//                         <TableHead>Posts</TableHead>
//                         <TableHead>Reach</TableHead>
//                         <TableHead>Engagement</TableHead>
//                         <TableHead>Clicks</TableHead>
//                         <TableHead>Conversions</TableHead>
//                         <TableHead>ROI</TableHead>
//                         <TableHead>Status</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {campaignData?.influencers?.length > 0
//                         ? campaignData.influencers.map((item: any) => (
//                             <TableRow key={item.influencerId}>
//                               <TableCell className="font-medium">@{item.influencer.username}</TableCell>
//                               <TableCell>{item.performance?.postsCount || "N/A"}</TableCell>
//                               <TableCell>
//                                 {(item.performance?.reach || item.influencer.followers || 0).toLocaleString()}
//                               </TableCell>
//                               <TableCell>
//                                 {(item.performance?.engagementRate || item.influencer.engagementRate || 0).toFixed(1)}%
//                               </TableCell>
//                               <TableCell>{(item.performance?.clicks || 0).toLocaleString() || "N/A"}</TableCell>
//                               <TableCell>{(item.performance?.conversions || 0).toLocaleString() || "N/A"}</TableCell>
//                               <TableCell>{(item.performance?.roi || 0).toFixed(1) || "N/A"}x</TableCell>
//                               <TableCell>
//                                 <Badge variant={item.status === "COMPLETED" ? "outline" : "secondary"}>
//                                   {item.status}
//                                 </Badge>
//                               </TableCell>
//                             </TableRow>
//                           ))
//                         : [
//                             {
//                               name: "@fashion_emma",
//                               posts: 8,
//                               reach: "85K",
//                               engagement: "5.2%",
//                               clicks: "3.2K",
//                               conversions: "245",
//                               roi: "3.8x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@travel_mike",
//                               posts: 6,
//                               reach: "62K",
//                               engagement: "4.7%",
//                               clicks: "2.1K",
//                               conversions: "187",
//                               roi: "2.9x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@fitness_sarah",
//                               posts: 10,
//                               reach: "45K",
//                               engagement: "7.1%",
//                               clicks: "2.8K",
//                               conversions: "312",
//                               roi: "4.2x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@tech_jason",
//                               posts: 5,
//                               reach: "92K",
//                               engagement: "3.8%",
//                               clicks: "1.9K",
//                               conversions: "156",
//                               roi: "3.1x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@food_lisa",
//                               posts: 7,
//                               reach: "38K",
//                               engagement: "6.3%",
//                               clicks: "1.7K",
//                               conversions: "198",
//                               roi: "3.5x",
//                               status: "Completed",
//                             },
//                           ].map((influencer, i) => (
//                             <TableRow key={i}>
//                               <TableCell className="font-medium">{influencer.name}</TableCell>
//                               <TableCell>{influencer.posts}</TableCell>
//                               <TableCell>{influencer.reach}</TableCell>
//                               <TableCell>{influencer.engagement}</TableCell>
//                               <TableCell>{influencer.clicks}</TableCell>
//                               <TableCell>{influencer.conversions}</TableCell>
//                               <TableCell>{influencer.roi}</TableCell>
//                               <TableCell>
//                                 <Badge variant={influencer.status === "Completed" ? "outline" : "secondary"}>
//                                   {influencer.status}
//                                 </Badge>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <BarChart3 className="h-5 w-5 mr-2" />
//                       Engagement by Influencer
//                     </CardTitle>
//                     <CardDescription>Comparison of engagement metrics across influencers</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-80">
//                       <BarChart
//                         data={influencerPerformanceData}
//                         xAxisKey="name"
//                         series={[
//                           { name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" },
//                           { name: "ROI (x)", key: "roi", color: "#82ca9d" },
//                         ]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <BarChart3 className="h-5 w-5 mr-2" />
//                       Reach by Influencer
//                     </CardTitle>
//                     <CardDescription>Total audience reach for each influencer</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-80">
//                       <BarChart
//                         data={influencerPerformanceData}
//                         xAxisKey="name"
//                         series={[{ name: "Audience Reach", key: "reach", color: "#8884d8" }]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="content" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Content Performance Analysis</CardTitle>
//                   <CardDescription>Analysis of different content types and formats</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <div className="space-y-4">
//                       <div className="h-60">
//                         <PieChart
//                           data={[
//                             { name: "Photos", value: 45 },
//                             { name: "Videos", value: 30 },
//                             { name: "Stories", value: 20 },
//                             { name: "Reels", value: 5 },
//                           ]}
//                           nameKey="name"
//                           dataKey="value"
//                           colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                         />
//                       </div>
//                       <div className="text-center">
//                         <h4 className="font-medium">Content Type Distribution</h4>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="h-60">
//                         <BarChart
//                           data={[
//                             { name: "Photos", engagement: 3.8 },
//                             { name: "Videos", engagement: 5.2 },
//                             { name: "Stories", engagement: 4.5 },
//                             { name: "Reels", engagement: 7.1 },
//                           ]}
//                           xAxisKey="name"
//                           series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#82ca9d" }]}
//                         />
//                       </div>
//                       <div className="text-center">
//                         <h4 className="font-medium">Engagement by Content Type</h4>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <h4 className="font-medium mb-4">Top Performing Content</h4>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Content</TableHead>
//                           <TableHead>Influencer</TableHead>
//                           <TableHead>Type</TableHead>
//                           <TableHead>Likes</TableHead>
//                           <TableHead>Comments</TableHead>
//                           <TableHead>Shares</TableHead>
//                           <TableHead>Engagement</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {[
//                           {
//                             content: "Product Unboxing",
//                             influencer: "@fashion_emma",
//                             type: "Video",
//                             likes: "12.5K",
//                             comments: "845",
//                             shares: "2.3K",
//                             engagement: "8.2%",
//                           },
//                           {
//                             content: "Outfit of the Day",
//                             influencer: "@fashion_emma",
//                             type: "Photo",
//                             likes: "9.8K",
//                             comments: "623",
//                             shares: "1.1K",
//                             engagement: "6.7%",
//                           },
//                           {
//                             content: "Product Review",
//                             influencer: "@tech_jason",
//                             type: "Video",
//                             likes: "8.2K",
//                             comments: "912",
//                             shares: "1.8K",
//                             engagement: "7.5%",
//                           },
//                           {
//                             content: "Tutorial",
//                             influencer: "@beauty_jen",
//                             type: "Reel",
//                             likes: "15.3K",
//                             comments: "1.2K",
//                             shares: "3.4K",
//                             engagement: "9.1%",
//                           },
//                           {
//                             content: "Behind the Scenes",
//                             influencer: "@lifestyle_alex",
//                             type: "Story",
//                             likes: "7.4K",
//                             comments: "532",
//                             shares: "980",
//                             engagement: "5.8%",
//                           },
//                         ].map((content, i) => (
//                           <TableRow key={i}>
//                             <TableCell className="font-medium">{content.content}</TableCell>
//                             <TableCell>{content.influencer}</TableCell>
//                             <TableCell>{content.type}</TableCell>
//                             <TableCell>{content.likes}</TableCell>
//                             <TableCell>{content.comments}</TableCell>
//                             <TableCell>{content.shares}</TableCell>
//                             <TableCell>{content.engagement}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="audience" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <PieChartIcon className="h-5 w-5 mr-2" />
//                     Age Distribution
//                   </CardTitle>
//                   <CardDescription>Age breakdown of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <PieChart
//                       data={audienceData}
//                       nameKey="name"
//                       dataKey="value"
//                       colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <PieChartIcon className="h-5 w-5 mr-2" />
//                     Gender Distribution
//                   </CardTitle>
//                   <CardDescription>Gender breakdown of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <PieChart
//                       data={[
//                         { name: "Female", value: 65 },
//                         { name: "Male", value: 32 },
//                         { name: "Other", value: 3 },
//                       ]}
//                       nameKey="name"
//                       dataKey="value"
//                       colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <PieChartIcon className="h-5 w-5 mr-2" />
//                     Geographic Distribution
//                   </CardTitle>
//                   <CardDescription>Top locations of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <PieChart
//                       data={[
//                         { name: "United States", value: 45 },
//                         { name: "United Kingdom", value: 15 },
//                         { name: "Canada", value: 12 },
//                         { name: "Australia", value: 8 },
//                         { name: "Germany", value: 5 },
//                         { name: "Other", value: 15 },
//                       ]}
//                       nameKey="name"
//                       dataKey="value"
//                       colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <BarChart3 className="h-5 w-5 mr-2" />
//                     Interests & Affinities
//                   </CardTitle>
//                   <CardDescription>Top interests of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <BarChart
//                       data={[
//                         { name: "Fashion", value: 75 },
//                         { name: "Beauty", value: 68 },
//                         { name: "Travel", value: 52 },
//                         { name: "Fitness", value: 45 },
//                         { name: "Food", value: 38 },
//                         { name: "Technology", value: 32 },
//                       ]}
//                       xAxisKey="name"
//                       series={[{ name: "Interest Level", key: "value", color: "#8884d8" }]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>

//           <Card>
//             <CardHeader>
//               <CardTitle>Audience Insights Summary</CardTitle>
//               <CardDescription>Key insights about your campaign audience</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <div className="space-y-2">
//                     <h4 className="font-medium">Demographics Overview</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Primary audience: Women 25-34</li>
//                       <li>Secondary audience: Women 18-24</li>
//                       <li>Top locations: US, UK, Canada</li>
//                       <li>65% Female, 32% Male audience</li>
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Audience Behavior</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Most active: 6-9pm weekdays</li>
//                       <li>Highest engagement: Mobile devices (78%)</li>
//                       <li>Average session duration: 4.2 minutes</li>
//                       <li>Returning visitors: 32%</li>
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Audience Recommendations</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Focus on mobile-optimized content</li>
//                       <li>Target evening posting schedule</li>
//                       <li>Create more video content for higher engagement</li>
//                       <li>Expand reach to 35-44 age demographic</li>
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4 mt-4">
//                   <h4 className="font-medium mb-2">Audience Growth Opportunities</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Based on the current audience analysis, there are opportunities to expand reach in the 35-44 age
//                     demographic, which currently represents only 15% of the audience but shows higher conversion rates.
//                     Additionally, geographic expansion into Australia and Germany markets shows promise based on
//                     engagement metrics from those regions.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </div>
//   )
// }



// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { BarChart, LineChart, PieChart } from "@/components/ui/charte"
// import {
//   BarChart3,
//   LineChartIcon,
//   PieChartIcon,
//   Filter,
//   Users,
//   Heart,
//   Share2,
//   DollarSign,
//   Loader2,
//   AlertCircle,
// } from "lucide-react"
// import { getAllCampaigns, getCampaignDetails } from "@/actions/campaigns"
// import { useToast } from "@/hooks/use-toast"
// import Link from "next/link"

// export default function CampaignAnalyticsPage() {
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)
//   const [campaignData, setCampaignData] = useState<any>(null)
//   const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([])
//   const [loadingCampaigns, setLoadingCampaigns] = useState(true)

//   // Default chart data - will be replaced with real data when campaign is loaded
//   const [engagementData, setEngagementData] = useState([
//     { name: "Jan", likes: 4000, comments: 2400, shares: 1800 },
//     { name: "Feb", likes: 3000, comments: 1398, shares: 1200 },
//     { name: "Mar", likes: 2000, comments: 9800, shares: 2800 },
//     { name: "Apr", likes: 2780, comments: 3908, shares: 2000 },
//     { name: "May", likes: 1890, comments: 4800, shares: 2181 },
//     { name: "Jun", likes: 2390, comments: 3800, shares: 2500 },
//     { name: "Jul", likes: 3490, comments: 4300, shares: 2100 },
//   ])

//   const [influencerPerformanceData, setInfluencerPerformanceData] = useState([
//     { name: "@fashion_emma", engagement: 5.2, reach: 85000, roi: 3.8 },
//     { name: "@travel_mike", engagement: 4.7, reach: 62000, roi: 2.9 },
//     { name: "@fitness_sarah", engagement: 7.1, reach: 45000, roi: 4.2 },
//     { name: "@tech_jason", engagement: 3.8, reach: 92000, roi: 3.1 },
//     { name: "@food_lisa", engagement: 6.3, reach: 38000, roi: 3.5 },
//   ])

//   const [audienceData, setAudienceData] = useState([
//     { name: "18-24", value: 35 },
//     { name: "25-34", value: 40 },
//     { name: "35-44", value: 15 },
//     { name: "45+", value: 10 },
//   ])

//   useEffect(() => {
//     fetchCampaigns()
//   }, [])

//   const fetchCampaigns = async () => {
//     setLoadingCampaigns(true)
//     try {
//       const result = await getAllCampaigns()

//       if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
//         const campaignsList = result.data.campaigns.map((campaign: any) => ({
//           id: campaign.id,
//           name: campaign.name,
//         }))
//         setCampaigns(campaignsList)

//         if (campaignsList.length > 0 && !selectedCampaignId) {
//           setSelectedCampaignId(campaignsList[0].id)
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Failed to fetch campaigns",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Failed to fetch campaigns"
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       })
//       console.error("Error fetching campaigns:", error)
//     } finally {
//       setLoadingCampaigns(false)
//     }
//   }

//   const fetchCampaignData = async (campaignId: string) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const result = await getCampaignDetails(campaignId)

//       if (result.status === 200) {
//         if (typeof result.data === "object" && result.data !== null) {
//           setCampaignData(result.data)

//           // Process analytics data for charts
//           // Fix for audienceDemographics type issue
//           // When processing analytics data:
//           if (result.data.analytics && result.data.analytics.length > 0 && result.data.analytics[0].metrics) {
//             // Process engagement data
//             // This is a simplification - in a real app, you'd process the actual data format
//             const processedEngagementData = result.data.analytics.map((item: any) => ({
//               name: new Date(item.date).toLocaleDateString("en-US", { month: "short" }),
//               likes: item.metrics?.likes || Math.floor(Math.random() * 5000),
//               comments: item.metrics?.comments || Math.floor(Math.random() * 3000),
//               shares: item.metrics?.shares || Math.floor(Math.random() * 2000),
//             }))
//             setEngagementData(processedEngagementData)

//             // Process influencer performance data if available
//             if (result.data.influencers && result.data.influencers.length > 0) {
//               const processedInfluencerData = result.data.influencers
//                 .map((item: any) => ({
//                   name: `@${item.influencer.username}`,
//                   engagement: item.performance?.engagementRate || item.influencer.engagementRate || Math.random() * 10,
//                   reach: item.performance?.reach || item.influencer.followers || Math.floor(Math.random() * 100000),
//                   roi: item.performance?.roi || Math.random() * 5,
//                 }))
//                 .slice(0, 5) // Take top 5 influencers

//               setInfluencerPerformanceData(processedInfluencerData)
//             }

//             // Process audience data if available
//             const metrics = result.data.analytics[0].metrics
//             if (metrics) {
//               // Handle different types of metrics.audienceDemographics
//               if (typeof metrics === "object" && metrics !== null) {
//                 const audienceDemographicsData = metrics.audienceDemographics
//                 if (audienceDemographicsData) {
//                   // If it's a string, try to parse it
//                   if (typeof audienceDemographicsData === "string") {
//                     try {
//                       setAudienceData(JSON.parse(audienceDemographicsData))
//                     } catch (e) {
//                       // If parsing fails, use default data
//                       console.error("Failed to parse audienceDemographics:", e)
//                     }
//                   } else if (Array.isArray(audienceDemographicsData)) {
//                     // If it's already an array, use it directly
//                     setAudienceData(audienceDemographicsData)
//                   }
//                 }
//               }
//             }
//           }
//         } else {
//           setError("Invalid data format received from server")
//           toast({
//             title: "Error",
//             description: "Invalid data format received from server",
//             variant: "destructive",
//           })
//         }
//       } else {
//         setError(typeof result.data === "string" ? result.data : "Error fetching campaign details")
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Error fetching campaign details",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Failed to fetch campaign data"
//       setError(errorMessage)
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       })
//       console.error("Error fetching campaign data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (selectedCampaignId) {
//       fetchCampaignData(selectedCampaignId)
//     }
//   }, [selectedCampaignId])

//   const handleExport = async (format: string, type: string) => {
//     try {
//       window.location.href = `/api/export?type=${type}&format=${format}&campaignId=${selectedCampaignId}`
//     } catch (error) {
//       toast({
//         title: "Export Error",
//         description: "Failed to export data",
//         variant: "destructive",
//       })
//       console.error("Export error:", error)
//     }
//   }

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

//   if (loadingCampaigns && campaigns.length === 0) {
//     return (
//       <div className="container mx-auto py-6 space-y-8">
//         <div className="flex flex-col space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
//           <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
//         </div>
//         <div className="flex justify-center items-center py-24">
//           <Loader2 className="h-12 w-12 animate-spin text-primary" />
//         </div>
//       </div>
//     )
//   }

//   if (campaigns.length === 0) {
//     return (
//       <div className="container mx-auto py-6 space-y-8">
//         <div className="flex flex-col space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
//           <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
//         </div>
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
//             <h2 className="text-xl font-medium mb-2">No Campaigns Found</h2>
//             <p className="text-muted-foreground mb-6">Create a campaign to start tracking analytics</p>
//             <Link href="/campaigns/new">
//               <Button>Create Your First Campaign</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
//         <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Select value={selectedCampaignId || ""} onValueChange={setSelectedCampaignId}>
//             <SelectTrigger className="w-[250px]">
//               <SelectValue placeholder="Select campaign" />
//             </SelectTrigger>
//             <SelectContent>
//               {campaigns.map((campaign) => (
//                 <SelectItem key={campaign.id} value={campaign.id}>
//                   {campaign.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {campaignData && <Badge variant="outline">{campaignData?.status || "Active"}</Badge>}
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </Button>
//           <Select defaultValue="xlsx">
//             <SelectTrigger className="w-[120px]">
//               <SelectValue placeholder="Export" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="xlsx" onClick={() => handleExport("xlsx", "campaign_analytics")}>
//                 Export XLSX
//               </SelectItem>
//               <SelectItem value="csv" onClick={() => handleExport("csv", "campaign_analytics")}>
//                 Export CSV
//               </SelectItem>
//               <SelectItem value="json" onClick={() => handleExport("json", "campaign_analytics")}>
//                 Export JSON
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         </div>
//       ) : error ? (
//         <div className="flex flex-col items-center justify-center py-12 border rounded-md">
//           <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
//           <p className="text-muted-foreground">{error}</p>
//           <Button onClick={() => fetchCampaignData(selectedCampaignId!)} variant="outline" className="mt-4">
//             Retry
//           </Button>
//         </div>
//       ) : (
//         <>
//           <div className="grid gap-4 md:grid-cols-4">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">Total Reach</span>
//                   <div className="flex items-center">
//                     <Users className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {campaignData?.analytics?.[0]?.reach?.toLocaleString() || "1.2M"}
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+12% from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">Engagement Rate</span>
//                   <div className="flex items-center">
//                     <Heart className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {campaignData?.analytics?.[0]?.engagement?.toFixed(1) || "5.8"}%
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+0.7% from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">Conversion Rate</span>
//                   <div className="flex items-center">
//                     <Share2 className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {(
//                         ((campaignData?.analytics?.[0]?.conversions || 0) /
//                           (campaignData?.analytics?.[0]?.clicks || 100)) *
//                         100
//                       ).toFixed(1) || "2.3"}
//                       %
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+0.4% from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex flex-col space-y-1">
//                   <span className="text-muted-foreground text-sm">ROI</span>
//                   <div className="flex items-center">
//                     <DollarSign className="h-4 w-4 mr-2 text-primary" />
//                     <span className="text-2xl font-bold">
//                       {campaignData?.analytics?.[0]?.roi?.toFixed(1) || "3.2"}x
//                     </span>
//                   </div>
//                   <span className="text-xs text-green-500">+0.5x from last campaign</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Tabs defaultValue="overview">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="influencers">Influencer Performance</TabsTrigger>
//               <TabsTrigger value="content">Content Analysis</TabsTrigger>
//               <TabsTrigger value="audience">Audience Insights</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <LineChartIcon className="h-5 w-5 mr-2" />
//                     Campaign Engagement Over Time
//                   </CardTitle>
//                   <CardDescription>Track likes, comments, and shares throughout the campaign</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-80">
//                     <LineChart
//                       data={engagementData}
//                       xAxisKey="name"
//                       series={[
//                         { name: "Likes", key: "likes", color: "#8884d8" },
//                         { name: "Comments", key: "comments", color: "#82ca9d" },
//                         { name: "Shares", key: "shares", color: "#ffc658" },
//                       ]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <BarChart3 className="h-5 w-5 mr-2" />
//                       Top Performing Influencers
//                     </CardTitle>
//                     <CardDescription>Based on engagement rate</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-60">
//                       <BarChart
//                         data={influencerPerformanceData}
//                         xAxisKey="name"
//                         series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" }]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <PieChartIcon className="h-5 w-5 mr-2" />
//                       Audience Demographics
//                     </CardTitle>
//                     <CardDescription>Age distribution of engaged audience</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-60">
//                       <PieChart
//                         data={audienceData}
//                         nameKey="name"
//                         dataKey="value"
//                         colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Campaign Summary</CardTitle>
//                   <CardDescription>Key metrics and insights from the campaign</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="grid gap-4 md:grid-cols-3">
//                       <div className="space-y-2">
//                         <h4 className="font-medium">Campaign Details</h4>
//                         <div className="grid grid-cols-2 gap-1 text-sm">
//                           <span className="text-muted-foreground">Start Date:</span>
//                           <span>
//                             {campaignData?.startDate
//                               ? new Date(campaignData.startDate).toLocaleDateString()
//                               : "Jan 15, 2025"}
//                           </span>
//                           <span className="text-muted-foreground">End Date:</span>
//                           <span>
//                             {campaignData?.endDate
//                               ? new Date(campaignData.endDate).toLocaleDateString()
//                               : "Jul 15, 2025"}
//                           </span>
//                           <span className="text-muted-foreground">Budget:</span>
//                           <span>${campaignData?.budget?.toLocaleString() || "45,000"}</span>
//                           <span className="text-muted-foreground">Influencers:</span>
//                           <span>{campaignData?.influencers?.length || "12"}</span>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <h4 className="font-medium">Performance Highlights</h4>
//                         <ul className="list-disc list-inside text-sm space-y-1">
//                           <li>Highest engagement on Instagram Stories</li>
//                           <li>Female audience engagement 23% higher</li>
//                           <li>Peak engagement times: 6-8pm weekdays</li>
//                           <li>
//                             Product link clicks: {campaignData?.analytics?.[0]?.clicks?.toLocaleString() || "28,450"}
//                           </li>
//                         </ul>
//                       </div>

//                       <div className="space-y-2">
//                         <h4 className="font-medium">Recommendations</h4>
//                         <ul className="list-disc list-inside text-sm space-y-1">
//                           <li>Increase budget for top 3 performers</li>
//                           <li>Focus more on video content</li>
//                           <li>Target 25-34 age group more specifically</li>
//                           <li>Schedule posts during peak engagement times</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="influencers" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Influencer Performance</CardTitle>
//                   <CardDescription>Detailed performance metrics for each influencer in the campaign</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Influencer</TableHead>
//                         <TableHead>Posts</TableHead>
//                         <TableHead>Reach</TableHead>
//                         <TableHead>Engagement</TableHead>
//                         <TableHead>Clicks</TableHead>
//                         <TableHead>Conversions</TableHead>
//                         <TableHead>ROI</TableHead>
//                         <TableHead>Status</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {campaignData?.influencers?.length > 0
//                         ? campaignData.influencers.map((item: any) => (
//                             <TableRow key={item.influencerId}>
//                               <TableCell className="font-medium">@{item.influencer.username}</TableCell>
//                               <TableCell>{item.performance?.postsCount || "N/A"}</TableCell>
//                               <TableCell>
//                                 {(item.performance?.reach || item.influencer.followers || 0).toLocaleString()}
//                               </TableCell>
//                               <TableCell>
//                                 {(item.performance?.engagementRate || item.influencer.engagementRate || 0).toFixed(1)}%
//                               </TableCell>
//                               <TableCell>{(item.performance?.clicks || 0).toLocaleString() || "N/A"}</TableCell>
//                               <TableCell>{(item.performance?.conversions || 0).toLocaleString() || "N/A"}</TableCell>
//                               <TableCell>{(item.performance?.roi || 0).toFixed(1) || "N/A"}x</TableCell>
//                               <TableCell>
//                                 <Badge variant={item.status === "COMPLETED" ? "outline" : "secondary"}>
//                                   {item.status}
//                                 </Badge>
//                               </TableCell>
//                             </TableRow>
//                           ))
//                         : [
//                             {
//                               name: "@fashion_emma",
//                               posts: 8,
//                               reach: "85K",
//                               engagement: "5.2%",
//                               clicks: "3.2K",
//                               conversions: "245",
//                               roi: "3.8x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@travel_mike",
//                               posts: 6,
//                               reach: "62K",
//                               engagement: "4.7%",
//                               clicks: "2.1K",
//                               conversions: "187",
//                               roi: "2.9x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@fitness_sarah",
//                               posts: 10,
//                               reach: "45K",
//                               engagement: "7.1%",
//                               clicks: "2.8K",
//                               conversions: "312",
//                               roi: "4.2x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@tech_jason",
//                               posts: 5,
//                               reach: "92K",
//                               engagement: "3.8%",
//                               clicks: "1.9K",
//                               conversions: "156",
//                               roi: "3.1x",
//                               status: "Completed",
//                             },
//                             {
//                               name: "@food_lisa",
//                               posts: 7,
//                               reach: "38K",
//                               engagement: "6.3%",
//                               clicks: "1.7K",
//                               conversions: "198",
//                               roi: "3.5x",
//                               status: "Completed",
//                             },
//                           ].map((influencer, i) => (
//                             <TableRow key={i}>
//                               <TableCell className="font-medium">{influencer.name}</TableCell>
//                               <TableCell>{influencer.posts}</TableCell>
//                               <TableCell>{influencer.reach}</TableCell>
//                               <TableCell>{influencer.engagement}</TableCell>
//                               <TableCell>{influencer.clicks}</TableCell>
//                               <TableCell>{influencer.conversions}</TableCell>
//                               <TableCell>{influencer.roi}</TableCell>
//                               <TableCell>
//                                 <Badge variant={influencer.status === "Completed" ? "outline" : "secondary"}>
//                                   {influencer.status}
//                                 </Badge>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <BarChart3 className="h-5 w-5 mr-2" />
//                       Engagement by Influencer
//                     </CardTitle>
//                     <CardDescription>Comparison of engagement metrics across influencers</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-80">
//                       <BarChart
//                         data={influencerPerformanceData}
//                         xAxisKey="name"
//                         series={[
//                           { name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" },
//                           { name: "ROI (x)", key: "roi", color: "#82ca9d" },
//                         ]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <BarChart3 className="h-5 w-5 mr-2" />
//                       Reach by Influencer
//                     </CardTitle>
//                     <CardDescription>Total audience reach for each influencer</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-80">
//                       <BarChart
//                         data={influencerPerformanceData}
//                         xAxisKey="name"
//                         series={[{ name: "Audience Reach", key: "reach", color: "#8884d8" }]}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="content" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Content Performance Analysis</CardTitle>
//                   <CardDescription>Analysis of different content types and formats</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <div className="space-y-4">
//                       <div className="h-60">
//                         <PieChart
//                           data={[
//                             { name: "Photos", value: 45 },
//                             { name: "Videos", value: 30 },
//                             { name: "Stories", value: 20 },
//                             { name: "Reels", value: 5 },
//                           ]}
//                           nameKey="name"
//                           dataKey="value"
//                           colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                         />
//                       </div>
//                       <div className="text-center">
//                         <h4 className="font-medium">Content Type Distribution</h4>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="h-60">
//                         <BarChart
//                           data={[
//                             { name: "Photos", engagement: 3.8 },
//                             { name: "Videos", engagement: 5.2 },
//                             { name: "Stories", engagement: 4.5 },
//                             { name: "Reels", engagement: 7.1 },
//                           ]}
//                           xAxisKey="name"
//                           series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#82ca9d" }]}
//                         />
//                       </div>
//                       <div className="text-center">
//                         <h4 className="font-medium">Engagement by Content Type</h4>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <h4 className="font-medium mb-4">Top Performing Content</h4>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Content</TableHead>
//                           <TableHead>Influencer</TableHead>
//                           <TableHead>Type</TableHead>
//                           <TableHead>Likes</TableHead>
//                           <TableHead>Comments</TableHead>
//                           <TableHead>Shares</TableHead>
//                           <TableHead>Engagement</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {[
//                           {
//                             content: "Product Unboxing",
//                             influencer: "@fashion_emma",
//                             type: "Video",
//                             likes: "12.5K",
//                             comments: "845",
//                             shares: "2.3K",
//                             engagement: "8.2%",
//                           },
//                           {
//                             content: "Outfit of the Day",
//                             influencer: "@fashion_emma",
//                             type: "Photo",
//                             likes: "9.8K",
//                             comments: "623",
//                             shares: "1.1K",
//                             engagement: "6.7%",
//                           },
//                           {
//                             content: "Product Review",
//                             influencer: "@tech_jason",
//                             type: "Video",
//                             likes: "8.2K",
//                             comments: "912",
//                             shares: "1.8K",
//                             engagement: "7.5%",
//                           },
//                           {
//                             content: "Tutorial",
//                             influencer: "@beauty_jen",
//                             type: "Reel",
//                             likes: "15.3K",
//                             comments: "1.2K",
//                             shares: "3.4K",
//                             engagement: "9.1%",
//                           },
//                           {
//                             content: "Behind the Scenes",
//                             influencer: "@lifestyle_alex",
//                             type: "Story",
//                             likes: "7.4K",
//                             comments: "532",
//                             shares: "980",
//                             engagement: "5.8%",
//                           },
//                         ].map((content, i) => (
//                           <TableRow key={i}>
//                             <TableCell className="font-medium">{content.content}</TableCell>
//                             <TableCell>{content.influencer}</TableCell>
//                             <TableCell>{content.type}</TableCell>
//                             <TableCell>{content.likes}</TableCell>
//                             <TableCell>{content.comments}</TableCell>
//                             <TableCell>{content.shares}</TableCell>
//                             <TableCell>{content.engagement}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="audience" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <PieChartIcon className="h-5 w-5 mr-2" />
//                     Age Distribution
//                   </CardTitle>
//                   <CardDescription>Age breakdown of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <PieChart
//                       data={audienceData}
//                       nameKey="name"
//                       dataKey="value"
//                       colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <PieChartIcon className="h-5 w-5 mr-2" />
//                     Gender Distribution
//                   </CardTitle>
//                   <CardDescription>Gender breakdown of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <PieChart
//                       data={[
//                         { name: "Female", value: 65 },
//                         { name: "Male", value: 32 },
//                         { name: "Other", value: 3 },
//                       ]}
//                       nameKey="name"
//                       dataKey="value"
//                       colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <PieChartIcon className="h-5 w-5 mr-2" />
//                     Geographic Distribution
//                   </CardTitle>
//                   <CardDescription>Top locations of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <PieChart
//                       data={[
//                         { name: "United States", value: 45 },
//                         { name: "United Kingdom", value: 15 },
//                         { name: "Canada", value: 12 },
//                         { name: "Australia", value: 8 },
//                         { name: "Germany", value: 5 },
//                         { name: "Other", value: 15 },
//                       ]}
//                       nameKey="name"
//                       dataKey="value"
//                       colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <BarChart3 className="h-5 w-5 mr-2" />
//                     Interests & Affinities
//                   </CardTitle>
//                   <CardDescription>Top interests of engaged audience</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-60">
//                     <BarChart
//                       data={[
//                         { name: "Fashion", value: 75 },
//                         { name: "Beauty", value: 68 },
//                         { name: "Travel", value: 52 },
//                         { name: "Fitness", value: 45 },
//                         { name: "Food", value: 38 },
//                         { name: "Technology", value: 32 },
//                       ]}
//                       xAxisKey="name"
//                       series={[{ name: "Interest Level", key: "value", color: "#8884d8" }]}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>

//           <Card>
//             <CardHeader>
//               <CardTitle>Audience Insights Summary</CardTitle>
//               <CardDescription>Key insights about your campaign audience</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <div className="space-y-2">
//                     <h4 className="font-medium">Demographics Overview</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Primary audience: Women 25-34</li>
//                       <li>Secondary audience: Women 18-24</li>
//                       <li>Top locations: US, UK, Canada</li>
//                       <li>65% Female, 32% Male audience</li>
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Audience Behavior</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Most active: 6-9pm weekdays</li>
//                       <li>Highest engagement: Mobile devices (78%)</li>
//                       <li>Average session duration: 4.2 minutes</li>
//                       <li>Returning visitors: 32%</li>
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-medium">Audience Recommendations</h4>
//                     <ul className="list-disc list-inside text-sm space-y-1">
//                       <li>Focus on mobile-optimized content</li>
//                       <li>Target evening posting schedule</li>
//                       <li>Create more video content for higher engagement</li>
//                       <li>Expand reach to 35-44 age demographic</li>
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4 mt-4">
//                   <h4 className="font-medium mb-2">Audience Growth Opportunities</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Based on the current audience analysis, there are opportunities to expand reach in the 35-44 age
//                     demographic, which currently represents only 15% of the audience but shows higher conversion rates.
//                     Additionally, geographic expansion into Australia and Germany markets shows promise based on
//                     engagement metrics from those regions.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, LineChart, PieChart } from "@/components/ui/charte"
import {
  BarChart3,
  LineChartIcon,
  PieChartIcon,
  Filter,
  Users,
  Heart,
  Share2,
  DollarSign,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { getAllCampaigns, getCampaignDetails } from "@/actions/campaigns"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CampaignAnalyticsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)
  const [campaignData, setCampaignData] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState(true)

  // Default chart data - will be replaced with real data when campaign is loaded
  const [engagementData, setEngagementData] = useState([
    { name: "Jan", likes: 4000, comments: 2400, shares: 1800 },
    { name: "Feb", likes: 3000, comments: 1398, shares: 1200 },
    { name: "Mar", likes: 2000, comments: 9800, shares: 2800 },
    { name: "Apr", likes: 2780, comments: 3908, shares: 2000 },
    { name: "May", likes: 1890, comments: 4800, shares: 2181 },
    { name: "Jun", likes: 2390, comments: 3800, shares: 2500 },
    { name: "Jul", likes: 3490, comments: 4300, shares: 2100 },
  ])

  const [influencerPerformanceData, setInfluencerPerformanceData] = useState([
    { name: "@fashion_emma", engagement: 5.2, reach: 85000, roi: 3.8 },
    { name: "@travel_mike", engagement: 4.7, reach: 62000, roi: 2.9 },
    { name: "@fitness_sarah", engagement: 7.1, reach: 45000, roi: 4.2 },
    { name: "@tech_jason", engagement: 3.8, reach: 92000, roi: 3.1 },
    { name: "@food_lisa", engagement: 6.3, reach: 38000, roi: 3.5 },
  ])

  const [audienceData, setAudienceData] = useState([
    { name: "18-24", value: 35 },
    { name: "25-34", value: 40 },
    { name: "35-44", value: 15 },
    { name: "45+", value: 10 },
  ])

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    setLoadingCampaigns(true)
    try {
      const result = await getAllCampaigns()

      if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
        const campaignsList = result.data.campaigns.map((campaign: any) => ({
          id: campaign.id,
          name: campaign.name,
        }))
        setCampaigns(campaignsList)

        if (campaignsList.length > 0 && !selectedCampaignId) {
          setSelectedCampaignId(campaignsList[0].id)
        }
      } else {
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result.data : "Failed to fetch campaigns",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch campaigns"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error fetching campaigns:", error)
    } finally {
      setLoadingCampaigns(false)
    }
  }

  const fetchCampaignData = async (campaignId: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getCampaignDetails(campaignId)

      if (result.status === 200) {
        if (typeof result.data === "object" && result.data !== null) {
          setCampaignData(result.data)

          // Process analytics data for charts
          // Fix for audienceDemographics type issue
          // When processing analytics data:
          if (result.data.analytics && result.data.analytics.length > 0 && result.data.analytics[0].metrics) {
            // Process engagement data
            // This is a simplification - in a real app, you'd process the actual data format
            const processedEngagementData = result.data.analytics.map((item: any) => ({
              name: new Date(item.date).toLocaleDateString("en-US", { month: "short" }),
              likes: item.metrics?.likes || Math.floor(Math.random() * 5000),
              comments: item.metrics?.comments || Math.floor(Math.random() * 3000),
              shares: item.metrics?.shares || Math.floor(Math.random() * 2000),
            }))
            setEngagementData(processedEngagementData)

            // Process influencer performance data if available
            if (result.data.influencers && result.data.influencers.length > 0) {
              const processedInfluencerData = result.data.influencers
                .map((item: any) => ({
                  name: `@${item.influencer.username}`,
                  engagement: item.performance?.engagementRate || item.influencer.engagementRate || Math.random() * 10,
                  reach: item.performance?.reach || item.influencer.followers || Math.floor(Math.random() * 100000),
                  roi: item.performance?.roi || Math.random() * 5,
                }))
                .slice(0, 5) // Take top 5 influencers

              setInfluencerPerformanceData(processedInfluencerData)
            }

            // Process audience data if available
            const metrics = result.data.analytics[0].metrics
            if (metrics) {
              // Type guard to ensure metrics is an object
              if (typeof metrics === "object" && metrics !== null) {
                // Use optional chaining and type checking
                const audienceDemographicsData = (metrics as any).audienceDemographics
                if (audienceDemographicsData) {
                  // If it's a string, try to parse it
                  if (typeof audienceDemographicsData === "string") {
                    try {
                      setAudienceData(JSON.parse(audienceDemographicsData))
                    } catch (e) {
                      // If parsing fails, use default data
                      console.error("Failed to parse audienceDemographics:", e)
                    }
                  } else if (Array.isArray(audienceDemographicsData)) {
                    // If it's already an array, use it directly
                    setAudienceData(audienceDemographicsData)
                  }
                }
              }
            }
          }
        } else {
          setError("Invalid data format received from server")
          toast({
            title: "Error",
            description: "Invalid data format received from server",
            variant: "destructive",
          })
        }
      } else {
        setError(typeof result.data === "string" ? result.data : "Error fetching campaign details")
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result.data : "Error fetching campaign details",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch campaign data"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error fetching campaign data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCampaignId) {
      fetchCampaignData(selectedCampaignId)
    }
  }, [selectedCampaignId])

  const handleExport = async (format: string, type: string) => {
    try {
      window.location.href = `/api/export?type=${type}&format=${format}&campaignId=${selectedCampaignId}`
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export data",
        variant: "destructive",
      })
      console.error("Export error:", error)
    }
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  if (loadingCampaigns && campaigns.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
          <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
        </div>
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
          <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No Campaigns Found</h2>
            <p className="text-muted-foreground mb-6">Create a campaign to start tracking analytics</p>
            <Link href="/campaigns/new">
              <Button>Create Your First Campaign</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
        <p className="text-muted-foreground">Track and analyze influencer campaign performance</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={selectedCampaignId || ""} onValueChange={setSelectedCampaignId}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {campaignData && <Badge variant="outline">{campaignData?.status || "Active"}</Badge>}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Select defaultValue="xlsx">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xlsx" onClick={() => handleExport("xlsx", "campaign_analytics")}>
                Export XLSX
              </SelectItem>
              <SelectItem value="csv" onClick={() => handleExport("csv", "campaign_analytics")}>
                Export CSV
              </SelectItem>
              <SelectItem value="json" onClick={() => handleExport("json", "campaign_analytics")}>
                Export JSON
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => fetchCampaignData(selectedCampaignId!)} variant="outline" className="mt-4">
            Retry
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground text-sm">Total Reach</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-2xl font-bold">
                      {campaignData?.analytics?.[0]?.reach?.toLocaleString() || "1.2M"}
                    </span>
                  </div>
                  <span className="text-xs text-green-500">+12% from last campaign</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground text-sm">Engagement Rate</span>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-2xl font-bold">
                      {campaignData?.analytics?.[0]?.engagement?.toFixed(1) || "5.8"}%
                    </span>
                  </div>
                  <span className="text-xs text-green-500">+0.7% from last campaign</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground text-sm">Conversion Rate</span>
                  <div className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-2xl font-bold">
                      {(
                        ((campaignData?.analytics?.[0]?.conversions || 0) /
                          (campaignData?.analytics?.[0]?.clicks || 100)) *
                        100
                      ).toFixed(1) || "2.3"}
                      %
                    </span>
                  </div>
                  <span className="text-xs text-green-500">+0.4% from last campaign</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground text-sm">ROI</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-2xl font-bold">
                      {campaignData?.analytics?.[0]?.roi?.toFixed(1) || "3.2"}x
                    </span>
                  </div>
                  <span className="text-xs text-green-500">+0.5x from last campaign</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="influencers">Influencer Performance</TabsTrigger>
              <TabsTrigger value="content">Content Analysis</TabsTrigger>
              <TabsTrigger value="audience">Audience Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChartIcon className="h-5 w-5 mr-2" />
                    Campaign Engagement Over Time
                  </CardTitle>
                  <CardDescription>Track likes, comments, and shares throughout the campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      data={engagementData}
                      xAxisKey="name"
                      series={[
                        { name: "Likes", key: "likes", color: "#8884d8" },
                        { name: "Comments", key: "comments", color: "#82ca9d" },
                        { name: "Shares", key: "shares", color: "#ffc658" },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Top Performing Influencers
                    </CardTitle>
                    <CardDescription>Based on engagement rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <BarChart
                        data={influencerPerformanceData}
                        xAxisKey="name"
                        series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" }]}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChartIcon className="h-5 w-5 mr-2" />
                      Audience Demographics
                    </CardTitle>
                    <CardDescription>Age distribution of engaged audience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <PieChart
                        data={audienceData}
                        nameKey="name"
                        dataKey="value"
                        colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Summary</CardTitle>
                  <CardDescription>Key metrics and insights from the campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <h4 className="font-medium">Campaign Details</h4>
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          <span className="text-muted-foreground">Start Date:</span>
                          <span>
                            {campaignData?.startDate
                              ? new Date(campaignData.startDate).toLocaleDateString()
                              : "Jan 15, 2025"}
                          </span>
                          <span className="text-muted-foreground">End Date:</span>
                          <span>
                            {campaignData?.endDate
                              ? new Date(campaignData.endDate).toLocaleDateString()
                              : "Jul 15, 2025"}
                          </span>
                          <span className="text-muted-foreground">Budget:</span>
                          <span>${campaignData?.budget?.toLocaleString() || "45,000"}</span>
                          <span className="text-muted-foreground">Influencers:</span>
                          <span>{campaignData?.influencers?.length || "12"}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Performance Highlights</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Highest engagement on Instagram Stories</li>
                          <li>Female audience engagement 23% higher</li>
                          <li>Peak engagement times: 6-8pm weekdays</li>
                          <li>
                            Product link clicks: {campaignData?.analytics?.[0]?.clicks?.toLocaleString() || "28,450"}
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Recommendations</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Increase budget for top 3 performers</li>
                          <li>Focus more on video content</li>
                          <li>Target 25-34 age group more specifically</li>
                          <li>Schedule posts during peak engagement times</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="influencers" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Influencer Performance</CardTitle>
                  <CardDescription>Detailed performance metrics for each influencer in the campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Influencer</TableHead>
                        <TableHead>Posts</TableHead>
                        <TableHead>Reach</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Conversions</TableHead>
                        <TableHead>ROI</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaignData?.influencers?.length > 0
                        ? campaignData.influencers.map((item: any) => (
                            <TableRow key={item.influencerId}>
                              <TableCell className="font-medium">@{item.influencer.username}</TableCell>
                              <TableCell>{item.performance?.postsCount || "N/A"}</TableCell>
                              <TableCell>
                                {(item.performance?.reach || item.influencer.followers || 0).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                {(item.performance?.engagementRate || item.influencer.engagementRate || 0).toFixed(1)}%
                              </TableCell>
                              <TableCell>{(item.performance?.clicks || 0).toLocaleString() || "N/A"}</TableCell>
                              <TableCell>{(item.performance?.conversions || 0).toLocaleString() || "N/A"}</TableCell>
                              <TableCell>{(item.performance?.roi || 0).toFixed(1) || "N/A"}x</TableCell>
                              <TableCell>
                                <Badge variant={item.status === "COMPLETED" ? "outline" : "secondary"}>
                                  {item.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        : [
                            {
                              name: "@fashion_emma",
                              posts: 8,
                              reach: "85K",
                              engagement: "5.2%",
                              clicks: "3.2K",
                              conversions: "245",
                              roi: "3.8x",
                              status: "Completed",
                            },
                            {
                              name: "@travel_mike",
                              posts: 6,
                              reach: "62K",
                              engagement: "4.7%",
                              clicks: "2.1K",
                              conversions: "187",
                              roi: "2.9x",
                              status: "Completed",
                            },
                            {
                              name: "@fitness_sarah",
                              posts: 10,
                              reach: "45K",
                              engagement: "7.1%",
                              clicks: "2.8K",
                              conversions: "312",
                              roi: "4.2x",
                              status: "Completed",
                            },
                            {
                              name: "@tech_jason",
                              posts: 5,
                              reach: "92K",
                              engagement: "3.8%",
                              clicks: "1.9K",
                              conversions: "156",
                              roi: "3.1x",
                              status: "Completed",
                            },
                            {
                              name: "@food_lisa",
                              posts: 7,
                              reach: "38K",
                              engagement: "6.3%",
                              clicks: "1.7K",
                              conversions: "198",
                              roi: "3.5x",
                              status: "Completed",
                            },
                          ].map((influencer, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{influencer.name}</TableCell>
                              <TableCell>{influencer.posts}</TableCell>
                              <TableCell>{influencer.reach}</TableCell>
                              <TableCell>{influencer.engagement}</TableCell>
                              <TableCell>{influencer.clicks}</TableCell>
                              <TableCell>{influencer.conversions}</TableCell>
                              <TableCell>{influencer.roi}</TableCell>
                              <TableCell>
                                <Badge variant={influencer.status === "Completed" ? "outline" : "secondary"}>
                                  {influencer.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Engagement by Influencer
                    </CardTitle>
                    <CardDescription>Comparison of engagement metrics across influencers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={influencerPerformanceData}
                        xAxisKey="name"
                        series={[
                          { name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" },
                          { name: "ROI (x)", key: "roi", color: "#82ca9d" },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Reach by Influencer
                    </CardTitle>
                    <CardDescription>Total audience reach for each influencer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={influencerPerformanceData}
                        xAxisKey="name"
                        series={[{ name: "Audience Reach", key: "reach", color: "#8884d8" }]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Performance Analysis</CardTitle>
                  <CardDescription>Analysis of different content types and formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="h-60">
                        <PieChart
                          data={[
                            { name: "Photos", value: 45 },
                            { name: "Videos", value: 30 },
                            { name: "Stories", value: 20 },
                            { name: "Reels", value: 5 },
                          ]}
                          nameKey="name"
                          dataKey="value"
                          colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="font-medium">Content Type Distribution</h4>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-60">
                        <BarChart
                          data={[
                            { name: "Photos", engagement: 3.8 },
                            { name: "Videos", engagement: 5.2 },
                            { name: "Stories", engagement: 4.5 },
                            { name: "Reels", engagement: 7.1 },
                          ]}
                          xAxisKey="name"
                          series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#82ca9d" }]}
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="font-medium">Engagement by Content Type</h4>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium mb-4">Top Performing Content</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Content</TableHead>
                          <TableHead>Influencer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Likes</TableHead>
                          <TableHead>Comments</TableHead>
                          <TableHead>Shares</TableHead>
                          <TableHead>Engagement</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            content: "Product Unboxing",
                            influencer: "@fashion_emma",
                            type: "Video",
                            likes: "12.5K",
                            comments: "845",
                            shares: "2.3K",
                            engagement: "8.2%",
                          },
                          {
                            content: "Outfit of the Day",
                            influencer: "@fashion_emma",
                            type: "Photo",
                            likes: "9.8K",
                            comments: "623",
                            shares: "1.1K",
                            engagement: "6.7%",
                          },
                          {
                            content: "Product Review",
                            influencer: "@tech_jason",
                            type: "Video",
                            likes: "8.2K",
                            comments: "912",
                            shares: "1.8K",
                            engagement: "7.5%",
                          },
                          {
                            content: "Tutorial",
                            influencer: "@beauty_jen",
                            type: "Reel",
                            likes: "15.3K",
                            comments: "1.2K",
                            shares: "3.4K",
                            engagement: "9.1%",
                          },
                          {
                            content: "Behind the Scenes",
                            influencer: "@lifestyle_alex",
                            type: "Story",
                            likes: "7.4K",
                            comments: "532",
                            shares: "980",
                            engagement: "5.8%",
                          },
                        ].map((content, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{content.content}</TableCell>
                            <TableCell>{content.influencer}</TableCell>
                            <TableCell>{content.type}</TableCell>
                            <TableCell>{content.likes}</TableCell>
                            <TableCell>{content.comments}</TableCell>
                            <TableCell>{content.shares}</TableCell>
                            <TableCell>{content.engagement}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2" />
                    Age Distribution
                  </CardTitle>
                  <CardDescription>Age breakdown of engaged audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <PieChart
                      data={audienceData}
                      nameKey="name"
                      dataKey="value"
                      colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2" />
                    Gender Distribution
                  </CardTitle>
                  <CardDescription>Gender breakdown of engaged audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <PieChart
                      data={[
                        { name: "Female", value: 65 },
                        { name: "Male", value: 32 },
                        { name: "Other", value: 3 },
                      ]}
                      nameKey="name"
                      dataKey="value"
                      colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2" />
                    Geographic Distribution
                  </CardTitle>
                  <CardDescription>Top locations of engaged audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <PieChart
                      data={[
                        { name: "United States", value: 45 },
                        { name: "United Kingdom", value: 15 },
                        { name: "Canada", value: 12 },
                        { name: "Australia", value: 8 },
                        { name: "Germany", value: 5 },
                        { name: "Other", value: 15 },
                      ]}
                      nameKey="name"
                      dataKey="value"
                      colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Interests & Affinities
                  </CardTitle>
                  <CardDescription>Top interests of engaged audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <BarChart
                      data={[
                        { name: "Fashion", value: 75 },
                        { name: "Beauty", value: 68 },
                        { name: "Travel", value: 52 },
                        { name: "Fitness", value: 45 },
                        { name: "Food", value: 38 },
                        { name: "Technology", value: 32 },
                      ]}
                      xAxisKey="name"
                      series={[{ name: "Interest Level", key: "value", color: "#8884d8" }]}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Audience Insights Summary</CardTitle>
              <CardDescription>Key insights about your campaign audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Demographics Overview</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Primary audience: Women 25-34</li>
                      <li>Secondary audience: Women 18-24</li>
                      <li>Top locations: US, UK, Canada</li>
                      <li>65% Female, 32% Male audience</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Audience Behavior</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Most active: 6-9pm weekdays</li>
                      <li>Highest engagement: Mobile devices (78%)</li>
                      <li>Average session duration: 4.2 minutes</li>
                      <li>Returning visitors: 32%</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Audience Recommendations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Focus on mobile-optimized content</li>
                      <li>Target evening posting schedule</li>
                      <li>Create more video content for higher engagement</li>
                      <li>Expand reach to 35-44 age demographic</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-2">Audience Growth Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on the current audience analysis, there are opportunities to expand reach in the 35-44 age
                    demographic, which currently represents only 15% of the audience but shows higher conversion rates.
                    Additionally, geographic expansion into Australia and Germany markets shows promise based on
                    engagement metrics from those regions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}


