// import { type NextRequest, NextResponse } from "next/server"
// import { nanoid } from "nanoid"
// import { db } from "@/lib/db" // Your database connection
// import {onCurrentUser} from "@/actions/user"

// export async function POST(req: NextRequest) {
//   try {
//     // Get the authenticated user
//     const user = await onCurrentUser()

//     // If no authenticated user, return unauthorized
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await req.json()
//     const { amount, currency = "USD", description } = body

//     if (!amount || !description) {
//       return NextResponse.json({ error: "Amount and description are required" }, { status: 400 })
//     }

//     // Generate a unique reference number for the transfer
//     const reference = `INV-${nanoid(10)}`

//     // Store the bank transfer request in your database
//     const bankTransfer = await db.bankTransfer.create({
//       data: {
//         reference,
//         amount,
//         currency,
//         description,
//         status: "pending",
//         userId: user.id,
//         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
//       },
//     })

//     // Send email notification to the customer with bank transfer details
//     await sendBankTransferInstructions({
//       email: body.email,
//       reference,
//       amount,
//       currency,
//       bankDetails: {
//         accountName: process.env.BANK_ACCOUNT_NAME,
//         accountNumber: process.env.BANK_ACCOUNT_NUMBER,
//         routingNumber: process.env.BANK_ROUTING_NUMBER,
//         swiftCode: process.env.BANK_SWIFT_CODE,
//         bankName: process.env.BANK_NAME,
//       },
//     })

//     // Return the bank transfer details
//     return NextResponse.json({
//       reference: bankTransfer.reference,
//       amount: bankTransfer.amount,
//       currency: bankTransfer.currency,
//       account_name: process.env.BANK_ACCOUNT_NAME,
//       account_number: process.env.BANK_ACCOUNT_NUMBER,
//       routing_number: process.env.BANK_ROUTING_NUMBER,
//       swift_code: process.env.BANK_SWIFT_CODE,
//       bank_name: process.env.BANK_NAME,
//       instructions: "Please include the reference number in your transfer description.",
//       expires_at: bankTransfer.expiresAt,
//     })
//   } catch (error) {
//     console.error("Error initiating bank transfer:", error)

//     return NextResponse.json({ error: "Error initiating bank transfer" }, { status: 500 })
//   }
// }

// // Helper function to send email with bank transfer instructions
// async function sendBankTransferInstructions(data: {
//   email: string
//   reference: string
//   amount: number
//   currency: string
//   bankDetails: {
//     accountName: string
//     accountNumber: string
//     routingNumber: string
//     swiftCode: string
//     bankName: string
//   }
// }) {
//   // In a real implementation, you would send an email with the bank transfer details
//   // using a service like SendGrid, Mailgun, etc.
//   console.log(`Sending bank transfer instructions to ${data.email}`)

//   // Example email sending:
//   // await sendgrid.send({
//   //   to: data.email,
//   //   from: 'your-company@example.com',
//   //   subject: 'Bank Transfer Instructions',
//   //   text: `Please transfer ${data.amount} ${data.currency} to the following account...`,
//   //   html: `<p>Please transfer ${data.amount} ${data.currency} to the following account...</p>`,
//   // });
// }

// // Endpoint to verify bank transfers (admin use)
// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { reference, status, adminKey } = body

//     // Verify admin key for security
//     if (adminKey !== process.env.ADMIN_API_KEY) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     if (!reference || !status) {
//       return NextResponse.json({ error: "Reference and status are required" }, { status: 400 })
//     }

//     // Update the bank transfer status in your database
//     const updatedTransfer = await db.bankTransfer.update({
//       where: { reference },
//       data: { status },
//     })

//     // If payment is confirmed, update the order status
//     if (status === "completed") {
//       await db.order.update({
//         where: { paymentReference: reference },
//         data: { status: "paid" },
//       })

//       // Send confirmation email to the customer
//       // await sendPaymentConfirmationEmail(updatedTransfer.userId);
//     }

//     return NextResponse.json({
//       success: true,
//       reference: updatedTransfer.reference,
//       status: updatedTransfer.status,
//     })
//   } catch (error) {
//     console.error("Error updating bank transfer:", error)

//     return NextResponse.json({ error: "Error updating bank transfer" }, { status: 500 })
//   }
// }

