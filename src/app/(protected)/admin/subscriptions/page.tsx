import { SubscriptionsTable } from "./subscriptions-table"

export default function SubscriptionsPage() {
  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
        <p className="text-muted-foreground">Manage user subscriptions and billing.</p>
      </div>

      <SubscriptionsTable />
    </div>
  )
}

