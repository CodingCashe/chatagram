"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { getReferralPrograms, deleteReferralProgram } from "../actions/referral-admin-actions"

export function ReferralProgramsTable() {
  const { toast } = useToast()
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<string | null>(null)

  useState(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getReferralPrograms()
        setPrograms(data)
      } catch (error) {
        console.error("Failed to fetch referral programs:", error)
        toast({
          title: "Error",
          description: "Failed to load referral programs. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  },)

  const handleDelete = async () => {
    if (!programToDelete) return

    try {
      await deleteReferralProgram(programToDelete)
      setPrograms(programs.filter((program) => program.id !== programToDelete))
      toast({
        title: "Success",
        description: "Referral program deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete referral program:", error)
      toast({
        title: "Error",
        description: "Failed to delete referral program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setProgramToDelete(null)
    }
  }

  const openDeleteDialog = (id: string) => {
    setProgramToDelete(id)
    setDeleteDialogOpen(true)
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Referral Programs</h2>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            New Program
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Referral Programs</h2>
        <Button asChild>
          <Link href="/admin/referrals/new">
            <Plus className="mr-2 h-4 w-4" />
            New Program
          </Link>
        </Button>
      </div>

      {programs.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No referral programs found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Create your first referral program to start rewarding your users for referrals.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/admin/referrals/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Referral Program
            </Link>
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Min. Payout</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Referrals</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.name}</TableCell>
                <TableCell>
                  {program.commissionType === "PERCENTAGE"
                    ? `${program.commissionValue}%`
                    : `$${program.commissionValue.toFixed(2)}`}
                </TableCell>
                <TableCell>${program.minimumPayout.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={program.active ? "default" : "secondary"}>
                    {program.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{program._count.referralCodes}</TableCell>
                <TableCell>{program._count.referrals}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/referrals/${program.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openDeleteDialog(program.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Referral Program</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this referral program? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

