import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import {onCurrentUser} from "@/actions/user"

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

    // Create a PaymentIntent for Apple Pay
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      metadata: {
        items: JSON.stringify(items),
        user_id: user.id,
      },
    })

    // Create an Apple Pay payment session
    const applePaySession = await stripe.applePayDomains.create({
      domain_name: process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") || "",
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      applePayMerchantId: process.env.APPLE_PAY_MERCHANT_ID,
      success: true,
    })
  } catch (error) {
    console.error("Error creating Apple Pay session:", error)

    return NextResponse.json({ error: "Error creating Apple Pay session" }, { status: 500 })
  }
}

