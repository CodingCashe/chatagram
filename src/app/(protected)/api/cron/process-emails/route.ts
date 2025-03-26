import { type NextRequest, NextResponse } from "next/server"
import { processScheduledEmails } from "@/lib/email-service"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  // Check for a secret token to secure the endpoint
  const authHeader = req.headers.get("authorization")

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await processScheduledEmails()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing scheduled emails:", error)
    return NextResponse.json({ error: "Failed to process emails" }, { status: 500 })
  }
}

