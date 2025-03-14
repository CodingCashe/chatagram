import { type NextRequest, NextResponse } from "next/server"
import fetch from "node-fetch"
import { onCurrentUser } from "@/actions/user"

// PayPal API endpoints
const PAYPAL_API_BASE =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

// Get PayPal access token
async function getAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })

  const data = (await response.json()) as { access_token: string }
  return data.access_token
}

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user
    const user = await onCurrentUser()

    // If no authenticated user, return unauthorized
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const amount = url.searchParams.get("amount")
    const currency = url.searchParams.get("currency") || "USD"
    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    // Get PayPal access token
    const accessToken = await getAccessToken()

    // Create PayPal order
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
            },
            custom_id: user.id, // Add the user ID for reference
          },
        ],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          brand_name: "Your Company Name",
          user_action: "PAY_NOW",
        },
      }),
    })

    const data = (await response.json()) as { id: string; links: { href: string; rel: string }[] }

    // Find the approval URL
    const approvalUrl = data.links.find((link) => link.rel === "approve")?.href

    if (!approvalUrl) {
      throw new Error("PayPal approval URL not found")
    }

    // Redirect to PayPal for payment approval
    return NextResponse.redirect(approvalUrl)
  } catch (error) {
    console.error("Error creating PayPal order:", error)

    return NextResponse.json({ error: "Error creating PayPal order" }, { status: 500 })
  }
}

// Handle PayPal webhook for payment capture
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { order_id } = body

    if (!order_id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Get PayPal access token
    const accessToken = await getAccessToken()

    // Capture the payment
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${order_id}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    // Extract the user ID from the custom_id field
    const userId = data.purchase_units?.[0]?.custom_id

    if (userId) {
      // Update the user's subscription or order status in your database
      // This would typically call a function similar to your onSubscribe server action
      console.log(`Updating subscription for user ${userId}`)

      // Example: await updateUserSubscription(userId, data.id);
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error capturing PayPal payment:", error)

    return NextResponse.json({ error: "Error capturing PayPal payment" }, { status: 500 })
  }
}

