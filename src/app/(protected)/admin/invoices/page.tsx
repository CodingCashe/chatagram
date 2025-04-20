import type { Metadata } from "next"
import { InvoicesTable } from "./invoices-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Invoices | Admin Dashboard",
  description: "Manage customer invoices and payments",
}

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage customer invoices and track payments</p>
        </div>
        <Button asChild>
          <Link href="/admin/invoices/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Invoice
          </Link>
        </Button>
      </div>
      <InvoicesTable />
    </div>
  )
}

