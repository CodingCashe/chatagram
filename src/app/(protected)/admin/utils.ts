// "use server"

// import { client } from "@/lib/prisma"
// import { onCurrentUser } from "@/actions/user"

// // A utility function to check if the current user is an admin
// export async function isUserAdmin() {
//   try {
//     const user = await onCurrentUser()

//     if (!user) {
//       return false
//     }

//     const dbUser = await client.user.findUnique({
//       where: {
//         clerkId: user.id,
//       },
//       select: {
//         isAdmin: true,
//       },
//     })

//     return !!dbUser?.isAdmin
//   } catch (error) {
//     console.error("Error checking admin status:", error)
//     return false
//   }
// }

"use server"

import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

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
        id: true,
        isAdmin: true,
      },
    })

    if (!dbUser?.isAdmin) {
      return false
    }

    // Log successful admin check
    await client.auditLog.create({
      data: {
        userId: dbUser.id,
        action: "admin_check",
        target: "admin_access",
        ipAddress: headers().get("x-forwarded-for") || "unknown",
        userAgent: headers().get("user-agent") || "unknown",
        timestamp: new Date(),
      },
    })

    return true
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Enhanced admin check with security features
export async function requireAdmin() {
  try {
    const user = await onCurrentUser()

    if (!user) {
      redirect("/sign-in")
    }

    const dbUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        isAdmin: true,
        email: true,
      },
    })

    if (!dbUser?.isAdmin) {
      // Log unauthorized access attempt
      console.warn(`Unauthorized admin access attempt by ${dbUser?.email || user.id}`)
      redirect("/dashboard")
    }

    // Log successful admin access
    await client.auditLog.create({
      data: {
        userId: dbUser.id,
        action: "admin_access",
        target: headers().get("x-pathname") || "unknown",
        ipAddress: headers().get("x-forwarded-for") || "unknown",
        userAgent: headers().get("user-agent") || "unknown",
        timestamp: new Date(),
      },
    })

    return dbUser
  } catch (error) {
    console.error("Error in requireAdmin:", error)
    redirect("/dashboard")
  }
}

