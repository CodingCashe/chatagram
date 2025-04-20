"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { addCampaign } from "@/actions/campaigns"
import { useToast } from "@/hooks/use-toast"

export default function NewCampaignPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    budget: "",
    brief: "",
    guidelines: "",
    hashtags: "",
    mentions: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Format the data
      const campaignData = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate || undefined, // Convert null to undefined
        endDate: formData.endDate || undefined, // Convert null to undefined
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        brief: formData.brief,
        guidelines: formData.guidelines,
        hashtags: formData.hashtags ? formData.hashtags.split(',').map(tag => tag.trim()) : undefined,
        mentions: formData.mentions ? formData.mentions.split(',').map(mention => mention.trim()) : undefined,
      }

      const result = await addCampaign(campaignData)
  
      if (result.status === 200) {
        toast({
          title: "Campaign created",
          description: "Your new campaign has been created successfully.",
        })
        // Fix for id access issue
        if (typeof result.data === 'object' && result.data !== null && 'id' in result.data) {
          router.push(`/campaigns/${result.data.id}`)
        } else {
          router.push('/campaigns')
        }
      } else {
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result.data : "Failed to create campaign",
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create campaign"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error creating campaign:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
        <p className="text-muted-foreground">Set up a new influencer marketing campaign</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>Enter the basic information about your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Summer Collection Launch"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the goals and scope of this campaign"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                  <Calendar
                        mode="single"
                        selected={formData.startDate || undefined}
                        onSelect={(date) => setFormData((prev) => ({ 
                        ...prev, 
                        startDate: date || null 
                        }))}
                        initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                  <Calendar
                        mode="single"
                        selected={formData.endDate || undefined}
                        onSelect={(date) => setFormData((prev) => ({ 
                        ...prev, 
                        endDate: date || null 
                        }))}
                        initialFocus
                        disabled={(date) => formData.startDate ? date < formData.startDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="5000"
                min="0"
                step="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brief">Campaign Brief</Label>
              <Textarea
                id="brief"
                name="brief"
                value={formData.brief}
                onChange={handleChange}
                placeholder="Detailed information about the campaign for influencers"
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guidelines">Content Guidelines</Label>
              <Textarea
                id="guidelines"
                name="guidelines"
                value={formData.guidelines}
                onChange={handleChange}
                placeholder="Guidelines for influencers to follow when creating content"
                rows={5}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hashtags">Campaign Hashtags</Label>
                <Input
                  id="hashtags"
                  name="hashtags"
                  value={formData.hashtags}
                  onChange={handleChange}
                  placeholder="#summerlaunch, #newcollection"
                />
                <p className="text-xs text-muted-foreground">Separate multiple hashtags with commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentions">Required Mentions</Label>
                <Input
                  id="mentions"
                  name="mentions"
                  value={formData.mentions}
                  onChange={handleChange}
                  placeholder="@yourbrand, @partnerbrand"
                />
                <p className="text-xs text-muted-foreground">Separate multiple mentions with commas</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Campaign"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}



// Fix for Date null vs undefined issues
// In app/campaigns/new/page.tsx

// Update the handleSubmit function:
// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
  
//     try {
//       // Format the data
//       const campaignData = {
//         name: formData.name,
//         description: formData.description,
//         startDate: formData.startDate || undefined, // Convert null to undefined
//         endDate: formData.endDate || undefined, // Convert null to undefined
//         budget: formData.budget ? parseFloat(formData.budget) : undefined,
//         brief: formData.brief,
//         guidelines: formData.guidelines,
//         hashtags: formData.hashtags ? formData.hashtags.split(',').map(tag => tag.trim()) : undefined,
//         mentions: formData.mentions ? formData.mentions.split(',').map(mention => mention.trim()) : undefined,
//       }
  
//       const result = await addCampaign(campaignData)
  
//       if (result.status === 200) {
//         toast({
//           title: "Campaign created",
//           description: "Your new campaign has been created successfully.",
//         })
//         // Fix for id access issue
//         if (typeof result.data === 'object' && result.data !== null && 'id' in result.data) {
//           router.push(`/campaigns/${result.data.id}`)
//         } else {
//           router.push('/campaigns')
//         }
//       } else {
//         // Rest of the code remains the same
//       }
//     } catch (error) {
//       // Rest of the code remains the same
//     }
//   }
  
//   // Fix for setFormData issues with Date
//   // Update the Calendar onSelect handlers:
  
//   // For startDate:
//   <Calendar
//     mode="single"
//     selected={formData.startDate || undefined}
//     onSelect={(date) => setFormData((prev) => ({ 
//       ...prev, 
//       startDate: date || null 
//     }))}
//     initialFocus
//   />
  
//   // For endDate:
//   <Calendar
//     mode="single"
//     selected={formData.endDate || undefined}
//     onSelect={(date) => setFormData((prev) => ({ 
//       ...prev, 
//       endDate: date || null 
//     }))}
//     initialFocus
//     disabled={(date) => formData.startDate ? date < formData.startDate : false}
//   />