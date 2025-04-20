"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Filter, Download, CheckCircle, AlertTriangle, Send } from "lucide-react"
import { getAllInvoices, sendInvoice, markInvoiceAsPaid } from "../actions/invoice-actions"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

type Invoice = {
  id: string
  invoiceNumber: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  tax: number
  total: number
  currency: string
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED"
  dueDate: string
  issueDate: string
  paidDate: string | null
}

export function InvoicesTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchInvoices() {
      try {
        setLoading(true)
        const result = await getAllInvoices(page, 10, searchQuery)
        setInvoices(result.invoices)
        setTotalPages(result.totalPages)
      } catch (error) {
        console.error("Error fetching invoices:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const handler = setTimeout(() => {
      fetchInvoices()
    }, 300)

    return () => clearTimeout(handler)
  }, [page, searchQuery])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return (
          <Badge variant="outline" className="bg-slate-100">
            Draft
          </Badge>
        )
      case "SENT":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Sent
          </Badge>
        )
      case "PAID":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "OVERDUE":
        return <Badge variant="destructive">Overdue</Badge>
      case "CANCELLED":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSendInvoice = async (id: string) => {
    try {
      await sendInvoice(id)

      // Update local state
      setInvoices(invoices.map((invoice) => (invoice.id === id ? { ...invoice, status: "SENT" } : invoice)))

      toast({
        title: "Invoice sent",
        description: "The invoice has been sent to the customer.",
      })
    } catch (error) {
      console.error("Error sending invoice:", error)
      toast({
        title: "Error",
        description: "Failed to send invoice",
        variant: "destructive",
      })
    }
  }

  const handleMarkAsPaid = async (id: string) => {
    try {
      await markInvoiceAsPaid(id)

      // Update local state
      setInvoices(
        invoices.map((invoice) =>
          invoice.id === id ? { ...invoice, status: "PAID", paidDate: new Date().toISOString() } : invoice,
        ),
      )

      toast({
        title: "Invoice marked as paid",
        description: "The invoice has been marked as paid.",
      })
    } catch (error) {
      console.error("Error marking invoice as paid:", error)
      toast({
        title: "Error",
        description: "Failed to mark invoice as paid",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>Manage customer invoices and payments</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading invoices...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        <Link href={`/admin/invoices/${invoice.id}`} className="hover:underline">
                          {invoice.invoiceNumber}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.userName || "Unnamed User"}</p>
                          <p className="text-sm text-muted-foreground">{invoice.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(invoice.total, invoice.currency)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {new Date(invoice.dueDate) < new Date() && invoice.status !== "PAID" ? (
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          ) : null}
                          {formatDate(invoice.dueDate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/invoices/${invoice.id}`}>View details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/invoices/${invoice.id}/edit`}>Edit invoice</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {invoice.status === "DRAFT" && (
                              <DropdownMenuItem onClick={() => handleSendInvoice(invoice.id)}>
                                <Send className="mr-2 h-4 w-4" />
                                Send to customer
                              </DropdownMenuItem>
                            )}
                            {(invoice.status === "SENT" || invoice.status === "OVERDUE") && (
                              <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as paid
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/invoices/${invoice.id}/download`} target="_blank">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

