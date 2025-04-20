import { client } from "@/lib/prisma"
import { onCurrentUser } from "@/actions/user"
import { redirect } from "next/navigation"

export type AuthenticatedUser = {
  id: string
  firstname: string | null
  lastname: string | null
  isAdmin: boolean
  fullName: string
}

/**
 * Get the authenticated user with database information
 * Redirects to sign-in if not authenticated
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  // Get the current user from Clerk
  const clerkUser = await onCurrentUser()

  // If no user is signed in, redirect to sign-in
  if (!clerkUser) {
    redirect("/sign-in")
  }

  // Check if the user exists in our database
  const dbUser = await client.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      isAdmin: true,
    },
  })

  // If user doesn't exist, redirect
  if (!dbUser) {
    redirect("/")
  }

  const fullName = `${dbUser.firstname || ""} ${dbUser.lastname || ""}`.trim()
  
  return {
    ...dbUser,
    fullName
  }
}

/**
 * Verify that the user has access to the requested dashboard
 * Redirects if unauthorized or if admin
 */
export async function verifyDashboardAccess(username: string): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser()
  
  const normalizedUsername = username.replace(/-/g, " ")

  // If the URL doesn't match the user's name, redirect to the correct URL
  if (user.fullName.toLowerCase() !== normalizedUsername.toLowerCase() && !user.isAdmin) {
    redirect(`/dashboard/${user.fullName.replace(/ /g, "-")}`)
  }

  // Admin users should be at the admin dashboard
  if (user.isAdmin) {
    redirect("/admin")
  }
  
  return user
}