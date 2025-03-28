// "use server"

// import { client } from "@/lib/prisma"
// import { revalidatePath } from "next/cache"
// import { onCurrentUser } from "@/actions/user"
// import { sendEmail } from "@/lib/email-service"
// import { Prisma } from "@prisma/client"

// // Get all invoices with pagination and search
// export async function getAllInvoices(page = 1, limit = 10, search = "") {
//   try {
//     const skip = (page - 1) * limit

//     // Create a where clause for searching
//     const where = search
//       ? {
//           OR: [
//             { invoiceNumber: { contains: search, mode: Prisma.QueryMode.insensitive } },
//             {
//               user: {
//                 OR: [
//                   { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
//                   { firstname: { contains: search, mode: Prisma.QueryMode.insensitive } },
//                   { lastname: { contains: search, mode: Prisma.QueryMode.insensitive } },
//                 ],
//               },
//             },
//           ],
//         }
//       : {}

//     const [invoices, totalCount] = await Promise.all([
//       client.invoice.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: {
//           issueDate: "desc",
//         },
//         include: {
//           user: {
//             select: {
//               id: true,
//               email: true,
//               firstname: true,
//               lastname: true,
//             },
//           },
//         },
//       }),
//       client.invoice.count({ where }),
//     ])

//     // Check for overdue invoices and update their status
//     const today = new Date()
//     for (const invoice of invoices) {
//       if (invoice.status === "SENT" && new Date(invoice.dueDate) < today) {
//         await client.invoice.update({
//           where: { id: invoice.id },
//           data: { status: "OVERDUE" },
//         })
//         invoice.status = "OVERDUE"
//       }
//     }

//     return {
//       invoices: invoices.map((invoice) => ({
//         id: invoice.id,
//         invoiceNumber: invoice.invoiceNumber,
//         userId: invoice.userId,
//         userName: `${invoice.user?.firstname || ""} ${invoice.user?.lastname || ""}`.trim(),
//         userEmail: invoice.user?.email,
//         amount: invoice.amount,
//         tax: invoice.tax,
//         total: invoice.total,
//         currency: invoice.currency,
//         status: invoice.status,
//         dueDate: invoice.dueDate.toISOString(),
//         issueDate: invoice.issueDate.toISOString(),
//         paidDate: invoice.paidDate?.toISOString() || null,
//       })),
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//     }
//   } catch (error) {
//     console.error("Error fetching invoices:", error)
//     throw new Error("Failed to fetch invoices")
//   }
// }



// // Get all invoices with pagination and search
// // export async function getAllInvoices(page = 1, limit = 10, search = "") {
// //   try {
// //     const skip = (page - 1) * limit

// //     // Create a where clause for searching
// //     const where = search
// //       ? {
// //           OR: [
// //             { invoiceNumber: { contains: search, mode: "insensitive" } },
// //             {
// //               user: {
// //                 OR: [
// //                   { email: { contains: search, mode: "insensitive" } },
// //                   { firstname: { contains: search, mode: "insensitive" } },
// //                   { lastname: { contains: search, mode: "insensitive" } },
// //                 ],
// //               },
// //             },
// //           ],
// //         }
// //       : {}

// //     const [invoices, totalCount] = await Promise.all([
// //       client.invoice.findMany({
// //         where,
// //         skip,
// //         take: limit,
// //         orderBy: {
// //           issueDate: "desc",
// //         },
// //         include: {
// //           user: {
// //             select: {
// //               id: true,
// //               email: true,
// //               firstname: true,
// //               lastname: true,
// //             },
// //           },
// //         },
// //       }),
// //       client.invoice.count({ where }),
// //     ])

// //     // Check for overdue invoices and update their status
// //     const today = new Date()
// //     for (const invoice of invoices) {
// //       if (invoice.status === "SENT" && new Date(invoice.dueDate) < today) {
// //         await client.invoice.update({
// //           where: { id: invoice.id },
// //           data: { status: "OVERDUE" },
// //         })
// //         invoice.status = "OVERDUE"
// //       }
// //     }

// //     return {
// //       invoices: invoices.map((invoice) => ({
// //         id: invoice.id,
// //         invoiceNumber: invoice.invoiceNumber,
// //         userId: invoice.userId,
// //         userName: `${invoice.user?.firstname || ""} ${invoice.user?.lastname || ""}`.trim(),
// //         userEmail: invoice.user?.email,
// //         amount: invoice.amount,
// //         tax: invoice.tax,
// //         total: invoice.total,
// //         currency: invoice.currency,
// //         status: invoice.status,
// //         dueDate: invoice.dueDate.toISOString(),
// //         issueDate: invoice.issueDate.toISOString(),
// //         paidDate: invoice.paidDate?.toISOString() || null,
// //       })),
// //       totalCount,
// //       totalPages: Math.ceil(totalCount / limit),
// //     }
// //   } catch (error) {
// //     console.error("Error fetching invoices:", error)
// //     throw new Error("Failed to fetch invoices")
// //   }
// // }

// // Get invoice by ID
// export async function getInvoiceById(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//       include: {
//         user: {
//           select: {
//             id: true,
//             email: true,
//             firstname: true,
//             lastname: true,
//           },
//         },
//         items: true,
//         payments: {
//           orderBy: {
//             paymentDate: "desc",
//           },
//         },
//       },
//     })

//     if (!invoice) {
//       return null
//     }

//     // Check if invoice is overdue and update status
//     const today = new Date()
//     if (invoice.status === "SENT" && new Date(invoice.dueDate) < today) {
//       await client.invoice.update({
//         where: { id: invoice.id },
//         data: { status: "OVERDUE" },
//       })
//       invoice.status = "OVERDUE"
//     }

//     return {
//       ...invoice,
//       userName: `${invoice.user?.firstname || ""} ${invoice.user?.lastname || ""}`.trim(),
//       userEmail: invoice.user?.email,
//       issueDate: invoice.issueDate.toISOString(),
//       dueDate: invoice.dueDate.toISOString(),
//       paidDate: invoice.paidDate?.toISOString() || null,
//     }
//   } catch (error) {
//     console.error("Error fetching invoice:", error)
//     throw new Error("Failed to fetch invoice")
//   }
// }

// // Create a new invoice
// export async function createInvoice(formData: FormData) {
//   try {
//     const user = await onCurrentUser()

//     if (!user) {
//       return { success: false, error: "Not authenticated" }
//     }

//     const userId = formData.get("userId") as string
//     const dueDate = new Date(formData.get("dueDate") as string)
//     const currency = formData.get("currency") as string
//     const notes = formData.get("notes") as string
//     const taxRate = Number.parseFloat(formData.get("taxRate") as string) || 0
//     const items = JSON.parse(formData.get("items") as string)

//     // Calculate totals
//     let amount = 0
//     const invoiceItems = items.map((item: any) => {
//       const quantity = Number(item.quantity)
//       const unitPrice = Number(item.unitPrice)
//       const itemAmount = quantity * unitPrice
//       amount += itemAmount

//       return {
//         description: item.description,
//         quantity,
//         unitPrice,
//         amount: itemAmount,
//       }
//     })

//     const tax = amount * (taxRate / 100)
//     const total = amount + tax

//     // Generate invoice number
//     const invoiceCount = await client.invoice.count()
//     const invoiceNumber = `INV-${new Date().getFullYear()}-${(invoiceCount + 1).toString().padStart(5, "0")}`

//     // Create invoice
//     const invoice = await client.invoice.create({
//       data: {
//         invoiceNumber,
//         userId,
//         amount,
//         tax,
//         total,
//         currency,
//         status: "DRAFT",
//         dueDate,
//         notes,
//         items: {
//           create: invoiceItems,
//         },
//       },
//     })

//     revalidatePath("/admin/invoices")
//     return { success: true, invoiceId: invoice.id }
//   } catch (error) {
//     console.error("Error creating invoice:", error)
//     return { success: false, error: "Failed to create invoice" }
//   }
// }

// // Update an existing invoice
// export async function updateInvoice(formData: FormData) {
//   try {
//     const user = await onCurrentUser()

//     if (!user) {
//       return { success: false, error: "Not authenticated" }
//     }

//     const id = formData.get("id") as string
//     const userId = formData.get("userId") as string
//     const dueDate = new Date(formData.get("dueDate") as string)
//     const currency = formData.get("currency") as string
//     const notes = formData.get("notes") as string
//     const taxRate = Number.parseFloat(formData.get("taxRate") as string) || 0
//     const items = JSON.parse(formData.get("items") as string)

//     // Calculate totals
//     let amount = 0
//     const invoiceItems = items.map((item: any) => {
//       const quantity = Number(item.quantity)
//       const unitPrice = Number(item.unitPrice)
//       const itemAmount = quantity * unitPrice
//       amount += itemAmount

//       return {
//         description: item.description,
//         quantity,
//         unitPrice,
//         amount: itemAmount,
//       }
//     })

//     const tax = amount * (taxRate / 100)
//     const total = amount + tax

//     // Get existing invoice
//     const existingInvoice = await client.invoice.findUnique({
//       where: { id },
//       include: { items: true },
//     })

//     if (!existingInvoice) {
//       return { success: false, error: "Invoice not found" }
//     }

//     // Delete existing items
//     await client.invoiceItem.deleteMany({
//       where: { invoiceId: id },
//     })

//     // Update invoice
//     await client.invoice.update({
//       where: { id },
//       data: {
//         userId,
//         amount,
//         tax,
//         total,
//         currency,
//         dueDate,
//         notes,
//         items: {
//           create: invoiceItems,
//         },
//       },
//     })

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error updating invoice:", error)
//     return { success: false, error: "Failed to update invoice" }
//   }
// }

// // Send invoice to customer
// export async function sendInvoice(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//       include: {
//         user: true,
//         items: true,
//       },
//     })

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // Update invoice status
//     await client.invoice.update({
//       where: { id },
//       data: { status: "SENT" },
//     })

//     // Send email to customer
//     const userEmail = invoice.user.email
//     const userName = `${invoice.user.firstname || ""} ${invoice.user.lastname || ""}`.trim() || "Customer"

//     await sendEmail({
//       to: userEmail,
//       subject: `Invoice #${invoice.invoiceNumber} from Your Company`,
//       content: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Invoice #${invoice.invoiceNumber}</h2>
//           <p>Dear ${userName},</p>
//           <p>Please find attached your invoice #${invoice.invoiceNumber} for the amount of ${new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(invoice.total)}.</p>
//           <p>The invoice is due on ${new Date(invoice.dueDate).toLocaleDateString()}.</p>
//           <p>You can view and pay your invoice by clicking the button below:</p>
//           <div style="text-align: center; margin: 30px 0;">
//             <a href="${process.env.NEXT_PUBLIC_APP_URL}/invoices/${invoice.id}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Invoice</a>
//           </div>
//           <p>If you have any questions, please don't hesitate to contact us.</p>
//           <p>Thank you for your business!</p>
//           <p>Best regards,<br>Your Company</p>
//         </div>
//       `,
//     })

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error sending invoice:", error)
//     throw new Error("Failed to send invoice")
//   }
// }

// // Mark invoice as paid
// export async function markInvoiceAsPaid(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//     })

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // Update invoice status
//     await client.invoice.update({
//       where: { id },
//       data: {
//         status: "PAID",
//         paidDate: new Date(),
//       },
//     })

//     // Create payment record
//     await client.payment.create({
//       data: {
//         invoiceId: id,
//         userId: invoice.userId,
//         amount: invoice.total,
//         currency: invoice.currency,
//         paymentMethod: "OTHER",
//         status: "COMPLETED",
//         notes: "Marked as paid by admin",
//       },
//     })

//     // Send confirmation email to customer
//     const user = await client.user.findUnique({
//       where: { id: invoice.userId },
//     })

//     if (user) {
//       await sendEmail({
//         to: user.email,
//         subject: `Payment Confirmation for Invoice #${invoice.invoiceNumber}`,
//         content: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2>Payment Confirmation</h2>
//             <p>Dear ${user.firstname || "Customer"},</p>
//             <p>We have received your payment for Invoice #${invoice.invoiceNumber} in the amount of ${new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(invoice.total)}.</p>
//             <p>Thank you for your business!</p>
//             <p>Best regards,<br>Your Company</p>
//           </div>
//         `,
//       })
//     }

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error marking invoice as paid:", error)
//     throw new Error("Failed to mark invoice as paid")
//   }
// }

// // Cancel invoice
// export async function cancelInvoice(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//     })

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // Update invoice status
//     await client.invoice.update({
//       where: { id },
//       data: { status: "CANCELLED" },
//     })

//     // Send notification email to customer
//     const user = await client.user.findUnique({
//       where: { id: invoice.userId },
//     })

//     if (user) {
//       await sendEmail({
//         to: user.email,
//         subject: `Invoice #${invoice.invoiceNumber} Cancelled`,
//         content: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2>Invoice Cancelled</h2>
//             <p>Dear ${user.firstname || "Customer"},</p>
//             <p>This is to inform you that Invoice #${invoice.invoiceNumber} has been cancelled.</p>
//             <p>If you have any questions, please don't hesitate to contact us.</p>
//             <p>Best regards,<br>Your Company</p>
//           </div>
//         `,
//       })
//     }

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error cancelling invoice:", error)
//     throw new Error("Failed to cancel invoice")
//   }
// }

// // Get all users for invoice creation
// export async function getAllUsers() {
//   try {
//     const users = await client.user.findMany({
//       select: {
//         id: true,
//         firstname: true,
//         lastname: true,
//         email: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     })

//     return users.map((user) => ({
//       id: user.id,
//       name: `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Unnamed User",
//       email: user.email,
//     }))
//   } catch (error) {
//     console.error("Error fetching users:", error)
//     throw new Error("Failed to fetch users")
//   }
// }

// // Generate invoice PDF
// export async function generateInvoicePdf(id: string) {
//   try {
//     const invoice = await getInvoiceById(id)

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // In a real implementation, you would use a PDF generation library
//     // like PDFKit or a service like Puppeteer to generate the PDF

//     // For now, we'll just return a success message
//     return { success: true, invoiceId: id }
//   } catch (error) {
//     console.error("Error generating invoice PDF:", error)
//     throw new Error("Failed to generate invoice PDF")
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { onCurrentUser } from "@/actions/user"
import { sendEmail } from "@/lib/email-service"
import { Prisma } from "@prisma/client"
import { generateInvoicePdf as generatePdfDocument } from "@/lib/pdf-generator"

// Get all invoices with pagination and search
export async function getAllInvoices(page = 1, limit = 10, search = "") {
  try {
    const skip = (page - 1) * limit

    // Create a where clause for searching
    const where = search
      ? {
          OR: [
            { invoiceNumber: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              user: {
                OR: [
                  { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
                  { firstname: { contains: search, mode: Prisma.QueryMode.insensitive } },
                  { lastname: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ],
              },
            },
          ],
        }
      : {}

    const [invoices, totalCount] = await Promise.all([
      client.invoice.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          issueDate: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      }),
      client.invoice.count({ where }),
    ])

    // Check for overdue invoices and update their status
    const today = new Date()
    for (const invoice of invoices) {
      if (invoice.status === "SENT" && new Date(invoice.dueDate) < today) {
        await client.invoice.update({
          where: { id: invoice.id },
          data: { status: "OVERDUE" },
        })
        invoice.status = "OVERDUE"
      }
    }

    return {
      invoices: invoices.map((invoice) => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        userId: invoice.userId,
        userName: `${invoice.user?.firstname || ""} ${invoice.user?.lastname || ""}`.trim(),
        userEmail: invoice.user?.email,
        amount: invoice.amount,
        tax: invoice.tax,
        total: invoice.total,
        currency: invoice.currency,
        status: invoice.status,
        dueDate: invoice.dueDate.toISOString(),
        issueDate: invoice.issueDate.toISOString(),
        paidDate: invoice.paidDate?.toISOString() || null,
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    }
  } catch (error) {
    console.error("Error fetching invoices:", error)
    throw new Error("Failed to fetch invoices")
  }
}

// Get invoice by ID
export async function getInvoiceById(id: string) {
  try {
    const invoice = await client.invoice.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
          },
        },
        items: true,
        payments: {
          orderBy: {
            paymentDate: "desc",
          },
        },
      },
    })

    if (!invoice) {
      return null
    }

    // Check if invoice is overdue and update status
    const today = new Date()
    if (invoice.status === "SENT" && new Date(invoice.dueDate) < today) {
      await client.invoice.update({
        where: { id: invoice.id },
        data: { status: "OVERDUE" },
      })
      invoice.status = "OVERDUE"
    }

    return {
      ...invoice,
      userName: `${invoice.user?.firstname || ""} ${invoice.user?.lastname || ""}`.trim(),
      userEmail: invoice.user?.email,
      issueDate: invoice.issueDate.toISOString(),
      dueDate: invoice.dueDate.toISOString(),
      paidDate: invoice.paidDate?.toISOString() || null,
    }
  } catch (error) {
    console.error("Error fetching invoice:", error)
    throw new Error("Failed to fetch invoice")
  }
}

// Create a new invoice
export async function createInvoice(formData: FormData) {
  try {
    const user = await onCurrentUser()

    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    const userId = formData.get("userId") as string
    const dueDate = new Date(formData.get("dueDate") as string)
    const currency = formData.get("currency") as string
    const notes = formData.get("notes") as string
    const taxRate = Number.parseFloat(formData.get("taxRate") as string) || 0
    const items = JSON.parse(formData.get("items") as string)

    // Calculate totals
    let amount = 0
    const invoiceItems = items.map((item: any) => {
      const quantity = Number(item.quantity)
      const unitPrice = Number(item.unitPrice)
      const itemAmount = quantity * unitPrice
      amount += itemAmount

      return {
        description: item.description,
        quantity,
        unitPrice,
        amount: itemAmount,
      }
    })

    const tax = amount * (taxRate / 100)
    const total = amount + tax

    // Generate invoice number
    const invoiceCount = await client.invoice.count()
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(invoiceCount + 1).toString().padStart(5, "0")}`

    // Create invoice
    const invoice = await client.invoice.create({
      data: {
        invoiceNumber,
        userId,
        amount,
        tax,
        total,
        currency,
        status: "DRAFT",
        dueDate,
        notes,
        items: {
          create: invoiceItems,
        },
      },
    })

    revalidatePath("/admin/invoices")
    return { success: true, invoiceId: invoice.id }
  } catch (error) {
    console.error("Error creating invoice:", error)
    return { success: false, error: "Failed to create invoice" }
  }
}

// Update an existing invoice
export async function updateInvoice(formData: FormData) {
  try {
    const user = await onCurrentUser()

    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    const id = formData.get("id") as string
    const userId = formData.get("userId") as string
    const dueDate = new Date(formData.get("dueDate") as string)
    const currency = formData.get("currency") as string
    const notes = formData.get("notes") as string
    const taxRate = Number.parseFloat(formData.get("taxRate") as string) || 0
    const items = JSON.parse(formData.get("items") as string)

    // Calculate totals
    let amount = 0
    const invoiceItems = items.map((item: any) => {
      const quantity = Number(item.quantity)
      const unitPrice = Number(item.unitPrice)
      const itemAmount = quantity * unitPrice
      amount += itemAmount

      return {
        description: item.description,
        quantity,
        unitPrice,
        amount: itemAmount,
      }
    })

    const tax = amount * (taxRate / 100)
    const total = amount + tax

    // Get existing invoice
    const existingInvoice = await client.invoice.findUnique({
      where: { id },
      include: { items: true },
    })

    if (!existingInvoice) {
      return { success: false, error: "Invoice not found" }
    }

    // Delete existing items
    await client.invoiceItem.deleteMany({
      where: { invoiceId: id },
    })

    // Update invoice
    await client.invoice.update({
      where: { id },
      data: {
        userId,
        amount,
        tax,
        total,
        currency,
        dueDate,
        notes,
        items: {
          create: invoiceItems,
        },
      },
    })

    revalidatePath("/admin/invoices")
    revalidatePath(`/admin/invoices/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating invoice:", error)
    return { success: false, error: "Failed to update invoice" }
  }
}

// Send invoice to customer
export async function sendInvoice(id: string) {
  try {
    const invoice = await client.invoice.findUnique({
      where: { id },
      include: {
        user: true,
        items: true,
      },
    })

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    // Update invoice status
    await client.invoice.update({
      where: { id },
      data: { status: "SENT" },
    })

    // Send email to customer
    const userEmail = invoice.user.email
    const userName = `${invoice.user.firstname || ""} ${invoice.user.lastname || ""}`.trim() || "Customer"

    await sendEmail({
      to: userEmail,
      subject: `Invoice #${invoice.invoiceNumber} from Your Company`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Invoice #${invoice.invoiceNumber}</h2>
          <p>Dear ${userName},</p>
          <p>Please find attached your invoice #${invoice.invoiceNumber} for the amount of ${new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(invoice.total)}.</p>
          <p>The invoice is due on ${new Date(invoice.dueDate).toLocaleDateString()}.</p>
          <p>You can view and pay your invoice by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/invoices/${invoice.id}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Invoice</a>
          </div>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Thank you for your business!</p>
          <p>Best regards,<br>Your Company</p>
        </div>
      `,
    })

    revalidatePath("/admin/invoices")
    revalidatePath(`/admin/invoices/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending invoice:", error)
    throw new Error("Failed to send invoice")
  }
}

// Mark invoice as paid
export async function markInvoiceAsPaid(id: string) {
  try {
    const invoice = await client.invoice.findUnique({
      where: { id },
    })

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    // Update invoice status
    await client.invoice.update({
      where: { id },
      data: {
        status: "PAID",
        paidDate: new Date(),
      },
    })

    // Create payment record
    await client.payment.create({
      data: {
        invoiceId: id,
        userId: invoice.userId,
        amount: invoice.total,
        currency: invoice.currency,
        paymentMethod: "OTHER",
        status: "COMPLETED",
        notes: "Marked as paid by admin",
      },
    })

    // Send confirmation email to customer
    const user = await client.user.findUnique({
      where: { id: invoice.userId },
    })

    if (user) {
      await sendEmail({
        to: user.email,
        subject: `Payment Confirmation for Invoice #${invoice.invoiceNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Payment Confirmation</h2>
            <p>Dear ${user.firstname || "Customer"},</p>
            <p>We have received your payment for Invoice #${invoice.invoiceNumber} in the amount of ${new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(invoice.total)}.</p>
            <p>Thank you for your business!</p>
            <p>Best regards,<br>Your Company</p>
          </div>
        `,
      })
    }

    revalidatePath("/admin/invoices")
    revalidatePath(`/admin/invoices/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Error marking invoice as paid:", error)
    throw new Error("Failed to mark invoice as paid")
  }
}

// Cancel invoice
export async function cancelInvoice(id: string) {
  try {
    const invoice = await client.invoice.findUnique({
      where: { id },
    })

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    // Update invoice status
    await client.invoice.update({
      where: { id },
      data: { status: "CANCELLED" },
    })

    // Send notification email to customer
    const user = await client.user.findUnique({
      where: { id: invoice.userId },
    })

    if (user) {
      await sendEmail({
        to: user.email,
        subject: `Invoice #${invoice.invoiceNumber} Cancelled`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Invoice Cancelled</h2>
            <p>Dear ${user.firstname || "Customer"},</p>
            <p>This is to inform you that Invoice #${invoice.invoiceNumber} has been cancelled.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>Your Company</p>
          </div>
        `,
      })
    }

    revalidatePath("/admin/invoices")
    revalidatePath(`/admin/invoices/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Error cancelling invoice:", error)
    throw new Error("Failed to cancel invoice")
  }
}

// Get all users for invoice creation
export async function getAllUsers() {
  try {
    const users = await client.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return users.map((user) => ({
      id: user.id,
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Unnamed User",
      email: user.email,
    }))
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }
}

// Generate invoice PDF
// export async function generateInvoicePdf(id: string) {
//   try {
//     const invoice = await getInvoiceById(id)

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // In a real implementation, you would use a PDF generation library
//     // like PDFKit or a service like Puppeteer to generate the PDF

//     // For now, we'll just return a success message
//     return { success: true, invoiceId: id }
//   } catch (error) {
//     console.error("Error generating invoice PDF:", error)
//     throw new Error("Failed to generate invoice PDF")
//   }
// }
export async function generateInvoicePdf(id: string) {
  try {
    const invoice = await getInvoiceById(id)

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    // Generate the PDF
    const doc = await generatePdfDocument(invoice)

    // Convert to base64 for download
    const pdfBase64 = doc.output("datauristring")

    return {
      success: true,
      invoiceId: id,
      pdfData: pdfBase64,
    }
  } catch (error) {
    console.error("Error generating invoice PDF:", error)
    throw new Error("Failed to generate invoice PDF")
  }
}




// "use server"

// import { client } from "@/lib/prisma"
// import { revalidatePath } from "next/cache"
// import { currentUser } from "@clerk/nextjs/server"
// import { sendEmail } from "@/lib/email-service"

// // Import the PDF generator at the top of the file
// import { generateInvoicePdf as generatePdfDocument } from "@/lib/pdf-generator"

// // Get all invoices with pagination and search
// export async function getAllInvoices(page = 1, limit = 10, search = "") {
//   try {
//     const skip = (page - 1) * limit

//     // Create a where clause for searching
//     const where = search
//       ? {
//           OR: [
//             { invoiceNumber: { contains: search, mode: "insensitive" } },
//             {
//               user: {
//                 OR: [
//                   { email: { contains: search, mode: "insensitive" } },
//                   { firstname: { contains: search, mode: "insensitive" } },
//                   { lastname: { contains: search, mode: "insensitive" } },
//                 ],
//               },
//             },
//           ],
//         }
//       : {}

//     const [invoices, totalCount] = await Promise.all([
//       client.invoice.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: {
//           issueDate: "desc",
//         },
//         include: {
//           user: {
//             select: {
//               id: true,
//               email: true,
//               firstname: true,
//               lastname: true,
//             },
//           },
//         },
//       }),
//       client.invoice.count({ where }),
//     ])

//     // Check for overdue invoices and update their status
//     const today = new Date()
//     for (const invoice of invoices) {
//       if (invoice.status === "SENT" && new Date(invoice.dueDate) < today) {
//         await client.invoice.update({
//           where: { id: invoice.id },
//           data: { status: "OVERDUE" },
//         })
//         invoice.status = "OVERDUE"
//       }
//     }

//     return {
//       invoices: invoices.map((invoice) => ({
//         id: invoice.id,
//         invoiceNumber: invoice.invoiceNumber,
//         userId: invoice.userId,
//         userName: `${invoice.user?.firstname || ""} ${invoice.user?.lastname || ""}`.trim(),
//         userEmail: invoice.user?.email,
//         amount: invoice.amount,
//         tax: invoice.tax,
//         total: invoice.total,
//         currency: invoice.currency,
//         status: invoice.status,
//         dueDate: invoice.dueDate.toISOString(),
//         issueDate: invoice.issueDate.toISOString(),
//         paidDate: invoice.paidDate?.toISOString() || null,
//       })),
//       totalCount,
//       totalPages: Math.ceil(totalCount / limit),
//     }
//   } catch (error) {
//     console.error("Error fetching invoices:", error)
//     throw new Error("Failed to fetch invoices")
//   }
// }

// // Get invoice by ID
// export async function getInvoiceById(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//       include: {
//         user: {
//           select: {
//             id: true,
//             email: true,
//             firstname: true,
//             lastname: true,
//           },
//         },
//         items: true,
//         payments: {
//           orderBy: {
//             paymentDate: "desc",
//           },
//         },
//       },
//     })

//     if (!invoice) {
//       return null
//     }

//     // Check if invoice is overdue and update status
//     const today = new Date()
//     if (invoice.status === "SENT" && new Date(invoice.dueDate) < today) {
//       await client.invoice.update({
//         where: { id: invoice.id },
//         data: { status: "OVERDUE" },
//       })
//       invoice.status = "OVERDUE"
//     }

//     return {
//       ...invoice,
//       userName: `${invoice.user?.firstname || ""} ${invoice.user?.lastname || ""}`.trim(),
//       userEmail: invoice.user?.email,
//       issueDate: invoice.issueDate.toISOString(),
//       dueDate: invoice.dueDate.toISOString(),
//       paidDate: invoice.paidDate?.toISOString() || null,
//     }
//   } catch (error) {
//     console.error("Error fetching invoice:", error)
//     throw new Error("Failed to fetch invoice")
//   }
// }

// // Create a new invoice
// export async function createInvoice(formData: FormData) {
//   try {
//     const user = await currentUser()

//     if (!user) {
//       return { success: false, error: "Not authenticated" }
//     }

//     const userId = formData.get("userId") as string
//     const dueDate = new Date(formData.get("dueDate") as string)
//     const currency = formData.get("currency") as string
//     const notes = formData.get("notes") as string
//     const taxRate = Number.parseFloat(formData.get("taxRate") as string) || 0
//     const items = JSON.parse(formData.get("items") as string)

//     // Calculate totals
//     let amount = 0
//     const invoiceItems = items.map((item: any) => {
//       const quantity = Number(item.quantity)
//       const unitPrice = Number(item.unitPrice)
//       const itemAmount = quantity * unitPrice
//       amount += itemAmount

//       return {
//         description: item.description,
//         quantity,
//         unitPrice,
//         amount: itemAmount,
//       }
//     })

//     const tax = amount * (taxRate / 100)
//     const total = amount + tax

//     // Generate invoice number
//     const invoiceCount = await client.invoice.count()
//     const invoiceNumber = `INV-${new Date().getFullYear()}-${(invoiceCount + 1).toString().padStart(5, "0")}`

//     // Create invoice
//     const invoice = await client.invoice.create({
//       data: {
//         invoiceNumber,
//         userId,
//         amount,
//         tax,
//         total,
//         currency,
//         status: "DRAFT",
//         dueDate,
//         notes,
//         items: {
//           create: invoiceItems,
//         },
//       },
//     })

//     revalidatePath("/admin/invoices")
//     return { success: true, invoiceId: invoice.id }
//   } catch (error) {
//     console.error("Error creating invoice:", error)
//     return { success: false, error: "Failed to create invoice" }
//   }
// }

// // Update an existing invoice
// export async function updateInvoice(formData: FormData) {
//   try {
//     const user = await currentUser()

//     if (!user) {
//       return { success: false, error: "Not authenticated" }
//     }

//     const id = formData.get("id") as string
//     const userId = formData.get("userId") as string
//     const dueDate = new Date(formData.get("dueDate") as string)
//     const currency = formData.get("currency") as string
//     const notes = formData.get("notes") as string
//     const taxRate = Number.parseFloat(formData.get("taxRate") as string) || 0
//     const items = JSON.parse(formData.get("items") as string)

//     // Calculate totals
//     let amount = 0
//     const invoiceItems = items.map((item: any) => {
//       const quantity = Number(item.quantity)
//       const unitPrice = Number(item.unitPrice)
//       const itemAmount = quantity * unitPrice
//       amount += itemAmount

//       return {
//         description: item.description,
//         quantity,
//         unitPrice,
//         amount: itemAmount,
//       }
//     })

//     const tax = amount * (taxRate / 100)
//     const total = amount + tax

//     // Get existing invoice
//     const existingInvoice = await client.invoice.findUnique({
//       where: { id },
//       include: { items: true },
//     })

//     if (!existingInvoice) {
//       return { success: false, error: "Invoice not found" }
//     }

//     // Delete existing items
//     await client.invoiceItem.deleteMany({
//       where: { invoiceId: id },
//     })

//     // Update invoice
//     await client.invoice.update({
//       where: { id },
//       data: {
//         userId,
//         amount,
//         tax,
//         total,
//         currency,
//         dueDate,
//         notes,
//         items: {
//           create: invoiceItems,
//         },
//       },
//     })

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error updating invoice:", error)
//     return { success: false, error: "Failed to update invoice" }
//   }
// }

// // Send invoice to customer
// export async function sendInvoice(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//       include: {
//         user: true,
//         items: true,
//       },
//     })

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // Update invoice status
//     await client.invoice.update({
//       where: { id },
//       data: { status: "SENT" },
//     })

//     // Send email to customer
//     const userEmail = invoice.user.email
//     const userName = `${invoice.user.firstname || ""} ${invoice.user.lastname || ""}`.trim() || "Customer"

//     await sendEmail({
//       to: userEmail,
//       subject: `Invoice #${invoice.invoiceNumber} from Your Company`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Invoice #${invoice.invoiceNumber}</h2>
//           <p>Dear ${userName},</p>
//           <p>Please find attached your invoice #${invoice.invoiceNumber} for the amount of ${new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(invoice.total)}.</p>
//           <p>The invoice is due on ${new Date(invoice.dueDate).toLocaleDateString()}.</p>
//           <p>You can view and pay your invoice by clicking the button below:</p>
//           <div style="text-align: center; margin: 30px 0;">
//             <a href="${process.env.NEXT_PUBLIC_APP_URL}/invoices/${invoice.id}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Invoice</a>
//           </div>
//           <p>If you have any questions, please don't hesitate to contact us.</p>
//           <p>Thank you for your business!</p>
//           <p>Best regards,<br>Your Company</p>
//         </div>
//       `,
//     })

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error sending invoice:", error)
//     throw new Error("Failed to send invoice")
//   }
// }

// // Mark invoice as paid
// export async function markInvoiceAsPaid(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//     })

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // Update invoice status
//     await client.invoice.update({
//       where: { id },
//       data: {
//         status: "PAID",
//         paidDate: new Date(),
//       },
//     })

//     // Create payment record
//     await client.payment.create({
//       data: {
//         invoiceId: id,
//         userId: invoice.userId,
//         amount: invoice.total,
//         currency: invoice.currency,
//         paymentMethod: "OTHER",
//         status: "COMPLETED",
//         notes: "Marked as paid by admin",
//       },
//     })

//     // Send confirmation email to customer
//     const user = await client.user.findUnique({
//       where: { id: invoice.userId },
//     })

//     if (user) {
//       await sendEmail({
//         to: user.email,
//         subject: `Payment Confirmation for Invoice #${invoice.invoiceNumber}`,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2>Payment Confirmation</h2>
//             <p>Dear ${user.firstname || "Customer"},</p>
//             <p>We have received your payment for Invoice #${invoice.invoiceNumber} in the amount of ${new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency }).format(invoice.total)}.</p>
//             <p>Thank you for your business!</p>
//             <p>Best regards,<br>Your Company</p>
//           </div>
//         `,
//       })
//     }

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error marking invoice as paid:", error)
//     throw new Error("Failed to mark invoice as paid")
//   }
// }

// // Cancel invoice
// export async function cancelInvoice(id: string) {
//   try {
//     const invoice = await client.invoice.findUnique({
//       where: { id },
//     })

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // Update invoice status
//     await client.invoice.update({
//       where: { id },
//       data: { status: "CANCELLED" },
//     })

//     // Send notification email to customer
//     const user = await client.user.findUnique({
//       where: { id: invoice.userId },
//     })

//     if (user) {
//       await sendEmail({
//         to: user.email,
//         subject: `Invoice #${invoice.invoiceNumber} Cancelled`,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2>Invoice Cancelled</h2>
//             <p>Dear ${user.firstname || "Customer"},</p>
//             <p>This is to inform you that Invoice #${invoice.invoiceNumber} has been cancelled.</p>
//             <p>If you have any questions, please don't hesitate to contact us.</p>
//             <p>Best regards,<br>Your Company</p>
//           </div>
//         `,
//       })
//     }

//     revalidatePath("/admin/invoices")
//     revalidatePath(`/admin/invoices/${id}`)
//     return { success: true }
//   } catch (error) {
//     console.error("Error cancelling invoice:", error)
//     throw new Error("Failed to cancel invoice")
//   }
// }

// // Get all users for invoice creation
// export async function getAllUsers() {
//   try {
//     const users = await client.user.findMany({
//       select: {
//         id: true,
//         firstname: true,
//         lastname: true,
//         email: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     })

//     return users.map((user) => ({
//       id: user.id,
//       name: `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Unnamed User",
//       email: user.email,
//     }))
//   } catch (error) {
//     console.error("Error fetching users:", error)
//     throw new Error("Failed to fetch users")
//   }
// }

// // Replace the generateInvoicePdf function with this implementation:
// // Generate invoice PDF
// export async function generateInvoicePdf(id: string) {
//   try {
//     const invoice = await getInvoiceById(id)

//     if (!invoice) {
//       throw new Error("Invoice not found")
//     }

//     // Generate the PDF
//     const doc = await generatePdfDocument(invoice)

//     // Convert to base64 for download
//     const pdfBase64 = doc.output("datauristring")

//     return {
//       success: true,
//       invoiceId: id,
//       pdfData: pdfBase64,
//     }
//   } catch (error) {
//     console.error("Error generating invoice PDF:", error)
//     throw new Error("Failed to generate invoice PDF")
//   }
// }

