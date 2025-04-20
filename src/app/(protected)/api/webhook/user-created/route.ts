import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/email-service"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data

    // Create the user in our database
    try {
      const user = await client.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          firstname: first_name,
          lastname: last_name,
        },
      })

      // Send welcome email
      await sendWelcomeEmail(user)

      return new Response("User created and welcome email sent", { status: 200 })
    } catch (error) {
      console.error("Error creating user:", error)
      return new Response("Error creating user", { status: 500 })
    }
  }

  return new Response("Webhook received", { status: 200 })
}

