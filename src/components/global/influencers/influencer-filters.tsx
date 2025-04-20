"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Filter, X } from "lucide-react"
import { useState, useEffect } from "react"

interface InfluencerFiltersProps {
  filters: {
    minFollowers: number
    maxFollowers: number
    minEngagement: number
    maxEngagement: number
    niche: string[]
    location: string
    verified?: boolean
  }
  onChange: (filters: any) => void
  onApply: () => void
}

export default function InfluencerFilters({ filters, onChange, onApply }: InfluencerFiltersProps) {
  const [followersRange, setFollowersRange] = useState([
    Math.log10(filters.minFollowers || 1000),
    Math.log10(filters.maxFollowers || 1000000),
  ])
  const [engagementRange, setEngagementRange] = useState([filters.minEngagement || 0, filters.maxEngagement || 20])
  const [selectedNiches, setSelectedNiches] = useState<string[]>(filters.niche || [])
  const [location, setLocation] = useState(filters.location || "")
  const [verified, setVerified] = useState(filters.verified)

  const niches = [
    "Fashion",
    "Beauty",
    "Fitness",
    "Travel",
    "Food",
    "Lifestyle",
    "Technology",
    "Gaming",
    "Business",
    "Education",
    "Entertainment",
    "Health",
  ]

  useEffect(() => {
    // Convert log scale back to actual values for followers
    const minFollowers = Math.pow(10, followersRange[0])
    const maxFollowers = Math.pow(10, followersRange[1])

    onChange({
      minFollowers: Math.floor(minFollowers),
      maxFollowers: Math.ceil(maxFollowers),
      minEngagement: engagementRange[0],
      maxEngagement: engagementRange[1],
      niche: selectedNiches,
      location,
      verified,
    })
  }, [followersRange, engagementRange, selectedNiches, location, verified])

  const handleFollowersChange = (values: number[]) => {
    setFollowersRange(values)
  }

  const handleEngagementChange = (values: number[]) => {
    setEngagementRange(values)
  }

  const toggleNiche = (niche: string) => {
    if (selectedNiches.includes(niche)) {
      setSelectedNiches(selectedNiches.filter((n) => n !== niche))
    } else {
      setSelectedNiches([...selectedNiches, niche])
    }
  }

  const resetFilters = () => {
    setFollowersRange([3, 6]) // 1K to 1M
    setEngagementRange([0, 20])
    setSelectedNiches([])
    setLocation("")
    setVerified(undefined)
  }

  // Convert log scale to display values
  const minFollowersDisplay = Math.floor(Math.pow(10, followersRange[0]))
  const maxFollowersDisplay = Math.ceil(Math.pow(10, followersRange[1]))

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="followers-range">Followers</Label>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatNumber(minFollowersDisplay)}</span>
            <span>{formatNumber(maxFollowersDisplay)}</span>
          </div>
          <Slider
            id="followers-range"
            value={followersRange}
            min={1}
            max={7}
            step={0.1}
            onValueChange={handleFollowersChange}
            className="my-2"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="engagement-range">Engagement Rate (%)</Label>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{engagementRange[0]}%</span>
            <span>{engagementRange[1]}%</span>
          </div>
          <Slider
            id="engagement-range"
            value={engagementRange}
            min={0}
            max={20}
            step={0.1}
            onValueChange={handleEngagementChange}
            className="my-2"
          />
        </div>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="niche">
            <AccordionTrigger className="py-2">Niche</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-1 pt-2">
                {niches.map((niche) => (
                  <Badge
                    key={niche}
                    variant={selectedNiches.includes(niche) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => toggleNiche(niche)}
                  >
                    {niche}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="location">
            <AccordionTrigger className="py-2">Location</AccordionTrigger>
            <AccordionContent>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Location</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="australia">Australia & Oceania</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="south-america">South America</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Country or City"
                className="mt-2 h-8"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="verification">
            <AccordionTrigger className="py-2">Verification</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="verified-only"
                  checked={verified === true}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setVerified(true)
                    } else {
                      setVerified(undefined)
                    }
                  }}
                />
                <Label htmlFor="verified-only">Verified accounts only</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-2 space-y-2">
          <Button className="w-full" onClick={onApply}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full flex items-center" onClick={resetFilters}>
            <X className="h-4 w-4 mr-1" />
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

