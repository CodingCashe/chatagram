'use client'

import { useState, useEffect } from 'react'
import { getAllBusinesses } from '@/actions/businfo'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

interface Business {
  id: string
  businessName: string
  welcomeMessage: string
  industry: string
  // Add other properties as needed
}

export default function BusinessDataDisplay() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const response = await getAllBusinesses()
        if (response.status === 200 && response.data.businesses) {
          setBusinesses(response.data.businesses)
        } else {
          setError('Failed to fetch business data')
        }
      } catch (err) {
        setError('An error occurred while fetching business data')
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Business Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-12 mb-4" />
          <Skeleton className="w-full h-12 mb-4" />
          <Skeleton className="w-full h-12" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="w-full max-w-2xl mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Business Data</CardTitle>
      </CardHeader>
      <CardContent>
        {businesses.length === 0 ? (
          <p>No businesses found.</p>
        ) : (
          businesses.map((business) => (
            <div key={business.id} className="mb-6 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{business.businessName}</h3>
              <p className="mb-1"><strong>Welcome Message:</strong> {business.welcomeMessage}</p>
              <p><strong>Industry:</strong> {business.industry}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

