"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, DollarSign } from "lucide-react"
import { applyToOpportunity } from "@/actions/influencer-relations/influencer-applications"
import { toast } from "@/hooks/use-toast"

interface ApplyToOpportunityDialogProps {
  opportunity: any
  onClose: () => void
  onSuccess: (application: any) => void
}

export function ApplyToOpportunityDialog({ opportunity, onClose, onSuccess }: ApplyToOpportunityDialogProps) {
  const [message, setMessage] = useState("")
  const [proposal, setProposal] = useState(opportunity.budgetMin)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { status, data, message: errorMessage } = await applyToOpportunity(opportunity.id, message, proposal)

      if (status === 200 && data) {
        toast({
          title: "Application Submitted",
          description: "Your application has been submitted successfully",
        })
        onSuccess(data)
      } else {
        toast({
          title: "Error",
          description: errorMessage || "Failed to submit application",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply to Opportunity</DialogTitle>
          <DialogDescription>
            Submit your application for &ldquo;{opportunity.title}&rdquo; with {opportunity.business.companyName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposal">Your Rate (USD)</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
              </span>
              <Input
                id="proposal"
                type="number"
                value={proposal}
                onChange={(e) => setProposal(Number(e.target.value))}
                className="pl-8"
                min={opportunity.budgetMin}
                max={opportunity.budgetMax}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Budget range: ${opportunity.budgetMin} - ${opportunity.budgetMax}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Cover Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain why you're a good fit for this opportunity..."
              className="min-h-[120px]"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
