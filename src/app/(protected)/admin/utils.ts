"use server"

import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"

// A utility function to check if the current user is an admin
export async function isUserAdmin() {
  try {
    const user = await onCurrentUser()

    if (!user) {
      return false
    }

    const dbUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        isAdmin: true,
      },
    })

    return !!dbUser?.isAdmin
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

