"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, LogIn, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AccountRecognitionProps {
  email: string
  onLoginInstead: () => void
  onClose?: () => void
}

export function AccountRecognition({ email, onLoginInstead, onClose }: AccountRecognitionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Small delay for better UX when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 500) // Wait for exit animation
  }

  const handleLoginInstead = () => {
    setIsVisible(false)
    setTimeout(() => {
      onLoginInstead()
    }, 300) // Wait for exit animation
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Background gradient with grain texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-violet-700/90 opacity-90" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />

            {/* Glass panel */}
            <div className="relative z-10 backdrop-blur-sm bg-white/10 p-8 border border-white/20">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />

              {/* Icon with ripple effect */}
              <div className="relative flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: 0.3, duration: 1, times: [0, 0.5, 1] }}
                  className="absolute inset-0 rounded-full bg-white/20"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ delay: 0.3, duration: 1.5, times: [0, 0.5, 1] }}
                  className="absolute inset-0 rounded-full bg-white/10"
                />
                <div className="relative bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>

              <div className="text-center space-y-3 mb-6">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-white"
                >
                  Account Already Exists
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80"
                >
                  We recognize you! An account is already registered with:
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <User className="h-4 w-4 text-white" />
                  <span className="text-white font-medium break-all">{email}</span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <Button
                  onClick={handleLoginInstead}
                  className="w-full relative overflow-hidden group bg-white hover:bg-white/90 text-indigo-700 h-12"
                >
                  <span className="z-10 relative flex items-center justify-center gap-2">
                    Login Instead
                    <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-indigo-100 to-white/0 opacity-50" />
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="w-full text-white/80 hover:text-white hover:bg-white/10 underline-offset-4 hover:underline"
                >
                  Try with a different email
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6 text-white/60 text-xs text-center"
              >
                <p>
                  Having trouble accessing your account?{" "}
                  <a href="/forgot-password" className="text-white hover:underline">
                    Reset your password
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
