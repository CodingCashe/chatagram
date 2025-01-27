"use server"

import { client } from "@/lib/prisma"

export async function getInstagramToken(automationId: string): Promise<string | null> {
  try {
    const automation = await client.automation.findUnique({
      where: { id: automationId },
      include: { User: { include: { integrations: true } } },
    })

    if (automation?.User?.integrations[0]?.token) {
      return automation.User.integrations[0].token
    }

    // If no token found for the automation, return the default token
    return process.env.DEFAULT_PAGE_TOKEN || null
  } catch (error) {
    console.error("Error fetching Instagram token:", error)
    return null
  }
}

