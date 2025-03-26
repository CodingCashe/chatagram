// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Badge } from "@/components/ui/badge"
// import { MoreVertical, Trash, Copy, Send, Calendar, CheckCircle, XCircle, Clock, FileEdit, Eye } from "lucide-react"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { toast } from "@/hooks/use-toast"
// import { cancelCampaign, getEmailCampaigns, sendCampaignNow } from "../../actions/email-actions"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { EmailCampaignForm } from "./email-campaign-form"
// import { Progress } from "@/components/ui/progress"

// export function EmailCampaignsList() {
//   const router = useRouter()
//   const [campaigns, setCampaigns] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [editDialogOpen, setEditDialogOpen] = useState(false)
//   const [selectedCampaign, setSelectedCampaign] = useState<any>(null)

//   // Load campaigns
//   useState(() => {
//     async function loadCampaigns() {
//       setIsLoading(true)
//       const result = await getEmailCampaigns()
//       if (result.success) {
//         setCampaigns(result.campaigns)
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to load email campaigns",
//           variant: "destructive",
//         })
//       }
//       setIsLoading(false)
//     }

//     loadCampaigns()
//   })

//   // Handle send now
//   const handleSendNow = async (campaignId: string) => {
//     const result = await sendCampaignNow(campaignId)

//     if (result.success) {
//       toast({
//         title: "Campaign sent",
//         description: `The campaign has been sent to ${result.totalSent} recipients.`,
//       })

//       // Update local state
//       setCampaigns(campaigns.map((c) => (c.id === campaignId ? { ...c, status: "COMPLETED", sentAt: new Date() } : c)))
//     } else {
//       toast({
//         title: "Error",
//         description: "Failed to send the campaign",
//         variant: "destructive",
//       })
//     }
//   }

//   // Handle cancel
//   const handleCancel = async (campaignId: string) => {
//     const result = await cancelCampaign(campaignId)

//     if (result.success) {
//       toast({
//         title: "Campaign cancelled",
//         description: "The campaign has been cancelled successfully",
//       })

//       // Update local state
//       setCampaigns(campaigns.map((c) => (c.id === campaignId ? { ...c, status: "CANCELLED" } : c)))
//     } else {
//       toast({
//         title: "Error",
//         description: "Failed to cancel the campaign",
//         variant: "destructive",
//       })
//     }
//   }

//   // Get status badge
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "DRAFT":
//         return (
//           <Badge variant="outline" className="flex items-center gap-1">
//             <FileEdit className="h-3 w-3" /> Draft
//           </Badge>
//         )
//       case "SCHEDULED":
//         return (
//           <Badge variant="secondary" className="flex items-center gap-1">
//             <Calendar className="h-3 w-3" /> Scheduled
//           </Badge>
//         )
//       case "SENDING":
//         return (
//           <Badge variant="default" className="flex items-center gap-1">
//             <Clock className="h-3 w-3" /> Sending
//           </Badge>
//         )
//       case "COMPLETED":
//         return (
//           <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-800">
//             <CheckCircle className="h-3 w-3" /> Completed
//           </Badge>
//         )
//       case "CANCELLED":
//         return (
//           <Badge variant="destructive" className="flex items-center gap-1">
//             <XCircle className="h-3 w-3" /> Cancelled
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   if (isLoading) {
//     return <p>Loading campaigns...</p>
//   }

//   if (campaigns.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium">No campaigns found</h3>
//         <p className="text-muted-foreground mt-2">You haven't created any email campaigns yet.</p>
//         <Button
//           className="mt-4"
//           onClick={() => {
//             setSelectedCampaign(null)
//             setEditDialogOpen(true)
//           }}
//         >
//           Create your first campaign
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="space-y-6">
//         {campaigns.map((campaign) => (
//           <Card key={campaign.id} className="overflow-hidden">
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <CardTitle className="flex items-center gap-2">
//                     {campaign.name}
//                     {getStatusBadge(campaign.status)}
//                   </CardTitle>
//                   <CardDescription>
//                     {campaign.scheduledFor
//                       ? `Scheduled for ${new Date(campaign.scheduledFor).toLocaleString()}`
//                       : campaign.sentAt
//                         ? `Sent on ${new Date(campaign.sentAt).toLocaleString()}`
//                         : "Not scheduled"}
//                   </CardDescription>
//                 </div>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreVertical className="h-4 w-4" />
//                       <span className="sr-only">Menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     {campaign.status === "DRAFT" && (
//                       <DropdownMenuItem
//                         onClick={() => {
//                           setSelectedCampaign(campaign)
//                           setEditDialogOpen(true)
//                         }}
//                       >
//                         <FileEdit className="mr-2 h-4 w-4" />
//                         Edit
//                       </DropdownMenuItem>
//                     )}
//                     {(campaign.status === "DRAFT" || campaign.status === "SCHEDULED") && (
//                       <DropdownMenuItem onClick={() => handleSendNow(campaign.id)}>
//                         <Send className="mr-2 h-4 w-4" />
//                         Send Now
//                       </DropdownMenuItem>
//                     )}
//                     {campaign.status === "SCHEDULED" && (
//                       <DropdownMenuItem onClick={() => handleCancel(campaign.id)}>
//                         <XCircle className="mr-2 h-4 w-4" />
//                         Cancel
//                       </DropdownMenuItem>
//                     )}
//                     <DropdownMenuItem
//                       onClick={() => {
//                         // TODO: Implement duplicate
//                         toast({
//                           title: "Coming soon",
//                           description: "This feature is not yet implemented",
//                         })
//                       }}
//                     >
//                       <Copy className="mr-2 h-4 w-4" />
//                       Duplicate
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       onClick={() => {
//                         // TODO: Implement view report
//                         toast({
//                           title: "Coming soon",
//                           description: "This feature is not yet implemented",
//                         })
//                       }}
//                     >
//                       <Eye className="mr-2 h-4 w-4" />
//                       View Report
//                     </DropdownMenuItem>
//                     {campaign.status !== "SENDING" && (
//                       <DropdownMenuItem
//                         className="text-destructive focus:text-destructive"
//                         onClick={() => {
//                           setSelectedCampaign(campaign)
//                           setDeleteDialogOpen(true)
//                         }}
//                       >
//                         <Trash className="mr-2 h-4 w-4" />
//                         Delete
//                       </DropdownMenuItem>
//                     )}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="bg-muted rounded-md p-4 text-center">
//                   <p className="text-sm text-muted-foreground">Recipients</p>
//                   <p className="text-2xl font-bold">{campaign.stats.totalEmails}</p>
//                 </div>
//                 <div className="bg-muted rounded-md p-4 text-center">
//                   <p className="text-sm text-muted-foreground">Sent</p>
//                   <p className="text-2xl font-bold">{campaign.stats.sentEmails}</p>
//                 </div>
//                 <div className="bg-muted rounded-md p-4 text-center">
//                   <p className="text-sm text-muted-foreground">Open Rate</p>
//                   <p className="text-2xl font-bold">{campaign.stats.openRate.toFixed(1)}%</p>
//                 </div>
//                 <div className="bg-muted rounded-md p-4 text-center">
//                   <p className="text-sm text-muted-foreground">Click Rate</p>
//                   <p className="text-2xl font-bold">{campaign.stats.clickRate.toFixed(1)}%</p>
//                 </div>
//               </div>

//               {campaign.status === "SENDING" && (
//                 <div className="mt-4">
//                   <p className="text-sm text-muted-foreground mb-2">Sending progress</p>
//                   <Progress value={(campaign.stats.sentEmails / campaign.stats.totalEmails) * 100} className="h-2" />
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   // TODO: Implement preview
//                   toast({
//                     title: "Coming soon",
//                     description: "This feature is not yet implemented",
//                   })
//                 }}
//               >
//                 Preview
//               </Button>
//               {campaign.status === "DRAFT" && (
//                 <Button variant="default" size="sm" onClick={() => handleSendNow(campaign.id)}>
//                   Send Now
//                 </Button>
//               )}
//               {campaign.status === "SCHEDULED" && (
//                 <Button variant="destructive" size="sm" onClick={() => handleCancel(campaign.id)}>
//                   Cancel
//                 </Button>
//               )}
//               {(campaign.status === "COMPLETED" || campaign.status === "CANCELLED") && (
//                 <Button
//                   variant="default"
//                   size="sm"
//                   onClick={() => {
//                     // TODO: Implement view report
//                     toast({
//                       title: "Coming soon",
//                       description: "This feature is not yet implemented",
//                     })
//                   }}
//                 >
//                   View Report
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* Delete confirmation dialog */}
//       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This will permanently delete the campaign "{selectedCampaign?.name}". This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => {
//                 // TODO: Implement delete
//                 toast({
//                   title: "Coming soon",
//                   description: "This feature is not yet implemented",
//                 })
//                 setDeleteDialogOpen(false)
//               }}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Edit/Create dialog */}
//       <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <EmailCampaignForm
//             campaign={selectedCampaign}
//             onSuccess={() => {
//               setEditDialogOpen(false)
//               router.refresh()
//             }}
//           />
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getEmailCampaigns, sendCampaignNow, cancelCampaign, deleteEmailCampaign } from "../../actions/email-actions"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Send, Calendar, CheckCircle, AlertCircle, Clock, Ban } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export function EmailCampaignsList() {
  const [loading, setLoading] = useState(true)
  const [campaigns, setCampaigns] = useState<any[]>([])

  useEffect(() => {
    async function loadCampaigns() {
      setLoading(true)
      try {
        const result = await getEmailCampaigns()
        if (result.success) {
          setCampaigns(result.campaigns || [])
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to load campaigns",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error loading campaigns:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadCampaigns()
  }, [])

  const handleSendNow = async (campaignId: string) => {
    try {
      const result = await sendCampaignNow(campaignId)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message || "Campaign sent successfully",
        })
        // Refresh the campaigns list
        const updatedResult = await getEmailCampaigns()
        if (updatedResult.success) {
          setCampaigns(updatedResult.campaigns || [])
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send campaign",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending campaign:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleCancel = async (campaignId: string) => {
    try {
      const result = await cancelCampaign(campaignId)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message || "Campaign cancelled successfully",
        })
        // Refresh the campaigns list
        const updatedResult = await getEmailCampaigns()
        if (updatedResult.success) {
          setCampaigns(updatedResult.campaigns || [])
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to cancel campaign",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error cancelling campaign:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (campaignId: string) => {
    try {
      const result = await deleteEmailCampaign(campaignId)
      if (result.success) {
        toast({
          title: "Success",
          description: "Campaign deleted successfully",
        })
        // Remove the deleted campaign from the list
        setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId))
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete campaign",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting campaign:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> Draft
          </Badge>
        )
      case "SCHEDULED":
        return (
          <Badge variant="secondary">
            <Calendar className="mr-1 h-3 w-3" /> Scheduled
          </Badge>
        )
      case "SENDING":
        return (
          <Badge variant="default">
            <Send className="mr-1 h-3 w-3" /> Sending
          </Badge>
        )
      case "SENT":
        return (
          <Badge variant="default">
            <CheckCircle className="mr-1 h-3 w-3" /> Sent
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge variant="destructive">
            <Ban className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        )
      case "FAILED":
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" /> Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/5" />
                <Skeleton className="h-4 w-1/5" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Campaigns</CardTitle>
          <CardDescription>You haven't created any email campaigns yet.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Link href="/admin/email/campaigns/new">
            <Button>Create Your First Campaign</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{campaign.name}</CardTitle>
                <CardDescription>{campaign.description || "No description"}</CardDescription>
              </div>
              {getStatusBadge(campaign.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recipients</p>
                <p className="text-lg font-bold">{campaign.stats.totalEmails}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Rate</p>
                <p className="text-lg font-bold">{campaign.stats.openRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Click Rate</p>
                <p className="text-lg font-bold">{campaign.stats.clickRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p className="text-sm">{formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {campaign.status === "SCHEDULED" && (
                <p className="text-sm text-muted-foreground">
                  Scheduled for: {new Date(campaign.scheduledFor).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/email/campaigns/${campaign.id}`}>View Details</Link>
                  </DropdownMenuItem>

                  {campaign.status === "DRAFT" && (
                    <DropdownMenuItem onClick={() => handleSendNow(campaign.id)}>Send Now</DropdownMenuItem>
                  )}

                  {campaign.status === "SCHEDULED" && (
                    <DropdownMenuItem onClick={() => handleCancel(campaign.id)}>Cancel Campaign</DropdownMenuItem>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete Campaign</DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the campaign and all associated
                          data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(campaign.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

