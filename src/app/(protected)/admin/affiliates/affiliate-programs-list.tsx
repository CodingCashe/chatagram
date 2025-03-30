"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusCircle, Edit, MoreVertical, Users, Trash2, Pause, Play, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateAffiliateProgram, deleteAffiliateProgram } from "../actions/affiliate-admin-actions"

interface AffiliateProgram {
  id: string
  name: string
  description: string | null
  commissionRate: number
  cookieDuration: number
  minimumPayout: number
  status: string
  _count?: {
    affiliates: number
    referrals: number
  }
}

export default function AffiliateProgramsList() {
  const [programs, setPrograms] = useState<AffiliateProgram[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/admin/affiliate-programs")
        const data = await response.json()

        if (data.success) {
          setPrograms(data.programs)
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch affiliate programs",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching affiliate programs:", error)
        toast({
          title: "Error",
          description: "Failed to load affiliate programs",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [toast])

  const handleStatusToggle = async (programId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"

    try {
      const result = await updateAffiliateProgram(programId, { status: newStatus })

      if (result.success) {
        setPrograms((prev) =>
          prev.map((program) => (program.id === programId ? { ...program, status: newStatus } : program)),
        )

        toast({
          title: "Status Updated",
          description: `Program is now ${newStatus}`,
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update status",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating program status:", error)
      toast({
        title: "Error",
        description: "Failed to update program status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (programId: string) => {
    if (!confirm("Are you sure you want to delete this affiliate program? This action cannot be undone.")) {
      return
    }

    try {
      const result = await deleteAffiliateProgram(programId)

      if (result.success) {
        setPrograms((prev) => prev.filter((program) => program.id !== programId))

        toast({
          title: "Program Deleted",
          description: "Affiliate program has been deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete program",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting program:", error)
      toast({
        title: "Error",
        description: "Failed to delete affiliate program",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Affiliate Programs</CardTitle>
          <CardDescription>Manage your affiliate programs and commission structures</CardDescription>
        </div>
        <Button onClick={() => router.push("/admin/affiliates/programs/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Program
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading programs...</div>
        ) : programs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="mb-2 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No Affiliate Programs</h3>
            <p className="text-sm text-muted-foreground">
              Create your first affiliate program to start growing your business through referrals.
            </p>
            <Button className="mt-4" onClick={() => router.push("/admin/affiliates/programs/new")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Program
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Cookie Duration</TableHead>
                <TableHead>Min. Payout</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Affiliates</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.commissionRate}%</TableCell>
                  <TableCell>{program.cookieDuration} days</TableCell>
                  <TableCell>${program.minimumPayout}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        program.status === "active"
                          ? "outline"
                          : program.status === "paused"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{program._count?.affiliates || 0}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/admin/affiliates/programs/${program.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/admin/affiliates/users?program=${program.id}`)}>
                          <Users className="mr-2 h-4 w-4" />
                          View Affiliates
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusToggle(program.id, program.status)}>
                          {program.status === "active" ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause Program
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Activate Program
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(program.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Program
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

