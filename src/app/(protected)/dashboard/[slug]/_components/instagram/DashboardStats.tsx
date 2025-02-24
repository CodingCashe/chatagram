import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Calendar, Image, Users } from "lucide-react"

interface DashboardStatsProps {
  posts: any[]
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ posts }) => {
  const totalPosts = posts.length
  const scheduledPosts = posts.filter((post) => post.status === "scheduled").length
  const publishedPosts = posts.filter((post) => post.status === "published").length
  const engagementRate = Math.round(Math.random() * 10) // Placeholder, replace with actual data

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPosts}</div>
          <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{scheduledPosts}</div>
          <p className="text-xs text-muted-foreground">{scheduledPosts} posts waiting to be published</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
          <Image className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{publishedPosts}</div>
          <p className="text-xs text-muted-foreground">{publishedPosts} posts live on Instagram</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{engagementRate}%</div>
          <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 5)}% from last week</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardStats

