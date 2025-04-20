"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Loader2 } from "lucide-react"
import { getAvailableOpportunities, applyToOpportunity } from "@/actions/influencer-relations/influencer-applications"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function BrandOpportunity() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [proposal, setProposal] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true)
        // Use getAvailableOpportunities instead of getBrandOpportunities
        const { status, data, message } = await getAvailableOpportunities()

        if (status === 200 && data) {
          setOpportunities(data)
        } else {
          setError(message || "Failed to load brand opportunities")
        }
      } catch (err) {
        setError("An error occurred while fetching brand opportunities")
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  // Helper function to format budget
  const formatBudget = (budget: any) => {
    if (!budget) return "N/A"

    // If budget is an object with min and max properties
    if (typeof budget === "object" && budget !== null) {
      if ("min" in budget && "max" in budget) {
        return `$${budget.min} - $${budget.max}`
      }
      // If it has budgetMin and budgetMax properties
      if ("budgetMin" in budget && "budgetMax" in budget) {
        return `$${budget.budgetMin} - $${budget.budgetMax}`
      }
      // If it's some other kind of object, convert to string
      return JSON.stringify(budget)
    }

    // If budget is a simple number
    return `$${budget}`
  }

  const handleApplyClick = (opportunity: any) => {
    setSelectedOpportunity(opportunity)
    setApplyDialogOpen(true)
  }

  const handleViewDetailsClick = (opportunity: any) => {
    setSelectedOpportunity(opportunity)
    setDetailsDialogOpen(true)
  }

  const handleSubmitApplication = async () => {
    if (!selectedOpportunity) return

    try {
      setSubmitting(true)

      // Validate inputs
      if (!message.trim()) {
        toast({
          title: "Error",
          description: "Please enter a message to the brand",
          variant: "destructive",
        })
        return
      }

      if (!proposal.trim() || isNaN(Number(proposal)) || Number(proposal) <= 0) {
        toast({
          title: "Error",
          description: "Please enter a valid proposal amount",
          variant: "destructive",
        })
        return
      }

      // Submit application
      const result = await applyToOpportunity(selectedOpportunity.id, message, Number(proposal))

      if (result.status === 200) {
        toast({
          title: "Success",
          description: "Your application has been submitted successfully",
        })

        // Remove the opportunity from the list
        setOpportunities(opportunities.filter((opp) => opp.id !== selectedOpportunity.id))
        setApplyDialogOpen(false)
        setMessage("")
        setProposal("")

        // Refresh the page to show updated data
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to submit application",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while submitting your application",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleViewAll = () => {
    router.push("/opportunities")
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Brand Opportunities</CardTitle>
            <CardDescription>Discover new collaboration opportunities</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleViewAll}>
            <ArrowRight className="h-3.5 w-3.5" />
            <span>View All</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
            {error}
          </div>
        ) : opportunities.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
            No opportunities available
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {opportunity.brandName || opportunity.business?.businessName || "Brand"}
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-500">{opportunity.matchScore || "100"}% Match</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    Deadline: {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : "Ongoing"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">
                        {formatBudget(
                          opportunity.budget || { budgetMin: opportunity.budgetMin, budgetMax: opportunity.budgetMax },
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Content:</span>
                      <span className="font-medium">{opportunity.contentType || opportunity.type || "Various"}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {opportunity.description || "No description available"}
                    </p>
                  </div>
                </CardContent>
                <div className="flex gap-2 border-t bg-muted/50 p-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleApplyClick(opportunity)}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleViewDetailsClick(opportunity)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply to Opportunity</DialogTitle>
            <DialogDescription>
              Submit your application to{" "}
              {selectedOpportunity?.brandName || selectedOpportunity?.business?.businessName || "this brand"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="proposal">Your Proposal Amount ($)</Label>
              <Input
                id="proposal"
                type="number"
                min="1"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="Enter your proposed rate"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message to Brand</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce yourself and explain why you're a good fit for this opportunity"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitApplication} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Opportunity Details</DialogTitle>
            <DialogDescription>
              {selectedOpportunity?.brandName || selectedOpportunity?.business?.businessName || "Brand"} Collaboration
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedOpportunity && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Budget</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatBudget(
                        selectedOpportunity.budget || {
                          budgetMin: selectedOpportunity.budgetMin,
                          budgetMax: selectedOpportunity.budgetMax,
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Content Type</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedOpportunity.contentType || selectedOpportunity.type || "Various"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Deadline</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedOpportunity.deadline
                        ? new Date(selectedOpportunity.deadline).toLocaleDateString()
                        : "Ongoing"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Applications</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedOpportunity._count?.applications || "0"} received
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedOpportunity.description || "No description available"}
                  </p>
                </div>
                {selectedOpportunity.requirements && (
                  <div>
                    <h4 className="text-sm font-medium">Requirements</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {selectedOpportunity.requirements}
                    </p>
                  </div>
                )}
                {selectedOpportunity.platforms && selectedOpportunity.platforms.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium">Platforms</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedOpportunity.platforms.map((platform: string) => (
                        <Badge key={platform} variant="secondary">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setDetailsDialogOpen(false)
                handleApplyClick(selectedOpportunity)
              }}
            >
              Apply Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
