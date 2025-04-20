"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LineChart, BarChart } from "@/components/ui/charte"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Instagram,
  Youtube,
  Twitter,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { onCurrentUser } from "@/actions/user"
import { getInfluencerProfile, getInfluencerOpportunities, getInfluencerStats } from "@/actions/influencer-hub"
import { useToast } from "@/hooks/use-toast"

interface Opportunity {
  id: string;
  title: string;
  brand: string;
  description: string;
  platform: string;
  contentType: string;
  budget: number;
  deadline: Date | null;
  status: string;
}



export default function InfluencerHubPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [profileCompleteness, setProfileCompleteness] = useState(0)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await onCurrentUser()
        if (!user) {
          router.push("/auth/signin?callbackUrl=/influencer-hub")
          return
        }

        // Check if user is an influencer
        const profileResult = await getInfluencerProfile()
        if (profileResult.status !== 200) {
          // User is not registered as an influencer
          router.push("/influencer-hub/onboarding")
          return
        }

        setProfile(profileResult.data)

        // Calculate profile completeness
        calculateProfileCompleteness(profileResult.data)

        // Get stats and opportunities
        const statsResult = await getInfluencerStats()
        if (statsResult.status === 200) {
          setStats(statsResult.data)
        }

        // const opportunitiesResult = await getInfluencerOpportunities()
        // if (opportunitiesResult.status === 200) {
        //   // setOpportunities(opportunitiesResult.data.opportunities || [])
        //   setOpportunities((opportunitiesResult.data as { opportunities: Opportunity[] }).opportunities || []);
        // }
          const opportunitiesResult = await getInfluencerOpportunities();
          if (opportunitiesResult.status === 200) {
            if (typeof opportunitiesResult.data !== 'string') {
              setOpportunities(opportunitiesResult.data.opportunities || []);
            } else {
              setOpportunities([]); // handle string case
            }
          }

        // Get unread messages count
        // This would be implemented with your messaging system
        setUnreadMessages(3) // Example value
      } catch (error) {
        console.error("Error loading influencer hub:", error)
        toast({
          title: "Error",
          description: "Failed to load your profile. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, toast])

  const calculateProfileCompleteness = (profile: any) => {
    if (!profile) return 0

    const requiredFields = [
      "name",
      "bio",
      "profilePicture",
      "location",
      "niche",
      "socialLinks",
      "contentSamples",
      "rates",
    ]

    let completedFields = 0
    requiredFields.forEach((field) => {
      if (
        profile[field] &&
        (typeof profile[field] !== "object" ||
          (Array.isArray(profile[field]) && profile[field].length > 0) ||
          Object.keys(profile[field]).length > 0)
      ) {
        completedFields++
      }
    })

    const percentage = Math.round((completedFields / requiredFields.length) * 100)
    setProfileCompleteness(percentage)
    return percentage
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={profile?.profilePicture || "/placeholder.svg?height=64&width=64"} alt={profile?.name} />
            <AvatarFallback>{profile?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {profile?.name || "Your Profile"}
              {profile?.verified && (
                <Badge variant="secondary" className="ml-2">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>@{profile?.username || "username"}</span>
              <span>•</span>
              <span>{profile?.location || "Location"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/influencer-hub/messages">
            <Button variant="outline" className="relative">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/influencer-hub/notifications">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </Link>
          <Link href="/influencer-hub/settings">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {profileCompleteness < 100 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Complete your profile</AlertTitle>
          <AlertDescription>
            Your profile is {profileCompleteness}% complete. Complete your profile to increase visibility to brands.
            <div className="mt-2">
              <Progress value={profileCompleteness} className="h-2" />
            </div>
            <Button variant="link" className="p-0 h-auto mt-2" asChild>
              <Link href="/influencer-hub/profile">Complete Now</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your engagement and growth metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground text-sm">Profile Views</span>
                <span className="text-2xl font-bold">{stats?.profileViews?.toLocaleString() || "0"}</span>
                <span className="text-xs text-green-500">+{stats?.profileViewsGrowth || "0"}%</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground text-sm">Campaign Invites</span>
                <span className="text-2xl font-bold">{stats?.campaignInvites || "0"}</span>
                <span className="text-xs text-green-500">+{stats?.campaignInvitesGrowth || "0"}%</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground text-sm">Avg. Engagement</span>
                <span className="text-2xl font-bold">{stats?.avgEngagement || "0"}%</span>
                <span className="text-xs text-green-500">+{stats?.avgEngagementGrowth || "0"}%</span>
              </div>
            </div>

            <div className="h-64">
              <LineChart
                data={
                  stats?.engagementHistory || [
                    { date: "Jan", engagement: 3.2 },
                    { date: "Feb", engagement: 3.8 },
                    { date: "Mar", engagement: 4.3 },
                    { date: "Apr", engagement: 3.9 },
                    { date: "May", engagement: 4.7 },
                    { date: "Jun", engagement: 5.2 },
                  ]
                }
                xAxisKey="date"
                series={[{ name: "Engagement Rate (%)", key: "engagement", color: "#8884d8" }]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Social Platforms</CardTitle>
            <CardDescription>Your connected accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile?.socialLinks?.instagram && (
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">@{profile.socialLinks.instagram}</p>
                    </div>
                  </div>
                  <Badge>Connected</Badge>
                </div>
              )}

              {profile?.socialLinks?.youtube && (
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">YouTube</p>
                      <p className="text-sm text-muted-foreground">{profile.socialLinks.youtube}</p>
                    </div>
                  </div>
                  <Badge>Connected</Badge>
                </div>
              )}

              {profile?.socialLinks?.twitter && (
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Twitter className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-muted-foreground">@{profile.socialLinks.twitter}</p>
                    </div>
                  </div>
                  <Badge>Connected</Badge>
                </div>
              )}

              <Button variant="outline" className="w-full" asChild>
                <Link href="/influencer-hub/settings/social">Connect More Platforms</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Available Opportunities
              </CardTitle>
              <CardDescription>Campaigns and collaborations that match your profile</CardDescription>
            </CardHeader>
            <CardContent>
              {opportunities.length > 0 ? (
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <div key={opportunity.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{opportunity.title}</h3>
                          <p className="text-muted-foreground">{opportunity.brand}</p>
                        </div>
                        <Badge variant={opportunity.status === "new" ? "default" : "outline"}>
                          {opportunity.status === "new" ? "New" : "Open"}
                        </Badge>
                      </div>
                      <p className="mt-2 line-clamp-2">{opportunity.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="secondary">${opportunity.budget}</Badge>
                        <Badge variant="outline">{opportunity.platform}</Badge>
                        <Badge variant="outline">{opportunity.contentType}</Badge>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                        </div>
                        <Button asChild>
                          <Link href={`/influencer-hub/opportunities/${opportunity.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center">
                    <Button variant="outline">View All Opportunities</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No opportunities yet</h3>
                  <p className="text-muted-foreground mt-1 mb-4">Complete your profile to get matched with brands</p>
                  <Button asChild>
                    <Link href="/influencer-hub/opportunities/browse">Browse Open Opportunities</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Active Campaigns
              </CardTitle>
              <CardDescription>Your ongoing collaborations with brands</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.activeCampaigns && stats.activeCampaigns.length > 0 ? (
                <div className="space-y-4">
                  {stats.activeCampaigns.map((campaign: any) => (
                    <div key={campaign.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{campaign.name}</h3>
                          <p className="text-muted-foreground">{campaign.brand}</p>
                        </div>
                        <Badge
                          variant={
                            campaign.status === "in_progress"
                              ? "default"
                              : campaign.status === "pending_approval"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.status === "in_progress"
                            ? "In Progress"
                            : campaign.status === "pending_approval"
                              ? "Pending Approval"
                              : campaign.status}
                        </Badge>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Deliverables</p>
                          <p>{campaign.deliverables}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Due Date</p>
                          <p>{new Date(campaign.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Payment</p>
                          <p>${campaign.payment}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Progress value={campaign.progress} className="w-24 h-2" />
                          <span className="text-sm text-muted-foreground">{campaign.progress}% Complete</span>
                        </div>
                        <Button asChild>
                          <Link href={`/influencer-hub/campaigns/${campaign.id}`}>Manage</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No active campaigns</h3>
                  <p className="text-muted-foreground mt-1 mb-4">You don&apos;t have any active campaigns at the moment</p>
                  <Button asChild>
                    <Link href="/influencer-hub/opportunities/browse">Find Opportunities</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Earnings Overview
              </CardTitle>
              <CardDescription>Track your campaign earnings and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground text-sm">Total Earnings</span>
                  <span className="text-2xl font-bold">${stats?.totalEarnings?.toLocaleString() || "0"}</span>
                  <span className="text-xs text-green-500">Lifetime</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground text-sm">Pending</span>
                  <span className="text-2xl font-bold">${stats?.pendingEarnings?.toLocaleString() || "0"}</span>
                  <span className="text-xs text-muted-foreground">To be paid</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground text-sm">This Month</span>
                  <span className="text-2xl font-bold">${stats?.currentMonthEarnings?.toLocaleString() || "0"}</span>
                  <span className="text-xs text-green-500">+{stats?.monthlyEarningsGrowth || "0"}%</span>
                </div>
              </div>

              <div className="h-64">
                <BarChart
                  data={
                    stats?.monthlyEarnings || [
                      { month: "Jan", earnings: 1200 },
                      { month: "Feb", earnings: 1800 },
                      { month: "Mar", earnings: 2400 },
                      { month: "Apr", earnings: 1600 },
                      { month: "May", earnings: 2800 },
                      { month: "Jun", earnings: 3200 },
                    ]
                  }
                  xAxisKey="month"
                  series={[{ name: "Earnings ($)", key: "earnings", color: "#8884d8" }]}
                />
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <h3 className="font-medium">Recent Payments</h3>
                {stats?.recentPayments && stats.recentPayments.length > 0 ? (
                  <div className="space-y-2">
                    {stats.recentPayments.map((payment: any) => (
                      <div key={payment.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{payment.campaign}</p>
                          <p className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${payment.amount}</p>
                          <Badge variant="outline" className="text-green-500">
                            Paid
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No recent payments</p>
                )}

                <div className="flex justify-end mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/influencer-hub/earnings">View All Transactions</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance Analytics
              </CardTitle>
              <CardDescription>Detailed insights into your profile and campaign performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Profile Visibility</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Profile Views</span>
                        <span>{stats?.profileViews || 0}</span>
                      </div>
                      <Progress value={stats?.profileViewsPercentile || 0} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Better than {stats?.profileViewsPercentile || 0}% of influencers in your category
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Search Appearances</span>
                        <span>{stats?.searchAppearances || 0}</span>
                      </div>
                      <Progress value={stats?.searchAppearancesPercentile || 0} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Better than {stats?.searchAppearancesPercentile || 0}% of influencers in your category
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Brand Contacts</span>
                        <span>{stats?.brandContacts || 0}</span>
                      </div>
                      <Progress value={stats?.brandContactsPercentile || 0} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Better than {stats?.brandContactsPercentile || 0}% of influencers in your category
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Campaign Performance</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Acceptance Rate</span>
                        <span>{stats?.acceptanceRate || 0}%</span>
                      </div>
                      <Progress value={stats?.acceptanceRate || 0} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {stats?.acceptanceRateChange > 0 ? "+" : ""}
                        {stats?.acceptanceRateChange || 0}% from last month
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>{stats?.completionRate || 0}%</span>
                      </div>
                      <Progress value={stats?.completionRate || 0} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {stats?.completionRateChange > 0 ? "+" : ""}
                        {stats?.completionRateChange || 0}% from last month
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Client Satisfaction</span>
                        <span>{stats?.clientSatisfaction || 0}/5</span>
                      </div>
                      <Progress value={(stats?.clientSatisfaction || 0) * 20} className="h-2" />
                      <p className="text-xs text-muted-foreground">Based on {stats?.reviewCount || 0} client reviews</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button asChild>
                  <Link href="/influencer-hub/analytics">View Detailed Analytics</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

