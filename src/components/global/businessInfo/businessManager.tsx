// 'use client'

// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import BusinessForm from './businessInfo'
// import BusinessInfo from './infoCard'
// import { useToast } from "@/hooks/use-toast"
// import { getAllBusinesses } from '@/actions/businfo'
// import { Loader2 } from 'lucide-react'
// import { FormSchema } from './businessInfo'

// export default function BusinessManager() {
//   const [business, setBusiness] = useState<FormSchema | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchBusiness = async () => {
//       try {
//         const result = await getAllBusinesses()
//         if (result.status === 200 && result.data.businesses.length > 0) {
//           setBusiness(result.data.businesses[0])
//         } else {
//           setBusiness(null)
//         }
//       } catch (error) {
//         console.error('Error fetching business:', error)
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred while fetching business data.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchBusiness()
//   }, [toast])

//   const handleBusinessCreated = (newBusiness: FormSchema) => {
//     setBusiness(newBusiness)
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <AnimatePresence mode="wait">
//         {business ? (
//           <motion.div
//             key="info"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//           >
//             <BusinessInfo business={business} />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="form"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//           >
//             <BusinessForm onBusinessCreated={handleBusinessCreated} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BusinessForm from "./businessInfo"
import BusinessInfo from "./infoCard"
import { useToast } from "@/hooks/use-toast"
import { getAllBusinesses } from "@/actions/businfo"
import { Loader2, Building2 } from "lucide-react"
import type { FormSchema } from "./businessInfo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        console.error("Error fetching business:", error)
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
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-64 h-64 flex items-center justify-center bg-gray-800 border-gray-700">
            <CardContent>
              <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
              <p className="mt-4 text-gray-400 text-center">Loading business...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl w-full mx-auto bg-gray-800 border-gray-700 overflow-hidden shadow-2xl">
        <CardHeader className="bg-gray-700 py-6">
          <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center">
            <Building2 className="mr-2 h-6 w-6 text-blue-400" />
            Business Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {business ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BusinessInfo business={business} />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BusinessForm onBusinessCreated={handleBusinessCreated} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

