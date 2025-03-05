"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

type FloatingPanelProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  title?: string
  className?: string
}

const FloatingPanel = ({ trigger, children, title, className = "" }: FloatingPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer hoverScale">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 floatingPanelBackdrop"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className={`w-[100vw] max-w-[850px] bg-background-90 rounded-xl overflow-hidden shadow-2xl floatingPanelContent ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fancy gradient header */}
              <div className="relative h-2 bg-gradient-to-r from-light-blue via-keyword-purple to-keyword-red" />

              <div className="p-4 md:p-5">
                {title && (
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 rounded-full hover:bg-background-80 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="max-h-[70vh] overflow-y-auto">{children}</div>
              </div>

              {/* Fancy bottom bar with glow */}
              <div className="relative h-1 bg-background-80">
                <div className="absolute inset-0 bg-light-blue opacity-30 blur-sm" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingPanel

