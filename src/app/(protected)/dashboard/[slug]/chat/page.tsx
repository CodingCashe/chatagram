import { UserChat } from "../_components/chats/chats"
import { verifyDashboardAccess } from "@/lib/auth"

export default async function ChatPage({
  params,
}: {
  params: { slug: string }
}) {
  // This handles authentication, authorization, and redirects
  const user = await verifyDashboardAccess(params.slug)

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Chat Support</h1>
      <UserChat userId={user.id} userName={user.fullName} />
    </div>
  )
}

