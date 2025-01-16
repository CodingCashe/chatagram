'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BusinessForm from './businessInfo'
import BusinessInfo from './infoCard'
import { useToast } from "@/hooks/use-toast"
import { getAllBusinesses } from '@/actions/businfo'
import { Loader2 } from 'lucide-react'
import { FormSchema } from './businessInfo'

export default function BusinessManager() {
  const [business, setBusiness] = useState<FormSchema | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const result = await getAllBusinesses()
        if (result.status === 200 && result.data.businesses.length > 0) {
          setBusiness(result.data.businesses[0])
        } else {
          setBusiness(null)
        }
      } catch (error) {
        console.error('Error fetching business:', error)
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching business data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusiness()
  }, [toast])

  const handleBusinessCreated = (newBusiness: FormSchema) => {
    setBusiness(newBusiness)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {business ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BusinessInfo business={business} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BusinessForm onBusinessCreated={handleBusinessCreated} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

