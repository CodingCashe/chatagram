import { ScheduledContentTable } from "./scheduled-content-table"

export default function ScheduledContentPage() {
  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scheduled Content</h1>
        <p className="text-muted-foreground">Monitor and manage scheduled content across the platform.</p>
      </div>

      <ScheduledContentTable />
    </div>
  )
}

