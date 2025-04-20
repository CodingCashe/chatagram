import { UsersTable } from "./users-table"

export default function UsersPage() {
  return (
    <div className="container p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">View and manage all users on the platform.</p>
      </div>

      <UsersTable />
    </div>
  )
}

