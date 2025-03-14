// import { type NextRequest, NextResponse } from "next/server"
// import crypto from "crypto"
// import { Webhook } from "coinbase-commerce-node"
// import { Client, resources } from "coinbase-commerce-node"
// import { auth } from "@clerk/nextjs"

// // Initialize Coinbase Commerce client
// const { Charge } = resources
// Client.init(process.env.COINBASE_COMMERCE_API_KEY || "")

// export async function POST(req: NextRequest) {
//   try {
//     // Get the authenticated user
//     const { userId } = auth()

//     // If no authenticated user, return unauthorized
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const body = await req.json()
//     const { amount, currency = "USD", name } = body

//     if (!amount || !name) {
//       return NextResponse.json({ error: "Amount and name are required" }, { status: 400 })
//     }

//     // Create a charge with Coinbase Commerce
//     const chargeData = {
//       name,
//       description: "Payment for services",
//       local_price: {
//         amount: amount.toString(),
//         currency,
//       },
//       pricing_type: "fixed_price",
//       redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
//       metadata: {
//         customer_id: userId,
//         order_id: crypto.randomUUID(),
//       },
//     }

//     const charge = await Charge.create(chargeData)

//     return NextResponse.json({
//       id: charge.id,
//       code: charge.code,
//       hosted_url: charge.hosted_url,
//       addresses: charge.addresses, // Contains crypto addresses for payment
//       expires_at: charge.expires_at,
//       created_at: charge.created_at,
//       pricing: charge.pricing,
//     })
//   } catch (error) {
//     console.error("Error creating crypto charge:", error)

//     return NextResponse.json({ error: "Error creating crypto payment" }, { status: 500 })
//   }
// }

// // Handle Coinbase Commerce webhooks
// export async function PUT(req: NextRequest) {
//   try {
//     const rawBody = await req.text()
//     const signature = req.headers.get("x-cc-webhook-signature") || ""

//     // Verify the webhook signature
//     const event = Webhook.verifyEventBody(rawBody, signature, process.env.COINBASE_COMMERCE_WEBHOOK_SECRET || "")

//     // Handle different event types
//     switch (event.type) {
//       case "charge:confirmed":
//         // Payment confirmed - update your database
//         await updateOrderStatus(event.data.id, "paid")
//         break
//       case "charge:failed":
//         // Payment failed - update your database
//         await updateOrderStatus(event.data.id, "failed")
//         break
//       case "charge:delayed":
//         // Payment delayed - update your database
//         await updateOrderStatus(event.data.id, "pending")
//         break
//       case "charge:pending":
//         // Payment pending - update your database
//         await updateOrderStatus(event.data.id, "pending")
//         break
//       default:
//         console.log(`Unhandled event type: ${event.type}`)
//     }

//     return NextResponse.json({ received: true })
//   } catch (error) {
//     console.error("Error processing Coinbase webhook:", error)

//     return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
//   }
// }

// // Helper function to update order status in your database
// async function updateOrderStatus(chargeId: string, status: string) {
//   // In a real implementation, you would update your database
//   console.log(`Updating order status for charge ${chargeId} to ${status}`)

//   // Example database update:
//   // await db.order.update({
//   //   where: { chargeId },
//   //   data: { status },
//   // });
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



