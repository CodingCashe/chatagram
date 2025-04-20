"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Users,
  MessageSquare,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Target,
  Calendar,
  Clock,
  ArrowUpRight,
  Filter,
  Download,
  Search,
  UserCheck,
  DollarSign,
  Sparkles,
  BadgePercent,
  ShoppingCart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import AutomationChats from "@/components/global/fancy/chats"
import { cn } from "@/lib/utils"

// Mock data for the dashboard
const mockLeadData = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "qualified",
    value: 1200,
    lastContact: "2 hours ago",
    sentiment: "positive",
    stage: "discovery",
  },
  {
    id: 2,
    name: "Michael Chen",
    status: "new",
    value: 800,
    lastContact: "1 day ago",
    sentiment: "neutral",
    stage: "awareness",
  },
  {
    id: 3,
    name: "Emma Davis",
    status: "qualified",
    value: 2500,
    lastContact: "3 hours ago",
    sentiment: "positive",
    stage: "consideration",
  },
  {
    id: 4,
    name: "James Wilson",
    status: "nurturing",
    value: 1500,
    lastContact: "5 hours ago",
    sentiment: "negative",
    stage: "decision",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    status: "new",
    value: 950,
    lastContact: "2 days ago",
    sentiment: "neutral",
    stage: "awareness",
  },
]

const mockConversionRates = {
  awareness: 65,
  consideration: 42,
  decision: 28,
  purchase: 15,
}

const mockSentimentData = {
  positive: 42,
  neutral: 35,
  negative: 23,
}

const mockRevenueData = [
  { month: "Jan", amount: 12500 },
  { month: "Feb", amount: 18200 },
  { month: "Mar", amount: 15800 },
  { month: "Apr", amount: 21500 },
  { month: "May", amount: 28900 },
  { month: "Jun", amount: 32400 },
]

// Helper components
const SentimentBadge = ({ sentiment }: { sentiment: string }) => {
  const variants = {
    positive: "bg-green-500/20 text-green-500 border-green-500/50",
    neutral: "bg-blue-500/20 text-blue-500 border-blue-500/50",
    negative: "bg-red-500/20 text-red-500 border-red-500/50",
  }

  const icons = {
    positive: <ThumbsUp className="h-3 w-3 mr-1" />,
    neutral: <Heart className="h-3 w-3 mr-1" />,
    negative: <ThumbsDown className="h-3 w-3 mr-1" />,
  }

  return (
    <Badge variant="outline" className={cn("flex items-center", variants[sentiment as keyof typeof variants])}>
      {icons[sentiment as keyof typeof icons]}
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </Badge>
  )
}

const StageIndicator = ({ stage }: { stage: string }) => {
  const stages = ["awareness", "discovery", "consideration", "decision", "purchase"]
  const currentIndex = stages.indexOf(stage)

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        {stages.map((s, i) => (
          <span key={s} className={cn(i <= currentIndex ? "text-primary" : "")}>
            {s.charAt(0).toUpperCase()}
          </span>
        ))}
      </div>
      <Progress value={(currentIndex + 1) * (100 / stages.length)} className="h-1.5" />
    </div>
  )
}

// Main dashboard component
export default function CustomerEngagementPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [automationId, setAutomationId] = useState("a4589d5e-921a-4806-a6a2-57d26159ee7a")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLeads, setFilteredLeads] = useState(mockLeadData)
  const [timeframe, setTimeframe] = useState("week")

  // Filter leads based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLeads(mockLeadData)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = mockLeadData.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query) ||
        lead.status.toLowerCase().includes(query) ||
        lead.sentiment.toLowerCase().includes(query) ||
        lead.stage.toLowerCase().includes(query),
    )

    setFilteredLeads(filtered)
  }, [searchQuery])

  return (
    <div className="container mx-auto p-4 space-y-6 dark">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Engagement Hub</h1>
          <p className="text-muted-foreground mt-1">Monitor conversations, track leads, and boost conversions</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Active Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+12%</span> from last {timeframe}
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                  Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+8%</span> from last {timeframe}
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-500" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.5%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+2.3%</span> from last {timeframe}
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-yellow-500" />
                  Revenue Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32,450</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+15%</span> from last {timeframe}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Track leads through the sales pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(mockConversionRates).map(([stage, rate]) => (
                    <div key={stage} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{stage}</span>
                        <span className="font-medium">{rate}%</span>
                      </div>
                      <Progress value={rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="ml-auto">
                  <Filter className="h-3.5 w-3.5 mr-2" />
                  Filter Stages
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Sentiment</CardTitle>
                <CardDescription>Based on conversation analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(mockSentimentData).map(([sentiment, percentage]) => (
                    <div key={sentiment} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <SentimentBadge sentiment={sentiment} />
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                      <Progress
                        value={percentage}
                        className={cn(
                          "h-2",
                          sentiment === "positive" && "bg-green-500/20 [&>div]:bg-green-500",
                          sentiment === "neutral" && "bg-blue-500/20 [&>div]:bg-blue-500",
                          sentiment === "negative" && "bg-red-500/20 [&>div]:bg-red-500",
                        )}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Zap className="h-3.5 w-3.5 mr-2" />
                  Improve Sentiment
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest potential customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLeads.slice(0, 3).map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{lead.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="capitalize text-xs">
                              {lead.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">${lead.value.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <SentimentBadge sentiment={lead.sentiment} />
                        <span className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {lead.lastContact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab("leads")}>
                  View All Leads
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Follow-ups and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Follow up with Emma</span>
                      </div>
                      <Badge>Today</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Send product demo and pricing information</p>
                  </div>

                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Schedule call with Michael</span>
                      </div>
                      <Badge variant="outline">Tomorrow</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Discuss implementation timeline and requirements
                    </p>
                  </div>

                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Send proposal to James</span>
                      </div>
                      <Badge variant="outline">In 2 days</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Finalize custom solution proposal with pricing</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="h-3.5 w-3.5 mr-2" />
                  View Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AutomationChats automationId={automationId} />
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Message Templates</CardTitle>
                  <CardDescription>Quick responses for common scenarios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MessageTemplateLibrary />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Promotional Templates</CardTitle>
                  <CardDescription>Ready-to-use promotional messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PromotionalTemplates />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversation Insights</CardTitle>
                  <CardDescription>Real-time sentiment analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <SentimentAnalysisWidget />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <CardTitle>Lead Management</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search leads..."
                      className="pl-8 w-[200px] md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="nurturing">Nurturing</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-2">Name</div>
                  <div>Status</div>
                  <div>Value</div>
                  <div>Sentiment</div>
                  <div>Stage</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className="grid grid-cols-7 p-3 text-sm items-center">
                      <div className="col-span-2 font-medium">{lead.name}</div>
                      <div>
                        <Badge variant="outline" className="capitalize">
                          {lead.status}
                        </Badge>
                      </div>
                      <div>${lead.value.toLocaleString()}</div>
                      <div>
                        <SentimentBadge sentiment={lead.sentiment} />
                      </div>
                      <div>
                        <StageIndicator stage={lead.stage} />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredLeads.length}</strong> of <strong>{mockLeadData.length}</strong> leads
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Lead Qualification</CardTitle>
                <CardDescription>Automatically qualify leads based on engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <LeadQualificationTool />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Suggestions</CardTitle>
                <CardDescription>Recommend products based on conversation context</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductSuggestionTool />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Scheduler</CardTitle>
              <CardDescription>Book meetings with potential customers</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentScheduler />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversation Analytics</CardTitle>
                <CardDescription>Key metrics from customer interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                      <p className="text-2xl font-bold">3.2 min</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Avg. Conversation Length</p>
                      <p className="text-2xl font-bold">8.5 min</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Messages per Conversation</p>
                      <p className="text-2xl font-bold">12.3</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">18.5%</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Busiest Hours</h4>
                    <div className="h-[150px] w-full bg-muted/50 rounded-lg flex items-end justify-around p-2">
                      {[15, 25, 40, 65, 80, 60, 45, 30, 20, 35, 50, 40].map((height, i) => (
                        <div key={i} className="w-4 bg-primary/80 rounded-t-sm" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>12 AM</span>
                      <span>6 AM</span>
                      <span>12 PM</span>
                      <span>6 PM</span>
                      <span>12 AM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Impact</CardTitle>
                <CardDescription>Conversions and revenue generated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$32,450</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Avg. Deal Size</p>
                      <p className="text-2xl font-bold">$1,850</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">18.5%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="text-2xl font-bold">320%</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Revenue Trend</h4>
                    <div className="h-[150px] w-full bg-muted/50 rounded-lg flex items-end justify-around p-2">
                      {mockRevenueData.map((data, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div
                            className="w-8 bg-green-500/80 rounded-t-sm"
                            style={{ height: `${(data.amount / 35000) * 100}%` }}
                          ></div>
                          <span className="text-xs text-muted-foreground">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Analytics</CardTitle>
              <CardDescription>Track customer progression through sales funnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-5 gap-4">
                  {Object.entries(mockConversionRates).map(([stage, rate], index) => (
                    <div key={stage} className="flex flex-col items-center">
                      <div className="relative mb-2">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          {index === 0 && <Users className="h-6 w-6 text-blue-500" />}
                          {index === 1 && <MessageSquare className="h-6 w-6 text-purple-500" />}
                          {index === 2 && <Target className="h-6 w-6 text-green-500" />}
                          {index === 3 && <ShoppingCart className="h-6 w-6 text-yellow-500" />}
                        </div>
                        {index < Object.entries(mockConversionRates).length - 1 && (
                          <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-muted-foreground/30" />
                        )}
                      </div>
                      <h4 className="font-medium capitalize">{stage}</h4>
                      <p className="text-2xl font-bold">{rate}%</p>
                      <p className="text-xs text-muted-foreground">Conversion Rate</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Conversion Optimization Opportunities</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">Improve consideration to decision conversion</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Add more product demonstrations and case studies to help customers make decisions.
                      </p>
                    </div>

                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">Reduce time in discovery stage</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Provide more targeted information earlier in the conversation to accelerate qualification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Message Templates Library Component
function MessageTemplateLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "greeting", name: "Greetings" },
    { id: "faq", name: "FAQ Responses" },
    { id: "follow-up", name: "Follow-ups" },
    { id: "closing", name: "Closing" },
  ]

  const templates = [
    {
      id: 1,
      category: "greeting",
      title: "Welcome Message",
      content: "Hi there! 👋 Welcome to [Company Name]. How can I assist you today?",
    },
    {
      id: 2,
      category: "faq",
      title: "Pricing Question",
      content:
        "Our pricing starts at $X/month for the basic plan. We also offer premium plans with additional features. Would you like me to send you our full pricing details?",
    },
    {
      id: 3,
      category: "follow-up",
      title: "After Demo",
      content:
        "Thank you for attending our demo yesterday! Do you have any questions about what we covered? I'd be happy to provide more information or schedule a follow-up call.",
    },
    {
      id: 4,
      category: "closing",
      title: "Next Steps",
      content:
        "Based on our conversation, I think the next steps would be to: 1) Schedule a demo with our technical team, 2) Review the proposal I'll send over, and 3) Discuss implementation timeline. Does that sound good?",
    },
  ]

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === "all" || template.category === selectedCategory) &&
      (template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="p-3 bg-secondary/50 rounded-lg space-y-1 cursor-pointer hover:bg-secondary transition-colors"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">{template.title}</h4>
              <Badge variant="outline" className="capitalize text-xs">
                {template.category}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{template.content}</p>
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                Edit
              </Button>
              <Button variant="default" size="sm" className="h-7 px-2 text-xs">
                Use
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        <Sparkles className="h-3.5 w-3.5 mr-2" />
        Create New Template
      </Button>
    </div>
  )
}

// Promotional Templates Component
function PromotionalTemplates() {
  const promotions = [
    {
      id: 1,
      title: "Summer Sale",
      content:
        "For a limited time, enjoy 20% off all our [Product Category] with code SUMMER20. This offer expires on [Date].",
      variables: ["Product Category", "Date"],
    },
    {
      id: 2,
      title: "New Customer Discount",
      content:
        "As a new customer, you're eligible for a special 15% discount on your first purchase. Would you like me to apply this to your order?",
      variables: [],
    },
    {
      id: 3,
      title: "Product Launch",
      content:
        "I'm excited to share that we just launched our new [Product Name]! It offers [Key Benefit] and is perfect for [Use Case]. Would you like to learn more?",
      variables: ["Product Name", "Key Benefit", "Use Case"],
    },
  ]

  return (
    <div className="space-y-3">
      {promotions.map((promo) => (
        <div
          key={promo.id}
          className="p-3 bg-secondary/50 rounded-lg space-y-2 cursor-pointer hover:bg-secondary transition-colors"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm flex items-center">
              <BadgePercent className="h-4 w-4 mr-1.5 text-green-500" />
              {promo.title}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground">{promo.content}</p>

          {promo.variables.length > 0 && (
            <div className="pt-1">
              <p className="text-xs font-medium mb-1.5">Customize:</p>
              <div className="flex flex-wrap gap-2">
                {promo.variables.map((variable, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-1">{variable}:</span>
                    <Input
                      className="h-6 text-xs py-1 px-2 w-[120px]"
                      placeholder={`Enter ${variable.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="default" size="sm" className="h-7 px-2 text-xs">
              Use Template
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" className="w-full">
        <BadgePercent className="h-3.5 w-3.5 mr-2" />
        Create Promotion
      </Button>
    </div>
  )
}

// Sentiment Analysis Widget
function SentimentAnalysisWidget() {
  const currentConversation = {
    id: "conv123",
    customer: "Emma Davis",
    overallSentiment: "positive",
    sentimentScore: 78,
    keyPhrases: ["product features", "pricing", "implementation"],
    sentimentHistory: [
      { timestamp: "10:15 AM", score: 65, message: "Initial inquiry" },
      { timestamp: "10:18 AM", score: 70, message: "Product explanation" },
      { timestamp: "10:22 AM", score: 60, message: "Pricing discussion" },
      { timestamp: "10:25 AM", score: 75, message: "Feature demonstration" },
      { timestamp: "10:28 AM", score: 85, message: "Solution proposal" },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Current Conversation</h4>
          <p className="text-xs text-muted-foreground">Real-time sentiment analysis</p>
        </div>
        <SentimentBadge sentiment={currentConversation.overallSentiment} />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Sentiment Score</span>
          <span className="font-medium">{currentConversation.sentimentScore}/100</span>
        </div>
        <Progress
          value={currentConversation.sentimentScore}
          className="h-2 bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-green-500/50"
        />
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-medium">Key Topics Detected</h4>
        <div className="flex flex-wrap gap-1">
          {currentConversation.keyPhrases.map((phrase, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {phrase}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-medium">Sentiment Timeline</h4>
        <div className="h-[80px] w-full bg-muted/30 rounded-lg flex items-end justify-around p-2">
          {currentConversation.sentimentHistory.map((point, i) => (
            <div key={i} className="flex flex-col items-center group relative">
              <div
                className={cn(
                  "w-2 rounded-t-sm",
                  point.score >= 75 ? "bg-green-500" : point.score >= 50 ? "bg-yellow-500" : "bg-red-500",
                )}
                style={{ height: `${point.score}%` }}
              ></div>
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-popover text-popover-foreground text-xs rounded p-1 whitespace-nowrap">
                {point.timestamp}: {point.message} ({point.score}/100)
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          <Zap className="h-3.5 w-3.5 mr-2" />
          View Detailed Analysis
        </Button>
      </div>
    </div>
  )
}

// Lead Qualification Tool
function LeadQualificationTool() {
  const qualificationCriteria = [
    { id: "budget", name: "Budget Fit", description: "Customer's budget aligns with our pricing", score: 8 },
    { id: "need", name: "Need Identification", description: "Clear problem that our product solves", score: 9 },
    {
      id: "authority",
      name: "Decision Authority",
      description: "Contact can make or influence purchase decisions",
      score: 7,
    },
    { id: "timeline", name: "Purchase Timeline", description: "Plans to purchase within 3 months", score: 6 },
  ]

  const totalScore = qualificationCriteria.reduce((sum, criteria) => sum + criteria.score, 0)
  const maxPossibleScore = qualificationCriteria.length * 10
  const qualificationPercentage = (totalScore / maxPossibleScore) * 100

  let qualificationStatus = "Not Qualified"
  if (qualificationPercentage >= 75) {
    qualificationStatus = "Highly Qualified"
  } else if (qualificationPercentage >= 50) {
    qualificationStatus = "Qualified"
  } else if (qualificationPercentage >= 25) {
    qualificationStatus = "Partially Qualified"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-medium">Lead Score</h4>
          <p className="text-xs text-muted-foreground">Based on BANT criteria</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">{Math.round(qualificationPercentage)}%</p>
          <Badge
            variant="outline"
            className={cn(
              qualificationPercentage >= 75
                ? "bg-green-500/20 text-green-500 border-green-500/50"
                : qualificationPercentage >= 50
                  ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                  : qualificationPercentage >= 25
                    ? "bg-orange-500/20 text-orange-500 border-orange-500/50"
                    : "bg-red-500/20 text-red-500 border-red-500/50",
            )}
          >
            {qualificationStatus}
          </Badge>
        </div>
      </div>

      <Progress
        value={qualificationPercentage}
        className={cn(
          "h-2",
          qualificationPercentage >= 75
            ? "bg-green-500/20 [&>div]:bg-green-500"
            : qualificationPercentage >= 50
              ? "bg-yellow-500/20 [&>div]:bg-yellow-500"
              : qualificationPercentage >= 25
                ? "bg-orange-500/20 [&>div]:bg-orange-500"
                : "bg-red-500/20 [&>div]:bg-red-500",
        )}
      />

      <div className="space-y-3">
        {qualificationCriteria.map((criteria) => (
          <div key={criteria.id} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{criteria.name}</p>
              <p className="text-xs text-muted-foreground">{criteria.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{criteria.score}/10</div>
              <Progress value={criteria.score * 10} className="w-[60px] h-1.5" />
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        <Zap className="h-3.5 w-3.5 mr-2" />
        Update Qualification
      </Button>
    </div>
  )
}

// Product Suggestion Tool
function ProductSuggestionTool() {
  const suggestedProducts = [
    {
      id: "prod1",
      name: "Enterprise CRM",
      description: "Complete customer relationship management solution",
      price: "$1,200/mo",
      matchScore: 95,
    },
    {
      id: "prod2",
      name: "Analytics Dashboard",
      description: "Real-time business intelligence platform",
      price: "$800/mo",
      matchScore: 85,
    },
    {
      id: "prod3",
      name: "API Integration",
      description: "Connect with existing business systems",
      price: "$500/mo",
      matchScore: 75,
    },
  ]

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Suggested Products</h4>
        <p className="text-xs text-muted-foreground">Based on conversation context</p>
      </div>

      <div className="space-y-2">
        {suggestedProducts.map((product) => (
          <div key={product.id} className="p-3 bg-secondary/50 rounded-lg space-y-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">{product.name}</h4>
              <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">
                {product.matchScore}% Match
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{product.description}</p>
            <div className="flex justify-between items-center pt-1">
              <span className="text-xs font-medium">{product.price}</span>
              <Button variant="default" size="sm" className="h-7 px-2 text-xs">
                Suggest
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        <ShoppingCart className="h-3.5 w-3.5 mr-2" />
        View All Products
      </Button>
    </div>
  )
}

// Appointment Scheduler
function AppointmentScheduler() {
  const availableTimes = [
    { id: "time1", day: "Today", time: "3:00 PM", available: true },
    { id: "time2", day: "Today", time: "4:30 PM", available: true },
    { id: "time3", day: "Tomorrow", time: "10:00 AM", available: true },
    { id: "time4", day: "Tomorrow", time: "2:00 PM", available: true },
    { id: "time5", day: "Wed, Jul 12", time: "11:30 AM", available: true },
    { id: "time6", day: "Wed, Jul 12", time: "3:30 PM", available: true },
  ]

  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Select Meeting Type</h4>
          <Select defaultValue="product-demo">
            <SelectTrigger>
              <SelectValue placeholder="Select meeting type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product-demo">Product Demo</SelectItem>
              <SelectItem value="discovery">Discovery Call</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Duration</h4>
          <Select defaultValue="30">
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Available Time Slots</h4>
        <div className="grid grid-cols-3 gap-2">
          {availableTimes.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedTime === slot.id ? "default" : "outline"}
              className="justify-start h-auto py-2 px-3"
              onClick={() => setSelectedTime(slot.id)}
            >
              <div className="text-left">
                <p className="text-xs font-medium">{slot.day}</p>
                <p className="text-sm">{slot.time}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">View More Times</Button>
        <Button disabled={!selectedTime}>Schedule Meeting</Button>
      </div>
    </div>
  )
}

// Missing component from the code
function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

