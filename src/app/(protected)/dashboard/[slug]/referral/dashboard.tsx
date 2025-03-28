// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { toast } from "@/hooks/use-toast"
// import {
//   Copy,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Mail,
//   PhoneIcon as WhatsApp,
//   Gift,
//   Users,
//   DollarSign,
//   Award,
//   CheckCircle,
//   Clock,
//   AlertCircle,
// } from "lucide-react"
// import { getUserReferralData } from "@/actions/referral/referral-actions"

// // Types for referral data
// interface Referral {
//   id: string
//   email: string
//   name: string
//   status: "pending" | "completed" | "expired"
//   date: string
//   reward?: number
// }

// interface ReferralStats {
//   totalReferrals: number
//   completedReferrals: number
//   pendingReferrals: number
//   totalRewards: number
//   referralCode: string
//   nextTierProgress: number
//   currentTier: string
//   nextTier: string
//   referralsToNextTier: number
// }

// export function ReferralDashboard() {
//   const [referralStats, setReferralStats] = useState<ReferralStats>({
//     totalReferrals: 0,
//     completedReferrals: 0,
//     pendingReferrals: 0,
//     totalRewards: 0,
//     referralCode: "",
//     nextTierProgress: 0,
//     currentTier: "Bronze",
//     nextTier: "Silver",
//     referralsToNextTier: 5,
//   })

//   const [referrals, setReferrals] = useState<Referral[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   // Fetch referral data
//   useEffect(() => {
//     const fetchReferralData = async () => {
//       try {
//         const data = await getUserReferralData()

//         if (data) {
//           setReferralStats({
//             totalReferrals: data.stats.totalReferrals || 0,
//             completedReferrals: data.stats.completedReferrals || 0,
//             pendingReferrals: data.stats.pendingReferrals || 0,
//             totalRewards: data.stats.totalRewards || 0,
//             referralCode: data.referralCode || "WELCOME10",
//             nextTierProgress: data.stats.nextTierProgress || 0,
//             currentTier: data.stats.currentTier || "Bronze",
//             nextTier: data.stats.nextTier || "Silver",
//             referralsToNextTier: data.stats.referralsToNextTier || 5,
//           })
//           // setReferralStats({
//           //   totalReferrals:  0,
//           //   completedReferrals: 0,
//           //   pendingReferrals: 0,
//           //   totalRewards: 0,
//           //   referralCode: data.referralCode || "WELCOME10",
//           //   nextTierProgress:  0,
//           //   currentTier: "Bronze",
//           //   nextTier: "Silver",
//           //   referralsToNextTier: 5,
//           // })

//           setReferrals(data.referrals || [])
//           // setReferrals([])
//         }
//       } catch (error) {
//         console.error("Failed to fetch referral data:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load referral data. Please try again later.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchReferralData()
//   }, [])

//   // Copy referral link to clipboard
//   const copyReferralLink = () => {
//     const referralLink = `${window.location.origin}/signup?ref=${referralStats.referralCode}`
//     navigator.clipboard.writeText(referralLink)
//     toast({
//       title: "Link copied!",
//       description: "Referral link copied to clipboard",
//     })
//   }

//   // Share on social media
//   const shareOnSocial = (platform: string) => {
//     const referralLink = `${window.location.origin}/signup?ref=${referralStats.referralCode}`
//     const message = encodeURIComponent(
//       "Join me on this amazing platform and get special benefits! Use my referral code.",
//     )

//     let shareUrl = ""

//     switch (platform) {
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
//         break
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(referralLink)}`
//         break
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`
//         break
//       case "whatsapp":
//         shareUrl = `https://wa.me/?text=${message}%20${encodeURIComponent(referralLink)}`
//         break
//       case "email":
//         shareUrl = `mailto:?subject=${encodeURIComponent("Join me on this platform")}&body=${message}%20${encodeURIComponent(referralLink)}`
//         break
//     }

//     if (shareUrl) {
//       window.open(shareUrl, "_blank")
//     }
//   }

//   // Get status badge
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "completed":
//         return (
//           <Badge className="bg-green-500">
//             <CheckCircle className="w-3 h-3 mr-1" /> Completed
//           </Badge>
//         )
//       case "pending":
//         return (
//           <Badge variant="outline" className="text-amber-500 border-amber-500">
//             <Clock className="w-3 h-3 mr-1" /> Pending
//           </Badge>
//         )
//       case "expired":
//         return (
//           <Badge variant="outline" className="text-gray-500">
//             <AlertCircle className="w-3 h-3 mr-1" /> Expired
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   return (
//     <div className="space-y-8">
//       {/* Hero section with referral code */}
//       <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600">
//         <CardContent className="p-8">
//           <div className="grid gap-6 md:grid-cols-2">
//             <div className="space-y-4">
//               <h2 className="text-3xl font-bold text-white">Share & Earn Rewards</h2>
//               <p className="text-indigo-100">
//                 Invite your friends and colleagues to join our platform. For each successful referral, both you and your
//                 friend will receive rewards!
//               </p>

//               <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                 <div className="relative flex-1">
//                   <Input
//                     value={`${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralStats.referralCode}`}
//                     readOnly
//                     className="pr-10 bg-white/10 text-white border-white/20 focus-visible:ring-white/30"
//                   />
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-0 top-0 h-full text-white hover:text-white hover:bg-white/10"
//                           onClick={copyReferralLink}
//                         >
//                           <Copy className="h-4 w-4" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Copy referral link</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </div>
//                 <Button className="bg-white text-indigo-600 hover:bg-indigo-100" onClick={copyReferralLink}>
//                   Copy Link
//                 </Button>
//               </div>

//               <div className="flex flex-wrap gap-2 mt-2">
//                 <p className="text-sm text-white/80 mr-2 my-auto">Share via:</p>
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="rounded-full bg-white/10 text-white hover:bg-white/20"
//                         onClick={() => shareOnSocial("facebook")}
//                       >
//                         <Facebook className="h-4 w-4" />
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Share on Facebook</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>

//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="rounded-full bg-white/10 text-white hover:bg-white/20"
//                         onClick={() => shareOnSocial("twitter")}
//                       >
//                         <Twitter className="h-4 w-4" />
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Share on Twitter</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>

//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="rounded-full bg-white/10 text-white hover:bg-white/20"
//                         onClick={() => shareOnSocial("linkedin")}
//                       >
//                         <Linkedin className="h-4 w-4" />
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Share on LinkedIn</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>

//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="rounded-full bg-white/10 text-white hover:bg-white/20"
//                         onClick={() => shareOnSocial("whatsapp")}
//                       >
//                         <WhatsApp className="h-4 w-4" />
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Share on WhatsApp</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>

//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="rounded-full bg-white/10 text-white hover:bg-white/20"
//                         onClick={() => shareOnSocial("email")}
//                       >
//                         <Mail className="h-4 w-4" />
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Share via Email</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </div>
//             </div>

//             <div className="flex items-center justify-center">
//               <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
//                 <div className="text-5xl font-bold text-white mb-2">{referralStats.referralCode}</div>
//                 <p className="text-indigo-100">Your Referral Code</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Stats cards */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Referrals</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <Users className="mr-2 h-4 w-4 text-muted-foreground" />
//               <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Completed Referrals</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//               <div className="text-2xl font-bold">{referralStats.completedReferrals}</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Pending Referrals</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <Clock className="mr-2 h-4 w-4 text-amber-500" />
//               <div className="text-2xl font-bold">{referralStats.pendingReferrals}</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Rewards</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <DollarSign className="mr-2 h-4 w-4 text-green-500" />
//               <div className="text-2xl font-bold">${referralStats.totalRewards.toFixed(2)}</div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Tier progress */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Referral Tier</CardTitle>
//           <CardDescription>
//             Your current tier is <span className="font-medium">{referralStats.currentTier}</span>. Refer{" "}
//             {referralStats.referralsToNextTier} more friends to reach {referralStats.nextTier}.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex justify-between text-sm">
//               <span>{referralStats.currentTier}</span>
//               <span>{referralStats.nextTier}</span>
//             </div>
//             <Progress value={referralStats.nextTierProgress} className="h-2" />
//             <div className="flex justify-between items-center text-sm text-muted-foreground">
//               <span>{referralStats.completedReferrals} completed</span>
//               <span>
//                 {referralStats.referralsToNextTier} more to {referralStats.nextTier}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tabs for referrals and rewards */}
//       <Tabs defaultValue="referrals" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="referrals">My Referrals</TabsTrigger>
//           <TabsTrigger value="rewards">Rewards Program</TabsTrigger>
//         </TabsList>

//         <TabsContent value="referrals" className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Referral History</CardTitle>
//               <CardDescription>Track the status of people you have referred</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {referrals.length > 0 ? (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Reward</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {referrals.map((referral) => (
//                       <TableRow key={referral.id}>
//                         <TableCell className="font-medium">{referral.name}</TableCell>
//                         <TableCell>{referral.email}</TableCell>
//                         <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
//                         <TableCell>{getStatusBadge(referral.status)}</TableCell>
//                         <TableCell>
//                           {referral.status === "completed" && referral.reward ? (
//                             <span className="text-green-600 font-medium">${referral.reward.toFixed(2)}</span>
//                           ) : (
//                             <span className="text-muted-foreground">-</span>
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               ) : (
//                 <div className="text-center py-10">
//                   <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
//                   <h3 className="mt-4 text-lg font-semibold">No referrals yet</h3>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     Share your referral code with friends to start earning rewards.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="rewards" className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Rewards Program</CardTitle>
//               <CardDescription>Learn how our referral program works and what rewards you can earn</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-8">
//                 <div className="grid gap-6 md:grid-cols-3">
//                   <Card className="bg-muted/50">
//                     <CardHeader>
//                       <CardTitle className="flex items-center">
//                         <Gift className="mr-2 h-5 w-5 text-indigo-500" />
//                         Sign-up Bonus
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Your friend gets $10 credit when they sign up using your referral code.</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardHeader>
//                       <CardTitle className="flex items-center">
//                         <DollarSign className="mr-2 h-5 w-5 text-green-500" />
//                         Subscription Reward
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>You earn $20 when your referred friend subscribes to any paid plan.</p>
//                     </CardContent>
//                   </Card>

//                   <Card className="bg-muted/50">
//                     <CardHeader>
//                       <CardTitle className="flex items-center">
//                         <Award className="mr-2 h-5 w-5 text-amber-500" />
//                         Tier Benefits
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Unlock higher rewards and exclusive perks as you reach higher tiers.</p>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">Referral Tiers</h3>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Tier</TableHead>
//                         <TableHead>Required Referrals</TableHead>
//                         <TableHead>Reward per Referral</TableHead>
//                         <TableHead>Additional Benefits</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell className="font-medium">Bronze</TableCell>
//                         <TableCell>0-4</TableCell>
//                         <TableCell>$20</TableCell>
//                         <TableCell>Basic rewards</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell className="font-medium">Silver</TableCell>
//                         <TableCell>5-14</TableCell>
//                         <TableCell>$25</TableCell>
//                         <TableCell>+5% discount on subscriptions</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell className="font-medium">Gold</TableCell>
//                         <TableCell>15-29</TableCell>
//                         <TableCell>$30</TableCell>
//                         <TableCell>+10% discount on subscriptions</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell className="font-medium">Platinum</TableCell>
//                         <TableCell>30+</TableCell>
//                         <TableCell>$40</TableCell>
//                         <TableCell>+15% discount, priority support</TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">How It Works</h3>
//                   <ol className="space-y-4 list-decimal list-inside">
//                     <li className="pl-2">Share your unique referral code or link with friends and colleagues.</li>
//                     <li className="pl-2">When they sign up using your code, they will be linked to your account.</li>
//                     <li className="pl-2">Your friend receives their sign-up bonus immediately.</li>
//                     <li className="pl-2">When they subscribe to a paid plan, you will receive your reward.</li>
//                     <li className="pl-2">
//                       As you accumulate more successful referrals, you will progress through tiers with increased
//                       benefits.
//                     </li>
//                   </ol>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" onClick={copyReferralLink}>
//                 <Copy className="mr-2 h-4 w-4" /> Copy Your Referral Link
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import {
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  PhoneIcon as WhatsApp,
  Gift,
  Users,
  DollarSign,
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { getUserReferralData } from "@/actions/referral/referral-actions"

// Types for referral data
interface Referral {
  id: string
  email: string
  name: string
  status: "pending" | "completed" | "expired"
  date: string
  reward?: number
}

interface ReferralStats {
  totalReferrals: number
  completedReferrals: number
  pendingReferrals: number
  totalRewards: number
  referralCode: string
  nextTierProgress: number
  currentTier: string
  nextTier: string
  referralsToNextTier: number
}

export function ReferralDashboard() {
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    completedReferrals: 0,
    pendingReferrals: 0,
    totalRewards: 0,
    referralCode: "",
    nextTierProgress: 0,
    currentTier: "Bronze",
    nextTier: "Silver",
    referralsToNextTier: 5,
  })

  const [referrals, setReferrals] = useState<Referral[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Fetch referral data
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const data = await getUserReferralData()

      if (data) {
        // Calculate stats from the returned data
        const completedReferrals = data.referrals.filter(ref => ref.status === "CONVERTED").length
        const pendingReferrals = data.referrals.filter(ref => ref.status === "PENDING").length
        
        // Transform the data to match your ReferralStats interface
        setReferralStats({
          totalReferrals: data.referrals.length,
          completedReferrals,
          pendingReferrals,
          totalRewards: data.totalCommission || 0,
          referralCode: data.referralCode || "WELCOME10",
          nextTierProgress: calculateTierProgress(completedReferrals),
          currentTier: getTierName(completedReferrals),
          nextTier: getNextTierName(completedReferrals),
          referralsToNextTier: getReferralsToNextTier(completedReferrals),
        })

        // Transform the referrals data to match your Referral interface
        const transformedReferrals = data.referrals.map(ref => ({
          id: ref.id,
          email: ref.referredUser?.email || "Unknown",
          name: `${ref.referredUser?.firstname || ""} ${ref.referredUser?.lastname || ""}`.trim() || "Unknown",
          status: mapReferralStatus(ref.status),
          date: new Date(ref.createdAt).toISOString(),
          reward: ref.commissionAmount || undefined  // Convert null to undefined
        }))
        
        setReferrals(transformedReferrals)
      }
    } catch (error) {
      console.error("Failed to fetch referral data:", error)
      toast({
        title: "Error",
        description: "Failed to load referral data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  fetchReferralData()
}, [])

// Add these helper functions after the useEffect

// Helper function to map Prisma ReferralStatus to component status
const mapReferralStatus = (status: string): "pending" | "completed" | "expired" => {
  switch (status) {
    case "CONVERTED":
      return "completed"
    case "EXPIRED":
      return "expired"
    case "PENDING":
    default:
      return "pending"
  }
}

// Helper functions for tier calculations
const calculateTierProgress = (completedReferrals: number): number => {
  if (completedReferrals < 5) return (completedReferrals / 5) * 100
  if (completedReferrals < 15) return ((completedReferrals - 5) / 10) * 100
  if (completedReferrals < 30) return ((completedReferrals - 15) / 15) * 100
  return 100
}

const getTierName = (completedReferrals: number): string => {
  if (completedReferrals < 5) return "Bronze"
  if (completedReferrals < 15) return "Silver"
  if (completedReferrals < 30) return "Gold"
  return "Platinum"
}

const getNextTierName = (completedReferrals: number): string => {
  if (completedReferrals < 5) return "Silver"
  if (completedReferrals < 15) return "Gold"
  if (completedReferrals < 30) return "Platinum"
  return "Platinum"
}

const getReferralsToNextTier = (completedReferrals: number): number => {
  if (completedReferrals < 5) return 5 - completedReferrals
  if (completedReferrals < 15) return 15 - completedReferrals
  if (completedReferrals < 30) return 30 - completedReferrals
  return 0
}

  // Copy referral link to clipboard
  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/signup?ref=${referralStats.referralCode}`
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard",
    })
  }

  // Share on social media
  const shareOnSocial = (platform: string) => {
    const referralLink = `${window.location.origin}/signup?ref=${referralStats.referralCode}`
    const message = encodeURIComponent(
      "Join me on this amazing platform and get special benefits! Use my referral code.",
    )

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(referralLink)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${message}%20${encodeURIComponent(referralLink)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent("Join me on this platform")}&body=${message}%20${encodeURIComponent(referralLink)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="text-gray-500">
            <AlertCircle className="w-3 h-3 mr-1" /> Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero section with referral code */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600">
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Share & Earn Rewards</h2>
              <p className="text-indigo-100">
                Invite your friends and colleagues to join our platform. For each successful referral, both you and your
                friend will receive rewards!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <div className="relative flex-1">
                  <Input
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralStats.referralCode}`}
                    readOnly
                    className="pr-10 bg-white/10 text-white border-white/20 focus-visible:ring-white/30"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full text-white hover:text-white hover:bg-white/10"
                          onClick={copyReferralLink}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy referral link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button className="bg-white text-indigo-600 hover:bg-indigo-100" onClick={copyReferralLink}>
                  Copy Link
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <p className="text-sm text-white/80 mr-2 my-auto">Share via:</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={() => shareOnSocial("facebook")}
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={() => shareOnSocial("twitter")}
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={() => shareOnSocial("linkedin")}
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={() => shareOnSocial("whatsapp")}
                      >
                        <WhatsApp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on WhatsApp</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 text-white hover:bg-white/20"
                        onClick={() => shareOnSocial("email")}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share via Email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
                <div className="text-5xl font-bold text-white mb-2">{referralStats.referralCode}</div>
                <p className="text-indigo-100">Your Referral Code</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">{referralStats.completedReferrals}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">{referralStats.pendingReferrals}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">${referralStats.totalRewards.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier progress */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Tier</CardTitle>
          <CardDescription>
            Your current tier is <span className="font-medium">{referralStats.currentTier}</span>. Refer{" "}
            {referralStats.referralsToNextTier} more friends to reach {referralStats.nextTier}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>{referralStats.currentTier}</span>
              <span>{referralStats.nextTier}</span>
            </div>
            <Progress value={referralStats.nextTierProgress} className="h-2" />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{referralStats.completedReferrals} completed</span>
              <span>
                {referralStats.referralsToNextTier} more to {referralStats.nextTier}
              </span>
            </div>
            </div>
          </CardContent>
      </Card>

      {/* Tabs for referrals and rewards */}
      <Tabs defaultValue="referrals" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="rewards">Rewards Program</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>Track the status of people you have referred</CardDescription>
            </CardHeader>
            <CardContent>
              {referrals.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reward</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">{referral.name}</TableCell>
                        <TableCell>{referral.email}</TableCell>
                        <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(referral.status)}</TableCell>
                        <TableCell>
                          {referral.status === "completed" && referral.reward ? (
                            <span className="text-green-600 font-medium">${referral.reward.toFixed(2)}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">No referrals yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Share your referral code with friends to start earning rewards.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Program</CardTitle>
              <CardDescription>Learn how our referral program works and what rewards you can earn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gift className="mr-2 h-5 w-5 text-indigo-500" />
                        Sign-up Bonus
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Your friend gets $10 credit when they sign up using your referral code.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                        Subscription Reward
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>You earn $20 when your referred friend subscribes to any paid plan.</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-amber-500" />
                        Tier Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Unlock higher rewards and exclusive perks as you reach higher tiers.</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Referral Tiers</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tier</TableHead>
                        <TableHead>Required Referrals</TableHead>
                        <TableHead>Reward per Referral</TableHead>
                        <TableHead>Additional Benefits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Bronze</TableCell>
                        <TableCell>0-4</TableCell>
                        <TableCell>$20</TableCell>
                        <TableCell>Basic rewards</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Silver</TableCell>
                        <TableCell>5-14</TableCell>
                        <TableCell>$25</TableCell>
                        <TableCell>+5% discount on subscriptions</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Gold</TableCell>
                        <TableCell>15-29</TableCell>
                        <TableCell>$30</TableCell>
                        <TableCell>+10% discount on subscriptions</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Platinum</TableCell>
                        <TableCell>30+</TableCell>
                        <TableCell>$40</TableCell>
                        <TableCell>+15% discount, priority support</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">How It Works</h3>
                  <ol className="space-y-4 list-decimal list-inside">
                    <li className="pl-2">Share your unique referral code or link with friends and colleagues.</li>
                    <li className="pl-2">When they sign up using your code, they will be linked to your account.</li>
                    <li className="pl-2">Your friend receives their sign-up bonus immediately.</li>
                    <li className="pl-2">When they subscribe to a paid plan, you will receive your reward.</li>
                    <li className="pl-2">
                      As you accumulate more successful referrals, you will progress through tiers with increased
                      benefits.
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={copyReferralLink}>
                <Copy className="mr-2 h-4 w-4" /> Copy Your Referral Link
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

