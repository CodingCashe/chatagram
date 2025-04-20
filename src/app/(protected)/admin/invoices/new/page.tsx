import type { Metadata } from "next"
import { InvoiceForm } from "../invoice-form"

export const metadata: Metadata = {
  title: "Create Invoice | Admin Dashboard",
  description: "Create a new invoice for a customer",
}

export default function NewInvoicePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Invoice</h1>
        <p className="text-muted-foreground">Create a new invoice for a customer</p>
      </div>
      <InvoiceForm />
    </div>
  )
}

