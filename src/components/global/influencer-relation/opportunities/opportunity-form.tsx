"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const CATEGORIES = [
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "fitness", label: "Fitness" },
  { value: "technology", label: "Technology" },
  { value: "gaming", label: "Gaming" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
]

const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "twitter", label: "Twitter" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitch", label: "Twitch" },
]

const CONTENT_TYPES = [
  { id: "post", label: "Post" },
  { id: "story", label: "Story" },
  { id: "reel", label: "Reel" },
  { id: "video", label: "Video" },
  { id: "livestream", label: "Livestream" },
]

interface OpportunityFormProps {
  formData: any
  setFormData: (data: any) => void
  loading: boolean
  onSubmit: (e: React.FormEvent) => void
  isEdit?: boolean
}

export function OpportunityForm({ formData, setFormData, loading, onSubmit, isEdit = false }: OpportunityFormProps) {
  const [followerRange, setFollowerRange] = useState<[number, number]>([
    formData.minFollowers || 0,
    formData.maxFollowers || 100000,
  ])

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handlePlatformToggle = (platformId: string) => {
    const updatedPlatforms = formData.platforms.includes(platformId)
      ? formData.platforms.filter((id: string) => id !== platformId)
      : [...formData.platforms, platformId]

    handleChange("platforms", updatedPlatforms)
  }

  const handleContentTypeToggle = (contentType: string) => {
    const updatedContentTypes = formData.contentType.includes(contentType)
      ? formData.contentType.filter((type: string) => type !== contentType)
      : [...formData.contentType, contentType]

    handleChange("contentType", updatedContentTypes)
  }

  const handleFollowerRangeChange = (values: number[]) => {
    setFollowerRange([values[0], values[1]])
    handleChange("minFollowers", values[0])
    handleChange("maxFollowers", values[1])
  }

  const handleBudgetMinChange = (value: string) => {
    const numValue = Number.parseInt(value) || 0
    handleChange("budget", {
      ...formData.budget,
      min: numValue,
    })
  }

  const handleBudgetMaxChange = (value: string) => {
    const numValue = Number.parseInt(value) || 0
    handleChange("budget", {
      ...formData.budget,
      max: numValue,
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Opportunity Title</Label>
          <Input
            id="title"
            placeholder="E.g., Summer Fashion Campaign"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the opportunity and requirements"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budgetMin">Budget Range</Label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
              <Input
                id="budgetMin"
                type="number"
                placeholder="Min"
                value={formData.budget.min}
                onChange={(e) => handleBudgetMinChange(e.target.value)}
                className="pl-7"
                min={0}
                required
              />
            </div>
            <span>to</span>
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
              <Input
                id="budgetMax"
                type="number"
                placeholder="Max"
                value={formData.budget.max}
                onChange={(e) => handleBudgetMaxChange(e.target.value)}
                className="pl-7"
                min={0}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.deadline && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.deadline ? format(formData.deadline, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.deadline}
                onSelect={(date) => handleChange("deadline", date)}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Target Platforms</Label>
          <span className="text-xs text-muted-foreground">Select all that apply</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => {
            const isSelected = formData.platforms.includes(platform.id)
            return (
              <Badge
                key={platform.id}
                variant={isSelected ? "default" : "outline"}
                className={cn("cursor-pointer select-none", isSelected && "bg-primary")}
                onClick={() => handlePlatformToggle(platform.id)}
              >
                {platform.label}
              </Badge>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Content Type</Label>
          <span className="text-xs text-muted-foreground">Select all that apply</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPES.map((contentType) => {
            const isSelected = formData.contentType.includes(contentType.id)
            return (
              <Badge
                key={contentType.id}
                variant={isSelected ? "default" : "outline"}
                className={cn("cursor-pointer select-none", isSelected && "bg-primary")}
                onClick={() => handleContentTypeToggle(contentType.id)}
              >
                {contentType.label}
              </Badge>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Target Location</Label>
        <Input
          id="location"
          placeholder="E.g., United States, Global, etc."
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Follower Range</Label>
          <span className="text-sm">
            {formatFollowerCount(followerRange[0])} - {formatFollowerCount(followerRange[1])}
          </span>
        </div>
        <Slider
          min={0}
          max={1000000}
          step={1000}
          value={followerRange}
          onValueChange={handleFollowerRangeChange}
          className="[&>[role=slider]]:h-4 [&>[role=slider]]:w-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>250K</span>
          <span>500K</span>
          <span>750K</span>
          <span>1M+</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="minEngagementRate">Minimum Engagement Rate (%)</Label>
        <Input
          id="minEngagementRate"
          type="number"
          placeholder="E.g., 2.5"
          value={formData.minEngagementRate}
          onChange={(e) => handleChange("minEngagementRate", Number.parseFloat(e.target.value) || 0)}
          min={0}
          max={100}
          step={0.1}
        />
        <p className="text-xs text-muted-foreground">
          Average engagement rate is typically between 1-3% for larger accounts
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Specific Requirements</Label>
        <Textarea
          id="requirements"
          placeholder="Additional requirements or expectations"
          value={formData.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="isPublic"
          checked={formData.isPublic}
          onCheckedChange={(checked) => handleChange("isPublic", checked)}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="isPublic"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Make this opportunity public
          </Label>
          <p className="text-sm text-muted-foreground">
            Public opportunities will be visible to all influencers on the platform
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update Opportunity" : "Create Opportunity"}
        </Button>
      </div>
    </form>
  )
}

function formatFollowerCount(count: number) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`
  }
  return count.toString()
}
