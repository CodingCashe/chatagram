// import { ChatInterface } from "./chat-interface"

// export default function ChatPage() {
//   return (
//     <div className="container p-6 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Admin Chat</h1>
//         <p className="text-muted-foreground">Communicate with users and team members.</p>
//       </div>

//       <ChatInterface />
//     </div>
//   )
// }
// Add this line at the top of your file
export const dynamic = 'force-dynamic'

// Rest of your page component

import { ChatInterface } from "./chat-interface"
import { getCurrentAdmin } from "../actions"
import { NotificationListener } from "../components/notification-listener"

export default async function ChatPage() {
  const admin = await getCurrentAdmin()

  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Chat</h1>
        <p className="text-muted-foreground">Communicate with users and team members.</p>
      </div>

      <NotificationListener userId={admin.id} />
      <ChatInterface adminId={admin.id} />
    </div>
  )
}

