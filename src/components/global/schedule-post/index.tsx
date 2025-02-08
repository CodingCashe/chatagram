"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCreateAutomation } from "@/hooks/use-automation"
import { v4 } from "uuid"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

const CreateAutomation: React.FC = () => {
  const mutationId = v4()
  const { isPending, mutate } = useCreateAutomation(mutationId)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleCreateAutomation = () => {
    mutate(
      {
        name: "Untitled",
        id: mutationId,
        createdAt: new Date(),
        keywords: [],
      },
      {
        onSuccess: () => {
          setIsSuccess(true)

          // Extract the slug from the current pathname
          const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
          const slug = slugMatch ? slugMatch[1] : ""

          // Redirect to the automations page after a short delay
          setTimeout(() => {
            router.push(`/dashboard/${slug}/automations`)
          }, 2000)
        },
      },
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.button
        className="relative px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        whileHover={{ scale: 1.05, boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreateAutomation}
        disabled={isPending || isSuccess}
      >
        {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "Create Automation"}
      </motion.button>
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-green-400 text-center"
          >
            <p className="text-lg font-semibold">Automation Created Successfully!</p>
            <p className="text-sm">Redirecting to automations page...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CreateAutomation
