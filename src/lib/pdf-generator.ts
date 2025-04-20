import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { format } from "date-fns"

// Add the autotable plugin to the jsPDF type
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export async function generateInvoicePdf(invoice: any) {
  // Create a new PDF document
  const doc = new jsPDF()

  // Set document properties
  doc.setProperties({
    title: `Invoice #${invoice.invoiceNumber}`,
    subject: "Invoice",
    author: "Yazil | Engage > Automate > Grow",
    keywords: "invoice, payment",
    creator: "Yazil Ai",
  })

  // Add company logo
  // In a real implementation, you would add your company logo
  // doc.addImage(logoDataUrl, "PNG", 14, 10, 50, 20);

  // Add company information
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Yazil AI ", 14, 30)
  doc.text("123 Business Street", 14, 35)
  doc.text("City, State 12345", 14, 40)
  doc.text("contact@yourcompany.com", 14, 45)

  // Add invoice title and number
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text("INVOICE", 140, 30)
  doc.setFontSize(10)
  doc.text(`#${invoice.invoiceNumber}`, 140, 35)

  // Add invoice details
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Issue Date:", 140, 45)
  doc.text("Due Date:", 140, 50)
  doc.text("Status:", 140, 55)

  doc.setTextColor(0, 0, 0)
  doc.text(format(new Date(invoice.issueDate), "MMM dd, yyyy"), 170, 45)
  doc.text(format(new Date(invoice.dueDate), "MMM dd, yyyy"), 170, 50)
  doc.text(invoice.status, 170, 55)

  // Add customer information
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text("Bill To:", 14, 60)

  doc.setFontSize(10)
  doc.text(invoice.userName || "Customer", 14, 65)
  doc.text(invoice.userEmail || "", 14, 70)
  if (invoice.userAddress) {
    doc.text(invoice.userAddress, 14, 75)
  }

  // Add invoice items table
  const tableColumn = ["Description", "Quantity", "Unit Price", "Amount"]
  const tableRows = invoice.items.map((item: any) => [
    item.description,
    item.quantity,
    formatCurrency(item.unitPrice, invoice.currency, false),
    formatCurrency(item.amount, invoice.currency, false),
  ])

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 85,
    theme: "grid",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [66, 66, 66] },
    margin: { left: 14, right: 14 },
  })

  // Get the y position after the table
  const finalY = (doc as any).lastAutoTable.finalY + 10

  // Add totals
  doc.setFontSize(10)
  doc.text("Subtotal:", 130, finalY)
  doc.text("Tax:", 130, finalY + 5)
  doc.text("Total:", 130, finalY + 15)

  doc.setFontSize(10)
  doc.text(formatCurrency(invoice.amount, invoice.currency), 170, finalY, { align: "right" })
  doc.text(formatCurrency(invoice.tax, invoice.currency), 170, finalY + 5, { align: "right" })

  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(formatCurrency(invoice.total, invoice.currency), 170, finalY + 15, { align: "right" })
  doc.setFont("helvetica", "normal")

  // Add payment information
  doc.setFontSize(10)
  doc.text("Payment Information", 14, finalY + 30)
  doc.setFontSize(9)
  doc.text("Please make payment to:", 14, finalY + 35)
  doc.text("Bank: Your Bank Name", 14, finalY + 40)
  doc.text("Account: 1234567890", 14, finalY + 45)
  doc.text("Routing: 987654321", 14, finalY + 50)

  // Add notes
  if (invoice.notes) {
    doc.setFontSize(10)
    doc.text("Notes:", 14, finalY + 60)
    doc.setFontSize(9)
    doc.text(invoice.notes, 14, finalY + 65)
  }

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text(
      `Page ${i} of ${pageCount} - Invoice #${invoice.invoiceNumber}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" },
    )
    doc.text(
      "Thank you for your business!",
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 5,
      { align: "center" },
    )
  }

  return doc
}

// Helper function to format currency
function formatCurrency(amount: number, currency: string, symbol = true) {
  return new Intl.NumberFormat("en-US", {
    style: symbol ? "currency" : "decimal",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

// import jsPDF from "jspdf"
// import "jspdf-autotable"
// import type { Invoice, InvoiceItem } from "@prisma/client"

// type InvoiceWithItems = Invoice & {
//   items: InvoiceItem[]
// }

// export async function generateInvoicePDF(invoice: InvoiceWithItems): Promise<Uint8Array> {
//   // Create a new PDF document
//   const doc = new jsPDF()

//   // Add company logo/header
//   doc.setFontSize(20)
//   doc.setTextColor(40, 40, 40)
//   doc.text("INVOICE", 14, 22)

//   // Add invoice details
//   doc.setFontSize(10)
//   doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, 35)
//   doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 14, 40)
//   doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 14, 45)

//   // Add client information
//   doc.setFontSize(12)
//   doc.text("Bill To:", 14, 60)
//   doc.setFontSize(10)
//   doc.text(invoice.clientName, 14, 65)
//   doc.text(invoice.clientEmail, 14, 70)
//   doc.text(invoice.clientAddress || "", 14, 75)

//   // Add company information
//   doc.setFontSize(12)
//   doc.text("From:", 140, 60)
//   doc.setFontSize(10)
//   doc.text("Your Company Name", 140, 65)
//   doc.text("company@example.com", 140, 70)
//   doc.text("123 Business St, City, Country", 140, 75)

//   // Add invoice items table
//   const tableColumn = ["Item", "Description", "Quantity", "Rate", "Amount"]
//   const tableRows: any[] = []

//   invoice.items.forEach((item) => {
//     const itemData = [
//       item.name,
//       item.description || "",
//       item.quantity.toString(),
//       `$${item.unitPrice.toFixed(2)}`,
//       `$${(item.quantity * item.unitPrice).toFixed(2)}`,
//     ]
//     tableRows.push(itemData)
//   })

//   // @ts-ignore - jspdf-autotable extends jsPDF prototype
//   doc.autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 85,
//     theme: "grid",
//     styles: {
//       fontSize: 9,
//       cellPadding: 3,
//     },
//     headStyles: {
//       fillColor: [66, 66, 66],
//       textColor: 255,
//       fontStyle: "bold",
//     },
//   })

//   // Get the final y position after the table
//   // @ts-ignore - jspdf-autotable extends jsPDF prototype
//   const finalY = (doc as any).lastAutoTable.finalY + 10

//   // Add totals
//   doc.setFontSize(10)
//   doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 140, finalY)
//   doc.text(`Tax (${(invoice.taxRate * 100).toFixed(2)}%): $${invoice.taxAmount.toFixed(2)}`, 140, finalY + 5)
//   doc.text(`Total: $${invoice.total.toFixed(2)}`, 140, finalY + 10)

//   // Add payment information
//   doc.setFontSize(10)
//   doc.text("Payment Information:", 14, finalY + 25)
//   doc.text("Please make payment within the due date.", 14, finalY + 30)
//   doc.text("Bank Transfer: BANK123456789", 14, finalY + 35)

//   // Add footer
//   doc.setFontSize(8)
//   doc.text("Thank you for your business!", 14, finalY + 45)

//   // Convert the PDF to a Uint8Array
//   const pdfBytes = doc.output("arraybuffer")
//   return new Uint8Array(pdfBytes)
// }

