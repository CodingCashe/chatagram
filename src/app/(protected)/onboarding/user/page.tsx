"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import OnboardingPage from "../onboarding"
import { Loader2 } from "lucide-react"

export default function OnboardingRoute() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time or fetch initial data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="flex min-h-screen w-full flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <div className="relative h-24 w-24">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <Loader2 className="absolute inset-0 h-24 w-24 animate-spin text-primary" strokeWidth={1.5} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-2xl font-bold text-primary">Preparing Your Experience</h1>
                <p className="mt-2 text-muted-foreground">We&apos;re setting up your personalized onboarding journey...</p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <OnboardingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
