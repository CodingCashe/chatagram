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
    const { amount, currency = "usd", items = [] } = body

    // Validate the amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 })
    }

    // Create a PaymentIntent for Google Pay
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      metadata: {
        items: JSON.stringify(items),
        user_id: user.id,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      merchantId: process.env.GOOGLE_PAY_MERCHANT_ID,
      merchantName: process.env.MERCHANT_NAME || "Your Company",
      success: true,
    })
  } catch (error) {
    console.error("Error creating Google Pay session:", error)

    return NextResponse.json({ error: "Error creating Google Pay session" }, { status: 500 })
  }
}

