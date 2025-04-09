"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarIcon, X } from "lucide-react"

interface InfluencerRatingProps {
  influencerId: string
  onRate: (influencerId: string, rating: number) => void
  onCancel: () => void
}

export function InfluencerRating({ influencerId, onRate, onCancel }: InfluencerRatingProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
        <CardTitle>Rate Influencer</CardTitle>
        <CardDescription>How would you rate your experience with this influencer?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <StarIcon
                  className={`h-10 w-10 transition-all ${
                    star <= (hoveredRating || rating) ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {!rating
            ? "Click to rate"
            : rating === 1
              ? "Poor"
              : rating === 2
                ? "Fair"
                : rating === 3
                  ? "Good"
                  : rating === 4
                    ? "Very Good"
                    : "Excellent"}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!rating} onClick={() => onRate(influencerId, rating)}>
          Submit Rating
        </Button>
      </CardFooter>
    </Card>
  )
}
