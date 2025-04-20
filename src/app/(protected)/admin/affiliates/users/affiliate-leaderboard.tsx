// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { getAffiliateLeaderboard } from "@/actions/new-referral/referral-actions"
// import { useToast } from "@/hooks/use-toast"
// import { Users, TrendingUp } from "lucide-react"

// interface LeaderboardEntry {
//   id: string
//   name: string
//   totalEarned: number
//   userId: string | null
//   bio: string | null
//   _count: {
//     referrals: number
//   }
// }

// interface AffiliateLeaderboardProps {
//   programId?: string
//   limit?: number
// }

// export default function AffiliateLeaderboard({ programId, limit = 10 }: AffiliateLeaderboardProps) {
//   const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const result = await getAffiliateLeaderboard(limit)

//         if (result.success) {
//           setLeaderboard(result.leaderboard)
//         } else {
//           toast({
//             title: "Error",
//             description: result.message || "Failed to fetch leaderboard",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching leaderboard:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load leaderboard",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLeaderboard()
//   }, [limit, toast])

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2)
//   }

//   const getMedalColor = (index: number) => {
//     if (index === 0) return "bg-yellow-500"
//     if (index === 1) return "bg-gray-400"
//     if (index === 2) return "bg-amber-700"
//     return "bg-gray-200"
//   }

//   return (
//     <div className="space-y-4">
//       {loading ? (
//         <div className="flex justify-center p-4">Loading leaderboard...</div>
//       ) : leaderboard.length === 0 ? (
//         <div className="text-center p-4">
//           <p className="text-muted-foreground">No affiliates data available</p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {leaderboard.map((entry, index) => (
//             <div
//               key={entry.id}
//               className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
//             >
//               <div className="flex items-center gap-4">
//                 <div
//                   className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${getMedalColor(index)}`}
//                 >
//                   {index + 1}
//                 </div>
//                 <Avatar>
//                   <AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <div className="font-medium flex items-center gap-2">
//                     {entry.name}
//                     {entry.userId ? (
//                       <Badge variant="outline" className="text-xs">
//                         User
//                       </Badge>
//                     ) : (
//                       <Badge variant="outline" className="text-xs">
//                         External
//                       </Badge>
//                     )}
//                   </div>
//                   {entry.bio && <p className="text-sm text-muted-foreground truncate max-w-md">{entry.bio}</p>}
//                 </div>
//               </div>
//               <div className="flex items-center gap-6">
//                 <div className="flex flex-col items-end">
//                   <span className="text-sm text-muted-foreground flex items-center">
//                     <Users className="mr-1 h-3 w-3" />
//                     Referrals
//                   </span>
//                   <span className="font-medium">{entry._count.referrals}</span>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className="text-sm text-muted-foreground flex items-center">
//                     <TrendingUp className="mr-1 h-3 w-3" />
//                     Earnings
//                   </span>
//                   <span className="font-medium">${entry.totalEarned.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"
// import { getAffiliateLeaderboard } from "@/actions/new-referral/referral-actions"
// import { Trophy, Medal, Award, Users } from "lucide-react"

// // Define the leaderboard entry type
// interface LeaderboardEntry {
//   id: string
//   name: string
//   totalEarned: number
//   bio?: string | null
//   _count: {
//     referrals: number
//   }
// }

// export default function AffiliateLeaderboard() {
//   const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
//   const [loading, setLoading] = useState(true)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const result = await getAffiliateLeaderboard(10)

//         if (result.success && result.leaderboard) {
//           // Fix the type issue by explicitly typing the leaderboard data
//           setLeaderboard(result.leaderboard as LeaderboardEntry[])
//         } else {
//           toast({
//             title: "Error",
//             description: result.message || "Failed to fetch leaderboard",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching leaderboard:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load leaderboard",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLeaderboard()
//   }, [toast])

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2)
//   }

//   const getLeaderIcon = (position: number) => {
//     switch (position) {
//       case 0:
//         return <Trophy className="h-6 w-6 text-yellow-500" />
//       case 1:
//         return <Medal className="h-6 w-6 text-gray-400" />
//       case 2:
//         return <Award className="h-6 w-6 text-amber-700" />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Top Affiliates</CardTitle>
//           <CardDescription>Our highest earning affiliates this month</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="space-y-4">
//               {Array(5)
//                 .fill(0)
//                 .map((_, i) => (
//                   <div key={i} className="flex items-center gap-4">
//                     <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
//                     <div className="space-y-2">
//                       <div className="h-4 w-40 bg-muted animate-pulse rounded" />
//                       <div className="h-3 w-20 bg-muted animate-pulse rounded" />
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           ) : leaderboard.length === 0 ? (
//             <div className="text-center py-10">
//               <p className="text-muted-foreground">No affiliates data available</p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Top 3 affiliates highlighted */}
//               <div className="grid gap-4 md:grid-cols-3">
//                 {leaderboard.slice(0, 3).map((entry, index) => (
//                   <Card key={entry.id} className="overflow-hidden border-t-4 border-t-primary">
//                     <CardContent className="p-6">
//                       <div className="mb-4 flex justify-center">{getLeaderIcon(index)}</div>
//                       <div className="flex flex-col items-center text-center">
//                         <Avatar className="h-20 w-20 mb-4">
//                           <AvatarFallback className="text-2xl">{getInitials(entry.name)}</AvatarFallback>
//                         </Avatar>
//                         <h3 className="font-semibold text-lg mb-1">{entry.name}</h3>
//                         {entry.bio && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{entry.bio}</p>}
//                         <div className="flex gap-2 mb-3">
//                           <Badge variant="secondary" className="flex items-center gap-1">
//                             <Users className="h-3 w-3" />
//                             {entry._count.referrals} referrals
//                           </Badge>
//                         </div>
//                         <div className="text-xl font-bold text-primary">${entry.totalEarned.toFixed(2)}</div>
//                         <p className="text-xs text-muted-foreground mt-1">Total Earnings</p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Remaining affiliates in a list */}
//               {leaderboard.length > 3 && (
//                 <div className="border rounded-lg overflow-hidden">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-muted/50">
//                         <th className="text-left p-3">Rank</th>
//                         <th className="text-left p-3">Affiliate</th>
//                         <th className="text-right p-3">Referrals</th>
//                         <th className="text-right p-3">Earnings</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {leaderboard.slice(3).map((entry, index) => (
//                         <tr key={entry.id} className="border-t">
//                           <td className="p-3 text-muted-foreground">#{index + 4}</td>
//                           <td className="p-3">
//                             <div className="flex items-center gap-3">
//                               <Avatar className="h-8 w-8">
//                                 <AvatarFallback className="text-xs">{getInitials(entry.name)}</AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <div className="font-medium">{entry.name}</div>
//                                 {entry.bio && (
//                                   <div className="text-xs text-muted-foreground line-clamp-1">{entry.bio}</div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="p-3 text-right text-muted-foreground">{entry._count.referrals}</td>
//                           <td className="p-3 text-right font-medium">${entry.totalEarned.toFixed(2)}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getAffiliateLeaderboard } from "@/actions/new-referral/referral-actions"
import { useToast } from "@/hooks/use-toast"
import { Users, TrendingUp } from "lucide-react"

interface LeaderboardEntry {
  id: string
  name: string
  totalEarned: number
  userId: string | null
  bio: string | null
  _count: {
    referrals: number
  }
}

interface AffiliateLeaderboardProps {
  programId?: string
  limit?: number
}

export default function AffiliateLeaderboard({ programId, limit = 10 }: AffiliateLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const result = await getAffiliateLeaderboard(limit)

        if (result.success) {
          // Make sure we're setting an array, even if the API returns null or undefined
          setLeaderboard(result.leaderboard || [])
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to fetch leaderboard",
            variant: "destructive",
          })
          // Set empty array on error
          setLeaderboard([])
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
        toast({
          title: "Error",
          description: "Failed to load leaderboard",
          variant: "destructive",
        })
        // Set empty array on error
        setLeaderboard([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [limit, toast])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getMedalColor = (index: number) => {
    if (index === 0) return "bg-yellow-500"
    if (index === 1) return "bg-gray-400"
    if (index === 2) return "bg-amber-700"
    return "bg-gray-200"
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center p-4">Loading leaderboard...</div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No affiliates data available</p>
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${getMedalColor(index)}`}
                >
                  {index + 1}
                </div>
                <Avatar>
                  <AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {entry.name}
                    {entry.userId ? (
                      <Badge variant="outline" className="text-xs">
                        User
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        External
                      </Badge>
                    )}
                  </div>
                  {entry.bio && <p className="text-sm text-muted-foreground truncate max-w-md">{entry.bio}</p>}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    Referrals
                  </span>
                  <span className="font-medium">{entry._count.referrals}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Earnings
                  </span>
                  <span className="font-medium">${entry.totalEarned.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

