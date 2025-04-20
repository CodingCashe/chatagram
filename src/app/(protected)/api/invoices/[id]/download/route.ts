import { type NextRequest, NextResponse } from "next/server"
import { getInvoiceById } from "../../../../admin/actions/invoice-actions"
import { generateInvoicePdf } from "@/lib/pdf-generator"
import { onCurrentUser } from "@/actions/user"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const user = await onCurrentUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get the invoice
    const invoice = await getInvoiceById(params.id)
    if (!invoice) {
      return new NextResponse("Invoice not found", { status: 404 })
    }

    // Check if user is admin or the invoice belongs to the user
    const isAdmin = user.publicMetadata.isAdmin === true
    const isOwner = invoice.userId === user.id
    if (!isAdmin && !isOwner) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    // Generate the PDF
    const doc = await generateInvoicePdf(invoice)
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"))

    // Set response headers
    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Content-Disposition", `attachment; filename="Invoice-${invoice.invoiceNumber}.pdf"`)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error downloading invoice:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

