"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, DollarSign } from "lucide-react"

// Sample brand opportunities data
const opportunities = [
  {
    id: 1,
    brand: "EcoStyle",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Fashion",
    budget: "$1,500 - $2,500",
    match: 92,
    status: "New",
    deadline: "3 days",
    description: "Looking for fashion influencers to promote our sustainable clothing line.",
  },
  {
    id: 2,
    brand: "TechGadgets",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Technology",
    budget: "$2,000 - $3,000",
    match: 85,
    status: "New",
    deadline: "5 days",
    description: "Seeking tech reviewers for our new smartphone accessories.",
  },
  {
    id: 3,
    brand: "FitLife",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Fitness",
    budget: "$1,000 - $1,800",
    match: 78,
    status: "Applied",
    deadline: "2 days",
    description: "Fitness influencers needed for our new workout supplement campaign.",
  },
  {
    id: 4,
    brand: "BeautyGlow",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Beauty",
    budget: "$800 - $1,500",
    match: 95,
    status: "Accepted",
    deadline: "7 days",
    description: "Partnering with beauty influencers for our skincare product launch.",
  },
]

export function BrandOpportunities() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Applied":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "Accepted":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Fashion":
        return "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20"
      case "Technology":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Fitness":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "Beauty":
        return "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-emerald-500"
    if (match >= 80) return "text-blue-500"
    return "text-amber-500"
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Brand Opportunities</CardTitle>
        <CardDescription>Discover collaboration opportunities that match your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src={opportunity.logo || "/placeholder.svg"} alt={opportunity.brand} />
                        <AvatarFallback className="rounded-md">{opportunity.brand.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{opportunity.brand}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getCategoryColor(opportunity.category)}>
                            {opportunity.category}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(opportunity.status)}>
                            {opportunity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{opportunity.deadline}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">{opportunity.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getMatchColor(opportunity.match)}`}>
                          {opportunity.match}% match
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col justify-between border-t sm:border-l sm:border-t-0 p-4 bg-muted/30">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-center">
                      <span className={`text-lg font-bold ${getMatchColor(opportunity.match)}`}>
                        {opportunity.match}%
                      </span>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                    {/* <Progress
                      value={opportunity.match}
                      className="h-1.5 w-16 mt-1"
                      indicatorClassName={
                        opportunity.match >= 90
                          ? "bg-emerald-500"
                          : opportunity.match >= 80
                            ? "bg-blue-500"
                            : "bg-amber-500"
                      }
                    /> */}
                  </div>

                  <div className="flex flex-col space-y-2 mt-4">
                    {opportunity.status === "New" && (
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        Apply Now
                      </Button>
                    )}
                    {opportunity.status === "Applied" && (
                      <Button size="sm" variant="outline" disabled>
                        <Clock className="mr-2 h-4 w-4" />
                        Pending
                      </Button>
                    )}
                    {opportunity.status === "Accepted" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accepted
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
