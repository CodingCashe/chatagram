import type { Metadata } from "next"
import { CheckCircle, AlertCircle, Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "System Status",
  description: "Check the status of your admin dashboard features",
}

export default function StatusPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">System Status</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Core Features</CardTitle>
            <CardDescription>Status of main dashboard functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <StatusItem status="active" name="Dashboard" description="Main admin dashboard and metrics" />
              <StatusItem status="active" name="User Management" description="View and manage users" />
              <StatusItem status="active" name="Subscription Management" description="View and manage subscriptions" />
              <StatusItem status="active" name="Chat System" description="Real-time chat with users" />
              <StatusItem status="active" name="Automations" description="View and manage automations" />
              <StatusItem status="active" name="Scheduled Content" description="View and manage scheduled content" />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email System</CardTitle>
            <CardDescription>Status of email functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <StatusItem
                status={
                  process.env.RESEND_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER) ? "active" : "config"
                }
                name="Email Sending"
                description="Send emails to users"
                configMessage={
                  !process.env.RESEND_API_KEY && !(process.env.SMTP_HOST && process.env.SMTP_USER)
                    ? "Configure RESEND_API_KEY or SMTP settings"
                    : undefined
                }
              />
              <StatusItem status="active" name="Email Templates" description="Create and manage email templates" />
              <StatusItem status="active" name="Email Campaigns" description="Create and manage email campaigns" />
              <StatusItem status="active" name="Email Analytics" description="Track email performance" />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Status of third-party integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <StatusItem
                status="coming"
                name="Instagram Accounts"
                description="Connect and manage Instagram accounts"
              />
              <StatusItem status="coming" name="AI Assistant" description="AI-powered content assistant" />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security & Configuration</CardTitle>
            <CardDescription>Status of security features</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <StatusItem
                status={process.env.ADMIN_REQUIRES_2FA === "true" ? "active" : "config"}
                name="Two-Factor Authentication"
                description="Require 2FA for admin access"
                configMessage={
                  process.env.ADMIN_REQUIRES_2FA !== "true" ? "Set ADMIN_REQUIRES_2FA=true to enable" : undefined
                }
              />
              <StatusItem status="active" name="Admin Settings" description="Configure admin dashboard settings" />
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatusItem({
  status,
  name,
  description,
  configMessage,
}: {
  status: "active" | "inactive" | "config" | "coming"
  name: string
  description: string
  configMessage?: string
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5">
        {status === "active" && <CheckCircle className="h-5 w-5 text-green-500" />}
        {status === "inactive" && <AlertCircle className="h-5 w-5 text-red-500" />}
        {status === "config" && <AlertCircle className="h-5 w-5 text-amber-500" />}
        {status === "coming" && <Circle className="h-5 w-5 text-blue-500" />}
      </div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        {configMessage && <div className="text-xs text-amber-600 mt-1">{configMessage}</div>}
      </div>
    </li>
  )
}

