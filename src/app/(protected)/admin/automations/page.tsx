import { AutomationsTable } from "./automations-table"

export default function AutomationsPage() {
  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Automation Management</h1>
        <p className="text-muted-foreground">Monitor and manage all automations on the platform.</p>
      </div>

      <AutomationsTable />
    </div>
  )
}

