import { makeUserAdmin } from "../actions"
import { redirect } from "next/navigation"

// This is a utility page to make a user an admin
// You can navigate to /admin/make-admin?email=user@example.com to make a user an admin
export default async function MakeAdminPage({
  searchParams,
}: {
  searchParams: { email: string }
}) {
  const email = searchParams.email

  if (!email) {
    return (
      <div className="container p-6">
        <h1 className="text-2xl font-bold mb-4">Make Admin</h1>
        <p>No email provided. Use ?email=user@example.com in the URL.</p>
      </div>
    )
  }

  try {
    await makeUserAdmin(email)
    redirect("/admin")
  } catch (error) {
    return (
      <div className="container p-6">
        <h1 className="text-2xl font-bold mb-4">Make Admin</h1>
        <p className="text-red-500">Error making user admin: {(error as Error).message}</p>
      </div>
    )
  }
}

