"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import { cn } from "@/lib/utils"
import styles from "../automation-styles.module.css"

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

const PopOver = ({ trigger, children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom")

  useOnClickOutside(popoverRef, () => setIsOpen(false))

  const calculatePosition = () => {
    if (!triggerRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const screenHeight = window.innerHeight
    const screenWidth = window.innerWidth

    // Determine if we should place the popover above or below the trigger
    const spaceBelow = screenHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top
    const popoverHeight = popoverRef.current?.offsetHeight || 400

    let newPlacement: "top" | "bottom" = "bottom"
    let top = 0

    if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
      // Place above if there's not enough space below but enough above
      newPlacement = "top"
      top = triggerRect.top - popoverHeight - 10
    } else {
      // Default to below
      newPlacement = "bottom"
      top = triggerRect.bottom + 10
    }

    // Calculate horizontal position, centered on trigger
    let left = triggerRect.left + triggerRect.width / 2 - (popoverRef.current?.offsetWidth || 400) / 2

    // Ensure popover doesn't go off screen horizontally
    const popoverWidth = popoverRef.current?.offsetWidth || 400
    if (left < 20) left = 20
    if (left + popoverWidth > screenWidth - 20) left = screenWidth - popoverWidth - 20

    setPosition({ top, left })
    setPlacement(newPlacement)
  }

  useEffect(() => {
    if (isOpen) {
      calculatePosition()
      // Recalculate on resize
      window.addEventListener("resize", calculatePosition)
      // Recalculate after a short delay to ensure content is rendered
      const timer = setTimeout(calculatePosition, 50)
      return () => {
        window.removeEventListener("resize", calculatePosition)
        clearTimeout(timer)
      }
    }
  }, [isOpen]) // Removed calculatePosition from dependencies

  return (
    <>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer ${styles.hoverScale}`}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: placement === "top" ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "top" ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 50,
              transformOrigin: placement === "top" ? "bottom center" : "top center",
            }}
            className={cn("shadow-2xl", styles.glassEffect, className)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PopOver

