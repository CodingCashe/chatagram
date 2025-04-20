"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Users, DollarSign, CheckCircle } from "lucide-react"
import { getOpportunities } from "@/actions/influencer-relations/opportunities"
import { useRouter, usePathname  } from "next/navigation"

interface OpportunityListProps {
  status: string
  filters: {
    status: string
    category: string[]
    budget: { min: number; max: number } | null
    platform: string[]
    location: string[]
  }
}

export function OpportunityList({ status, filters }: OpportunityListProps) {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true)
      try {
        const {
          status: apiStatus,
          data,
          message,
        } = await getOpportunities(status, {
          category: filters.category,
          // budget: filters.budget,
          budget: filters.budget ?? undefined,
          platform: filters.platform,
          location: filters.location,
        })

        if (apiStatus === 200 && data) {
          setOpportunities(data)
        } else {
          setError(message || "Failed to load opportunities")
        }
      } catch (err) {
        setError("An error occurred while fetching opportunities")
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [status, filters])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return <Badge className="bg-green-500/20 text-green-500">Active</Badge>
      case "DRAFT":
        return <Badge variant="outline">Draft</Badge>
      case "CLOSED":
        return <Badge variant="secondary">Archived</Badge>
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

  if (opportunities.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <p className="text-muted-foreground">No opportunities found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold truncate">{opportunity.title}</h3>
                {getStatusBadge(opportunity.status)}
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
                  <span>Applications: {opportunity.applications?.length || 0}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/${slug}/opportunities/${opportunity.id}`}>View Details</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/dashboard/${slug}/opportunities/${opportunity.id}`}>
                <CheckCircle className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">View Applications</span>
                <span className="sm:hidden">Applications</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
