// "use client"

// import { useState, useEffect } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { CheckCircle, XCircle } from "lucide-react"
// import { updateAffiliateStatus } from "../../actions/affiliate-admin-actions"

// interface AffiliateUser {
//   id: string
//   name: string
//   email: string
//   userId: string | null
//   status: string
//   createdAt: string
//   programId: string
//   program: {
//     name: string
//     commissionRate: number
//   }
// }

// interface AffiliateApplicationsTableProps {
//   programId?: string
// }

// export default function AffiliateApplicationsTable({ programId }: AffiliateApplicationsTableProps) {
//   const [applications, setApplications] = useState<AffiliateUser[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateUser | null>(null)
//   const [commissionRate, setCommissionRate] = useState<number>(0)
//   const [showCommissionDialog, setShowCommissionDialog] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const url = programId
//           ? `/api/admin/affiliate-users?status=pending&program=${programId}`
//           : "/api/admin/affiliate-users?status=pending"

//         const response = await fetch(url)
//         const data = await response.json()

//         if (data.success) {
//           setApplications(data.affiliates)
//         } else {
//           toast({
//             title: "Error",
//             description: data.message || "Failed to fetch applications",
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching applications:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load applications",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchApplications()
//   }, [programId, toast])

//   const handleApprove = (affiliate: AffiliateUser) => {
//     setSelectedAffiliate(affiliate)
//     setCommissionRate(affiliate.program.commissionRate)
//     setShowCommissionDialog(true)
//   }

//   const confirmApproval = async () => {
//     if (!selectedAffiliate) return

//     try {
//       const result = await updateAffiliateStatus(selectedAffiliate.id, true, commissionRate)

//       if (result.success) {
//         setApplications((prev) => prev.filter((app) => app.id !== selectedAffiliate.id))

//         toast({
//           title: "Application Approved",
//           description: "The affiliate application has been approved",
//         })

//         setShowCommissionDialog(false)
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to approve application",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error approving application:", error)
//       toast({
//         title: "Error",
//         description: "Failed to approve application",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleReject = async (affiliateId: string) => {
//     if (!confirm("Are you sure you want to reject this application?")) {
//       return
//     }

//     try {
//       const result = await updateAffiliateStatus(affiliateId, false)

//       if (result.success) {
//         setApplications((prev) => prev.filter((app) => app.id !== affiliateId))

//         toast({
//           title: "Application Rejected",
//           description: "The affiliate application has been rejected",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to reject application",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error rejecting application:", error)
//       toast({
//         title: "Error",
//         description: "Failed to reject application",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <>
//       {loading ? (
//         <div className="flex justify-center p-4">Loading applications...</div>
//       ) : applications.length === 0 ? (
//         <div className="text-center p-4">
//           <p className="text-muted-foreground">No pending applications</p>
//         </div>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Program</TableHead>
//               <TableHead>Application Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {applications.map((application) => (
//               <TableRow key={application.id}>
//                 <TableCell className="font-medium">{application.name}</TableCell>
//                 <TableCell>{application.email}</TableCell>
//                 <TableCell>{application.userId ? "Registered User" : "External"}</TableCell>
//                 <TableCell>{application.program.name}</TableCell>
//                 <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex justify-end gap-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="text-green-600 hover:text-green-700"
//                       onClick={() => handleApprove(application)}
//                     >
//                       <CheckCircle className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="text-red-600 hover:text-red-700"
//                       onClick={() => handleReject(application.id)}
//                     >
//                       <XCircle className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}

//       <Dialog open={showCommissionDialog} onOpenChange={setShowCommissionDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Approve Affiliate</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="commission">Commission Rate (%)</Label>
//               <Input
//                 id="commission"
//                 type="number"
//                 min="0"
//                 max="100"
//                 step="0.1"
//                 value={commissionRate}
//                 onChange={(e) => setCommissionRate(Number.parseFloat(e.target.value))}
//               />
//               <p className="text-sm text-muted-foreground">
//                 You can set a custom commission rate or use the default program rate
//               </p>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setShowCommissionDialog(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={confirmApproval}>Approve Affiliate</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle } from "lucide-react"
import { updateAffiliateStatus } from "../../actions/affiliate-admin-actions"

interface AffiliateUser {
  id: string
  name: string
  email: string
  userId: string | null
  status: string
  createdAt: string
  programId: string
  program: {
    name: string
    commissionRate: number
  }
}

interface AffiliateApplicationsTableProps {
  programId?: string
}

export default function AffiliateApplicationsTable({ programId }: AffiliateApplicationsTableProps) {
  const [applications, setApplications] = useState<AffiliateUser[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateUser | null>(null)
  const [commissionRate, setCommissionRate] = useState<number>(0)
  const [showCommissionDialog, setShowCommissionDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const url = programId
          ? `/api/admin/affiliate-users?status=pending&program=${programId}`
          : "/api/admin/affiliate-users?status=pending"

        const response = await fetch(url)
        const data = await response.json()

        if (data.success) {
          // Make sure we're setting an array, even if the API returns null or undefined
          setApplications(data.affiliates || [])
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch applications",
            variant: "destructive",
          })
          // Set empty array on error
          setApplications([])
        }
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to load applications",
          variant: "destructive",
        })
        // Set empty array on error
        setApplications([])
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [programId, toast])

  const handleApprove = (affiliate: AffiliateUser) => {
    setSelectedAffiliate(affiliate)
    setCommissionRate(affiliate.program.commissionRate)
    setShowCommissionDialog(true)
  }

  const confirmApproval = async () => {
    if (!selectedAffiliate) return

    try {
      const result = await updateAffiliateStatus(selectedAffiliate.id, true, commissionRate)

      if (result.success) {
        setApplications((prev) => prev.filter((app) => app.id !== selectedAffiliate.id))

        toast({
          title: "Application Approved",
          description: "The affiliate application has been approved",
        })

        setShowCommissionDialog(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to approve application",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error approving application:", error)
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (affiliateId: string) => {
    if (!confirm("Are you sure you want to reject this application?")) {
      return
    }

    try {
      const result = await updateAffiliateStatus(affiliateId, false)

      if (result.success) {
        setApplications((prev) => prev.filter((app) => app.id !== affiliateId))

        toast({
          title: "Application Rejected",
          description: "The affiliate application has been rejected",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to reject application",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error rejecting application:", error)
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center p-4">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No pending applications</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.name}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>{application.userId ? "Registered User" : "External"}</TableCell>
                <TableCell>{application.program.name}</TableCell>
                <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleApprove(application)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleReject(application.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={showCommissionDialog} onOpenChange={setShowCommissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Affiliate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Commission Rate (%)</Label>
              <Input
                id="commission"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number.parseFloat(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">
                You can set a custom commission rate or use the default program rate
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCommissionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmApproval}>Approve Affiliate</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

