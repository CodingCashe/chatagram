import type { Metadata } from "next"
import { getInvoiceById } from "../../actions/invoice-actions"
import { InvoiceDetail } from "../invoice-detail"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Yazil | Invoice Details",
  description: "View invoice details and manage payments",
}

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const invoice = await getInvoiceById(params.id)

  if (!invoice) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Invoice #{invoice.invoiceNumber}</h1>
        <p className="text-muted-foreground">View invoice details and manage payments</p>
      </div>
      <InvoiceDetail invoice={invoice} />
    </div>
  )
}

