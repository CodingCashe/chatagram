import { ChatInterface } from "./chat-interface"

export default function ChatPage() {
  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Chat</h1>
        <p className="text-muted-foreground">Communicate with users and team members.</p>
      </div>

      <ChatInterface />
    </div>
  )
}

