import { AdminSettings } from "./admin-settings"

export default function SettingsPage() {
  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Configure admin panel settings and permissions.</p>
      </div>

      <AdminSettings />
    </div>
  )
}

