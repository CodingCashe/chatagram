// "use client"

// import * as React from "react"
// import * as SliderPrimitive from "@radix-ui/react-slider"

// import { cn } from "@/lib/utils"

// const Slider = React.forwardRef<
//   React.ElementRef<typeof SliderPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
// >(({ className, ...props }, ref) => (
//   <SliderPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative flex w-full touch-none select-none items-center",
//       className
//     )}
//     {...props}
//   >
//     <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
//       <SliderPrimitive.Range className="absolute h-full bg-primary" />
//     </SliderPrimitive.Track>
//     <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
//   </SliderPrimitive.Root>
// ))
// Slider.displayName = SliderPrimitive.Root.displayName

// export { Slider }


"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SliderProps {
  children: React.ReactNode[]
  className?: string
}

const Slider: React.FC<SliderProps> = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      handlePrev()
    } else if (info.offset.x < -50) {
      handleNext()
    }
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1 === children.length ? 0 : prevIndex + 1))
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? children.length - 1 : prevIndex - 1))
  }

  const slideVariants = {
    hiddenRight: {
      x: containerWidth,
      opacity: 0,
    },
    hiddenLeft: {
      x: -containerWidth,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      x: direction > 0 ? -containerWidth : containerWidth,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="w-full h-full"
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={handlePrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

export default Slider

