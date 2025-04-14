import { DashboardShell } from "@/components/global/influencer-relation/dashboard/updat/dashboard-shell"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your influencer profile, track performance, and find new opportunities.
          </p>
        </div>
      </div>
    </DashboardShell>
  )
}
