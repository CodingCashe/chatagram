'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

const InstagramIntegrationPopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname()

  // Extract the slug from the pathname
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ''

  const integrationsLink = `/dashboard/${slug}/integrations`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border-4 border-blue-500/50 max-w-md w-full"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-blue-300">Enhance Your Experience!</h2>
            <p className="text-gray-300 mb-6">
              Integrate your Instagram account to unlock powerful insights and automated features.              
            </p>
            <div className="flex justify-center">
              <Link href={integrationsLink} passHref>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Integrate Instagram Now
                </Button>
              </Link>
            </div>
            <div className="mt-6 text-center">
              <span className="text-blue-400 text-sm">
                Supercharge your dashboard with Instagram data!
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InstagramIntegrationPopup