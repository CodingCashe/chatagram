// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Calendar, ArrowRight } from "lucide-react"
// import { getBrandOpportunities } from "@/actions/influencer-relations/influencer"

// export function BrandOpportunities() {
//   const [opportunities, setOpportunities] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchOpportunities = async () => {
//       try {
//         const { status, data, message } = await getBrandOpportunities()

//         if (status === 200 && data) {
//           setOpportunities(data)
//         } else {
//           setError(message || "Failed to load brand opportunities")
//         }
//       } catch (err) {
//         setError("An error occurred while fetching brand opportunities")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOpportunities()
//   }, [])

//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <CardTitle>Brand Opportunities</CardTitle>
//             <CardDescription>Discover new collaboration opportunities</CardDescription>
//           </div>
//           <Button variant="outline" size="sm" className="h-8 gap-1">
//             <ArrowRight className="h-3.5 w-3.5" />
//             <span>View All</span>
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="flex h-[200px] items-center justify-center">
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
//           </div>
//         ) : error ? (
//           <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
//             {error}
//           </div>
//         ) : opportunities.length === 0 ? (
//           <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
//             No opportunities available
//           </div>
//         ) : (
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {opportunities.map((opportunity) => (
//               <Card key={opportunity.id} className="overflow-hidden transition-all hover:shadow-md">
//                 <CardHeader className="p-4">
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="text-base">
//                       {opportunity.brandName || opportunity.business.companyName}
//                     </CardTitle>
//                     <Badge className="bg-green-500/20 text-green-500">{opportunity.matchScore}% Match</Badge>
//                   </div>
//                   <CardDescription className="flex items-center gap-1 text-xs">
//                     <Calendar className="h-3 w-3" /> Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="grid gap-2 text-sm">
//                     <div className="flex items-center justify-between">
//                       <span className="text-muted-foreground">Budget:</span>
//                       <span className="font-medium">${opportunity.budget}</span>
                    
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-muted-foreground">Content:</span>
//                       <span className="font-medium">{opportunity.contentType}</span>
//                     </div>
//                     <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{opportunity.description}</p>
//                   </div>
//                 </CardContent>
//                 <div className="flex gap-2 border-t bg-muted/50 p-2">
//                   <Button variant="default" size="sm" className="w-full text-xs">
//                     Apply Now
//                   </Button>
//                   <Button variant="outline" size="sm" className="w-full text-xs">
//                     View Details
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { getBrandOpportunities } from "@/actions/influencer-relations/influencer"

export function BrandOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const { status, data, message } = await getBrandOpportunities()

        if (status === 200 && data) {
          setOpportunities(data)
        } else {
          setError(message || "Failed to load brand opportunities")
        }
      } catch (err) {
        setError("An error occurred while fetching brand opportunities")
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  // Helper function to format budget
  const formatBudget = (budget: any) => {
    if (!budget) return "N/A"

    // If budget is an object with min and max properties
    if (typeof budget === "object" && budget !== null) {
      if ("min" in budget && "max" in budget) {
        return `$${budget.min} - $${budget.max}`
      }
      // If it's some other kind of object, convert to string
      return JSON.stringify(budget)
    }

    // If budget is a simple number
    return `$${budget}`
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Brand Opportunities</CardTitle>
            <CardDescription>Discover new collaboration opportunities</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ArrowRight className="h-3.5 w-3.5" />
            <span>View All</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
            {error}
          </div>
        ) : opportunities.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
            No opportunities available
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {opportunity.brandName || opportunity.business?.companyName || "Brand"}
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-500">{opportunity.matchScore || "100"}% Match</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    Deadline: {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : "Ongoing"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">{formatBudget(opportunity.budget)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Content:</span>
                      <span className="font-medium">{opportunity.contentType || "Various"}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {opportunity.description || "No description available"}
                    </p>
                  </div>
                </CardContent>
                <div className="flex gap-2 border-t bg-muted/50 p-2">
                  <Button variant="default" size="sm" className="w-full text-xs">
                    Apply Now
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
