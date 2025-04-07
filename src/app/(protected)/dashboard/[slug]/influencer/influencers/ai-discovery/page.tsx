// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Bot, Search, AlertCircle, RefreshCw, Zap, PieChart, BarChart2, Users } from "lucide-react"
// import InfluencerCard from "@/components/global/influencers/influencer-card"

// export default function AIDiscoveryPage() {
//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">AI-Powered Discovery</h1>
//         <p className="text-muted-foreground">Use AI to find new influencers based on content and engagement patterns</p>
//       </div>

//       <Tabs defaultValue="discover">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="discover">Discover</TabsTrigger>
//           <TabsTrigger value="similar">Find Similar</TabsTrigger>
//           <TabsTrigger value="settings">AI Settings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="discover" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Bot className="h-5 w-5 mr-2" />
//                 AI Discovery
//               </CardTitle>
//               <CardDescription>Let our AI find influencers that match your brand and campaign needs</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="discovery-prompt">Discovery Prompt</Label>
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="discovery-prompt"
//                     placeholder="Describe the type of influencers you're looking for..."
//                     className="pl-8"
//                     defaultValue="Fashion influencers with high engagement who create sustainable fashion content and have an audience interested in eco-friendly products"
//                   />
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Be specific about content style, audience demographics, and brand alignment
//                 </p>
//               </div>

//               <div className="grid gap-4 md:grid-cols-3">
//                 <div className="space-y-2">
//                   <Label>Follower Range</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>1K</span>
//                     <span>1M+</span>
//                   </div>
//                   <Slider defaultValue={[10, 70]} max={100} step={1} />
//                   <div className="flex justify-between text-xs">
//                     <span>10K</span>
//                     <span>500K</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Engagement Rate</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>1%</span>
//                     <span>20%+</span>
//                   </div>
//                   <Slider defaultValue={[3, 15]} max={20} step={0.5} />
//                   <div className="flex justify-between text-xs">
//                     <span>3%</span>
//                     <span>15%</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Content Quality</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>Any</span>
//                     <span>Premium</span>
//                   </div>
//                   <Slider defaultValue={[75]} max={100} step={1} />
//                   <div className="flex justify-between text-xs">
//                     <span></span>
//                     <span>High Quality</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Discovery Preferences</Label>
//                 <div className="grid gap-2 md:grid-cols-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Prioritize Engagement</h4>
//                       <p className="text-xs text-muted-foreground">Focus on high engagement over follower count</p>
//                     </div>
//                     <Switch id="prioritize-engagement" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Authentic Audience</h4>
//                       <p className="text-xs text-muted-foreground">Filter out influencers with fake followers</p>
//                     </div>
//                     <Switch id="authentic-audience" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Alignment</h4>
//                       <p className="text-xs text-muted-foreground">Match content style to your brand</p>
//                     </div>
//                     <Switch id="content-alignment" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Growth Potential</h4>
//                       <p className="text-xs text-muted-foreground">Find influencers with growth trajectory</p>
//                     </div>
//                     <Switch id="growth-potential" defaultChecked />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button>
//                   <Bot className="h-4 w-4 mr-2" />
//                   Generate AI Recommendations
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <InfluencerCard key={i} source="ai" />
//             ))}
//           </div>

//           <div className="flex justify-center">
//             <Button variant="outline">Load More Recommendations</Button>
//           </div>
//         </TabsContent>

//         <TabsContent value="similar" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 Find Similar Influencers
//               </CardTitle>
//               <CardDescription>Discover influencers similar to your top performers</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="reference-influencer">Reference Influencer</Label>
//                 <Select>
//                   <SelectTrigger id="reference-influencer">
//                     <SelectValue placeholder="Select an influencer" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="inf1">@fashion_emma</SelectItem>
//                     <SelectItem value="inf2">@travel_mike</SelectItem>
//                     <SelectItem value="inf3">@fitness_sarah</SelectItem>
//                     <SelectItem value="inf4">@tech_jason</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <p className="text-xs text-muted-foreground">
//                   Or enter an Instagram handle below to find similar influencers
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="instagram-handle">Instagram Handle</Label>
//                 <div className="relative">
//                   <span className="absolute left-2.5 top-2.5 text-muted-foreground">@</span>
//                   <Input id="instagram-handle" placeholder="username" className="pl-8" />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Similarity Factors</Label>
//                 <div className="grid gap-2 md:grid-cols-3">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Style</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="80" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Audience Type</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="70" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Engagement</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="50" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>How it works</AlertTitle>
//                 <AlertDescription>
//                   Our AI analyzes the content, audience, and engagement patterns of your reference influencer to find
//                   others with similar characteristics. Adjust the similarity factors to control how closely the
//                   recommendations should match.
//                 </AlertDescription>
//               </Alert>

//               <div className="flex justify-end">
//                 <Button>
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                   Find Similar Influencers
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex items-center justify-center p-12 border rounded-md">
//             <div className="text-center">
//               <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
//               <h3 className="mt-4 text-lg font-medium">Select a reference influencer</h3>
//               <p className="mt-2 text-muted-foreground">Choose an influencer above to find similar creators</p>
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="settings" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Zap className="h-5 w-5 mr-2" />
//                 AI Model Settings
//               </CardTitle>
//               <CardDescription>Configure the AI models used for influencer discovery</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Active AI Models</Label>
//                 <div className="grid gap-2 md:grid-cols-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Analysis</h4>
//                       <p className="text-xs text-muted-foreground">Analyzes content themes and quality</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="content-analysis-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Audience Overlap</h4>
//                       <p className="text-xs text-muted-foreground">Identifies similar audience demographics</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="audience-overlap-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Engagement Pattern</h4>
//                       <p className="text-xs text-muted-foreground">Analyzes engagement quality and patterns</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="engagement-pattern-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Brand Alignment</h4>
//                       <p className="text-xs text-muted-foreground">Matches influencers to brand values</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="brand-alignment-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Growth Prediction</h4>
//                       <p className="text-xs text-muted-foreground">Predicts future growth potential</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="growth-prediction-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Fraud Detection</h4>
//                       <p className="text-xs text-muted-foreground">Identifies fake followers and engagement</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="fraud-detection-model" defaultChecked />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Model Training</Label>
//                 <div className="grid gap-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Training Frequency</h4>
//                       <p className="text-xs text-muted-foreground">How often AI models are retrained</p>
//                     </div>
//                     <Select defaultValue="weekly">
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Select frequency" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="daily">Daily</SelectItem>
//                         <SelectItem value="weekly">Weekly</SelectItem>
//                         <SelectItem value="monthly">Monthly</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Last Training</h4>
//                       <p className="text-xs text-muted-foreground">When models were last trained</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span>2025-04-01</span>
//                       <Button variant="outline" size="sm">
//                         <RefreshCw className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Performance Metrics</Label>
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <PieChart className="h-4 w-4 mr-1" />
//                           Accuracy
//                         </h4>
//                         <span className="text-lg font-bold">92%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Based on manual verification</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <BarChart2 className="h-4 w-4 mr-1" />
//                           Precision
//                         </h4>
//                         <span className="text-lg font-bold">87%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Relevance of recommendations</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <Users className="h-4 w-4 mr-1" />
//                           Coverage
//                         </h4>
//                         <span className="text-lg font-bold">78%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Of potential influencers</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>

//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>AI Capabilities</AlertTitle>
//                 <AlertDescription>
//                   Our AI models analyze content themes, engagement patterns, and audience overlap to discover new
//                   influencers that match your brand's style and target audience. The models improve over time as they
//                   learn from your selections and campaign results.
//                 </AlertDescription>
//               </Alert>

//               <div className="flex justify-end space-x-2">
//                 <Button variant="outline">Reset to Defaults</Button>
//                 <Button>Save AI Settings</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Bot, Search, AlertCircle, RefreshCw, Zap, PieChart, BarChart2, Users } from "lucide-react"
// import InfluencerCard from "@/components/global/influencers/influencer-card"

// export default function AIDiscoveryPage() {
//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">AI-Powered Discovery</h1>
//         <p className="text-muted-foreground">Use AI to find new influencers based on content and engagement patterns</p>
//       </div>

//       <Tabs defaultValue="discover">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="discover">Discover</TabsTrigger>
//           <TabsTrigger value="similar">Find Similar</TabsTrigger>
//           <TabsTrigger value="settings">AI Settings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="discover" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Bot className="h-5 w-5 mr-2" />
//                 AI Discovery
//               </CardTitle>
//               <CardDescription>Let our AI find influencers that match your brand and campaign needs</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="discovery-prompt">Discovery Prompt</Label>
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="discovery-prompt"
//                     placeholder="Describe the type of influencers you're looking for..."
//                     className="pl-8"
//                     defaultValue="Fashion influencers with high engagement who create sustainable fashion content and have an audience interested in eco-friendly products"
//                   />
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Be specific about content style, audience demographics, and brand alignment
//                 </p>
//               </div>

//               <div className="grid gap-4 md:grid-cols-3">
//                 <div className="space-y-2">
//                   <Label>Follower Range</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>1K</span>
//                     <span>1M+</span>
//                   </div>
//                   <Slider defaultValue={[10, 70]} max={100} step={1} />
//                   <div className="flex justify-between text-xs">
//                     <span>10K</span>
//                     <span>500K</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Engagement Rate</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>1%</span>
//                     <span>20%+</span>
//                   </div>
//                   <Slider defaultValue={[3, 15]} max={20} step={0.5} />
//                   <div className="flex justify-between text-xs">
//                     <span>3%</span>
//                     <span>15%</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Content Quality</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>Any</span>
//                     <span>Premium</span>
//                   </div>
//                   <Slider defaultValue={[75]} max={100} step={1} />
//                   <div className="flex justify-between text-xs">
//                     <span></span>
//                     <span>High Quality</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Discovery Preferences</Label>
//                 <div className="grid gap-2 md:grid-cols-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Prioritize Engagement</h4>
//                       <p className="text-xs text-muted-foreground">Focus on high engagement over follower count</p>
//                     </div>
//                     <Switch id="prioritize-engagement" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Authentic Audience</h4>
//                       <p className="text-xs text-muted-foreground">Filter out influencers with fake followers</p>
//                     </div>
//                     <Switch id="authentic-audience" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Alignment</h4>
//                       <p className="text-xs text-muted-foreground">Match content style to your brand</p>
//                     </div>
//                     <Switch id="content-alignment" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Growth Potential</h4>
//                       <p className="text-xs text-muted-foreground">Find influencers with growth trajectory</p>
//                     </div>
//                     <Switch id="growth-potential" defaultChecked />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button>
//                   <Bot className="h-4 w-4 mr-2" />
//                   Generate AI Recommendations
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <InfluencerCard
//                 key={i}
//                 source="ai"
//                 influencer={{
//                   id: `sample-${i}`,
//                   name: `AI Discovered Influencer ${i + 1}`,
//                   username: `ai_influencer_${i + 1}`,
//                   followers: Math.floor(10000 + Math.random() * 90000),
//                   engagementRate: 3 + Math.random() * 5,
//                   postsCount: Math.floor(50 + Math.random() * 150),
//                   verified: Math.random() > 0.5,
//                   niche: ["Fashion", "Beauty", "Lifestyle", "Travel", "Fitness"][i % 5],
//                   location: ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Sydney"][i % 6],
//                   brandFit: Math.floor(70 + Math.random() * 30),
//                   audienceMatch: Math.floor(65 + Math.random() * 35),
//                   estimatedCost: Math.floor(500 + Math.random() * 150),
//                 }}
//               />
//             ))}
//           </div>

//           <div className="flex justify-center">
//             <Button variant="outline">Load More Recommendations</Button>
//           </div>
//         </TabsContent>

//         <TabsContent value="similar" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 Find Similar Influencers
//               </CardTitle>
//               <CardDescription>Discover influencers similar to your top performers</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="reference-influencer">Reference Influencer</Label>
//                 <Select>
//                   <SelectTrigger id="reference-influencer">
//                     <SelectValue placeholder="Select an influencer" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="inf1">@fashion_emma</SelectItem>
//                     <SelectItem value="inf2">@travel_mike</SelectItem>
//                     <SelectItem value="inf3">@fitness_sarah</SelectItem>
//                     <SelectItem value="inf4">@tech_jason</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <p className="text-xs text-muted-foreground">
//                   Or enter an Instagram handle below to find similar influencers
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="instagram-handle">Instagram Handle</Label>
//                 <div className="relative">
//                   <span className="absolute left-2.5 top-2.5 text-muted-foreground">@</span>
//                   <Input id="instagram-handle" placeholder="username" className="pl-8" />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Similarity Factors</Label>
//                 <div className="grid gap-2 md:grid-cols-3">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Style</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="80" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Audience Type</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="70" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Engagement</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="50" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>How it works</AlertTitle>
//                 <AlertDescription>
//                   Our AI analyzes the content, audience, and engagement patterns of your reference influencer to find
//                   others with similar characteristics. Adjust the similarity factors to control how closely the
//                   recommendations should match.
//                 </AlertDescription>
//               </Alert>

//               <div className="flex justify-end">
//                 <Button>
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                   Find Similar Influencers
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex items-center justify-center p-12 border rounded-md">
//             <div className="text-center">
//               <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
//               <h3 className="mt-4 text-lg font-medium">Select a reference influencer</h3>
//               <p className="mt-2 text-muted-foreground">Choose an influencer above to find similar creators</p>
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="settings" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Zap className="h-5 w-5 mr-2" />
//                 AI Model Settings
//               </CardTitle>
//               <CardDescription>Configure the AI models used for influencer discovery</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Active AI Models</Label>
//                 <div className="grid gap-2 md:grid-cols-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Analysis</h4>
//                       <p className="text-xs text-muted-foreground">Analyzes content themes and quality</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="content-analysis-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Audience Overlap</h4>
//                       <p className="text-xs text-muted-foreground">Identifies similar audience demographics</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="audience-overlap-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Engagement Pattern</h4>
//                       <p className="text-xs text-muted-foreground">Analyzes engagement quality and patterns</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="engagement-pattern-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Brand Alignment</h4>
//                       <p className="text-xs text-muted-foreground">Matches influencers to brand values</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="brand-alignment-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Growth Prediction</h4>
//                       <p className="text-xs text-muted-foreground">Predicts future growth potential</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="growth-prediction-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Fraud Detection</h4>
//                       <p className="text-xs text-muted-foreground">Identifies fake followers and engagement</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="fraud-detection-model" defaultChecked />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Model Training</Label>
//                 <div className="grid gap-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Training Frequency</h4>
//                       <p className="text-xs text-muted-foreground">How often AI models are retrained</p>
//                     </div>
//                     <Select defaultValue="weekly">
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Select frequency" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="daily">Daily</SelectItem>
//                         <SelectItem value="weekly">Weekly</SelectItem>
//                         <SelectItem value="monthly">Monthly</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Last Training</h4>
//                       <p className="text-xs text-muted-foreground">When models were last trained</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span>2025-04-01</span>
//                       <Button variant="outline" size="sm">
//                         <RefreshCw className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Performance Metrics</Label>
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <PieChart className="h-4 w-4 mr-1" />
//                           Accuracy
//                         </h4>
//                         <span className="text-lg font-bold">92%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Based on manual verification</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <BarChart2 className="h-4 w-4 mr-1" />
//                           Precision
//                         </h4>
//                         <span className="text-lg font-bold">87%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Relevance of recommendations</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <Users className="h-4 w-4 mr-1" />
//                           Coverage
//                         </h4>
//                         <span className="text-lg font-bold">78%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Of potential influencers</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>

//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>AI Capabilities</AlertTitle>
//                 <AlertDescription>
//                   Our AI models analyze content themes, engagement patterns, and audience overlap to discover new
//                   influencers that match your brand&apos;s style and target audience. The models improve over time as they
//                   learn from your selections and campaign results.
//                 </AlertDescription>
//               </Alert>

//               <div className="flex justify-end space-x-2">
//                 <Button variant="outline">Reset to Defaults</Button>
//                 <Button>Save AI Settings</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Bot, Search, AlertCircle, RefreshCw, Zap, PieChart, BarChart2, Users, Loader2 } from "lucide-react"
// import InfluencerCard from "@/components/global/influencers/influencer-card"
// import { discoverInfluencers } from "@/actions/influencers"
// import { InfluencerSource } from "@prisma/client"
// import { useToast } from "@/hooks/use-toast"

// export default function AIDiscoveryPage() {
//   const { toast } = useToast()
//   const [influencers, setInfluencers] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [discoveryPrompt, setDiscoveryPrompt] = useState(
//     "Fashion influencers with high engagement who create sustainable fashion content and have an audience interested in eco-friendly products",
//   )
//   const [followerRange, setFollowerRange] = useState([10, 70])
//   const [engagementRange, setEngagementRange] = useState([3, 15])
//   const [contentQuality, setContentQuality] = useState(75)
//   const [referenceInfluencer, setReferenceInfluencer] = useState("")
//   const [instagramHandle, setInstagramHandle] = useState("")

//   // Convert slider values to actual follower counts
//   const minFollowers = Math.pow(10, 3 + (followerRange[0] / 100) * 3) // 1K to 1M scale
//   const maxFollowers = Math.pow(10, 3 + (followerRange[1] / 100) * 3)

//   const discoverWithAI = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const result = await discoverInfluencers({
//         source: [InfluencerSource.AI_DISCOVERY],
//         minFollowers: Math.floor(minFollowers),
//         maxFollowers: Math.ceil(maxFollowers),
//         minEngagement: engagementRange[0],
//         maxEngagement: engagementRange[1],
//         search: discoveryPrompt, // Use the prompt as search text
//         limit: 6,
//       })

//       if (result.status === 200) {
//         if (typeof result.data === "object" && result.data !== null) {
//           setInfluencers(result.data.influencers || [])
//         } else {
//           setError("Invalid data format received from server")
//           toast({
//             title: "Error",
//             description: "Invalid data format received from server",
//             variant: "destructive",
//           })
//         }
//       } else {
//         setError(typeof result.data === "string" ? result.data : "Error discovering influencers")
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Error discovering influencers",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Failed to discover influencers"
//       setError(errorMessage)
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       })
//       console.error("Error discovering influencers:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const findSimilarInfluencers = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       // In a real implementation, you'd send the reference influencer ID or Instagram handle
//       // For now, we'll just use this as a search term to simulate finding similar influencers
//       const searchTerm = referenceInfluencer || instagramHandle

//       if (!searchTerm) {
//         setError("Please select a reference influencer or enter an Instagram handle")
//         toast({
//           title: "Error",
//           description: "Please select a reference influencer or enter an Instagram handle",
//           variant: "destructive",
//         })
//         setLoading(false)
//         return
//       }

//       const result = await discoverInfluencers({
//         source: [InfluencerSource.AI_DISCOVERY],
//         search: searchTerm,
//         limit: 6,
//       })

//       if (result.status === 200) {
//         if (typeof result.data === "object" && result.data !== null) {
//           setInfluencers(result.data.influencers || [])
//         } else {
//           setError("Invalid data format received from server")
//           toast({
//             title: "Error",
//             description: "Invalid data format received from server",
//             variant: "destructive",
//           })
//         }
//       } else {
//         setError(typeof result.data === "string" ? result.data : "Error finding similar influencers")
//         toast({
//           title: "Error",
//           description: typeof result.data === "string" ? result.data : "Error finding similar influencers",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Failed to find similar influencers"
//       setError(errorMessage)
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       })
//       console.error("Error finding similar influencers:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">AI-Powered Discovery</h1>
//         <p className="text-muted-foreground">Use AI to find new influencers based on content and engagement patterns</p>
//       </div>

//       <Tabs defaultValue="discover">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="discover">Discover</TabsTrigger>
//           <TabsTrigger value="similar">Find Similar</TabsTrigger>
//           <TabsTrigger value="settings">AI Settings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="discover" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Bot className="h-5 w-5 mr-2" />
//                 AI Discovery
//               </CardTitle>
//               <CardDescription>Let our AI find influencers that match your brand and campaign needs</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="discovery-prompt">Discovery Prompt</Label>
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="discovery-prompt"
//                     placeholder="Describe the type of influencers you're looking for..."
//                     className="pl-8"
//                     value={discoveryPrompt}
//                     onChange={(e) => setDiscoveryPrompt(e.target.value)}
//                   />
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Be specific about content style, audience demographics, and brand alignment
//                 </p>
//               </div>

//               <div className="grid gap-4 md:grid-cols-3">
//                 <div className="space-y-2">
//                   <Label>Follower Range</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>1K</span>
//                     <span>1M+</span>
//                   </div>
//                   <Slider value={followerRange} max={100} step={1} onValueChange={setFollowerRange} />
//                   <div className="flex justify-between text-xs">
//                     <span>{Math.floor(minFollowers).toLocaleString()}</span>
//                     <span>{Math.ceil(maxFollowers).toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Engagement Rate</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>1%</span>
//                     <span>20%+</span>
//                   </div>
//                   <Slider value={engagementRange} max={20} step={0.5} onValueChange={setEngagementRange} />
//                   <div className="flex justify-between text-xs">
//                     <span>{engagementRange[0]}%</span>
//                     <span>{engagementRange[1]}%</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Content Quality</Label>
//                   <div className="flex items-center justify-between text-xs text-muted-foreground">
//                     <span>Any</span>
//                     <span>Premium</span>
//                   </div>
//                   <Slider
//                     value={[contentQuality]}
//                     max={100}
//                     step={1}
//                     onValueChange={(value) => setContentQuality(value[0])}
//                   />
//                   <div className="flex justify-between text-xs">
//                     <span></span>
//                     <span>High Quality</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Discovery Preferences</Label>
//                 <div className="grid gap-2 md:grid-cols-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Prioritize Engagement</h4>
//                       <p className="text-xs text-muted-foreground">Focus on high engagement over follower count</p>
//                     </div>
//                     <Switch id="prioritize-engagement" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Authentic Audience</h4>
//                       <p className="text-xs text-muted-foreground">Filter out influencers with fake followers</p>
//                     </div>
//                     <Switch id="authentic-audience" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Alignment</h4>
//                       <p className="text-xs text-muted-foreground">Match content style to your brand</p>
//                     </div>
//                     <Switch id="content-alignment" defaultChecked />
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Growth Potential</h4>
//                       <p className="text-xs text-muted-foreground">Find influencers with growth trajectory</p>
//                     </div>
//                     <Switch id="growth-potential" defaultChecked />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button onClick={discoverWithAI} disabled={loading}>
//                   <Bot className="h-4 w-4 mr-2" />
//                   {loading ? "Generating..." : "Generate AI Recommendations"}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//           ) : error ? (
//             <div className="flex flex-col items-center justify-center py-12 border rounded-md">
//               <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
//               <p className="text-muted-foreground">{error}</p>
//               <Button onClick={discoverWithAI} variant="outline" className="mt-4">
//                 Retry
//               </Button>
//             </div>
//           ) : influencers.length > 0 ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {influencers.map((influencer) => (
//                   <InfluencerCard key={influencer.id} influencer={influencer} source="ai" />
//                 ))}
//               </div>

//               <div className="flex justify-center">
//                 <Button variant="outline" onClick={discoverWithAI}>
//                   Load More Recommendations
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-12 border rounded-md">
//               <p className="text-muted-foreground">Click &ldquo;Generate AI Recommendations&rdquo; to discover influencers.</p>
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="similar" className="space-y-4 mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 Find Similar Influencers
//               </CardTitle>
//               <CardDescription>Discover influencers similar to your top performers</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="reference-influencer">Reference Influencer</Label>
//                 <Select value={referenceInfluencer} onValueChange={setReferenceInfluencer}>
//                   <SelectTrigger id="reference-influencer">
//                     <SelectValue placeholder="Select an influencer" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="fashion_emma">@fashion_emma</SelectItem>
//                     <SelectItem value="travel_mike">@travel_mike</SelectItem>
//                     <SelectItem value="fitness_sarah">@fitness_sarah</SelectItem>
//                     <SelectItem value="tech_jason">@tech_jason</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <p className="text-xs text-muted-foreground">
//                   Or enter an Instagram handle below to find similar influencers
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="instagram-handle">Instagram Handle</Label>
//                 <div className="relative">
//                   <span className="absolute left-2.5 top-2.5 text-muted-foreground">@</span>
//                   <Input
//                     id="instagram-handle"
//                     placeholder="username"
//                     className="pl-8"
//                     value={instagramHandle}
//                     onChange={(e) => setInstagramHandle(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Similarity Factors</Label>
//                 <div className="grid gap-2 md:grid-cols-3">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Style</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="80" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Audience Type</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="70" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Engagement</h4>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Input type="number" className="w-16 h-8" defaultValue="50" />
//                       <span className="text-sm text-muted-foreground">%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>How it works</AlertTitle>
//                 <AlertDescription>
//                   Our AI analyzes the content, audience, and engagement patterns of your reference influencer to find
//                   others with similar characteristics. Adjust the similarity factors to control how closely the
//                   recommendations should match.
//                 </AlertDescription>
//               </Alert>

//               <div className="flex justify-end">
//                 <Button onClick={findSimilarInfluencers} disabled={loading}>
//                   <RefreshCw className="h-4 w-4 mr-2" />
//                   {loading ? "Finding..." : "Find Similar Influencers"}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             </div>
//           ) : error ? (
//             <div className="flex flex-col items-center justify-center py-12 border rounded-md">
//               <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
//               <p className="text-muted-foreground">{error}</p>
//               <Button onClick={findSimilarInfluencers} variant="outline" className="mt-4">
//                 Retry
//               </Button>
//             </div>
//           ) : influencers.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {influencers.map((influencer) => (
//                 <InfluencerCard key={influencer.id} influencer={influencer} source="ai" />
//               ))}
//             </div>
//           ) : (
//             <div className="flex items-center justify-center p-12 border rounded-md">
//               <div className="text-center">
//                 <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
//                 <h3 className="mt-4 text-lg font-medium">Select a reference influencer</h3>
//                 <p className="mt-2 text-muted-foreground">Choose an influencer above to find similar creators</p>
//               </div>
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="settings" className="space-y-4 mt-4">
//           {/* AI Settings tab content - remains mostly unchanged as it's configuration settings */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Zap className="h-5 w-5 mr-2" />
//                 AI Model Settings
//               </CardTitle>
//               <CardDescription>Configure the AI models used for influencer discovery</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {/* Settings UI unchanged */}
//               <div className="space-y-2">
//                 <Label>Active AI Models</Label>
//                 <div className="grid gap-2 md:grid-cols-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Content Analysis</h4>
//                       <p className="text-xs text-muted-foreground">Analyzes content themes and quality</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="content-analysis-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Audience Overlap</h4>
//                       <p className="text-xs text-muted-foreground">Identifies similar audience demographics</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="audience-overlap-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Engagement Pattern</h4>
//                       <p className="text-xs text-muted-foreground">Analyzes engagement quality and patterns</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="engagement-pattern-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Brand Alignment</h4>
//                       <p className="text-xs text-muted-foreground">Matches influencers to brand values</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="brand-alignment-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Growth Prediction</h4>
//                       <p className="text-xs text-muted-foreground">Predicts future growth potential</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="growth-prediction-model" defaultChecked />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Fraud Detection</h4>
//                       <p className="text-xs text-muted-foreground">Identifies fake followers and engagement</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge variant="outline" className="text-green-500">
//                         Active
//                       </Badge>
//                       <Switch id="fraud-detection-model" defaultChecked />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Model Training</Label>
//                 <div className="grid gap-2">
//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Training Frequency</h4>
//                       <p className="text-xs text-muted-foreground">How often AI models are retrained</p>
//                     </div>
//                     <Select defaultValue="weekly">
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Select frequency" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="daily">Daily</SelectItem>
//                         <SelectItem value="weekly">Weekly</SelectItem>
//                         <SelectItem value="monthly">Monthly</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="flex items-center justify-between border p-3 rounded-md">
//                     <div>
//                       <h4 className="font-medium">Last Training</h4>
//                       <p className="text-xs text-muted-foreground">When models were last trained</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span>2025-04-01</span>
//                       <Button variant="outline" size="sm">
//                         <RefreshCw className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Performance Metrics</Label>
//                 <div className="grid gap-4 md:grid-cols-3">
//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <PieChart className="h-4 w-4 mr-1" />
//                           Accuracy
//                         </h4>
//                         <span className="text-lg font-bold">92%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Based on manual verification</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <BarChart2 className="h-4 w-4 mr-1" />
//                           Precision
//                         </h4>
//                         <span className="text-lg font-bold">87%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Relevance of recommendations</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium flex items-center">
//                           <Users className="h-4 w-4 mr-1" />
//                           Coverage
//                         </h4>
//                         <span className="text-lg font-bold">78%</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mt-1">Of potential influencers</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>

//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>AI Capabilities</AlertTitle>
//                 <AlertDescription>
//                   Our AI models analyze content themes, engagement patterns, and audience overlap to discover new
//                   influencers that match your brands style and target audience. The models improve over time as they
//                   learn from your selections and campaign results.
//                 </AlertDescription>
//               </Alert>

//               <div className="flex justify-end space-x-2">
//                 <Button variant="outline">Reset to Defaults</Button>
//                 <Button>Save AI Settings</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Search, AlertCircle, RefreshCw, Zap, PieChart, BarChart2, Users, Loader2 } from "lucide-react"
import InfluencerCard from "@/components/global/influencers/influencer-card"
import { discoverInfluencers } from "@/actions/influencers"
import { InfluencerSource } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"

export default function AIDiscoveryPage() {
  const { toast } = useToast()
  const [influencers, setInfluencers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [discoveryPrompt, setDiscoveryPrompt] = useState(
    "Fashion influencers with high engagement who create sustainable fashion content and have an audience interested in eco-friendly products",
  )
  const [followerRange, setFollowerRange] = useState([10, 70])
  const [engagementRange, setEngagementRange] = useState([3, 15])
  const [contentQuality, setContentQuality] = useState(75)
  const [referenceInfluencer, setReferenceInfluencer] = useState("")
  const [instagramHandle, setInstagramHandle] = useState("")
  const [influencerOptions, setInfluencerOptions] = useState<{ id: string; username: string }[]>([])
  const [loadingInfluencers, setLoadingInfluencers] = useState(false)

  // Convert slider values to actual follower counts
  const minFollowers = Math.pow(10, 3 + (followerRange[0] / 100) * 3) // 1K to 1M scale
  const maxFollowers = Math.pow(10, 3 + (followerRange[1] / 100) * 3)

  const fetchInfluencerOptions = async () => {
    setLoadingInfluencers(true)
    try {
      const result = await discoverInfluencers({
        limit: 10,
        sortBy: "followers",
        sortDirection: "desc",
      })

      if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
        const options = result.data.influencers.map((inf: any) => ({
          id: inf.id,
          username: inf.username,
        }))
        setInfluencerOptions(options)
      }
    } catch (error) {
      console.error("Error fetching influencer options:", error)
    } finally {
      setLoadingInfluencers(false)
    }
  }

  const discoverWithAI = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await discoverInfluencers({
        source: [InfluencerSource.AI_DISCOVERY],
        minFollowers: Math.floor(minFollowers),
        maxFollowers: Math.ceil(maxFollowers),
        minEngagement: engagementRange[0],
        maxEngagement: engagementRange[1],
        search: discoveryPrompt, // Use the prompt as search text
        limit: 6,
      })

      if (result.status === 200) {
        if (typeof result.data === "object" && result.data !== null) {
          setInfluencers(result.data.influencers || [])
        } else {
          setError("Invalid data format received from server")
          toast({
            title: "Error",
            description: "Invalid data format received from server",
            variant: "destructive",
          })
        }
      } else {
        setError(typeof result.data === "string" ? result.data : "Error discovering influencers")
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result.data : "Error discovering influencers",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to discover influencers"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error discovering influencers:", error)
    } finally {
      setLoading(false)
    }
  }

  const findSimilarInfluencers = async () => {
    setLoading(true)
    setError(null)
    try {
      if (referenceInfluencer) {
        // Use the server action to find similar influencers based on the reference influencer
        const response = await fetch(
          `/api/influencers/similar?referenceId=${referenceInfluencer}&contentStyleWeight=80&audienceTypeWeight=70&engagementWeight=50`,
        )

        if (!response.ok) {
          throw new Error("Failed to find similar influencers")
        }

        const data = await response.json()
        setInfluencers(data.influencers || [])
      } else if (instagramHandle) {
        // First check if we have this influencer in our database
        const response = await fetch(`/api/instagram?username=${instagramHandle}`)

        if (!response.ok) {
          throw new Error("Failed to fetch Instagram data")
        }

        const instagramData = await response.json()

        // Now use this data to find similar influencers
        const result = await discoverInfluencers({
          source: [InfluencerSource.AI_DISCOVERY],
          niche: [instagramData.niche || "Fashion"], // Use the niche from Instagram data or default to Fashion
          minFollowers: Math.max(1000, instagramData.followers_count * 0.5),
          maxFollowers: instagramData.followers_count * 2,
          minEngagement: Math.max(1, Number.parseFloat(instagramData.engagement_rate) * 0.7),
          maxEngagement: Number.parseFloat(instagramData.engagement_rate) * 1.3,
          limit: 6,
        })

        if (result.status === 200 && typeof result.data === "object" && result.data !== null) {
          setInfluencers(result.data.influencers || [])
        } else {
          throw new Error(typeof result.data === "string" ? result.data : "Error finding similar influencers")
        }
      } else {
        setError("Please select a reference influencer or enter an Instagram handle")
        toast({
          title: "Error",
          description: "Please select a reference influencer or enter an Instagram handle",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to find similar influencers"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error finding similar influencers:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Discovery</h1>
        <p className="text-muted-foreground">Use AI to find new influencers based on content and engagement patterns</p>
      </div>

      <Tabs
        defaultValue="discover"
        onValueChange={(value) => {
          if (value === "similar" && influencerOptions.length === 0) {
            fetchInfluencerOptions()
          }
        }}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="similar">Find Similar</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Discovery
              </CardTitle>
              <CardDescription>Let our AI find influencers that match your brand and campaign needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discovery-prompt">Discovery Prompt</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="discovery-prompt"
                    placeholder="Describe the type of influencers you're looking for..."
                    className="pl-8"
                    value={discoveryPrompt}
                    onChange={(e) => setDiscoveryPrompt(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Be specific about content style, audience demographics, and brand alignment
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Follower Range</Label>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>1K</span>
                    <span>1M+</span>
                  </div>
                  <Slider value={followerRange} max={100} step={1} onValueChange={setFollowerRange} />
                  <div className="flex justify-between text-xs">
                    <span>{Math.floor(minFollowers).toLocaleString()}</span>
                    <span>{Math.ceil(maxFollowers).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Engagement Rate</Label>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>20%+</span>
                  </div>
                  <Slider value={engagementRange} max={20} step={0.5} onValueChange={setEngagementRange} />
                  <div className="flex justify-between text-xs">
                    <span>{engagementRange[0]}%</span>
                    <span>{engagementRange[1]}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Content Quality</Label>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Any</span>
                    <span>Premium</span>
                  </div>
                  <Slider
                    value={[contentQuality]}
                    max={100}
                    step={1}
                    onValueChange={(value) => setContentQuality(value[0])}
                  />
                  <div className="flex justify-between text-xs">
                    <span></span>
                    <span>High Quality</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Discovery Preferences</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Prioritize Engagement</h4>
                      <p className="text-xs text-muted-foreground">Focus on high engagement over follower count</p>
                    </div>
                    <Switch id="prioritize-engagement" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Authentic Audience</h4>
                      <p className="text-xs text-muted-foreground">Filter out influencers with fake followers</p>
                    </div>
                    <Switch id="authentic-audience" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Content Alignment</h4>
                      <p className="text-xs text-muted-foreground">Match content style to your brand</p>
                    </div>
                    <Switch id="content-alignment" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Growth Potential</h4>
                      <p className="text-xs text-muted-foreground">Find influencers with growth trajectory</p>
                    </div>
                    <Switch id="growth-potential" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={discoverWithAI} disabled={loading}>
                  <Bot className="h-4 w-4 mr-2" />
                  {loading ? "Generating..." : "Generate AI Recommendations"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-md">
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={discoverWithAI} variant="outline" className="mt-4">
                Retry
              </Button>
            </div>
          ) : influencers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {influencers.map((influencer) => (
                  <InfluencerCard key={influencer.id} influencer={influencer} />
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline" onClick={discoverWithAI}>
                  Load More Recommendations
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <p className="text-muted-foreground">Click &ldquo;Generate AI Recommendations&rdquo; to discover influencers.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="similar" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Find Similar Influencers
              </CardTitle>
              <CardDescription>Discover influencers similar to your top performers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reference-influencer">Reference Influencer</Label>
                <Select value={referenceInfluencer} onValueChange={setReferenceInfluencer}>
                  <SelectTrigger id="reference-influencer">
                    <SelectValue placeholder={loadingInfluencers ? "Loading influencers..." : "Select an influencer"} />
                  </SelectTrigger>
                  <SelectContent>
                    {influencerOptions.map((inf) => (
                      <SelectItem key={inf.id} value={inf.id}>
                        @{inf.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Or enter an Instagram handle below to find similar influencers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram-handle">Instagram Handle</Label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2.5 text-muted-foreground">@</span>
                  <Input
                    id="instagram-handle"
                    placeholder="username"
                    className="pl-8"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Similarity Factors</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Content Style</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-16 h-8" defaultValue="80" />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Audience Type</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-16 h-8" defaultValue="70" />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Engagement</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" className="w-16 h-8" defaultValue="50" />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>How it works</AlertTitle>
                <AlertDescription>
                  Our AI analyzes the content, audience, and engagement patterns of your reference influencer to find
                  others with similar characteristics. Adjust the similarity factors to control how closely the
                  recommendations should match.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button onClick={findSimilarInfluencers} disabled={loading}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {loading ? "Finding..." : "Find Similar Influencers"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-md">
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={findSimilarInfluencers} variant="outline" className="mt-4">
                Retry
              </Button>
            </div>
          ) : influencers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {influencers.map((influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center p-12 border rounded-md">
              <div className="text-center">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Select a reference influencer</h3>
                <p className="mt-2 text-muted-foreground">Choose an influencer above to find similar creators</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                AI Model Settings
              </CardTitle>
              <CardDescription>Configure the AI models used for influencer discovery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Active AI Models</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Content Analysis</h4>
                      <p className="text-xs text-muted-foreground">Analyzes content themes and quality</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-500">
                        Active
                      </Badge>
                      <Switch id="content-analysis-model" defaultChecked />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Audience Overlap</h4>
                      <p className="text-xs text-muted-foreground">Identifies similar audience demographics</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-500">
                        Active
                      </Badge>
                      <Switch id="audience-overlap-model" defaultChecked />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Engagement Pattern</h4>
                      <p className="text-xs text-muted-foreground">Analyzes engagement quality and patterns</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-500">
                        Active
                      </Badge>
                      <Switch id="engagement-pattern-model" defaultChecked />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Brand Alignment</h4>
                      <p className="text-xs text-muted-foreground">Matches influencers to brand values</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-500">
                        Active
                      </Badge>
                      <Switch id="brand-alignment-model" defaultChecked />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Growth Prediction</h4>
                      <p className="text-xs text-muted-foreground">Predicts future growth potential</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-500">
                        Active
                      </Badge>
                      <Switch id="growth-prediction-model" defaultChecked />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Fraud Detection</h4>
                      <p className="text-xs text-muted-foreground">Identifies fake followers and engagement</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-500">
                        Active
                      </Badge>
                      <Switch id="fraud-detection-model" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Model Training</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Training Frequency</h4>
                      <p className="text-xs text-muted-foreground">How often AI models are retrained</p>
                    </div>
                    <Select defaultValue="weekly">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <h4 className="font-medium">Last Training</h4>
                      <p className="text-xs text-muted-foreground">When models were last trained</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>2025-04-01</span>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Performance Metrics</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center">
                          <PieChart className="h-4 w-4 mr-1" />
                          Accuracy
                        </h4>
                        <span className="text-lg font-bold">92%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Based on manual verification</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center">
                          <BarChart2 className="h-4 w-4 mr-1" />
                          Precision
                        </h4>
                        <span className="text-lg font-bold">87%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Relevance of recommendations</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Coverage
                        </h4>
                        <span className="text-lg font-bold">78%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Of potential influencers</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>AI Capabilities</AlertTitle>
                <AlertDescription>
                  Our AI models analyze content themes, engagement patterns, and audience overlap to discover new
                  influencers that match your brands style and target audience. The models improve over time as they
                  learn from your selections and campaign results.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save AI Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

