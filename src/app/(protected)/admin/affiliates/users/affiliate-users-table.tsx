// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { MoreVertical, Ban, DollarSign, ExternalLink, FileEdit } from "lucide-react"
// import { updateAffiliateStatus } from "../../actions/affiliate-admin-actions"

// interface AffiliateUser {
//   id: string
//   name: string
//   email: string
//   userId: string | null
//   status: string
//   isApproved: boolean
//   commissionRate: number | null
//   balance: number
//   totalEarned: number
//   referralCode: string
//   createdAt: string
//   _count?: {
//     referrals: number
//   }
// }

// interface AffiliateUsersTableProps {
//   programId?: string
// }

// export default function AffiliateUsersTable({ programId }: AffiliateUsersTableProps) {
//   const [affiliates, setAffiliates] = useState<AffiliateUser[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateUser | null>(null)
//   const [commissionRate, setCommissionRate] = useState<number>(0)
//   const [showCommissionDialog, setShowCommissionDialog] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchAffiliates = async () => {
//       try {
//         const url = programId
//           ? `/api/admin/affiliate-users?status=active&program=${programId}`
//           : "/api/admin/affiliate-users?status=active"

//         const response = await fetch(url)
//         const data = await response.json()

//         if (data.success) {
//           setAffiliates(data.affiliates)
//         } else {
//           toast({
//             title: "Error",
//             description: data.message || "Failed to fetch affiliates",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching affiliates:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load affiliates",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAffiliates()
//   }, [programId, toast])

//   const handleSuspend = async (affiliateId: string) => {
//     if (!confirm("Are you sure you want to suspend this affiliate?")) {
//       return
//     }

//     try {
//       const result = await updateAffiliateStatus(affiliateId, false)

//       if (result.success) {
//         setAffiliates((prev) => prev.filter((affiliate) => affiliate.id !== affiliateId))

//         toast({
//           title: "Affiliate Suspended",
//           description: "The affiliate has been suspended successfully",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to suspend affiliate",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error suspending affiliate:", error)
//       toast({
//         title: "Error",
//         description: "Failed to suspend affiliate",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleUpdateCommission = async () => {
//     if (!selectedAffiliate) return

//     try {
//       const result = await updateAffiliateStatus(selectedAffiliate.id, true, commissionRate)

//       if (result.success) {
//         setAffiliates((prev) =>
//           prev.map((affiliate) =>
//             affiliate.id === selectedAffiliate.id ? { ...affiliate, commissionRate } : affiliate,
//           ),
//         )

//         toast({
//           title: "Commission Updated",
//           description: "The affiliate commission rate has been updated",
//         })

//         setShowCommissionDialog(false)
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to update commission rate",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error updating commission rate:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update commission rate",
//         variant: "destructive",
//       })
//     }
//   }

//   const openCommissionDialog = (affiliate: AffiliateUser) => {
//     setSelectedAffiliate(affiliate)
//     setCommissionRate(affiliate.commissionRate || 0)
//     setShowCommissionDialog(true)
//   }

//   return (
//     <>
//       {loading ? (
//         <div className="flex justify-center p-4">Loading affiliates...</div>
//       ) : affiliates.length === 0 ? (
//         <div className="text-center p-4">
//           <p className="text-muted-foreground">No active affiliates found</p>
//         </div>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Commission</TableHead>
//               <TableHead>Referrals</TableHead>
//               <TableHead>Earnings</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {affiliates.map((affiliate) => (
//               <TableRow key={affiliate.id}>
//                 <TableCell className="font-medium">{affiliate.name}</TableCell>
//                 <TableCell>{affiliate.email}</TableCell>
//                 <TableCell>{affiliate.userId ? "Registered User" : "External"}</TableCell>
//                 <TableCell>{affiliate.commissionRate ? `${affiliate.commissionRate}%` : "Default"}</TableCell>
//                 <TableCell>{affiliate._count?.referrals || 0}</TableCell>
//                 <TableCell>${affiliate.totalEarned.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline" className="capitalize">
//                     {affiliate.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuItem onClick={() => router.push(`/admin/affiliates/users/${affiliate.id}`)}>
//                         <FileEdit className="mr-2 h-4 w-4" />
//                         View Details
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => openCommissionDialog(affiliate)}>
//                         <DollarSign className="mr-2 h-4 w-4" />
//                         Update Commission
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => window.open(`/ref/${affiliate.referralCode}`, "_blank")}>
//                         <ExternalLink className="mr-2 h-4 w-4" />
//                         Test Referral Link
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         className="text-destructive focus:text-destructive"
//                         onClick={() => handleSuspend(affiliate.id)}
//                       >
//                         <Ban className="mr-2 h-4 w-4" />
//                         Suspend Affiliate
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}

//       <Dialog open={showCommissionDialog} onOpenChange={setShowCommissionDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update Commission Rate</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="commission">Custom Commission Rate (%)</Label>
//               <Input
//                 id="commission"
//                 type="number"
//                 min="0"
//                 max="100"
//                 step="0.1"
//                 value={commissionRate}
//                 onChange={(e) => setCommissionRate(Number.parseFloat(e.target.value))}
//               />
//               <p className="text-sm text-muted-foreground">Set to 0 to use the program default rate</p>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setShowCommissionDialog(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleUpdateCommission}>Update Commission</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { MoreVertical, Ban, DollarSign, ExternalLink, FileEdit } from "lucide-react"
import { updateAffiliateStatus } from "../../actions/affiliate-admin-actions"

interface AffiliateUser {
  id: string
  name: string
  email: string
  userId: string | null
  status: string
  isApproved: boolean
  commissionRate: number | null
  balance: number
  totalEarned: number
  referralCode: string
  createdAt: string
  _count?: {
    referrals: number
  }
}

interface AffiliateUsersTableProps {
  programId?: string
}

export default function AffiliateUsersTable({ programId }: AffiliateUsersTableProps) {
  const [affiliates, setAffiliates] = useState<AffiliateUser[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateUser | null>(null)
  const [commissionRate, setCommissionRate] = useState<number>(0)
  const [showCommissionDialog, setShowCommissionDialog] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const url = programId
          ? `/api/admin/affiliate-users?status=active&program=${programId}`
          : "/api/admin/affiliate-users?status=active"

        const response = await fetch(url)
        const data = await response.json()

        if (data.success) {
          // Make sure we're setting an array, even if the API returns null or undefined
          setAffiliates(data.affiliates || [])
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch affiliates",
            variant: "destructive",
          })
          // Set empty array on error
          setAffiliates([])
        }
      } catch (error) {
        console.error("Error fetching affiliates:", error)
        toast({
          title: "Error",
          description: "Failed to load affiliates",
          variant: "destructive",
        })
        // Set empty array on error
        setAffiliates([])
      } finally {
        setLoading(false)
      }
    }

    fetchAffiliates()
  }, [programId, toast])

  const handleSuspend = async (affiliateId: string) => {
    if (!confirm("Are you sure you want to suspend this affiliate?")) {
      return
    }

    try {
      const result = await updateAffiliateStatus(affiliateId, false)

      if (result.success) {
        setAffiliates((prev) => prev.filter((affiliate) => affiliate.id !== affiliateId))

        toast({
          title: "Affiliate Suspended",
          description: "The affiliate has been suspended successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to suspend affiliate",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error suspending affiliate:", error)
      toast({
        title: "Error",
        description: "Failed to suspend affiliate",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCommission = async () => {
    if (!selectedAffiliate) return

    try {
      const result = await updateAffiliateStatus(selectedAffiliate.id, true, commissionRate)

      if (result.success) {
        setAffiliates((prev) =>
          prev.map((affiliate) =>
            affiliate.id === selectedAffiliate.id ? { ...affiliate, commissionRate } : affiliate,
          ),
        )

        toast({
          title: "Commission Updated",
          description: "The affiliate commission rate has been updated",
        })

        setShowCommissionDialog(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update commission rate",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating commission rate:", error)
      toast({
        title: "Error",
        description: "Failed to update commission rate",
        variant: "destructive",
      })
    }
  }

  const openCommissionDialog = (affiliate: AffiliateUser) => {
    setSelectedAffiliate(affiliate)
    setCommissionRate(affiliate.commissionRate || 0)
    setShowCommissionDialog(true)
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center p-4">Loading affiliates...</div>
      ) : affiliates.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No active affiliates found</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Referrals</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {affiliates.map((affiliate) => (
              <TableRow key={affiliate.id}>
                <TableCell className="font-medium">{affiliate.name}</TableCell>
                <TableCell>{affiliate.email}</TableCell>
                <TableCell>{affiliate.userId ? "Registered User" : "External"}</TableCell>
                <TableCell>{affiliate.commissionRate ? `${affiliate.commissionRate}%` : "Default"}</TableCell>
                <TableCell>{affiliate._count?.referrals || 0}</TableCell>
                <TableCell>${affiliate.totalEarned.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {affiliate.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => router.push(`/admin/affiliates/users/${affiliate.id}`)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openCommissionDialog(affiliate)}>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Update Commission
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`/ref/${affiliate.referralCode}`, "_blank")}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Test Referral Link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleSuspend(affiliate.id)}
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend Affiliate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={showCommissionDialog} onOpenChange={setShowCommissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Commission Rate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Custom Commission Rate (%)</Label>
              <Input
                id="commission"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number.parseFloat(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">Set to 0 to use the program default rate</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCommissionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCommission}>Update Commission</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

