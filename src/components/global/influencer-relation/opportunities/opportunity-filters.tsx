"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

const CATEGORIES = [
  "Fashion",
  "Beauty",
  "Lifestyle",
  "Travel",
  "Food",
  "Fitness",
  "Technology",
  "Gaming",
  "Business",
  "Education",
]

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter", "Facebook", "LinkedIn", "Twitch"]

const LOCATIONS = ["USA", "Canada", "UK", "Australia", "Europe", "Asia", "Global"]

interface OpportunityFiltersProps {
  selectedFilters: {
    status: string
    category: string[]
    budget: { min: number; max: number } | null
    platform: string[]
    location: string[]
  }
  setSelectedFilters: (filters: any) => void
}

export function OpportunityFilters({ selectedFilters, setSelectedFilters }: OpportunityFiltersProps) {
  const [budgetRange, setBudgetRange] = useState<[number, number]>([
    selectedFilters.budget?.min || 0,
    selectedFilters.budget?.max || 10000,
  ])

  const handleCategoryToggle = (category: string) => {
    if (selectedFilters.category.includes(category)) {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.filter((c) => c !== category),
      })
    } else {
      setSelectedFilters({
        ...selectedFilters,
        category: [...selectedFilters.category, category],
      })
    }
  }

  const handlePlatformToggle = (platform: string) => {
    if (selectedFilters.platform.includes(platform)) {
      setSelectedFilters({
        ...selectedFilters,
        platform: selectedFilters.platform.filter((p) => p !== platform),
      })
    } else {
      setSelectedFilters({
        ...selectedFilters,
        platform: [...selectedFilters.platform, platform],
      })
    }
  }

  const handleLocationToggle = (location: string) => {
    if (selectedFilters.location.includes(location)) {
      setSelectedFilters({
        ...selectedFilters,
        location: selectedFilters.location.filter((l) => l !== location),
      })
    } else {
      setSelectedFilters({
        ...selectedFilters,
        location: [...selectedFilters.location, location],
      })
    }
  }

  const handleBudgetChange = (values: number[]) => {
    setBudgetRange([values[0], values[1]])
    setSelectedFilters({
      ...selectedFilters,
      budget: { min: values[0], max: values[1] },
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      status: "all",
      category: [],
      budget: null,
      platform: [],
      location: [],
    })
    setBudgetRange([0, 10000])
  }

  const removeCategoryFilter = (category: string) => {
    setSelectedFilters({
      ...selectedFilters,
      category: selectedFilters.category.filter((c) => c !== category),
    })
  }

  const removePlatformFilter = (platform: string) => {
    setSelectedFilters({
      ...selectedFilters,
      platform: selectedFilters.platform.filter((p) => p !== platform),
    })
  }

  const removeLocationFilter = (location: string) => {
    setSelectedFilters({
      ...selectedFilters,
      location: selectedFilters.location.filter((l) => l !== location),
    })
  }

  const removeBudgetFilter = () => {
    setSelectedFilters({
      ...selectedFilters,
      budget: null,
    })
    setBudgetRange([0, 10000])
  }

  const hasActiveFilters =
    selectedFilters.category.length > 0 ||
    selectedFilters.platform.length > 0 ||
    selectedFilters.location.length > 0 ||
    selectedFilters.budget !== null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Category</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CATEGORIES.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedFilters.category.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Platform</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Select Platforms</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PLATFORMS.map((platform) => (
              <DropdownMenuCheckboxItem
                key={platform}
                checked={selectedFilters.platform.includes(platform)}
                onCheckedChange={() => handlePlatformToggle(platform)}
              >
                {platform}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Location</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Select Locations</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LOCATIONS.map((location) => (
              <DropdownMenuCheckboxItem
                key={location}
                checked={selectedFilters.location.includes(location)}
                onCheckedChange={() => handleLocationToggle(location)}
              >
                {location}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Budget Range</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Budget Range</Label>
                  <span className="text-sm">
                    ${budgetRange[0]} - ${budgetRange[1]}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={budgetRange}
                  onValueChange={handleBudgetChange}
                  className="[&>[role=slider]]:h-4 [&>[role=slider]]:w-4"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 items-center gap-2">
                  <Label htmlFor="minBudget">Min ($)</Label>
                  <Input
                    type="number"
                    id="minBudget"
                    value={budgetRange[0]}
                    onChange={(e) => handleBudgetChange([Number.parseInt(e.target.value), budgetRange[1]])}
                  />
                </div>
                <div className="grid flex-1 items-center gap-2">
                  <Label htmlFor="maxBudget">Max ($)</Label>
                  <Input
                    type="number"
                    id="maxBudget"
                    value={budgetRange[1]}
                    onChange={(e) => handleBudgetChange([budgetRange[0], Number.parseInt(e.target.value)])}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={clearFilters}>
            <X className="h-3.5 w-3.5" />
            <span>Clear Filters</span>
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.category.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <button onClick={() => removeCategoryFilter(category)} className="ml-1 rounded-full hover:bg-muted">
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {category} filter</span>
              </button>
            </Badge>
          ))}
          {selectedFilters.platform.map((platform) => (
            <Badge key={platform} variant="secondary" className="gap-1">
              {platform}
              <button onClick={() => removePlatformFilter(platform)} className="ml-1 rounded-full hover:bg-muted">
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {platform} filter</span>
              </button>
            </Badge>
          ))}
          {selectedFilters.location.map((location) => (
            <Badge key={location} variant="secondary" className="gap-1">
              {location}
              <button onClick={() => removeLocationFilter(location)} className="ml-1 rounded-full hover:bg-muted">
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {location} filter</span>
              </button>
            </Badge>
          ))}
          {selectedFilters.budget && (
            <Badge variant="secondary" className="gap-1">
              ${selectedFilters.budget.min} - ${selectedFilters.budget.max}
              <button onClick={removeBudgetFilter} className="ml-1 rounded-full hover:bg-muted">
                <X className="h-3 w-3" />
                <span className="sr-only">Remove budget filter</span>
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
