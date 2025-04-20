// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { Wallet, Users, MousePointer, BarChart3, ArrowRight, AlertCircle } from "lucide-react"
// import { getAffiliateDashboard, requestAffiliatePayout } from "@/actions/new-referral/referral-actions"

// interface AffiliateDashboardProps {
//   affiliateId: string
// }

// export default function AffiliateDashboard({ affiliateId }: AffiliateDashboardProps) {
//   const [dashboardData, setDashboardData] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [showPayoutDialog, setShowPayoutDialog] = useState(false)
//   const [paymentMethod, setPaymentMethod] = useState("paypal")
//   const [payoutNotes, setPayoutNotes] = useState("")
//   const [isRequesting, setIsRequesting] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const result = await getAffiliateDashboard(affiliateId)

//         if (result.success) {
//           setDashboardData(result.dashboardData)
//         } else {
//           toast({
//             title: "Error",
//             description: result.message || "Failed to fetch dashboard data",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching affiliate dashboard:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load dashboard data",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboard()
//   }, [affiliateId, toast])

//   const handleRequestPayout = async () => {
//     if (!dashboardData || dashboardData.affiliate.balance <= 0) {
//       toast({
//         title: "Error",
//         description: "You do not have any available balance to withdraw",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsRequesting(true)

//     try {
//       const result = await requestAffiliatePayout(affiliateId, paymentMethod, payoutNotes)

//       if (result.success) {
//         toast({
//           title: "Payout Requested",
//           description: `Your payout request for $${result.payout.amount.toFixed(2)} has been submitted`,
//         })

//         // Update the local state
//         setDashboardData((prev) => ({
//           ...prev,
//           affiliate: {
//             ...prev.affiliate,
//             balance: prev.affiliate.balance - result.payout.amount,
//           },
//           recentPayouts: [result.payout, ...prev.recentPayouts],
//         }))

//         setShowPayoutDialog(false)
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to request payout",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error requesting payout:", error)
//       toast({
//         title: "Error",
//         description: "Failed to request payout",
//         variant: "destructive",
//       })
//     } finally {
//       setIsRequesting(false)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString()
//   }

//   if (loading) {
//     return (
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {Array(4)
//           .fill(0)
//           .map((_, i) => (
//             <Card key={i} className="h-32 animate-pulse">
//               <CardContent className="p-6" />
//             </Card>
//           ))}
//       </div>
//     )
//   }

//   if (!dashboardData) {
//     return (
//       <div className="text-center py-10">
//         <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
//         <h3 className="mt-4 text-lg font-semibold">Failed to load dashboard</h3>
//         <p className="text-muted-foreground">Please try again later</p>
//       </div>
//     )
//   }

//   const { affiliate, stats, recentReferrals, recentPayouts } = dashboardData

//   return (
//     <div className="space-y-6">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
//             <Wallet className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${affiliate.balance.toFixed(2)}</div>
//             <div className="flex items-center justify-between mt-2">
//               <p className="text-xs text-muted-foreground">Min. payout: ${affiliate.program.minimumPayout}</p>
//               {affiliate.balance >= affiliate.program.minimumPayout && (
//                 <Button variant="outline" size="sm" onClick={() => setShowPayoutDialog(true)}>
//                   Request Payout
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.referrals}</div>
//             <p className="text-xs text-muted-foreground">{stats.pendingReferrals} pending approval</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
//             <MousePointer className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.clicks}</div>
//             <p className="text-xs text-muted-foreground">{stats.conversionRate.toFixed(2)}% conversion rate</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
//             <BarChart3 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${stats.totalEarned.toFixed(2)}</div>
//             <p className="text-xs text-muted-foreground">${stats.monthlyEarnings.toFixed(2)} this month</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Referrals</CardTitle>
//             <CardDescription>Your most recent successful referrals</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {recentReferrals.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground">No referrals yet</p>
//                 <Button variant="link" className="mt-2">
//                   Share your referral link <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Commission</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {recentReferrals.map((referral: any) => (
//                     <TableRow key={referral.id}>
//                       <TableCell>{formatDate(referral.conversionDate)}</TableCell>
//                       <TableCell className="capitalize">{referral.conversionType}</TableCell>
//                       <TableCell>${referral.amount.toFixed(2)}</TableCell>
//                       <TableCell>${referral.commissionAmount.toFixed(2)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Payouts</CardTitle>
//             <CardDescription>Status of your commission payment requests</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {recentPayouts.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground">No payout history</p>
//                 {affiliate.balance >= affiliate.program.minimumPayout ? (
//                   <Button variant="link" className="mt-2" onClick={() => setShowPayoutDialog(true)}>
//                     Request your first payout <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 ) : (
//                   <p className="text-xs text-muted-foreground mt-2">
//                     Earn at least ${affiliate.program.minimumPayout.toFixed(2)} to request a payout
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {recentPayouts.map((payout: any) => (
//                     <TableRow key={payout.id}>
//                       <TableCell>{formatDate(payout.createdAt)}</TableCell>
//                       <TableCell>${payout.amount.toFixed(2)}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             payout.status === "completed"
//                               ? "success"
//                               : payout.status === "processing"
//                                 ? "outline"
//                                 : payout.status === "failed"
//                                   ? "destructive"
//                                   : "secondary"
//                           }
//                         >
//                           {payout.status}
//                         </Badge>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Request Payout</DialogTitle>
//             <DialogDescription>You are about to request a payout of ${affiliate.balance.toFixed(2)}</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="paymentMethod">Payment Method</Label>
//               <Select value={paymentMethod} onValueChange={setPaymentMethod}>
//                 <SelectTrigger id="paymentMethod">
//                   <SelectValue placeholder="Select payment method" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="paypal">PayPal</SelectItem>
//                   <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes (optional)</Label>
//               <Input
//                 id="notes"
//                 value={payoutNotes}
//                 onChange={(e) => setPayoutNotes(e.target.value)}
//                 placeholder="Any special instructions..."
//               />
//             </div>

//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setShowPayoutDialog(false)} disabled={isRequesting}>
//                 Cancel
//               </Button>
//               <Button onClick={handleRequestPayout} disabled={isRequesting || affiliate.balance <= 0}>
//                 {isRequesting ? "Processing..." : "Confirm Request"}
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { Wallet, Users, MousePointer, BarChart3, ArrowRight, AlertCircle } from "lucide-react"
// import { getAffiliateDashboard, requestAffiliatePayout } from "@/actions/new-referral/referral-actions"

// interface AffiliateDashboardProps {
//   affiliateId: string
// }

// export default function AffiliateDashboard({ affiliateId }: AffiliateDashboardProps) {
//   const [dashboardData, setDashboardData] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [showPayoutDialog, setShowPayoutDialog] = useState(false)
//   const [paymentMethod, setPaymentMethod] = useState("paypal")
//   const [payoutNotes, setPayoutNotes] = useState("")
//   const [isRequesting, setIsRequesting] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const result = await getAffiliateDashboard(affiliateId)

//         if (result.success) {
//           setDashboardData(result.dashboardData)
//         } else {
//           toast({
//             title: "Error",
//             description: result.message || "Failed to fetch dashboard data",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching affiliate dashboard:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load dashboard data",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboard()
//   }, [affiliateId, toast])

//   const handleRequestPayout = async () => {
//     if (!dashboardData || dashboardData.affiliate.balance <= 0) {
//       toast({
//         title: "Error",
//         description: "You do not have any available balance to withdraw",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsRequesting(true)

//     try {
//       const result = await requestAffiliatePayout(affiliateId, paymentMethod, payoutNotes)

//       if (result.success && result.payout) {
//         toast({
//           title: "Payout Requested",
//           description: `Your payout request for $${result.payout.amount.toFixed(2)} has been submitted`,
//         })

//         // Update the local state
//         setDashboardData((prev) => ({
//           ...prev,
//           affiliate: {
//             ...prev.affiliate,
//             balance: prev.affiliate.balance - result.payout.amount,
//           },
//           recentPayouts: [result.payout, ...prev.recentPayouts],
//         }))

//         setShowPayoutDialog(false)
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to request payout",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error requesting payout:", error)
//       toast({
//         title: "Error",
//         description: "Failed to request payout",
//         variant: "destructive",
//       })
//     } finally {
//       setIsRequesting(false)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString()
//   }

//   if (loading) {
//     return (
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {Array(4)
//           .fill(0)
//           .map((_, i) => (
//             <Card key={i} className="h-32 animate-pulse">
//               <CardContent className="p-6" />
//             </Card>
//           ))}
//       </div>
//     )
//   }

//   if (!dashboardData) {
//     return (
//       <div className="text-center py-10">
//         <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
//         <h3 className="mt-4 text-lg font-semibold">Failed to load dashboard</h3>
//         <p className="text-muted-foreground">Please try again later</p>
//       </div>
//     )
//   }

//   const { affiliate, stats, recentReferrals, recentPayouts } = dashboardData

//   return (
//     <div className="space-y-6">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
//             <Wallet className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${affiliate.balance.toFixed(2)}</div>
//             <div className="flex items-center justify-between mt-2">
//               <p className="text-xs text-muted-foreground">Min. payout: ${affiliate.program.minimumPayout}</p>
//               {affiliate.balance >= affiliate.program.minimumPayout && (
//                 <Button variant="outline" size="sm" onClick={() => setShowPayoutDialog(true)}>
//                   Request Payout
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.referrals}</div>
//             <p className="text-xs text-muted-foreground">{stats.pendingReferrals} pending approval</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
//             <MousePointer className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.clicks}</div>
//             <p className="text-xs text-muted-foreground">{stats.conversionRate.toFixed(2)}% conversion rate</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
//             <BarChart3 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${stats.totalEarned.toFixed(2)}</div>
//             <p className="text-xs text-muted-foreground">${stats.monthlyEarnings.toFixed(2)} this month</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Referrals</CardTitle>
//             <CardDescription>Your most recent successful referrals</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {recentReferrals.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground">No referrals yet</p>
//                 <Button variant="link" className="mt-2">
//                   Share your referral link <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Commission</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {recentReferrals.map((referral: any) => (
//                     <TableRow key={referral.id}>
//                       <TableCell>{formatDate(referral.conversionDate)}</TableCell>
//                       <TableCell className="capitalize">{referral.conversionType}</TableCell>
//                       <TableCell>${referral.amount.toFixed(2)}</TableCell>
//                       <TableCell>${referral.commissionAmount.toFixed(2)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Payouts</CardTitle>
//             <CardDescription>Status of your commission payment requests</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {recentPayouts.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground">No payout history</p>
//                 {affiliate.balance >= affiliate.program.minimumPayout ? (
//                   <Button variant="link" className="mt-2" onClick={() => setShowPayoutDialog(true)}>
//                     Request your first payout <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 ) : (
//                   <p className="text-xs text-muted-foreground mt-2">
//                     Earn at least ${affiliate.program.minimumPayout.toFixed(2)} to request a payout
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {recentPayouts.map((payout: any) => (
//                     <TableRow key={payout.id}>
//                       <TableCell>{formatDate(payout.createdAt)}</TableCell>
//                       <TableCell>${payout.amount.toFixed(2)}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             payout.status === "completed"
//                               ? "secondary"
//                               : payout.status === "processing"
//                                 ? "outline"
//                                 : payout.status === "failed"
//                                   ? "destructive"
//                                   : "default"
//                           }
//                         >
//                           {payout.status}
//                         </Badge>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Request Payout</DialogTitle>
//             <DialogDescription>You are about to request a payout of ${affiliate.balance.toFixed(2)}</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="paymentMethod">Payment Method</Label>
//               <Select value={paymentMethod} onValueChange={setPaymentMethod}>
//                 <SelectTrigger id="paymentMethod">
//                   <SelectValue placeholder="Select payment method" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="paypal">PayPal</SelectItem>
//                   <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes (optional)</Label>
//               <Input
//                 id="notes"
//                 value={payoutNotes}
//                 onChange={(e) => setPayoutNotes(e.target.value)}
//                 placeholder="Any special instructions..."
//               />
//             </div>

//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setShowPayoutDialog(false)} disabled={isRequesting}>
//                 Cancel
//               </Button>
//               <Button onClick={handleRequestPayout} disabled={isRequesting || affiliate.balance <= 0}>
//                 {isRequesting ? "Processing..." : "Confirm Request"}
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Wallet, Users, MousePointer, BarChart3, ArrowRight, AlertCircle } from "lucide-react"
import { getAffiliateDashboard, requestAffiliatePayout } from "@/actions/new-referral/referral-actions"

interface AffiliateDashboardProps {
  affiliateId: string
}

// Define types for the dashboard data to match the actual API response
interface ReferredUser {
  id: string
  email: string
  firstname: string | null
  lastname: string | null
}

interface AffiliateReferral {
  id: string
  conversionDate: Date | string // Accept both Date and string
  conversionType: string
  amount: number
  commissionAmount: number
  status: string
  referredUser: ReferredUser | null
  programId: string
  affiliateId: string
  payoutId: string | null
  notes: string | null
}

interface AffiliatePayout {
  id: string
  amount: number
  status: string
  createdAt: Date | string // Accept both Date and string
  processedAt?: Date | string // Accept both Date and string
  paymentMethod: string
  transactionId?: string
  notes?: string
}

interface AffiliateProgram {
  id: string
  name: string
  status: string
  commissionRate: number
  cookieDuration: number
  minimumPayout: number
  description: string | null
  termsAndConditions: string | null
  createdAt: Date | string
  updatedAt: Date | string
}

interface AffiliateUser {
  id: string
  name: string
  email: string
  balance: number
  totalEarned: number
  status: string
  isApproved: boolean
  referralCode: string
  program: AffiliateProgram
  programId: string
  bio?: string | null
  paymentDetails?: any
  createdAt?: Date | string
  updatedAt?: Date | string
}

interface AffiliateStats {
  clicks: number
  referrals: number
  pendingReferrals: number
  conversionRate: number
  balance: number
  totalEarned: number
  monthlyEarnings: number
}

interface DashboardData {
  affiliate: AffiliateUser
  stats: AffiliateStats
  recentReferrals: AffiliateReferral[]
  recentPayouts: AffiliatePayout[]
}

export default function AffiliateDashboard({ affiliateId }: AffiliateDashboardProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPayoutDialog, setShowPayoutDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("paypal")
  const [payoutNotes, setPayoutNotes] = useState("")
  const [isRequesting, setIsRequesting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getAffiliateDashboard(affiliateId)

        if (result.success && result.dashboardData) {
          // Use type assertion after ensuring the structure is compatible
          setDashboardData(result.dashboardData as unknown as DashboardData)
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to fetch dashboard data",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching affiliate dashboard:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [affiliateId, toast])

  const handleRequestPayout = async () => {
    if (!dashboardData || dashboardData.affiliate.balance <= 0) {
      toast({
        title: "Error",
        description: "You do not have any available balance to withdraw",
        variant: "destructive",
      })
      return
    }

    setIsRequesting(true)

    try {
      const result = await requestAffiliatePayout(affiliateId, paymentMethod, payoutNotes)

      if (result.success && result.payout) {
        toast({
          title: "Payout Requested",
          description: `Your payout request for $${result.payout.amount.toFixed(2)} has been submitted`,
        })

        // Update the local state
        setDashboardData((prev: DashboardData | null) => {
          if (!prev) return prev

          return {
            ...prev,
            affiliate: {
              ...prev.affiliate,
              balance: prev.affiliate.balance - result.payout!.amount,
            },
            recentPayouts: [
              {
                id: result.payout!.id,
                amount: result.payout!.amount,
                status: "pending",
                createdAt: new Date(),
                paymentMethod: paymentMethod,
                notes: payoutNotes || undefined,
              } as AffiliatePayout,
              ...prev.recentPayouts,
            ],
          }
        })

        setShowPayoutDialog(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to request payout",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error requesting payout:", error)
      toast({
        title: "Error",
        description: "Failed to request payout",
        variant: "destructive",
      })
    } finally {
      setIsRequesting(false)
    }
  }

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="h-32 animate-pulse">
              <CardContent className="p-6" />
            </Card>
          ))}
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Failed to load dashboard</h3>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    )
  }

  const { affiliate, stats, recentReferrals, recentPayouts } = dashboardData

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${affiliate.balance.toFixed(2)}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">Min. payout: ${affiliate.program.minimumPayout}</p>
              {affiliate.balance >= affiliate.program.minimumPayout && (
                <Button variant="outline" size="sm" onClick={() => setShowPayoutDialog(true)}>
                  Request Payout
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.referrals}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingReferrals} pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clicks}</div>
            <p className="text-xs text-muted-foreground">{stats.conversionRate.toFixed(2)}% conversion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">${stats.monthlyEarnings.toFixed(2)} this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
            <CardDescription>Your most recent successful referrals</CardDescription>
          </CardHeader>
          <CardContent>
            {recentReferrals.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No referrals yet</p>
                <Button variant="link" className="mt-2">
                  Share your referral link <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>{formatDate(referral.conversionDate)}</TableCell>
                      <TableCell className="capitalize">{referral.conversionType}</TableCell>
                      <TableCell>${referral.amount.toFixed(2)}</TableCell>
                      <TableCell>${referral.commissionAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
            <CardDescription>Status of your commission payment requests</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPayouts.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No payout history</p>
                {affiliate.balance >= affiliate.program.minimumPayout ? (
                  <Button variant="link" className="mt-2" onClick={() => setShowPayoutDialog(true)}>
                    Request your first payout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground mt-2">
                    Earn at least ${affiliate.program.minimumPayout.toFixed(2)} to request a payout
                  </p>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPayouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell>{formatDate(payout.createdAt)}</TableCell>
                      <TableCell>${payout.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payout.status === "completed"
                              ? "secondary"
                              : payout.status === "processing"
                                ? "outline"
                                : payout.status === "failed"
                                  ? "destructive"
                                  : "default"
                          }
                        >
                          {payout.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Payout</DialogTitle>
            <DialogDescription>You are about to request a payout of ${affiliate.balance.toFixed(2)}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                value={payoutNotes}
                onChange={(e) => setPayoutNotes(e.target.value)}
                placeholder="Any special instructions..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPayoutDialog(false)} disabled={isRequesting}>
                Cancel
              </Button>
              <Button onClick={handleRequestPayout} disabled={isRequesting || affiliate.balance <= 0}>
                {isRequesting ? "Processing..." : "Confirm Request"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

