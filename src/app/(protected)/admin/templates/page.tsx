import { MessageTemplates } from "../components/message-template"

export default function TemplatesPage() {
  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Message Templates</h1>
        <p className="text-muted-foreground">Create and manage reusable message templates for your automations</p>
      </div>

      <MessageTemplates />
    </div>
  )
}

