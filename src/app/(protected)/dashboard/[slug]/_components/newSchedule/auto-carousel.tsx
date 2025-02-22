"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface AutoCarouselProps {
  images: string[]
  interval?: number
  className?: string
}

export function AutoCarousel({ images, interval = 3000, className }: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % images.length)
  }, [images.length])

  const previous = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (isPaused || images.length <= 1) return

    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval, isPaused, images.length])

  if (images.length === 0) return null

  return (
    <div
      className={cn("relative aspect-square rounded-lg overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-square"
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault()
              previous()
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault()
              next()
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  index === currentIndex ? "bg-primary" : "bg-primary/50",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

