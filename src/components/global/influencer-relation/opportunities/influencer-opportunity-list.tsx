"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Users, DollarSign, Building } from "lucide-react"
import { getAvailableOpportunities, getMyApplications } from "@/actions/influencer-relations/opportunities"
import { usePathname } from "next/navigation"

import { ApplyToOpportunityDialog } from "./apply-to-opportunity-dialog"

interface InfluencerOpportunityListProps {
  type: "available" | "applied"
  filters: {
    status: string
    category: string[]
    budget: { min: number; max: number } | null
    platform: string[]
    location: string[]
  }
}

export function InfluencerOpportunityList({ type, filters }: InfluencerOpportunityListProps) {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const pathname = usePathname()
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (type === "available") {
          const {
            status: apiStatus,
            data,
            message,
          } = await getAvailableOpportunities({
            category: filters.category,
            budget: filters.budget,
            platform: filters.platform,
            location: filters.location,
          })

          if (apiStatus === 200 && data) {
            setOpportunities(data)
          } else {
            setError(message || "Failed to load opportunities")
          }
        } else {
          const { status: apiStatus, data, message } = await getMyApplications()

          if (apiStatus === 200 && data) {
            setApplications(data)
          } else {
            setError(message || "Failed to load applications")
          }
        }
      } catch (err) {
        setError("An error occurred while fetching data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, filters])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline">Pending</Badge>
      case "ACCEPTED":
        return <Badge className="bg-green-500/20 text-green-500">Accepted</Badge>
      case "REJECTED":
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-500">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="mt-2 h-4 w-3/4" />
                <div className="mt-6 grid gap-2">
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (type === "available" && opportunities.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <p className="text-muted-foreground">No opportunities found matching your criteria</p>
        </CardContent>
      </Card>
    )
  }

  if (type === "applied" && applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <p className="text-muted-foreground">You haven&apos;t applied to any opportunities yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {selectedOpportunity && (
        <ApplyToOpportunityDialog
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onSuccess={(newApplication) => {
            setOpportunities(opportunities.filter((opp) => opp.id !== selectedOpportunity.id))
            setApplications([newApplication, ...applications])
            setSelectedOpportunity(null)
          }}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {type === "available"
          ? opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{opportunity.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {opportunity.category}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{opportunity.business.companyName}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{opportunity.description}</p>
                    <div className="mt-6 grid gap-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          Budget: ${opportunity.budgetMin} - ${opportunity.budgetMax}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Applications: {opportunity._count.applications}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
                  <Button variant="outline" size="sm" asChild>
                    {/* <Link href={`/opportunities/view/${opportunity.id}`}>View Details</Link> */}
                    <Link href={`/influencers/${slug}/opportunities/view/${opportunity.id}`}>View Details</Link>
                  </Button>
                  <Button size="sm" onClick={() => setSelectedOpportunity(opportunity)}>
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))
          : applications.map((application) => (
              <Card key={application.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{application.opportunity.title}</h3>
                      {getStatusBadge(application.status)}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{application.opportunity.business.companyName}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {application.opportunity.description}
                    </p>
                    <div className="mt-6 grid gap-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Applied: {new Date(application.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Your Proposal: ${application.proposal}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Deadline: {new Date(application.opportunity.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/influencers/${slug}/opportunities/view/${application.opportunity.id}`}>View Opportunity</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant={application.status === "PENDING" ? "destructive" : "secondary"}
                    disabled={application.status !== "PENDING"}
                  >
                    {application.status === "PENDING" ? "Withdraw" : "Application Closed"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </>
  )
}
