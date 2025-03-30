"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MoreVertical, CheckCircle, XCircle, Clock, FileText } from "lucide-react"
import { processAffiliatePayout } from "../../actions/affiliate-admin-actions"

interface AffiliatePayout {
  id: string
  amount: number
  status: string
  paymentMethod: string
  transactionId: string | null
  notes: string | null
  processedAt: string | null
  createdAt: string
  affiliate: {
    id: string
    name: string
    email: string
  }
}

export default function AffiliatePayoutsTable() {
  const [payouts, setPayouts] = useState<AffiliatePayout[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPayout, setSelectedPayout] = useState<AffiliatePayout | null>(null)
  const [transactionId, setTransactionId] = useState("")
  const [notes, setNotes] = useState("")
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [processingAction, setProcessingAction] = useState<"processing" | "completed" | "failed">("completed")
  const { toast } = useToast()

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await fetch("/api/admin/affiliate-payouts")
        const data = await response.json()

        if (data.success) {
          setPayouts(data.payouts)
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch payouts",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching payouts:", error)
        toast({
          title: "Error",
          description: "Failed to load payouts",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPayouts()
  }, [toast])

  const openProcessDialog = (payout: AffiliatePayout, action: "processing" | "completed" | "failed") => {
    setSelectedPayout(payout)
    setTransactionId("")
    setNotes("")
    setProcessingAction(action)
    setShowProcessDialog(true)
  }

  const handleProcessPayout = async () => {
    if (!selectedPayout) return

    try {
      const result = await processAffiliatePayout(
        selectedPayout.id,
        processingAction,
        transactionId || undefined,
        notes || undefined,
      )

      if (result.success) {
        setPayouts((prev) =>
          prev.map((payout) =>
            payout.id === selectedPayout.id
              ? {
                  ...payout,
                  status: processingAction,
                  transactionId: transactionId || payout.transactionId,
                  notes: notes || payout.notes,
                  processedAt: processingAction === "completed" ? new Date().toISOString() : payout.processedAt,
                }
              : payout,
          ),
        )

        toast({
          title: "Payout Updated",
          description: `Payout marked as ${processingAction}`,
        })

        setShowProcessDialog(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to process payout",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error processing payout:", error)
      toast({
        title: "Error",
        description: "Failed to process payout",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center p-4">Loading payouts...</div>
      ) : payouts.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No payouts found</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Affiliate</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested Date</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell className="font-medium">
                  {payout.affiliate.name}
                  <div className="text-xs text-muted-foreground">{payout.affiliate.email}</div>
                </TableCell>
                <TableCell>${payout.amount.toFixed(2)}</TableCell>
                <TableCell className="capitalize">{payout.paymentMethod}</TableCell>
                <TableCell>{getStatusBadge(payout.status)}</TableCell>
                <TableCell>{new Date(payout.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {payout.transactionId || <span className="text-muted-foreground italic">None</span>}
                </TableCell>
                <TableCell className="text-right">
                  {payout.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-600 hover:text-amber-700"
                        onClick={() => openProcessDialog(payout, "processing")}
                      >
                        <Clock className="mr-1 h-4 w-4" />
                        Processing
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => openProcessDialog(payout, "completed")}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Complete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => openProcessDialog(payout, "failed")}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {payout.status === "processing" && (
                          <>
                            <DropdownMenuItem onClick={() => openProcessDialog(payout, "completed")}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openProcessDialog(payout, "failed")}>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Mark as Failed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {processingAction === "processing" && "Mark Payout as Processing"}
              {processingAction === "completed" && "Complete Payout"}
              {processingAction === "failed" && "Reject Payout"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {(processingAction === "completed" || processingAction === "processing") && (
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  processingAction === "processing"
                    ? "Processing details..."
                    : processingAction === "completed"
                      ? "Payment confirmation details..."
                      : "Reason for rejection..."
                }
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProcessDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleProcessPayout}
                variant={
                  processingAction === "completed"
                    ? "default"
                    : processingAction === "processing"
                      ? "secondary"
                      : "destructive"
                }
              >
                {processingAction === "processing" && "Mark as Processing"}
                {processingAction === "completed" && "Complete Payout"}
                {processingAction === "failed" && "Reject Payout"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

