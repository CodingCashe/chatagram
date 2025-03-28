// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { toast } from "@/hooks/use-toast"
// import { sendInvoice, markInvoiceAsPaid, cancelInvoice } from "../actions/invoice-actions"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Download, Edit, Send, CheckCircle, XCircle, Printer } from "lucide-react"
// import Link from "next/link"

// export function InvoiceDetail({ invoice }: { invoice: any }) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString()
//   }

//   const formatCurrency = (amount: number, currency: string) => {
//     return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
//   }

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "DRAFT":
//         return (
//           <Badge variant="outline" className="bg-slate-100">
//             Draft
//           </Badge>
//         )
//       case "SENT":
//         return (
//           <Badge variant="outline" className="bg-blue-100 text-blue-800">
//             Sent
//           </Badge>
//         )
//       case "PAID":
//         return <Badge className="bg-green-100 text-green-800">Paid</Badge>
//       case "OVERDUE":
//         return <Badge variant="destructive">Overdue</Badge>
//       case "CANCELLED":
//         return (
//           <Badge variant="outline" className="bg-gray-100 text-gray-800">
//             Cancelled
//           </Badge>
//         )
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   const handleSendInvoice = async () => {
//     try {
//       setIsLoading(true)
//       await sendInvoice(invoice.id)

//       toast({
//         title: "Invoice sent",
//         description: "The invoice has been sent to the customer.",
//       })

//       router.refresh()
//     } catch (error) {
//       console.error("Error sending invoice:", error)
//       toast({
//         title: "Error",
//         description: "Failed to send invoice",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleMarkAsPaid = async () => {
//     try {
//       setIsLoading(true)
//       await markInvoiceAsPaid(invoice.id)

//       toast({
//         title: "Invoice marked as paid",
//         description: "The invoice has been marked as paid.",
//       })

//       router.refresh()
//     } catch (error) {
//       console.error("Error marking invoice as paid:", error)
//       toast({
//         title: "Error",
//         description: "Failed to mark invoice as paid",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCancelInvoice = async () => {
//     try {
//       setIsLoading(true)
//       await cancelInvoice(invoice.id)

//       toast({
//         title: "Invoice cancelled",
//         description: "The invoice has been cancelled.",
//       })

//       router.refresh()
//     } catch (error) {
//       console.error("Error cancelling invoice:", error)
//       toast({
//         title: "Error",
//         description: "Failed to cancel invoice",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div className="md:col-span-2 space-y-6">
//         <Card>
//           <CardHeader>
//             <div className="flex justify-between items-start">
//               <div>
//                 <CardTitle>Invoice #{invoice.invoiceNumber}</CardTitle>
//                 <CardDescription>Issued on {formatDate(invoice.issueDate)}</CardDescription>
//               </div>
//               <div>{getStatusBadge(invoice.status)}</div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground mb-1">From</h3>
//                 <p className="font-medium">Your Company Name</p>
//                 <p>123 Business Street</p>
//                 <p>City, State 12345</p>
//                 <p>contact@yourcompany.com</p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground mb-1">To</h3>
//                 <p className="font-medium">{invoice.userName}</p>
//                 <p>{invoice.userEmail}</p>
//                 {invoice.userAddress && <p>{invoice.userAddress}</p>}
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-sm font-medium text-muted-foreground mb-2">Invoice Details</h3>
//               <div className="bg-muted rounded-md p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <p className="text-muted-foreground">Invoice Number</p>
//                   <p className="font-medium">{invoice.invoiceNumber}</p>
//                 </div>
//                 <div>
//                   <p className="text-muted-foreground">Issue Date</p>
//                   <p className="font-medium">{formatDate(invoice.issueDate)}</p>
//                 </div>
//                 <div>
//                   <p className="text-muted-foreground">Due Date</p>
//                   <p className="font-medium">{formatDate(invoice.dueDate)}</p>
//                 </div>
//                 <div>
//                   <p className="text-muted-foreground">Status</p>
//                   <p className="font-medium">{invoice.status}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2">Items</h3>
//               <div className="border rounded-md overflow-hidden">
//                 <table className="w-full text-sm">
//                   <thead className="bg-muted">
//                     <tr>
//                       <th className="text-left p-3">Description</th>
//                       <th className="text-right p-3">Quantity</th>
//                       <th className="text-right p-3">Unit Price</th>
//                       <th className="text-right p-3">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {invoice.items.map((item: any, index: number) => (
//                       <tr key={index} className="border-t">
//                         <td className="p-3">{item.description}</td>
//                         <td className="p-3 text-right">{item.quantity}</td>
//                         <td className="p-3 text-right">{formatCurrency(item.unitPrice, invoice.currency)}</td>
//                         <td className="p-3 text-right">{formatCurrency(item.amount, invoice.currency)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <tfoot className="bg-muted/50">
//                     <tr className="border-t">
//                       <td colSpan={3} className="p-3 text-right font-medium">
//                         Subtotal
//                       </td>
//                       <td className="p-3 text-right">{formatCurrency(invoice.amount, invoice.currency)}</td>
//                     </tr>
//                     <tr className="border-t">
//                       <td colSpan={3} className="p-3 text-right font-medium">
//                         Tax
//                       </td>
//                       <td className="p-3 text-right">{formatCurrency(invoice.tax, invoice.currency)}</td>
//                     </tr>
//                     <tr className="border-t">
//                       <td colSpan={3} className="p-3 text-right font-medium">
//                         Total
//                       </td>
//                       <td className="p-3 text-right font-bold">{formatCurrency(invoice.total, invoice.currency)}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>

//             {invoice.notes && (
//               <div className="mt-6">
//                 <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
//                 <p className="text-sm bg-muted p-3 rounded-md">{invoice.notes}</p>
//               </div>
//             )}
//           </CardContent>
//           <CardFooter className="flex justify-between border-t pt-6">
//             <Button variant="outline" asChild>
//               <Link href="/admin/invoices">Back to Invoices</Link>
//             </Button>
//             <div className="flex gap-2">
//               <Button variant="outline" asChild>
//                 <Link href={`/admin/invoices/${invoice.id}/download`} target="_blank">
//                   <Download className="mr-2 h-4 w-4" />
//                   Download
//                 </Link>
//               </Button>
//               <Button variant="outline" asChild>
//                 <Link
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault()
//                     window.print()
//                   }}
//                 >
//                   <Printer className="mr-2 h-4 w-4" />
//                   Print
//                 </Link>
//               </Button>
//             </div>
//           </CardFooter>
//         </Card>

//         {invoice.payments && invoice.payments.length > 0 && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Payment History</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="border rounded-md overflow-hidden">
//                 <table className="w-full text-sm">
//                   <thead className="bg-muted">
//                     <tr>
//                       <th className="text-left p-3">Date</th>
//                       <th className="text-left p-3">Method</th>
//                       <th className="text-left p-3">Transaction ID</th>
//                       <th className="text-right p-3">Amount</th>
//                       <th className="text-right p-3">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {invoice.payments.map((payment: any) => (
//                       <tr key={payment.id} className="border-t">
//                         <td className="p-3">{formatDate(payment.paymentDate)}</td>
//                         <td className="p-3">{payment.paymentMethod}</td>
//                         <td className="p-3">{payment.transactionId || "-"}</td>
//                         <td className="p-3 text-right">{formatCurrency(payment.amount, payment.currency)}</td>
//                         <td className="p-3 text-right">
//                           {payment.status === "COMPLETED" ? (
//                             <Badge className="bg-green-100 text-green-800">Completed</Badge>
//                           ) : payment.status === "PENDING" ? (
//                             <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
//                               Pending
//                             </Badge>
//                           ) : (
//                             <Badge variant="destructive">Failed</Badge>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Actions</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {invoice.status === "DRAFT" && (
//               <Button className="w-full" onClick={handleSendInvoice} disabled={isLoading}>
//                 <Send className="mr-2 h-4 w-4" />
//                 Send to Customer
//               </Button>
//             )}

//             {(invoice.status === "SENT" || invoice.status === "OVERDUE") && (
//               <Button className="w-full" onClick={handleMarkAsPaid} disabled={isLoading}>
//                 <CheckCircle className="mr-2 h-4 w-4" />
//                 Mark as Paid
//               </Button>
//             )}

//             {invoice.status !== "PAID" && invoice.status !== "CANCELLED" && (
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href={`/admin/invoices/${invoice.id}/edit`}>
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit Invoice
//                 </Link>
//               </Button>
//             )}

//             {invoice.status !== "PAID" && invoice.status !== "CANCELLED" && (
//               <AlertDialog>
//                 <AlertDialogTrigger asChild>
//                   <Button variant="outline" className="w-full text-destructive">
//                     <XCircle className="mr-2 h-4 w-4" />
//                     Cancel Invoice
//                   </Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                   <AlertDialogHeader>
//                     <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                       This action cannot be undone. This will permanently cancel the invoice and remove it from active
//                       records.
//                     </AlertDialogDescription>
//                   </AlertDialogHeader>
//                   <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction
//                       onClick={handleCancelInvoice}
//                       className="bg-destructive text-destructive-foreground"
//                     >
//                       Yes, cancel invoice
//                     </AlertDialogAction>
//                   </AlertDialogFooter>
//                 </AlertDialogContent>
//               </AlertDialog>
//             )}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Invoice Summary</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Subtotal:</span>
//               <span>{formatCurrency(invoice.amount, invoice.currency)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Tax:</span>
//               <span>{formatCurrency(invoice.tax, invoice.currency)}</span>
//             </div>
//             <Separator />
//             <div className="flex justify-between font-bold">
//               <span>Total:</span>
//               <span>{formatCurrency(invoice.total, invoice.currency)}</span>
//             </div>
//             <Separator />
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Amount Paid:</span>
//               <span>
//                 {formatCurrency(
//                   invoice.payments?.reduce(
//                     (sum: number, payment: any) => (payment.status === "COMPLETED" ? sum + payment.amount : sum),
//                     0,
//                   ) || 0,
//                   invoice.currency,
//                 )}
//               </span>
//             </div>
//             <div className="flex justify-between font-bold">
//               <span>Balance Due:</span>
//               <span>
//                 {formatCurrency(
//                   invoice.total -
//                     (invoice.payments?.reduce(
//                       (sum: number, payment: any) => (payment.status === "COMPLETED" ? sum + payment.amount : sum),
//                       0,
//                     ) || 0),
//                   invoice.currency,
//                 )}
//               </span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { sendInvoice, markInvoiceAsPaid, cancelInvoice } from "../actions/invoice-actions"
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
import { Download, Edit, Send, CheckCircle, XCircle, Printer } from "lucide-react"
import Link from "next/link"

export function InvoiceDetail({ invoice }: { invoice: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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

  const handleSendInvoice = async () => {
    try {
      setIsLoading(true)
      await sendInvoice(invoice.id)

      toast({
        title: "Invoice sent",
        description: "The invoice has been sent to the customer.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error sending invoice:", error)
      toast({
        title: "Error",
        description: "Failed to send invoice",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsPaid = async () => {
    try {
      setIsLoading(true)
      await markInvoiceAsPaid(invoice.id)

      toast({
        title: "Invoice marked as paid",
        description: "The invoice has been marked as paid.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error marking invoice as paid:", error)
      toast({
        title: "Error",
        description: "Failed to mark invoice as paid",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelInvoice = async () => {
    try {
      setIsLoading(true)
      await cancelInvoice(invoice.id)

      toast({
        title: "Invoice cancelled",
        description: "The invoice has been cancelled.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error cancelling invoice:", error)
      toast({
        title: "Error",
        description: "Failed to cancel invoice",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Invoice #{invoice.invoiceNumber}</CardTitle>
                <CardDescription>Issued on {formatDate(invoice.issueDate)}</CardDescription>
              </div>
              <div>{getStatusBadge(invoice.status)}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">From</h3>
                <p className="font-medium">Yazil</p>
                <p>123 Business Street</p>
                <p>City, State 12345</p>
                <p>contact@yazil.ai</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">To</h3>
                <p className="font-medium">{invoice.userName}</p>
                <p>{invoice.userEmail}</p>
                {invoice.userAddress && <p>{invoice.userAddress}</p>}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Invoice Details</h3>
              <div className="bg-muted rounded-md p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Invoice Number</p>
                  <p className="font-medium">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Issue Date</p>
                  <p className="font-medium">{formatDate(invoice.issueDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">{invoice.status}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Items</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3">Description</th>
                      <th className="text-right p-3">Quantity</th>
                      <th className="text-right p-3">Unit Price</th>
                      <th className="text-right p-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{item.description}</td>
                        <td className="p-3 text-right">{item.quantity}</td>
                        <td className="p-3 text-right">{formatCurrency(item.unitPrice, invoice.currency)}</td>
                        <td className="p-3 text-right">{formatCurrency(item.amount, invoice.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/50">
                    <tr className="border-t">
                      <td colSpan={3} className="p-3 text-right font-medium">
                        Subtotal
                      </td>
                      <td className="p-3 text-right">{formatCurrency(invoice.amount, invoice.currency)}</td>
                    </tr>
                    <tr className="border-t">
                      <td colSpan={3} className="p-3 text-right font-medium">
                        Tax
                      </td>
                      <td className="p-3 text-right">{formatCurrency(invoice.tax, invoice.currency)}</td>
                    </tr>
                    <tr className="border-t">
                      <td colSpan={3} className="p-3 text-right font-medium">
                        Total
                      </td>
                      <td className="p-3 text-right font-bold">{formatCurrency(invoice.total, invoice.currency)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {invoice.notes && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                <p className="text-sm bg-muted p-3 rounded-md">{invoice.notes}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" asChild>
              <Link href="/admin/invoices">Back to Invoices</Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/api/invoices/${invoice.id}/download`} target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    window.print()
                  }}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {invoice.payments && invoice.payments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Method</th>
                      <th className="text-left p-3">Transaction ID</th>
                      <th className="text-right p-3">Amount</th>
                      <th className="text-right p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.payments.map((payment: any) => (
                      <tr key={payment.id} className="border-t">
                        <td className="p-3">{formatDate(payment.paymentDate)}</td>
                        <td className="p-3">{payment.paymentMethod}</td>
                        <td className="p-3">{payment.transactionId || "-"}</td>
                        <td className="p-3 text-right">{formatCurrency(payment.amount, payment.currency)}</td>
                        <td className="p-3 text-right">
                          {payment.status === "COMPLETED" ? (
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          ) : payment.status === "PENDING" ? (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Failed</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {invoice.status === "DRAFT" && (
              <Button className="w-full" onClick={handleSendInvoice} disabled={isLoading}>
                <Send className="mr-2 h-4 w-4" />
                Send to Customer
              </Button>
            )}

            {(invoice.status === "SENT" || invoice.status === "OVERDUE") && (
              <Button className="w-full" onClick={handleMarkAsPaid} disabled={isLoading}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Paid
              </Button>
            )}

            {invoice.status !== "PAID" && invoice.status !== "CANCELLED" && (
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/admin/invoices/${invoice.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Invoice
                </Link>
              </Button>
            )}

            {invoice.status !== "PAID" && invoice.status !== "CANCELLED" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full text-destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Invoice
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently cancel the invoice and remove it from active
                      records.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancelInvoice}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Yes, cancel invoice
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{formatCurrency(invoice.amount, invoice.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax:</span>
              <span>{formatCurrency(invoice.tax, invoice.currency)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(invoice.total, invoice.currency)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid:</span>
              <span>
                {formatCurrency(
                  invoice.payments?.reduce(
                    (sum: number, payment: any) => (payment.status === "COMPLETED" ? sum + payment.amount : sum),
                    0,
                  ) || 0,
                  invoice.currency,
                )}
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Balance Due:</span>
              <span>
                {formatCurrency(
                  invoice.total -
                    (invoice.payments?.reduce(
                      (sum: number, payment: any) => (payment.status === "COMPLETED" ? sum + payment.amount : sum),
                      0,
                    ) || 0),
                  invoice.currency,
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

