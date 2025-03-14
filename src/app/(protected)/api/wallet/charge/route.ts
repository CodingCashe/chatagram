// import { type NextRequest, NextResponse } from "next/server"
// import { db } from "@/lib/db" // Your database connection
// import { nanoid } from "nanoid"
// import { auth } from "@clerk/nextjs"

// export async function POST(req: NextRequest) {
//   try {
//     // Get the authenticated user
//     const { userId } = auth()

//     // If no authenticated user, return unauthorized
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await req.json()
//     const { amount, currency = "USD", description } = body

//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 })
//     }

//     // Start a database transaction to ensure atomicity
//     const result = await db.$transaction(async (tx) => {
//       // Get the user's wallet
//       const wallet = await tx.wallet.findUnique({
//         where: { userId },
//       })

//       if (!wallet) {
//         throw new Error("Wallet not found")
//       }

//       // Check if the wallet has sufficient balance
//       if (wallet.balance < amount) {
//         throw new Error(`Insufficient wallet balance. Available: ${wallet.balance} ${wallet.currency}`)
//       }

//       // Update the wallet balance
//       const updatedWallet = await tx.wallet.update({
//         where: { id: wallet.id },
//         data: {
//           balance: wallet.balance - amount,
//         },
//       })

//       // Create a transaction record
//       const transaction = await tx.walletTransaction.create({
//         data: {
//           walletId: wallet.id,
//           amount: -amount, // Negative amount for debit
//           currency,
//           type: "payment",
//           description: description || "Payment",
//           reference: `TXN-${nanoid(10)}`,
//         },
//       })

//       return {
//         transactionId: transaction.id,
//         userId,
//         amount,
//         new_balance: updatedWallet.balance,
//         currency: wallet.currency,
//         success: true,
//       }
//     })

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error("Error processing wallet payment:", error)

//     const errorMessage = error instanceof Error ? error.message : "Error processing wallet payment"

//     return NextResponse.json({ error: errorMessage }, { status: 400 })
//   }
// }

// // Endpoint to get wallet balance
// export async function GET(req: NextRequest) {
//   try {
//     // Get the authenticated user
//     const { userId } = auth()

//     // If no authenticated user, return unauthorized
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // Get the user's wallet
//     const wallet = await db.wallet.findUnique({
//       where: { userId },
//       include: {
//         transactions: {
//           orderBy: {
//             createdAt: "desc",
//           },
//           take: 5,
//         },
//       },
//     })

//     if (!wallet) {
//       return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
//     }

//     return NextResponse.json({
//       balance: wallet.balance,
//       currency: wallet.currency,
//       transactions: wallet.transactions.map((t) => ({
//         id: t.id,
//         amount: t.amount,
//         currency: t.currency,
//         type: t.type,
//         description: t.description,
//         created_at: t.createdAt,
//       })),
//     })
//   } catch (error) {
//     console.error("Error getting wallet balance:", error)

//     return NextResponse.json({ error: "Error getting wallet balance" }, { status: 500 })
//   }
// }

///JUST FOR TESTING

import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { onCurrentUser } from "@/actions/user"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
})

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user
    const user = await onCurrentUser()

    // If no authenticated user, return unauthorized
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { amount, currency = "usd", payment_method_types = ["card"], metadata = {} } = body

    // Validate the amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 })
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types,
      metadata: {
        ...metadata,
        // Use the authenticated user ID
        user_id: user.id,
      },
      // Enable automatic payment methods for maximum compatibility
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)

    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
  }
}



